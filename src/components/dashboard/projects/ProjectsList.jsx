
import { useEffect, useState } from "react";
import {
  Trash2,
  FolderKanban,
  RefreshCw,
  MapPin,
  CalendarDays,
  UserRound,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/projects";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deletingProject, setDeletingProject] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // GET PROJECTS
  // =====================================================

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch projects"
        );
      }

      setProjects(
        result.projects ||
          result.data ||
          []
      );
    } catch (error) {
      console.error(
        "FETCH PROJECTS ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    fetchProjects();
  }, []);

  // =====================================================
  // DELETE PROJECT
  // =====================================================

  const handleDeleteProject = async () => {
    if (!deletingProject) return;

    try {
      setDeleteLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/${deletingProject._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to delete project"
        );
      }

      // Remove project from UI
      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !==
            deletingProject._id
        )
      );

      // Close modal
      setDeletingProject(null);
    } catch (error) {
      console.error(
        "DELETE PROJECT ERROR:",
        error
      );

      setError(
        error.message ||
          "Failed to delete project."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#0a0a0a]
          p-8
          text-center
        "
      >
        <div
          className="
            mx-auto
            mb-3
            h-7
            w-7
            animate-spin
            rounded-full
            border-2
            border-white/10
            border-t-red-500
          "
        />

        <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-600">
          Loading projects...
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !projects.length) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-red-500/20
          bg-red-500/[0.04]
          p-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold text-red-400">
              Failed to load projects
            </p>

            <p className="mt-1 truncate text-[10px] text-zinc-600">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={fetchProjects}
            className="
              flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-3
              py-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-zinc-400
              transition-all
              hover:border-red-500/30
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            <RefreshCw size={13} />
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (projects.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#0a0a0a]
          p-10
          text-center
        "
      >
        <div
          className="
            mx-auto
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-red-500/10
            bg-red-500/[0.05]
            text-red-400
          "
        >
          <FolderKanban size={21} />
        </div>

        <h3
          className="
            font-bebas
            text-xl
            uppercase
            tracking-wide
            text-white
          "
        >
          No Projects
        </h3>

        <p className="mt-1 text-[10px] text-zinc-600">
          No projects have been created yet.
        </p>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <>
      <section
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.08]
          bg-[#0a0a0a]
        "
      >
        {/* =================================================
            AMBIENT GLOW
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-red-600/[0.06]
            blur-[110px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-72
            w-72
            rounded-full
            bg-red-600/[0.035]
            blur-[100px]
          "
        />

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className="
            relative
            z-10
            flex
            flex-col
            gap-3
            border-b
            border-white/[0.07]
            px-4
            py-3.5
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-red-500/10
                bg-red-500/[0.07]
                text-red-400
              "
            >
              <FolderKanban size={17} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-red-400/80
                "
              >
                Portfolio
              </p>

              <div className="mt-0.5 flex items-center gap-2">
                <h2
                  className="
                    font-bebas
                    text-2xl
                    uppercase
                    tracking-wide
                    text-white
                  "
                >
                  Projects
                </h2>

                <span
                  className="
                    rounded-full
                    border
                    border-white/[0.07]
                    bg-white/[0.03]
                    px-2
                    py-0.5
                    text-[8px]
                    font-semibold
                    text-zinc-500
                  "
                >
                  {projects.length}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchProjects}
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-3
              py-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-zinc-500
              transition-all
              duration-300
              hover:border-red-500/20
              hover:bg-red-500/[0.06]
              hover:text-red-400
            "
          >
            <RefreshCw size={12} />
            Refresh
          </button>
        </header>

        {/* =================================================
            ERROR BANNER
        ================================================= */}

        {error && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="
              relative
              z-10
              mx-4
              mt-3
              overflow-hidden
              rounded-xl
              border
              border-red-500/15
              bg-red-500/[0.05]
              px-3
              py-2.5
              text-[10px]
              text-red-400
              sm:mx-5
            "
          >
            {error}
          </motion.div>
        )}

        {/* =================================================
            SCROLL AREA
        ================================================= */}

        <div
          className="
            relative
            z-10
            max-h-[680px]
            overflow-y-auto
            px-3
            py-3
            sm:px-4
            sm:py-4
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-3
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: Math.min(
                    index * 0.025,
                    0.3
                  ),
                  duration: 0.3,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.018]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-red-500/20
                  hover:bg-white/[0.025]
                "
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    aspect-[16/9]
                    overflow-hidden
                    bg-[#080808]
                  "
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={
                        project.title ||
                        "Project"
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.04]
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        bg-[#0d0d0d]
                        text-zinc-700
                      "
                    >
                      <FolderKanban size={28} />
                    </div>
                  )}

                  {/* Image gradient */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/85
                      via-black/15
                      to-transparent
                    "
                  />

                  {/* Top shine */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                      opacity-40
                    "
                  />

                  {/* Category */}

                  {project.category && (
                    <div
                      className="
                        absolute
                        left-2.5
                        top-2.5
                        rounded-lg
                        border
                        border-white/10
                        bg-black/55
                        px-2
                        py-1
                        backdrop-blur-xl
                      "
                    >
                      <span
                        className="
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.14em]
                          text-zinc-300
                        "
                      >
                        {project.category}
                      </span>
                    </div>
                  )}

                  {/* Featured */}

                  {project.featured && (
                    <div
                      className="
                        absolute
                        right-2.5
                        top-2.5
                        flex
                        items-center
                        gap-1
                        rounded-lg
                        border
                        border-yellow-500/15
                        bg-black/55
                        px-2
                        py-1
                        text-yellow-400
                        backdrop-blur-xl
                      "
                    >
                      <Star
                        size={9}
                        fill="currentColor"
                      />

                      <span
                        className="
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                        "
                      >
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="p-3">
                  {/* Title */}

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        text-[13px]
                        font-bold
                        text-white
                      "
                    >
                      {project.title ||
                        "Untitled Project"}
                    </h3>

                    {project.description && (
                      <p
                        className="
                          mt-1
                          line-clamp-1
                          text-[10px]
                          leading-4
                          text-zinc-600
                        "
                      >
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* =================================================
                      META
                  ================================================= */}

                  <div
                    className="
                      mt-3
                      grid
                      grid-cols-2
                      gap-2
                    "
                  >
                    {/* Client */}

                    <div
                      className="
                        min-w-0
                        rounded-xl
                        border
                        border-white/[0.05]
                        bg-white/[0.015]
                        px-2.5
                        py-2
                      "
                    >
                      <div className="flex items-center gap-1.5">
                        <UserRound
                          size={10}
                          className="text-zinc-700"
                        />

                        <span
                          className="
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-zinc-700
                          "
                        >
                          Client
                        </span>
                      </div>

                      <p
                        className="
                          mt-1
                          truncate
                          text-[9px]
                          font-medium
                          text-zinc-400
                        "
                      >
                        {project.client || "-"}
                      </p>
                    </div>

                    {/* Location */}

                    <div
                      className="
                        min-w-0
                        rounded-xl
                        border
                        border-white/[0.05]
                        bg-white/[0.015]
                        px-2.5
                        py-2
                      "
                    >
                      <div className="flex items-center gap-1.5">
                        <MapPin
                          size={10}
                          className="text-zinc-700"
                        />

                        <span
                          className="
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-zinc-700
                          "
                        >
                          Location
                        </span>
                      </div>

                      <p
                        className="
                          mt-1
                          truncate
                          text-[9px]
                          font-medium
                          text-zinc-400
                        "
                      >
                        {project.location || "-"}
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                      FOOTER
                  ================================================= */}

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/[0.05]
                      pt-2.5
                    "
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <CalendarDays
                        size={11}
                        className="shrink-0 text-zinc-700"
                      />

                      <span
                        className="
                          truncate
                          text-[8px]
                          text-zinc-600
                        "
                      >
                        {project.date
                          ? new Date(
                              project.date
                            ).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        setDeletingProject(
                          project
                        )
                      }
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/[0.07]
                        bg-white/[0.02]
                        text-zinc-600
                        transition-all
                        duration-300
                        hover:border-red-500/30
                        hover:bg-red-500/10
                        hover:text-red-400
                      "
                      title="Delete project"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Bottom red accent */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-1/2
                    h-px
                    w-0
                    -translate-x-1/2
                    bg-red-500/60
                    transition-all
                    duration-500
                    group-hover:w-1/2
                  "
                />
              </motion.article>
            ))}
          </div>
        </div>

        {/* =================================================
            SCROLL HINT
        ================================================= */}

        {projects.length > 6 && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-2
              left-1/2
              z-20
              -translate-x-1/2
              rounded-full
              border
              border-white/[0.06]
              bg-black/60
              px-3
              py-1
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-zinc-600
              backdrop-blur-md
            "
          >
            Scroll
          </div>
        )}
      </section>

      {/* =================================================
          DELETE CONFIRMATION MODAL
      ================================================= */}

      <AnimatePresence>
        {deletingProject && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/75
              p-4
              backdrop-blur-md
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 12,
              }}
              transition={{
                duration: 0.22,
              }}
              className="
                w-full
                max-w-[390px]
                overflow-hidden
                rounded-[22px]
                border
                border-white/[0.08]
                bg-[#0a0a0a]
                shadow-[0_30px_100px_rgba(0,0,0,.7)]
              "
            >
              {/* Modal accent */}

              <div className="h-[2px] w-full bg-gradient-to-r from-red-600 via-red-400 to-transparent" />

              <div className="p-5">
                <div className="flex items-start gap-3">
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
                    "
                  >
                    <Trash2 size={17} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                        font-bebas
                        text-[25px]
                        uppercase
                        leading-none
                        tracking-wide
                        text-white
                      "
                    >
                      Delete Project?
                    </h3>

                    <p className="mt-2 text-[11px] leading-5 text-zinc-500">
                      Are you sure you want to delete{" "}
                      <span className="font-semibold text-zinc-300">
                        {deletingProject.title ||
                          "this project"}
                      </span>
                      ?
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-red-400/60">
                      This action cannot be undone
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {/* CANCEL */}

                  <button
                    type="button"
                    disabled={deleteLoading}
                    onClick={() =>
                      setDeletingProject(null)
                    }
                    className="
                      h-10
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.1em]
                      text-zinc-400
                      transition-all
                      hover:bg-white/[0.06]
                      hover:text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  {/* DELETE */}

                  <button
                    type="button"
                    disabled={deleteLoading}
                    onClick={
                      handleDeleteProject
                    }
                    className="
                      flex
                      h-10
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-red-600
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.1em]
                      text-white
                      transition-all
                      hover:bg-red-500
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <Trash2 size={13} />

                    {deleteLoading
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

