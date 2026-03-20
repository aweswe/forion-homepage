import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BLACKHOLE_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // --- Cinematic Utilities ---
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
    for (int i = 0; i < 6; i++) {
      total += noise(n) * amplitude;
      n *= 2.3;
      amplitude *= 0.42;
    }
    return total;
  }

  float stars(vec2 uv) {
    float s = hash(uv);
    return pow(s, 150.0) * 1.2 * step(0.998, hash(uv + 1.23));
  }

  void main() {
    // 1. Perspective & Ray-tracing Prep
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // --- EXAGGERATED GRAVITATIONAL LENSING ---
    // light bends massively around the massive body
    float mass = 0.28; // Increased mass for more dramatic lensing
    float deflection = mass / pow(max(r, 0.25), 1.8);
    vec2 warpedUv = uv * (1.0 - deflection);
    float warpedR = length(warpedUv);
    
    // 2. The Great Void (Event Horizon)
    float horizonSize = 0.32;
    float horizonMask = smoothstep(horizonSize, horizonSize + 0.005, r);
    
    // --- DRAMATIC ACCRETION DISK ARCHITECTURE ---
    float tilt = 0.18; // 3D Tilt perspective
    
    // a) Main Horizontal Band (Curved & Tilted)
    // Adding r-based warping to the Y coordinate to make the disk "wrap"
    float wrapEffect = 0.14 * exp(-r * 1.5);
    float frontDiskY = (uv.y - uv.x * tilt + wrapEffect);
    float diskThickness = 0.02 + 0.05 * r;
    // Exaggerated white-hot core
    float frontIntensity = exp(-pow(frontDiskY / diskThickness, 2.0));
    float frontDisk = frontIntensity * smoothstep(0.95, 0.4, r) * smoothstep(0.38, 0.55, r);
    
    // b) Bold Secondary Arcs (Separated & Vivid)
    // Top Arc (The light from behind warped into a halo)
    float topLensRadius = 0.58; // Clearly separated from core
    float topArc = exp(-pow((r - topLensRadius) / 0.16, 2.0)) * pow(max(0.0, uv.y + 0.15), 0.8) * smoothstep(0.0, 1.0, abs(uv.x));
    
    // Bottom Arc
    float botLensRadius = 0.54;
    float bottomArc = exp(-pow((r - botLensRadius) / 0.12, 2.0)) * pow(max(0.0, -uv.y + 0.08), 0.7) * smoothstep(0.0, 1.0, abs(uv.x));
    
    // 3. Cinematic Gas Dynamics
    float flowSpeed = uTime * 0.8;
    float gasStretch = 8.0;
    vec2 polarCoords = vec2(angle * gasStretch + flowSpeed, (r - horizonSize) * 18.0 - flowSpeed * 0.4);
    float gasNoise = fbm(polarCoords);
    
    // 4. Relativistic Doppler Asymmetry
    // Approaching side is far more intense
    float dopplerSide = uv.x < 0.0 ? 1.5 : 0.6;
    float doppler = mix(0.5, 1.6, smoothstep(1.0, -1.0, uv.x));
    
    // Combine Master Intensities
    float combinedDisk = max(frontDisk, max(topArc * 0.9, bottomArc * 0.5));
    float intensity = combinedDisk * (0.5 + 0.7 * gasNoise) * doppler;
    
    // 5. Cinematic Color Ramp (Ultra High Contrast)
    vec3 whiteHot = vec3(1.4, 1.3, 1.1); // Over-brightness for bloom
    vec3 goldCore = vec3(1.0, 0.7, 0.2);
    vec3 deepOrange = vec3(1.0, 0.35, 0.05);
    vec3 spaceRed = vec3(0.6, 0.05, 0.01);
    
    // Final spectral mapping
    vec3 color = mix(spaceRed, deepOrange, pow(intensity, 0.6));
    color = mix(color, goldCore, pow(intensity, 1.5));
    color = mix(color, whiteHot, pow(intensity, 4.0));
    
    // 6. Volumetric Light & Bloom
    // Sharp Photon Ring
    float photonRing = exp(-abs(r - horizonSize * 1.05) * 140.0) * 2.8;
    color += whiteHot * photonRing;
    
    // Light Bloom Haze
    float haze = exp(-r * 1.8) * 0.12 + exp(-abs(r - topLensRadius) * 4.0) * 0.04;
    color += deepOrange * haze;
    
    // Starfield (Warped)
    float starsField = stars(warpedUv * 5.0 + 0.5) * horizonMask * smoothstep(0.95, 0.8, r);
    color += vec3(starsField);
    
    // Final Alpha & Transparency
    float alphaLayer = clamp(intensity * 1.5 + photonRing + haze * 1.5 + starsField, 0.0, 1.0);
    // Radial soft-clip at edges of mesh
    alphaLayer *= smoothstep(1.0, 0.8, r);
    
    gl_FragColor = vec4(color * horizonMask, alphaLayer);
  }
`;

const BLACKHOLE_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const BlackHole = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      const targetMouseX = state.mouse.x;
      const targetMouseY = state.mouse.y;
      material.uniforms.uMouse.value.x += (targetMouseX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetMouseY - material.uniforms.uMouse.value.y) * 0.05;

      // Deep cosmic float motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.08) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[24, 24, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        attach="material"
        vertexShader={BLACKHOLE_VERTEX_SHADER}
        fragmentShader={BLACKHOLE_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

export default BlackHole;
