
import { memo } from "react";
import { ShoppingBag } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { useCart } from "../../../context/CartContext";
import { useFlyToCart } from "../../../context/FlyToCartContext";

function CartButton({ onClick }) {
  const { totalItems } = useCart();
  const { cartRef } = useFlyToCart();
  const reduceMotion = useReducedMotion();

  const count = Math.max(0, Number(totalItems) || 0);

  return (
    <div
      ref={cartRef}
      id="cart-icon"
      data-cart-target="true"
      className="relative shrink-0"
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open shopping cart, ${count} items`}
        className="
          group relative flex
          h-10 w-10
          items-center justify-center
          overflow-visible rounded-xl

          border border-white/10
          bg-white/[0.035]
          text-zinc-300

          transition-[background-color,border-color,color,transform]
          duration-200

          hover:border-red-500/35
          hover:bg-red-500/[0.08]
          hover:text-white

          active:scale-[0.96]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-red-500/60
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#090909]
        "
      >
        {/* SUBTLE HOVER ACCENT */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-x-2 bottom-0 h-px
            bg-gradient-to-r
            from-transparent via-red-500/70 to-transparent
            opacity-0
            transition-opacity duration-200
            group-hover:opacity-100
          "
        />

        {/* ICON */}
        <ShoppingBag
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
          className="
            relative z-10
            transition-transform duration-200
            group-hover:-translate-y-[1px]
          "
        />

        {/* CART COUNT */}
        <AnimatePresence initial={false} mode="popLayout">
          {count > 0 && (
            <motion.span
              key={count}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.65, y: -3 }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.65 }
              }
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                duration: reduceMotion ? 0.01 : undefined,
              }}
              className="
                absolute -right-1.5 -top-1.5 z-20
                flex h-[18px] min-w-[18px]
                items-center justify-center
                rounded-full border-2
                border-[#090909] bg-red-600
                px-0.5
                text-[9px] font-bold
                leading-none text-white
                shadow-[0_3px_10px_rgba(220,38,38,0.25)]
              "
            >
              {count > 99 ? "99+" : count}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

export default memo(CartButton);
