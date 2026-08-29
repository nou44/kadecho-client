import { motion } from "framer-motion";

export default function HeroOverlay({ slide }) {
  return (
    <div className="relative w-full">

      {/* =====================================================
          BADGE
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 8,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          left-3
          -top-4

          z-40

          inline-flex
          items-center

          rounded-full

          border
          border-red-500/20

          bg-[#080808]/90

          px-2.5
          py-1

          text-[7px]
          font-bold

          uppercase
          tracking-[0.22em]

          text-red-400

          shadow-[0_6px_22px_rgba(0,0,0,.35)]

          backdrop-blur-xl

          whitespace-nowrap

          sm:left-4
          sm:-top-4
          sm:px-3
          sm:text-[8px]
        "
      >
        {/* tiny indicator */}
        <span
          className="
            mr-1.5
            h-1
            w-1

            rounded-full

            bg-red-500

            shadow-[0_0_8px_rgba(239,68,68,.8)]
          "
        />

        {slide.badge}
      </motion.div>


      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <motion.div
        key={slide.id}
        initial={{
          opacity: 0,
          y: 12,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          group

          relative
          w-full

          overflow-hidden

          rounded-[15px]
          sm:rounded-[17px]

          border
          border-white/[0.075]

          bg-[#070707]/90

          px-3.5
          py-3.5

          shadow-[0_14px_40px_rgba(0,0,0,.45)]

          backdrop-blur-2xl

          sm:px-4
          sm:py-4

          transition-colors
          duration-300

          hover:border-red-500/15
        "
      >

        {/* =================================================
            TOP GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute
            inset-x-0
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-red-500/70
            to-transparent

            opacity-80
          "
        />

        {/* =================================================
            SOFT RED GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute

            -right-16
            -top-16

            h-28
            w-28

            rounded-full

            bg-red-500/[0.055]

            blur-3xl
          "
        />


        {/* =================================================
            ACCENT
        ================================================= */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: 30,
            opacity: 1,
          }}
          transition={{
            duration: 0.45,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative

            mb-2.5

            h-[2px]

            rounded-full

            bg-gradient-to-r
            from-red-500
            to-red-400/20
          "
        />


        {/* =================================================
            TITLE
        ================================================= */}

        <motion.h2
          key={slide.title}
          initial={{
            opacity: 0,
            y: 7,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative

            max-w-[92%]

            text-[15px]
            font-black

            leading-[1.05]

            tracking-[-0.02em]

            text-white

            sm:text-[17px]
            sm:leading-[1.05]
          "
        >
          {slide.title}
        </motion.h2>


        {/* =================================================
            SUBTITLE
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.14,
            ease: "easeOut",
          }}
          className="
            mt-1.5

            text-[7px]

            font-bold

            uppercase
            tracking-[0.24em]

            text-red-400

            sm:text-[8px]
          "
        >
          {slide.subtitle}
        </motion.p>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.19,
            ease: "easeOut",
          }}
          className="
            relative

            mt-2

            max-w-[480px]

            text-[9px]

            leading-[1.65]

            text-zinc-400

            sm:text-[10px]
            sm:leading-[1.7]
          "
        >
          {slide.description}
        </motion.p>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <div
          className="
            relative

            mt-2.5

            h-[2px]
            w-full

            overflow-hidden

            rounded-full

            bg-white/[0.07]
          "
        >
          <motion.div
            key={slide.id}
            initial={{
              width: "0%",
            }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: 5,
              ease: "linear",
            }}
            className="
              relative

              h-full

              rounded-full

              bg-gradient-to-r
              from-red-600
              via-red-400
              to-red-500
            "
          />

          {/* moving highlight */}
          <motion.div
            key={`shine-${slide.id}`}
            initial={{
              x: "-100%",
            }}
            animate={{
              x: "200%",
            }}
            transition={{
              duration: 2.2,
              delay: 0.3,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none

              absolute
              inset-y-0

              w-16

              bg-gradient-to-r
              from-transparent
              via-white/35
              to-transparent

              blur-[1px]
            "
          />
        </div>

      </motion.div>
    </div>
  );
}