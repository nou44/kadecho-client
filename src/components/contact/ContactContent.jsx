
import { motion, useReducedMotion } from "framer-motion";

import Container from "../ui/Container";

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactContent() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative isolate
        overflow-hidden
        bg-[#050505]
        py-10 sm:py-12 lg:py-14
      "
    >
      {/* SOFT STATIC ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(ellipse_45%_40%_at_50%_0%,rgba(185,28,28,0.065),transparent_100%)]
        "
      />

      {/* SUBTLE SIDE LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(ellipse_25%_45%_at_0%_65%,rgba(185,28,28,0.03),transparent_100%)]
        "
      />

      <Container>
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative z-10
            grid items-start
            gap-5 sm:gap-6 lg:gap-7
            lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.75fr)]
          "
        >
          {/* CONTACT FORM */}
          <div className="min-w-0">
            <ContactForm />
          </div>

          {/* CONTACT INFORMATION */}
          <div className="min-w-0">
            <ContactInfo />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
