"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function NeuralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  // Define colors for the evolution shift
  const color1 = useMemo(() => new THREE.Color("#00d2ff"), []); // Cyan
  const color2 = useMemo(() => new THREE.Color("#4f46e5"), []); // Indigo/Purple
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      
      // Pulse scale
      const scaleBase = 1 + Math.sin(t * 1.2) * 0.05;
      meshRef.current.scale.set(scaleBase, scaleBase, scaleBase);
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -t * 0.1;
      innerMeshRef.current.rotation.y = t * 0.2;
    }

    if (materialRef.current) {
      // Evolving the distortion to change shape drastically over time
      // Oscillates between ~0.2 (smoothish) and ~0.8 (wild shape)
      materialRef.current.distort = 0.5 + Math.sin(t * 0.6) * 0.4; 
      
      // Interpolate colors smoothly back and forth
      const lerpFactor = (Math.sin(t * 0.5) + 1) / 2; // maps -1..1 to 0..1
      materialRef.current.color.lerpColors(color1, color2, lerpFactor);
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={1} 
      floatIntensity={1.5} 
      floatingRange={[-0.1, 0.1]} 
    >
      <Sphere ref={meshRef} args={[2.4, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#00d2ff"
          attach="material"
          distort={0.4} 
          speed={3} 
          roughness={0.1}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </Sphere>
      
      {/* Inner solid core */}
      <Sphere ref={innerMeshRef} args={[1.7, 32, 32]}>
        <meshStandardMaterial 
          color="#0f172a" 
          roughness={0.1} 
          metalness={0.9}
        />
      </Sphere>
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#06b6d4" />
      <pointLight position={[-10, -10, -5]} intensity={2} color="#6366f1" />
      <spotLight position={[0, 5, 5]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />
    </Float>
  );
}
