
import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Container from "../ui/Container";
import {
  Sparkles,
  ArrowUpRight,
  Check,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const features = [
  "Premium Quality",
  "Custom Design",
  "Expert Team",
];

const puzzlePieces = [
  { x: -22, y: -18, delay: 0 },
  { x: 22, y: -18, delay: 0.1 },
  { x: -22, y: 18, delay: 0.2 },
  { x: 22, y: 18, delay: 0.3 },
];

export default function AboutStory() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  const reduceMotion = useReducedMotion();
  const animate = isInView || reduceMotion;

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        bg-[#050505]
        py-12 sm:py-14 lg:py-16
      "
    >
      {/* STATIC ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_20%_45%,rgba(220,38,38,0.055),transparent_55%)]
        "
      />

      {/* ARCHITECTURAL GRID */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.018]
          [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      <Container className="relative z-10">
        <div
          className="
            grid items-center gap-9
            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-12 xl:gap-16
          "
        >
          {/* ======================================
              PUZZLE IMAGE
          ====================================== */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 16 }
            }
            animate={
              animate
                ? { opacity: 1, y: 0 }
                : undefined
            }
            transition={{
              duration: 0.55,
              ease: EASE,
            }}
            className="group relative min-w-0"
          >
            <div
              className="
                relative overflow-hidden
                rounded-[24px]
                border border-white/10
                bg-[#080808]
                shadow-[0_25px_65px_rgba(0,0,0,.35)]
              "
            >
              {/* PUZZLE 2x2 GRID */}
              <div
                className="
                  relative grid
                  h-[280px] w-full
                  grid-cols-2 grid-rows-2
                  overflow-hidden
                  sm:h-[340px]
                  lg:h-[500px]
                "
              >
                {puzzlePieces.map((piece, index) => {
                  const col = index % 2;
                  const row = Math.floor(index / 2);

                  return (
                    <motion.div
                      key={index}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0.25,
                              x: piece.x,
                              y: piece.y,
                            }
                      }
                      animate={
                        animate
                          ? {
                              opacity: 1,
                              x: 0,
                              y: 0,
                            }
                          : undefined
                      }
                      transition={{
                        duration: 0.85,
                        delay: piece.delay,
                        ease: EASE,
                      }}
                      className="
                        relative overflow-hidden
                        will-change-transform
                      "
                    >
                      <img
                        src="/about4.png"
                        alt={
                          index === 0
                            ? "KADECHO premium metal craftsmanship"
                            : ""
                        }
                        aria-hidden={index !== 0}
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        className="
                          pointer-events-none
                          absolute max-w-none
                          object-cover
                        "
                        style={{
                          width: "200%",
                          height: "200%",
                          left: `${-col * 100}%`,
                          top: `${-row * 100}%`,
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* SUBTLE PUZZLE SEAMS */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute inset-y-0 left-1/2
                    z-10 w-px
                    bg-gradient-to-b
                    from-transparent
                    via-red-500/25
                    to-transparent
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute inset-x-0 top-1/2
                    z-10 h-px
                    bg-gradient-to-r
                    from-transparent
                    via-red-500/25
                    to-transparent
                  "
                />
              </div>

              {/* CINEMATIC OVERLAY */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/10
                  to-transparent
                "
              />

              {/* BOTTOM RED EDGE */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-x-0 bottom-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-red-500/70
                  to-transparent
                "
              />

              {/* FLOATING LABEL */}
              <div
                className="
                  absolute bottom-4 left-4 right-4
                  flex items-center justify-between
                  rounded-xl
                  border border-white/10
                  bg-black/70
                  px-4 py-3
                  sm:bottom-5 sm:left-5 sm:right-5
                "
              >
                <div>
                  <p
                    className="
                      text-[8px] uppercase
                      tracking-[0.25em]
                      text-zinc-500
                    "
                  >
                    KADECHO
                  </p>

                  <p
                    className="
                      mt-1 text-[11px]
                      font-semibold uppercase
                      tracking-[0.08em]
                      text-white
                    "
                  >
                    Crafted With Precision
                  </p>
                </div>

                <div
                  className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    border border-red-500/20
                    bg-red-500/10
                    text-red-400
                  "
                >
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================================
              CONTENT
          ====================================== */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 16 }
            }
            animate={
              animate
                ? { opacity: 1, y: 0 }
                : undefined
            }
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: EASE,
            }}
            className="min-w-0"
          >
            {/* BADGE */}
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-red-500/20
                bg-red-500/[0.07]
                px-3 py-1.5
                text-[9px] font-semibold
                uppercase tracking-[0.24em]
                text-red-400
              "
            >
              <Sparkles size={11} />
              Our Story
            </span>

            {/* TITLE */}
            <h2
              className="
                mt-4 max-w-xl
                font-bebas font-black
                uppercase leading-[0.9]
                tracking-[0.025em]
                text-[36px]
                sm:text-[44px]
                lg:text-[52px]
                xl:text-[58px]
              "
            >
              <span className="text-white">
                Turning Metal Into
              </span>
              <br />
              <span
                className="
                  bg-gradient-to-r
                  from-red-400 via-red-500 to-orange-400
                  bg-clip-text text-transparent
                "
              >
                Timeless Luxury
              </span>
            </h2>

            {/* RED LINE */}
            <div
              aria-hidden="true"
              className="
                mt-4 h-[2px] w-[85px]
                rounded-full
                bg-gradient-to-r
                from-red-600 via-red-400 to-transparent
              "
            />

            {/* DESCRIPTION */}
            <div className="mt-5 max-w-xl space-y-3">
              <p
                className="
                  text-[11px] leading-6
                  text-zinc-400
                  sm:text-[12px]
                  lg:text-[13px] lg:leading-7
                "
              >
                At KADECHO, every project is built with
                precision, creativity and attention to detail.
                We combine modern engineering with handcrafted
                metal artistry to create unique spaces that
                last for years.
              </p>

              <p
                className="
                  text-[11px] leading-6
                  text-zinc-500
                  sm:text-[12px]
                  lg:text-[13px] lg:leading-7
                "
              >
                From pergolas and staircases to luxury furniture,
                gates and custom structures, our passion is
                turning your vision into reality.
              </p>
            </div>

            {/* FEATURES */}
            <div
              className="
                mt-6 grid grid-cols-3
                gap-2 sm:gap-3
              "
            >
              {features.map((item) => (
                <div
                  key={item}
                  className="
                    group/feature
                    rounded-xl
                    border border-white/[0.08]
                    bg-white/[0.025]
                    p-3
                    transition-[border-color,background-color]
                    duration-300
                    hover:border-red-500/25
                    hover:bg-white/[0.04]
                  "
                >
                  <div
                    className="
                      flex h-7 w-7
                      items-center justify-center
                      rounded-lg
                      bg-red-500/10
                      text-red-400
                      transition-colors duration-300
                      group-hover/feature:bg-red-500
                      group-hover/feature:text-white
                    "
                  >
                    <Check size={13} />
                  </div>

                  <p
                    className="
                      mt-2 text-[8px]
                      font-semibold uppercase
                      tracking-[0.12em]
                      leading-4
                      text-zinc-300
                      sm:text-[9px]
                    "
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* MISSION */}
            <div
              className="
                relative mt-5
                overflow-hidden
                rounded-[20px]
                border border-white/10
                bg-gradient-to-br
                from-white/[0.045]
                to-white/[0.015]
                p-4 sm:p-5
              "
            >
              {/* STATIC TOP ACCENT */}
              <div
                aria-hidden="true"
                className="
                  absolute left-0 top-0
                  h-px w-24
                  bg-gradient-to-r
                  from-red-500/80 to-transparent
                "
              />

              <div className="flex items-start gap-3">
                <div
                  aria-hidden="true"
                  className="
                    mt-0.5 h-7 w-1
                    shrink-0 rounded-full
                    bg-gradient-to-b
                    from-red-400 to-red-700
                  "
                />

                <div>
                  <p
                    className="
                      text-[8px] font-semibold
                      uppercase tracking-[0.24em]
                      text-red-400
                    "
                  >
                    Our Mission
                  </p>

                  <h3
                    className="
                      mt-1.5 font-bebas
                      text-xl uppercase
                      tracking-[0.04em]
                      text-white sm:text-2xl
                    "
                  >
                    Excellence In Every Detail
                  </h3>

                  <p
                    className="
                      mt-2 max-w-xl
                      text-[10px] leading-5
                      text-zinc-500
                      sm:text-[11px] sm:leading-6
                    "
                  >
                    We create premium custom metal solutions
                    that combine durability, innovation and
                    timeless luxury, ensuring every project
                    exceeds our clients&apos; expectations.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
