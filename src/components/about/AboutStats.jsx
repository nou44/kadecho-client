
import { motion, useReducedMotion } from "framer-motion";
import Container from "../ui/Container";
import Counter from "../common/Counter";
import { Puzzle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

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

const pieceOffsets = [
  { x: -18, y: -12 },
  { x: 18, y: -12 },
  { x: -18, y: 12 },
  { x: 18, y: 12 },
];

export default function AboutStats() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#050505]
        py-12 sm:py-14 lg:py-16
      "
    >
      {/* STATIC BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_50%,rgba(220,38,38,0.055),transparent_60%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.018]
          [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      <Container className="relative z-10">
        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/[0.08]
              px-3.5 py-1.5
              text-[9px] font-semibold
              uppercase tracking-[0.28em]
              text-red-400
            "
          >
            <Puzzle size={12} />
            Our Numbers
          </span>

          <h2
            className="
              mt-4 font-bebas
              text-3xl font-black
              uppercase leading-[0.9]
              tracking-[0.05em]
              text-white
              sm:text-4xl lg:text-5xl
            "
          >
            Built On{" "}
            <span
              className="
                bg-gradient-to-r
                from-red-500 via-red-400 to-orange-400
                bg-clip-text text-transparent
              "
            >
              Experience
            </span>
          </h2>

          <div
            aria-hidden="true"
            className="
              mx-auto mt-4
              h-[2px] w-[90px]
              rounded-full
              bg-gradient-to-r
              from-transparent via-red-500 to-transparent
            "
          />

          <p
            className="
              mx-auto mt-4 max-w-lg
              text-[12px] leading-6
              text-zinc-500
              sm:text-[13px]
            "
          >
            Every project reflects our passion, precision
            and commitment to premium craftsmanship.
          </p>
        </motion.div>

        {/* PUZZLE GRID */}
        <div
          className="
            relative mx-auto mt-9
            grid grid-cols-2
            gap-2.5
            sm:mt-10 sm:gap-3
            lg:grid-cols-4 lg:gap-3
          "
        >
          {stats.map((stat, index) => {
            const numericValue = parseInt(stat.number, 10);
            const suffix = stat.number.replace(/[0-9]/g, "");
            const offset = pieceOffsets[index];

            return (
              <motion.div
                key={stat.title}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: offset.x,
                        y: offset.y,
                      }
                }
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                  ease: EASE,
                }}
                className="
                  group relative min-w-0
                  overflow-visible
                "
              >
                {/* PUZZLE CONNECTOR — RIGHT */}
                <div
                  aria-hidden="true"
                  className={`
                    pointer-events-none
                    absolute top-1/2 -right-[8px]
                    z-20
                    h-7 w-4
                    -translate-y-1/2
                    rounded-r-full
                    border border-l-0
                    border-red-500/25
                    bg-[#121010]
                    shadow-[3px_0_12px_rgba(220,38,38,0.07)]
                    ${
                      index === 1 || index === 3
                        ? "hidden lg:block"
                        : ""
                    }
                    ${index === 3 ? "lg:hidden" : ""}
                  `}
                />

                {/* PUZZLE CONNECTOR — BOTTOM (MOBILE) */}
                {index < 2 && (
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute -bottom-[8px] left-1/2
                      z-20
                      h-4 w-7
                      -translate-x-1/2
                      rounded-b-full
                      border border-t-0
                      border-red-500/25
                      bg-[#121010]
                      lg:hidden
                    "
                  />
                )}

                {/* MAIN STAT CARD */}
                <div
                  className="
                    relative h-full
                    overflow-hidden
                    rounded-[18px]
                    border border-white/[0.09]
                    bg-gradient-to-b
                    from-[#151515]
                    to-[#0a0a0a]
                    p-3.5
                    transition-[border-color,background-color,box-shadow]
                    duration-300
                    hover:border-red-500/30
                    hover:shadow-[0_14px_35px_rgba(220,38,38,0.07)]
                    sm:rounded-[20px]
                    sm:p-5
                  "
                >
                  {/* TOP RED ACCENT */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute left-5 right-5 top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent via-red-500/60 to-transparent
                      opacity-60
                    "
                  />

                  {/* PUZZLE WATERMARK */}
                  <Puzzle
                    aria-hidden="true"
                    size={48}
                    strokeWidth={0.65}
                    className="
                      pointer-events-none
                      absolute right-2 top-2
                      text-red-500/[0.12]
                      sm:right-3 sm:top-3
                    "
                  />

                  {/* NUMBER */}
                  <h3
                    className="
                      relative font-bebas
                      text-[35px] font-black
                      leading-none tracking-[0.04em]
                      sm:text-[42px]
                    "
                  >
                    <span
                      className="
                        bg-gradient-to-br
                        from-white via-white to-red-400
                        bg-clip-text text-transparent
                      "
                    >
                      <Counter
                        end={numericValue}
                        suffix={suffix}
                      />
                    </span>
                  </h3>

                  {/* RED MARKER */}
                  <div
                    aria-hidden="true"
                    className="
                      relative mt-3 h-1 w-7
                      rounded-full bg-red-500
                      transition-[width] duration-300
                      group-hover:w-12
                    "
                  />

                  {/* TITLE */}
                  <h4
                    className="
                      relative mt-4
                      font-bebas
                      text-[13px] font-bold
                      uppercase tracking-[0.09em]
                      leading-tight text-white
                      transition-colors duration-300
                      group-hover:text-red-400
                      sm:text-base
                    "
                  >
                    {stat.title}
                  </h4>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      relative mt-2
                      text-[10px] leading-[1.6]
                      text-zinc-500
                      sm:text-[12px]
                    "
                  >
                    {stat.description}
                  </p>

                  {/* INDEX */}
                  <span
                    className="
                      absolute bottom-3 right-3
                      font-mono text-[9px]
                      tracking-[0.2em]
                      text-zinc-700
                      sm:bottom-4 sm:right-5
                    "
                  >
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
