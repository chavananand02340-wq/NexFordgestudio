import { lazy, Suspense, useEffect, useState } from "react";
import HeroBoundary from "./HeroBoundary";

const HeroScene = lazy(() => import("./HeroScene"));

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function StaticFallback() {
  return (
    <div className="hero-3d-fallback" aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none">
        <polygon
          points="100,20 170,70 145,160 55,160 30,70"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <line x1="100" y1="20" x2="100" y2="105" stroke="#ffffff" strokeWidth="1" />
        <line x1="30" y1="70" x2="100" y2="105" stroke="#ffffff" strokeWidth="1" />
        <line x1="170" y1="70" x2="100" y2="105" stroke="#ffffff" strokeWidth="1" />
        <line x1="55" y1="160" x2="100" y2="105" stroke="#ffffff" strokeWidth="1" />
        <line x1="145" y1="160" x2="100" y2="105" stroke="#ffffff" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function HeroVisual() {
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setSupported(isWebGLAvailable());
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setReady(true);
  }, []);

  if (!ready) return <div className="hero-3d-fallback" aria-hidden="true" />;
  if (!supported) return <StaticFallback />;

  return (
    <HeroBoundary fallback={<StaticFallback />}>
      <Suspense fallback={<div className="hero-3d-fallback" aria-hidden="true" />}>
        <HeroScene reduceMotion={reduceMotion} />
      </Suspense>
    </HeroBoundary>
  );
}
