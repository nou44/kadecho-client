
import { memo } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 9,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function HeroOverlay({
  slide,
  progressKey = 0,
  duration = 5000,
  paused = false,
}) {
  const reduceMotion = useReducedMotion();

  if (!slide) return null;

  const slideId =
    slide._id || slide.id || slide.video || "hero-slide";

  const motionDuration = reduceMotion ? 0 : 0.42;

  return (
    <div className="relative w-full">
      {/* ==========================================
          BADGE
      ========================================== */}
      {slide.badge && (
        <motion.div
          key={`badge-${slideId}`}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 6 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: motionDuration,
            ease: EASE,
          }}
          className="
            absolute
            left-3
            -top-4
            z-40

            inline-flex
            items-center
            gap-1.5

            max-w-[calc(100%-24px)]
            overflow-hidden

            rounded-full
            border border-red-500/20
            bg-[#080808]/95

            px-2.5
            py-1

            text-[8px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-red-400

            whitespace-nowrap
            shadow-[0_5px_18px_rgba(0,0,0,.3)]

            sm:left-4
            sm:gap-2
            sm:px-3
            sm:text-[9px]
            sm:tracking-[0.2em]
          "
        >
          <span
            aria-hidden="true"
            className="
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-red-500
              shadow-[0_0_8px_rgba(239,68,68,.45)]
            "
          />

          <span className="truncate">{slide.badge}</span>
        </motion.div>
      )}

      {/* ==========================================
          MAIN CARD
      ========================================== */}
      <motion.div
        key={`card-${slideId}`}
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 9 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: motionDuration,
          ease: EASE,
        }}
        className="
          relative
          w-full
          overflow-hidden

          rounded-[15px]
          sm:rounded-[17px]

          border border-white/[0.08]
          bg-[#080808]/95

          px-3.5
          py-3.5

          shadow-[0_12px_35px_rgba(0,0,0,.42)]

          sm:px-4
          sm:py-4
        "
      >
        {/* TOP RED LINE */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-4
            right-4
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-red-500/70
            to-transparent
          "
        />

        {/* CONTENT */}
        <motion.div
          key={`content-${slideId}`}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          transition={{
            staggerChildren: reduceMotion ? 0 : 0.055,
            delayChildren: reduceMotion ? 0 : 0.06,
          }}
          className="relative"
        >
          {/* RED ACCENT */}
          <motion.div
            variants={contentVariants}
            transition={{
              duration: motionDuration,
              ease: EASE,
            }}
            className="
              mb-2.5
              h-[2px]
              w-7
              origin-left
              rounded-full
              bg-gradient-to-r
              from-red-500
              to-red-500/10
            "
          />

          {/* TITLE */}
          <motion.h2
            variants={contentVariants}
            transition={{
              duration: motionDuration,
              ease: EASE,
            }}
            className="
              max-w-[95%]

              text-[15px]
              font-black
              leading-[1.05]
              tracking-[-0.02em]
              text-white

              sm:text-[17px]
            "
          >
            {slide.title}
          </motion.h2>

          {/* SUBTITLE */}
          {slide.subtitle && (
            <motion.p
              variants={contentVariants}
              transition={{
                duration: motionDuration,
                ease: EASE,
              }}
              className="
                mt-1.5

                text-[8px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-red-400

                sm:text-[9px]
                sm:tracking-[0.24em]
              "
            >
              {slide.subtitle}
            </motion.p>
          )}

          {/* DESCRIPTION */}
          {slide.description && (
            <motion.p
              variants={contentVariants}
              transition={{
                duration: motionDuration,
                ease: EASE,
              }}
              className="
                mt-2
                max-w-[480px]

                text-[10px]
                leading-[1.6]
                text-zinc-400

                sm:text-[11px]
                sm:leading-[1.65]
              "
            >
              {slide.description}
            </motion.p>
          )}
        </motion.div>

        {/* ======================================
            PROGRESS BAR
        ====================================== */}
        <div
          role="progressbar"
          aria-label="Slide progress"
          aria-valuemin={0}
          aria-valuemax={100}
          className="
            relative
            mt-3

            h-[2px]
            w-full

            overflow-hidden
            rounded-full
            bg-white/[0.07]
          "
        >
          <motion.div
            key={`${slideId}-${progressKey}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? 0 : 1 }}
            transition={{
              duration: reduceMotion ? 0 : duration / 1000,
              ease: "linear",
            }}
            style={{
              transformOrigin: "left",
            }}
            className="
              h-full
              w-full
              rounded-full
              bg-gradient-to-r
              from-red-600
              via-red-500
              to-red-400
            "
          />
        </div>
      </motion.div>
    </div>
  );
}

export default memo(HeroOverlay);
