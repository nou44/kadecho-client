
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CTAContent() {
  return (
    <>
      {/* Badge */}

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          inline-flex
          items-center
          gap-2
        "
      >
        <span
          className="
            rounded-full

            border
            border-red-500/25

            bg-red-500/10

            px-4
            py-1.5

            font-bebas

            text-[10px]

            uppercase

            tracking-[0.32em]

            text-red-400

            backdrop-blur-xl
          "
        >
          Let's Build Together
        </span>

        <span
          className="
            flex
            h-7
            w-7

            items-center
            justify-center

            rounded-full

            border
            border-red-500/20

            bg-red-500/10
          "
        >
          <Sparkles
            size={13}
            className="text-red-400"
          />
        </span>
      </motion.div>

      {/* Title */}

      <motion.h2
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
        }}
        transition={{
          delay: 0.1,
          duration: 0.7,
        }}
        className="
          mt-6

          font-bebas

          text-[38px]
          sm:text-[50px]
          lg:text-[68px]

          uppercase

          leading-[0.9]

          tracking-[0.045em]

          text-white
        "
      >
        Crafted For

        <br />

        <span
          className="
            bg-[linear-gradient(90deg,#ffffff_0%,#f8fafc_15%,#ef4444_35%,#7f1d1d_50%,#ef4444_70%,#ffffff_100%)]

            bg-[length:300%_100%]

            bg-clip-text

            text-transparent

            animate-gradient-x
          "
        >
          Extraordinary
        </span>

        <br />

        Spaces
      </motion.h2>

      {/* Description */}

      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
        }}
        transition={{
          delay: 0.2,
          duration: 0.7,
        }}
        className="
          mx-auto

          mt-6

          max-w-2xl

          text-[13px]
          sm:text-[15px]

          leading-7

          text-zinc-300/90
        "
      >
        Every project begins with a vision.
        We transform premium materials into timeless creations,
        combining luxury craftsmanship, modern engineering and
        exceptional attention to every detail.
      </motion.p>

      {/* Stats */}

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
          once: false,
        }}
        transition={{
          delay: 0.35,
          duration: 0.7,
        }}
        className="
          mt-8

          flex
          flex-wrap
          items-center
          justify-center

          gap-6
          sm:gap-10
        "
      >
        {[
          {
            number: "250+",
            label: "Projects",
          },
          {
            number: "100%",
            label: "Custom Built",
          },
          {
            number: "6+",
            label: "Years Experience",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="
              min-w-[90px]

              text-center
            "
          >
            <h3
              className="
                font-bebas

                text-[27px]
                sm:text-[30px]

                leading-none

                text-white
              "
            >
              {item.number}
            </h3>

            <p
              className="
                mt-1.5

                text-[9px]
                sm:text-[10px]

                uppercase

                tracking-[0.22em]

                text-zinc-400
              "
            >
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>
    </>
  );
}

