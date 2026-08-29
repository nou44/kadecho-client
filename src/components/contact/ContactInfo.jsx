import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "Phone",
    value: "+212 6 XX XX XX XX",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@kadecho.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Tangier, Morocco",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon - Sat | 08:30 - 18:30",
  },
];

export default function ContactInfo() {
  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: 35,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="space-y-4 lg:space-y-5"
    >
      {/* ===================================================== */}
      {/* CONTACT INFO CARD */}
      {/* ===================================================== */}

      <div
        className="
          group
          relative
          overflow-hidden

          rounded-[26px]
          border
          border-white/[0.08]

          bg-[#090909]

          shadow-[0_25px_70px_rgba(0,0,0,.28)]

          p-5
          sm:p-6
        "
      >
        {/* Top animated red line */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-0
            h-px
            overflow-hidden
          "
        >
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              h-full
              w-1/3

              bg-gradient-to-r
              from-transparent
              via-red-500
              to-transparent
            "
          />
        </div>

        {/* Red ambient glow */}

        <div
          className="
            pointer-events-none
            absolute

            -right-28
            -top-28

            h-64
            w-64

            rounded-full

            bg-red-600/[0.08]

            blur-[100px]

            transition-all
            duration-700

            group-hover:bg-red-600/[0.13]
          "
        />

        {/* Bottom glow */}

        <div
          className="
            pointer-events-none
            absolute

            -bottom-32
            -left-24

            h-52
            w-52

            rounded-full

            bg-red-600/[0.035]

            blur-[90px]
          "
        />

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="relative z-10">
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
              duration: 0.4,
            }}
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-red-500/20

              bg-red-500/[0.07]

              px-3
              py-1.5
            "
          >
            <span
              className="
                h-1.5
                w-1.5

                rounded-full

                bg-red-500

                shadow-[0_0_12px_rgba(239,68,68,.9)]

                animate-pulse
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-red-400
              "
            >
              Contact
            </span>
          </motion.div>

          <motion.h2
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
              delay: 0.08,
              duration: 0.45,
            }}
            className="
              mt-4

              font-black
              uppercase

              tracking-[-0.02em]

              text-2xl
              leading-none

              text-white

              sm:text-[28px]
            "
          >
            Let's Talk
          </motion.h2>

          <motion.p
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
              delay: 0.14,
              duration: 0.45,
            }}
            className="
              mt-3

              max-w-sm

              text-[11px]
              leading-5

              text-zinc-500

              sm:text-xs
              sm:leading-6
            "
          >
            We'd love to hear about your project.
            Choose the easiest way to reach us.
          </motion.p>
        </div>

        {/* ================================================= */}
        {/* CONTACT ITEMS */}
        {/* ================================================= */}

        <div className="relative z-10 mt-6 space-y-2.5">
          {contactItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                  delay: 0.18 + index * 0.07,
                  duration: 0.4,
                }}
                whileHover={{
                  x: 4,
                }}
                className="
                  group/item

                  relative
                  flex
                  items-center
                  justify-between

                  overflow-hidden

                  rounded-2xl

                  border
                  border-white/[0.06]

                  bg-white/[0.02]

                  px-3.5
                  py-3

                  transition-all
                  duration-300

                  hover:border-red-500/20
                  hover:bg-white/[0.035]
                "
              >
                {/* Hover glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-0
                    w-20

                    bg-red-500/[0.035]

                    opacity-0

                    blur-xl

                    transition-opacity
                    duration-300

                    group-hover/item:opacity-100
                  "
                />

                <div className="relative z-10 flex min-w-0 items-center gap-3">
                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center

                      rounded-xl

                      border
                      border-red-500/10

                      bg-red-500/[0.07]

                      text-red-400

                      transition-all
                      duration-300

                      group-hover/item:border-red-500/30
                      group-hover/item:bg-red-500
                      group-hover/item:text-white

                      group-hover/item:shadow-[0_0_20px_rgba(239,68,68,.18)]
                    "
                  >
                    <Icon size={16} />
                  </div>

                  {/* Text */}

                  <div className="min-w-0">
                    <p
                      className="
                        text-[8px]

                        font-bold
                        uppercase
                        tracking-[0.18em]

                        text-zinc-600
                      "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                        mt-1

                        truncate

                        text-[11px]

                        font-medium

                        text-zinc-200

                        transition-colors
                        duration-300

                        group-hover/item:text-white

                        sm:text-xs
                      "
                    >
                      {item.value}
                    </p>
                  </div>
                </div>

                {/* Arrow */}

                <ArrowUpRight
                  size={15}
                  className="
                    relative
                    z-10
                    shrink-0

                    text-zinc-700

                    transition-all
                    duration-300

                    group-hover/item:text-red-400
                    group-hover/item:translate-x-0.5
                    group-hover/item:-translate-y-0.5
                  "
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom status */}

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
            delay: 0.55,
            duration: 0.5,
          }}
          className="
            relative
            z-10

            mt-5

            flex
            items-center
            gap-2

            border-t
            border-white/[0.06]

            pt-4
          "
        >
          <span
            className="
              relative
              flex
              h-2
              w-2
            "
          >
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full

                animate-ping

                rounded-full

                bg-red-500/60
              "
            />

            <span
              className="
                relative
                inline-flex
                h-2
                w-2

                rounded-full

                bg-red-500
              "
            />
          </span>

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.14em]

              text-zinc-600
            "
          >
            Usually responds within a few hours
          </span>
        </motion.div>
      </div>

      {/* ===================================================== */}
      {/* WHATSAPP CARD */}
      {/* ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
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
          duration: 0.65,
          ease: "easeOut",
        }}
        className="
          group

          relative
          overflow-hidden

          rounded-[26px]

          border
          border-green-500/15

          bg-gradient-to-br
          from-green-500/[0.09]
          via-green-500/[0.035]
          to-transparent

          p-5
          sm:p-6

          shadow-[0_20px_60px_rgba(0,0,0,.2)]
        "
      >
        {/* Green glow */}

        <div
          className="
            pointer-events-none
            absolute

            -right-20
            -top-20

            h-48
            w-48

            rounded-full

            bg-green-500/[0.10]

            blur-[80px]

            transition-all
            duration-700

            group-hover:bg-green-500/[0.16]
          "
        />

        {/* Shine */}

        <motion.div
          animate={{
            x: ["-150%", "250%"],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            pointer-events-none

            absolute
            inset-y-0
            left-0

            w-16

            -skew-x-12

            bg-gradient-to-r
            from-transparent
            via-white/[0.08]
            to-transparent
          "
        />

        <div className="relative z-10">
          {/* Header */}

          <div className="flex items-center gap-3.5">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center

                rounded-2xl

                border
                border-green-400/20

                bg-green-500/10

                text-green-400

                shadow-[0_0_25px_rgba(34,197,94,.08)]
              "
            >
              <MessageCircle size={22} />
            </motion.div>

            <div>
              <div className="flex items-center gap-2">
                <h3
                  className="
                    text-sm
                    font-bold
                    text-white

                    sm:text-[15px]
                  "
                >
                  WhatsApp Support
                </h3>

                <span
                  className="
                    rounded-full

                    border
                    border-green-400/15

                    bg-green-400/10

                    px-1.5
                    py-0.5

                    text-[7px]

                    font-bold
                    uppercase
                    tracking-wider

                    text-green-400
                  "
                >
                  Online
                </span>
              </div>

              <p
                className="
                  mt-1

                  text-[10px]

                  text-zinc-500

                  sm:text-[11px]
                "
              >
                Fast answers for your projects.
              </p>
            </div>
          </div>

          {/* CTA */}

          <motion.a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.015,
              y: -1,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group/whatsapp

              relative

              mt-5

              flex
              h-11
              w-full

              items-center
              justify-center

              gap-2.5

              overflow-hidden

              rounded-xl

              bg-green-500

              text-[10px]

              font-bold
              uppercase
              tracking-[0.12em]

              text-white

              shadow-[0_8px_25px_rgba(34,197,94,.18)]

              transition-all
              duration-300

              hover:bg-green-400
              hover:shadow-[0_12px_35px_rgba(34,197,94,.28)]
            "
          >
            <MessageCircle
              size={16}
              className="
                transition-transform
                duration-300

                group-hover/whatsapp:scale-110
              "
            />

            Chat on WhatsApp

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300

                group-hover/whatsapp:translate-x-0.5
                group-hover/whatsapp:-translate-y-0.5
              "
            />

            {/* Button shine */}

            <motion.span
              animate={{
                x: ["-150%", "250%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                pointer-events-none

                absolute
                inset-y-0
                left-0

                w-10

                -skew-x-12

                bg-white/15
              "
            />
          </motion.a>
        </div>
      </motion.div>
    </motion.aside>
  );
}