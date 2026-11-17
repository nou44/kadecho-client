
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

const TRANSITION_MS = 350;
const PREPARE_TIMEOUT_MS = 3500;
const STALL_TIMEOUT_MS = 3000;

const getPoster = (slide) =>
  slide?.poster ||
  slide?.thumbnail ||
  slide?.thumbnailUrl ||
  slide?.posterUrl ||
  undefined;

const getVideoUrl = (slide) =>
  slide?.video || "";

const wrap = (index, total) =>
  ((index % total) + total) % total;

export default function HeroSlider() {
  const sectionRef = useRef(null);
  const videoRefs = useRef([null, null]);

  const slidesRef = useRef([]);
  const slotsRef = useRef([null, null]);

  const currentRef = useRef(0);
  const activeSlotRef = useRef(0);

  const pendingRef = useRef(null);
  const switchingRef = useRef(false);
  const readyRef = useRef([false, false]);

  const transitionTimer = useRef(null);
  const prepareTimer = useRef(null);
  const stallTimer = useRef(null);

  const canPlayRef = useRef(false);

  const [slides, setSlides] = useState([]);
  const [slots, setSlots] = useState([null, null]);

  const [current, setCurrent] = useState(0);
  const [activeSlot, setActiveSlot] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    () =>
      typeof document === "undefined" ||
      document.visibilityState === "visible"
  );

  const [transitioning, setTransitioning] =
    useState(false);

  const [buffering, setBuffering] = useState(false);
  const [progress, setProgress] = useState(0);

  const reduceMotion = useReducedMotion();

  const canPlay = visible && pageVisible && !loading;
  canPlayRef.current = canPlay;

  const slide = slides[current];

  const clearPrepareTimer = useCallback(() => {
    window.clearTimeout(prepareTimer.current);
    prepareTimer.current = null;
  }, []);

  const clearStallTimer = useCallback(() => {
    window.clearTimeout(stallTimer.current);
    stallTimer.current = null;
  }, []);

  const play = useCallback((video) => {
    if (!video || !canPlayRef.current) return;

    const promise = video.play();

    promise?.catch?.(() => {
      // Autoplay can be restricted by the browser.
    });
  }, []);

  const restartCurrent = useCallback(() => {
    const video =
      videoRefs.current[activeSlotRef.current];

    if (!video || !canPlayRef.current) return;

    try {
      video.currentTime = 0;
    } catch {
      // Seek may be unavailable before metadata.
    }

    setProgress(0);
    play(video);
  }, [play]);

  // ------------------------------------------
  // LOAD SLIDES
  // ------------------------------------------

  useEffect(() => {
    const controller = new AbortController();

    async function loadSlides() {
      try {
        const response = await fetch(
          `${API_URL}/hero-videos`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(
            `Hero videos HTTP ${response.status}`
          );
        }

        const data = await response.json();

        const items = Array.isArray(data.heroVideos)
          ? data.heroVideos.filter(
              (item) => getVideoUrl(item)
            )
          : [];

        if (controller.signal.aborted) return;

        slidesRef.current = items;

        const initialSlots = [
          items.length ? 0 : null,
          items.length > 1 ? 1 : null,
        ];

        slotsRef.current = initialSlots;
        currentRef.current = 0;
        activeSlotRef.current = 0;

        readyRef.current = [false, false];
        pendingRef.current = null;
        switchingRef.current = false;

        setSlides(items);
        setSlots(initialSlots);

        setCurrent(0);
        setActiveSlot(0);
        setProgress(0);
        setError(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Hero videos:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadSlides();

    return () => controller.abort();
  }, []);

  // ------------------------------------------
  // VISIBILITY
  // ------------------------------------------

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      setPageVisible(
        document.visibilityState === "visible"
      );
    };

    document.addEventListener(
      "visibilitychange",
      update
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        update
      );
    };
  }, []);

  // ------------------------------------------
  // PREPARE INACTIVE VIDEO
  // ------------------------------------------

  const prepareVideo = useCallback(
    (index, slotIndex) => {
      if (slotsRef.current[slotIndex] === index) {
        return;
      }

      readyRef.current[slotIndex] = false;

      const updated = [...slotsRef.current];
      updated[slotIndex] = index;

      slotsRef.current = updated;
      setSlots(updated);
    },
    []
  );

  // ------------------------------------------
  // SWITCH ONLY WHEN NEXT FRAME EXISTS
  // ------------------------------------------

  const commitSwitch = useCallback(
    (nextIndex, nextSlot) => {
      if (switchingRef.current) return;

      if (
        slotsRef.current[nextSlot] !== nextIndex
      ) {
        return;
      }

      const nextVideo = videoRefs.current[nextSlot];

      if (
        !nextVideo ||
        nextVideo.readyState <
          HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        return;
      }

      switchingRef.current = true;
      pendingRef.current = null;

      clearPrepareTimer();
      clearStallTimer();

      const previousSlot = activeSlotRef.current;
      const previousVideo =
        videoRefs.current[previousSlot];

      try {
        nextVideo.currentTime = 0;
      } catch {
        // Continue without seeking if unavailable.
      }

      activeSlotRef.current = nextSlot;
      currentRef.current = nextIndex;

      setActiveSlot(nextSlot);
      setCurrent(nextIndex);
      setProgress(0);

      setBuffering(false);
      setTransitioning(true);

      play(nextVideo);

      window.clearTimeout(transitionTimer.current);

      transitionTimer.current = window.setTimeout(
        () => {
          previousVideo?.pause();

          switchingRef.current = false;
          setTransitioning(false);

          const total = slidesRef.current.length;

          if (total > 1) {
            const upcoming = wrap(
              currentRef.current + 1,
              total
            );

            prepareVideo(upcoming, previousSlot);
          }
        },
        reduceMotion ? 0 : TRANSITION_MS
      );
    },
    [
      clearPrepareTimer,
      clearStallTimer,
      play,
      prepareVideo,
      reduceMotion,
    ]
  );

  // ------------------------------------------
  // REQUEST A SLIDE
  // ------------------------------------------

  const requestSlide = useCallback(
    (targetIndex) => {
      const total = slidesRef.current.length;

      if (total <= 1 || switchingRef.current) {
        return;
      }

      const nextIndex = wrap(targetIndex, total);

      if (nextIndex === currentRef.current) {
        return;
      }

      const nextSlot =
        1 - activeSlotRef.current;

      pendingRef.current = nextIndex;

      const nextVideo = videoRefs.current[nextSlot];

      if (
        slotsRef.current[nextSlot] === nextIndex &&
        nextVideo?.readyState >=
          HTMLMediaElement.HAVE_CURRENT_DATA
      ) {
        commitSwitch(nextIndex, nextSlot);
        return;
      }

      prepareVideo(nextIndex, nextSlot);

      clearPrepareTimer();

      prepareTimer.current = window.setTimeout(
        () => {
          if (pendingRef.current !== nextIndex) {
            return;
          }

          const slot =
            1 - activeSlotRef.current;

          const video = videoRefs.current[slot];

          if (
            slotsRef.current[slot] === nextIndex &&
            video?.readyState >=
              HTMLMediaElement.HAVE_CURRENT_DATA
          ) {
            commitSwitch(nextIndex, slot);
            return;
          }

          // No repeated video.load().
          // Keep the current video running.
          // A future loadeddata/canplay can
          // still complete the transition.
          const active =
            videoRefs.current[
              activeSlotRef.current
            ];

          if (active?.ended) {
            restartCurrent();
          }
        },
        PREPARE_TIMEOUT_MS
      );
    },
    [
      clearPrepareTimer,
      commitSwitch,
      prepareVideo,
      restartCurrent,
    ]
  );

  const nextSlide = useCallback(() => {
    requestSlide(currentRef.current + 1);
  }, [requestSlide]);

  const prevSlide = useCallback(() => {
    requestSlide(currentRef.current - 1);
  }, [requestSlide]);

  // ------------------------------------------
  // MEDIA EVENTS
  // ------------------------------------------

  const handleReady = useCallback(
    (slotIndex, slideIndex) => {
      if (
        slotsRef.current[slotIndex] !== slideIndex
      ) {
        return;
      }

      readyRef.current[slotIndex] = true;

      if (
        slotIndex === activeSlotRef.current &&
        slideIndex === currentRef.current
      ) {
        play(videoRefs.current[slotIndex]);
      }

      if (
        slotIndex !== activeSlotRef.current &&
        pendingRef.current === slideIndex
      ) {
        commitSwitch(slideIndex, slotIndex);
      }
    },
    [commitSwitch, play]
  );

  const handleEnded = useCallback(
    (slotIndex) => {
      if (
        slotIndex !== activeSlotRef.current ||
        !canPlayRef.current
      ) {
        return;
      }

      const total = slidesRef.current.length;

      if (total <= 1) {
        restartCurrent();
        return;
      }

      if (pendingRef.current === null) {
        nextSlide();
      }

      // If the next video is not ready,
      // replay the current one rather than
      // freeze on its last frame.
      if (
        activeSlotRef.current === slotIndex &&
        !switchingRef.current
      ) {
        restartCurrent();
      }
    },
    [nextSlide, restartCurrent]
  );

  const handleTimeUpdate = useCallback(
    (slotIndex, video) => {
      if (slotIndex !== activeSlotRef.current) {
        return;
      }

      const duration = video.duration;

      if (
        Number.isFinite(duration) &&
        duration > 0
      ) {
        setProgress(
          Math.min(
            1,
            Math.max(0, video.currentTime / duration)
          )
        );
      }
    },
    []
  );

  const handleWaiting = useCallback(
    (slotIndex) => {
      if (
        slotIndex !== activeSlotRef.current ||
        !canPlayRef.current
      ) {
        return;
      }

      setBuffering(true);
      clearStallTimer();

      stallTimer.current = window.setTimeout(
        () => {
          if (!canPlayRef.current) return;

          const active =
            videoRefs.current[
              activeSlotRef.current
            ];

          if (
            active &&
            active.readyState <
              HTMLMediaElement.HAVE_FUTURE_DATA
          ) {
            nextSlide();
          }
        },
        STALL_TIMEOUT_MS
      );
    },
    [clearStallTimer, nextSlide]
  );

  const handlePlaying = useCallback(
    (slotIndex) => {
      if (slotIndex !== activeSlotRef.current) {
        return;
      }

      clearStallTimer();
      setBuffering(false);
    },
    [clearStallTimer]
  );

  const handleError = useCallback(
    (slotIndex, slideIndex) => {
      if (
        slotsRef.current[slotIndex] !== slideIndex
      ) {
        return;
      }

      readyRef.current[slotIndex] = false;

      if (
        slotIndex === activeSlotRef.current
      ) {
        setBuffering(true);
        nextSlide();
      } else if (
        pendingRef.current === slideIndex
      ) {
        // Stop waiting for a failed candidate.
        pendingRef.current = null;
        clearPrepareTimer();
      }
    },
    [clearPrepareTimer, nextSlide]
  );

  // ------------------------------------------
  // PLAY / PAUSE WITH VISIBILITY
  // ------------------------------------------

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (
        canPlay &&
        index === activeSlotRef.current
      ) {
        play(video);
      } else {
        video.pause();
      }
    });

    if (!canPlay) {
      clearStallTimer();
      setBuffering(false);
    }
  }, [
    canPlay,
    activeSlot,
    slots,
    play,
    clearStallTimer,
  ]);

  // ------------------------------------------
  // CLEANUP
  // ------------------------------------------

  useEffect(() => {
    return () => {
      window.clearTimeout(transitionTimer.current);
      window.clearTimeout(prepareTimer.current);
      window.clearTimeout(stallTimer.current);
    };
  }, []);

  // ------------------------------------------
  // RENDER
  // ------------------------------------------

  return (
    <section
      ref={sectionRef}
      className="
        relative mx-auto w-full max-w-[720px]
      "
    >
      {/* AMBIENT GLOW */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-[20%]
          h-[55%] w-[70%]
          -translate-x-1/2 rounded-full
          bg-red-600/[0.025] blur-[30px]
        "
      />

      {/* VIDEO + OVERLAY ANCHOR */}
      <div className="relative w-full">
        {/* VIDEO FRAME */}
        <div
          className="
            relative z-10 isolate
            aspect-[16/9] w-full
            overflow-hidden
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

          {!loading &&
            slots.map((slideIndex, slotIndex) => {
              if (slideIndex === null) return null;

              const videoSlide = slides[slideIndex];

              if (!videoSlide) return null;

              const isActive =
                activeSlot === slotIndex;

              return (
                <video
                  key={`${slotIndex}-${slideIndex}`}
                  ref={(element) => {
                    videoRefs.current[slotIndex] =
                      element;
                  }}
                  src={getVideoUrl(videoSlide)}
                  poster={getPoster(videoSlide)}
                  muted
                  playsInline
                  preload="auto"
                  controls={false}
                  disablePictureInPicture
                  onLoadedData={() =>
                    handleReady(
                      slotIndex,
                      slideIndex
                    )
                  }
                  onCanPlay={() =>
                    handleReady(
                      slotIndex,
                      slideIndex
                    )
                  }
                  onEnded={() =>
                    handleEnded(slotIndex)
                  }
                  onTimeUpdate={(event) =>
                    handleTimeUpdate(
                      slotIndex,
                      event.currentTarget
                    )
                  }
                  onWaiting={() =>
                    handleWaiting(slotIndex)
                  }
                  onStalled={() =>
                    handleWaiting(slotIndex)
                  }
                  onPlaying={() =>
                    handlePlaying(slotIndex)
                  }
                  onError={() =>
                    handleError(
                      slotIndex,
                      slideIndex
                    )
                  }
                  className={`
                    pointer-events-none
                    absolute inset-0
                    h-full w-full
                    object-cover object-center
                    transition-opacity ease-out
                    ${
                      isActive
                        ? "z-10 opacity-100"
                        : "z-0 opacity-0"
                    }
                  `}
                  style={{
                    transitionDuration: reduceMotion
                      ? "0ms"
                      : `${TRANSITION_MS}ms`,
                  }}
                />
              );
            })}

          {!loading && !slide && (
            <div
              className="
                absolute inset-0 flex
                items-center justify-center
                text-[11px] text-zinc-500
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
              from-black/95 via-black/25
              to-black/[0.02]
            "
          />

          {/* TOP LIGHT */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-x-0 top-0 z-20
              h-px bg-gradient-to-r
              from-transparent via-white/15
              to-transparent
            "
          />

          {/* FRAME BORDER */}
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

        {/* OVERLAY:
            Normal document flow prevents
            overlap with the next section.
            Negative margin creates the
            premium floating-card effect.
        */}
        {slide && (
          <div
            className="
              relative z-30
              mx-auto -mt-[14%]
              w-[88%]
              sm:-mt-[12%] sm:w-[84%]
              lg:-mt-[10%] lg:w-[78%]
            "
          >
            <HeroOverlay
              slide={slide}
              progress={progress}
              paused={!canPlay || buffering}
            />

            <HeroControls
              current={current}
              total={slides.length}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              disabled={transitioning}
            />
          </div>
        )}
      </div>
    </section>
  );
}
