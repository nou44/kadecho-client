
import ShopHero from "./ShopHero";
import ProductGrid from "./ProductGrid";

export default function Shop() {
  return (
    <main
      id="shop"
      className="min-h-screen bg-[#050505]"
    >
      <ShopHero />
      <ProductGrid />
    </main>
  );
}
