
import { memo } from "react";
import {
  Ruler,
  Hammer,
  Palette,
  Package,
  ArrowUpRight,
} from "lucide-react";

const SPEC_FIELDS = [
  {
    key: "dimensions",
    title: "Dimensions",
    icon: Ruler,
  },
  {
    key: "material",
    title: "Material",
    icon: Hammer,
  },
  {
    key: "finish",
    title: "Finish",
    icon: Palette,
  },
  {
    key: "availability",
    title: "Availability",
    icon: Package,
  },
];

function ProductSpecs({ product }) {
  return (
    <section
      aria-labelledby="product-specifications"
      className="relative min-w-0"
    >
      {/* HEADER */}
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-red-500"
            />

            <span
              className="
                text-[8px] font-semibold
                uppercase tracking-[0.2em]
                text-red-400
              "
            >
              Technical Details
            </span>
          </div>

          <h2
            id="product-specifications"
            className="
              mt-1 font-bebas
              text-[19px] leading-none
              tracking-[0.06em]
              text-white
              sm:text-[21px]
            "
          >
            Specifications
          </h2>
        </div>

        <div
          aria-hidden="true"
          className="
            flex items-center gap-1
            text-zinc-600
          "
        >
          <span
            className="
              text-[8px] uppercase
              tracking-[0.12em]
            "
          >
            04 Details
          </span>

          <ArrowUpRight size={12} />
        </div>
      </div>

      {/* TECHNICAL DATA */}
      <dl
        className="
          grid grid-cols-2
          gap-x-4 gap-y-0
          sm:gap-x-6
        "
      >
        {SPEC_FIELDS.map((field, index) => {
          const Icon = field.icon;
          const value = product?.[field.key];

          return (
            <div
              key={field.key}
              className={`
                group relative min-w-0
                flex items-center gap-2.5
                py-2.5
                ${
                  index < 2
                    ? "border-b border-white/[0.07]"
                    : ""
                }
              `}
            >
              {/* ICON */}
              <div
                className="
                  flex h-7 w-7
                  shrink-0 items-center
                  justify-center
                  rounded-lg
                  bg-red-500/[0.07]
                  text-red-400
                  transition-colors duration-200
                  group-hover:bg-red-500/[0.12]
                "
              >
                <Icon
                  size={13}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              {/* LABEL + VALUE */}
              <div className="min-w-0 flex-1">
                <dt
                  className="
                    text-[8px]
                    font-medium uppercase
                    tracking-[0.13em]
                    text-zinc-500
                  "
                >
                  {field.title}
                </dt>

                <dd
                  title={
                    value == null
                      ? undefined
                      : String(value)
                  }
                  className="
                    mt-0.5 truncate
                    text-[11px]
                    font-medium leading-tight
                    text-zinc-200
                  "
                >
                  {value === null ||
                  value === undefined ||
                  value === ""
                    ? "—"
                    : String(value)}
                </dd>
              </div>
            </div>
          );
        })}
      </dl>

      {/* BOTTOM MICRO DETAIL */}
      <div
        className="
          mt-1.5 flex items-center
          justify-between gap-2
          border-t border-white/[0.05]
          pt-2.5
        "
      >
        <span
          className="
            font-bebas text-[9px]
            uppercase tracking-[0.16em]
            text-zinc-600
          "
        >
          KADECHO / MATERIAL & CRAFT
        </span>

        <span
          className="
            h-1 w-1 shrink-0
            rotate-45 bg-red-500/60
          "
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default memo(ProductSpecs);
