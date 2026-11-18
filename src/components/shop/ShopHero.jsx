
import { motion, useReducedMotion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function ShopHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-[#050505]
        pt-6 pb-3
        sm:pt-7 sm:pb-4
        lg:pt-8 lg:pb-5
      "
    >
      {/* STATIC CINEMATIC BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.12),transparent_65%)]
        "
      />

      {/* SUBTLE ARCHITECTURAL GRID */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.018]
          [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      {/* TOP LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-1/2 top-0
          h-px w-[240px] -translate-x-1/2
          bg-gradient-to-r
          from-transparent via-red-500/50 to-transparent
        "
      />

      {/* CORNER ACCENTS — DESKTOP */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-[6%] top-[22%]
          hidden h-10 w-10
          border-l border-t border-red-500/20
          lg:block
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-[6%] bottom-[18%]
          hidden h-10 w-10
          border-r border-b border-red-500/20
          lg:block
        "
      />

      {/* SIDE SHOWROOM MARKERS */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-[7%] top-1/2
          hidden -translate-y-1/2
          items-center gap-2
          lg:flex
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
        <span
          className="
            font-mono text-[8px]
            uppercase tracking-[0.2em]
            text-zinc-700
          "
        >
          KADECHO / 01
        </span>
      </div>

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-[7%] top-1/2
          hidden -translate-y-1/2
          items-center gap-2
          lg:flex
        "
      >
        <span
          className="
            font-mono text-[8px]
            uppercase tracking-[0.2em]
            text-zinc-700
          "
        >
          PREMIUM METAL
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
      </div>

      {/* CONTENT */}
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        transition={{ staggerChildren: 0.08 }}
        className="
          relative z-10 mx-auto
          max-w-5xl px-5
          text-center sm:px-6
        "
      >
        {/* BADGE */}
        <motion.div
          variants={reveal}
          transition={{ duration: 0.45, ease: EASE }}
          className="
            group relative inline-flex
            items-center gap-2.5
            rounded-full
            border border-red-500/20
            bg-red-500/[0.055]
            px-3 py-1
            shadow-[0_8px_24px_rgba(0,0,0,.2)]
            transition-[border-color,background-color]
            duration-300
            hover:border-red-500/40
            hover:bg-red-500/[0.09]
          "
        >
          <Gem
            size={11}
            strokeWidth={1.5}
            className="text-red-400"
          />

          <span
            className="
              font-bebas text-[9px]
              uppercase tracking-[0.28em]
              text-red-300
            "
          >
            Premium Collection
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.h1
          variants={reveal}
          transition={{ duration: 0.55, ease: EASE }}
          className="
            mt-3 font-bebas
            text-[31px] uppercase
            leading-[0.95]
            tracking-[0.055em]
            text-white
            sm:text-[39px]
            md:text-[48px]
            lg:text-[55px]
          "
        >
          Discover{" "}
          <span
            className="
              bg-gradient-to-r
              from-white via-red-400 to-red-600
              bg-clip-text text-transparent
              drop-shadow-[0_0_15px_rgba(239,68,68,0.12)]
            "
          >
            Luxury
          </span>{" "}
          Metal Creations
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={reveal}
          transition={{ duration: 0.5, ease: EASE }}
          className="
            mx-auto mt-2 max-w-xl
            font-satoshi
            text-[11px] leading-5
            text-zinc-500
            sm:text-[12px] sm:leading-6
          "
        >
          Explore handcrafted metal furniture, architectural
          pieces and bespoke creations crafted for modern luxury.
        </motion.p>

        {/* METALLIC DIVIDER */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { scaleX: 0, opacity: 0 }
          }
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 0.65,
            delay: 0.25,
            ease: EASE,
          }}
          className="
            relative mx-auto mt-3
            h-px w-[120px]
            origin-center
            bg-gradient-to-r
            from-transparent via-red-500/80 to-transparent
          "
        >
          <span
            className="
              absolute left-1/2 top-1/2
              h-1.5 w-1.5
              -translate-x-1/2 -translate-y-1/2
              rotate-45
              border border-red-400/60
              bg-[#050505]
            "
          />
        </motion.div>

        {/* MICRO LABEL */}
        <motion.div
          variants={reveal}
          transition={{ duration: 0.4, ease: EASE }}
          className="
            mt-3 flex items-center
            justify-center gap-2
            font-bebas
            text-[8px] uppercase
            tracking-[0.25em]
            text-zinc-600
          "
        >
          <span className="h-px w-5 bg-zinc-800" />

          <Sparkles
            size={10}
            className="text-red-500/50"
          />

          Crafted With Precision

          <span className="h-px w-5 bg-zinc-800" />
        </motion.div>
      </motion.div>

      {/* BOTTOM EDGE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          inset-x-0 bottom-0
          h-px bg-gradient-to-r
          from-transparent via-white/[0.06] to-transparent
        "
      />
    </section>
  );
}
