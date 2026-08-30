import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ImagePlus,
  X,
  Star,
  PackageCheck,
  Upload,
  Trash2,
} from "lucide-react";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/products`;

export default function AddProduct() {
  // =========================
  // BASIC PRODUCT DATA
  // =========================

const [form, setForm] = useState({
  name: "",
  slug: "",
  description: "",
  price: "",
  oldPrice: "",
  category: "",
  material: "",
  dimensions: "",
  finish: "",
  availability: "",
  featured: true,
  inStock: true,
});

  // =========================
  // MAIN IMAGE
  // =========================

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState("");

  // =========================
  // GALLERY
  // =========================

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // =========================
  // UI STATES
  // =========================

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const mainInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // =========================
  // CLEAN PREVIEWS
  // =========================

  useEffect(() => {
    return () => {
      if (mainPreview) {
        URL.revokeObjectURL(mainPreview);
      }

      galleryPreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // MAIN IMAGE
  // =========================

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (mainPreview) {
      URL.revokeObjectURL(mainPreview);
    }

    const preview = URL.createObjectURL(file);

    setMainImage(file);
    setMainPreview(preview);

    setError("");

    // Reset input so same image can be selected again
    e.target.value = "";
  };

  // =========================
  // REMOVE MAIN IMAGE
  // =========================

  const removeMainImage = () => {
    if (mainPreview) {
      URL.revokeObjectURL(mainPreview);
    }

    setMainImage(null);
    setMainPreview("");

    if (mainInputRef.current) {
      mainInputRef.current.value = "";
    }
  };

  // =========================
  // GALLERY IMAGES
  // =========================

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (!validFiles.length) {
      setError("Please select valid image files.");
      return;
    }

    // Max 100 gallery images
    const remainingSlots = 100 - galleryImages.length;

    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (filesToAdd.length === 0) {
      setError("Maximum 100 gallery images allowed.");
      return;
    }

    const newPreviews = filesToAdd.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryImages((prev) => [
      ...prev,
      ...filesToAdd,
    ]);

    setGalleryPreviews((prev) => [
      ...prev,
      ...newPreviews,
    ]);

    setError("");

    // Allow selecting same files again
    e.target.value = "";
  };

  // =========================
  // REMOVE GALLERY IMAGE
  // =========================

  const removeGalleryImage = (index) => {
    const preview = galleryPreviews[index];

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setGalleryImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setGalleryPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =========================
  // SET GALLERY IMAGE AS MAIN
  // =========================

  const setGalleryAsMain = (index) => {
    const selectedFile = galleryImages[index];
    const selectedPreview = galleryPreviews[index];

    if (!selectedFile) return;

    // Remove old main image from preview memory
    if (mainPreview) {
      URL.revokeObjectURL(mainPreview);
    }

    // Put current main image into gallery
    if (mainImage && mainPreview) {
      setGalleryImages((prev) => [
        ...prev.filter((_, i) => i !== index),
        mainImage,
      ]);

      setGalleryPreviews((prev) => [
        ...prev.filter((_, i) => i !== index),
        mainPreview,
      ]);
    } else {
      // Remove selected image from gallery
      setGalleryImages((prev) =>
        prev.filter((_, i) => i !== index)
      );

      setGalleryPreviews((prev) =>
        prev.filter((_, i) => i !== index)
      );
    }

    setMainImage(selectedFile);
    setMainPreview(selectedPreview);
  };

  // =========================
  // AUTO SLUG
  // =========================

  const generateSlug = () => {
    const slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    setForm((prev) => ({
      ...prev,
      slug,
    }));
  };


  // =========================
// DISCOUNT CALCULATION
// =========================

const calculateDiscount = () => {
  const oldPrice = Number(form.oldPrice);
  const price = Number(form.price);

  if (
    !oldPrice ||
    !price ||
    oldPrice <= 0 ||
    price <= 0 ||
    price >= oldPrice
  ) {
    return 0;
  }

  return Math.round(
    ((oldPrice - price) / oldPrice) * 100
  );
};

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Validation
    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Product slug is required.");
      return;
    }

    if (!form.price) {
      setError("Product price is required.");
      return;
    }

    if (
  form.oldPrice &&
  Number(form.oldPrice) < Number(form.price)
) {
  setError(
    "Old price must be higher than the current price."
  );
  return;
}

    if (!form.category.trim()) {
      setError("Product category is required.");
      return;
    }

    if (!mainImage) {
      setError("Please select a main product image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // =========================
      // PRODUCT FIELDS
      // =========================

      data.append("name", form.name || "");
      data.append("slug", form.slug || "");
      data.append("description", form.description || "");
     data.append("price", form.price || "");
data.append("oldPrice", form.oldPrice || "");
      data.append("category", form.category || "");
      data.append("material", form.material || "");

      // FIX ONLY:
      // Prevent undefined values from reaching backend
      data.append("dimensions", form.dimensions || "");
      data.append("finish", form.finish || "");
      data.append("availability", form.availability || "");

      data.append("featured", form.featured);
      data.append("inStock", form.inStock);

      // =========================
      // MAIN IMAGE
      // =========================

      data.append("image", mainImage);

      // =========================
      // GALLERY
      // =========================

      galleryImages.forEach((file) => {
        data.append("images", file);
      });

      // =========================
      // SEND
      // =========================

      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            result.error ||
            "Failed to create product"
        );
      }

      setSuccess("Product created successfully 🚀");

      // =========================
      // RESET FORM
      // =========================

     setForm({
  name: "",
  slug: "",
  description: "",
  price: "",
  oldPrice: "",
  category: "",
  material: "",
  dimensions: "",
  finish: "",
  availability: "",
  featured: true,
  inStock: true,
});

      if (mainPreview) {
        URL.revokeObjectURL(mainPreview);
      }

      galleryPreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      setMainImage(null);
      setMainPreview("");

      setGalleryImages([]);
      setGalleryPreviews([]);

      if (mainInputRef.current) {
        mainInputRef.current.value = "";
      }

      if (galleryInputRef.current) {
        galleryInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Create product error:", err);

      setError(
        err.message ||
          "Something went wrong while creating the product."
      );
    } finally {
      setLoading(false);
    }
  };
return (
  <section className="min-h-screen bg-[#050505] px-3 py-5 text-white sm:px-5 lg:px-8">
    <div className="mx-auto w-full max-w-[1500px]">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090909]">
        
        {/* top accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-red-500"
        />

        <div className="flex flex-col justify-between gap-5 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:px-7 lg:py-6">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,.7)]" />

              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="font-bebas text-xs uppercase tracking-[0.28em] text-red-500"
              >
                Dashboard / Products
              </motion.p>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-1 font-bebas text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl"
            >
              Add Product
            </motion.h1>

            <p className="mt-1.5 max-w-xl text-xs text-zinc-600">
              Create a new product and configure its media, details and
              availability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-white/[0.08] bg-black px-3 py-2">
              <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-600">
                Gallery
              </p>

              <p className="mt-0.5 font-bebas text-lg text-white">
                {galleryImages.length}
                <span className="ml-1 text-xs text-zinc-700">/ 100</span>
              </p>
            </div>

            {mainImage && (
              <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] px-3 py-2">
                <p className="text-[8px] uppercase tracking-[0.2em] text-red-500/70">
                  Main Image
                </p>

                <p className="mt-0.5 text-xs font-semibold text-red-400">
                  Ready
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          MESSAGES
      ========================================================= */}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3"
        >
          <div className="mr-3 h-2 w-2 rounded-full bg-red-500" />

          <p className="text-xs text-red-400">
            {error}
          </p>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center rounded-xl border border-green-500/20 bg-green-500/[0.04] px-4 py-3"
        >
          <div className="mr-3 h-2 w-2 rounded-full bg-green-500" />

          <p className="text-xs text-green-400">
            {success}
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>

        {/* =========================================================
            MAIN WORKSPACE
        ========================================================= */}

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">

          {/* =======================================================
              LEFT COLUMN
          ======================================================= */}

          <div className="space-y-5">

            {/* =====================================================
                PRODUCT INFORMATION
            ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090909]">

              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-red-500" />

                    <h2 className="font-bebas text-xl uppercase tracking-[0.12em] text-white">
                      Product Information
                    </h2>
                  </div>

                  <p className="mt-1 pl-3 text-[10px] text-zinc-600">
                    Basic information about your product.
                  </p>
                </div>

                <span className="hidden rounded-lg border border-white/[0.07] bg-black px-2.5 py-1.5 text-[8px] uppercase tracking-[0.18em] text-zinc-600 sm:block">
                  Details
                </span>
              </div>

              <div className="p-5 sm:p-6">

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* NAME */}

                  <div>
                    <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Product Name
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Iron Moroccan Door"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-200
                        focus:border-red-500/40
                        focus:bg-[#050505]
                        focus:ring-1
                        focus:ring-red-500/10
                      "
                    />
                  </div>

                  {/* SLUG */}

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Slug
                      </label>

                      <button
                        type="button"
                        onClick={generateSlug}
                        className="text-[8px] font-semibold uppercase tracking-[0.15em] text-red-500 transition hover:text-red-400"
                      >
                        Generate
                      </button>
                    </div>

                    <input
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="iron-moroccan-door"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-200
                        focus:border-red-500/40
                        focus:bg-[#050505]
                        focus:ring-1
                        focus:ring-red-500/10
                      "
                    />
                  </div>

{/* PRICE */}

<div>
  <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
    Current Price
  </label>

  <div className="relative">
    <input
      name="price"
      type="number"
      min="0"
      value={form.price}
      onChange={handleChange}
      placeholder="2500"
      className="
        h-11
        w-full
        rounded-xl
        border
        border-white/[0.08]
        bg-black
        px-3.5
        pr-14
        text-xs
        text-white
        placeholder:text-zinc-700
        outline-none
        transition-all
        duration-200
        focus:border-red-500/40
        focus:bg-[#050505]
        focus:ring-1
        focus:ring-red-500/10
      "
    />

    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-wider text-zinc-700">
      MAD
    </span>
  </div>
</div>
{/* OLD PRICE */}

<div>
  <div className="mb-1.5 flex items-center justify-between">
    <label className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
      Old Price
    </label>

    {calculateDiscount() > 0 && (
      <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-green-500">
        Save {calculateDiscount()}%
      </span>
    )}
  </div>

  <div className="relative">
    <input
      name="oldPrice"
      type="number"
      min="0"
      value={form.oldPrice}
      onChange={handleChange}
      placeholder="3000"
      className="
        h-11
        w-full
        rounded-xl
        border
        border-white/[0.08]
        bg-black
        px-3.5
        pr-14
        text-xs
        text-white
        placeholder:text-zinc-700
        outline-none
        transition-all
        duration-200
        focus:border-red-500/40
        focus:bg-[#050505]
        focus:ring-1
        focus:ring-red-500/10
      "
    />

    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-wider text-zinc-700">
      MAD
    </span>
  </div>

  {form.oldPrice &&
    form.price &&
    Number(form.price) >= Number(form.oldPrice) && (
      <p className="mt-1.5 text-[9px] text-yellow-500/70">
        Old price should be higher than current price.
      </p>
    )}
</div>

                  {/* CATEGORY */}

                  <div>
                    <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Category
                    </label>

                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="Doors"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-200
                        focus:border-red-500/40
                        focus:bg-[#050505]
                        focus:ring-1
                        focus:ring-red-500/10
                      "
                    />
                  </div>

                  {/* MATERIAL */}

                  <div>
                    <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Material
                    </label>

                    <input
                      name="material"
                      value={form.material}
                      onChange={handleChange}
                      placeholder="Iron"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-200
                        focus:border-red-500/40
                        focus:bg-[#050505]
                        focus:ring-1
                        focus:ring-red-500/10
                      "
                    />
                  </div>

                  {/* DIMENSIONS */}

                  <div>
                    <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Dimensions
                    </label>

                    <input
                      name="dimensions"
                      value={form.dimensions}
                      onChange={handleChange}
                      placeholder="200 × 90 cm"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-200
                        focus:border-red-500/40
                        focus:bg-[#050505]
                        focus:ring-1
                        focus:ring-red-500/10
                      "
                    />
                  </div>

                  {/* FINISH */}

                  <div>
                    <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Finish
                    </label>

                    <input
                      name="finish"
                      value={form.finish}
                      onChange={handleChange}
                      placeholder="Matte Black"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-200
                        focus:border-red-500/40
                        focus:bg-[#050505]
                        focus:ring-1
                        focus:ring-red-500/10
                      "
                    />
                  </div>

                  {/* AVAILABILITY */}

                  <div>
                    <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Availability
                    </label>

                    <input
                      name="availability"
                      value={form.availability}
                      onChange={handleChange}
                      placeholder="Available on request"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-200
                        focus:border-red-500/40
                        focus:bg-[#050505]
                        focus:ring-1
                        focus:ring-red-500/10
                      "
                    />
                  </div>

                </div>

                {/* DESCRIPTION */}

                <div className="mt-4">
                  <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe the product, its design, materials and details..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-black
                      px-3.5
                      py-3
                      text-xs
                      leading-5
                      text-white
                      placeholder:text-zinc-700
                      outline-none
                      transition-all
                      duration-200
                      focus:border-red-500/40
                      focus:bg-[#050505]
                      focus:ring-1
                      focus:ring-red-500/10
                    "
                  />
                </div>

              </div>
            </div>


            {/* =====================================================
                PRODUCT GALLERY
            ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090909]">

              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-red-500" />

                    <h2 className="font-bebas text-xl uppercase tracking-[0.12em] text-white">
                      Product Gallery
                    </h2>
                  </div>

                  <p className="mt-1 pl-3 text-[10px] text-zinc-600">
                    Add additional images for this product.
                  </p>
                </div>

                <div className="rounded-lg border border-white/[0.07] bg-black px-2.5 py-1.5">
                  <span className="font-bebas text-base text-white">
                    {galleryImages.length}
                  </span>

                  <span className="ml-1 text-[8px] uppercase tracking-wider text-zinc-700">
                    images
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">

                {galleryPreviews.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                    {galleryPreviews.map((preview, index) => (
                      <motion.div
                        key={`${preview}-${index}`}
                        initial={{
                          opacity: 0,
                          scale: 0.92,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="
                          group
                          relative
                          aspect-square
                          overflow-hidden
                          rounded-xl
                          border
                          border-white/[0.08]
                          bg-black
                        "
                      >

                        <img
                          src={preview}
                          alt={`Gallery ${index + 1}`}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />

                        {/* OVERLAY */}

                        <div className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/80
                          via-transparent
                          to-black/20
                          opacity-0
                          transition
                          duration-300
                          group-hover:opacity-100
                        " />

                        {/* INDEX */}

                        <span className="
                          absolute
                          left-2
                          top-2
                          rounded-md
                          border
                          border-white/10
                          bg-black/70
                          px-1.5
                          py-0.5
                          text-[8px]
                          font-semibold
                          text-white
                          backdrop-blur
                        ">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="
                            absolute
                            right-2
                            top-2
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-white/10
                            bg-black/70
                            text-zinc-300
                            opacity-0
                            backdrop-blur
                            transition
                            duration-200
                            hover:border-red-500/30
                            hover:bg-red-600
                            hover:text-white
                            group-hover:opacity-100
                          "
                        >
                          <Trash2 size={11} />
                        </button>

                        {/* SET MAIN */}

                        <button
                          type="button"
                          onClick={() => setGalleryAsMain(index)}
                          className="
                            absolute
                            bottom-2
                            left-2
                            right-2
                            rounded-lg
                            border
                            border-white/10
                            bg-black/75
                            px-2
                            py-1.5
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-white
                            opacity-0
                            backdrop-blur
                            transition
                            duration-200
                            hover:border-red-500/30
                            hover:bg-red-600
                            group-hover:opacity-100
                          "
                        >
                          Set as Main
                        </button>

                      </motion.div>
                    ))}

                  </div>
                )}

                {/* ADD GALLERY */}

                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="
                    group
                    flex
                    min-h-28
                    w-full
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    border-white/[0.08]
                    bg-black
                    transition-all
                    duration-300
                    hover:border-red-500/30
                    hover:bg-red-500/[0.02]
                  "
                >
                  <div className="
                    mb-2
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-[#090909]
                    text-zinc-600
                    transition
                    duration-300
                    group-hover:border-red-500/20
                    group-hover:bg-red-500/[0.05]
                    group-hover:text-red-400
                  ">
                    <Upload size={17} />
                  </div>

                  <span className="text-xs font-medium text-zinc-400">
                    Add gallery images
                  </span>

                  <span className="mt-1 text-[9px] text-zinc-700">
                    PNG, JPG or WEBP · Multiple files supported
                  </span>
                </button>

                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImages}
                  className="hidden"
                />

              </div>
            </div>

          </div>


          {/* =======================================================
              RIGHT COLUMN
          ======================================================= */}

          <div className="space-y-5">

            {/* =====================================================
                MAIN IMAGE
            ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090909]">

              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-red-500" />

                    <h2 className="font-bebas text-xl uppercase tracking-[0.12em]">
                      Main Image
                    </h2>
                  </div>

                  <p className="mt-1 pl-3 text-[10px] text-zinc-600">
                    Primary product image.
                  </p>
                </div>

                {mainImage && (
                  <span className="rounded-full border border-red-500/15 bg-red-500/[0.06] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-wider text-red-400">
                    Ready
                  </span>
                )}
              </div>

              <div className="p-4">

                {!mainPreview ? (

                  <button
                    type="button"
                    onClick={() => mainInputRef.current?.click()}
                    className="
                      group
                      flex
                      min-h-[320px]
                      w-full
                      flex-col
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-dashed
                      border-white/[0.08]
                      bg-black
                      transition-all
                      duration-300
                      hover:border-red-500/30
                      hover:bg-red-500/[0.02]
                    "
                  >
                    <div className="
                      mb-3
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-[#090909]
                      text-zinc-600
                      transition
                      duration-300
                      group-hover:border-red-500/20
                      group-hover:bg-red-500/[0.05]
                      group-hover:text-red-400
                    ">
                      <ImagePlus size={22} />
                    </div>

                    <span className="text-sm font-medium text-zinc-400">
                      Upload main image
                    </span>

                    <span className="mt-1.5 text-[9px] uppercase tracking-[0.15em] text-zinc-700">
                      PNG · JPG · WEBP
                    </span>
                  </button>

                ) : (

                  <div className="group relative overflow-hidden rounded-xl border border-red-500/15 bg-black">

                    <img
                      src={mainPreview}
                      alt="Main product"
                      className="
                        aspect-[4/5]
                        w-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-[1.02]
                      "
                    />

                    <div className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-transparent
                      to-black/20
                    " />

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={removeMainImage}
                      className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/10
                        bg-black/75
                        text-white
                        backdrop-blur
                        transition
                        hover:border-red-500/30
                        hover:bg-red-600
                      "
                    >
                      <X size={14} />
                    </button>

                    {/* LABEL */}

                    <div className="
                      absolute
                      bottom-3
                      left-3
                      rounded-lg
                      border
                      border-red-500/20
                      bg-black/75
                      px-2.5
                      py-1.5
                      backdrop-blur
                    ">
                      <p className="text-[8px] uppercase tracking-[0.16em] text-red-400">
                        Primary
                      </p>
                    </div>

                  </div>

                )}

                <input
                  ref={mainInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleMainImage}
                  className="hidden"
                />

              </div>
            </div>


            {/* =====================================================
                SETTINGS
            ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090909]">

              <div className="border-b border-white/[0.07] px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 rounded-full bg-red-500" />

                  <h2 className="font-bebas text-xl uppercase tracking-[0.12em]">
                    Settings
                  </h2>
                </div>

                <p className="mt-1 pl-3 text-[10px] text-zinc-600">
                  Product visibility and availability.
                </p>
              </div>

              <div className="space-y-2 p-4">

                {/* FEATURED */}

                <label className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-black
                  p-3.5
                  transition-all
                  duration-300
                  hover:border-red-500/20
                ">
                  <div className="flex min-w-0 items-center gap-3">

                    <div className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/[0.07]
                      bg-[#090909]
                    ">
                      <Star
                        size={15}
                        className="text-zinc-500 transition group-hover:text-red-400"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-zinc-200">
                        Featured Product
                      </p>

                      <p className="mt-0.5 text-[9px] text-zinc-700">
                        Show in featured sections.
                      </p>
                    </div>

                  </div>

                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-4 w-4 shrink-0 accent-red-600"
                  />
                </label>


                {/* STOCK */}

                <label className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-black
                  p-3.5
                  transition-all
                  duration-300
                  hover:border-red-500/20
                ">
                  <div className="flex min-w-0 items-center gap-3">

                    <div className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/[0.07]
                      bg-[#090909]
                    ">
                      <PackageCheck
                        size={15}
                        className="text-zinc-500 transition group-hover:text-red-400"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-zinc-200">
                        In Stock
                      </p>

                      <p className="mt-0.5 text-[9px] text-zinc-700">
                        Product is currently available.
                      </p>
                    </div>

                  </div>

                  <input
                    type="checkbox"
                    name="inStock"
                    checked={form.inStock}
                    onChange={handleChange}
                    className="h-4 w-4 shrink-0 accent-red-600"
                  />
                </label>

              </div>
            </div>


            {/* =====================================================
                CREATE
            ===================================================== */}

            <div className="rounded-2xl border border-white/[0.08] bg-[#090909] p-4">

              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-700">
                    Product Status
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Ready to create
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span className="text-[8px] uppercase tracking-wider text-green-500">
                    Active
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.99 } : {}}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-red-600
                  py-3.5
                  font-bebas
                  text-lg
                  uppercase
                  tracking-[0.18em]
                  text-white
                  shadow-[0_10px_30px_rgba(220,38,38,.12)]
                  transition-all
                  duration-300
                  hover:bg-red-500
                  hover:shadow-[0_12px_35px_rgba(220,38,38,.18)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating...
                  </>
                ) : (
                  "Create Product"
                )}
              </motion.button>

            </div>

          </div>

        </div>

      </form>
    </div>
  </section>
);
}