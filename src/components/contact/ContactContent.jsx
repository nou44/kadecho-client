import { motion } from "framer-motion";

import Container from "../ui/Container";

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactContent() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#050505]
        py-16
        lg:py-20
      "
    >
      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-red-600/[0.06]
          blur-[140px]
        "
      />

      {/* Side Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2
          h-[350px]
          w-[350px]
          -translate-y-1/2
          rounded-full
          bg-red-600/[0.035]
          blur-[120px]
        "
      />

      <Container>
        <div
          className="
            relative
            z-10
            grid
            items-start
            gap-6
            lg:grid-cols-[1.35fr_.75fr]
            xl:gap-8
          "
        >
          {/* CONTACT FORM */}
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
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <ContactForm />
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
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
              duration: 0.6,
              delay: 0.08,
              ease: "easeOut",
            }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}