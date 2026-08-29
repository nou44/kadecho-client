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

// =========================
// CREATE PROJECT
// =========================

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 101,
    },
  ]),
  addProject
);

// =========================
// GET ALL PROJECTS
// =========================

router.get(
  "/",
  getProjects
);

// =========================
// GET SINGLE PROJECT BY SLUG
// =========================

router.get(
  "/:slug",
  getProjectBySlug
);

// =========================
// GET SINGLE PROJECT BY ID
// =========================

// إلا كنت محتاج هاد route فالـ dashboard
router.get(
  "/id/:id",
  getProjectById
);

// =========================
// DELETE PROJECT
// =========================

router.delete(
  "/:id",
  deleteProject
);

export default router;