
import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

function HeroControls({
  current = 0,
  total = 0,
  nextSlide,
  prevSlide,
  disabled = false,
}) {
  const reduceMotion = useReducedMotion();

  const isDisabled = disabled || total <= 1;

  const currentLabel = String(current + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  const buttonMotion = reduceMotion
    ? {}
    : {
        whileHover: { y: -2, scale: 1.04 },
        whileTap: { scale: 0.94 },
        transition: {
          type: "spring",
          stiffness: 420,
          damping: 26,
        },
      };

  return (
    <div
      className="
        mt-3
        flex items-center justify-between
        px-0.5
        sm:mt-4 sm:px-1
      "
      aria-label="Hero slider controls"
    >
      {/* ==========================================
          COUNTER — LEFT
      ========================================== */}
      <div
        className="
          relative flex items-center
          overflow-hidden

          rounded-lg
          border border-white/[0.08]
          bg-black/75

          px-2.5 py-1.5
          shadow-[0_5px_16px_rgba(0,0,0,.22)]

          sm:rounded-xl
          sm:px-3 sm:py-2
        "
      >
        {/* TOP ACCENT */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-2 right-2 top-0
            h-px
            bg-gradient-to-r
            from-transparent via-red-500/70 to-transparent
          "
        />

        {/* CURRENT */}
        <motion.span
          key={current}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 5 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.28,
            ease: EASE,
          }}
          className="
            font-bebas
            text-[13px] leading-none
            tracking-[0.08em]
            text-red-400
            sm:text-[15px]
          "
          aria-label={`Current slide ${current + 1}`}
        >
          {currentLabel}
        </motion.span>

        {/* DIVIDER */}
        <span
          aria-hidden="true"
          className="
            mx-1.5 h-3 w-px bg-white/10
            sm:mx-2 sm:h-3.5
          "
        />

        {/* TOTAL */}
        <span
          className="
            font-bebas
            text-[11px] leading-none
            tracking-[0.08em]
            text-zinc-500
            sm:text-[13px]
          "
          aria-label={`${total} slides total`}
        >
          {totalLabel}
        </span>
      </div>

      {/* ==========================================
          NAVIGATION — RIGHT
      ========================================== */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* PREVIOUS */}
        <motion.button
          type="button"
          onClick={prevSlide}
          disabled={isDisabled}
          aria-label="Previous slide"
          {...buttonMotion}
          className="
            group relative flex
            h-9 w-9 items-center justify-center

            rounded-lg
            border border-white/[0.08]
            bg-black/75 text-zinc-400

            shadow-[0_5px_16px_rgba(0,0,0,.20)]

            transition-[background-color,border-color,color]
            duration-200

            hover:border-red-500/25
            hover:bg-red-500/[0.07]
            hover:text-white

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500/60

            disabled:cursor-not-allowed
            disabled:opacity-35

            sm:h-10 sm:w-10
            sm:rounded-xl
          "
        >
          <ChevronLeft
            size={16}
            strokeWidth={1.8}
            className="
              transition-transform duration-200
              group-hover:-translate-x-0.5
              group-disabled:translate-x-0
            "
          />
        </motion.button>

        {/* NEXT */}
        <motion.button
          type="button"
          onClick={nextSlide}
          disabled={isDisabled}
          aria-label="Next slide"
          {...buttonMotion}
          className="
            group relative flex
            h-9 w-9 items-center justify-center

            overflow-hidden
            rounded-lg

            border border-red-500/25
            bg-red-500/[0.10]
            text-red-300

            shadow-[0_5px_18px_rgba(239,68,68,.09)]

            transition-[background-color,border-color,color]
            duration-200

            hover:border-red-500/45
            hover:bg-red-500/[0.16]
            hover:text-white

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500/60

            disabled:cursor-not-allowed
            disabled:opacity-35

            sm:h-10 sm:w-10
            sm:rounded-xl
          "
        >
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-r
              from-transparent via-white/[0.055] to-transparent
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "
          />

          <ChevronRight
            size={16}
            strokeWidth={1.8}
            className="
              relative z-10
              transition-transform duration-200
              group-hover:translate-x-0.5
              group-disabled:translate-x-0
            "
          />
        </motion.button>
      </div>
    </div>
  );
}

export default memo(HeroControls);
