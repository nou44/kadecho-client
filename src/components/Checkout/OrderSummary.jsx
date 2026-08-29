import { motion } from "framer-motion";
import {
  ShoppingBag,
  ShieldCheck,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

export default function OrderSummary() {
  const {
    items,
    totalItems,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  if (!items.length) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#0a0a0a]
      "
    >
      {/* Animated top line */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-white/5">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            h-full
            w-1/3
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />
      </div>

      {/* Header */}
      <div className="relative border-b border-white/8 px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between">
          <div>
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-red-400
              "
            >
              Order Summary
            </span>

            <h2
              className="
                mt-1
                font-bebas
                text-3xl
                uppercase
                leading-none
                tracking-wide
                text-white
              "
            >
              Your Cart
            </h2>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-red-500/15
              bg-red-500/5
            "
          >
            <ShoppingBag
              size={16}
              className="text-red-400"
            />
          </div>
        </div>
      </div>

      {/* Products */}
      {/* Products */}
<div
  className="
    max-h-[200px]
    overflow-y-auto

    space-y-2.5
    p-3
    sm:p-4

    scrollbar-thin
    scrollbar-track-transparent
    scrollbar-thumb-white/10

    hover:scrollbar-thumb-red-500/30
  "
>
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{
              opacity: 0,
              x: 12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            layout
            className="
              group
              relative
              rounded-xl
              border
              border-white/8
              bg-[#101010]
              p-2.5
              transition-all
              duration-300
              hover:border-red-500/20
            "
          >
            <button
              type="button"
              onClick={() => removeFromCart(item)}
              className="
                absolute
                right-2
                top-2
                z-10
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-lg
                bg-white/5
                text-zinc-600
                transition-all
                hover:bg-red-500
                hover:text-white
              "
            >
              <Trash2 size={12} />
            </button>

            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="
                  h-16
                  w-16
                  shrink-0
                  overflow-hidden
                  rounded-lg
                  border
                  border-white/10
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
                  "
                />
              </motion.div>

              <div className="min-w-0 flex-1 pr-5">
                <h3
                  className="
                    truncate
                    font-bebas
                    text-base
                    uppercase
                    tracking-wide
                    text-white
                    transition-colors
                    group-hover:text-red-400
                  "
                >
                  {item.name}
                </h3>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-zinc-600
                  "
                >
                  {item.category}
                </p>

                <div className="mt-2 flex items-center justify-between gap-2">
                  {/* Quantity */}
                  <div
                    className="
                      flex
                      h-7
                      items-center
                      rounded-lg
                      border
                      border-white/8
                      bg-black/40
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item)
                      }
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        text-xs
                        text-zinc-500
                        transition-colors
                        hover:text-red-400
                      "
                    >
                      −
                    </button>

                    <span
                      className="
                        flex
                        h-7
                        min-w-7
                        items-center
                        justify-center
                        border-x
                        border-white/8
                        text-[10px]
                        font-bold
                        text-white
                      "
                    >
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item)
                      }
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        text-xs
                        text-zinc-500
                        transition-colors
                        hover:text-red-400
                      "
                    >
                      +
                    </button>
                  </div>

                  <span
                    className="
                      font-bebas
                      text-base
                      text-red-400
                    "
                  >
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 0)
                    ).toLocaleString()}{" "}
                    DH
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="
          relative
          border-t
          border-white/8
          bg-[#0c0c0c]
          px-4
          py-4
          sm:px-5
        "
      >
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[11px] text-zinc-600">
              Subtotal
            </span>

            <span className="text-xs text-white">
              {subtotal.toLocaleString()} DH
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[11px] text-zinc-600">
              Shipping
            </span>

            <span className="text-[11px] font-semibold text-green-400">
              FREE
            </span>
          </div>
        </div>

        <div className="my-3 h-px bg-white/8" />

        <div className="flex items-end justify-between">
          <div>
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-zinc-600
              "
            >
              Total
            </p>

            <motion.h2
              animate={{
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="
                mt-1
                font-bebas
                text-3xl
                leading-none
                tracking-wide
                text-white
              "
            >
              {subtotal.toLocaleString()} DH
            </motion.h2>
          </div>

          <span
            className="
              rounded-full
              border
              border-red-500/15
              bg-red-500/5
              px-2.5
              py-1
              text-[8px]
              font-semibold
              uppercase
              tracking-widest
              text-red-400
            "
          >
            {totalItems}{" "}
            {totalItems === 1
              ? "Product"
              : "Products"}
          </span>
        </div>

        {/* Secure */}
        <div
          className="
            mt-3
            flex
            items-center
            gap-2.5
            rounded-xl
            border
            border-green-500/10
            bg-green-500/5
            px-3
            py-2
          "
        >
          <ShieldCheck
            size={15}
            className="shrink-0 text-green-400"
          />

          <div>
            <p className="text-[10px] font-semibold text-white">
              Secure Checkout
            </p>

            <p className="text-[8px] text-zinc-600">
              SSL encrypted order
            </p>
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
          className="
            group
            relative
            mt-3
            flex
            h-10
            w-full
            items-center
            justify-center
            gap-2
            overflow-hidden
            rounded-xl
            bg-red-600
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-white
            transition-all
            duration-300
            hover:bg-red-500
            hover:shadow-[0_12px_30px_rgba(239,68,68,.2)]
          "
        >
          <span className="relative z-10">
            Continue Checkout
          </span>

          <ArrowRight
            size={14}
            className="
              relative
              z-10
              transition-transform
              group-hover:translate-x-1
            "
          />

          <motion.span
            initial={{ x: "-120%" }}
            whileHover={{ x: "220%" }}
            transition={{ duration: 0.7 }}
            className="
              absolute
              inset-y-0
              left-0
              w-16
              rotate-12
              bg-white/15
              blur-lg
            "
          />
        </motion.button>
      </div>

      {/* Bottom animated line */}
      <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-white/5">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            h-full
            w-1/4
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />
      </div>
    </motion.aside>
  );
}