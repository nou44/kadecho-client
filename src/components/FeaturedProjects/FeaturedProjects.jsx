
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import FeaturedSlider from "./FeaturedSlider";

const EASE = [0.22, 1, 0.36, 1];

export default function FeaturedProjects() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0, y = 14) => ({
    initial: reduceMotion
      ? false
      : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: {
      once: true,
      amount: 0.2,
    },
    transition: {
      duration: reduceMotion ? 0 : 0.55,
      delay: reduceMotion ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="featured-projects"
      className="
        relative isolate overflow-hidden
        bg-[#050505]
        py-9
        sm:py-11
        lg:py-12
      "
    >
      {/* STATIC BACKGROUND — NO INFINITE ANIMATION */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute left-1/2 top-[-155px]
            h-[300px] w-[460px]
            -translate-x-1/2 rounded-full
            bg-red-600/[0.045]
            blur-[95px]
          "
        />

        <div
          className="
            absolute -bottom-24 -right-20
            h-[210px] w-[210px]
            rounded-full
            bg-red-700/[0.035]
            blur-[85px]
          "
        />

        {/* Subtle top separator */}
        <div
          className="
            absolute inset-x-0 top-0 h-px
            bg-gradient-to-r
            from-transparent
            via-white/[0.075]
            to-transparent
          "
        />
      </div>

      <div
        className="
          relative z-10 mx-auto
          max-w-7xl
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* HEADER */}
        <div className="relative mx-auto mb-5 max-w-2xl text-center sm:mb-6">
          <motion.div
            {...reveal(0, 10)}
            className="
              inline-flex items-center gap-2
              rounded-full border border-red-500/20
              bg-red-500/[0.045]
              px-3 py-1
            "
          >
            <span
              className="
                h-[5px] w-[5px] rounded-full
                bg-red-500
                shadow-[0_0_8px_rgba(239,68,68,.45)]
              "
            />

            <span
              className="
                font-bebas text-[9px]
                uppercase tracking-[0.22em]
                text-red-400
              "
            >
              Featured Projects
            </span>
          </motion.div>

          <motion.h2
            {...reveal(0.06, 13)}
            className="
              mt-2.5
              font-bebas
              text-[31px] leading-[0.95]
              tracking-[0.065em] uppercase
              sm:text-[38px]
              lg:text-[43px]
            "
          >
            <span className="text-white">
              Crafted To{" "}
            </span>
            <span
              className="
                bg-gradient-to-r
                from-white via-red-400 to-red-600
                bg-clip-text text-transparent
              "
            >
              Inspire
            </span>
          </motion.h2>

          {/* ACCENT */}
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.13,
              ease: EASE,
            }}
            className="
              mx-auto mt-2.5
              h-px w-12 origin-center
              bg-gradient-to-r
              from-transparent via-red-500 to-transparent
            "
          />

          <motion.p
            {...reveal(0.12, 10)}
            className="
              mx-auto mt-2.5 max-w-lg
              font-satoshi
              text-[11px] leading-[1.8]
              text-zinc-500
              sm:text-[12px]
            "
          >
            A curated selection of custom metalwork,
            designed with precision and crafted to last.
          </motion.p>
        </div>

        {/* FEATURED SLIDER — UNCHANGED */}
        <motion.div
          {...reveal(0.14, 15)}
          className="relative min-w-0"
        >
          <FeaturedSlider />
        </motion.div>

        {/* BOTTOM CTA */}
        <motion.div
          {...reveal(0.1, 10)}
          className="
            relative mt-6
            flex flex-col items-center justify-center
            gap-3 text-center
            sm:mt-7
          "
        >
          <div
            aria-hidden="true"
            className="
              h-px w-20
              bg-gradient-to-r
              from-transparent via-white/15 to-transparent
            "
          />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              className="
                font-satoshi text-[11px]
                text-zinc-500
              "
            >
              Have a project in mind?
            </span>

            <Link
              to="/contact"
              className="
                group relative inline-flex
                items-center justify-center gap-2
                overflow-hidden rounded-full
                border border-red-500/25
                bg-red-500/[0.09]
                px-4 py-2
                font-bebas text-[11px]
                uppercase tracking-[0.13em]
                text-red-300
                transition-[background-color,border-color,color,box-shadow]
                duration-300
                hover:border-red-500/50
                hover:bg-red-500/[0.15]
                hover:text-white
                hover:shadow-[0_0_22px_rgba(239,68,68,.10)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500/60
              "
            >
              <span>Start Your Project</span>

              <ArrowUpRight
                size={14}
                className="
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>

          <Link
            to="/projects"
            className="
              group inline-flex items-center gap-1.5
              font-bebas text-[10px]
              uppercase tracking-[0.16em]
              text-zinc-600
              transition-colors duration-300
              hover:text-zinc-300
            "
          >
            Explore All Projects

            <ArrowRight
              size={12}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
