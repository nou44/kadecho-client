
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import HeroOverlay from "./HeroOverlay";
import HeroControls from "./HeroControls";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const FALLBACK_DURATION = 5000;
const TRANSITION_DURATION = 0.35;
const EASE = [0.22, 1, 0.36, 1];

export default function HeroSlider() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const currentRef = useRef(0);
  const slidesRef = useRef([]);
  const transitioningRef = useRef(false);
  const fallbackTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);

  const [heroSlides, setHeroSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(
    () =>
      typeof document === "undefined" ||
      document.visibilityState === "visible"
  );

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [videoDuration, setVideoDuration] = useState(
    FALLBACK_DURATION
  );

  const reduceMotion = useReducedMotion();

  const canPlay = isVisible && isPageVisible && !loading;
  const slide = heroSlides[current];

  /* ==========================================
     FETCH HERO VIDEOS
  ========================================== */

  useEffect(() => {
    const controller = new AbortController();

    async function fetchHeroVideos() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`${API_URL}/hero-videos`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Hero API: ${response.status}`);
        }

        const data = await response.json();

        const videos = Array.isArray(data.heroVideos)
          ? data.heroVideos.filter((item) => item?.video)
          : [];

        if (!controller.signal.aborted) {
          slidesRef.current = videos;
          currentRef.current = 0;

          setHeroSlides(videos);
          setCurrent(0);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to load hero videos:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchHeroVideos();

    return () => controller.abort();
  }, []);

  /* ==========================================
     INTERSECTION OBSERVER
  ========================================== */

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* ==========================================
     PAGE VISIBILITY
  ========================================== */

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

  /* ==========================================
     CLEAR TIMERS
  ========================================== */

  const clearTimers = useCallback(() => {
    window.clearTimeout(fallbackTimerRef.current);
    window.clearTimeout(transitionTimerRef.current);
  }, []);

  /* ==========================================
     CHANGE SLIDE
  ========================================== */

  const goToSlide = useCallback(
    (index) => {
      const total = slidesRef.current.length;

      if (total <= 1 || transitioningRef.current) {
        return;
      }

      const nextIndex = (index + total) % total;

      if (nextIndex === currentRef.current) {
        return;
      }

      transitioningRef.current = true;
      setIsTransitioning(true);

      clearTimers();

      currentRef.current = nextIndex;

      setCurrent(nextIndex);
      setVideoDuration(FALLBACK_DURATION);
      setProgressKey((key) => key + 1);

      transitionTimerRef.current = window.setTimeout(
        () => {
          transitioningRef.current = false;
          setIsTransitioning(false);
        },
        reduceMotion ? 0 : TRANSITION_DURATION * 1000
      );
    },
    [clearTimers, reduceMotion]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentRef.current + 1);
  }, [goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentRef.current - 1);
  }, [goToSlide]);

  /* ==========================================
     VIDEO PLAY / PAUSE
  ========================================== */

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (canPlay) {
      const playPromise = video.play();
      playPromise?.catch?.(() => {});
    } else {
      video.pause();
    }
  }, [current, canPlay]);

  /* ==========================================
     VIDEO METADATA
  ========================================== */

  const handleLoadedMetadata = useCallback((event) => {
    const duration = event.currentTarget.duration;

    if (Number.isFinite(duration) && duration > 0) {
      setVideoDuration(duration * 1000);
    }
  }, []);

  /* ==========================================
     VIDEO ENDED
     VIDEO CONTROLS THE SLIDER
  ========================================== */

  const handleVideoEnded = useCallback(() => {
    if (isVisible && isPageVisible) {
      nextSlide();
    }
  }, [isVisible, isPageVisible, nextSlide]);

  /* ==========================================
     FALLBACK TIMER
     ONLY IF VIDEO CANNOT PLAY
  ========================================== */

  const handleVideoError = useCallback(() => {
    if (!canPlay) return;

    window.clearTimeout(fallbackTimerRef.current);

    fallbackTimerRef.current = window.setTimeout(() => {
      nextSlide();
    }, FALLBACK_DURATION);
  }, [canPlay, nextSlide]);

  /* ==========================================
     RESET FALLBACK ON SLIDE CHANGE
  ========================================== */

  useEffect(() => {
    window.clearTimeout(fallbackTimerRef.current);

    return () => {
      window.clearTimeout(fallbackTimerRef.current);
    };
  }, [current]);

  /* ==========================================
     CLEANUP
  ========================================== */

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  /* ==========================================
     POSTER + KEY
  ========================================== */

  const poster = slide
    ? slide.poster ||
      slide.thumbnail ||
      slide.thumbnailUrl ||
      slide.posterUrl ||
      undefined
    : undefined;

  const slideKey = slide
    ? slide._id || slide.id || slide.video
    : "empty";

  return (
    <section
      ref={sectionRef}
      className="
        relative mx-auto w-full max-w-[720px]
        pb-24 sm:pb-28 lg:pb-32
      "
    >
      {/* AMBIENT GLOW */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-[42%]
          h-[42%] w-[65%]
          -translate-x-1/2 rounded-full
          bg-red-600/[0.025] blur-[30px]
        "
      />

      {/* ======================================
          VIDEO FRAME
          ORIGINAL DIMENSIONS PRESERVED
      ====================================== */}
      <div
        className="
          relative z-10
          aspect-[16/9] w-full
          overflow-hidden isolate

          rounded-[18px] sm:rounded-[20px]

          border border-white/[0.075]
          bg-[#070707]

          shadow-[0_14px_40px_rgba(0,0,0,.28)]
        "
      >
        {loading ? (
          <div
            className="
              absolute inset-0
              animate-pulse
              bg-gradient-to-br
              from-white/[0.025]
              via-transparent
              to-red-500/[0.02]
            "
          />
        ) : slide ? (
          <AnimatePresence mode="sync" initial={false}>
            <motion.video
              key={slideKey}
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="metadata"
              poster={poster}
              disablePictureInPicture
              controls={false}

              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              onError={handleVideoError}

              initial={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : TRANSITION_DURATION,
                ease: EASE,
              }}

              className="
                absolute inset-0
                h-full w-full
                object-cover object-center
              "
            >
              <source
                src={slide.video}
                type="video/mp4"
              />
            </motion.video>
          </AnimatePresence>
        ) : (
          <div
            className="
              absolute inset-0
              flex items-center justify-center
              text-[11px] text-zinc-600
            "
          >
            {error
              ? "Unable to load videos"
              : "No videos available"}
          </div>
        )}

        {/* VIDEO GRADIENT */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0

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
            absolute inset-x-0 top-0
            h-px

            bg-gradient-to-r
            from-transparent
            via-white/15
            to-transparent
          "
        />

        {/* BORDER */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            rounded-[18px] sm:rounded-[20px]
            ring-1 ring-inset ring-white/[0.035]
          "
        />
      </div>

      {/* ======================================
          OVERLAY
          ORIGINAL POSITION PRESERVED
      ====================================== */}
      {slide && (
        <div
          className="
            absolute left-1/2 z-20
            top-[56%] w-[88%]
            -translate-x-1/2

            sm:top-[58%] sm:w-[84%]
            lg:top-[60%] lg:w-[78%]
          "
        >
          <HeroOverlay
            slide={slide}
            progressKey={progressKey}
            duration={videoDuration}
            paused={!canPlay || isTransitioning}
          />

          <HeroControls
            current={current}
            total={heroSlides.length}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            disabled={isTransitioning}
          />
        </div>
      )}
    </section>
  );
}
