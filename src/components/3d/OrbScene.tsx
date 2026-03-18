"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera, PresentationControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch
  
  // Prefer reduced motion check for fallback if we wanted to
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 animate-pulse border border-cyan-500/30 shadow-[0_0_100px_rgba(6,182,212,0.3)]">
        {/* Simple CSS Fallback */}
        <div className="w-3/4 h-3/4 rounded-full border border-blue-500/40 glass" />
      </div>
    );
  }

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Support high-DPI displays safely up to 2
        gl={{ antialias: true, alpha: true }} 
        performance={{ min: 0.5 }} // Allows performance degradation for 60fps
      >
        <Suspense fallback={<Loader />}>
          <Environment preset="city" />
          
          <PresentationControls
            global
            snap={true}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <NeuralOrb />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
