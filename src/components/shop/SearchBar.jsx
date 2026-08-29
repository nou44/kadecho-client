import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar({ value, onChange }) {
  return (
<motion.div
  initial={{
    opacity: 0,
    y: 35,
    scale: 0.96,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  viewport={{
    once: false,
  }}
  transition={{
    duration: .7,
    ease: "easeOut",
  }}
  className="
    mx-auto

    mb-8

    max-w-[620px]

    lg:max-w-[680px]
  "
>
      <motion.div
        whileHover={{
          y: -2,
        }}
        transition={{ duration: 0.2 }}
        className="
          group
          relative

          flex
          h-12
lg:h-14
          items-center

          overflow-hidden

          rounded-2xl

          border
          border-white/10

          bg-gradient-to-br
          from-zinc-900
          to-black

          backdrop-blur-xl

          transition-all
          duration-300

          hover:border-red-500/60
          hover:shadow-[0_0_30px_rgba(239,68,68,.30)]
        "
      >
        {/* Hover Glow */}

        <span
          className="
            absolute
            inset-0

            bg-red-500/0

            transition-all
            duration-300

            group-hover:bg-red-500/5
          "
        />

        {/* Icon */}

        <motion.div
          whileHover={{
            rotate: 12,
            scale: 1.08,
          }}
          className="
            relative
            z-10

            ml-4

            text-zinc-400

            group-hover:text-red-500
          "
        >
          <Search size={18} />
        </motion.div>

        {/* Input */}

     <input
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  type="text"
  placeholder="Search products..."
  className="
    relative
    z-10

    h-full
    flex-1

    bg-transparent

    px-3
    lg:px-4

    text-white
    text-sm
    placeholder:text-zinc-500

    outline-none
  "
/>
      </motion.div>
    </motion.div>
  );
}