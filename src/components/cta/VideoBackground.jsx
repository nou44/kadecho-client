
import { motion } from "framer-motion";

export default function VideoBackground() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      <motion.video
        autoPlay
        muted
        loop
        playsInline

        initial={{
          scale: 1.04,
        }}

        animate={{
          scale: [1.04, 1.08, 1.04],
        }}

        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}

        className="
          absolute
          inset-0

          h-full
          w-full

          object-cover

          will-change-transform

          opacity-80
        "
      >
        <source
          src="/vedio1.mp4"
          type="video/mp4"
        />
      </motion.video>
    </div>
  );
}

