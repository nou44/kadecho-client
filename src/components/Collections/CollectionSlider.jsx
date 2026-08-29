import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { collections } from "./collectionsData";
import CollectionCard from "./CollectionCard";

export default function CollectionSlider({ products = [] }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const amount = 300;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Find one real product from backend for each collection category
  const collectionItems = collections
    .map((collection) => {
      const product = products.find(
        (product) =>
          product.category?.toLowerCase() ===
          collection.category?.toLowerCase()
      );

      if (!product) return null;

      return {
        ...collection,
        product,
      };
    })
    .filter(Boolean);
  return (
    <div className="relative">
{/* Arrows */}

<div className="mb-5 flex justify-end gap-2">
  <motion.button
    whileHover={{
      scale: 1.06,
      y: -1,
    }}
    whileTap={{
      scale: 0.94,
    }}
    onClick={() => scroll("left")}
    aria-label="Previous collection"
    className="
      group
      flex
      h-9
      w-9
      items-center
      justify-center

      rounded-lg

      border
      border-white/10

      bg-gradient-to-br
      from-zinc-900
      to-black

      text-zinc-400

      shadow-[0_4px_15px_rgba(0,0,0,.35)]

      transition-all
      duration-300

      hover:border-red-500/50
      hover:bg-red-500/[.04]
      hover:text-white
      hover:shadow-[0_0_18px_rgba(239,68,68,.25)]
    "
  >
    <motion.div whileHover={{ x: -1 }}>
      <ChevronLeft size={16} strokeWidth={1.8} />
    </motion.div>
  </motion.button>

  <motion.button
    whileHover={{
      scale: 1.06,
      y: -1,
    }}
    whileTap={{
      scale: 0.94,
    }}
    onClick={() => scroll("right")}
    aria-label="Next collection"
    className="
      group
      flex
      h-9
      w-9
      items-center
      justify-center

      rounded-lg

      border
      border-white/10

      bg-gradient-to-br
      from-zinc-900
      to-black

      text-zinc-400

      shadow-[0_4px_15px_rgba(0,0,0,.35)]

      transition-all
      duration-300

      hover:border-red-500/50
      hover:bg-red-500/[.04]
      hover:text-white
      hover:shadow-[0_0_18px_rgba(239,68,68,.25)]
    "
  >
    <motion.div whileHover={{ x: 1 }}>
      <ChevronRight size={16} strokeWidth={1.8} />
    </motion.div>
  </motion.button>
</div>

      {/* Slider */}

      <div
        ref={sliderRef}
        className="
          flex
          gap-7

          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory

          pb-4

          scrollbar-hide
        "
      >
      {collectionItems.map((item) => (
  <div
    key={item.id}
    className="snap-start"
  >
    <CollectionCard item={item} />
  </div>
))}
      </div>
    </div>
  );
}