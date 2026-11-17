
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PHONE = "+212658551365";

export default function ContactHero() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    let isVisible = false;

    const syncPlayback = () => {
      if (
        !isVisible ||
        document.hidden ||
        reduceMotion
      ) {
        video.pause();
        return;
      }

      const playPromise = video.play();
      playPromise?.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    document.addEventListener(
      "visibilitychange",
      syncPlayback
    );

    return () => {
      observer.disconnect();
      document.removeEventListener(
        "visibilitychange",
        syncPlayback
      );
      video.pause();
    };
  }, [reduceMotion]);

  const reveal = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative isolate
        min-h-[320px]
        overflow-hidden
        bg-[#050505]
        sm:min-h-[350px]
        lg:min-h-[380px]
      "
    >
      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          h-full w-full
          object-cover object-center
        "
      >
        <source src="/vedio.mp4" type="video/mp4" />
      </video>

      {/* CINEMATIC OVERLAYS */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-black/50
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-r
          from-black/95 via-black/65
          to-black/20
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-24
          bg-gradient-to-t
          from-[#050505] to-transparent
        "
      />

      {/* STATIC RED ATMOSPHERE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(ellipse_40%_75%_at_20%_55%,rgba(220,38,38,0.12),transparent_100%)]
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative z-10
          mx-auto flex
          min-h-[320px] max-w-7xl
          items-center
          px-4 py-11
          sm:min-h-[350px] sm:px-5
          lg:min-h-[380px] lg:px-8
        "
      >
        <motion.div
          variants={reveal}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full max-w-[760px]"
        >
          {/* BREADCRUMB */}
          <nav
            aria-label="Breadcrumb"
            className="
              mb-4 flex items-center gap-2
              text-[10px] font-medium
              uppercase tracking-[0.16em]
            "
          >
            <Link
              to="/"
              className="
                text-red-400
                transition-colors duration-300
                hover:text-red-300
              "
            >
              Home
            </Link>

            <ChevronRight
              size={12}
              className="text-zinc-600"
            />

            <span
              aria-current="page"
              className="text-zinc-300"
            >
              Contact
            </span>
          </nav>

          {/* BADGE */}
          <div
            className="
              mb-4 inline-flex
              items-center gap-2
              rounded-full
              border border-red-500/25
              bg-red-500/[0.07]
              px-3 py-1.5
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full bg-red-500
              "
            />

            <span
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.18em]
                text-red-400
              "
            >
              Get In Touch
            </span>
          </div>

          {/* TITLE */}
          <h1
            className="
              font-black uppercase
              text-[38px] leading-[0.95]
              tracking-[-0.025em]
              text-white
              sm:text-[46px]
              lg:text-[56px]
            "
          >
            Contact{" "}
            <span
              className="
                bg-gradient-to-r
                from-red-300 via-red-500
                to-orange-500
                bg-clip-text text-transparent
              "
            >
              KADECHO
            </span>
          </h1>

          {/* RED ACCENT */}
          <div
            aria-hidden="true"
            className="
              mt-4 h-[2px] w-16
              rounded-full
              bg-gradient-to-r
              from-red-600 via-red-400
              to-transparent
            "
          />

          {/* DESCRIPTION */}
          <p
            className="
              mt-4 max-w-[530px]
              text-[12px] leading-6
              text-zinc-300
              sm:text-[13px]
            "
          >
            Let&apos;s discuss your custom metal project and
            transform your ideas into premium craftsmanship.
          </p>

          {/* ACTIONS */}
          <div
            className="
              mt-5 flex flex-wrap
              items-center gap-3
            "
          >
            <Link
              to="/projects"
              className="
                group inline-flex h-10
                items-center justify-center gap-2.5
                rounded-xl bg-red-600
                px-5
                text-[11px] font-semibold
                uppercase tracking-[0.08em]
                text-white
                transition-[background-color,transform]
                duration-300
                hover:-translate-y-0.5
                hover:bg-red-500
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-500
              "
            >
              View Projects

              <ArrowRight
                size={15}
                className="
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            <a
              href={`tel:${PHONE}`}
              className="
                group inline-flex h-10
                items-center justify-center gap-2.5
                rounded-xl
                border border-white/15
                bg-white/[0.045]
                px-5
                text-[11px] font-semibold
                uppercase tracking-[0.08em]
                text-white
                transition-[background-color,border-color,transform]
                duration-300
                hover:-translate-y-0.5
                hover:border-red-500/40
                hover:bg-red-500/10
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-red-500
              "
            >
              <Phone size={14} className="text-red-400" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM RED LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-0 left-1/2
          h-px w-[70%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent via-red-500/55
          to-transparent
        "
      />
    </section>
  );
}
