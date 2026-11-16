
import express from "express";

import heroVideoUpload from "../middleware/heroVideoUploadMiddleware.js";

import {
  createHeroVideo,
  getHeroVideos,
  getHeroVideo,
  updateHeroVideo,
  deleteHeroVideo,
} from "../controllers/heroVideoController.js";

const router = express.Router();

/* ========================================
   CREATE HERO VIDEO
======================================== */

router.post(
  "/",
  heroVideoUpload.single("video"),
  createHeroVideo
);

/* ========================================
   GET ALL HERO VIDEOS
======================================== */

router.get("/", getHeroVideos);

/* ========================================
   GET SINGLE HERO VIDEO
======================================== */

router.get("/:id", getHeroVideo);

/* ========================================
   UPDATE HERO VIDEO
======================================== */

router.put(
  "/:id",
  heroVideoUpload.single("video"),
  updateHeroVideo
);

/* ========================================
   DELETE HERO VIDEO
======================================== */

router.delete("/:id", deleteHeroVideo);

export default router;
