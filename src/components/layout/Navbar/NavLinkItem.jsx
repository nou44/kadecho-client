
import { NavLink } from "react-router-dom";

export default function NavLinkItem({
  to,
  label,
  icon: Icon,
  mobile = false,
  onClick,
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        group relative flex items-center
        transition-colors duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-red-500/70

        ${
          mobile
            ? `
              min-h-11 w-full gap-3
              rounded-lg px-3.5 py-3
              ${
                isActive
                  ? "bg-red-500/[0.09] text-white"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
              }
            `
            : `
              h-10 shrink-0
              justify-center px-0.5
              ${
                isActive
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-100"
              }
            `
        }
      `}
    >
      {({ isActive }) => (
        <>
          {mobile && Icon && (
            <span
              className={`
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-md
                ${
                  isActive
                    ? "bg-red-500/15"
                    : "bg-white/[0.04]"
                }
              `}
            >
              <Icon
                size={16}
                strokeWidth={1.8}
                className="text-red-400"
              />
            </span>
          )}

          <span
            className={`
              relative whitespace-nowrap
              font-semibold uppercase
              transition-colors duration-200

              ${
                mobile
                  ? "text-[12px] tracking-[0.1em]"
                  : "text-[11px] tracking-[0.13em] xl:text-[11.5px]"
              }
            `}
          >
            {label}

            {!mobile && (
              <span
                aria-hidden="true"
                className={`
                  absolute -bottom-[9px]
                  left-1/2 h-[2px]
                  -translate-x-1/2
                  rounded-full bg-red-500
                  transition-[width,opacity]
                  duration-200

                  ${
                    isActive
                      ? "w-5 opacity-100"
                      : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                  }
                `}
              />
            )}
          </span>

          {mobile && isActive && (
            <span
              aria-hidden="true"
              className="
                ml-auto h-1.5 w-1.5
                rounded-full bg-red-500
              "
            />
          )}
        </>
      )}
    </NavLink>
  );
}
