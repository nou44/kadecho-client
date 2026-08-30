
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  TrendingUp,
  ShoppingCart,
  CircleDollarSign,
  Activity,
} from "lucide-react";


// =====================================================
// FORMATTERS
// =====================================================

const formatMoney = (value) => {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value || 0);
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
};


// =====================================================
// CUSTOM TOOLTIP
// =====================================================

function CustomTooltip({
  active,
  payload,
  label,
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const orders =
    payload.find(
      (item) => item.dataKey === "orders"
    )?.value || 0;

  const revenue =
    payload.find(
      (item) => item.dataKey === "revenue"
    )?.value || 0;

  return (
    <div
      className="
        min-w-[165px]
        overflow-hidden
        rounded-xl
        border
        border-white/[0.08]
        bg-[#0b0b0b]/95
        p-3
        shadow-[0_18px_50px_rgba(0,0,0,.5)]
        backdrop-blur-xl
      "
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

        <p
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-zinc-500
          "
        >
          {formatDate(label)}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[9px] text-zinc-600">
          Revenue
        </span>

        <span className="text-[10px] font-semibold text-white">
          {formatMoney(revenue)} DH
        </span>
      </div>

      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[9px] text-zinc-600">
          Orders
        </span>

        <span className="text-[10px] font-semibold text-red-400">
          {orders}
        </span>
      </div>
    </div>
  );
}


// =====================================================
// STAT CARD
// =====================================================

function MiniStat({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-white/[0.065]
        bg-[#0a0a0a]
        px-3.5
        py-3
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-red-500/20
        hover:bg-[#0c0c0c]
      "
    >
      {/* Subtle glow */}

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
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-red-500/[0.08]
        "
      />

      <div className="relative flex items-center gap-3">

        {/* Icon */}

        <div
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
            bg-red-500/[0.055]
            text-red-400
            transition-all
            duration-300
            group-hover:border-red-500/20
            group-hover:bg-red-500/[0.08]
          "
        >
          <Icon size={14} strokeWidth={1.8} />
        </div>

        {/* Content */}

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <p
              className="
                truncate
                text-[7px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-600
              "
            >
              {label}
            </p>

            <Activity
              size={10}
              className="
                shrink-0
                text-zinc-800
                transition-colors
                duration-300
                group-hover:text-red-500/40
              "
            />

          </div>

          <div className="mt-1 flex items-end gap-2">

            <p
              className="
                font-bebas
                text-[25px]
                leading-[0.85]
                tracking-wide
                text-white
              "
            >
              {value}
            </p>

            <p
              className="
                mb-[1px]
                hidden
                truncate
                text-[7px]
                text-zinc-700
                sm:block
              "
            >
              {description}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// MAIN COMPONENT
// =====================================================

export default function AnalyticsChart() {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ===================================================
  // FETCH ANALYTICS
  // ===================================================

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        setLoading(true);
        setError("");

      const response = await fetch(
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/analytics`
);

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch analytics"
          );
        }

        setAnalytics(result);

      } catch (error) {

        console.error(
          "FETCH ANALYTICS ERROR:",
          error
        );

        setError(
          error.message ||
            "Failed to load analytics."
        );

      } finally {

        setLoading(false);

      }
    };


    fetchAnalytics();

  }, []);


  // ===================================================
  // DATA
  // ===================================================

  const chartData = useMemo(() => {

    if (!analytics?.chart) {
      return [];
    }

    return analytics.chart.map((item) => ({
      ...item,
      revenue: Number(item.revenue || 0),
      orders: Number(item.orders || 0),
    }));

  }, [analytics]);


  const overview =
    analytics?.overview || {};


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {

    return (
      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.07]
          bg-[#090909]
        "
      >

        <div className="p-4">

          <div className="animate-pulse">

            <div className="h-2.5 w-20 rounded bg-white/[0.06]" />

            <div className="mt-2 h-7 w-44 rounded bg-white/[0.06]" />

            <div className="mt-2 h-2.5 w-60 max-w-full rounded bg-white/[0.04]" />

          </div>

          <div
            className="
              mt-5
              h-[250px]
              rounded-xl
              bg-white/[0.025]
            "
          />

        </div>

      </section>
    );
  }


  // ===================================================
  // ERROR
  // ===================================================

  if (error) {

    return (
      <section
        className="
          rounded-2xl
          border
          border-red-500/10
          bg-[#090909]
          p-4
        "
      >

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
              border
              border-red-500/10
              bg-red-500/[0.06]
              text-red-400
            "
          >
            <Activity size={15} />
          </div>

          <div>

            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-red-500
              "
            >
              Analytics Error
            </p>

            <p className="mt-1 text-[10px] text-zinc-600">
              {error}
            </p>

          </div>

        </div>

      </section>
    );
  }


  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.065]
        bg-[#090909]
      "
    >

      {/* =================================================
          AMBIENT GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-red-600/[0.055]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          left-1/3
          h-48
          w-48
          rounded-full
          bg-red-900/[0.04]
          blur-3xl
        "
      />


      {/* =================================================
          TOP LINE
      ================================================= */}

      <div
        className="
          absolute
          left-0
          top-0
          h-[1px]
          w-full
          bg-gradient-to-r
          from-red-600
          via-red-500/40
          to-transparent
        "
      />


      <div className="relative p-4 sm:p-5">


        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div className="min-w-0">

            {/* Eyebrow */}

            <div className="flex items-center gap-2">

              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-red-500
                "
              />

              <p
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-red-500
                "
              >
                Business Analytics
              </p>

            </div>


            {/* Title */}

            <h2
              className="
                mt-1.5
                font-bebas
                text-[30px]
                uppercase
                leading-none
                tracking-[0.045em]
                text-white
                sm:text-[34px]
              "
            >
              Revenue & Orders
            </h2>


            {/* Description */}

            <p
              className="
                mt-1.5
                max-w-lg
                text-[9px]
                leading-4
                text-zinc-600
              "
            >
              Track your orders and revenue
              performance over time.
            </p>

          </div>


          {/* STATUS */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-lg
              border
              border-emerald-500/10
              bg-emerald-500/[0.025]
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
                bg-emerald-500
                shadow-[0_0_8px_rgba(16,185,129,.5)]
              "
            />

            <span
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-zinc-600
              "
            >
              Live
            </span>

          </div>

        </div>


        {/* =================================================
            DIVIDER DETAIL
        ================================================= */}

        <div
          className="
            mt-4
            h-px
            w-full
            bg-gradient-to-r
            from-white/[0.07]
            via-white/[0.035]
            to-transparent
          "
        />


        {/* =================================================
            MINI STATS
        ================================================= */}

        <div
          className="
            mt-3
            grid
            grid-cols-1
            gap-2
            sm:grid-cols-3
          "
        >

          <MiniStat
            icon={ShoppingCart}
            label="Total Orders"
            value={formatMoney(
              overview.totalOrders
            )}
            description="All non-cancelled orders"
          />

          <MiniStat
            icon={CircleDollarSign}
            label="Total Revenue"
            value={`${formatMoney(
              overview.totalRevenue
            )} DH`}
            description="Revenue from valid orders"
          />

          <MiniStat
            icon={TrendingUp}
            label="Delivered"
            value={formatMoney(
              overview.deliveredOrders
            )}
            description="Successfully delivered"
          />

        </div>


        {/* =================================================
            CHART
        ================================================= */}

        <div className="mt-3">

          <div
            className="
              overflow-hidden
              rounded-xl
              border
              border-white/[0.055]
              bg-[#080808]
            "
          >

            {/* Chart Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/[0.045]
                px-3.5
                py-2.5
              "
            >

              <div className="flex items-center gap-2.5">

                <div
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-md
                    border
                    border-red-500/10
                    bg-red-500/[0.045]
                    text-red-400
                  "
                >
                  <TrendingUp size={11} />
                </div>

                <div>

                  <p
                    className="
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-zinc-700
                    "
                  >
                    Performance
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      font-semibold
                      text-zinc-300
                    "
                  >
                    Revenue activity
                  </p>

                </div>

              </div>


              {/* Legend */}

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-1.5">

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-red-500
                    "
                  />

                  <span
                    className="
                      text-[7px]
                      uppercase
                      tracking-[0.12em]
                      text-zinc-600
                    "
                  >
                    Revenue
                  </span>

                </div>

                <div className="hidden items-center gap-1.5 sm:flex">

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-zinc-600
                    "
                  />

                  <span
                    className="
                      text-[7px]
                      uppercase
                      tracking-[0.12em]
                      text-zinc-600
                    "
                  >
                    Orders
                  </span>

                </div>

              </div>

            </div>


            {/* Chart */}

            <div
              className="
                h-[235px]
                w-full
                p-2
                sm:h-[265px]
                sm:p-3
              "
            >

              {chartData.length === 0 ? (

                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-zinc-700
                  "
                >
                  No analytics data available
                </div>

              ) : (

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 8,
                      right: 6,
                      left: -18,
                      bottom: 2,
                    }}
                  >

                    <defs>

                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#ef4444"
                          stopOpacity={0.24}
                        />

                        <stop
                          offset="65%"
                          stopColor="#ef4444"
                          stopOpacity={0.045}
                        />

                        <stop
                          offset="100%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>


                    <CartesianGrid
                      vertical={false}
                      stroke="rgba(255,255,255,0.035)"
                    />


                    <XAxis
                      dataKey="date"
                      tickFormatter={formatDate}
                      tick={{
                        fill: "#52525b",
                        fontSize: 8,
                      }}
                      axisLine={false}
                      tickLine={false}
                      minTickGap={25}
                    />


                    <YAxis
                      yAxisId="revenue"
                      tickFormatter={(value) =>
                        `${value / 1000}k`
                      }
                      tick={{
                        fill: "#52525b",
                        fontSize: 8,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />


                    <YAxis
                      yAxisId="orders"
                      orientation="right"
                      tick={{
                        fill: "#3f3f46",
                        fontSize: 8,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />


                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        stroke:
                          "rgba(239,68,68,0.22)",
                        strokeWidth: 1,
                      }}
                    />


                    {/* REVENUE */}

                    <Area
                      yAxisId="revenue"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#ef4444"
                      strokeWidth={1.8}
                      fill="url(#revenueGradient)"
                      dot={false}
                      activeDot={{
                        r: 3.5,
                        strokeWidth: 2,
                        stroke: "#090909",
                        fill: "#ef4444",
                      }}
                    />


                    {/* ORDERS */}

                    <Area
                      yAxisId="orders"
                      type="monotone"
                      dataKey="orders"
                      stroke="#52525b"
                      strokeWidth={1.2}
                      fill="transparent"
                      dot={false}
                      activeDot={{
                        r: 2.5,
                        strokeWidth: 2,
                        stroke: "#090909",
                        fill: "#a1a1aa",
                      }}
                    />

                  </AreaChart>

                </ResponsiveContainer>

              )}

            </div>

          </div>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            mt-2.5
            flex
            items-center
            justify-between
            border-t
            border-white/[0.04]
            pt-2.5
          "
        >

          <div className="flex items-center gap-1.5">

            <span
              className="
                h-1
                w-1
                rounded-full
                bg-red-500
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
              Analytics synchronized
            </span>

          </div>


          <span
            className="
              text-[7px]
              uppercase
              tracking-[0.16em]
              text-zinc-800
            "
          >
            Kadecho Admin
          </span>

        </div>

      </div>

    </section>
  );
}

