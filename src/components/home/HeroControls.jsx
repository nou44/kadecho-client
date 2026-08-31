import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HeroControls({
  current,
  total,
  nextSlide,
  prevSlide,
}) {
  return (
    <div
      className="
        mt-3

        flex
        items-center
        justify-between

        px-0.5

        sm:mt-4
        sm:px-1
      "
    >

      {/* =====================================================
          COUNTER
      ===================================================== */}

      <div
        className="
          relative

          flex
          items-center

          rounded-lg

          border
          border-white/[0.08]

          bg-black/70

          px-2.5
          py-1.5

          shadow-[0_5px_16px_rgba(0,0,0,.22)]

          sm:rounded-xl
          sm:px-3
          sm:py-2
        "
      >

        {/* TOP ACCENT */}

        <span
          className="
            pointer-events-none

            absolute
            left-2
            right-2
            top-0

            h-px

            bg-red-500/50
          "
        />

        {/* CURRENT */}

        <motion.span
          key={current}
          initial={{
            opacity: 0,
            y: 3,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            font-bebas

            text-[13px]
            leading-none

            tracking-[0.08em]

            text-red-400

            sm:text-[15px]
          "
        >
          {String(current + 1).padStart(2, "0")}
        </motion.span>

        {/* DIVIDER */}

        <span
          className="
            mx-1.5

            h-3
            w-px

            bg-white/10

            sm:mx-2
            sm:h-3.5
          "
        />

        {/* TOTAL */}

        <span
          className="
            font-bebas

            text-[11px]
            leading-none

            tracking-[0.08em]

            text-zinc-500

            sm:text-[13px]
          "
        >
          {String(total).padStart(2, "0")}
        </span>

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div
        className="
          flex
          items-center

          gap-1.5

          sm:gap-2
        "
      >

        {/* PREVIOUS */}

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"

          className="
            group

            relative

            flex
            h-8
            w-8

            items-center
            justify-center

            rounded-lg

            border
            border-white/[0.08]

            bg-black/70

            text-zinc-400

            shadow-[0_5px_16px_rgba(0,0,0,.20)]

            transition-all
            duration-200

            hover:border-red-500/25
            hover:bg-red-500/[0.06]
            hover:text-white

            active:scale-95

            sm:h-9
            sm:w-9
            sm:rounded-xl
          "
        >
          <ChevronLeft
            size={14}
            strokeWidth={1.8}
            className="
              transition-transform
              duration-200

              group-hover:-translate-x-0.5
            "
          />
        </button>


        {/* NEXT */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"

          className="
            group

            relative

            flex
            h-8
            w-8

            items-center
            justify-center

            rounded-lg

            border
            border-red-500/20

            bg-red-500/[0.08]

            text-red-300

            shadow-[0_5px_18px_rgba(239,68,68,.08)]

            transition-all
            duration-200

            hover:border-red-500/35
            hover:bg-red-500/[0.12]
            hover:text-white

            active:scale-95

            sm:h-9
            sm:w-9
            sm:rounded-xl
          "
        >
          <ChevronRight
            size={14}
            strokeWidth={1.8}
            className="
              transition-transform
              duration-200

              group-hover:translate-x-0.5
            "
          />
        </button>

      </div>
    </div>
  );
}