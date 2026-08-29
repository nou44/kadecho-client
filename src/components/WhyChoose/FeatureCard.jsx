
import { motion } from "framer-motion";

export default function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.div
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
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
      }}
      className="
        group
        relative
        overflow-hidden

        rounded-[22px]

        border
        border-white/[0.07]

        bg-[#0a0a0a]

        p-5

        shadow-[0_12px_35px_rgba(0,0,0,.22)]

        transition-all
        duration-500

        hover:border-red-500/30
        hover:bg-[#0c0c0c]
        hover:shadow-[0_20px_50px_rgba(239,68,68,.10)]
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          pointer-events-none
          absolute

          -right-16
          -top-16

          h-32
          w-32

          rounded-full

          bg-red-600/10

          opacity-0

          blur-[60px]

          transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />

      {/* Number */}

      <span
        className="
          pointer-events-none

          absolute
          right-4
          top-3

          font-bebas

          text-[52px]

          leading-none

          tracking-tight

          text-white/[0.025]

          transition-all
          duration-500

          group-hover:text-red-500/[0.06]
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Top Accent */}

      <motion.div
        initial={{
          width: "18%",
        }}
        whileHover={{
          width: "100%",
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="
          absolute
          left-0
          top-0

          h-[2px]

          rounded-r-full

          bg-gradient-to-r
          from-red-500
          via-red-400
          to-transparent
        "
      />

      {/* Icon Row */}

      <div className="relative z-10 flex items-center justify-between">
        <motion.div
          whileHover={{
            scale: 1.06,
            rotate: -4,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="
            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-[13px]

            border
            border-red-500/20

            bg-gradient-to-br
            from-red-500/[0.12]
            to-red-500/[0.03]

            text-red-400

            shadow-[inset_0_0_18px_rgba(239,68,68,.04)]

            transition-all
            duration-300

            group-hover:border-red-500/40
            group-hover:text-red-300
            group-hover:shadow-[0_0_24px_rgba(239,68,68,.12)]
          "
        >
          <Icon
            size={20}
            strokeWidth={2}
          />
        </motion.div>

        {/* Mini Status */}

        <div
          className="
            flex
            items-center
            gap-1.5

            rounded-full

            border
            border-white/[0.06]

            bg-white/[0.025]

            px-2
            py-1
          "
        >
          <span
            className="
              h-1.5
              w-1.5

              rounded-full

              bg-red-500

              shadow-[0_0_8px_rgba(239,68,68,.8)]
            "
          />

          <span
            className="
              font-satoshi

              text-[8px]

              font-medium

              uppercase
              tracking-[0.18em]

              text-zinc-600
            "
          >
            KADECHO
          </span>
        </div>
      </div>

      {/* Content */}

      <div className="relative z-10">
        <h3
          className="
            mt-5

            font-bebas

            text-[24px]

            uppercase

            leading-none

            tracking-[0.07em]

            text-white

            transition-colors
            duration-300

            group-hover:text-red-400
          "
        >
          {feature.title}
        </h3>

        {/* Accent Line */}

        <div
          className="
            mt-3

            flex
            items-center
            gap-1.5
          "
        >
          <motion.span
            initial={{
              width: 24,
            }}
            whileHover={{
              width: 42,
            }}
            className="
              h-[2px]

              rounded-full

              bg-red-500

              transition-all
              duration-300
            "
          />

          <span
            className="
              h-[2px]
              w-1.5

              rounded-full

              bg-red-500/30
            "
          />
        </div>

        <p
          className="
            mt-3

            max-w-[330px]

            font-satoshi

            text-[12px]

            leading-[1.7]

            text-zinc-500

            transition-colors
            duration-300

            group-hover:text-zinc-400
          "
        >
          {feature.description}
        </p>
      </div>

      {/* Bottom Detail */}

      <div
        className="
          relative
          z-10

          mt-5

          flex
          items-center
          justify-between

          border-t
          border-white/[0.05]

          pt-3
        "
      >
        <span
          className="
            font-satoshi

            text-[8px]

            uppercase

            tracking-[0.22em]

            text-zinc-700
          "
        >
          Premium Craft
        </span>

        <motion.span
          whileHover={{
            x: 3,
          }}
          className="
            font-satoshi

            text-[9px]

            uppercase

            tracking-[0.16em]

            text-red-500/50

            transition-colors
            duration-300

            group-hover:text-red-400
          "
        >
          0{index + 1}
        </motion.span>
      </div>

      {/* Bottom Glow */}

      <div
        className="
          pointer-events-none

          absolute

          -bottom-16
          left-1/2

          h-24
          w-48

          -translate-x-1/2

          rounded-full

          bg-red-600/10

          opacity-0

          blur-[55px]

          transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />
    </motion.div>
  );
}

