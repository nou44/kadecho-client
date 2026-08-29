
import { motion } from "framer-motion";
import {
  Ruler,
  Hammer,
  Palette,
  Package,
} from "lucide-react";

export default function ProductSpecs({ product }) {
  const specs = [
    {
      title: "Dimensions",
      value: product.dimensions,
      icon: Ruler,
    },
    {
      title: "Material",
      value: product.material,
      icon: Hammer,
    },
    {
      title: "Finish",
      value: product.finish,
      icon: Palette,
    },
    {
      title: "Availability",
      value: product.availability,
      icon: Package,
    },
  ];

  return (
    <section className="relative">
      {/* HEADER */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,.8)]" />

            <span className="text-[8px] font-semibold uppercase tracking-[0.24em] text-red-400">
              Details
            </span>
          </div>

          <h2 className="mt-1 font-bebas text-xl uppercase tracking-[0.08em] text-white sm:text-2xl">
            Specifications
          </h2>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hidden h-px w-24 origin-right bg-gradient-to-l from-red-500 to-transparent sm:block"
        />
      </div>

      {/* SPECS */}
      <div className="grid grid-cols-2 gap-2">
        {specs.map((spec, index) => {
          const Icon = spec.icon;

          return (
            <motion.div
              key={spec.title}
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                margin: "-30px",
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -2,
                transition: {
                  duration: 0.2,
                },
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-lg
                border
                border-white/[0.07]
                bg-white/[0.018]
                px-2.5
                py-2.5
                transition-colors
                duration-300
                hover:border-red-500/25
                hover:bg-red-500/[0.025]
              "
            >
              {/* TOP ACCENT */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.06 + 0.15,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  left-0
                  top-0
                  h-px
                  w-full
                  origin-left
                  bg-gradient-to-r
                  from-red-500
                  via-red-500/40
                  to-transparent
                "
              />

              {/* HOVER GLOW */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-16
                  w-16
                  rounded-full
                  bg-red-500/10
                  opacity-0
                  blur-2xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />

              <div className="relative flex items-center gap-2.5">
                {/* ICON */}
                <motion.div
                  whileHover={{
                    rotate: -6,
                    scale: 1.08,
                  }}
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-red-500/15
                    bg-red-500/[0.07]
                    text-red-400
                    transition-all
                    duration-300
                    group-hover:border-red-500/30
                    group-hover:bg-red-500/15
                    group-hover:text-red-300
                  "
                >
                  <Icon size={14} strokeWidth={1.8} />
                </motion.div>

                {/* TEXT */}
                <div className="min-w-0">
                  <p className="
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[0.16em]
                    text-zinc-600
                  ">
                    {spec.title}
                  </p>

                  <p className="
                    mt-0.5
                    truncate
                    text-[10px]
                    font-semibold
                    leading-tight
                    text-zinc-300
                    transition-colors
                    duration-300
                    group-hover:text-white
                  ">
                    {spec.value || "—"}
                  </p>
                </div>
              </div>

              {/* BOTTOM MICRO LINE */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "35%" }}
                transition={{ duration: 0.25 }}
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  bg-red-500
                "
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

