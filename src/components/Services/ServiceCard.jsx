
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service, index = 0 }) {
  return (
    <Link
      to={`/services/${service.id}`}
      aria-label={`Explore ${service.title}`}
      className="
        group relative block h-full w-full
        overflow-hidden rounded-[16px]
        border border-white/[0.09]
        bg-[#101010]
        outline-none
        transition-[border-color,box-shadow]
        duration-300
        hover:border-red-500/35
        hover:shadow-[0_12px_35px_rgba(0,0,0,.24)]
        focus-visible:ring-2
        focus-visible:ring-red-500
      "
    >
      <article className="relative h-[292px] w-full sm:h-[310px] lg:h-[326px]">
        {/* IMAGE */}
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="
            absolute inset-0 h-full w-full
            object-cover object-center
            transition-transform duration-700
            ease-[cubic-bezier(.22,1,.36,1)]
            motion-safe:group-hover:scale-[1.045]
          "
        />

        {/* LIGHT TOP OVERLAY */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-b
            from-black/30 via-transparent to-transparent
          "
        />

        {/* TEXT READABILITY */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-t
            from-[#050505]/95
            via-[#050505]/40
            via-[38%]
            to-transparent
          "
        />

        {/* CATEGORY */}
        <div className="absolute left-3 top-3 z-10">
          <span
            className="
              inline-flex items-center
              rounded-full border border-white/15
              bg-black/55 px-2.5 py-1
              font-bebas text-[9px]
              uppercase tracking-[0.16em]
              text-zinc-200
            "
          >
            {service.category}
          </span>
        </div>

        {/* NUMBER */}
        <span
          className="
            absolute right-3 top-3
            font-bebas text-[11px]
            tracking-[0.12em] text-white/65
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* CONTENT */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4">
          <div
            aria-hidden="true"
            className="
              mb-3 h-px w-8 bg-red-500
              transition-[width] duration-300
              group-hover:w-14
            "
          />

          <h3
            className="
              font-bebas text-[22px]
              uppercase leading-none
              tracking-[0.055em] text-white
              sm:text-[24px]
            "
          >
            {service.title}
          </h3>

          <p
            className="
              mt-1.5 line-clamp-2
              min-h-[34px]
              font-satoshi text-[11px]
              leading-[17px] text-zinc-300/80
            "
          >
            {service.description}
          </p>

          <div
            className="
              mt-3 flex items-center
              justify-between border-t
              border-white/[0.12] pt-2.5
            "
          >
            <span
              className="
                font-bebas text-[10px]
                uppercase tracking-[0.16em]
                text-zinc-300
                transition-colors duration-300
                group-hover:text-red-400
              "
            >
              Discover Service
            </span>

            <span
              className="
                flex h-7 w-7 items-center
                justify-center rounded-full
                border border-white/15
                bg-white/[0.06]
                text-white
                transition-[background-color,border-color,transform]
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:border-red-500/40
                group-hover:bg-red-500/15
              "
            >
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
