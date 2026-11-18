import { useId, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const EASE = [0.22, 1, 0.36, 1];
const priceFormatter = new Intl.NumberFormat("fr-MA", {
  maximumFractionDigits: 2,
});

// Four interlocking surfaces. No full background panel or puzzle lines on top.
const PIECES = [
  {
    id: "top-left",
    d: "M 20 0 H 110 V 37 C 97 29 91 39 91 48 C 91 57 97 67 110 59 V 100 H 65 C 73 87 63 81 55 81 C 47 81 37 87 45 100 H 0 V 20 Q 0 0 20 0 Z",
    from: { x: -85, y: -65, rotate: -8 },
    delay: 0,
  },
  {
    id: "top-right",
    d: "M 110 0 H 200 Q 220 0 220 20 V 100 H 175 C 183 87 173 81 165 81 C 157 81 147 87 155 100 H 110 V 59 C 97 67 91 57 91 48 C 91 39 97 29 110 37 Z",
    from: { x: 85, y: -65, rotate: 8 },
    delay: 0.07,
  },
  {
    id: "bottom-left",
    d: "M 0 100 H 45 C 37 87 47 81 55 81 C 63 81 73 87 65 100 H 110 V 141 C 97 133 91 143 91 152 C 91 161 97 171 110 163 V 200 H 20 Q 0 200 0 180 Z",
    from: { x: -85, y: 65, rotate: 8 },
    delay: 0.12,
  },
  {
    id: "bottom-right",
    d: "M 110 100 H 155 C 147 87 157 81 165 81 C 173 81 183 87 175 100 H 220 V 180 Q 220 200 200 200 H 110 V 163 C 97 171 91 161 91 152 C 91 143 97 133 110 141 Z",
    from: { x: 85, y: 65, rotate: -8 },
    delay: 0.18,
  },
];

function PuzzleSurface({ reduceMotion }) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 220 200"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="220"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1b1114" />
          <stop offset="34%" stopColor="#141012" />
          <stop offset="68%" stopColor="#0d0c0d" />
          <stop offset="100%" stopColor="#090909" />
        </linearGradient>
      </defs>

      {PIECES.map((piece) => (
        <motion.path
          key={piece.id}
          d={piece.d}
          fill={`url(#${gradientId})`}
          stroke="none"
          initial={
            reduceMotion
              ? false
              : { opacity: 0, ...piece.from }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.78,
            delay: reduceMotion ? 0 : piece.delay,
            ease: EASE,
          }}
          style={{ transformOrigin: "110px 100px" }}
        />
      ))}
    </svg>
  );
}

export default function ProductInfo({ product, onAddToCart }) {
  const { addToCart } = useCart();
  const addButtonRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const name = product?.name || product?.title || "Premium Creation";
  const category = product?.category || "Collection";
  const price = Number(product?.price) || 0;
  const oldPrice = Number(product?.oldPrice) || 0;
  const discounted = oldPrice > price && price > 0;
  const discount = discounted
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;
  const rating = Number(product?.rating);
  const reviews = Number(product?.reviews);
  const hasRating = Number.isFinite(rating) && rating > 0;
  const hasReviews = Number.isFinite(reviews) && reviews >= 0;

  const handleAddToCart = () => {
    const image = product?.image || product?.images?.[0];
    if (!image) {
      console.error("Product image not found");
      return;
    }

    addToCart({
      ...product,
      _id: product?._id || product?.id,
      name: product?.name || product?.title,
      title: product?.title || product?.name,
      image,
    });

    onAddToCart?.(image, addButtonRef.current);
  };

  return (
    <div className="relative isolate w-full min-w-0">
      {/* The four puzzle pieces ARE the card surface. */}
      <PuzzleSurface reduceMotion={reduceMotion} />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.38,
          delay: reduceMotion ? 0 : 0.68,
          ease: EASE,
        }}
        className="relative z-10 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5"
      >
        {/* Editorial micro-header */}
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-red-500" />
            <span className="truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              KADECHO / ATELIER
            </span>
          </div>
          {hasRating && (
            <div className="flex shrink-0 items-center gap-1.5 text-[10px] text-zinc-400">
              <Star size={11} fill="currentColor" className="text-red-500" />
              <span className="font-semibold text-zinc-100">{rating.toFixed(1)}</span>
              {hasReviews && <span className="text-zinc-500">({reviews})</span>}
            </div>
          )}
        </div>

        {/* Product identity */}
        <div className="mt-5 sm:mt-6">
          <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-red-400">
            {category} <span className="mx-1 text-red-900">/</span> Custom creation
          </p>
          <h1 className="break-words font-bebas text-[34px] uppercase leading-[0.98] tracking-[0.025em] text-white sm:text-[40px] lg:text-[42px]">
            {name}
          </h1>
          {product?.description && (
            <p className="mt-2.5 max-w-[52ch] text-[11px] leading-[1.65] text-zinc-400 sm:text-[12px]">
              {product.description}
            </p>
          )}
        </div>

        {/* Price block: no extra card, clear hierarchy */}
        <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-white/[0.08] pb-4 sm:mt-6">
          <div className="min-w-0">
            <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Price
            </p>
            <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
              <strong className="whitespace-nowrap font-bebas text-[32px] font-normal leading-none tracking-[0.02em] text-red-500 sm:text-[36px]">
                {priceFormatter.format(price)} DH
              </strong>
              {discounted && (
                <span className="pb-0.5 text-[11px] text-zinc-500 line-through">
                  {priceFormatter.format(oldPrice)} DH
                </span>
              )}
            </div>
          </div>
          {discounted && (
            <span className="rounded-md bg-red-500/[0.10] px-2 py-1 text-[10px] font-bold text-red-400">
              -{discount}%
            </span>
          )}
        </div>

        {/* Lightweight assurances instead of dashboard-style cards */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-red-400" />
            Premium Quality
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Truck size={14} className="text-red-400" />
            Fast Delivery
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check size={14} className="text-red-400" />
            Custom Made
          </span>
        </div>

        {/* Conversion action: original cart + fly-to-cart behavior */}
        <div className="mt-4 flex min-w-0 items-stretch gap-2">
          <motion.button
            ref={addButtonRef}
            type="button"
            onClick={handleAddToCart}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            className="group flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b91c1c] to-[#e02429] px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-[filter] duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <ShoppingBag size={15} />
            <span>Add to Cart</span>
            <ArrowUpRight size={14} className="opacity-75 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
          <button
            type="button"
            disabled
            aria-label="Wishlist coming soon"
            title="Wishlist coming soon"
            className="flex h-11 w-11 shrink-0 cursor-not-allowed items-center justify-center rounded-xl bg-white/[0.045] text-zinc-600"
          >
            <Heart size={16} />
          </button>
        </div>

        <p className="mt-3 text-center text-[8px] uppercase tracking-[0.18em] text-zinc-600">
          Crafted with precision · KADECHO
        </p>
      </motion.div>
    </div>
  );
}
