
import mongoose from "mongoose";
import Product from "../models/Product.js";
import {
  uploadToR2,
  deleteFromR2,
} from "../utils/r2Storage.js";

// ===============================
// HELPERS
// ===============================

const slugify = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toBoolean = (value, fallback = false) => {
  if (value === undefined) return fallback;
  return value === true || value === "true";
};

const validPrice = (value) =>
  value !== "" &&
  value !== null &&
  value !== undefined &&
  Number.isFinite(Number(value)) &&
  Number(value) >= 0;

const cleanupR2 = async (urls = []) => {
  const results = await Promise.allSettled(
    [...new Set(urls)].filter(Boolean).map(deleteFromR2)
  );

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("R2 cleanup failed:", result.reason);
    }
  });
};

const uploadImage = async (file, uploadedUrls) => {
  const result = await uploadToR2(file, "products");
  uploadedUrls.push(result.url);
  return result.url;
};

const uploadGallery = async (files, uploadedUrls) => {
  const urls = [];

  for (const file of files) {
    urls.push(await uploadImage(file, uploadedUrls));
  }

  return urls;
};

const handleError = (res, error, action) => {
  console.error(`Product ${action} error:`, error);

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Slug already exists",
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: `Failed to ${action} product`,
  });
};

// ===============================
// CREATE PRODUCT
// ===============================

export const createProduct = async (req, res) => {
  const uploadedUrls = [];

  try {
    const {
      name,
      slug,
      description,
      price,
      oldPrice,
      category,
      material,
      dimensions,
      finish,
      availability,
      featured,
      inStock,
    } = req.body;

    if (!name?.trim() || !category?.trim() || !validPrice(price)) {
      return res.status(400).json({
        success: false,
        message: "Valid name, price and category are required",
      });
    }

    if (
      oldPrice !== undefined &&
      oldPrice !== "" &&
      oldPrice !== null &&
      (!validPrice(oldPrice) || Number(oldPrice) < Number(price))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid old price",
      });
    }

    const finalSlug = slugify(slug?.trim() || name);

    if (!finalSlug) {
      return res.status(400).json({
        success: false,
        message: "Invalid product slug",
      });
    }

    const existing = await Product.findOne({
      slug: finalSlug,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists",
        slug: finalSlug,
      });
    }

    const mainFile = req.files?.image?.[0];
    const galleryFiles = req.files?.images || [];

    const imageUrl = mainFile
      ? await uploadImage(mainFile, uploadedUrls)
      : "";

    const galleryUrls = await uploadGallery(
      galleryFiles,
      uploadedUrls
    );

    const product = await Product.create({
      name: name.trim(),
      slug: finalSlug,
      description: description || "",
      price: Number(price),
      oldPrice:
        oldPrice !== undefined &&
        oldPrice !== "" &&
        oldPrice !== null
          ? Number(oldPrice)
          : null,
      category,
      material: material || "",
      dimensions: dimensions || "",
      finish: finish || "",
      availability: availability || "",
      image: imageUrl,
      images: galleryUrls,
      featured: toBoolean(featured),
      inStock: toBoolean(inStock, true),
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    await cleanupR2(uploadedUrls);
    return handleError(res, error, "create");
  }
};

// ===============================
// GET ALL PRODUCTS
// ===============================

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return handleError(res, error, "get");
  }
};

// ===============================
// GET SINGLE PRODUCT
// ===============================

export const getProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return handleError(res, error, "get");
  }
};

// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = async (req, res) => {
  const uploadedUrls = [];

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const body = req.body;
    const oldImage = product.image;
    const oldGallery = [...(product.images || [])];

    const nextName = body.name ?? product.name;
    const nextCategory = body.category ?? product.category;
    const nextPrice = body.price ?? product.price;
    const nextOldPrice =
      body.oldPrice !== undefined
        ? body.oldPrice
        : product.oldPrice;

    if (
      !String(nextName).trim() ||
      !String(nextCategory).trim() ||
      !validPrice(nextPrice)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid name, price or category",
      });
    }

    if (
      nextOldPrice !== null &&
      nextOldPrice !== "" &&
      nextOldPrice !== undefined &&
      (!validPrice(nextOldPrice) ||
        Number(nextOldPrice) < Number(nextPrice))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid old price",
      });
    }

    const finalSlug = slugify(
      body.slug?.trim() || body.name?.trim() || product.slug
    );

    if (!finalSlug) {
      return res.status(400).json({
        success: false,
        message: "Invalid slug",
      });
    }

    const duplicate = await Product.findOne({
      slug: finalSlug,
      _id: { $ne: product._id },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Slug already exists",
      });
    }

    // Keep only URLs already owned by this product
    let existingImages = oldGallery;

    if (body.existingImages !== undefined) {
      let parsed;

      try {
        parsed = JSON.parse(body.existingImages);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid existingImages JSON",
        });
      }

      if (
        !Array.isArray(parsed) ||
        !parsed.every((url) =>
          typeof url === "string" && oldGallery.includes(url)
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid existing images",
        });
      }

      existingImages = [...new Set(parsed)];
    }

    const mainFile = req.files?.image?.[0];
    const galleryFiles = req.files?.images || [];

    const newMainImage = mainFile
      ? await uploadImage(mainFile, uploadedUrls)
      : oldImage;

    const newGallery = await uploadGallery(
      galleryFiles,
      uploadedUrls
    );

    product.name = String(nextName).trim();
    product.slug = finalSlug;
    product.description = body.description ?? product.description;
    product.price = Number(nextPrice);
    product.oldPrice =
      nextOldPrice === "" || nextOldPrice == null
        ? null
        : Number(nextOldPrice);
    product.category = nextCategory;
    product.material = body.material ?? product.material;
    product.dimensions = body.dimensions ?? product.dimensions;
    product.finish = body.finish ?? product.finish;
    product.availability =
      body.availability ?? product.availability;
    product.image = newMainImage;
    product.images = [...existingImages, ...newGallery];

    if (body.featured !== undefined) {
      product.featured = toBoolean(body.featured);
    }

    if (body.inStock !== undefined) {
      product.inStock = toBoolean(body.inStock);
    }

    await product.save();

    // Delete old R2 media only after MongoDB save
    const removedImages = oldGallery.filter(
      (url) => !existingImages.includes(url)
    );

    if (mainFile && oldImage) {
      removedImages.push(oldImage);
    }

    // Never delete URLs still referenced by this product
    const stillUsed = new Set([
      product.image,
      ...product.images,
    ]);

    await cleanupR2(
      removedImages.filter((url) => !stillUsed.has(url))
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    await cleanupR2(uploadedUrls);
    return handleError(res, error, "update");
  }
};

// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await cleanupR2([
      product.image,
      ...(product.images || []),
    ]);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return handleError(res, error, "delete");
  }
};
