
import { motion } from "framer-motion";

import FeatureCard from "./FeatureCard";
import { features } from "./whyChooseData";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function WhyChoose() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050505]
        py-12
        sm:py-14
        lg:py-16
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[360px]
            w-[360px]
            -translate-x-1/2
            rounded-full
            bg-red-600/8
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-[220px]
            w-[220px]
            rounded-full
            bg-red-600/5
            blur-[110px]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* HEADER */}

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
            ease: "easeOut",
          }}
          className="
            mx-auto
            mb-8
            max-w-2xl
            text-center
            sm:mb-10
          "
        >
          {/* Badge */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
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

              bg-red-500/[0.05]

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
                shadow-[0_0_10px_rgba(239,68,68,.8)]
              "
            />

            <span
              className="
                font-bebas
                text-[9px]
                uppercase
                tracking-[0.28em]
                text-red-400
                sm:text-[10px]
              "
            >
              Why Choose KADECHO
            </span>
          </motion.div>

          {/* Title */}

          <motion.h2
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
            }}
            transition={{
              delay: 0.08,
              duration: 0.55,
            }}
            className="
              mt-4

              font-bebas

              text-[34px]
              leading-[0.92]

              tracking-[0.06em]

              text-white

              sm:text-[42px]
              lg:text-[48px]
            "
          >
            Built With{" "}
            <span
              className="
                bg-[linear-gradient(90deg,#ffffff,#ef4444,#991b1b,#ef4444,#ffffff)]
                bg-[length:250%_100%]
                bg-clip-text
                text-transparent
                animate-gradient-x
              "
            >
              Precision
            </span>

            <span className="text-zinc-500">.</span>
          </motion.h2>

          {/* Accent */}

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
              delay: 0.2,
              duration: 0.5,
            }}
            className="
              mx-auto
              mt-4
              h-[2px]
              rounded-full
              bg-red-500
              shadow-[0_0_15px_rgba(239,68,68,.4)]
            "
          />

          {/* Description */}

          <motion.p
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
              delay: 0.25,
              duration: 0.5,
            }}
            className="
              mx-auto
              mt-4
              max-w-xl

              font-satoshi

              text-[12px]
              leading-6

              text-zinc-500

              sm:text-[13px]
            "
          >
            Premium metal craftsmanship, refined details and
            custom creations built to last.
          </motion.p>
        </motion.div>

        {/* FEATURES */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            gap-3

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

