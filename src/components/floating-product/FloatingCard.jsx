
import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EASE = [0.22, 1, 0.36, 1];

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 2,
});

/*
  SAME 4-PIECE PUZZLE CONCEPT.

  - Real interlocking shapes
  - No background behind the pieces
  - No borders or seam strokes
  - Rounded exterior corners
  - One shared black/burgundy gradient
*/

const PUZZLE = [
  {
    id: "tl",
    path: `
      M 20 0
      H 110
      V 37
      C 97 29, 91 39, 91 48
      C 91 57, 97 67, 110 59
      V 100
      H 65
      C 73 87, 63 81, 55 81
      C 47 81, 37 87, 45 100
      H 0
      V 20
      Q 0 0 20 0
      Z
    `,
    from: { x: -85, y: -70, rotate: -10 },
    delay: 0,
  },
  {
    id: "tr",
    path: `
      M 110 0
      H 200
      Q 220 0 220 20
      V 100
      H 175
      C 183 87, 173 81, 165 81
      C 157 81, 147 87, 155 100
      H 110
      V 59
      C 97 67, 91 57, 91 48
      C 91 39, 97 29, 110 37
      Z
    `,
    from: { x: 85, y: -70, rotate: 10 },
    delay: 0.08,
  },
  {
    id: "bl",
    path: `
      M 0 100
      H 45
      C 37 87, 47 81, 55 81
      C 63 81, 73 87, 65 100
      H 110
      V 141
      C 97 133, 91 143, 91 152
      C 91 161, 97 171, 110 163
      V 200
      H 20
      Q 0 200 0 180
      Z
    `,
    from: { x: -85, y: 70, rotate: 9 },
    delay: 0.12,
  },
  {
    id: "br",
    path: `
      M 110 100
      H 155
      C 147 87, 157 81, 165 81
      C 173 81, 183 87, 175 100
      H 220
      V 180
      Q 220 200 200 200
      H 110
      V 163
      C 97 171, 91 161, 91 152
      C 91 143, 97 133, 110 141
      Z
    `,
    from: { x: 85, y: 70, rotate: -9 },
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
      className="
        pointer-events-none
        absolute inset-0
        h-full w-full
        overflow-visible
      "
    >
      <defs>
        {/*
          Shared coordinate system:
          all 4 pieces sample the SAME gradient.
          No two-tone quadrants.
        */}
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="220"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#171113" />
          <stop offset="27%" stopColor="#141012" />
          <stop offset="58%" stopColor="#0e0b0d" />
          <stop offset="100%" stopColor="#080808" />
        </linearGradient>
      </defs>

      {PUZZLE.map((piece) => (
        <motion.path
          key={piece.id}
          d={piece.path}
          fill={`url(#${gradientId})`}
          stroke="none"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  x: piece.from.x,
                  y: piece.from.y,
                  rotate: piece.from.rotate,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            delay: reduceMotion ? 0 : piece.delay,
            ease: EASE,
          }}
          style={{
            transformOrigin: "110px 100px",
          }}
        />
      ))}
    </svg>
  );
}

export default function FloatingCard({ product, onClose }) {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const productId = product?._id || product?.id;
  const name = product?.name || "Premium Creation";
  const category = product?.category || "Collection";
  const price = Number(product?.price) || 0;

  const handleShop = () => {
    if (!productId) return;

    onClose?.();
    navigate(`/product/${productId}`);
  };

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: 70, scale: 0.96 }
      }
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: 80, scale: 0.96 }
      }
      transition={{
        duration: reduceMotion ? 0.1 : 0.45,
        ease: EASE,
      }}
      className="
        fixed right-4 top-20
        z-[9999]
        w-[220px]
        max-w-[calc(100vw-24px)]
      "
      role="region"
      aria-label={`Featured product: ${name}`}
    >
      {/* ORIGINAL PRODUCT IMAGE — UNCHANGED SIZE */}
      <div
        className="
          pointer-events-none
          absolute left-1/2 top-0
          z-30
          flex -translate-x-1/2
          items-center justify-center
        "
      >
        <motion.img
          src={product?.image}
          alt={name}
          loading="eager"
          decoding="async"
          draggable={false}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 10,
                  scale: 0.96,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion ? 0 : 0.65,
            ease: EASE,
          }}
          className="
            relative z-30
            h-[165px]
            w-auto max-w-none
            select-none object-contain
            drop-shadow-[0_20px_32px_rgba(0,0,0,.45)]
          "
        />
      </div>

      {/* PUZZLE CARD */}
      <div className="relative w-full translate-y-[92px]">
        <PuzzleSurface reduceMotion={reduceMotion} />

        {/* CLOSE */}
        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close product notification"
          whileHover={
            reduceMotion ? undefined : { rotate: 90 }
          }
          whileTap={
            reduceMotion ? undefined : { scale: 0.92 }
          }
          className="
            absolute right-2.5 top-2.5
            z-40
            flex h-6 w-6
            items-center justify-center
            rounded-lg
            bg-black/25
            text-zinc-500
            transition-colors duration-200
            hover:bg-red-500/10
            hover:text-red-400
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-red-500
          "
        >
          <X size={12} />
        </motion.button>

        {/* CONTENT — CLEANER HIERARCHY */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 6 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.32,
            delay: reduceMotion ? 0 : 0.8,
            ease: EASE,
          }}
          className="
            relative z-10
            px-3.5 pb-3.5 pt-8
          "
        >
          {/* TOP ACCENT */}
          <div className="mb-2 flex justify-center">
            <div
              className="
                h-px w-12
                bg-gradient-to-r
                from-transparent
                via-red-500/65
                to-transparent
              "
            />
          </div>

          {/* NAME + CATEGORY */}
          <div className="text-center">
            <h2
              title={name}
              className="
                truncate
                font-bebas
                text-[17px]
                leading-none
                tracking-[0.04em]
                text-white
              "
            >
              {name}
            </h2>

            <p
              title={category}
              className="
                mt-1.5 truncate
                text-[7px]
                font-medium uppercase
                tracking-[0.24em]
                text-zinc-500
              "
            >
              {category}
            </p>
          </div>

          {/* CRAFT DETAILS */}
          <div
            className="
              mt-2.5 flex items-center
              justify-center gap-1.5
              text-[6px] uppercase
              tracking-[0.1em]
              text-zinc-500
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
              aria-hidden="true"
              className="
                h-[3px] w-[3px]
                rounded-full bg-red-500/50
              "
            />

            <span>Custom Made</span>
          </div>

          {/* DIVIDER */}
          <div
            className="
              my-2.5 h-px
              bg-gradient-to-r
              from-transparent
              via-white/[0.08]
              to-transparent
            "
          />

          {/* PRICE + CTA */}
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p
                className="
                  text-[6px]
                  uppercase tracking-[0.2em]
                  text-zinc-500
                "
              >
                Starting from
              </p>

              <h3
                className="
                  mt-0.5 whitespace-nowrap
                  font-bebas
                  text-[22px]
                  leading-none
                  tracking-wide
                  text-red-500
                "
              >
                {priceFormatter.format(price)} DH
              </h3>
            </div>

            <motion.button
              type="button"
              onClick={handleShop}
              disabled={!productId}
              whileHover={
                reduceMotion
                  ? undefined
                  : { scale: 1.04, y: -1 }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.95 }
              }
              className="
                flex shrink-0 items-center
                gap-1.5 rounded-full
                bg-red-600
                px-3.5 py-1.5
                text-[7px] font-bold
                uppercase tracking-[0.16em]
                text-white
                shadow-[0_6px_18px_rgba(239,68,68,.2)]
                transition-colors duration-200
                hover:bg-red-500
                disabled:opacity-50
              "
            >
              SHOP
              <ArrowRight size={10} />
            </motion.button>
          </div>

          {/* SIGNATURE */}
          <div
            className="
              mt-2.5 text-center
              text-[5.5px]
              uppercase tracking-[0.2em]
              text-zinc-600
            "
          >
            KADECHO • Crafted With Precision
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
