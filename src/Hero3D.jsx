import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  RoundedBox,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function NFMonogram() {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) return;

    const targetX = state.pointer.y * 0.08;
    const targetY = state.pointer.x * 0.14;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.035
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.035
    );
  });

  const metal = {
    color: "#d8e2e8",
    metalness: 0.92,
    roughness: 0.2,
  };

  return (
    <group ref={group} rotation={[0, -0.18, 0]}>
      {/* N */}
      <group position={[-0.48, 0, 0]}>
        <mesh position={[-0.32, 0, 0]}>
          <boxGeometry args={[0.14, 1.55, 0.26]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        <mesh position={[0.32, 0, 0]}>
          <boxGeometry args={[0.14, 1.55, 0.26]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        <mesh
          position={[0, 0, 0]}
          rotation={[0, 0, -Math.PI / 6]}
        >
          <boxGeometry args={[0.14, 1.65, 0.26]} />
          <meshStandardMaterial {...metal} />
        </mesh>
      </group>

      {/* F */}
      <group position={[0.52, 0, 0]}>
        <mesh position={[-0.27, 0, 0]}>
          <boxGeometry args={[0.15, 1.55, 0.26]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        <mesh position={[0.02, 0.58, 0]}>
          <boxGeometry args={[0.68, 0.15, 0.26]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        <mesh position={[-0.01, 0.05, 0]}>
          <boxGeometry args={[0.52, 0.15, 0.26]} />
          <meshStandardMaterial {...metal} />
        </mesh>
      </group>

      {/* Small center glow */}
      <mesh position={[0, 0, 0.16]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial
          color="#5de7ff"
          emissive="#28dfff"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function InterfaceFrame() {
  return (
    <group>
      {/* Main transparent browser window */}
      <RoundedBox
        args={[4.25, 2.95, 0.14]}
        radius={0.18}
        smoothness={5}
        position={[0, 0, -0.18]}
      >
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.35}
          roughness={0.18}
          transmission={0.78}
          ior={1.35}
          chromaticAberration={0.025}
          anisotropy={0.15}
          color="#b8e9ff"
        />
      </RoundedBox>

      {/* Browser top bar */}
      <mesh position={[0, 1.18, -0.08]}>
        <boxGeometry args={[3.92, 0.035, 0.035]} />
        <meshBasicMaterial
          color="#63e7ff"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Browser dots */}
      {[-1.65, -1.5, -1.35].map((x) => (
        <mesh key={x} position={[x, 1.34, -0.04]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial
            color="#66e6ff"
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}

      {/* Interface lines */}
      <group position={[0, -0.78, -0.04]}>
        <mesh position={[-0.72, 0.22, 0]}>
          <boxGeometry args={[1.15, 0.055, 0.035]} />
          <meshBasicMaterial
            color="#7eeaff"
            transparent
            opacity={0.28}
          />
        </mesh>

        <mesh position={[0.72, 0.22, 0]}>
          <boxGeometry args={[1.15, 0.055, 0.035]} />
          <meshBasicMaterial
            color="#7eeaff"
            transparent
            opacity={0.18}
          />
        </mesh>

        <mesh position={[-0.72, 0, 0]}>
          <boxGeometry args={[0.85, 0.035, 0.035]} />
          <meshBasicMaterial
            color="#7eeaff"
            transparent
            opacity={0.18}
          />
        </mesh>

        <mesh position={[0.72, 0, 0]}>
          <boxGeometry args={[0.85, 0.035, 0.035]} />
          <meshBasicMaterial
            color="#7eeaff"
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>

      {/* Cyan edge accents */}
      <mesh position={[-2.1, 0, 0]}>
        <boxGeometry args={[0.025, 2.35, 0.025]} />
        <meshBasicMaterial
          color="#45ddff"
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh position={[2.1, 0, 0]}>
        <boxGeometry args={[0.025, 2.35, 0.025]} />
        <meshBasicMaterial
          color="#45ddff"
          transparent
          opacity={0.32}
        />
      </mesh>
    </group>
  );
}

function FloatingScene() {
  return (
    <>
      <ambientLight intensity={0.55} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={2.2}
      />

      <pointLight
        position={[-3, 1, 2]}
        intensity={20}
        distance={8}
        color="#3bdfff"
      />

      <pointLight
        position={[3, -1, 1]}
        intensity={12}
        distance={7}
        color="#387bff"
      />

      <Float
        speed={0.75}
        rotationIntensity={0.12}
        floatIntensity={0.18}
      >
        <group>
          <InterfaceFrame />

          <NFMonogram />

          {/* Small floating accent */}
          <mesh position={[2.15, 1.35, 0.25]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial
              color="#63eaff"
              emissive="#35ddff"
              emissiveIntensity={4}
              toneMapped={false}
            />
          </mesh>

          <mesh position={[-2.18, -1.25, 0.2]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial
              color="#5ebcff"
              emissive="#318dff"
              emissiveIntensity={3}
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>

      <Environment preset="city" environmentIntensity={0.5} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div
      className="hero-3d"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 5.4],
          fov: 38,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <FloatingScene />
      </Canvas>

      <div className="hero-3d-fallback">
        <div className="fallback-nf">NF</div>
        <div className="fallback-frame" />
      </div>
    </div>
  );
      }
