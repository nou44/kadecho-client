
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function HoverDescription({
  text = "",
  visible = false,
}) {
  const reduceMotion = useReducedMotion();

  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const content = String(text || "").trim();

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!visible || !content) {
      setCount(0);
      return;
    }

    if (reduceMotion) {
      setCount(content.length);
      return;
    }

    setCount(0);

    let index = 0;

    timerRef.current = window.setInterval(() => {
      index = Math.min(index + 1, content.length);
      setCount(index);

      if (index >= content.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 18);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible, content, reduceMotion]);

  if (!content) return null;

  const finished = count >= content.length;

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="hover-description"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: -6,
                  height: 0,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            height: "auto",
          }}
          exit={
            reduceMotion
              ? { opacity: 0, height: 0 }
              : {
                  opacity: 0,
                  y: -6,
                  height: 0,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.24,
            ease: EASE,
          }}
          className="
            relative z-10
            mx-1 mt-2
            overflow-hidden
            sm:mx-2
            lg:mx-2 lg:mt-2.5
          "
        >
          <div
            className="
              relative overflow-hidden
              rounded-xl
              border border-red-500/20
              bg-[#0b0b0c]
              px-3 py-2.5
              shadow-[0_8px_24px_rgba(0,0,0,0.2)]
              lg:px-3.5 lg:py-3
            "
          >
            {/* TOP ACCENT */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-x-5 top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-red-500/70
                to-transparent
              "
            />

            <div className="flex items-start gap-2.5">
              {/* ICON */}
              <div
                className="
                  flex h-6 w-6 shrink-0
                  items-center justify-center
                  rounded-lg
                  border border-red-500/20
                  bg-red-500/[0.08]
                  text-red-400
                "
              >
                <Sparkles size={12} strokeWidth={1.8} />
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">
                <p
                  className="
                    font-bebas text-[9px]
                    uppercase tracking-[0.16em]
                    text-red-400
                  "
                >
                  Product Details
                </p>

                <div
                  className="
                    relative mt-1
                    min-h-[48px]
                    max-h-[72px]
                    overflow-hidden
                    text-[10px] leading-[1.6]
                    text-zinc-400
                    lg:text-[11px]
                  "
                >
                  <span>{content.slice(0, count)}</span>

                  {!finished && (
                    <span
                      aria-hidden="true"
                      className="
                        ml-[1px] inline-block
                        h-[11px] w-[1.5px]
                        translate-y-[2px]
                        bg-red-400
                        shadow-[0_0_6px_rgba(248,113,113,0.4)]
                      "
                    />
                  )}
                </div>
              </div>
            </div>

            {/* BOTTOM SIGNATURE */}
            <div
              aria-hidden="true"
              className="
                mt-2.5 h-px
                bg-gradient-to-r
                from-red-500/35
                via-white/[0.04]
                to-transparent
              "
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
