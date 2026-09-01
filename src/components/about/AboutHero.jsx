import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutHero() {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#050505]

        min-h-[360px]
        sm:min-h-[400px]
        lg:min-h-[430px]
        xl:min-h-[450px]
      "
    >
      {/* =================================================
          VIDEO
          Static rendering — no transform animation
      ================================================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          h-full
          w-full

          object-cover
          object-center
        "
      >
        <source
          src="/vedio4.mp4"
          type="video/mp4"
        />
      </video>

      {/* =================================================
          DARK OVERLAY
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]

          bg-black/65

          sm:bg-black/60
          lg:bg-black/55
        "
      />

      {/* =================================================
          CINEMATIC LEFT GRADIENT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]

          bg-gradient-to-r
          from-black/90
          via-black/60
          to-black/20
        "
      />

      {/* =================================================
          STATIC RED AMBIENCE
          No animation / no scale
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute

          left-[8%]
          top-1/2

          z-[2]

          h-[260px]
          w-[260px]

          -translate-y-1/2

          rounded-full

          bg-red-600/[0.10]

          blur-[90px]

          sm:h-[320px]
          sm:w-[320px]

          lg:h-[360px]
          lg:w-[360px]
        "
      />

      {/* =================================================
          SUBTLE GRID
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]

          opacity-[0.022]

          bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]

          bg-[size:38px_38px]
        "
      />

      {/* =================================================
          BOTTOM FADE
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[4]

          h-28

          bg-gradient-to-t
          from-[#050505]
          via-[#050505]/70
          to-transparent

          sm:h-32
        "
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10

          mx-auto
          flex
          min-h-[360px]
          max-w-7xl
          items-center

          px-4
          py-14

          sm:min-h-[400px]
          sm:px-6
          sm:py-16

          lg:min-h-[430px]
          lg:px-8
          lg:py-20

          xl:min-h-[450px]
        "
      >
        <div
          className="
            w-full
            max-w-3xl
          "
        >
          {/* =================================================
              BREADCRUMB
          ================================================= */}

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
              duration: 0.4,
              ease: "easeOut",
            }}
            className="
              mb-4

              flex
              items-center
              gap-1.5

              text-[8px]
              sm:text-[9px]

              font-medium
              uppercase

              tracking-[0.18em]

              text-zinc-500
            "
          >
            <Link
              to="/"
              className="
                transition-colors
                duration-200

                hover:text-red-500
              "
            >
              Home
            </Link>

            <ChevronRight
              size={9}
              className="text-zinc-700"
            />

            <span className="text-white">
              About
            </span>
          </motion.div>

          {/* =================================================
              BADGE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.06,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="
              mb-3

              inline-flex
              w-fit
              items-center
              gap-2

              rounded-full

              border
              border-red-500/20

              bg-red-500/[0.08]

              px-3
              py-1.5

              text-[8px]
              sm:text-[9px]

              font-semibold
              uppercase

              tracking-[0.24em]

              text-red-400
            "
          >
            <span
              className="
                h-1.5
                w-1.5

                shrink-0

                rounded-full

                bg-red-500

                shadow-[0_0_8px_rgba(239,68,68,.55)]
              "
            />

            About KADECHO
          </motion.div>

          {/* =================================================
              TITLE
          ================================================= */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.12,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-3xl

              font-bebas
              uppercase

              leading-[0.88]

              tracking-[0.025em]

              text-[36px]

              sm:text-[46px]

              md:text-[56px]

              lg:text-[66px]

              xl:text-[72px]
            "
          >
            <span className="text-white">
              Crafting Metal
            </span>

            <br />

            <span
              className="
                bg-gradient-to-r
                from-red-400
                via-red-500
                to-orange-400

                bg-clip-text
                text-transparent
              "
            >
              With Passion
            </span>
          </motion.h1>

          {/* =================================================
              ACCENT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              delay: 0.28,
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "left",
            }}
            className="
              mt-4

              h-[2px]
              w-[90px]

              rounded-full

              bg-gradient-to-r
              from-red-600
              via-red-400
              to-transparent

              sm:mt-5
            "
          />

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.36,
              duration: 0.45,
              ease: "easeOut",
            }}
            className="
              mt-3

              max-w-xl

              text-[10px]
              leading-5

              text-zinc-300

              sm:mt-4
              sm:text-[12px]
              sm:leading-6

              lg:text-[14px]
              lg:leading-7
            "
          >
            Luxury metal furniture, pergolas, staircases,
            doors and custom creations crafted with
            precision and timeless design.
          </motion.p>
        </div>
      </div>

      {/* =================================================
          BOTTOM RED ACCENT
          Static — zero animation cost
      ================================================= */}

      <div
        className="
          absolute
          bottom-0
          left-0
          z-[6]

          h-px
          w-full

          bg-gradient-to-r
          from-transparent
          via-red-500/60
          to-transparent
        "
      />
    </section>
  );
}