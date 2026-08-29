
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function HoverDescription({
  text,
  visible,
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!visible) {
      setDisplayed("");
      return;
    }

    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [visible, text]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
            height: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
            height: "auto",
          }}
          exit={{
            opacity: 0,
            y: -8,
            height: 0,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            overflow-hidden

            /* =================================================
               MOBILE
               ================================================= */

            relative
            z-30

            mx-1
            mt-2

            sm:mx-2
            sm:mt-2.5

            /* =================================================
               DESKTOP
               ================================================= */

            lg:mx-3
            lg:mb-3
            lg:mt-3
          "
        >
          <div
            className="
              relative

              overflow-hidden

              rounded-xl
              sm:rounded-2xl

              border
              border-red-500/15

              bg-[#0b0b0b]/95

              shadow-[0_12px_35px_rgba(0,0,0,.35)]

              backdrop-blur-xl

              /* MOBILE */
              px-2.5
              py-2.5

              sm:px-3
              sm:py-3

              /* DESKTOP */
              lg:p-4
            "
          >
            {/* =================================================
                TOP GLOW
                ================================================= */}

            <div
              className="
                pointer-events-none

                absolute
                inset-x-4
                top-0

                h-px

                bg-gradient-to-r
                from-transparent
                via-red-500/80
                to-transparent

                opacity-80
              "
            />

            {/* =================================================
                SOFT RED GLOW
                ================================================= */}

            <div
              className="
                pointer-events-none

                absolute

                -right-10
                -top-10

                h-20
                w-20

                rounded-full

                bg-red-500/[0.07]

                blur-2xl
              "
            />

            {/* =================================================
                CONTENT
                ================================================= */}

            <div
              className="
                relative

                flex
                items-start

                gap-2

                sm:gap-2.5

                lg:gap-3
              "
            >
              {/* =================================================
                  ICON
                  ================================================= */}

              <div
                className="
                  mt-0.5

                  flex

                  h-6
                  w-6

                  shrink-0

                  items-center
                  justify-center

                  rounded-lg

                  border
                  border-red-500/15

                  bg-red-500/[0.07]

                  text-red-400

                  sm:h-7
                  sm:w-7

                  lg:h-7
                  lg:w-7

                  lg:rounded-full
                "
              >
                <Sparkles
                  size={11}
                  strokeWidth={2}
                  className="
                    sm:h-[12px]
                    sm:w-[12px]

                    lg:h-[13px]
                    lg:w-[13px]
                  "
                />
              </div>

              {/* =================================================
                  TEXT
                  ================================================= */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    mb-0.5

                    font-bebas

                    text-[7px]

                    uppercase

                    tracking-[0.16em]

                    text-red-400/80

                    sm:text-[8px]

                    lg:text-[9px]
                  "
                >
                  Product Details
                </p>

                <p
                  className="
                    max-h-[68px]

                    overflow-hidden

                    text-[9px]

                    leading-[1.45]

                    text-zinc-400

                    sm:max-h-[76px]

                    sm:text-[10px]

                    sm:leading-[1.55]

                    lg:max-h-none

                    lg:text-[12px]

                    lg:leading-6

                    lg:text-zinc-300
                  "
                >
                  {displayed}
                </p>
              </div>
            </div>

            {/* =================================================
                BOTTOM DETAIL
                ================================================= */}

            <div
              className="
                relative

                mt-2

                h-px

                w-full

                overflow-hidden

                bg-white/[0.035]

                sm:mt-2.5

                lg:mt-3
              "
            >
              <motion.div
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "100%",
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="
                  h-full
                  w-1/3

                  bg-gradient-to-r
                  from-transparent
                  via-red-500/50
                  to-transparent
                "
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

