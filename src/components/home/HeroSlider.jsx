
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useReducedMotion } from "framer-motion";

import HeroOverlay from "./HeroOverlay";
import HeroControls from "./HeroControls";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).replace(/\/$/, "");

const FALLBACK_DURATION = 5000;
const TRANSITION_MS = 350;

const getPoster = (slide) =>
  slide?.poster ||
  slide?.thumbnail ||
  slide?.thumbnailUrl ||
  slide?.posterUrl ||
  undefined;

export default function HeroSlider() {
  const sectionRef = useRef(null);

  const videoRefs = useRef([null, null]);

  const activeSlotRef = useRef(0);
  const currentRef = useRef(0);
  const slidesRef = useRef([]);

  const readyRef = useRef([false, false]);
  const pendingRef = useRef(false);
  const switchingRef = useRef(false);

  const transitionTimerRef = useRef(null);
  const errorTimerRef = useRef(null);

  const [heroSlides, setHeroSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const [slots, setSlots] = useState([
    null,
    null,
  ]);

  const [activeSlot, setActiveSlot] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(
    () =>
      typeof document === "undefined" ||
      document.visibilityState === "visible"
  );

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const [progressKey, setProgressKey] = useState(0);
  const [videoDuration, setVideoDuration] = useState(
    FALLBACK_DURATION
  );

  const reduceMotion = useReducedMotion();

  const canPlay =
    isVisible && isPageVisible && !loading;

  const canPlayRef = useRef(canPlay);

  useEffect(() => {
    canPlayRef.current = canPlay;
  }, [canPlay]);

  const slide = heroSlides[current];

  /* ==========================================
     FETCH VIDEOS
  ========================================== */

  useEffect(() => {
    const controller = new AbortController();

    async function fetchVideos() {
      try {
        const response = await fetch(
          `${API_URL}/hero-videos`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `Hero API: ${response.status}`
          );
        }

        const data = await response.json();

        const videos = Array.isArray(data.heroVideos)
          ? data.heroVideos.filter(
              (item) => item?.video
            )
          : [];

        if (controller.signal.aborted) return;

        slidesRef.current = videos;
        currentRef.current = 0;
        activeSlotRef.current = 0;

        readyRef.current = [false, false];
        pendingRef.current = false;
        switchingRef.current = false;

        setHeroSlides(videos);
        setCurrent(0);

        setSlots([
          videos[0] ? 0 : null,
          videos.length > 1 ? 1 : null,
        ]);

        setError(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(
            "Failed to load hero videos:",
            err
          );
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchVideos();

    return () => controller.abort();
  }, []);

  /* ==========================================
     VISIBILITY
  ========================================== */

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageVisible(
        document.visibilityState === "visible"
      );
    };

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
  }, []);

  /* ==========================================
     PLAY / PAUSE
  ========================================== */

  const playActive = useCallback(() => {
    const video =
      videoRefs.current[activeSlotRef.current];

    if (!video || !canPlayRef.current) return;

    const promise = video.play();
    promise?.catch?.(() => {});
  }, []);

  useEffect(() => {
    const active = activeSlotRef.current;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (canPlay && index === active) {
        const promise = video.play();
        promise?.catch?.(() => {});
      } else {
        video.pause();
      }
    });
  }, [canPlay, activeSlot, slots]);

  /* ==========================================
     PREPARE NEXT VIDEO
  ========================================== */

  const prepareNext = useCallback(
    (nextIndex, slotIndex) => {
      readyRef.current[slotIndex] = false;

      setSlots((previous) => {
        if (previous[slotIndex] === nextIndex) {
          return previous;
        }

        const updated = [...previous];
        updated[slotIndex] = nextIndex;

        return updated;
      });
    },
    []
  );

  /* ==========================================
     SWITCH VIDEO
  ========================================== */

  const switchTo = useCallback(
    (targetIndex) => {
      const total = slidesRef.current.length;

      if (
        total <= 1 ||
        switchingRef.current
      ) {
        return;
      }

      const nextIndex =
        (targetIndex + total) % total;

      if (nextIndex === currentRef.current) {
        return;
      }

      const oldSlot = activeSlotRef.current;
      const nextSlot = 1 - oldSlot;

      const nextVideo =
        videoRefs.current[nextSlot];

      // The next video must be prepared.
      if (
        !nextVideo ||
        !readyRef.current[nextSlot]
      ) {
        pendingRef.current = nextIndex;
        prepareNext(nextIndex, nextSlot);
        return;
      }

      // If a different video was prepared,
      // wait until the requested one is ready.
      const preparedIndex = Number(
        nextVideo.dataset.slideIndex
      );

      if (preparedIndex !== nextIndex) {
        pendingRef.current = nextIndex;
        prepareNext(nextIndex, nextSlot);
        return;
      }

      pendingRef.current = false;
      switchingRef.current = true;

      setIsTransitioning(true);

      window.clearTimeout(
        transitionTimerRef.current
      );
      window.clearTimeout(errorTimerRef.current);

      const oldVideo =
        videoRefs.current[oldSlot];

      oldVideo?.pause();

      try {
        nextVideo.currentTime = 0;
      } catch {
        // Seeking may not be available yet.
      }

      activeSlotRef.current = nextSlot;
      currentRef.current = nextIndex;

      setActiveSlot(nextSlot);
      setCurrent(nextIndex);

      setProgressKey((key) => key + 1);

      const duration = nextVideo.duration;

      setVideoDuration(
        Number.isFinite(duration) &&
          duration > 0
          ? duration * 1000
          : FALLBACK_DURATION
      );

      if (canPlayRef.current) {
        const promise = nextVideo.play();
        promise?.catch?.(() => {});
      }

      transitionTimerRef.current =
        window.setTimeout(() => {
          switchingRef.current = false;
          setIsTransitioning(false);

          const upcomingIndex =
            (nextIndex + 1) % total;

          prepareNext(
            upcomingIndex,
            oldSlot
          );
        }, reduceMotion ? 0 : TRANSITION_MS);
    },
    [prepareNext, reduceMotion]
  );

  const nextSlide = useCallback(() => {
    switchTo(currentRef.current + 1);
  }, [switchTo]);

  const prevSlide = useCallback(() => {
    switchTo(currentRef.current - 1);
  }, [switchTo]);

  /* ==========================================
     VIDEO READY
  ========================================== */

  const handleCanPlay = useCallback(
    (slotIndex, slideIndex) => {
      const video =
        videoRefs.current[slotIndex];

      if (!video) return;

      readyRef.current[slotIndex] = true;

      // Active video is ready.
      if (
        slotIndex === activeSlotRef.current &&
        slideIndex === currentRef.current
      ) {
        playActive();
      }

      // Waiting for a video to buffer.
      if (
        slotIndex !== activeSlotRef.current &&
        pendingRef.current === slideIndex
      ) {
        switchTo(slideIndex);
      }
    },
    [playActive, switchTo]
  );

  /* ==========================================
     VIDEO ENDED
  ========================================== */

  const handleEnded = useCallback(
    (slotIndex) => {
      if (
        slotIndex !== activeSlotRef.current ||
        !canPlayRef.current
      ) {
        return;
      }

      if (slidesRef.current.length === 1) {
        const video =
          videoRefs.current[slotIndex];

        if (video) {
          video.currentTime = 0;
          playActive();
          setProgressKey((key) => key + 1);
        }

        return;
      }

      nextSlide();
    },
    [nextSlide, playActive]
  );

  /* ==========================================
     VIDEO ERROR
  ========================================== */

  const handleError = useCallback(
    (slotIndex, slideIndex) => {
      readyRef.current[slotIndex] = false;

      if (
        slotIndex === activeSlotRef.current &&
        slideIndex === currentRef.current
      ) {
        window.clearTimeout(
          errorTimerRef.current
        );

        errorTimerRef.current =
          window.setTimeout(() => {
            nextSlide();
          }, FALLBACK_DURATION);
      }
    },
    [nextSlide]
  );

  /* ==========================================
     CLEANUP
  ========================================== */

  useEffect(() => {
    return () => {
      window.clearTimeout(
        transitionTimerRef.current
      );

      window.clearTimeout(
        errorTimerRef.current
      );
    };
  }, []);

  /* ==========================================
     RENDER
  ========================================== */

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
        {loading && (
          <div
            className="
              absolute inset-0 animate-pulse
              bg-gradient-to-br
              from-white/[0.025]
              via-transparent
              to-red-500/[0.02]
            "
          />
        )}

        {/* TWO PERSISTENT VIDEO PLAYERS */}
        {!loading &&
          slots.map((slideIndex, slotIndex) => {
            if (slideIndex === null) {
              return null;
            }

            const videoSlide =
              heroSlides[slideIndex];

            if (!videoSlide) return null;

            const isActive =
              activeSlot === slotIndex;

            return (
              <video
                key={slotIndex}
                ref={(element) => {
                  videoRefs.current[slotIndex] =
                    element;
                }}
                data-slide-index={slideIndex}
                src={videoSlide.video}
                poster={getPoster(videoSlide)}
                muted
                playsInline
                preload={
                  isActive ? "auto" : "auto"
                }
                controls={false}
                disablePictureInPicture
                onCanPlay={() =>
                  handleCanPlay(
                    slotIndex,
                    slideIndex
                  )
                }
                onLoadedMetadata={(event) => {
                  if (
                    slotIndex ===
                    activeSlotRef.current
                  ) {
                    const duration =
                      event.currentTarget.duration;

                    if (
                      Number.isFinite(duration) &&
                      duration > 0
                    ) {
                      setVideoDuration(
                        duration * 1000
                      );
                    }
                  }
                }}
                onEnded={() =>
                  handleEnded(slotIndex)
                }
                onError={() =>
                  handleError(
                    slotIndex,
                    slideIndex
                  )
                }
                className={`
                  absolute inset-0
                  h-full w-full
                  object-cover object-center

                  transition-opacity
                  duration-[350ms]
                  ease-out

                  ${
                    isActive
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                  }
                `}
                style={
                  reduceMotion
                    ? { transitionDuration: "0ms" }
                    : undefined
                }
              />
            );
          })}

        {!loading && !slide && (
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
            absolute inset-0 z-20
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
            absolute inset-x-0 top-0 z-20
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
            absolute inset-0 z-20
            rounded-[18px] sm:rounded-[20px]
            ring-1 ring-inset ring-white/[0.035]
          "
        />
      </div>

      {/* ======================================
          OVERLAY — SAME POSITION
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
            paused={
              !canPlay || isTransitioning
            }
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
