import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

function LoadingPlaceholder() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 30]} />
      <meshStandardMaterial color="#444444" />
    </mesh>
  );
}

export function PotholeViewer() {
  return (
    <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden relative">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }}>
        <Suspense fallback={<LoadingPlaceholder />}>
          {/* This will be replaced with the actual mesh once Azure Storage is integrated */}
          <LoadingPlaceholder />
        </Suspense>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={50}
        />
      </Canvas>
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded shadow">
        <p className="text-sm font-medium">Latest Road Scan</p>
        <p className="text-xs text-gray-600">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}
