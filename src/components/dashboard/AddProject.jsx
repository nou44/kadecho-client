import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  UserRound,
  MapPin,
  Package,
  CalendarDays,
  ImagePlus,
  Images,
  Upload,
  Trash2,
  X,
} from "lucide-react";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/projects`;

export default function AddProject() {
  // =========================
  // PROJECT DATA
  // =========================

 const [form, setForm] = useState({
  title: "",
  client: "",
  location: "",
  category: "",
  product: "",
  date: "",
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
  // UI
  // =========================

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const mainInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
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
      e.target.value = "";
      return;
    }

    if (mainPreview) {
      URL.revokeObjectURL(mainPreview);
    }

    const preview = URL.createObjectURL(file);

    setMainImage(file);
    setMainPreview(preview);

    setError("");
    setSuccess("");

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
  // GALLERY
  // =========================

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const validFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (!validFiles.length) {
      setError("Please select valid image files.");
      e.target.value = "";
      return;
    }

    // Max 100 images
    const remainingSlots = 100 - galleryImages.length;

    if (remainingSlots <= 0) {
      setError("Maximum 100 gallery images allowed.");
      e.target.value = "";
      return;
    }

    const filesToAdd = validFiles.slice(0, remainingSlots);

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
    setSuccess("");

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
  // SET GALLERY AS MAIN
  // =========================

  const setGalleryAsMain = (index) => {
    const selectedFile = galleryImages[index];
    const selectedPreview = galleryPreviews[index];

    if (!selectedFile || !selectedPreview) return;

    // If there is already a main image,
    // move it into the gallery.
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
      // No main image:
      // simply remove selected image from gallery.
      setGalleryImages((prev) =>
        prev.filter((_, i) => i !== index)
      );

      setGalleryPreviews((prev) =>
        prev.filter((_, i) => i !== index)
      );
    }

    setMainImage(selectedFile);
    setMainPreview(selectedPreview);

    setError("");
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    if (mainPreview) {
      URL.revokeObjectURL(mainPreview);
    }

    galleryPreviews.forEach((url) => {
      URL.revokeObjectURL(url);
    });

   setForm({
  title: "",
  client: "",
  location: "",
  category: "",
  product: "",
  date: "",
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
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // =========================
    // VALIDATION
    // =========================

  if (!form.title.trim()) {
  setError("Project title is required.");
  return;
}



    if (!form.client.trim()) {
      setError("Client name is required.");
      return;
    }

    if (!form.location.trim()) {
      setError("Project location is required.");
      return;
    }

    if (!form.category.trim()) {
  setError("Project category is required.");
  return;
}

    if (!form.product.trim()) {
      setError("Product / work is required.");
      return;
    }

    if (!form.date) {
      setError("Project date is required.");
      return;
    }

    if (!mainImage) {
      setError("Please select a main project image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // =========================
      // PROJECT FIELDS
      // =========================

   data.append("title", form.title.trim());
data.append("client", form.client.trim());
data.append("location", form.location.trim());
data.append("category", form.category.trim());
data.append("product", form.product.trim());
data.append("date", form.date);

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
            "Failed to create project."
        );
      }

      setSuccess("Project created successfully 🚀");

      resetForm();
    } catch (err) {
      console.error("Create project error:", err);

      setError(
        err.message ||
          "Something went wrong while creating the project."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLEANUP
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
  // UI
  // =========================

 
return (
  <section className="min-h-screen bg-[#050505] px-3 py-6 text-white sm:px-5 lg:px-6">
    <div className="mx-auto w-full max-w-[1400px]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-[#090909] px-5 py-5 sm:px-6 sm:py-6">

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="absolute left-0 top-0 h-[2px] bg-red-500"
        />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-1 font-bebas text-xs uppercase tracking-[0.28em] text-red-500"
            >
              Dashboard / Projects
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="font-bebas text-4xl uppercase tracking-[0.08em] text-white sm:text-5xl"
            >
              Add Project
            </motion.h1>

            <p className="mt-1 max-w-xl text-xs text-zinc-600">
              Create a new project and add its visual content.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-red-400">
              New Project
            </span>
          </div>

        </div>
      </div>


      {/* =====================================================
          MESSAGES
      ===================================================== */}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-400"
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 rounded-xl border border-green-500/20 bg-green-500/[0.05] px-4 py-3 text-sm text-green-400"
        >
          {success}
        </motion.div>
      )}


      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_0.95fr]">


          {/* =====================================================
              LEFT COLUMN
          ===================================================== */}

          <div className="space-y-5">

            {/* PROJECT INFORMATION */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#090909]"
            >

              {/* CARD HEADER */}

              <div className="border-b border-white/[0.07] px-5 py-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/15 bg-red-500/[0.06] text-red-400">
                    <FolderKanban
                      size={17}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <h2 className="font-bebas text-xl uppercase tracking-[0.12em] text-white">
                      Project Information
                    </h2>

                    <p className="mt-0.5 text-[10px] text-zinc-600">
                      Basic project details
                    </p>
                  </div>

                </div>

              </div>


              {/* FIELDS */}

              <div className="p-5">

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* PROJECT NAME */}

                  <div className="sm:col-span-2">

                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Project Name
                    </label>

                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Luxury Moroccan Door Project"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.13]
                        focus:border-red-500/50
                        focus:bg-[#030303]
                        focus:ring-2
                        focus:ring-red-500/[0.06]
                      "
                    />

                  </div>


                  {/* CLIENT */}

                  <div>

                    <label className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      <UserRound size={11} />
                      Client
                    </label>

                    <input
                      name="client"
                      value={form.client}
                      onChange={handleChange}
                      placeholder="Client name"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.13]
                        focus:border-red-500/50
                        focus:ring-2
                        focus:ring-red-500/[0.06]
                      "
                    />

                  </div>


                  {/* LOCATION */}

                  <div>

                    <label className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      <MapPin size={11} />
                      Location
                    </label>

                    <input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Tangier, Morocco"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.13]
                        focus:border-red-500/50
                        focus:ring-2
                        focus:ring-red-500/[0.06]
                      "
                    />

                  </div>


                  {/* CATEGORY */}

                  <div>

                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      Category
                    </label>

                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.13]
                        focus:border-red-500/50
                        focus:ring-2
                        focus:ring-red-500/[0.06]
                      "
                    >
                      <option value="">Select category</option>
                      <option value="Doors">Doors</option>
                      <option value="Staircases">Staircases</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Metal Work">Metal Work</option>
                      <option value="Decor">Decor</option>
                    </select>

                  </div>


                  {/* PRODUCT / WORK */}

                  <div>

                    <label className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      <Package size={11} />
                      Product / Work
                    </label>

                    <input
                      name="product"
                      value={form.product}
                      onChange={handleChange}
                      placeholder="Iron Moroccan Door"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        placeholder:text-zinc-700
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.13]
                        focus:border-red-500/50
                        focus:ring-2
                        focus:ring-red-500/[0.06]
                      "
                    />

                  </div>


                  {/* DATE */}

                  <div className="sm:col-span-2">

                    <label className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      <CalendarDays size={11} />
                      Project Date
                    </label>

                    <input
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border border-white/[0.08]
                        bg-black
                        px-3.5
                        text-xs
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        hover:border-white/[0.13]
                        focus:border-red-500/50
                        focus:ring-2
                        focus:ring-red-500/[0.06]
                      "
                    />

                  </div>

                </div>

              </div>

            </motion.div>


            {/* PROJECT STATUS / INFO */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="rounded-2xl border border-white/10 bg-[#090909] p-5"
            >

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-zinc-500">
                  <Images
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>

                <div>

                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    Visual Content
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-zinc-600">
                    Add a main project image and additional gallery images to showcase the project.
                  </p>

                </div>

              </div>

            </motion.div>

          </div>


          {/* =====================================================
              RIGHT COLUMN
          ===================================================== */}

          <div className="space-y-5">

            {/* MAIN IMAGE */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#090909]"
            >

              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">

                <div>

                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    Main Image
                  </h3>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    Featured project image
                  </p>

                </div>

                {mainImage && (
                  <span className="rounded-full border border-red-500/15 bg-red-500/[0.06] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-red-400">
                    Main
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
                      min-h-[280px]
                      w-full
                      flex-col
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-dashed
                      border-white/[0.10]
                      bg-black
                      transition-all
                      duration-300
                      hover:border-red-500/40
                      hover:bg-red-500/[0.02]
                    "
                  >

                    <div className="
                      mb-4
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.02]
                      transition-all
                      duration-300
                      group-hover:border-red-500/20
                      group-hover:bg-red-500/[0.06]
                    ">

                      <ImagePlus
                        size={25}
                        strokeWidth={1.6}
                        className="text-zinc-600 transition-colors group-hover:text-red-400"
                      />

                    </div>

                    <span className="text-xs font-medium text-zinc-300">
                      Add main image
                    </span>

                    <span className="mt-1.5 text-[10px] text-zinc-600">
                      PNG, JPG or WEBP
                    </span>

                  </button>

                ) : (

                  <div className="group relative overflow-hidden rounded-xl border border-red-500/20 bg-black">

                    <img
                      src={mainPreview}
                      alt="Project main"
                      className="
                        h-[280px]
                        w-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-[1.02]
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

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
                        bg-black/80
                        text-white
                        backdrop-blur
                        transition
                        hover:border-red-500/30
                        hover:bg-red-600
                      "
                    >
                      <X size={14} />
                    </button>

                    <div className="
                      absolute
                      bottom-3
                      left-3
                      rounded-full
                      border
                      border-red-500/20
                      bg-black/80
                      px-3
                      py-1.5
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-red-400
                      backdrop-blur
                    ">
                      Main Project Image
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

            </motion.div>


            {/* GALLERY */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#090909]"
            >

              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">

                <div>

                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    Project Gallery
                  </h3>

                  <p className="mt-1 text-[10px] text-zinc-600">
                    Additional project images
                  </p>

                </div>

                <span className="
                  rounded-full
                  border
                  border-white/10
                  bg-black
                  px-2.5
                  py-1
                  text-[9px]
                  font-semibold
                  text-zinc-500
                ">
                  {galleryImages.length}
                </span>

              </div>


              <div className="p-4">

                {galleryPreviews.length > 0 && (

                  <div className="
                    mb-3
                    grid
                    grid-cols-3
                    gap-2
                    sm:grid-cols-4
                  ">

                    {galleryPreviews.map((preview, index) => (

                      <motion.div
                        key={`${preview}-${index}`}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
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
                          border-white/10
                          bg-black
                        "
                      >

                        <img
                          src={preview}
                          alt={`Project gallery ${index + 1}`}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-110
                          "
                        />

                        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/30" />

                        {/* INDEX */}

                        <span className="
                          absolute
                          left-1.5
                          top-1.5
                          rounded-md
                          border
                          border-white/10
                          bg-black/80
                          px-1.5
                          py-0.5
                          text-[8px]
                          font-medium
                          text-white
                        ">
                          {index + 1}
                        </span>


                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="
                            absolute
                            right-1.5
                            top-1.5
                            flex
                            h-6
                            w-6
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-white/10
                            bg-black/80
                            text-white
                            opacity-0
                            transition
                            group-hover:opacity-100
                            hover:border-red-500/30
                            hover:bg-red-600
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
                            bottom-1.5
                            left-1.5
                            right-1.5
                            rounded-lg
                            border
                            border-white/10
                            bg-black/80
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
                            group-hover:opacity-100
                            hover:border-red-500/30
                            hover:bg-red-600
                          "
                        >
                          Set Main
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
                    min-h-[120px]
                    w-full
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    border-white/[0.10]
                    bg-black
                    transition-all
                    duration-300
                    hover:border-red-500/40
                    hover:bg-red-500/[0.02]
                  "
                >

                  <div className="
                    mb-2.5
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    transition
                    group-hover:border-red-500/20
                    group-hover:bg-red-500/[0.06]
                  ">

                    <Upload
                      size={17}
                      strokeWidth={1.7}
                      className="text-zinc-600 transition-colors group-hover:text-red-400"
                    />

                  </div>

                  <span className="text-xs text-zinc-300">
                    Add gallery images
                  </span>

                  <span className="mt-1 text-[9px] text-zinc-600">
                    Select multiple images
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

            </motion.div>

          </div>

        </div>


        {/* =====================================================
            SUBMIT
        ===================================================== */}

<motion.button
  type="submit"
  disabled={loading}
  whileHover={!loading ? { scale: 1.005 } : {}}
  whileTap={!loading ? { scale: 0.99 } : {}}
  className="
    group
    mt-5
    flex
    w-full
    items-center
    justify-center
    gap-3
    rounded-2xl
    border
    border-red-500/20
    bg-red-600
    py-4
    font-bebas
    text-lg
    uppercase
    tracking-[0.18em]
    text-white
    shadow-[0_10px_40px_rgba(239,68,68,0.08)]
    transition-all
    duration-300
    hover:border-red-400/30
    hover:bg-red-500
    hover:shadow-[0_10px_45px_rgba(239,68,68,0.14)]
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
>
  {loading ? (
    <>
      <span
        className="
          h-5
          w-5
          animate-spin
          rounded-full
          border-2
          border-white/30
          border-t-white
        "
      />
      Creating...
    </>
  ) : (
    <>
      <FolderKanban
        size={18}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      Create Project
    </>
  )}
</motion.button>



      </form>

    </div>
  </section>
);



}