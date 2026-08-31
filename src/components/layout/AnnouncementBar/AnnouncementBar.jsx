import { announcements } from "../../../constants/announcementData";
import AnnouncementItem from "./AnnouncementItem";
import AnnouncementSlider from "./AnnouncementSlider";

export default function AnnouncementBar() {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden

        border-b
        border-white/[0.06]

        bg-[#070707]
      "
    >
      {/* =====================================================
          TOP RED LINE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute

          left-1/2
          top-0

          h-px
          w-[55%]

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-red-500/60
          to-transparent
        "
      />

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto

          hidden

          h-12

          max-w-7xl

          items-center
          justify-between

          px-6

          lg:flex
          xl:px-8
        "
      >
        {announcements.map((item, index) => (
          <div
            key={item.id}
            className="
              flex
              items-center
            "
          >
            <AnnouncementItem
              icon={item.icon}
              text={item.text}
            />

            {/* DIVIDER */}

            {index < announcements.length - 1 && (
              <span
                className="
                  ml-8

                  h-4
                  w-px

                  bg-gradient-to-b
                  from-transparent
                  via-white/10
                  to-transparent

                  xl:ml-12
                "
              />
            )}
          </div>
        ))}
      </div>

      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div
        className="
          relative
          z-10

          flex

          h-11

          items-center
          justify-center

          px-4

          lg:hidden
        "
      >
        <AnnouncementSlider />
      </div>
    </section>
  );
}