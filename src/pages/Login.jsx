
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(
        form.email,
        form.password
      );

      login(data);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#030303] text-white">

      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#141414_0%,#080808_45%,#030303_82%)]" />

      {/* Fine grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* Main red atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.07, 0.12, 0.07],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -top-72
          left-1/2
          h-[560px]
          w-[560px]
          -translate-x-1/2
          rounded-full
          bg-red-600
          blur-[180px]
        "
      />

      {/* Bottom atmosphere */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          opacity: [0.025, 0.06, 0.025],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-64
          -right-48
          h-[480px]
          w-[480px]
          rounded-full
          bg-red-600
          blur-[170px]
        "
      />

      {/* =====================================================
          CORNERS
      ===================================================== */}

      <div className="pointer-events-none absolute left-5 top-5 hidden h-10 w-10 border-l border-t border-white/[0.05] sm:block" />
      <div className="pointer-events-none absolute right-5 top-5 hidden h-10 w-10 border-r border-t border-white/[0.05] sm:block" />
      <div className="pointer-events-none absolute bottom-5 left-5 hidden h-10 w-10 border-b border-l border-white/[0.05] sm:block" />
      <div className="pointer-events-none absolute bottom-5 right-5 hidden h-10 w-10 border-b border-r border-white/[0.05] sm:block" />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-dvh
          items-center
          justify-center
          px-4
          py-7
          sm:px-6
          sm:py-8
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.985,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-[420px]"
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="mb-5 text-center">

            {/* Logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: -6,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mx-auto w-fit"
            >

              {/* Glow */}
              <motion.div
                animate={{
                  scale: [0.9, 1.08, 0.9],
                  opacity: [0.15, 0.28, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  inset-[-20px]
                  rounded-full
                  bg-red-500/20
                  blur-[28px]
                "
              />

              {/* Orbit */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  inset-[-9px]
                  rounded-full
                  border
                  border-red-500/[0.08]
                  border-t-red-500/40
                "
              />

              <div className="relative rounded-2xl">
                <img
                  src="/logo1.png"
                  alt="KADECHO"
                  className="
                    relative
                    z-10
                    w-[58px]
                    object-contain
                    drop-shadow-[0_0_24px_rgba(239,68,68,.3)]
                    sm:w-[64px]
                  "
                />
              </div>

            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
            >

              <p
                className="
                  mt-4
                  font-['Bebas_Neue']
                  text-[31px]
                  uppercase
                  leading-none
                  tracking-[0.17em]
                  text-white
                  sm:text-[34px]
                "
              >
                KADECHO
              </p>

              <div className="mt-2 flex items-center justify-center gap-2.5">

                <span className="h-px w-6 bg-gradient-to-r from-transparent to-red-500/60" />

                <span
                  className="
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[0.4em]
                    text-red-400
                  "
                >
                  Admin Portal
                </span>

                <span className="h-px w-6 bg-gradient-to-l from-transparent to-red-500/60" />

              </div>

            </motion.div>

          </div>

          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.18,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-white/[0.08]
              bg-[#090909]/95
              p-4
              shadow-[0_25px_80px_rgba(0,0,0,.65)]
              backdrop-blur-2xl
              sm:p-6
            "
          >

            {/* Top accent */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 0.9,
                delay: 0.35,
                ease: "easeOut",
              }}
              className="
                absolute
                left-0
                top-0
                h-[2px]
                bg-gradient-to-r
                from-transparent
                via-red-500
                to-transparent
              "
            />

            {/* Inner glow */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-28
                w-64
                -translate-x-1/2
                rounded-full
                bg-red-500/[0.035]
                blur-[55px]
              "
            />

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="relative mb-5">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p
                    className="
                      mb-0.5
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.28em]
                      text-red-500
                    "
                  >
                    Secure Access
                  </p>

                  <h1
                    className="
                      font-['Bebas_Neue']
                      text-[27px]
                      uppercase
                      tracking-[0.07em]
                      text-white
                    "
                  >
                    Welcome Back
                  </h1>

                  <p className="mt-0.5 text-[10px] text-zinc-600">
                    Sign in to continue to your dashboard.
                  </p>

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
                    border-emerald-500/10
                    bg-emerald-500/[0.035]
                    text-emerald-500/70
                  "
                >
                  <ShieldCheck size={14} />
                </div>

              </div>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="relative space-y-4"
            >

              {/* EMAIL */}

              <div>

                <label
                  className="
                    mb-1.5
                    block
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-zinc-500
                  "
                >
                  Email Address
                </label>

                <div className="group relative">

                  <Mail
                    size={14}
                    strokeWidth={1.7}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      z-10
                      -translate-y-1/2
                      text-zinc-600
                      transition-colors
                      duration-300
                      group-focus-within:text-red-400
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@kadecho.com"
                    autoComplete="email"
                    required
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-white/[0.075]
                      bg-white/[0.02]
                      pl-10
                      pr-4
                      text-[11px]
                      text-white
                      placeholder:text-zinc-700
                      outline-none
                      transition-all
                      duration-300
                      hover:border-white/[0.12]
                      focus:border-red-500/35
                      focus:bg-red-500/[0.02]
                      focus:ring-2
                      focus:ring-red-500/[0.045]
                    "
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label
                  className="
                    mb-1.5
                    block
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-zinc-500
                  "
                >
                  Password
                </label>

                <div className="group relative">

                  <Lock
                    size={14}
                    strokeWidth={1.7}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      z-10
                      -translate-y-1/2
                      text-zinc-600
                      transition-colors
                      duration-300
                      group-focus-within:text-red-400
                    "
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-white/[0.075]
                      bg-white/[0.02]
                      pl-10
                      pr-11
                      text-[11px]
                      text-white
                      placeholder:text-zinc-700
                      outline-none
                      transition-all
                      duration-300
                      hover:border-white/[0.12]
                      focus:border-red-500/35
                      focus:bg-red-500/[0.02]
                      focus:ring-2
                      focus:ring-red-500/[0.045]
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="
                      absolute
                      right-2.5
                      top-1/2
                      flex
                      h-7
                      w-7
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      text-zinc-600
                      transition-all
                      duration-300
                      hover:bg-white/[0.05]
                      hover:text-white
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -4,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-red-500/15
                    bg-red-500/[0.045]
                    px-3
                    py-2.5
                    text-[10px]
                    leading-4
                    text-red-400
                  "
                >
                  <div className="flex items-start gap-2">

                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />

                    <span>{error}</span>

                  </div>
                </motion.div>
              )}

              {/* =================================================
                  BUTTON
              ================================================= */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -1 } : {}}
                whileTap={!loading ? { scale: 0.985 } : {}}
                className="
                  group
                  relative
                  flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  overflow-hidden
                  rounded-xl
                  border
                  border-red-400/20
                  bg-red-600
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  shadow-[0_10px_30px_rgba(239,68,68,.1)]
                  transition-all
                  duration-300
                  hover:border-red-300/30
                  hover:bg-red-500
                  hover:shadow-[0_14px_38px_rgba(239,68,68,.18)]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {!loading && (
                  <motion.div
                    initial={{ x: "-130%" }}
                    animate={{ x: "130%" }}
                    transition={{
                      duration: 1.7,
                      repeat: Infinity,
                      repeatDelay: 3.5,
                      ease: "easeInOut",
                    }}
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      w-16
                      bg-gradient-to-r
                      from-transparent
                      via-white/15
                      to-transparent
                      skew-x-[-20deg]
                    "
                  />
                )}

                {loading ? (
                  <>
                    <span
                      className="
                        h-3.5
                        w-3.5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span className="relative">
                      Sign In
                    </span>

                    <ArrowRight
                      size={14}
                      strokeWidth={2}
                      className="
                        relative
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </>
                )}

              </motion.button>

            </form>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div
              className="
                relative
                mt-5
                flex
                items-center
                justify-center
                gap-1.5
                border-t
                border-white/[0.05]
                pt-4
              "
            >

              <ShieldCheck
                size={11}
                className="text-zinc-700"
              />

              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.25em]
                  text-zinc-700
                "
              >
                Protected Admin Environment
              </span>

            </div>

          </motion.div>

          {/* =================================================
              BACK TO WEBSITE
          ================================================= */}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.7,
              duration: 0.45,
            }}
            type="button"
            onClick={() => navigate("/")}
            className="
              group
              mx-auto
              mt-4
              flex
              items-center
              gap-2
              text-[8px]
              uppercase
              tracking-[0.24em]
              text-zinc-600
              transition-colors
              duration-300
              hover:text-white
            "
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>

            Back to website
          </motion.button>

          <p
            className="
              mt-4
              text-center
              text-[6px]
              uppercase
              tracking-[0.38em]
              text-zinc-800
            "
          >
            KADECHO / ADMIN
          </p>

        </motion.div>

      </div>

    </main>
  );
}

