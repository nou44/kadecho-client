import { motion } from "framer-motion";
import Container from "../ui/Container";
import {
  Sparkles,
  ArrowUpRight,
  Check,
} from "lucide-react";

const features = [
  "Premium Quality",
  "Custom Design",
  "Expert Team",
];

export default function AboutStory() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-14 sm:py-16 lg:py-20">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-[10%]
          top-1/2
          h-[380px]
          w-[380px]
          -translate-y-1/2
          rounded-full
          bg-red-600/[0.06]
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.018]
          bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      <Container className="relative z-10">

        <div
          className="
            grid
            items-center
            gap-10

            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-14

            xl:gap-20
          "
        >

          {/* ================================================= */}
          {/* IMAGE */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative"
          >

            {/* Outer glow */}

            <div
              className="
                pointer-events-none
                absolute
                -inset-4
                rounded-[30px]
                bg-red-500/[0.06]
                blur-2xl
                opacity-0
                transition-opacity
                duration-700
                group-hover:opacity-100
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border
                border-white/10
                bg-[#080808]

                shadow-[0_30px_80px_rgba(0,0,0,.45)]
              "
            >

              {/* Image */}

              <motion.img
                src="/about4.png"
                alt="KADECHO craftsmanship"
                whileHover={{
                  scale: 1.035,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="
                  h-[280px]
                  w-full

                  object-cover
                  object-center

                  sm:h-[340px]

                  lg:h-[500px]
                "
              />

              {/* Dark cinematic overlay */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/80
                  via-black/10
                  to-transparent
                "
              />

              {/* Red edge */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-px

                  bg-gradient-to-r
                  from-transparent
                  via-red-500/70
                  to-transparent
                "
              />

              {/* Floating label */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                }}
                className="
                  absolute
                  bottom-4
                  left-4
                  right-4

                  flex
                  items-center
                  justify-between

                  rounded-xl
                  border
                  border-white/10

                  bg-black/55
                  px-4
                  py-3

                  backdrop-blur-xl

                  sm:bottom-5
                  sm:left-5
                  sm:right-5
                "
              >

                <div>
                  <p
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.25em]
                      text-zinc-500
                    "
                  >
                    KADECHO
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.08em]
                      text-white
                    "
                  >
                    Crafted With Precision
                  </p>
                </div>

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-red-500/20
                    bg-red-500/10
                    text-red-400
                  "
                >
                  <ArrowUpRight size={14} />
                </div>

              </motion.div>

            </div>
          </motion.div>


          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* BADGE */}

            <motion.span
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.15,
              }}
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-red-500/20

                bg-red-500/10

                px-3
                py-1.5

                text-[8px]
                sm:text-[9px]

                font-semibold
                uppercase

                tracking-[0.24em]

                text-red-400

                backdrop-blur-md
              "
            >
              <Sparkles size={11} />

              Our Story
            </motion.span>


            {/* TITLE */}

            <h2
              className="
                mt-4

                max-w-xl

                font-bebas
                font-black

                uppercase

                leading-[0.9]

                tracking-[0.025em]

                text-[36px]

                sm:text-[44px]

                lg:text-[52px]

                xl:text-[58px]
              "
            >
              <span className="text-white">
                Turning Metal Into
              </span>

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-red-400
                  via-red-500
                  to-orange-400

                  bg-clip-text
                  text-transparent
                "
              >
                Timeless Luxury
              </span>
            </h2>


            {/* LINE */}

            <motion.div
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 85,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.3,
                duration: 0.7,
              }}
              className="
                mt-4
                h-[2px]
                rounded-full

                bg-gradient-to-r
                from-red-600
                via-red-400
                to-transparent
              "
            />


            {/* DESCRIPTION */}

            <div
              className="
                mt-5
                max-w-xl
                space-y-3
              "
            >

              <p
                className="
                  text-[11px]
                  leading-6

                  text-zinc-400

                  sm:text-[12px]
                  sm:leading-6

                  lg:text-[13px]
                  lg:leading-7
                "
              >
                At KADECHO, every project is built with precision,
                creativity and attention to detail. We combine
                modern engineering with handcrafted metal artistry
                to create unique spaces that last for years.
              </p>

              <p
                className="
                  text-[11px]
                  leading-6

                  text-zinc-500

                  sm:text-[12px]
                  sm:leading-6

                  lg:text-[13px]
                  lg:leading-7
                "
              >
                From pergolas and staircases to luxury furniture,
                gates and custom structures, our passion is turning
                your vision into reality.
              </p>

            </div>


            {/* ================================================= */}
            {/* FEATURES */}
            {/* ================================================= */}

            <div
              className="
                mt-6

                grid
                grid-cols-3

                gap-2

                sm:gap-3
              "
            >

              {features.map((item, index) => (

                <motion.div
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.25 + index * 0.08,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    group/feature

                    rounded-xl

                    border
                    border-white/[0.08]

                    bg-white/[0.025]

                    p-3

                    transition-all
                    duration-300

                    hover:border-red-500/25
                    hover:bg-white/[0.04]
                  "
                >

                  <div
                    className="
                      flex
                      h-7
                      w-7

                      items-center
                      justify-center

                      rounded-lg

                      bg-red-500/10

                      text-red-400

                      transition-all
                      duration-300

                      group-hover/feature:bg-red-500
                      group-hover/feature:text-white
                    "
                  >
                    <Check size={13} />
                  </div>

                  <p
                    className="
                      mt-2

                      text-[8px]
                      sm:text-[9px]

                      font-semibold
                      uppercase

                      tracking-[0.12em]

                      leading-4

                      text-zinc-300
                    "
                  >
                    {item}
                  </p>

                </motion.div>

              ))}

            </div>


            {/* ================================================= */}
            {/* MISSION */}
            {/* ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.45,
                duration: 0.6,
              }}
              className="
                relative

                mt-5

                overflow-hidden

                rounded-[20px]

                border
                border-white/10

                bg-gradient-to-br
                from-white/[0.045]
                to-white/[0.015]

                p-4

                sm:p-5
              "
            >

              {/* Animated top line */}

              <motion.div
                animate={{
                  x: ["-100%", "220%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  left-0
                  top-0

                  h-px
                  w-24

                  bg-gradient-to-r
                  from-transparent
                  via-red-500
                  to-transparent
                "
              />

              <div
                className="
                  flex
                  items-start
                  gap-3
                "
              >

                <div
                  className="
                    mt-0.5

                    h-7
                    w-1

                    rounded-full

                    bg-gradient-to-b
                    from-red-400
                    to-red-700
                  "
                />

                <div>

                  <p
                    className="
                      text-[8px]

                      font-semibold
                      uppercase

                      tracking-[0.24em]

                      text-red-400
                    "
                  >
                    Our Mission
                  </p>

                  <h3
                    className="
                      mt-1.5

                      font-bebas
                      text-xl

                      uppercase

                      tracking-[0.04em]

                      text-white

                      sm:text-2xl
                    "
                  >
                    Excellence In Every Detail
                  </h3>

                  <p
                    className="
                      mt-2

                      max-w-xl

                      text-[10px]
                      leading-5

                      text-zinc-500

                      sm:text-[11px]
                      sm:leading-6
                    "
                  >
                    We create premium custom metal solutions
                    that combine durability, innovation and
                    timeless luxury, ensuring every project
                    exceeds our clients' expectations.
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </Container>
    </section>
  );
}