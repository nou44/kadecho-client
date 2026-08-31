import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
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
    value: "Agourai,Meknas,Morocco",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function FooterContent() {

  const [email, setEmail] = useState("");
const [submitting, setSubmitting] = useState(false);
const [subscribeMessage, setSubscribeMessage] = useState("");
const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  return (
    <section
      className="
        relative
        grid
        gap-8

        border-b
        border-white/[0.06]

        py-10

        md:grid-cols-2
        lg:grid-cols-[1fr_.8fr_1.1fr]

        lg:gap-12
        lg:py-12
      "
    >
      {/* =========================
          CONTACT
      ========================== */}

      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Heading */}

        <div className="flex items-end justify-between">
          <div>
            <span
              className="
                font-satoshi
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-red-500
              "
            >
              Get in touch
            </span>

            <h3
              className="
                mt-1
                font-bebas
                text-[28px]
                uppercase
                tracking-[0.08em]
                leading-none
                text-white
              "
            >
              Contact
            </h3>
          </div>

          <div
            className="
              mb-1
              h-px
              w-10
              bg-gradient-to-r
              from-red-500
              to-transparent
            "
          />
        </div>

        {/* Contact Items */}

        <div className="mt-6 space-y-2.5">
          {contactItems.map(
            ({ icon: Icon, label, value }, index) => (
              <motion.div
                key={label}
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.4,
                }}
                className="
                  group
                  flex
                  items-center
                  gap-3

                  rounded-xl

                  border
                  border-white/[0.06]

                  bg-white/[0.018]

                  px-3
                  py-2.5

                  transition-all
                  duration-300

                  hover:border-red-500/20
                  hover:bg-red-500/[0.035]
                "
              >
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
                    border-red-500/15

                    bg-red-500/[0.06]

                    text-red-400

                    transition-all
                    duration-300

                    group-hover:border-red-500/30
                    group-hover:bg-red-500/10
                  "
                >
                  <Icon size={14} />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-zinc-600
                    "
                  >
                    {label}
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[12px]
                      text-zinc-400

                      transition-colors
                      duration-300

                      group-hover:text-zinc-200
                    "
                  >
                    {value}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* =========================
          QUICK LINKS
      ========================== */}

      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.55,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Heading */}

        <div className="flex items-end justify-between">
          <div>
            <span
              className="
                font-satoshi
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-red-500
              "
            >
              Explore
            </span>

            <h3
              className="
                mt-1
                font-bebas
                text-[28px]
                uppercase
                tracking-[0.08em]
                leading-none
                text-white
              "
            >
              Quick Links
            </h3>
          </div>

          <div
            className="
              mb-1
              h-px
              w-10
              bg-gradient-to-r
              from-red-500
              to-transparent
            "
          />
        </div>

        {/* Links */}

        <nav className="mt-5 space-y-1">
          {links.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{
                opacity: 0,
                x: -10,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.35,
              }}
            >
              <Link
                to={link.path}
                className="
                  group
                  flex
                  items-center
                  justify-between

                  border-b
                  border-white/[0.05]

                  py-2.5

                  text-[12px]

                  text-zinc-500

                  transition-all
                  duration-300

                  hover:border-red-500/20
                  hover:text-white
                "
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-zinc-700

                      transition-all
                      duration-300

                      group-hover:bg-red-500
                      group-hover:scale-125
                    "
                  />

                  {link.name}
                </span>

                <ArrowUpRight
                  size={14}
                  className="
                    opacity-0

                    -translate-x-1
                    translate-y-1

                    transition-all
                    duration-300

                    group-hover:translate-x-0
                    group-hover:translate-y-0
                    group-hover:opacity-100

                    text-red-400
                  "
                />
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>

      {/* =========================
          NEWSLETTER
      ========================== */}

      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.55,
          delay: 0.16,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          overflow-hidden

          rounded-[20px]

          border
          border-white/[0.07]

          bg-white/[0.02]

          p-5
        "
      >
        {/* Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16

            h-32
            w-32

            rounded-full

            bg-red-600/10

            blur-[70px]
          "
        />

        {/* Top Accent */}

        <div
          className="
            absolute
            left-0
            top-0

            h-px
            w-24

            bg-gradient-to-r
            from-red-500
            to-transparent
          "
        />

        <div className="relative z-10">
          <span
            className="
              font-satoshi
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-red-500
            "
          >
            Stay updated
          </span>

          <h3
            className="
              mt-1
              font-bebas
              text-[28px]
              uppercase
              tracking-[0.08em]
              leading-none
              text-white
            "
          >
            Newsletter
          </h3>

          <p
            className="
              mt-3
              max-w-sm
              text-[11px]
              leading-6
              text-zinc-500
            "
          >
            Get our latest projects, new collections and
            exclusive updates directly in your inbox.
          </p>

          {/* Form */}

         <form
  onSubmit={async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setSubmitting(true);
      setSubscribeMessage("");

    const response = await fetch(
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/subscribers`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
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

setTimeout(() => {
  setSubscribeSuccess(false);
  setSubscribeMessage("");
}, 3500);
    } catch (error) {
      console.error(
        "SUBSCRIBE ERROR:",
        error
      );

      setSubscribeMessage(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  }}
            className="mt-5"
          >
            <div
              className="
                flex
                items-center
                gap-2

                rounded-xl

                border
                border-white/[0.08]

                bg-black/30

                p-1

                transition-all
                duration-300

                focus-within:border-red-500/30
                focus-within:shadow-[0_0_25px_rgba(239,68,68,.08)]
              "
            >
              <input
            
  type="email"
  placeholder="Your email"
  aria-label="Email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
                className="
                  min-w-0
                  flex-1

                  bg-transparent

                  px-3
                  py-2.5

                  text-[11px]

                  text-white

                  outline-none

                  placeholder:text-zinc-700
                "
              />

<motion.button
  type="submit"
  disabled={submitting || subscribeSuccess}
  whileTap={{ scale: 0.95 }}
  className={`
    group
    flex
    shrink-0
    items-center
    gap-1.5
    rounded-lg
    px-3
    py-2.5
    font-bebas
    text-[10px]
    uppercase
    tracking-[0.16em]
    text-white
    transition-all
    duration-300

    ${
      subscribeSuccess
        ? "bg-emerald-500"
        : "bg-red-600 hover:bg-red-500"
    }

    disabled:cursor-not-allowed
  `}
>
  {submitting ? (
    <>
      <span className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white" />
      Joining...
    </>
  ) : subscribeSuccess ? (
    <>
      <span>✓</span>
      Joined
    </>
  ) : (
    <>
      Join

      <ArrowUpRight
        size={13}
        className="
          transition-transform
          duration-300
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
        "
      />
    </>
  )}
</motion.button>
            </div>
          </form>
<AnimatePresence>
  {subscribeMessage && (
    <motion.div
      initial={{
        opacity: 0,
        y: -6,
        height: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        height: "auto",
      }}
      exit={{
        opacity: 0,
        y: -6,
        height: 0,
      }}
      className="mt-3 overflow-hidden"
    >
      <div
        className={`
          flex
          items-center
          gap-2
          rounded-lg
          border
          px-3
          py-2

          ${
            subscribeSuccess
              ? "border-emerald-500/15 bg-emerald-500/[0.05] text-emerald-400"
              : "border-red-500/15 bg-red-500/[0.05] text-red-400"
          }
        `}
      >
        <span
          className={`
            flex
            h-5
            w-5
            shrink-0
            items-center
            justify-center
            rounded-full
            text-[10px]
            ${
              subscribeSuccess
                ? "bg-emerald-500/10"
                : "bg-red-500/10"
            }
          `}
        >
          {subscribeSuccess ? "✓" : "!"}
        </span>

        <span className="text-[9px] tracking-[0.05em]">
          {subscribeMessage}
        </span>
      </div>
    </motion.div>
  )}
</AnimatePresence>
          <p
            className="
              mt-2.5
              text-[8px]
              tracking-[0.08em]
              text-zinc-700
            "
          >
            No spam. Only premium updates.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

