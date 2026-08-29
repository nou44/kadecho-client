import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

export default function FeaturedCard({ project }) {
  const cardRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
  });

  function handleMove(e) {
    if (!cardRef.current) return;

    const rect =
      cardRef.current.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;

    const rotateXValue =
      ((y / rect.height) - 0.5) * -12;

    const rotateYValue =
      ((x / rect.width) - 0.5) * 12;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function resetCard() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
  <motion.div
    ref={cardRef}
    onMouseMove={handleMove}
    onMouseLeave={resetCard}
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
      duration: .7,
    }}
    style={{
      rotateX: smoothRotateX,
      rotateY: smoothRotateY,
      transformPerspective: 1400,
    }}
    className="
      group
      h-full
    "
  >
    <Link
      to={`/projects/${project.slug}`}
      className="
        relative
        block

        overflow-hidden

        rounded-[28px]

        border
        border-white/10

        bg-[#080808]/80

        backdrop-blur-2xl

        transition-all
        duration-500

        hover:border-red-500/40
        hover:shadow-[0_25px_70px_rgba(220,38,38,.22)]
      "
    >
{/* Image */}

<div
  className="
    relative
    overflow-hidden

    h-[190px]
    sm:h-[220px]
    lg:h-[250px]

    bg-[#0b0b0b]
  "
>
  {!loaded && (
    <div
      className="
        absolute
        inset-0

        animate-pulse

        bg-zinc-800
      "
    />
  )}

  <motion.img
    loading="lazy"
    onLoad={() => setLoaded(true)}
    src={project.image}
    alt={project.title}
    whileHover={{
      scale: 1.08,
    }}
    transition={{
      duration: 0.8,
    }}
    className="
      h-full
      w-full

      object-cover
      object-center

      transition-transform
      duration-700

      group-hover:scale-110
    "
  />

        {/* Reflection */}

        <motion.div
          animate={{
            x: [
              "-160%",
              "220%",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.8,
            ease: "linear",
          }}
          className="
            absolute
            inset-y-0

            w-20

            -skew-x-12

            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t

            from-[#050505]
            via-black/10
            to-transparent
          "
        />

        {/* Hover Overlay */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          className="
            absolute
            inset-0

            bg-red-600/10
          "
        />

        {/* Category */}

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
         className="
  absolute

  left-3
  top-3

  sm:left-4
  sm:top-4

  flex
  items-center
  gap-1.5
  sm:gap-2

  rounded-full

  border
  border-white/10

  bg-black/50

  px-2.5
  py-1.5

  sm:px-3
  sm:py-2

  backdrop-blur-xl
"
        >
         <Sparkles
  size={11}
  className="text-red-500 sm:h-[13px] sm:w-[13px]"
/>

         <span
  className="
    font-bebas

    text-[9px]
    sm:text-[11px]

    uppercase

    tracking-[0.18em]
    sm:tracking-[0.30em]

    text-white
  "
>
  {project.category}
</span>
        </motion.div>
      </div>



      {/* Content */}

      <div
        className="
          relative

          p-5
sm:p-6
        "
      >
    <motion.h3
  whileHover={{
    x: 4,
  }}
  transition={{
    duration: 0.3,
  }}
  className="
    font-bebas

    text-[20px]
    sm:text-[24px]
    lg:text-[28px]

    leading-none

    uppercase

    tracking-[0.05em]
    sm:tracking-[0.08em]

    text-white

    line-clamp-2

    transition-colors
    duration-300

    group-hover:text-red-50
  "
>
  {project.title}
</motion.h3>

  <p
  className="
    mt-2

    font-satoshi

    text-[12px]
    sm:text-[13px]
    lg:text-[14px]

    leading-5
    sm:leading-6

    text-zinc-400

    line-clamp-2
    sm:line-clamp-3
  "
>
  {project.description}
</p>

     <motion.div
  whileHover={{
    x: 4,
  }}
  transition={{
    duration: 0.25,
  }}
  className="
    mt-5

    inline-flex
    items-center
    gap-2

    rounded-full

    border
    border-red-500/20

    bg-red-500/10

    px-4
    py-2

    backdrop-blur-xl

    transition-all
    duration-300

    group-hover:border-red-500/40
    group-hover:bg-red-500/15
  "
>
  <span
    className="
      font-bebas

      text-[10px]
      sm:text-[12px]

      uppercase

      tracking-[0.22em]

      text-red-400
    "
  >
    View Project
  </span>

  <motion.div
    animate={{
      x: [0, 3, 0],
    }}
    transition={{
      repeat: Infinity,
      duration: 1.4,
      ease: "easeInOut",
    }}
  >
    <ArrowUpRight
      size={16}
      className="text-red-400"
    />
  </motion.div>
</motion.div>
      </div>
              {/* Animated Bottom Line */}

        <motion.div
          initial={{
            width: 0,
          }}
          whileHover={{
            width: "100%",
          }}
          transition={{
            duration: .45,
          }}
          className="
            absolute

            bottom-0
            left-0

            h-[2px]

            bg-gradient-to-r

            from-red-700
            via-red-500
            to-red-700
          "
        />

        {/* Infinite Shine */}

        <motion.div
          animate={{
            x: [
              "-160%",
              "220%",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none

            absolute

            inset-y-0

            w-24

            -skew-x-12

            bg-gradient-to-r

            from-transparent
            via-white/5
            to-transparent
          "
        />

        {/* Border Glow */}

        <div
          className="
            absolute

            inset-0

            rounded-[28px]

            ring-1
            ring-red-500/0

            transition-all
            duration-500

            group-hover:ring-red-500/40
          "
        />

        {/* Bottom Red Glow */}

        <div
          className="
            absolute

            -bottom-14
            left-1/2

            h-28
            w-44

            -translate-x-1/2

            rounded-full

            bg-red-600/25

            opacity-0

            blur-[70px]

            transition-all
            duration-500

            group-hover:opacity-100
          "
        />

        {/* Top Glow */}

        <div
          className="
            absolute

            left-0
            top-0

            h-px
            w-full

            bg-gradient-to-r

            from-transparent
            via-red-500/70
            to-transparent
          "
        />

        {/* Side Glow */}

        <div
          className="
            absolute

            right-0
            top-0

            h-full
            w-px

            bg-gradient-to-b

            from-transparent
            via-red-500/20
            to-transparent
          "
        />

      </Link>
    </motion.div>
  );
}