
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Users,
  Search,
  Trash2,
  RefreshCw,
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/subscribers`;

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // DELETE MODAL
  const [subscriberToDelete, setSubscriberToDelete] =
    useState(null);

  // SUCCESS TOAST
  const [successMessage, setSuccessMessage] =
    useState("");

  // =====================================================
  // FETCH SUBSCRIBERS
  // =====================================================

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch subscribers."
        );
      }

      setSubscribers(
        result.subscribers ||
          result.data ||
          []
      );
    } catch (error) {
      console.error(
        "FETCH SUBSCRIBERS ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to load subscribers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // =====================================================
  // SUCCESS TOAST AUTO HIDE
  // =====================================================

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [successMessage]);

  // =====================================================
  // DELETE SUBSCRIBER
  // =====================================================

  const handleDelete = async () => {
    if (!subscriberToDelete) return;

    const id = subscriberToDelete._id;

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete subscriber."
        );
      }

      setSubscribers((current) =>
        current.filter(
          (subscriber) =>
            subscriber._id !== id
        )
      );

      setSubscriberToDelete(null);

      setSuccessMessage(
        "Subscriber deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE SUBSCRIBER ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to delete subscriber."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredSubscribers = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return subscribers;
    }

    return subscribers.filter(
      (subscriber) =>
        subscriber.email
          ?.toLowerCase()
          .includes(value)
    );
  }, [subscribers, search]);

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">

      {/* =====================================================
          SUCCESS TOAST
      ===================================================== */}

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
          className="
  fixed
  left-1/2
  top-1/2
  z-[9999]
  flex
  min-w-[300px]
  -translate-x-1/2
  -translate-y-1/2
  items-center
  gap-3
  overflow-hidden
  rounded-2xl
  border
  border-emerald-500/20
  bg-[#0b0b0b]/95
  px-4
  py-3.5
  shadow-[0_30px_100px_rgba(0,0,0,0.55)]
  backdrop-blur-xl
"
          >
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
                border-emerald-500/20
                bg-emerald-500/10
                text-emerald-400
              "
            >
              <CheckCircle2 size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-emerald-400
                "
              >
                Success
              </p>

              <p className="mt-0.5 text-xs font-medium text-zinc-200">
                {successMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSuccessMessage("")
              }
              className="
                text-zinc-600
                transition
                hover:text-zinc-300
              "
            >
              <X size={15} />
            </button>

            <div
              className="
                absolute
                bottom-0
                left-0
                h-[2px]
                w-full
                origin-left
                animate-[toastProgress_3.5s_linear]
                bg-emerald-500/60
              "
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      <AnimatePresence>
        {subscriberToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[9998]
              flex
              items-center
              justify-center
              bg-black/70
              px-4
              backdrop-blur-md
            "
            onClick={() =>
              !deletingId &&
              setSubscriberToDelete(null)
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.96,
              }}
              transition={{
                duration: 0.22,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                relative
                w-full
                max-w-[430px]
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.08]
                bg-[#0b0b0b]
                p-6
                shadow-[0_30px_100px_rgba(0,0,0,0.6)]
              "
            >
              {/* Top accent */}

              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-[2px]
                  bg-gradient-to-r
                  from-red-600
                  via-red-400
                  to-transparent
                "
              />

              {/* Close */}

              <button
                type="button"
                disabled={!!deletingId}
                onClick={() =>
                  setSubscriberToDelete(null)
                }
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-white/[0.06]
                  bg-white/[0.02]
                  text-zinc-600
                  transition
                  hover:border-white/[0.1]
                  hover:text-zinc-300
                  disabled:opacity-40
                "
              >
                <X size={14} />
              </button>

              {/* Icon */}

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
                  bg-red-500/[0.07]
                  text-red-400
                "
              >
                <AlertTriangle size={21} />
              </div>

              <div className="mt-5">
                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-red-500
                  "
                >
                  Delete Subscriber
                </p>

                <h2
                  className="
                    mt-1
                    font-bebas
                    text-3xl
                    uppercase
                    tracking-wide
                    text-white
                  "
                >
                  Are you sure?
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-zinc-500
                  "
                >
                  This subscriber will be permanently
                  removed from your newsletter audience.
                </p>

                {/* Subscriber */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                    p-3
                  "
                >
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
                      bg-red-500/[0.05]
                      text-red-400
                    "
                  >
                    <Mail size={15} />
                  </div>

                  <p className="min-w-0 truncate text-xs font-medium text-zinc-300">
                    {subscriberToDelete.email}
                  </p>
                </div>
              </div>

              {/* Actions */}

              <div
                className="
                  mt-6
                  flex
                  gap-3
                "
              >
                <button
                  type="button"
                  disabled={!!deletingId}
                  onClick={() =>
                    setSubscriberToDelete(null)
                  }
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-4
                    py-3
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-zinc-500
                    transition-all
                    duration-300
                    hover:border-white/[0.12]
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={!!deletingId}
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-3
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-red-400
                    transition-all
                    duration-300
                    hover:border-red-500/40
                    hover:bg-red-500
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {deletingId ? (
                    <>
                      <RefreshCw
                        size={14}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          bg-[#090909]
          p-6
          sm:p-8
        "
      >
        {/* Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-56
            w-56
            rounded-full
            bg-red-600/10
            blur-3xl
          "
        />

        {/* Accent */}

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

        <div
          className="
            relative
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.32em]
                text-red-500
              "
            >
              Audience
            </p>

            <h1
              className="
                mt-2
                font-bebas
                text-5xl
                uppercase
                tracking-[0.06em]
                text-white
                sm:text-6xl
              "
            >
              Subscribers
            </h1>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-zinc-500
              "
            >
              Manage newsletter subscribers
              and keep track of your Kadecho
              audience.
            </p>
          </div>

          {/* Total */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/[0.07]
              bg-black/40
              px-4
              py-3
            "
          >
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
                text-red-400
              "
            >
              <Users size={18} />
            </div>

            <div>
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-600
                "
              >
                Total
              </p>

              <p
                className="
                  mt-0.5
                  font-bebas
                  text-2xl
                  leading-none
                  text-white
                "
              >
                {loading
                  ? "—"
                  : subscribers.length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        {/* Search */}

        <div
          className="
            flex
            w-full
            max-w-md
            items-center
            gap-2
            rounded-xl
            border
            border-white/[0.07]
            bg-[#0a0a0a]
            px-3
            py-2.5
            transition-all
            duration-300
            focus-within:border-red-500/25
            focus-within:shadow-[0_0_25px_rgba(239,68,68,.06)]
          "
        >
          <Search
            size={15}
            className="text-zinc-600"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search subscriber..."
            className="
              min-w-0
              flex-1
              bg-transparent
              text-xs
              text-white
              outline-none
              placeholder:text-zinc-700
            "
          />
        </div>

        {/* Refresh */}

        <button
          type="button"
          onClick={fetchSubscribers}
          disabled={loading}
          className="
            group
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-white/[0.07]
            bg-[#0a0a0a]
            px-4
            py-2.5
            text-[9px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-zinc-500
            transition-all
            duration-300
            hover:border-red-500/20
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RefreshCw
            size={14}
            className={
              loading
                ? "animate-spin"
                : "transition-transform duration-300 group-hover:rotate-180"
            }
          />

          Refresh
        </button>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            className="
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              border-red-500/15
              bg-red-500/[0.04]
              px-4
              py-3
              text-xs
              text-red-400
            "
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-500/50 hover:text-red-400"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.07]
          bg-[#0a0a0a]
          shadow-[0_20px_70px_rgba(0,0,0,0.18)]
        "
      >
        {/* Table Header */}

        <div
          className="
            hidden
            grid-cols-[1fr_180px_70px]
            gap-4
            border-b
            border-white/[0.06]
            px-5
            py-3
            md:grid
          "
        >
          <p
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-zinc-600
            "
          >
            Subscriber
          </p>

          <p
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-zinc-600
            "
          >
            Joined
          </p>

          <p
            className="
              text-right
              text-[8px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-zinc-600
            "
          >
            Action
          </p>
        </div>

        {/* =================================================
            SCROLLABLE SECTION
        ================================================= */}

        <div
          className="
            max-h-[620px]
            overflow-y-auto
            overscroll-contain
            [scrollbar-color:rgba(239,68,68,0.35)_transparent]
            [scrollbar-width:thin]
          "
        >
          {/* Loading */}

          {loading && (
            <div className="divide-y divide-white/[0.05]">
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-4
                      px-5
                      py-4
                    "
                  >
                    <div
                      className="
                        h-10
                        w-10
                        animate-pulse
                        rounded-xl
                        bg-white/[0.04]
                      "
                    />

                    <div className="flex-1 space-y-2">
                      <div
                        className="
                          h-3
                          w-48
                          animate-pulse
                          rounded
                          bg-white/[0.04]
                        "
                      />

                      <div
                        className="
                          h-2
                          w-24
                          animate-pulse
                          rounded
                          bg-white/[0.03]
                        "
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Empty */}

          {!loading &&
            filteredSubscribers.length === 0 && (
              <div
                className="
                  flex
                  min-h-[300px]
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
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-white/[0.02]
                    text-zinc-600
                  "
                >
                  <Mail size={22} />
                </div>

                <h3
                  className="
                    mt-4
                    font-bebas
                    text-2xl
                    uppercase
                    tracking-wide
                    text-white
                  "
                >
                  No subscribers
                </h3>

                <p
                  className="
                    mt-1
                    max-w-sm
                    text-xs
                    leading-5
                    text-zinc-600
                  "
                >
                  {search
                    ? "No subscriber matches your search."
                    : "Newsletter subscribers will appear here."}
                </p>
              </div>
            )}

          {/* Subscribers */}

          {!loading &&
            filteredSubscribers.length > 0 && (
              <div className="divide-y divide-white/[0.05]">
                {filteredSubscribers.map(
                  (subscriber, index) => (
                    <motion.div
                      key={subscriber._id}
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.035,
                      }}
                      className="
                        group
                        grid
                        gap-4
                        px-5
                        py-4
                        transition-colors
                        duration-300
                        hover:bg-white/[0.015]
                        md:grid-cols-[1fr_180px_70px]
                        md:items-center
                      "
                    >
                      {/* Email */}

                      <div
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-red-500/10
                            bg-red-500/[0.05]
                            text-red-400
                            transition-all
                            duration-300
                            group-hover:border-red-500/20
                            group-hover:bg-red-500/[0.08]
                          "
                        >
                          <Mail size={16} />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              text-sm
                              font-medium
                              text-zinc-200
                            "
                          >
                            {subscriber.email}
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-[8px]
                              uppercase
                              tracking-[0.15em]
                              text-zinc-700
                            "
                          >
                            Newsletter subscriber
                          </p>
                        </div>
                      </div>

                      {/* Date */}

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-zinc-500
                        "
                      >
                        <CalendarDays
                          size={14}
                          className="text-zinc-700"
                        />

                        <span
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.08em]
                          "
                        >
                          {formatDate(
                            subscriber.createdAt
                          )}
                        </span>
                      </div>

                      {/* Delete */}

                      <div className="flex md:justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            setSubscriberToDelete(
                              subscriber
                            )
                          }
                          disabled={
                            deletingId ===
                            subscriber._id
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-white/[0.06]
                            bg-white/[0.02]
                            text-zinc-600
                            transition-all
                            duration-300
                            hover:border-red-500/20
                            hover:bg-red-500/[0.06]
                            hover:text-red-400
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                          title="Delete subscriber"
                        >
                          {deletingId ===
                          subscriber._id ? (
                            <RefreshCw
                              size={14}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            )}
        </div>
      </div>

      {/* =====================================================
          FOOTER INFO
      ===================================================== */}

      {!loading &&
        subscribers.length > 0 && (
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
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-500
                  shadow-[0_0_10px_rgba(16,185,129,0.4)]
                "
              />

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-zinc-600
                "
              >
                Subscriber database online
              </span>
            </div>

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-zinc-700
              "
            >
              {filteredSubscribers.length}{" "}
              visible
            </span>
          </div>
        )}
    </div>
  );
}

