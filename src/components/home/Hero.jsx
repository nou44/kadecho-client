import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen } from "lucide-react";

import Counter from "../common/Counter";
import HeroSlider from "./HeroSlider";

const stats = [
  {
    value: 250,
    suffix: "+",
    title: "Projects",
  },
  {
    value: 6,
    suffix: "+",
    title: "Years",
  },
  {
    value: 100,
    suffix: "%",
    title: "Quality",
  },
];

/* =========================================================
   MOTION
========================================================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sliderVariants = {
  hidden: {
    opacity: 0,
    x: 28,
    scale: 0.975,
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050505]">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">

        {/* Top glow */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: false,
            amount: 0.1,
          }}
          transition={{
            duration: 1,
          }}
          className="
            absolute
            inset-x-0
            top-0

            h-[260px]
            sm:h-[300px]

            bg-[radial-gradient(circle_at_30%_0%,rgba(220,38,38,.09),transparent_65%)]
          "
        />

        {/* Center glow */}

        <motion.div
          animate={{
            opacity: [0.65, 0.9, 0.65],
            scale: [0.98, 1.03, 0.98],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            left-[48%]
            top-1/2

            h-[420px]
            w-[420px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-red-600/[0.045]

            blur-[120px]

            sm:h-[520px]
            sm:w-[520px]
          "
        />

        {/* Right glow */}

        <div
          className="
            absolute

            -right-32
            top-1/3

            h-[280px]
            w-[280px]

            rounded-full

            bg-red-900/[0.055]

            blur-[100px]

            sm:h-[320px]
            sm:w-[320px]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.014]

            [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)]

            [background-size:65px_65px]
          "
        />
      </div>


      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div
        className="
          relative
          z-10

          mx-auto

          flex
          max-w-[1450px]

          flex-col-reverse

          gap-7

          px-4
          py-6

          sm:gap-8
          sm:px-5
          sm:py-8

          lg:flex-row
          lg:items-center
          lg:gap-9
          lg:px-7
          lg:py-9

          xl:gap-12
          xl:py-11
        "
      >

        {/* =======================================================
            LEFT CONTENT
        ======================================================= */}

        <motion.div
          variants={containerVariants}

          initial="hidden"

          whileInView="visible"

          viewport={{
            once: false,
            amount: 0.18,
          }}

          className="
            relative

            w-full

            /* MOBILE BREATHING SPACE */

            mt-4

            lg:mt-0

            lg:w-[39%]
          "
        >

          {/* =====================================================
              BADGE
          ===================================================== */}

          <motion.div
            variants={itemVariants}

            whileHover={{
              y: -1,
              scale: 1.015,
            }}

            className="
              group

              relative
              z-40

              mb-3

              inline-flex
              items-center
              gap-1.5

              overflow-hidden

              rounded-full

              border
              border-red-500/20

              bg-[#080808]/90

              px-2.5
              py-1

              font-bebas

              backdrop-blur-xl

              shadow-[0_7px_20px_rgba(0,0,0,.30)]

              transition-all
              duration-300

              hover:border-red-500/35

              sm:gap-2
              sm:px-3
              sm:py-1.5
            "
          >

            {/* Glow */}

            <span
              className="
                pointer-events-none

                absolute
                inset-0

                bg-gradient-to-r
                from-red-500/10
                via-transparent
                to-transparent

                opacity-0

                transition-opacity
                duration-300

                group-hover:opacity-100
              "
            />

            {/* Indicator */}

            <span
              className="
                relative

                flex

                h-1.5
                w-1.5

                shrink-0

                items-center
                justify-center

                sm:h-2
                sm:w-2
              "
            >
              <span
                className="
                  absolute

                  h-full
                  w-full

                  animate-ping

                  rounded-full

                  bg-red-500/30
                "
              />

              <span
                className="
                  relative

                  h-1
                  w-1

                  rounded-full

                  bg-red-500

                  shadow-[0_0_8px_rgba(239,68,68,.8)]

                  sm:h-1.5
                  sm:w-1.5
                "
              />
            </span>

            {/* Text */}

            <span
              className="
                relative

                whitespace-nowrap

                text-[6.5px]

                font-bold

                uppercase

                tracking-[0.24em]

                text-red-300

                sm:text-[11px]
                sm:tracking-[0.27em]
              "
            >
              Premium Metal Decoration
            </span>

            {/* Shine */}

            <span
              className="
                pointer-events-none

                absolute

                -left-10
                top-0

                h-full
                w-6

                -skew-x-12

                bg-white/10

                transition-all
                duration-700

                group-hover:left-[120%]
              "
            />
          </motion.div>


          {/* =====================================================
              TITLE
          ===================================================== */}

          <motion.h1
            variants={itemVariants}

            className="
              font-bebas

              text-[36px]

              font-black

              leading-[0.88]

              tracking-[0.045em]

              text-white

              sm:text-[44px]

              md:text-[52px]

              lg:text-[54px]

              xl:text-[62px]

              2xl:text-[68px]
            "
          >
            Crafted For

            <br />

            <span
              className="
                relative

                inline-block

                bg-[linear-gradient(90deg,#ffffff_0%,#f8fafc_15%,#fecaca_28%,#ef4444_45%,#991b1b_58%,#ef4444_72%,#ffffff_88%,#f8fafc_100%)]

                bg-[length:300%_100%]

                bg-clip-text

                text-transparent

                animate-gradient-x

                drop-shadow-[0_0_15px_rgba(220,38,38,.22)]
              "
            >
              Luxury
            </span>

            <br />

            Living
          </motion.h1>


          {/* =====================================================
              TITLE ACCENT
          ===================================================== */}

          <motion.div
            variants={itemVariants}

            initial={false}

            className="
              mt-3

              h-[2px]

              w-[60px]

              rounded-full

              bg-gradient-to-r
              from-red-600
              via-red-400
              to-transparent

              sm:mt-4
              sm:w-[75px]
            "
          />


          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <motion.p
            variants={itemVariants}

            className="
              mt-3

              max-w-[430px]

              text-[10px]

              leading-[1.7]

              text-zinc-400

              sm:mt-4
              sm:text-[12px]
              sm:leading-5.5

              lg:text-[13px]
              lg:leading-6
            "
          >
            Discover handcrafted metal furniture, luxury decoration
            and bespoke creations designed to elevate modern interiors
            with timeless elegance and exceptional craftsmanship.
          </motion.p>


          {/* =====================================================
              BUTTONS
          ===================================================== */}

          <motion.div
            variants={itemVariants}

            className="
              mt-5

              flex
              flex-wrap

              gap-2

              sm:mt-6
              sm:gap-2.5
            "
          >

            {/* PRIMARY */}

            <Link to="/shop">

              <motion.button
                type="button"

                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}

                whileTap={{
                  scale: 0.97,
                }}

                transition={{
                  duration: 0.22,
                }}

                className="
                  group

                  relative

                  inline-flex

                  h-10

                  items-center

                  gap-2

                  overflow-hidden

                  rounded-lg

                  bg-red-600

                  px-4

                  text-[10px]

                  font-semibold

                  text-white

                  shadow-[0_8px_24px_rgba(239,68,68,.15)]

                  transition-all
                  duration-300

                  hover:bg-red-500

                  hover:shadow-[0_12px_30px_rgba(239,68,68,.25)]

                  sm:h-10.5
                  sm:px-5
                  sm:text-xs
                "
              >

                <span
                  className="
                    absolute

                    inset-y-0

                    -left-12

                    w-7

                    -skew-x-12

                    bg-white/20

                    transition-all
                    duration-600

                    group-hover:left-[120%]
                  "
                />

                <span className="relative">
                  Explore Collection
                </span>

                <ArrowRight
                  size={13}
                  className="
                    relative

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />

              </motion.button>

            </Link>


            {/* SECONDARY */}

            <Link to="/projects">

              <motion.button
                type="button"

                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}

                whileTap={{
                  scale: 0.97,
                }}

                transition={{
                  duration: 0.22,
                }}

                className="
                  group

                  inline-flex

                  h-10

                  items-center

                  gap-2

                  rounded-lg

                  border
                  border-white/10

                  bg-white/[0.025]

                  px-4

                  text-[10px]

                  font-semibold

                  text-white

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:border-red-500/30

                  hover:bg-red-500/[0.06]

                  hover:shadow-[0_10px_28px_rgba(239,68,68,.09)]

                  sm:h-10.5
                  sm:px-5
                  sm:text-xs
                "
              >

                <FolderOpen
                  size={13}
                  className="
                    text-zinc-500

                    transition-colors
                    duration-300

                    group-hover:text-red-400
                  "
                />

                View Projects

              </motion.button>

            </Link>

          </motion.div>


          {/* =====================================================
              STATS
          ===================================================== */}

          <motion.div
            variants={itemVariants}

            className="
              mt-5

              grid

              max-w-[430px]

              grid-cols-3

              gap-2

              sm:mt-6
              sm:gap-2.5
            "
          >

            {stats.map((item) => (

              <motion.div
                key={item.title}

                whileHover={{
                  y: -3,
                }}

                transition={{
                  duration: 0.22,
                }}

                className="
                  group

                  relative

                  overflow-hidden

                  rounded-xl

                  border
                  border-white/[0.08]

                  bg-white/[0.02]

                  p-2.5

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:border-red-500/25

                  hover:bg-red-500/[0.025]

                  sm:p-3
                "
              >

                {/* Top line */}

                <div
                  className="
                    absolute

                    left-1/2
                    top-0

                    h-px

                    w-0

                    -translate-x-1/2

                    bg-gradient-to-r
                    from-transparent
                    via-red-500
                    to-transparent

                    transition-all
                    duration-400

                    group-hover:w-full
                  "
                />

                <h3
                  className="
                    font-bebas

                    text-[21px]

                    font-black

                    leading-none

                    tracking-wide

                    text-white

                    sm:text-[24px]
                  "
                >
                  <Counter
                    end={item.value}
                    duration={2200}
                    suffix={item.suffix}
                  />
                </h3>

                <p
                  className="
                    mt-1

                    text-[7px]

                    uppercase

                    tracking-[0.2em]

                    text-zinc-500

                    sm:text-[8px]
                  "
                >
                  {item.title}
                </p>

              </motion.div>

            ))}

          </motion.div>

        </motion.div>


        {/* =======================================================
            RIGHT — HERO SLIDER
        ======================================================= */}

        <motion.div
          variants={sliderVariants}

          initial="hidden"

          whileInView="visible"

          viewport={{
            once: false,
            amount: 0.15,
          }}

          className="
            relative

            w-full

            lg:w-[61%]
          "
        >

          {/* Ambient glow */}

          <motion.div
            animate={{
              opacity: [0.5, 0.85, 0.5],
              scale: [0.98, 1.04, 0.98],
            }}

            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}

            className="
              pointer-events-none

              absolute

              left-1/2
              top-1/2

              h-[200px]
              w-[70%]

              -translate-x-1/2
              -translate-y-1/2

              rounded-full

              bg-red-600/[0.055]

              blur-[75px]

              sm:h-[240px]
              sm:w-[65%]
              sm:blur-[85px]
            "
          />


          {/* Slider */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.985,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            viewport={{
              once: false,
              amount: 0.15,
            }}

            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}

            className="
              relative
              w-full
            "
          >
            <HeroSlider />
          </motion.div>

        </motion.div>

      </div>


      {/* =========================================================
          BOTTOM FADE
      ========================================================= */}

      <div
        className="
          pointer-events-none

          absolute

          inset-x-0
          bottom-0

          h-16

          bg-gradient-to-t
          from-[#050505]
          to-transparent

          sm:h-20
        "
      />

    </section>
  );
}

