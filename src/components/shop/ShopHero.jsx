
import { motion } from "framer-motion";

export default function ShopHero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050505]

        pt-10
        pb-5

        sm:pt-12
        sm:pb-6

        lg:pt-14
        lg:pb-7
      "
    >
      {/* Ambient Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Main Glow */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.06, 0.11, 0.06],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[-220px]

            h-[480px]
            w-[480px]

            -translate-x-1/2

            rounded-full

            bg-red-600

            blur-[160px]
          "
        />

        {/* Side Glow */}

        <div
          className="
            absolute
            -right-40
            top-20

            h-[300px]
            w-[300px]

            rounded-full

            bg-red-600/[0.035]

            blur-[120px]
          "
        />

        {/* Fade */}

        <div
          className="
            absolute
            inset-0

            bg-[radial-gradient(circle_at_center,transparent_0%,#050505_78%)]
          "
        />

        {/* Subtle Top Light */}

        <div
          className="
            absolute
            left-1/2
            top-0

            h-px
            w-[260px]

            -translate-x-1/2

            bg-gradient-to-r
            from-transparent
            via-red-500/40
            to-transparent

            blur-[1px]
          "
        />
      </div>

      {/* Content */}

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-5xl

          px-5
          text-center

          sm:px-6
        "
      >

        {/* Badge */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          whileHover={{
            y: -2,
          }}
          className="
            group

            relative
            inline-flex

            items-center
            gap-2.5

            overflow-hidden

            rounded-full

            border
            border-red-500/20

            bg-white/[0.025]

            px-3.5
            py-1.5

            backdrop-blur-xl

            shadow-[0_8px_30px_rgba(0,0,0,.25)]

            transition-all
            duration-300

            hover:border-red-500/40
            hover:bg-red-500/[0.06]
            hover:shadow-[0_0_30px_rgba(239,68,68,.12)]
          "
        >
          {/* Badge Glow */}

          <span
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-transparent
              via-red-500/[0.08]
              to-transparent

              opacity-0

              transition-opacity
              duration-500

              group-hover:opacity-100
            "
          />

          {/* Status */}

          <span className="relative flex items-center justify-center">
            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-red-500

                shadow-[0_0_12px_rgba(239,68,68,.9)]
              "
            />

            <span
              className="
                absolute

                h-1.5
                w-1.5

                animate-ping

                rounded-full

                bg-red-500/50
              "
            />
          </span>

          <span
            className="
              relative

              font-bebas

              text-[10px]

              uppercase
              tracking-[0.30em]

              text-red-300
            "
          >
            Premium Collection
          </span>
        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 22,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            delay: 0.08,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-4

            font-bebas

            text-[34px]
            leading-[0.95]

            uppercase
            tracking-[0.07em]

            text-white

            sm:text-[42px]
            md:text-[52px]
            lg:text-[60px]
          "
        >
          Discover{" "}

          <span
            className="
              relative

              inline-block

              bg-[linear-gradient(90deg,#ffffff_0%,#fecaca_25%,#ef4444_48%,#991b1b_62%,#ef4444_78%,#ffffff_100%)]

              bg-[length:250%_100%]

              bg-clip-text

              text-transparent

              animate-gradient-x

              drop-shadow-[0_0_18px_rgba(239,68,68,.18)]
            "
          >
            Luxury
          </span>{" "}

          Metal Creations
        </motion.h1>

        {/* Description */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            delay: 0.18,
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
            sm:leading-7
          "
        >
          Explore handcrafted metal furniture, architectural pieces
          and bespoke creations crafted for modern luxury.
        </motion.p>

        {/* Premium Divider */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          whileInView={{
            width: 150,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.28,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            relative

            mx-auto

            mt-5

            h-px

            overflow-hidden

            bg-gradient-to-r
            from-transparent
            via-red-500/70
            to-transparent
          "
        >
          <motion.span
            animate={{
              x: ["-100%", "250%"],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-y-0
              left-0

              w-10

              bg-white/70

              blur-[2px]
            "
          />
        </motion.div>

        {/* Micro Label */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.4,
            duration: 0.5,
          }}
          className="
            mt-3

            flex
            items-center
            justify-center
            gap-2

            font-bebas

            text-[9px]

            uppercase
            tracking-[0.28em]

            text-zinc-600
          "
        >
          <span className="h-px w-5 bg-zinc-800" />

          Crafted With Precision

          <span className="h-px w-5 bg-zinc-800" />
        </motion.div>

      </div>
    </section>
  );
}

