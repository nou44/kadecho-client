
import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyCart() {
  return (
    <div
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center

        px-6
        py-12

        text-center
      "
    >
      {/* ICON */}

      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.8,
          ease: "easeInOut",
        }}
        className="
          relative

          flex
          h-16
          w-16

          items-center
          justify-center

          rounded-2xl

          border
          border-red-500/15

          bg-gradient-to-br
          from-red-500/[0.10]
          to-white/[0.02]

          text-red-400

          shadow-[0_12px_40px_rgba(220,38,38,.08)]
        "
      >
        <ShoppingBag size={25} />

        {/* Glow */}

        <span
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl

            bg-red-500/10

            opacity-0
            blur-xl

            transition-opacity
            duration-500

            hover:opacity-100
          "
        />
      </motion.div>

      {/* STATUS */}

      <div
        className="
          mt-6

          flex
          items-center
          gap-2
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-red-500
          "
        />

        <span
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.28em]
            text-zinc-600
          "
        >
          Cart Empty
        </span>
      </div>

      {/* TITLE */}

      <h2
        className="
          mt-2

          font-bebas

          text-[28px]

          leading-none

          tracking-[0.04em]

          text-white
        "
      >
        Your Cart Is Empty
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          mt-3

          max-w-[280px]

          text-[11px]

          leading-6

          text-zinc-600
        "
      >
        Discover our premium metal creations
        and add something exceptional to your
        collection.
      </p>

      {/* BUTTON */}

      <motion.button
        type="button"
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="
          group

          relative

          mt-7

          flex
          h-10

          items-center
          justify-center
          gap-2

          overflow-hidden

          rounded-xl

          bg-gradient-to-r
          from-red-700
          to-red-500

          px-6

          text-[9px]
          font-semibold

          uppercase
          tracking-[0.2em]

          text-white

          shadow-[0_10px_30px_rgba(220,38,38,.18)]

          transition-all
          duration-300

          hover:shadow-[0_12px_35px_rgba(220,38,38,.28)]
        "
      >
        {/* SHINE */}

        <span
          className="
            absolute
            inset-y-0
            left-[-80%]

            w-1/2

            rotate-12

            bg-white/15

            blur-md

            transition-transform
            duration-700

            group-hover:translate-x-[300%]
          "
        />

        <span className="relative z-10">
          Explore Products
        </span>

        <ArrowRight
          size={13}
          className="
            relative
            z-10

            transition-transform
            duration-300

            group-hover:translate-x-1
          "
        />

      </motion.button>
    </div>
  );
}

