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
      {/* ================================================= */}
      {/* VIDEO */}
      {/* ================================================= */}

      <motion.video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{
          scale: 1.06,
        }}
        animate={{
          scale: [1.06, 1.02, 1.06],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          h-full
          w-full

          object-cover
          object-center

          will-change-transform
        "
      >
        <source
          src="/vedio4.mp4"
          type="video/mp4"
        />
      </motion.video>

      {/* ================================================= */}
      {/* DARK VIDEO OVERLAY */}
      {/* ================================================= */}

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

      {/* ================================================= */}
      {/* LEFT GRADIENT */}
      {/* ================================================= */}

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

      {/* ================================================= */}
      {/* RED CINEMATIC GLOW */}
      {/* ================================================= */}

      <motion.div
        animate={{
          opacity: [0.10, 0.22, 0.10],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute

          left-[10%]
          top-1/2

          z-[2]

          h-[260px]
          w-[260px]

          -translate-y-1/2

          rounded-full

          bg-red-600/20

          blur-[120px]

          sm:h-[320px]
          sm:w-[320px]

          lg:h-[380px]
          lg:w-[380px]
        "
      />

      {/* ================================================= */}
      {/* GRID */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]

          opacity-[0.025]

          bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]

          bg-[size:38px_38px]
        "
      />

      {/* ================================================= */}
      {/* BOTTOM FADE */}
      {/* ================================================= */}

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

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

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
          {/* ================================================= */}
          {/* BREADCRUMB */}
          {/* ================================================= */}

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
              duration: 0.5,
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
                duration-300

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

          {/* ================================================= */}
          {/* BADGE */}
          {/* ================================================= */}

          <motion.span
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.12,
              duration: 0.45,
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

              bg-red-500/10

              px-3
              py-1.5

              text-[8px]
              sm:text-[9px]

              font-semibold
              uppercase

              tracking-[0.24em]

              text-red-400

              backdrop-blur-md
            "
          >
            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-red-500

                shadow-[0_0_10px_rgba(239,68,68,.8)]
              "
            />

            About KADECHO
          </motion.span>

          {/* ================================================= */}
          {/* TITLE */}
          {/* ================================================= */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.22,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-3xl

              font-bebas
              font-black
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

          {/* ================================================= */}
          {/* ACCENT LINE */}
          {/* ================================================= */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: 90,
              opacity: 1,
            }}
            transition={{
              delay: 0.55,
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              mt-4

              h-[2px]

              rounded-full

              bg-gradient-to-r
              from-red-600
              via-red-400
              to-transparent

              sm:mt-5
            "
          />

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.65,
              duration: 0.5,
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

      {/* ================================================= */}
      {/* BOTTOM RED ACCENT */}
      {/* ================================================= */}

      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: "100%",
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
          duration: 1.2,
          ease: "easeOut",
        }}
        className="
          absolute
          bottom-0
          left-0
          z-[6]

          h-px

          bg-gradient-to-r
          from-transparent
          via-red-500/60
          to-transparent
        "
      />
    </section>
  );
}