import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Package,
  ShoppingBag,
  ArrowUpRight,
  RefreshCw,
  Star,
  TrendingUp,
  Crown,
  Medal,
  Zap,
} from "lucide-react";

export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTopProducts = async () => {
    try {
      setLoading(true);
      setError("");

     const response = await fetch(
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/top-products`
);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch top products"
        );
      }

      setProducts(result.products || []);
    } catch (error) {
      console.error("FETCH TOP PRODUCTS ERROR:", error);

      setError(
        error.message || "Failed to load top products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const totalSold = useMemo(() => {
    return products.reduce(
      (total, product) =>
        total + Number(product.totalSold || 0),
      0
    );
  }, [products]);

  const bestProduct = products[0];

  const topSales = Number(
    bestProduct?.totalSold || 0
  );

  const getRankIcon = (index) => {
    if (index === 0) return Crown;
    if (index === 1) return Medal;
    if (index === 2) return Trophy;
    return TrendingUp;
  };

  const getRankLabel = (index) => {
    if (index === 0) return "1st Place";
    if (index === 1) return "2nd Place";
    if (index === 2) return "3rd Place";
    return `Rank ${index + 1}`;
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          group
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.08]
          bg-[#090909]
          px-5
          py-6
          sm:px-7
          sm:py-7
        "
      >
        {/* Ambient glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-red-600/[0.07]
            blur-[90px]
            transition-all
            duration-700
            group-hover:bg-red-600/[0.11]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            left-1/3
            h-64
            w-64
            rounded-full
            bg-red-600/[0.025]
            blur-[100px]
          "
        />

        {/* Top accent */}

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

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          {/* LEFT */}

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
                <Trophy size={13} />
              </div>

              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.3em]
                  text-red-400/80
                "
              >
                Store Performance
              </p>

              <span
                className="
                  rounded-full
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-2
                  py-1
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-zinc-600
                "
              >
                Live
              </span>

            </div>

            <h1
              className="
                mt-3
                font-bebas
                text-5xl
                uppercase
                leading-none
                tracking-[0.04em]
                text-white
                sm:text-6xl
              "
            >
              Top Products
            </h1>

            <p
              className="
                mt-3
                max-w-xl
                text-[11px]
                leading-5
                text-zinc-600
                sm:text-xs
              "
            >
              Your strongest products ranked by total units sold.
              Only products reaching 5+ sales are displayed.
            </p>

          </div>

          {/* RIGHT */}

          <div className="flex flex-wrap items-center gap-2">

            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/[0.06]
                bg-black/40
                px-3
                py-2.5
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,.5)]" />

              <span
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-zinc-500
                "
              >
                Performance Active
              </span>
            </div>

            <button
              type="button"
              onClick={fetchTopProducts}
              disabled={loading}
              className="
                group/refresh
                flex
                h-9
                items-center
                gap-2
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-3
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-zinc-500
                transition-all
                duration-200
                hover:border-red-500/20
                hover:bg-red-500/[0.05]
                hover:text-red-400
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <RefreshCw
                size={11}
                className={loading ? "animate-spin" : ""}
              />

              <span className="hidden sm:inline">
                Refresh
              </span>
            </button>

          </div>

        </div>
      </section>

      {/* =====================================================
          KPI STRIP
      ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-3">

        {/* QUALIFIED */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.07]
            bg-[#0a0a0a]
            p-4
            transition-all
            duration-300
            hover:border-red-500/15
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
              bg-red-500/[0.04]
              blur-2xl
            "
          />

          <div className="relative flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-500/10
                  bg-red-500/[0.06]
                  text-red-400
                "
              >
                <Trophy size={15} />
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
                  Qualified
                </p>

                <p className="mt-0.5 font-bebas text-3xl leading-none text-white">
                  {loading ? "—" : products.length}
                </p>
              </div>

            </div>

            <span
              className="
                rounded-full
                border
                border-white/[0.05]
                bg-white/[0.02]
                px-2
                py-1
                text-[6px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-zinc-700
              "
            >
              Products
            </span>

          </div>
        </div>

        {/* UNITS */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.07]
            bg-[#0a0a0a]
            p-4
            transition-all
            duration-300
            hover:border-red-500/15
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
              bg-red-500/[0.04]
              blur-2xl
            "
          />

          <div className="relative flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-500/10
                  bg-red-500/[0.06]
                  text-red-400
                "
              >
                <ShoppingBag size={15} />
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
                  Total Sold
                </p>

                <p className="mt-0.5 font-bebas text-3xl leading-none text-white">
                  {loading ? "—" : totalSold}
                </p>
              </div>

            </div>

            <TrendingUp
              size={14}
              className="text-emerald-500/70"
            />

          </div>
        </div>

        {/* BEST */}

        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.07]
            bg-[#0a0a0a]
            p-4
            transition-all
            duration-300
            hover:border-red-500/15
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
              bg-red-500/[0.04]
              blur-2xl
            "
          />

          <div className="relative flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-red-500/10
                bg-red-500/[0.06]
                text-red-400
              "
            >
              <Star size={15} />
            </div>

            <div className="min-w-0">

              <p
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-zinc-700
                "
              >
                Best Seller
              </p>

              <p
                className="
                  mt-0.5
                  truncate
                  text-[11px]
                  font-semibold
                  uppercase
                  text-white
                "
              >
                {loading
                  ? "—"
                  : bestProduct?.name || "No product"}
              </p>

            </div>

            {!loading && bestProduct && (
              <div className="ml-auto text-right">

                <p className="font-bebas text-xl leading-none text-red-400">
                  {topSales}
                </p>

                <p
                  className="
                    text-[6px]
                    uppercase
                    tracking-[0.15em]
                    text-zinc-700
                  "
                >
                  Units
                </p>

              </div>
            )}

          </div>
        </div>

      </section>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <section>

          <div className="mb-4 flex items-end justify-between">

            <div>
              <div className="h-2 w-24 animate-pulse rounded bg-zinc-900" />
              <div className="mt-2 h-4 w-40 animate-pulse rounded bg-zinc-900" />
            </div>

            <div className="h-2 w-16 animate-pulse rounded bg-zinc-900" />

          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#0a0a0a]
                "
              >
                <div className="aspect-[4/3] animate-pulse bg-[#101010]" />

                <div className="space-y-4 p-4">

                  <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-900" />

                  <div className="h-2 w-1/3 animate-pulse rounded bg-zinc-900" />

                  <div className="grid grid-cols-2 gap-2">

                    <div className="h-12 animate-pulse rounded-xl bg-zinc-900" />

                    <div className="h-12 animate-pulse rounded-xl bg-zinc-900" />

                  </div>

                </div>
              </div>
            ))}

          </div>
        </section>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loading && error && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-red-500/15
            bg-red-500/[0.035]
            p-6
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-32
              w-32
              rounded-full
              bg-red-500/[0.06]
              blur-3xl
            "
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <Zap
                  size={14}
                  className="text-red-400"
                />

                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-red-400
                  "
                >
                  System Error
                </p>

              </div>

              <h2 className="mt-2 text-sm font-semibold text-white">
                Unable to load performance data
              </h2>

              <p className="mt-1 text-[10px] leading-5 text-zinc-600">
                {error}
              </p>

            </div>

            <button
              type="button"
              onClick={fetchTopProducts}
              className="
                flex
                h-9
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-500/20
                bg-red-500/[0.05]
                px-4
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-red-400
                transition
                hover:bg-red-500/10
              "
            >
              <RefreshCw size={11} />
              Try Again
            </button>

          </div>
        </motion.section>
      )}

      {/* =====================================================
          EMPTY
      ===================================================== */}

      {!loading &&
        !error &&
        products.length === 0 && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              relative
              flex
              min-h-[420px]
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-dashed
              border-white/[0.07]
              bg-[#090909]
              px-6
              text-center
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                h-56
                w-56
                rounded-full
                bg-red-500/[0.025]
                blur-[80px]
              "
            />

            <div
              className="
                relative
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                text-zinc-700
              "
            >
              <Package size={25} />
            </div>

            <p
              className="
                relative
                mt-5
                text-[8px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-red-400/70
              "
            >
              Store Performance
            </p>

            <h2
              className="
                relative
                mt-2
                font-bebas
                text-3xl
                uppercase
                tracking-wide
                text-white
              "
            >
              No Top Products Yet
            </h2>

            <p
              className="
                relative
                mt-2
                max-w-sm
                text-[10px]
                leading-5
                text-zinc-600
              "
            >
              Products will appear here automatically once
              they reach at least 5 sold units.
            </p>
          </motion.section>
        )}

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      {!loading &&
        !error &&
        products.length > 0 && (
          <section>

            {/* SECTION HEADER */}

            <div className="mb-4 flex items-end justify-between">

              <div>

                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.28em]
                    text-zinc-600
                  "
                >
                  Performance Ranking
                </p>

                <h2 className="mt-1 text-sm font-semibold text-white">
                  Best Sellers
                </h2>

              </div>

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />

                <span
                  className="
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-zinc-700
                  "
                >
                  {products.length} Products
                </span>

              </div>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

              {products.map((product, index) => {
                const RankIcon = getRankIcon(index);

                const sold = Number(
                  product.totalSold || 0
                );

                const progress =
                  topSales > 0
                    ? Math.min(
                        (sold / topSales) * 100,
                        100
                      )
                    : 0;

                return (
                  <motion.article
                    key={product.productId}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(
                        index * 0.055,
                        0.3
                      ),
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-[#0a0a0a]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-red-500/20
                      hover:bg-[#0d0d0d]
                      hover:shadow-[0_20px_60px_rgba(0,0,0,.35)]
                    "
                  >

                    {/* Top hover line */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-0
                        z-20
                        h-[2px]
                        w-0
                        -translate-x-1/2
                        bg-gradient-to-r
                        from-transparent
                        via-red-500
                        to-transparent
                        transition-all
                        duration-500
                        group-hover:w-2/3
                      "
                    />

                    {/* IMAGE */}

                    <div
                      className="
                        relative
                        aspect-[4/3]
                        overflow-hidden
                        bg-[#050505]
                      "
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-[1.06]
                        "
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                      {/* Image overlay */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black
                          via-black/15
                          to-black/5
                        "
                      />

                      {/* Subtle hover glow */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          -right-10
                          top-1/3
                          h-32
                          w-32
                          rounded-full
                          bg-red-500/0
                          blur-3xl
                          transition-all
                          duration-500
                          group-hover:bg-red-500/10
                        "
                      />

                      {/* RANK */}

                      <div
                        className="
                          absolute
                          left-3
                          top-3
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-white/10
                          bg-black/65
                          px-2.5
                          py-2
                          backdrop-blur-xl
                        "
                      >

                        <RankIcon
                          size={12}
                          className={
                            index === 0
                              ? "text-red-400"
                              : "text-zinc-400"
                          }
                        />

                        <div>

                          <p
                            className="
                              font-bebas
                              text-base
                              leading-none
                              text-white
                            "
                          >
                            #{index + 1}
                          </p>

                        </div>

                      </div>

                      {/* SALES */}

                      <div
                        className="
                          absolute
                          right-3
                          top-3
                          rounded-xl
                          border
                          border-red-500/15
                          bg-black/65
                          px-2.5
                          py-2
                          backdrop-blur-xl
                        "
                      >

                        <div className="flex items-center gap-1.5">

                          <ShoppingBag
                            size={10}
                            className="text-red-400"
                          />

                          <span
                            className="
                              text-[7px]
                              font-bold
                              uppercase
                              tracking-[0.12em]
                              text-red-300
                            "
                          >
                            {sold} Sold
                          </span>

                        </div>

                      </div>

                      {/* PRODUCT TITLE */}

                      <div className="absolute bottom-4 left-4 right-4">

                        <div className="flex items-center gap-2">

                          <span
                            className="
                              text-[7px]
                              font-bold
                              uppercase
                              tracking-[0.2em]
                              text-red-400
                            "
                          >
                            {product.category || "Product"}
                          </span>

                          <span className="h-px w-5 bg-red-500/30" />

                          <span
                            className="
                              text-[7px]
                              uppercase
                              tracking-[0.14em]
                              text-zinc-500
                            "
                          >
                            {getRankLabel(index)}
                          </span>

                        </div>

                        <h3
                          className="
                            mt-1
                            line-clamp-1
                            font-bebas
                            text-3xl
                            uppercase
                            leading-none
                            tracking-wide
                            text-white
                          "
                        >
                          {product.name}
                        </h3>

                      </div>

                    </div>

{/* CONTENT */}

<div className="p-3.5">

  {/* PRICE */}

  <div className="flex items-center justify-between">

    <div className="min-w-0">

      <p
        className="
          text-[7px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-zinc-700
        "
      >
        Current Price
      </p>

      <div className="mt-0.5 flex items-baseline gap-1">

        <span className="text-base font-semibold text-white">
          {Number(product.price || 0).toLocaleString()}
        </span>

        <span className="text-[8px] font-medium text-zinc-600">
          DH
        </span>

      </div>

    </div>

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
        border-white/[0.06]
        bg-white/[0.02]
        text-zinc-700
        transition-all
        duration-300
        group-hover:border-red-500/15
        group-hover:bg-red-500/[0.05]
        group-hover:text-red-400
      "
    >
      <ArrowUpRight size={13} />
    </div>

  </div>


  {/* PRODUCT SPECS */}

  <div className="mt-3 grid grid-cols-2 gap-2">

    <div
      className="
        min-w-0
        rounded-lg
        border
        border-white/[0.045]
        bg-white/[0.015]
        px-2.5
        py-2
      "
    >

      <p
        className="
          text-[6px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-zinc-700
        "
      >
        Material
      </p>

      <p
        className="
          mt-0.5
          truncate
          text-[9px]
          text-zinc-400
        "
      >
        {product.material || "—"}
      </p>

    </div>


    <div
      className="
        min-w-0
        rounded-lg
        border
        border-white/[0.045]
        bg-white/[0.015]
        px-2.5
        py-2
      "
    >

      <p
        className="
          text-[6px]
          font-bold
          uppercase
          tracking-[0.16em]
          text-zinc-700
        "
      >
        Finish
      </p>

      <p
        className="
          mt-0.5
          truncate
          text-[9px]
          text-zinc-400
        "
      >
        {product.finish || "—"}
      </p>

    </div>

  </div>


  {/* PERFORMANCE */}

  <div
    className="
      mt-3
      flex
      items-center
      justify-between
      border-t
      border-white/[0.045]
      pt-3
    "
  >

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
          border-emerald-500/10
          bg-emerald-500/[0.04]
        "
      >
        <TrendingUp
          size={11}
          className="text-emerald-500"
        />
      </div>

      <div>

        <p
          className="
            text-[6px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-zinc-700
          "
        >
          Performance
        </p>

        <p
          className="
            mt-0.5
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-emerald-500
          "
        >
          Top Seller
        </p>

      </div>

    </div>


    <div className="text-right">

      <div className="flex items-baseline justify-end gap-1">

        <span className="font-bebas text-xl leading-none text-white">
          {sold}
        </span>

        <span
          className="
            text-[6px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-zinc-700
          "
        >
          sold
        </span>

      </div>

    </div>

  </div>


  {/* SALES PROGRESS */}

  <div className="mt-2">

    <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.045]">

      <motion.div
        initial={{
          width: 0,
        }}
        animate={{
          width: `${progress}%`,
        }}
        transition={{
          duration: 0.8,
          delay: 0.15 + index * 0.05,
          ease: "easeOut",
        }}
        className="
          h-full
          rounded-full
          bg-gradient-to-r
          from-red-700
          to-red-400
        "
      />

    </div>

  </div>

</div>
                  </motion.article>
                );
              })}

            </div>
          </section>
        )}

      {/* =====================================================
          FOOTER STATUS
      ===================================================== */}

      {!loading && !error && products.length > 0 && (
        <div
          className="
            flex
            flex-col
            gap-2
            rounded-xl
            border
            border-white/[0.05]
            bg-[#090909]
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-zinc-700
              "
            >
              Ranking data loaded
            </span>

          </div>

          <div className="flex items-center gap-3">

            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.15em]
                text-zinc-800
              "
            >
              Minimum threshold
            </span>

            <span
              className="
                rounded-md
                border
                border-white/[0.05]
                bg-white/[0.02]
                px-2
                py-1
                font-bebas
                text-sm
                leading-none
                text-zinc-500
              "
            >
              5
            </span>

            <span
              className="
                text-[7px]
                uppercase
                tracking-[0.15em]
                text-zinc-800
              "
            >
              Sales
            </span>

          </div>

        </div>
      )}

    </div>
  );
}