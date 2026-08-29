
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-[#030303]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      {/* Deep radial background */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_42%,#171717_0%,#0a0a0a_38%,#030303_78%)]
        "
      />

      {/* Fine grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
          [background-size:65px_65px]
        "
      />

      {/* Top red atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-64
          left-1/2
          h-[620px]
          w-[620px]
          -translate-x-1/2
          rounded-full
          bg-red-600
          blur-[190px]
        "
      />

      {/* Bottom atmosphere */}
      <motion.div
        animate={{
          x: [0, 35, 0],
          y: [0, -20, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -bottom-72
          -right-48
          h-[550px]
          w-[550px]
          rounded-full
          bg-red-500
          blur-[200px]
        "
      />

      {/* Side glow */}
      <div
        className="
          absolute
          left-[-180px]
          top-1/3
          h-[360px]
          w-[360px]
          rounded-full
          bg-red-600/[0.06]
          blur-[150px]
        "
      />

      {/* =====================================================
          CINEMATIC LIGHT LINES
      ===================================================== */}

      <motion.div
        initial={{ x: "-120%", opacity: 0 }}
        animate={{ x: "120%", opacity: [0, 0.25, 0] }}
        transition={{
          duration: 2.8,
          delay: 0.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-1/2
          left-0
          h-px
          w-[45%]
          bg-gradient-to-r
          from-transparent
          via-red-500
          to-transparent
          blur-[0.5px]
        "
      />

      <motion.div
        initial={{ x: "120%", opacity: 0 }}
        animate={{ x: "-120%", opacity: [0, 0.15, 0] }}
        transition={{
          duration: 3.4,
          delay: 1.2,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[58%]
          right-0
          h-px
          w-[35%]
          bg-gradient-to-r
          from-transparent
          via-white
          to-transparent
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          flex
          w-full
          max-w-xl
          flex-col
          items-center
          px-6
        "
      >

        {/* ===================================================
            LOGO FRAME
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.65,
            rotate: -10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative"
        >
          {/* Outer glow */}
          <motion.div
            animate={{
              scale: [0.95, 1.08, 0.95],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-[-25px]
              rounded-full
              bg-red-500/20
              blur-[35px]
            "
          />

          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-[-18px]
              rounded-full
              border
              border-red-500/10
              border-t-red-500/50
            "
          />

          {/* Second ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-[-30px]
              rounded-full
              border
              border-white/[0.035]
              border-b-red-500/20
            "
          />

          <div
            className="
              relative
              flex
              h-32
              w-32
              items-center
              justify-center
              sm:h-36
              sm:w-36
            "
          >
            <img
              src="/logo1.png"
              alt="KADECHO"
              className="
                relative
                z-10
                w-28
                object-contain
                drop-shadow-[0_0_35px_rgba(239,68,68,.38)]
                sm:w-32
              "
            />
          </div>
        </motion.div>

        {/* ===================================================
            BRAND
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 22,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            delay: 0.35,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 text-center"
        >
          <h1
            className="
              font-['Bebas_Neue']
              text-6xl
              uppercase
              leading-none
              tracking-[0.24em]
              text-white
              sm:text-7xl
            "
          >
            KADECHO
          </h1>

          {/* Red accent */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "52px", opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="
              mx-auto
              mt-4
              h-[2px]
              rounded-full
              bg-red-500
              shadow-[0_0_15px_rgba(239,68,68,.6)]
            "
          />
        </motion.div>

        {/* ===================================================
            SUBTITLE
        =================================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.75,
            duration: 0.7,
          }}
          className="
            mt-5
            text-center
            text-[9px]
            font-medium
            uppercase
            tracking-[0.5em]
            text-zinc-500
            sm:text-[10px]
          "
        >
          Crafting Your Experience
        </motion.p>

        {/* ===================================================
            LOADING AREA
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.95,
            duration: 0.7,
          }}
          className="
            mt-14
            w-full
            max-w-[340px]
          "
        >

          {/* Status row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  opacity: [0.35, 1, 0.35],
                  scale: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                }}
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
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-zinc-500
                "
              >
                Initializing
              </span>
            </div>

            <motion.span
              animate={{
                opacity: [0.45, 1, 0.45],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-zinc-600
              "
            >
              Please wait
            </motion.span>
          </div>

          {/* Progress track */}
          <div
            className="
              relative
              h-[3px]
              w-full
              overflow-hidden
              rounded-full
              bg-white/[0.07]
            "
          >
            {/* Progress */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative
                h-full
                rounded-full
                bg-gradient-to-r
                from-red-700
                via-red-500
                to-red-400
                shadow-[0_0_12px_rgba(239,68,68,.45)]
              "
            >
              {/* Moving highlight */}
              <motion.div
                animate={{
                  x: ["-100%", "500%"],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0.2,
                }}
                className="
                  absolute
                  right-0
                  top-0
                  h-full
                  w-16
                  bg-gradient-to-r
                  from-transparent
                  via-white/60
                  to-transparent
                  blur-[1px]
                "
              />
            </motion.div>
          </div>

          {/* Bottom status */}
          <div className="mt-4 flex items-center justify-center">
            <motion.p
              animate={{
                opacity: [0.35, 0.9, 0.35],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                text-[9px]
                uppercase
                tracking-[0.38em]
                text-zinc-600
              "
            >
              Loading your workspace
            </motion.p>
          </div>
        </motion.div>

      </div>

      {/* =====================================================
          CORNER DETAILS
      ===================================================== */}

      <div
        className="
          absolute
          bottom-6
          left-6
          hidden
          text-[8px]
          uppercase
          tracking-[0.35em]
          text-zinc-700
          sm:block
        "
      >
        KADECHO / 01
      </div>

      <div
        className="
          absolute
          bottom-6
          right-6
          hidden
          text-[8px]
          uppercase
          tracking-[0.35em]
          text-zinc-700
          sm:block
        "
      >
        EST. 2025
      </div>

      {/* Top corner lines */}
      <div className="absolute left-6 top-6 hidden h-8 w-8 border-l border-t border-white/[0.06] sm:block" />
      <div className="absolute right-6 top-6 hidden h-8 w-8 border-r border-t border-white/[0.06] sm:block" />

    </motion.div>
  );
}

