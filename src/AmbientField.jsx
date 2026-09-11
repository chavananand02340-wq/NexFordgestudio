import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

// A very cheap, always-present layer of soft particles fixed behind the
// entire page (not just the hero). This is what gives Services, Work,
// About and Contact a shared 3D atmosphere without each section needing
// its own heavy geometry -- just one lightweight canvas, low particle
// counts, no environment maps, no physical materials.
export default function AmbientField() {
  return (
    <div className="ambient-field" aria-hidden="true">
      <Canvas
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <Sparkles count={45} scale={[9, 26, 5]} size={1.6} speed={0.12} color="#7c3aed" opacity={0.28} />
        <Sparkles count={30} scale={[9, 26, 5]} size={1.2} speed={0.09} color="#ff6a3d" opacity={0.18} />
      </Canvas>
    </div>
  );
}
