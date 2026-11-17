
import { motion, useReducedMotion } from "framer-motion";
import ServiceSlider from "./ServiceSlider";

const EASE = [0.22, 1, 0.36, 1];

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="
        relative isolate overflow-hidden
        bg-[#050505]
        py-10 sm:py-12 lg:py-14
      "
    >
      {/* STATIC AMBIENCE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute left-1/2 top-[-160px]
            h-[310px] w-[430px]
            -translate-x-1/2
            rounded-full bg-red-600/[0.035]
            blur-[100px]
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
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 15 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: EASE,
          }}
          className="
            mx-auto mb-6
            max-w-xl text-center
            sm:mb-7
          "
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/[0.045]
              px-3 py-1
            "
          >
            <span
              className="
                h-[5px] w-[5px]
                rounded-full bg-red-500
              "
            />

            <span
              className="
                font-bebas text-[9px]
                uppercase tracking-[0.22em]
                text-red-400
              "
            >
              Our Services
            </span>
          </div>

          <h2
            className="
              mt-2.5 font-bebas
              text-[32px] uppercase
              leading-[0.95]
              tracking-[0.065em]
              text-white
              sm:text-[39px]
              lg:text-[44px]
            "
          >
            Premium{" "}
            <span
              className="
                bg-gradient-to-r
                from-red-400 to-red-600
                bg-clip-text text-transparent
              "
            >
              Services
            </span>
          </h2>

          <div
            aria-hidden="true"
            className="
              mx-auto mt-2.5
              h-px w-12
              bg-gradient-to-r
              from-transparent via-red-500
              to-transparent
            "
          />

          <p
            className="
              mx-auto mt-3 max-w-lg
              font-satoshi
              text-[11px] leading-[1.8]
              text-zinc-500
              sm:text-[12px]
            "
          >
            Bespoke metalwork, luxury furniture and
            architectural solutions crafted with precision
            for exceptional spaces.
          </p>
        </motion.div>

        {/* SLIDER */}
        <ServiceSlider />
      </div>
    </section>
  );
}
