
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Check,
  AlertCircle,
} from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+212 6 58 55 13 65",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@kadecho.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Agourai, Meknas, Morocco",
  },
];

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <span
          className="
            font-satoshi text-[9px] font-semibold
            uppercase tracking-[0.23em] text-red-500
          "
        >
          {eyebrow}
        </span>

        <h3
          className="
            mt-1 font-bebas text-[24px]
            uppercase leading-none
            tracking-[0.07em] text-white
          "
        >
          {title}
        </h3>
      </div>

      <span
        aria-hidden="true"
        className="
          mb-1 h-px w-8 shrink-0
          bg-gradient-to-r
          from-red-500/70 to-transparent
        "
      />
    </div>
  );
}

export default function FooterContent() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribeMessage, setSubscribeMessage] =
    useState("");
  const [subscribeSuccess, setSubscribeSuccess] =
    useState(false);

  const feedbackTimer = useRef(null);
  const requestController = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(feedbackTimer.current);
      requestController.current?.abort();
    };
  }, []);

  const handleSubscribe = async (event) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || submitting || subscribeSuccess) {
      return;
    }

    clearTimeout(feedbackTimer.current);

    const controller = new AbortController();
    requestController.current = controller;

    setSubmitting(true);
    setSubscribeSuccess(false);
    setSubscribeMessage("");

    try {
      const response = await fetch(
        `${API_URL}/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
          signal: controller.signal,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to subscribe"
        );
      }

      setEmail("");
      setSubscribeSuccess(true);
      setSubscribeMessage(
        "You're on the list. Welcome to Kadecho."
      );

      feedbackTimer.current = setTimeout(() => {
        setSubscribeSuccess(false);
        setSubscribeMessage("");
      }, 3500);
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error("SUBSCRIBE ERROR:", error);

      setSubscribeSuccess(false);
      setSubscribeMessage(
        error.message || "Something went wrong."
      );
    } finally {
      if (requestController.current === controller) {
        requestController.current = null;
      }

      if (!controller.signal.aborted) {
        setSubmitting(false);
      }
    }
  };

  return (
    <section
      className="
        relative grid
        gap-8
        border-b border-white/[0.06]
        py-8 sm:py-9
        md:grid-cols-2
        lg:grid-cols-[1fr_.8fr_1.1fr]
        lg:gap-9 lg:py-10
      "
    >
      {/* CONTACT */}
      <div className="min-w-0">
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact"
        />

        <div className="mt-5 space-y-2">
          {contactItems.map(
            ({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="
                  group flex items-center gap-3
                  rounded-xl
                  border border-white/[0.06]
                  bg-white/[0.018]
                  px-3 py-2.5
                  transition-[background-color,border-color]
                  duration-300
                  hover:border-red-500/20
                  hover:bg-red-500/[0.035]
                "
              >
                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    border border-red-500/15
                    bg-red-500/[0.06]
                    text-red-400
                    transition-colors duration-300
                    group-hover:border-red-500/30
                    group-hover:bg-red-500/10
                  "
                >
                  <Icon size={14} />
                </span>

                <div className="min-w-0">
                  <p
                    className="
                      text-[9px] font-semibold
                      uppercase tracking-[0.15em]
                      text-zinc-600
                    "
                  >
                    {label}
                  </p>

                  <p
                    className="
                      mt-0.5 break-words
                      text-[12px] leading-5
                      text-zinc-400
                      transition-colors duration-300
                      group-hover:text-zinc-200
                    "
                  >
                    {value}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="min-w-0">
        <SectionHeading
          eyebrow="Explore"
          title="Quick Links"
        />

        <nav
          aria-label="Footer navigation"
          className="mt-4"
        >
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="
                group flex items-center
                justify-between gap-3
                border-b border-white/[0.05]
                py-2.5
                text-[12px] text-zinc-500
                transition-[color,border-color]
                duration-300
                hover:border-red-500/20
                hover:text-white
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-500
              "
            >
              <span className="flex items-center gap-2.5">
                <span
                  className="
                    h-1 w-1 shrink-0
                    rounded-full bg-zinc-700
                    transition-[background-color,transform]
                    duration-300
                    group-hover:scale-125
                    group-hover:bg-red-500
                  "
                />

                {link.name}
              </span>

              <ArrowUpRight
                size={14}
                className="
                  -translate-x-1 translate-y-1
                  text-red-400 opacity-0
                  transition-[opacity,transform]
                  duration-300
                  group-hover:translate-x-0
                  group-hover:translate-y-0
                  group-hover:opacity-100
                "
              />
            </Link>
          ))}
        </nav>
      </div>

      {/* NEWSLETTER */}
      <div
        className="
          relative min-w-0
          overflow-hidden
          rounded-[18px]
          border border-white/[0.08]
          bg-white/[0.02]
          p-5
          md:col-span-2
          lg:col-span-1
        "
      >
        {/* STATIC CARD LIGHT */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            bg-[radial-gradient(circle_at_100%_0%,rgba(220,38,38,0.075),transparent_55%)]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute left-0 top-0
            h-px w-24
            bg-gradient-to-r
            from-red-500/75 to-transparent
          "
        />

        <div className="relative z-10">
          <SectionHeading
            eyebrow="Stay updated"
            title="Newsletter"
          />

          <p
            className="
              mt-3 max-w-sm
              text-[11px] leading-[1.8]
              text-zinc-500
            "
          >
            Get our latest projects, new collections
            and exclusive updates directly in your inbox.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-4"
          >
            <div
              className="
                flex items-center gap-1.5
                rounded-xl
                border border-white/[0.08]
                bg-black/30 p-1
                transition-[border-color,box-shadow]
                duration-300
                focus-within:border-red-500/30
                focus-within:shadow-[0_0_18px_rgba(239,68,68,0.06)]
              "
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                aria-label="Email address"
                autoComplete="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                disabled={submitting || subscribeSuccess}
                required
                className="
                  min-w-0 flex-1
                  bg-transparent
                  px-2.5 py-2.5
                  text-[12px] text-white
                  outline-none
                  placeholder:text-zinc-600
                  disabled:opacity-60
                "
              />

              <button
                type="submit"
                disabled={submitting || subscribeSuccess}
                className={`
                  group flex shrink-0
                  items-center justify-center gap-1.5
                  rounded-lg
                  px-3 py-2.5
                  font-bebas text-[11px]
                  uppercase tracking-[0.12em]
                  text-white
                  transition-[background-color,transform]
                  duration-300
                  active:scale-[0.97]
                  disabled:cursor-not-allowed
                  ${
                    subscribeSuccess
                      ? "bg-emerald-600"
                      : "bg-red-600 hover:bg-red-500"
                  }
                `}
              >
                {submitting ? (
                  <>
                    <span
                      className="
                        h-3 w-3 animate-spin
                        rounded-full
                        border border-white/30
                        border-t-white
                      "
                    />
                    Joining...
                  </>
                ) : subscribeSuccess ? (
                  <>
                    <Check size={13} />
                    Joined
                  </>
                ) : (
                  <>
                    Join
                    <ArrowUpRight
                      size={13}
                      className="
                        transition-transform duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* SUBSCRIPTION FEEDBACK */}
          {subscribeMessage && (
            <div
              role={subscribeSuccess ? "status" : "alert"}
              aria-live={subscribeSuccess ? "polite" : "assertive"}
              className={`
                mt-3 flex items-start gap-2
                rounded-lg border
                px-3 py-2
                text-[11px] leading-5
                ${
                  subscribeSuccess
                    ? "border-emerald-500/15 bg-emerald-500/[0.05] text-emerald-400"
                    : "border-red-500/15 bg-red-500/[0.05] text-red-400"
                }
              `}
            >
              {subscribeSuccess ? (
                <Check
                  size={14}
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <AlertCircle
                  size={14}
                  className="mt-0.5 shrink-0"
                />
              )}

              <span>{subscribeMessage}</span>
            </div>
          )}

          <p
            className="
              mt-3 text-[9px]
              tracking-[0.06em]
              text-zinc-600
            "
          >
            No spam. Only premium updates.
          </p>
        </div>
      </div>
    </section>
  );
}
