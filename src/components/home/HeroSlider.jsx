import { useCallback, useEffect, useRef, useState } from "react";
import HeroOverlay from "./HeroOverlay";
import HeroControls from "./HeroControls";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
const WAIT_FOR_VIDEO_MS = 7000;
const PROGRESS_INTERVAL_MS = 250;

const getPoster = (slide) =>
  slide?.poster || slide?.thumbnail || slide?.thumbnailUrl || slide?.posterUrl || undefined;

export default function HeroSlider() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const waitTimerRef = useRef(null);
  const lastProgressRef = useRef(0);
  const currentRef = useRef(0);
  const slidesRef = useRef([]);
  const visibleRef = useRef(false);
  const pageVisibleRef = useRef(true);

  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible"
  );
  const [buffering, setBuffering] = useState(true);
  const [progress, setProgress] = useState(0);

  const slide = slides[current];
  const shouldPlay = visible && pageVisible && !loading;
  const clearWait = useCallback(() => {
    if (waitTimerRef.current !== null) {
      window.clearTimeout(waitTimerRef.current);
      waitTimerRef.current = null;
    }
  }, []);

  const goTo = useCallback((index) => {
    const total = slidesRef.current.length;
    if (total < 2) return;
    const next = ((index % total) + total) % total;
    currentRef.current = next;
    lastProgressRef.current = 0;
    setProgress(0);
    setBuffering(true);
    setCurrent(next);
  }, []);

  const nextSlide = useCallback(() => {
    if (slidesRef.current.length === 1) {
      const video = videoRef.current;
      if (video) { video.currentTime = 0; video.play()?.catch?.(() => {}); }
      return;
    }
    goTo(currentRef.current + 1);
  }, [goTo]);
  const prevSlide = useCallback(() => goTo(currentRef.current - 1), [goTo]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(`${API_URL}/hero-videos`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Hero API HTTP ${response.status}`);
        const data = await response.json();
        const items = Array.isArray(data.heroVideos)
          ? data.heroVideos.filter((item) => item?.video)
          : [];
        if (controller.signal.aborted) return;
        slidesRef.current = items;
        currentRef.current = 0;
        setSlides(items);
        setCurrent(0);
        setError(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Failed to fetch hero videos:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  visibleRef.current = visible;
  pageVisibleRef.current = pageVisible;

  // One video only. Never wait for the next video before allowing navigation.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!shouldPlay) {
      video.pause();
      clearWait();
      return;
    }
    const tryPlay = () => {
      const promise = video.play();
      promise?.catch?.(() => {}); // Browser autoplay policies may block playback.
    };
    tryPlay();
    return () => video.pause();
  }, [current, shouldPlay, clearWait]);

  // A slow/broken video cannot lock the slider indefinitely.
  useEffect(() => {
    clearWait();
    if (!shouldPlay || !buffering || slides.length < 2) return;
    waitTimerRef.current = window.setTimeout(() => {
      if (visibleRef.current && pageVisibleRef.current) {
        goTo(currentRef.current + 1);
      }
    }, WAIT_FOR_VIDEO_MS);
    return clearWait;
  }, [current, buffering, shouldPlay, slides.length, clearWait, goTo]);

  useEffect(() => () => clearWait(), [clearWait]);

  const handleTimeUpdate = useCallback((event) => {
    const video = event.currentTarget;
    const now = performance.now();
    if (now - lastProgressRef.current < PROGRESS_INTERVAL_MS && video.currentTime < video.duration) return;
    lastProgressRef.current = now;
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setProgress(Math.min(1, Math.max(0, video.currentTime / video.duration)));
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full min-w-0 max-w-[720px]"
      style={{ maxInlineSize: "min(100%, 720px)" }}
    >
      {/* Ambient glow stays decorative and cannot affect document width. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] h-[45%] w-[65%] -translate-x-1/2 rounded-full bg-red-600/[0.025] blur-[30px]"
      />

      <div className="relative isolate aspect-[16/9] w-full min-w-0 overflow-hidden rounded-[18px] border border-white/[0.075] bg-[#070707] shadow-[0_14px_40px_rgba(0,0,0,.28)] sm:rounded-[20px]">
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.025] via-transparent to-red-500/[0.02]" />
        )}

        {slide && (
          <>
            {getPoster(slide) && (
              <img
                src={getPoster(slide)}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                decoding="async"
              />
            )}
            <video
              key={slide._id || slide.id || slide.video || current}
              ref={videoRef}
              src={slide.video}
              poster={getPoster(slide)}
              muted
              playsInline
              preload="metadata"
              controls={false}
              disablePictureInPicture
              onLoadedData={() => setBuffering(false)}
              onCanPlay={() => setBuffering(false)}
              onPlaying={() => setBuffering(false)}
              onWaiting={() => setBuffering(true)}
              onStalled={() => setBuffering(true)}
              onEnded={nextSlide}
              onError={() => setBuffering(true)}
              onTimeUpdate={handleTimeUpdate}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
              style={{ opacity: buffering && getPoster(slide) ? 0 : 1 }}
            />
          </>
        )}

        {!loading && !slide && (
          <div className="absolute inset-0 flex items-center justify-center text-[11px] text-zinc-500">
            {error ? "Unable to load videos" : "No videos available"}
          </div>
        )}

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/25 to-black/[0.02]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[18px] ring-1 ring-inset ring-white/[0.035] sm:rounded-[20px]" />
      </div>

      {slide && (
        <div className="relative z-30 mx-auto -mt-10 w-[88%] min-w-0 max-w-full sm:-mt-14 sm:w-[84%] lg:-mt-16 lg:w-[78%]">
          <HeroOverlay slide={slide} progress={progress} paused={!shouldPlay || buffering} />
          <HeroControls
            current={current}
            total={slides.length}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            disabled={false}
          />
        </div>
      )}
    </section>
  );
}
