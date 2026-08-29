
import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ServiceCard from "./ServiceCard";
import { services } from "./servicesData";

export default function ServiceSlider() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const width =
      window.innerWidth < 640
        ? 275
        : window.innerWidth < 1024
        ? 320
        : 350;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">

      {/* CONTROLS */}

      <div
        className="
          mb-4
          flex
          justify-end
          gap-2
        "
      >
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => scroll("left")}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            text-zinc-400
            backdrop-blur-xl
            transition-all
            hover:border-red-500/40
            hover:text-white
          "
        >
          <ChevronLeft size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => scroll("right")}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            text-zinc-400
            backdrop-blur-xl
            transition-all
            hover:border-red-500/40
            hover:text-white
          "
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>

      {/* LEFT FADE */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          top-0
          z-20
          hidden
          w-16
          bg-gradient-to-r
          from-[#050505]
          to-transparent
          lg:block
        "
      />

      {/* RIGHT FADE */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          top-0
          z-20
          hidden
          w-16
          bg-gradient-to-l
          from-[#050505]
          to-transparent
          lg:block
        "
      />

      {/* SLIDER */}

      <div
        ref={sliderRef}
        className="
          flex
          gap-4
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
          snap-x
          snap-mandatory
          pb-3
          select-none
        "
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="
              snap-start
              shrink-0
              w-[255px]
              sm:w-[285px]
              lg:w-[315px]
            "
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

    </div>
  );
}

