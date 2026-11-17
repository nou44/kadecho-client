
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  // Keep the original 3-click secret login.
  const handleSecretLogin = () => {
    clickCount.current += 1;

    clearTimeout(clickTimer.current);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      navigate("/login");
      return;
    }

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
      clickTimer.current = null;
    }, 1000);
  };

  // Clean up the timer when the footer unmounts.
  useEffect(() => {
    return () => clearTimeout(clickTimer.current);
  }, []);

  return (
    <div
      className="
        relative
        py-5 sm:py-6
      "
    >
      {/* TOP DIVIDER */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-0 right-0 top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/[0.08]
          to-transparent
        "
      />

      {/* RED CENTER ACCENT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-0
          h-px w-24
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-red-500/60
          to-transparent
        "
      />

      <div
        className="
          flex flex-col
          items-center justify-between
          gap-4
          lg:flex-row lg:gap-6
        "
      >
        {/* COPYRIGHT */}
        <div
          className="
            flex flex-wrap
            items-center justify-center
            gap-2
            text-[10px] sm:text-[11px]
            tracking-[0.06em]
            text-zinc-500
            lg:justify-start
          "
        >
          <span>© {new Date().getFullYear()}</span>

          <span
            aria-hidden="true"
            className="
              h-1 w-1 rounded-full
              bg-red-500/70
            "
          />

          <button
            type="button"
            onClick={handleSecretLogin}
            aria-label="KADECHO"
            className="
              cursor-default
              font-bebas text-[13px]
              tracking-[0.16em]
              text-zinc-300
              transition-colors duration-300
              hover:text-white
              focus-visible:rounded-sm
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-red-500
            "
          >
            KADECHO
          </button>

          <span className="hidden sm:inline">
            All Rights Reserved.
          </span>
        </div>

        {/* LEGAL NAVIGATION */}
        <nav
          aria-label="Legal and footer links"
          className="
            flex items-center
            rounded-full
            border border-white/[0.07]
            bg-white/[0.02]
            p-1
          "
        >
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="
                group relative
                rounded-full
                px-3 py-1.5
                text-[10px]
                uppercase tracking-[0.12em]
                text-zinc-500
                transition-colors duration-300
                hover:text-white
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-500
              "
            >
              {link.name}

              <span
                aria-hidden="true"
                className="
                  absolute bottom-0.5 left-1/2
                  h-px w-0
                  -translate-x-1/2
                  bg-red-500
                  transition-[width] duration-300
                  group-hover:w-3
                "
              />
            </Link>
          ))}
        </nav>

        {/* SIGNATURE */}
        <div
          className="
            flex flex-wrap
            items-center justify-center
            gap-1.5
            text-[10px] sm:text-[11px]
            tracking-[0.05em]
            text-zinc-500
            lg:justify-end
          "
        >
          <span>Crafted with</span>

          <Heart
            aria-hidden="true"
            size={11}
            fill="currentColor"
            className="text-red-500"
          />

          <span>by</span>

          <button
            type="button"
            onClick={handleSecretLogin}
            aria-label="KADECHO development team"
            className="
              cursor-default
              font-bebas text-[13px]
              tracking-[0.1em]
              text-zinc-300
              transition-colors duration-300
              hover:text-white
              focus-visible:rounded-sm
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-red-500
            "
          >
            Nouhe/dev,Nohayla/Disgne
          </button>
        </div>
      </div>
    </div>
  );
}
