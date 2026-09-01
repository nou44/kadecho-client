import { motion } from "framer-motion";
import ServiceSlider from "./ServiceSlider";

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Services() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050505]

        py-14
        sm:py-16
        lg:py-20
      "
    >
      {/* =====================================================
          BACKGROUND
          Static = much lighter than infinite blurred motion
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Top glow */}

        <div
          className="
            absolute
            left-1/2
            top-0

            h-[380px]
            w-[380px]

            -translate-x-1/2

            rounded-full

            bg-red-600/[0.045]

            blur-[120px]
          "
        />

        {/* Bottom glow */}

        <div
          className="
            absolute
            bottom-[-80px]
            right-[-80px]

            h-[220px]
            w-[220px]

            rounded-full

            bg-red-600/[0.035]

            blur-[90px]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-7xl

          px-5
          lg:px-6
        "
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="
            mx-auto
            mb-9

            max-w-2xl

            text-center

            sm:mb-11
          "
        >
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-red-500/20

              bg-red-500/[0.06]

              px-4
              py-1.5

              font-bebas

              text-[9px]
              uppercase
              tracking-[0.32em]

              text-red-400
            "
          >
            <span>OUR SERVICES</span>

            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-red-500
              "
            />
          </div>

          {/* Line */}

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{
              width: 55,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.1,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="
              mx-auto
              mt-4

              h-px

              bg-gradient-to-r
              from-transparent
              via-red-500
              to-transparent
            "
          />

          {/* Title */}

          <motion.h2
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
              delay: 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-4

              font-bebas

              text-[34px]

              uppercase
              leading-none
              tracking-[0.07em]

              text-white

              sm:text-[44px]
              lg:text-[54px]
            "
          >
            <span className="text-white">
              PREMIUM
            </span>{" "}
            <span className="text-red-500">
              SERVICES
            </span>
          </motion.h2>

          {/* Bottom line */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 85,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.18,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="
              mx-auto
              mt-4

              h-px

              bg-gradient-to-r
              from-transparent
              via-red-500/70
              to-transparent
            "
          />

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.18,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="
              mx-auto
              mt-5

              max-w-xl

              font-satoshi

              text-[12px]
              leading-6

              text-zinc-500

              sm:text-[13px]
              sm:leading-6
            "
          >
            Discover our premium metal craftsmanship, from bespoke
            staircases and luxury doors to pergolas, decorative
            structures and custom furniture designed for timeless
            residential and commercial spaces.
          </motion.p>
        </motion.div>

        {/* ===================================================
            SERVICES SLIDER
        =================================================== */}

        <ServiceSlider />
      </div>
    </section>
  );
}