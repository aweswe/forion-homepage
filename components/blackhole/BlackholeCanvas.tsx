'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ── Lensing background shader ── */
const lensingVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const lensingFrag = `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);

    // Gravitational lensing warp
    float warp = 0.06 / max(dist, 0.04);
    vec2 warped = uv + normalize(uv + 0.001) * warp * 0.05;

    // Photon ring glow
    float ring = smoothstep(0.01, 0.0, abs(dist - 0.18)) * 0.6;
    ring += smoothstep(0.02, 0.0, abs(dist - 0.19)) * 0.3;

    // Ambient accretion glow
    float accretion = smoothstep(0.5, 0.1, dist) * 0.04;
    float outerGlow = exp(-dist * 3.0) * 0.06;

    // Swirling gas pattern
    float angle = atan(uv.y, uv.x);
    float swirl = sin(angle * 3.0 + uTime * 0.3 - dist * 8.0) * 0.5 + 0.5;
    float gasPattern = swirl * smoothstep(0.5, 0.15, dist) * smoothstep(0.08, 0.15, dist) * 0.08;

    vec3 col = vec3(0.0);
    col += vec3(1.0, 0.85, 0.5) * ring;
    col += vec3(1.0, 0.6, 0.2) * accretion;
    col += vec3(0.8, 0.4, 0.1) * outerGlow;
    col += vec3(1.0, 0.7, 0.3) * gasPattern;

    // Faint background stars warped by lensing
    vec2 starUV = warped * 20.0;
    float star = step(0.985, hash(floor(starUV))) * 0.15;
    col += vec3(star) * smoothstep(0.0, 0.3, dist);

    // Dark center
    float mask = smoothstep(0.06, 0.12, dist);
    col *= mask;

    gl_FragColor = vec4(col, 1.0);
  }
`

/* ── Accretion disk with swirling hot gas ── */
function AccretionDisk({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const reduced = useReducedMotion()

  const diskDataRef = useRef<{ positions: Float32Array; colors: Float32Array; velocities: Float32Array } | null>(null)
  if (!diskDataRef.current) {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 0.75 + Math.pow(Math.random(), 0.7) * 1.8
      const thickness = (Math.random() - 0.5) * 0.06 * (1.0 - (r - 0.75) / 1.8)
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = thickness
      pos[i * 3 + 2] = Math.sin(angle) * r * 0.32
      vel[i] = 0.3 + (1.0 / Math.sqrt(r)) * 0.5

      const t = (r - 0.75) / 1.8
      if (t < 0.15) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.97; col[i * 3 + 2] = 0.88
      } else if (t < 0.35) {
        col[i * 3] = 1; col[i * 3 + 1] = 0.75; col[i * 3 + 2] = 0.3
      } else if (t < 0.55) {
        col[i * 3] = 0.95; col[i * 3 + 1] = 0.4; col[i * 3 + 2] = 0.08
      } else if (t < 0.75) {
        col[i * 3] = 0.7; col[i * 3 + 1] = 0.15; col[i * 3 + 2] = 0.03
      } else {
        col[i * 3] = 0.2; col[i * 3 + 1] = 0.05; col[i * 3 + 2] = 0.02
      }
    }
    diskDataRef.current = { positions: pos, colors: col, velocities: vel }
  }
  const { positions, colors } = diskDataRef.current

  useFrame(({ clock }) => {
    if (!ref.current || reduced || !diskDataRef.current) return
    const t = clock.getElapsedTime()
    const vel = diskDataRef.current.velocities
    const posArr = ref.current.geometry.attributes.position.array as Float32Array
    const n = Math.min(posArr.length / 3, vel.length)

    for (let i = 0; i < n; i++) {
      const x = posArr[i * 3]
      const z = posArr[i * 3 + 2]
      const r = Math.sqrt(x * x + z * z / (0.32 * 0.32))
      const angle = Math.atan2(z / 0.32, x)
      const newAngle = angle + vel[i] * 0.002
      posArr[i * 3] = Math.cos(newAngle) * r
      posArr[i * 3 + 2] = Math.sin(newAngle) * r * 0.32
    }
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.03
  })

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  useFrame(({ clock }) => {
    if (!ref.current || reduced || !diskDataRef.current) return
    const t = clock.getElapsedTime()
    const vel = diskDataRef.current.velocities
    const posArr = geometry.attributes.position.array as Float32Array
    const n = Math.min(posArr.length / 3, vel.length)

    for (let i = 0; i < n; i++) {
      const x = posArr[i * 3]
      const z = posArr[i * 3 + 2]
      const r = Math.sqrt(x * x + z * z / (0.32 * 0.32))
      const angle = Math.atan2(z / 0.32, x)
      const newAngle = angle + vel[i] * 0.002
      posArr[i * 3] = Math.cos(newAngle) * r
      posArr[i * 3 + 2] = Math.sin(newAngle) * r * 0.32
    }
    geometry.attributes.position.needsUpdate = true
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.03
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.012}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Event horizon with distortion pulse ── */
function EventHorizon() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const pulse = 0.7 + Math.sin(t * 0.5) * 0.02 + Math.sin(t * 1.3) * 0.01
    ref.current.scale.setScalar(pulse / 0.7)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.7, 48, 48]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  )
}

/* ── Photon ring — bright orbital ring at 1.5x event horizon ── */
function PhotonRing() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.getElapsedTime() * 0.1
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.3, 0, 0]}>
      <torusGeometry args={[1.05, 0.008, 8, 128]} />
      <meshBasicMaterial
        color="#ffd080"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ── Relativistic jets ── */
function HawkingJets() {
  const ref1 = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null)
  const ref2 = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null)

  const jetPositionsRef = useRef<Float32Array | null>(null)
  if (!jetPositionsRef.current) {
    const arr = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      const spread = Math.random() * Math.random()
      arr[i * 3] = (Math.random() - 0.5) * 0.08 * (1 + spread * 2)
      arr[i * 3 + 1] = Math.random() * 4
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.08 * (1 + spread * 2)
    }
    jetPositionsRef.current = arr
  }
  const jetPositions = jetPositionsRef.current

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref1.current) ref1.current.material.opacity = 0.25 + Math.sin(t * 2.5) * 0.12
    if (ref2.current) ref2.current.material.opacity = 0.25 + Math.sin(t * 2.5 + Math.PI) * 0.12
  })

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(jetPositions, 3))
    return g
  }, [jetPositions])

  return (
    <>
      <points ref={ref1} geometry={geometry}>
        <pointsMaterial
          size={0.008}
          color="#aaccff"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <points ref={ref2} geometry={geometry} rotation={[Math.PI, 0, 0]}>
        <pointsMaterial
          size={0.008}
          color="#aaccff"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  )
}

/* ── Lensing background plane ── */
function LensingBackground() {
  const uniformsRef = useRef({
    uTime: { value: 0 },
  })

  useFrame(({ clock }) => {
    uniformsRef.current.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[14, 14]} />
      <shaderMaterial
        vertexShader={lensingVert}
        fragmentShader={lensingFrag}
        uniforms={uniformsRef.current}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ── Camera controller with subtle drift ── */
function CameraDrift() {
  const { camera } = useThree()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.2) * 0.15
    camera.position.y = 2 + Math.cos(t * 0.15) * 0.1
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function BlackholeCanvas() {
  const reduced = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = reduced ? 3000 : isMobile ? 6000 : 12000

  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 2]}
    >
      <CameraDrift />
      <LensingBackground />
      <AccretionDisk count={particleCount} />
      <PhotonRing />
      <EventHorizon />
      <HawkingJets />
    </Canvas>
  )
}
