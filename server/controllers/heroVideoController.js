
import mongoose from "mongoose";
import HeroVideo from "../models/HeroVideo.js";
import {
  uploadToR2,
  deleteFromR2,
  getR2KeyFromUrl,
} from "../utils/r2Storage.js";

// ========================================
// HELPERS
// ========================================

const isValidId = (id) => mongoose.isValidObjectId(id);

const parseActive = (value, fallback = true) => {
  if (value === undefined) return fallback;
  return value === true || value === "true";
};

const parseOrder = (value, fallback = 0) => {
  if (value === undefined) return fallback;
  if (value === "") return 0;

  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) {
    throw new Error("Invalid order");
  }

  return number;
};

const removeR2Video = async (url) => {
  if (!getR2KeyFromUrl(url)) return;

  try {
    await deleteFromR2(url);
  } catch (error) {
    console.error("R2 video cleanup failed:", error);
  }
};

const sendError = (res, error, action) => {
  console.error(`Hero video ${action} error:`, error);

  if (
    error.name === "ValidationError" ||
    error.message === "Invalid order"
  ) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: `Failed to ${action} hero video`,
  });
};

// ========================================
// CREATE HERO VIDEO
// ========================================

export const createHeroVideo = async (req, res) => {
  let newVideoUrl = "";
  let saved = false;

  try {
    const {
      title,
      badge,
      subtitle,
      description,
      order,
      active,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Hero video is required",
      });
    }

    const finalOrder = parseOrder(order);

    // Upload to Cloudflare R2
    const result = await uploadToR2(req.file, "hero");

    newVideoUrl = result.url;

    // Save in MongoDB
    const heroVideo = await HeroVideo.create({
      title: title.trim(),
      badge: badge || "",
      subtitle: subtitle || "",
      description: description || "",
      video: result.url,
      publicId: result.key,
      order: finalOrder,
      active: parseActive(active),
    });

    saved = true;

    return res.status(201).json({
      success: true,
      message: "Hero video created successfully",
      heroVideo,
    });
  } catch (error) {
    if (!saved && newVideoUrl) {
      await removeR2Video(newVideoUrl);
    }

    return sendError(res, error, "create");
  }
};

// ========================================
// GET ALL HERO VIDEOS
// ========================================

export const getHeroVideos = async (req, res) => {
  try {
    const heroVideos = await HeroVideo.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: heroVideos.length,
      heroVideos,
    });
  } catch (error) {
    return sendError(res, error, "get");
  }
};

// ========================================
// GET SINGLE HERO VIDEO
// ========================================

export const getHeroVideo = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hero video ID",
      });
    }

    const heroVideo = await HeroVideo.findById(req.params.id);

    if (!heroVideo) {
      return res.status(404).json({
        success: false,
        message: "Hero video not found",
      });
    }

    return res.status(200).json({
      success: true,
      heroVideo,
    });
  } catch (error) {
    return sendError(res, error, "get");
  }
};

// ========================================
// UPDATE HERO VIDEO
// ========================================

export const updateHeroVideo = async (req, res) => {
  let newVideoUrl = "";
  let saved = false;

  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hero video ID",
      });
    }

    const heroVideo = await HeroVideo.findById(req.params.id);

    if (!heroVideo) {
      return res.status(404).json({
        success: false,
        message: "Hero video not found",
      });
    }

    const {
      title,
      badge,
      subtitle,
      description,
      order,
      active,
    } = req.body;

    if (title !== undefined) {
      if (!title?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty",
        });
      }
      heroVideo.title = title.trim();
    }

    if (badge !== undefined) heroVideo.badge = badge;
    if (subtitle !== undefined) heroVideo.subtitle = subtitle;

    if (description !== undefined) {
      heroVideo.description = description;
    }

    if (order !== undefined) {
      heroVideo.order = parseOrder(order);
    }

    if (active !== undefined) {
      heroVideo.active = parseActive(active);
    }

    const oldVideoUrl = heroVideo.video;

    // Upload new video only when provided
    if (req.file) {
      const result = await uploadToR2(req.file, "hero");

      newVideoUrl = result.url;

      heroVideo.video = result.url;
      heroVideo.publicId = result.key;
    }

    // Commit changes to MongoDB first
    await heroVideo.save();
    saved = true;

    // Delete old R2 video only after successful save
    if (newVideoUrl && oldVideoUrl !== newVideoUrl) {
      await removeR2Video(oldVideoUrl);
    }

    return res.status(200).json({
      success: true,
      message: "Hero video updated successfully",
      heroVideo,
    });
  } catch (error) {
    if (!saved && newVideoUrl) {
      await removeR2Video(newVideoUrl);
    }

    return sendError(res, error, "update");
  }
};

// ========================================
// DELETE HERO VIDEO
// ========================================

export const deleteHeroVideo = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hero video ID",
      });
    }

    const heroVideo = await HeroVideo.findByIdAndDelete(
      req.params.id
    );

    if (!heroVideo) {
      return res.status(404).json({
        success: false,
        message: "Hero video not found",
      });
    }

    // Clean up R2 after database deletion
    await removeR2Video(heroVideo.video);

    return res.status(200).json({
      success: true,
      message: "Hero video deleted successfully",
    });
  } catch (error) {
    return sendError(res, error, "delete");
  }
};
