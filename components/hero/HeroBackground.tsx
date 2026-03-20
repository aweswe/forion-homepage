'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FRAG = `
  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 n) {
    vec2 d = vec2(0, 1);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(hash(b), hash(b + d.yx), f.x), mix(hash(b + d.xy), hash(b + d.yy), f.x), f.y);
  }

  float fbm(vec2 n) {
    float total = 0.0, amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
total += noise(n) * amplitude;
n *= 2.3;
amplitude *= 0.42;
    }
    return total;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);

    float horizonSize = 0.4;
    float horizonMask = smoothstep(horizonSize, horizonSize + 0.005, r);

    // Accretion disk logic
    float tilt = 0.2;
    float wrapEffect = 0.15 * exp(-r * 1.5);
    float diskY = (uv.y - uv.x * tilt + wrapEffect);
    float diskThickness = 0.04 + 0.08 * r;
    float diskIntensity = exp(-pow(diskY / diskThickness, 2.0));
    float disk = diskIntensity * smoothstep(1.0, 0.4, r) * smoothstep(0.38, 0.55, r);

    float flowSpeed = uTime * 0.6;
    float gasNoise = fbm(vec2(angle * 6.0 + flowSpeed, (r - horizonSize) * 20.0 - flowSpeed * 0.5));

    float intensity = disk * (0.4 + 0.8 * gasNoise);

    vec3 goldCore  = vec3(1.0, 0.6, 0.1);
    vec3 deepOrange = vec3(0.9, 0.2, 0.02);
    vec3 spaceRed  = vec3(0.4, 0.02, 0.0);

    vec3 color = mix(spaceRed, deepOrange, pow(intensity, 0.5));
    color = mix(color, goldCore, pow(intensity, 1.4));

    gl_FragColor = vec4(color * horizonMask, intensity * horizonMask * smoothstep(1.2, 0.6, r));
  }
`

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function BlackHoleCore() {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial
      mat.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef} scale={[12, 12, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function HeroBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <BlackHoleCore />
    </Canvas>
  )
}
