import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import FeaturedCard from "./FeaturedCard";
import "swiper/css";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/projects`;
const MOBILE_QUERY = "(max-width: 639px)";
const AUTOPLAY_DELAY = 2600;

export default function FeaturedSlider() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
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

  // Swiper loop needs enough slides on desktop. Repeat only when necessary.
  // No duplicates for a single project: a one-item carousel should not autoplay.
  const slides = useMemo(() => {
    if (projects.length < 2 || projects.length >= 8) return projects;
    return Array.from({ length: Math.ceil(8 / projects.length) }, () => projects)
      .flat();
  }, [projects]);

  const shouldAutoplay = !reduceMotion && projects.length > 1 && inView && pageVisible;

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || swiper.destroyed || !swiper.autoplay) return;
    if (shouldAutoplay) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [shouldAutoplay, slides.length]);

  const syncActive = (swiper) => {
    if (!swiper || swiper.destroyed) return;
    setActiveIndex(swiper.realIndex);
  };

  return (
    <motion.div
      ref={sectionRef}
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
                disabled={projects.length < 2}
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-zinc-300 transition-colors hover:border-red-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              ><ChevronLeft size={17} /></button>
              <button
                type="button"
                aria-label="Next project"
                disabled={projects.length < 2}
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-zinc-300 transition-colors hover:border-red-500/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              ><ChevronRight size={17} /></button>
            </div>
          </div>

          <style>{`
            .featured-projects-swiper .swiper-wrapper {
              transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
            }
            @media (prefers-reduced-motion: reduce) {
              .featured-projects-swiper .swiper-wrapper {
                transition-duration: 0ms !important;
              }
            }
          `}</style>

          <Swiper
            modules={[Autoplay, A11y]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncActive(swiper);
              // Autoplay starts only after IntersectionObserver sees the section.
              if (shouldAutoplay) swiper.autoplay?.start();
              else swiper.autoplay?.stop();
            }}
            onRealIndexChange={syncActive}
            speed={reduceMotion ? 0 : 850}
            autoplay={projects.length > 1 && !reduceMotion ? {
              delay: AUTOPLAY_DELAY,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            } : false}
            loop={projects.length > 1}
            slidesPerGroup={1}
            grabCursor={projects.length > 1}
            watchOverflow
            allowTouchMove={projects.length > 1}
            touchRatio={0.9}
            threshold={6}
            resistanceRatio={0.65}
            longSwipesRatio={0.25}
            followFinger
            preventClicks
            preventClicksPropagation
            slidesPerView={1.12}
            spaceBetween={-12}
            breakpoints={{
              480: { slidesPerView: 1.35, spaceBetween: -12 },
              640: { slidesPerView: 2, spaceBetween: -12 },
              1024: { slidesPerView: 3, spaceBetween: -14 },
              1400: { slidesPerView: 3.25, spaceBetween: -14 },
            }}
            className="featured-projects-swiper !overflow-hidden"
          >
            {slides.map((project, index) => {
              const isActive = isMobile && projects.length > 1 && index === activeIndex;
              return (
                <SwiperSlide
                  key={`${project._id || project.slug || "project"}-${index}`}
                  className={`!h-auto py-3 hover:!z-20 focus-within:!z-20 ${isActive ? "!z-10" : ""}`}
                >
                  <FeaturedCard
                    project={project}
                    index={index % projects.length}
                    isActive={isActive}
                  />
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
