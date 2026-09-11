import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshReflectorMaterial } from "@react-three/drei";

function Object3D({ allowParallax }) {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x += delta * 0.04;

    if (allowParallax) {
      mesh.current.rotation.y +=
        (state.pointer.x * 0.3 - mesh.current.rotation.y * 0.02) * 0.01;
      mesh.current.rotation.x +=
        (state.pointer.y * -0.2 - mesh.current.rotation.x * 0.02) * 0.01;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          color="#f2f2f2"
          metalness={1}
          roughness={0.15}
          flatShading
        />
      </mesh>
    </Float>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
      <planeGeometry args={[14, 14]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={35}
        roughness={1}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        metalness={0.4}
      />
    </mesh>
  );
}

function Scene({ allowParallax }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[-3, 2, 3]} intensity={55} color="#7c5cff" />
      <pointLight position={[3, -1, 4]} intensity={35} color="#4fd8ff" />
      <directionalLight position={[0, 5, 2]} intensity={0.35} color="#ffffff" />

      <Object3D allowParallax={allowParallax} />
      <Floor />
    </>
  );
}

export default function HeroScene({ reduceMotion }) {
  const allowParallax =
    !reduceMotion && typeof window !== "undefined" && window.innerWidth >= 900;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0.3, 6], fov: 40 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene allowParallax={allowParallax} />
      </Suspense>
    </Canvas>
  );
}
