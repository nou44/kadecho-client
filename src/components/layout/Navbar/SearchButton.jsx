import { Search, X, ArrowUpRight, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import IconButton from "../../ui/IconButton";

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch products"
          );
        }

        setProducts(
          result.products ??
            result.data ??
            []
        );
      } catch (error) {
        console.error(
          "SEARCH PRODUCTS ERROR:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // OPEN SEARCH
  // =====================================================

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [open]);

  // =====================================================
  // CLOSE ON ESC
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // =====================================================
  // CLOSE WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  const normalizedQuery = query
    .trim()
    .toLowerCase();

  const filteredProducts =
    normalizedQuery.length === 0
      ? []
      : products
          .filter((product) => {
            const searchableText = [
              product.name,
              product.category,
              product.material,
              product.finish,
              product.description,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchableText.includes(
              normalizedQuery
            );
          })
          .slice(0, 6);

  // =====================================================
  // GO TO PRODUCT
  // =====================================================

  const handleProductClick = (product) => {
    const productId =
      product._id || product.id;

    if (!productId) return;

    setOpen(false);
    setQuery("");

    navigate(`/product/${productId}`);
  };

  // =====================================================
  // CLOSE SEARCH
  // =====================================================

  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <motion.div
      ref={searchRef}
      layout
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      {/* =================================================
          SEARCH BOX
      ================================================= */}

      <motion.div
        layout
        className={`
          group
          relative
          flex
          h-11
          items-center
          overflow-visible
          rounded-xl

          border
          bg-gradient-to-br
          from-zinc-900
          via-[#0b0b0b]
          to-black

          backdrop-blur-xl

          transition-all
          duration-500

          ${
            open
              ? `
                w-72
                sm:w-80
                border-red-500/40
                shadow-[0_0_35px_rgba(239,68,68,.15)]
              `
              : `
                w-11
                border-white/10
                hover:border-red-500/35
                hover:shadow-[0_0_25px_rgba(239,68,68,.15)]
              `
          }
        `}
      >
        {/* ===============================================
            AMBIENT GLOW
        =============================================== */}

        <motion.div
          animate={{
            opacity: open ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            pointer-events-none
            absolute
            inset-0

            overflow-hidden
            rounded-xl

            bg-gradient-to-r
            from-red-500/[0.07]
            via-transparent
            to-transparent
          "
        />

        {/* ===============================================
            LEFT RED LINE
        =============================================== */}

        <motion.span
          animate={{
            opacity: open ? 1 : 0,
            scaleY: open ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            absolute
            left-0
            top-1/2

            h-5
            w-[2px]

            -translate-y-1/2

            origin-center

            rounded-full

            bg-red-500

            shadow-[0_0_10px_rgba(239,68,68,.6)]
          "
        />

        {/* ===============================================
            SEARCH BUTTON
        =============================================== */}

        <motion.div
          animate={{
            scale: 1,
          }}
          whileHover={{
            scale: open ? 1 : 1.05,
          }}
          className="relative z-20 shrink-0"
        >
          <IconButton
            ariaLabel="Search"
            onClick={() => setOpen(true)}
            className="
              h-11
              w-11

              rounded-none

              border-0

              bg-transparent

              text-zinc-400

              shadow-none

              transition-all
              duration-300

              hover:bg-transparent
              hover:text-red-400
              hover:shadow-none
            "
          >
            <motion.div
              animate={{
                rotate: open ? 0 : 0,
              }}
            >
              <Search
                size={18}
                strokeWidth={1.9}
              />
            </motion.div>
          </IconButton>
        </motion.div>

        {/* ===============================================
            INPUT
        =============================================== */}

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                width: 0,
              }}
              animate={{
                opacity: 1,
                width: "100%",
              }}
              exit={{
                opacity: 0,
                width: 0,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                z-20
                flex
                min-w-0
                flex-1
              "
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    handleClose();
                  }
                }}
                placeholder="Search products..."
                autoComplete="off"
                className="
                  h-full
                  w-full

                  bg-transparent

                  px-1
                  pr-1

                  text-[13px]

                  font-medium

                  text-white

                  placeholder:text-zinc-600

                  outline-none
                "
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===============================================
            CLOSE
        =============================================== */}

        <AnimatePresence>
          {open && (
            <motion.button
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={handleClose}
              aria-label="Close search"
              type="button"
              className="
                relative
                z-20

                mr-1.5

                flex
                h-8
                w-8
                shrink-0

                items-center
                justify-center

                rounded-lg

                text-zinc-500

                transition-all
                duration-300

                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <motion.div
                whileHover={{
                  rotate: 90,
                }}
              >
                <X size={15} />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ===============================================
            BOTTOM ACCENT
        =============================================== */}

        <motion.div
          animate={{
            scaleX: open ? 1 : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            bottom-0
            left-0

            h-[1px]
            w-full

            origin-left

            rounded-full

            bg-gradient-to-r
            from-red-600
            via-red-400
            to-transparent
          "
        />
      </motion.div>

      {/* =================================================
          SEARCH RESULTS
      ================================================= */}

      <AnimatePresence>
        {open && normalizedQuery.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.97,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              right-0
              top-[calc(100%+10px)]
              z-[9999]

              w-72
              sm:w-80

              overflow-hidden

              rounded-2xl

              border
              border-white/[0.09]

              bg-[#090909]/95

              shadow-[0_25px_70px_rgba(0,0,0,.65)]

              backdrop-blur-2xl
            "
          >
            {/* TOP RED GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0

                h-24
                w-48

                -translate-x-1/2

                rounded-full

                bg-red-500/[0.07]

                blur-[45px]
              "
            />

            {/* HEADER */}

            <div
              className="
                relative
                flex
                items-center
                justify-between

                border-b
                border-white/[0.06]

                px-4
                py-3
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.24em]
                    text-red-500
                  "
                >
                  Search
                </p>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-zinc-500
                  "
                >
                  {loading
                    ? "Finding products..."
                    : `${filteredProducts.length} result${
                        filteredProducts.length === 1
                          ? ""
                          : "s"
                      }`}
                </p>
              </div>

              <Search
                size={14}
                className="text-zinc-700"
              />
            </div>

            {/* LOADING */}

            {loading && (
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  px-4
                  py-8

                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-zinc-600
                "
              >
                <Loader2
                  size={14}
                  className="animate-spin text-red-500"
                />

                Searching...
              </div>
            )}

            {/* RESULTS */}

            {!loading &&
              filteredProducts.length > 0 && (
                <div className="relative max-h-[390px] overflow-y-auto p-2">
                  {filteredProducts.map(
                    (product, index) => (
                      <motion.button
                        key={
                          product._id ||
                          product.id
                        }
                        type="button"
                        initial={{
                          opacity: 0,
                          x: 10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.04,
                          duration: 0.25,
                        }}
                        onClick={() =>
                          handleProductClick(
                            product
                          )
                        }
                        className="
                          group
                          relative

                          flex
                          w-full
                          items-center
                          gap-3

                          rounded-xl

                          p-2

                          text-left

                          transition-all
                          duration-300

                          hover:bg-red-500/[0.06]
                        "
                      >
                        {/* IMAGE */}

                        <div
                          className="
                            relative
                            h-12
                            w-12
                            shrink-0

                            overflow-hidden

                            rounded-lg

                            border
                            border-white/[0.07]

                            bg-[#111]
                          "
                        >
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="
                                h-full
                                w-full

                                object-cover

                                transition-transform
                                duration-500

                                group-hover:scale-110
                              "
                            />
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
                              <PackageIcon />
                            </div>
                          )}

                          {/* IMAGE GLOW */}

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0

                              bg-gradient-to-t
                              from-black/40
                              to-transparent
                            "
                          />
                        </div>

                        {/* INFO */}

                        <div className="min-w-0 flex-1">
                          <h4
                            className="
                              truncate

                              font-bebas

                              text-[16px]

                              leading-none

                              tracking-[0.04em]

                              text-white

                              transition-colors
                              duration-300

                              group-hover:text-red-400
                            "
                          >
                            {product.name}
                          </h4>

                          <p
                            className="
                              mt-1

                              truncate

                              text-[8px]

                              uppercase

                              tracking-[0.16em]

                              text-zinc-600
                            "
                          >
                            {product.category ||
                              "Product"}
                          </p>

                          <p
                            className="
                              mt-1

                              text-[11px]

                              font-semibold

                              text-red-500
                            "
                          >
                            {Number(
                              product.price || 0
                            ).toLocaleString()}{" "}
                            DH
                          </p>
                        </div>

                        {/* ARROW */}

                        <ArrowUpRight
                          size={14}
                          className="
                            shrink-0

                            text-zinc-700

                            opacity-0

                            -translate-x-1
                            translate-y-1

                            transition-all
                            duration-300

                            group-hover:translate-x-0
                            group-hover:translate-y-0
                            group-hover:opacity-100
                            group-hover:text-red-400
                          "
                        />
                      </motion.button>
                    )
                  )}
                </div>
              )}

            {/* EMPTY */}

            {!loading &&
              normalizedQuery.length > 0 &&
              filteredProducts.length === 0 && (
                <div
                  className="
                    relative

                    px-5
                    py-10

                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-10
                      w-10

                      items-center
                      justify-center

                      rounded-xl

                      border
                      border-white/[0.07]

                      bg-white/[0.025]

                      text-zinc-600
                    "
                  >
                    <Search size={16} />
                  </div>

                  <h4
                    className="
                      mt-3

                      font-bebas

                      text-[17px]

                      uppercase

                      tracking-[0.06em]

                      text-white
                    "
                  >
                    No products found
                  </h4>

                  <p
                    className="
                      mt-1

                      text-[9px]

                      leading-5

                      text-zinc-600
                    "
                  >
                    Try another product name,
                    category or material.
                  </p>
                </div>
              )}

            {/* FOOTER */}

            {!loading &&
              filteredProducts.length > 0 && (
                <div
                  className="
                    border-t
                    border-white/[0.06]

                    px-4
                    py-2.5

                    text-center
                  "
                >
                  <p
                    className="
                      text-[7px]

                      uppercase

                      tracking-[0.2em]

                      text-zinc-700
                    "
                  >
                    Select a product to view details
                  </p>
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// =====================================================
// FALLBACK ICON
// =====================================================

function PackageIcon() {
  return (
    <div className="text-[11px]">
      ◇
    </div>
  );
}