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
            <span
              className="
                h-1
                w-1
                rounded-full
                bg-red-500
                shadow-[0_0_8px_rgba(239,68,68,.8)]
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-red-400
              "
            >
              Details
            </span>
          </div>

          <h2
            className="
              mt-1
              font-bebas
              text-xl
              uppercase
              tracking-[0.08em]
              text-white
              sm:text-2xl
            "
          >
            Specifications
          </h2>
        </div>

        {/* Simple CSS animation instead of Framer Motion */}
        <div
          className="
            hidden
            h-px
            w-24
            origin-right
            bg-gradient-to-l
            from-red-500
            to-transparent
            opacity-0
            animate-spec-line
            sm:block
          "
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
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-30px",
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
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

                transition-all
                duration-300
                ease-out

                hover:-translate-y-0.5
                hover:border-red-500/25
                hover:bg-red-500/[0.025]
              "
            >
              {/* TOP ACCENT */}
              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-px
                  w-full
                  origin-left
                  scale-x-0

                  bg-gradient-to-r
                  from-red-500
                  via-red-500/40
                  to-transparent

                  transition-transform
                  duration-500
                  ease-out

                  group-hover:scale-x-100
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
                <div
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

                    group-hover:rotate-[-6deg]
                    group-hover:scale-[1.08]
                    group-hover:border-red-500/30
                    group-hover:bg-red-500/15
                    group-hover:text-red-300
                  "
                >
                  <Icon
                    size={14}
                    strokeWidth={1.8}
                  />
                </div>

                {/* TEXT */}
                <div className="min-w-0">
                  <p
                    className="
                      text-[7px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-zinc-600
                    "
                  >
                    {spec.title}
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[10px]
                      font-semibold
                      leading-tight
                      text-zinc-300

                      transition-colors
                      duration-300

                      group-hover:text-white
                    "
                  >
                    {spec.value || "—"}
                  </p>
                </div>
              </div>

              {/* BOTTOM MICRO LINE */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  w-0

                  bg-red-500

                  transition-[width]
                  duration-300

                  group-hover:w-[35%]
                "
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}