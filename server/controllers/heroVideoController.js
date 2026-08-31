import HeroVideo from "../models/HeroVideo.js";
import cloudinary from "../config/cloudinary.js";

/* =========================================================
   CLOUDINARY VIDEO UPLOAD
========================================================= */

const uploadVideoToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "kadecho/hero-videos",
        resource_type: "video",
      },

      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(file.buffer);
  });
};

/* =========================================================
   DELETE CLOUDINARY VIDEO
========================================================= */

const deleteCloudinaryVideo = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });

    console.log(
      `🗑️ Cloudinary video deleted: ${publicId}`
    );
  } catch (error) {
    console.error(
      `❌ Failed to delete video ${publicId}:`,
      error.message
    );
  }
};

/* =========================================================
   CREATE HERO VIDEO
========================================================= */

export const createHeroVideo = async (req, res) => {
  let uploadedPublicId = null;

  try {
    const {
      title,
      badge,
      subtitle,
      description,
      order,
      active,
    } = req.body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    /* =====================================================
       VIDEO
    ===================================================== */

    const videoFile = req.file;

    if (!videoFile) {
      return res.status(400).json({
        success: false,
        message: "Hero video is required",
      });
    }

    /* =====================================================
       UPLOAD TO CLOUDINARY
    ===================================================== */

    console.log("☁️ Uploading hero video...");

    const result = await uploadVideoToCloudinary(
      videoFile
    );

    uploadedPublicId = result.public_id;

    console.log("✅ Hero video uploaded");
    console.log("🎥 Video:", result.secure_url);

    /* =====================================================
       CREATE DATABASE RECORD
    ===================================================== */

    const heroVideo = await HeroVideo.create({
      title: title.trim(),

      badge: badge || "",

      subtitle: subtitle || "",

      description: description || "",

      video: result.secure_url,

      publicId: result.public_id,

      order:
        order !== undefined && order !== ""
          ? Number(order)
          : 0,

      active:
        active === undefined
          ? true
          : active === true ||
            active === "true",
    });

    /* =====================================================
       SUCCESS
    ===================================================== */

    return res.status(201).json({
      success: true,

      message:
        "Hero video created successfully 🚀",

      heroVideo,
    });

  } catch (error) {
    console.error(
      "❌ Create hero video error:",
      error
    );

    /* =====================================================
       CLEAN CLOUDINARY IF DATABASE FAILED
    ===================================================== */

    if (uploadedPublicId) {
      await deleteCloudinaryVideo(
        uploadedPublicId
      );
    }

    return res.status(500).json({
      success: false,

      message:
        "Failed to create hero video",

      error: error.message,
    });
  }
};

/* =========================================================
   GET ALL HERO VIDEOS
========================================================= */

export const getHeroVideos = async (req, res) => {
  try {
    const heroVideos = await HeroVideo.find()
      .sort({
        order: 1,
        createdAt: 1,
      });

    return res.status(200).json({
      success: true,

      count: heroVideos.length,

      heroVideos,
    });

  } catch (error) {
    console.error(
      "❌ Get hero videos error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to get hero videos",

      error: error.message,
    });
  }
};

/* =========================================================
   GET SINGLE HERO VIDEO
========================================================= */

export const getHeroVideo = async (req, res) => {
  try {
    const heroVideo =
      await HeroVideo.findById(
        req.params.id
      );

    if (!heroVideo) {
      return res.status(404).json({
        success: false,

        message:
          "Hero video not found",
      });
    }

    return res.status(200).json({
      success: true,

      heroVideo,
    });

  } catch (error) {
    console.error(
      "❌ Get hero video error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to get hero video",

      error: error.message,
    });
  }
};

/* =========================================================
   UPDATE HERO VIDEO
========================================================= */

export const updateHeroVideo = async (req, res) => {
  let uploadedPublicId = null;

  try {
    const heroVideo =
      await HeroVideo.findById(
        req.params.id
      );

    if (!heroVideo) {
      return res.status(404).json({
        success: false,

        message:
          "Hero video not found",
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

    /* =====================================================
       UPDATE TEXT DATA
    ===================================================== */

    if (title !== undefined) {
      heroVideo.title = title.trim();
    }

    if (badge !== undefined) {
      heroVideo.badge = badge;
    }

    if (subtitle !== undefined) {
      heroVideo.subtitle = subtitle;
    }

    if (description !== undefined) {
      heroVideo.description =
        description;
    }

    if (order !== undefined) {
      heroVideo.order =
        order === ""
          ? 0
          : Number(order);
    }

    if (active !== undefined) {
      heroVideo.active =
        active === true ||
        active === "true";
    }

    /* =====================================================
       NEW VIDEO
    ===================================================== */

    const videoFile = req.file;

    if (videoFile) {
      console.log(
        "☁️ Uploading new hero video..."
      );

      const result =
        await uploadVideoToCloudinary(
          videoFile
        );

      uploadedPublicId =
        result.public_id;

      const oldPublicId =
        heroVideo.publicId;

      heroVideo.video =
        result.secure_url;

      heroVideo.publicId =
        result.public_id;

      await heroVideo.save();

      /* ===================================================
         DELETE OLD VIDEO
      =================================================== */

      if (oldPublicId) {
        await deleteCloudinaryVideo(
          oldPublicId
        );
      }

    } else {
      await heroVideo.save();
    }

    return res.status(200).json({
      success: true,

      message:
        "Hero video updated successfully 🚀",

      heroVideo,
    });

  } catch (error) {
    console.error(
      "❌ Update hero video error:",
      error
    );

    /* =====================================================
       DELETE NEW UPLOAD IF UPDATE FAILED
    ===================================================== */

    if (uploadedPublicId) {
      await deleteCloudinaryVideo(
        uploadedPublicId
      );
    }

    return res.status(500).json({
      success: false,

      message:
        "Failed to update hero video",

      error: error.message,
    });
  }
};

/* =========================================================
   DELETE HERO VIDEO
========================================================= */

export const deleteHeroVideo = async (req, res) => {
  try {
    const heroVideo =
      await HeroVideo.findById(
        req.params.id
      );

    if (!heroVideo) {
      return res.status(404).json({
        success: false,

        message:
          "Hero video not found",
      });
    }

    /* =====================================================
       DELETE CLOUDINARY VIDEO
    ===================================================== */

    if (heroVideo.publicId) {
      await deleteCloudinaryVideo(
        heroVideo.publicId
      );
    }

    /* =====================================================
       DELETE DATABASE RECORD
    ===================================================== */

    await HeroVideo.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,

      message:
        "Hero video deleted successfully 🗑️",
    });

  } catch (error) {
    console.error(
      "❌ Delete hero video error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to delete hero video",

      error: error.message,
    });
  }
};