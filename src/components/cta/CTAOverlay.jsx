
import { motion } from "framer-motion";

export default function CTAOverlay() {
  return (
    <>
      {/* Main Overlay */}

      <div
        className="
          absolute
          inset-0
          z-10

          bg-black/50
        "
      />

      {/* Cinematic Gradient */}

      <div
        className="
          absolute
          inset-0
          z-10

          bg-gradient-to-b
          from-black/65
          via-black/35
          to-[#050505]
        "
      />

      {/* Top Red Glow */}

      <motion.div
        animate={{
          opacity: [0.18, 0.32, 0.18],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute

          left-1/2
          top-[-260px]

          z-10

          h-[480px]
          w-[480px]

          -translate-x-1/2

          rounded-full

          bg-red-600/15

          blur-[150px]
        "
      />

      {/* Bottom Red Glow */}

      <motion.div
        animate={{
          opacity: [0.10, 0.22, 0.10],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute

          -bottom-32
          left-1/2

          z-10

          h-[300px]
          w-[520px]

          -translate-x-1/2

          rounded-full

          bg-red-600/10

          blur-[130px]
        "
      />

      {/* Vignette */}

      <div
        className="
          absolute
          inset-0

          z-10

          shadow-[inset_0_0_140px_rgba(0,0,0,.85)]
        "
      />
    </>
  );
}
