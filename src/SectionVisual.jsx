import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";

// One shared, cheap Canvas setup that can render any primitive shape.
// Keeps every section visually distinct (no repeated "same box everywhere"
// feeling) while reusing all the mouse-parallax / lighting / performance
// logic in one place instead of duplicating a new component per shape.
//
// IMPORTANT: platonic solids (octahedron, dodecahedron, tetrahedron) use a
// detail level of 1, not 0. A detail-0 solid has only a handful of huge
// flat faces, so as it slowly rotates there are long stretches where every
// visible face points away from both lights and the whole object reads as
// a black hole against the dark background. Subdividing gives it many more
// small facets, so something is almost always catching a highlight --
// exactly why the Work section's torusKnot (a continuously curved surface)
// never goes fully dark.
const GEOMETRIES = {
  octahedron: (s) => <octahedronGeometry args={[s, 1]} />,
  dodecahedron: (s) => <dodecahedronGeometry args={[s, 1]} />,
  tetrahedron: (s) => <tetrahedronGeometry args={[s * 1.15, 1]} />,
  sphere: (s) => <sphereGeometry args={[s * 0.9, 32, 32]} />,
  box: (s) => <boxGeometry args={[s * 1.2, s * 1.2, s * 1.2]} />,
  cone: (s) => <coneGeometry args={[s * 0.85, s * 1.55, 32]} />,
  torus: (s) => <torusGeometry args={[s * 0.78, s * 0.3, 16, 60]} />,
  cylinder: (s) => <cylinderGeometry args={[s * 0.62, s * 0.62, s * 1.35, 32]} />,
  capsule: (s) => <capsuleGeometry args={[s * 0.52, s * 0.72, 4, 16]} />,
};

const FACETED = new Set(["octahedron", "dodecahedron", "tetrahedron"]);

function Shape({ shape, size, color, glow }) {
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
    meshRef.current.rotation.y += delta * 0.16;
    meshRef.current.rotation.x +=
      (-pointer.current.y * 0.15 - meshRef.current.rotation.x) * 0.02;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef}>
        {GEOMETRIES[shape](size)}
        <meshPhysicalMaterial
          color={color}
          metalness={glow ? 0.4 : 0.85}
          roughness={glow ? 0.25 : 0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={2.6}
          flatShading={FACETED.has(shape)}
          emissive={glow ? color : "#000000"}
          emissiveIntensity={glow ? 0.45 : 0}
        />
      </mesh>
    </Float>
  );
}

export default function SectionVisual({
  shape = "octahedron",
  color = "#12121a",
  rimColor = "#3b82f6",
  rimColor2 = "#ff6a3d",
  size = 0.95,
  glow = false,
}) {
  return (
    <div className="section-visual-wrap" aria-hidden="true">
      <div className="section-visual">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 4.2], fov: 40 }}
        >
          <ambientLight intensity={0.28} />
          <pointLight position={[-3, 2, 3]} intensity={60} color={rimColor} />
          <pointLight position={[3, -1, -2]} intensity={55} color={rimColor2} />
          <pointLight position={[0, 1.5, 4]} intensity={22} color="#ffffff" />
          <Shape shape={shape} size={size} color={color} glow={glow} />
          <Environment preset="night" />
        </Canvas>
      </div>
    </div>
  );
}
