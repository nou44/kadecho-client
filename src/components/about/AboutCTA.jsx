import { motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-14 sm:py-16 lg:py-20">

      {/* ================================================= */}
      {/* BACKGROUND GLOW */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600/[0.07]
          blur-[140px]
        "
      />

      <Container className="relative z-10">

        {/* ================================================= */}
        {/* CTA CARD */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
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

          {/* ================================================= */}
          {/* INNER BORDER */}
          {/* ================================================= */}

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

          {/* ================================================= */}
          {/* TOP RED LINE */}
          {/* ================================================= */}

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.25,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-0
              right-0
              top-0
              h-[2px]
              origin-center
              bg-gradient-to-r
              from-transparent
              via-red-500
              to-transparent
            "
          />

          {/* ================================================= */}
          {/* MOVING SHINE */}
          {/* ================================================= */}

          <motion.div
            animate={{
              x: ["-120%", "220%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-[1]
              w-20
              -skew-x-[18deg]
              bg-gradient-to-r
              from-transparent
              via-white/[0.045]
              to-transparent
            "
          />

          {/* ================================================= */}
          {/* RED AMBIENT GLOW */}
          {/* ================================================= */}

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.12, 0.2, 0.12],
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
              h-[260px]
              w-[260px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-red-600/20
              blur-[110px]
            "
          />

          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <div className="relative z-10 mx-auto max-w-4xl text-center">

            {/* Badge */}

            <motion.span
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
                delay: 0.15,
                duration: 0.5,
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
                backdrop-blur-md
              "
            >
              <Sparkles
                size={11}
                className="text-red-500"
              />

              Let's Build Together
            </motion.span>

            {/* ================================================= */}
            {/* TITLE */}
            {/* ================================================= */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 22,
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
                duration: 0.65,
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

            {/* ================================================= */}
            {/* LINE */}
            {/* ================================================= */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              whileInView={{
                width: 140,
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.4,
                duration: 0.8,
              }}
              className="
                mx-auto
                mt-4
                h-[2px]
                rounded-full
                bg-gradient-to-r
                from-transparent
                via-red-500
                to-transparent
              "
            />

            {/* ================================================= */}
            {/* DESCRIPTION */}
            {/* ================================================= */}

            <motion.p
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
                delay: 0.5,
                duration: 0.5,
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

            {/* ================================================= */}
            {/* BUTTONS */}
            {/* ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.6,
                duration: 0.55,
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
                  relative
                  inline-flex
                  h-11
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  overflow-hidden
                  rounded-xl
                  bg-red-600
                  px-6
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  shadow-[0_10px_30px_rgba(239,68,68,.16)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-red-500
                  hover:shadow-[0_15px_35px_rgba(239,68,68,.28)]
                  sm:w-auto
                "
              >
                {/* Shine */}

                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover/button:translate-x-full
                  "
                />

                <span className="relative">
                  Request Quote
                </span>

                <ArrowRight
                  size={14}
                  className="
                    relative
                    transition-transform
                    duration-300
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
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
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
                    duration-300
                    group-hover/call:rotate-[-12deg]
                    group-hover/call:scale-110
                  "
                />

                Call Us
              </a>

            </motion.div>

          </div>

          {/* ================================================= */}
          {/* BOTTOM ACCENT */}
          {/* ================================================= */}

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