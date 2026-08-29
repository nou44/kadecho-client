import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Navigation,
} from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    title: "Location",
    value: "Meknes, Morocco",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+212 6 58 55 13 65",
  },
  {
    icon: Mail,
    title: "Email",
    value: "kadecho@gnail.com",
  },
];

export default function ContactMap() {
  return (
    <section className="bg-[#050505] pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================================================= */}
        {/* MAP WRAPPER */}
        {/* ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-white/[0.08]
            bg-[#080808]

            sm:rounded-[28px]

            lg:min-h-[560px]
            lg:rounded-[32px]
          "
        >

          {/* ================================================= */}
          {/* MAP */}
          {/* ================================================= */}

          <div
            className="
              relative
              h-[220px]
              w-full

              sm:h-[260px]

              lg:absolute
              lg:inset-0
              lg:h-full
            "
          >
            <iframe
              title="KadeCho Location"
              src="https://www.google.com/maps?q=agourai,Morocco&output=embed"
              loading="lazy"
              className="
                h-full
                w-full
                border-0
                grayscale-[0.35]
                contrast-[1.05]
              "
            />

            {/* Map Dark Overlay */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0

                bg-gradient-to-b
                from-black/20
                via-transparent
                to-black/50

                lg:bg-gradient-to-r
                lg:from-black/80
                lg:via-black/20
                lg:to-transparent
              "
            />
          </div>

          {/* ================================================= */}
          {/* MOBILE SEPARATOR */}
          {/* ================================================= */}

          <div
            className="
              relative
              z-10
              h-px
              w-full
              bg-gradient-to-r
              from-transparent
              via-red-500/30
              to-transparent

              lg:hidden
            "
          />

          {/* ================================================= */}
          {/* FLOATING INFO CARD */}
          {/* ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="
              relative
              z-20

              w-full

              border-t
              border-white/[0.06]

              bg-[#0a0a0a]

              p-5

              sm:p-6

              lg:absolute
              lg:left-6
              lg:top-6
              lg:bottom-6

              lg:flex
              lg:w-[350px]
              lg:flex-col
              lg:justify-between

              lg:rounded-[26px]
              lg:border
              lg:border-white/10

              lg:bg-[#0c0c0c]/95

              lg:p-7

              lg:backdrop-blur-2xl
            "
          >

            {/* ================================================= */}
            {/* TOP */}
            {/* ================================================= */}

            <div>

              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-1.5

                  rounded-full
                  border
                  border-red-500/20

                  bg-red-500/[0.07]

                  px-2.5
                  py-1

                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.2em]

                  text-red-400

                  sm:px-3
                  sm:py-1.5
                  sm:text-[9px]
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-red-500
                    shadow-[0_0_10px_rgba(239,68,68,.8)]
                  "
                />

                Visit Us
              </div>

              {/* Title */}

              <h2
                className="
                  mt-4

                  text-[25px]
                  font-black
                  uppercase
                  leading-none
                  tracking-[-0.02em]

                  text-white

                  sm:text-[30px]

                  lg:mt-5
                  lg:text-4xl
                "
              >
                Our Workshop
              </h2>

              {/* Red Line */}

              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 58,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: 0.25,
                  duration: 0.6,
                }}
                className="
                  mt-3
                  h-[2px]
                  rounded-full
                  bg-gradient-to-r
                  from-red-500
                  to-transparent

                  sm:mt-4
                "
              />

              {/* Description */}

              <p
                className="
                  mt-3

                  max-w-md

                  text-[10px]
                  leading-5

                  text-zinc-500

                  sm:mt-4
                  sm:text-[11px]
                  sm:leading-5

                  lg:text-sm
                  lg:leading-6
                "
              >
                Visit our workshop to discuss your custom
                project and discover premium craftsmanship.
              </p>

            </div>

            {/* ================================================= */}
            {/* CONTACT ITEMS */}
            {/* ================================================= */}

            <div
              className="
                mt-5
                space-y-2.5

                sm:mt-6
                sm:space-y-3

                lg:mt-6
                lg:space-y-3
              "
            >

              {contactItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
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
                      delay: 0.15 + index * 0.08,
                      duration: 0.4,
                    }}
                    whileHover={{
                      x: 4,
                    }}
                    className="
                      group/item

                      flex
                      min-h-[58px]

                      items-center
                      justify-between

                      rounded-xl

                      border
                      border-white/[0.06]

                      bg-white/[0.025]

                      px-3
                      py-2.5

                      transition-all
                      duration-300

                      hover:border-red-500/20
                      hover:bg-red-500/[0.025]

                      sm:min-h-[62px]
                      sm:rounded-2xl
                      sm:px-3.5
                    "
                  >

                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                      "
                    >

                      {/* Icon */}

                      <div
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center

                          rounded-lg

                          border
                          border-red-500/15

                          bg-red-500/[0.07]

                          text-red-400

                          transition-all
                          duration-300

                          group-hover/item:border-red-500/30
                          group-hover/item:bg-red-500/10

                          sm:h-9
                          sm:w-9
                        "
                      >
                        <Icon
                          size={14}
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* Text */}

                      <div className="min-w-0">

                        <p
                          className="
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-zinc-600

                            sm:text-[8px]
                          "
                        >
                          {item.title}
                        </p>

                        <p
                          className="
                            mt-0.5

                            truncate

                            text-[10px]
                            font-medium

                            text-zinc-200

                            sm:text-[11px]
                          "
                        >
                          {item.value}
                        </p>

                      </div>

                    </div>

                    {/* Arrow */}

                    <Navigation
                      size={12}
                      className="
                        shrink-0
                        text-zinc-700

                        transition-all
                        duration-300

                        group-hover/item:text-red-400
                        group-hover/item:rotate-12
                      "
                    />

                  </motion.div>
                );
              })}

            </div>

          </motion.div>

          {/* ================================================= */}
          {/* DESKTOP RED GLOW */}
          {/* ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              -left-24
              top-1/2
              z-[5]

              hidden

              h-72
              w-72

              -translate-y-1/2

              rounded-full

              bg-red-600/[0.08]

              blur-[100px]

              lg:block
            "
          />

          {/* ================================================= */}
          {/* BOTTOM ACCENT */}
          {/* ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              z-30

              h-px
              w-full

              bg-gradient-to-r
              from-transparent
              via-red-500/50
              to-transparent
            "
          />

        </motion.div>

      </div>
    </section>
  );
}