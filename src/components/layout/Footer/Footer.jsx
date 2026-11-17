
import Container from "../../ui/Container";

import FooterHero from "./FooterHero";
import FooterContent from "./FooterContent";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="
        relative isolate
        overflow-hidden
        bg-[#050505]
        border-t border-white/[0.055]
      "
    >
      {/* SOFT RED TOP ACCENT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-0 z-10
          h-px w-[min(75%,680px)]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-red-500/55
          to-transparent
        "
      />

      {/* CINEMATIC AMBIENCE */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(ellipse_48%_38%_at_50%_0%,rgba(185,28,28,0.075),transparent_100%)]
        "
      />

      {/* SECONDARY CORNER LIGHT */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(ellipse_30%_35%_at_100%_100%,rgba(185,28,28,0.035),transparent_100%)]
        "
      />

      {/* SUBTLE ARCHITECTURAL GRID */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.16]
          [background-image:linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]
          [background-size:72px_72px]
          [mask-image:linear-gradient(to_bottom,black,transparent_80%)]
        "
      />

      {/* FOOTER CONTENT */}
      <Container>
        <div className="relative z-10">
          <FooterHero />
          <FooterContent />
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
}
