import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import AnimatedHeroLines from "../components/AnimatedHeroLines";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FolderKanban,
  MapPin,
  Package,
  UserRound,
  Images,
} from "lucide-react";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/projects`;

const reveal = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function ProjectDetails() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const [activeImage, setActiveImage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sliderRef = useRef(null);

  /* =========================================================
      FETCH CURRENT PROJECT
  ========================================================= */

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        if (!slug) {
          throw new Error("Project slug is missing");
        }

        const response = await fetch(
          `${API_URL}/${encodeURIComponent(slug)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load project"
          );
        }

        setProject(data.project);
        setActiveImage(0);
      } catch (err) {
        console.error(
          "❌ Project details error:",
          err
        );

        setError(
          err.message ||
            "Something went wrong while loading this project."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  /* =========================================================
      FETCH ALL PROJECTS
  ========================================================= */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load projects"
          );
        }

        setProjects(
          Array.isArray(data.projects)
            ? data.projects
            : []
        );
      } catch (err) {
        console.error(
          "❌ Projects slider error:",
          err
        );
      }
    };

    fetchProjects();
  }, []);

  /* =========================================================
      GALLERY
  ========================================================= */

  const gallery = useMemo(() => {
    if (!project) return [];

    const images = [
      project.image,
      ...(Array.isArray(project.images)
        ? project.images
        : []),
    ];

    return [
      ...new Set(images.filter(Boolean)),
    ];
  }, [project]);

  /* =========================================================
      RELATED PROJECTS
  ========================================================= */

  const relatedProjects = useMemo(() => {
    if (!project) return projects;

    return projects.filter(
      (item) =>
        String(item._id) !==
        String(project._id)
    );
  }, [projects, project]);

  /* =========================================================
      SLIDER
  ========================================================= */

  const scrollProjects = (direction) => {
    if (!sliderRef.current) return;

    const amount =
      window.innerWidth < 640
        ? 270
        : 360;

    sliderRef.current.scrollBy({
      left:
        direction === "next"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  /* =========================================================
      LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="flex min-h-screen items-center justify-center">

          <div className="text-center">

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                mx-auto
                mb-3

                h-7
                w-7

                rounded-full

                border-2
                border-white/[0.08]
                border-t-red-500
              "
            />

            <p
              className="
                font-bebas

                text-[9px]

                uppercase
                tracking-[0.25em]

                text-zinc-600
              "
            >
              Loading Project...
            </p>

          </div>

        </div>
      </main>
    );
  }

  /* =========================================================
      ERROR
  ========================================================= */

  if (error || !project) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">

        <div className="flex min-h-screen items-center justify-center px-5">

          <div className="max-w-md text-center">

            <p
              className="
                mb-3

                font-bebas

                text-[9px]

                uppercase
                tracking-[0.25em]

                text-red-500
              "
            >
              Project Not Found
            </p>

            <h1
              className="
                font-bebas

                text-3xl
                uppercase
                leading-none

                sm:text-5xl
              "
            >
              {error ||
                "This project does not exist."}
            </h1>

            <Link
              to="/projects"
              className="
                mt-6

                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-white/[0.08]

                bg-white/[0.025]

                px-4
                py-2.5

                font-bebas

                text-[9px]

                uppercase
                tracking-[0.18em]

                text-zinc-400

                transition

                hover:border-red-500/30
                hover:text-white
              "
            >
              <ArrowLeft size={13} />

              Back To Projects
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -18, 0],
            opacity: [
              0.018,
              0.045,
              0.018,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute

            left-1/2
            top-[-100px]

            h-[420px]
            w-[620px]

            -translate-x-1/2

            rounded-full

            bg-red-600

            blur-[150px]
          "
        />

        <div
          className="
            absolute

            bottom-[-250px]
            right-[-200px]

            h-[450px]
            w-[450px]

            rounded-full

            bg-red-900/[0.025]

            blur-[150px]
          "
        />

      </div>


      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <section
        className="
          relative
          z-10

          px-4
          pb-2
          pt-5

          sm:px-7
          sm:pt-7

          lg:px-10
        "
      >

        <div className="mx-auto max-w-[1320px]">

          <Link
            to="/projects"
            className="
              group

              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-white/[0.07]

              bg-white/[0.02]

              px-3
              py-1.5

              font-bebas

              text-[9px]

              uppercase
              tracking-[0.18em]

              text-zinc-500

              transition-all
              duration-300

              hover:border-red-500/25
              hover:bg-red-500/[0.035]
              hover:text-white
            "
          >

            <ArrowLeft
              size={13}
              className="
                transition-transform
                duration-300

                group-hover:-translate-x-1
              "
            />

            Back To Projects

          </Link>

        </div>

      </section>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          z-10

          px-4
          pb-12
          pt-5

          sm:px-7
          sm:pb-16

          lg:px-10
          lg:pb-20
        "
      >

        <div className="mx-auto max-w-[1320px]">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.15,
            }}
            variants={reveal}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              grid
              gap-7

              lg:grid-cols-[1.06fr_0.94fr]
              lg:items-center
              lg:gap-10
            "
          >

            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="min-w-0">

              <div
                className="
                  group
                  relative

                  overflow-hidden

                  rounded-[18px]

                  border
                  border-white/[0.075]

                  bg-[#090909]

                  shadow-[0_20px_65px_rgba(0,0,0,.32)]
                "
              >

                <div className="relative overflow-hidden">

                  {gallery.length > 0 ? (

                    <motion.img
                      key={gallery[activeImage]}
                      src={gallery[activeImage]}
                      alt={project.title}
                      initial={{
                        opacity: 0,
                        scale: 1.02,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        aspect-[16/10]

                        w-full

                        object-cover
                      "
                    />

                  ) : (

                    <div
                      className="
                        flex

                        aspect-[16/10]

                        items-center
                        justify-center

                        bg-zinc-900
                      "
                    >
                      <FolderKanban
                        size={34}
                        className="text-zinc-700"
                      />
                    </div>

                  )}

                  {/* IMAGE COUNT */}

                  {gallery.length > 0 && (

                    <div
                      className="
                        absolute

                        bottom-3
                        left-3

                        rounded-full

                        border
                        border-white/[0.08]

                        bg-black/55

                        px-2.5
                        py-1

                        backdrop-blur-xl
                      "
                    >

                      <span
                        className="
                          font-bebas

                          text-[8px]

                          tracking-[0.18em]

                          text-zinc-300
                        "
                      >
                        {String(
                          activeImage + 1
                        ).padStart(2, "0")}

                        <span className="mx-1 text-zinc-600">
                          /
                        </span>

                        {String(
                          gallery.length
                        ).padStart(2, "0")}
                      </span>

                    </div>

                  )}

                </div>

              </div>


              {/* =================================================
                  GALLERY
              ================================================= */}

              {gallery.length > 1 && (

                <div
                  className="
                    mt-2.5

                    flex
                    gap-2

                    overflow-x-auto

                    pb-1

                    scrollbar-hide
                  "
                >

                  {gallery.map(
                    (image, index) => (

                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setActiveImage(index)
                        }
                        className={`
                          group
                          relative

                          shrink-0

                          overflow-hidden

                          rounded-lg

                          border

                          transition-all
                          duration-300

                          ${
                            activeImage === index
                              ? "border-red-500 opacity-100"
                              : "border-white/[0.07] opacity-50 hover:border-white/20 hover:opacity-100"
                          }
                        `}
                      >

                        <img
                          src={image}
                          alt={`${project.title} ${index + 1}`}
                          className="
                            h-12
                            w-[72px]

                            object-cover

                            sm:h-14
                            sm:w-[88px]
                          "
                        />

                        {activeImage ===
                          index && (

                          <motion.div
                            layoutId="gallery-active"
                            className="
                              absolute

                              bottom-0
                              left-0

                              h-[2px]
                              w-full

                              bg-red-500
                            "
                          />

                        )}

                      </button>

                    )
                  )}

                </div>

              )}

            </div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div
              className="
                relative

                min-w-0

                lg:pl-2
              "
            >

              {/* LINES */}

              <div
                className="
                  pointer-events-none

                  absolute

                  right-0
                  top-[-20px]

                  z-0

                  w-full

                  opacity-60

                  max-sm:top-[40px]
                  max-sm:opacity-35
                "
              >
                <AnimatedHeroLines />
              </div>


              <div className="relative z-10">

                {/* CATEGORY */}

                {project.category && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: false,
                      amount: 0.3,
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                    className="
                      mb-3

                      inline-flex
                      items-center
                      gap-1.5

                      rounded-full

                      border
                      border-red-500/20

                      bg-red-500/[0.035]

                      px-2.5
                      py-1

                      backdrop-blur-xl
                    "
                  >

                    <span
                      className="
                        h-1
                        w-1

                        rounded-full

                        bg-red-500

                        shadow-[0_0_8px_rgba(239,68,68,.7)]
                      "
                    />

                    <span
                      className="
                        font-bebas

                        text-[8px]

                        uppercase
                        tracking-[0.2em]

                        text-red-400
                      "
                    >
                      {project.category}
                    </span>

                  </motion.div>

                )}


                {/* TITLE */}

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    max-w-2xl

                    bg-gradient-to-r
                    from-white
                    via-white
                    to-red-500

                    bg-clip-text

                    font-bebas

                    text-[42px]

                    uppercase

                    leading-[0.82]

                    tracking-[0.01em]

                    text-transparent

                    sm:text-6xl

                    lg:text-7xl

                    max-sm:max-w-[95%]
                  "
                >
                  {project.title}
                </motion.h1>


                {/* DESCRIPTION */}

                {project.description && (

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: false,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      mt-4

                      max-w-xl

                      font-satoshi

                      text-[11px]

                      leading-5

                      text-zinc-500

                      sm:text-[13px]
                      sm:leading-6

                      lg:max-w-lg
                    "
                  >
                    {project.description}
                  </motion.p>

                )}


                {/* =================================================
                    INFO
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
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15,
                  }}
                  className="
                    mt-5

                    grid
                    grid-cols-2

                    gap-1.5

                    sm:gap-2

                    lg:grid-cols-3
                  "
                >

                  <InfoBox
                    icon={<FolderKanban size={12} />}
                    label="Category"
                    value={project.category}
                  />

                  <InfoBox
                    icon={<UserRound size={12} />}
                    label="Client"
                    value={project.client}
                  />

                  <InfoBox
                    icon={<MapPin size={12} />}
                    label="Location"
                    value={project.location}
                  />

                  <InfoBox
                    icon={<Package size={12} />}
                    label="Product"
                    value={project.product}
                  />

                  <InfoBox
                    icon={<CalendarDays size={12} />}
                    label="Date"
                    value={formatDate(project.date)}
                  />

                  <InfoBox
                    icon={<Images size={12} />}
                    label="Images"
                    value={gallery.length}
                  />

                </motion.div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* =====================================================
          PROJECT OVERVIEW
      ===================================================== */}

      <motion.section
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: false,
          amount: 0.12,
        }}
        transition={{
          duration: 0.55,
        }}
        className="
          relative
          z-10

          overflow-hidden

          border-y
          border-white/[0.055]

          bg-white/[0.012]

          px-4
          py-10

          sm:px-7
          sm:py-12

          lg:px-10
          lg:py-14
        "
      >

        {/* TOP ACCENT */}

        <motion.div
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 0.65,
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
            absolute

            left-1/2
            top-0

            h-px
            w-[45%]

            -translate-x-1/2

            origin-center

            bg-gradient-to-r
            from-transparent
            via-red-500
            to-transparent
          "
        />


        <div className="mx-auto max-w-[1320px]">

          <div
            className="
              grid
              gap-7

              lg:grid-cols-[0.7fr_1.3fr]
              lg:gap-12
            "
          >

            {/* LEFT */}

            <motion.div
              initial={{
                opacity: 0,
                x: -18,
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
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <p
                className="
                  font-bebas

                  text-[9px]

                  uppercase
                  tracking-[0.24em]

                  text-red-500
                "
              >
                01 — Overview
              </p>

              <h2
                className="
                  mt-2

                  font-bebas

                  text-4xl

                  uppercase

                  leading-[0.86]

                  tracking-[0.01em]

                  sm:text-5xl

                  lg:text-[58px]
                "
              >
                Built

                <br />

                <span
                  className="
                    bg-gradient-to-r
                    from-white
                    via-white
                    to-red-500

                    bg-clip-text

                    text-transparent
                  "
                >
                  With Purpose
                </span>

              </h2>

            </motion.div>


            {/* RIGHT */}

            <div>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  max-w-3xl

                  font-satoshi

                  text-[12px]

                  leading-6

                  text-zinc-400

                  sm:text-sm
                  sm:leading-7
                "
              >
                {project.description ||
                  "A carefully crafted project developed with attention to detail, quality and functionality."}
              </motion.p>


              {/* DETAILS */}

              <div
                className="
                  mt-6

                  grid

                  sm:grid-cols-2

                  sm:gap-x-7
                "
              >

                <DetailRow
                  index={0}
                  label="Client"
                  value={project.client}
                />

                <DetailRow
                  index={1}
                  label="Location"
                  value={project.location}
                />

                <DetailRow
                  index={2}
                  label="Category"
                  value={project.category}
                />

                <DetailRow
                  index={3}
                  label="Product"
                  value={project.product}
                />

                <DetailRow
                  index={4}
                  label="Date"
                  value={formatDate(project.date)}
                />

                <DetailRow
                  index={5}
                  label="Featured"
                  value={
                    project.featured
                      ? "Featured Project"
                      : "Standard Project"
                  }
                />

              </div>

            </div>

          </div>

        </div>

      </motion.section>


      {/* =====================================================
          ALL PROJECTS
      ===================================================== */}

      {relatedProjects.length > 0 && (

        <section
          className="
            relative
            z-10

            px-4
            py-12

            sm:px-7

            lg:px-10
            lg:py-16
          "
        >

          <div className="mx-auto max-w-[1320px]">

            {/* HEADER */}

            <motion.div
              initial={{
                opacity: 0,
                y: 14,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                duration: 0.55,
              }}
              className="
                mb-5

                flex
                items-end
                justify-between

                gap-4
              "
            >

              <div>

                <p
                  className="
                    font-bebas

                    text-[9px]

                    uppercase
                    tracking-[0.24em]

                    text-red-500
                  "
                >
                  02 — Our Work
                </p>

                <h2
                  className="
                    mt-1.5

                    font-bebas

                    text-3xl

                    uppercase
                    leading-none

                    sm:text-4xl
                  "
                >
                  More Projects
                </h2>

              </div>


              {/* ARROWS */}

              <div className="flex gap-1.5">

                <SliderButton
                  onClick={() =>
                    scrollProjects("prev")
                  }
                  label="Previous projects"
                >
                  <ArrowLeft size={14} />
                </SliderButton>

                <SliderButton
                  onClick={() =>
                    scrollProjects("next")
                  }
                  label="Next projects"
                >
                  <ArrowRight size={14} />
                </SliderButton>

              </div>

            </motion.div>


            {/* SLIDER */}

            <div
              ref={sliderRef}
              className="
                flex

                snap-x
                snap-mandatory

                gap-2.5

                overflow-x-auto

                pb-3

                scrollbar-hide
              "
            >

              {relatedProjects.map(
                (item, index) => (

                  <ProjectSliderCard
                    key={item._id}
                    project={item}
                    index={index}
                  />

                )
              )}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <section
        className="
          px-4
          pb-8

          sm:px-7

          lg:px-10
        "
      >

        <div
          className="
            mx-auto
            max-w-[1320px]

            border-t
            border-white/[0.055]

            pt-4
          "
        >

          <Link
            to="/projects"
            className="
              group

              inline-flex
              items-center
              gap-2

              font-bebas

              text-[9px]

              uppercase
              tracking-[0.2em]

              text-zinc-600

              transition

              hover:text-white
            "
          >

            <ArrowLeft
              size={12}
              className="
                transition-transform

                group-hover:-translate-x-1
              "
            />

            All Projects

          </Link>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
    INFO BOX
========================================================= */

function InfoBox({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        group

        relative

        min-w-0

        overflow-hidden

        rounded-[11px]

        border
        border-white/[0.065]

        bg-white/[0.018]

        px-2.5
        py-2.5

        transition-all
        duration-300

        hover:border-red-500/20
        hover:bg-red-500/[0.025]

        sm:px-3
      "
    >

      {/* subtle accent */}

      <div
        className="
          absolute

          left-0
          top-0

          h-full
          w-[2px]

          bg-red-500

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      <div
        className="
          flex

          min-w-0

          items-center
          gap-1.5

          text-zinc-600

          transition-colors
          duration-300

          group-hover:text-red-400
        "
      >

        {icon}

        <span
          className="
            truncate

            font-bebas

            text-[7px]

            uppercase
            tracking-[0.16em]
          "
        >
          {label}
        </span>

      </div>

      <p
        className="
          mt-1

          truncate

          font-satoshi

          text-[10px]

          text-zinc-300

          sm:text-[11px]
        "
      >
        {value || "—"}
      </p>

    </motion.div>
  );
}


/* =========================================================
    DETAIL ROW
========================================================= */

function DetailRow({
  label,
  value,
  index = 0,
}) {
  return (
    <motion.div
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
        amount: 0.25,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.05, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group

        relative

        py-3

        sm:py-3.5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between

          gap-3
        "
      >

        <p
          className="
            font-bebas

            text-[8px]

            uppercase
            tracking-[0.18em]

            text-zinc-600
          "
        >
          {label}
        </p>

        <span
          className="
            h-[3px]
            w-[3px]

            shrink-0

            rounded-full

            bg-red-500/50
          "
        />

      </div>


      <p
        className="
          mt-1

          truncate

          font-satoshi

          text-[12px]

          text-zinc-300

          sm:text-[13px]
        "
      >
        {value || "—"}
      </p>


      {/* BASE LINE */}

      <div
        className="
          absolute

          bottom-0
          left-0

          h-px
          w-full

          bg-white/[0.06]
        "
      />


      {/* ANIMATED ACCENT */}

      <motion.div
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        whileInView={{
          scaleX: 1,
          opacity: 0.8,
        }}
        viewport={{
          once: false,
          amount: 0.25,
        }}
        transition={{
          duration: 0.7,
          delay: Math.min(index * 0.05, 0.25),
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute

          bottom-0
          left-0

          h-px

          w-[38%]

          origin-left

          bg-gradient-to-r
          from-red-500
          to-transparent
        "
      />

    </motion.div>
  );
}


/* =========================================================
    SLIDER BUTTON
========================================================= */

function SliderButton({
  onClick,
  label,
  children,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover={{
        y: -1,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.94,
      }}
      className="
        flex

        h-8
        w-8

        items-center
        justify-center

        rounded-full

        border
        border-white/[0.08]

        bg-white/[0.025]

        text-zinc-500

        transition-all
        duration-300

        hover:border-red-500/30
        hover:bg-red-500/[0.06]
        hover:text-red-400
      "
    >
      {children}
    </motion.button>
  );
}


/* =========================================================
    PROJECT SLIDER CARD
========================================================= */

function ProjectSliderCard({
  project,
  index,
}) {
  const image =
    project.image ||
    (
      Array.isArray(project.images)
        ? project.images[0]
        : null
    );

  return (
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
        once: false,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        w-[245px]

        shrink-0
        snap-start

        sm:w-[280px]

        lg:w-[310px]
      "
    >

      <Link
        to={`/projects/${
          project.slug || project._id
        }`}
        className="group block"
      >

        <div
          className="
            relative

            overflow-hidden

            rounded-[14px]

            border
            border-white/[0.07]

            bg-[#090909]

            transition-all
            duration-300

            hover:border-red-500/20

            hover:shadow-[0_16px_45px_rgba(0,0,0,.25)]
          "
        >

          {/* IMAGE */}

          <div className="relative overflow-hidden">

            {image ? (

              <motion.img
                src={image}
                alt={project.title}
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  aspect-[16/10]

                  w-full

                  object-cover
                "
              />

            ) : (

              <div
                className="
                  flex

                  aspect-[16/10]

                  items-center
                  justify-center

                  bg-zinc-900
                "
              >
                <FolderKanban
                  size={26}
                  className="text-zinc-700"
                />
              </div>

            )}


            {/* IMAGE OVERLAY */}

            <div
              className="
                pointer-events-none

                absolute
                inset-0

                bg-gradient-to-t

                from-black/45
                via-transparent
                to-transparent
              "
            />


            {/* NUMBER */}

            <div
              className="
                absolute

                left-2.5
                top-2.5

                rounded-full

                border
                border-white/[0.09]

                bg-black/55

                px-2
                py-1

                backdrop-blur-xl
              "
            >

              <span
                className="
                  font-bebas

                  text-[7px]

                  tracking-[0.16em]

                  text-zinc-300
                "
              >
                {String(
                  index + 1
                ).padStart(2, "0")}
              </span>

            </div>


            {/* HOVER LINE */}

            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileHover={{
                scaleX: 1,
              }}
              className="
                absolute

                bottom-0
                left-0

                h-[2px]
                w-full

                origin-left

                bg-gradient-to-r
                from-red-600
                via-red-500
                to-transparent
              "
            />

          </div>


          {/* CONTENT */}

          <div className="p-3">

            <div
              className="
                flex

                items-start
                justify-between

                gap-2.5
              "
            >

              <div className="min-w-0">

                <p
                  className="
                    mb-1

                    font-bebas

                    text-[8px]

                    uppercase
                    tracking-[0.16em]

                    text-red-500
                  "
                >
                  {project.category ||
                    "Project"}
                </p>

                <h3
                  className="
                    truncate

                    font-bebas

                    text-[20px]

                    uppercase

                    leading-none

                    text-white

                    transition-colors
                    duration-300

                    group-hover:text-red-100
                  "
                >
                  {project.title}
                </h3>

              </div>


              <div
                className="
                  flex

                  h-6
                  w-6

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/[0.07]

                  text-zinc-600

                  transition-all
                  duration-300

                  group-hover:border-red-500/25
                  group-hover:bg-red-500/[0.06]
                  group-hover:text-red-400
                "
              >
                <ArrowUpRightIcon />
              </div>

            </div>


            <div
              className="
                mt-2.5

                flex
                items-center

                gap-2.5

                text-zinc-600
              "
            >

              <span
                className="
                  truncate

                  font-satoshi

                  text-[9px]
                "
              >
                {project.location ||
                  "Morocco"}
              </span>

              <span
                className="
                  h-1
                  w-1

                  shrink-0

                  rounded-full

                  bg-red-500/50
                "
              />

              <span
                className="
                  truncate

                  font-satoshi

                  text-[9px]
                "
              >
                {project.product ||
                  "Custom"}
              </span>

            </div>

          </div>

        </div>

      </Link>

    </motion.div>
  );
}


/* =========================================================
    ARROW ICON
========================================================= */

function ArrowUpRightIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}


/* =========================================================
    DATE
========================================================= */

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}