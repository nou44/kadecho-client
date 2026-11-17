
import { memo, useId } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/*
  Each piece uses the same 100 x 100 geometry.

  RIGHT  = outward tab
  LEFT   = matching inward socket
  BOTTOM = outward tab
  TOP    = matching inward socket

  Adjacent pieces share exactly the same curves.
*/
function getPuzzlePath(index, columns) {
  const row = Math.floor(index / columns);
  const col = index % columns;
  const rows = Math.ceil(6 / columns);

  const top = row > 0;
  const right = col < columns - 1;
  const bottom = row < rows - 1;
  const left = col > 0;

  let d = "M 0 0 ";

  // TOP — inward socket
  if (top) {
    d += `
      L 40 0
      C 42 0, 42 7, 50 7
      C 58 7, 58 0, 60 0
      L 100 0
    `;
  } else {
    d += "L 100 0 ";
  }

  // RIGHT — outward tab
  if (right) {
    d += `
      L 100 40
      C 100 42, 107 42, 107 50
      C 107 58, 100 58, 100 60
      L 100 100
    `;
  } else {
    d += "L 100 100 ";
  }

  // BOTTOM — outward tab
  if (bottom) {
    d += `
      L 60 100
      C 58 100, 58 107, 50 107
      C 42 107, 42 100, 40 100
      L 0 100
    `;
  } else {
    d += "L 0 100 ";
  }

  // LEFT — inward socket
  if (left) {
    d += `
      L 0 60
      C 0 58, 7 58, 7 50
      C 7 42, 0 42, 0 40
      L 0 0
    `;
  } else {
    d += "L 0 0 ";
  }

  return `${d} Z`;
}

const directions = [
  { x: -95, y: -45 },
  { x: 95, y: -55 },
  { x: 0, y: -95 },
  { x: -95, y: 55 },
  { x: 95, y: 65 },
  { x: 0, y: 95 },
];

function FeatureCard({
  feature,
  index,
  columns = 3,
}) {
  const Icon = feature.icon;
  const reduceMotion = useReducedMotion();

  const id = useId().replace(/:/g, "");
  const clipId = `kadecho-puzzle-${id}`;

  const path = getPuzzlePath(index, columns);
  const direction = directions[index];

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: direction.x,
              y: direction.y,
              scale: 0.88,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.85,
        delay: reduceMotion ? 0 : index * 0.13,
        ease: EASE,
      }}
      className="
        group relative
        h-full w-full min-w-0
        overflow-visible
        hover:z-20
      "
    >
      {/* SVG GEOMETRY */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none
          absolute h-0 w-0
        "
      >
        <defs>
          <clipPath
            id={clipId}
            clipPathUnits="objectBoundingBox"
          >
            <path
              d={path}
              transform="scale(0.01)"
            />
          </clipPath>
        </defs>
      </svg>

      {/* SHAPED BACKGROUND */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-[#161316]
          via-[#0b0b0e]
          to-[#080809]

          transition-colors duration-500
        "
        style={{
          clipPath: `url(#${clipId})`,
        }}
      >
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,.10),transparent_75%)]

            opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        />
      </div>

      {/* REAL PUZZLE BORDER */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full
          overflow-visible
        "
      >
        {/* Soft seam glow */}
        <motion.path
          d={path}
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.3"
          vectorEffect="non-scaling-stroke"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 0.24,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: reduceMotion
              ? 0
              : 0.7 + index * 0.13,
          }}
          style={{
            filter:
              "drop-shadow(0 0 6px rgba(239,68,68,.75))",
          }}
        />

        {/* Precise edge */}
        <motion.path
          d={path}
          fill="none"
          stroke="#f87171"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
          initial={{
            pathLength: reduceMotion ? 1 : 0,
            opacity: 0,
          }}
          whileInView={{
            pathLength: 1,
            opacity: 0.75,
          }}
          viewport={{ once: true }}
          transition={{
            pathLength: {
              duration: reduceMotion ? 0 : 1.15,
              delay: reduceMotion
                ? 0
                : 0.7 + index * 0.13,
              ease: EASE,
            },
            opacity: {
              duration: 0.5,
              delay: reduceMotion
                ? 0
                : 0.7 + index * 0.13,
            },
          }}
          style={{
            filter:
              "drop-shadow(0 0 3px rgba(239,68,68,.65))",
          }}
        />
      </svg>

      {/* CONTENT */}
      <div
        className="
          relative z-10
          flex h-full min-w-0
          flex-col
          px-3.5 py-4
          sm:px-5 sm:py-5
          lg:px-7 lg:py-6
        "
      >
        {/* TOP ROW */}
        <div className="flex items-start justify-between gap-2">
          <div
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center

              rounded-xl
              border border-red-500/25
              bg-red-500/[0.09]

              text-red-400
              transition-all duration-300

              group-hover:border-red-400/50
              group-hover:bg-red-500/[0.15]
              group-hover:text-red-300

              sm:h-11 sm:w-11
            "
          >
            <Icon
              size={19}
              strokeWidth={1.8}
            />
          </div>

          <span
            className="
              font-bebas
              text-[26px]
              leading-none
              text-white/[0.07]

              sm:text-[38px]
              lg:text-[45px]
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* TEXT */}
        <div className="mt-4 sm:mt-5">
          <h3
            className="
              font-bebas
              text-[18px]
              leading-[1.05]
              tracking-[0.025em]
              text-white

              transition-colors duration-300
              group-hover:text-red-300

              sm:text-[23px]
              lg:text-[26px]
            "
          >
            {feature.title}
          </h3>

          <div
            className="
              mt-2 h-[2px] w-7
              bg-gradient-to-r
              from-red-500 to-red-500/10
              transition-[width] duration-300
              group-hover:w-12
            "
          />

          <p
            className="
              mt-3
              font-satoshi
              text-[10px]
              leading-[1.55]
              text-zinc-400

              sm:text-[12px]
              sm:leading-[1.65]
            "
          >
            {feature.description}
          </p>
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-auto flex items-center
            justify-between gap-2 pt-4
          "
        >
          <span
            className="
              font-satoshi
              text-[7px] uppercase
              tracking-[0.12em]
              text-zinc-600

              sm:text-[8px]
            "
          >
            Premium Craft
          </span>

          <span
            className="
              font-bebas
              text-[12px]
              text-red-500/70
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(FeatureCard);
