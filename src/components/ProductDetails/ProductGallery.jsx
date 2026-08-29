import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Expand,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

export default function ProductGallery({ product }) {
  // =========================================================
  // PRODUCT IMAGES
  // =========================================================

  const initialImage =
    product?.image ||
    product?.images?.[0] ||
    "";

  // =========================================================
  // MAIN IMAGE
  // =========================================================

  const [activeImage, setActiveImage] =
    useState(initialImage);

  // =========================================================
  // GALLERY IMAGES
  // =========================================================

  const [galleryImages, setGalleryImages] =
  useState(
    Array.isArray(product?.images)
      ? product.images.slice(1)
      : []
  );

  // =========================================================
  // LIGHTBOX
  // =========================================================

  const [isZoomOpen, setIsZoomOpen] =
    useState(false);

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [zoom, setZoom] = useState(1);

  // =========================================================
  // SYNC PRODUCT
  // =========================================================

  useEffect(() => {
    const nextImage =
      product?.image ||
      product?.images?.[0] ||
      "";

    setActiveImage(nextImage);

    setGalleryImages(
  Array.isArray(product?.images)
    ? product.images.slice(1)
    : []
);

    setIsZoomOpen(false);
    setSelectedIndex(0);
    setZoom(1);
  }, [product]);

  // =========================================================
  // ALL IMAGES
  // =========================================================

 const allImages = [
  ...(activeImage
    ? [activeImage]
    : []),

  ...galleryImages.filter(
    (image) => image && image !== activeImage
  ),
];

  // =========================================================
  // CURRENT INDEX
  // =========================================================

  const currentIndex = Math.max(
    0,
    allImages.indexOf(activeImage)
  );

  // =========================================================
  // ZOOM IMAGE
  // =========================================================

  const zoomImage =
    allImages[selectedIndex] ||
    activeImage ||
    "";

  // =========================================================
  // RESET ZOOM
  // =========================================================

  const resetZoom = () => {
    setZoom(1);
  };

  // =========================================================
  // ZOOM IN
  // =========================================================

  const zoomIn = () => {
    setZoom((current) =>
      Math.min(
        Number((current + 0.25).toFixed(2)),
        3
      )
    );
  };

  // =========================================================
  // ZOOM OUT
  // =========================================================

  const zoomOut = () => {
    setZoom((current) =>
      Math.max(
        Number((current - 0.25).toFixed(2)),
        1
      )
    );
  };

  // =========================================================
  // OPEN LIGHTBOX
  // =========================================================

  const openZoom = (index = currentIndex) => {
    if (!allImages.length) return;

    setSelectedIndex(index);
    setZoom(1);
    setIsZoomOpen(true);
  };

  // =========================================================
  // CLOSE LIGHTBOX
  // =========================================================

  const closeZoom = () => {
    setIsZoomOpen(false);
    setZoom(1);
  };

  // =========================================================
  // PREVIOUS IMAGE
  // =========================================================

  const goToPrevious = () => {
    if (allImages.length <= 1) return;

    setSelectedIndex((current) =>
      current === 0
        ? allImages.length - 1
        : current - 1
    );

    setZoom(1);
  };

  // =========================================================
  // NEXT IMAGE
  // =========================================================

  const goToNext = () => {
    if (allImages.length <= 1) return;

    setSelectedIndex((current) =>
      current === allImages.length - 1
        ? 0
        : current + 1
    );

    setZoom(1);
  };

  // =========================================================
  // MOUSE WHEEL ZOOM
  // =========================================================

  const handleWheelZoom = (event) => {
    event.preventDefault();

    if (event.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  // =========================================================
  // SWAP MAIN <-> THUMBNAIL
  // =========================================================

  const handleImageChange = (clickedImage) => {
    if (
      !clickedImage ||
      clickedImage === activeImage
    ) {
      return;
    }

    setGalleryImages((currentImages) => {
      const newImages = [...currentImages];

      const clickedIndex =
        newImages.indexOf(clickedImage);

      if (clickedIndex === -1) {
        return newImages;
      }

      newImages[clickedIndex] = activeImage;

      return newImages;
    });

    setActiveImage(clickedImage);
  };

  // =========================================================
  // KEYBOARD CONTROLS
  // =========================================================

  useEffect(() => {
    if (!isZoomOpen) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
          closeZoom();
          break;

        case "ArrowLeft":
          goToPrevious();
          break;

        case "ArrowRight":
          goToNext();
          break;

        case "+":
        case "=":
          zoomIn();
          break;

        case "-":
        case "_":
          zoomOut();
          break;

        case "0":
          resetZoom();
          break;

        default:
          break;
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isZoomOpen]);

  // =========================================================
  // LOCK BODY SCROLL
  // =========================================================

  useEffect(() => {
    if (!isZoomOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    const previousTouchAction =
      document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.body.style.touchAction =
        previousTouchAction;
    };
  }, [isZoomOpen]);

  // =========================================================
  // MAIN COMPONENT
  // =========================================================

  return (
    <>
      {/* =====================================================
          GALLERY
      ===================================================== */}

      <div className="flex flex-col gap-3 sm:gap-4">

        {/* ===================================================
            MAIN IMAGE
        =================================================== */}

        <motion.div
          layout
          className="
            group
            relative
            overflow-hidden

            rounded-[22px]
            sm:rounded-[26px]
            lg:rounded-[30px]

            border
            border-white/[0.08]

            bg-[#090909]

            shadow-[0_25px_70px_rgba(0,0,0,.45)]

            h-[280px]
            sm:h-[340px]
            md:h-[390px]
            lg:h-[430px]
            xl:h-[460px]
          "
        >

          {/* =================================================
              TOP RIGHT GLOW
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              z-0

              h-64
              w-64

              rounded-full

              bg-red-500/[0.08]

              blur-[110px]
            "
          />

          {/* =================================================
              BOTTOM LEFT GLOW
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-20
              z-0

              h-48
              w-48

              rounded-full

              bg-red-900/[0.06]

              blur-[100px]
            "
          />

          {/* =================================================
              IMAGE COUNTER
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: -5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              absolute
              left-3
              top-3
              z-30

              flex
              items-center
              gap-2

              rounded-full

              border
              border-white/[0.08]

              bg-black/55

              px-3
              py-1.5

              shadow-lg

              backdrop-blur-xl
            "
          >
            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-red-500

                shadow-[0_0_10px_rgba(239,68,68,.9)]
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.2em]

                text-white/70
              "
            >
              {currentIndex + 1} /{" "}
              {Math.max(allImages.length, 1)}
            </span>
          </motion.div>

          {/* =================================================
              ZOOM BUTTON
          ================================================= */}

          <motion.button
            type="button"
            onClick={() =>
              openZoom(currentIndex)
            }
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 22,
            }}
            className="
              group/zoom

              absolute
              right-3
              top-3
              z-30

              flex
              h-9
              w-9
              sm:h-10
              sm:w-10

              items-center
              justify-center

              rounded-full

              border
              border-white/[0.10]

              bg-black/55

              text-white/80

              opacity-100
              sm:opacity-0
              sm:group-hover:opacity-100

              shadow-[0_8px_25px_rgba(0,0,0,.35)]

              backdrop-blur-xl

              transition-[border-color,background-color,color,box-shadow]
              duration-300

              hover:border-red-500/35
              hover:bg-red-500/10
              hover:text-white

              hover:shadow-[0_8px_30px_rgba(239,68,68,.15)]

              focus:outline-none
              focus:ring-2
              focus:ring-red-500/20
            "
            aria-label="Open image zoom"
          >
            <span
              className="
                pointer-events-none

                absolute
                inset-0

                rounded-full

                bg-red-500/0

                blur-md

                transition-all
                duration-300

                group-hover/zoom:bg-red-500/10
              "
            />

            <motion.span
              className="
                relative
                z-10

                flex
                items-center
                justify-center
              "
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 18,
              }}
            >
              <Expand
                size={15}
                strokeWidth={1.8}
              />
            </motion.span>
          </motion.button>

          {/* =================================================
              MAIN IMAGE
          ================================================= */}

          <AnimatePresence mode="wait">

            {activeImage && (
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={
                  product?.title ||
                  "Product image"
                }

                initial={{
                  opacity: 0,
                  scale: 1.035,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  scale: 0.985,
                }}

                transition={{
                  duration: 0.4,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}

                whileHover={{
                  scale: 1.025,
                }}

                onClick={() =>
                  openZoom(currentIndex)
                }

                draggable={false}

                className="
                  relative
                  z-10

                  h-full
                  w-full

                  select-none

                  object-cover
                  object-center

                  cursor-zoom-in

                  transition-transform
                  duration-700
                "
              />
            )}

          </AnimatePresence>

          {/* =================================================
              CINEMATIC OVERLAY
          ================================================= */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0
              z-20

              bg-gradient-to-t
              from-black/35
              via-transparent
              to-black/10
            "
          />

          {/* =================================================
              SHINE EFFECT
          ================================================= */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0
              z-20

              -translate-x-[130%]

              bg-gradient-to-r
              from-transparent
              via-white/[0.08]
              to-transparent

              transition-transform
              duration-[1200ms]

              group-hover:translate-x-[130%]
            "
          />

          {/* =================================================
              BOTTOM HINT
          ================================================= */}

          <div
            className="
              pointer-events-none

              absolute
              bottom-3
              left-3
              z-30

              hidden
              sm:flex

              items-center
              gap-2

              rounded-full

              border
              border-white/[0.07]

              bg-black/45

              px-3
              py-1.5

              backdrop-blur-xl
            "
          >
            <Maximize2
              size={11}
              className="text-zinc-500"
            />

            <span
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.2em]

                text-zinc-500
              "
            >
              Click to explore
            </span>
          </div>

          {/* =================================================
              RED ACCENT LINE
          ================================================= */}

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "100%",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              absolute
              bottom-0
              left-0
              z-30

              h-[2px]

              bg-gradient-to-r
              from-red-600
              via-red-400
              to-transparent
            "
          />

        </motion.div>

        {/* ===================================================
            THUMBNAILS
        =================================================== */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
          "
        >

          <div
            className="
              grid

              min-w-0
              flex-1

              max-w-[560px]

              grid-cols-4

              gap-2
              sm:gap-3
            "
          >

            {galleryImages.map(
              (image, index) => {
                const isActive =
                  image === activeImage;

                return (
                  <motion.button
                    key={`${image}-${index}`}

                    type="button"

                    whileHover={{
                      y: -2,
                      scale: 1.025,
                    }}

                    whileTap={{
                      scale: 0.96,
                    }}

                    transition={{
                      duration: 0.2,
                    }}

                    onClick={() =>
                      handleImageChange(
                        image
                      )
                    }

                    onDoubleClick={() =>
                      openZoom(index)
                    }

                    className={`
                      group

                      relative
                      overflow-hidden

                      rounded-xl
                      sm:rounded-2xl

                      border

                      bg-[#090909]

                      shadow-sm

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? `
                            border-red-500/60

                            ring-1
                            ring-red-500/30

                            shadow-[0_8px_30px_rgba(239,68,68,.12)]
                          `
                          : `
                            border-white/[0.08]

                            hover:border-white/[0.18]
                          `
                      }
                    `}
                  >

                    {/* IMAGE */}

                    <img
                      src={image}
                      alt={`Gallery ${
                        index + 1
                      }`}

                      draggable={false}

                      className="
                        h-14
                        w-full

                        select-none

                        object-cover

                        transition-transform
                        duration-500

                        group-hover:scale-110

                        sm:h-16
                        md:h-[76px]
                        lg:h-20
                      "
                    />

                    {/* OVERLAY */}

                    <div
                      className={`
                        absolute
                        inset-0

                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "bg-black/[0.02]"
                            : "bg-black/40 group-hover:bg-black/5"
                        }
                      `}
                    />

                    {/* NUMBER */}

                    <span
                      className="
                        absolute
                        bottom-1.5
                        left-1.5

                        text-[7px]
                        font-bold

                        text-white/50
                      "
                    >
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    {/* ACTIVE DOT */}

                    {isActive && (
                      <motion.div
                        layoutId="active-gallery-dot"

                        className="
                          absolute
                          right-1.5
                          top-1.5

                          h-1.5
                          w-1.5

                          rounded-full

                          bg-red-500

                          shadow-[0_0_12px_rgba(239,68,68,.9)]
                        "
                      />
                    )}

                    {/* ACTIVE LINE */}

                    {isActive && (
                      <motion.div
                        layoutId="active-gallery-line"

                        className="
                          absolute
                          bottom-0
                          left-0

                          h-[2px]
                          w-full

                          bg-gradient-to-r
                          from-red-600
                          via-red-400
                          to-red-600
                        "
                      />
                    )}

                  </motion.button>
                );
              }
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          PREMIUM LIGHTBOX
          IMPORTANT:
          Render directly into BODY so Navbar cannot overlap.
      ===================================================== */}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isZoomOpen && (
              <motion.div
                key="product-lightbox"

                initial={{
                  opacity: 0,
                }}

                animate={{
                  opacity: 1,
                }}

                exit={{
                  opacity: 0,
                }}

                transition={{
                  duration: 0.25,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}

                className="
                  fixed
                  inset-0

                  z-[99999]

                  flex
                  items-center
                  justify-center

                  overflow-hidden

                  bg-black/[0.97]

                  p-3
                  sm:p-6
                "

                onMouseDown={(event) => {
                  if (
                    event.target ===
                    event.currentTarget
                  ) {
                    closeZoom();
                  }
                }}
              >

                {/* =========================================
                    TOP BAR
                ========================================= */}

                <div
                  className="
                    absolute

                    left-3
                    right-3
                    top-3

                    z-[100001]

                    flex
                    items-center
                    justify-between

                    sm:left-6
                    sm:right-6
                    sm:top-6
                  "
                >

                  {/* COUNTER */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      duration: 0.35,
                    }}

                    className="
                      flex
                      items-center
                      gap-2

                      rounded-full

                      border
                      border-white/[0.08]

                      bg-black/60

                      px-3
                      py-2

                      shadow-[0_10px_30px_rgba(0,0,0,.35)]

                      backdrop-blur-xl
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5

                        rounded-full

                        bg-red-500

                        shadow-[0_0_12px_rgba(239,68,68,.9)]
                      "
                    />

                    <span
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.2em]

                        text-zinc-400
                      "
                    >
                      {selectedIndex + 1} /{" "}
                      {Math.max(
                        allImages.length,
                        1
                      )}
                    </span>
                  </motion.div>

                  {/* CONTROLS */}

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      sm:gap-2
                    "
                  >

                    {/* ZOOM OUT */}

                    <motion.button
                      type="button"

                      whileHover={{
                        scale: 1.06,
                      }}

                      whileTap={{
                        scale: 0.9,
                      }}

                      onClick={zoomOut}

                      disabled={zoom <= 1}

                      className="
                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/[0.08]

                        bg-black/60

                        text-zinc-400

                        backdrop-blur-xl

                        transition-all
                        duration-300

                        hover:border-white/20
                        hover:bg-white/[0.08]
                        hover:text-white

                        disabled:pointer-events-none
                        disabled:opacity-30
                      "
                      aria-label="Zoom out"
                    >
                      <ZoomOut size={15} />
                    </motion.button>

                    {/* ZOOM VALUE */}

                    <div
                      className="
                        hidden

                        min-w-[52px]

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/[0.08]

                        bg-black/60

                        px-2
                        py-2

                        text-[8px]
                        font-bold

                        tracking-wide

                        text-zinc-400

                        backdrop-blur-xl

                        sm:flex
                      "
                    >
                      {Math.round(
                        zoom * 100
                      )}
                      %
                    </div>

                    {/* ZOOM IN */}

                    <motion.button
                      type="button"

                      whileHover={{
                        scale: 1.06,
                      }}

                      whileTap={{
                        scale: 0.9,
                      }}

                      onClick={zoomIn}

                      disabled={zoom >= 3}

                      className="
                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/[0.08]

                        bg-black/60

                        text-zinc-400

                        backdrop-blur-xl

                        transition-all
                        duration-300

                        hover:border-white/20
                        hover:bg-white/[0.08]
                        hover:text-white

                        disabled:pointer-events-none
                        disabled:opacity-30
                      "
                      aria-label="Zoom in"
                    >
                      <ZoomIn size={15} />
                    </motion.button>

                    {/* RESET */}

                    <motion.button
                      type="button"

                      whileHover={{
                        scale: 1.06,
                        rotate: -6,
                      }}

                      whileTap={{
                        scale: 0.9,
                      }}

                      onClick={resetZoom}

                      className="
                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-white/[0.08]

                        bg-black/60

                        text-zinc-400

                        backdrop-blur-xl

                        transition-all
                        duration-300

                        hover:border-white/20
                        hover:bg-white/[0.08]
                        hover:text-white
                      "
                      aria-label="Reset zoom"
                    >
                      <RotateCcw size={14} />
                    </motion.button>

                    {/* CLOSE */}

                    <motion.button
                      type="button"

                      whileHover={{
                        scale: 1.06,
                        rotate: 90,
                      }}

                      whileTap={{
                        scale: 0.9,
                      }}

                      onClick={closeZoom}

                      className="
                        ml-1

                        flex
                        h-9
                        w-9

                        items-center
                        justify-center

                        rounded-full

                        border
                        border-red-500/20

                        bg-red-500/[0.06]

                        text-zinc-300

                        backdrop-blur-xl

                        transition-all
                        duration-300

                        hover:border-red-500/40
                        hover:bg-red-500/15
                        hover:text-white
                      "
                      aria-label="Close image viewer"
                    >
                      <X size={16} />
                    </motion.button>

                  </div>
                </div>

                {/* =========================================
                    PREVIOUS
                ========================================= */}

                {allImages.length > 1 && (
                  <motion.button
                    type="button"

                    whileHover={{
                      scale: 1.08,
                      x: -3,
                    }}

                    whileTap={{
                      scale: 0.9,
                    }}

                    onClick={goToPrevious}

                    className="
                      absolute

                      left-2
                      top-1/2

                      z-[100001]

                      flex

                      h-10
                      w-10

                      -translate-y-1/2

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/[0.08]

                      bg-black/60

                      text-zinc-400

                      shadow-[0_10px_30px_rgba(0,0,0,.35)]

                      backdrop-blur-xl

                      transition-all
                      duration-300

                      hover:border-white/20
                      hover:bg-white/[0.08]
                      hover:text-white

                      sm:left-6
                      sm:h-12
                      sm:w-12
                    "
                    aria-label="Previous image"
                  >
                    <ChevronLeft
                      size={19}
                    />
                  </motion.button>
                )}

                {/* =========================================
                    IMAGE AREA
                ========================================= */}

                <div
                  className="
                    flex

                    h-full
                    w-full

                    items-center
                    justify-center

                    overflow-hidden

                    pt-16
                    pb-10
                  "

                  onWheel={
                    handleWheelZoom
                  }
                >

                  <AnimatePresence
                    mode="wait"
                  >

                    {zoomImage && (
                      <motion.img
                        key={`${zoomImage}-${selectedIndex}`}

                        src={zoomImage}

                        alt={
                          product?.title ||
                          "Product image"
                        }

                        initial={{
                          opacity: 0,
                          scale: 0.96,
                        }}

                        animate={{
                          opacity: 1,
                          scale: zoom,
                        }}

                        exit={{
                          opacity: 0,
                          scale: 0.96,
                        }}

                        transition={{
                          duration: 0.25,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}

                        drag={zoom > 1}

                        dragConstraints={{
                          top: 160,
                          bottom: 160,
                          left: 160,
                          right: 160,
                        }}

                        dragElastic={0.12}

                        onDoubleClick={() => {
                          if (zoom === 1) {
                            setZoom(2);
                          } else {
                            resetZoom();
                          }
                        }}

                        className={`
                          max-h-full
                          max-w-full

                          select-none

                          rounded-2xl

                          object-contain

                          ${
                            zoom > 1
                              ? "cursor-grab active:cursor-grabbing"
                              : "cursor-zoom-in"
                          }
                        `}

                        draggable={false}
                      />
                    )}

                  </AnimatePresence>

                </div>

                {/* =========================================
                    NEXT
                ========================================= */}

                {allImages.length > 1 && (
                  <motion.button
                    type="button"

                    whileHover={{
                      scale: 1.08,
                      x: 3,
                    }}

                    whileTap={{
                      scale: 0.9,
                    }}

                    onClick={goToNext}

                    className="
                      absolute

                      right-2
                      top-1/2

                      z-[100001]

                      flex

                      h-10
                      w-10

                      -translate-y-1/2

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/[0.08]

                      bg-black/60

                      text-zinc-400

                      shadow-[0_10px_30px_rgba(0,0,0,.35)]

                      backdrop-blur-xl

                      transition-all
                      duration-300

                      hover:border-white/20
                      hover:bg-white/[0.08]
                      hover:text-white

                      sm:right-6
                      sm:h-12
                      sm:w-12
                    "
                    aria-label="Next image"
                  >
                    <ChevronRight
                      size={19}
                    />
                  </motion.button>
                )}

                {/* =========================================
                    BOTTOM HINT
                ========================================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: 0.25,
                    duration: 0.3,
                  }}

                  className="
                    absolute

                    bottom-4
                    left-1/2

                    z-[100001]

                    hidden

                    -translate-x-1/2

                    items-center
                    gap-3

                    rounded-full

                    border
                    border-white/[0.06]

                    bg-black/60

                    px-4
                    py-2

                    text-[7px]

                    font-semibold
                    uppercase

                    tracking-[0.18em]

                    text-zinc-500

                    backdrop-blur-xl

                    sm:flex
                  "
                >
                  <span>
                    Scroll to zoom
                  </span>

                  <span className="text-zinc-800">
                    •
                  </span>

                  <span>
                    Drag to explore
                  </span>

                  <span className="text-zinc-800">
                    •
                  </span>

                  <span>
                    ESC to close
                  </span>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>,

          document.body
        )}
    </>
  );
}