
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1];

export default function AboutHero() {
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Pause video when the section is offscreen or the tab is hidden.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let visible = true;

    const updatePlayback = () => {
      if (visible && !document.hidden && !reduceMotion) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", updatePlayback);
    updatePlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, [reduceMotion]);

  const reveal = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-[#050505]
        min-h-[360px]
        sm:min-h-[400px]
        lg:min-h-[430px]
        xl:min-h-[450px]
      "
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-0
          h-full w-full
          object-cover object-center
        "
      >
        <source src="/vedio4.mp4" type="video/mp4" />
      </video>

      {/* CINEMATIC OVERLAYS */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[1]
          bg-black/65
          sm:bg-black/60
          lg:bg-black/55
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[2]
          bg-gradient-to-r
          from-black/90 via-black/60 to-black/20
        "
      />

      {/* STATIC RED AMBIENCE — NO HEAVY BLUR */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[2]
          bg-[radial-gradient(ellipse_at_15%_55%,rgba(220,38,38,0.09),transparent_55%)]
        "
      />

      {/* ARCHITECTURAL GRID */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[2]
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          [background-size:38px_38px]
        "
      />

      {/* PUZZLE DETAIL — RIGHT SIDE, DESKTOP */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[8%] top-1/2 z-[3]
          hidden -translate-y-1/2
          lg:flex
          items-center justify-center
          opacity-30
        "
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="
            flex h-28 w-28 items-center justify-center
            rounded-[24px]
            border border-red-500/25
            bg-red-500/[0.035]
          "
        >
          <Puzzle
            size={58}
            strokeWidth={0.75}
            className="text-red-400"
          />
        </motion.div>
      </div>

      {/* PUZZLE DETAIL — MOBILE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-14 right-5 z-[3]
          flex items-center justify-center
          opacity-20 lg:hidden
        "
      >
        <Puzzle
          size={48}
          strokeWidth={0.8}
          className="text-red-400"
        />
      </div>

      {/* BOTTOM FADE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0 z-[4]
          h-28 sm:h-32
          bg-gradient-to-t
          from-[#050505] via-[#050505]/70 to-transparent
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          mx-auto flex
          min-h-[360px] max-w-7xl
          items-center
          px-4 py-14
          sm:min-h-[400px] sm:px-6 sm:py-16
          lg:min-h-[430px] lg:px-8 lg:py-20
          xl:min-h-[450px]
        "
      >
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
          className="w-full max-w-3xl"
        >
          {/* BREADCRUMB */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.4, ease: EASE }}
            className="
              mb-4 flex items-center gap-1.5
              text-[9px] font-medium
              uppercase tracking-[0.18em]
              text-zinc-500
            "
          >
            <Link
              to="/"
              className="
                transition-colors duration-200
                hover:text-red-500
              "
            >
              Home
            </Link>

            <ChevronRight size={10} className="text-zinc-700" />

            <span className="text-white">About</span>
          </motion.div>

          {/* BADGE */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.4, ease: EASE }}
            className="
              mb-3 inline-flex w-fit
              items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/[0.08]
              px-3 py-1.5
              text-[9px] font-semibold
              uppercase tracking-[0.24em]
              text-red-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            About KADECHO
          </motion.div>

          {/* TITLE */}
          <motion.h1
            variants={reveal}
            transition={{ duration: 0.55, ease: EASE }}
            className="
              max-w-3xl
              font-bebas uppercase
              leading-[0.88]
              tracking-[0.025em]
              text-[36px]
              sm:text-[46px]
              md:text-[56px]
              lg:text-[66px]
              xl:text-[72px]
            "
          >
            <span className="text-white">Crafting Metal</span>
            <br />
            <span
              className="
                bg-gradient-to-r
                from-red-400 via-red-500 to-orange-400
                bg-clip-text text-transparent
              "
            >
              With Passion
            </span>
          </motion.h1>

          {/* ACCENT */}
          <motion.div
            variants={reveal}
            transition={{ duration: 0.4, ease: EASE }}
            className="
              mt-4 h-[2px] w-[90px]
              rounded-full
              bg-gradient-to-r
              from-red-600 via-red-400 to-transparent
              sm:mt-5
            "
          />

          {/* DESCRIPTION */}
          <motion.p
            variants={reveal}
            transition={{ duration: 0.45, ease: EASE }}
            className="
              mt-3 max-w-xl
              text-[11px] leading-5
              text-zinc-300
              sm:mt-4 sm:text-[12px] sm:leading-6
              lg:text-[14px] lg:leading-7
            "
          >
            Luxury metal furniture, pergolas, staircases,
            doors and custom creations crafted with
            precision and timeless design.
          </motion.p>
        </motion.div>
      </div>

      {/* BOTTOM RED ACCENT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-0 left-0 z-[6]
          h-px w-full
          bg-gradient-to-r
          from-transparent via-red-500/60 to-transparent
        "
      />
    </section>
  );
}
