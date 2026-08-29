import express from "express";

import {
  getTopProducts,
} from "../controllers/topProductController.js";

const router = express.Router();

router.get("/", getTopProducts);

export default router;