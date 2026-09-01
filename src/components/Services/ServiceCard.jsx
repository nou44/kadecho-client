import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceCard({ service }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        w-[230px]
        sm:w-[255px]
        lg:w-[275px]

        shrink-0
        overflow-hidden

        rounded-[22px]

        border
        border-white/10

        bg-[#090909]

        transition-[border-color,box-shadow]
        duration-300

        hover:border-red-500/40
        hover:shadow-[0_20px_55px_rgba(239,68,68,.12)]
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative
          h-[330px]
          sm:h-[350px]
          lg:h-[370px]

          overflow-hidden
        "
      >
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          className="
            absolute
            inset-0

            h-full
            w-full

            object-cover
            object-center

            transition-transform
            duration-700
            ease-out

            group-hover:scale-[1.04]
          "
        />

        {/* Dark overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-gradient-to-t
            from-[#050505]
            via-black/20
            to-black/10
          "
        />

        {/* Hover tint */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0

            bg-red-500/0

            transition-colors
            duration-300

            group-hover:bg-red-500/[0.035]
          "
        />

        {/* Category */}

        <div
          className="
            absolute
            left-4
            top-4

            rounded-full

            border
            border-white/10

            bg-black/55

            px-3
            py-1.5

            backdrop-blur-md
          "
        >
          <span
            className="
              font-bebas
              text-[9px]
              uppercase
              tracking-[0.28em]
              text-zinc-200
            "
          >
            {service.category}
          </span>
        </div>

        {/* Arrow */}

        <div
          className="
            absolute
            right-4
            top-4

            flex
            h-8
            w-8

            items-center
            justify-center

            rounded-full

            border
            border-white/10

            bg-black/40

            text-zinc-400

            transition-all
            duration-300

            group-hover:border-red-500/40
            group-hover:text-red-400
          "
        >
          <ArrowUpRight size={14} />
        </div>
      </div>

      {/* CONTENT */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          bg-gradient-to-t
          from-[#050505]
          via-[#050505]/95
          to-transparent

          px-4
          pb-4
          pt-16
        "
      >
        <h3
          className="
            font-bebas

            text-[21px]
            sm:text-[23px]
            lg:text-[25px]

            uppercase
            leading-none
            tracking-[0.06em]

            text-white

            transition-colors
            duration-300

            group-hover:text-red-400
          "
        >
          {service.title}
        </h3>

        <p
          className="
            mt-2

            line-clamp-2

            text-[11px]
            sm:text-[12px]

            leading-5

            text-zinc-400
          "
        >
          {service.description}
        </p>

        <div
          className="
            mt-3

            inline-flex
            items-center
            gap-1.5

            font-bebas

            text-[10px]
            uppercase
            tracking-[0.24em]

            text-zinc-300

            transition-all
            duration-300

            group-hover:translate-x-1
            group-hover:text-red-400
          "
        >
          Explore
          <ArrowUpRight size={13} />
        </div>
      </div>

      {/* BORDER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          rounded-[22px]

          ring-1
          ring-red-500/0

          transition-all
          duration-300

          group-hover:ring-red-500/25
        "
      />

      {/* TOP ACCENT */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0

          h-px
          w-20

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-red-500
          to-transparent

          opacity-60

          transition-all
          duration-300

          group-hover:w-28
          group-hover:opacity-100
        "
      />
    </motion.article>
  );
}