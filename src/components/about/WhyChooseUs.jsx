
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Container from "../ui/Container";
import {
  ShieldCheck,
  PenTool,
  Hammer,
  Truck,
  ArrowUpRight,
  Puzzle,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "We use carefully selected materials and maintain high manufacturing standards to deliver durable, elegant results.",
    label: "QUALITY",
  },
  {
    icon: PenTool,
    title: "Custom Design",
    description:
      "Every project is tailored to your space, style, and functional requirements for a truly unique result.",
    label: "DESIGN",
  },
  {
    icon: Hammer,
    title: "Expert Craftsmanship",
    description:
      "Our experienced team pays attention to every detail, ensuring precision from fabrication to finishing.",
    label: "CRAFT",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "From planning to installation, we keep projects on schedule while maintaining exceptional quality.",
    label: "DELIVERY",
  },
];

const assembly = [
  { x: -35, y: -25, rotate: -4 },
  { x: 35, y: -25, rotate: 4 },
  { x: -35, y: 25, rotate: 4 },
  { x: 35, y: 25, rotate: -4 },
];

function PuzzleCore() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute
        left-1/2 top-1/2 z-30
        flex h-14 w-14
        -translate-x-1/2 -translate-y-1/2
        items-center justify-center
        rounded-2xl
        border border-red-500/40
        bg-[#090909]
        shadow-[0_0_0_5px_#050505,0_0_25px_rgba(220,38,38,0.12)]
        sm:h-16 sm:w-16
      "
    >
      <div
        className="
          absolute inset-1.5
          rounded-xl border border-white/10
          bg-gradient-to-br
          from-red-500/15 to-transparent
        "
      />

      <Puzzle
        size={23}
        strokeWidth={1.2}
        className="relative text-red-400 sm:h-7 sm:w-7"
      />
    </div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });
  const reduceMotion = useReducedMotion();
  const assembled = isInView || reduceMotion;

  return (
    <section
      ref={sectionRef}
      className="
        relative isolate overflow-hidden
        bg-[#050505]
        py-12 sm:py-14 lg:py-16
      "
    >
      {/* STATIC ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_55%,rgba(220,38,38,0.07),transparent_60%)]
        "
      />

      {/* ARCHITECTURAL GRID */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.02]
          [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      <Container className="relative z-10">
        {/* HEADER */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={assembled ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: EASE }}
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
            Why Choose Us
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
            Why Clients{" "}
            <span
              className="
                bg-gradient-to-r
                from-red-500 via-red-400 to-orange-400
                bg-clip-text text-transparent
              "
            >
              Trust KADECHO
            </span>
          </h2>

          <div
            aria-hidden="true"
            className="
              mx-auto mt-4 h-[2px] w-[90px]
              bg-gradient-to-r
              from-transparent via-red-500 to-transparent
            "
          />

          <p
            className="
              mx-auto mt-4 max-w-xl
              text-[12px] leading-6
              text-zinc-500 sm:text-[13px]
            "
          >
            We combine creativity, precision and premium
            craftsmanship to create metal solutions built
            around your vision.
          </p>
        </motion.div>

        {/* ASSEMBLY CAPTION */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={assembled ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="
            mt-8 flex items-center justify-center gap-3
            sm:mt-9
          "
        >
          <span className="h-px w-7 bg-red-500/30" />
          <span
            className="
              font-mono text-[9px]
              uppercase tracking-[0.22em]
              text-zinc-500
            "
          >
            Four pieces. One standard.
          </span>
          <span className="h-px w-7 bg-red-500/30" />
        </motion.div>

        {/* PUZZLE ASSEMBLY GRID */}
        <div
          className="
            relative mx-auto mt-5
            grid max-w-5xl grid-cols-2
            gap-2.5 sm:gap-3
            lg:gap-4
          "
        >
          {/* CENTER CORE */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={
              assembled
                ? { opacity: 1, scale: 1 }
                : undefined
            }
            transition={{
              duration: 0.55,
              delay: 0.7,
              ease: EASE,
            }}
            className="
              pointer-events-none absolute inset-0 z-30
            "
          >
            <PuzzleCore />
          </motion.div>

          {features.map((feature, index) => {
            const Icon = feature.icon;
            const offset = assembly[index];

            return (
              <motion.article
                key={feature.title}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        x: offset.x,
                        y: offset.y,
                        rotate: offset.rotate,
                        scale: 0.96,
                      }
                }
                animate={
                  assembled
                    ? {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                      }
                    : undefined
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: EASE,
                }}
                className="
                  group relative min-w-0
                  overflow-hidden
                  rounded-[18px]
                  border border-white/[0.09]
                  bg-gradient-to-br
                  from-[#171717] via-[#0c0c0c] to-[#070707]
                  p-3.5
                  transition-[border-color,box-shadow]
                  duration-300
                  hover:border-red-500/30
                  hover:shadow-[0_12px_40px_rgba(220,38,38,0.08)]
                  sm:rounded-[22px] sm:p-6
                "
              >
                {/* TOP RED EDGE */}
                <div
                  aria-hidden="true"
                  className="
                    absolute left-0 top-0
                    h-px w-20
                    bg-gradient-to-r
                    from-red-500/80 to-transparent
                    transition-[width] duration-300
                    group-hover:w-full
                  "
                />

                {/* LARGE PUZZLE WATERMARK */}
                <Puzzle
                  aria-hidden="true"
                  size={86}
                  strokeWidth={0.55}
                  className="
                    pointer-events-none
                    absolute -right-5 -top-5
                    text-red-500/[0.065]
                    sm:h-28 sm:w-28
                  "
                />

                {/* TOP ROW */}
                <div
                  className="
                    relative flex items-start
                    justify-between gap-2
                  "
                >
                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl
                      border border-red-500/20
                      bg-red-500/[0.09]
                      text-red-400
                      transition-[background-color,transform]
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:bg-red-500/15
                      sm:h-12 sm:w-12
                    "
                  >
                    <Icon size={20} strokeWidth={1.7} />
                  </div>

                  <span
                    className="
                      font-mono text-[9px]
                      tracking-[0.22em]
                      text-zinc-600
                    "
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* TITLE */}
                <h3
                  className="
                    relative mt-5
                    font-bebas text-[16px]
                    uppercase leading-tight
                    tracking-[0.07em]
                    text-white
                    transition-colors duration-300
                    group-hover:text-red-400
                    sm:text-[22px]
                  "
                >
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className="
                    relative mt-2
                    text-[10px] leading-[1.7]
                    text-zinc-500
                    sm:text-[12px] sm:leading-6
                  "
                >
                  {feature.description}
                </p>

                {/* BOTTOM BAR */}
                <div
                  className="
                    relative mt-5 flex items-center
                    justify-between gap-2
                    border-t border-white/[0.06]
                    pt-4
                  "
                >
                  <span
                    className="
                      font-mono text-[8px]
                      uppercase tracking-[0.15em]
                      text-zinc-600
                    "
                  >
                    KADECHO STANDARD
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="
                      shrink-0 text-zinc-600
                      transition-[color,transform]
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-red-400
                    "
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* FINAL SIGNATURE */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={assembled ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="
            mt-6 text-center
            font-mono text-[9px]
            uppercase tracking-[0.22em]
            text-zinc-600
          "
        >
          Precision connects everything.
        </motion.p>
      </Container>
    </section>
  );
}
