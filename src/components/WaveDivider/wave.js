export function startWave(canvas, options = {}) {
  const ctx = canvas.getContext("2d");

  const config = {
    color: options.color || "#dc2626",
    amplitude: options.amplitude || 12,
    wavelength: options.wavelength || 0.018,
    speed: options.speed || 0.03,
    opacity: options.opacity ?? 1,
  };

  let animationId;
  let time = 0;

  function resize() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  resize();

  function draw() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();
    ctx.moveTo(0, h);

    for (let x = 0; x <= w; x++) {
      const y =
        h / 2 +
        Math.sin(x * config.wavelength + time) *
          config.amplitude;

      ctx.lineTo(x, y);
    }

    ctx.lineTo(w, h);
    ctx.closePath();

    ctx.globalAlpha = config.opacity;
    ctx.fillStyle = config.color;
    ctx.fill();

    time += config.speed;

    animationId = requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", resize);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
  };
}