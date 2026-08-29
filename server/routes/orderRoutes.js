import express from "express";

import {
  createOrder,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Create order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Delete order
router.delete("/:id", deleteOrder);

export default router;