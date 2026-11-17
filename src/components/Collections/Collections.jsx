
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import CollectionSlider from "./CollectionSlider";
import { getProducts } from "../../services/productService";

const EASE = [0.22, 1, 0.36, 1];

const headerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

export default function Collections() {
  const [products, setProducts] = useState([]);

  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.15,
    margin: "0px",
  });

  const reduceMotion = useReducedMotion();

  /* ==========================================
     FETCH PRODUCTS
  ========================================== */

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const data = await getProducts();

        if (!active) return;

        setProducts(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        if (active) {
          console.error(
            "Failed to load products:",
            error
          );
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        bg-[#050505]
        py-14 sm:py-16 lg:py-20
      "
    >
      {/* ======================================
          BACKGROUND
      ====================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
        "
      >
        {/* TOP GLOW */}
        <div
          className="
            absolute left-1/2 top-0
            h-[350px] w-[350px]
            -translate-x-1/2
            rounded-full
            bg-red-600/[0.07]
            blur-[75px]
          "
        />

        {/* BOTTOM GLOW */}
        <div
          className="
            absolute bottom-0 right-0
            h-[220px] w-[220px]
            rounded-full
            bg-red-600/[0.04]
            blur-[60px]
          "
        />
      </div>

      {/* ======================================
          CONTENT
      ====================================== */}

      <div
        className="
          relative z-10
          mx-auto max-w-6xl
          px-4 sm:px-5 lg:px-6
        "
      >
        {/* ==================================
            HEADER
        ================================== */}

        <motion.div
          variants={headerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={
            reduceMotion || isInView
              ? "visible"
              : "hidden"
          }
          className="
            mb-9
            flex flex-col gap-5

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="max-w-lg">
            {/* BADGE */}
            <motion.div
              variants={fadeUp}
              className="
                group inline-flex
                items-center gap-2
                rounded-full

                border border-red-500/20
                bg-white/[0.03]

                px-3 py-1.5
                backdrop-blur-xl

                transition-[background-color,border-color]
                duration-300

                hover:border-red-500/40
              "
            >
              <span
                className="
                  relative flex
                  h-1.5 w-1.5
                "
              >
                <span
                  className={`
                    absolute inline-flex
                    h-full w-full
                    rounded-full
                    bg-red-500 opacity-70
                    ${
                      isInView && !reduceMotion
                        ? "animate-ping"
                        : ""
                    }
                  `}
                />

                <span
                  className="
                    relative inline-flex
                    h-1.5 w-1.5
                    rounded-full
                    bg-red-500
                    shadow-[0_0_10px_rgba(239,68,68,.9)]
                  "
                />
              </span>

              <span
                className="
                  font-bebas
                  text-[9px] uppercase
                  tracking-[0.25em]
                  text-red-300
                  transition-colors
                  group-hover:text-white
                "
              >
                Signature Collections
              </span>
            </motion.div>

            {/* TITLE */}
            <motion.h2
              variants={fadeUp}
              className={`
                mt-4
                font-bebas
                text-[48px]
                leading-[0.9]
                tracking-[0.045em]
                uppercase

                sm:text-[58px]
                lg:text-[68px]

                bg-[linear-gradient(90deg,#ffffff_0%,#f8f8f8_15%,#ef4444_35%,#7f1d1d_50%,#ef4444_65%,#ffffff_85%,#f3f3f3_100%)]
                bg-[length:300%_100%]
                bg-clip-text
                text-transparent

                drop-shadow-[0_0_12px_rgba(239,68,68,.16)]

                ${
                  isInView && !reduceMotion
                    ? "animate-gradient-x"
                    : ""
                }
              `}
            >
              Crafted To
              <br />
              Elevate
              <br />
              Every Space
            </motion.h2>
          </div>

          {/* RIGHT */}
          <motion.div
            variants={fadeUp}
            className="max-w-sm"
          >
            {/* TOP LINE */}
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              animate={{
                scaleX:
                  reduceMotion || isInView
                    ? 1
                    : 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.9,
                delay: reduceMotion ? 0 : 0.15,
                ease: EASE,
              }}
              style={{
                transformOrigin: "left",
              }}
              className="
                mb-4
                h-[2px] w-[70%]
                rounded-full

                bg-gradient-to-r
                from-red-600
                via-red-400
                to-transparent

                shadow-[0_0_12px_rgba(239,68,68,.25)]
              "
            />

            {/* DESCRIPTION */}
            <p
              className="
                max-w-lg
                font-satoshi
                text-[15px]
                leading-6
                text-zinc-400

                sm:text-[16px]
                sm:leading-7
              "
            >
              Discover our premium handcrafted collections
              designed for modern homes, luxury interiors
              and bespoke architectural projects.
            </p>

            {/* BOTTOM LINES */}
            <div className="mt-3 flex flex-col gap-1.5">
              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : { scaleX: 0 }
                }
                animate={{
                  scaleX:
                    reduceMotion || isInView
                      ? 1
                      : 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  delay: reduceMotion ? 0 : 0.3,
                  ease: EASE,
                }}
                style={{
                  transformOrigin: "left",
                }}
                className="
                  h-px w-full
                  rounded-full
                  bg-gradient-to-r
                  from-red-600 via-red-400 to-transparent
                "
              />

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : { scaleX: 0 }
                }
                animate={{
                  scaleX:
                    reduceMotion || isInView
                      ? 1
                      : 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  delay: reduceMotion ? 0 : 0.4,
                  ease: EASE,
                }}
                style={{
                  transformOrigin: "left",
                }}
                className="
                  h-px w-[65%]
                  rounded-full
                  bg-gradient-to-r
                  from-red-500/70
                  via-red-400/40
                  to-transparent
                "
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ==================================
            SLIDER
        ================================== */}

        <CollectionSlider products={products} />
      </div>
    </section>
  );
}
