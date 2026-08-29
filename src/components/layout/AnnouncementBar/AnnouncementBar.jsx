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
      {/* Top red glow */}
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
          via-red-500/70
          to-transparent

          blur-[0.5px]
        "
      />

      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2

          h-20
          w-[45%]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-red-600/[0.04]

          blur-3xl
        "
      />

      {/* Desktop */}
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

              animate-[fadeIn_.5s_ease-out]
            "
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <AnnouncementItem
              icon={item.icon}
              text={item.text}
            />

            {/* Divider */}
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

      {/* Mobile */}
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