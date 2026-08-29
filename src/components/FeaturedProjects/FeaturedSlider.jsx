import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  FreeMode,
  Mousewheel,
} from "swiper/modules";

import FeaturedCard from "./FeaturedCard";

import "swiper/css";

const API_URL = "http://localhost:5000/api/projects";

export default function FeaturedSlider() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        const data = await response.json();

        console.log("🔥 PROJECTS API RESPONSE:", data);
        console.log("🔥 ALL PROJECTS:", data.projects);

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch projects"
          );
        }

        // Projects li jayin mn MongoDB
        const fetchedProjects = data.projects || [];

        console.log(
          "🔥 FETCHED PROJECTS:",
          fetchedProjects
        );

        setProjects(fetchedProjects);
      } catch (error) {
        console.error(
          "❌ Fetch projects error:",
          error
        );

        setError(
          error.message ||
            "Something went wrong while loading projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
      }}
      className="relative"
    >
      {/* LEFT GRADIENT */}

      <div
        className="
          pointer-events-none

          absolute
          left-0
          top-0
          bottom-0

          z-20

          hidden
          md:block

          w-24

          bg-gradient-to-r
          from-[#050505]
          to-transparent
        "
      />

      {/* RIGHT GRADIENT */}

      <div
        className="
          pointer-events-none

          absolute
          right-0
          top-0
          bottom-0

          z-20

          hidden
          md:block

          w-24

          bg-gradient-to-l
          from-[#050505]
          to-transparent
        "
      />

      {/* LOADING */}

      {loading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div
              className="
                mx-auto
                mb-4

                h-8
                w-8

                animate-spin

                rounded-full

                border-2
                border-white/10
                border-t-red-500
              "
            />

            <p
              className="
                font-bebas

                text-sm

                tracking-[.15em]

                text-zinc-500
              "
            >
              LOADING PROJECTS...
            </p>
          </div>
        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div className="py-16 text-center">
          <p className="font-satoshi text-sm text-red-500">
            {error}
          </p>
        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        !error &&
        projects.length === 0 && (
          <div className="py-16 text-center">
            <p
              className="
                font-bebas
                text-sm
                tracking-[.15em]
                text-zinc-500
              "
            >
              NO PROJECTS FOUND
            </p>
          </div>
        )}

      {/* SWIPER */}

      {!loading &&
        !error &&
        projects.length > 0 && (
          <Swiper
            modules={[
              Autoplay,
              FreeMode,
              Mousewheel,
            ]}
            /*
              IMPORTANT:

              ila projects 2 wela 3,
              loop=true kay3ti warning.

              Donc loop ghadi ykhdem
              ghir ila 3ndna 4+ projects.
            */
            loop={projects.length >= 5}
            speed={4000}
            grabCursor={true}

            freeMode={{
              enabled: true,
              momentum: true,
              momentumBounce: false,
            }}

            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.8,
            }}

            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}

            allowTouchMove={true}
            watchOverflow={true}
            centeredSlides={false}

            slidesPerView={1.15}
            spaceBetween={18}

            breakpoints={{
              480: {
                slidesPerView: 1.35,
                spaceBetween: 18,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 22,
              },

              768: {
                slidesPerView: 2.3,
                spaceBetween: 24,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },

              1400: {
                slidesPerView: 3.5,
                spaceBetween: 30,
              },
            }}

            className="!overflow-visible"
          >
            {projects.map((project) => (
              <SwiperSlide
                key={project._id}
                className="!h-auto py-2"
              >
                <FeaturedCard
                  project={project}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </motion.div>
  );
}