
import {
  X,
  ShoppingBag,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

import { useCart } from "../../context/CartContext";

export default function CartDrawer({
  open,
  onClose,
}) {
  const {
    items,
    updateCartItem,
    removeCartItem,
  } = useCart();

  const isEmpty = items.length === 0;

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[95]
              bg-black/75
              backdrop-blur-[3px]
            "
          />

          {/* DRAWER */}

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              right-0
              top-0
              z-[100]

              flex
              h-dvh
              w-full
              max-w-[370px]
              flex-col

              overflow-hidden

              border-l
              border-white/[0.08]

              bg-[#070707]

              shadow-[-25px_0_70px_rgba(0,0,0,.55)]
            "
          >

            {/* Ambient Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-28
                -top-28
                h-64
                w-64
                rounded-full
                bg-red-600/[0.08]
                blur-[110px]
              "
            />

            {/* ================= HEADER ================= */}

            <motion.header
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="
                relative
                shrink-0

                border-b
                border-white/[0.08]

                bg-[#090909]

                px-4
                py-3.5
              "
            >

              <div className="relative z-10 flex items-center justify-between">

                {/* BRAND */}

                <div className="flex min-w-0 items-center gap-3">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center

                      rounded-xl

                      border
                      border-red-500/15

                      bg-red-500/[0.07]

                      text-red-400
                    "
                  >
                    <ShoppingBag size={16} />
                  </div>

                  <div className="min-w-0">

                    <div className="flex items-center gap-2">

                      <p
                        className="
                          font-bebas
                          text-[9px]
                          uppercase
                          tracking-[0.28em]
                          text-zinc-500
                        "
                      >
                        YOUR CART
                      </p>

                      <span
                        className="
                          h-1
                          w-1
                          rounded-full
                          bg-red-500
                        "
                      />

                      <span
                        className="
                          text-[9px]
                          text-zinc-600
                        "
                      >
                        {totalItems} item
                        {totalItems !== 1 && "s"}
                      </span>

                    </div>

                    <h2
                      className="
                        mt-0.5
                        font-bebas
                        text-[22px]
                        leading-none
                        tracking-[0.04em]
                        text-white
                      "
                    >
                      Shopping Cart
                    </h2>

                  </div>

                </div>

                {/* CLOSE */}

                <motion.button
                  type="button"
                  whileHover={{
                    rotate: 90,
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  onClick={onClose}
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center

                    rounded-lg

                    border
                    border-white/[0.08]

                    bg-white/[0.025]

                    text-zinc-500

                    transition-all
                    duration-300

                    hover:border-red-500/25
                    hover:bg-red-500/[0.08]
                    hover:text-white
                  "
                >
                  <X size={16} />
                </motion.button>

              </div>

              {/* Bottom Accent */}

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                }}
                className="
                  absolute
                  bottom-0
                  left-4
                  h-px

                  bg-gradient-to-r
                  from-red-500
                  to-transparent
                "
              />

            </motion.header>

            {/* ================= PRODUCTS ================= */}

            <main
              className="
                min-h-0
                flex-1

                overflow-y-auto

                px-3
                py-3

                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >

              {isEmpty ? (
                <EmptyCart />
              ) : (
                <div className="space-y-2.5">

                  {items.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      onIncrease={(item) =>
                        updateCartItem(
                          item._id,
                          item.quantity + 1
                        )
                      }
                      onDecrease={(item) =>
                        updateCartItem(
                          item._id,
                          Math.max(
                            1,
                            item.quantity - 1
                          )
                        )
                      }
                      onRemove={(item) =>
                        removeCartItem(item._id)
                      }
                    />
                  ))}

                </div>
              )}

            </main>

            {/* ================= FOOTER ================= */}

            {!isEmpty && (
              <footer
                className="
                  shrink-0

                  border-t
                  border-white/[0.08]

                  bg-[#080808]

                  p-3
                "
              >
                <CartSummary
                  onClose={onClose}
                />
              </footer>
            )}

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

