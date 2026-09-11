// Lightweight scroll-progress engine.
// Tracks how far the user has scrolled through the hero stage (0 -> 1),
// smooths it with damping, and exposes ready-to-use CSS variables so
// nothing needs extra JS math elsewhere.

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

  // text stays fully visible until 65% through the story, then fades out
  const fade = Math.min(1, Math.max(0, 1 - Math.max(0, state.smooth - 0.65) * 2.9));
  const lift = state.smooth * -60;

  const root = document.documentElement.style;
  root.setProperty("--hero-progress", state.smooth.toFixed(4));
  root.setProperty("--hero-fade", fade.toFixed(4));
  root.setProperty("--hero-lift", lift.toFixed(2) + "px");

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
