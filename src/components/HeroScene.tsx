import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { blob, setMood } from "./blobStore";

// Phones get a lighter scene: fewer particles and a lower resolution budget
// so the 3D orb never competes with the scroll for the device's resources.
const isMobile =
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

const ORB_Z = -1.5;
const ORB_RADIUS = 0.9;
const plane = new THREE.Vector3(0, 0, ORB_Z);
const projected = new THREE.Vector3();

const Orb = () => {
  const group = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const eyes = useRef<THREE.Group>(null);
  const smile = useRef<THREE.Mesh>(null);
  const grin = useRef<THREE.Mesh>(null);
  const gasp = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(1);

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const vp = state.viewport.getCurrentViewport(state.camera, plane);
    const unitX = vp.width / state.size.width;
    const unitY = vp.height / state.size.height;
    const scroll = blob.moved ? 0 : Math.min(window.scrollY / 600, 1);

    const age = (performance.now() - blob.moodSince) / 1000;
    if (blob.mood === "relief" && age > 1.8) setMood("idle");
    if (blob.mood === "scared" && age > 1.4) setMood("idle");
    const mood = blob.mood;

    const k = 1 - Math.exp(-(mood === "dragged" ? 18 : 4) * dt);
    const shake = mood === "dragged" ? 0.07 : mood === "scared" ? 0.035 : 0;
    const tx = blob.offset.x * unitX + Math.sin(t * 61) * shake;
    const ty = vp.height * 0.3 + scroll * 1.6 - blob.offset.y * unitY + Math.cos(t * 53) * shake;
    g.position.x += (tx - g.position.x) * k;
    g.position.y += (ty - g.position.y) * k;
    g.position.z = ORB_Z;

    if (spin.current) {
      const sk = 1 - Math.exp(-4 * dt);
      spin.current.rotation.y += (state.pointer.x * 0.6 - spin.current.rotation.y) * sk + dt * 0.15;
      spin.current.rotation.x += (-state.pointer.y * 0.4 - spin.current.rotation.x) * sk;
    }

    // Mood-specific body language: squash while dragged, a deflating sigh, a fearful shrink.
    let moodScale = 1;
    if (mood === "dragged") moodScale = 1 + Math.sin(t * 30) * 0.03;
    if (mood === "relief") moodScale = 1 - Math.sin(Math.min(age / 1.2, 1) * Math.PI) * 0.12;
    if (mood === "scared") moodScale = 0.82;
    const target = (1 - scroll * 0.35) * (isMobile ? 0.6 : 0.8) * moodScale;
    scaleRef.current += (target - scaleRef.current) * (1 - Math.exp(-8 * dt));
    g.scale.setScalar(scaleRef.current);

    if (eyes.current) {
      const blink = Math.sin(t * 0.9) > 0.985 ? 0.1 : 1;
      const eyeY = mood === "dragged" ? 0.3 : mood === "relief" ? 0.08 : mood === "scared" ? 1.45 : blink;
      const eyeX = mood === "scared" ? 1.3 : 1;
      eyes.current.children.forEach(eye => {
        eye.scale.y += (eyeY - eye.scale.y) * 0.3;
        eye.scale.x += (eyeX - eye.scale.x) * 0.3;
      });
    }
    if (smile.current) smile.current.visible = mood === "idle";
    if (grin.current) grin.current.visible = mood === "dragged";
    if (gasp.current) {
      gasp.current.visible = mood === "relief" || mood === "scared";
      const o = mood === "relief" ? 0.7 + Math.sin(Math.min(age / 1.2, 1) * Math.PI) * 0.5 : 0.8;
      gasp.current.scale.setScalar(o);
    }
    if (ring.current) ring.current.rotation.z += dt * (mood === "dragged" ? 3 : 0.4);

    // Keep the DOM grab area centred on the orb.
    const handle = blob.handle;
    if (handle) {
      projected.copy(g.position).project(state.camera);
      const px = (projected.x + 1) / 2 * state.size.width;
      const py = (1 - projected.y) / 2 * state.size.height;
      const r = Math.max(36, (ORB_RADIUS * 1.15 * scaleRef.current) / unitY);
      handle.style.width = handle.style.height = `${r * 2}px`;
      handle.style.transform = `translate(${px - r}px, ${py - r}px)`;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1.2}>
        <group ref={spin}>
          <mesh>
            <icosahedronGeometry args={[ORB_RADIUS, 24]} />
            <MeshDistortMaterial color="#a78bfa" emissive="#3b0a78" emissiveIntensity={1.1} roughness={0.08} metalness={0.35} distort={0.32} speed={2.2} />
          </mesh>
          <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[1.6, 0.02, 16, 160]} />
            <meshBasicMaterial color="#e879f9" toneMapped={false} />
          </mesh>
          <mesh rotation={[Math.PI / 1.7, 0.5, 0]}>
            <torusGeometry args={[1.9, 0.01, 16, 160]} />
            <meshBasicMaterial color="#60a5fa" toneMapped={false} />
          </mesh>
        </group>
        {/* Face, always turned towards the viewer */}
        <group position={[0, 0, 1.12]}>
          <group ref={eyes} position={[0, 0.16, 0]}>
            <mesh position={[-0.24, 0, 0]}><sphereGeometry args={[0.085, 20, 20]} /><meshBasicMaterial color="#1e0538" /></mesh>
            <mesh position={[0.24, 0, 0]}><sphereGeometry args={[0.085, 20, 20]} /><meshBasicMaterial color="#1e0538" /></mesh>
          </group>
          <mesh ref={smile} position={[0, -0.06, 0]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.2, 0.03, 12, 40, Math.PI]} />
            <meshBasicMaterial color="#1e0538" />
          </mesh>
          <mesh ref={grin} position={[0, -0.16, 0]} visible={false}>
            <boxGeometry args={[0.46, 0.12, 0.04]} />
            <meshBasicMaterial color="#f5f3ff" />
          </mesh>
          <mesh ref={gasp} position={[0, -0.17, 0]} visible={false}>
            <torusGeometry args={[0.08, 0.03, 12, 32]} />
            <meshBasicMaterial color="#1e0538" />
          </mesh>
        </group>
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
    <Sparkles count={isMobile ? 55 : 120} scale={[12, 9, 4]} size={2.5} speed={0.4} color="#d8b4fe" />
  </Canvas>
);

export default HeroScene;
