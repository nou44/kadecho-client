
import { motion } from "framer-motion";

import Container from "../../ui/Container";

import FooterHero from "./FooterHero";
import FooterContent from "./FooterContent";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden

        border-t
        border-red-500/[0.08]

        bg-[#050505]
      "
    >
      {/* TOP ACCENT */}
      <motion.div
        animate={{
          backgroundPosition: [
            "0% 50%",
            "100% 50%",
            "0% 50%",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-20

          h-px
          w-full

          bg-gradient-to-r
          from-transparent
          via-red-500/80
          to-transparent

          bg-[length:200%_100%]
        "
      />

      {/* MAIN ATMOSPHERE */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-220px]

          h-[520px]
          w-[520px]

          -translate-x-1/2

          rounded-full
          bg-red-600/[0.07]

          blur-[160px]
        "
      />

      {/* SECONDARY GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-[-120px]

          h-[300px]
          w-[300px]

          rounded-full
          bg-red-600/[0.035]

          blur-[120px]
        "
      />

      {/* SUBTLE GRID */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0

          opacity-[0.018]

          [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]

          [background-size:80px_80px]
        "
      />

      <Container>
        <div className="relative z-10">
          {/* BRAND + CTA */}
          <FooterHero />

          {/* CONTACT + NAVIGATION + NEWSLETTER */}
          <FooterContent />

          {/* COPYRIGHT + LEGAL */}
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}

