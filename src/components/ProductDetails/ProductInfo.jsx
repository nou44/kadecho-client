import {
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  Star,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { useCart } from "../../context/CartContext";


const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease,
    },
  },
};

export default function ProductInfo({
  product,
  onAddToCart,
}) {
  const { addToCart } = useCart();
 

  const addButtonRef = useRef(null);

  // ==========================================
  // PRICE / DISCOUNT
  // ==========================================

  const currentPrice = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || 0);

  const hasDiscount =
    oldPrice > currentPrice &&
    currentPrice > 0;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((oldPrice - currentPrice) / oldPrice) * 100
      )
    : 0;

  // ==========================================
  // ADD TO CART
  // ==========================================

const handleAddToCart = () => {
  const productImage =
    product?.image ||
    product?.images?.[0];

  if (!productImage) {
    console.error(
      "❌ Product image not found"
    );
    return;
  }

  addToCart({
    ...product,
    _id:
      product._id ||
      product.id,
    name:
      product.name ||
      product.title,
    title:
      product.title ||
      product.name,
    image: productImage,
  });

  onAddToCart?.(
    productImage,
    addButtonRef.current
  );
};

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full space-y-4"
    >

      {/* ==========================================
          CATEGORY / RATING
      ========================================== */}

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-2"
      >
        {/* CATEGORY */}

        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-red-500/15
            bg-red-500/[0.06]
            px-2.5
            py-1
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-red-400
          "
        >
          {product?.category || "Collection"}
        </span>

        {/* RATING */}

        <div
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-white/[0.07]
            bg-white/[0.025]
            px-2.5
            py-1
            backdrop-blur-sm
          "
        >
          <Star
            size={9}
            fill="currentColor"
            className="text-red-500"
          />

          <span className="text-[8px] font-semibold text-white">
            4.9
          </span>

          <span className="text-[8px] text-zinc-600">
            126 Reviews
          </span>
        </div>
      </motion.div>

      {/* ==========================================
          TITLE
      ========================================== */}

      <motion.div
        variants={itemVariants}
        className="relative"
      >
        <motion.h1
          initial={{
            opacity: 0,
            x: -12,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="
            max-w-2xl
            font-bebas
            text-[2rem]
            font-black
            uppercase
            leading-[0.95]
            tracking-[0.055em]
            text-white
            sm:text-[2.6rem]
            lg:text-[3rem]
          "
        >
          {product?.name || product?.title}
        </motion.h1>

        {/* subtle accent */}

        <motion.div
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: 38,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease,
          }}
          className="
            mt-2.5
            h-[2px]
            rounded-full
            bg-red-500
            shadow-[0_0_12px_rgba(239,68,68,.35)]
          "
        />
      </motion.div>

      {/* ==========================================
          PRICE
      ========================================== */}

      <motion.div
        variants={itemVariants}
        className="
          flex
          flex-wrap
          items-end
          gap-x-2.5
          gap-y-1
        "
      >
        {/* CURRENT */}

        <span
          className="
            font-bebas
            text-[2rem]
            leading-none
            tracking-[0.035em]
            text-red-500
            sm:text-[2.3rem]
          "
        >
          {currentPrice.toLocaleString()} DH
        </span>

        {/* OLD PRICE */}

        {hasDiscount && (
          <>
            <span
              className="
                mb-0.5
                text-[11px]
                text-zinc-600
                line-through
              "
            >
              {oldPrice.toLocaleString()} DH
            </span>

            <span
              className="
                mb-0.5
                inline-flex
                items-center
                gap-1
                rounded-md
                border
                border-green-500/15
                bg-green-500/[0.06]
                px-1.5
                py-1
                text-[7px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-green-400
              "
            >
              <Sparkles size={8} />

              -{discountPercentage}%
            </span>
          </>
        )}
      </motion.div>

      {/* ==========================================
          DESCRIPTION
      ========================================== */}

      {product?.description && (
        <motion.p
          variants={itemVariants}
          className="
            max-w-xl
            text-[11px]
            leading-[1.75]
            text-zinc-500
            sm:text-[12px]
          "
        >
          {product.description}
        </motion.p>
      )}

      {/* ==========================================
          DIVIDER
      ========================================== */}

      <motion.div
        variants={itemVariants}
        className="
          relative
          h-px
          w-full
          overflow-hidden
          bg-white/[0.06]
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
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-y-0
            left-0
            w-1/4
            bg-gradient-to-r
            from-transparent
            via-red-500/70
            to-transparent
          "
        />
      </motion.div>

      {/* ==========================================
          QUICK FEATURES
      ========================================== */}

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-2"
      >

        {/* QUALITY */}

        <motion.div
          whileHover={{
            y: -2,
          }}
          transition={{
            duration: 0.25,
            ease,
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-xl
            border
            border-white/[0.07]
            bg-white/[0.02]
            px-3
            py-2.5
            transition-colors
            duration-300
            hover:border-red-500/20
            hover:bg-red-500/[0.025]
          "
        >
          <div className="flex items-center gap-2.5">

            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-red-500/15
                bg-red-500/[0.06]
                text-red-500
                transition-all
                duration-300
                group-hover:border-red-500/30
                group-hover:bg-red-500/10
              "
            >
              <ShieldCheck size={13} />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold text-zinc-200">
                Premium Quality
              </p>

              <p className="mt-0.5 text-[7px] text-zinc-600">
                Certified Materials
              </p>
            </div>

          </div>

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileHover={{
              scaleX: 1,
            }}
            transition={{
              duration: 0.35,
              ease,
            }}
            className="
              absolute
              bottom-0
              left-0
              h-[1px]
              w-full
              origin-left
              bg-gradient-to-r
              from-red-500
              to-transparent
            "
          />
        </motion.div>

        {/* DELIVERY */}

        <motion.div
          whileHover={{
            y: -2,
          }}
          transition={{
            duration: 0.25,
            ease,
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-xl
            border
            border-white/[0.07]
            bg-white/[0.02]
            px-3
            py-2.5
            transition-colors
            duration-300
            hover:border-red-500/20
            hover:bg-red-500/[0.025]
          "
        >
          <div className="flex items-center gap-2.5">

            <div
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-red-500/15
                bg-red-500/[0.06]
                text-red-500
                transition-all
                duration-300
                group-hover:border-red-500/30
                group-hover:bg-red-500/10
              "
            >
              <Truck size={13} />
            </div>

            <div className="min-w-0">
              <p className="text-[9px] font-semibold text-zinc-200">
                Fast Delivery
              </p>

              <p className="mt-0.5 text-[7px] text-zinc-600">
                2–5 Working Days
              </p>
            </div>

          </div>

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileHover={{
              scaleX: 1,
            }}
            transition={{
              duration: 0.35,
              ease,
            }}
            className="
              absolute
              bottom-0
              left-0
              h-[1px]
              w-full
              origin-left
              bg-gradient-to-r
              from-red-500
              to-transparent
            "
          />
        </motion.div>

      </motion.div>

      {/* ==========================================
          ACTIONS
      ========================================== */}

      <motion.div
        variants={itemVariants}
        className="flex gap-2"
      >

        {/* ADD TO CART */}

        <motion.button
        ref={addButtonRef}
          type="button"
          onClick={handleAddToCart}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.975,
          }}
          transition={{
            duration: 0.2,
            ease,
          }}
          className="
            group
            relative
            flex
            h-11
            flex-1
            items-center
            justify-center
            gap-2
            overflow-hidden
            rounded-xl
            bg-red-600
            text-[9px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-white
            shadow-[0_8px_25px_rgba(239,68,68,.12)]
            transition-all
            duration-300
            hover:bg-red-500
            hover:shadow-[0_12px_32px_rgba(239,68,68,.20)]
          "
        >
          {/* shine */}

          <motion.span
            initial={{
              x: "-150%",
            }}
            whileHover={{
              x: "350%",
            }}
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-y-0
              left-0
              w-8
              rotate-[20deg]
              bg-white/20
              blur-md
            "
          />

          {/* glow */}

          <span
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/10
              to-white/[0.06]
            "
          />

          <ShoppingCart
            size={14}
            className="
              relative
              z-10
              transition-transform
              duration-300
              group-hover:-rotate-6
              group-hover:scale-110
            "
          />

          <span className="relative z-10">
            Add To Cart
          </span>
        </motion.button>

        {/* WISHLIST */}

        <motion.button
          type="button"
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.94,
          }}
          transition={{
            duration: 0.2,
            ease,
          }}
          className="
            group
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.08]
            bg-white/[0.025]
            text-zinc-400
            transition-all
            duration-300
            hover:border-red-500/25
            hover:bg-red-500/[0.06]
            hover:text-red-400
          "
        >
          <Heart
            size={15}
            className="
              transition-transform
              duration-300
              group-hover:scale-110
            "
          />
        </motion.button>

      </motion.div>

    </motion.div>
  );
}