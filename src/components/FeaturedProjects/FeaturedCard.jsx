import { memo, useId, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Original puzzle geometry — unchanged.
const PUZZLE_PATH = `
  M 16 0 H 100 V 39
  C 91 39 89 43 89 50
  C 89 57 91 61 100 61
  V 100 H 16 Q 0 100 0 84
  V 61 C 9 61 11 57 11 50
  C 11 43 9 39 0 39
  V 16 Q 0 0 16 0 Z
`;

const BORDER_VARIANTS = {
  rest: { strokeOpacity: 0.35 },
  hover: { strokeOpacity: 0.95 },
};

const LIGHT_VARIANTS = {
  rest: {
    opacity: 0,
    strokeDashoffset: 100,
    transition: { duration: 0.2 },
  },
  hover: {
    opacity: 1,
    strokeDashoffset: [100, 0],
    transition: {
      opacity: { duration: 0.2 },
      strokeDashoffset: {
        duration: 2.4,
        ease: "linear",
        repeat: Infinity,
      },
    },
  },
};

function FeaturedCard({ project, index = 0, isActive = false }) {
  const id = useId().replace(/:/g, "");
  const clipId = `featured-puzzle-${id}`;
  const reduceMotion = useReducedMotion();
  const [loadedImage, setLoadedImage] = useState(null);
  const [failedImage, setFailedImage] = useState(null);

  const image = project.image;
  const loaded = loadedImage === image;
  const failed = failedImage === image;
  const activeGlow = isActive && !reduceMotion;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: Math.min(index, 3) * 0.06,
      }}
      className="group relative h-full min-w-0"
    >
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        className="pointer-events-none absolute"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={PUZZLE_PATH} transform="scale(0.01)" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        initial="rest"
        animate={activeGlow ? "hover" : "rest"}
        whileHover="hover"
        whileFocus="hover"
        className="relative h-full"
      >
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`View project: ${project.title}`}
          className="relative block h-full min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          {/* The entire card keeps its original puzzle silhouette. */}
          <div
            className="relative flex h-full flex-col bg-gradient-to-br from-[#171317] via-[#0b0b0e] to-[#080809]"
            style={{ clipPath: `url(#${clipId})` }}
          >
            {/* Full-width image: no inset frame, no side margins. */}
            <div className="relative h-[225px] w-full shrink-0 overflow-hidden bg-[#0b0b0b] sm:h-[245px] lg:h-[255px]">
              {!loaded && !failed && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 animate-pulse bg-zinc-900"
                />
              )}

              {!failed ? (
                <img
                  src={image}
                  alt={project.title || "Featured project"}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setLoadedImage(image)}
                  onError={() => setFailedImage(image)}
                  className={`h-full w-full object-cover object-center transition-[opacity,transform] duration-700 ease-out ${
                    loaded ? "opacity-100" : "opacity-0"
                  } motion-safe:group-hover:scale-[1.045]`}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-4 text-center font-satoshi text-xs text-zinc-500">
                  Image unavailable
                </div>
              )}

           {/* Ultra subtle gradient — preserve image clarity */}
<div
  aria-hidden="true"
  className="
    pointer-events-none
    absolute inset-x-0 bottom-0
    h-[10%]
    bg-gradient-to-t
    from-black/10
    via-black/[0.03]
    to-transparent
  "
/>

              {/* Category stays visible above the photo. */}
              <div className="absolute left-4 top-4 flex max-w-[85%] items-center gap-1.5 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 backdrop-blur-md sm:left-5 sm:top-5">
                <Sparkles size={12} className="shrink-0 text-red-500" />
                <span className="truncate font-bebas text-[10px] uppercase tracking-[0.18em] text-white">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Original compact content and CTA. */}
            <div className="relative flex flex-col px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
              <span className="mb-1.5 font-bebas text-[10px] tracking-[0.25em] text-red-500/70">
                KADECHO / {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="line-clamp-2 font-bebas text-[23px] uppercase leading-[1.05] tracking-[0.06em] text-white transition-colors duration-300 group-hover:text-red-100 sm:text-[27px]">
                {project.title}
              </h3>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-2 font-bebas text-[11px] uppercase tracking-[0.18em] text-red-400 transition-colors duration-300 group-hover:border-red-500/50 group-hover:bg-red-500/15">
                  View Project
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                </span>
                <span className="font-bebas text-xl text-white/10">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Active mobile glow + desktop hover overlay. */}
            <div
              className={`pointer-events-none absolute inset-0 bg-red-600/[0.025] transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />
          </div>

          {/* Original animated puzzle perimeter — unchanged. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          >
            <motion.path
              d={PUZZLE_PATH}
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.15"
              vectorEffect="non-scaling-stroke"
              variants={BORDER_VARIANTS}
              transition={{ duration: 0.3 }}
            />

            {!reduceMotion && (
              <motion.path
                d={PUZZLE_PATH}
                fill="none"
                stroke="#ff8585"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
                strokeDasharray="13 87"
                variants={LIGHT_VARIANTS}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(239,68,68,.9))",
                }}
              />
            )}
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default memo(FeaturedCard);
