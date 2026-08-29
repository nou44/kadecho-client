
import { SlidersHorizontal, Check, RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function FilterSidebar({
  products = [],
  mobile = false,
  setOpenFilters,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");

  const categoryCounts = products.reduce((acc, product) => {
    const category = product.category?.trim().toLowerCase();

    if (!category) return acc;

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});

  const categories = [
    {
      name: "All",
      count: products.length,
      value: null,
    },
    ...Object.entries(categoryCounts).map(([category, count]) => ({
      name: category
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" "),
      count,
      value: category,
    })),
  ];

  const handleCategory = (value) => {
    if (value) {
      setSearchParams({
        category: value,
      });
    } else {
      setSearchParams({});
    }

    if (mobile) {
      setOpenFilters(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const resetFilters = () => {
    setSearchParams({});

    if (mobile) {
      setOpenFilters(false);
    }
  };

  return (
    <aside
      className="
        group/sidebar
        relative
        overflow-hidden

        rounded-[24px]

        border
        border-white/[0.08]

        bg-[#080808]

        p-4
        sm:p-5

        shadow-[0_20px_60px_rgba(0,0,0,.35)]

        backdrop-blur-2xl
      "
    >
      {/* Ambient Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20

          h-48
          w-48

          rounded-full

          bg-red-600/[0.07]

          blur-[80px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-20

          h-40
          w-40

          rounded-full

          bg-red-600/[0.04]

          blur-[70px]
        "
      />

      {/* Top Accent */}

      <div
        className="
          absolute
          left-0
          top-0

          h-px
          w-full

          bg-gradient-to-r
          from-transparent
          via-red-500/50
          to-transparent
        "
      />

      {/* Header */}

      <div className="relative z-10">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* Icon */}

            <motion.div
              whileHover={{
                rotate: -5,
                scale: 1.04,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                flex
                h-10
                w-10

                shrink-0
                items-center
                justify-center

                rounded-xl

                border
                border-red-500/20

                bg-red-500/[0.07]

                text-red-400

                shadow-[0_0_25px_rgba(239,68,68,.08)]
              "
            >
              <SlidersHorizontal
                size={18}
                strokeWidth={2}
              />
            </motion.div>

            {/* Heading */}

            <div>
              <h3
                className="
                  font-bebas

                  text-[24px]
                  leading-none

                  tracking-[0.12em]

                  text-white
                "
              >
                FILTERS
              </h3>

              <p
                className="
                  mt-1

                  font-satoshi

                  text-[9px]

                  uppercase
                  tracking-[0.18em]

                  text-zinc-600
                "
              >
                Refine collection
              </p>
            </div>
          </div>

          {/* Active Count */}

          {activeCategory && (
            <motion.span
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                rounded-full

                border
                border-red-500/20

                bg-red-500/[0.08]

                px-2.5
                py-1

                font-bebas

                text-[10px]

                tracking-[0.15em]

                text-red-400
              "
            >
              ACTIVE
            </motion.span>
          )}
        </div>

        {/* Divider */}

        <div
          className="
            mt-5

            h-px

            bg-gradient-to-r
            from-red-500/30
            via-white/[0.06]
            to-transparent
          "
        />
      </div>

      {/* Categories */}

      <div className="relative z-10 mt-5">

        <div
          className="
            mb-3

            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              font-bebas

              text-[10px]

              uppercase
              tracking-[0.25em]

              text-zinc-600
            "
          >
            Categories
          </span>

          <span
            className="
              font-satoshi

              text-[10px]

              text-zinc-700
            "
          >
            {categories.length} options
          </span>
        </div>

        <div className="space-y-1.5">

          {categories.map((category, index) => {
            const isActive = category.value
              ? activeCategory === category.value
              : !activeCategory;

            return (
              <motion.button
                key={category.name}
                onClick={() =>
                  handleCategory(category.value)
                }
                whileHover={{
                  x: 3,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                transition={{
                  duration: 0.2,
                }}
                className={`
                  group
                  relative
                  flex
                  w-full
                  items-center
                  justify-between

                  overflow-hidden

                  rounded-xl

                  border

                  px-3
                  py-2.5

                  text-left

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "border-red-500/30 bg-red-500/[0.08]"
                      : "border-transparent bg-white/[0.015] hover:border-white/[0.07] hover:bg-white/[0.035]"
                  }
                `}
              >
                {/* Active Indicator */}

                <span
                  className={`
                    absolute
                    left-0
                    top-1/2

                    h-5

                    -translate-y-1/2

                    rounded-r-full

                    bg-red-500

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "w-[2px] opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />

                <div className="flex min-w-0 items-center gap-2.5">

                  {/* Dot */}

                  <span
                    className={`
                      flex
                      h-6
                      w-6
                      shrink-0

                      items-center
                      justify-center

                      rounded-lg

                      border

                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "border-red-500/25 bg-red-500/10"
                          : "border-white/[0.06] bg-white/[0.02]"
                      }
                    `}
                  >
                    {isActive ? (
                      <Check
                        size={12}
                        strokeWidth={2.5}
                        className="text-red-400"
                      />
                    ) : (
                      <span
                        className="
                          h-1.5
                          w-1.5

                          rounded-full

                          bg-zinc-700

                          transition-colors
                          duration-300

                          group-hover:bg-red-500
                        "
                      />
                    )}
                  </span>

                  {/* Name */}

                  <span
                    className={`
                      truncate

                      font-satoshi

                      text-[12px]

                      font-medium

                      transition-colors
                      duration-300

                      ${
                        isActive
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }
                    `}
                  >
                    {category.name}
                  </span>
                </div>

                {/* Count */}

                <span
                  className={`
                    ml-2

                    shrink-0

                    rounded-md

                    px-2
                    py-1

                    font-satoshi

                    text-[9px]

                    font-semibold

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-red-500/10 text-red-400"
                        : "bg-white/[0.025] text-zinc-600 group-hover:text-zinc-400"
                    }
                  `}
                >
                  {category.count}
                </span>

                {/* Hover Shine */}

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0

                    bg-gradient-to-r
                    from-red-500/[0.04]
                    via-transparent
                    to-transparent

                    opacity-0

                    transition-opacity
                    duration-300

                    group-hover:opacity-100
                  "
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Reset */}

      <div
        className="
          relative
          z-10

          mt-5

          border-t
          border-white/[0.06]

          pt-4
        "
      >
        <motion.button
          onClick={resetFilters}
          whileHover={{
            y: -1,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            group

            flex
            w-full
            items-center
            justify-center
            gap-2

            rounded-xl

            border
            border-white/[0.07]

            bg-white/[0.02]

            py-2.5

            font-bebas

            text-[10px]

            uppercase
            tracking-[0.22em]

            text-zinc-500

            transition-all
            duration-300

            hover:border-red-500/25
            hover:bg-red-500/[0.06]
            hover:text-red-400
          "
        >
          <RotateCcw
            size={12}
            className="
              transition-transform
              duration-300

              group-hover:-rotate-90
            "
          />

          Reset Filters
        </motion.button>
      </div>
    </aside>
  );
}

