
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { heroSlides } from "./heroData";
import HeroOverlay from "./HeroOverlay";
import HeroControls from "./HeroControls";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, [current]);

  const slide = heroSlides[current];

  return (
    <section
      className="
        relative
        mx-auto
        w-full
        max-w-[700px]
        xl:max-w-[720px]

        pb-[100px]
        sm:pb-[110px]
        md:pb-[120px]
        lg:pb-[135px]

        overflow-visible
      "
    >
      {/* =====================================================
          SOFT GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-6

          rounded-[24px]

          bg-red-600/10

          blur-[60px]

          opacity-60
        "
      />

      {/* =====================================================
          VIDEO
      ===================================================== */}

      <motion.div
        className="
          relative

          h-[255px]
          xs:h-[270px]
          sm:h-[300px]
          md:h-[325px]
          lg:h-[345px]
          xl:h-[365px]

          overflow-hidden

          rounded-[19px]
          sm:rounded-[21px]

          border
          border-white/[0.08]

          bg-[#070707]

          shadow-[0_18px_55px_rgba(0,0,0,.42)]
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{
              opacity: 0,
              scale: 1.045,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.01,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <video
              key={slide.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="
                absolute
                inset-0

                h-full
                w-full

                object-cover
                object-center

                scale-[1.025]
              "
            >
              <source
                src={slide.video}
                type="video/mp4"
              />
            </video>

            {/* Main dark gradient */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0

                bg-gradient-to-t
                from-black
                via-black/25
                to-black/5
              "
            />

            {/* Subtle side vignette */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0

                bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,.35)_100%)]
              "
            />
          </motion.div>
        </AnimatePresence>

        {/* Border highlight */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0

            rounded-[19px]
            sm:rounded-[21px]

            ring-1
            ring-inset
            ring-white/[0.045]
          "
        />
      </motion.div>

      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        className="
          absolute
          left-1/2

          top-[210px]
          xs:top-[225px]
          sm:top-[245px]
          md:top-[270px]
          lg:top-[285px]
          xl:top-[300px]

          z-30

          w-[88%]
          sm:w-[84%]
          lg:w-[78%]

          -translate-x-1/2
        "
      >
        <HeroOverlay slide={slide} />

        {/* Controls */}
        <HeroControls
          current={current}
          total={heroSlides.length}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
      </div>
    </section>
  );
}

