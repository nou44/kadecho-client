
import { useCallback } from "react";

import { useFlyToCart } from "../../context/FlyToCartContext";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";

export default function ProductDetails({ product }) {
  const { flyToCart } = useFlyToCart();

  const handleProductAddToCart = useCallback(
    (productImage, buttonElement) => {
      if (!buttonElement) {
        console.error("Add To Cart button not found");
        return;
      }

      const rect = buttonElement.getBoundingClientRect();

      flyToCart({
        image: productImage,
        start: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      });
    },
    [flyToCart]
  );

  return (
    <section
      aria-label="Product details"
      className="
        relative isolate
        overflow-hidden
        bg-[#050505]
        pb-5 pt-4
        sm:pb-6 sm:pt-5
        lg:pb-7 lg:pt-5
      "
    >
      {/* SUBTLE BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(ellipse_at_18%_10%,rgba(127,29,29,0.065),transparent_42%)]
        "
      />

      <div
        className="
          relative z-10
          mx-auto max-w-7xl
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* COMPACT SHOWROOM HEADER */}
        <div
          className="
            mb-3 flex items-center
            justify-between gap-3
            sm:mb-4
          "
        >
          <div className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden="true"
              className="
                h-1.5 w-1.5
                shrink-0 rotate-45
                bg-red-500
              "
            />

            <span
              className="
                truncate font-bebas
                text-[10px] uppercase
                tracking-[0.17em]
                text-zinc-400
                sm:text-[11px]
              "
            >
              KADECHO / PRODUCT SHOWROOM
            </span>
          </div>

          <span
            className="
              hidden shrink-0
              text-[8px] uppercase
              tracking-[0.17em]
              text-zinc-600
              sm:block
            "
          >
            Crafted With Precision
          </span>
        </div>

        {/* MAIN PRODUCT LAYOUT */}
        <div
          className="
            grid items-start
            gap-3.5
            sm:gap-4
            lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]
            lg:gap-5
          "
        >
          {/* LEFT — GALLERY */}
          <div className="min-w-0">
            <ProductGallery product={product} />
          </div>

          {/* RIGHT — INFO + SPECS */}
          <div
            className="
              flex min-w-0
              flex-col gap-3
              sm:gap-3.5
            "
          >
            {/* PUZZLE PRODUCT INFO — NO EXTRA CARD */}
            <div className="relative min-w-0">
              <ProductInfo
                product={product}
                onAddToCart={handleProductAddToCart}
              />
            </div>

            {/* TECHNICAL SHEET */}
            <div
              className="
                relative min-w-0
                overflow-hidden
                rounded-[18px]
                bg-gradient-to-br
                from-[#111012]
                to-[#090909]
                px-3.5 py-3
                sm:px-4 sm:py-3.5
              "
            >
              <ProductSpecs product={product} />
            </div>
          </div>
        </div>

        {/* COMPACT BRAND SIGNATURE */}
        <div
          aria-hidden="true"
          className="
            mt-4 flex items-center gap-3
            sm:mt-5
          "
        >
          <div className="h-px flex-1 bg-white/[0.045]" />

          <span
            className="
              shrink-0 font-bebas
              text-[8px] uppercase
              tracking-[0.17em]
              text-zinc-600
            "
          >
            KADECHO • PREMIUM METAL CREATIONS
          </span>

          <div className="h-px flex-1 bg-white/[0.045]" />
        </div>
      </div>
    </section>
  );
}
