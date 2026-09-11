import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import HeroVisual from "./HeroVisual";
import { subscribeScrollProgress } from "./scrollProgress";

function CameraRig() {
  const { camera } = useThree();
  const progress = useRef(0);

  useEffect(() => subscribeScrollProgress((v) => (progress.current = v)), []);

  useFrame(() => {
    const p = progress.current;
    // Safe range: camera never gets closer than 4.5 units, so the
    // object never fills the whole screen or gets clipped into.
    const targetZ = p < 0.5 ? 6 - p * 2 * 1.0 : 5.0 + (p - 0.5) * 2 * 0.8;
    const safeZ = Math.max(4.5, targetZ);
    const orbitX = Math.sin(p * Math.PI) * 0.5;
    const orbitY = Math.sin(p * Math.PI * 0.6) * 0.18;

    camera.position.z += (safeZ - camera.position.z) * 0.06;
    camera.position.x += (orbitX - camera.position.x) * 0.06;
    camera.position.y += (orbitY - camera.position.y) * 0.06;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene({ active = true }) {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 38 }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[-4, 3, 4]} intensity={65} color="#7c3aed" />
      <pointLight position={[4, -2, -3]} intensity={55} color="#3b82f6" />
      <pointLight position={[0, 4, -4]} intensity={30} color="#ff6a3d" />

      <Suspense fallback={null}>
        <CameraRig />
        <HeroVisual />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
