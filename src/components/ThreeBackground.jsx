import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function RubiksCube({ position, rotation, scale = 1, color }) {
  const meshRef = useRef()
  
  // Random rotation speed
  const rotationSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.5,
    y: (Math.random() - 0.5) * 0.5,
    z: (Math.random() - 0.5) * 0.5
  }), [])

  useFrame((state, delta) => {
    meshRef.current.rotation.x += rotationSpeed.x * delta
    meshRef.current.rotation.y += rotationSpeed.y * delta
    meshRef.current.rotation.z += rotationSpeed.z * delta
  })

  // Create a 3x3x3 grid of cubes
  const size = 0.95 // size of each sub-cube
  const gap = 0.05
  const offset = 1 // distance from center

  const cubes = useMemo(() => {
    const temp = []
    for(let x = -1; x <= 1; x++) {
      for(let y = -1; y <= 1; y++) {
        for(let z = -1; z <= 1; z++) {
          temp.push([x, y, z])
        }
      }
    }
    return temp
  }, [])

  return (
    <group position={position} rotation={rotation} scale={scale} ref={meshRef}>
      {cubes.map(([x, y, z], i) => (
        <mesh key={i} position={[x * (offset + gap), y * (offset + gap), z * (offset + gap)]}>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial 
            color="#222" 
            roughness={0.1}
            metalness={0.1}
          />
          {/* Add colored stickers slightly offset */}
          {/* Right (x+) */}
          {x === 1 && <Sticker position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} color={color?.right || "#ef4444"} />}
          {/* Left (x-) */}
          {x === -1 && <Sticker position={[-0.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color={color?.left || "#f97316"} />}
          {/* Top (y+) */}
          {y === 1 && <Sticker position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} color={color?.top || "#ffffff"} />}
          {/* Bottom (y-) */}
          {y === -1 && <Sticker position={[0, -0.51, 0]} rotation={[Math.PI / 2, 0, 0]} color={color?.bottom || "#eab308"} />}
          {/* Front (z+) */}
          {z === 1 && <Sticker position={[0, 0, 0.51]} rotation={[0, 0, 0]} color={color?.front || "#22c55e"} />}
          {/* Back (z-) */}
          {z === -1 && <Sticker position={[0, 0, -0.51]} rotation={[0, Math.PI, 0]} color={color?.back || "#3b82f6"} />}
        </mesh>
      ))}
    </group>
  )
}

function Sticker({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.85, 0.85]} />
      <meshStandardMaterial color={color} roughnes={0.8} />
    </mesh>
  )
}

function Scene() {
  const { mouse, viewport } = useThree()
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />

      {/* Multiple floating cubes */}
      <FloatingCubes />
      
      {/* Interactive mouse effect - camera slightly follows mouse */}
      <Rig />
    </>
  )
}

function FloatingCubes() {
  const cubes = useMemo(() => [
    { pos: [-3, 2, -2], scale: 0.6, speed: 1 },
    { pos: [3, -2, -1], scale: 0.8, speed: 0.8 },
    { pos: [-4, -2, -3], scale: 0.5, speed: 0.5 },
    { pos: [4, 2, -4], scale: 0.7, speed: 0.7 },
    { pos: [0, 0, -5], scale: 0.4, speed: 0.3 },
  ], [])

  return (
    <>
      {cubes.map((cube, i) => (
        <Float 
            key={i} 
            speed={cube.speed} 
            rotationIntensity={1} 
            floatIntensity={2} 
            floatingRange={[-1, 1]}
        >
          <RubiksCube 
            position={cube.pos} 
            scale={cube.scale}
            color={{
                // Randomize sticker colors slightly per cube if desired
                top: i % 2 === 0 ? "#ffffff" : "#eab308",
                bottom: i % 2 === 0 ? "#eab308" : "#ffffff",
            }}
          />
        </Float>
      ))}
    </>
  )
}

function Rig() {
  const { camera, mouse } = useThree()
  useFrame((state, delta) => {
    // Smoothly interpolate camera position based on mouse
    const x = (mouse.x * 2) 
    const y = (mouse.y * 2) 
    camera.position.lerp(new THREE.Vector3(x, y, 10), 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40 grayscale-[20%]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
