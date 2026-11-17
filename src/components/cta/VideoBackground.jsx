
import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;

    if (!wrapper || !video) return;

    let isVisible = false;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const syncPlayback = () => {
      const shouldPlay =
        isVisible &&
        !document.hidden &&
        !motionQuery.matches;

      if (!shouldPlay) {
        video.pause();
        return;
      }

      const promise = video.play();

      if (promise?.catch) {
        promise.catch(() => {
          // Autoplay can be blocked by the browser.
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.05 }
    );

    observer.observe(wrapper);

    document.addEventListener(
      "visibilitychange",
      syncPlayback
    );

    motionQuery.addEventListener?.(
      "change",
      syncPlayback
    );

    return () => {
      observer.disconnect();

      document.removeEventListener(
        "visibilitychange",
        syncPlayback
      );

      motionQuery.removeEventListener?.(
        "change",
        syncPlayback
      );

      video.pause();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        overflow-hidden
      "
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="
          absolute inset-0
          h-full w-full
          object-cover
          opacity-65
        "
      >
        <source
          src="/vedio1.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
