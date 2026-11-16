import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  addProject,
  getProjects,
  getProjectById,
  getProjectBySlug,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// =====================================
// CREATE PROJECT
// Main image + max 10 gallery images
// =====================================

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  addProject
);

// =====================================
// GET ALL PROJECTS
// =====================================

router.get("/", getProjects);

// =====================================
// GET PROJECT BY ID
// =====================================

router.get("/id/:id", getProjectById);

// =====================================
// GET PROJECT BY SLUG
// =====================================

router.get("/:slug", getProjectBySlug);

// =====================================
// DELETE PROJECT
// =====================================

router.delete("/:id", deleteProject);

export default router;