
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Sparkles,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

const EASE = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

function FinalPuzzlePiece({ reduceMotion }) {
  return (
    <div
      aria-hidden="true"
      className="
        relative mx-auto
        h-[68px] w-[68px]
        sm:h-[82px] sm:w-[82px]
      "
    >
      {/* TARGET / SOCKET */}
      <svg
        viewBox="0 0 100 100"
        className="
          absolute inset-0
          h-full w-full
          overflow-visible
        "
      >
        <path
          d="
            M 10 10
            H 36
            C 29 -4 71 -4 64 10
            H 90
            V 36
            C 104 29 104 71 90 64
            V 90
            H 64
            C 71 104 29 104 36 90
            H 10
            V 64
            C -4 71 -4 29 10 36
            Z
          "
          fill="none"
          stroke="rgba(239,68,68,0.2)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
        />
      </svg>

      {/* MOVING FINAL PIECE */}
      <motion.svg
        viewBox="0 0 100 100"
        initial={
          reduceMotion
            ? false
            : {
                x: 42,
                y: -25,
                rotate: 15,
                opacity: 0,
                scale: 0.8,
              }
        }
        whileInView={{
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 1,
          delay: 0.2,
          ease: EASE,
        }}
        className="
          absolute inset-0
          h-full w-full
          overflow-visible
          drop-shadow-[0_8px_20px_rgba(220,38,38,0.13)]
        "
      >
        <defs>
          <linearGradient
            id="about-cta-piece"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#311416" />
            <stop offset="55%" stopColor="#1a0d0e" />
            <stop offset="100%" stopColor="#0b0909" />
          </linearGradient>
        </defs>

        <path
          d="
            M 10 10
            H 36
            C 29 -4 71 -4 64 10
            H 90
            V 36
            C 104 29 104 71 90 64
            V 90
            H 64
            C 71 104 29 104 36 90
            H 10
            V 64
            C -4 71 -4 29 10 36
            Z
          "
          fill="url(#about-cta-piece)"
          stroke="#dc454b"
          strokeWidth="1.2"
        />

        <path
          d="M 37 50 L 46 59 L 64 40"
          fill="none"
          stroke="#f87171"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}

export default function AboutCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
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
          bg-[radial-gradient(ellipse_at_50%_50%,rgba(220,38,38,0.065),transparent_60%)]
        "
      />

      <Container className="relative z-10">
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="
            group relative
            overflow-hidden
            rounded-[24px]
            border border-white/[0.09]
            bg-gradient-to-br
            from-[#151515]
            via-[#0b0b0b]
            to-[#070707]
            px-5 py-8
            sm:rounded-[28px]
            sm:px-8 sm:py-10
            lg:px-12 lg:py-12
          "
        >
          {/* TOP ACCENT */}
          <div
            aria-hidden="true"
            className="
              absolute inset-x-0 top-0
              h-[2px]
              bg-gradient-to-r
              from-transparent via-red-500 to-transparent
            "
          />

          {/* CORNER ENGINEERING DETAILS */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute left-4 top-4
              h-5 w-5
              border-l border-t border-red-500/25
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute bottom-4 right-4
              h-5 w-5
              border-b border-r border-red-500/25
            "
          />

          {/* CONTENT */}
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className="
              relative z-10 mx-auto
              flex max-w-3xl
              flex-col items-center
              text-center
            "
          >
            {/* FINAL PUZZLE */}
            <FinalPuzzlePiece reduceMotion={reduceMotion} />

            {/* BADGE */}
            <motion.div
              variants={reveal}
              transition={{ duration: 0.4, ease: EASE }}
              className="
                mt-5 inline-flex
                items-center gap-2
                rounded-full
                border border-red-500/20
                bg-red-500/[0.08]
                px-3 py-1.5
                text-[9px] font-semibold
                uppercase tracking-[0.25em]
                text-red-400
              "
            >
              <Sparkles size={11} />
              The Final Piece
            </motion.div>

            {/* TITLE */}
            <motion.h2
              variants={reveal}
              transition={{ duration: 0.5, ease: EASE }}
              className="
                mt-4 font-bebas
                text-[34px] uppercase
                leading-[0.9]
                tracking-[0.035em]
                text-white
                sm:text-[44px]
                lg:text-[54px]
              "
            >
              Ready To Start{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-red-400 via-red-500 to-orange-400
                  bg-clip-text text-transparent
                "
              >
                Your Dream Project?
              </span>
            </motion.h2>

            {/* ACCENT */}
            <motion.div
              variants={reveal}
              className="
                mt-4 h-[2px] w-[100px]
                bg-gradient-to-r
                from-transparent via-red-500 to-transparent
              "
            />

            {/* DESCRIPTION */}
            <motion.p
              variants={reveal}
              transition={{ duration: 0.45, ease: EASE }}
              className="
                mt-4 max-w-xl
                text-[11px] leading-6
                text-zinc-400
                sm:text-[12px] sm:leading-6
              "
            >
              From pergolas and staircases to custom metal
              creations, we bring your vision to life
              with precision and craftsmanship.
            </motion.p>

            {/* STATUS */}
            <motion.div
              variants={reveal}
              className="
                mt-4 inline-flex
                items-center gap-2
                text-[9px] uppercase
                tracking-[0.18em]
                text-zinc-500
              "
            >
              <Check size={12} className="text-red-400" />
              Every great project starts with a conversation.
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              variants={reveal}
              transition={{ duration: 0.5, ease: EASE }}
              className="
                mt-6 flex w-full
                flex-col items-center
                justify-center gap-3
                sm:w-auto sm:flex-row
              "
            >
              <Link
                to="/contact"
                className="
                  group/button inline-flex
                  h-11 w-full
                  items-center justify-center
                  gap-2.5 rounded-xl
                  bg-red-600 px-6
                  text-[10px] font-bold
                  uppercase tracking-[0.15em]
                  text-white
                  shadow-[0_10px_30px_rgba(239,68,68,0.12)]
                  transition-[transform,background-color]
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-red-500
                  sm:w-auto
                "
              >
                Request Quote
                <ArrowRight
                  size={14}
                  className="
                    transition-transform duration-200
                    group-hover/button:translate-x-1
                  "
                />
              </Link>

              <a
                href="tel:+212658551365"
                className="
                  group/call inline-flex
                  h-11 w-full
                  items-center justify-center
                  gap-2.5 rounded-xl
                  border border-white/10
                  bg-white/[0.03] px-6
                  text-[10px] font-bold
                  uppercase tracking-[0.15em]
                  text-white
                  transition-[border-color,background-color,transform]
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-red-500/30
                  hover:bg-red-500/[0.07]
                  sm:w-auto
                "
              >
                <Phone
                  size={14}
                  className="
                    text-red-400
                    transition-transform duration-200
                    group-hover/call:-rotate-12
                  "
                />
                Call Us
              </a>
            </motion.div>
          </motion.div>

          {/* BOTTOM ACCENT */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-x-0 bottom-0
              mx-auto h-px w-1/2
              bg-gradient-to-r
              from-transparent via-red-500/35 to-transparent
            "
          />
        </motion.div>
      </Container>
    </section>
  );
}
