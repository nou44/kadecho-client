import { motion } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingCard({ product, onClose }) {
  const navigate = useNavigate();

  const handleShop = () => {
    onClose?.();

    navigate(`/product/${product._id || product.id}`);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 120,
        rotate: 8,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        x: 0,
        rotate: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: 120,
        rotate: 8,
        scale: 0.9,
      }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
      }}
      className="
        fixed
        right-4
        top-20
        z-[9999]

        w-[220px]
        max-w-[calc(100vw-24px)]
      "
    >
      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2
          top-0
          z-30

          flex
          -translate-x-1/2

          items-center
          justify-center
        "
      >
        {/* SOFT RED LIGHT */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-20
            z-0

            h-24
            w-24

            -translate-x-1/2

            rounded-full

            bg-red-500/15

            blur-[40px]
          "
        />

        {/* IMAGE */}

        <img
          src={product.image}
          alt={product.name}
          className="
            relative
            z-20

            h-[165px]
            w-auto
            max-w-none

            select-none
            pointer-events-none

            object-contain

            drop-shadow-[0_20px_32px_rgba(0,0,0,.45)]
          "
        />
      </div>

      {/* =====================================================
          CARD
      ===================================================== */}

      <div
        className="
          relative
          w-full

          translate-y-[92px]

          overflow-hidden

          rounded-[20px]

          border
          border-white/[0.09]

          bg-gradient-to-b
          from-[#151515]
          via-[#0d0d0d]
          to-[#080808]

          px-3.5
          pb-3.5
          pt-8

          shadow-[0_18px_50px_rgba(0,0,0,.55)]

          transition-all
          duration-300

          hover:border-red-500/20
          hover:shadow-[0_22px_55px_rgba(239,68,68,.12)]
        "
      >
        {/* =================================================
            TOP GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0

            h-20

            bg-[radial-gradient(circle_at_top,rgba(239,68,68,.12),transparent_70%)]
          "
        />

        {/* =================================================
            CLOSE
        ================================================= */}

        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close"
          whileHover={{
            rotate: 90,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className="
            absolute
            right-2.5
            top-2.5
            z-40

            flex
            h-6
            w-6

            items-center
            justify-center

            rounded-lg

            border
            border-white/[0.08]

            bg-black/20

            text-zinc-500

            transition-all
            duration-300

            hover:border-red-500/25
            hover:bg-red-500/10
            hover:text-red-400
          "
        >
          <X size={12} />
        </motion.button>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="relative z-20">

          {/* CONNECTOR */}

          <div className="mb-2.5 flex justify-center">
            <div
              className="
                h-px
                w-16

                rounded-full

                bg-gradient-to-r
                from-transparent
                via-red-500
                to-transparent
              "
            />
          </div>

          {/* =================================================
              PRODUCT INFO
          ================================================= */}

          <div className="text-center">
            <h2
              className="
                truncate

                font-bebas

                text-[17px]

                leading-none

                tracking-[0.04em]

                text-white
              "
            >
              {product.name}
            </h2>

            <p
              className="
                mt-1.5

                truncate

                text-[7px]

                font-medium

                uppercase

                tracking-[0.3em]

                text-zinc-500
              "
            >
              {product.category}
            </p>
          </div>

          {/* =================================================
              DETAILS
          ================================================= */}

          <div
            className="
              mt-2.5

              flex
              items-center
              justify-center
              gap-1.5

              text-[6px]

              uppercase

              tracking-[0.14em]

              text-zinc-600
            "
          >
            <span className="flex items-center gap-1">
              <Sparkles
                size={8}
                className="text-red-500"
              />

              Premium Finish
            </span>

            <span
              className="
                h-1
                w-1
                rounded-full
                bg-red-500/50
              "
            />

            <span>
              Custom Made
            </span>
          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              my-3

              h-px

              bg-gradient-to-r
              from-transparent
              via-white/[0.08]
              to-transparent
            "
          />

          {/* =================================================
              PRICE + SHOP
          ================================================= */}

          <div
            className="
              flex
              items-end
              justify-between
              gap-2
            "
          >
            {/* PRICE */}

            <div className="min-w-0">
              <p
                className="
                  text-[6px]

                  uppercase

                  tracking-[0.25em]

                  text-zinc-600
                "
              >
                Starting from
              </p>

              <h3
                className="
                  mt-0.5

                  font-bebas

                  text-[22px]

                  leading-none

                  tracking-wide

                  text-red-500
                "
              >
                {product.price} DH
              </h3>
            </div>

            {/* SHOP */}

            <motion.button
              type="button"
              onClick={handleShop}
              whileHover={{
                scale: 1.04,
                y: -1,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                flex
                items-center
                gap-1.5

                rounded-full

                bg-red-600

                px-3.5
                py-1.5

                text-[7px]

                font-bold

                uppercase

                tracking-[0.16em]

                text-white

                shadow-[0_6px_18px_rgba(239,68,68,.25)]

                transition-all
                duration-300

                hover:bg-red-500
                hover:shadow-[0_8px_22px_rgba(239,68,68,.3)]
              "
            >
              SHOP

              <ArrowRight size={10} />
            </motion.button>
          </div>

          {/* =================================================
              MICRO DETAIL
          ================================================= */}

          <div
            className="
              mt-2.5

              text-center

              text-[5.5px]

              uppercase

              tracking-[0.24em]

              text-zinc-700
            "
          >
            Kadecho • Crafted With Precision
          </div>

        </div>
      </div>
    </motion.div>
  );
}