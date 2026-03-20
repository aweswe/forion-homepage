'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Interstellar "Gargantua" style black hole ────────────────────
// Camera: slightly above the disk plane — disk extends coast to coast
// Disk: RingGeometry in XZ plane, O(1) fragment shader
// Photon ring: bright TorusGeometry around the sphere
// Stars, debris, glow overlays — all 1 draw call via instancing/BufferGeometry
// 30fps cap, DPR 1.0–1.3
// ─────────────────────────────────────────────────────────────────

// ── Stars ─────────────────────────────────────────────────────────
function Stars() {
  const geo = useMemo(() => {
    const N = 5000
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 28 + Math.random() * 60
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i*3+2] = r * Math.cos(phi)
      // Mostly white, occasional warm
      const warm = Math.random() > 0.8
      col[i*3]   = warm ? 1.0 : 0.85 + Math.random() * 0.15
      col[i*3+1] = warm ? 0.80 : 0.85 + Math.random() * 0.15
      col[i*3+2] = warm ? 0.55 : 0.90 + Math.random() * 0.1
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    return g
  }, [])

  return (
    <points geometry={geo}>
      <pointsMaterial size={0.13} vertexColors sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  )
}

// ── Accretion disk — O(1) shader on RingGeometry ──────────────────
// RingGeometry UVs: U = angle (0→1 = 0→2π), V = radius (0 = inner, 1 = outer)
const DISK_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const DISK_FRAG = `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 n) {
    return fract(sin(dot(n, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    float r   = vUv.y;               // 0 = inner hot, 1 = outer cold
    float ang = vUv.x * 6.2832;      // 0 → 2π

    // 2-sample turbulence — still O(1), no loops
    vec2 f1 = vec2(vUv.x * 5.0 - uTime * 0.10, r * 9.0 + uTime * 0.04);
    vec2 f2 = vec2(vUv.x * 9.0 + uTime * 0.07, r * 16.0 - uTime * 0.08);
    float noise = hash(f1) * 0.58 + hash(f2) * 0.42;

    // Relativistic doppler: approaching (left, cos<0) = much brighter & bluer
    float doppler = 1.0 + 3.2 * max(0.0, -cos(ang));

    // Radial heat falloff
    float heat = 1.0 - smoothstep(0.0, 0.90, r);

    // Cinematic colour ramp
    vec3 white  = vec3(1.6, 1.45, 1.15);
    vec3 gold   = vec3(1.05, 0.68, 0.14);
    vec3 orange = vec3(0.98, 0.32, 0.03);
    vec3 red    = vec3(0.60, 0.05, 0.01);

    vec3 col = mix(red, orange, smoothstep(0.0,  0.35, heat));
    col = mix(col, gold,   smoothstep(0.30, 0.70, heat * doppler * 0.65));
    col = mix(col, white,  smoothstep(0.70, 1.40, heat * doppler));

    float alpha = (0.42 + 0.58 * noise)
                * min(doppler * 0.72, 3.2)
                * smoothstep(0.0,  0.06, r)   // soft inner edge
                * smoothstep(1.0,  0.85, r);  // soft outer edge

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`

function AccretionDisk() {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const tick   = useRef(0)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame(({ clock }) => {
    tick.current++
    if (tick.current % 2 !== 0) return   // 30 fps
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    // RingGeometry lies in XY — rotate so it's in XZ (horizontal disk)
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.85, 12, 160, 10]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={DISK_VERT}
        fragmentShader={DISK_FRAG}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ── Photon ring — thin torus, glowing white ───────────────────────
function PhotonRing() {
  return (
    <>
      {/* Bright core ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.88, 0.055, 16, 160]} />
        <meshBasicMaterial color="#fff8e8" />
      </mesh>
      {/* Inner halo glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.88, 0.22, 10, 120]} />
        <meshBasicMaterial color="#ffaa33" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Wide soft glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.88, 0.70, 8, 80]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.10} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  )
}

// ── Event horizon — true void sphere ─────────────────────────────
function EventHorizon() {
  return (
    <>
      {/* Black void — renderOrder high so it draws over disk */}
      <mesh renderOrder={2}>
        <sphereGeometry args={[2.82, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      {/* Photon sphere glow shell — barely visible warm fringe */}
      <mesh>
        <sphereGeometry args={[3.0, 32, 32]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>
    </>
  )
}

// ── Outer disk glow rings (multiple cascade) ──────────────────────
function DiskGlowRings() {
  const rings = [
    { r: 4.0,  tube: 0.60, op: 0.08,  col: '#ff6600' },
    { r: 6.5,  tube: 1.10, op: 0.055, col: '#ff4400' },
    { r: 9.5,  tube: 1.60, op: 0.030, col: '#cc2200' },
    { r: 12.5, tube: 2.00, op: 0.014, col: '#881100' },
  ]
  return (
    <>
      {rings.map((rng, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[rng.r, rng.tube, 6, 64]} />
          <meshBasicMaterial color={rng.col} transparent opacity={rng.op} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </>
  )
}

// ── Orbiting dust (InstancedMesh — 1 draw call for 500 pieces) ────
function OrbitingDust() {
  const COUNT = 500
  const ref   = useRef<THREE.InstancedMesh>(null)
  const tick  = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const data = useMemo(() =>
    Array.from({ length: COUNT }, () => {
      const r = 3.2 + Math.random() * 8.8
      return {
        angle: Math.random() * Math.PI * 2,
        r,
        speed: (0.0005 + Math.random() * 0.0008) * (Math.random() > 0.05 ? 1 : -1),
        offY:  (Math.random() - 0.5) * 0.2,
        sc:    0.04 + Math.random() * 0.10,
      }
    }), [])

  useFrame(() => {
    tick.current++
    if (tick.current % 2 !== 0) return
    if (!ref.current) return
    for (let i = 0; i < COUNT; i++) {
      const d = data[i]
      d.angle += d.speed
      dummy.position.set(
        d.r * Math.cos(d.angle),
        d.offY,
        d.r * Math.sin(d.angle)
      )
      dummy.scale.setScalar(d.sc)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#ff7700" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </instancedMesh>
  )
}

// ── Camera ────────────────────────────────────────────────────────
// Lower means more "edge on" and the disk stretches wider.
// y=3.2, z=13 gives the Gargantua/Interstellar angle
function Camera() {
  const { camera } = useThree()
  useMemo(() => {
    camera.position.set(0, 3.2, 13)
    camera.lookAt(0, 0, 0)
    ;(camera as THREE.PerspectiveCamera).fov = 68
    camera.updateProjectionMatrix()
  }, [camera])
  return null
}

// ── Root ──────────────────────────────────────────────────────────
export default function BlackHoleCanvas() {
  return (
    <Canvas
      dpr={[0.9, 1.3]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Camera />
      <Stars />
      <DiskGlowRings />
      <AccretionDisk />
      <PhotonRing />
      <EventHorizon />
      <OrbitingDust />
    </Canvas>
  )
}
