'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import BlackHole from './BlackHole'

// Circle texture for round stars
function makeCircleTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.4, 'rgba(255,255,255,0.6)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

function Starfield({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const texture = useMemo(() => makeCircleTexture(), [])

  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005
      ref.current.rotation.x += delta * 0.002
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.12}
        map={texture}
        transparent
        opacity={0.6}
        sizeAttenuation
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  )
}

export default function GlobalBackground() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      // PERFORMANCE: Lock DPR to 1 to reduce fragment shader workload
      dpr={1}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <BlackHole scale={[20, 20, 1]} position={[0, -0.4, -2]} />
      <Starfield count={isMobile ? 1200 : 3000} />
    </Canvas>
  )
}
