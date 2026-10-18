import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// Phones get a lighter scene: fewer particles and a lower resolution budget
// so the 3D orb never competes with the scroll for the device's resources.
const isMobile =
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

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
    g.position.y += (scroll * 2.2 - 0.5 - g.position.y) * k;
    const s = (1 - scroll * 0.35) * (isMobile ? 0.72 : 1);
    g.position.z = -1.5;
    g.scale.setScalar(s);
    if (ring.current) ring.current.rotation.z += dt * 0.4;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[0.9, 24]} />
          <MeshDistortMaterial
            color="#a78bfa"
            emissive="#3b0a78"
            emissiveIntensity={1.1}
            roughness={0.08}
            metalness={0.35}
            distort={0.42}
            speed={2.2}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.6, 0.02, 16, 160]} />
          <meshBasicMaterial color="#e879f9" toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 1.7, 0.5, 0]}>
          <torusGeometry args={[1.9, 0.01, 16, 160]} />
          <meshBasicMaterial color="#60a5fa" toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
};

const HeroScene = () => (
  <Canvas
    dpr={isMobile ? [1, 1.25] : [1, 1.75]}
    camera={{ position: [0, 0, 7], fov: 45 }}
    gl={{ antialias: !isMobile, alpha: true }}
  >
    <ambientLight intensity={0.4} />
    <pointLight position={[4, 3, 4]} intensity={60} color="#c084fc" />
    <pointLight position={[-4, -2, 3]} intensity={40} color="#38bdf8" />
    <Environment resolution={isMobile ? 64 : 128}>
      <Lightformer intensity={3} color="#f0abfc" position={[0, 5, -2]} scale={[10, 3, 1]} />
      <Lightformer intensity={2} color="#60a5fa" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
      <Lightformer intensity={2} color="#a78bfa" position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
    </Environment>
    <Orb />
    <Sparkles count={isMobile ? 55 : 120} scale={[12, 7, 4]} size={2.5} speed={0.4} color="#d8b4fe" />
  </Canvas>
);

export default HeroScene;
