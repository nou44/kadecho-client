import { motion } from "framer-motion";
import Container from "../ui/Container";
import Counter from "../common/Counter";

const stats = [
  {
    number: "6+",
    title: "Years Experience",
    description: "Crafting premium metal solutions.",
  },
  {
    number: "500+",
    title: "Completed Projects",
    description: "Successfully delivered to clients.",
  },
  {
    number: "98%",
    title: "Satisfied Clients",
    description: "Trusted by homeowners & businesses.",
  },
  {
    number: "100%",
    title: "Custom Made",
    description: "Every project is uniquely designed.",
  },
];

export default function AboutStats() {
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
      {/* ============================================= */}
      {/* BACKGROUND GLOW */}
      {/* ============================================= */}

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

      {/* ============================================= */}
      {/* GRID */}
      {/* ============================================= */}

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

        {/* ============================================= */}
        {/* HEADER */}
        {/* ============================================= */}

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
            Our Numbers
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
            Built On{" "}
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
              Experience
            </span>
          </motion.h2>

          {/* Line */}

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
              max-w-lg
              text-[12px]
              leading-6
              text-zinc-500
              sm:text-[13px]
              sm:leading-6
            "
          >
            Every project reflects our passion, precision
            and commitment to premium craftsmanship.
          </motion.p>

        </div>

        {/* ============================================= */}
        {/* STATS */}
        {/* ============================================= */}

        <div
          className="
            mt-9
            grid
            gap-3
            sm:mt-10
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {stats.map((stat, index) => {

            const numericValue = parseInt(stat.number);

            const suffix = stat.number.replace(/[0-9]/g, "");

            return (
              <motion.div
                key={stat.title}
                initial={{
                  opacity: 0,
                  y: 30,
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
                  rounded-[20px]
                  border
                  border-white/[0.07]
                  bg-gradient-to-b
                  from-white/[0.045]
                  to-white/[0.015]
                  p-5
                  transition-all
                  duration-500
                  hover:border-red-500/25
                  hover:bg-white/[0.055]
                  hover:shadow-[0_18px_45px_rgba(239,68,68,.10)]
                "
              >

                {/* Top Accent */}

                <div
                  className="
                    absolute
                    left-5
                    right-5
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-red-500/60
                    to-transparent
                    opacity-40
                    transition-all
                    duration-500
                    group-hover:left-0
                    group-hover:right-0
                    group-hover:opacity-100
                  "
                />

                {/* Corner Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    h-28
                    w-28
                    rounded-full
                    bg-red-500/10
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Number */}

                <div className="relative">

                  <motion.h3
                    animate={{
                      opacity: [1, 0.88, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4,
                    }}
                    className="
                      font-bebas
                      text-4xl
                      font-black
                      leading-none
                      tracking-[0.04em]
                      text-white
                      sm:text-[42px]
                    "
                  >
                    <span
                      className="
                        bg-gradient-to-br
                        from-white
                        via-white
                        to-red-400
                        bg-clip-text
                        text-transparent
                      "
                    >
                      <Counter
                        end={numericValue}
                        suffix={suffix}
                      />
                    </span>
                  </motion.h3>

                  {/* Small red marker */}

                  <div
                    className="
                      mt-3
                      h-1
                      w-7
                      rounded-full
                      bg-red-500
                      transition-all
                      duration-300
                      group-hover:w-12
                    "
                  />

                </div>

                {/* Title */}

                <h4
                  className="
                    relative
                    mt-4
                    font-bebas
                    text-[15px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-red-400
                    sm:text-base
                  "
                >
                  {stat.title}
                </h4>

                {/* Description */}

                <p
                  className="
                    relative
                    mt-2
                    max-w-[220px]
                    text-[11px]
                    leading-5
                    text-zinc-500
                    sm:text-[12px]
                  "
                >
                  {stat.description}
                </p>

                {/* Index */}

                <span
                  className="
                    absolute
                    bottom-4
                    right-5
                    font-mono
                    text-[9px]
                    tracking-[0.2em]
                    text-zinc-700
                    transition-colors
                    duration-300
                    group-hover:text-red-500/40
                  "
                >
                  0{index + 1}
                </span>

              </motion.div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}