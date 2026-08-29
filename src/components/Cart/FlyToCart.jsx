import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { useFlyToCart } from "../../context/FlyToCartContext";

export default function FlyToCart() {
  const { animation, clearAnimation } = useFlyToCart();

  useEffect(() => {
    if (!animation) return;

    const timer = setTimeout(() => {
      clearAnimation();
    }, 1400);

    return () => clearTimeout(timer);
  }, [animation, clearAnimation]);

  if (!animation) return null;

  const { image, start, end } = animation;

  const SIZE = 82;
  const FINAL_SIZE = 34;

  /*
    البداية
    ↓
    1. كيمشي شوية لليسار
    ↓
    2. كيطير لفوق ب curve
    ↓
    3. كيتجه للـcart
    ↓
    4. كيدخل بحال كرة
  */

  const x0 = start.x - SIZE / 2;
  const y0 = start.y - SIZE / 2;

  const x1 = start.x - 90;
  const y1 = start.y - 25;

  const x2 = start.x - 45;
  const y2 = start.y - 115;

  const x3 = end.x - FINAL_SIZE / 2;
  const y3 = end.y - FINAL_SIZE / 2;

  const flyingImage = (
    <motion.div
      key={animation.id}
      initial={{
        position: "fixed",

        left: x0,
        top: y0,

        width: SIZE,
        height: SIZE,

        opacity: 0,
        scale: 0.85,
        rotate: 0,
      }}

      animate={{
        left: [
          x0,
          x1,
          x2,
          x3,
        ],

        top: [
          y0,
          y1,
          y2,
          y3,
        ],

        width: [
          SIZE,
          78,
          60,
          FINAL_SIZE,
        ],

        height: [
          SIZE,
          78,
          60,
          FINAL_SIZE,
        ],

        opacity: [
          0,
          1,
          1,
          1,
        ],

        scale: [
          0.85,
          1.08,
          0.95,
          0.55,
        ],

        rotate: [
          0,
          -8,
          12,
          360,
        ],
      }}

      transition={{
        duration: 1.35,

        times: [
          0,
          0.22,
          0.55,
          1,
        ],

        ease: [
          "easeOut",
          "easeInOut",
          "easeIn",
        ],
      }}

      onAnimationComplete={clearAnimation}

      className="
        pointer-events-none

        fixed

        z-[999999]

        overflow-hidden

        rounded-2xl

        border
        border-red-400/70

        bg-black

        shadow-[0_0_20px_rgba(239,68,68,.45)]

        will-change-transform
      "
    >
      <img
        src={image}
        alt=""
        draggable="false"
        className="
          block
          h-full
          w-full
          object-cover
        "
      />

      {/* Red glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0

          rounded-2xl

          bg-red-500/10

          shadow-[inset_0_0_18px_rgba(239,68,68,.35)]
        "
      />
    </motion.div>
  );

  return createPortal(
    flyingImage,
    document.body
  );
}