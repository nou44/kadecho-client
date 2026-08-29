import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import SuccessMessage from "../ui/SuccessMessage";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!showSuccess) return;

  const timer = setTimeout(() => {
    setShowSuccess(false);
  }, 3000);

  return () => clearTimeout(timer);
}, [showSuccess]);

  // =====================================================
  // CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous messages
    setError("");
    setShowSuccess(false);

    // ===================================================
    // VALIDATION
    // ===================================================

    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!form.message.trim()) {
      setError("Message is required.");
      return;
    }

    // ===================================================
    // SEND TO BACKEND
    // ===================================================

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      // Backend returned error
      if (!response.ok || !result.success) {
        throw new Error(
          result?.message || "Failed to send message."
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      setShowSuccess(true);

      // Clear form
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      console.error("❌ Contact error:", error);

      setError(
        error.message || "Failed to send message."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ANIMATION
  // =====================================================

  const containerVariants = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 14,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const inputWrapper = `
    group
    relative
    flex
    min-h-[54px]
    items-center
    gap-3
    overflow-hidden
    rounded-2xl
    border
    border-white/[0.08]
    bg-white/[0.025]
    px-4
    transition-all
    duration-300
    hover:border-white/[0.14]
    hover:bg-white/[0.035]
    focus-within:border-red-500/50
    focus-within:bg-red-500/[0.025]
    focus-within:shadow-[0_0_25px_rgba(239,68,68,.06)]
  `;

  const iconWrapper = `
    flex
    h-9
    w-9
    shrink-0
    items-center
    justify-center
    rounded-xl
    border
    border-red-500/15
    bg-red-500/[0.07]
    text-red-400
    transition-all
    duration-300
    group-focus-within:border-red-500/40
    group-focus-within:bg-red-500/10
    group-focus-within:text-red-300
  `;

  const inputClass = `
    h-full
    min-w-0
    flex-1
    bg-transparent
    text-[13px]
    text-white
    outline-none
    placeholder:text-zinc-600
  `;

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-[#090909]
        shadow-[0_25px_80px_rgba(0,0,0,.35)]
      "
    >
      {/* TOP RED LINE */}

      <div className="absolute left-0 right-0 top-0 h-px overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            h-full
            w-1/3
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />
      </div>

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-red-600/[0.08]
          blur-[110px]
          transition-all
          duration-700
          group-hover:bg-red-600/[0.12]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-32
          h-64
          w-64
          rounded-full
          bg-red-600/[0.04]
          blur-[100px]
        "
      />

      {/* CONTENT */}

      <div className="relative z-10 p-5 sm:p-7 lg:p-8">

        {/* HEADER */}

        <div className="mb-7">

          <motion.div
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
              duration: 0.4,
            }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-red-500/20
              bg-red-500/[0.07]
              px-3
              py-1.5
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-red-500
                shadow-[0_0_10px_rgba(239,68,68,.8)]
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-red-400
              "
            >
              Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.08,
            }}
            className="
              mt-4
              font-bebas
              text-4xl
              leading-none
              tracking-[0.04em]
              text-white
              sm:text-5xl
            "
          >
            LET'S BUILD

            <span className="block text-red-500">
              TOGETHER
            </span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="
              mt-3
              max-w-lg
              text-[12px]
              leading-6
              text-zinc-500
              sm:text-[13px]
            "
          >
            Share your idea with us and we'll help
            transform it into a professional digital
            experience.
          </motion.p>

        </div>

        {/* STATUS */}

        <AnimatePresence mode="wait">

          {/* ERROR */}

          {error && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="
                mb-5
                flex
                items-center
                gap-3
                overflow-hidden
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/[0.07]
                px-4
                py-3
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
                  rounded-xl
                  bg-red-500/10
                  text-red-400
                "
              >
                <AlertCircle size={16} />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-red-300">
                  Something went wrong
                </p>

                <p className="mt-0.5 text-[9px] text-red-400/60">
                  {error}
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* FORM */}

        <motion.form
          onSubmit={handleSubmit}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="space-y-4"
        >

          {/* NAME + EMAIL */}

          <div className="grid gap-4 md:grid-cols-2">

            {/* NAME */}

            <motion.div
              variants={itemVariants}
              className="space-y-1.5"
            >
              <label
                className="
                  ml-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-600
                "
              >
                Full Name
              </label>

              <div className={inputWrapper}>

                <div className={iconWrapper}>
                  <User size={16} />
                </div>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass}
                />

                <div
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
                    duration-500
                    group-focus-within:w-full
                  "
                />

              </div>
            </motion.div>

            {/* EMAIL */}

            <motion.div
              variants={itemVariants}
              className="space-y-1.5"
            >
              <label
                className="
                  ml-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-600
                "
              >
                Email Address
              </label>

              <div className={inputWrapper}>

                <div className={iconWrapper}>
                  <Mail size={16} />
                </div>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={inputClass}
                />

                <div
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
                    duration-500
                    group-focus-within:w-full
                  "
                />

              </div>
            </motion.div>

          </div>

          {/* PHONE + SUBJECT */}

          <div className="grid gap-4 md:grid-cols-2">

            {/* PHONE */}

            <motion.div
              variants={itemVariants}
              className="space-y-1.5"
            >
              <label
                className="
                  ml-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-600
                "
              >
                Phone Number
              </label>

              <div className={inputWrapper}>

                <div className={iconWrapper}>
                  <Phone size={16} />
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+212 6XX XXX XXX"
                  className={inputClass}
                />

                <div
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
                    duration-500
                    group-focus-within:w-full
                  "
                />

              </div>
            </motion.div>

            {/* SUBJECT */}

            <motion.div
              variants={itemVariants}
              className="space-y-1.5"
            >
              <label
                className="
                  ml-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-zinc-600
                "
              >
                Subject
              </label>

              <div className={inputWrapper}>

                <div className={iconWrapper}>
                  <FileText size={16} />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                  className={inputClass}
                />

                <div
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
                    duration-500
                    group-focus-within:w-full
                  "
                />

              </div>
            </motion.div>

          </div>

          {/* MESSAGE */}

          <motion.div
            variants={itemVariants}
            className="space-y-1.5"
          >
            <label
              className="
                ml-1
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-zinc-600
              "
            >
              Your Message
            </label>

            <div
              className="
                group
                relative
                flex
                gap-3
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-4
                transition-all
                duration-300
                hover:border-white/[0.14]
                focus-within:border-red-500/50
                focus-within:bg-red-500/[0.025]
                focus-within:shadow-[0_0_30px_rgba(239,68,68,.06)]
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
                  border-red-500/15
                  bg-red-500/[0.07]
                  text-red-400
                "
              >
                <MessageSquare size={16} />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your project..."
                className="
                  min-h-[120px]
                  w-full
                  resize-none
                  bg-transparent
                  text-[13px]
                  leading-6
                  text-white
                  outline-none
                  placeholder:text-zinc-600
                "
              />

              <div
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
                  duration-500
                  group-focus-within:w-full
                "
              />

            </div>
          </motion.div>

          {/* BOTTOM */}

          <motion.div
            variants={itemVariants}
            className="
              flex
              flex-col
              gap-4
              pt-1
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <p
              className="
                max-w-xs
                text-[9px]
                leading-5
                text-zinc-600
              "
            >
              Your information is kept private and will only
              be used to respond to your message.
            </p>

            {/* BUTTON */}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{
                scale: loading ? 1 : 1.025,
                y: loading ? 0 : -2,
              }}
              whileTap={{
                scale: loading ? 1 : 0.97,
              }}
              className="
                group
                relative
                flex
                h-12
                shrink-0
                items-center
                justify-center
                gap-2.5
                overflow-hidden
                rounded-2xl
                bg-red-600
                px-7
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-white
                shadow-[0_8px_30px_rgba(239,68,68,.16)]
                transition-all
                duration-300
                hover:bg-red-500
                hover:shadow-[0_12px_40px_rgba(239,68,68,.28)]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {/* BUTTON SHINE */}

              <motion.span
                animate={{
                  x: ["-150%", "250%"],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-14
                  -skew-x-12
                  bg-white/20
                  blur-[1px]
                "
              />

              {/* BUTTON GLOW */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-2xl
                  opacity-0
                  shadow-[inset_0_0_25px_rgba(255,255,255,.12)]
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              {/* CONTENT */}

              <span
                className="
                  relative
                  z-10
                  flex
                  items-center
                  gap-2.5
                "
              >

                {loading ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Sending...
                  </>
                ) : (
                  <>
                    Send Message

                    <Send
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}

              </span>

            </motion.button>

          </motion.div>

        </motion.form>

      </div>

      {/* SUCCESS MODAL */}

      <SuccessMessage
        show={showSuccess}
        title="Message Sent"
        message="Your message has been successfully sent."
      />

    </motion.div>
  );
}