import { motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

export default function AboutCTA() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050505]

        py-14
        sm:py-16
        lg:py-20
      "
    >
      {/* =================================================
          STATIC BACKGROUND AMBIENCE
          No blur animation / no infinite animation
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2

          h-[360px]
          w-[360px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-red-600/[0.055]

          blur-[90px]
        "
      />

      <Container className="relative z-10">
        {/* =================================================
            CTA CARD
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
            group
            relative
            overflow-hidden

            rounded-[28px]

            border
            border-white/[0.08]

            bg-gradient-to-br
            from-[#121212]
            via-[#090909]
            to-black

            px-5
            py-9

            sm:px-8
            sm:py-12

            lg:px-14
            lg:py-14
          "
        >
          {/* =================================================
              INNER BORDER
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[1px]

              rounded-[27px]

              border
              border-white/[0.025]
            "
          />

          {/* =================================================
              STATIC TOP LINE
          ================================================= */}

          <div
            className="
              absolute
              left-0
              right-0
              top-0

              h-[2px]

              bg-gradient-to-r
              from-transparent
              via-red-500
              to-transparent
            "
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* =================================================
                BADGE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.05,
                duration: 0.35,
              }}
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-red-500/20

                bg-red-500/[0.08]

                px-3
                py-1.5

                text-[9px]

                font-semibold
                uppercase

                tracking-[0.28em]

                text-red-400
              "
            >
              <Sparkles
                size={11}
                className="text-red-500"
              />

              Let's Build Together
            </motion.div>

            {/* =================================================
                TITLE
            ================================================= */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mx-auto
                mt-5
                max-w-3xl

                font-bebas

                text-4xl
                font-black

                uppercase

                leading-[0.9]

                tracking-[0.04em]

                text-white

                sm:text-5xl
                lg:text-6xl
              "
            >
              Ready To Start{" "}
              <span className="text-red-500">
                Your Dream Project?
              </span>
            </motion.h2>

            {/* =================================================
                ACCENT
            ================================================= */}

            <div
              className="
                mx-auto
                mt-4

                h-[2px]
                w-[120px]

                rounded-full

                bg-gradient-to-r
                from-transparent
                via-red-500
                to-transparent
              "
            />

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <motion.p
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
                delay: 0.18,
                duration: 0.4,
              }}
              className="
                mx-auto
                mt-5
                max-w-xl

                text-[12px]
                leading-6

                text-zinc-500

                sm:text-[13px]
                sm:leading-7
              "
            >
              Whether it's a pergola, staircase, gate,
              decorative furniture or a fully custom
              metal project, our team is ready to turn
              your vision into reality.
            </motion.p>

            {/* =================================================
                BUTTONS
            ================================================= */}

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
                delay: 0.25,
                duration: 0.4,
              }}
              className="
                mt-7

                flex
                flex-col
                items-center
                justify-center
                gap-3

                sm:flex-row
              "
            >
              {/* REQUEST QUOTE */}

              <Link
                to="/contact"
                className="
                  group/button

                  inline-flex
                  h-11
                  w-full

                  items-center
                  justify-center
                  gap-2.5

                  rounded-xl

                  bg-red-600

                  px-6

                  text-[10px]

                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-white

                  shadow-[0_10px_30px_rgba(239,68,68,.12)]

                  transition-transform
                  duration-200

                  hover:-translate-y-0.5
                  hover:bg-red-500

                  sm:w-auto
                "
              >
                <span>
                  Request Quote
                </span>

                <ArrowRight
                  size={14}
                  className="
                    transition-transform
                    duration-200

                    group-hover/button:translate-x-1
                  "
                />
              </Link>

              {/* CALL */}

              <a
                href="tel:+212600000000"
                className="
                  group/call

                  inline-flex
                  h-11
                  w-full

                  items-center
                  justify-center
                  gap-2.5

                  rounded-xl

                  border
                  border-white/[0.08]

                  bg-white/[0.025]

                  px-6

                  text-[10px]

                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-white

                  transition-colors
                  duration-200

                  hover:border-red-500/25
                  hover:bg-red-500/[0.07]

                  sm:w-auto
                "
              >
                <Phone
                  size={14}
                  className="
                    text-red-400

                    transition-transform
                    duration-200

                    group-hover/call:rotate-[-12deg]
                  "
                />

                Call Us
              </a>
            </motion.div>
          </div>

          {/* =================================================
              BOTTOM ACCENT
          ================================================= */}

          <div
            className="
              pointer-events-none

              absolute
              bottom-0
              left-1/2

              h-px
              w-1/2

              -translate-x-1/2

              bg-gradient-to-r
              from-transparent
              via-red-500/30
              to-transparent
            "
          />
        </motion.div>
      </Container>
    </section>
  );
}