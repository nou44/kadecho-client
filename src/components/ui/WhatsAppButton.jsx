
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "212658551365";

const WHATSAPP_MESSAGE =
  "Hello, I would like to know more about your products.";

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className="
        fixed
        bottom-5
        right-5
        z-[9999]
        sm:bottom-6
        sm:right-6
      "
      initial={{
        opacity: 0,
        scale: 0.7,
        y: 24,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        delay: 0.45,
        type: "spring",
        stiffness: 190,
        damping: 17,
      }}
    >
      {/* SOFT AMBIENT GLOW */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-[-10px]
          rounded-full
          bg-[#25D366]/20
          blur-2xl
        "
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [0.9, 1.08, 0.9],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* OUTER RING */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-[-5px]
          rounded-full
          border
          border-[#25D366]/20
        "
        animate={{
          scale: [1, 1.14, 1],
          opacity: [0.45, 0, 0.45],
        }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* BUTTON */}

      <motion.button
        type="button"
        onClick={handleWhatsApp}
        aria-label="Contact us on WhatsApp"
        whileHover={{
          scale: 1.08,
          y: -2,
        }}
        whileTap={{
          scale: 0.94,
        }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="
          group
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          overflow-visible
          rounded-full
          border
          border-white/20
          bg-[#25D366]
          text-white
          shadow-[0_10px_35px_rgba(37,211,102,.28)]
          transition-all
          duration-300
          hover:shadow-[0_14px_45px_rgba(37,211,102,.42)]
          sm:h-15
          sm:w-15
        "
      >
        {/* INNER GLASS */}

        <span
          className="
            pointer-events-none
            absolute
            inset-[2px]
            rounded-full
            border
            border-white/20
            bg-gradient-to-br
            from-white/15
            via-transparent
            to-black/10
            opacity-70
          "
        />

        {/* HOVER GLOW */}

        <span
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-full
            bg-white/10
            opacity-0
            blur-md
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* WHATSAPP ICON */}

        <svg
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="
            relative
            z-10
            h-6
            w-6
            drop-shadow-[0_2px_5px_rgba(0,0,0,.18)]
            transition-transform
            duration-300
            group-hover:scale-105
            sm:h-7
            sm:w-7
          "
        >
          <path
            d="M16 3C8.82 3 3 8.82 3 16C3 18.29 3.59 20.44 4.63 22.32L3.2 27.55L8.56 26.15C10.38 27.16 12.5 27.74 16 27.74C23.18 27.74 29 21.92 29 14.74C29 7.56 23.18 3 16 3Z"
            fill="white"
          />

          <path
            d="M22.23 18.77C21.89 18.6 20.21 17.77 19.9 17.65C19.59 17.53 19.36 17.48 19.12 17.83C18.89 18.18 18.21 18.97 18.01 19.2C17.81 19.44 17.61 19.47 17.27 19.3C16.93 19.13 15.84 18.77 14.54 17.61C13.53 16.71 12.85 15.59 12.65 15.25C12.45 14.9 12.63 14.71 12.8 14.54C12.95 14.39 13.14 14.16 13.31 13.96C13.48 13.76 13.54 13.62 13.65 13.39C13.76 13.16 13.71 12.96 13.63 12.79C13.54 12.62 12.88 10.94 12.61 10.26C12.34 9.59 12.06 9.7 11.84 9.69C11.63 9.68 11.39 9.68 11.16 9.68C10.93 9.68 10.55 9.77 10.24 10.12C9.93 10.47 9.05 11.3 9.05 12.98C9.05 14.66 10.27 16.28 10.44 16.5C10.61 16.73 12.85 20.17 16.27 21.65C17.08 22 17.72 22.21 18.22 22.36C19.3 22.7 20.28 22.65 21.05 22.55C21.92 22.43 23.73 21.45 24.11 20.38C24.49 19.31 24.49 18.39 24.38 18.2C24.27 18.02 24.03 17.93 23.69 17.76L22.23 18.77Z"
            fill="#25D366"
          />
        </svg>

        {/* ONLINE STATUS */}

        <span
          className="
            absolute
            right-0
            top-0
            z-20
            h-3
            w-3
            rounded-full
            border-2
            border-[#050505]
            bg-white
            shadow-[0_0_8px_rgba(255,255,255,.55)]
            sm:h-3.5
            sm:w-3.5
          "
        />

        {/* STATUS PULSE */}

        <motion.span
          className="
            absolute
            right-0
            top-0
            z-10
            h-3
            w-3
            rounded-full
            bg-white
          "
          animate={{
            scale: [1, 1.7, 1],
            opacity: [0.45, 0, 0.45],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.button>

      {/* DESKTOP TOOLTIP */}

      <motion.div
        initial={{
          opacity: 0,
          x: 8,
          scale: 0.96,
        }}
        whileHover={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        className="
          pointer-events-none
          absolute
          right-[calc(100%+12px)]
          top-1/2
          hidden
          -translate-y-1/2
          whitespace-nowrap
          rounded-xl
          border
          border-white/[0.08]
          bg-[#090909]/90
          px-3.5
          py-2.5
          shadow-[0_15px_45px_rgba(0,0,0,.45)]
          backdrop-blur-xl
          sm:block
        "
      >
        <div className="flex items-center gap-2">

          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] shadow-[0_0_8px_rgba(37,211,102,.8)]" />

          <p
            className="
              font-bebas
              text-sm
              uppercase
              tracking-[0.16em]
              text-white
            "
          >
            Chat with us
          </p>

        </div>

        <p
          className="
            mt-0.5
            pl-3.5
            text-[7px]
            uppercase
            tracking-[0.14em]
            text-zinc-600
          "
        >
          Available on WhatsApp
        </p>
      </motion.div>
    </motion.div>
  );
}

