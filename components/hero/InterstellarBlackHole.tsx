'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const bhVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const bhFrag = `
  precision highp float;

  uniform float uTime;
  uniform float uZoom;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uQuality;

  varying vec2 vUv;

  #define PI 3.14159265359

  const float BH_RADIUS = 1.5;
  const float DISK_INNER = 3.0;
  const float DISK_OUTER = 12.0;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec3 starField(vec3 dir) {
    vec3 col = vec3(0.0);
    vec2 st = vec2(atan(dir.z, dir.x), asin(clamp(dir.y, -1.0, 1.0)));

    // PERFORMANCE: Reduce starfield iterations
    for (float scale = 80.0; scale <= 160.0; scale += 40.0) {
      vec2 grid = floor(st * scale);
      float h = hash(grid + scale);
      if (h > 0.985) {
        float brightness = smoothstep(0.985, 1.0, h);
        vec3 starCol = mix(vec3(0.7, 0.8, 1.0), vec3(1.0, 0.9, 0.7), hash(grid + 200.0));
        col += starCol * brightness * 0.45;
      }
    }
    return col;
  }

  vec3 diskColor(float r, float angle, float time) {
    float t = clamp((r - DISK_INNER) / (DISK_OUTER - DISK_INNER), 0.0, 1.0);

    vec3 hot    = vec3(1.0, 0.98, 0.92);
    vec3 warm   = vec3(1.0, 0.75, 0.3);
    vec3 orange = vec3(0.95, 0.4, 0.06);
    vec3 red    = vec3(0.5, 0.1, 0.02);
    vec3 dark   = vec3(0.08, 0.01, 0.005);

    vec3 col;
    if (t < 0.12)      col = mix(hot, warm, t / 0.12);
    else if (t < 0.35) col = mix(warm, orange, (t - 0.12) / 0.23);
    else if (t < 0.65) col = mix(orange, red, (t - 0.35) / 0.3);
    else                col = mix(red, dark, (t - 0.65) / 0.35);

    // Swirling accretion structures - Simplified math
    float spiral1 = sin(angle * 2.0 - time * 0.35 + log2(max(r, 0.1)) * 5.0) * 0.5 + 0.5;
    float turbulence = sin(angle * 13.0 + r * 2.2 - time * 0.18) * 0.15 + 0.85;
    float hotSpots = pow(max(sin(angle * 3.0 - time * 0.4 + r * 1.2) * 0.5 + 0.5, 0.0), 3.0);

    float pattern = spiral1 * turbulence + hotSpots * 0.3;
    float brightness = pow(1.0 - t, 1.8) * pattern;

    return col * brightness * 3.0;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    vec2 mouseShift = uMouse * 0.06;
    float zoom = clamp(uZoom, 0.0, 1.0);
    float camDist = mix(35.0, 11.0, zoom);
    float camY = mix(12.0, 3.2, zoom);

    vec3 ro = vec3(mouseShift.x * 2.0, camY + mouseShift.y, -camDist);
    vec3 lookAt = vec3(0.0, -0.2, 0.0);

    vec3 fwd = normalize(lookAt - ro);
    vec3 rgt = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, rgt);

    vec3 rd = normalize(fwd * 2.0 + rgt * uv.x + up * uv.y);

    vec3 pos = ro;
    vec3 vel = rd;
    vec3 color = vec3(0.0);
    float totalAlpha = 0.0;
    bool absorbed = false;

    // PERFORMANCE FIX: Strictly capped raymarching steps
    int maxSteps = int(uQuality);

    for (int i = 0; i < 90; i++) {
      if (i >= maxSteps) break;

      float dist = length(pos);

      if (dist < BH_RADIUS) {
        absorbed = true;
        break;
      }

      if (dist > 50.0) break;
      if (totalAlpha > 0.98) break;

      float h = max(0.03, min(0.25, (dist - BH_RADIUS) * 0.12));

      vec3 crossPV = cross(pos, vel);
      float h2 = dot(crossPV, crossPV);
      vec3 accel = -1.5 * h2 * pos / (dist * dist * dist * dist * dist); // Manual pow expansion for perf

      vel += accel * h;
      vec3 prevPos = pos;
      pos += vel * h;

      if (prevPos.y * pos.y < 0.0) {
        float frac = abs(prevPos.y) / (abs(prevPos.y) + abs(pos.y));
        vec3 hitPos = mix(prevPos, pos, frac);
        float r = length(hitPos.xz);

        if (r > DISK_INNER * 0.8 && r < DISK_OUTER) {
          float angle = atan(hitPos.z, hitPos.x);

          vec3 orbVel = cross(vec3(0.0, 1.0, 0.0), normalize(vec3(hitPos.x, 0.0, hitPos.z)));
          float orbSpeed = sqrt(BH_RADIUS / (2.0 * r));
          float doppler = 1.0 + dot(normalize(vel), orbVel) * orbSpeed * 4.0;
          doppler = clamp(doppler, 0.2, 3.5);

          vec3 dc = diskColor(r, angle, uTime) * pow(doppler, 2.2);

          float innerFade = smoothstep(DISK_INNER * 0.7, DISK_INNER * 1.3, r);
          float outerFade = 1.0 - smoothstep(DISK_OUTER * 0.7, DISK_OUTER, r);
          float opacity = innerFade * outerFade * 0.8;

          color += dc * opacity * (1.0 - totalAlpha);
          totalAlpha += opacity * (1.0 - totalAlpha);
        }
      }
    }

    if (!absorbed && totalAlpha < 1.0) {
      color += starField(normalize(vel)) * (1.0 - totalAlpha);
    }

    float centerDist = length(uv);
    float glow = exp(-centerDist * 0.5) * 0.02 * zoom;
    color += vec3(1.0, 0.65, 0.25) * glow;

    float halo = exp(-centerDist * 0.3) * 0.006;
    color += vec3(0.3, 0.1, 0.5) * halo;

    color = color / (color + vec3(1.0));
    color = pow(color, vec3(0.88));

    gl_FragColor = vec4(color, 1.0);
  }
`

function BlackHoleMesh({ onReady }: { onReady: () => void }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()
  const reduced = useReducedMotion()
  const mouseTarget = useRef(new THREE.Vector2(0, 0))
  const isMobile = size.width < 768

  const uniforms = useRef({
    uTime: { value: 0 },
    uZoom: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uQuality: { value: isMobile ? 45.0 : 75.0 }, // Aggressive step reduction
  })

  useEffect(() => {
    if (reduced) {
      uniforms.current.uZoom.value = 1
      onReady()
      return
    }

    gsap.to(uniforms.current.uZoom, {
      value: 1,
      duration: 1.1,
      ease: 'power2.out',
      onComplete: onReady,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    uniforms.current.uResolution.value.set(size.width, size.height)
  }, [size])

  useFrame(({ clock, pointer }) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value = clock.getElapsedTime()

    mouseTarget.current.set(pointer.x, pointer.y)
    matRef.current.uniforms.uMouse.value.lerp(mouseTarget.current, 0.04)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={bhVert}
        fragmentShader={bhFrag}
        uniforms={uniforms.current}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

interface InterstellarBlackHoleProps {
  onReady?: () => void
}

export default function InterstellarBlackHole({ onReady = () => {} }: InterstellarBlackHoleProps) {
  // PERFORMANCE FIX: Lock DPR to 1 to halve fragment shader workload on high-res displays
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 90 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ 
        antialias: false, 
        alpha: false,
        powerPreference: 'high-performance'
      }}
      dpr={1} 
    >
      <BlackHoleMesh onReady={onReady} />
    </Canvas>
  )
}
