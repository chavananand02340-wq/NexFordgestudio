// Lightweight scroll-progress engine.
// Tracks how far the user has scrolled through the tall hero stage (0 -> 1),
// smooths it with damping (no raw scrollY jitter), and exposes it two ways:
//  1. as a CSS custom property (--hero-progress) for cheap CSS-driven fades
//  2. as a subscribable value for the R3F scene to read inside useFrame
// Only one rAF loop runs for the whole app, so this stays cheap.

const state = { raw: 0, smooth: 0 };
const listeners = new Set();
let stageEl = null;
let rafId = null;

function computeRaw() {
  if (!stageEl) return 0;
  const rect = stageEl.getBoundingClientRect();
  const total = rect.height - window.innerHeight;
  if (total <= 0) return 0;
  const p = -rect.top / total;
  return Math.min(1, Math.max(0, p));
}

function tick() {
  state.raw = computeRaw();
  state.smooth += (state.raw - state.smooth) * 0.09;
  if (Math.abs(state.smooth - state.raw) < 0.0005) state.smooth = state.raw;

  document.documentElement.style.setProperty(
    "--hero-progress",
    state.smooth.toFixed(4)
  );
  listeners.forEach((fn) => fn(state.smooth));
  rafId = requestAnimationFrame(tick);
}

export function registerHeroStage(el) {
  stageEl = el;
  if (!rafId) tick();
}

export function unregisterHeroStage() {
  stageEl = null;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
}

export function subscribeScrollProgress(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getScrollProgress() {
  return state.smooth;
}
