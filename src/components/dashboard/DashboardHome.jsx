
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  MessageSquare,
  FolderKanban,
  FileText,
  Trophy,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnalyticsChart from "./AnalyticsChart";

export default function DashboardHome() {
  // =====================================================
  // STATES
  // =====================================================

  const [productsCount, setProductsCount] = useState(0);
  const [productsLoading, setProductsLoading] = useState(true);

  const [ordersCount, setOrdersCount] = useState(0);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [messagesCount, setMessagesCount] = useState(0);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const [projectsCount, setProjectsCount] = useState(0);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [invoicesCount, setInvoicesCount] = useState(0);
  const [invoicesLoading, setInvoicesLoading] = useState(true);

  const [topProductsCount, setTopProductsCount] = useState(0);
  const [topProductsLoading, setTopProductsLoading] =
    useState(true);

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch products"
          );
        }

        setProductsCount(
          result.count ??
            result.products?.length ??
            result.data?.length ??
            0
        );
      } catch (error) {
        console.error(
          "FETCH PRODUCTS COUNT ERROR:",
          error
        );
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProductsCount();
  }, []);

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch orders"
          );
        }

        setOrdersCount(
          result.count ??
            result.orders?.length ??
            result.data?.length ??
            0
        );
      } catch (error) {
        console.error(
          "FETCH ORDERS COUNT ERROR:",
          error
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrdersCount();
  }, []);

  // =====================================================
  // FETCH MESSAGES
  // =====================================================

  useEffect(() => {
    const fetchMessagesCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/contact"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch messages"
          );
        }

        setMessagesCount(
          result.count ??
            result.messages?.length ??
            result.data?.length ??
            0
        );
      } catch (error) {
        console.error(
          "FETCH MESSAGES COUNT ERROR:",
          error
        );
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchMessagesCount();
  }, []);

  // =====================================================
  // FETCH PROJECTS
  // =====================================================

  useEffect(() => {
    const fetchProjectsCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/projects"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch projects"
          );
        }

        setProjectsCount(
          result.projects?.length ??
            result.data?.length ??
            result.count ??
            0
        );
      } catch (error) {
        console.error(
          "FETCH PROJECTS COUNT ERROR:",
          error
        );

        setProjectsCount(0);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjectsCount();
  }, []);

  // =====================================================
  // FETCH INVOICES
  // =====================================================

  useEffect(() => {
    const fetchInvoicesCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/invoices"
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch invoices"
          );
        }

        setInvoicesCount(
          result.invoices?.length ??
            result.data?.length ??
            result.count ??
            0
        );
      } catch (error) {
        console.error(
          "FETCH INVOICES COUNT ERROR:",
          error
        );

        setInvoicesCount(0);
      } finally {
        setInvoicesLoading(false);
      }
    };

    fetchInvoicesCount();
  }, []);

  // =====================================================
  // FETCH TOP PRODUCTS
  // =====================================================

  useEffect(() => {
    const fetchTopProductsCount = async () => {
      try {
        const response = await fetch(
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/top-products`
);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch top products"
          );
        }

        setTopProductsCount(
          result.products?.length ??
            result.data?.length ??
            result.count ??
            0
        );
      } catch (error) {
        console.error(
          "FETCH TOP PRODUCTS COUNT ERROR:",
          error
        );

        setTopProductsCount(0);
      } finally {
        setTopProductsLoading(false);
      }
    };

    fetchTopProductsCount();
  }, []);

  // =====================================================
  // STATS
  // =====================================================

  const stats = [
    {
      label: "Products",
      value: productsLoading ? "—" : productsCount,
      icon: Package,
      path: "/dashboard/products",
    },
    {
      label: "Orders",
      value: ordersLoading ? "—" : ordersCount,
      icon: ShoppingCart,
      path: "/dashboard/orders",
    },
    {
      label: "Messages",
      value: messagesLoading ? "—" : messagesCount,
      icon: MessageSquare,
      path: "/dashboard/messages",
    },
    {
      label: "Projects",
      value: projectsLoading ? "—" : projectsCount,
      icon: FolderKanban,
      path: "/dashboard/projects",
    },
    {
      label: "Invoices",
      value: invoicesLoading ? "—" : invoicesCount,
      icon: FileText,
      path: "/dashboard/invoices",
    },
    {
      label: "Top Products",
      value: topProductsLoading
        ? "—"
        : topProductsCount,
      icon: Trophy,
      path: "/dashboard/top-products",
    },
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-5">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#090909]
          px-5
          py-5
          sm:px-6
          sm:py-6
        "
      >
        {/* TOP LINE */}

        <div
          className="
            absolute
            left-0
            top-0
            h-[2px]
            w-full
            bg-gradient-to-r
            from-red-600
            via-red-400/50
            to-transparent
          "
        />

        {/* GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-56
            w-56
            rounded-full
            bg-red-600/[0.07]
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-red-500/10
                  bg-red-500/[0.06]
                  text-red-400
                "
              >
                <TrendingUp size={12} />
              </div>

              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-red-500
                "
              >
                Dashboard
              </p>

            </div>

            <h1
              className="
                mt-1.5
                font-bebas
                text-4xl
                uppercase
                leading-none
                tracking-[0.06em]
                text-white
                sm:text-5xl
              "
            >
              Overview
            </h1>

            <p
              className="
                mt-1.5
                max-w-xl
                text-[11px]
                leading-5
                text-zinc-600
              "
            >
              Manage your Kadecho store, products,
              orders and projects from one place.
            </p>

          </div>

          {/* SYSTEM */}

          <div
            className="
              flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-lg
              border
              border-white/[0.06]
              bg-black/40
              px-2.5
              py-1.5
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-red-500
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-zinc-600
              "
            >
              System Online
            </span>
          </div>

        </div>
      </motion.section>

      {/* =====================================================
          STORE OVERVIEW
      ===================================================== */}

      <section>

        <div
          className="
            mb-2.5
            flex
            items-end
            justify-between
          "
        >
          <div>
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.27em]
                text-zinc-700
              "
            >
              Store Overview
            </p>

            <h2
              className="
                mt-0.5
                text-[12px]
                font-semibold
                text-white
              "
            >
              Current activity
            </h2>
          </div>

          <div className="flex items-center gap-1.5">

            <span
              className="
                h-1
                w-1
                rounded-full
                bg-emerald-500
              "
            />

            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.16em]
                text-zinc-700
              "
            >
              Live data
            </span>

          </div>
        </div>

        {/* STATS */}

        <div
          className="
            grid
            gap-2
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-6
          "
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.025,
                }}
              >
                <Link
                  to={stat.path}
                  className="
                    group
                    relative
                    block
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/[0.065]
                    bg-[#0a0a0a]
                    p-3
                    transition-all
                    duration-300
                    hover:-translate-y-[1px]
                    hover:border-red-500/20
                    hover:bg-[#0d0d0d]
                  "
                >

                  {/* HOVER GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-8
                      -top-8
                      h-20
                      w-20
                      rounded-full
                      bg-red-500/0
                      blur-2xl
                      transition-all
                      duration-500
                      group-hover:bg-red-500/[0.08]
                    "
                  />

                  {/* TOP LINE */}

                  <div
                    className="
                      absolute
                      left-1/2
                      top-0
                      h-px
                      w-0
                      -translate-x-1/2
                      bg-red-500/70
                      transition-all
                      duration-500
                      group-hover:w-1/2
                    "
                  />

                  <div className="relative">

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-red-500/10
                          bg-red-500/[0.055]
                          text-red-400
                          transition-all
                          duration-300
                          group-hover:border-red-500/20
                          group-hover:bg-red-500/10
                        "
                      >
                        <Icon size={14} />
                      </div>

                      <ArrowUpRight
                        size={12}
                        className="
                          text-zinc-800
                          transition-all
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-red-400
                        "
                      />

                    </div>

                    <div className="mt-4">

                      <p
                        className="
                          truncate
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.17em]
                          text-zinc-700
                        "
                      >
                        {stat.label}
                      </p>

                      <div
                        className="
                          mt-0.5
                          flex
                          items-end
                          justify-between
                        "
                      >

                        <p
                          className="
                            font-bebas
                            text-3xl
                            leading-none
                            tracking-wide
                            text-white
                          "
                        >
                          {stat.value}
                        </p>

                        <span
                          className="
                            mb-0.5
                            text-[7px]
                            uppercase
                            tracking-[0.12em]
                            text-zinc-800
                            transition-colors
                            group-hover:text-red-400/60
                          "
                        >
                          View
                        </span>

                      </div>

                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>


      <AnalyticsChart />

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section>

        <div className="mb-2.5">

          <p
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.27em]
              text-zinc-700
            "
          >
            Quick Actions
          </p>

          <h2
            className="
              mt-0.5
              text-[12px]
              font-semibold
              text-white
            "
          >
            Get things done faster
          </h2>

        </div>

        <div
          className="
            grid
            gap-2
            md:grid-cols-3
          "
        >

          {/* ADD PRODUCT */}

          <Link
            to="/dashboard/products/new"
            className="
              group
              relative
              overflow-hidden
              rounded-xl
              border
              border-white/[0.065]
              bg-[#0a0a0a]
              p-3.5
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:border-red-500/20
              hover:bg-[#0d0d0d]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-red-500/0
                blur-3xl
                transition-all
                duration-500
                group-hover:bg-red-500/[0.08]
              "
            />

            <div
              className="
                relative
                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-red-500/10
                  bg-red-500/[0.055]
                  text-red-400
                  transition-all
                  group-hover:border-red-500/20
                  group-hover:bg-red-500/10
                "
              >
                <Package size={15} />
              </div>

              <ArrowUpRight
                size={13}
                className="
                  text-zinc-800
                  transition-all
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:text-red-400
                "
              />

            </div>

            <div className="relative mt-4">

              <h3
                className="
                  text-[11px]
                  font-semibold
                  text-white
                "
              >
                Add Product
              </h3>

              <p
                className="
                  mt-0.5
                  text-[9px]
                  leading-4
                  text-zinc-700
                "
              >
                Create and publish a new product.
              </p>

            </div>

          </Link>

          {/* ADD PROJECT */}

          <Link
            to="/dashboard/projects/new"
            className="
              group
              relative
              overflow-hidden
              rounded-xl
              border
              border-white/[0.065]
              bg-[#0a0a0a]
              p-3.5
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:border-red-500/20
              hover:bg-[#0d0d0d]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-red-500/0
                blur-3xl
                transition-all
                duration-500
                group-hover:bg-red-500/[0.08]
              "
            />

            <div
              className="
                relative
                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-red-500/10
                  bg-red-500/[0.055]
                  text-red-400
                  transition-all
                  group-hover:border-red-500/20
                  group-hover:bg-red-500/10
                "
              >
                <FolderKanban size={15} />
              </div>

              <ArrowUpRight
                size={13}
                className="
                  text-zinc-800
                  transition-all
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:text-red-400
                "
              />

            </div>

            <div className="relative mt-4">

              <h3
                className="
                  text-[11px]
                  font-semibold
                  text-white
                "
              >
                Add Project
              </h3>

              <p
                className="
                  mt-0.5
                  text-[9px]
                  leading-4
                  text-zinc-700
                "
              >
                Showcase a new project in your portfolio.
              </p>

            </div>

          </Link>

          {/* TOP PRODUCTS */}

          <Link
            to="/dashboard/top-products"
            className="
              group
              relative
              overflow-hidden
              rounded-xl
              border
              border-white/[0.065]
              bg-[#0a0a0a]
              p-3.5
              transition-all
              duration-300
              hover:-translate-y-[1px]
              hover:border-red-500/20
              hover:bg-[#0d0d0d]
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-8
                -top-8
                h-24
                w-24
                rounded-full
                bg-red-500/0
                blur-3xl
                transition-all
                duration-500
                group-hover:bg-red-500/[0.08]
              "
            />

            <div
              className="
                relative
                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-red-500/10
                  bg-red-500/[0.055]
                  text-red-400
                  transition-all
                  group-hover:border-red-500/20
                  group-hover:bg-red-500/10
                "
              >
                <Trophy size={15} />
              </div>

              <div className="flex items-center gap-2">

                <span
                  className="
                    rounded-md
                    border
                    border-red-500/10
                    bg-red-500/[0.035]
                    px-1.5
                    py-1
                    text-[6px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-red-400/70
                  "
                >
                  {topProductsLoading
                    ? "..."
                    : topProductsCount}
                </span>

                <ArrowUpRight
                  size={13}
                  className="
                    text-zinc-800
                    transition-all
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-red-400
                  "
                />

              </div>

            </div>

            <div className="relative mt-4">

              <h3
                className="
                  text-[11px]
                  font-semibold
                  text-white
                "
              >
                Top Products
              </h3>

              <p
                className="
                  mt-0.5
                  text-[9px]
                  leading-4
                  text-zinc-700
                "
              >
                See your best-selling products.
              </p>

            </div>

          </Link>

        </div>
      </section>

      {/* =====================================================
          STATUS
      ===================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          border-white/[0.055]
          bg-[#090909]
          px-3
          py-2
        "
      >

        <div className="flex items-center gap-1.5">

          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-emerald-500
            "
          />

          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.16em]
              text-zinc-700
            "
          >
            Dashboard ready
          </span>

        </div>

        <div className="flex items-center gap-2">

          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.12em]
              text-zinc-800
            "
          >
            {topProductsLoading
              ? "Syncing"
              : `${topProductsCount} top products`}
          </span>

          <span
            className="
              h-2.5
              w-px
              bg-white/[0.05]
            "
          />

          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.14em]
              text-zinc-800
            "
          >
            Kadecho Admin Panel
          </span>

        </div>

      </div>

    </div>
  );
}

