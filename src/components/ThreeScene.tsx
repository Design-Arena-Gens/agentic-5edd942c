"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Stars, Html, CubeCamera, MeshReflectorMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function MirrorCube() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <CubeCamera resolution={512} frames={Infinity}>
        {(texture) => (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 2, 2]} />
            <meshPhysicalMaterial envMap={texture} roughness={0} metalness={1} reflectivity={1} clearcoat={1} clearcoatRoughness={0} />
          </mesh>
        )}
      </CubeCamera>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [6, 4, 6], fov: 50 }}>
      <color attach="background" args={[0x0b0e11]} />
      <fog attach="fog" args={[0x0b0e11, 10, 30]} />

      <hemisphereLight intensity={0.25} groundColor={0x080808} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <group position={[0, 1.25, 0]}>
        <MirrorCube />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={4}
          roughness={0.2}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0a"
          metalness={0.4}
        />
      </mesh>

      <Environment preset="city" />
      <Stars radius={60} depth={40} count={5000} factor={4} fade speed={1} />

      <OrbitControls enableDamping enablePan={false} minDistance={3} maxDistance={15} />

      <Html position={[0, 3.2, 0]} center style={{ pointerEvents: 'none' }}>
        <div className="floatingLabel">Mirror Cube</div>
      </Html>
    </Canvas>
  );
}
