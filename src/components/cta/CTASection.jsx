import { motion } from "framer-motion";

import VideoBackground from "./VideoBackground";
import CTAOverlay from "./CTAOverlay";
import CTAContent from "./CTAContent";
import CTAButtons from "./CTAButtons";
import CTAParticles from "./CTAParticles";

export default function CTASection() {
  return (
    <section
      className="
        relative

        isolate

        overflow-hidden

        bg-[#050505]

        py-28
        sm:py-32
        lg:py-40
      "
    >
      {/* Background Video */}

      <VideoBackground />

      {/* Overlay */}

      <CTAOverlay />

      <CTAParticles />

      {/* Content */}

      <div
        className="
          relative
          z-20

          mx-auto

          flex

          max-w-7xl

          flex-col

          items-center

          px-6

          text-center
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-4xl"
        >
          <CTAContent />

          <div className="mt-10">
            <CTAButtons />
          </div>
        </motion.div>
      </div>
    </section>
  );
}