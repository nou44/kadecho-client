import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactHero() {
  return (
  <section
  className="
    relative
    isolate
    min-h-[360px]
    overflow-hidden
    bg-[#050505]

    sm:min-h-[390px]

    lg:min-h-[430px]

    xl:min-h-[450px]
  "
>
      {/* ================================================= */}
      {/* VIDEO BACKGROUND */}
      {/* ================================================= */}

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="matadata"
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
          src="/vedio.mp4"
          type="video/mp4"
        />
      </video>

      {/* ================================================= */}
      {/* DARK OVERLAY */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]

          bg-black/55

          sm:bg-black/50

          lg:bg-black/45
        "
      />

      {/* ================================================= */}
      {/* LEFT DARK GRADIENT */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]

          bg-gradient-to-r
          from-black/95
          via-black/65
          to-transparent
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
          z-[3]

          h-32

          bg-gradient-to-t
          from-[#050505]
          via-[#050505]/60
          to-transparent
        "
      />

      {/* ================================================= */}
      {/* RED ATMOSPHERIC GLOW */}
      {/* ================================================= */}

      <motion.div
        animate={{
          opacity: [0.12, 0.22, 0.12],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute

          left-[18%]
          top-1/2

          z-[2]

          h-[280px]
          w-[280px]

          -translate-y-1/2

          rounded-full

          bg-red-600/20

          blur-[120px]

          sm:h-[340px]
          sm:w-[340px]
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
      {/* CONTENT */}
      {/* ================================================= */}

      <div
        className="
          relative
          z-10

          mx-auto
          flex

          min-h-[430px]

          max-w-7xl

          items-center

          px-4
          py-12

          sm:min-h-[460px]
          sm:px-5
          sm:py-14

          lg:min-h-[500px]
          lg:px-8
          lg:py-16

          xl:min-h-[520px]
        "
      >
        <div
          className="
            w-full
            max-w-[850px]
          "
        >
          {/* ================================================= */}
          {/* BREADCRUMB */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              mb-4

              flex
              items-center
              gap-2

              text-[9px]

              font-medium
              uppercase
              tracking-[0.18em]

              text-zinc-500

              sm:text-[10px]
            "
          >
            <Link
              to="/"
              className="
                text-red-500

                transition-colors
                duration-300

                hover:text-red-400
              "
            >
              Home
            </Link>

            <ChevronRight
              size={11}
              className="text-zinc-600"
            />

            <span className="text-white">
              Contact
            </span>
          </motion.div>

          {/* ================================================= */}
          {/* BADGE */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
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
              mb-5

              inline-flex
              items-center
              gap-2

              rounded-xl

              border
              border-red-500/30

              bg-black/40

              px-4
              py-2

              backdrop-blur-md

              shadow-[0_0_30px_rgba(239,68,68,.05)]
            "
          >
            <span
              className="
                h-2
                w-2

                rounded-full

                bg-red-500

                shadow-[0_0_12px_rgba(239,68,68,.9)]

                animate-pulse
              "
            />

            <span
              className="
                text-[10px]

                font-bold
                uppercase

                tracking-[0.2em]

                text-red-400
              "
            >
              Get In Touch
            </span>
          </motion.div>

          {/* ================================================= */}
          {/* TITLE */}
          {/* ================================================= */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.22,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="
              max-w-[900px]

              font-black
              uppercase

              leading-[0.88]

              tracking-[-0.025em]

              text-[42px]

              sm:text-[52px]

              lg:text-[64px]

              xl:text-[70px]
            "
          >
            <span className="text-white">
              Contact
            </span>{" "}
            <span
              className="
                bg-gradient-to-r
                from-red-300
                via-red-500
                to-orange-500

                bg-clip-text

                text-transparent
              "
            >
              KADECHO
            </span>
          </motion.h1>

          {/* ================================================= */}
          {/* RED LINE */}
          {/* ================================================= */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: 95,
              opacity: 1,
            }}
            transition={{
              delay: 0.42,
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              mt-5

              h-[3px]

              rounded-full

              bg-gradient-to-r
              from-red-600
              via-red-400
              to-transparent
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
              delay: 0.52,
              duration: 0.5,
            }}
            className="
              mt-5

              max-w-[570px]

              text-[12px]

              leading-6

              text-zinc-300

              sm:text-[13px]

              lg:text-[14px]
            "
          >
            Let&apos;s discuss your custom metal project and
            transform your ideas into premium craftsmanship.
          </motion.p>

          {/* ================================================= */}
          {/* BUTTONS */}
          {/* ================================================= */}

          <motion.div
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
              mt-6

              flex
              flex-wrap
              items-center

              gap-3
            "
          >
            {/* VIEW PROJECTS */}

            <Link
              to="/projects"
              className="
                group

                inline-flex

                h-11

                items-center
                justify-center

                gap-3

                rounded-xl

                bg-red-600

                px-6

                text-[10px]

                font-bold
                uppercase

                tracking-[0.1em]

                text-white

                shadow-[0_8px_30px_rgba(239,68,68,.2)]

                transition-all
                duration-300

                hover:-translate-y-0.5

                hover:bg-red-500

                hover:shadow-[0_12px_35px_rgba(239,68,68,.35)]
              "
            >
              <span>
                View Projects
              </span>

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* CALL NOW */}

            <a
              href="tel:+212600000000"
              className="
                group

                inline-flex

                h-11

                items-center
                justify-center

                gap-3

                rounded-xl

                border
                border-white/15

                bg-black/40

                px-6

                text-[10px]

                font-bold
                uppercase

                tracking-[0.1em]

                text-white

                backdrop-blur-md

                transition-all
                duration-300

                hover:-translate-y-0.5

                hover:border-red-500/40

                hover:bg-red-500/10
              "
            >
              <Phone
                size={15}
                className="
                  text-red-400

                  transition-transform
                  duration-300

                  group-hover:scale-110
                "
              />

              Call Now
            </a>
          </motion.div>
        </div>
      </div>

      {/* ================================================= */}
      {/* BOTTOM RED LIGHT */}
      {/* ================================================= */}

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
          duration: 1.2,
          delay: 0.8,
          ease: "easeOut",
        }}
        className="
          pointer-events-none

          absolute
          bottom-0
          left-0
          z-[6]

          h-[2px]
          w-full

          origin-center

          bg-gradient-to-r
          from-transparent
          via-red-500
          to-transparent

          shadow-[0_0_15px_rgba(239,68,68,.7)]
        "
      />
    </section>
  );
}