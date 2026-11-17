
import { motion, useReducedMotion } from "framer-motion";

import VideoBackground from "./VideoBackground";
import CTAOverlay from "./CTAOverlay";
import CTAContent from "./CTAContent";
import CTAButtons from "./CTAButtons";
import CTAParticles from "./CTAParticles";

const EASE = [0.22, 1, 0.36, 1];

export default function CTASection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="start-project"
      aria-labelledby="cta-heading"
      className="
        relative isolate overflow-hidden
        bg-[#050505]
        py-14 sm:py-16 lg:py-[76px]
      "
    >
      <VideoBackground />
      <CTAOverlay />
      <CTAParticles />

      <div
        className="
          relative z-20 mx-auto
          w-full max-w-7xl
          px-4 sm:px-6 lg:px-8
        "
      >
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: EASE,
          }}
          className="
            mx-auto flex max-w-[680px]
            flex-col items-center text-center
          "
        >
          <CTAContent />

          <div className="mt-6 sm:mt-7">
            <CTAButtons />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
