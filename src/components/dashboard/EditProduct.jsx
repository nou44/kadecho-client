
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Upload,
  Trash2,
  Star,
  PackageCheck,
  Package,
  Tag,
  ImagePlus,
  Save,
  Sparkles,
  Check,
} from "lucide-react";
import SuccessMessage from "../ui/SuccessMessage";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/products`;

export default function EditProduct({
  product,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    material: product?.material || "",
    dimensions: product?.dimensions || "",
    finish: product?.finish || "",
    availability: product?.availability || "",
    featured: product?.featured ?? true,
    inStock: product?.inStock ?? true,
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(
    product?.image || ""
  );

const [existingGalleryImages, setExistingGalleryImages] =
  useState(product?.images || []);

const [galleryImages, setGalleryImages] = useState([]);

const [galleryPreviews, setGalleryPreviews] = useState(
  product?.images || []
);

const [removedGalleryImages, setRemovedGalleryImages] =
  useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const mainInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // MAIN IMAGE
  // =====================================================

  const handleMainImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    const preview = URL.createObjectURL(file);

    setMainImage(file);
    setMainPreview(preview);
    setError("");

    e.target.value = "";
  };

  // =====================================================
  // GALLERY
  // =====================================================

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

  const previews = validFiles.map((file) =>
    URL.createObjectURL(file)
  );

  setGalleryImages((prev) => [
    ...prev,
    ...validFiles,
  ]);

  setGalleryPreviews((prev) => [
    ...prev,
    ...previews,
  ]);

  setError("");

  e.target.value = "";
};
  // =====================================================
  // REMOVE GALLERY PREVIEW
  // =====================================================

const removeGalleryImage = (index) => {
  const preview = galleryPreviews[index];

  // ============================================
  // OLD / EXISTING IMAGE
  // ============================================

  const isExistingImage =
    existingGalleryImages.includes(preview);

  if (isExistingImage) {
    setRemovedGalleryImages((prev) => [
      ...prev,
      preview,
    ]);

    setExistingGalleryImages((prev) =>
      prev.filter((image) => image !== preview)
    );
  } else {
    // ============================================
    // NEW IMAGE
    // ============================================

    const newImageIndex =
      galleryPreviews
        .slice(0, index)
        .filter(
          (image) =>
            !existingGalleryImages.includes(image)
        ).length;

    setGalleryImages((prev) =>
      prev.filter((_, i) => i !== newImageIndex)
    );
  }

  // ============================================
  // REMOVE FROM UI
  // ============================================

  setGalleryPreviews((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

  // =====================================================
  // GENERATE SLUG
  // =====================================================

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

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setShowSuccess(false);

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

    if (!form.category.trim()) {
      setError("Product category is required.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // =================================================
      // FIELDS
      // =================================================

      data.append("name", form.name);
      data.append("slug", form.slug);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("material", form.material);

      data.append("dimensions", form.dimensions);
      data.append("finish", form.finish);
      data.append("availability", form.availability);

      data.append("featured", form.featured);
      data.append("inStock", form.inStock);

      // =================================================
      // NEW MAIN IMAGE
      // =================================================

      if (mainImage) {
        data.append("image", mainImage);
      }

      // =================================================
      // NEW GALLERY IMAGES
      // =================================================

      galleryImages.forEach((file) => {
        data.append("images", file);
      });

      // =================================================
// EXISTING GALLERY IMAGES TO KEEP
// =================================================

data.append(
  "existingImages",
  JSON.stringify(existingGalleryImages)
);

      // =================================================
      // PUT
      // =================================================

      const response = await fetch(
        `${API_URL}/${product._id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result?.message ||
            "Failed to update product."
        );
      }

      if (onUpdated) {
        onUpdated(result.product);
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error(
        "❌ Update product error:",
        error
      );

      setError(
        error.message ||
          "Failed to update product."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div
      className="
        fixed inset-0 z-[200]
        flex items-center justify-center
        bg-black/80
        p-2 sm:p-4
        backdrop-blur-xl
      "
    >
      {/* Ambient glow */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.06] blur-[140px]" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
          y: 18,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.97,
          y: 18,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative z-10
          flex
          max-h-[96vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-[26px]
          border border-white/[0.09]
          bg-[#080808]
          shadow-[0_35px_120px_rgba(0,0,0,.8)]
        "
      >
        {/* =================================================
            TOP ACCENT
        ================================================= */}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            absolute left-0 right-0 top-0 z-20
            h-[2px]
            origin-left
            bg-gradient-to-r
            from-red-700
            via-red-400
            to-transparent
          "
        />

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            relative
            flex shrink-0
            items-center justify-between
            border-b border-white/[0.07]
            bg-[#0a0a0a]
            px-4 py-4
            sm:px-6
          "
        >
          <div className="flex min-w-0 items-center gap-3">

            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                border border-red-500/15
                bg-red-500/[0.06]
                text-red-400
              "
            >
              <Package
                size={18}
                strokeWidth={1.7}
              />
            </div>

            <div className="min-w-0">

              <div className="flex items-center gap-2">
                <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-red-400">
                  Dashboard
                </p>

                <span className="h-1 w-1 rounded-full bg-zinc-700" />

                <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-600">
                  Products
                </p>
              </div>

              <h2 className="mt-0.5 truncate font-bebas text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl">
                Edit Product
              </h2>

            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              group
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              border border-white/[0.08]
              bg-white/[0.025]
              text-zinc-500
              transition-all duration-300
              hover:border-red-500/25
              hover:bg-red-500/[0.08]
              hover:text-red-400
            "
          >
            <X
              size={16}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </button>
        </div>

        {/* =================================================
            SCROLL AREA
        ================================================= */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain
            px-3 py-4
            sm:px-5 sm:py-5
          "
        >

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mb-4
                flex items-center gap-3
                rounded-xl
                border border-red-500/20
                bg-red-500/[0.06]
                px-4 py-3
                text-xs text-red-400
              "
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                <X size={13} />
              </div>

              <span>{error}</span>
            </motion.div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.35 }}
              className="
                overflow-hidden
                rounded-2xl
                border border-white/[0.08]
                bg-[#0b0b0b]
              "
            >

              <div
                className="
                  flex items-center justify-between
                  border-b border-white/[0.07]
                  px-4 py-3.5
                  sm:px-5
                "
              >
                <div className="flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] text-zinc-400">
                    <Tag size={15} />
                  </div>

                  <div>
                    <h3 className="font-bebas text-lg uppercase tracking-[0.1em] text-white">
                      Product Information
                    </h3>

                    <p className="text-[9px] text-zinc-600">
                      Core product details
                    </p>
                  </div>

                </div>

                <span className="hidden rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-zinc-600 sm:block">
                  Details
                </span>
              </div>

              <div className="p-4 sm:p-5">

                <div className="grid gap-3 sm:grid-cols-2">

                  {[
                    ["name", "Name", "Iron Moroccan Door"],
                    ["slug", "Slug", "iron-moroccan-door"],
                    ["price", "Price", "2500"],
                    ["category", "Category", "Doors"],
                    ["material", "Material", "Iron"],
                    ["dimensions", "Dimensions", "200 × 90 cm"],
                    ["finish", "Finish", "Matte Black"],
                    [
                      "availability",
                      "Availability",
                      "Available on request",
                    ],
                  ].map(
                    ([
                      name,
                      label,
                      placeholder,
                    ]) => (
                      <div key={name}>

                        <div className="mb-1.5 flex items-center justify-between">

                          <label
                            className="
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.16em]
                              text-zinc-500
                            "
                          >
                            {label}
                          </label>

                          {name === "slug" && (
                            <button
                              type="button"
                              onClick={generateSlug}
                              className="
                                flex items-center gap-1
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-red-400
                                transition
                                hover:text-red-300
                              "
                            >
                              <Sparkles size={10} />
                              Generate
                            </button>
                          )}

                        </div>

                        <input
                          name={name}
                          type={
                            name === "price"
                              ? "number"
                              : "text"
                          }
                          value={form[name]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          className="
                            h-10
                            w-full
                            rounded-xl
                            border border-white/[0.08]
                            bg-black
                            px-3
                            text-xs
                            text-white
                            outline-none
                            placeholder:text-zinc-700
                            transition-all duration-300
                            hover:border-white/[0.13]
                            focus:border-red-500/50
                            focus:bg-[#030303]
                            focus:ring-2
                            focus:ring-red-500/[0.05]
                          "
                        />

                      </div>
                    )
                  )}

                  {/* DESCRIPTION */}

                  <div className="sm:col-span-2">

                    <label className="
                      mb-1.5 block
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-zinc-500
                    ">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Product description..."
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border border-white/[0.08]
                        bg-black
                        px-3
                        py-3
                        text-xs
                        leading-5
                        text-white
                        outline-none
                        placeholder:text-zinc-700
                        transition-all duration-300
                        hover:border-white/[0.13]
                        focus:border-red-500/50
                        focus:bg-[#030303]
                        focus:ring-2
                        focus:ring-red-500/[0.05]
                      "
                    />

                  </div>

                </div>

              </div>
            </motion.section>


            {/* =================================================
                MEDIA GRID
            ================================================= */}

            <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr]">

              {/* =================================================
                  MAIN IMAGE
              ================================================= */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.04,
                }}
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-white/[0.08]
                  bg-[#0b0b0b]
                "
              >

                <div className="
                  flex items-center justify-between
                  border-b border-white/[0.07]
                  px-4 py-3.5
                ">

                  <div className="flex items-center gap-2.5">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/[0.06] text-red-400">
                      <ImagePlus size={15} />
                    </div>

                    <div>
                      <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-300">
                        Main Image
                      </h3>

                      <p className="mt-0.5 text-[8px] text-zinc-600">
                        Featured visual
                      </p>
                    </div>

                  </div>

                  <span className="
                    rounded-full
                    border border-red-500/15
                    bg-red-500/[0.05]
                    px-2 py-1
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-red-400
                  ">
                    Main
                  </span>

                </div>

                <div className="p-3">

                  <div className="
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    border border-white/[0.08]
                    bg-black
                  ">

                    {mainPreview ? (
                      <>
                        <img
                          src={mainPreview}
                          alt="Product main"
                          className="
                            h-[250px]
                            w-full
                            object-cover
                            transition duration-700
                            group-hover:scale-[1.025]
                            sm:h-[280px]
                          "
                        />

                        <div className="
                          pointer-events-none
                          absolute inset-0
                          bg-gradient-to-t
                          from-black/70
                          via-transparent
                          to-black/10
                        " />

                        <div className="
                          absolute
                          bottom-3 left-3
                          flex items-center gap-2
                          rounded-full
                          border border-white/10
                          bg-black/70
                          px-3 py-1.5
                          backdrop-blur-xl
                        ">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          <span className="
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-white
                          ">
                            Current image
                          </span>
                        </div>

                        <div className="
                          absolute
                          right-3 top-3
                          flex gap-2
                        ">

                          <button
                            type="button"
                            onClick={() =>
                              mainInputRef.current?.click()
                            }
                            className="
                              flex items-center gap-2
                              rounded-lg
                              border border-white/10
                              bg-black/75
                              px-3 py-2
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.12em]
                              text-white
                              backdrop-blur-xl
                              transition
                              hover:border-red-500/30
                              hover:bg-red-600
                            "
                          >
                            <Upload size={12} />
                            Replace
                          </button>

                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          mainInputRef.current?.click()
                        }
                        className="
                          group
                          flex
                          h-[250px]
                          w-full
                          flex-col
                          items-center
                          justify-center
                          sm:h-[280px]
                        "
                      >
                        <div className="
                          mb-3
                          flex h-12 w-12
                          items-center justify-center
                          rounded-xl
                          border border-white/[0.08]
                          bg-white/[0.02]
                          transition
                          group-hover:border-red-500/20
                          group-hover:bg-red-500/[0.05]
                        ">
                          <ImagePlus
                            size={21}
                            className="text-zinc-600 transition group-hover:text-red-400"
                          />
                        </div>

                        <span className="text-xs text-zinc-300">
                          Add main image
                        </span>

                        <span className="mt-1 text-[9px] text-zinc-600">
                          PNG, JPG or WEBP
                        </span>
                      </button>
                    )}

                  </div>

                  <input
                    ref={mainInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleMainImage}
                    className="hidden"
                  />

                </div>

              </motion.section>


              {/* =================================================
                  GALLERY
              ================================================= */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.08,
                }}
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-white/[0.08]
                  bg-[#0b0b0b]
                "
              >

                <div className="
                  flex items-center justify-between
                  border-b border-white/[0.07]
                  px-4 py-3.5
                ">

                  <div>
                    <h3 className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-zinc-300
                    ">
                      Gallery
                    </h3>

                    <p className="mt-0.5 text-[8px] text-zinc-600">
                      Existing + new images
                    </p>
                  </div>

                  <div className="
                    flex items-center gap-2
                  ">
                    {galleryImages.length > 0 && (
                      <span className="
                        rounded-full
                        border border-red-500/15
                        bg-red-500/[0.05]
                        px-2 py-1
                        text-[8px]
                        text-red-400
                      ">
                        +{galleryImages.length} new
                      </span>
                    )}

                    <span className="
                      rounded-full
                      border border-white/[0.07]
                      bg-black
                      px-2.5 py-1
                      text-[8px]
                      font-semibold
                      text-zinc-500
                    ">
                      {galleryPreviews.length}
                    </span>
                  </div>

                </div>

                <div className="p-3">

                  {galleryPreviews.length > 0 ? (
                    <div className="
                      mb-3
                      grid
                      grid-cols-3
                      gap-2
                      sm:grid-cols-4
                    ">

                      {galleryPreviews.map(
                        (preview, index) => (
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
                              duration: 0.22,
                            }}
                            className="
                              group
                              relative
                              aspect-square
                              overflow-hidden
                              rounded-xl
                              border border-white/[0.08]
                              bg-black
                            "
                          >

                            <img
                              src={preview}
                              alt={`Product gallery ${index + 1}`}
                              className="
                                h-full w-full
                                object-cover
                                transition duration-500
                                group-hover:scale-110
                              "
                            />

                            <div className="
                              absolute inset-0
                              bg-black/10
                              transition
                              group-hover:bg-black/30
                            " />

                            <span className="
                              absolute left-1.5 top-1.5
                              rounded-md
                              border border-white/10
                              bg-black/75
                              px-1.5 py-0.5
                              text-[7px]
                              font-semibold
                              text-white
                            ">
                              {index + 1}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                removeGalleryImage(index)
                              }
                              className="
                                absolute
                                right-1.5 top-1.5
                                flex h-6 w-6
                                items-center justify-center
                                rounded-lg
                                border border-white/10
                                bg-black/80
                                text-white
                                opacity-0
                                backdrop-blur
                                transition
                                group-hover:opacity-100
                                hover:border-red-500/30
                                hover:bg-red-600
                              "
                            >
                              <Trash2 size={10} />
                            </button>

                          </motion.div>
                        )
                      )}

                    </div>
                  ) : (
                    <div className="
                      mb-3
                      flex min-h-[120px]
                      items-center justify-center
                      rounded-xl
                      border border-dashed
                      border-white/[0.08]
                      bg-black
                    ">
                      <div className="text-center">
                        <ImagePlus
                          size={20}
                          className="mx-auto mb-2 text-zinc-700"
                        />

                        <p className="text-[10px] text-zinc-600">
                          No gallery images
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      galleryInputRef.current?.click()
                    }
                    className="
                      group
                      flex
                      min-h-[76px]
                      w-full
                      flex-col
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-dashed
                      border-white/[0.09]
                      bg-black
                      transition-all duration-300
                      hover:border-red-500/35
                      hover:bg-red-500/[0.02]
                    "
                  >

                    <div className="
                      mb-1.5
                      flex h-7 w-7
                      items-center justify-center
                      rounded-lg
                      border border-white/[0.07]
                      bg-white/[0.02]
                      transition
                      group-hover:border-red-500/20
                      group-hover:bg-red-500/[0.05]
                    ">
                      <Upload
                        size={13}
                        className="text-zinc-600 transition group-hover:text-red-400"
                      />
                    </div>

                    <span className="text-[10px] text-zinc-300">
                      Add gallery images
                    </span>

                    <span className="mt-0.5 text-[8px] text-zinc-600">
                      Select multiple
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

              </motion.section>

            </div>


            {/* =================================================
                SETTINGS
            ================================================= */}

            <motion.section
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                delay: 0.12,
              }}
              className="
                rounded-2xl
                border border-white/[0.08]
                bg-[#0b0b0b]
                p-3
                sm:p-4
              "
            >

              <div className="
                mb-3
                flex items-center gap-2
              ">
                <div className="
                  flex h-7 w-7
                  items-center justify-center
                  rounded-lg
                  bg-white/[0.03]
                  text-zinc-500
                ">
                  <PackageCheck size={14} />
                </div>

                <div>
                  <h3 className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-zinc-300
                  ">
                    Product Settings
                  </h3>

                  <p className="text-[8px] text-zinc-600">
                    Control product visibility
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">

                {/* FEATURED */}

                <label
                  className={`
                    group
                    flex cursor-pointer items-center gap-3
                    rounded-xl
                    border
                    p-3
                    transition-all duration-300
                    ${
                      form.featured
                        ? "border-red-500/20 bg-red-500/[0.05]"
                        : "border-white/[0.07] bg-black"
                    }
                  `}
                >
                  <div className="
                    relative flex h-8 w-8
                    shrink-0
                    items-center justify-center
                    rounded-lg
                    border border-white/[0.07]
                    bg-black
                  ">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="
                        peer
                        absolute inset-0
                        cursor-pointer
                        opacity-0
                      "
                    />

                    <Star
                      size={14}
                      className={`
                        transition
                        ${
                          form.featured
                            ? "fill-red-500 text-red-500"
                            : "text-zinc-600"
                        }
                      `}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-zinc-200">
                        Featured
                      </span>

                      {form.featured && (
                        <span className="
                          rounded-full
                          bg-red-500/10
                          px-1.5 py-0.5
                          text-[7px]
                          uppercase
                          tracking-wider
                          text-red-400
                        ">
                          Active
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-[8px] text-zinc-600">
                      Show as featured product.
                    </p>
                  </div>

                  <div className="
                    ml-auto
                    flex h-5 w-5
                    items-center justify-center
                    rounded-full
                    border border-white/10
                  ">
                    {form.featured && (
                      <Check
                        size={11}
                        className="text-red-400"
                      />
                    )}
                  </div>
                </label>


                {/* IN STOCK */}

                <label
                  className={`
                    group
                    flex cursor-pointer items-center gap-3
                    rounded-xl
                    border
                    p-3
                    transition-all duration-300
                    ${
                      form.inStock
                        ? "border-emerald-500/15 bg-emerald-500/[0.035]"
                        : "border-white/[0.07] bg-black"
                    }
                  `}
                >
                  <div className="
                    relative flex h-8 w-8
                    shrink-0
                    items-center justify-center
                    rounded-lg
                    border border-white/[0.07]
                    bg-black
                  ">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={form.inStock}
                      onChange={handleChange}
                      className="
                        absolute inset-0
                        cursor-pointer
                        opacity-0
                      "
                    />

                    <PackageCheck
                      size={14}
                      className={
                        form.inStock
                          ? "text-emerald-400"
                          : "text-zinc-600"
                      }
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-zinc-200">
                        In Stock
                      </span>

                      {form.inStock && (
                        <span className="
                          rounded-full
                          bg-emerald-500/10
                          px-1.5 py-0.5
                          text-[7px]
                          uppercase
                          tracking-wider
                          text-emerald-400
                        ">
                          Available
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-[8px] text-zinc-600">
                      Product is currently available.
                    </p>
                  </div>

                  <div className="
                    ml-auto
                    flex h-5 w-5
                    items-center justify-center
                    rounded-full
                    border border-white/10
                  ">
                    {form.inStock && (
                      <Check
                        size={11}
                        className="text-emerald-400"
                      />
                    )}
                  </div>
                </label>

              </div>

            </motion.section>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="
              sticky
              bottom-0
              z-10
              -mx-3
              border-t
              border-white/[0.06]
              bg-[#080808]/95
              px-3
              pt-3
              backdrop-blur-xl
              sm:-mx-5
              sm:px-5
            ">

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="
                    h-11
                    rounded-xl
                    border border-white/[0.08]
                    bg-white/[0.025]
                    px-5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-zinc-400
                    transition-all duration-300
                    hover:border-white/[0.15]
                    hover:bg-white/[0.05]
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Cancel
                </button>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={
                    !loading
                      ? { y: -1 }
                      : {}
                  }
                  whileTap={
                    !loading
                      ? { scale: 0.99 }
                      : {}
                  }
                  className="
                    group
                    flex h-11
                    flex-1
                    items-center
                    justify-center
                    gap-2.5
                    rounded-xl
                    border border-red-500/20
                    bg-red-600
                    px-5
                    font-bebas
                    text-base
                    uppercase
                    tracking-[0.16em]
                    text-white
                    shadow-[0_10px_35px_rgba(239,68,68,.08)]
                    transition-all duration-300
                    hover:border-red-400/30
                    hover:bg-red-500
                    hover:shadow-[0_12px_40px_rgba(239,68,68,.16)]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  {loading ? (
                    <>
                      <span className="
                        h-4 w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      " />

                      Updating...
                    </>
                  ) : (
                    <>
                      <Save
                        size={15}
                        className="
                          transition-transform duration-300
                          group-hover:-translate-y-0.5
                        "
                      />

                      Save Changes
                    </>
                  )}

                </motion.button>

              </div>

              <p className="
                pb-1 pt-2
                text-center
                text-[7px]
                uppercase
                tracking-[0.2em]
                text-zinc-700
              ">
                KADECHO PRODUCT MANAGEMENT
              </p>

            </div>

          </form>
        </div>

      </motion.div>

      <SuccessMessage
        show={showSuccess}
        title="Product Updated"
        message="The product has been successfully updated."
      />
    </div>
  );
}

