'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Starfield — exactly from forgje-website-main ──────────────────
function Starfield({ count = 5000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
      const t = 0.7 + Math.random() * 0.3
      col[i * 3]     = t
      col[i * 3 + 1] = t
      col[i * 3 + 2] = t
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    return g
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.008
      ref.current.rotation.x += delta * 0.003
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

// ── DeepSpace Shaders ──────────────────
const FRAG = `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p) * fract(p) * (3.0 - 2.0 * fract(p));
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);
    
    // Low intensity slow drift
    float n = noise(uv * 0.5 + uTime * 0.04);
    float n2 = noise(uv * 1.2 - uTime * 0.02);
    
    vec3 deepBlue = vec3(0.005, 0.005, 0.015);
    vec3 nebulaColor = vec3(0.05, 0.02, 0.1);
    
    vec3 color = mix(deepBlue, nebulaColor, n * n2 * 1.2);
    color += nebulaColor * 0.15 * exp(-r * 0.6); // Subtle lens glow
    
    gl_FragColor = vec4(color, 1.0);
  }
`

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function DeepSpaceAtmosphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial
    mat.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} scale={[35, 35, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

// ── Full-screen canvas — parent layout div handles fixed positioning ──
export default function GlobalBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[0.75, 1.3]} 
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <DeepSpaceAtmosphere />
      <Starfield count={8000} />
    </Canvas>
  )
}
