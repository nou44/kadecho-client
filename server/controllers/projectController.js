import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// =========================
// CLOUDINARY UPLOAD HELPER
// =========================

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "kadecho/projects",
        resource_type: "image",
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

// =========================
// DELETE CLOUDINARY IMAGES
// =========================

const deleteCloudinaryImages = async (publicIds = []) => {
  for (const publicId of publicIds) {
    try {
      await cloudinary.uploader.destroy(publicId);

      console.log(
        `🗑️ Cloudinary image deleted: ${publicId}`
      );
    } catch (error) {
      console.error(
        `❌ Failed to delete ${publicId}:`,
        error.message
      );
    }
  }
};

// =========================
// CREATE PROJECT
// =========================

export const addProject = async (req, res) => {
  const uploadedPublicIds = [];

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
    // UPLOAD MAIN IMAGE
    // =========================

    const mainImageResult =
      await uploadToCloudinary(
        mainImageFile
      );

    const imageUrl =
      mainImageResult.secure_url;

    uploadedPublicIds.push(
      mainImageResult.public_id
    );

    // =========================
    // UPLOAD GALLERY
    // =========================

    const galleryFiles =
      req.files?.images || [];

    const galleryUrls = [];

    for (const file of galleryFiles) {
      const result =
        await uploadToCloudinary(file);

      galleryUrls.push(
        result.secure_url
      );

      uploadedPublicIds.push(
        result.public_id
      );
    }

    // =========================
    // CREATE PROJECT
    // =========================

    const project =
      await Project.create({
        title: title.trim(),

        slug: finalSlug,

        description:
          description?.trim() || "",

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

    // =========================
    // SUCCESS
    // =========================

    return res.status(201).json({
      success: true,
      message:
        "Project created successfully 🚀",
      project,
    });
  } catch (error) {
    console.error(
      "❌ Create project error:",
      error
    );

    // =========================
    // CLEANUP CLOUDINARY
    // =========================

    if (uploadedPublicIds.length > 0) {
      await deleteCloudinaryImages(
        uploadedPublicIds
      );
    }

    // =========================
    // DUPLICATE SLUG
    // =========================

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Slug already exists.",
      });
    }

    // =========================
    // GENERAL ERROR
    // =========================

    return res.status(500).json({
      success: false,
      message:
        "Failed to create project.",
      error: error.message,
    });
  }
};

// =========================
// GET ALL PROJECTS
// =========================

export const getProjects = async (
  req,
  res
) => {
  try {
    const projects =
      await Project.find().sort({
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
      message:
        "Failed to get projects.",
      error: error.message,
    });
  }
};

// =========================
// GET SINGLE PROJECT
// =========================

export const getProjectById = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found.",
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
      message:
        "Failed to get project.",
      error: error.message,
    });
  }
};

// =========================
// GET SINGLE PROJECT BY SLUG
// =========================

export const getProjectBySlug = async (req, res) => {
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
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found.",
      });
    }

    await Project.findByIdAndDelete(
      req.params.id
    );

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
      message:
        "Failed to delete project.",
      error: error.message,
    });
  }
};