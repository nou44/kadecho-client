import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  MessageCircle,
} from "lucide-react";

const faqs = [
  {
    question: "How do I request a quote?",
    answer:
      "Send us your project details and we'll prepare a custom quotation.",
  },
  {
    question: "Do you build custom projects?",
    answer:
      "Yes, every project is fully customized to your needs.",
  },
  {
    question: "Do you work outside Tangier?",
    answer:
      "Yes, depending on the project and installation requirements.",
  },
  {
    question: "How long does production take?",
    answer:
      "Delivery time depends on the project size and complexity.",
  },
];

export default function ContactFAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#050505] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* ================================================= */}
        {/* HEADER */}
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="text-center"
        >
          {/* Badge */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              inline-flex
              items-center
              gap-1.5

              rounded-full
              border
              border-red-500/20

              bg-red-500/[0.06]

              px-2.5
              py-1

              text-[8px]
              font-bold
              uppercase
              tracking-[0.22em]

              text-red-400
            "
          >
            <span
              className="
                flex
                h-4
                w-4
                items-center
                justify-center

                rounded-full

                bg-red-500/10
              "
            >
              <MessageCircle size={9} />
            </span>

            FAQ
          </motion.div>

          {/* Title */}

          <h2
            className="
              mt-4

              text-[28px]
              font-black
              uppercase
              leading-none
              tracking-[-0.02em]

              text-white

              sm:text-[34px]
              lg:text-[38px]
            "
          >
            Questions{" "}
            <span
              className="
                bg-gradient-to-r
                from-red-400
                via-red-500
                to-red-700

                bg-clip-text
                text-transparent
              "
            >
              & Answers
            </span>
          </h2>

          {/* Accent */}

          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 55,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="
              mx-auto
              mt-3

              h-[2px]

              rounded-full

              bg-gradient-to-r
              from-red-600
              to-transparent
            "
          />

          {/* Description */}

          <p
            className="
              mx-auto
              mt-3

              max-w-md

              text-[10px]
              leading-5

              text-zinc-600

              sm:text-[11px]
            "
          >
            Everything you need to know before starting
            your project.
          </p>
        </motion.div>

        {/* ================================================= */}
        {/* FAQ LIST */}
        {/* ================================================= */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.07,
              },
            },
          }}
          className="
            mt-8
            space-y-2.5

            sm:mt-9
          "
        >
          {faqs.map((faq, index) => {
            const open = active === index;

            return (
              <motion.div
                key={faq.question}
                layout
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 12,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  },
                }}
                className={`
                  group
                  relative
                  overflow-hidden

                  rounded-xl

                  border

                  transition-all
                  duration-300

                  ${
                    open
                      ? "border-red-500/20 bg-white/[0.035]"
                      : "border-white/[0.06] bg-white/[0.018]"
                  }

                  hover:border-white/[0.12]
                `}
              >

                {/* Active glow */}

                <motion.div
                  initial={false}
                  animate={{
                    opacity: open ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[2px]

                    bg-gradient-to-b
                    from-red-400
                    via-red-600
                    to-transparent
                  "
                />

                {/* ================================================= */}
                {/* QUESTION */}
                {/* ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    setActive(open ? -1 : index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4

                    px-4
                    py-3.5

                    text-left

                    sm:px-5
                    sm:py-4
                  "
                >
                  <div className="flex min-w-0 items-center gap-3">

                    {/* Number */}

                    <span
                      className={`
                        hidden
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center

                        rounded-md

                        text-[8px]
                        font-bold

                        sm:flex

                        ${
                          open
                            ? "bg-red-500/10 text-red-400"
                            : "bg-white/[0.03] text-zinc-700"
                        }
                      `}
                    >
                      0{index + 1}
                    </span>

                    {/* Question */}

                    <span
                      className={`
                        text-[11px]
                        font-semibold
                        leading-5

                        transition-colors
                        duration-300

                        sm:text-[12px]

                        ${
                          open
                            ? "text-white"
                            : "text-zinc-300"
                        }
                      `}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle */}

                  <motion.span
                    animate={{
                      rotate: open ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className={`
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center

                      rounded-lg

                      border

                      transition-colors
                      duration-300

                      ${
                        open
                          ? "border-red-500/20 bg-red-500/10 text-red-400"
                          : "border-white/[0.06] bg-white/[0.025] text-zinc-600"
                      }
                    `}
                  >
                    {open ? (
                      <Minus size={12} />
                    ) : (
                      <Plus size={12} />
                    )}
                  </motion.span>
                </button>

                {/* ================================================= */}
                {/* ANSWER */}
                {/* ================================================= */}

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.3,
                          ease: "easeOut",
                        },
                        opacity: {
                          duration: 0.2,
                        },
                      }}
                    >
                      <div
                        className="
                          border-t
                          border-white/[0.05]

                          px-4
                          pb-4
                          pt-3.5

                          sm:px-5
                          sm:pb-5
                        "
                      >
                        <p
                          className="
                            max-w-2xl

                            pl-0

                            text-[10px]
                            leading-5

                            text-zinc-500

                            sm:text-[11px]
                            sm:leading-6
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </motion.div>

        {/* ================================================= */}
        {/* BOTTOM NOTE */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2

            text-center
            text-[8px]
            uppercase
            tracking-[0.16em]
            text-zinc-700
          "
        >
          <span
            className="
              h-1
              w-1
              rounded-full
              bg-red-500/60
            "
          />

          Still have questions? Contact us

          <span
            className="
              h-1
              w-1
              rounded-full
              bg-red-500/60
            "
          />
        </motion.div>

      </div>
    </section>
  );
}