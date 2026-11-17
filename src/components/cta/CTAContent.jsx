
import { Sparkles } from "lucide-react";

const STATS = [
  { value: "250+", label: "Projects" },
  { value: "100%", label: "Custom Built" },
  { value: "6+", label: "Years Experience" },
];

export default function CTAContent() {
  return (
    <>
      {/* BADGE */}
      <div
        className="
          inline-flex items-center gap-2
          rounded-full border border-red-500/25
          bg-red-500/[0.09]
          px-3 py-1.5
        "
      >
        <Sparkles
          size={12}
          className="text-red-400"
          aria-hidden="true"
        />

        <span
          className="
            font-bebas text-[10px]
            uppercase tracking-[0.2em]
            text-red-300
          "
        >
          Let's Build Together
        </span>
      </div>

      {/* TITLE */}
      <h2
        id="cta-heading"
        className="
          mt-4 font-bebas
          text-[34px] leading-[0.96]
          uppercase tracking-[0.055em]
          text-white
          sm:text-[42px]
          lg:text-[48px]
        "
      >
        Crafted For
        <span
          className="
            mt-1 block
            bg-gradient-to-r
            from-white via-red-400 to-red-600
            bg-clip-text text-transparent
          "
        >
          Extraordinary Spaces
        </span>
      </h2>

      {/* ACCENT */}
      <div
        aria-hidden="true"
        className="
          mt-4 h-px w-14
          bg-gradient-to-r
          from-transparent via-red-500
          to-transparent
        "
      />

      {/* DESCRIPTION */}
      <p
        className="
          mx-auto mt-4 max-w-[510px]
          font-satoshi text-[11px]
          leading-[1.85] text-zinc-300/80
          sm:text-[12px]
        "
      >
        From your first idea to the final detail,
        we bring extraordinary spaces to life
        through bespoke metalwork, premium materials
        and precision craftsmanship.
      </p>

      {/* STATS */}
      <div
        className="
          mt-6 grid w-full max-w-[440px]
          grid-cols-3 gap-2
          border-y border-white/[0.10]
          py-4
          sm:mt-7
        "
      >
        {STATS.map((item, index) => (
          <div
            key={item.label}
            className={`
              text-center
              ${index > 0
                ? "border-l border-white/[0.10]"
                : ""}
            `}
          >
            <div
              className="
                font-bebas text-[23px]
                leading-none tracking-[0.04em]
                text-white sm:text-[26px]
              "
            >
              {item.value}
            </div>

            <p
              className="
                mt-1.5 font-satoshi
                text-[8px] uppercase
                tracking-[0.10em]
                text-zinc-400
                sm:text-[9px]
              "
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
