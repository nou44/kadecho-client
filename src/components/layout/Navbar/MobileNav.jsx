
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { navigation } from "../../../constants/navigation";
import SearchButton from "./SearchButton";

const EASE = [0.22, 1, 0.36, 1];

const menuVariants = {
  hidden: {
    opacity: 0,
    x: 18,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.14,
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    x: 15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.38,
      ease: EASE,
    },
  },
};

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = Array.from(
        drawer.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getClientRects().length > 0);

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const drawer = (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.25,
            }}
            onClick={closeMenu}
            className="fixed inset-0 z-[1000] bg-black/75 backdrop-blur-[3px]"
          />

          {/* DRAWER */}
          <motion.aside
            key="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { x: "100%", opacity: 0.9 }
            }
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { x: "100%", opacity: 0.9 }
            }
            transition={{
              duration: reduceMotion ? 0.01 : 0.46,
              ease: EASE,
            }}
            className="
              fixed inset-y-0 right-0 z-[1001]
              flex h-[100dvh] w-full max-w-[360px]
              flex-col overflow-hidden
              border-l border-white/10
              bg-[#090909] text-white
              shadow-[-25px_0_80px_rgba(0,0,0,.6)]
              will-change-transform
            "
          >
            {/* BACKGROUND DECORATION */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div
                className="
                  absolute -right-24 -top-28
                  h-64 w-64 rounded-full
                  bg-red-600/[0.12] blur-[80px]
                "
              />

              <div
                className="
                  absolute -bottom-32 -left-32
                  h-72 w-72 rounded-full
                  bg-red-700/[0.06] blur-[90px]
                "
              />

              <div
                className="
                  absolute inset-0 opacity-[0.025]
                  bg-[linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
                  bg-[size:34px_34px]
                "
              />
            </div>

            {/* ANIMATED TOP ACCENT */}
            <div className="absolute inset-x-0 top-0 z-20 h-[2px] overflow-hidden">
              <motion.span
                aria-hidden="true"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: reduceMotion ? 0 : 2.8,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "linear",
                }}
                className="
                  block h-full w-full
                  bg-gradient-to-r
                  from-transparent via-red-500 to-transparent
                "
              />
            </div>

            {/* HEADER */}
            <div
              className="
                relative z-10 flex h-[70px] shrink-0
                items-center justify-between
                border-b border-white/[0.07] px-5
              "
            >
              <motion.div
                initial={
                  reduceMotion ? false : { opacity: 0, x: -12 }
                }
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.12,
                }}
                className="flex items-center gap-3"
              >
                <div
                  className="
                    relative flex h-11 w-11
                    items-center justify-center
                    rounded-xl border border-red-500/15
                    bg-white/[0.035]
                  "
                >
                  <img
                    src="/kadecho-logo-64.webp"
                    alt="KADECHO"
                    width="40"
                    height="40"
                    className="relative z-10 h-10 w-10 object-contain"
                  />

                  <span className="pointer-events-none absolute inset-0 rounded-xl bg-red-500/[0.05]" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bebas text-[17px] leading-none tracking-[0.12em]">
                    KADECHO
                  </span>

                  <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-red-400">
                    Luxury Metal Studio
                  </span>
                </div>
              </motion.div>

              <motion.button
                type="button"
                onClick={closeMenu}
                aria-label="Fermer le menu"
                whileHover={reduceMotion ? undefined : { rotate: 90 }}
                whileTap={reduceMotion ? undefined : { scale: 0.9 }}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl border border-white/10
                  bg-white/[0.04] text-zinc-400
                  transition-colors duration-200
                  hover:border-red-500/30
                  hover:bg-red-500/[0.08]
                  hover:text-white
                "
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="mb-3 flex items-center gap-3"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Navigation
                </span>

                <span className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent" />
              </motion.div>

              {/* ANIMATED LINKS */}
              <motion.nav
                aria-label="Navigation mobile"
                variants={reduceMotion ? undefined : menuVariants}
                initial={reduceMotion ? false : "hidden"}
                animate={reduceMotion ? undefined : "visible"}
              >
                <ul className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.li
                      key={item.id}
                      variants={reduceMotion ? undefined : linkVariants}
                    >
                      <NavLink
                        to={item.path}
                        onClick={closeMenu}
                        className={({ isActive }) => `
                          group relative flex min-h-[47px]
                          items-center justify-between
                          overflow-hidden rounded-xl border px-3.5
                          transition-[background-color,border-color,color]
                          duration-200
                          ${
                            isActive
                              ? "border-red-500/25 bg-red-500/[0.09] text-white"
                              : "border-transparent text-zinc-400 hover:border-white/[0.08] hover:bg-white/[0.045] hover:text-white"
                          }
                        `}
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <motion.span
                                layoutId="mobile-nav-active"
                                transition={{
                                  type: "spring",
                                  stiffness: 320,
                                  damping: 30,
                                }}
                                className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-red-500"
                              />
                            )}

                            <div className="relative flex items-center gap-3">
                              <span
                                className={`
                                  font-bebas text-[11px]
                                  tracking-[0.12em]
                                  ${
                                    isActive
                                      ? "text-red-400"
                                      : "text-zinc-600"
                                  }
                                `}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span className="text-[12px] font-semibold uppercase tracking-[0.1em]">
                                {item.label}
                              </span>
                            </div>

                            <ArrowUpRight
                              size={15}
                              className={
                                isActive
                                  ? "relative text-red-400"
                                  : "relative text-zinc-600 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-400"
                              }
                            />
                          </>
                        )}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              {/* SEARCH */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.42,
                }}
                className="
                  mt-6 rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.025] p-3.5
                "
              >
                <div className="mb-3 flex items-center gap-2">
                  <Search size={14} className="text-red-400" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    Quick Search
                  </span>
                </div>

                <SearchButton />
              </motion.div>

              {/* CONTACT */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5,
                }}
                className="mt-6 border-t border-white/[0.07] pt-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Contact
                  </span>
                  <span className="h-px flex-1 bg-white/[0.07]" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                    <MapPin size={15} className="shrink-0 text-red-400" />
                    <span>Meknas, Agourai, Morocco</span>
                  </div>

                  <a
                    href="mailto:contact@kadecho.com"
                    className="group flex items-center gap-3 text-[11px] text-zinc-400 transition-colors hover:text-white"
                  >
                    <Mail
                      size={15}
                      className="shrink-0 text-red-400 transition-transform group-hover:scale-110"
                    />
                    <span>contact@kadecho.com</span>
                  </a>

                  <a
                    href="tel:+212658551365"
                    className="group flex items-center gap-3 text-[11px] text-zinc-400 transition-colors hover:text-white"
                  >
                    <Phone
                      size={15}
                      className="shrink-0 text-red-400 transition-transform group-hover:scale-110"
                    />
                    <span>+212 6 58 55 13 65</span>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* FOOTER CTA */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.48,
              }}
              className="
                relative z-10 shrink-0
                border-t border-white/[0.07]
                bg-[#0b0b0b] p-4
              "
            >
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className="
                  group relative flex min-h-[45px] w-full
                  items-center justify-center gap-2
                  overflow-hidden rounded-xl
                  bg-red-600
                  text-[11px] font-semibold
                  uppercase tracking-[0.12em]
                  text-white
                  shadow-[0_8px_24px_rgba(220,38,38,0.18)]
                  transition-[background-color,box-shadow]
                  duration-300
                  hover:bg-red-500
                  hover:shadow-[0_10px_30px_rgba(220,38,38,0.28)]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute inset-y-0
                    -left-16 w-16 skew-x-[-20deg]
                    bg-gradient-to-r
                    from-transparent via-white/20 to-transparent
                    transition-transform duration-700
                    group-hover:translate-x-[450px]
                  "
                />

                <span className="relative z-10">
                  Start Your Project
                </span>

                <ArrowUpRight
                  size={16}
                  className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </NavLink>

              <p className="mt-2 text-center text-[9px] uppercase tracking-[0.12em] text-zinc-600">
                Custom Metal • Premium Craftsmanship
              </p>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* MENU TRIGGER */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        whileTap={reduceMotion ? undefined : { scale: 0.93 }}
        className="
          group relative flex h-10 w-10
          items-center justify-center
          overflow-hidden rounded-xl
          border border-white/10
          bg-white/[0.035] text-zinc-300
          transition-colors duration-200
          hover:border-red-500/35
          hover:bg-red-500/[0.08]
          hover:text-white
          lg:hidden
        "
      >
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-br
            from-red-500/[0.12] to-transparent
            opacity-0 transition-opacity duration-200
            group-hover:opacity-100
          "
        />

        <Menu
          size={19}
          strokeWidth={1.8}
          className="relative z-10"
        />
      </motion.button>

      {typeof document !== "undefined" &&
        createPortal(drawer, document.body)}
    </>
  );
}
