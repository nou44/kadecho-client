
import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Container from "../ui/Container";
import {
  MessageSquare,
  Ruler,
  PencilRuler,
  BadgeCheck,
  Hammer,
  Paintbrush,
  Truck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    description: "Your vision & requirements.",
  },
  {
    icon: Ruler,
    title: "Measurements",
    description: "Every dimension matters.",
  },
  {
    icon: PencilRuler,
    title: "Design",
    description: "Ideas become precision.",
  },
  {
    icon: BadgeCheck,
    title: "Approval",
    description: "Every detail confirmed.",
  },
  {
    icon: Hammer,
    title: "Fabrication",
    description: "Crafted by expert hands.",
  },
  {
    icon: Paintbrush,
    title: "Finishing",
    description: "The premium final touch.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description: "Handled with care.",
  },
  {
    icon: CheckCircle2,
    title: "Installation",
    description: "Perfectly fitted on site.",
  },
];

/*
  Geometry:
  Each cell uses a 100 x 100 local coordinate system.

  Tabs:
  +1 = outward
  -1 = inward
   0 = flat

  Shared neighboring edges have opposite tab values.
  The same cubic curves are used for both sides.
*/

const TAB = 11;
const A = 34;
const B = 66;

function puzzlePath(top, right, bottom, left) {
  let d = "M 0 0";

  // TOP: left -> right
  if (!top) {
    d += " H 100";
  } else {
    const v = -top * TAB;
    d += ` H ${A}`;
    d += ` C ${A - 6} ${v}, ${B + 6} ${v}, ${B} 0`;
    d += " H 100";
  }

  // RIGHT: top -> bottom
  if (!right) {
    d += " V 100";
  } else {
    const v = 100 + right * TAB;
    d += ` V ${A}`;
    d += ` C ${v} ${A - 6}, ${v} ${B + 6}, 100 ${B}`;
    d += " V 100";
  }

  // BOTTOM: right -> left
  if (!bottom) {
    d += " H 0";
  } else {
    const v = 100 + bottom * TAB;
    d += ` H ${B}`;
    d += ` C ${B + 6} ${v}, ${A - 6} ${v}, ${A} 100`;
    d += " H 0";
  }

  // LEFT: bottom -> top
  if (!left) {
    d += " V 0";
  } else {
    const v = -left * TAB;
    d += ` V ${B}`;
    d += ` C ${v} ${B + 6}, ${v} ${A - 6}, 0 ${A}`;
    d += " V 0";
  }

  return d + " Z";
}

// Consistent connection patterns across rows/columns.
const horizontalConnections = [
  [1, -1, 1],
  [-1, 1, -1],
  [1, 1, -1],
  [-1, -1, 1],
];

const verticalConnections = [
  [1, -1, 1, -1],
  [-1, 1, -1, 1],
  [1, 1, -1, -1],
];

function getPieceEdges(index, columns) {
  const row = Math.floor(index / columns);
  const col = index % columns;
  const rows = steps.length / columns;

  const right =
    col === columns - 1
      ? 0
      : horizontalConnections[row][col];

  const left =
    col === 0
      ? 0
      : -horizontalConnections[row][col - 1];

  const bottom =
    row === rows - 1
      ? 0
      : verticalConnections[row][col];

  const top =
    row === 0
      ? 0
      : -verticalConnections[row - 1][col];

  return { top, right, bottom, left };
}

// Separate edge patterns for mobile 2x4.
function getMobileEdges(index) {
  const row = Math.floor(index / 2);
  const col = index % 2;

  const jointsX = [1, -1, 1, -1];
  const jointsY = [
    [1, -1],
    [-1, 1],
    [1, 1],
  ];

  return {
    top: row === 0 ? 0 : -jointsY[row - 1][col],
    right: col === 1 ? 0 : jointsX[row],
    bottom: row === 3 ? 0 : jointsY[row][col],
    left: col === 0 ? 0 : -jointsX[row],
  };
}

function PuzzlePiece({
  step,
  index,
  columns,
  assembled,
  reduceMotion,
  gradientId,
}) {
  const Icon = step.icon;

  const row = Math.floor(index / columns);
  const col = index % columns;

  const edges =
    columns === 2
      ? getMobileEdges(index)
      : getPieceEdges(index, columns);

  const path = puzzlePath(
    edges.top,
    edges.right,
    edges.bottom,
    edges.left
  );

  const centerX = (columns - 1) / 2;
  const centerY = (steps.length / columns - 1) / 2;

  const offsetX = (col - centerX) * 28;
  const offsetY = (row - centerY) * 24;

  const rotation =
    (index % 2 === 0 ? -1 : 1) * 3;

  const target =
    reduceMotion || assembled
      ? { x: 0, y: 0, rotate: 0, opacity: 1 }
      : {
          x: offsetX,
          y: offsetY,
          rotate: rotation,
          opacity: 0.88,
        };

  return (
    <motion.div
      initial={false}
      animate={target}
      transition={{
        duration: assembled ? 1.05 : 0.8,
        delay: assembled ? index * 0.055 : 0,
        ease: EASE,
      }}
      className="
        group relative min-w-0
        aspect-[1.18/1]
        transform-gpu
      "
    >
      {/* REAL PUZZLE SILHOUETTE */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full
          overflow-visible
        "
      >
        <path
          d={path}
          fill={`url(#${gradientId})`}
          stroke="#823037"
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>

      {/* CONTENT — MOVES WITH ITS PIECE */}
      <div
        className="
          relative z-10 flex h-full
          min-w-0 flex-col
          items-center justify-center
          px-2.5 py-2.5
          text-center
          sm:px-3 sm:py-3
          lg:px-3
        "
      >
        <span
          className="
            absolute right-2 top-2
            font-mono text-[7px]
            tracking-wider
            text-red-400/45
            sm:right-3 sm:top-3
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className="
            flex h-7 w-7
            shrink-0 items-center justify-center
            rounded-lg
            border border-red-500/20
            bg-red-500/10
            text-red-400
            sm:h-8 sm:w-8
            lg:h-9 lg:w-9
          "
        >
          <Icon
            size={14}
            strokeWidth={1.7}
            className="lg:h-4 lg:w-4"
          />
        </div>

        <h3
          className="
            mt-2 font-bebas
            text-[13px] uppercase
            leading-none
            tracking-[0.035em]
            text-white
            sm:text-[16px]
            lg:text-[18px]
          "
        >
          {step.title}
        </h3>

        <div className="mt-1.5 h-px w-5 bg-red-500/65" />

        <p
          className="
            mt-1.5 max-w-[130px]
            text-[8px] leading-[1.45]
            text-zinc-400
            sm:text-[9px]
            lg:text-[10px]
          "
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function PuzzleAssembly({
  columns,
  active,
  reduceMotion,
  gradientId,
}) {
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setAssembled(true);
      return;
    }

    if (!active) {
      setAssembled(false);
      return;
    }

    const timers = [];

    const start = window.setTimeout(() => {
      setAssembled(true);
    }, 300);

    const interval = window.setInterval(() => {
      setAssembled(false);

      const reassemble = window.setTimeout(() => {
        setAssembled(true);
      }, 1150);

      timers.push(reassemble);
    }, 6500);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
      timers.forEach(window.clearTimeout);
    };
  }, [active, reduceMotion]);

  return (
    <div
      className="
        relative mx-auto
        w-full
      "
    >
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        className="absolute"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#191919" />
            <stop offset="55%" stopColor="#101010" />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className={`
          relative grid gap-0
          ${
            columns === 2
              ? "grid-cols-2"
              : "grid-cols-4"
          }
        `}
      >
        {steps.map((step, index) => (
          <PuzzlePiece
            key={step.title}
            step={step}
            index={index}
            columns={columns}
            assembled={assembled}
            reduceMotion={reduceMotion}
            gradientId={gradientId}
          />
        ))}
      </div>
    </div>
  );
}

export default function WorkProcess() {
  const sectionRef = useRef(null);

  const active = useInView(sectionRef, {
    amount: 0.15,
  });

  const reduceMotion = useReducedMotion();
  const rawId = useId();
  const gradientId = `kadecho-metal-${rawId.replace(/:/g, "")}`;

  return (
    <section
      ref={sectionRef}
      className="
        relative isolate overflow-hidden
        bg-[#050505]
        py-10 sm:py-12 lg:py-14
      "
    >
      {/* STATIC BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_55%,rgba(220,38,38,0.055),transparent_60%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.018]
          [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          [background-size:42px_42px]
        "
      />

      <Container className="relative z-10">
        {/* COMPACT HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-red-500/20
              bg-red-500/[0.08]
              px-3 py-1
              text-[8px] font-semibold
              uppercase tracking-[0.25em]
              text-red-400
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Our Process
          </span>

          <h2
            className="
              mt-3 font-bebas
              text-[32px] uppercase
              leading-[0.9]
              tracking-[0.04em]
              text-white
              sm:text-[40px]
              lg:text-[48px]
            "
          >
            From Idea{" "}
            <span className="text-red-500">
              To Perfection
            </span>
          </h2>

          <div
            className="
              mx-auto mt-3
              h-[2px] w-[80px]
              bg-gradient-to-r
              from-transparent via-red-500 to-transparent
            "
          />

          <p
            className="
              mx-auto mt-3 max-w-xl
              text-[11px] leading-5
              text-zinc-500
              sm:text-[12px] sm:leading-6
            "
          >
            Eight carefully connected stages.
            One perfectly crafted result.
          </p>
        </div>

        {/* MOBILE: 2 x 4 */}
        <div className="mx-auto mt-7 w-full max-w-[430px] px-3 sm:hidden">
          <PuzzleAssembly
            columns={2}
            active={active}
            reduceMotion={reduceMotion}
            gradientId={`${gradientId}-mobile`}
          />
        </div>

        {/* TABLET + DESKTOP: 4 x 2 */}
        <div
          className="
            mx-auto mt-8 hidden
            w-full max-w-[1020px]
            px-4 sm:block
          "
        >
          <PuzzleAssembly
            columns={4}
            active={active}
            reduceMotion={reduceMotion}
            gradientId={`${gradientId}-desktop`}
          />
        </div>

        {/* BOTTOM SIGNATURE */}
        <div
          className="
            mx-auto mt-6
            flex w-fit items-center gap-2
            rounded-full
            border border-white/[0.06]
            bg-white/[0.02]
            px-3 py-2
            text-[8px] uppercase
            tracking-[0.15em]
            text-zinc-600
            sm:text-[9px]
          "
        >
          Precision
          <span className="text-red-500">•</span>
          Craftsmanship
          <span className="text-red-500">•</span>
          Excellence
          <ArrowRight
            size={11}
            className="ml-1 text-red-500"
          />
        </div>
      </Container>
    </section>
  );
}
