import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { announcements } from "../../../constants/announcementData";
import AnnouncementItem from "./AnnouncementItem";

export default function AnnouncementSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const announcement = announcements[current];

  return (
    <div
      className="
        relative

        flex
        h-10
        w-full

        items-center
        justify-center

        overflow-hidden
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={announcement.id}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center
          "
        >
          <AnnouncementItem
            icon={announcement.icon}
            text={announcement.text}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div
        className="
          pointer-events-none

          absolute
          bottom-0
          left-1/2

          flex
          -translate-x-1/2

          gap-1
        "
      >
        {announcements.map((item, index) => (
          <span
            key={item.id}
            className={`
              h-[2px]
              rounded-full

              transition-all
              duration-500

              ${
                index === current
                  ? "w-4 bg-red-500"
                  : "w-1.5 bg-white/15"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}