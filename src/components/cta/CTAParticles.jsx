import { motion } from "framer-motion";

const particles = Array.from({ length: 18 });

export default function CTAParticles() {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        z-10

        overflow-hidden
      "
    >
      {particles.map((_, index) => {
        const size = Math.random() * 5 + 2;

        return (
          <motion.span
            key={index}
            initial={{
              y: "110%",
              x: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              y: "-20%",
              opacity: [0, .5, .15, 0],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
            style={{
              width: size,
              height: size,
            }}
            className="
              absolute

              rounded-full

              bg-red-500/40

              blur-[2px]
            "
          />
        );
      })}
    </div>
  );
}