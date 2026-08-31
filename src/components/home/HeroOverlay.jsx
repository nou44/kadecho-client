import { motion } from "framer-motion";

export default function HeroOverlay({ slide }) {
  return (
    <div className="relative w-full">

      {/* =====================================================
          BADGE
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
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

          bg-[#080808]/95

          px-2.5
          py-1

          text-[7px]
          font-bold

          uppercase
          tracking-[0.22em]

          text-red-400

          whitespace-nowrap

          shadow-[0_5px_18px_rgba(0,0,0,.3)]

          sm:left-4
          sm:px-3
          sm:text-[8px]
        "
      >
        <span
          className="
            mr-1.5
            h-1
            w-1
            shrink-0

            rounded-full

            bg-red-500
          "
        />

        {slide.badge}
      </motion.div>


      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <motion.div
        key={slide._id}
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          w-full

          overflow-hidden

          rounded-[15px]
          sm:rounded-[17px]

          border
          border-white/[0.08]

          bg-[#080808]/95

          px-3.5
          py-3.5

          shadow-[0_12px_35px_rgba(0,0,0,.42)]

          sm:px-4
          sm:py-4
        "
      >

        {/* =================================================
            TOP LINE
        ================================================= */}

        <div
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


        {/* =================================================
            HEADER ROW
        ================================================= */}

        <div className="relative">

          {/* RED ACCENT */}

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 28 }}
            transition={{
              duration: 0.35,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="
              mb-2.5

              h-[2px]

              rounded-full

              bg-gradient-to-r
              from-red-500
              to-red-500/10
            "
          />


          {/* TITLE */}

          <motion.h2
            key={slide.title}
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              delay: 0.05,
              ease: "easeOut",
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

          <motion.p
            key={`${slide._id}-subtitle`}
            initial={{
              opacity: 0,
              y: 4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
              delay: 0.1,
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


          {/* DESCRIPTION */}

          <motion.p
            key={`${slide._id}-description`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.14,
            }}
            className="
              mt-2

              max-w-[480px]

              text-[9px]

              leading-[1.6]

              text-zinc-400

              sm:text-[10px]
              sm:leading-[1.65]
            "
          >
            {slide.description}
          </motion.p>

        </div>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <div
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
            key={slide._id}
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              duration: 5,
              ease: "linear",
            }}
            style={{
              transformOrigin: "left",
            }}
            className="
              h-full
              w-full

              rounded-full

              bg-red-500
            "
          />

        </div>

      </motion.div>
    </div>
  );
}