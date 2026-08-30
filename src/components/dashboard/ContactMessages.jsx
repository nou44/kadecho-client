
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  User,
  FileText,
  MessageSquare,
  RefreshCw,
  Inbox,
  Trash2,
  Clock3,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/contact`;

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingMessage, setDeletingMessage] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // =====================================================
  // FETCH
  // =====================================================

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result?.message || "Failed to fetch messages."
        );
      }

      setMessages(result.messages || []);
    } catch (error) {
      console.error("FETCH MESSAGES ERROR:", error);

      setError(
        error.message || "Failed to load messages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // =====================================================
  // DELETE
  // =====================================================

  const handleDeleteMessage = async () => {
    if (!deletingMessage) return;

    try {
      setDeleteLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/${deletingMessage._id}`,
        {
          method: "DELETE",
        }
      );

      /*
       * TEMP SAFE PARSER
       * Backend currently seems to return HTML on DELETE.
       * This prevents JSON.parse from crashing with:
       * Unexpected token '<'
       */
      const contentType =
        response.headers.get("content-type") || "";

      let result = {};

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();

        console.error(
          "DELETE RESPONSE IS NOT JSON:",
          text
        );

        throw new Error(
          `Delete endpoint returned ${response.status} instead of JSON.`
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result?.message ||
            "Failed to delete message."
        );
      }

      setMessages((prev) =>
        prev.filter(
          (message) =>
            message._id !== deletingMessage._id
        )
      );

      setDeletingMessage(null);
    } catch (error) {
      console.error("DELETE MESSAGE ERROR:", error);

      setError(
        error.message ||
          "Failed to delete message."
      );
    } finally {
      setDeleteLoading(false);
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
              Loading messages
            </p>
          </div>
        </div>
      </section>
    );
  }

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
            {/* Icon */}

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
              <Inbox size={16} />
            </div>

            {/* Title */}

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
                  {messages.length}
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
                Contact Messages
              </h1>
            </div>
          </div>

          {/* Refresh */}

          <button
            type="button"
            onClick={fetchMessages}
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
            <RefreshCw
              size={11}
              className={
                loading ? "animate-spin" : ""
              }
            />

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

        {!error && messages.length === 0 && (
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
              <Inbox size={21} />
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
              No Messages
            </h2>

            <p className="mt-1 text-[9px] text-zinc-600">
              Contact messages will appear here.
            </p>
          </div>
        )}

        {/* =================================================
            SCROLLABLE MESSAGES
        ================================================= */}

        {!error && messages.length > 0 && (
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
              {messages.map((item, index) => (
                <motion.article
                  key={item._id}
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
                    p-3
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
                      CARD HEADER
                  ================================================= */}

                  <div className="flex items-center justify-between gap-2">
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
                          {item.name || "Unknown"}
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
                          <Clock3 size={8} />

                          <span className="truncate">
                            {item.createdAt
                              ? new Date(
                                  item.createdAt
                                ).toLocaleString()
                              : "-"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        setDeletingMessage(item)
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
                      title="Delete message"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>

                  {/* =================================================
                      CONTACT INFO
                  ================================================= */}

                  <div className="mt-3 space-y-1.5">
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-white/[0.04]
                        bg-white/[0.012]
                        px-2
                        py-1.5
                      "
                    >
                      <Mail
                        size={10}
                        className="shrink-0 text-red-400/70"
                      />

                      <span
                        className="
                          truncate
                          text-[8px]
                          text-zinc-500
                        "
                      >
                        {item.email || "-"}
                      </span>
                    </div>

                    {item.phone && (
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-white/[0.04]
                          bg-white/[0.012]
                          px-2
                          py-1.5
                        "
                      >
                        <Phone
                          size={10}
                          className="shrink-0 text-red-400/70"
                        />

                        <span
                          className="
                            truncate
                            text-[8px]
                            text-zinc-500
                          "
                        >
                          {item.phone}
                        </span>
                      </div>
                    )}

                    {item.subject && (
                      <div
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-2
                          rounded-lg
                          border
                          border-white/[0.04]
                          bg-white/[0.012]
                          px-2
                          py-1.5
                        "
                      >
                        <FileText
                          size={10}
                          className="shrink-0 text-red-400/70"
                        />

                        <span
                          className="
                            truncate
                            text-[8px]
                            text-zinc-500
                          "
                        >
                          {item.subject}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* =================================================
                      MESSAGE
                  ================================================= */}

                  <div
                    className="
                      mt-3
                      rounded-lg
                      border
                      border-white/[0.045]
                      bg-black/20
                      p-2.5
                    "
                  >
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <MessageSquare
                        size={10}
                        className="text-red-400/70"
                      />

                      <span
                        className="
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-zinc-700
                        "
                      >
                        Message
                      </span>
                    </div>

                    <p
                      className="
                        line-clamp-3
                        text-[9px]
                        leading-[1.55]
                        text-zinc-500
                      "
                    >
                      {item.message || "-"}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        {messages.length > 6 && (
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
        {deletingMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              !deleteLoading &&
              setDeletingMessage(null)
            }
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
              onClick={(e) =>
                e.stopPropagation()
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

                  <div className="min-w-0">
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
                      Delete Message?
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[10px]
                        leading-5
                        text-zinc-500
                      "
                    >
                      Delete the message from{" "}
                      <span className="font-semibold text-zinc-300">
                        {deletingMessage.name}
                      </span>
                      ?
                    </p>

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

                {/* BUTTONS */}

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={deleteLoading}
                    onClick={() =>
                      setDeletingMessage(null)
                    }
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
                    onClick={
                      handleDeleteMessage
                    }
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

