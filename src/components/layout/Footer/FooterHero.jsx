
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const socials = [
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/2126XXXXXXXX",
    label: "WhatsApp",
  },
];

export default function FooterHero() {
  return (
    <section
      className="
        relative
        overflow-hidden

        flex
        flex-col
        gap-12

        border-b
        border-white/[0.08]

        py-16
        sm:py-20
        lg:py-24

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >

      {/* =====================================================
          BACKGROUND BRAND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        {/* Soft center glow */}

        <div
          className="
            absolute
            left-[15%]
            top-1/2

            h-[320px]
            w-[320px]

            -translate-y-1/2

            rounded-full

            bg-red-600/[0.055]

            blur-[130px]
          "
        />

        {/* Large Brand */}

        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            overflow-hidden
          "
        >
          <span
            className="
              select-none
              whitespace-nowrap

              font-bebas

              uppercase

              tracking-[0.16em]

              text-white/[0.025]

              text-[100px]
              sm:text-[150px]
              md:text-[210px]
              lg:text-[270px]
              xl:text-[340px]

              translate-y-2
            "
          >
            KADECHO
          </span>
        </motion.div>

        {/* Subtle horizontal light */}

        <motion.div
          animate={{
            x: ["-20%", "120%"],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-0
            top-1/2

            h-px
            w-[35%]

            bg-gradient-to-r
            from-transparent
            via-red-500/30
            to-transparent

            blur-[1px]
          "
        />

      </div>


      {/* =====================================================
          LEFT / BRAND
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: -35,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: false,
          amount: 0.25,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10

          flex-1
        "
      >

        <Link
          to="/"
          className="
            group

            inline-flex

            w-full

            flex-col
            gap-7

            sm:flex-row
            sm:items-center
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <motion.div
            whileHover={{
              scale: 1.06,
              rotate: 3,
            }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 18,
            }}
            className="
              relative

              flex
              h-24
              w-24

              shrink-0

              items-center
              justify-center
            "
          >

            {/* Outer ring */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                -inset-2

                rounded-full

                border
                border-dashed
                border-red-500/20
              "
            />

            {/* Inner ring */}

            <div
              className="
                absolute
                inset-1

                rounded-full

                border
                border-white/[0.06]
              "
            />

            {/* Glow */}

            <div
              className="
                absolute
                inset-0

                rounded-full

                bg-red-600/10

                blur-2xl

                transition-all
                duration-500

                group-hover:bg-red-600/20
              "
            />

            <img
              src="/logo1.png"
              alt="KADECHO"
              className="
                relative
                z-10

                h-20
                w-20

                object-contain

                drop-shadow-[0_0_30px_rgba(220,38,38,.22)]
              "
            />

          </motion.div>


          {/* =================================================
              BRAND TEXT
          ================================================= */}

          <div className="min-w-0">

            <motion.h2
              whileHover={{
                x: 4,
              }}
              className="
                font-bebas

                text-5xl
                sm:text-6xl
                lg:text-[68px]

                leading-[0.85]

                tracking-[0.11em]

                bg-gradient-to-r
                from-white
                via-zinc-100
                to-red-500

                bg-[length:200%_100%]

                bg-clip-text

                text-transparent
              "
            >
              KADECHO
            </motion.h2>

            {/* Accent */}

            <div
              className="
                mt-4

                flex
                items-center
                gap-3
              "
            >

              <motion.span
                animate={{
                  width: [28, 55, 28],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  block
                  h-px

                  bg-red-500
                "
              />

              <span
                className="
                  font-bebas

                  text-[9px]

                  uppercase

                  tracking-[0.38em]

                  text-zinc-500
                "
              >
                Crafted With Precision
              </span>

            </div>

            {/* Description */}

            <p
              className="
                mt-5

                max-w-[510px]

                text-[14px]
                sm:text-[15px]

                leading-7
                sm:leading-8

                text-zinc-400
              "
            >
              Premium handcrafted{" "}
              <span className="text-zinc-200">
                metal
              </span>
              ,{" "}
              <span className="text-red-400">
                glass
              </span>{" "}
              and{" "}
              <span className="text-zinc-200">
                wood
              </span>{" "}
              creations crafted with precision,
              innovation and timeless luxury.
            </p>

          </div>

        </Link>


        {/* =================================================
            SOCIALS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            delay: 0.25,
            duration: 0.6,
          }}
          className="
            mt-8

            flex
            items-center
            gap-3
          "
        >

          {socials.map(
            ({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: false,
                }}
                transition={{
                  delay: 0.3 + index * 0.07,
                }}
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                className="
                  group/social

                  relative

                  flex
                  h-11
                  w-11

                  items-center
                  justify-center

                  overflow-hidden

                  rounded-xl

                  border
                  border-white/[0.08]

                  bg-white/[0.025]

                  text-zinc-400

                  transition-all
                  duration-300

                  hover:border-red-500/40
                  hover:text-white

                  hover:shadow-[0_10px_30px_rgba(239,68,68,.12)]
                "
              >

                {/* Hover glow */}

                <span
                  className="
                    absolute
                    inset-0

                    bg-red-500/0

                    transition-all
                    duration-300

                    group-hover/social:bg-red-500/10
                  "
                />

                <Icon
                  size={17}
                  className="
                    relative
                    z-10
                  "
                />

              </motion.a>
            )
          )}

        </motion.div>

      </motion.div>


      {/* =====================================================
          RIGHT CTA
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 45,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.25,
        }}
        transition={{
          duration: 0.9,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -6,
        }}
        className="
          relative
          z-10

          w-full
          max-w-[330px]

          lg:max-w-[350px]

          lg:mr-2
        "
      >

        <div
          className="
            relative

            overflow-hidden

            rounded-[28px]

            border
            border-white/[0.09]

            bg-[#090909]

            p-6
            sm:p-7

            shadow-[0_25px_80px_rgba(0,0,0,.45)]
          "
        >

          {/* Card glow */}

          <div
            className="
              pointer-events-none

              absolute
              -right-20
              -top-20

              h-48
              w-48

              rounded-full

              bg-red-600/15

              blur-[90px]
            "
          />

          {/* Moving border light */}

          <motion.div
            animate={{
              x: ["-120%", "420%"],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              left-0
              top-0

              h-px
              w-28

              bg-gradient-to-r
              from-transparent
              via-red-500
              to-transparent
            "
          />

          {/* Badge */}

          <div
            className="
              relative

              inline-flex

              items-center
              gap-2

              rounded-full

              border
              border-red-500/20

              bg-red-500/[0.07]

              px-3.5
              py-1.5
            "
          >

            <Sparkles
              size={12}
              className="text-red-400"
            />

            <span
              className="
                font-bebas

                text-[10px]

                uppercase

                tracking-[0.3em]

                text-red-300
              "
            >
              Let's Build
            </span>

          </div>


          {/* Title */}

          <h3
            className="
              relative

              mt-5

              font-bebas

              text-[44px]
              sm:text-[48px]

              leading-[0.86]

              uppercase

              tracking-[0.04em]

              text-white
            "
          >
            Ready
            <br />
            <span className="text-red-500">
              To Start?
            </span>
          </h3>


          {/* Description */}

          <p
            className="
              relative

              mt-4

              max-w-[280px]

              text-[13px]

              leading-6

              text-zinc-500
            "
          >
            Tell us about your dream project
            and let's create something
            exceptional together.
          </p>


          {/* CTA */}

          <Link
            to="/contact"
            className="
              group/cta

              relative

              mt-6

              inline-flex

              items-center
              gap-3

              rounded-full

              border
              border-red-500/25

              bg-red-500/[0.07]

              px-5
              py-2.5

              font-bebas

              text-[12px]

              uppercase

              tracking-[0.28em]

              text-red-400

              transition-all
              duration-300

              hover:border-red-500
              hover:bg-red-500
              hover:text-white
            "
          >

            Contact Us

            <ArrowUpRight
              size={16}
              className="
                transition-all
                duration-300

                group-hover/cta:translate-x-1
                group-hover/cta:-translate-y-1
                group-hover/cta:rotate-12
              "
            />

          </Link>


          {/* Bottom accent */}

          <div
            className="
              absolute
              bottom-0
              left-6
              right-6

              h-px

              bg-gradient-to-r
              from-transparent
              via-red-500/40
              to-transparent
            "
          />

        </div>

      </motion.div>

    </section>
  );
}

