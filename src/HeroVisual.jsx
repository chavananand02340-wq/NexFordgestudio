import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { subscribeScrollProgress } from "./scrollProgress";

function ramp(p, start, end) {
  if (end === start) return p >= end ? 1 : 0;
  return Math.min(1, Math.max(0, (p - start) / (end - start)));
}

const PANEL_COLORS = ["#ff6a3d", "#8b5cf6", "#3b82f6", "#f4efe6"];

export default function HeroVisual() {
  const groupRef = useRef();
  const coreRef = useRef();
  const cageRef = useRef();
  const mainRef = useRef();
  const panelRefs = useRef([]);
  const pointer = useRef({ x: 0, y: 0 });
  const progress = useRef(0);

  useEffect(() => subscribeScrollProgress((v) => (progress.current = v)), []);

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

  const panelPositions = useMemo(
    () => [
      new THREE.Vector3(-2.1, 0.9, -0.6),
      new THREE.Vector3(2.0, 1.1, -0.9),
      new THREE.Vector3(-1.8, -1.0, -0.4),
      new THREE.Vector3(1.9, -0.9, -0.7),
    ],
    []
  );

  useFrame((state, delta) => {
    const p = progress.current;
    const { x, y } = pointer.current;

    if (groupRef.current) {
      const parallaxAmount = 1 - ramp(p, 0.15, 0.4) * 0.7;
      groupRef.current.rotation.y +=
        (x * 0.35 * parallaxAmount - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x +=
        (-y * 0.22 * parallaxAmount - groupRef.current.rotation.x) * 0.03;

      const exit = ramp(p, 0.78, 1);
      groupRef.current.position.y = exit * 1.4;
      groupRef.current.position.z = -exit * 2.2;
    }

    if (mainRef.current) {
      const spinSpeed = 0.05 + ramp(p, 0.25, 0.5) * 0.04;
      mainRef.current.rotation.z += delta * spinSpeed;
      const exit = ramp(p, 0.78, 1);
      const scale = 1 - exit * 0.35;
      mainRef.current.scale.setScalar(scale);
      mainRef.current.material.opacity = 1 - exit;
    }

    if (cageRef.current) {
      const reveal = ramp(p, 0.2, 0.5);
      const exit = ramp(p, 0.78, 1);
      const scale = 1.5 + reveal * 0.5;
      cageRef.current.scale.setScalar(scale);
      cageRef.current.rotation.y += delta * 0.08;
      cageRef.current.material.opacity = reveal * 0.55 * (1 - exit);
    }

    if (coreRef.current) {
      const reveal = ramp(p, 0.28, 0.55);
      const exit = ramp(p, 0.78, 1);
      const scale = 0.4 + reveal * 0.35;
      coreRef.current.scale.setScalar(scale);
      coreRef.current.material.opacity = reveal * (1 - exit);
      coreRef.current.material.emissiveIntensity = 1.2 + reveal * 1.8;
      coreRef.current.rotation.y -= delta * 0.15;
    }

    const panelReveal = ramp(p, 0.48, 0.7);
    const panelExit = ramp(p, 0.8, 1);
    panelRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const basePos = panelPositions[i];
      const bob = Math.sin(state.clock.elapsedTime * 0.6 + i) * 0.08;
      mesh.position.set(basePos.x, basePos.y + bob, basePos.z);
      mesh.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.3;
      mesh.material.opacity = panelReveal * 0.75 * (1 - panelExit);
      mesh.scale.setScalar(0.7 + panelReveal * 0.3);
    });
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.7}>
        <mesh ref={mainRef} castShadow={false} receiveShadow={false}>
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
            transparent
          />
        </mesh>

        <mesh ref={cageRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#ff6a3d" wireframe transparent opacity={0} />
        </mesh>

        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={1.2}
            transparent
            opacity={0}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {panelPositions.map((pos, i) => (
        <mesh key={i} ref={(el) => (panelRefs.current[i] = el)} position={pos}>
          <planeGeometry args={[0.85, 0.5]} />
          <meshBasicMaterial color={PANEL_COLORS[i]} transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <Sparkles count={30} scale={6} size={2.2} speed={0.25} color="#8b5cf6" opacity={0.45} />
      <Sparkles count={20} scale={5} size={1.6} speed={0.2} color="#3b82f6" opacity={0.35} />
    </group>
  );
        }
