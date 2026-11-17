
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
  ArrowUpRight,
} from "lucide-react";

const PHONE = "+212658551365";
const EMAIL = "contact@kadecho.com";

const MAP_QUERY = "Agourai, Meknes, Morocco";

const MAP_EMBED_URL =
  `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;

const MAP_DIRECTIONS_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

const contactItems = [
  {
    icon: MapPin,
    title: "Location",
    value: "Agourai, Meknas, Morocco",
    href: MAP_DIRECTIONS_URL,
    external: true,
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+212 6 58 55 13 65",
    href: `tel:${PHONE}`,
    external: false,
  },
  {
    icon: Mail,
    title: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
  },
];

export default function ContactMap() {
  return (
    <section
      aria-labelledby="contact-map-heading"
      className="
        bg-[#050505]
        pb-10 sm:pb-12 lg:pb-14
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* MAP WRAPPER */}
        <div
          className="
            relative isolate overflow-hidden
            rounded-[22px]
            border border-white/[0.09]
            bg-[#080808]
            lg:min-h-[440px]
            lg:rounded-[26px]
          "
        >
          {/* GOOGLE MAP */}
          <div
            className="
              relative h-[240px] w-full
              sm:h-[290px]
              lg:absolute lg:inset-0
              lg:h-full
            "
          >
            <iframe
              title="KADECHO workshop location in Agourai, Meknes"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="
                h-full w-full border-0
                grayscale-[0.25]
                contrast-[1.05]
              "
            />

            {/* MAP OVERLAY */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-b
                from-black/10
                via-transparent
                to-black/35
                lg:bg-gradient-to-r
                lg:from-black/55
                lg:via-transparent
                lg:to-transparent
              "
            />
          </div>

          {/* MOBILE DIVIDER */}
          <div
            aria-hidden="true"
            className="
              relative z-10 h-px w-full
              bg-gradient-to-r
              from-transparent
              via-red-500/30
              to-transparent
              lg:hidden
            "
          />

          {/* WORKSHOP INFO CARD */}
          <div
            className="
              relative z-20 w-full
              bg-[#0a0a0a]
              p-5 sm:p-6
              lg:absolute
              lg:inset-y-5 lg:left-5
              lg:flex lg:w-[330px]
              lg:flex-col lg:justify-between
              lg:rounded-[20px]
              lg:border lg:border-white/10
              lg:bg-[#0c0c0c]/95
              lg:p-6
            "
          >
            {/* HEADER */}
            <div>
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
                    uppercase tracking-[0.18em]
                    text-red-400
                  "
                >
                  Visit Us
                </span>
              </div>

              <h2
                id="contact-map-heading"
                className="
                  mt-3 font-bebas
                  text-[34px] leading-none
                  tracking-[0.04em]
                  text-white
                  sm:text-[38px]
                "
              >
                OUR WORKSHOP
              </h2>

              <div
                aria-hidden="true"
                className="
                  mt-3 h-[2px] w-14
                  rounded-full
                  bg-gradient-to-r
                  from-red-500 to-transparent
                "
              />

              <p
                className="
                  mt-3 max-w-sm
                  text-[12px] leading-[1.8]
                  text-zinc-400
                "
              >
                Visit our workshop to discuss your custom
                project and discover premium craftsmanship.
              </p>
            </div>

            {/* CONTACT DETAILS */}
            <div className="mt-5 space-y-2">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    {...(item.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="
                      group flex min-w-0
                      items-center justify-between
                      gap-2.5
                      rounded-xl
                      border border-white/[0.07]
                      bg-white/[0.025]
                      px-3 py-2.5
                      transition-[background-color,border-color]
                      duration-200
                      hover:border-red-500/25
                      hover:bg-red-500/[0.035]
                      focus-visible:outline
                      focus-visible:outline-2
                      focus-visible:outline-offset-2
                      focus-visible:outline-red-500
                    "
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-lg
                          border border-red-500/15
                          bg-red-500/[0.07]
                          text-red-400
                        "
                      >
                        <Icon size={15} />
                      </span>

                      <span className="min-w-0">
                        <span
                          className="
                            block text-[9px]
                            font-semibold uppercase
                            tracking-[0.15em]
                            text-zinc-500
                          "
                        >
                          {item.title}
                        </span>

                        <span
                          className="
                            mt-0.5 block
                            break-words
                            text-[11px] leading-5
                            font-medium text-zinc-200
                          "
                        >
                          {item.value}
                        </span>
                      </span>
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="
                        shrink-0 text-zinc-600
                        transition-[color,transform]
                        duration-200
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-red-400
                      "
                    />
                  </a>
                );
              })}
            </div>

            {/* DIRECTIONS CTA */}
            <a
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group mt-4 flex h-10
                w-full items-center justify-center
                gap-2 rounded-xl
                bg-red-600 px-4
                text-[11px] font-semibold
                uppercase tracking-[0.1em]
                text-white
                transition-[background-color,transform]
                duration-200
                hover:-translate-y-0.5
                hover:bg-red-500
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-500
              "
            >
              <Navigation size={15} />
              Get Directions

              <ArrowUpRight
                size={14}
                className="
                  transition-transform duration-200
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>

          {/* BOTTOM ACCENT */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute bottom-0 left-0
              z-30 h-px w-full
              bg-gradient-to-r
              from-transparent
              via-red-500/45
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
}
