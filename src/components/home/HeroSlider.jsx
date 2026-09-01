import {
  useEffect,
  useRef,
  useState,
} from "react";

import HeroOverlay from "./HeroOverlay";
import HeroControls from "./HeroControls";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function HeroSlider() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [heroSlides, setHeroSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] =
    useState(true);

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

        if (cancelled) return;

        const videos = Array.isArray(
          data.heroVideos
        )
          ? data.heroVideos
          : [];

        setHeroSlides(videos);
        setCurrent(0);
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
     INTERSECTION OBSERVER

     Pause everything when hero is outside screen
  ===================================================== */

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =====================================================
     PAGE VISIBILITY

     Stop video when user changes browser tab
  ===================================================== */

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(
        document.visibilityState === "visible"
      );
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  /* =====================================================
     SMART VIDEO PLAY / PAUSE
  ===================================================== */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const shouldPlay =
      isVisible && isPageVisible;

    if (shouldPlay) {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [
    current,
    isVisible,
    isPageVisible,
  ]);

  /* =====================================================
     NEXT
  ===================================================== */

  const nextSlide = () => {
    if (heroSlides.length <= 1) return;

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
    if (heroSlides.length <= 1) return;

    setCurrent((prev) =>
      prev <= 0
        ? heroSlides.length - 1
        : prev - 1
    );
  };

  /* =====================================================
     AUTO SLIDE

     Runs only when hero is actually visible
  ===================================================== */

  useEffect(() => {
    if (
      heroSlides.length <= 1 ||
      !isVisible ||
      !isPageVisible
    ) {
      return;
    }

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
  }, [
    heroSlides.length,
    isVisible,
    isPageVisible,
  ]);

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

            rounded-[18px]
            sm:rounded-[20px]

            border
            border-white/[0.06]

            bg-[#080808]
          "
        >
          <div
            className="
              h-full
              w-full

              animate-pulse

              bg-gradient-to-br
              from-white/[0.025]
              via-transparent
              to-red-500/[0.02]
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

  const poster =
    slide.poster ||
    slide.thumbnail ||
    slide.thumbnailUrl ||
    slide.posterUrl ||
    undefined;

  return (
    <section
      ref={sectionRef}
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
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          left-1/2
          top-[42%]

          h-[42%]
          w-[65%]

          -translate-x-1/2

          rounded-full

          bg-red-600/[0.025]

          blur-[30px]
        "
      />

      {/* =================================================
          VIDEO
      ================================================= */}

      <div
        className="
          relative
          z-10

          aspect-[16/9]
          w-full

          overflow-hidden

          rounded-[18px]
          sm:rounded-[20px]

          border
          border-white/[0.075]

          bg-[#070707]

          shadow-[0_14px_40px_rgba(0,0,0,.28)]

          isolate
        "
      >
        <video
          ref={videoRef}
          key={slide._id || slide.id || slide.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
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

        {/* VIDEO GRADIENT */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            bg-gradient-to-t
            from-black/95
            via-black/25
            to-black/[0.02]
          "
        />

        {/* TOP LIGHT */}

        <div
          aria-hidden="true"
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

        {/* SUBTLE BORDER */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            rounded-[18px]
            sm:rounded-[20px]

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