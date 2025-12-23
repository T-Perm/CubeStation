import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

function Puzzle({ type = '3x3', position, scale = 1, color, reduceMotion, globalMouse }) {
  const groupRef = useRef()
  
  // Calculate depth factor: 0 is far, 1 is close
  const depthFactor = useMemo(() => {
    const z = Math.abs(position[2])
    return Math.max(0.2, 1 - (z / 25))
  }, [position])

  const rotationSpeed = useMemo(() => ({
    x: (Math.random() - 0.5) * 0.3,
    y: (Math.random() - 0.5) * 0.3,
    z: (Math.random() - 0.5) * 0.3
  }), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Base Idle Rotation
    groupRef.current.rotation.x += rotationSpeed.x * delta
    groupRef.current.rotation.y += rotationSpeed.y * delta
    groupRef.current.rotation.z += rotationSpeed.z * delta

    if (!reduceMotion && globalMouse.current) {
      const mouse = globalMouse.current;
      
      // 1. Horizontal Mouse Parallax Shift (Opposite Direction)
      const targetPosX = position[0] - (mouse.x * 4.5 * depthFactor)
      const targetPosY = position[1] - (mouse.y * 0.5 * depthFactor)
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.15)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.15)

      // 2. Horizontal Tilt Effect
      const tiltY = -mouse.x * 0.5 * depthFactor
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, groupRef.current.rotation.y + tiltY, 0.15)
      
      const tiltX = mouse.y * 0.1 * depthFactor
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, groupRef.current.rotation.x + tiltX, 0.15)

      // 3. Scroll Rotation (Stay subtle)
      const scrollY = window.scrollY
      groupRef.current.rotation.x += scrollY * 0.00002 * depthFactor
    }
  })

  const dim = parseInt(type.split('x')[0]) || 3
  return (
    <group ref={groupRef} position={position}>
        <RubiksCube dim={dim} scale={scale} color={color} />
    </group>
  )
}

function RubiksCube({ dim, scale, color }) {
  const size = 0.95
  const gap = 0.05
  const offset = (dim - 1) / 2

  const cubes = useMemo(() => {
    const temp = []
    for (let x = 0; x < dim; x++) {
      for (let y = 0; y < dim; y++) {
        for (let z = 0; z < dim; z++) {
          temp.push([x - offset, y - offset, z - offset])
        }
      }
    }
    return temp
  }, [dim, offset])

  const stickerOffset = 0.51

  return (
    <group scale={scale}>
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

function Scene({ reduceMotion, globalMouse }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <FloatingCubes reduceMotion={reduceMotion} globalMouse={globalMouse} />
      <Rig reduceMotion={reduceMotion} globalMouse={globalMouse} />
    </>
  )
}

function FloatingCubes({ reduceMotion, globalMouse }) {
  const puzzles = useMemo(() => [
    { type: '2x2', pos: [-8, 6, -15], scale: 0.6, speed: 1 },
    { type: '3x3', pos: [7, -5, -8], scale: 1.2, speed: 0.8 },
    { type: '4x4', pos: [-10, -5, -20], scale: 1.5, speed: 0.5 },
    { type: '2x2', pos: [10, 5, -12], scale: 0.7, speed: 0.7 },
    { type: '3x3', pos: [0, 10, -25], scale: 2.5, speed: 0.3 },
    { type: '4x4', pos: [-12, 0, -10], scale: 0.8, speed: 0.6 },
    { type: '3x3', pos: [5, 8, -18], scale: 1.0, speed: 0.9 },
    { type: '2x2', pos: [-15, -10, -30], scale: 2.0, speed: 0.4 },
    { type: '3x3', pos: [15, -12, -22], scale: 1.8, speed: 0.2 },
    { type: '4x4', pos: [-5, 12, -15], scale: 1.2, speed: 1.1 },
  ], [])

  return (
    <>
      {puzzles.map((p, i) => (
        <Float
          key={i}
          speed={p.speed}
          rotationIntensity={reduceMotion ? 0.5 : 1}
          floatIntensity={reduceMotion ? 0.5 : 2}
          floatingRange={[-1, 1]}
        >
          <Puzzle
            type={p.type}
            position={p.pos}
            scale={p.scale}
            reduceMotion={reduceMotion}
            globalMouse={globalMouse}
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

function Rig({ reduceMotion, globalMouse }) {
  const { camera } = useThree()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [reduceMotion])

  useFrame((state, delta) => {
    if (reduceMotion || !globalMouse.current) {
        camera.position.lerp(new THREE.Vector3(0, 0, 15), 0.05)
        camera.lookAt(0, 0, 0)
        return
    }

    const mouse = globalMouse.current;

    // 1. Horizontal Camera Parallax (Position)
    const targetX = (mouse.x * 1.5)
    const targetY = (mouse.y * 0.1)
    
    // 2. Scroll-based Vertical Drift
    const scrollTargetY = -(scrollY * 0.005)
    const combinedY = targetY + scrollTargetY
    
    camera.position.lerp(new THREE.Vector3(targetX, combinedY, 15), 0.1)
    
    // 3. Horizontal Camera Yaw (Viewpoint Tilt)
    const lookAtTargetX = THREE.MathUtils.lerp(state.camera.userData.lookAtX || 0, -mouse.x * 3, 0.1)
    state.camera.userData.lookAtX = lookAtTargetX 
    
    const lookAtTargetY = scrollTargetY * 0.1
    camera.lookAt(lookAtTargetX, lookAtTargetY, 0)
    
    // 4. Subtle roll on scroll
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, scrollY * 0.00002, 0.1)
  })
  return null
}

export default function ThreeBackground() {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('reduceMotion');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return saved === 'true' || (saved === null && prefersReduced);
    }
    return false;
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    const handleReduceMotion = (e) => setReduceMotion(e.detail);
    window.addEventListener('reduce-motion-change', handleReduceMotion);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('reduce-motion-change', handleReduceMotion);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40 grayscale-[20%] transition-opacity duration-1000">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true }}
      >
        <Scene reduceMotion={reduceMotion} globalMouse={mouseRef} />
      </Canvas>
    </div>
  )
}

