
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  PackageSearch,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
}/products`;

const EASE = [0.22, 1, 0.36, 1];

export default function ProductGrid() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const reduceMotion = useReducedMotion();

  const [openFilters, setOpenFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  // Fetch once, and refetch only when retrying.
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        if (!controller.signal.aborted) {
          setProducts(
            Array.isArray(data.products) ? data.products : []
          );
        }
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Fetch products error:", err);

        if (!controller.signal.aborted) {
          setError(
            err.message ||
              "Something went wrong while loading products"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [retryKey]);

  // Memoized filtering.
  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedCategory = category?.toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        !normalizedCategory ||
        product.category?.toLowerCase() === normalizedCategory;

      const matchesSearch =
        !normalizedSearch ||
        product.name?.toLowerCase().includes(normalizedSearch) ||
        product.title?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  // Close filters with Escape, and lock page scrolling.
  useEffect(() => {
    if (!openFilters) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenFilters(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openFilters]);

  return (
    <section
      id="shop-products"
      aria-label="Shop collection"
      className="
        relative bg-[#050505]
        px-4 pb-12 pt-4
        sm:px-6 sm:pb-14
        lg:px-8 lg:pb-16 lg:pt-5
      "
    >
      {/* SEARCH */}
      <div className="relative z-20 mx-auto mb-5 max-w-[600px] lg:mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* MOBILE FILTER BUTTON */}
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpenFilters(true)}
          aria-haspopup="dialog"
          aria-expanded={openFilters}
          className="
            group flex w-full items-center
            justify-center gap-2
            rounded-xl border border-white/[0.08]
            bg-white/[0.025]
            px-4 py-2.5
            font-bebas text-[12px]
            uppercase tracking-[0.18em]
            text-zinc-300
            transition-[border-color,background-color,color]
            duration-200
            hover:border-red-500/30
            hover:bg-red-500/[0.06]
            hover:text-white
          "
        >
          <SlidersHorizontal
            size={15}
            className="text-red-400"
          />
          Filters
        </button>
      </div>

      {/* SHOP LAYOUT */}
      <div
        className="
          mx-auto grid max-w-[1450px]
          gap-5 lg:grid-cols-[220px_minmax(0,1fr)]
          lg:gap-6
        "
      >
        {/* DESKTOP FILTERS */}
        <aside className="sticky top-24 hidden h-fit self-start lg:block">
          <FilterSidebar products={products} />
        </aside>

        {/* PRODUCT AREA */}
        <div className="min-w-0">
          {!loading && !error && (
            <div
              className="
                mb-3 flex items-center
                justify-between gap-3
                border-b border-white/[0.06]
                pb-2.5
              "
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span
                  className="
                    font-bebas text-[11px]
                    uppercase tracking-[0.18em]
                    text-zinc-500
                  "
                >
                  Collection
                </span>
              </div>

              <span
                aria-live="polite"
                className="
                  font-bebas text-[11px]
                  tracking-[0.12em]
                  text-zinc-600
                "
              >
                {filteredProducts.length} ITEMS
              </span>
            </div>
          )}

          <div
            className="
              grid grid-cols-2 gap-3
              sm:gap-4 lg:grid-cols-3
              2xl:gap-5
            "
          >
            {/* LOADING */}
            {loading && (
              <div
                role="status"
                className="
                  col-span-full flex min-h-[220px]
                  flex-col items-center justify-center
                  gap-3
                "
              >
                <div
                  className="
                    h-8 w-8 animate-spin
                    rounded-full border-2
                    border-white/[0.08]
                    border-t-red-500
                  "
                />

                <p
                  className="
                    font-bebas text-[11px]
                    uppercase tracking-[0.2em]
                    text-zinc-500
                  "
                >
                  Loading Collection...
                </p>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="col-span-full flex min-h-[220px] items-center justify-center">
                <div
                  className="
                    w-full max-w-sm rounded-2xl
                    border border-red-500/15
                    bg-red-500/[0.035]
                    p-5 text-center
                  "
                >
                  <AlertCircle
                    size={22}
                    className="mx-auto text-red-400"
                  />

                  <p className="mt-3 text-[12px] leading-5 text-red-300">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() => setRetryKey((value) => value + 1)}
                    className="
                      mt-4 inline-flex items-center
                      gap-2 rounded-xl
                      border border-white/10
                      px-4 py-2
                      font-bebas text-[11px]
                      uppercase tracking-[0.15em]
                      text-zinc-300
                      transition-colors duration-200
                      hover:border-red-500/40
                      hover:text-white
                    "
                  >
                    <RotateCcw size={13} />
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* EMPTY */}
            {!loading &&
              !error &&
              filteredProducts.length === 0 && (
                <div
                  className="
                    col-span-full flex min-h-[220px]
                    flex-col items-center
                    justify-center text-center
                  "
                >
                  <div
                    className="
                      flex h-10 w-10 items-center
                      justify-center rounded-xl
                      border border-red-500/20
                      bg-red-500/[0.05]
                    "
                  >
                    <PackageSearch
                      size={18}
                      className="text-red-400"
                    />
                  </div>

                  <h3
                    className="
                      mt-3 font-bebas text-lg
                      uppercase tracking-[0.12em]
                      text-zinc-400
                    "
                  >
                    No Products Found
                  </h3>

                  <p className="mt-1 text-[11px] text-zinc-600">
                    Try another search or category.
                  </p>
                </div>
              )}

            {/* PRODUCTS */}
            {!loading &&
              !error &&
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {openFilters && (
          <>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpenFilters(false)}
              aria-hidden="true"
              className="
                fixed inset-0 z-[80]
                bg-black/80
              "
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
              initial={reduceMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={reduceMotion ? undefined : { y: "100%" }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease: EASE,
              }}
              className="
                fixed inset-x-0 bottom-0 z-[90]
                max-h-[88dvh] overflow-hidden
                rounded-t-[24px]
                border-t border-red-500/15
                bg-[#080808]
                shadow-[0_-20px_70px_rgba(0,0,0,.6)]
                lg:hidden
              "
            >
              {/* HANDLE */}
              <div className="flex justify-center pt-2.5">
                <span className="h-1 w-10 rounded-full bg-zinc-700" />
              </div>

              {/* DRAWER HEADER */}
              <div
                className="
                  flex items-center justify-between
                  border-b border-white/[0.07]
                  px-4 py-3
                "
              >
                <div>
                  <h2
                    className="
                      font-bebas text-xl
                      uppercase tracking-[0.15em]
                      text-white
                    "
                  >
                    Filters
                  </h2>

                  <p
                    className="
                      mt-0.5 text-[9px]
                      uppercase tracking-[0.16em]
                      text-zinc-600
                    "
                  >
                    Refine Collection
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenFilters(false)}
                  aria-label="Close filters"
                  className="
                    flex h-9 w-9 items-center
                    justify-center rounded-xl
                    border border-white/10
                    text-zinc-400
                    transition-colors duration-200
                    hover:border-red-500/30
                    hover:text-white
                  "
                >
                  <X size={17} />
                </button>
              </div>

              {/* DRAWER BODY */}
              <div
                className="
                  max-h-[calc(88dvh-85px)]
                  overflow-y-auto overscroll-contain
                  p-4
                "
              >
                <FilterSidebar
                  products={products}
                  mobile
                  setOpenFilters={setOpenFilters}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
