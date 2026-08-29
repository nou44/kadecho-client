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
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        delay: 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mt-3

        flex
        items-center
        justify-between

        gap-3

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
          group

          relative

          flex
          items-center

          overflow-hidden

          rounded-lg

          border
          border-white/[0.08]

          bg-black/45

          px-2.5
          py-1.5

          backdrop-blur-xl

          shadow-[0_6px_20px_rgba(0,0,0,.22)]

          transition-all
          duration-300

          hover:border-red-500/20

          sm:rounded-xl
          sm:px-3
          sm:py-2
        "
      >

        {/* top accent */}

        <span
          className="
            absolute
            inset-x-2
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-red-500/70
            to-transparent

            opacity-70
          "
        />

        {/* current */}

        <motion.span
          key={current}
          initial={{
            opacity: 0,
            y: 4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
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

        {/* divider */}

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

        {/* total */}

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

        <motion.button
          type="button"
          onClick={prevSlide}

          whileHover={{
            y: -1,
            scale: 1.04,
          }}

          whileTap={{
            scale: 0.92,
          }}

          transition={{
            type: "spring",
            stiffness: 420,
            damping: 24,
          }}

          className="
            group

            relative

            flex

            h-7.5
            w-7.5

            items-center
            justify-center

            overflow-hidden

            rounded-lg

            border
            border-white/[0.08]

            bg-black/45

            text-zinc-400

            backdrop-blur-xl

            shadow-[0_6px_18px_rgba(0,0,0,.18)]

            transition-all
            duration-300

            hover:border-red-500/25
            hover:bg-red-500/[0.06]
            hover:text-white

            sm:h-9
            sm:w-9
            sm:rounded-xl
          "
        >

          {/* hover glow */}

          <span
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-br
              from-red-500/10
              via-transparent
              to-transparent

              opacity-0

              transition-opacity
              duration-300

              group-hover:opacity-100
            "
          />

          <ChevronLeft
            size={13}
            strokeWidth={1.8}
            className="
              relative
              z-10

              transition-transform
              duration-300

              group-hover:-translate-x-0.5

              sm:h-[15px]
              sm:w-[15px]
            "
          />

        </motion.button>


        {/* NEXT */}

        <motion.button
          type="button"
          onClick={nextSlide}

          whileHover={{
            y: -1,
            scale: 1.04,
          }}

          whileTap={{
            scale: 0.92,
          }}

          transition={{
            type: "spring",
            stiffness: 420,
            damping: 24,
          }}

          className="
            group

            relative

            flex

            h-7.5
            w-7.5

            items-center
            justify-center

            overflow-hidden

            rounded-lg

            border
            border-red-500/15

            bg-red-600/[0.07]

            text-red-300

            backdrop-blur-xl

            shadow-[0_6px_20px_rgba(239,68,68,.08)]

            transition-all
            duration-300

            hover:border-red-500/35
            hover:bg-red-500/10
            hover:text-white

            sm:h-9
            sm:w-9
            sm:rounded-xl
          "
        >

          {/* glow */}

          <span
            className="
              pointer-events-none

              absolute

              -inset-2

              rounded-full

              bg-red-500/[0.08]

              blur-xl

              opacity-0

              transition-opacity
              duration-300

              group-hover:opacity-100
            "
          />

          <ChevronRight
            size={13}
            strokeWidth={1.8}
            className="
              relative
              z-10

              transition-transform
              duration-300

              group-hover:translate-x-0.5

              sm:h-[15px]
              sm:w-[15px]
            "
          />

        </motion.button>

      </div>

    </motion.div>
  );
}