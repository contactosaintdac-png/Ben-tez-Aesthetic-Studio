import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Load texture globally (outside component render cycle) to avoid React 19/Drei HMR hooks issues
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/violet_satin_matcap.png", (texture) => {
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
});

const vertexShader = `
varying vec3 vPosition;
varying vec3 vViewPosition;
varying vec3 vViewTangent;
varying vec3 vViewBitangent;
varying vec3 vViewNormal;

void main() {
  vPosition = position;
  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;
  
  // Transform local axes to view space for per-pixel normal mapping
  vViewTangent = normalize(normalMatrix * vec3(1.0, 0.0, 0.0));
  vViewBitangent = normalize(normalMatrix * vec3(0.0, 1.0, 0.0));
  vViewNormal = normalize(normalMatrix * vec3(0.0, 0.0, 1.0));
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uMatcap;
uniform float uTime;
uniform float uNoiseSpeed;
uniform float uNoiseStrength;
uniform vec2 uMouse;

varying vec3 vPosition;
varying vec3 vViewPosition;
varying vec3 vViewTangent;
varying vec3 vViewBitangent;
varying vec3 vViewNormal;

// Function to calculate wave displacement (smooth, continuous trigonometric folds)
float getDisplacement(vec3 pos) {
  // We slightly increase the frequencies to make the folds and waves visible across the viewport
  float wave1 = sin(pos.x * 0.60 + uTime * uNoiseSpeed * 1.2) * cos(pos.y * 0.50 + uTime * uNoiseSpeed * 0.6) * 0.95;
  float wave2 = sin(pos.y * 0.52 - uTime * uNoiseSpeed * 1.4) * cos(pos.x * 0.34 + uTime * uNoiseSpeed * 0.9) * 0.45;
  float wave3 = sin((pos.x + pos.y) * 0.28 + uTime * uNoiseSpeed * 0.75) * 0.3;
  
  // Subtle mouse physical interaction
  float dist = distance(pos.xy, uMouse);
  float mouseForce = smoothstep(8.0, 0.0, dist);
  float mouseWarp = sin(dist * 1.2 - uTime * 1.8) * 0.12 * mouseForce;
  
  return (wave1 + wave2 + wave3) * uNoiseStrength + mouseForce * 0.40 + mouseWarp;
}

void main() {
  vec3 T = normalize(vViewTangent);
  vec3 B = normalize(vViewBitangent);
  vec3 N = normalize(vViewNormal);
  
  // Finite differences for smooth normal calculation per pixel
  float eps = 0.06;
  float h = getDisplacement(vPosition);
  float hx = getDisplacement(vPosition + vec3(eps, 0.0, 0.0));
  float hy = getDisplacement(vPosition + vec3(0.0, eps, 0.0));
  
  float dhdx = (hx - h) / eps;
  float dhdy = (hy - h) / eps;
  
  // Transform displaced normal from tangent/local space to view space
  // We amplify the derivatives by a factor of 4.5 for visible but smooth folds
  vec3 normal = normalize(-dhdx * T * 4.5 - dhdy * B * 4.5 + N);
  
  // Normalized brand colors
  vec3 colorPeriwinkle = vec3(0.89, 0.85, 0.99);      // #E3D9FC
  vec3 colorHyperMagenta = vec3(0.75, 0.25, 0.98);    // #BF40FA
  vec3 colorUltrasonicBlue = vec3(0.29, 0.16, 0.76);  // #4928C2
  vec3 colorVelvetPurple = vec3(0.36, 0.16, 0.38);    // #5B2A62 (Actual brand purple)
  
  // View vector
  vec3 viewDir = normalize(vViewPosition);
  
  // 1. PROCEDURAL SATIN SHADING
  // Base color varies with height to create depth in the folds, blending deep purple and ultrasonic blue
  vec3 baseColor = mix(
    colorVelvetPurple * 0.25,
    colorVelvetPurple * 0.70 + colorUltrasonicBlue * 0.18,
    h * 0.5 + 0.5
  );
  
  // Lights directions
  vec3 lightDir1 = normalize(vec3(-1.0, 1.2, 0.5));
  vec3 lightDir2 = normalize(vec3(1.2, 0.8, 0.4));
  
  // Soft diffuse term to bring out the volume and curves of the fabric folds
  float diff1 = max(dot(normal, lightDir1), 0.0);
  float diff2 = max(dot(normal, lightDir2), 0.0);
  vec3 diffColor = colorUltrasonicBlue * diff1 * 0.35 + colorHyperMagenta * diff2 * 0.20;
  
  // Light 1: Cool Periwinkle from top-left (lowered specular exponent to broaden and soften highlights)
  vec3 H1 = normalize(viewDir + lightDir1);
  float spec1 = pow(max(dot(normal, H1), 0.0), 10.0);
  vec3 specColor1 = colorPeriwinkle * spec1 * 0.35;
  
  // Light 2: Hyper Magenta from top-right
  vec3 H2 = normalize(viewDir + lightDir2);
  float spec2 = pow(max(dot(normal, H2), 0.0), 8.0);
  vec3 specColor2 = colorHyperMagenta * spec2 * 0.25;
  
  // Silk anisotropic sheen along ridges
  float silkSheen = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.5);
  vec3 sheenColor = colorUltrasonicBlue * silkSheen * 0.45;
  
  // Fresnel edge glow
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
  vec3 rimColor = colorPeriwinkle * fresnel * 0.25;
  
  vec3 proceduralColor = baseColor + diffColor + specColor1 + specColor2 + sheenColor + rimColor;
  
  // 2. SAMPLE MATCAP
  vec2 uv = normal.xy * 0.5 + 0.5;
  vec3 matcapColor = texture2D(uMatcap, uv).rgb;
  
  // 3. COMBINE PROCEDURAL AND MATCAP
  // Safe branchless blend: if matcap is loaded (length > 0.01), we overlay it screen-style to avoid darkening the fabric.
  float hasMatcap = step(0.01, length(matcapColor));
  vec3 blendedColor = mix(
    proceduralColor,
    proceduralColor + matcapColor * 0.35,
    hasMatcap
  );
  
  // Soft fade on edges to blend seamlessly into the dark website body
  float edgeFade = 1.0 - smoothstep(0.8, 1.2, length(vPosition.xy / vec2(12.5, 12.5)));
  
  gl_FragColor = vec4(blendedColor, edgeFade * 0.95);
}
`;

function FabricMesh({ mouse }) {
  const meshRef = useRef();
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseSpeed: { value: 0.15 },
      uNoiseStrength: { value: 0.70 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMatcap: { value: matcapTexture }
    }),
    []
  );

  useFrame((state) => {
    const { clock, viewport } = state;
    const elapsedTime = clock.getElapsedTime();
    uniforms.uTime.value = elapsedTime;

    // Map screen mouse [-1, 1] to Three viewport coords
    const targetMouseX = mouse.current.x * (viewport.width / 2);
    const targetMouseY = mouse.current.y * (viewport.height / 2);
    
    uniforms.uMouse.value.x = THREE.MathUtils.lerp(uniforms.uMouse.value.x, targetMouseX, 0.04);
    uniforms.uMouse.value.y = THREE.MathUtils.lerp(uniforms.uMouse.value.y, targetMouseY, 0.04);

    if (meshRef.current) {
      // Gentle floating sway
      meshRef.current.position.z = Math.sin(elapsedTime * 0.15) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      {/* Flat plane with minimum vertices since displacement is computed per-pixel in fragment shader */}
      <planeGeometry args={[25, 25, 2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function FabricBackgroundCanvas({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.0], fov: 50 }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <FabricMesh mouse={mouse} />
    </Canvas>
  );
}


