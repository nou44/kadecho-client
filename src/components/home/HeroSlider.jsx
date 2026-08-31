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
     GET HERO VIDEOS
  ===================================================== */

  useEffect(() => {
    const fetchHeroVideos = async () => {
      try {
        const response = await fetch(
  `${API_URL}/hero-videos`
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch hero videos"
          );
        }

        setHeroSlides(
          Array.isArray(data.heroVideos)
            ? data.heroVideos
            : []
        );
      } catch (error) {
        console.error(
          "❌ Failed to load hero videos:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHeroVideos();
  }, []);

  /* =====================================================
     NEXT
  ===================================================== */

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === heroSlides.length - 1
        ? 0
        : prev + 1
    );
  };

  /* =====================================================
     PREVIOUS
  ===================================================== */

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0
        ? heroSlides.length - 1
        : prev - 1
    );
  };

  /* =====================================================
     AUTO SLIDE
  ===================================================== */

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === heroSlides.length - 1
          ? 0
          : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
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
          max-w-[700px]
          xl:max-w-[720px]

          pb-[100px]
          sm:pb-[110px]
          md:pb-[120px]
          lg:pb-[135px]
        "
      >
        <div
          className="
            h-[255px]
            xs:h-[270px]
            sm:h-[300px]
            md:h-[325px]
            lg:h-[345px]
            xl:h-[365px]

            rounded-[19px]
            sm:rounded-[21px]

            bg-[#070707]

            border
            border-white/[0.08]

            animate-pulse
          "
        />
      </section>
    );
  }

  /* =====================================================
     NO VIDEOS
  ===================================================== */

  if (heroSlides.length === 0) {
    return null;
  }

  const slide = heroSlides[current];

  return (
    <section
      className="
        relative
        mx-auto
        w-full
        max-w-[700px]
        xl:max-w-[720px]

        pb-[100px]
        sm:pb-[110px]
        md:pb-[120px]
        lg:pb-[135px]

        overflow-visible
      "
    >
      {/* =================================================
          VIDEO GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-8

          rounded-[24px]

          bg-red-600/[0.06]

          blur-[45px]
        "
      />

      {/* =================================================
          VIDEO
      ================================================= */}

      <div
        className="
          relative

          h-[255px]
          xs:h-[270px]
          sm:h-[300px]
          md:h-[325px]
          lg:h-[345px]
          xl:h-[365px]

          overflow-hidden

          rounded-[19px]
          sm:rounded-[21px]

          border
          border-white/[0.08]

          bg-[#070707]

          shadow-[0_18px_55px_rgba(0,0,0,.42)]
        "
      >
        <video
          key={slide.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="
            absolute
            inset-0

            h-full
            w-full

            object-cover
            object-center

            scale-[1.025]
          "
        >
          <source
            src={slide.video}
            type="video/mp4"
          />
        </video>

        {/* =================================================
            DARK GRADIENT
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-t
            from-black
            via-black/25
            to-black/5
          "
        />

        {/* =================================================
            VIGNETTE
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,.30)_100%)]
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

            rounded-[19px]
            sm:rounded-[21px]

            ring-1
            ring-inset
            ring-white/[0.045]
          "
        />
      </div>

      {/* =================================================
          OVERLAY
      ================================================= */}

      <div
        className="
          absolute
          left-1/2

          top-[210px]
          xs:top-[225px]
          sm:top-[245px]
          md:top-[270px]
          lg:top-[285px]
          xl:top-[300px]

          z-30

          w-[88%]
          sm:w-[84%]
          lg:w-[78%]

          -translate-x-1/2
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