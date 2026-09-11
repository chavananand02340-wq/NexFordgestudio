import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import HeroVisual from "./HeroVisual";

export default function HeroScene() {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.5], fov: 36 }}
    >
      <ambientLight intensity={0.12} />
      <pointLight position={[-4, 3, 4]} intensity={70} color="#7c3aed" />
      <pointLight position={[4, -2, -3]} intensity={60} color="#3b82f6" />
      <pointLight position={[0, 0, -5]} intensity={35} color="#ff6a3d" />

      <Suspense fallback={null}>
        <HeroVisual />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
