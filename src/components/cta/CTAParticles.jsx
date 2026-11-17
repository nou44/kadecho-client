
const PARTICLES = [
  { x: "9%", y: "22%", size: 2 },
  { x: "19%", y: "72%", size: 3 },
  { x: "31%", y: "13%", size: 2 },
  { x: "74%", y: "18%", size: 2 },
  { x: "88%", y: "48%", size: 3 },
  { x: "94%", y: "78%", size: 2 },
];

export default function CTAParticles() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0 z-10
        hidden overflow-hidden
        sm:block
      "
    >
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="
            absolute rounded-full
            bg-red-400/40
            shadow-[0_0_7px_rgba(239,68,68,0.25)]
          "
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
}
