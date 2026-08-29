import ProjectsList from "../../components/dashboard/projects/ProjectsList";

export default function Projects() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-8">

      {/* HEADER */}
      <div className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/[0.08]
        bg-[#090909]
        p-6
        sm:p-8
      ">

        {/* Ambient glow */}
        <div className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-red-600/10
          blur-3xl
        " />

        {/* Top line */}
        <div className="
          absolute
          left-0
          top-0
          h-[2px]
          w-full
          bg-gradient-to-r
          from-red-600
          via-red-400/50
          to-transparent
        " />

        <div className="relative">

          <p className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.32em]
            text-red-500
          ">
            Workspace
          </p>

          <h1 className="
            mt-2
            font-bebas
            text-5xl
            uppercase
            tracking-[0.06em]
            text-white
            sm:text-6xl
          ">
            Projects
          </h1>

          <p className="
            mt-2
            max-w-xl
            text-sm
            leading-6
            text-zinc-500
          ">
            Manage your Kadecho projects and showcase your work.
          </p>

        </div>
      </div>


      {/* PROJECTS LIST */}
      <div>

        <div className="mb-4 flex items-center justify-between">

          <div>
            <p className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-zinc-600
            ">
              Portfolio
            </p>

            <h2 className="
              mt-1
              text-sm
              font-semibold
              text-white
            ">
              All Projects
            </h2>
          </div>

        </div>

        <ProjectsList />

      </div>

    </div>
  );
}