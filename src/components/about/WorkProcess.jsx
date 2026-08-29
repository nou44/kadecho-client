import { motion } from "framer-motion";
import Container from "../ui/Container";
import {
  MessageSquare,
  PencilRuler,
  Hammer,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We discuss your ideas, requirements, dimensions and budget to fully understand your project.",
  },
  {
    number: "02",
    icon: PencilRuler,
    title: "Design",
    description:
      "Our team creates a custom design that combines functionality, durability and luxury aesthetics.",
  },
  {
    number: "03",
    icon: Hammer,
    title: "Production",
    description:
      "Every piece is manufactured with precision using premium materials and professional craftsmanship.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Installation",
    description:
      "We deliver and install your project with attention to every final detail.",
  },
];

export default function WorkProcess() {
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
      {/* ================================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600/[0.045]
          blur-[140px]
        "
      />

      {/* Subtle Grid */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.018]
          bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          bg-[size:42px_42px]
        "
      />

      <Container className="relative z-10">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mx-auto max-w-3xl text-center">

          <motion.span
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-red-500/20
              bg-red-500/[0.08]
              px-3.5
              py-1.5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.28em]
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
                shadow-[0_0_10px_rgba(239,68,68,.7)]
              "
            />

            Our Process
          </motion.span>

          <motion.h2
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
              amount: 0.3,
            }}
            transition={{
              delay: 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-4
              font-bebas
              text-4xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[0.05em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            From Idea{" "}
            <span className="text-red-500">
              To Perfection
            </span>
          </motion.h2>

          {/* Animated Line */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 140,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mx-auto
              mt-4
              h-[2px]
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-red-500
              to-transparent
            "
          />

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
            }}
            transition={{
              delay: 0.4,
              duration: 0.5,
            }}
            className="
              mx-auto
              mt-5
              max-w-xl
              text-[12px]
              leading-6
              text-zinc-500
              sm:text-[13px]
              sm:leading-7
            "
          >
            Every project follows a carefully planned workflow
            to guarantee precision, quality and a flawless final result.
          </motion.p>

        </div>

        {/* ================================================= */}
        {/* PROCESS */}
        {/* ================================================= */}

        <div
          className="
            relative
            mt-10
            sm:mt-12
            lg:mt-14
          "
        >

          {/* DESKTOP TIMELINE */}

          <div
            className="
              pointer-events-none
              absolute
              left-[12.5%]
              right-[12.5%]
              top-[30px]
              hidden
              h-px
              lg:block
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-white/[0.06]
              "
            />

            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: "easeInOut",
              }}
              className="
                absolute
                inset-0
                origin-left
                bg-gradient-to-r
                from-red-600/60
                via-red-500/30
                to-transparent
              "
            />
          </div>

          <div
            className="
              grid
              gap-4
              sm:gap-5
              lg:grid-cols-4
              lg:gap-5
            "
          >

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 35,
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
                    delay: index * 0.12,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >

                  {/* ================================================= */}
                  {/* STEP NODE */}
                  {/* ================================================= */}

                  <div
                    className="
                      relative
                      z-20
                      mb-3
                      hidden
                      lg:flex
                      lg:justify-center
                    "
                  >
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      whileInView={{
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: 0.35 + index * 0.12,
                        type: "spring",
                        stiffness: 220,
                        damping: 16,
                      }}
                      className="
                        flex
                        h-[60px]
                        w-[60px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-red-500/20
                        bg-[#080808]
                        shadow-[0_0_0_6px_rgba(239,68,68,.025)]
                      "
                    >
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          bg-red-500/10
                          text-red-400
                        "
                      >
                        <Icon size={17} />
                      </div>
                    </motion.div>
                  </div>

                  {/* ================================================= */}
                  {/* CARD */}
                  {/* ================================================= */}

                  <motion.div
                    whileHover={{
                      y: -7,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[22px]
                      border
                      border-white/[0.08]
                      bg-gradient-to-br
                      from-white/[0.045]
                      via-[#0a0a0a]
                      to-black
                      p-5
                      transition-all
                      duration-500
                      hover:border-red-500/25
                      hover:shadow-[0_18px_50px_rgba(239,68,68,.10)]
                      lg:min-h-[245px]
                      lg:p-5
                    "
                  >

                    {/* Top Accent */}

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileHover={{
                        width: "100%",
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="
                        absolute
                        left-0
                        top-0
                        h-[2px]
                        bg-gradient-to-r
                        from-red-600
                        via-red-400
                        to-transparent
                      "
                    />

                    {/* Hover Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -bottom-16
                        left-1/2
                        h-32
                        w-32
                        -translate-x-1/2
                        rounded-full
                        bg-red-500/15
                        blur-3xl
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* Mobile Header */}

                    <div className="flex items-start justify-between lg:block">

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-red-500/15
                          bg-red-500/[0.08]
                          text-red-400
                          lg:hidden
                        "
                      >
                        <Icon size={19} />
                      </div>

                      {/* Number */}

                      <span
                        className="
                          font-bebas
                          text-4xl
                          font-black
                          leading-none
                          tracking-[0.05em]
                          text-white/[0.07]
                          transition-colors
                          duration-500
                          group-hover:text-red-500/15
                        "
                      >
                        {step.number}
                      </span>

                    </div>

                    {/* Desktop Number */}

                    <div
                      className="
                        absolute
                        right-5
                        top-5
                        hidden
                        lg:block
                      "
                    >
                      <span
                        className="
                          font-bebas
                          text-4xl
                          font-black
                          leading-none
                          tracking-[0.05em]
                          text-white/[0.055]
                          transition-colors
                          duration-500
                          group-hover:text-red-500/15
                        "
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}

                    <h3
                      className="
                        relative
                        mt-5
                        font-bebas
                        text-xl
                        font-black
                        uppercase
                        tracking-[0.12em]
                        text-white
                        transition-colors
                        duration-300
                        group-hover:text-red-400
                        lg:mt-5
                      "
                    >
                      {step.title}
                    </h3>

                    {/* Tiny line */}

                    <div
                      className="
                        mt-3
                        h-px
                        w-8
                        bg-red-500/50
                        transition-all
                        duration-500
                        group-hover:w-14
                        group-hover:bg-red-500
                      "
                    />

                    {/* Description */}

                    <p
                      className="
                        relative
                        mt-3
                        text-[12px]
                        leading-6
                        text-zinc-500
                        transition-colors
                        duration-300
                        group-hover:text-zinc-400
                        sm:text-[13px]
                        sm:leading-6
                      "
                    >
                      {step.description}
                    </p>

                    {/* Bottom Meta */}

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        gap-2
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-zinc-600
                        transition-colors
                        duration-300
                        group-hover:text-red-400/70
                      "
                    >
                      <span
                        className="
                          h-1
                          w-1
                          rounded-full
                          bg-red-500
                        "
                      />

                      Step {step.number}
                    </div>

                  </motion.div>

                </motion.div>
              );

            })}

          </div>

        </div>

        {/* ================================================= */}
        {/* BOTTOM STATEMENT */}
        {/* ================================================= */}

        <motion.div
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
            delay: 0.5,
            duration: 0.5,
          }}
          className="
            mx-auto
            mt-8
            flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-white/[0.06]
            bg-white/[0.02]
            px-4
            py-2
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-zinc-600
          "
        >
          Precision{" "}
          <span className="text-red-500">•</span>
          Craftsmanship{" "}
          <span className="text-red-500">•</span>
          Excellence

          <ArrowRight
            size={11}
            className="ml-1 text-red-500"
          />
        </motion.div>

      </Container>
    </section>
  );
}