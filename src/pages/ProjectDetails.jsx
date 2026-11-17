import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, ChevronLeft,
  ChevronRight, Expand, FolderKanban, Images, MapPin, Package,
  UserRound, X,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/projects`;
const EASE = [0.22, 1, 0.36, 1];
const formatDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};
const clean = (value) => value === null || value === undefined || value === "" ? null : String(value);

function Control({ label, onClick, children, disabled, className = "" }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} disabled={disabled}
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/15 bg-[#101012]/85 text-zinc-200 backdrop-blur-md transition duration-200 hover:border-red-500/50 hover:bg-red-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-30 ${className}`}>
      {children}
    </button>
  );
}

function Gallery({ images, title, active, setActive, reduced }) {
  const [expanded, setExpanded] = useState(false);
  const startX = useRef(null);
  const total = images.length;
  const move = useCallback((delta) => {
    if (total < 2) return;
    setActive((current) => (current + delta + total) % total);
  }, [setActive, total]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    };
    document.addEventListener("keydown", onKey);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = oldOverflow; };
  }, [expanded, move]);

  return (
    <>
      <div className="min-w-0">
        <div className="group relative overflow-hidden rounded-[14px] border border-white/[0.09] bg-[#101012]">
          <div className="relative aspect-[16/10] w-full max-h-[390px] overflow-hidden sm:aspect-[16/9] lg:aspect-[16/10]"
            onTouchStart={(event) => { startX.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              if (startX.current === null) return;
              const distance = (event.changedTouches[0]?.clientX ?? startX.current) - startX.current;
              if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
              startX.current = null;
            }}>
            <AnimatePresence mode="wait" initial={false}>
              {total ? (
                <motion.img key={images[active]} src={images[active]} alt={`${title} — view ${active + 1}`}
                  initial={reduced ? false : { opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover" loading={active === 0 ? "eager" : "lazy"} />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-zinc-900 text-zinc-600"><FolderKanban size={32} /></div>
              )}
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t from-black/10 to-transparent" />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="rounded-md border border-white/15 bg-black/60 px-2.5 py-1.5 font-mono text-[10px] tracking-wider text-white backdrop-blur-md">
                {String(total ? active + 1 : 0).padStart(2, "0")} <span className="text-zinc-500">/</span> {String(total).padStart(2, "0")}
              </span>
              <span className="hidden rounded-md border border-white/10 bg-black/40 px-2 py-1.5 text-[9px] uppercase tracking-[0.16em] text-zinc-200 backdrop-blur-md sm:block">Project gallery</span>
            </div>
            {total > 0 && <Control label="View fullscreen" onClick={() => setExpanded(true)} className="absolute right-3 top-3"><Expand size={14} /></Control>}
            {total > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                <Control label="Previous image" onClick={() => move(-1)}><ChevronLeft size={17} /></Control>
                <Control label="Next image" onClick={() => move(1)}><ChevronRight size={17} /></Control>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2.5 flex min-h-[48px] items-center gap-2">
          <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {total > 1 ? images.map((image, index) => (
              <button key={`${image}-${index}`} type="button" onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`} aria-pressed={index === active}
                className={`relative h-[45px] w-[72px] shrink-0 overflow-hidden rounded-[6px] border transition-all duration-200 sm:h-[50px] sm:w-[80px] ${index === active ? "border-red-500 opacity-100" : "border-white/10 opacity-55 hover:border-white/35 hover:opacity-100"}`}>
                <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                {index === active && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-red-500" />}
              </button>
            )) : <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-600"><Images size={13} /> {total ? "01 / 01 — Single view" : "No images available"}</span>}
          </div>
          {total > 1 && <span className="hidden shrink-0 font-mono text-[10px] text-zinc-600 sm:block">SELECT A VIEW</span>}
        </div>
      </div>
      <AnimatePresence>
        {expanded && total > 0 && (
          <motion.div className="fixed inset-0 z-[1000] flex flex-col bg-black/[0.97] p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={`${title} image viewer`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.2 }}>
            <div className="flex items-center justify-between gap-4 pb-3">
              <div className="min-w-0"><p className="truncate text-xs font-semibold text-white">{title}</p><p className="mt-0.5 font-mono text-[10px] text-zinc-500">{active + 1} / {total}</p></div>
              <Control label="Close fullscreen" onClick={() => setExpanded(false)}><X size={17} /></Control>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <img src={images[active]} alt={`${title} — fullscreen view ${active + 1}`} className="max-h-full max-w-full object-contain" />
              {total > 1 && <><Control label="Previous image" onClick={() => move(-1)} className="absolute left-0 top-1/2 -translate-y-1/2"><ChevronLeft size={18} /></Control><Control label="Next image" onClick={() => move(1)} className="absolute right-0 top-1/2 -translate-y-1/2"><ChevronRight size={18} /></Control></>}
            </div>
            {total > 1 && <div className="flex justify-center gap-1.5 pt-3">{images.map((_, index) => <button key={index} type="button" aria-label={`Go to image ${index + 1}`} onClick={() => setActive(index)} className={`h-1 rounded-full transition-all ${index === active ? "w-6 bg-red-500" : "w-2 bg-white/25"}`} />)}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Fact({ icon: Icon, label, value }) {
  if (!clean(value)) return null;
  return (
    <div className="flex min-w-0 items-start gap-2.5 border-b border-white/[0.065] py-3">
      <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[7px] border border-red-500/15 bg-red-500/[0.045] text-red-400"><Icon size={13} strokeWidth={1.7} /></div>
      <div className="min-w-0"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-600">{label}</p><p className="mt-1 break-words text-[12px] font-medium leading-4 text-zinc-200">{value}</p></div>
    </div>
  );
}

function RelatedCard({ item, index, reduced }) {
  const image = item.image || (Array.isArray(item.images) ? item.images[0] : null);
  return (
    <motion.div className="w-[225px] shrink-0 snap-start sm:w-[255px] lg:w-[270px]"
      initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.4, delay: Math.min(index * 0.035, 0.14) }}>
      <Link to={`/projects/${item.slug || item._id}`} className="group block overflow-hidden rounded-[11px] border border-white/[0.075] bg-[#0c0c0e] transition-colors hover:border-red-500/30">
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
          {image ? <img src={image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]" /> : <div className="grid h-full place-items-center text-zinc-700"><FolderKanban size={26} /></div>}
          <span className="absolute left-2.5 top-2.5 rounded bg-black/60 px-2 py-1 font-mono text-[9px] text-zinc-200">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="flex items-center justify-between gap-3 p-3">
          <div className="min-w-0"><p className="mb-1 truncate text-[9px] uppercase tracking-[0.16em] text-red-400">{item.category || "Project"}</p><h3 className="truncate font-bebas text-[21px] uppercase leading-none text-white">{item.title}</h3></div>
          <ArrowUpRight size={15} className="shrink-0 text-zinc-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-400" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const reduced = useReducedMotion();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const relatedRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(""); setProject(null); setActiveImage(0);
    if (!slug) { setError("Project slug is missing"); setLoading(false); return () => controller.abort(); }
    fetch(`${API_URL}/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(async (response) => { const data = await response.json(); if (!response.ok || !data.success) throw new Error(data.message || "Failed to load project"); return data.project; })
      .then((data) => setProject(data))
      .catch((err) => { if (err.name !== "AbortError") setError(err.message || "Unable to load project"); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal })
      .then(async (response) => { const data = await response.json(); if (!response.ok || !data.success) throw new Error("Failed to load projects"); return data.projects; })
      .then((items) => setProjects(Array.isArray(items) ? items : []))
      .catch((err) => { if (err.name !== "AbortError") console.error("Related projects:", err); });
    return () => controller.abort();
  }, []);

  const gallery = useMemo(() => project ? [...new Set([project.image, ...(Array.isArray(project.images) ? project.images : [])].filter((url) => typeof url === "string" && url.trim()))] : [], [project]);
  const related = useMemo(() => projects.filter((item) => String(item._id) !== String(project?._id) && item.slug !== project?.slug), [projects, project]);
  const scrollRelated = (direction) => { if (!relatedRef.current) return; const item = relatedRef.current.querySelector("a"); const width = item?.getBoundingClientRect().width || 260; relatedRef.current.scrollBy({ left: direction * (width + 12), behavior: reduced ? "auto" : "smooth" }); };

  if (loading) return <main className="grid min-h-[70vh] place-items-center bg-[#070708] text-white"><div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-zinc-500"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-red-500" /> Loading project</div></main>;
  if (error || !project) return <main className="grid min-h-[70vh] place-items-center bg-[#070708] px-5 text-center text-white"><div><p className="mb-2 text-xs uppercase tracking-[0.2em] text-red-400">Project unavailable</p><h1 className="mb-6 text-xl">{error || "Project not found"}</h1><Link to="/projects" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-xs text-zinc-300 hover:text-white"><ArrowLeft size={14} /> All projects</Link></div></main>;

  const facts = [
    { icon: UserRound, label: "Client", value: project.client },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Package, label: "Product", value: project.product },
    { icon: CalendarDays, label: "Date", value: formatDate(project.date) },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-[#070708] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-28 h-[300px] bg-[radial-gradient(ellipse_at_65%_0%,rgba(120,17,27,0.075),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1160px] px-4 pb-10 pt-5 sm:px-6 lg:px-8 lg:pt-7">
        <nav className="mb-4 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.17em] text-zinc-500" aria-label="Breadcrumb">
          <Link to="/projects" className="inline-flex items-center gap-2 transition-colors hover:text-white"><ArrowLeft size={13} /> All projects</Link>
          <span className="hidden text-zinc-700 sm:block">KADECHO <span className="mx-1 text-red-600">/</span> PROJECT DETAILS</span>
        </nav>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.16fr)_minmax(0,0.84fr)] lg:gap-7">
          <Gallery images={gallery} title={project.title || "Project"} active={activeImage} setActive={setActiveImage} reduced={reduced} />
          <div className="min-w-0 lg:pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-red-500/25 bg-red-500/[0.06] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-red-400">{project.category || "Our work"}</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">Selected project</span>
            </div>
            <h1 className="mt-3 break-words font-bebas text-[36px] uppercase leading-[0.96] tracking-[0.015em] text-white sm:text-[42px] lg:text-[46px]">{project.title}</h1>
            <div className="mt-3 h-[2px] w-10 bg-gradient-to-r from-red-500 to-transparent" />
            {clean(project.description) && <p className="mt-3 line-clamp-3 max-w-[420px] text-[12px] leading-[1.8] text-zinc-400">{project.description}</p>}
            <div className="mt-4 grid grid-cols-2 gap-x-4 border-t border-white/[0.065]">
              {facts.map((fact) => <Fact key={fact.label} {...fact} />)}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="group inline-flex h-9 items-center gap-2 rounded-lg border border-red-500/25 bg-red-500/[0.085] px-3.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-red-200 transition hover:border-red-500/50 hover:bg-red-500/15">
                Explore projects <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-600"><Images size={13} /> {gallery.length} {gallery.length === 1 ? "image" : "images"}</span>
            </div>
          </div>
        </div>

        {clean(project.description) && (
          <section className="mt-10 grid gap-4 border-t border-white/[0.075] pt-6 sm:grid-cols-[190px_1fr] sm:gap-8" aria-labelledby="overview-title">
            <div><p className="text-[9px] uppercase tracking-[0.22em] text-red-400">01 / The project</p><h2 id="overview-title" className="mt-1.5 font-bebas text-[27px] uppercase leading-none">Project overview</h2></div>
            <p className="max-w-2xl whitespace-pre-line text-[12px] leading-[1.9] text-zinc-400 sm:text-[13px]">{project.description}</p>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-10 border-t border-white/[0.075] pt-6" aria-labelledby="related-title">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div><p className="text-[9px] uppercase tracking-[0.22em] text-red-400">{clean(project.description) ? "02" : "01"} / Discover more</p><h2 id="related-title" className="mt-1 font-bebas text-[29px] uppercase leading-none sm:text-[33px]">More projects</h2></div>
              <div className="flex gap-1.5"><Control label="Previous projects" onClick={() => scrollRelated(-1)}><ArrowLeft size={15} /></Control><Control label="Next projects" onClick={() => scrollRelated(1)}><ArrowRight size={15} /></Control></div>
            </div>
            <div ref={relatedRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {related.map((item, index) => <RelatedCard key={item._id || item.slug || index} item={item} index={index} reduced={reduced} />)}
            </div>
          </section>
        )}
        <div className="mt-7 border-t border-white/[0.06] pt-4"><Link to="/projects" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500 transition hover:text-white"><ArrowLeft size={13} /> Back to all projects</Link></div>
      </div>
    </main>
  );
}
