'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Simple Perlin-like noise via sin
function noise2D(x: number, y: number): number {
  return (
    Math.sin(x * 1.7 + y * 2.3) * 0.5 +
    Math.sin(x * 3.1 - y * 1.9) * 0.25 +
    Math.sin(x * 5.3 + y * 4.7) * 0.125
  )
}

const wormholeVert = `
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float disp = sin(uTime * 1.2 + pos.z * 3.0) * 0.04;
    pos.x += disp * normal.x;
    pos.y += disp * normal.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const wormholeFrag = `
  uniform float uTime;
  uniform float uProgress;
  varying vec2 vUv;

  void main() {
    float scroll = mod(vUv.y - uTime * 0.18, 1.0);
    float ring = smoothstep(0.03, 0.0, mod(scroll, 0.1));
    vec3 col = mix(vec3(0.02, 0.01, 0.06), vec3(0.18, 0.14, 0.32), ring);
    col += vec3(0.06, 0.04, 0.12) * (1.0 - abs(vUv.x * 2.0 - 1.0));
    float edge = 1.0 - abs(vUv.x * 2.0 - 1.0);
    float alpha = edge * uProgress;
    gl_FragColor = vec4(col, alpha);
  }
`

function WormholeMesh({ onReady }: { onReady: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { camera } = useThree()
  const entryDone = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      onReady()
      return
    }

    // GSAP camera entry animation z: 8 → 0
    gsap.fromTo(
      camera.position,
      { z: 8 },
      {
        z: 0.5,
        duration: 2,
        ease: 'power2.inOut',
        onComplete: () => {
          entryDone.current = true
          onReady()
        },
      }
    )
    // Progress uniform 0 → 1
    if (matRef.current) {
      gsap.fromTo(matRef.current.uniforms.uProgress, { value: 0 }, { value: 1, duration: 2 })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t
    }
    // Camera shake after entry
    if (entryDone.current) {
      camera.rotation.z = noise2D(t * 0.8, 0) * 0.02
    }
  })

  const uniforms = useRef({
    uTime: { value: 0 },
    uProgress: { value: 0 },
  })

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1.2, 1.2, 12, 120, 1, true]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={wormholeVert}
        fragmentShader={wormholeFrag}
        uniforms={uniforms.current}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function Starfield({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = -Math.random() * 20
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [count])

  useFrame(() => {
    if (!ref.current) return
    const pos = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 2] += 0.12
      if (pos[i * 3 + 2] > 2) pos[i * 3 + 2] = -20
    }
    geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.02} color="#ffffff" sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}

interface WormholeCanvasProps {
  onReady?: () => void
}

export default function WormholeCanvas({ onReady = () => {} }: WormholeCanvasProps) {
  const reduced = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const starCount = reduced ? 0 : isMobile ? 800 : 3000

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 70 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 2]}
    >
      <WormholeMesh onReady={onReady} />
      {starCount > 0 && <Starfield count={starCount} />}
    </Canvas>
  )
}
