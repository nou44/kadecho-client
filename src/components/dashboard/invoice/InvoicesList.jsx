
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  FileText,
  RefreshCw,
  X,
  AlertTriangle,
  Receipt,
  CalendarDays,
  User,
  ChevronRight,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/invoices";

export default function InvoicesList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  // =====================================================
  // DELETE CONFIRMATION
  // =====================================================

  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  // =====================================================
  // GET INVOICES
  // =====================================================

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch invoices"
        );
      }

      setInvoices(result.invoices || result.data || []);
    } catch (error) {
      console.error("FETCH INVOICES ERROR:", error);

      setError(
        error.message || "Failed to load invoices."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    fetchInvoices();
  }, []);

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete invoice"
        );
      }

      setInvoices((prev) =>
        prev.filter(
          (invoice) => invoice._id !== id
        )
      );

      setInvoiceToDelete(null);
    } catch (error) {
      console.error(
        "DELETE INVOICE ERROR:",
        error
      );

      alert(
        error.message ||
          "Failed to delete invoice."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // STATS
  // =====================================================

  const totalAmount = useMemo(() => {
    return invoices.reduce(
      (sum, invoice) =>
        sum + Number(invoice.total || 0),
      0
    );
  }, [invoices]);

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString(
      "en-US",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
          rounded-[24px]
          border
          border-white/[0.08]
          bg-[#090909]
          shadow-[0_20px_70px_rgba(0,0,0,.35)]
        "
      >
        {/* TOP ACCENT */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/[0.06]
            px-4
            py-4
            sm:px-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-red-500/15
                bg-red-500/[0.06]
              "
            >
              <Receipt
                size={17}
                className="text-red-400"
              />
            </div>

            <div>
              <div
                className="
                  h-3
                  w-24
                  animate-pulse
                  rounded
                  bg-white/[0.08]
                "
              />

              <div
                className="
                  mt-2
                  h-2
                  w-32
                  animate-pulse
                  rounded
                  bg-white/[0.04]
                "
              />
            </div>
          </div>
        </div>

        {/* SKELETON */}

        <div className="space-y-2 p-3 sm:p-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/[0.05]
                bg-white/[0.015]
                p-3
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    h-10
                    w-10
                    animate-pulse
                    rounded-xl
                    bg-white/[0.05]
                  "
                />

                <div>
                  <div
                    className="
                      h-2.5
                      w-28
                      animate-pulse
                      rounded
                      bg-white/[0.06]
                    "
                  />

                  <div
                    className="
                      mt-2
                      h-2
                      w-20
                      animate-pulse
                      rounded
                      bg-white/[0.04]
                    "
                  />
                </div>
              </div>

              <div
                className="
                  h-8
                  w-20
                  animate-pulse
                  rounded-lg
                  bg-white/[0.04]
                "
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <motion.section
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-red-500/15
          bg-[#090909]
          p-6
          shadow-[0_20px_70px_rgba(0,0,0,.35)]
        "
      >
        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />

        <div className="flex flex-col items-center text-center">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/[0.06]
            "
          >
            <AlertTriangle
              size={19}
              className="text-red-400"
            />
          </div>

          <h3
            className="
              mt-4
              text-sm
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            Unable to load invoices
          </h3>

          <p className="mt-2 max-w-sm text-xs leading-5 text-zinc-600">
            {error}
          </p>

          <motion.button
            type="button"
            whileHover={{
              y: -1,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={fetchInvoices}
            className="
              mt-5
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.03]
              px-4
              py-2.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-zinc-300
              transition-all
              duration-300
              hover:border-red-500/30
              hover:bg-red-500/[0.06]
              hover:text-red-400
            "
          >
            <RefreshCw size={13} />
            Retry
          </motion.button>
        </div>
      </motion.section>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (invoices.length === 0) {
    return (
      <motion.section
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-white/[0.08]
          bg-[#090909]
          p-8
          shadow-[0_20px_70px_rgba(0,0,0,.35)]
        "
      >
        <div
          className="
            absolute
            left-0
            right-0
            top-0
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />

        <div className="flex flex-col items-center text-center">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              shadow-[0_10px_30px_rgba(0,0,0,.25)]
            "
          >
            <FileText
              size={22}
              className="text-zinc-700"
            />
          </div>

          <h3
            className="
              mt-5
              text-sm
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            No invoices
          </h3>

          <p className="mt-2 text-xs text-zinc-600">
            Your created invoices will appear here.
          </p>
        </div>
      </motion.section>
    );
  }

  // =====================================================
  // LIST
  // =====================================================

  return (
    <>
      <section
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-white/[0.08]
          bg-[#090909]
          shadow-[0_25px_80px_rgba(0,0,0,.35)]
        "
      >
        {/* ================================================= */}
        {/* TOP ACCENT */}
        {/* ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-0
            z-20
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            relative
            flex
            flex-col
            gap-4
            border-b
            border-white/[0.06]
            px-4
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >
          {/* LEFT */}

          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-red-500/15
                bg-red-500/[0.06]
                text-red-400
              "
            >
              <Receipt size={17} />

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-4
                  min-w-4
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#090909]
                  bg-red-500
                  px-1
                  text-[7px]
                  font-bold
                  text-white
                "
              >
                {invoices.length}
              </span>
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white
                "
              >
                Invoices
              </h2>

              <p className="mt-1 text-[10px] text-zinc-600">
                Manage your generated invoices
              </p>
            </div>
          </div>

          {/* RIGHT STATS */}

          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-3
            "
          >
            <div
              className="
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                px-3
                py-2
              "
            >
              <p
                className="
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-zinc-600
                "
              >
                Total
              </p>

              <p className="mt-0.5 text-xs font-bold text-zinc-300">
                {formatMoney(totalAmount)} DH
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{
                scale: 1.05,
                rotate: 20,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={fetchInvoices}
              className="
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
                transition-all
                duration-300
                hover:border-red-500/25
                hover:bg-red-500/[0.06]
                hover:text-red-400
              "
              aria-label="Refresh invoices"
            >
              <RefreshCw size={14} />
            </motion.button>
          </div>
        </div>

        {/* ================================================= */}
        {/* SCROLL AREA */}
        {/* ================================================= */}

        <div
          className="
            max-h-[560px]
            overflow-y-auto
            p-3
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-white/10
            sm:p-4
          "
        >
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {invoices.map((invoice, index) => {
                const isDeleting =
                  deletingId === invoice._id;

                return (
                  <motion.div
                    key={invoice._id}
                    layout
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: isDeleting ? 0.55 : 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                      height: 0,
                      marginBottom: 0,
                    }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(
                        index * 0.025,
                        0.2
                      ),
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[18px]
                      border
                      border-white/[0.06]
                      bg-white/[0.018]
                      transition-all
                      duration-300
                      hover:border-white/[0.11]
                      hover:bg-white/[0.025]
                    "
                  >
                    {/* RED HOVER LINE */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-0
                        top-0
                        w-[2px]
                        origin-center
                        scale-y-0
                        bg-gradient-to-b
                        from-red-500
                        via-red-400
                        to-transparent
                        transition-transform
                        duration-300
                        group-hover:scale-y-100
                      "
                    />

                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                        p-3
                        sm:p-3.5
                      "
                    >
                      {/* ================================================= */}
                      {/* ICON */}
                      {/* ================================================= */}

                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          rotate: -3,
                        }}
                        className="
                          relative
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-red-500/10
                          bg-red-500/[0.045]
                          text-red-400
                          transition-all
                          duration-300
                          group-hover:border-red-500/20
                          group-hover:bg-red-500/[0.07]
                        "
                      >
                        <FileText size={16} />

                        <span
                          className="
                            absolute
                            bottom-1
                            right-1
                            h-1
                            w-1
                            rounded-full
                            bg-red-500
                            opacity-60
                          "
                        />
                      </motion.div>

                      {/* ================================================= */}
                      {/* MAIN INFO */}
                      {/* ================================================= */}

                      <div className="min-w-0 flex-1">
                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-2
                          "
                        >
                          <p
                            className="
                              min-w-0
                              truncate
                              text-[12px]
                              font-bold
                              tracking-wide
                              text-zinc-200
                              transition-colors
                              duration-300
                              group-hover:text-white
                            "
                          >
                            {invoice.invoiceNumber ||
                              "INV-000000"}
                          </p>

                          <span
                            className="
                              hidden
                              shrink-0
                              rounded-full
                              border
                              border-emerald-500/10
                              bg-emerald-500/[0.04]
                              px-2
                              py-0.5
                              text-[7px]
                              font-bold
                              uppercase
                              tracking-[0.12em]
                              text-emerald-500/70
                              sm:inline-flex
                            "
                          >
                            Invoice
                          </span>
                        </div>

                        <div
                          className="
                            mt-1.5
                            flex
                            min-w-0
                            items-center
                            gap-2
                          "
                        >
                          <User
                            size={10}
                            className="
                              shrink-0
                              text-zinc-700
                            "
                          />

                          <p
                            className="
                              truncate
                              text-[10px]
                              text-zinc-600
                            "
                          >
                            {invoice.client?.name ||
                              "No client"}
                          </p>
                        </div>
                      </div>

                      {/* ================================================= */}
                      {/* DATE */}
                      {/* ================================================= */}

                      <div
                        className="
                          hidden
                          shrink-0
                          items-center
                          gap-2
                          lg:flex
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
                            border-white/[0.05]
                            bg-white/[0.02]
                            text-zinc-600
                          "
                        >
                          <CalendarDays size={13} />
                        </div>

                        <div>
                          <p
                            className="
                              text-[7px]
                              font-semibold
                              uppercase
                              tracking-[0.15em]
                              text-zinc-700
                            "
                          >
                            Date
                          </p>

                          <p className="mt-0.5 text-[10px] text-zinc-500">
                            {formatDate(
                              invoice.date
                            )}
                          </p>
                        </div>
                      </div>

                      {/* ================================================= */}
                      {/* TOTAL */}
                      {/* ================================================= */}

                      <div
                        className="
                          hidden
                          min-w-[105px]
                          shrink-0
                          text-right
                          sm:block
                        "
                      >
                        <p
                          className="
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.15em]
                            text-zinc-700
                          "
                        >
                          Total
                        </p>

                        <p
                          className="
                            mt-0.5
                            whitespace-nowrap
                            text-xs
                            font-bold
                            text-zinc-200
                          "
                        >
                          {formatMoney(
                            invoice.total
                          )}{" "}
                          <span className="text-[9px] font-medium text-red-500/80">
                            DH
                          </span>
                        </p>
                      </div>

                      {/* ================================================= */}
                      {/* DELETE */}
                      {/* ================================================= */}

                      <motion.button
                        type="button"
                        disabled={isDeleting}
                        onClick={() =>
                          setInvoiceToDelete(
                            invoice
                          )
                        }
                        whileHover={{
                          scale: 1.06,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        className="
                          relative
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-xl
                          border
                          border-white/[0.07]
                          bg-white/[0.02]
                          text-zinc-600
                          transition-all
                          duration-300
                          hover:border-red-500/25
                          hover:bg-red-500/[0.07]
                          hover:text-red-400
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                        aria-label="Delete invoice"
                      >
                        <AnimatePresence
                          mode="wait"
                        >
                          {isDeleting ? (
                            <motion.span
                              key="loading"
                              initial={{
                                opacity: 0,
                                scale: 0.7,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.7,
                              }}
                              className="
                                h-3.5
                                w-3.5
                                animate-spin
                                rounded-full
                                border-2
                                border-white/10
                                border-t-red-500
                              "
                            />
                          ) : (
                            <motion.span
                              key="trash"
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                            >
                              <Trash2 size={14} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      {/* ARROW */}

                      <ChevronRight
                        size={13}
                        className="
                          hidden
                          shrink-0
                          text-zinc-800
                          transition-all
                          duration-300
                          group-hover:translate-x-0.5
                          group-hover:text-zinc-600
                          md:block
                        "
                      />
                    </div>

                    {/* ================================================= */}
                    {/* MOBILE META */}
                    {/* ================================================= */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/[0.04]
                        px-3
                        py-2
                        sm:hidden
                      "
                    >
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={10}
                          className="text-zinc-700"
                        />

                        <span className="text-[9px] text-zinc-600">
                          {formatDate(
                            invoice.date
                          )}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-zinc-300">
                        {formatMoney(
                          invoice.total
                        )}{" "}
                        <span className="text-red-500/80">
                          DH
                        </span>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-white/[0.05]
            bg-white/[0.012]
            px-4
            py-2.5
            sm:px-5
          "
        >
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-zinc-700
            "
          >
            Invoice Management
          </p>

          <p
            className="
              text-[8px]
              font-medium
              text-zinc-700
            "
          >
            {invoices.length}{" "}
            {invoices.length === 1
              ? "invoice"
              : "invoices"}
          </p>
        </div>
      </section>

      {/* ===================================================== */}
      {/* DELETE MODAL */}
      {/* ===================================================== */}

      <AnimatePresence>
        {invoiceToDelete && (
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
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              bg-black/70
              p-4
              backdrop-blur-md
            "
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                setInvoiceToDelete(null);
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 8,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              className="
                relative
                w-full
                max-w-[380px]
                overflow-hidden
                rounded-[24px]
                border
                border-white/[0.09]
                bg-[#0b0b0b]
                shadow-[0_30px_100px_rgba(0,0,0,.65)]
              "
            >
              {/* ACCENT */}

              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-[2px]
                  bg-gradient-to-r
                  from-transparent
                  via-red-500
                  to-transparent
                "
              />

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setInvoiceToDelete(null)
                }
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  text-zinc-600
                  transition-all
                  hover:border-white/[0.12]
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                <X size={14} />
              </button>

              <div className="p-6">
                {/* ICON */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-red-500/15
                    bg-red-500/[0.06]
                  "
                >
                  <Trash2
                    size={19}
                    className="text-red-400"
                  />
                </div>

                {/* TEXT */}

                <h3
                  className="
                    mt-5
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-white
                  "
                >
                  Delete invoice?
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-5
                    text-zinc-600
                  "
                >
                  This action will permanently
                  remove{" "}
                  <span className="font-semibold text-zinc-400">
                    {invoiceToDelete.invoiceNumber ||
                      "this invoice"}
                  </span>{" "}
                  from your invoices.
                </p>

                {/* ACTIONS */}

                <div
                  className="
                    mt-6
                    flex
                    gap-2
                  "
                >
                  <button
                    type="button"
                    disabled={
                      deletingId ===
                      invoiceToDelete._id
                    }
                    onClick={() =>
                      setInvoiceToDelete(null)
                    }
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-4
                      py-2.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-zinc-500
                      transition-all
                      hover:bg-white/[0.05]
                      hover:text-white
                    "
                  >
                    Cancel
                  </button>

                  <motion.button
                    type="button"
                    disabled={
                      deletingId ===
                      invoiceToDelete._id
                    }
                    onClick={() =>
                      handleDelete(
                        invoiceToDelete._id
                      )
                    }
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-red-500/20
                      bg-red-500/[0.08]
                      px-4
                      py-2.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      text-red-400
                      transition-all
                      hover:border-red-500/35
                      hover:bg-red-500/[0.14]
                      hover:text-red-300
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {deletingId ===
                    invoiceToDelete._id ? (
                      <>
                        <span
                          className="
                            h-3
                            w-3
                            animate-spin
                            rounded-full
                            border-2
                            border-red-500/20
                            border-t-red-400
                          "
                        />
                        Deleting
                      </>
                    ) : (
                      <>
                        <Trash2 size={12} />
                        Delete
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
