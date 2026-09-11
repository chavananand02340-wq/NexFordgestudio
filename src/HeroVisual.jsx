import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

export default function HeroVisual() {
  const groupRef = useRef();
  const mainRef = useRef();
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
    const { x, y } = pointer.current;

    if (groupRef.current) {
      groupRef.current.rotation.y += (x * 0.35 - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (-y * 0.22 - groupRef.current.rotation.x) * 0.03;
    }

    if (mainRef.current) {
      mainRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.8}>
        <mesh ref={mainRef} castShadow={false} receiveShadow={false}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshPhysicalMaterial
            color="#0c0c10"
            metalness={1}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={1}
            envMapIntensity={2.2}
            flatShading
          />
        </mesh>
      </Float>

      <Sparkles count={35} scale={7} size={2} speed={0.22} color="#8b5cf6" opacity={0.5} />
      <Sparkles count={22} scale={6} size={1.5} speed={0.18} color="#3b82f6" opacity={0.4} />
    </group>
  );
}
