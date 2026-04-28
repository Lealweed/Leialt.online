"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export default function NeuralOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<{ distort: number; color: THREE.Color } | null>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  // Instagram × TikTok × Telegram palette
  const color1 = useMemo(() => new THREE.Color("#E1306C"), []); // Instagram/TikTok pink
  const color2 = useMemo(() => new THREE.Color("#2AABEE"), []); // Telegram blue
  const color3 = useMemo(() => new THREE.Color("#833AB4"), []); // Instagram purple
  const color4 = useMemo(() => new THREE.Color("#00F2EA"), []); // TikTok cyan
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { width, height } = state.viewport;

    if (groupRef.current) {
      const orbitX = Math.min(width * 0.22, 2.8);
      const orbitY = Math.min(height * 0.16, 1.8);

      groupRef.current.position.x = Math.sin(t * 0.22) * orbitX;
      groupRef.current.position.y = Math.cos(t * 0.16) * orbitY;
      groupRef.current.position.z = Math.sin(t * 0.16) * 0.4;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.24;
      meshRef.current.rotation.y = t * 0.34;

      const scaleBase = 1 + Math.sin(t * 1.35) * 0.08;
      meshRef.current.scale.set(scaleBase, scaleBase, scaleBase);
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -t * 0.08;
      innerMeshRef.current.rotation.y = t * 0.14;
    }

    if (materialRef.current) {
      materialRef.current.distort = 0.5 + Math.sin(t * 0.9) * 0.3 + Math.sin(t * 2.2) * 0.1;

      const phase = ((Math.sin(t * 0.65) + 1) / 2) * 3;
      if (phase < 1) {
        materialRef.current.color.lerpColors(color1, color2, phase);
      } else if (phase < 2) {
        materialRef.current.color.lerpColors(color2, color3, phase - 1);
      } else {
        materialRef.current.color.lerpColors(color3, color4, phase - 2);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.1} rotationIntensity={0.95} floatIntensity={1.5} floatingRange={[-0.22, 0.22]}>
        <Sphere ref={meshRef} args={[3.1, 96, 96]}>
          <MeshDistortMaterial
            ref={(instance) => {
              materialRef.current = instance;
            }}
            color="#E1306C"
            attach="material"
            distort={0.5}
            speed={3.4}
            roughness={0.12}
            metalness={0.82}
            wireframe={true}
            transparent={true}
            opacity={0.86}
          />
        </Sphere>

        <Sphere ref={innerMeshRef} args={[2.1, 48, 48]}>
          <meshStandardMaterial color="#0d0212" roughness={0.12} metalness={0.88} transparent opacity={0.85} />
        </Sphere>
      </Float>

      <ambientLight intensity={0.42} />
      <directionalLight position={[10, 12, 6]} intensity={1.8} color="#E1306C" />
      <pointLight position={[-10, -8, -4]} intensity={1.55} color="#833AB4" />
      <spotLight position={[0, 8, 8]} intensity={1.1} angle={0.45} penumbra={1} color="#2AABEE" />
    </group>
  );
}
