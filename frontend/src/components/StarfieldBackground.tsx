import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Starfield = ({ count = 5000 }) => {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Spread stars in a sphere around the camera
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
      
      // Random colors with cosmic theme (whites, blues, purples)
      const r = Math.random();
      if (r < 0.7) {
        // White/blue stars
        colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1; // G  
        colors[i * 3 + 2] = 1.0;                       // B
      } else if (r < 0.9) {
        // Cyan stars
        colors[i * 3] = 0.0;                           // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
        colors[i * 3 + 2] = 1.0;                       // B
      } else {
        // Purple/magenta stars
        colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.0;                       // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      }
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      // Gentle rotation
      ref.current.rotation.x += 0.0001;
      ref.current.rotation.y += 0.0002;
      
      // Subtle pulsing effect
      const time = state.clock.getElapsedTime();
      const material = ref.current.material as THREE.PointsMaterial;
      if (material) {
        material.size = 0.5 + Math.sin(time * 0.5) * 0.1;
      }
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const FloatingOrbs = () => {
  const orbCount = 8;
  const orbs = useMemo(() => {
    return Array.from({ length: orbCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 50,
      ] as [number, number, number],
      color: i % 2 === 0 ? '#00bfff' : '#ff00ff',
      scale: 0.5 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <>
      {orbs.map((orb, index) => (
        <FloatingOrb
          key={index}
          position={orb.position}
          color={orb.color}
          scale={orb.scale}
          index={index}
        />
      ))}
    </>
  );
};

const FloatingOrb = ({ position, color, scale, index }: {
  position: [number, number, number];
  color: string;
  scale: number;
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + index) * 2;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.3 + index) * 1;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const StarfieldBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <Starfield count={8000} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
};

export default StarfieldBackground;