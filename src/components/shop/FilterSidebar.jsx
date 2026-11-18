
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  Check,
  RotateCcw,
  Layers3,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const formatCategory = (value) =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function FilterSidebar({
  products = [],
  mobile = false,
  setOpenFilters,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory =
    searchParams.get("category")?.trim().toLowerCase() || null;

  const categories = useMemo(() => {
    const counts = new Map();

    for (const product of products) {
      const category = String(product.category || "")
        .trim()
        .toLowerCase();

      if (!category) continue;

      counts.set(category, (counts.get(category) || 0) + 1);
    }

    return [
      {
        value: null,
        name: "All Products",
        count: products.length,
      },
      ...Array.from(counts, ([value, count]) => ({
        value,
        name: formatCategory(value),
        count,
      })).sort((a, b) => a.name.localeCompare(b.name)),
    ];
  }, [products]);

  const activeLabel =
    categories.find((item) => item.value === activeCategory)?.name ||
    (activeCategory ? formatCategory(activeCategory) : "All Products");

  const updateCategory = (value) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value) {
          next.set("category", value);
        } else {
          next.delete("category");
        }

        return next;
      },
      { replace: true }
    );

    if (mobile) {
      setOpenFilters?.(false);
    }
  };

  const resetFilters = () => updateCategory(null);

  return (
    <div
      className={`
        relative isolate overflow-hidden
        border border-white/[0.09]
        bg-[#0b0b0c]
        ${
          mobile
            ? "rounded-2xl p-3"
            : "rounded-[20px] p-3.5"
        }
      `}
    >
      {/* TOP RED ACCENT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0
          h-px bg-gradient-to-r
          from-transparent via-red-500/65 to-transparent
        "
      />

      {/* BACKGROUND — STATIC, NO BLUR */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_100%_0%,rgba(220,38,38,0.075),transparent_55%)]
        "
      />

      {/* HEADER — DESKTOP ONLY
          Mobile drawer already has its own header */}
      {!mobile && (
        <div className="relative z-10 flex items-center gap-2.5">
          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl border border-red-500/20
              bg-red-500/[0.08]
              text-red-400
            "
          >
            <SlidersHorizontal size={17} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <h2
              className="
                font-bebas text-[21px]
                uppercase leading-none
                tracking-[0.1em] text-white
              "
            >
              Filters
            </h2>

            <p
              className="
                mt-1 text-[9px]
                uppercase tracking-[0.12em]
                text-zinc-600
              "
            >
              Refine Collection
            </p>
          </div>

          <span
            className="
              ml-auto flex h-6 w-6
              shrink-0 items-center justify-center
              rounded-lg border border-white/[0.06]
              bg-white/[0.025]
              text-zinc-500
            "
            title="Product categories"
          >
            <Layers3 size={12} />
          </span>
        </div>
      )}

      {/* COLLECTION OVERVIEW */}
      <div
        className={`
          relative z-10
          ${mobile ? "" : "mt-4"}
          overflow-hidden rounded-xl
          border border-white/[0.06]
          bg-black/30
          px-3 py-2.5
        `}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="
              text-[9px] font-semibold
              uppercase tracking-[0.14em]
              text-zinc-500
            "
          >
            Showroom
          </span>

          <span
            className="
              inline-flex items-center gap-1
              text-[9px] text-red-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Live
          </span>
        </div>

        <div className="mt-2 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p
              className="
                font-bebas text-[25px]
                leading-none tracking-[0.04em]
                text-white
              "
            >
              {products.length}
              <span className="ml-1.5 text-[11px] text-zinc-600">
                ITEMS
              </span>
            </p>
          </div>

          <span
            className="
              max-w-[105px] truncate
              text-right text-[10px]
              text-zinc-500
            "
            title={activeLabel}
          >
            {activeLabel}
          </span>
        </div>

        {/* SMALL STATIC PROGRESS DETAIL */}
        <div
          aria-hidden="true"
          className="
            mt-2.5 h-[2px] overflow-hidden
            rounded-full bg-white/[0.06]
          "
        >
          <div
            className="
              h-full w-1/3
              rounded-full bg-gradient-to-r
              from-red-700 to-red-400
            "
          />
        </div>
      </div>

      {/* CATEGORY HEADER */}
      <div
        className="
          relative z-10 mt-4 mb-2.5
          flex items-center justify-between gap-2
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-red-500" />

          <span
            className="
              font-bebas text-[11px]
              uppercase tracking-[0.19em]
              text-zinc-400
            "
          >
            Categories
          </span>
        </div>

        <span
          className="
            text-[9px] tabular-nums
            text-zinc-600
          "
        >
          {categories.length} options
        </span>
      </div>

      {/* CATEGORY LIST */}
      <div
        role="group"
        aria-label="Filter by category"
        className="relative z-10 space-y-1.5"
      >
        {categories.map((category, index) => {
          const isActive = category.value === activeCategory;

          return (
            <button
              key={category.value ?? "all"}
              type="button"
              onClick={() => updateCategory(category.value)}
              aria-pressed={isActive}
              className={`
                group relative flex w-full
                min-w-0 items-center gap-2
                overflow-hidden rounded-xl
                border px-2.5 py-2.5
                text-left
                transition-[border-color,background-color,color]
                duration-200
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-500
                ${
                  isActive
                    ? "border-red-500/35 bg-red-500/[0.085]"
                    : "border-white/[0.045] bg-white/[0.018] hover:border-red-500/20 hover:bg-white/[0.04]"
                }
              `}
            >
              {/* ACTIVE RAIL */}
              <span
                aria-hidden="true"
                className={`
                  absolute left-0 top-1/2
                  h-5 -translate-y-1/2
                  rounded-r-full bg-red-500
                  transition-[width,opacity] duration-200
                  ${
                    isActive
                      ? "w-[2px] opacity-100"
                      : "w-0 opacity-0"
                  }
                `}
              />

              {/* NUMBER / CHECK */}
              <span
                className={`
                  flex h-6 w-6 shrink-0
                  items-center justify-center
                  rounded-lg border
                  font-mono text-[9px]
                  transition-colors duration-200
                  ${
                    isActive
                      ? "border-red-500/25 bg-red-500/10 text-red-400"
                      : "border-white/[0.06] bg-white/[0.025] text-zinc-600 group-hover:text-red-400"
                  }
                `}
              >
                {isActive ? (
                  <Check size={12} strokeWidth={2.4} />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>

              {/* CATEGORY NAME */}
              <span
                className={`
                  min-w-0 flex-1 truncate
                  text-[11px] font-medium
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 group-hover:text-zinc-200"
                  }
                `}
                title={category.name}
              >
                {category.name}
              </span>

              {/* COUNT */}
              <span
                className={`
                  shrink-0 rounded-md
                  px-1.5 py-1
                  text-[9px] font-semibold
                  tabular-nums
                  ${
                    isActive
                      ? "bg-red-500/10 text-red-400"
                      : "bg-white/[0.025] text-zinc-600"
                  }
                `}
              >
                {category.count}
              </span>

              <ArrowUpRight
                size={11}
                aria-hidden="true"
                className={`
                  shrink-0 transition-[opacity,color]
                  duration-200
                  ${
                    isActive
                      ? "text-red-400 opacity-100"
                      : "text-zinc-600 opacity-0 group-hover:opacity-100"
                  }
                `}
              />
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <div
        className="
          relative z-10 mt-4
          border-t border-white/[0.07]
          pt-3
        "
      >
        <button
          type="button"
          onClick={resetFilters}
          disabled={!activeCategory}
          className="
            group flex w-full
            items-center justify-center gap-2
            rounded-xl border border-white/[0.08]
            bg-white/[0.025]
            py-2.5
            font-bebas text-[11px]
            uppercase tracking-[0.16em]
            text-zinc-400
            transition-[border-color,background-color,color]
            duration-200
            enabled:hover:border-red-500/30
            enabled:hover:bg-red-500/[0.06]
            enabled:hover:text-red-400
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <RotateCcw
            size={12}
            className="
              transition-transform duration-200
              group-hover:-rotate-45
            "
          />
          Reset Category
        </button>

        <div
          className="
            mt-3 flex items-center
            justify-center gap-1.5
            text-[8px] uppercase
            tracking-[0.11em]
            text-zinc-600
          "
        >
          <ShieldCheck size={11} className="text-red-500/65" />
          Crafted With Precision
        </div>
      </div>
    </div>
  );
}
