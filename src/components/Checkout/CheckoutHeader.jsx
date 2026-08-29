import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#0a0a0a]
        px-4
        py-4
        sm:px-5
        sm:py-5
        lg:px-6
        lg:py-5
      "
    >
      {/* Top animated line */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-white/5">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2.8,
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

      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-red-600/10
          blur-[80px]
        "
      />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div
          className="
            flex
            items-center
            gap-1.5
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-zinc-600
          "
        >
          <span>Home</span>

          <ChevronRight size={11} />

          <span className="text-red-500">
            Checkout
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="
                font-bebas
                text-3xl
                uppercase
                leading-none
                tracking-[0.06em]
                text-white
                sm:text-4xl
                lg:text-[42px]
              "
            >
              Secure{" "}
              <span className="text-red-500">
                Checkout
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="
                mt-2
                max-w-xl
                text-[11px]
                leading-5
                text-zinc-500
                sm:text-xs
              "
            >
              Complete your information, review your
              order and confirm your purchase.
            </motion.p>
          </div>

          <div
            className="
              hidden
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-green-500/15
              bg-green-500/5
              px-3
              py-2
              sm:flex
            "
          >
            <ShieldCheck
              size={15}
              className="text-green-400"
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-widest
                text-zinc-400
              "
            >
              Secure Order
            </span>
          </div>
        </div>
      </div>

      {/* Bottom animated line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/5">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "38%" }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: "easeOut",
          }}
          className="
            h-full
            bg-gradient-to-r
            from-red-600
            via-red-400
            to-transparent
          "
        />
      </div>
    </motion.section>
  );
}