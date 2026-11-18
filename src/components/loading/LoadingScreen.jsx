
import { memo } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

function LoadingScreen() {
  const reduceMotion = useReducedMotion();

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading KadeCho"
      className="
        fixed inset-0 z-[9999]
        isolate overflow-hidden
        bg-[#050505] text-white
      "
    >
      {/* ==========================================
          CINEMATIC BACKGROUND
      ========================================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 overflow-hidden
        "
      >
        {/* STATIC RED ATMOSPHERE */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_50%_45%,rgba(127,29,29,0.18),transparent_55%)]
          "
        />

        {/* ARCHITECTURAL GRID */}
        <div
          className="
            absolute inset-0
            opacity-[0.055]
            [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />

        {/* VERTICAL LIGHT */}
        <div
          className="
            absolute left-1/2 top-0
            h-[40%] w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-transparent via-red-500/15 to-transparent
          "
        />

        {/* HORIZONTAL LIGHT */}
        <div
          className="
            absolute inset-x-0 top-1/2
            h-px
            bg-gradient-to-r
            from-transparent via-red-500/[0.08] to-transparent
          "
        />
      </div>

      {/* ==========================================
          CORNER DETAILS
      ========================================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-5 top-5
          h-9 w-9
          border-l border-t border-red-500/40
          sm:left-10 sm:top-10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-5 top-5
          h-9 w-9
          border-r border-t border-red-500/40
          sm:right-10 sm:top-10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-5 left-5
          h-9 w-9
          border-b border-l border-white/15
          sm:bottom-10 sm:left-10
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-5 right-5
          h-9 w-9
          border-b border-r border-white/15
          sm:bottom-10 sm:right-10
        "
      />

      {/* ==========================================
          CENTER CONTENT
      ========================================== */}
      <div
        className="
          absolute inset-0 z-10
          grid place-items-center
          px-5 pb-12 pt-5
          sm:pb-14 sm:pt-6
        "
      >
        <div
          className="
            flex w-full max-w-[400px]
            flex-col items-center
            text-center
          "
        >
          {/* ======================================
              LOGO + RED ROTATING RINGS
          ====================================== */}
          <div
            className="
              relative mb-8
              flex h-[166px] w-[166px]
              shrink-0
              items-center justify-center
              sm:mb-9
              sm:h-[180px] sm:w-[180px]
              lg:mb-8
            "
          >
            {/* OUTER RED RING */}
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { rotate: 360 }
              }
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none
                absolute inset-0
                rounded-full
                border border-white/[0.07]
                border-t-red-500/60
                border-r-red-500/10
              "
            />

            {/* INNER RED RING */}
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { rotate: -360 }
              }
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none
                absolute inset-[12px]
                rounded-full
                border border-red-500/15
                border-b-red-500/65
                border-l-white/10
              "
            />

            {/* ORIGINAL LOGO — NO BLACK CSS CIRCLE */}
            <div
              className="
                relative z-10
                flex h-[128px] w-[128px]
                items-center justify-center
              "
            >
              <img
                src="/kadecho-logo-128.128.webp"
                alt="KadeCho"
                width="128"
                height="128"
                decoding="async"
                fetchPriority="high"
                className="
                  h-[118px] w-[118px]
                  object-contain
                  sm:h-[128px] sm:w-[128px]
                "
              />
            </div>

            {/* RED UNDERLINE */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -bottom-5
                left-1/2 -translate-x-1/2
                h-px w-16
                bg-gradient-to-r
                from-transparent
                via-red-500
                to-transparent
              "
            />
          </div>

          {/* ======================================
              BRAND
          ====================================== */}
          <div className="w-full">
            <h2
              className="
                font-bebas
                text-[clamp(3.4rem,12vw,5.2rem)]
                leading-none
                tracking-[0.14em]
                text-white
              "
            >
              KADECHO
            </h2>

            <div
              className="
                mt-3 flex
                items-center justify-center
                gap-3
              "
            >
              <span className="h-px w-5 bg-red-500/40" />

              <p
                className="
                  text-[10px] font-medium
                  uppercase tracking-[0.28em]
                  text-zinc-400
                  sm:text-[11px]
                "
              >
                Metal & Furniture
              </p>

              <span className="h-px w-5 bg-red-500/40" />
            </div>
          </div>

          {/* ======================================
              BRAND STATEMENT
          ====================================== */}
          <p
            className="
              mt-7 max-w-xs
              text-[11px]
              leading-relaxed
              tracking-[0.08em]
              text-zinc-500
            "
          >
            Crafted with precision.
            <br />
            Designed to endure.
          </p>

          {/* ======================================
              PROGRESS
          ====================================== */}
          <div className="mt-9 w-full max-w-[260px]">
            <div
              className="
                mb-3 flex items-center
                justify-between gap-3
                text-[9px] font-medium
                uppercase tracking-[0.18em]
                text-zinc-500
              "
            >
              <span>Preparing experience</span>

              <span className="text-red-400">
                K / 01
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div
              className="
                relative h-[3px] w-full
                overflow-hidden rounded-full
                bg-white/10
              "
            >
              <motion.div
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 1.5,
                  delay: 0,
                  ease: EASE,
                }}
                style={{
                  transformOrigin: "left",
                }}
                className="
                  h-full w-full
                  rounded-full
                  bg-gradient-to-r
                  from-red-700
                  via-red-500
                  to-red-300
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          BOTTOM BRANDING
      ========================================== */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 bottom-6
          z-20 px-4 text-center
          text-[9px] uppercase
          tracking-[0.2em]
          text-zinc-600
          sm:bottom-9
        "
      >
        KADECHO — Built for excellence
      </div>
    </div>,
    document.body
  );
}

export default memo(LoadingScreen);
