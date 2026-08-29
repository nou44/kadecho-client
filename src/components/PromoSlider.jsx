
import { motion } from "framer-motion";

const topItems = [
  "PREMIUM FURNITURE",
  "CUSTOM STAIRS",
  "LUXURY DOORS",
  "METAL DECOR",
  "MADE IN MOROCCO",
  "KADECHO",
];

const bottomItems = [
  "BESPOKE PROJECTS",
  "INTERIOR DESIGN",
  "MODERN LIVING",
  "CUSTOM METAL",
  "HIGH QUALITY",
  "PREMIUM",
];

function Ribbon({
  items,
  reverse = false,
  variant = "red",
}) {
  const list = [...items, ...items];

  const isRed = variant === "red";

  return (
    <div
      className={`
        group
        relative
        h-10
        sm:h-11
        overflow-hidden
        rounded-full

        border

        backdrop-blur-xl

        transition-all
        duration-500

        ${
          isRed
            ? `
              border-red-400/25
              bg-gradient-to-r
              from-[#9f1111]
              via-[#dc2626]
              to-[#9f1111]

              shadow-[0_8px_30px_rgba(220,38,38,.16)]
            `
            : `
              border-white/[0.08]
              bg-gradient-to-r
              from-[#0a0a0a]
              via-[#111111]
              to-[#0a0a0a]

              shadow-[0_8px_30px_rgba(0,0,0,.42)]
            `
        }

        ${
          isRed
            ? "hover:border-red-300/35"
            : "hover:border-white/12"
        }
      `}
    >
      {/* INNER BORDER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[1px]
          z-20
          rounded-full
          border
          border-white/[0.045]
        "
      />

      {/* TOP REFLECTION */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-30
          h-px

          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent

          opacity-70
        "
      />

      {/* RED LIGHT */}

      {isRed && (
        <>
          <div
            className="
              pointer-events-none
              absolute
              inset-0

              bg-gradient-to-r
              from-transparent
              via-white/[0.055]
              to-transparent
            "
          />

          <motion.div
            animate={{
              x: ["-120%", "120%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0

              w-1/5

              rotate-[8deg]

              bg-white/[0.06]

              blur-xl
            "
          />
        </>
      )}

      {/* DARK RIBBON LIGHT */}

      {!isRed && (
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-px

            bg-gradient-to-r
            from-transparent
            via-red-500/25
            to-transparent
          "
        />
      )}

      {/* MARQUEE */}

      <motion.div
        animate={{
          x: reverse
            ? ["-50%", "0%"]
            : ["0%", "-50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          relative
          z-10

          flex
          h-full
          w-max
          items-center

          will-change-transform
        "
      >
        {list.map((item, index) => (
          <div
            key={index}
            className="
              flex
              shrink-0
              items-center
              gap-5

              px-6
              sm:px-7
              lg:px-8
            "
          >
            {/* TEXT */}

            <span
              className={`
                font-bebas

                text-[14px]
                sm:text-[15px]
                lg:text-[16px]

                leading-none

                tracking-[0.22em]
                sm:tracking-[0.24em]

                whitespace-nowrap

                ${
                  isRed
                    ? "text-white"
                    : "text-white/85"
                }
              `}
            >
              {item}
            </span>

            {/* STAR */}

            <motion.span
              animate={{
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`
                flex
                items-center
                justify-center

                text-[13px]
                sm:text-[14px]

                ${
                  isRed
                    ? "text-white/50"
                    : "text-red-500/70"
                }
              `}
            >
              ✦
            </motion.span>
          </div>
        ))}
      </motion.div>

      {/* LEFT FADE */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-20

          w-10
          sm:w-14

          bg-gradient-to-r

          ${
            isRed
              ? "from-[#b91c1c]"
              : "from-[#0a0a0a]"
          }

          to-transparent
        `}
      />

      {/* RIGHT FADE */}

      <div
        className={`
          pointer-events-none
          absolute
          inset-y-0
          right-0
          z-20

          w-10
          sm:w-14

          bg-gradient-to-l

          ${
            isRed
              ? "from-[#b91c1c]"
              : "from-[#0a0a0a]"
          }

          to-transparent
        `}
      />
    </div>
  );
}

export default function PromoSlider() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-[#050505]

        py-8
        sm:py-9
        lg:py-11
      "
    >
      {/* CENTER GLOW */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,rgba(220,38,38,.065),transparent_68%)]
        "
      />

      {/* TOP LIGHT */}

      <div
        className="
          pointer-events-none

          absolute
          left-1/2
          top-0

          h-px
          w-[65%]

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-red-500/20
          to-transparent
        "
      />

      {/* RIBBONS */}

      <motion.div
        initial={{
          opacity: 0,
          y: -60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.15,
          margin: "0px 0px -100px 0px",
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative

          mx-auto

          flex
          max-w-[1700px]
          flex-col

          gap-2.5
        "
      >
        {/* TOP RIBBON */}

        <div className="rotate-[-2deg]">
          <Ribbon
            items={topItems}
            variant="red"
          />
        </div>

        {/* BOTTOM RIBBON */}

        <div className="rotate-[2deg]">
          <Ribbon
            items={bottomItems}
            reverse
            variant="dark"
          />
        </div>
      </motion.div>

      {/* BOTTOM LIGHT */}

      <div
        className="
          pointer-events-none

          absolute
          bottom-0
          left-1/2

          h-px
          w-[65%]

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-red-500/15
          to-transparent
        "
      />
    </section>
  );
}

