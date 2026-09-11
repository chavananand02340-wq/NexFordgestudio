import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

export default function HeroVisual() {
  const groupRef = useRef();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const point = e.touches ? e.touches[0] : e;
      if (!point) return;
      const nx = (point.clientX / window.innerWidth) * 2 - 1;
      const ny = (point.clientY / window.innerHeight) * 2 - 1;
      target.current = { x: nx, y: ny };
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const { x, y } = target.current;
    groupRef.current.rotation.y += (x * 0.35 - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (-y * 0.22 - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.z += delta * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh castShadow={false} receiveShadow={false}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshPhysicalMaterial
            color="#15151b"
            metalness={1}
            roughness={0.14}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
            envMapIntensity={1.6}
            flatShading
          />
        </mesh>
      </Float>

      <Sparkles
        count={36}
        scale={6}
        size={2.2}
        speed={0.25}
        color="#8b5cf6"
        opacity={0.5}
      />
      <Sparkles
        count={24}
        scale={5}
        size={1.6}
        speed={0.2}
        color="#3b82f6"
        opacity={0.4}
      />
    </group>
  );
}
