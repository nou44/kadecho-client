import { useFlyToCart } from "../../context/FlyToCartContext";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductSpecs from "./ProductSpecs";

export default function ProductDetails({ product }) {
  const { flyToCart } = useFlyToCart();

  const handleProductAddToCart = (
    productImage,
    buttonElement
  ) => {
    if (!buttonElement) {
      console.error(
        "❌ Add To Cart button not found"
      );
      return;
    }

    const rect =
      buttonElement.getBoundingClientRect();

    flyToCart({
      image: productImage,

      start: {
        x:
          rect.left +
          rect.width / 2,

        y:
          rect.top +
          rect.height / 2,
      },
    });
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050505]
        pt-6
        pb-8
        lg:pt-8
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-red-600/10
          blur-[150px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            items-start
            gap-5
            lg:grid-cols-[1.04fr_0.96fr]
          "
        >
          {/* LEFT — GALLERY */}
          <div className="min-w-0">
            <ProductGallery
              product={product}
            />
          </div>

          {/* RIGHT */}
          <div
            className="
              flex
              min-w-0
              flex-col
              gap-4
            "
          >
            {/* PRODUCT INFO */}
            <div
              className="
                rounded-[22px]
                border
                border-white/[0.08]
                bg-white/[0.02]
                p-4
                backdrop-blur-xl
              "
            >
              <ProductInfo
                product={product}
                onAddToCart={
                  handleProductAddToCart
                }
              />
            </div>

            {/* TECHNICAL DETAILS */}
            <div
              className="
                rounded-[22px]
                border
                border-white/[0.08]
                bg-white/[0.02]
                px-4
                py-3
                backdrop-blur-xl
              "
            >
              <ProductSpecs
                product={product}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}