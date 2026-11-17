
import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserButton() {
  return (
    <Link
      to="/login"
      aria-label="Accéder à votre compte"
      title="Mon compte"
      className="
        group relative flex h-10 w-10
        shrink-0 items-center justify-center
        rounded-xl

        border border-white/10
        bg-white/[0.035]
        text-zinc-300

        transition-[background-color,border-color,color,transform]
        duration-200

        hover:border-red-500/35
        hover:bg-red-500/[0.08]
        hover:text-white

        active:scale-[0.96]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-red-500/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#090909]
      "
    >
      {/* SUBTLE BOTTOM ACCENT */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          inset-x-2 bottom-0 h-px
          bg-gradient-to-r
          from-transparent via-red-500/70 to-transparent
          opacity-0
          transition-opacity duration-200
          group-hover:opacity-100
        "
      />

      <UserRound
        size={18}
        strokeWidth={1.8}
        aria-hidden="true"
        className="
          relative z-10
          transition-transform duration-200
          group-hover:-translate-y-[1px]
        "
      />
    </Link>
  );
}
