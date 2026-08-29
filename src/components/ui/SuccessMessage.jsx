import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function SuccessMessage({
  show,
  title = "Order Confirmed",
  message = "Your order has been successfully placed.",
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="
            fixed
            inset-0
            z-[9999]

            flex
            items-center
            justify-center

            bg-black/80
            backdrop-blur-md

            px-5
          "
        >
          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute

              left-1/2
              top-1/2

              h-[420px]
              w-[420px]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-green-500/10

              blur-[120px]
            "
          />

          {/* Success Card */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 10,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10

              w-full
              max-w-md

              overflow-hidden

              rounded-[30px]

              border
              border-green-500/20

              bg-[#0b0b0b]

              p-8
              text-center

              shadow-[0_30px_100px_rgba(0,0,0,.65)]
            "
          >
            {/* Top line */}

            <div
              className="
                absolute
                left-0
                top-0

                h-[2px]
                w-full

                bg-gradient-to-r
                from-transparent
                via-green-500
                to-transparent
              "
            />

            {/* Icon */}

            <motion.div
              initial={{
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.35,
              }}
              className="
                mx-auto

                flex
                h-20
                w-20

                items-center
                justify-center

                rounded-full

                bg-green-500/10

                text-green-400

                shadow-[0_0_40px_rgba(34,197,94,.12)]
              "
            >
              <Check
                size={38}
                strokeWidth={2.5}
              />
            </motion.div>

            {/* Text */}

            <h2
              className="
                mt-6

                font-bebas

                text-4xl

                uppercase
                tracking-wide

                text-white
              "
            >
              {title}
            </h2>

            <p
              className="
                mx-auto
                mt-3

                max-w-sm

                text-sm
                leading-6

                text-zinc-500
              "
            >
              {message}
            </p>

            {/* Progress */}

            <div
              className="
                mt-7

                h-1

                overflow-hidden

                rounded-full

                bg-white/5
              "
            >
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{
                  duration: 3,
                  ease: "linear",
                }}
                className="
                  h-full

                  bg-green-500
                "
              />
            </div>

            <p
              className="
                mt-3

                text-[9px]
                uppercase
                tracking-[0.3em]

                text-zinc-600
              "
            >
              Preparing your order
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}