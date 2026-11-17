
export default function AnnouncementItem({
  icon: Icon,
  text,
}) {
  return (
    <div
      className="
        group flex min-w-0 items-center
        gap-2.5 whitespace-nowrap
      "
    >
      {/* PREMIUM ICON CONTAINER */}
      <span
        aria-hidden="true"
        className="
          flex h-[25px] w-[25px] shrink-0
          items-center justify-center
          rounded-[6px]
          border border-red-500/20
          bg-red-500/[0.07]
          transition-[border-color,background-color]
          duration-200
          group-hover:border-red-500/40
          group-hover:bg-red-500/[0.12]
        "
      >
        <Icon
          size={12}
          strokeWidth={1.8}
          className="
            text-red-400
            transition-colors duration-200
            group-hover:text-red-300
          "
        />
      </span>

      {/* LABEL */}
      <span className="relative flex flex-col gap-[5px]">
        <span
          className="
            text-[9px] font-semibold
            uppercase leading-none
            tracking-[0.14em]
            text-zinc-300
            transition-colors duration-200
            group-hover:text-white
            sm:text-[10px]
          "
        >
          {text}
        </span>

        {/* SMALL RED ACCENT */}
        <span
          aria-hidden="true"
          className="
            h-[2px] w-4 rounded-full
            bg-red-500/60
            transition-[width,background-color]
            duration-200
            group-hover:w-7
            group-hover:bg-red-400
          "
        />
      </span>
    </div>
  );
}
