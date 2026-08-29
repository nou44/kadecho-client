import express from "express";

import {
  createSubscriber,
  getSubscribers,
  deleteSubscriber,
} from "../controllers/subscriberController.js";

const router = express.Router();

// Create subscriber
router.post("/", createSubscriber);

// Get all subscribers
router.get("/", getSubscribers);

// Delete subscriber
router.delete("/:id", deleteSubscriber);

export default router;