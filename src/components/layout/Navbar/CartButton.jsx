import { ShoppingBag } from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import IconButton from "../../ui/IconButton";

import { useCart } from "../../../context/CartContext";
import { useFlyToCart } from "../../../context/FlyToCartContext";

export default function CartButton({ onClick }) {
  const { totalItems } = useCart();
  const { cartRef } = useFlyToCart();

  return (
    <motion.div
      ref={cartRef}
      data-cart-target="true"
      className="relative"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.94 }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 20,
      }}
    >

      {/* Button */}

      <button
        type="button"
        onClick={onClick}
        aria-label="Shopping Cart"
        className="
          group
          relative
          flex
          h-11
          w-11
          items-center
          justify-center

          overflow-hidden
          rounded-xl

          border
          border-white/10

          bg-white/[0.03]

          text-zinc-300

          transition-all
          duration-300

          hover:border-red-500/30
          hover:bg-red-500/[0.07]
          hover:text-white

          hover:shadow-[0_8px_25px_rgba(239,68,68,.12)]
        "
      >

        {/* Hover Glow */}

        <span
          className="
            absolute
            inset-0

            bg-gradient-to-br
            from-red-500/10
            via-transparent
            to-transparent

            opacity-0

            transition-opacity
            duration-300

            group-hover:opacity-100
          "
        />

        {/* Shine */}

        <motion.span
          initial={{ x: "-140%" }}
          animate={{ x: "140%" }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-y-0
            w-5

            skew-x-[-20deg]

            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent

            pointer-events-none
          "
        />

        {/* Icon */}

        <ShoppingBag
          size={19}
          strokeWidth={2}
          className="
            relative
            z-10

            transition-transform
            duration-300

            group-hover:scale-105
          "
        />

      </button>


      {/* Cart Count */}

      <AnimatePresence mode="popLayout">
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{
              scale: 0,
              opacity: 0,
              y: -4,
            }}
            animate={{
              scale: [0, 1.18, 1],
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              y: -4,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 24,
            }}
            className="
              absolute

              -right-1
              -top-1

              z-20

              flex
              h-[19px]
              min-w-[19px]

              items-center
              justify-center

              rounded-full

              border
              border-[#0b0b0b]

              bg-red-600

              px-1

              text-[9px]
              font-bold

              leading-none
              text-white

              shadow-[0_4px_14px_rgba(239,68,68,.45)]
            "
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.span>
        )}
      </AnimatePresence>

    </motion.div>
  );
}