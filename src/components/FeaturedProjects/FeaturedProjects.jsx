

import { motion } from "framer-motion";
import FeaturedSlider from "./FeaturedSlider";

export default function FeaturedProjects() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#050505]

        pt-10
        pb-12

        sm:pt-12
        sm:pb-14

        lg:pt-14
        lg:pb-16
      "
    >
      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute

            left-1/2
            top-[-180px]

            h-[420px]
            w-[420px]

            -translate-x-1/2

            rounded-full

            bg-red-600/[0.07]

            blur-[150px]
          "
        />

        <div
          className="
            absolute

            right-[-120px]
            bottom-[-120px]

            h-[260px]
            w-[260px]

            rounded-full

            bg-red-600/[0.05]

            blur-[120px]
          "
        />
      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <div
        className="
          relative
          z-10

          mx-auto

          max-w-7xl

          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =========================
            COMPACT HEADER
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto

            mb-7

            max-w-2xl

            text-center
          "
        >
          {/* Badge */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-red-500/20

              bg-red-500/[0.06]

              px-3
              py-1.5

              backdrop-blur-xl
            "
          >
            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-red-500

                shadow-[0_0_10px_rgba(239,68,68,.7)]
              "
            />

            <span
              className="
                font-bebas

                text-[10px]

                uppercase
                tracking-[0.24em]

                text-red-400
              "
            >
              Featured Projects
            </span>
          </motion.div>

          {/* Title */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.08,
              duration: 0.6,
            }}
            className="
              mt-3

              font-bebas

              text-[34px]

              uppercase

              leading-[0.92]

              tracking-[0.07em]

              sm:text-[42px]

              lg:text-[50px]

              bg-[linear-gradient(90deg,#ffffff_0%,#f5f5f5_22%,#ef4444_45%,#991b1b_55%,#ef4444_70%,#ffffff_100%)]

              bg-[length:300%_100%]

              bg-clip-text

              text-transparent

              animate-gradient-x

              drop-shadow-[0_0_12px_rgba(239,68,68,.14)]
            "
          >
            Crafted To Inspire
          </motion.h2>

          {/* Minimal Accent */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 55,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.18,
              duration: 0.5,
            }}
            className="
              mx-auto

              mt-3

              h-[2px]

              rounded-full

              bg-gradient-to-r

              from-transparent
              via-red-500
              to-transparent
            "
          />

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.24,
              duration: 0.55,
            }}
            className="
              mx-auto

              mt-3

              max-w-xl

              font-satoshi

              text-[12px]

              leading-6

              text-zinc-500

              sm:text-[13px]
            "
          >
            A selection of handcrafted metal creations built
            for distinctive spaces and timeless interiors.
          </motion.p>
        </motion.div>

        {/* =========================
            FEATURED PROJECTS
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            delay: 0.15,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <FeaturedSlider />
        </motion.div>
      </div>
    </section>
  );
}

