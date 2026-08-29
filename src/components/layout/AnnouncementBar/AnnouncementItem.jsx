export default function AnnouncementItem({ icon: Icon, text }) {
  return (
    <div
      className="
        group

        flex
        items-center
        gap-2.5

        whitespace-nowrap

        text-[11px]
        font-medium

        uppercase
        tracking-[0.12em]

        text-zinc-400

        transition-all
        duration-300

        hover:text-white
      "
    >
      {/* Icon */}
      <span
        className="
          flex
          items-center
          justify-center

          transition-transform
          duration-300

          group-hover:scale-110
        "
      >
        <Icon
          size={14}
          strokeWidth={1.8}
          className="
            shrink-0

            text-red-500

            transition-all
            duration-300

            group-hover:text-red-400
            group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,.5)]
          "
        />
      </span>

      {/* Text */}
      <span
        className="
          leading-none

          transition-colors
          duration-300

          group-hover:text-zinc-200
        "
      >
        {text}
      </span>
    </div>
  );
}