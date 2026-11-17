
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { announcements } from "../../../constants/announcementData";
import AnnouncementItem from "./AnnouncementItem";

const SLIDE_DURATION = 4000;
const ease = [0.22, 1, 0.36, 1];

export default function AnnouncementSlider() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (announcements.length <= 1) return;

    let interval;

    const start = () => {
      window.clearInterval(interval);

      if (document.hidden) return;

      interval = window.setInterval(() => {
        setCurrent((prev) => (prev + 1) % announcements.length);
      }, SLIDE_DURATION);
    };

    const stop = () => window.clearInterval(interval);

    document.addEventListener("visibilitychange", start);
    window.addEventListener("blur", stop);
    window.addEventListener("focus", start);

    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("blur", stop);
      window.removeEventListener("focus", start);
    };
  }, []);

  if (!announcements.length) return null;

  const activeIndex = current % announcements.length;
  const announcement = announcements[activeIndex];

  return (
    <div
      aria-label="Informations KadeCho"
      className="
        relative flex h-full w-full
        items-center justify-center
        overflow-hidden
      "
    >
      {/* SLIDE CONTENT */}
      <div className="relative flex h-full w-full items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={announcement.id}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 6 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6 }
            }
            transition={{
              duration: reduceMotion ? 0.01 : 0.25,
              ease,
            }}
            className="
              absolute inset-0 flex
              items-center justify-center
              pb-1
            "
          >
            <AnnouncementItem
              icon={announcement.icon}
              text={announcement.text}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PROGRESS INDICATORS */}
      {announcements.length > 1 && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            bottom-[3px] left-1/2
            flex -translate-x-1/2
            items-center gap-1
          "
        >
          {announcements.map((item, index) => (
            <span
              key={item.id}
              className={`
                h-[2px] rounded-full
                transition-[width,background-color]
                duration-300
                ${
                  index === activeIndex
                    ? "w-4 bg-red-500"
                    : "w-1.5 bg-white/15"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}
