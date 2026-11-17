
export default function CTAOverlay() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0 z-10
        overflow-hidden
      "
    >
      {/* READABILITY */}
      <div
        className="
          absolute inset-0
          bg-black/45
        "
      />

      {/* CINEMATIC GRADIENT */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-[#050505]/75
          via-black/30
          to-[#050505]/95
        "
      />

      {/* SUBTLE RED AMBIENCE */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_50%_45%,rgba(185,28,28,0.12),transparent_65%)]
        "
      />

      {/* SIDE VIGNETTE */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(90deg,rgba(5,5,5,0.45),transparent_25%,transparent_75%,rgba(5,5,5,0.45))]
        "
      />
    </div>
  );
}
