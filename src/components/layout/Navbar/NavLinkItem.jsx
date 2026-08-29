import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavLinkItem({
  to,
  label,
  icon: Icon,
  mobile = false,
  onClick,
}) {
  return (
    <NavLink to={to} onClick={onClick}>
      {({ isActive }) => (
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className={`
            group
            relative
            flex
            items-center
            gap-3
            transition-all
            duration-300

            ${
              mobile
                ? "w-full rounded-xl px-4 py-3 hover:bg-zinc-900"
                : "py-2"
            }

            ${
              isActive
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }
          `}
        >
          {mobile && Icon && (
            <Icon
              size={18}
              className="text-red-500"
            />
          )}

          <span
  className={`
    relative
    text-[13px]
    xl:text-[13.5px]
    font-semibold
    uppercase
    tracking-[0.14em]
    transition-colors
    duration-300
  `}
>
            {label}

            {!mobile && (
              <span
                className={`
                  absolute
                  -bottom-2
                  left-0
                  h-[2px]
                  rounded-full
                  bg-red-500
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }
                `}
              />
            )}
          </span>
        </motion.div>
      )}
    </NavLink>
  );
}