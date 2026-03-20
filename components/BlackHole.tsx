import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BLACKHOLE_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
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
    // PERFORMANCE: Reduced to 4 octaves for global backdrop
    for (int i = 0; i < 4; i++) {
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
    
    float mass = 0.28;
    float deflection = mass / pow(max(r, 0.25), 1.8);
    vec2 warpedUv = uv * (1.0 - deflection);
    
    float horizonSize = 0.32;
    float horizonMask = smoothstep(horizonSize, horizonSize + 0.005, r);
    
    float tilt = 0.18;
    float wrapEffect = 0.14 * exp(-r * 1.5);
    float frontDiskY = (uv.y - uv.x * tilt + wrapEffect);
    float diskThickness = 0.02 + 0.05 * r;
    float frontIntensity = exp(-pow(frontDiskY / diskThickness, 2.0));
    float frontDisk = frontIntensity * smoothstep(0.95, 0.4, r) * smoothstep(0.38, 0.55, r);
    
    float topLensRadius = 0.58;
    float topArc = exp(-pow((r - topLensRadius) / 0.16, 2.0)) * pow(max(0.0, uv.y + 0.15), 0.8) * smoothstep(0.0, 1.0, abs(uv.x));
    
    float flowSpeed = uTime * 0.8;
    vec2 polarCoords = vec2(angle * 8.0 + flowSpeed, (r - horizonSize) * 18.0 - flowSpeed * 0.4);
    float gasNoise = fbm(polarCoords);
    
    float doppler = mix(0.5, 1.6, smoothstep(1.0, -1.0, uv.x));
    float combinedDisk = max(frontDisk, topArc * 0.9);
    float intensity = combinedDisk * (0.5 + 0.7 * gasNoise) * doppler;
    
    vec3 whiteHot = vec3(1.1, 1.0, 0.9);
    vec3 goldCore = vec3(1.0, 0.7, 0.2);
    vec3 deepOrange = vec3(0.9, 0.3, 0.05);
    vec3 spaceRed = vec3(0.5, 0.05, 0.01);
    
    vec3 color = mix(spaceRed, deepOrange, pow(intensity, 0.6));
    color = mix(color, goldCore, pow(intensity, 1.5));
    color = mix(color, whiteHot, pow(intensity, 4.0));
    
    float photonRing = exp(-abs(r - horizonSize * 1.05) * 140.0) * 2.2;
    color += whiteHot * photonRing;
    
    float haze = exp(-r * 1.8) * 0.1 + exp(-abs(r - topLensRadius) * 4.0) * 0.03;
    color += deepOrange * haze;
    
    float alphaLayer = clamp(intensity * 1.5 + photonRing + haze * 1.5, 0.0, 1.0);
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

const BlackHole = ({ position = [0, 0, 0], scale = [17, 17, 1] }: { position?: [number, number, number], scale?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      material.uniforms.uMouse.value.x += (state.mouse.x - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (state.mouse.y - material.uniforms.uMouse.value.y) * 0.05;

      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
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
