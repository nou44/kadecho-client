
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/products`;

export default function ProductGrid() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const [openFilters, setOpenFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  /* =========================
     GET PRODUCTS
  ========================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        setProducts(data.products || []);
      } catch (error) {
        console.error("❌ Fetch products error:", error);

        setError(
          error.message ||
            "Something went wrong while loading products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !category ||
      product.category?.toLowerCase() === category.toLowerCase();

    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      !searchTerm ||
      product.name?.toLowerCase().includes(searchTerm) ||
      product.title?.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      className="
        relative
       

        -mt-8
        lg:-mt-12

        bg-[#050505]

        px-4
        sm:px-6
        lg:px-8

        pb-16
        lg:pb-20
      "
    >
      {/* =========================
          SEARCH
      ========================= */}

      <div
        className="
          relative
          z-20

          mx-auto

          mb-6
          lg:mb-8

          max-w-[600px]
          lg:max-w-[660px]
        "
      >
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* =========================
          MOBILE FILTER
      ========================= */}

      <div
        className="
          mb-5
          lg:hidden
        "
      >
        <button
          onClick={() => setOpenFilters(true)}
          className="
            group

            flex
            w-full

            items-center
            justify-center
            gap-2.5

            rounded-xl

            border
            border-white/[0.08]

            bg-white/[0.025]

            py-2.5

            font-bebas

            text-[12px]

            uppercase
            tracking-[.20em]

            text-zinc-300

            backdrop-blur-xl

            transition-all
            duration-300

            hover:border-red-500/30
            hover:bg-red-500/[0.06]
            hover:text-white
          "
        >
          <SlidersHorizontal
            size={16}
            className="
              text-red-400

              transition-transform
              duration-300

              group-hover:rotate-12
            "
          />

          Filters
        </button>
      </div>

      {/* =========================
          MAIN SHOP LAYOUT
      ========================= */}

      <div
        className="
          mx-auto
          max-w-[1450px]

          grid

          gap-6
          lg:gap-8

          lg:grid-cols-[230px_minmax(0,1fr)]
        "
      >
        {/* =========================
            DESKTOP SIDEBAR
        ========================= */}

       <aside
  className="
    hidden
    lg:block
    self-start
    sticky
    top-24
    h-fit
  "
>
  <FilterSidebar
    products={products}
  />
</aside>

        {/* =========================
            PRODUCTS AREA
        ========================= */}

        <div className="min-w-0">
          {/* Result Header */}

          {!loading && !error && (
            <div
              className="
                mb-4

                flex
                items-center
                justify-between

                border-b
                border-white/[0.06]

                pb-3
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-1.5
                    w-1.5

                    rounded-full

                    bg-red-500

                    shadow-[0_0_10px_rgba(239,68,68,.7)]
                  "
                />

                <span
                  className="
                    font-bebas

                    text-[11px]

                    uppercase
                    tracking-[.18em]

                    text-zinc-500
                  "
                >
                  Collection
                </span>
              </div>

              <span
                className="
                  font-bebas

                  text-[11px]

                  tracking-[.12em]

                  text-zinc-600
                "
              >
                {filteredProducts.length} ITEMS
              </span>
            </div>
          )}

          {/* =========================
              PRODUCT GRID
          ========================= */}

      <div 
  className="
    grid
    grid-cols-2
    gap-3
    sm:gap-4
    lg:grid-cols-3
    2xl:gap-5
  "
>
            {/* LOADING */}

            {loading && (
              <div
                className="
                  col-span-full

                  flex
                  min-h-[300px]

                  items-center
                  justify-center
                "
              >
                <div className="text-center">
                  <div
                    className="
                      mx-auto
                      mb-4

                      h-9
                      w-9

                      animate-spin

                      rounded-full

                      border-2
                      border-white/[0.08]

                      border-t-red-500
                    "
                  />

                  <p
                    className="
                      font-bebas

                      text-[12px]

                      tracking-[.20em]

                      text-zinc-500
                    "
                  >
                    LOADING COLLECTION...
                  </p>
                </div>
              </div>
            )}

            {/* ERROR */}

            {!loading && error && (
              <div
                className="
                  col-span-full

                  flex
                  min-h-[280px]

                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    w-full
                    max-w-sm

                    rounded-2xl

                    border
                    border-red-500/15

                    bg-red-500/[0.03]

                    p-6

                    text-center
                  "
                >
                  <p
                    className="
                      text-sm
                      text-red-400
                    "
                  >
                    {error}
                  </p>

                  <button
                    onClick={() =>
                      window.location.reload()
                    }
                    className="
                      mt-4

                      rounded-xl

                      border
                      border-white/10

                      px-5
                      py-2

                      font-bebas

                      text-[11px]

                      tracking-[.16em]

                      text-zinc-300

                      transition-all
                      duration-300

                      hover:border-red-500/40
                      hover:text-white
                    "
                  >
                    TRY AGAIN
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
                    col-span-full

                    flex
                    min-h-[280px]

                    items-center
                    justify-center
                  "
                >
                  <div className="text-center">
                    <div
                      className="
                        mx-auto
                        mb-4

                        h-10
                        w-10

                        rounded-full

                        border
                        border-red-500/20

                        bg-red-500/[0.05]
                      "
                    />

                    <p
                      className="
                        font-bebas

                        text-xl

                        tracking-[.16em]

                        text-zinc-500
                      "
                    >
                      NO PRODUCTS FOUND
                    </p>

                    <p
                      className="
                        mt-1

                        text-xs

                        text-zinc-600
                      "
                    >
                      Try another search or category.
                    </p>
                  </div>
                </div>
              )}

            {/* PRODUCTS */}

            {!loading &&
              !error &&
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE FILTER DRAWER
      ========================= */}

      <AnimatePresence>
        {openFilters && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenFilters(false)}
              className="
                fixed
                inset-0

                z-40

                bg-black/75

                backdrop-blur-md
              "
            />

            {/* DRAWER */}

            <motion.div
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed

                bottom-0
                left-0
                right-0

                z-50

                max-h-[88vh]

                overflow-hidden

                rounded-t-[26px]

                border-t
                border-red-500/15

                bg-[#080808]

                shadow-[0_-25px_90px_rgba(0,0,0,.7)]
              "
            >
              {/* Handle */}

              <div className="flex justify-center pt-3">
                <span
                  className="
                    h-1
                    w-12

                    rounded-full

                    bg-zinc-700
                  "
                />
              </div>

              {/* Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-white/[0.07]

                  px-5
                  py-4
                "
              >
                <div>
                  <h2
                    className="
                      font-bebas

                      text-2xl

                      tracking-[.16em]

                      text-white
                    "
                  >
                    FILTERS
                  </h2>

                  <p
                    className="
                      mt-0.5

                      text-[9px]

                      uppercase
                      tracking-[.18em]

                      text-zinc-600
                    "
                  >
                    Refine collection
                  </p>
                </div>

                <button
                  onClick={() =>
                    setOpenFilters(false)
                  }
                  className="
                    flex

                    h-9
                    w-9

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-white/10

                    text-zinc-500

                    transition-all
                    duration-300

                    hover:border-red-500/30
                    hover:text-white
                  "
                >
                  <X size={17} />
                </button>
              </div>

              {/* BODY */}

              <div
                className="
                  max-h-[calc(88vh-90px)]

                  overflow-y-auto

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

