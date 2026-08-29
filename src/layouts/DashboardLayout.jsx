import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="min-h-screen">

        {/* =====================================================
            DESKTOP SIDEBAR
        ===================================================== */}

        <aside
          className="
            fixed
            inset-y-0
            left-0
            z-50

            hidden
            w-[280px]

            border-r
            border-white/[0.08]

            bg-[#080808]

            lg:block
          "
        >
          <DashboardSidebar />
        </aside>


        {/* =====================================================
            MOBILE OVERLAY
        ===================================================== */}

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeSidebar}
              className="
                fixed
                inset-0
                z-40

                bg-black/70
                backdrop-blur-sm

                lg:hidden
              "
            />
          )}
        </AnimatePresence>


        {/* =====================================================
            MOBILE SIDEBAR
        ===================================================== */}

        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                inset-y-0
                left-0
                z-50

                w-[280px]
                max-w-[85vw]

                border-r
                border-white/[0.08]

                bg-[#080808]

                lg:hidden
              "
            >
              <DashboardSidebar
                onNavigate={closeSidebar}
                mobile
              />
            </motion.aside>
          )}
        </AnimatePresence>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main
          className="
            min-h-screen
            min-w-0

            bg-[#050505]

            ml-0

            px-4
            py-4

            sm:px-5
            sm:py-5

            lg:ml-[280px]
            lg:px-8
            lg:py-8
          "
        >

          {/* =================================================
              MOBILE HEADER
          ================================================= */}

          <div
            className="
              mb-5

              flex
              items-center
              justify-between

              lg:hidden
            "
          >

            {/* LOGO */}

            <div>
              <p
                className="
                  font-bebas
                  text-2xl
                  tracking-[0.08em]
                  text-white
                "
              >
                KADE
                <span className="text-red-500">
                  CHO
                </span>
              </p>

              <p
                className="
                  mt-0.5
                  text-[7px]
                  uppercase
                  tracking-[0.28em]
                  text-zinc-600
                "
              >
                Admin Panel
              </p>
            </div>


            {/* MENU BUTTON */}

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center

                rounded-xl

                border
                border-white/[0.08]

                bg-[#0b0b0b]

                text-zinc-400

                transition-all
                duration-300

                hover:border-red-500/30
                hover:bg-red-500/[0.06]
                hover:text-red-400
              "
              aria-label="Open dashboard menu"
            >
              <Menu
                size={20}
                strokeWidth={1.8}
              />
            </button>

          </div>


          {/* =================================================
              PAGE CONTENT
          ================================================= */}

          <Outlet />

        </main>

      </div>
    </div>
  );
}