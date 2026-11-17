
import { useEffect, useRef, useState } from "react";
import "./MaterialsMarquee.css";

const LOGOS = [
  { name: "Metal", file: "metal.webp" },
  { name: "Wood", file: "wood.webp" },
  { name: "Glass", file: "glass.webp" },
  { name: "Steel", file: "steel.webp" },
  { name: "Aluminium", file: "aluminium.webp" },
  { name: "Kadecho", file: "kadecho.webp" },
  { name: "Livraison", file: "livraison.webp" },
  { name: "Nouhe Dev", file: "nouhe-dev.webp" },
];

const BASE = `${import.meta.env.BASE_URL}images/logos/`;

export default function MaterialsMarquee() {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isVisible = false;

    const update = () => {
      setIsActive(isVisible && !document.hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Materials and craftsmanship"
      className="materials-section"
    >
      <div className="materials-header">
        <span className="materials-kicker">
          MATERIALS & CRAFTSMANSHIP
        </span>
        <span className="materials-index">01 — 08</span>
      </div>

      <div className="materials-viewport">
        <div
          className={`materials-track ${
            isActive ? "is-running" : ""
          }`}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="materials-group"
              aria-hidden={copy === 1}
            >
              {LOGOS.map((logo) => (
                <div
                  key={`${copy}-${logo.file}`}
                  className="materials-item"
                >
                  <div className="materials-logo">
                    <img
                      src={`${BASE}${logo.file}`}
                      alt={copy === 0 ? logo.name : ""}
                      width={960}
                      height={320}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />

                    <span
                      aria-hidden="true"
                      className="materials-logo-shine"
                      style={{
                        WebkitMaskImage: `url("${BASE}${logo.file}")`,
                        maskImage: `url("${BASE}${logo.file}")`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
