import { useEffect, useState } from "react";

import HeroOverlay from "./HeroOverlay";
import HeroControls from "./HeroControls";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function HeroSlider() {
  const [heroSlides, setHeroSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     FETCH HERO VIDEOS
  ===================================================== */

  useEffect(() => {
    let cancelled = false;

    const fetchHeroVideos = async () => {
      try {
        const response = await fetch(
          `${API_URL}/hero-videos`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch hero videos: ${response.status}`
          );
        }

        const data = await response.json();

        if (!cancelled) {
          setHeroSlides(
            Array.isArray(data.heroVideos)
              ? data.heroVideos
              : []
          );
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Failed to load hero videos:",
            error
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchHeroVideos();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =====================================================
     NEXT
  ===================================================== */

  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= heroSlides.length - 1
        ? 0
        : prev + 1
    );
  };

  /* =====================================================
     PREVIOUS
  ===================================================== */

  const prevSlide = () => {
    setCurrent((prev) =>
      prev <= 0
        ? heroSlides.length - 1
        : prev - 1
    );
  };

  /* =====================================================
     AUTO SLIDE
  ===================================================== */

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((prev) =>
        prev >= heroSlides.length - 1
          ? 0
          : prev + 1
      );
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [heroSlides.length]);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section
        className="
          relative
          mx-auto
          w-full
          max-w-[720px]

          pb-24
          sm:pb-28
          lg:pb-32
        "
      >
        <div
          className="
            aspect-[16/9]
            w-full

            overflow-hidden
            rounded-[20px]

            border
            border-white/[0.07]

            bg-[#080808]
          "
        >
          <div
            className="
              h-full
              w-full

              animate-pulse

              bg-white/[0.025]
            "
          />
        </div>
      </section>
    );
  }

  /* =====================================================
     NO VIDEOS
  ===================================================== */

  if (!heroSlides.length) {
    return null;
  }

  const slide = heroSlides[current];

  /*
    Support different backend names.

    Ideally backend sends:
    {
      video: "...",
      poster: "..."
    }

    or:
    {
      video: "...",
      thumbnail: "..."
    }
  */

  const poster =
    slide.poster ||
    slide.thumbnail ||
    slide.thumbnailUrl ||
    slide.posterUrl ||
    undefined;

  return (
    <section
      className="
        relative
        mx-auto
        w-full
        max-w-[720px]

        pb-24
        sm:pb-28
        lg:pb-32
      "
    >
      {/* =================================================
          LIGHT AMBIENCE

          Kept intentionally subtle.
          Avoid heavy blur because video already costs GPU.
      ================================================= */}

      <div
        className="
          pointer-events-none

          absolute
          left-1/2
          top-1/2

          h-[65%]
          w-[75%]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-red-600/[0.035]

          blur-[35px]
        "
      />

      {/* =================================================
          VIDEO CONTAINER
      ================================================= */}

      <div
        className="
          relative
          z-10

          aspect-[16/9]
          w-full

          overflow-hidden

          rounded-[20px]

          border
          border-white/[0.08]

          bg-[#070707]

          shadow-[0_14px_40px_rgba(0,0,0,.32)]

          sm:rounded-[22px]
        "
      >
        {/* =================================================
            VIDEO
        ================================================= */}

        <video
          key={slide.video}
          autoPlay
          muted
          loop
          playsInline

          /*
            Metadata is enough for the first video.
            Browser will still fetch what autoplay requires,
            but we avoid aggressively preloading the entire file.
          */
          preload="metadata"

          poster={poster}

          /*
            Prevent unnecessary rendering work.
          */
          disablePictureInPicture
          controls={false}

          className="
            absolute
            inset-0

            h-full
            w-full

            object-cover
            object-center
          "
        >
          <source
            src={slide.video}
            type="video/mp4"
          />
        </video>

        {/* =================================================
            SIMPLE VIDEO OVERLAY

            One gradient instead of multiple expensive layers.
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            bg-gradient-to-t
            from-black/95
            via-black/20
            to-transparent
          "
        />

        {/* =================================================
            SUBTLE TOP LIGHT
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute
            inset-x-0
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-white/15
            to-transparent
          "
        />

        {/* =================================================
            BORDER
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0

            rounded-[20px]
            sm:rounded-[22px]

            ring-1
            ring-inset
            ring-white/[0.035]
          "
        />
      </div>

      {/* =================================================
          CONTENT OVERLAY
      ================================================= */}

      <div
        className="
          absolute
          left-1/2

          top-[56%]

          z-20

          w-[88%]
          -translate-x-1/2

          sm:top-[58%]
          sm:w-[84%]

          lg:top-[60%]
          lg:w-[78%]
        "
      >
        <HeroOverlay slide={slide} />

        <HeroControls
          current={current}
          total={heroSlides.length}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
      </div>
    </section>
  );
}