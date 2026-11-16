import Project from "../models/Project.js";

import {
  uploadToR2,
  deleteFromR2,
} from "../utils/r2Storage.js";

// =========================
// DELETE R2 IMAGES SAFELY
// =========================

const cleanupR2Images = async (urls = []) => {
  const uniqueUrls = [
    ...new Set(urls.filter(Boolean)),
  ];

  const results = await Promise.allSettled(
    uniqueUrls.map((url) => deleteFromR2(url))
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        "❌ Failed to delete R2 image:",
        uniqueUrls[index],
        result.reason
      );
    }
  });
};

// =========================
// CREATE PROJECT
// =========================

export const addProject = async (req, res) => {
  const uploadedUrls = [];

  try {
    const {
      title,
      slug,
      description,
      client,
      location,
      category,
      product,
      date,
      featured,
    } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (
      !title ||
      !client ||
      !location ||
      !category ||
      !product ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, client, location, category, product and date are required.",
      });
    }

    // =========================
    // MAIN IMAGE
    // =========================

    const mainImageFile =
      req.files?.image?.[0];

    if (!mainImageFile) {
      return res.status(400).json({
        success: false,
        message:
          "Main project image is required.",
      });
    }

    // =========================
    // SLUG
    // =========================

    const finalSlug =
      slug?.trim() ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    // =========================
    // DUPLICATE SLUG
    // =========================

    const existingProject =
      await Project.findOne({
        slug: finalSlug,
      });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        message:
          "A project with this slug already exists.",
        slug: finalSlug,
      });
    }

    // =========================
    // UPLOAD MAIN IMAGE TO R2
    // =========================

    const mainImageResult =
      await uploadToR2(
        mainImageFile,
        "projects"
      );

    const imageUrl = mainImageResult.url;

    uploadedUrls.push(imageUrl);

    // =========================
    // UPLOAD GALLERY TO R2
    // =========================

    const galleryFiles =
      req.files?.images || [];

    const galleryUrls = [];

    for (const file of galleryFiles) {
      const result = await uploadToR2(
        file,
        "projects"
      );

      galleryUrls.push(result.url);
      uploadedUrls.push(result.url);
    }

    // =========================
    // CREATE PROJECT IN MONGODB
    // =========================

    const project = await Project.create({
      title: title.trim(),
      slug: finalSlug,
      description: description?.trim() || "",
      client: client.trim(),
      location: location.trim(),
      category: category.trim(),
      product: product.trim(),
      date,
      image: imageUrl,
      images: galleryUrls,
      featured:
        featured === true ||
        featured === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully 🚀",
      project,
    });
  } catch (error) {
    console.error(
      "❌ Create project error:",
      error
    );

    // Rollback R2 uploads if creation fails
    await cleanupR2Images(uploadedUrls);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create project.",
      error: error.message,
    });
  }
};

// =========================
// GET ALL PROJECTS
// =========================

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error(
      "❌ Get projects error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get projects.",
      error: error.message,
    });
  }
};

// =========================
// GET SINGLE PROJECT
// =========================

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      "❌ Get project error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get project.",
      error: error.message,
    });
  }
};

// =========================
// GET PROJECT BY SLUG
// =========================

export const getProjectBySlug = async (
  req,
  res
) => {
  try {
    const project = await Project.findOne({
      slug: req.params.slug,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      "❌ Get project by slug error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get project.",
      error: error.message,
    });
  }
};

// =========================
// DELETE PROJECT
// =========================

export const deleteProject = async (
  req,
  res
) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const imageUrls = [
      project.image,
      ...(project.images || []),
    ];

    // Delete MongoDB record
    await project.deleteOne();

    // Delete only images belonging to our R2
    await cleanupR2Images(imageUrls);

    return res.status(200).json({
      success: true,
      message:
        "Project deleted successfully 🗑️",
    });
  } catch (error) {
    console.error(
      "❌ Delete project error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete project.",
      error: error.message,
    });
  }
};