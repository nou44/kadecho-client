import { motion } from "framer-motion";
import {
  Check,
  MapPin,
  Mail,
  Phone,
  User,
  Package,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "../../context/CartContext";

export default function OrderReview({
  customer,
  onBack,
  onConfirm,
}) {
  const { items, subtotal } = useCart();

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#090909]
      "
    >
      {/* Animated line */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-white/5">
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
            w-1/3
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />
      </div>

      <div className="relative z-10 p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
                bg-red-500/5
              "
            >
              <Package
                size={16}
                className="text-red-400"
              />
            </div>

            <div>
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.3em]
                  text-red-400
                "
              >
                Step 02
              </span>

              <h2
                className="
                  mt-0.5
                  font-bebas
                  text-3xl
                  uppercase
                  leading-none
                  tracking-wide
                  text-white
                "
              >
                Review Order
              </h2>
            </div>
          </div>
        </div>

        {/* Customer */}
        <div className="mt-5">
          <div className="mb-2 flex items-center gap-2">
            <User
              size={13}
              className="text-red-400"
            />

            <h3
              className="
                font-bebas
                text-base
                uppercase
                tracking-wide
                text-white
              "
            >
              Customer Information
            </h3>
          </div>

          <div
            className="
              grid
              gap-2
              rounded-xl
              border
              border-white/8
              bg-white/[0.02]
              p-3
              sm:grid-cols-2
            "
          >
            <CustomerInfo
              icon={User}
              label="Name"
              value={customer?.name}
            />

            <CustomerInfo
              icon={Mail}
              label="Email"
              value={customer?.email}
            />

            <CustomerInfo
              icon={Phone}
              label="Phone"
              value={customer?.phone}
            />

            <CustomerInfo
              icon={MapPin}
              label="Address"
              value={customer?.address}
              full
            />
          </div>
        </div>

        {/* Products */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package
                size={13}
                className="text-red-400"
              />

              <h3
                className="
                  font-bebas
                  text-base
                  uppercase
                  tracking-wide
                  text-white
                "
              >
                Your Products
              </h3>
            </div>

            <span className="text-[8px] uppercase tracking-wider text-zinc-600">
              {items.length}{" "}
              {items.length === 1
                ? "Item"
                : "Items"}
            </span>
          </div>

         <div
  className="
    max-h-[300px]
    overflow-y-auto

    space-y-2

    pr-1

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
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                  flex
                  items-center
                  gap-2.5
                  rounded-xl
                  border
                  border-white/8
                  bg-white/[0.02]
                  p-2
                "
              >
                <div
                  className="
                    h-12
                    w-12
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border
                    border-white/10
                    bg-[#111]
                  "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4
                    className="
                      truncate
                      font-bebas
                      text-sm
                      uppercase
                      tracking-wide
                      text-white
                    "
                  >
                    {item.name}
                  </h4>

                  <span
                    className="
                      mt-1
                      inline-flex
                      rounded-full
                      bg-red-500/10
                      px-1.5
                      py-0.5
                      text-[8px]
                      font-semibold
                      text-red-400
                    "
                  >
                    x{item.quantity}
                  </span>
                </div>

                <span
                  className="
                    shrink-0
                    font-bebas
                    text-sm
                    text-white
                  "
                >
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                  ).toLocaleString()}{" "}
                  DH
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div
          className="
            mt-5
            rounded-xl
            border
            border-white/8
            bg-[#101010]
            p-3
          "
        >
          <div className="flex justify-between">
            <span className="text-[10px] text-zinc-600">
              Subtotal
            </span>

            <span className="text-xs text-white">
              {subtotal.toLocaleString()} DH
            </span>
          </div>

          <div className="mt-1.5 flex justify-between">
            <span className="text-[10px] text-zinc-600">
              Shipping
            </span>

            <span className="text-[10px] font-semibold text-green-400">
              Free
            </span>
          </div>

          <div className="my-2.5 h-px bg-white/8" />

          <div className="flex items-center justify-between">
            <span
              className="
                font-bebas
                text-lg
                uppercase
                tracking-wide
                text-white
              "
            >
              Total
            </span>

            <span
              className="
                font-bebas
                text-2xl
                text-red-400
              "
            >
              {total.toLocaleString()} DH
            </span>
          </div>
        </div>

    {/* ACTIONS */}

<div className="mt-5 space-y-2.5">

  {/* Confirm Order */}
  <motion.button
    type="button"
    onClick={onConfirm}
    whileHover={{
      scale: 1.015,
      y: -1,
      boxShadow: "0 10px 30px rgba(239,68,68,.28)",
    }}
    whileTap={{
      scale: 0.97,
    }}
    className="
      group
      relative
      flex
      h-11
      w-full
      items-center
      justify-center
      overflow-hidden
      rounded-xl

      bg-red-600

      font-bebas
      text-[12px]
      font-bold
      uppercase
      tracking-[0.2em]

      text-white

      shadow-[0_6px_20px_rgba(239,68,68,.18)]

      transition-all
      duration-300

      hover:bg-red-500
    "
  >
    {/* Animated shine */}
    <span
      className="
        pointer-events-none
        absolute
        inset-y-0
        -left-20
        w-16
        rotate-[20deg]
        bg-white/20
        blur-md

        transition-all
        duration-700

        group-hover:left-[110%]
      "
    />

    <span className="relative z-10 flex items-center gap-2">
      <span className="text-sm">
        ✓
      </span>

      Confirm Order
    </span>
  </motion.button>


  {/* Back */}
  <motion.button
    type="button"
    onClick={onBack}
    whileHover={{
      scale: 1.01,
      borderColor: "rgba(255,255,255,.18)",
      backgroundColor: "rgba(255,255,255,.05)",
    }}
    whileTap={{
      scale: 0.97,
    }}
    className="
      flex
      h-9
      w-full
      items-center
      justify-center
      gap-2

      rounded-xl

      border
      border-white/10

      bg-white/[0.025]

      font-bebas
      text-[10px]
      font-medium
      uppercase
      tracking-[0.22em]

      text-zinc-400

      transition-all
      duration-300

      hover:text-white
    "
  >
    <span className="text-xs">
      ←
    </span>

    Back
  </motion.button>

</div>
      </div>

      {/* Bottom line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "28%" }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            h-full
            bg-gradient-to-r
            from-red-600
            to-transparent
          "
        />
      </div>
    </motion.section>
  );
}

function CustomerInfo({
  icon: Icon,
  label,
  value,
  full,
}) {
  return (
    <div
      className={`
        flex
        min-w-0
        items-center
        gap-2
        ${full ? "sm:col-span-2" : ""}
      `}
    >
      <Icon
        size={13}
        className="shrink-0 text-zinc-600"
      />

      <div className="min-w-0">
        <p
          className="
            text-[7px]
            uppercase
            tracking-[0.18em]
            text-zinc-700
          "
        >
          {label}
        </p>

        <p className="truncate text-[10px] text-zinc-300">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}