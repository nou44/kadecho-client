
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  MapPin,
  Package,
  Phone,
  Trash2,
  User,
  CalendarDays,
  Clock3,
  ShoppingBag,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/orders`;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedOrders, setExpandedOrders] = useState({});
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // =====================================================
  // FETCH ORDERS
  // =====================================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      const contentType =
        response.headers.get("content-type") || "";

      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "ORDERS RESPONSE IS NOT JSON:",
          text
        );

        throw new Error(
          `Orders endpoint returned ${response.status} instead of JSON.`
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to fetch orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error(
        "❌ Fetch orders error:",
        error
      );

      setError(
        error.message || "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =====================================================
  // TOGGLE ORDER
  // =====================================================

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // =====================================================
  // DELETE MODAL
  // =====================================================

  const openDeleteConfirmation = (order) => {
    setError("");
    setDeletingOrder(order);
  };

  const closeDeleteConfirmation = () => {
    if (deleteLoading) return;

    setDeletingOrder(null);
  };

  // =====================================================
  // DELETE ORDER
  // =====================================================

  const handleDeleteOrder = async () => {
    if (!deletingOrder) return;

    try {
      setDeleteLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/${deletingOrder._id}`,
        {
          method: "DELETE",
        }
      );

      /*
       * TEMP SAFE PARSER
       *
       * If backend returns HTML instead of JSON,
       * don't let JSON.parse crash the UI.
       */

      const contentType =
        response.headers.get("content-type") || "";

      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "DELETE ORDER RESPONSE IS NOT JSON:",
          text
        );

        throw new Error(
          `Delete endpoint returned ${response.status} instead of JSON.`
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to delete order."
        );
      }

      setOrders((prev) =>
        prev.filter(
          (order) =>
            order._id !== deletingOrder._id
        )
      );

      setExpandedOrders((prev) => {
        const updated = { ...prev };

        delete updated[deletingOrder._id];

        return updated;
      });

      setDeletingOrder(null);
    } catch (error) {
      console.error(
        "❌ Delete order error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete order."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "border-blue-500/20 bg-blue-500/10 text-blue-400";

      case "processing":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

      case "shipped":
        return "border-purple-500/20 bg-purple-500/10 text-purple-400";

      case "delivered":
        return "border-green-500/20 bg-green-500/10 text-green-400";

      case "cancelled":
        return "border-red-500/20 bg-red-500/10 text-red-400";

      default:
        return "border-orange-500/20 bg-orange-500/10 text-orange-400";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#090909]
        "
      >
        <div className="flex min-h-[360px] items-center justify-center">
          <div className="text-center">
            <div
              className="
                mx-auto
                h-7
                w-7
                animate-spin
                rounded-full
                border-2
                border-white/10
                border-t-red-500
              "
            />

            <p
              className="
                mt-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-zinc-600
              "
            >
              Loading orders
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      <section
        className="
          relative
          flex
          h-[calc(100vh-150px)]
          min-h-[520px]
          max-h-[760px]
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
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
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-red-600/[0.055]
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-72
            w-72
            rounded-full
            bg-red-600/[0.03]
            blur-[100px]
          "
        />

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className="
            relative
            z-20
            flex
            shrink-0
            items-center
            justify-between
            gap-4
            border-b
            border-white/[0.07]
            px-4
            py-3.5
            sm:px-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">

            {/* ICON */}

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
                bg-red-500/[0.07]
                text-red-400
              "
            >
              <ShoppingBag size={16} />
            </div>

            {/* TITLE */}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-red-400/80
                  "
                >
                  Dashboard
                </p>

                <span
                  className="
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-1.5
                    py-0.5
                    text-[7px]
                    font-semibold
                    text-zinc-500
                  "
                >
                  {orders.length}
                </span>
              </div>

              <h1
                className="
                  mt-0.5
                  font-bebas
                  text-2xl
                  uppercase
                  leading-none
                  tracking-wide
                  text-white
                "
              >
                Orders
              </h1>
            </div>
          </div>

          {/* REFRESH */}

          <button
            type="button"
            onClick={fetchOrders}
            disabled={loading}
            className="
              flex
              h-8
              shrink-0
              items-center
              gap-1.5
              rounded-lg
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-2.5
              text-[8px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-zinc-500
              transition-all
              duration-200
              hover:border-red-500/20
              hover:bg-red-500/[0.06]
              hover:text-red-400
              disabled:opacity-50
            "
          >
            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>
        </header>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              relative
              z-20
              mx-3
              mt-3
              shrink-0
              rounded-xl
              border
              border-red-500/15
              bg-red-500/[0.045]
              px-3
              py-2
              text-[9px]
              text-red-400
              sm:mx-4
            "
          >
            {error}
          </motion.div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!error && orders.length === 0 && (
          <div
            className="
              relative
              z-10
              flex
              flex-1
              flex-col
              items-center
              justify-center
              px-6
              text-center
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                text-zinc-600
              "
            >
              <ShoppingBag size={21} />
            </div>

            <h2
              className="
                mt-4
                font-bebas
                text-xl
                uppercase
                tracking-wide
                text-white
              "
            >
              No Orders
            </h2>

            <p className="mt-1 text-[9px] text-zinc-600">
              Orders will appear here.
            </p>
          </div>
        )}

        {/* =================================================
            SCROLLABLE ORDERS
        ================================================= */}

        {!error && orders.length > 0 && (
          <div
            className="
              relative
              z-10
              min-h-0
              flex-1
              overflow-y-auto
              px-3
              py-3
              sm:px-4
              sm:py-4

              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >
            <div
              className="
                grid
                grid-cols-1
                gap-2.5
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {orders.map((order, index) => {
                const isExpanded =
                  expandedOrders[order._id];

                return (
                  <motion.article
                    key={order._id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 6,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: Math.min(
                        index * 0.02,
                        0.2
                      ),
                      duration: 0.25,
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/[0.06]
                      bg-white/[0.018]
                      transition-all
                      duration-300
                      hover:-translate-y-[1px]
                      hover:border-red-500/20
                      hover:bg-white/[0.025]
                    "
                  >
                    {/* TOP RED LINE */}

                    <div
                      className="
                        pointer-events-none
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

                    {/* =================================================
                        COMPACT ORDER HEADER
                    ================================================= */}

                    <div className="p-3">

                      <div className="flex items-center justify-between gap-2">

                        {/* CUSTOMER */}

                        <div className="flex min-w-0 items-center gap-2.5">

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
                            <User size={14} />
                          </div>

                          <div className="min-w-0">

                            <h3
                              className="
                                truncate
                                text-[11px]
                                font-semibold
                                text-white
                              "
                            >
                              {order.customer?.name ||
                                "Unknown Customer"}
                            </h3>

                            <div
                              className="
                                mt-0.5
                                flex
                                items-center
                                gap-1
                                text-[7px]
                                text-zinc-600
                              "
                            >
                              <span>
                                #{order._id?.slice(-8)}
                              </span>
                            </div>

                          </div>
                        </div>

                        {/* RIGHT SIDE */}

                        <div className="flex shrink-0 items-center gap-2">

                          <div className="text-right">

                            <p
                              className="
                                font-bebas
                                text-lg
                                leading-none
                                text-white
                              "
                            >
                              {Number(
                                order.total || 0
                              ).toLocaleString()}{" "}
                              DH
                            </p>

                            <span
                              className={`
                                mt-1
                                inline-flex
                                rounded-full
                                border
                                px-2
                                py-0.5
                                text-[6px]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                ${getStatusStyle(
                                  order.status
                                )}
                              `}
                            >
                              {order.status || "pending"}
                            </span>

                          </div>

                          {/* DELETE */}

                          <button
                            type="button"
                            onClick={() =>
                              openDeleteConfirmation(
                                order
                              )
                            }
                            className="
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-white/[0.06]
                              bg-white/[0.02]
                              text-zinc-700
                              transition-all
                              duration-200
                              hover:border-red-500/25
                              hover:bg-red-500/10
                              hover:text-red-400
                            "
                            title="Delete order"
                          >
                            <Trash2 size={11} />
                          </button>

                        </div>
                      </div>

                      {/* =================================================
                          QUICK INFO
                      ================================================= */}

                      <div
                        className="
                          mt-3
                          grid
                          grid-cols-2
                          gap-1.5
                        "
                      >

                        {/* PHONE */}

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-white/[0.04]
                            bg-white/[0.012]
                            px-2
                            py-1.5
                          "
                        >
                          <Phone
                            size={9}
                            className="shrink-0 text-red-400/70"
                          />

                          <span
                            className="
                              truncate
                              text-[7px]
                              text-zinc-500
                            "
                          >
                            {order.customer?.phone ||
                              "-"}
                          </span>
                        </div>

                        {/* DATE */}

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-white/[0.04]
                            bg-white/[0.012]
                            px-2
                            py-1.5
                          "
                        >
                          <CalendarDays
                            size={9}
                            className="shrink-0 text-red-400/70"
                          />

                          <span
                            className="
                              truncate
                              text-[7px]
                              text-zinc-500
                            "
                          >
                            {formatDate(
                              order.createdAt
                            )}
                          </span>
                        </div>

                      </div>

                      {/* =================================================
                          SHOW MORE
                      ================================================= */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleOrder(order._id)
                        }
                        className="
                          mt-2
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          border
                          border-white/[0.05]
                          bg-white/[0.018]
                          py-1.5
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-zinc-600
                          transition-all
                          duration-200
                          hover:border-white/15
                          hover:bg-white/[0.04]
                          hover:text-white
                        "
                      >
                        {isExpanded ? (
                          <>
                            Show Less
                            <ChevronUp size={11} />
                          </>
                        ) : (
                          <>
                            See More
                            <ChevronDown size={11} />
                          </>
                        )}
                      </button>

                    </div>

                    {/* =================================================
                        EXPANDED DETAILS
                    ================================================= */}

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className="
                              border-t
                              border-white/[0.06]
                              bg-black/20
                              p-3
                            "
                          >

                            {/* =================================================
                                CUSTOMER DETAILS
                            ================================================= */}

                            <div>

                              <div
                                className="
                                  mb-2
                                  flex
                                  items-center
                                  gap-1.5
                                "
                              >
                                <User
                                  size={11}
                                  className="text-red-400"
                                />

                                <h4
                                  className="
                                    font-bebas
                                    text-sm
                                    uppercase
                                    tracking-wide
                                    text-white
                                  "
                                >
                                  Customer Details
                                </h4>
                              </div>

                              <div
                                className="
                                  grid
                                  grid-cols-2
                                  gap-1.5
                                "
                              >

                                {/* NAME */}

                                <div
                                  className="
                                    rounded-lg
                                    border
                                    border-white/[0.05]
                                    bg-white/[0.018]
                                    p-2
                                  "
                                >
                                  <div className="flex items-center gap-1">
                                    <User
                                      size={9}
                                      className="text-zinc-700"
                                    />

                                    <span
                                      className="
                                        text-[6px]
                                        uppercase
                                        tracking-[0.12em]
                                        text-zinc-700
                                      "
                                    >
                                      Name
                                    </span>
                                  </div>

                                  <p
                                    className="
                                      mt-1
                                      truncate
                                      text-[8px]
                                      text-zinc-300
                                    "
                                  >
                                    {order.customer?.name ||
                                      "-"}
                                  </p>
                                </div>

                                {/* EMAIL */}

                                <div
                                  className="
                                    rounded-lg
                                    border
                                    border-white/[0.05]
                                    bg-white/[0.018]
                                    p-2
                                  "
                                >
                                  <div className="flex items-center gap-1">
                                    <Mail
                                      size={9}
                                      className="text-zinc-700"
                                    />

                                    <span
                                      className="
                                        text-[6px]
                                        uppercase
                                        tracking-[0.12em]
                                        text-zinc-700
                                      "
                                    >
                                      Email
                                    </span>
                                  </div>

                                  <p
                                    className="
                                      mt-1
                                      truncate
                                      text-[8px]
                                      text-zinc-300
                                    "
                                  >
                                    {order.customer?.email ||
                                      "-"}
                                  </p>
                                </div>

                                {/* PHONE */}

                                <div
                                  className="
                                    rounded-lg
                                    border
                                    border-white/[0.05]
                                    bg-white/[0.018]
                                    p-2
                                  "
                                >
                                  <div className="flex items-center gap-1">
                                    <Phone
                                      size={9}
                                      className="text-zinc-700"
                                    />

                                    <span
                                      className="
                                        text-[6px]
                                        uppercase
                                        tracking-[0.12em]
                                        text-zinc-700
                                      "
                                    >
                                      Phone
                                    </span>
                                  </div>

                                  <p
                                    className="
                                      mt-1
                                      text-[8px]
                                      text-zinc-300
                                    "
                                  >
                                    {order.customer?.phone ||
                                      "-"}
                                  </p>
                                </div>

                                {/* ADDRESS */}

                                <div
                                  className="
                                    col-span-2
                                    rounded-lg
                                    border
                                    border-white/[0.05]
                                    bg-white/[0.018]
                                    p-2
                                  "
                                >
                                  <div className="flex items-center gap-1">
                                    <MapPin
                                      size={9}
                                      className="text-zinc-700"
                                    />

                                    <span
                                      className="
                                        text-[6px]
                                        uppercase
                                        tracking-[0.12em]
                                        text-zinc-700
                                      "
                                    >
                                      Address
                                    </span>
                                  </div>

                                  <p
                                    className="
                                      mt-1
                                      text-[8px]
                                      leading-4
                                      text-zinc-300
                                    "
                                  >
                                    {order.customer?.address ||
                                      "-"}
                                  </p>
                                </div>

                              </div>
                            </div>

                            {/* =================================================
                                PRODUCTS
                            ================================================= */}

                            <div className="mt-5">

                              <div
                                className="
                                  mb-2
                                  flex
                                  items-center
                                  justify-between
                                "
                              >
                                <div className="flex items-center gap-1.5">

                                  <Package
                                    size={11}
                                    className="text-red-400"
                                  />

                                  <h4
                                    className="
                                      font-bebas
                                      text-sm
                                      uppercase
                                      tracking-wide
                                      text-white
                                    "
                                  >
                                    Products
                                  </h4>

                                </div>

                                <span
                                  className="
                                    text-[6px]
                                    uppercase
                                    tracking-[0.12em]
                                    text-zinc-700
                                  "
                                >
                                  {order.items?.length || 0}{" "}
                                  item(s)
                                </span>
                              </div>

                              <div className="space-y-1.5">

                                {order.items?.map(
                                  (item, itemIndex) => (
                                    <div
                                      key={`${order._id}-${itemIndex}`}
                                      className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        border
                                        border-white/[0.05]
                                        bg-white/[0.018]
                                        p-2
                                      "
                                    >

                                      {/* IMAGE */}

                                      <div
                                        className="
                                          h-10
                                          w-10
                                          shrink-0
                                          overflow-hidden
                                          rounded-lg
                                          border
                                          border-white/[0.06]
                                          bg-[#111]
                                        "
                                      >
                                        {item.image ? (
                                          <img
                                            src={item.image}
                                            alt={
                                              item.name ||
                                              "Product"
                                            }
                                            className="
                                              h-full
                                              w-full
                                              object-cover
                                            "
                                          />
                                        ) : (
                                          <div
                                            className="
                                              flex
                                              h-full
                                              w-full
                                              items-center
                                              justify-center
                                              text-zinc-700
                                            "
                                          >
                                            <Package
                                              size={14}
                                            />
                                          </div>
                                        )}
                                      </div>

                                      {/* INFO */}

                                      <div className="min-w-0 flex-1">

                                        <h5
                                          className="
                                            truncate
                                            font-bebas
                                            text-sm
                                            uppercase
                                            tracking-wide
                                            text-white
                                          "
                                        >
                                          {item.name ||
                                            "Product"}
                                        </h5>

                                        <div
                                          className="
                                            mt-0.5
                                            flex
                                            flex-wrap
                                            gap-1
                                          "
                                        >
                                          {item.category && (
                                            <span
                                              className="
                                                rounded-full
                                                bg-white/[0.04]
                                                px-1.5
                                                py-0.5
                                                text-[5px]
                                                uppercase
                                                tracking-wider
                                                text-zinc-600
                                              "
                                            >
                                              {item.category}
                                            </span>
                                          )}

                                          {item.material && (
                                            <span
                                              className="
                                                rounded-full
                                                bg-white/[0.04]
                                                px-1.5
                                                py-0.5
                                                text-[5px]
                                                uppercase
                                                tracking-wider
                                                text-zinc-600
                                              "
                                            >
                                              {item.material}
                                            </span>
                                          )}

                                          {item.finish && (
                                            <span
                                              className="
                                                rounded-full
                                                bg-white/[0.04]
                                                px-1.5
                                                py-0.5
                                                text-[5px]
                                                uppercase
                                                tracking-wider
                                                text-zinc-600
                                              "
                                            >
                                              {item.finish}
                                            </span>
                                          )}
                                        </div>

                                        <p
                                          className="
                                            mt-1
                                            text-[6px]
                                            text-zinc-700
                                          "
                                        >
                                          {Number(
                                            item.price || 0
                                          ).toLocaleString()}{" "}
                                          DH ×{" "}
                                          {item.quantity || 0}
                                        </p>

                                      </div>

                                      {/* ITEM TOTAL */}

                                      <div className="shrink-0 text-right">

                                        <p
                                          className="
                                            font-bebas
                                            text-sm
                                            text-white
                                          "
                                        >
                                          {(
                                            Number(
                                              item.price || 0
                                            ) *
                                            Number(
                                              item.quantity || 0
                                            )
                                          ).toLocaleString()}{" "}
                                          DH
                                        </p>

                                        <p
                                          className="
                                            text-[5px]
                                            uppercase
                                            tracking-wider
                                            text-zinc-700
                                          "
                                        >
                                          Total
                                        </p>

                                      </div>

                                    </div>
                                  )
                                )}

                              </div>
                            </div>

                            {/* =================================================
                                ORDER SUMMARY
                            ================================================= */}

                            <div
                              className="
                                mt-5
                                rounded-lg
                                border
                                border-white/[0.05]
                                bg-white/[0.018]
                                p-2.5
                              "
                            >
                              <div className="space-y-2">

                                <div className="flex items-center justify-between">
                                  <span className="text-[7px] text-zinc-700">
                                    Subtotal
                                  </span>

                                  <span className="text-[8px] text-zinc-300">
                                    {Number(
                                      order.subtotal || 0
                                    ).toLocaleString()}{" "}
                                    DH
                                  </span>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-[7px] text-zinc-700">
                                    Shipping
                                  </span>

                                  <span className="text-[8px] text-green-400">
                                    {Number(
                                      order.shipping || 0
                                    ) === 0
                                      ? "Free"
                                      : `${Number(
                                          order.shipping || 0
                                        ).toLocaleString()} DH`}
                                  </span>
                                </div>

                                <div
                                  className="
                                    flex
                                    items-center
                                    justify-between
                                    border-t
                                    border-white/[0.06]
                                    pt-2
                                  "
                                >
                                  <span
                                    className="
                                      font-bebas
                                      text-sm
                                      uppercase
                                      text-white
                                    "
                                  >
                                    Total
                                  </span>

                                  <span
                                    className="
                                      font-bebas
                                      text-lg
                                      text-white
                                    "
                                  >
                                    {Number(
                                      order.total || 0
                                    ).toLocaleString()}{" "}
                                    DH
                                  </span>
                                </div>

                              </div>
                            </div>

                            {/* =================================================
                                DATE / TIME
                            ================================================= */}

                            <div
                              className="
                                mt-3
                                flex
                                flex-wrap
                                gap-3
                                text-[6px]
                                uppercase
                                tracking-[0.12em]
                                text-zinc-700
                              "
                            >
                              <span className="flex items-center gap-1">
                                <CalendarDays size={9} />

                                {formatDate(
                                  order.createdAt
                                )}
                              </span>

                              <span className="flex items-center gap-1">
                                <Clock3 size={9} />

                                {formatTime(
                                  order.createdAt
                                )}
                              </span>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        {orders.length > 6 && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-2
              left-1/2
              z-30
              -translate-x-1/2
              rounded-full
              border
              border-white/[0.06]
              bg-black/70
              px-3
              py-1
              text-[7px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-zinc-600
              backdrop-blur-md
            "
          >
            Scroll
          </div>
        )}
      </section>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <AnimatePresence>
        {deletingOrder && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeDeleteConfirmation}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/75
              p-4
              backdrop-blur-md
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                w-full
                max-w-[360px]
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#0a0a0a]
                shadow-[0_30px_100px_rgba(0,0,0,.75)]
              "
            >

              {/* RED ACCENT */}

              <div
                className="
                  h-[2px]
                  w-full
                  bg-gradient-to-r
                  from-red-600
                  via-red-400
                  to-transparent
                "
              />

              <div className="p-4">

                {/* HEADER */}

                <div className="flex items-start gap-3">

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
                    <Trash2 size={15} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <div>
                        <h3
                          className="
                            font-bebas
                            text-[23px]
                            uppercase
                            leading-none
                            tracking-wide
                            text-white
                          "
                        >
                          Delete Order?
                        </h3>

                        <p
                          className="
                            mt-2
                            text-[10px]
                            leading-5
                            text-zinc-500
                          "
                        >
                          Delete the order from{" "}
                          <span className="font-semibold text-zinc-300">
                            {deletingOrder.customer?.name ||
                              "this customer"}
                          </span>
                          ?
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={closeDeleteConfirmation}
                        disabled={deleteLoading}
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-white/[0.06]
                          text-zinc-700
                          transition
                          hover:bg-white/[0.05]
                          hover:text-white
                          disabled:opacity-40
                        "
                      >
                        <X size={12} />
                      </button>

                    </div>

                    <p
                      className="
                        mt-1
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-red-400/60
                      "
                    >
                      This action cannot be undone
                    </p>

                  </div>
                </div>

                {/* ORDER INFO */}

                <div
                  className="
                    mt-4
                    rounded-xl
                    border
                    border-white/[0.05]
                    bg-white/[0.018]
                    p-3
                  "
                >
                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <p
                        className="
                          text-[7px]
                          uppercase
                          tracking-[0.12em]
                          text-zinc-700
                        "
                      >
                        Order
                      </p>

                      <p
                        className="
                          mt-1
                          font-mono
                          text-[8px]
                          text-zinc-500
                        "
                      >
                        #{deletingOrder._id?.slice(-8)}
                      </p>
                    </div>

                    <div className="text-right">

                      <p
                        className="
                          text-[7px]
                          uppercase
                          tracking-[0.12em]
                          text-zinc-700
                        "
                      >
                        Total
                      </p>

                      <p
                        className="
                          mt-1
                          font-bebas
                          text-lg
                          text-white
                        "
                      >
                        {Number(
                          deletingOrder.total || 0
                        ).toLocaleString()}{" "}
                        DH
                      </p>

                    </div>

                  </div>
                </div>

                {/* BUTTONS */}

                <div className="mt-4 grid grid-cols-2 gap-2">

                  <button
                    type="button"
                    disabled={deleteLoading}
                    onClick={closeDeleteConfirmation}
                    className="
                      h-9
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-white/[0.02]
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-zinc-500
                      transition-all
                      hover:bg-white/[0.05]
                      hover:text-white
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={deleteLoading}
                    onClick={handleDeleteOrder}
                    className="
                      flex
                      h-9
                      items-center
                      justify-center
                      gap-1.5
                      rounded-xl
                      bg-red-600
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-white
                      transition-all
                      hover:bg-red-500
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {deleteLoading ? (
                      <span
                        className="
                          h-3
                          w-3
                          animate-spin
                          rounded-full
                          border-2
                          border-white/30
                          border-t-white
                        "
                      />
                    ) : (
                      <Trash2 size={11} />
                    )}

                    {deleteLoading
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

