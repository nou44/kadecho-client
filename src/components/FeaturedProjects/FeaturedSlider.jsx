import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import FeaturedCard from "./FeaturedCard";
import "swiper/css";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/projects`;

export default function FeaturedSlider() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches
  );
  const swiperRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchProjects() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        if (!data.success) throw new Error(data.message || "Failed to fetch projects");
        if (!controller.signal.aborted) {
          setProjects(Array.isArray(data.projects) ? data.projects : []);
        }
      } catch (err) {
        if (err.name !== "AbortError" && !controller.signal.aborted) {
          setError(err.message || "Something went wrong while loading projects");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    fetchProjects();
    return () => controller.abort();
  }, []);

  const syncNavigation = (swiper) => {
    if (!swiper || swiper.destroyed) return;
    setCanPrev(!swiper.isBeginning);
    setCanNext(!swiper.isEnd);
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.55 }}
      className="relative min-w-0 w-full"
    >
      {loading && (
        <div className="flex min-h-[300px] items-center justify-center" role="status">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-red-500" />
            <p className="font-bebas text-sm tracking-[.15em] text-zinc-500">LOADING PROJECTS...</p>
          </div>
        </div>
      )}

      {!loading && error && (
        <p className="py-16 text-center font-satoshi text-sm text-red-500" role="alert">{error}</p>
      )}
      {!loading && !error && projects.length === 0 && (
        <p className="py-16 text-center font-bebas text-sm tracking-[.15em] text-zinc-500">NO PROJECTS FOUND</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between gap-4 px-1">
            <p className="font-bebas text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              Explore our work <span className="text-red-500">/ {projects.length} projects</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous project"
                disabled={!canPrev}
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-zinc-300 transition-colors hover:border-red-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              ><ChevronLeft size={17} /></button>
              <button
                type="button"
                aria-label="Next project"
                disabled={!canNext}
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-zinc-300 transition-colors hover:border-red-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              ><ChevronRight size={17} /></button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, A11y]}
            onSwiper={(swiper) => { swiperRef.current = swiper; syncNavigation(swiper); }}
            onSlideChange={syncNavigation}
            onResize={syncNavigation}
            speed={reduceMotion ? 0 : 520}
            grabCursor
            watchOverflow
            allowTouchMove
            loop={false}
            slidesPerView={1.12}
            spaceBetween={-12}
            breakpoints={{
              480: { slidesPerView: 1.35, spaceBetween: -12 },
              640: { slidesPerView: 2, spaceBetween: -12 },
              1024: { slidesPerView: 3, spaceBetween: -14 },
              1400: { slidesPerView: 3.25, spaceBetween: -14 },
            }}
            className="!overflow-hidden"
          >
            {projects.map((project, index) => {
              const isActive = isMobile && index === activeIndex;
              return (
                <SwiperSlide
                  key={project._id || project.slug || index}
                  className={`!h-auto py-3 hover:!z-20 focus-within:!z-20 ${isActive ? "!z-10" : ""}`}
                >
                  <FeaturedCard project={project} index={index} isActive={isActive} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <p className="mt-3 text-center font-satoshi text-[10px] tracking-[0.08em] text-zinc-600 sm:hidden">
            Swipe to explore projects
          </p>
        </>
      )}
    </motion.div>
  );
}
