import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Puzzle({ type = '3x3', position, rotation, scale = 1, color }) {
  const meshRef = useRef()
  
  const rotationSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.4,
    y: (Math.random() - 0.5) * 0.4,
    z: (Math.random() - 0.5) * 0.4
  }), [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x * delta
      meshRef.current.rotation.y += rotationSpeed.y * delta
      meshRef.current.rotation.z += rotationSpeed.z * delta
    }
  })

  const dim = parseInt(type.split('x')[0]) || 3
  return <RubiksCube dim={dim} position={position} rotation={rotation} scale={scale} meshRef={meshRef} color={color} />
}

function RubiksCube({ dim, position, rotation, scale, meshRef, color }) {
  const size = 0.95 
  const gap = 0.05
  const offset = (dim - 1) / 2

  const cubes = useMemo(() => {
    const temp = []
    const start = -offset
    const end = offset
    for(let x = 0; x < dim; x++) {
      for(let y = 0; y < dim; y++) {
        for(let z = 0; z < dim; z++) {
          temp.push([x - offset, y - offset, z - offset])
        }
      }
    }
    return temp
  }, [dim, offset])

  const stickerOffset = 0.51

  return (
    <group position={position} rotation={rotation} scale={scale} ref={meshRef}>
      {cubes.map(([x, y, z], i) => (
        <mesh key={i} position={[x * (1 + gap), y * (1 + gap), z * (1 + gap)]}>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial color="#222" roughness={0.1} metalness={0.1} />
          {x === offset && <Sticker position={[stickerOffset, 0, 0]} rotation={[0, Math.PI / 2, 0]} color={color?.right || "#ef4444"} />}
          {x === -offset && <Sticker position={[-stickerOffset, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color={color?.left || "#f97316"} />}
          {y === offset && <Sticker position={[0, stickerOffset, 0]} rotation={[-Math.PI / 2, 0, 0]} color={color?.top || "#ffffff"} />}
          {y === -offset && <Sticker position={[0, -stickerOffset, 0]} rotation={[Math.PI / 2, 0, 0]} color={color?.bottom || "#eab308"} />}
          {z === offset && <Sticker position={[0, 0, stickerOffset]} rotation={[0, 0, 0]} color={color?.front || "#22c55e"} />}
          {z === -offset && <Sticker position={[0, 0, -stickerOffset]} rotation={[0, Math.PI, 0]} color={color?.back || "#3b82f6"} />}
        </mesh>
      ))}
    </group>
  )
}

function Sticker({ position, rotation, color }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.85, 0.85]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <FloatingCubes />
      <Rig />
    </>
  )
}

function FloatingCubes() {
  const puzzles = useMemo(() => [
    { type: '2x2', pos: [-3, 2, -2], scale: 0.6, speed: 1 },
    { type: '3x3', pos: [3, -2, -1], scale: 0.8, speed: 0.8 },
    { type: '4x4', pos: [-4, -2, -3], scale: 0.5, speed: 0.5 },
    { type: '2x2', pos: [4, 2, -4], scale: 0.7, speed: 0.7 },
    { type: '3x3', pos: [0, 0, -5], scale: 0.4, speed: 0.3 },
    { type: '4x4', pos: [-5, 0, -2], scale: 0.4, speed: 0.6 },
    { type: '3x3', pos: [2, 3, -3], scale: 0.5, speed: 0.9 },
  ], [])

  return (
    <>
      {puzzles.map((p, i) => (
        <Float 
            key={i} 
            speed={p.speed} 
            rotationIntensity={1} 
            floatIntensity={2} 
            floatingRange={[-1, 1]}
        >
          <Puzzle 
            type={p.type}
            position={p.pos} 
            scale={p.scale}
            color={{
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
