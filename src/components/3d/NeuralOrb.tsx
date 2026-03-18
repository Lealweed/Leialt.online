"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function NeuralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create an interesting parametric rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float
      speed={2} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00d2ff"
          attach="material"
          distort={0.4} // Amount of distortion
          speed={2} // Speed of distortion
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </Sphere>
      
      {/* Inner solid core */}
      <Sphere args={[1.1, 32, 32]}>
        <meshStandardMaterial 
          color="#1e3a8a" 
          roughness={0.1} 
          metalness={0.9}
        />
      </Sphere>
      
      {/* Lighting to make it look premium */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#06b6d4" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
      <spotLight position={[0, 5, 5]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />
    </Float>
  );
}
