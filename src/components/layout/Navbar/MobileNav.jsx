import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X, Search, ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { navigation } from "../../../constants/navigation";
import NavLinkItem from "./NavLinkItem";
import SearchButton from "./SearchButton";

export default function MobileNav() {
   const [open, setOpen] = useState(false);

  const location = useLocation();

  const closeMenu = () => {
    setOpen(false);
  };

  // Close mobile drawer whenever route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <>
      {/* ================= MENU BUTTON ================= */}

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="
          relative
          lg:hidden

          flex
          h-11
          w-11

          items-center
          justify-center

          overflow-hidden
          rounded-xl

          border
          border-white/10

          bg-white/[0.035]

          text-zinc-300

          backdrop-blur-xl

          transition-all
          duration-300

          hover:border-red-500/40
          hover:bg-red-500/10
          hover:text-white

          hover:shadow-[0_0_30px_rgba(239,68,68,.20)]
        "
      >
        <span
          className="
            absolute
            inset-0

            bg-gradient-to-br
            from-red-500/10
            via-transparent
            to-transparent

            opacity-0
            transition-opacity
            duration-300

            hover:opacity-100
          "
        />

        <Menu
          size={20}
          strokeWidth={1.8}
          className="relative z-10"
        />
      </motion.button>

      {/* ================= DRAWER ================= */}

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="
                fixed
                inset-0
                z-[60]

                bg-black/80

                backdrop-blur-md
              "
            />

            {/* Drawer */}

            <motion.aside
              initial={{
                x: "100%",
                opacity: 0.7,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: "100%",
                opacity: 0.7,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed

                right-0
                top-0

                z-[70]

                flex
                h-[100dvh]

                w-full
                max-w-[390px]

                flex-col

                overflow-hidden

                border-l
                border-white/10

                bg-[#070707]

                shadow-[-30px_0_100px_rgba(0,0,0,.65)]
              "
            >

              {/* ================= AMBIENT BACKGROUND ================= */}

              <div className="pointer-events-none absolute inset-0 overflow-hidden">

                {/* Top glow */}

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.12, 0.2, 0.12],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    -right-28
                    -top-24

                    h-72
                    w-72

                    rounded-full

                    bg-red-600/20

                    blur-[110px]
                  "
                />

                {/* Bottom glow */}

                <div
                  className="
                    absolute
                    -bottom-32
                    -left-32

                    h-80
                    w-80

                    rounded-full

                    bg-red-700/10

                    blur-[120px]
                  "
                />

                {/* Grid */}

                <div
                  className="
                    absolute
                    inset-0

                    opacity-[0.025]

                    bg-[linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]

                    bg-[size:32px_32px]
                  "
                />
              </div>

              {/* ================= TOP LINE ================= */}

              <motion.div
                animate={{
                  backgroundPosition: [
                    "0% 50%",
                    "100% 50%",
                    "0% 50%",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  left-0
                  top-0

                  z-20

                  h-[2px]
                  w-full

                  bg-gradient-to-r
                  from-transparent
                  via-red-500
                  to-transparent

                  bg-[length:200%_100%]
                "
              />

              {/* ================= HEADER ================= */}

              <div
                className="
                  relative
                  z-10

                  flex
                  h-[82px]

                  shrink-0

                  items-center
                  justify-between

                  border-b
                  border-white/[0.07]

                  px-5
                "
              >

                {/* Brand */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.15,
                    duration: 0.4,
                  }}
                  className="flex items-center gap-3"
                >

                  {/* Logo */}

                  <div
                    className="
                      relative

                      flex
                      h-12
                      w-12

                      items-center
                      justify-center

                      overflow-hidden

                      rounded-xl

                      border
                      border-white/10

                      bg-white/[0.035]

                      shadow-[0_8px_30px_rgba(0,0,0,.35)]
                    "
                  >
                    <div
                      className="
                        absolute
                        inset-0

                        bg-red-500/10

                        blur-xl
                      "
                    />

                    <img
                      src="/logo1.png"
                      alt="KADECHO"
                      className="
                        relative
                        z-10

                        h-10
                        w-10

                        object-contain
                      "
                    />
                  </div>

                  {/* Brand text */}

                  <div className="flex flex-col">

                    <span
                      className="
                        font-bebas

                        text-[16px]

                        leading-none

                        tracking-[.12em]

                        text-white
                      "
                    >
                      KADECHO
                    </span>

                    <div className="mt-1.5 flex items-center gap-1.5">

                      <span
                        className="
                          h-1.5
                          w-1.5

                          rounded-full

                          bg-red-500

                          shadow-[0_0_8px_rgba(239,68,68,.8)]

                          animate-pulse
                        "
                      />

                      <span
                        className="
                          font-bebas

                          text-[8px]

                          uppercase

                          tracking-[.22em]

                          text-zinc-500
                        "
                      >
                        Luxury Metal Studio
                      </span>

                    </div>

                  </div>

                </motion.div>

                {/* Close */}

                <motion.button
                  whileHover={{
                    rotate: 90,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="
                    flex
                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-xl

                    border
                    border-white/10

                    bg-white/[0.03]

                    text-zinc-400

                    transition-all
                    duration-300

                    hover:border-red-500/40
                    hover:bg-red-500/10
                    hover:text-white
                  "
                >
                  <X size={19} strokeWidth={1.8} />
                </motion.button>

              </div>

              {/* ================= CONTENT ================= */}

              <div
                className="
                  relative
                  z-10

                  flex-1

                  overflow-y-auto

                  px-5
                  py-6

                  scrollbar-thin
                  scrollbar-track-transparent
                  scrollbar-thumb-white/10
                "
              >

                {/* Navigation label */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.25,
                  }}
                  className="
                    mb-3

                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      font-bebas

                      text-[10px]

                      uppercase

                      tracking-[.30em]

                      text-zinc-500
                    "
                  >
                    Navigation
                  </span>

                  <span
                    className="
                      h-px
                      w-16

                      bg-gradient-to-r
                      from-red-500/50
                      to-transparent
                    "
                  />

                </motion.div>

                {/* ================= NAV ================= */}

                <nav className="flex flex-col gap-1.5">

                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.3 + index * 0.06,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <NavLinkItem
                        to={item.path}
                        label={item.label}
                        mobile
                        onClick={closeMenu}
                      />
                    </motion.div>
                  ))}

                </nav>

                {/* ================= QUICK ACTION ================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.55,
                    duration: 0.45,
                  }}
                  className="
                    mt-7

                    rounded-2xl

                    border
                    border-white/[0.07]

                    bg-white/[0.025]

                    p-4
                  "
                >

                  <div className="mb-3 flex items-center justify-between">

                    <span
                      className="
                        font-bebas

                        text-[10px]

                        uppercase

                        tracking-[.28em]

                        text-zinc-500
                      "
                    >
                      Quick Actions
                    </span>

                    <Search
                      size={14}
                      className="text-red-500"
                    />

                  </div>

                  <SearchButton />

                </motion.div>

                {/* ================= CONTACT ================= */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.65,
                    duration: 0.45,
                  }}
                  className="
                    mt-6

                    border-t
                    border-white/[0.07]

                    pt-6
                  "
                >

                  <div className="mb-4 flex items-center justify-between">

                    <span
                      className="
                        font-bebas

                        text-[10px]

                        uppercase

                        tracking-[.30em]

                        text-zinc-500
                      "
                    >
                      Contact
                    </span>

                    <span className="h-px w-14 bg-white/10" />

                  </div>

                  <div className="space-y-3">

                    {/* Location */}

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-8
                          w-8

                          shrink-0

                          items-center
                          justify-center

                          rounded-lg

                          bg-red-500/10

                          text-red-400
                        "
                      >
                        <MapPin size={14} />
                      </div>

                      <span className="text-xs text-zinc-400">
                        Tangier, Morocco
                      </span>

                    </div>

                    {/* Email */}

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-8
                          w-8

                          shrink-0

                          items-center
                          justify-center

                          rounded-lg

                          bg-red-500/10

                          text-red-400
                        "
                      >
                        <Mail size={14} />
                      </div>

                      <span className="text-xs text-zinc-400">
                        contact@kadecho.com
                      </span>

                    </div>

                    {/* Phone */}

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-8
                          w-8

                          shrink-0

                          items-center
                          justify-center

                          rounded-lg

                          bg-red-500/10

                          text-red-400
                        "
                      >
                        <Phone size={14} />
                      </div>

                      <span className="text-xs text-zinc-400">
                        +212 6 XX XX XX XX
                      </span>

                    </div>

                  </div>

                </motion.div>

              </div>

              {/* ================= FOOTER CTA ================= */}

              <div
                className="
                  relative
                  z-10

                  shrink-0

                  border-t
                  border-white/[0.07]

                  bg-[#070707]/90

                  p-5

                  backdrop-blur-xl
                "
              >

                <motion.button
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={closeMenu}
                  className="
                    group

                    relative

                    flex
                    w-full

                    items-center
                    justify-center

                    gap-3

                    overflow-hidden

                    rounded-xl

                    bg-red-600

                    py-3.5

                    font-bebas

                    text-[13px]

                    uppercase

                    tracking-[.22em]

                    text-white

                    shadow-[0_10px_35px_rgba(239,68,68,.20)]

                    transition-all
                    duration-300

                    hover:bg-red-500
                    hover:shadow-[0_15px_45px_rgba(239,68,68,.32)]
                  "
                >

                  {/* Shine */}

                  <span
                    className="
                      absolute
                      inset-y-0
                      left-0

                      w-20

                      -translate-x-full

                      skew-x-[-20deg]

                      bg-white/20

                      transition-transform
                      duration-700

                      group-hover:translate-x-[500%]
                    "
                  />

                  <span className="relative z-10">
                    Start Your Project
                  </span>

                  <ArrowRight
                    size={16}
                    className="
                      relative
                      z-10

                      transition-transform
                      duration-300

                      group-hover:translate-x-1
                    "
                  />

                </motion.button>

                <p
                  className="
                    mt-2

                    text-center

                    font-bebas

                    text-[8px]

                    uppercase

                    tracking-[.25em]

                    text-zinc-600
                  "
                >
                  Custom Metal • Premium Craftsmanship
                </p>

              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}