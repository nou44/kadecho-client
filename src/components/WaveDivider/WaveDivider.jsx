import { useEffect, useRef } from "react";
import { startWave } from "./wave";

export default function WaveDivider() {
  const wave1 = useRef(null);
  const wave2 = useRef(null);

  useEffect(() => {
    const destroyWave1 = startWave(wave1.current, {
      color: "#dc2626",
      amplitude: 10,
      wavelength: 0.018,
      speed: 0.035,
      opacity: 1,
    });

    const destroyWave2 = startWave(wave2.current, {
      color: "#ef4444",
      amplitude: 14,
      wavelength: 0.015,
      speed: 0.022,
      opacity: 0.35,
    });

    return () => {
      destroyWave1();
      destroyWave2();
    };
  }, []);

  return (
    <div
      className="
        relative
        w-full
        h-10
        overflow-hidden
        pointer-events-none
        select-none
         bg-[#050505]
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-10

          bg-red-600/20

          blur-2xl
        "
      />

      {/* Wave 2 */}

      <canvas
        ref={wave2}
        className="
          absolute
          inset-0

          w-full
          h-full

          opacity-40
          blur-[1px]
        "
      />

      {/* Wave 1 */}

      <canvas
        ref={wave1}
        className="
          absolute
          inset-0

          w-full
          h-full
        "
      />
    </div>
  );
}