/**
 * ASCII plasma renderer.
 *
 * Framework-free on purpose: `mountAsciiPlasma(el, options)` returns the same
 * `{ update, destroy }` contract the AIDesigner effects runtime expects from a
 * registered effect, so this can be swapped for the hosted runtime (or
 * registered with it via `window.AIFX.register`) without touching React code.
 *
 * Characters carry the density; colour is a single phosphor green at three brightness tiers. Three
 * brightness tiers are drawn as three strings per row, which keeps the whole
 * field at ~3 fillText calls per row per frame instead of one per cell.
 */

export type PlasmaOptions = {
  /** Animation speed multiplier. */
  speed?: number;
  /** Target font size in CSS pixels. Larger = coarser, fewer cells. */
  cell?: number;
  /** Peak opacity of the brightest tier, 0–1. */
  intensity?: number;
  /** Frames per second cap. */
  fps?: number;
};

export type PlasmaInstance = {
  update: (next: PlasmaOptions) => void;
  destroy: () => void;
};

const RAMP = " .:-=+*#%@";

/** Brightness tier boundaries (fraction of the ramp). */
const TIER_MAX = [0.42, 0.6, 1.01];

/** Colours come from CSS custom properties so the field follows the theme. */
function readTierColors(): string[] {
  const css = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) =>
    css.getPropertyValue(name).trim() || fallback;
  const rgb = read("--plasma-rgb", "110, 231, 160");
  const hi = read("--plasma-hi-rgb", "175, 247, 200");
  return [
    `rgba(${rgb}, ${read("--plasma-a0", "0.22")})`,
    `rgba(${rgb}, ${read("--plasma-a1", "0.46")})`,
    `rgba(${hi}, ${read("--plasma-a2", "0.85")})`,
  ];
}

const DEFAULTS: Required<PlasmaOptions> = {
  speed: 1,
  cell: 14,
  intensity: 1,
  fps: 30,
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function mountAsciiPlasma(
  host: HTMLElement,
  options: PlasmaOptions = {},
): PlasmaInstance {
  let opts = { ...DEFAULTS, ...options };

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block;";
  host.appendChild(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });

  let cols = 0;
  let rows = 0;
  let charW = 0;
  let rowH = 0;
  let fontSize = opts.cell;
  let dpr = 1;
  let grid = new Uint8Array(0);
  let raf = 0;
  let last = 0;
  let clock = 0;
  let running = false;
  let visible = true;
  let onScreen = true;
  let destroyed = false;
  let tierColors = readTierColors();

  const reduced = prefersReducedMotion();

  function measure() {
    if (!ctx) return;
    const rect = host.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));

    tierColors = readTierColors();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    // Coarser cells on small screens: the field stays legible instead of
    // turning into noise, and the cell count stays low on weak hardware.
    fontSize = w < 640 ? Math.max(11, opts.cell - 2) : opts.cell;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `400 ${fontSize}px "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textBaseline = "top";

    charW = ctx.measureText("M").width || fontSize * 0.6;
    rowH = Math.round(fontSize * 1.12);

    cols = Math.max(1, Math.ceil(w / charW));
    rows = Math.max(1, Math.ceil(h / rowH));

    if (grid.length !== cols * rows) grid = new Uint8Array(cols * rows);
  }

  function field(time: number) {
    const invCols = 1 / cols;
    const invRows = 1 / rows;

    for (let y = 0; y < rows; y++) {
      const ny = y * invRows;
      const rowTerm = Math.sin(ny * 5.1 + time * 0.8);
      const dy = ny - 0.5;
      const rowOffset = y * cols;

      for (let x = 0; x < cols; x++) {
        const nx = x * invCols;
        const dx = (nx - 0.5) * 1.6;

        const v =
          Math.sin(nx * 6.2 + time) +
          rowTerm +
          Math.sin((nx + ny) * 4.4 + time * 0.55) +
          Math.sin(Math.sqrt(dx * dx + dy * dy) * 11.0 - time * 1.1);

        // 0..1
        let i = (v + 4) * 0.125;

        // Thin the field toward the edges so it blends into the page
        // instead of stopping at a hard rectangle.
        const edge =
          Math.min(1, nx * 4) *
          Math.min(1, (1 - nx) * 4) *
          Math.min(1, ny * 3.2) *
          Math.min(1, (1 - ny) * 2.4);

        i *= 0.35 + 0.65 * edge;

        grid[rowOffset + x] = Math.max(
          0,
          Math.min(RAMP.length - 1, Math.round(i * (RAMP.length - 1))),
        );
      }
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = opts.intensity;

    const buckets: string[][] = [[], [], []];

    for (let y = 0; y < rows; y++) {
      const rowOffset = y * cols;
      buckets[0].length = 0;
      buckets[1].length = 0;
      buckets[2].length = 0;

      for (let x = 0; x < cols; x++) {
        const idx = grid[rowOffset + x];
        const ratio = idx / (RAMP.length - 1);
        const tier = ratio < TIER_MAX[0] ? 0 : ratio < TIER_MAX[1] ? 1 : 2;
        const char = RAMP[idx];

        buckets[0].push(tier === 0 ? char : " ");
        buckets[1].push(tier === 1 ? char : " ");
        buckets[2].push(tier === 2 ? char : " ");
      }

      const top = y * rowH;
      for (let t = 0; t < 3; t++) {
        const line = buckets[t].join("");
        if (line.trim() === "") continue;
        ctx.fillStyle = tierColors[t];
        ctx.fillText(line, 0, top);
      }
    }

    ctx.globalAlpha = 1;
  }

  function renderOnce(time: number) {
    field(time);
    draw();
  }

  function frame(now: number) {
    if (destroyed) return;
    raf = window.requestAnimationFrame(frame);

    const minDelta = 1000 / opts.fps;
    const delta = now - last;
    if (delta < minDelta) return;
    last = now;

    clock += (delta / 1000) * opts.speed;
    renderOnce(clock);
  }

  function start() {
    if (destroyed || running || reduced) return;
    if (!visible || !onScreen) return;
    running = true;
    last = performance.now();
    raf = window.requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  }

  const resizeObserver = new ResizeObserver(() => {
    measure();
    renderOnce(clock);
  });
  resizeObserver.observe(host);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      if (onScreen) start();
      else stop();
    },
    { threshold: 0 },
  );
  intersectionObserver.observe(host);

  function onVisibility() {
    visible = document.visibilityState === "visible";
    if (visible) start();
    else stop();
  }
  document.addEventListener("visibilitychange", onVisibility);

  measure();
  renderOnce(clock);
  if (!reduced) start();

  // The first measurement can land on a fallback face. Once the real mono
  // font is ready, re-measure so the cell grid matches its advance width.
  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.ready
      .then(() => {
        if (destroyed) return;
        measure();
        renderOnce(clock);
      })
      .catch(() => {});
  }

  return {
    update(next: PlasmaOptions) {
      opts = { ...opts, ...next };
      measure();
      renderOnce(clock);
    },
    destroy() {
      destroyed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.remove();
    },
  };
}
