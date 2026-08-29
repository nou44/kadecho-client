import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/* =========================================================
   CLOUDINARY UPLOAD HELPER
========================================================= */

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "kadecho/products",
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

/* =========================================================
   DELETE CLOUDINARY IMAGES
========================================================= */

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

/* =========================================================
   CREATE PRODUCT
========================================================= */

export const createProduct = async (req, res) => {
  const uploadedPublicIds = [];

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

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Name, price and category are required",
      });
    }

    /* =====================================================
       OLD PRICE VALIDATION
    ===================================================== */

    if (
      oldPrice !== undefined &&
      oldPrice !== "" &&
      Number(oldPrice) < Number(price)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Old price must be higher than current price",
      });
    }

    /* =====================================================
       SLUG
    ===================================================== */

    const finalSlug =
      slug?.trim() ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    /* =====================================================
       DUPLICATE SLUG CHECK
    ===================================================== */

    const existingProduct =
      await Product.findOne({
        slug: finalSlug,
      });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message:
          "A product with this slug already exists",
        slug: finalSlug,
      });
    }

    /* =====================================================
       FILES
    ===================================================== */

    const mainImageFile =
      req.files?.image?.[0];

    const galleryFiles =
      req.files?.images || [];

    /* =====================================================
       MAIN IMAGE
    ===================================================== */

    let imageUrl = "";

    if (mainImageFile) {
      const result =
        await uploadToCloudinary(
          mainImageFile
        );

      imageUrl =
        result.secure_url;

      uploadedPublicIds.push(
        result.public_id
      );

      console.log(
        "☁️ Main image uploaded"
      );

      console.log(
        "🖼️ Main image:",
        imageUrl
      );
    }

    /* =====================================================
       GALLERY IMAGES
    ===================================================== */

    const galleryUrls = [];

    if (galleryFiles.length > 0) {
      console.log(
        `📸 Uploading ${galleryFiles.length} gallery images...`
      );

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

      console.log(
        `✅ ${galleryUrls.length} gallery images uploaded`
      );
    }

    /* =====================================================
       CREATE PRODUCT
    ===================================================== */

    const product =
      await Product.create({
        name,

        slug: finalSlug,

        description:
          description || "",

        price:
          Number(price),

        oldPrice:
          oldPrice !== undefined &&
          oldPrice !== ""
            ? Number(oldPrice)
            : null,

        category,

        material:
          material || "",

        dimensions:
          dimensions || "",

        finish:
          finish || "",

        availability:
          availability || "",

        image:
          imageUrl,

        images:
          galleryUrls,

        featured:
          featured === true ||
          featured === "true",

        inStock:
          inStock === undefined
            ? true
            : inStock === true ||
              inStock === "true",
      });

    /* =====================================================
       SUCCESS
    ===================================================== */

    return res.status(201).json({
      success: true,

      message:
        "Product created successfully 🚀",

      product,
    });
  } catch (error) {
    console.error(
      "❌ Create product error:",
      error
    );

    /* =====================================================
       CLEANUP CLOUDINARY
    ===================================================== */

    if (
      uploadedPublicIds.length > 0
    ) {
      console.log(
        "🧹 Cleaning Cloudinary uploads..."
      );

      await deleteCloudinaryImages(
        uploadedPublicIds
      );
    }

    /* =====================================================
       DUPLICATE SLUG
    ===================================================== */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Slug already exists",
        slug:
          error.keyValue?.slug,
      });
    }

    /* =====================================================
       GENERAL ERROR
    ===================================================== */

    return res.status(500).json({
      success: false,

      message:
        "Failed to create product",

      error:
        error.message,
    });
  }
};

/* =========================================================
   GET ALL PRODUCTS
========================================================= */

export const getProducts = async (
  req,
  res
) => {
  try {
    const products =
      await Product.find().sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,

      count:
        products.length,

      products,
    });
  } catch (error) {
    console.error(
      "❌ Get products error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to get products",

      error:
        error.message,
    });
  }
};

/* =========================================================
   GET SINGLE PRODUCT
========================================================= */

export const getProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product not found",
      });
    }

    return res.status(200).json({
      success: true,

      product,
    });
  } catch (error) {
    console.error(
      "❌ Get product error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to get product",

      error:
        error.message,
    });
  }
};

/* =========================================================
   UPDATE PRODUCT
========================================================= */

export const updateProduct = async (
  req,
  res
) => {
  const uploadedPublicIds = [];

  try {
    /* =====================================================
       FIND PRODUCT
    ===================================================== */

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product not found",
      });
    }

    /* =====================================================
       BODY
    ===================================================== */

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

    /* =====================================================
       MAIN IMAGE
    ===================================================== */

    let imageUrl =
      product.image;

    const mainImageFile =
      req.files?.image?.[0];

    if (mainImageFile) {
      const result =
        await uploadToCloudinary(
          mainImageFile
        );

      imageUrl =
        result.secure_url;

      uploadedPublicIds.push(
        result.public_id
      );

      console.log(
        "☁️ New main image uploaded"
      );
    }

    /* =====================================================
       EXISTING GALLERY IMAGES

       FRONTEND SENDS ONLY THE OLD
       IMAGES THAT SHOULD REMAIN.
    ===================================================== */

    let existingImages = [];

    if (req.body.existingImages) {
      try {
        existingImages =
          JSON.parse(
            req.body.existingImages
          );

        if (
          !Array.isArray(
            existingImages
          )
        ) {
          existingImages = [];
        }
      } catch (error) {
        console.error(
          "❌ Invalid existingImages JSON:",
          error.message
        );

        existingImages = [];
      }
    } else {
      /*
       * IMPORTANT:
       * If frontend doesn't send existingImages,
       * keep the current gallery instead of
       * deleting everything accidentally.
       */

      existingImages =
        Array.isArray(product.images)
          ? product.images
          : [];
    }

    /* =====================================================
       OLD GALLERY
    ===================================================== */

    const oldGalleryImages =
      Array.isArray(product.images)
        ? product.images
        : [];

    /* =====================================================
       FIND DELETED GALLERY IMAGES
    ===================================================== */

    const deletedGalleryImages =
      oldGalleryImages.filter(
        (oldImage) =>
          !existingImages.includes(
            oldImage
          )
      );

    console.log(
      "🖼️ Old gallery:",
      oldGalleryImages
    );

    console.log(
      "✅ Images kept:",
      existingImages
    );

    console.log(
      "🗑️ Images deleted:",
      deletedGalleryImages
    );

    /* =====================================================
       DELETE REMOVED GALLERY IMAGES
       FROM CLOUDINARY
    ===================================================== */

    if (
      deletedGalleryImages.length > 0
    ) {
      const publicIds =
        deletedGalleryImages
          .map((imageUrl) => {
            try {
              const url =
                new URL(imageUrl);

              const pathname =
                url.pathname;

              const uploadIndex =
                pathname.indexOf(
                  "/upload/"
                );

              if (
                uploadIndex === -1
              ) {
                return null;
              }

              let publicId =
                pathname.substring(
                  uploadIndex +
                    "/upload/".length
                );

              /* Remove Cloudinary version */

              publicId =
                publicId.replace(
                  /^v\d+\//,
                  ""
                );

              /* Remove extension */

              publicId =
                publicId.replace(
                  /\.[^/.]+$/,
                  ""
                );

              return publicId;
            } catch (error) {
              console.error(
                "❌ Failed to extract Cloudinary public ID:",
                imageUrl
              );

              return null;
            }
          })
          .filter(Boolean);

      if (
        publicIds.length > 0
      ) {
        console.log(
          "🗑️ Deleting removed gallery images from Cloudinary..."
        );

        await deleteCloudinaryImages(
          publicIds
        );
      }
    }

    /* =====================================================
       NEW GALLERY IMAGES
    ===================================================== */

    const galleryFiles =
      req.files?.images || [];

    const newGalleryUrls = [];

    if (
      galleryFiles.length > 0
    ) {
      console.log(
        `📸 Uploading ${galleryFiles.length} new gallery images...`
      );

      for (const file of galleryFiles) {
        const result =
          await uploadToCloudinary(
            file
          );

        newGalleryUrls.push(
          result.secure_url
        );

        uploadedPublicIds.push(
          result.public_id
        );
      }

      console.log(
        `✅ ${newGalleryUrls.length} new gallery images uploaded`
      );
    }

    /* =====================================================
       FINAL GALLERY

       OLD KEPT
       +
       NEW
    ===================================================== */

    const galleryUrls = [
      ...existingImages,
      ...newGalleryUrls,
    ];

    console.log(
      "🎯 Final gallery:",
      galleryUrls
    );

    /* =====================================================
       SLUG
    ===================================================== */

    let finalSlug =
      product.slug;

    if (slug?.trim()) {
      finalSlug =
        slug.trim();
    } else if (name?.trim()) {
      finalSlug =
        name
          .toLowerCase()
          .trim()
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          );
    }

    /* =====================================================
       DUPLICATE SLUG CHECK
    ===================================================== */

    const duplicate =
      await Product.findOne({
        slug: finalSlug,

        _id: {
          $ne: product._id,
        },
      });

    if (duplicate) {
      await deleteCloudinaryImages(
        uploadedPublicIds
      );

      return res.status(409).json({
        success: false,

        message:
          "Slug already exists",

        slug:
          finalSlug,
      });
    }

    /* =====================================================
       UPDATE PRODUCT
    ===================================================== */

    product.name =
      name ?? product.name;

    product.slug =
      finalSlug;

    product.description =
      description ??
      product.description;

    product.price =
      price !== undefined
        ? Number(price)
        : product.price;

    product.oldPrice =
      oldPrice !== undefined
        ? (
            oldPrice === ""
              ? null
              : Number(oldPrice)
          )
        : product.oldPrice;

    product.category =
      category ??
      product.category;

    product.material =
      material ??
      product.material;

    product.dimensions =
      dimensions ??
      product.dimensions;

    product.finish =
      finish ??
      product.finish;

    product.availability =
      availability ??
      product.availability;

    product.image =
      imageUrl;

    product.images =
      galleryUrls;

    if (
      featured !== undefined
    ) {
      product.featured =
        featured === true ||
        featured === "true";
    }

    if (
      inStock !== undefined
    ) {
      product.inStock =
        inStock === true ||
        inStock === "true";
    }

    /* =====================================================
       OLD PRICE VALIDATION
    ===================================================== */

    if (
      product.oldPrice !== null &&
      product.oldPrice !== undefined &&
      product.oldPrice < product.price
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Old price must be higher than current price",
      });
    }

    /* =====================================================
       SAVE
    ===================================================== */

    await product.save();

    /* =====================================================
       SUCCESS
    ===================================================== */

    return res.status(200).json({
      success: true,

      message:
        "Product updated successfully 🚀",

      product,
    });
  } catch (error) {
    console.error(
      "❌ Update product error:",
      error
    );

    /* =====================================================
       CLEANUP NEW UPLOADS
    ===================================================== */

    if (
      uploadedPublicIds.length > 0
    ) {
      console.log(
        "🧹 Cleaning newly uploaded Cloudinary images..."
      );

      await deleteCloudinaryImages(
        uploadedPublicIds
      );
    }

    /* =====================================================
       DUPLICATE SLUG
    ===================================================== */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,

        message:
          "Slug already exists",
      });
    }

    /* =====================================================
       GENERAL ERROR
    ===================================================== */

    return res.status(500).json({
      success: false,

      message:
        "Failed to update product",

      error:
        error.message,
    });
  }
};

/* =========================================================
   DELETE PRODUCT
========================================================= */

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product not found",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Product deleted successfully 🗑️",
    });
  } catch (error) {
    console.error(
      "❌ Delete product error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to delete product",

      error:
        error.message,
    });
  }
};