import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  ShoppingCart,
  Sparkles,
  Zap,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useFlyToCart } from "../../context/FlyToCartContext";

import HoverDescription from "./HoverDescription";
import useIsMobile from "./useIsMobile";

/* =========================================================
   CLOUDINARY IMAGE OPTIMIZATION
========================================================= */

const getOptimizedImage = (url, width = 500) => {
  if (!url) return "";

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  if (!url.includes("/image/upload/")) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_auto,w_${width}/`
  );
};

export default function ProductCard({ product }) {
  const productImageRef = useRef(null);

  const isMobile = useIsMobile();
  const productId = product?._id;

  const { addToCart } = useCart();
  const { flyToCart } = useFlyToCart();

  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(false);

  /* =========================================================
     SALE
  ========================================================= */

  const currentPrice = Number(product?.price || 0);
  const oldPrice = Number(product?.oldPrice || 0);

  const hasSale =
    oldPrice > currentPrice &&
    currentPrice > 0;

  const saveAmount = hasSale
    ? oldPrice - currentPrice
    : 0;

  const savePercent = hasSale
    ? Math.round(
        ((oldPrice - currentPrice) / oldPrice) * 100
      )
    : 0;

  /* =========================================================
     MOBILE DESCRIPTION
  ========================================================= */

  useEffect(() => {
    if (!isMobile || !opened) return;

    const timer = setTimeout(() => {
      setOpened(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [opened, isMobile]);

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const image = productImageRef.current;

    if (image) {
      const imageRect = image.getBoundingClientRect();

      flyToCart({
        image: product.image,

        start: {
          x: imageRect.left + imageRect.width / 2,
          y: imageRect.top + imageRect.height / 2,
        },
      });
    }

    addToCart(product, 1);
  };

  /* =========================================================
     OPTIMIZED IMAGE
  ========================================================= */

  const optimizedImage = getOptimizedImage(
    product?.image,
    500
  );

  return (
    <div className="relative min-w-0">
      <motion.article
        initial={{
          opacity: 0,
          y: 14,
          scale: 0.99,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.12,
        }}
        transition={{
          duration: 0.42,
          delay: 0.025,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={
          !isMobile
            ? {
                y: -2,
              }
            : {}
        }
        onMouseEnter={() => {
          if (!isMobile) {
            setHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setHovered(false);
          }
        }}
        onClick={(e) => {
          if (!isMobile) return;

          const target = e.target.closest("a,button");

          if (target) return;

          setOpened(true);
        }}
        className="
          group
          relative
          overflow-hidden

          rounded-[16px]
          sm:rounded-[18px]

          border
          border-white/[0.07]

          bg-[#090909]

          shadow-[0_8px_26px_rgba(0,0,0,.18)]

          transition-all
          duration-300

          hover:border-red-500/20
          hover:bg-[#0a0a0a]

          hover:shadow-[0_14px_32px_rgba(239,68,68,.065)]
        "
      >
        {/* =====================================================
            IMAGE
        ===================================================== */}

        <Link
          to={`/product/${productId}`}
          className="block"
        >
          <div
            className="
              relative
              overflow-hidden

              h-[128px]
              xs:h-[140px]
              sm:h-[170px]
              md:h-[185px]
              lg:h-[200px]
              xl:h-[210px]
            "
          >
            <img
              ref={productImageRef}
              src={optimizedImage}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="
                h-full
                w-full

                object-cover

                transition-transform
                duration-700

                group-hover:scale-[1.035]
              "
            />

            {/* IMAGE GRADIENT */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0

                bg-gradient-to-t
                from-[#050505]/85
                via-[#050505]/10
                to-transparent

                opacity-75

                transition-opacity
                duration-300

                group-hover:opacity-90
              "
            />

            {/* TOP DARK OVERLAY */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                top-0

                h-16

                bg-gradient-to-b
                from-black/25
                to-transparent
              "
            />

            {/* =================================================
                SALE BADGE
            ================================================= */}

            {hasSale && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  absolute
                  left-2.5
                  top-2.5

                  z-20

                  inline-flex
                  items-center
                  gap-1

                  rounded-full

                  border
                  border-red-400/20

                  bg-red-600

                  px-2.5
                  py-1

                  font-bebas

                  text-[9px]

                  leading-none

                  tracking-[0.13em]

                  text-white

                  shadow-[0_5px_15px_rgba(239,68,68,.20)]
                "
              >
                <Sparkles
                  size={9}
                  strokeWidth={2.2}
                />

                <span>
                  -{savePercent}%
                </span>
              </motion.div>
            )}

            {/* =================================================
                VIEW BUTTON
            ================================================= */}

            <motion.div
              whileHover={{
                scale: 1.06,
              }}
              className="
                absolute
                right-2.5
                top-2.5

                z-20

                flex
                h-7
                w-7

                items-center
                justify-center

                rounded-full

                border
                border-white/10

                bg-black/55

                text-white

                backdrop-blur-xl

                opacity-100

                lg:opacity-0
                lg:group-hover:opacity-100

                transition-opacity
                duration-250
              "
            >
              <Eye size={12} />
            </motion.div>

            {/* =================================================
                SAVE AMOUNT
            ================================================= */}

            {hasSale && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -6,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                }}
                className="
                  absolute
                  bottom-2
                  left-2

                  z-20

                  inline-flex
                  items-center
                  gap-0.5
                  sm:gap-1

                  rounded-[5px]
                  sm:rounded-md

                  border
                  border-emerald-500/25

                  bg-black/65

                  px-1.5
                  py-0.5
                  sm:px-2
                  sm:py-1

                  backdrop-blur-xl
                "
              >
                <Zap
                  size={8}
                  className="text-emerald-400 sm:h-[9px] sm:w-[9px]"
                  fill="currentColor"
                />

                <span
                  className="
                    text-[6px]
                    sm:text-[8px]

                    font-semibold
                    uppercase
                    tracking-[0.05em]
                    sm:tracking-[0.08em]

                    text-emerald-400
                  "
                >
                  Save {saveAmount} DH
                </span>
              </motion.div>
            )}
          </div>
        </Link>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div
          className="
            relative

            px-2.5
            py-2.5

            sm:px-3
            sm:py-3.5

            lg:px-3.5
            lg:py-3.5
          "
        >
          {/* =================================================
              CATEGORY
          ================================================= */}

          <div
            className="
              mb-1.5

              hidden
              sm:flex

              min-w-0
              items-center
              gap-1.5
            "
          >
            <span
              className="
                inline-flex
                max-w-full
                items-center

                truncate

                rounded-full

                border
                border-red-500/15

                bg-red-500/[0.06]

                px-1.5
                py-[3px]

                font-bebas

                text-[7px]
                sm:text-[8px]

                uppercase
                tracking-[0.16em]

                text-red-400

                transition-colors
                duration-300

                group-hover:border-red-500/25
                group-hover:text-red-300
              "
            >
              {product.category}
            </span>

            {hasSale && (
              <span
                className="
                  hidden
                  truncate

                  text-[7px]
                  sm:block

                  font-semibold
                  uppercase
                  tracking-[0.10em]

                  text-emerald-400/75
                "
              >
                Limited
              </span>
            )}
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <Link
            to={`/product/${productId}`}
            className="
              block
              min-w-0

              max-sm:pt-1.5
            "
          >
            <motion.h3
              whileHover={
                !isMobile
                  ? {
                      x: 1,
                    }
                  : {}
              }
              className="
                line-clamp-1

                overflow-hidden

                font-bebas

                text-[14px]
                sm:text-[16px]
                lg:text-[17px]
                xl:text-[18px]

                uppercase
                leading-none

                tracking-[0.065em]

                text-white

                transition-colors
                duration-300

                group-hover:text-red-400
              "
            >
              {product.name}
            </motion.h3>
          </Link>

          {/* =================================================
              MOBILE DESCRIPTION
          ================================================= */}

          <div className="sm:hidden">
            <AnimatePresence initial={false}>
              {opened && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -4,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      mt-2

                      rounded-lg

                      border
                      border-red-500/10

                      bg-red-500/[0.035]

                      px-2
                      py-2
                    "
                  >
                    <p
                      className="
                        line-clamp-3

                        text-[9px]

                        leading-[1.45]

                        text-zinc-400
                      "
                    >
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =================================================
              PRICE + CART
          ================================================= */}

          <div
            className="
              mt-2.5
              sm:mt-3

              flex
              items-end
              justify-between

              gap-2
            "
          >
            {/* PRICE */}

            <div className="min-w-0">
              <div
                className="
                  flex
                  min-w-0
                  items-baseline
                  gap-1.5
                  sm:gap-2
                "
              >
                {/* PERFORMANCE:
                    Removed infinite Framer Motion animation
                */}

                <span
                  className="
                    whitespace-nowrap

                    font-bebas

                    text-[21px]
                    sm:text-[23px]
                    lg:text-[24px]

                    leading-none

                    tracking-[0.01em]

                    text-white
                  "
                >
                  {currentPrice} DH
                </span>

                {hasSale && (
                  <span
                    className="
                      whitespace-nowrap

                      text-[9px]
                      sm:text-[10px]

                      leading-none

                      text-zinc-600

                      line-through
                    "
                  >
                    {oldPrice} DH
                  </span>
                )}
              </div>

              {hasSale && (
                <div className="mt-1">
                  <span
                    className="
                      text-[7px]
                      sm:text-[8px]

                      font-bold

                      uppercase
                      tracking-[0.14em]

                      text-emerald-400
                    "
                  >
                    Limited Offer
                  </span>
                </div>
              )}
            </div>

            {/* =================================================
                SHOP BUTTON
            ================================================= */}

            <motion.button
              type="button"
              onClick={handleAddToCart}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.025,
                      boxShadow:
                        "0 7px 20px rgba(239,68,68,.20)",
                    }
                  : {}
              }
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 22,
              }}
              className="
                group/shop

                flex
                h-9
                sm:h-9.5

                shrink-0

                items-center
                justify-center

                gap-1.5

                rounded-lg
                sm:rounded-xl

                bg-red-600

                px-2.5
                sm:px-3

                font-bebas

                text-[9px]
                sm:text-[10px]

                uppercase
                tracking-[0.13em]

                text-white

                shadow-[0_5px_16px_rgba(220,38,38,.11)]

                transition-colors
                duration-300

                hover:bg-red-500
              "
            >
              <ShoppingCart
                size={12}
                className="
                  transition-transform
                  duration-300

                  group-hover/shop:-translate-x-0.5
                "
              />

              <span className="hidden sm:block">
                Shop
              </span>
            </motion.button>
          </div>
        </div>

        {/* =====================================================
            BOTTOM ACCENT
        ===================================================== */}

        <motion.span
          initial={{
            scaleX: 0,
          }}
          whileHover={{
            scaleX: 1,
          }}
          className="
            block

            h-px
            w-full

            origin-left

            bg-gradient-to-r
            from-red-600
            via-red-400
            to-transparent

            opacity-55

            transition-transform
            duration-500
          "
        />
      </motion.article>

      {/* =======================================================
          DESKTOP DESCRIPTION
      ======================================================= */}

      {!isMobile ? (
        <HoverDescription
          text={product.description}
          visible={hovered}
        />
      ) : null}
    </div>
  );
}