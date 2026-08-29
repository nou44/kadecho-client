import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CollectionCard({ item }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.45,
      }}
      viewport={{
        once: false,
        amount: 0.25,
      }}
      className="
        group
        relative

        h-[390px]
        w-[260px]

        flex-shrink-0

        sm:h-[410px]
        sm:w-[275px]
      "
    >
      <Link
        to={`/shop?category=${item.category}`}
        className="
          relative
          block
          h-full
          overflow-hidden

          rounded-[22px]

          border
          border-white/10

          bg-[#090909]

          transition-all
          duration-500

          hover:border-red-500/40

          hover:shadow-[0_20px_50px_rgba(239,68,68,.15)]
        "
      >

        {/* ================================================= */}
        {/* IMAGE */}
        {/* ================================================= */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0

            h-[245px]

            overflow-hidden

            bg-[#111]
          "
        >
          <motion.img
            variants={{
              hover: {
                scale: 1.06,
                rotate: -0.5,
              },
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            src={item.product.image}
            alt={item.product.name}
            className="
              h-full
              w-full

              object-cover
              object-center
            "
          />

          {/* IMAGE OVERLAY */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-t
              from-[#090909]
              via-black/10
              to-transparent
            "
          />

          {/* HOVER OVERLAY */}

          <motion.div
            variants={{
              hover: {
                opacity: 1,
              },
            }}
            initial={{
              opacity: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              pointer-events-none

              absolute
              inset-0

              bg-gradient-to-br
              from-red-600/10
              via-transparent
              to-red-500/5
            "
          />

          {/* LIGHT SWEEP */}

          <motion.div
            variants={{
              hover: {
                x: "220%",
              },
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              pointer-events-none

              absolute

              -left-24
              -top-10

              h-[160%]
              w-14

              rotate-[25deg]

              bg-white/10

              blur-md
            "
          />

          {/* PREMIUM BADGE */}

          <motion.div
            variants={{
              hover: {
                y: -3,
                scale: 1.02,
              },
            }}
            className="
              absolute

              left-4
              top-4

              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-red-500/25

              bg-black/45

              px-3
              py-1.5

              backdrop-blur-2xl
            "
          >
            <div className="relative">
              <span
                className="
                  block
                  h-1.5
                  w-1.5

                  rounded-full

                  bg-red-500

                  shadow-[0_0_10px_red]
                "
              />

              <span
                className="
                  absolute
                  inset-0

                  animate-ping

                  rounded-full

                  bg-red-500/40
                "
              />
            </div>

            <span
              className="
                font-bebas

                text-[9px]

                uppercase
                tracking-[.25em]

                text-red-300
              "
            >
              Premium
            </span>
          </motion.div>

          {/* CATEGORY */}

          <div
            className="
              absolute
              bottom-3
              left-4
            "
          >
            <span
              className="
                font-satoshi

                text-[8px]

                uppercase
                tracking-[.20em]

                text-white/45
              "
            >
              {item.category}
            </span>
          </div>
        </div>

        {/* ================================================= */}
        {/* CONTENT — SAME LOGIC AS YOUR ORIGINAL */}
        {/* ================================================= */}

        <motion.div
          variants={{
            hover: {
              y: -5,
            },
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            absolute

            bottom-0
            left-0
            right-0

            p-5

            sm:p-6
          "
        >
          <h3
            className="
              font-bebas

              text-[28px]

              leading-[.9]

              tracking-[.04em]

              text-white

              sm:text-[31px]
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-3

              font-satoshi

              text-[11px]

              leading-5

              text-zinc-300

              sm:text-xs
            "
          >
            {item.subtitle}
          </p>

          {/* EXPLORE */}

          <motion.div
            variants={{
              hover: {
                x: 5,
              },
            }}
            className="
              mt-5

              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-red-500/25

              bg-white/[.03]

              px-3
              py-2

              backdrop-blur-xl

              font-bebas

              text-[9px]

              uppercase
              tracking-[.22em]

              text-red-300
            "
          >
            Explore

            <ArrowUpRight size={13} />
          </motion.div>
        </motion.div>

        {/* ================================================= */}
        {/* BOTTOM GLOW */}
        {/* ================================================= */}

        <motion.div
          variants={{
            hover: {
              opacity: 1,
              scale: 1.15,
            },
          }}
          initial={{
            opacity: 0,
          }}
          className="
            absolute

            bottom-[-20px]
            left-1/2

            h-20
            w-52

            -translate-x-1/2

            rounded-full

            bg-red-600/20

            blur-[50px]
          "
        />
      </Link>
    </motion.div>
  );
}