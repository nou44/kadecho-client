
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  X,
  ArrowUpRight,
  ArrowRight,
  Loader2,
  PackageSearch,
  Clock3,
  Sparkles,
  RotateCcw,
  CornerDownLeft,
  TrendingUp,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const EASE = [0.22, 1, 0.36, 1];
const POPULAR_SEARCHES = ["Table", "Escalier", "Porte", "Pergola"];
const MAX_RESULTS = 8;

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

function getProductImage(product) {
  const image =
    product.image ||
    product.images?.[0] ||
    product.thumbnail ||
    null;

  if (typeof image === "string") return image;

  if (image && typeof image === "object") {
    return image.url || image.secure_url || image.src || "";
  }

  return "";
}

function getProductId(product) {
  return product._id || product.id;
}

function getSearchText(product) {
  return [
    product.name,
    product.category,
    product.material,
    product.finish,
    product.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
}

function HighlightText({ text, query }) {
  const value = String(text || "");
  const needle = query.trim();

  if (!needle) return value;

  const index = value.toLocaleLowerCase().indexOf(
    needle.toLocaleLowerCase()
  );

  if (index === -1) return value;

  return (
    <>
      {value.slice(0, index)}
      <mark className="rounded-sm bg-red-500/15 text-red-300">
        {value.slice(index, index + needle.length)}
      </mark>
      {value.slice(index + needle.length)}
    </>
  );
}

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);

  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const resultsRef = useRef(null);
  const loadedRef = useRef(false);
  const shouldRestoreFocusRef = useRef(true);
  const wasOpenRef = useRef(false);

  const titleId = useId();
  const listboxId = useId();

  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setDebouncedQuery("");
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    closeSearch();
  }, [location.pathname, closeSearch]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 120);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!open || loadedRef.current) return;

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`${API_URL}/products`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const result = await response.json();

        const items = Array.isArray(result)
          ? result
          : result.products ?? result.data ?? [];

        setProducts(Array.isArray(items) ? items : []);
        loadedRef.current = true;
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("SEARCH ERROR:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [open, retryKey]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, reduceMotion ? 0 : 100);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getClientRects().length > 0);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (shouldRestoreFocusRef.current) {
        triggerRef.current?.focus();
      }
    };
  }, [open, closeSearch, reduceMotion]);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      shouldRestoreFocusRef.current = true;
    }

    wasOpenRef.current = open;
  }, [open]);

  const normalizedQuery = debouncedQuery.toLocaleLowerCase();

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return [];

    return products
      .filter((product) =>
        getSearchText(product).includes(normalizedQuery)
      )
      .slice(0, MAX_RESULTS);
  }, [products, normalizedQuery]);

  const totalMatches = useMemo(() => {
    if (!normalizedQuery) return 0;

    return products.reduce(
      (count, product) =>
        count +
        Number(getSearchText(product).includes(normalizedQuery)),
      0
    );
  }, [products, normalizedQuery]);

  const saveRecentSearch = useCallback((value) => {
    const term = String(value || "").trim();
    if (!term) return;

    setRecentSearches((previous) => [
      term,
      ...previous.filter(
        (item) => item.toLowerCase() !== term.toLowerCase()
      ),
    ].slice(0, 4));
  }, []);

  const handleProductClick = useCallback(
    (product) => {
      const id = getProductId(product);
      if (!id) return;

      saveRecentSearch(query);
      shouldRestoreFocusRef.current = false;
      closeSearch();
      navigate(`/product/${id}`);
    },
    [query, navigate, closeSearch, saveRecentSearch]
  );

  const handleSuggestionClick = (term) => {
    setQuery(term);
    setDebouncedQuery(term);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown" && filteredProducts.length) {
      event.preventDefault();
      setActiveIndex((current) =>
        current >= filteredProducts.length - 1 ? 0 : current + 1
      );
    }

    if (event.key === "ArrowUp" && filteredProducts.length) {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? filteredProducts.length - 1 : current - 1
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const product =
        filteredProducts[activeIndex] || filteredProducts[0];

      if (product) handleProductClick(product);
    }
  };

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  useEffect(() => {
    if (activeIndex < 0) return;

    resultsRef.current
      ?.querySelector(`[data-result-index="${activeIndex}"]`)
      ?.scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
  }, [activeIndex]);

  const resultCount = filteredProducts.length;
  const isSearching = query.trim() !== debouncedQuery;

  return (
    <>
      {/* SEARCH TRIGGER */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Rechercher un produit"
        aria-expanded={open}
        aria-haspopup="dialog"
        whileTap={reduceMotion ? undefined : { scale: 0.93 }}
        className="
          group relative flex h-10 w-10 shrink-0
          items-center justify-center overflow-hidden
          rounded-xl border border-white/10
          bg-white/[0.035] text-zinc-400
          transition-[color,border-color,background-color]
          duration-200
          hover:border-red-500/35
          hover:bg-red-500/[0.08]
          hover:text-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-red-500/60
        "
      >
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-br
            from-red-500/[0.12] to-transparent
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          "
        />

        <Search
          size={18}
          strokeWidth={1.8}
          className="
            relative z-10 transition-[transform,color]
            duration-300
            group-hover:scale-110
            group-hover:text-red-400
          "
        />
      </motion.button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="search-modal"
                className="
                  fixed inset-0 z-[1100]
                  flex items-start justify-center
                  sm:px-5 sm:pt-[8vh]
                "
              >
                {/* BACKDROP */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                  }}
                  onClick={closeSearch}
                  className="
                    absolute inset-0
                    bg-black/85
                    backdrop-blur-[5px]
                  "
                />

                {/* MODAL */}
                <motion.section
                  ref={panelRef}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 25, scale: 0.96 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 12, scale: 0.98 }
                  }
                  transition={{
                    duration: reduceMotion ? 0.01 : 0.42,
                    ease: EASE,
                  }}
                  className="
                    relative z-10 flex
                    h-[100dvh] w-full flex-col
                    overflow-hidden
                    bg-[#090909] text-white

                    sm:h-auto
                    sm:max-h-[84dvh]
                    sm:max-w-[620px]
                    sm:rounded-[22px]
                    sm:border sm:border-white/10
                    sm:shadow-[0_30px_100px_rgba(0,0,0,.75)]
                  "
                >
                  {/* TOP ACCENT */}
                  <div className="relative h-[2px] shrink-0 overflow-hidden bg-red-950/40">
                    <motion.span
                      aria-hidden="true"
                      initial={{ x: "-100%" }}
                      animate={
                        reduceMotion
                          ? { x: 0 }
                          : { x: "100%" }
                      }
                      transition={{
                        duration: 2.8,
                        repeat: reduceMotion ? 0 : Infinity,
                        ease: "linear",
                      }}
                      className="
                        block h-full w-full
                        bg-gradient-to-r
                        from-transparent via-red-500 to-transparent
                      "
                    />
                  </div>

                  {/* HEADER */}
                  <div
                    className="
                      relative flex shrink-0
                      items-center justify-between
                      border-b border-white/[0.07]
                      px-5 py-4 sm:px-6 sm:py-5
                    "
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,.7)]" />

                        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-red-400">
                          KADECHO / DISCOVER
                        </p>
                      </div>

                      <h2
                        id={titleId}
                        className="
                          mt-1.5 text-[20px] font-semibold
                          tracking-tight sm:text-[23px]
                        "
                      >
                        Find your next piece
                      </h2>

                      <p className="mt-1 text-[11px] text-zinc-500">
                        Explore our premium collection
                      </p>
                    </div>

                    <motion.button
                      type="button"
                      onClick={closeSearch}
                      aria-label="Fermer la recherche"
                      whileHover={
                        reduceMotion ? undefined : { rotate: 90 }
                      }
                      whileTap={
                        reduceMotion ? undefined : { scale: 0.9 }
                      }
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl border border-white/10
                        bg-white/[0.035] text-zinc-400
                        transition-colors hover:border-red-500/30
                        hover:bg-red-500/[0.08]
                        hover:text-white
                      "
                    >
                      <X size={18} />
                    </motion.button>
                  </div>

                  {/* SEARCH INPUT */}
                  <div className="shrink-0 px-4 pt-4 sm:px-6 sm:pt-5">
                    <div
                      className="
                        group relative flex h-[54px]
                        items-center gap-3
                        overflow-hidden rounded-2xl
                        border border-white/10
                        bg-white/[0.04] px-4
                        transition-[border-color,box-shadow]
                        duration-300
                        focus-within:border-red-500/50
                        focus-within:shadow-[0_0_0_3px_rgba(239,68,68,.06)]
                      "
                    >
                      <Search
                        size={20}
                        className="shrink-0 text-red-400"
                      />

                      <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={(event) =>
                          setQuery(event.target.value)
                        }
                        onKeyDown={handleInputKeyDown}
                        placeholder="Search furniture, materials..."
                        autoComplete="off"
                        spellCheck={false}
                        role="combobox"
                        aria-autocomplete="list"
                        aria-expanded={
                          !!normalizedQuery && resultCount > 0
                        }
                        aria-controls={listboxId}
                        aria-activedescendant={
                          activeIndex >= 0
                            ? `${listboxId}-${activeIndex}`
                            : undefined
                        }
                        className="
                          h-full min-w-0 flex-1
                          bg-transparent text-[16px]
                          text-white outline-none
                          placeholder:text-zinc-600
                          sm:text-[14px]
                          [&::-webkit-search-cancel-button]:hidden
                        "
                      />

                      {query ? (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery("");
                            inputRef.current?.focus();
                          }}
                          aria-label="Effacer la recherche"
                          className="
                            flex h-7 w-7 shrink-0
                            items-center justify-center
                            rounded-lg text-zinc-500
                            transition-colors hover:bg-white/10
                            hover:text-white
                          "
                        >
                          <X size={15} />
                        </button>
                      ) : (
                        <span
                          className="
                            hidden items-center gap-1
                            rounded-md border border-white/10
                            bg-white/[0.04] px-2 py-1
                            text-[10px] text-zinc-500
                            sm:flex
                          "
                        >
                          <CornerDownLeft size={11} />
                          Enter
                        </span>
                      )}
                    </div>
                  </div>

                  {/* SCROLLABLE BODY */}
                  <div
                    ref={resultsRef}
                    className="
                      min-h-0 flex-1 overflow-y-auto
                      overscroll-contain px-4
                      pb-6 pt-5 sm:px-6
                    "
                    aria-live="polite"
                  >
                    {loading ? (
                      <div className="flex flex-col items-center justify-center gap-4 py-16">
                        <Loader2
                          size={23}
                          className="animate-spin text-red-400"
                        />
                        <p className="text-[12px] text-zinc-500">
                          Exploring our collection...
                        </p>
                      </div>
                    ) : error ? (
                      <div className="flex flex-col items-center gap-3 py-16 text-center">
                        <PackageSearch
                          size={28}
                          className="text-zinc-600"
                        />

                        <p className="text-[13px] text-zinc-300">
                          Unable to load our collection.
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            loadedRef.current = false;
                            setRetryKey((value) => value + 1);
                          }}
                          className="
                            flex items-center gap-2
                            rounded-xl border border-red-500/20
                            bg-red-500/[0.08] px-4 py-2.5
                            text-[11px] font-semibold text-red-400
                            transition-colors hover:bg-red-500/[0.14]
                          "
                        >
                          <RotateCcw size={14} />
                          Try again
                        </button>
                      </div>
                    ) : !query.trim() ? (
                      <div className="space-y-7">
                        {/* POPULAR SEARCHES */}
                        <motion.div
                          initial={
                            reduceMotion
                              ? false
                              : { opacity: 0, y: 10 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <TrendingUp
                              size={14}
                              className="text-red-400"
                            />

                            <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                              Popular searches
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {POPULAR_SEARCHES.map((term) => (
                              <motion.button
                                key={term}
                                type="button"
                                onClick={() =>
                                  handleSuggestionClick(term)
                                }
                                whileHover={
                                  reduceMotion
                                    ? undefined
                                    : { y: -2 }
                                }
                                whileTap={
                                  reduceMotion
                                    ? undefined
                                    : { scale: 0.96 }
                                }
                                className="
                                  group flex items-center gap-2
                                  rounded-xl border border-white/10
                                  bg-white/[0.035] px-3.5 py-2.5
                                  text-[11px] font-medium
                                  text-zinc-400
                                  transition-colors duration-200
                                  hover:border-red-500/30
                                  hover:bg-red-500/[0.07]
                                  hover:text-white
                                "
                              >
                                {term}
                                <ArrowUpRight
                                  size={12}
                                  className="text-zinc-600 group-hover:text-red-400"
                                />
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>

                        {/* RECENT SEARCHES */}
                        {recentSearches.length > 0 && (
                          <div>
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock3
                                  size={14}
                                  className="text-red-400"
                                />

                                <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                                  Recent searches
                                </h3>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setRecentSearches([])
                                }
                                className="text-[10px] text-zinc-600 hover:text-red-400"
                              >
                                Clear
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {recentSearches.map((term) => (
                                <button
                                  key={term}
                                  type="button"
                                  onClick={() =>
                                    handleSuggestionClick(term)
                                  }
                                  className="
                                    flex items-center gap-2
                                    rounded-lg border border-white/[0.07]
                                    px-3 py-2 text-[11px]
                                    text-zinc-500
                                    transition-colors
                                    hover:border-white/20
                                    hover:text-white
                                  "
                                >
                                  <Clock3 size={12} />
                                  {term}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* EMPTY STATE */}
                        <div
                          className="
                            relative overflow-hidden
                            rounded-2xl border border-white/[0.07]
                            bg-gradient-to-br
                            from-white/[0.045] to-transparent
                            px-5 py-7 text-center
                          "
                        >
                          <div
                            className="
                              mx-auto mb-3 flex h-12 w-12
                              items-center justify-center
                              rounded-2xl border border-red-500/15
                              bg-red-500/[0.07]
                            "
                          >
                            <Sparkles
                              size={22}
                              className="text-red-400"
                            />
                          </div>

                          <p className="text-[13px] font-semibold text-zinc-200">
                            Discover something exceptional
                          </p>

                          <p className="mx-auto mt-1.5 max-w-[280px] text-[11px] leading-relaxed text-zinc-500">
                            Search by product name, category, or material
                            to find your perfect piece.
                          </p>
                        </div>
                      </div>
                    ) : isSearching ? (
                      <div className="flex items-center justify-center gap-2 py-16 text-[12px] text-zinc-500">
                        <Loader2
                          size={15}
                          className="animate-spin text-red-400"
                        />
                        Searching...
                      </div>
                    ) : resultCount === 0 ? (
                      <div className="flex flex-col items-center py-16 text-center">
                        <div
                          className="
                            mb-4 flex h-14 w-14
                            items-center justify-center
                            rounded-2xl border border-white/10
                            bg-white/[0.035]
                          "
                        >
                          <PackageSearch
                            size={25}
                            className="text-zinc-500"
                          />
                        </div>

                        <p className="text-[14px] font-semibold text-zinc-200">
                          No matching products
                        </p>

                        <p className="mt-2 max-w-[260px] text-[11px] leading-relaxed text-zinc-500">
                          We couldn't find anything for{" "}
                          <span className="text-red-400">
                            "{debouncedQuery}"
                          </span>
                          . Try another name or material.
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setQuery("");
                            inputRef.current?.focus();
                          }}
                          className="mt-5 text-[11px] font-semibold text-red-400 hover:text-red-300"
                        >
                          Clear search
                        </button>
                      </div>
                    ) : (
                      <div>
                        {/* RESULTS HEADING */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                            <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                              Search results
                            </h3>
                          </div>

                          <span className="text-[10px] text-zinc-500">
                            {totalMatches} found
                          </span>
                        </div>

                        {/* RESULT LIST */}
                        <div
                          id={listboxId}
                          role="listbox"
                          aria-label="Produits trouvés"
                          className="space-y-1.5"
                        >
                          {filteredProducts.map((product, index) => {
                            const productId = getProductId(product);
                            const image = getProductImage(product);
                            const isActive = activeIndex === index;

                            return (
                              <motion.button
                                key={productId || index}
                                id={`${listboxId}-${index}`}
                                data-result-index={index}
                                type="button"
                                role="option"
                                aria-selected={isActive}
                                onClick={() =>
                                  handleProductClick(product)
                                }
                                initial={
                                  reduceMotion
                                    ? false
                                    : { opacity: 0, y: 8 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.28,
                                  delay: Math.min(index * 0.035, 0.2),
                                  ease: EASE,
                                }}
                                className={`
                                  group flex w-full items-center gap-3
                                  rounded-xl border p-2.5
                                  text-left transition-[background-color,border-color]
                                  duration-200
                                  ${
                                    isActive
                                      ? "border-red-500/30 bg-red-500/[0.08]"
                                      : "border-transparent hover:border-white/10 hover:bg-white/[0.045]"
                                  }
                                `}
                              >
                                {/* PRODUCT IMAGE */}
                                <div
                                  className="
                                    relative h-[62px] w-[62px]
                                    shrink-0 overflow-hidden
                                    rounded-xl border border-white/10
                                    bg-zinc-900
                                    sm:h-[68px] sm:w-[68px]
                                  "
                                >
                                  {image ? (
                                    <img
                                      src={image}
                                      alt={product.name || "Produit"}
                                      loading="lazy"
                                      decoding="async"
                                      className="
                                        h-full w-full object-cover
                                        transition-transform duration-500
                                        group-hover:scale-110
                                      "
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                      <PackageSearch
                                        size={20}
                                        className="text-zinc-600"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* PRODUCT INFO */}
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-[12px] font-semibold text-zinc-100 sm:text-[13px]">
                                    <HighlightText
                                      text={product.name || "Product"}
                                      query={debouncedQuery}
                                    />
                                  </p>

                                  <p className="mt-1 truncate text-[10px] text-zinc-500">
                                    {product.category || "Premium Collection"}
                                    {product.material
                                      ? ` • ${product.material}`
                                      : ""}
                                  </p>

                                  {product.price != null && (
                                    <p className="mt-1.5 text-[12px] font-bold text-red-400">
                                      {priceFormatter.format(
                                        Number(product.price) || 0
                                      )}{" "}
                                      DH
                                    </p>
                                  )}
                                </div>

                                <div
                                  className="
                                    flex h-8 w-8 shrink-0
                                    items-center justify-center
                                    rounded-lg border border-white/[0.07]
                                    text-zinc-600
                                    transition-[transform,color,border-color]
                                    duration-200
                                    group-hover:translate-x-0.5
                                    group-hover:border-red-500/20
                                    group-hover:text-red-400
                                  "
                                >
                                  <ArrowUpRight size={15} />
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>

                        {totalMatches > MAX_RESULTS && (
                          <p className="mt-4 text-center text-[10px] text-zinc-500">
                            Showing the first {MAX_RESULTS} results
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* FOOTER */}
                  <div
                    className="
                      relative shrink-0
                      border-t border-white/[0.07]
                      bg-[#0c0c0c]
                      px-4 py-3 sm:px-6
                    "
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                        <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-600">
                          KADECHO — Crafted with precision
                        </span>
                      </div>

                      <div className="hidden items-center gap-3 text-[10px] text-zinc-600 sm:flex">
                        <span className="flex items-center gap-1">
                          <CornerDownLeft size={12} />
                          Select
                        </span>
                        <span className="flex items-center gap-1">
                          <ArrowRight size={12} />
                          Explore
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
