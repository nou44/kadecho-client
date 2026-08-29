
import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Edit3,
  Image as ImageIcon,
  Package,
  Star,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import EditProduct from "./EditProduct";

const API_URL = "http://localhost:5000/api/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedProducts, setExpandedProducts] = useState({});
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to fetch products."
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("❌ Fetch products error:", error);

      setError(
        error.message || "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =====================================================
  // TOGGLE PRODUCT
  // =====================================================

  const toggleProduct = (productId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;

    try {
      setDeleteLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/${deletingProduct._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to delete product."
        );
      }

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product._id !== deletingProduct._id
        )
      );

      setDeletingProduct(null);
    } catch (error) {
      console.error(
        "❌ Delete product error:",
        error
      );

      setError(
        error.message || "Failed to delete product."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // PRODUCT UPDATED
  // =====================================================

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product._id === updatedProduct._id
          ? updatedProduct
          : product
      )
    );

    setEditingProduct(null);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.08]
          bg-[#090909]
          p-5
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              h-10
              w-10
              animate-pulse
              rounded-xl
              bg-white/[0.06]
            "
          />

          <div className="space-y-2">
            <div className="h-3 w-28 animate-pulse rounded bg-white/[0.07]" />
            <div className="h-2 w-20 animate-pulse rounded bg-white/[0.04]" />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="h-16 animate-pulse rounded-xl bg-white/[0.025]" />
          <div className="h-16 animate-pulse rounded-xl bg-white/[0.025]" />
          <div className="h-16 animate-pulse rounded-xl bg-white/[0.025]" />
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !products.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          rounded-[22px]
          border
          border-red-500/15
          bg-red-500/[0.05]
          p-5
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-red-500/10
              text-red-400
            "
          >
            <Package size={16} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-red-400">
              Unable to load products
            </p>

            <p className="mt-1 text-xs leading-5 text-red-400/60">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchProducts}
              className="
                mt-4
                rounded-lg
                border
                border-red-500/20
                bg-red-500/10
                px-3
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-red-400
                transition-all
                hover:bg-red-500
                hover:text-white
              "
            >
              Retry
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (!products.length) {
    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.08]
          bg-[#090909]
          px-5
          py-12
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.025]
            text-zinc-700
          "
        >
          <Package size={20} />
        </div>

        <h2
          className="
            mt-4
            font-bebas
            text-2xl
            uppercase
            tracking-wide
            text-white
          "
        >
          No Products
        </h2>

        <p className="mt-1 text-xs text-zinc-600">
          You haven't created any products yet.
        </p>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <section
        className="
          relative
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.08]
          bg-[#090909]
          shadow-[0_20px_80px_rgba(0,0,0,.25)]
        "
      >
        {/* ================================================
            AMBIENT LIGHT
        ================================================ */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-red-600/[0.06]
            blur-[110px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-32
            h-64
            w-64
            rounded-full
            bg-red-600/[0.025]
            blur-[100px]
          "
        />

        {/* ================================================
            HEADER
        ================================================ */}

        <header
          className="
            relative
            z-10
            flex
            flex-col
            gap-3
            border-b
            border-white/[0.07]
            px-4
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-red-500/15
                bg-red-500/[0.07]
                text-red-400
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-red-500/[0.06]
                  blur-xl
                "
              />

              <Package
                size={18}
                className="relative"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-red-400
                  "
                >
                  Store Management
                </span>

                <span className="h-1 w-1 rounded-full bg-red-500/50" />

                <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-700">
                  Catalog
                </span>
              </div>

              <h2
                className="
                  mt-0.5
                  font-bebas
                  text-[28px]
                  uppercase
                  leading-none
                  tracking-[0.04em]
                  text-white
                  sm:text-[30px]
                "
              >
                Products
              </h2>
            </div>
          </div>

          <div
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-lg
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-2.5
              py-1.5
            "
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-red-400/50
                "
              />

              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
            </span>

            <span className="text-[10px] font-medium text-zinc-400">
              {products.length}{" "}
              {products.length === 1
                ? "Product"
                : "Products"}
            </span>
          </div>
        </header>

        {/* ================================================
            ERROR BAR
        ================================================ */}

        {error && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="
              relative
              z-10
              mx-4
              mt-3
              overflow-hidden
              rounded-xl
              border
              border-red-500/15
              bg-red-500/[0.05]
              px-3
              py-2.5
              text-[11px]
              text-red-400
              sm:mx-5
            "
          >
            {error}
          </motion.div>
        )}

        {/* ================================================
            PRODUCTS SCROLL
        ================================================ */}

        <div
          className="
            products-scroll
            relative
            z-10
            max-h-[680px]
            overflow-y-auto
            px-3
            py-3
            sm:px-4
            sm:py-4
          "
        >
          <div className="space-y-2.5">
            {products.map((product, index) => {
              const expanded =
                expandedProducts[product._id];

              return (
                <motion.article
                  key={product._id}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.025,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group
                    overflow-hidden
                    rounded-[16px]
                    border
                    border-white/[0.07]
                    bg-white/[0.018]
                    transition-all
                    duration-300
                    hover:border-white/[0.12]
                    hover:bg-white/[0.028]
                  "
                >
                  {/* ======================================
                      PRODUCT ROW
                  ====================================== */}

                  <div className="p-2.5 sm:p-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          h-[58px]
                          w-[58px]
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          border
                          border-white/[0.08]
                          bg-[#101010]
                          sm:h-[64px]
                          sm:w-[64px]
                        "
                      >
                        {product.image ? (
                          <>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                              "
                            />

                            <div
                              className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/20
                                to-transparent
                              "
                            />
                          </>
                        ) : (
                          <div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                              text-zinc-700
                            "
                          >
                            <ImageIcon size={18} />
                          </div>
                        )}
                      </div>

                      {/* INFO */}

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-center gap-2">
                          <h3
                            className="
                              min-w-0
                              truncate
                              font-bebas
                              text-[17px]
                              uppercase
                              leading-none
                              tracking-wide
                              text-white
                              sm:text-[18px]
                            "
                          >
                            {product.name}
                          </h3>

                          {product.featured && (
                            <span
                              className="
                                hidden
                                shrink-0
                                items-center
                                gap-1
                                rounded-full
                                border
                                border-yellow-500/10
                                bg-yellow-500/[0.07]
                                px-1.5
                                py-0.5
                                text-[8px]
                                font-semibold
                                text-yellow-400
                                sm:inline-flex
                              "
                            >
                              <Star size={8} />
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className="
                              max-w-[110px]
                              truncate
                              text-[9px]
                              font-medium
                              uppercase
                              tracking-[0.14em]
                              text-red-400
                            "
                          >
                            {product.category}
                          </span>

                          <span className="h-0.5 w-0.5 shrink-0 rounded-full bg-zinc-700" />

                          <span
                            className="
                              text-[11px]
                              font-semibold
                              text-zinc-200
                            "
                          >
                            {Number(
                              product.price || 0
                            ).toLocaleString()}{" "}
                            <span className="text-[9px] text-zinc-500">
                              DH
                            </span>
                          </span>
                        </div>

                        <div className="mt-1.5 flex items-center gap-2">
                          <span
                            className={`
                              inline-flex
                              items-center
                              rounded-full
                              px-1.5
                              py-0.5
                              text-[8px]
                              font-semibold
                              ${
                                product.inStock
                                  ? "bg-emerald-500/[0.08] text-emerald-400"
                                  : "bg-red-500/[0.08] text-red-400"
                              }
                            `}
                          >
                            {product.inStock
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>

                          <span className="truncate text-[8px] text-zinc-700">
                            {product.images?.length || 0} gallery
                          </span>
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            setEditingProduct(product)
                          }
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            text-zinc-500
                            transition-all
                            duration-200
                            hover:border-red-500/20
                            hover:bg-red-500/[0.07]
                            hover:text-red-400
                            sm:h-8
                            sm:w-8
                          "
                          title="Edit product"
                        >
                          <Edit3 size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeletingProduct(product)
                          }
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            text-zinc-500
                            transition-all
                            duration-200
                            hover:border-red-500/20
                            hover:bg-red-500/[0.07]
                            hover:text-red-400
                          "
                          title="Delete product"
                        >
                          <Trash2 size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            toggleProduct(product._id)
                          }
                          className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            border
                            transition-all
                            duration-200
                            ${
                              expanded
                                ? "border-red-500/20 bg-red-500/[0.07] text-red-400"
                                : "border-white/[0.07] bg-white/[0.025] text-zinc-500 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
                            }
                          `}
                          title={
                            expanded
                              ? "Show less"
                              : "See more"
                          }
                        >
                          {expanded ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ======================================
                      EXPANDED DETAILS
                  ====================================== */}

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <div
                          className="
                            border-t
                            border-white/[0.07]
                            bg-black/[0.18]
                            px-3
                            py-3.5
                            sm:px-4
                          "
                        >
                          <div className="grid gap-3 sm:grid-cols-2">
                            {/* DESCRIPTION */}

                            <div className="sm:col-span-2">
                              <p
                                className="
                                  text-[8px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.2em]
                                  text-zinc-700
                                "
                              >
                                Description
                              </p>

                              <p
                                className="
                                  mt-1
                                  text-[11px]
                                  leading-5
                                  text-zinc-500
                                "
                              >
                                {product.description ||
                                  "No description."}
                              </p>
                            </div>

                            {/* MATERIAL */}

                            <div
                              className="
                                rounded-xl
                                border
                                border-white/[0.05]
                                bg-white/[0.015]
                                p-2.5
                              "
                            >
                              <p className="text-[8px] uppercase tracking-[0.18em] text-zinc-700">
                                Material
                              </p>

                              <p className="mt-1 truncate text-[11px] text-zinc-300">
                                {product.material || "-"}
                              </p>
                            </div>

                            {/* SLUG */}

                            <div
                              className="
                                rounded-xl
                                border
                                border-white/[0.05]
                                bg-white/[0.015]
                                p-2.5
                              "
                            >
                              <p className="text-[8px] uppercase tracking-[0.18em] text-zinc-700">
                                Slug
                              </p>

                              <p className="mt-1 truncate text-[11px] text-zinc-300">
                                {product.slug || "-"}
                              </p>
                            </div>

                            {/* CREATED */}

                            <div
                              className="
                                rounded-xl
                                border
                                border-white/[0.05]
                                bg-white/[0.015]
                                p-2.5
                              "
                            >
                              <div className="flex items-center gap-1.5">
                                <CalendarDays
                                  size={11}
                                  className="text-zinc-700"
                                />

                                <p className="text-[8px] uppercase tracking-[0.18em] text-zinc-700">
                                  Created
                                </p>
                              </div>

                              <p className="mt-1 text-[11px] text-zinc-300">
                                {formatDate(
                                  product.createdAt
                                )}
                              </p>
                            </div>

                            {/* GALLERY */}

                            <div
                              className="
                                rounded-xl
                                border
                                border-white/[0.05]
                                bg-white/[0.015]
                                p-2.5
                              "
                            >
                              <div className="flex items-center gap-1.5">
                                <ImageIcon
                                  size={11}
                                  className="text-zinc-700"
                                />

                                <p className="text-[8px] uppercase tracking-[0.18em] text-zinc-700">
                                  Gallery
                                </p>
                              </div>

                              <p className="mt-1 text-[11px] text-zinc-300">
                                {product.images?.length || 0}{" "}
                                images
                              </p>
                            </div>
                          </div>

                          {/* GALLERY PREVIEW */}

                          {product.images?.length > 0 && (
                            <div className="mt-3">
                              <div className="mb-2 flex items-center justify-between">
                                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                                  Product Gallery
                                </p>

                                <span className="text-[8px] text-zinc-700">
                                  {product.images.length} files
                                </span>
                              </div>

                              <div
                                className="
                                  flex
                                  gap-1.5
                                  overflow-x-auto
                                  pb-1
                                  [scrollbar-width:thin]
                                "
                              >
                                {product.images.map(
                                  (image, imageIndex) => (
                                    <motion.div
                                      key={`${product._id}-${imageIndex}`}
                                      whileHover={{
                                        y: -2,
                                      }}
                                      className="
                                        h-14
                                        w-14
                                        shrink-0
                                        overflow-hidden
                                        rounded-lg
                                        border
                                        border-white/[0.07]
                                        bg-[#111]
                                      "
                                    >
                                      <img
                                        src={image}
                                        alt={`${product.name} ${
                                          imageIndex + 1
                                        }`}
                                        className="
                                          h-full
                                          w-full
                                          object-cover
                                        "
                                      />
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ================================================
            FOOTER
        ================================================ */}

        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
            border-t
            border-white/[0.06]
            px-4
            py-2.5
            sm:px-5
          "
        >
          <span className="text-[8px] uppercase tracking-[0.18em] text-zinc-700">
            Product Catalog
          </span>

          <span className="text-[8px] text-zinc-700">
            {products.length} total
          </span>
        </div>
      </section>

      {/* =================================================
          DELETE CONFIRMATION
      ================================================= */}

      <AnimatePresence>
        {deletingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/75
              p-4
              backdrop-blur-md
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 12,
              }}
              transition={{
                duration: 0.22,
              }}
              className="
                w-full
                max-w-[390px]
                overflow-hidden
                rounded-[22px]
                border
                border-white/[0.08]
                bg-[#0a0a0a]
                shadow-[0_30px_100px_rgba(0,0,0,.7)]
              "
            >
              {/* Modal accent */}

              <div className="h-[2px] w-full bg-gradient-to-r from-red-600 via-red-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-red-500/10
                      bg-red-500/[0.07]
                      text-red-400
                    "
                  >
                    <Trash2 size={17} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                        font-bebas
                        text-[25px]
                        uppercase
                        leading-none
                        tracking-wide
                        text-white
                      "
                    >
                      Delete Product?
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                      Are you sure you want to delete{" "}
                      <span className="font-semibold text-zinc-300">
                        {deletingProduct.name}
                      </span>
                      ?
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-red-400/60">
                      This action cannot be undone
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={deleteLoading}
                    onClick={() =>
                      setDeletingProduct(null)
                    }
                    className="
                      h-10
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.1em]
                      text-zinc-400
                      transition-all
                      hover:bg-white/[0.06]
                      hover:text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={deleteLoading}
                    onClick={handleDeleteProduct}
                    className="
                      flex
                      h-10
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-red-600
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-white
                      transition-all
                      hover:bg-red-500
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <Trash2 size={13} />

                    {deleteLoading
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================
          EDIT PRODUCT MODAL
      ================================================= */}

      <AnimatePresence>
        {editingProduct && (
          <EditProduct
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onUpdated={handleProductUpdated}
          />
        )}
      </AnimatePresence>
    </>
  );
}

