
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Eye,
  ShoppingCart,
  Sparkles,
  Zap,
  Check,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useFlyToCart } from "../../context/FlyToCartContext";

import HoverDescription from "./HoverDescription";
import useIsMobile from "./useIsMobile";

const EASE = [0.22, 1, 0.36, 1];

const formatPrice = (value) =>
  new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(value);

function getOptimizedImage(url, width = 600) {
  if (!url || typeof url !== "string") return "";

  if (
    !url.includes("res.cloudinary.com") ||
    !url.includes("/image/upload/")
  ) {
    return url;
  }

  // Avoid adding duplicate transformations.
  const [prefix, suffix] = url.split("/image/upload/");

  if (!suffix) return url;

  const parts = suffix.split("/");
  const firstPart = parts[0];

  const hasTransformations =
    firstPart.includes(",") ||
    /^(?:w_|h_|c_|q_|f_|dpr_|ar_|g_|e_)/.test(firstPart);

  const transformation = `f_auto,q_auto,w_${width},c_limit`;

  return `${prefix}/image/upload/${
    hasTransformations
      ? `${transformation}/${suffix}`
      : `${transformation}/${suffix}`
  }`;
}

export default function ProductCard({ product }) {
  const imageRef = useRef(null);
  const resetTimerRef = useRef(null);

  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  const { addToCart } = useCart();
  const { flyToCart } = useFlyToCart();

  const [hovered, setHovered] = useState(false);
  const [opened, setOpened] = useState(false);
  const [added, setAdded] = useState(false);

  const productId = product?._id;

  const name = product?.name || "Premium Creation";
  const category = product?.category || "Collection";
  const description = product?.description || "";

  const currentPrice = Math.max(0, Number(product?.price) || 0);
  const oldPrice = Math.max(0, Number(product?.oldPrice) || 0);

  const hasSale =
    currentPrice > 0 && oldPrice > currentPrice;

  const saveAmount = hasSale
    ? oldPrice - currentPrice
    : 0;

  const savePercent = hasSale
    ? Math.round((saveAmount / oldPrice) * 100)
    : 0;

  const imageUrl = getOptimizedImage(product?.image, 600);

  const productUrl = `/product/${productId}`;

  useEffect(() => {
    if (!isMobile || !opened) return;

    const timer = window.setTimeout(() => {
      setOpened(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [isMobile, opened]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!product) return;

    const image = imageRef.current;

    // Preserve the existing FlyToCartContext contract.
    if (image && !reduceMotion) {
      const rect = image.getBoundingClientRect();

      flyToCart({
        image: product.image,
        start: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      });
    }

    addToCart(product, 1);

    setAdded(true);

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setAdded(false);
    }, 1400);
  };

  const handleCardClick = (event) => {
    if (!isMobile || !description) return;

    if (event.target.closest("a, button")) return;

    setOpened((previous) => !previous);
  };

  return (
    <div className="relative min-w-0">
      <motion.article
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 12 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.42,
          ease: EASE,
        }}
        onMouseEnter={() => {
          if (!isMobile) setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onClick={handleCardClick}
        className="
          group relative isolate
          min-w-0 overflow-hidden
          rounded-[15px]
          border border-white/[0.08]
          bg-[#0b0b0c]
          shadow-[0_8px_24px_rgba(0,0,0,0.18)]
          transition-[border-color,box-shadow]
          duration-300
          hover:border-red-500/25
          hover:shadow-[0_12px_32px_rgba(180,20,30,0.08)]
          sm:rounded-[17px]
        "
      >
        {/* TOP PRECISION LINE */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-x-0 top-0 z-20
            h-px bg-gradient-to-r
            from-transparent via-red-500/40 to-transparent
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          "
        />

        {/* IMAGE */}
        <Link
          to={productUrl}
          aria-label={`View ${name}`}
          className="block"
        >
          <div
            className="
              relative overflow-hidden
              h-[128px]
              xs:h-[140px]
              sm:h-[170px]
              md:h-[185px]
              lg:h-[200px]
              xl:h-[210px]
              bg-[#111]
            "
          >
            {imageUrl ? (
              <img
                ref={imageRef}
                src={imageUrl}
                alt={name}
                loading="lazy"
                decoding="async"
                sizes="
                  (max-width: 639px) 50vw,
                  (max-width: 1023px) 50vw,
                  33vw
                "
                className="
                  h-full w-full object-cover
                  transition-transform duration-700
                  ease-out
                  motion-safe:group-hover:scale-[1.035]
                  motion-reduce:transition-none
                "
              />
            ) : (
              <div
                className="
                  flex h-full w-full
                  items-center justify-center
                  text-[10px] uppercase
                  tracking-[0.12em]
                  text-zinc-600
                "
              >
                Image unavailable
              </div>
            )}

            {/* CINEMATIC GRADIENT */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-t
                from-black/75 via-transparent to-black/15
              "
            />

            {/* SALE BADGE */}
            {hasSale && (
              <div
                className="
                  absolute left-2 top-2 z-10
                  inline-flex items-center gap-1
                  rounded-full border
                  border-red-400/25
                  bg-red-600
                  px-2 py-1
                  shadow-[0_4px_12px_rgba(220,38,38,0.2)]
                  sm:left-2.5 sm:top-2.5
                "
              >
                <Sparkles size={9} strokeWidth={2} />

                <span
                  className="
                    font-bebas text-[9px]
                    leading-none tracking-[0.08em]
                    text-white
                  "
                >
                  -{savePercent}%
                </span>
              </div>
            )}

            {/* VIEW INDICATOR */}
            <div
              aria-hidden="true"
              className="
                absolute right-2 top-2 z-10
                flex h-7 w-7 items-center
                justify-center rounded-full
                border border-white/15
                bg-black/65 text-white
                transition-[opacity,transform,border-color]
                duration-200
                sm:right-2.5 sm:top-2.5
                lg:opacity-0
                lg:translate-y-1
                lg:group-hover:translate-y-0
                lg:group-hover:opacity-100
                lg:group-focus-within:opacity-100
              "
            >
              <Eye size={13} />
            </div>

            {/* SAVINGS */}
            {hasSale && (
              <div
                className="
                  absolute bottom-2 left-2 z-10
                  inline-flex max-w-[calc(100%-16px)]
                  items-center gap-1
                  rounded-md border
                  border-emerald-500/20
                  bg-black/75
                  px-1.5 py-1
                  sm:px-2
                "
              >
                <Zap
                  size={9}
                  fill="currentColor"
                  className="shrink-0 text-emerald-400"
                />

                <span
                  className="
                    truncate text-[7px]
                    font-semibold uppercase
                    tracking-[0.04em]
                    text-emerald-400
                    sm:text-[8px]
                  "
                >
                  Save {formatPrice(saveAmount)} DH
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* PRODUCT CONTENT */}
        <div
          className="
            relative min-w-0
            px-2.5 py-2.5
            sm:px-3 sm:py-3
            lg:px-3.5
          "
        >
          {/* CATEGORY */}
          <div
            className="
              mb-1.5 hidden
              min-w-0 items-center gap-1.5
              sm:flex
            "
          >
            <span
              className="
                inline-flex max-w-full
                truncate rounded-full
                border border-red-500/15
                bg-red-500/[0.06]
                px-2 py-[3px]
                font-bebas text-[8px]
                uppercase tracking-[0.12em]
                text-red-400
              "
            >
              {category}
            </span>

            {hasSale && (
              <span
                className="
                  truncate text-[8px]
                  font-semibold uppercase
                  tracking-[0.1em]
                  text-emerald-400/80
                "
              >
                Limited
              </span>
            )}
          </div>

          {/* PRODUCT NAME */}
          <Link
            to={productUrl}
            className="
              block min-w-0
              rounded-sm
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-red-500
            "
          >
            <h3
              className="
                line-clamp-1
                font-bebas
                text-[14px]
                uppercase leading-[1.1]
                tracking-[0.055em]
                text-white
                transition-colors duration-200
                group-hover:text-red-400
                sm:text-[16px]
                lg:text-[17px]
                xl:text-[18px]
              "
              title={name}
            >
              {name}
            </h3>
          </Link>

          {/* MOBILE DESCRIPTION */}
          {isMobile && description && (
            <AnimatePresence initial={false}>
              {opened && (
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, height: 0 }
                  }
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.2,
                    ease: EASE,
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className="
                      mt-2 line-clamp-3
                      rounded-lg border
                      border-red-500/10
                      bg-red-500/[0.035]
                      px-2 py-2
                      text-[9px] leading-[1.5]
                      text-zinc-400
                    "
                  >
                    {description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* PRICE + CART */}
          <div
            className="
              mt-2.5 flex min-w-0
              items-end justify-between gap-1.5
              sm:mt-3 sm:gap-2
            "
          >
            {/* PRICE */}
            <div className="min-w-0 flex-1">
              <div
                className="
                  flex min-w-0 flex-wrap
                  items-baseline gap-x-1.5 gap-y-1
                "
              >
                <span
                  className="
                    whitespace-nowrap
                    font-bebas
                    text-[20px] leading-none
                    tracking-[0.01em]
                    text-white
                    sm:text-[23px]
                    lg:text-[24px]
                  "
                >
                  {formatPrice(currentPrice)}
                  <span
                    className="
                      ml-1 text-[11px]
                      text-zinc-400
                      sm:text-[12px]
                    "
                  >
                    DH
                  </span>
                </span>

                {hasSale && (
                  <span
                    className="
                      whitespace-nowrap
                      text-[9px]
                      text-zinc-600 line-through
                      sm:text-[10px]
                    "
                  >
                    {formatPrice(oldPrice)}
                  </span>
                )}
              </div>

              {hasSale && (
                <p
                  className="
                    mt-1 truncate
                    text-[7px] font-bold
                    uppercase tracking-[0.12em]
                    text-emerald-400
                    sm:text-[8px]
                  "
                >
                  Limited Offer
                </p>
              )}
            </div>

            {/* ADD TO CART */}
            <motion.button
              type="button"
              onClick={handleAddToCart}
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.95 }
              }
              aria-label={`Add ${name} to cart`}
              className={`
                group/cart flex h-9
                shrink-0 items-center
                justify-center gap-1.5
                rounded-lg px-2.5
                font-bebas text-[10px]
                uppercase tracking-[0.1em]
                text-white
                transition-[background-color,box-shadow]
                duration-200
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-400
                sm:px-3
                ${
                  added
                    ? "bg-emerald-600"
                    : "bg-red-600 hover:bg-red-500 hover:shadow-[0_5px_18px_rgba(220,38,38,0.2)]"
                }
              `}
            >
              {added ? (
                <Check size={13} />
              ) : (
                <ShoppingCart
                  size={13}
                  className="
                    transition-transform duration-200
                    group-hover/cart:-translate-x-0.5
                  "
                />
              )}

              <span className="hidden sm:inline">
                {added ? "Added" : "Shop"}
              </span>
            </motion.button>
          </div>
        </div>

        {/* BOTTOM ACCENT */}
        <span
          aria-hidden="true"
          className="
            block h-px w-full
            origin-left scale-x-0
            bg-gradient-to-r
            from-red-600 via-red-400 to-transparent
            opacity-60
            transition-transform duration-300
            group-hover:scale-x-100
            group-focus-within:scale-x-100
          "
        />
      </motion.article>

      {/* DESKTOP HOVER DESCRIPTION */}
      {!isMobile && (
        <HoverDescription
          text={description}
          visible={hovered}
        />
      )}
    </div>
  );
}
