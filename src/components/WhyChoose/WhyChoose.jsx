
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import FeatureCard from "./FeatureCard";
import { features } from "./whyChooseData";

const EASE = [0.22, 1, 0.36, 1];

export default function WhyChoose() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        bg-[#050505]
        py-10 sm:py-12 lg:py-14
      "
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute left-1/2 top-0
            h-[320px] w-[320px]
            -translate-x-1/2
            rounded-full
            bg-red-600/[0.055]
            blur-[85px]
          "
        />

        <div
          className="
            absolute bottom-0 left-0
            h-[200px] w-[200px]
            rounded-full
            bg-red-600/[0.035]
            blur-[65px]
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
              : { opacity: 0, y: 20 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.55,
            ease: EASE,
          }}
          className="
            mx-auto mb-9
            max-w-2xl text-center
            sm:mb-11
          "
        >
          {/* BADGE */}
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/[0.05]
              px-3 py-1.5
            "
          >
            <span
              className="
                h-1.5 w-1.5 rounded-full
                bg-red-500
                shadow-[0_0_10px_rgba(239,68,68,.8)]
              "
            />

            <span
              className="
                font-bebas
                text-[9px] uppercase
                tracking-[0.28em]
                text-red-400
                sm:text-[10px]
              "
            >
              Why Choose KADECHO
            </span>
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-4 font-bebas
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
                motion-safe:animate-gradient-x
              "
            >
              Precision
            </span>
            <span className="text-zinc-500">.</span>
          </h2>

          {/* ACCENT */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : { scaleX: 0 }
            }
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: EASE,
            }}
            style={{ transformOrigin: "center" }}
            className="
              mx-auto mt-4
              h-[2px] w-[55px]
              rounded-full bg-red-500
              shadow-[0_0_15px_rgba(239,68,68,.4)]
            "
          />

          {/* DESCRIPTION */}
          <p
            className="
              mx-auto mt-4 max-w-xl
              font-satoshi
              text-[12px] leading-6
              text-zinc-500
              sm:text-[13px]
            "
          >
            Premium metal craftsmanship, refined details
            and custom creations built to last.
          </p>
        </motion.div>

        {/* PUZZLE BOARD */}
        <div
          className="
            relative mx-auto
            max-w-[1120px]
          "
        >
          {/* BACKGROUND LIGHT */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-8
              rounded-[40px]
              bg-red-600/[0.045]
              blur-[50px]
            "
          />

          {/* MOBILE + TABLET: 2 x 3 */}
          <div
            className="
              relative grid grid-cols-2
              gap-0
              lg:hidden
            "
          >
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="
                  relative min-w-0
                  h-[255px]
                  sm:h-[235px]
                "
              >
                <FeatureCard
                  feature={feature}
                  index={index}
                  columns={2}
                />
              </div>
            ))}
          </div>

          {/* DESKTOP: 3 x 2 */}
          <div
            className="
              relative hidden
              grid-cols-3
              gap-0
              lg:grid
            "
          >
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="
                  relative min-w-0
                  h-[240px]
                "
              >
                <FeatureCard
                  feature={feature}
                  index={index}
                  columns={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
