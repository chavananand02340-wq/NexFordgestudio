import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import HeroBoundary from "./HeroBoundary";

export default function AmbientField() {
  return (
    <div className="ambient-field" aria-hidden="true">
      <HeroBoundary>
        <Canvas
          dpr={1}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <Sparkles count={45} scale={[9, 26, 5]} size={1.6} speed={0.12} color="#7c3aed" opacity={0.28} />
          <Sparkles count={30} scale={[9, 26, 5]} size={1.2} speed={0.09} color="#ff6a3d" opacity={0.18} />
        </Canvas>
      </HeroBoundary>
    </div>
  );
}
