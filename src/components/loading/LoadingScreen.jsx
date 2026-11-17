
import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
};

function LoadingScreen() {
  const reduceMotion = useReducedMotion();

  return (
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
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_50%_45%,rgba(127,29,29,0.18),transparent_55%)]
          "
        />

        {/* GLOW — POSITION WRAPPER */}
        <div
          className="
            absolute left-1/2 top-[45%]
            -translate-x-1/2 -translate-y-1/2
          "
        >
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.35, 0.7, 0.35],
                    scale: [0.95, 1.08, 0.95],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-[320px] w-[320px]
              rounded-full
              bg-red-600/[0.07]
              blur-[65px]
              sm:h-[420px] sm:w-[420px]
            "
          />
        </div>

        <div
          className="
            absolute -right-32 top-1/4
            h-[280px] w-[280px]
            rounded-full
            bg-red-900/[0.055]
            blur-[90px]
          "
        />

        <div
          className="
            absolute inset-0
            opacity-[0.055]
            [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />

        <div
          className="
            absolute left-1/2 top-0
            h-[40%] w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-transparent via-red-500/15 to-transparent
          "
        />

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
        className="pointer-events-none absolute left-5 top-5 h-9 w-9 border-l border-t border-red-500/40 sm:left-10 sm:top-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 h-9 w-9 border-r border-t border-red-500/40 sm:right-10 sm:top-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-5 h-9 w-9 border-b border-l border-white/15 sm:bottom-10 sm:left-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-5 h-9 w-9 border-b border-r border-white/15 sm:bottom-10 sm:right-10"
      />

      {/* ==========================================
          CENTER CONTENT
      ========================================== */}

      <div
        className="
          absolute inset-0 z-10
          flex items-center justify-center
          px-5
          pb-12 pt-5
          sm:pb-14 sm:pt-6
        "
      >
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="
            flex w-full max-w-[400px]
            flex-col items-center text-center
          "
        >
          {/* ======================================
              LOGO ORBIT
          ====================================== */}

          <motion.div
            variants={itemVariants}
            className="
              relative
              mb-8
              flex h-[166px] w-[166px]
              shrink-0 items-center justify-center

              sm:mb-9
              sm:h-[180px] sm:w-[180px]

              lg:mb-8
              lg:h-[180px] lg:w-[180px]
            "
          >
            {/* OUTER RING */}
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
                absolute inset-0
                rounded-full
                border border-white/[0.07]
                border-t-red-500/60
                border-r-red-500/10
              "
            />

            {/* INNER RING */}
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
                absolute inset-[12px]
                rounded-full
                border border-red-500/15
                border-b-red-500/65
                border-l-white/10
              "
            />

            {/* GLOW HALO */}
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.3, 0.7, 0.3],
                      scale: [0.95, 1.06, 0.95],
                    }
              }
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                h-32 w-32
                rounded-full
                bg-red-600/[0.12]
                blur-[30px]
              "
            />

            {/* LOGO FRAME */}
            <div
              className="
                relative
                flex h-[118px] w-[118px]
                items-center justify-center
                overflow-hidden rounded-full

                border border-white/15

                bg-gradient-to-br
                from-[#181818]
                via-[#0b0b0b]
                to-[#050505]

                shadow-[0_0_30px_rgba(220,38,38,.10),0_18px_40px_rgba(0,0,0,.4)]

                sm:h-[128px] sm:w-[128px]
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-br
                  from-white/[0.07]
                  via-transparent
                  to-red-500/[0.035]
                "
              />

              <img
                src="/kadecho-logo-128.128.webp"
                alt="KadeCho"
                width="128"
                height="128"
                decoding="async"
                fetchPriority="high"
                className="
                  relative z-10
                  h-[104px] w-[104px]
                  object-contain
                  sm:h-[114px] sm:w-[114px]
                "
              />

              {/* SCANNING LIGHT */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ x: "-150%" }}
                  animate={{ x: "250%" }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute inset-y-0
                    left-0 w-10
                    -skew-x-12
                    bg-gradient-to-r
                    from-transparent via-white/[0.09] to-transparent
                  "
                />
              )}
            </div>

            {/* LOGO UNDERLINE */}
            <div
              aria-hidden="true"
              className="
                absolute -bottom-5
                left-1/2 -translate-x-1/2
                h-px w-16
                bg-gradient-to-r
                from-transparent via-red-500 to-transparent
                shadow-[0_0_12px_rgba(239,68,68,.5)]
              "
            />
          </motion.div>

          {/* ======================================
              BRAND
          ====================================== */}

          <motion.div
            variants={itemVariants}
            className="w-full"
          >
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
                mt-3
                flex items-center justify-center
                gap-3
              "
            >
              <span className="h-px w-5 bg-red-500/40" />

              <p
                className="
                  text-[10px]
                  font-medium uppercase
                  tracking-[0.28em]
                  text-zinc-400
                  sm:text-[11px]
                "
              >
                Metal & Furniture
              </p>

              <span className="h-px w-5 bg-red-500/40" />
            </div>
          </motion.div>

          {/* ======================================
              BRAND STATEMENT
          ====================================== */}

          <motion.p
            variants={itemVariants}
            className="
              mt-7
              max-w-xs
              text-[11px]
              leading-relaxed
              tracking-[0.08em]
              text-zinc-500
            "
          >
            Crafted with precision.
            <br />
            Designed to endure.
          </motion.p>

          {/* ======================================
              PROGRESS
          ====================================== */}

          <motion.div
            variants={itemVariants}
            className="
              mt-9
              w-full max-w-[260px]
            "
          >
            <div
              className="
                mb-3
                flex items-center justify-between
                gap-3
                text-[9px]
                font-medium uppercase
                tracking-[0.18em]
                text-zinc-500
              "
            >
              <span>Preparing experience</span>

              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: [0.5, 1, 0.5] }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-red-400"
              >
                K / 01
              </motion.span>
            </div>

            <div
              className="
                relative
                h-[3px] w-full
                overflow-hidden
                rounded-full
                bg-white/10
              "
            >
              <motion.div
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduceMotion ? 0 : 1.4,
                  delay: reduceMotion ? 0 : 0.12,
                  ease: EASE,
                }}
                style={{
                  transformOrigin: "left",
                }}
                className="
                  h-full w-full
                  rounded-full
                  bg-gradient-to-r
                  from-red-700 via-red-500 to-red-300
                "
              />

              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ x: "-100%" }}
                  animate={{ x: "400%" }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
                    absolute inset-y-0 left-0
                    w-12
                    bg-gradient-to-r
                    from-transparent via-white/35 to-transparent
                  "
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ==========================================
          FOOTER — CENTERED
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute inset-x-0 bottom-6 z-20
          px-4 text-center
          text-[9px] uppercase
          tracking-[0.2em]
          text-zinc-600
          sm:bottom-9
        "
      >
        KADECHO — Built for excellence
      </div>
    </div>
  );
}

export default memo(LoadingScreen);
