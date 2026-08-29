
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTAButtons() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
      }}
      transition={{
        delay: 0.5,
        duration: 0.7,
      }}
      className="
        mt-9

        flex
        flex-col
        sm:flex-row

        items-center
        justify-center

        gap-3
      "
    >
      {/* Primary */}

      <Link
        to="/contact"
        className="group"
      >
        <motion.div
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            relative
            overflow-hidden

            rounded-full

            border
            border-red-500/30

            bg-gradient-to-r
            from-red-700
            via-red-600
            to-red-500

            px-6
            py-3

            shadow-[0_12px_35px_rgba(220,38,38,.22)]

            transition-all
            duration-300
          "
        >
          {/* Shine */}

          <span
            className="
              absolute
              inset-0

              -translate-x-full

              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent

              transition-transform
              duration-700

              group-hover:translate-x-full
            "
          />

          <span
            className="
              relative

              flex
              items-center
              gap-2.5

              font-bebas

              text-[13px]

              uppercase

              tracking-[0.22em]

              text-white
            "
          >
            Start Your Project

            <ArrowRight
              size={16}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </span>
        </motion.div>
      </Link>

      {/* Secondary */}

      <Link
        to="/projects"
        className="group"
      >
        <motion.div
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            rounded-full

            border
            border-white/12

            bg-white/[0.04]

            px-6
            py-3

            backdrop-blur-xl

            transition-all
            duration-300

            hover:border-red-500/35
            hover:bg-white/[0.07]
          "
        >
          <span
            className="
              flex
              items-center
              gap-2.5

              font-bebas

              text-[13px]

              uppercase

              tracking-[0.22em]

              text-white
            "
          >
            Explore Portfolio

            <FolderOpen
              size={16}
              className="
                transition-transform
                duration-300

                group-hover:rotate-[-6deg]
                group-hover:scale-105
              "
            />
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

