import { motion } from "framer-motion";
import Container from "../ui/Container";
import {
  ShieldCheck,
  PenTool,
  Hammer,
  Truck,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "We use carefully selected materials and maintain high manufacturing standards to deliver durable, elegant results.",
  },
  {
    icon: PenTool,
    title: "Custom Design",
    description:
      "Every project is tailored to your space, style, and functional requirements for a truly unique result.",
  },
  {
    icon: Hammer,
    title: "Expert Craftsmanship",
    description:
      "Our experienced team pays attention to every detail, ensuring precision from fabrication to finishing.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "From planning to installation, we keep projects on schedule while maintaining exceptional quality.",
  },
];

export default function WhyChooseUs() {
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
          h-[460px]
          w-[460px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600/[0.045]
          blur-[150px]
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
          opacity-[0.018]
          bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          bg-[size:42px_42px]
        "
      />

      <Container className="relative z-10">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mx-auto max-w-2xl text-center">

          {/* Badge */}

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
            "
          >
            Why Choose Us
          </motion.span>

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
              once: true,
              amount: 0.3,
            }}
            transition={{
              delay: 0.1,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-4
              font-bebas
              text-3xl
              font-black
              uppercase
              leading-[0.9]
              tracking-[0.05em]
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            Why Clients{" "}
            <span
              className="
                bg-gradient-to-r
                from-red-500
                via-red-400
                to-orange-400
                bg-clip-text
                text-transparent
              "
            >
              Trust KADECHO
            </span>
          </motion.h2>

          {/* Accent */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 90,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.35,
              duration: 0.7,
              ease: "easeOut",
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
              amount: 0.3,
            }}
            transition={{
              delay: 0.45,
              duration: 0.5,
            }}
            className="
              mx-auto
              mt-4
              max-w-xl
              text-[12px]
              leading-6
              text-zinc-500
              sm:text-[13px]
              sm:leading-6
            "
          >
            We combine creativity, precision and premium
            craftsmanship to create metal solutions built
            around your vision.
          </motion.p>

        </div>

        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

        <div
          className="
            mt-9
            grid
            gap-3
            sm:mt-10
            sm:grid-cols-2
            lg:gap-4
          "
        >

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
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
                  delay: index * 0.08,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-white/[0.07]
                  bg-gradient-to-br
                  from-white/[0.045]
                  via-[#0a0a0a]
                  to-[#060606]
                  p-5
                  transition-all
                  duration-500
                  hover:border-red-500/25
                  hover:shadow-[0_20px_55px_rgba(239,68,68,.10)]
                  sm:p-6
                "
              >

                {/* ================================================= */}
                {/* TOP ACCENT */}
                {/* ================================================= */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-px
                    w-16
                    bg-gradient-to-r
                    from-red-500
                    to-transparent
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

                {/* ================================================= */}
                {/* CORNER GLOW */}
                {/* ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-36
                    w-36
                    rounded-full
                    bg-red-500/10
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* ================================================= */}
                {/* HEADER ROW */}
                {/* ================================================= */}

                <div className="relative flex items-start justify-between">

                  {/* Icon */}

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 15,
                    }}
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-[15px]
                      border
                      border-red-500/15
                      bg-red-500/[0.08]
                      text-red-400
                      transition-all
                      duration-300
                      group-hover:border-red-500/30
                      group-hover:bg-red-500/15
                    "
                  >
                    <Icon size={21} strokeWidth={1.8} />
                  </motion.div>

                  {/* Number */}

                  <span
                    className="
                      font-mono
                      text-[9px]
                      tracking-[0.25em]
                      text-zinc-700
                      transition-colors
                      duration-300
                      group-hover:text-red-500/50
                    "
                  >
                    0{index + 1}
                  </span>

                </div>

                {/* ================================================= */}
                {/* TITLE */}
                {/* ================================================= */}

                <h3
                  className="
                    relative
                    mt-5
                    font-bebas
                    text-lg
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-red-400
                    sm:text-xl
                  "
                >
                  {feature.title}
                </h3>

                {/* ================================================= */}
                {/* DESCRIPTION */}
                {/* ================================================= */}

                <p
                  className="
                    relative
                    mt-2.5
                    max-w-xl
                    text-[11px]
                    leading-5
                    text-zinc-500
                    sm:text-[12px]
                    sm:leading-6
                  "
                >
                  {feature.description}
                </p>

                {/* ================================================= */}
                {/* BOTTOM ACTION */}
                {/* ================================================= */}

                <div
                  className="
                    relative
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/[0.05]
                    pt-4
                  "
                >

                  <span
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.22em]
                      text-zinc-700
                      transition-colors
                      duration-300
                      group-hover:text-zinc-500
                    "
                  >
                    KADECHO STANDARD
                  </span>

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/[0.06]
                      text-zinc-600
                      transition-all
                      duration-300
                      group-hover:border-red-500/30
                      group-hover:bg-red-500/10
                      group-hover:text-red-400
                    "
                  >
                    <ArrowUpRight size={13} />
                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}