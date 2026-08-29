import { motion } from "framer-motion";

export default function IconButton({
  children,
  onClick,
  ariaLabel,
  className = "",
  type = "button",
}) {
  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{
        scale: 1.08,
        y: -2,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        group
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        overflow-hidden
        rounded-xl

        border
        border-white/10

        bg-gradient-to-br
        from-zinc-900
        to-black

        text-zinc-300

        backdrop-blur-xl

        transition-all
        duration-300

        hover:border-red-500/60
        hover:text-white
        hover:shadow-[0_0_25px_rgba(239,68,68,.35)]

        focus:outline-none
        focus:ring-2
        focus:ring-red-500/40

        ${className}
      `}
    >
      {/* Hover Glow */}
      <span
        className="
          absolute
          inset-0
          rounded-xl
          bg-red-500/0
          transition-all
          duration-300
          group-hover:bg-red-500/5
        "
      />

      {/* Content */}
      <motion.div
        whileHover={{
          rotate: -10,
        }}
        transition={{
          duration: 0.2,
        }}
        className="relative z-10 flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.button>
  );
}