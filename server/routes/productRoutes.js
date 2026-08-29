import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* =========================
   CREATE PRODUCT
========================= */

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 100,
    },
  ]),
  createProduct
);

/* =========================
   GET ALL PRODUCTS
========================= */

router.get(
  "/",
  getProducts
);

/* =========================
   GET SINGLE PRODUCT
========================= */

router.get(
  "/:id",
  getProduct
);

/* =========================
   UPDATE PRODUCT
========================= */

router.put(
  "/:id",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 100,
    },
  ]),
  updateProduct
);

/* =========================
   DELETE PRODUCT
========================= */

router.delete(
  "/:id",
  deleteProduct
);

export default router;