
import { announcements } from "../../../constants/announcementData";
import AnnouncementItem from "./AnnouncementItem";
import AnnouncementSlider from "./AnnouncementSlider";

export default function AnnouncementBar() {
  return (
    <section
      aria-label="Informations et avantages KadeCho"
      className="
        relative isolate w-full overflow-hidden
        border-b border-white/[0.07]
        bg-[#080808] text-white
      "
    >
      {/* TOP ACCENT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-red-600/55
          to-transparent
        "
      />

      {/* SUBTLE BACKGROUND DETAIL */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.025)_50%,transparent_75%)]
        "
      />

      {/* DESKTOP */}
      <div
        className="
          relative z-10 mx-auto
          hidden h-10 max-w-7xl
          items-center justify-between
          gap-4 px-6
          lg:flex xl:px-8
        "
      >
        {announcements.map((item, index) => (
          <div
            key={item.id}
            className="
              flex min-w-0 flex-1
              items-center justify-center
            "
          >
            <AnnouncementItem
              icon={item.icon}
              text={item.text}
            />

            {index < announcements.length - 1 && (
              <span
                aria-hidden="true"
                className="
                  absolute right-0
                  h-3.5 w-px
                  bg-white/10
                "
              />
            )}
          </div>
        ))}
      </div>

      {/* MOBILE / TABLET */}
      <div
        className="
          relative z-10 flex h-10
          items-center justify-center
          px-4 lg:hidden
        "
      >
        <AnnouncementSlider />
      </div>
    </section>
  );
}
