import { useEffect, useRef, useState } from "react";

export default function Counter({
  end,
  duration = 2000,
  suffix = "",
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    let animation;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = null;

          const animate = (time) => {
            if (!start) start = time;

            const progress = Math.min(
              (time - start) / duration,
              1
            );

            setValue(Math.floor(progress * end));

            if (progress < 1) {
              animation = requestAnimationFrame(animate);
            }
          };

          setValue(0);

          animation = requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animation);
    };
  }, [end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}