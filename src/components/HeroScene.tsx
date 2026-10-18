import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const Orb = () => {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(window.scrollY / 600, 1);
    const k = 1 - Math.exp(-4 * dt);
    g.rotation.y += (state.pointer.x * 0.6 - g.rotation.y) * k + dt * 0.15;
    g.rotation.x += (-state.pointer.y * 0.4 - g.rotation.x) * k;
    g.position.y += (scroll * 2.2 - g.position.y) * k;
    const s = 1 - scroll * 0.35;
    g.scale.setScalar(s);
    if (ring.current) ring.current.rotation.z += dt * 0.4;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.35, 24]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            emissive="#3b0a78"
            emissiveIntensity={0.6}
            roughness={0.08}
            metalness={0.9}
            distort={0.42}
            speed={2.2}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.2, 0.025, 16, 160]} />
          <meshBasicMaterial color="#e879f9" toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 1.7, 0.5, 0]}>
          <torusGeometry args={[2.6, 0.012, 16, 160]} />
          <meshBasicMaterial color="#60a5fa" toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
};

const HeroScene = () => (
  <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={0.4} />
    <pointLight position={[4, 3, 4]} intensity={60} color="#c084fc" />
    <pointLight position={[-4, -2, 3]} intensity={40} color="#38bdf8" />
    <Environment resolution={128}>
      <Lightformer intensity={3} color="#f0abfc" position={[0, 5, -2]} scale={[10, 3, 1]} />
      <Lightformer intensity={2} color="#60a5fa" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
      <Lightformer intensity={2} color="#a78bfa" position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
    </Environment>
    <Orb />
    <Sparkles count={120} scale={[12, 7, 4]} size={2.5} speed={0.4} color="#d8b4fe" />
  </Canvas>
);

export default HeroScene;
