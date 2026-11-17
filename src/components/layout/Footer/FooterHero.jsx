
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { ArrowUpRight, Sparkles } from "lucide-react";

const socials = [
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/2126XXXXXXXX",
    label: "WhatsApp",
  },
];

export default function FooterHero() {
  return (
    <section
      className="
        relative isolate
        overflow-hidden
        border-b border-white/[0.07]
        py-10 sm:py-11 lg:py-12
      "
    >
      {/* BACKGROUND WATERMARK */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10
          flex items-center justify-center
          overflow-hidden
        "
      >
        <span
          className="
            select-none whitespace-nowrap
            font-bebas uppercase
            text-white/[0.025]
            text-[95px] sm:text-[145px]
            md:text-[190px] lg:text-[250px]
            xl:text-[300px]
            tracking-[0.12em]
          "
        >
          KADECHO
        </span>
      </div>

      {/* SOFT BACKGROUND LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_38%_70%_at_18%_50%,rgba(220,38,38,0.055),transparent_100%)]
        "
      />

      <div
        className="
          relative z-10
          grid grid-cols-1
          items-center
          gap-9
          lg:grid-cols-[minmax(0,1fr)_310px]
          lg:gap-10
        "
      >
        {/* LEFT — BRAND */}
        <div className="min-w-0">
          <div
            className="
              flex flex-col
              gap-4
              sm:flex-row sm:items-center
              sm:gap-5
            "
          >
            {/* LOGO */}
            <Link
              to="/"
              aria-label="KADECHO Home"
              className="
                group/logo relative
                flex h-[76px] w-[76px]
                shrink-0 items-center justify-center
                rounded-full
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute -inset-1
                  rounded-full
                  border border-dashed border-red-500/20
                  transition-colors duration-300
                  group-hover/logo:border-red-500/45
                "
              />

              <span
                aria-hidden="true"
                className="
                  absolute inset-1
                  rounded-full
                  border border-white/[0.07]
                  bg-red-500/[0.035]
                "
              />

              <img
                src="/kadecho-logo-128.128.webp"
                alt="KADECHO"
                loading="lazy"
                decoding="async"
                width="64"
                height="64"
                className="
                  relative z-10
                  h-16 w-16
                  object-contain
                  transition-transform duration-300
                  group-hover/logo:scale-105
                "
              />
            </Link>

            {/* BRAND NAME + TAGLINE */}
            <div className="min-w-0">
              <Link
                to="/"
                className="group/brand inline-block"
              >
                <h2
                  className="
                    font-bebas uppercase
                    text-[42px] leading-[0.9]
                    tracking-[0.105em]
                    sm:text-[46px]
                    lg:text-[50px]
                    bg-gradient-to-r
                    from-white via-zinc-100 to-red-500
                    bg-clip-text text-transparent
                  "
                >
                  KADECHO
                </h2>
              </Link>

              <div
                className="
                  mt-2.5
                  flex items-center gap-2.5
                "
              >
                <span
                  className="
                    h-px w-7
                    bg-red-500/80
                  "
                />
                <span
                  className="
                    font-bebas uppercase
                    text-[10px] tracking-[0.25em]
                    text-zinc-500
                  "
                >
                  Crafted With Precision
                </span>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5 max-w-[480px]
              text-[12px] leading-[1.9]
              sm:text-[13px]
              text-zinc-400
            "
          >
            Premium handcrafted{" "}
            <span className="text-zinc-200">metal</span>,{" "}
            <span className="text-red-400">glass</span> and{" "}
            <span className="text-zinc-200">wood</span>{" "}
            creations crafted with precision, innovation
            and timeless luxury.
          </p>

          {/* SOCIAL LINKS */}
          <div
            className="
              mt-5
              flex items-center gap-2.5
            "
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/social relative
                  flex h-9 w-9
                  items-center justify-center
                  overflow-hidden rounded-[10px]
                  border border-white/[0.08]
                  bg-white/[0.025]
                  text-zinc-400
                  transition-[color,background-color,border-color,transform]
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-red-500/35
                  hover:bg-red-500/[0.09]
                  hover:text-white
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-red-500
                "
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — CTA CARD */}
        <div className="w-full max-w-[340px] lg:max-w-none">
          <div
            className="
              relative overflow-hidden
              rounded-[22px]
              border border-white/[0.09]
              bg-[#0a0a0a]
              p-5 sm:p-6
              shadow-[0_16px_45px_rgba(0,0,0,0.25)]
            "
          >
            {/* CARD LIGHT */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-[radial-gradient(circle_at_100%_0%,rgba(220,38,38,0.11),transparent_55%)]
              "
            />

            {/* TOP ACCENT */}
            <div
              aria-hidden="true"
              className="
                absolute left-0 top-0
                h-px w-28
                bg-gradient-to-r
                from-red-500/70 to-transparent
              "
            />

            {/* BADGE */}
            <div
              className="
                relative inline-flex
                items-center gap-2
                rounded-full
                border border-red-500/20
                bg-red-500/[0.065]
                px-3 py-1.5
              "
            >
              <Sparkles size={12} className="text-red-400" />
              <span
                className="
                  font-bebas uppercase
                  text-[10px] tracking-[0.24em]
                  text-red-300
                "
              >
                Let's Build
              </span>
            </div>

            {/* HEADING */}
            <h3
              className="
                relative mt-4
                font-bebas uppercase
                text-[34px] sm:text-[38px]
                leading-[0.92]
                tracking-[0.04em]
                text-white
              "
            >
              Ready
              <span className="block text-red-500">
                To Start?
              </span>
            </h3>

            {/* DESCRIPTION */}
            <p
              className="
                relative mt-3
                max-w-[270px]
                text-[12px] leading-[1.75]
                text-zinc-500
              "
            >
              Tell us about your dream project and let's
              create something exceptional together.
            </p>

            {/* CTA */}
            <Link
              to="/contact"
              className="
                group/cta relative
                mt-5 inline-flex
                items-center gap-2.5
                rounded-full
                border border-red-500/25
                bg-red-500/[0.08]
                px-4 py-2.5
                font-bebas uppercase
                text-[12px] tracking-[0.2em]
                text-red-400
                transition-[color,background-color,border-color]
                duration-300
                hover:border-red-500
                hover:bg-red-600
                hover:text-white
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-500
              "
            >
              Contact Us

              <ArrowUpRight
                size={15}
                className="
                  transition-transform duration-300
                  group-hover/cta:translate-x-0.5
                  group-hover/cta:-translate-y-0.5
                "
              />
            </Link>

            {/* BOTTOM ACCENT */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute bottom-0 left-5 right-5
                h-px
                bg-gradient-to-r
                from-transparent via-red-500/25
                to-transparent
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
