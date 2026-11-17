
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { collections } from "./collectionsData";
import CollectionCard from "./CollectionCard";

const normalizeCategory = (value) =>
  String(value ?? "").trim().toLowerCase();

function CollectionSlider({ products = [] }) {
  const sliderRef = useRef(null);
  const frameRef = useRef(null);

  const reduceMotion = useReducedMotion();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /* ==========================================
     COLLECTION MATCHING
  ========================================== */

  const collectionItems = useMemo(() => {
    const productsByCategory = new Map();

    for (const product of products) {
      const category = normalizeCategory(product?.category);

      if (category && !productsByCategory.has(category)) {
        productsByCategory.set(category, product);
      }
    }

    return collections
      .map((collection) => {
        const product = productsByCategory.get(
          normalizeCategory(collection.category)
        );

        if (!product) return null;

        return {
          ...collection,
          product,
        };
      })
      .filter(Boolean);
  }, [products]);

  /* ==========================================
     SCROLL STATE
  ========================================== */

  const updateScrollState = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll =
      slider.scrollWidth - slider.clientWidth;

    setCanScrollLeft(slider.scrollLeft > 2);
    setCanScrollRight(
      maxScroll > 2 && slider.scrollLeft < maxScroll - 2
    );
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updateScrollState();

    const onScroll = () => {
      if (frameRef.current !== null) return;

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        updateScrollState();
      });
    };

    slider.addEventListener("scroll", onScroll, {
      passive: true,
    });

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateScrollState)
        : null;

    resizeObserver?.observe(slider);

    for (const child of slider.children) {
      resizeObserver?.observe(child);
    }

    return () => {
      slider.removeEventListener("scroll", onScroll);
      resizeObserver?.disconnect();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [collectionItems, updateScrollState]);

  /* ==========================================
     SMART CARD SCROLL
  ========================================== */

  const scroll = useCallback(
    (direction) => {
      const slider = sliderRef.current;
      if (!slider) return;

      const cards = Array.from(slider.children);
      if (!cards.length) return;

      const currentLeft = slider.scrollLeft;
      const tolerance = 3;

      const target =
        direction === "right"
          ? cards.find(
              (card) =>
                card.offsetLeft -
                  slider.offsetLeft >
                currentLeft + tolerance
            )
          : [...cards]
              .reverse()
              .find(
                (card) =>
                  card.offsetLeft -
                    slider.offsetLeft <
                  currentLeft - tolerance
              );

      if (!target) return;

      const targetLeft =
        target.offsetLeft - slider.offsetLeft;

      slider.scrollTo({
        left: targetLeft,
        behavior: reduceMotion ? "instant" : "smooth",
      });
    },
    [reduceMotion]
  );

  const buttonMotion = reduceMotion
    ? {}
    : {
        whileHover: { scale: 1.06, y: -1 },
        whileTap: { scale: 0.94 },
      };

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <div className="relative">
      {/* ======================================
          ARROWS
      ====================================== */}

      <div className="mb-5 flex justify-end gap-2">
        {/* PREVIOUS */}
        <motion.button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous collection"
          {...buttonMotion}
          className="
            group flex h-9 w-9
            items-center justify-center

            rounded-lg
            border border-white/10

            bg-gradient-to-br
            from-zinc-900 to-black

            text-zinc-400

            shadow-[0_4px_15px_rgba(0,0,0,.35)]

            transition-[background-color,border-color,color,box-shadow]
            duration-300

            hover:border-red-500/50
            hover:bg-red-500/[.04]
            hover:text-white
            hover:shadow-[0_0_18px_rgba(239,68,68,.25)]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500/60

            disabled:cursor-not-allowed
            disabled:opacity-30
            disabled:hover:border-white/10
            disabled:hover:shadow-none
          "
        >
          <ChevronLeft size={16} strokeWidth={1.8} />
        </motion.button>

        {/* NEXT */}
        <motion.button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next collection"
          {...buttonMotion}
          className="
            group flex h-9 w-9
            items-center justify-center

            rounded-lg
            border border-white/10

            bg-gradient-to-br
            from-zinc-900 to-black

            text-zinc-400

            shadow-[0_4px_15px_rgba(0,0,0,.35)]

            transition-[background-color,border-color,color,box-shadow]
            duration-300

            hover:border-red-500/50
            hover:bg-red-500/[.04]
            hover:text-white
            hover:shadow-[0_0_18px_rgba(239,68,68,.25)]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500/60

            disabled:cursor-not-allowed
            disabled:opacity-30
            disabled:hover:border-white/10
            disabled:hover:shadow-none
          "
        >
          <ChevronRight size={16} strokeWidth={1.8} />
        </motion.button>
      </div>

      {/* ======================================
          SLIDER
      ====================================== */}

      <div
        ref={sliderRef}
        aria-label="Browse collections"
        className="
          flex gap-7
          overflow-x-auto

          scroll-smooth
          snap-x snap-mandatory

          pb-4
          scrollbar-hide

          overscroll-x-contain
          touch-pan-x
        "
      >
        {collectionItems.map((item) => (
          <div
            key={item.id}
            className="shrink-0 snap-start"
          >
            <CollectionCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(CollectionSlider);
