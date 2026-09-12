import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";

function WorkShape() {
  const meshRef = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const point = e.touches ? e.touches[0] : e;
      if (!point) return;
      pointer.current = {
        x: (point.clientX / window.innerWidth) * 2 - 1,
        y: (point.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x +=
      (-pointer.current.y * 0.15 - meshRef.current.rotation.x) * 0.02;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.75, 0.24, 120, 16]} />
        <meshPhysicalMaterial
          color="#12121a"
          metalness={0.9}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function WorkVisual() {
  return (
    <div className="work-visual" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[-3, 2, 3]} intensity={40} color="#3b82f6" />
        <pointLight position={[3, -1, -2]} intensity={35} color="#ff6a3d" />
        <WorkShape />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
