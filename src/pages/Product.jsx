import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductDetails from "../components/ProductDetails/ProductDetails";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/products`;

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Product not found"
          );
        }

        setProduct(data.product);
      } catch (err) {
        console.error("❌ Fetch product error:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#050505] px-6 py-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-bebas text-2xl uppercase tracking-[.15em] text-zinc-500">
            Loading product...
          </p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="min-h-screen bg-[#050505] px-6 py-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-bebas text-2xl uppercase tracking-[.15em] text-red-500">
            {error || "Product not found"}
          </p>
        </div>
      </section>
    );
  }

  return <ProductDetails product={product} />;
}