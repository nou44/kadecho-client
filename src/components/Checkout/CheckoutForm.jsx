import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function CheckoutForm({ onContinue }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      setError("Please complete all fields.");
      return;
    }

    onContinue(form);
  };

  const inputClass = `
    h-11
    w-full
    rounded-xl
    border
    border-white/8
    bg-[#101010]
    pl-10
    pr-3
    text-xs
    text-white
    outline-none
    placeholder:text-zinc-600
    transition-all
    duration-300
    hover:border-white/15
    focus:border-red-500/60
    focus:bg-[#121212]
    focus:shadow-[0_0_20px_rgba(239,68,68,.08)]
  `;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#090909]
      "
    >
      {/* Animated top line */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-white/5">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            h-full
            w-1/4
            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />
      </div>

      <div className="relative z-10 p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-red-400
              "
            >
              Step 01
            </span>

            <h2
              className="
                mt-1
                font-bebas
                text-3xl
                uppercase
                leading-none
                tracking-wide
                text-white
              "
            >
              Billing Details
            </h2>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              border
              border-red-500/15
              bg-red-500/5
            "
          >
            <User
              size={16}
              className="text-red-400"
            />
          </div>
        </div>

        <p className="mt-2 text-[11px] text-zinc-600">
          Enter your contact and delivery information.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-5"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Name */}
            <div className="group relative">
              <User
                size={15}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-600
                  transition-colors
                  group-focus-within:text-red-400
                "
              />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="group relative">
              <Mail
                size={15}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-600
                  transition-colors
                  group-focus-within:text-red-400
                "
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="group relative">
              <Phone
                size={15}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-600
                  transition-colors
                  group-focus-within:text-red-400
                "
              />

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={inputClass}
              />
            </div>

            {/* Address */}
            <div className="group relative sm:col-span-2">
              <MapPin
                size={15}
                className="
                  absolute
                  left-3
                  top-3.5
                  text-zinc-600
                  transition-colors
                  group-focus-within:text-red-400
                "
              />

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full Address"
                rows={3}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-white/8
                  bg-[#101010]
                  py-3
                  pl-10
                  pr-3
                  text-xs
                  text-white
                  outline-none
                  placeholder:text-zinc-600
                  transition-all
                  duration-300
                  hover:border-white/15
                  focus:border-red-500/60
                  focus:bg-[#121212]
                  focus:shadow-[0_0_20px_rgba(239,68,68,.08)]
                "
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                mt-3
                rounded-lg
                border
                border-red-500/15
                bg-red-500/5
                px-3
                py-2
                text-[10px]
                text-red-400
              "
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            className="
              group
              relative
              mt-4
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-xl
              bg-red-600
              text-xs
              font-bold
              uppercase
              tracking-[0.15em]
              text-white
              shadow-[0_10px_30px_rgba(239,68,68,.16)]
              transition-all
              duration-300
              hover:bg-red-500
              hover:shadow-[0_15px_35px_rgba(239,68,68,.25)]
            "
          >
            <span className="relative z-10">
              Continue To Review
            </span>

            <ArrowRight
              size={15}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

            <motion.span
              initial={{ x: "-120%" }}
              whileHover={{ x: "220%" }}
              transition={{ duration: 0.7 }}
              className="
                absolute
                inset-y-0
                left-0
                w-16
                rotate-12
                bg-white/15
                blur-lg
              "
            />
          </motion.button>
        </form>
      </div>
    </motion.section>
  );
}