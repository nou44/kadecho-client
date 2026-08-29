
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  if (!item) return null;

  return (
    <motion.div
      layout
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className="
        group
        relative
        overflow-hidden

        rounded-xl

        border
        border-white/[0.08]

        bg-[#0d0d0d]

        p-2.5

        transition-all
        duration-300

        hover:border-red-500/20
      "
    >
      {/* TOP ACCENT */}

      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.35 }}
        className="
          absolute
          left-0
          top-0

          h-px
          bg-gradient-to-r
          from-red-500
          via-red-400
          to-transparent
        "
      />

      <div className="flex gap-2.5">

        {/* IMAGE */}

        <div
          className="
            relative

            h-[62px]
            w-[62px]

            shrink-0
            overflow-hidden

            rounded-lg

            border
            border-white/[0.08]

            bg-black
          "
        >
          <img
            src={item.image}
            alt={item.name}
            className="
              h-full
              w-full
              object-cover

              transition-transform
              duration-500

              group-hover:scale-105
            "
          />

          {/* Image Shade */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/30
              to-transparent
            "
          />
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          {/* TOP */}

          <div className="flex items-start gap-2">

            <div className="min-w-0 flex-1">

              {/* CATEGORY */}

              <span
                className="
                  inline-flex

                  rounded-full

                  border
                  border-red-500/15

                  bg-red-500/[0.07]

                  px-1.5
                  py-[2px]

                  text-[7px]
                  font-semibold

                  uppercase
                  tracking-[0.16em]

                  text-red-400
                "
              >
                {item.category}
              </span>

              {/* NAME */}

              <h3
                className="
                  mt-1

                  truncate

                  font-bebas

                  text-[16px]

                  leading-none

                  tracking-[0.04em]

                  text-white

                  transition-colors
                  duration-300

                  group-hover:text-red-50
                "
              >
                {item.name}
              </h3>

              {/* MATERIAL */}

              <p
                className="
                  mt-1

                  truncate

                  text-[9px]

                  leading-none

                  text-zinc-600
                "
              >
                {item.material || "Premium"}
                {item.finish
                  ? ` • ${item.finish}`
                  : ""}
              </p>

            </div>

            {/* DELETE */}

            <motion.button
              type="button"
              onClick={() => onRemove?.(item)}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="
                flex
                h-7
                w-7

                shrink-0

                items-center
                justify-center

                rounded-lg

                border
                border-white/[0.06]

                bg-white/[0.025]

                text-zinc-600

                transition-all
                duration-200

                hover:border-red-500/20
                hover:bg-red-500/[0.08]
                hover:text-red-400
              "
            >
              <Trash2 size={13} />
            </motion.button>

          </div>

          {/* BOTTOM */}

          <div
            className="
              mt-2.5

              flex
              items-center
              justify-between

              gap-2
            "
          >

            {/* QUANTITY */}

            <div
              className="
                flex
                h-7

                items-center

                overflow-hidden

                rounded-lg

                border
                border-white/[0.07]

                bg-black/40
              "
            >

              <motion.button
                type="button"
                onClick={() =>
                  onDecrease?.(item)
                }
                whileTap={{ scale: 0.85 }}
                className="
                  flex
                  h-7
                  w-7

                  items-center
                  justify-center

                  text-zinc-600

                  transition-colors

                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >
                <Minus size={12} />
              </motion.button>

              <span
                className="
                  flex
                  h-7
                  min-w-7

                  items-center
                  justify-center

                  border-x
                  border-white/[0.07]

                  px-1

                  text-[10px]
                  font-semibold

                  text-white
                "
              >
                {item.quantity}
              </span>

              <motion.button
                type="button"
                onClick={() =>
                  onIncrease?.(item)
                }
                whileTap={{ scale: 0.85 }}
                className="
                  flex
                  h-7
                  w-7

                  items-center
                  justify-center

                  text-zinc-600

                  transition-colors

                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >
                <Plus size={12} />
              </motion.button>

            </div>

            {/* PRICE */}

            <div className="text-right">

              <p
                className="
                  text-[7px]

                  uppercase
                  tracking-[0.18em]

                  text-zinc-700
                "
              >
                Price
              </p>

              <h4
                className="
                  mt-0.5

                  whitespace-nowrap

                  font-bebas

                  text-[17px]

                  leading-none

                  tracking-wide

                  text-red-400
                "
              >
                {Number(
                  item.price || 0
                ).toLocaleString()}{" "}
                <span className="text-[11px]">
                  DH
                </span>
              </h4>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM GLOW */}

      <div
        className="
          pointer-events-none

          absolute
          -bottom-8
          left-1/2

          h-16
          w-24

          -translate-x-1/2

          rounded-full

          bg-red-600/10

          opacity-0

          blur-2xl

          transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />

    </motion.div>
  );
}

