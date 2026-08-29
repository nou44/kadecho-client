
import { motion } from "framer-motion";
import ServiceSlider from "./ServiceSlider";

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-14 sm:py-16 lg:py-20">

      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.14, 0.24, 0.14],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-0
            h-[420px]
            w-[420px]
            -translate-x-1/2
            rounded-full
            bg-red-600/10
            blur-[150px]
          "
        />

        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-0
            right-0
            h-[220px]
            w-[220px]
            rounded-full
            bg-red-600/10
            blur-[100px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-6">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="
            mx-auto
            mb-9
            max-w-2xl
            text-center
            sm:mb-11
          "
        >

          {/* Badge */}

          <motion.span
            initial={{ opacity: 0, y: -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-red-500/20
              bg-red-500/[0.07]
              px-4
              py-1.5
              font-bebas
              text-[9px]
              uppercase
              tracking-[0.32em]
              text-red-400
            "
          >
            OUR SERVICES

            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          </motion.span>

          {/* Line */}

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 55 }}
            viewport={{ once: false }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="
              mx-auto
              mt-4
              h-px
              bg-gradient-to-r
              from-transparent
              via-red-500
              to-transparent
            "
          />

          {/* TITLE */}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="
              mt-4
              font-bebas
              text-[34px]
              uppercase
              leading-none
              tracking-[0.07em]
              text-white
              sm:text-[44px]
              lg:text-[54px]
            "
          >
            <span className="text-white">
              PREMIUM
            </span>{" "}
            <span className="text-red-500">
              SERVICES
            </span>
          </motion.h2>

          {/* Bottom Line */}

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 85 }}
            viewport={{ once: false }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="
              mx-auto
              mt-4
              h-px
              bg-gradient-to-r
              from-transparent
              via-red-500/70
              to-transparent
            "
          />

          {/* DESCRIPTION */}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="
              mx-auto
              mt-5
              max-w-xl
              font-satoshi
              text-[12px]
              leading-6
              text-zinc-500
              sm:text-[13px]
              sm:leading-6
            "
          >
            Discover our premium metal craftsmanship, from bespoke
            staircases and luxury doors to pergolas, decorative
            structures and custom furniture designed for timeless
            residential and commercial spaces.
          </motion.p>

        </motion.div>

        {/* SLIDER */}

        <ServiceSlider />

      </div>
    </section>
  );
}

