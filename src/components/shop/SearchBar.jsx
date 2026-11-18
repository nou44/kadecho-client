
import { useId, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function SearchBar({
  value = "",
  onChange,
}) {
  const reduceMotion = useReducedMotion();
  const inputRef = useRef(null);
  const inputId = useId();

  const hasValue = value.length > 0;

  const clearSearch = () => {
    onChange?.("");
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 12 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.45,
        ease: EASE,
      }}
      className="mx-auto w-full"
    >
      <div
        className="
          group relative flex
          h-11 items-center
          overflow-hidden
          rounded-xl
          border border-white/10
          bg-gradient-to-br
          from-zinc-900 to-black
          transition-[border-color,box-shadow]
          duration-200
          hover:border-red-500/35
          hover:shadow-[0_0_20px_rgba(239,68,68,0.08)]
          focus-within:border-red-500/55
          focus-within:shadow-[0_0_22px_rgba(239,68,68,0.10)]
          sm:h-12
        "
      >
        {/* SUBTLE FOCUS LIGHT */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-x-5 top-0
            h-px
            bg-gradient-to-r
            from-transparent via-red-400/50 to-transparent
            opacity-0
            transition-opacity duration-200
            group-focus-within:opacity-100
          "
        />

        {/* SEARCH ICON */}
        <label
          htmlFor={inputId}
          className="
            relative z-10
            ml-4 flex shrink-0
            items-center justify-center
            text-zinc-500
            transition-colors duration-200
            group-focus-within:text-red-400
          "
        >
          <Search size={17} strokeWidth={1.8} />
          <span className="sr-only">Search products</span>
        </label>

        {/* INPUT */}
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          name="product-search"
          autoComplete="off"
          spellCheck={false}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="
            relative z-10
            h-full min-w-0 flex-1
            appearance-none bg-transparent
            px-3
            font-satoshi text-[12px]
            text-white
            placeholder:text-zinc-500
            outline-none
            sm:text-[13px]
            [&::-webkit-search-cancel-button]:hidden
          "
        />

        {/* CLEAR BUTTON */}
        {hasValue && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="
              relative z-10 mr-2
              flex h-8 w-8
              shrink-0 items-center
              justify-center rounded-lg
              border border-white/[0.06]
              bg-white/[0.035]
              text-zinc-500
              transition-[color,background-color,border-color]
              duration-200
              hover:border-red-500/25
              hover:bg-red-500/[0.08]
              hover:text-red-400
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-red-500
            "
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
