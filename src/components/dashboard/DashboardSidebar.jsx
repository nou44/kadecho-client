import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  FolderKanban,
  ShoppingCart,
  MessageSquare,
  Users,
  FileText,
  Settings,
  LogOut,
  X,
  ChevronRight,
  Plus,
  Archive,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function DashboardSidebar({
  onNavigate,
  mobile = false,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Products",
      path: "/dashboard/products",
      icon: Package,
    },
      {
    label: "Top Products",
    path: "/dashboard/top-products",
    icon: TrendingUp,
  },
    {
      label: "Projects",
      path: "/dashboard/projects",
      icon: FolderKanban,
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      label: "Messages",
      path: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      label: "Subscribers",
      path: "/dashboard/subscribers",
      icon: Users,
    },
  ];

  const invoiceNavigation = [
    {
      label: "Create Invoice",
      path: "/dashboard/invoices",
      icon: Plus,
      end: true,
    },
    {
      label: "Saved Invoices",
      path: "/dashboard/invoices/saved",
      icon: Archive,
    },
  ];

  const handleNavigation = () => {
    if (mobile && onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className="
        relative
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        bg-[#070707]
        text-white
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-red-600/[0.05]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-24
          h-64
          w-64
          rounded-full
          bg-red-600/[0.025]
          blur-3xl
        "
      />

{/* =====================================================
    PREMIUM SIDEBAR HEADER
===================================================== */}

<div
  className="
    relative
    flex
    h-[112px]
    shrink-0
    items-center
    justify-between
    overflow-hidden
    border-b
    border-white/[0.07]
    bg-[#080808]
    px-5
  "
>
  {/* =====================================================
      AMBIENT GLOW
  ===================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      -left-16
      -top-20
      h-40
      w-40
      rounded-full
      bg-red-600/[0.08]
      blur-[70px]
    "
  />

  <div
    className="
      pointer-events-none
      absolute
      -right-16
      top-1/2
      h-32
      w-32
      -translate-y-1/2
      rounded-full
      bg-red-500/[0.035]
      blur-[60px]
    "
  />

  {/* =====================================================
      TOP ACCENT
  ===================================================== */}

  <div
    className="
      absolute
      left-0
      top-0
      h-[2px]
      w-full
      bg-gradient-to-r
      from-red-600
      via-red-500/60
      to-transparent
    "
  />

  {/* =====================================================
      BRAND
  ===================================================== */}

  <div className="relative flex min-w-0 items-center gap-3">

    {/* LOGO */}

    <div
      className="
        group
        relative
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        border-white/[0.08]
        bg-black/40
        shadow-[0_10px_40px_rgba(0,0,0,.35)]
        transition-all
        duration-300
        hover:border-red-500/20
      "
    >

      {/* Logo glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-xl
          bg-red-500/[0.06]
          opacity-70
          blur-xl
          transition-all
          duration-500
          group-hover:bg-red-500/[0.12]
        "
      />

      {/* Logo image */}

      <img
        src="/logo1.png"
        alt="Kadecho"
        className="
          relative
          z-10
          h-10
          w-10
          object-contain
          transition-transform
          duration-500
          group-hover:scale-105
        "
      />

      {/* Tiny corner accent */}

      <span
        className="
          absolute
          bottom-0
          right-0
          h-2
          w-2
          rounded-tl-md
          bg-red-500
        "
      />
    </div>

    {/* BRAND TEXT */}

    <div className="min-w-0">

      <div className="flex items-center gap-2">

        <p
          className="
            font-bebas
            text-[25px]
            leading-none
            tracking-[0.08em]
            text-white
          "
        >
          KADE
          <span className="text-red-500">
            CHO
          </span>
        </p>

        {/* VERSION */}

        <span
          className="
            rounded-md
            border
            border-white/[0.06]
            bg-white/[0.025]
            px-1.5
            py-[3px]
            text-[6px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-zinc-600
          "
        >
          Admin
        </span>

      </div>

      {/* STATUS */}

      <div className="mt-1.5 flex items-center gap-2">

        <span className="relative flex h-1.5 w-1.5">

          <span
            className="
              absolute
              inline-flex
              h-full
              w-full
              animate-ping
              rounded-full
              bg-red-500/50
            "
          />

          <span
            className="
              relative
              inline-flex
              h-1.5
              w-1.5
              rounded-full
              bg-red-500
            "
          />

        </span>

        <p
          className="
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-zinc-600
          "
        >
          Control Center
        </p>

      </div>

    </div>
  </div>

  {/* =====================================================
      MOBILE CLOSE
  ===================================================== */}

  {mobile && (
    <button
      type="button"
      onClick={onNavigate}
      aria-label="Close dashboard menu"
      className="
        group
        relative
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        text-zinc-600
        shadow-lg
        transition-all
        duration-300
        hover:border-red-500/20
        hover:bg-red-500/[0.07]
        hover:text-red-400
      "
    >
      <X
        size={16}
        strokeWidth={1.8}
        className="
          transition-transform
          duration-300
          group-hover:rotate-90
        "
      />

      {/* Hover line */}

      <span
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-px
          w-0
          -translate-x-1/2
          bg-red-500
          transition-all
          duration-300
          group-hover:w-1/2
        "
      />
    </button>
  )}

  {/* =====================================================
      BOTTOM MICRO LINE
  ===================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      bottom-0
      left-5
      right-5
      h-px
      bg-gradient-to-r
      from-transparent
      via-white/[0.035]
      to-transparent
    "
  />
</div>



      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav
        className="
          relative
          flex-1
          overflow-y-auto
          px-3
          py-5
          scrollbar-none
        "
      >
        {/* Workspace label */}

        <div className="mb-3 px-3">
          <p
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-zinc-700
            "
          >
            Workspace
          </p>
        </div>

        {/* =====================================================
            MAIN NAVIGATION
        ===================================================== */}

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={handleNavigation}
                className={({ isActive }) => `
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-3
                  py-2.5
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        border-red-500/15
                        bg-red-500/[0.07]
                        text-white
                      `
                      : `
                        border-transparent
                        text-zinc-500
                        hover:border-white/[0.04]
                        hover:bg-white/[0.025]
                        hover:text-zinc-200
                      `
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}

                    <span
                      className={`
                        absolute
                        left-0
                        top-1/2
                        h-5
                        w-[2px]
                        -translate-y-1/2
                        rounded-full
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "bg-red-500 opacity-100"
                            : "bg-transparent opacity-0"
                        }
                      `}
                    />

                    {/* Icon */}

                    <span
                      className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              border-red-500/15
                              bg-red-500/[0.08]
                              text-red-400
                            `
                            : `
                              border-transparent
                              bg-white/[0.02]
                              text-zinc-600
                              group-hover:border-white/[0.05]
                              group-hover:bg-white/[0.035]
                              group-hover:text-zinc-300
                            `
                        }
                      `}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.8}
                        className="
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      />
                    </span>

                    {/* Label */}

                    <span
                      className="
                        min-w-0
                        flex-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                      "
                    >
                      {item.label}
                    </span>

                    {/* Arrow */}

                    <ChevronRight
                      size={13}
                      strokeWidth={1.7}
                      className={`
                        shrink-0
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              translate-x-0
                              text-red-400/70
                            `
                            : `
                              -translate-x-1
                              text-zinc-800
                              opacity-0
                              group-hover:translate-x-0
                              group-hover:text-zinc-600
                              group-hover:opacity-100
                            `
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* =====================================================
            INVOICES SECTION
        ===================================================== */}

        <div className="my-5 h-px bg-white/[0.05]" />

        <div className="mb-3 px-3">
          <p
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-zinc-700
            "
          >
            Finance
          </p>
        </div>

        {/* Invoice parent header */}

        <div
          className="
            mb-1
            flex
            items-center
            gap-3
            px-3
            py-2
          "
        >
          <span
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-red-500/10
              bg-red-500/[0.05]
              text-red-500/70
            "
          >
            <FileText
              size={15}
              strokeWidth={1.8}
            />
          </span>

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-zinc-400
            "
          >
            Invoices
          </span>
        </div>

        {/* Invoice children */}

        <div className="relative ml-4 space-y-1 border-l border-white/[0.06] pl-3">
          {invoiceNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={handleNavigation}
                className={({ isActive }) => `
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  border
                  px-3
                  py-2
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        border-red-500/15
                        bg-red-500/[0.07]
                        text-white
                      `
                      : `
                        border-transparent
                        text-zinc-600
                        hover:border-white/[0.04]
                        hover:bg-white/[0.025]
                        hover:text-zinc-300
                      `
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {/* Active line */}

                    <span
                      className={`
                        absolute
                        -left-[14px]
                        top-1/2
                        h-4
                        w-[2px]
                        -translate-y-1/2
                        rounded-full
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? "bg-red-500 opacity-100"
                            : "bg-transparent opacity-0"
                        }
                      `}
                    />

                    {/* Icon */}

                    <span
                      className={`
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              bg-red-500/[0.08]
                              text-red-400
                            `
                            : `
                              bg-white/[0.02]
                              text-zinc-700
                              group-hover:text-zinc-400
                            `
                        }
                      `}
                    >
                      <Icon
                        size={13}
                        strokeWidth={1.8}
                      />
                    </span>

                    {/* Label */}

                    <span
                      className="
                        min-w-0
                        flex-1
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.1em]
                      "
                    >
                      {item.label}
                    </span>

                    <ChevronRight
                      size={11}
                      className={`
                        transition-all
                        duration-300

                        ${
                          isActive
                            ? `
                              text-red-400/60
                              translate-x-0
                            `
                            : `
                              text-zinc-800
                              -translate-x-1
                              opacity-0
                              group-hover:translate-x-0
                              group-hover:opacity-100
                            `
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM DIVIDER
        ===================================================== */}

        <div className="my-5 h-px bg-white/[0.05]" />

        {/* =====================================================
            SETTINGS
        ===================================================== */}

        <div className="space-y-1">
          <NavLink
            to="/dashboard/settings"
            onClick={handleNavigation}
            className={({ isActive }) => `
              group
              relative
              flex
              items-center
              gap-3
              rounded-xl
              border
              px-3
              py-2.5
              transition-all
              duration-300

              ${
                isActive
                  ? `
                    border-red-500/15
                    bg-red-500/[0.07]
                    text-white
                  `
                  : `
                    border-transparent
                    text-zinc-500
                    hover:border-white/[0.04]
                    hover:bg-white/[0.025]
                    hover:text-zinc-200
                  `
              }
            `}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`
                    absolute
                    left-0
                    top-1/2
                    h-5
                    w-[2px]
                    -translate-y-1/2
                    rounded-full

                    ${
                      isActive
                        ? "bg-red-500"
                        : "bg-transparent"
                    }
                  `}
                />

                <span
                  className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border

                    ${
                      isActive
                        ? `
                          border-red-500/15
                          bg-red-500/[0.08]
                          text-red-400
                        `
                        : `
                          border-transparent
                          bg-white/[0.02]
                          text-zinc-600
                          group-hover:text-zinc-300
                        `
                    }
                  `}
                >
                  <Settings
                    size={15}
                    strokeWidth={1.8}
                  />
                </span>

                <span
                  className="
                    min-w-0
                    flex-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                  "
                >
                  Settings
                </span>

                <ChevronRight
                  size={13}
                  className={`
                    transition-all

                    ${
                      isActive
                        ? "text-red-400/70"
                        : "text-zinc-800 opacity-0 group-hover:opacity-100"
                    }
                  `}
                />
              </>
            )}
          </NavLink>
        </div>

        {/* =====================================================
            WORKSPACE STATUS
        ===================================================== */}

        <div
          className="
            mt-5
            rounded-xl
            border
            border-white/[0.05]
            bg-white/[0.015]
            p-3
          "
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-emerald-500/50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                "
              />
            </span>

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-zinc-500
              "
            >
              System Online
            </span>
          </div>

          <p
            className="
              mt-2
              text-[9px]
              leading-4
              text-zinc-700
            "
          >
            All dashboard services are operational.
          </p>
        </div>
      </nav>

      {/* =====================================================
          FOOTER / LOGOUT
      ===================================================== */}

      <div
        className="
          relative
          shrink-0
          border-t
          border-white/[0.07]
          p-3
        "
      >
        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            border
            border-transparent
            px-3
            py-2.5
            text-left
            transition-all
            duration-300
            hover:border-red-500/15
            hover:bg-red-500/[0.05]
          "
        >
          <span
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-red-500/10
              bg-red-500/[0.04]
              text-red-500/70
              transition-all
              duration-300
              group-hover:border-red-500/20
              group-hover:bg-red-500/[0.08]
              group-hover:text-red-400
            "
          >
            <LogOut
              size={15}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-300
                group-hover:-translate-x-0.5
              "
            />
          </span>

          <div className="min-w-0 flex-1">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-zinc-500
                transition-colors
                group-hover:text-red-400
              "
            >
              Logout
            </p>

            <p className="mt-0.5 text-[8px] text-zinc-700">
              Sign out of dashboard
            </p>
          </div>

          <ChevronRight
            size={13}
            className="
              text-zinc-800
              transition-all
              duration-300
              group-hover:translate-x-0.5
              group-hover:text-red-500/60
            "
          />
        </button>
      </div>
    </aside>
  );
}