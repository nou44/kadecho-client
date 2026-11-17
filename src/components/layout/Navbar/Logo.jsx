
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import logo from "../../../assets/images/kadecho-logo-250.webp";

const EASE = [0.22, 1, 0.36, 1];

function Logo() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(document.visibilityState === "visible");
    };

    updateVisibility();

    document.addEventListener(
      "visibilitychange",
      updateVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        updateVisibility
      );
    };
  }, []);

  const canAnimate = visible && !reduceMotion;

  return (
    <Link
      to="/"
      aria-label="KADECHO — Accueil"
      title="KADECHO"
      className="
        group relative inline-flex
        shrink-0 items-center justify-center
        rounded-full
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-red-500/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#090909]
      "
    >
      {/* AMBIENT GLOW */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={
          canAnimate
            ? {
                opacity: [0.45, 0.8, 0.45],
                scale: [1, 1.1, 1],
              }
            : {
                opacity: 0.45,
                scale: 1,
              }
        }
        transition={
          canAnimate
            ? {
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0.2,
              }
        }
        className="
          pointer-events-none absolute
          inset-[-9px] rounded-full
          bg-red-600/[0.13]
          blur-xl
        "
      />

      {/* ROTATING OUTER RING */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={
          canAnimate
            ? { rotate: 360 }
            : { rotate: 0 }
        }
        transition={
          canAnimate
            ? {
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }
            : {
                duration: 0,
              }
        }
        className="
          pointer-events-none absolute
          inset-[-4px] rounded-full
          border border-white/[0.07]
          border-t-red-500/70
          border-r-red-500/20
        "
      />

      {/* SECONDARY STATIC RING */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          inset-[1px] rounded-full
          border border-white/[0.06]
        "
      />

      {/* LOGO CONTAINER */}
      <motion.span
        whileHover={
          reduceMotion
            ? undefined
            : { scale: 1.055, rotate: 1.5 }
        }
        whileTap={
          reduceMotion
            ? undefined
            : { scale: 0.96 }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="
          relative z-10 flex
          h-[50px] w-[50px]
          items-center justify-center
          overflow-hidden rounded-full

          border border-white/10
          bg-[#0b0b0b]

          shadow-[0_6px_22px_rgba(0,0,0,0.35)]

          transition-[border-color,box-shadow]
          duration-300

          group-hover:border-red-500/35
          group-hover:shadow-[0_8px_26px_rgba(220,38,38,0.18)]

          sm:h-[52px] sm:w-[52px]
        "
      >
        {/* SHINE */}
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={
            canAnimate
              ? { x: ["-180%", "450%"] }
              : { x: "-180%" }
          }
          transition={
            canAnimate
              ? {
                  duration: 1.3,
                  repeat: Infinity,
                  repeatDelay: 6,
                  ease: EASE,
                }
              : {
                  duration: 0,
                }
          }
          className="
            pointer-events-none absolute
            inset-y-0 left-0 z-20
            w-5 skew-x-[-20deg]
            bg-gradient-to-r
            from-transparent via-white/15 to-transparent
          "
        />

        {/* BRAND IMAGE */}
        <img
          src={logo}
          alt="KADECHO"
          width="52"
          height="52"
          decoding="async"
          fetchPriority="high"
          className="
            relative z-10 h-full w-full
            select-none object-contain
          "
        />

        {/* BOTTOM RED ACCENT */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            bottom-0 left-1/2 z-20
            h-[2px] w-0
            -translate-x-1/2
            rounded-full bg-red-500
            shadow-[0_0_8px_rgba(239,68,68,.5)]
            transition-[width] duration-300
            group-hover:w-7
          "
        />
      </motion.span>
    </Link>
  );
}

export default memo(Logo);
