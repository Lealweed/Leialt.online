"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import { useReducedMotion } from "framer-motion";
import NeuralOrb from "./NeuralOrb";

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#3b82f6" wireframe opacity={0.2} transparent />
    </mesh>
  );
}

export default function OrbScene() {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
        <div className="w-[56vmin] h-[56vmin] rounded-full border border-cyan-400/35 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 shadow-[0_0_120px_rgba(6,182,212,0.22)]" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 36 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }} 
        performance={{ min: 0.6 }}
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          <NeuralOrb />
        </Suspense>
      </Canvas>
    </div>
  );
}
