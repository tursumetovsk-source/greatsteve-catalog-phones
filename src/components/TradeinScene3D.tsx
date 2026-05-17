import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const BASE = '/3d%20models';
const easeOutExpo = (t: number) => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);

function CameraUpdater({ mobile }: { mobile: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov = mobile ? 75 : 45;
    cam.position.set(0, mobile ? 1.8 : 0.8, mobile ? 4.5 : 3.8);
    cam.updateProjectionMatrix();
  }, [camera, mobile]);
  return null;
}

function IPhoneModel({ mobile }: { mobile: boolean }) {
  const { scene } = useGLTF(`${BASE}/iphone_15_pro.glb`);
  const ref = useRef<THREE.Group>(null);
  const mats = useRef<THREE.Material[]>([]);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const ms = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      ms.forEach(m => { m.transparent = true; m.opacity = 0; m.needsUpdate = true; });
      mats.current.push(...ms);
    });
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    if (startTime.current === null) startTime.current = t;
    const elapsed = t - startTime.current;
    const intro = easeOutExpo(Math.min(1, Math.max(0, (elapsed - 2.4) / 0.9)));
    const baseY = mobile ? -1.6 : -0.9;
    const floatY = baseY + Math.sin(t * 0.8) * 0.08;
    ref.current.position.y = floatY + (1 - intro) * -5.0;
    ref.current.rotation.x = -0.1 + state.pointer.y * 0.04;
    ref.current.rotation.y = state.pointer.x * 0.06 + Math.sin(t * 0.3) * 0.03;
    mats.current.forEach(m => { m.opacity = intro; });
  });

  return (
    <group ref={ref}>
      <group rotation={[0, 0, Math.PI / 2]}>
        <primitive object={scene} scale={22} rotation={[0, Math.PI / 2, 0]} />
      </group>
    </group>
  );
}

function MacBookModel({ mobile }: { mobile: boolean }) {
  const { scene } = useGLTF(`${BASE}/macbook.glb`);
  const ref = useRef<THREE.Group>(null);
  const mats = useRef<THREE.Material[]>([]);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const ms = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      ms.forEach(m => { m.transparent = true; m.opacity = 0; m.needsUpdate = true; });
      mats.current.push(...ms);
    });
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    if (startTime.current === null) startTime.current = t;
    const elapsed = t - startTime.current;
    const intro = easeOutExpo(Math.min(1, Math.max(0, (elapsed - 0.2) / 0.9)));
    const floatY = 0.1 + Math.sin(t * 0.9 + 1.5) * 0.14;
    ref.current.position.y = floatY + (1 - intro) * -5.0;
    ref.current.rotation.y = t * 0.2 + state.pointer.x * 0.05;
    mats.current.forEach(m => { m.opacity = intro; });
  });

  return <primitive ref={ref} object={scene} scale={mobile ? 2.2 : 3} position={[mobile ? -1.1 : -2.4, mobile ? -1.1 : 0.1, -0.5]} rotation={[0, 0.4, 0]} />;
}

function AppleWatchModel({ mobile }: { mobile: boolean }) {
  const { scene } = useGLTF(`${BASE}/apple_watch_series_7_-_free_watch-face_sdctm.glb`);
  const ref = useRef<THREE.Group>(null);
  const mats = useRef<THREE.Material[]>([]);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const ms = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      ms.forEach(m => { m.transparent = true; m.opacity = 0; m.needsUpdate = true; });
      mats.current.push(...ms);
    });
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    if (startTime.current === null) startTime.current = t;
    const elapsed = t - startTime.current;
    const intro = easeOutExpo(Math.min(1, Math.max(0, (elapsed - 1.4) / 0.9)));
    const floatY = 0.6 + Math.sin(t * 1.3 + 2.0) * 0.13;
    ref.current.position.y = floatY + (1 - intro) * -5.0;
    ref.current.rotation.y = t * 0.3 + state.pointer.x * 0.06;
    mats.current.forEach(m => { m.opacity = intro; });
  });

  return <primitive ref={ref} object={scene} scale={mobile ? 8 : 10} position={[mobile ? 1.0 : 1.8, mobile ? -0.7 : 0.6, 0.2]} rotation={[0.1, -0.3, 0]} />;
}

export default function TradeinScene3D({ mobile }: { mobile: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 3.8], fov: 45 }}
      dpr={mobile ? 1 : [1, 2]}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); }}
    >
      <CameraUpdater mobile={mobile} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#86efac" />
      <spotLight position={[0, 8, 0]} intensity={0.8} angle={0.5} />
      <Suspense fallback={null}>
        <IPhoneModel mobile={mobile} />
        <MacBookModel mobile={mobile} />
        <AppleWatchModel mobile={mobile} />
        <Environment preset="city" background={false} />
        <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={16} blur={2.5} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/3d%20models/iphone_15_pro.glb');
useGLTF.preload('/3d%20models/macbook.glb');
useGLTF.preload('/3d%20models/apple_watch_series_7_-_free_watch-face_sdctm.glb');
