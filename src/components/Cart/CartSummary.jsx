
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";

export default function CartSummary({ onClose }) {
  const {
    subtotal,
    items,
  } = useCart();

  const navigate = useNavigate();

  const shipping = 0;
  const total = subtotal + shipping;

  if (!items.length) {
    return null;
  }

  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-xl

        border
        border-white/[0.08]

        bg-[#0d0d0d]

        p-3
      "
    >
      {/* TOP ACCENT */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-red-500/70
          to-transparent
        "
      />

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.28em]
              text-zinc-600
            "
          >
            Order Summary
          </p>

          <h3
            className="
              mt-0.5

              font-bebas

              text-[20px]

              leading-none

              tracking-[0.04em]

              text-white
            "
          >
            Your Order
          </h3>

        </div>

        <div
          className="
            flex
            items-center
            gap-1.5

            rounded-full

            border
            border-green-500/15

            bg-green-500/[0.06]

            px-2
            py-1
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-green-400
            "
          />

          <span
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-green-400
            "
          >
            Free Shipping
          </span>
        </div>

      </div>

      {/* PRICES */}

      <div className="mt-3 space-y-1.5">

        <div className="flex items-center justify-between">

          <span
            className="
              text-[10px]
              text-zinc-600
            "
          >
            Subtotal
          </span>

          <span
            className="
              font-bebas
              text-[15px]
              tracking-wide
              text-zinc-300
            "
          >
            {subtotal.toLocaleString()} DH
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span
            className="
              text-[10px]
              text-zinc-600
            "
          >
            Shipping
          </span>

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-wider
              text-green-400
            "
          >
            Free
          </span>

        </div>

      </div>

      {/* TOTAL */}

      <div
        className="
          mt-3

          flex
          items-end
          justify-between

          border-t
          border-white/[0.07]

          pt-3
        "
      >

        <div>

          <p
            className="
              text-[7px]
              uppercase
              tracking-[0.25em]
              text-zinc-700
            "
          >
            Total
          </p>

          <motion.h2
            key={total}
            initial={{
              opacity: 0.5,
              y: 3,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-0.5

              font-bebas

              text-[26px]

              leading-none

              tracking-wide

              text-white
            "
          >
            {total.toLocaleString()}{" "}
            <span className="text-[13px] text-red-400">
              DH
            </span>
          </motion.h2>

        </div>

        {/* ITEM COUNT */}

        <span
          className="
            rounded-full

            border
            border-white/[0.07]

            bg-white/[0.025]

            px-2
            py-1

            text-[7px]
            font-semibold

            uppercase
            tracking-[0.16em]

            text-zinc-500
          "
        >
          {items.length}{" "}
          {items.length === 1
            ? "Item"
            : "Items"}
        </span>

      </div>

      {/* SECURITY */}

      <div
        className="
          mt-2.5

          flex
          items-center
          gap-2

          rounded-lg

          border
          border-green-500/[0.08]

          bg-green-500/[0.035]

          px-2.5
          py-2
        "
      >

        <ShieldCheck
          size={13}
          className="shrink-0 text-green-400"
        />

        <div className="min-w-0">

          <p
            className="
              text-[8px]
              font-semibold
              text-zinc-300
            "
          >
            Secure Checkout
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-[7px]
              text-zinc-700
            "
          >
            Your order is protected
          </p>

        </div>

      </div>

      {/* CHECKOUT */}

      <motion.button
        type="button"
        onClick={() => {
          onClose?.();
          navigate("/checkout");
        }}
        whileHover={{
          y: -1,
        }}
        whileTap={{
          scale: 0.985,
        }}
        className="
          group

          relative

          mt-2.5

          flex
          h-10
          w-full

          items-center
          justify-center
          gap-2

          overflow-hidden

          rounded-lg

          bg-gradient-to-r
          from-red-700
          via-red-600
          to-red-500

          text-[9px]
          font-semibold

          uppercase
          tracking-[0.2em]

          text-white

          shadow-[0_8px_25px_rgba(220,38,38,.18)]

          transition-all
          duration-300

          hover:shadow-[0_10px_30px_rgba(220,38,38,.28)]
        "
      >

        {/* SHINE */}

        <span
          className="
            absolute
            inset-y-0
            left-[-70%]

            w-1/2

            rotate-12

            bg-white/15

            blur-md

            transition-transform
            duration-700

            group-hover:translate-x-[280%]
          "
        />

        <span className="relative z-10">
          Checkout
        </span>

        <ArrowRight
          size={14}
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

