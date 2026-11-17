
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

const PHONE_DISPLAY = "+212 6 58 55 13 65";
const PHONE_NUMBER = "+212658551365";
const EMAIL = "contact@kadecho.com";
const LOCATION = "Agourai, Meknas, Morocco";

// Same phone as ContactHero and Footer.
// Change this if WhatsApp uses a different number.
const WHATSAPP_NUMBER = "212658551365";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello KADECHO, I'd like to discuss a project."
)}`;

const contactItems = [
  {
    icon: Phone,
    title: "Phone",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_NUMBER}`,
    external: false,
  },
  {
    icon: Mail,
    title: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
  },
  {
    icon: MapPin,
    title: "Location",
    value: LOCATION,
    href: "https://www.google.com/maps/search/?api=1&query=Agourai%2C%20Meknas%2C%20Morocco",
    external: true,
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "Mon - Sat | 08:30 - 18:30",
    href: null,
    external: false,
  },
];

export default function ContactInfo() {
  return (
    <aside className="min-w-0 space-y-4">
      {/* CONTACT INFORMATION CARD */}
      <div
        className="
          relative overflow-hidden
          rounded-[22px]
          border border-white/[0.09]
          bg-[#090909]
          p-5 sm:p-6
          shadow-[0_18px_55px_rgba(0,0,0,0.25)]
        "
      >
        {/* STATIC TOP ACCENT */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-0 top-0
            h-px w-36
            bg-gradient-to-r
            from-red-500/75 to-transparent
          "
        />

        {/* SOFT RED LIGHT */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            bg-[radial-gradient(circle_at_100%_0%,rgba(220,38,38,0.075),transparent_55%)]
          "
        />

        <div className="relative z-10">
          {/* HEADER */}
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/[0.07]
              px-3 py-1.5
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
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
              text-[34px] leading-none
              tracking-[0.04em]
              text-white sm:text-[38px]
            "
          >
            LET&apos;S TALK
          </h2>

          <p
            className="
              mt-2.5 max-w-sm
              text-[12px] leading-[1.8]
              text-zinc-400
            "
          >
            We&apos;d love to hear about your project.
            Choose the easiest way to reach us.
          </p>

          {/* CONTACT ITEMS */}
          <div className="mt-5 space-y-2">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const Component = item.href ? "a" : "div";

              return (
                <Component
                  key={item.title}
                  {...(item.href
                    ? {
                        href: item.href,
                        ...(item.external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {}),
                      }
                    : {})}
                  className={`
                    group flex min-w-0
                    items-center justify-between
                    gap-2.5
                    rounded-xl
                    border border-white/[0.06]
                    bg-white/[0.02]
                    px-3 py-2.5
                    transition-[background-color,border-color]
                    duration-300
                    ${
                      item.href
                        ? "hover:border-red-500/25 hover:bg-red-500/[0.035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        : ""
                    }
                  `}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-lg
                        border border-red-500/15
                        bg-red-500/[0.06]
                        text-red-400
                        transition-colors duration-300
                        group-hover:border-red-500/30
                      "
                    >
                      <Icon size={15} />
                    </span>

                    <div className="min-w-0">
                      <p
                        className="
                          text-[9px] font-semibold
                          uppercase tracking-[0.15em]
                          text-zinc-600
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                          mt-0.5 break-words
                          text-[11px] leading-5
                          font-medium text-zinc-300
                          sm:text-[12px]
                        "
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>

                  {item.href && (
                    <ArrowUpRight
                      size={14}
                      className="
                        shrink-0 text-zinc-600
                        transition-[color,transform]
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-red-400
                      "
                    />
                  )}
                </Component>
              );
            })}
          </div>

          {/* RESPONSE NOTE */}
          <div
            className="
              mt-4 flex items-center gap-2
              border-t border-white/[0.06]
              pt-4
            "
          >
            <span
              className="
                h-1.5 w-1.5 shrink-0
                rounded-full bg-red-500
              "
            />

            <p
              className="
                text-[10px] leading-5
                tracking-[0.04em]
                text-zinc-500
              "
            >
              Usually responds within a few hours
            </p>
          </div>
        </div>
      </div>

      {/* WHATSAPP CARD */}
      <div
        className="
          relative overflow-hidden
          rounded-[22px]
          border border-green-500/15
          bg-[#09110c]
          p-5 sm:p-6
          shadow-[0_16px_45px_rgba(0,0,0,0.2)]
        "
      >
        {/* STATIC GREEN ATMOSPHERE */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            bg-[radial-gradient(circle_at_100%_0%,rgba(34,197,94,0.10),transparent_60%)]
          "
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl
                border border-green-400/20
                bg-green-500/10
                text-green-400
              "
            >
              <MessageCircle size={20} />
            </span>

            <div className="min-w-0">
              <h3
                className="
                  text-[14px] font-semibold
                  text-white
                "
              >
                WhatsApp Support
              </h3>

              <p
                className="
                  mt-1 text-[11px]
                  leading-5 text-zinc-400
                "
              >
                Fast answers for your projects.
              </p>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group mt-4 flex h-11
              w-full items-center
              justify-center gap-2.5
              rounded-xl bg-green-600
              px-4
              text-[11px] font-semibold
              uppercase tracking-[0.1em]
              text-white
              transition-[background-color,transform]
              duration-300
              hover:-translate-y-0.5
              hover:bg-green-500
              active:scale-[0.98]
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-green-500
            "
          >
            <MessageCircle size={16} />

            Chat on WhatsApp

            <ArrowUpRight
              size={14}
              className="
                transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </a>
        </div>
      </div>
    </aside>
  );
}
