
import { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Send,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import SuccessMessage from "../ui/SuccessMessage";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const inputWrapper = `
  group relative flex min-h-[48px]
  items-center gap-2.5
  rounded-xl
  border border-white/[0.08]
  bg-white/[0.025]
  px-3
  transition-[background-color,border-color,box-shadow]
  duration-200
  hover:border-white/[0.14]
  focus-within:border-red-500/45
  focus-within:bg-red-500/[0.025]
  focus-within:shadow-[0_0_16px_rgba(239,68,68,0.045)]
`;

const iconWrapper = `
  flex h-8 w-8 shrink-0
  items-center justify-center
  rounded-lg
  border border-red-500/15
  bg-red-500/[0.06]
  text-red-400
  transition-colors duration-200
  group-focus-within:border-red-500/30
`;

const inputClass = `
  h-11 min-w-0 w-full flex-1
  bg-transparent
  text-[13px] text-white
  outline-none
  placeholder:text-zinc-600
`;

const labelClass = `
  mb-1.5 block
  text-[10px] font-semibold
  uppercase tracking-[0.13em]
  text-zinc-400
`;

function FormField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <span className="ml-1 text-red-400">*</span>
        )}
      </label>

      <div className={inputWrapper}>
        <span aria-hidden="true" className={iconWrapper}>
          <Icon size={15} />
        </span>

        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          maxLength={id === "subject" ? 150 : 120}
          className={inputClass}
        />
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const requestRef = useRef(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (!showSuccess) return;

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showSuccess]);

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (!payload.name) {
      setError("Full name is required.");
      return;
    }

    if (!payload.email) {
      setError("Email address is required.");
      return;
    }

    if (!payload.message) {
      setError("Message is required.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError("");
    setShowSuccess(false);

    const controller = new AbortController();
    requestRef.current = controller;

    try {
      const response = await fetch(
        `${API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result?.message ||
            "Failed to send message. Please try again."
        );
      }

      setForm({ ...INITIAL_FORM });
      setShowSuccess(true);
    } catch (err) {
      if (err.name === "AbortError") return;

      console.error("Contact form error:", err);

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      submittingRef.current = false;

      if (requestRef.current === controller) {
        requestRef.current = null;
      }

      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="
        relative overflow-hidden
        rounded-[22px]
        border border-white/[0.09]
        bg-[#090909]
        shadow-[0_18px_55px_rgba(0,0,0,0.25)]
      "
    >
      {/* STATIC TOP ACCENT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-0 top-0
          h-px w-40
          bg-gradient-to-r
          from-red-500/75 to-transparent
        "
      />

      {/* SOFT BACKGROUND LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_100%_0%,rgba(220,38,38,0.075),transparent_50%)]
        "
      />

      <div className="relative z-10 p-5 sm:p-6 lg:p-7">
        {/* HEADER */}
        <div className="mb-6">
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/[0.07]
              px-3 py-1.5
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full bg-red-500
              "
            />

            <span
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.2em]
                text-red-400
              "
            >
              Contact
            </span>
          </div>

          <h2
            className="
              mt-3 font-bebas
              text-[36px] leading-[0.95]
              tracking-[0.04em]
              text-white
              sm:text-[42px]
            "
          >
            LET&apos;S BUILD
            <span className="block text-red-500">
              TOGETHER
            </span>
          </h2>

          <p
            className="
              mt-3 max-w-lg
              text-[12px] leading-[1.8]
              text-zinc-400
              sm:text-[13px]
            "
          >
            Share your project idea with us and we&apos;ll
            help bring it to life with premium craftsmanship.
          </p>
        </div>

        {/* ERROR FEEDBACK */}
        {error && (
          <div
            role="alert"
            className="
              mb-5 flex items-start gap-3
              rounded-xl
              border border-red-500/20
              bg-red-500/[0.07]
              px-3.5 py-3
            "
          >
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0 text-red-400"
            />

            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-red-300">
                Unable to send message
              </p>
              <p className="mt-1 text-[11px] leading-5 text-red-300/75">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="name"
              label="Full Name"
              icon={User}
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              autoComplete="name"
              required
            />

            <FormField
              id="email"
              label="Email Address"
              icon={Mail}
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <FormField
              id="phone"
              label="Phone Number"
              icon={Phone}
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+212 6XX XXX XXX"
              autoComplete="tel"
            />

            <FormField
              id="subject"
              label="Subject"
              icon={FileText}
              value={form.subject}
              onChange={handleChange}
              placeholder="Your project type"
              autoComplete="off"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label
              htmlFor="message"
              className={labelClass}
            >
              Your Message
              <span className="ml-1 text-red-400">*</span>
            </label>

            <div
              className="
                group flex items-start gap-2.5
                rounded-xl
                border border-white/[0.08]
                bg-white/[0.025]
                p-3
                transition-[background-color,border-color]
                duration-200
                hover:border-white/[0.14]
                focus-within:border-red-500/45
                focus-within:bg-red-500/[0.025]
              "
            >
              <span
                aria-hidden="true"
                className={iconWrapper}
              >
                <MessageSquare size={15} />
              </span>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                maxLength={3000}
                placeholder="Tell us about your project, materials, dimensions..."
                required
                className="
                  min-h-[105px] min-w-0
                  w-full resize-y
                  bg-transparent
                  pt-1.5
                  text-[13px] leading-6
                  text-white outline-none
                  placeholder:text-zinc-600
                "
              />
            </div>
          </div>

          {/* BOTTOM ACTIONS */}
          <div
            className="
              flex flex-col gap-4 pt-1
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className="
                flex max-w-[300px]
                items-start gap-2
                text-[10px] leading-5
                text-zinc-500
              "
            >
              <ShieldCheck
                size={15}
                className="mt-0.5 shrink-0 text-red-400/70"
              />
              Your information will only be used to respond
              to your inquiry.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="
                group inline-flex h-11
                shrink-0 items-center
                justify-center gap-2.5
                rounded-xl
                bg-red-600 px-6
                text-[11px] font-semibold
                uppercase tracking-[0.12em]
                text-white
                shadow-[0_6px_22px_rgba(239,68,68,0.14)]
                transition-[background-color,transform]
                duration-300
                hover:-translate-y-0.5
                hover:bg-red-500
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-500
              "
            >
              {loading ? (
                <>
                  <span
                    className="
                      h-4 w-4 animate-spin
                      rounded-full border-2
                      border-white/30 border-t-white
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
                      transition-transform duration-300
                      group-hover:translate-x-0.5
                    "
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ORIGINAL SUCCESS MODAL */}
      <SuccessMessage
        show={showSuccess}
        title="Message Sent"
        message="Your message has been successfully sent."
      />
    </div>
  );
}
