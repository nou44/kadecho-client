
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ServiceCard from "./ServiceCard";
import { services } from "./servicesData";

export default function ServiceSlider() {
  const sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updatePosition = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = Array.from(slider.children);
    if (!slides.length) return;

    const currentLeft = slider.scrollLeft;
    const maxScroll = Math.max(
      0,
      slider.scrollWidth - slider.clientWidth
    );

    let nearest = 0;
    let distance = Infinity;

    slides.forEach((slide, index) => {
      const diff = Math.abs(
        slide.offsetLeft - slides[0].offsetLeft - currentLeft
      );

      if (diff < distance) {
        distance = diff;
        nearest = index;
      }
    });

    setActiveIndex(nearest);
    setCanPrev(currentLeft > 3);
    setCanNext(currentLeft < maxScroll - 3);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    updatePosition();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updatePosition)
        : null;

    observer?.observe(slider);

    window.addEventListener("resize", updatePosition);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, [updatePosition]);

  const scrollToIndex = (index) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = Array.from(slider.children);
    const target = slides[index];
    if (!target) return;

    const left =
      target.offsetLeft - slides[0].offsetLeft;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    slider.scrollTo({
      left,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  const navigate = (direction) => {
    const next = Math.max(
      0,
      Math.min(services.length - 1, activeIndex + direction)
    );

    scrollToIndex(next);
  };

  return (
    <div className="relative min-w-0">
      {/* TOP CONTROLS */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-[5px] w-[5px] rounded-full bg-red-500" />

          <span
            className="
              font-bebas text-[10px]
              uppercase tracking-[0.18em]
              text-zinc-500
            "
          >
            Explore Our Expertise
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="
              font-bebas text-[12px]
              tracking-[0.12em] text-zinc-500
            "
          >
            <span className="text-white">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(services.length).padStart(2, "0")}
          </span>

          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={!canPrev}
              aria-label="Previous service"
              className="
                flex h-8 w-8 items-center
                justify-center rounded-lg
                border border-white/10
                bg-white/[0.035]
                text-zinc-300
                transition-colors duration-200
                hover:border-red-500/40
                hover:bg-red-500/10
                disabled:cursor-not-allowed
                disabled:opacity-30
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
              "
            >
              <ChevronLeft size={15} />
            </button>

            <button
              type="button"
              onClick={() => navigate(1)}
              disabled={!canNext}
              aria-label="Next service"
              className="
                flex h-8 w-8 items-center
                justify-center rounded-lg
                border border-white/10
                bg-white/[0.035]
                text-zinc-300
                transition-colors duration-200
                hover:border-red-500/40
                hover:bg-red-500/10
                disabled:cursor-not-allowed
                disabled:opacity-30
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-red-500
              "
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        onScroll={updatePosition}
        aria-label="Services gallery"
        className="
          flex min-w-0 gap-3
          overflow-x-auto overflow-y-hidden
          pb-2
          snap-x snap-mandatory
          overscroll-x-contain
          scroll-smooth
          scrollbar-hide
          touch-pan-x
          sm:gap-4
        "
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            className="
              w-[218px] flex-none
              snap-start
              sm:w-[242px]
              lg:w-[254px]
            "
          >
            <ServiceCard
              service={service}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* BOTTOM PROGRESS */}
      <div
        aria-hidden="true"
        className="
          mt-3 h-px w-full
          overflow-hidden bg-white/[0.08]
        "
      >
        <div
          className="
            h-full bg-red-500/80
            transition-[width] duration-300
          "
          style={{
            width: `${
              ((activeIndex + 1) / services.length) * 100
            }%`,
          }}
        />
      </div>
    </div>
  );
}
