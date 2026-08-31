import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../../../assets/images/kadecho-logo-256-optimized.webp";

export default function Logo() {
  return (
    <Link
      to="/"
      aria-label="Go to Home"
      className="
        group
        relative
        flex
        items-center
        justify-center
      "
    >

      {/* Ambient Glow */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2

          h-14
          w-14

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-red-600/20

          blur-2xl

          pointer-events-none
        "
      />


      {/* Outer Ring */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          inset-[-3px]

          rounded-full

          border
          border-red-500/10

          border-t-red-500/40

          pointer-events-none
        "
      />


      {/* Inner Ring */}

      <div
        className="
          absolute
          inset-[2px]

          rounded-full

          border
          border-white/[0.06]

          pointer-events-none
        "
      />


      {/* Logo Container */}

      <motion.div
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{
          scale: 0.97,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        className="
          relative
          z-10

          flex
          h-14
          w-14

          items-center
          justify-center

          overflow-hidden

          rounded-full

          border
          border-white/10

          bg-[#0b0b0b]

          shadow-[0_8px_30px_rgba(0,0,0,.35)]

          transition-all
          duration-500

          group-hover:border-red-500/30
          group-hover:shadow-[0_10px_35px_rgba(239,68,68,.18)]
        "
      >

        {/* Shine */}

        <motion.span
          initial={{
            x: "-140%",
          }}
          animate={{
            x: "140%",
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-y-0

            w-8

            skew-x-[-20deg]

            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent

            pointer-events-none

            z-20
          "
        />


        {/* Logo */}

        <motion.img
          src={logo}
          alt="KADECHO Logo"
          whileHover={{
            rotate: 2,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            relative
            z-10

            h-15
            w-15

            object-contain

            select-none
          "
        />


        {/* Bottom Red Accent */}

        <span
          className="
            absolute
            bottom-0
            left-1/2

            h-[2px]
            w-0

            -translate-x-1/2

            rounded-full

            bg-red-500

            shadow-[0_0_10px_rgba(239,68,68,.7)]

            transition-all
            duration-500

            group-hover:w-8
          "
        />

      </motion.div>

    </Link>
  );
}