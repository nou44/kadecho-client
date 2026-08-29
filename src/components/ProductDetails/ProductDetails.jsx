import { motion } from "framer-motion";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";

export default function ProductDetails({ product }) {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050505]
        pt-6
        pb-8
        lg:pt-8
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0

          h-[420px]
          w-[420px]

          -translate-x-1/2

          rounded-full

          bg-red-600/10

          blur-[150px]
        "
      />

      <div
        className="
          relative
          z-10

          mx-auto
          max-w-7xl

          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* MAIN */}
        <div
          className="
            grid
            items-start

            gap-5

            lg:grid-cols-[1.04fr_0.96fr]
          "
        >

          {/* ================= LEFT — GALLERY ================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="min-w-0"
          >
            <ProductGallery product={product} />
          </motion.div>


          {/* ================= RIGHT ================= */}

          <div
            className="
              flex
              min-w-0
              flex-col
              gap-4
            "
          >

            {/* PRODUCT INFO */}

            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.05,
              }}
              className="
                rounded-[22px]

                border
                border-white/[0.08]

                bg-white/[0.02]

                p-4

                backdrop-blur-xl
              "
            >
              <ProductInfo product={product} />
            </motion.div>


            {/* TECHNICAL DETAILS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.12,
              }}
              className="
                rounded-[22px]

                border
                border-white/[0.08]

                bg-white/[0.02]

                px-4
                py-3

                backdrop-blur-xl
              "
            >
              <ProductSpecs product={product} />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}