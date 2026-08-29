import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const footerLinks = [
  { name: "Privacy", path: "/privacy-policy" },
  { name: "Terms", path: "/terms" },
  { name: "Contact", path: "/contact" },
];

export default function FooterBottom() {
  const navigate = useNavigate();

  const clickCount = useRef(0);
  const clickTimer = useRef(null);

  const handleSecretLogin = () => {
    clickCount.current += 1;

    // Reset after 1 second
    clearTimeout(clickTimer.current);

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 1000);

    // 3 clicks → Login
    if (clickCount.current === 3) {
      clickCount.current = 0;

      clearTimeout(clickTimer.current);

      navigate("/login");
    }
  };

  return (
    <footer className="relative mt-6 pt-5 pb-6">

      {/* Top line */}
      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/[0.08]
          to-transparent
        "
      />

      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          top-0
          left-0
          h-px
          w-24
          bg-gradient-to-r
          from-transparent
          via-red-500
          to-transparent
        "
      />

      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-4
          lg:flex-row
        "
      >

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.4 }}
          className="
            flex
            items-center
            gap-2
            text-[10px]
            sm:text-[11px]
            tracking-[0.08em]
            text-zinc-600
          "
        >
          © {new Date().getFullYear()}

          <span className="h-1 w-1 rounded-full bg-red-500/70" />

          {/* KADECHO */}
          <button
            type="button"
            onClick={handleSecretLogin}
            aria-label="KADECHO"
            className="
              font-bebas
              text-[13px]
              tracking-[0.18em]
              text-zinc-300

              outline-none

              transition-colors
              duration-300

              hover:text-white

              cursor-default
            "
          >
            KADECHO
          </button>

          <span className="hidden sm:inline">
            All Rights Reserved.
          </span>
        </motion.p>

        {/* Links */}
        <motion.nav
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.4,
            delay: 0.08,
          }}
          className="
            flex
            items-center
            rounded-full
            border
            border-white/[0.07]
            bg-white/[0.02]
            px-1
            py-1
          "
        >
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="
                group
                relative
                rounded-full
                px-3
                py-1.5
                text-[9px]
                sm:text-[10px]
                uppercase
                tracking-[0.15em]
                text-zinc-500
                transition-all
                duration-300
                hover:text-white
              "
            >
              {link.name}

              <span
                className="
                  absolute
                  bottom-0.5
                  left-1/2
                  h-px
                  w-0
                  -translate-x-1/2
                  bg-red-500
                  transition-all
                  duration-300
                  group-hover:w-3
                "
              />
            </Link>
          ))}
        </motion.nav>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            duration: 0.4,
            delay: 0.16,
          }}
          className="
            flex
            items-center
            gap-1.5
            text-[10px]
            sm:text-[11px]
            tracking-[0.06em]
            text-zinc-600
          "
        >
          <span>Crafted with</span>

          <motion.span
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart
              size={10}
              fill="currentColor"
              className="text-red-500"
            />
          </motion.span>

          <span>by</span>

          {/* Secret login trigger */}
          <button
            type="button"
            onClick={handleSecretLogin}
            aria-label="KADECHO admin access"
            className="
              font-bebas
              text-[13px]
              tracking-[0.16em]
              text-zinc-300

              outline-none

              cursor-default

              transition-colors
              duration-300

              hover:text-white
            "
          >
            Nouhe/dev,Nohayla/Disgne
          </button>
        </motion.div>

      </div>
    </footer>
  );
}