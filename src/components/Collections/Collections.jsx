import { motion } from "framer-motion";
import CollectionSlider from "./CollectionSlider";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

export default function Collections() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  loadProducts();
}, []);
  return (
    <section className="relative overflow-hidden bg-[#050505] py-14 sm:py-16 lg:py-20">
      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[350px]
            w-[350px]
            -translate-x-1/2
            rounded-full
            bg-red-600/10
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-[220px]
            w-[220px]
            rounded-full
            bg-red-600/5
            blur-[80px]
          "
        />
      </div>

      {/* Content */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-4
          sm:px-5
          lg:px-6
        "
      >
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          className="
            mb-9
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* LEFT */}

          <div className="max-w-lg">
            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: -12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              viewport={{
                once: false,
              }}
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-red-500/20
                bg-white/[0.03]
                px-3
                py-1.5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-red-500/40
              "
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-red-500
                    opacity-70
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-red-500
                    shadow-[0_0_10px_rgba(239,68,68,.9)]
                  "
                />
              </span>

              <span
                className="
                  font-bebas
                  text-[9px]
                  uppercase
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
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.55,
              }}
              viewport={{
                once: false,
              }}
            className="
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
  animate-gradient-x
  drop-shadow-[0_0_12px_rgba(239,68,68,.16)]
"
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
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.55,
            }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            className="max-w-sm"
          >
          {/* TOP LINE */}

<motion.div
  initial={{
    width: 0,
  }}
  whileInView={{
    width: "70%",
  }}
  transition={{
    duration: 0.9,
    delay: 0.15,
    ease: "easeOut",
  }}
  viewport={{
    once: false,
  }}
  className="
    mb-4
    h-[2px]
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
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: "100%",
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                }}
                viewport={{
                  once: false,
                }}
                className="
                  h-px
                  rounded-full
                  bg-gradient-to-r
                  from-red-600
                  via-red-400
                  to-transparent
                "
              />

              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: "65%",
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                }}
                viewport={{
                  once: false,
                }}
                className="
                  h-px
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

        {/* SLIDER */}

        <CollectionSlider products={products} />
      </div>
    </section>
  );
}