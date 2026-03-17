import { Canvas } from "@react-three/fiber";
import Starfield from "./Starfield";

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.08} />
        <pointLight position={[5, 5, 5]} intensity={0.15} color="#ffffff" />
        <pointLight position={[-5, -5, -3]} intensity={0.08} color="#cccccc" />
        <Starfield count={7000} /> {/* Increased count for global coverage */}
      </Canvas>
    </div>
  );
};

export default GlobalBackground;
