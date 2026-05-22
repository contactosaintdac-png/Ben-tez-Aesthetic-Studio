import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPosition;

float random(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  
  // High-frequency sandblasted grain (micro-texture)
  float grain = random(gl_FragCoord.xy);
  
  // Perturb the normal with the grain to scatter light (vidrio arenado)
  vec3 sandblastedNormal = normalize(normal + vec3((grain - 0.5) * 0.18, (grain - 0.5) * 0.18, 0.0));
  
  // Normalized brand colors
  vec3 colorPeriwinkle = vec3(0.89, 0.85, 0.99);      // #E3D9FC
  vec3 colorHyperMagenta = vec3(0.75, 0.25, 0.98);    // #BF40FA
  vec3 colorUltrasonicBlue = vec3(0.29, 0.16, 0.76);  // #4928C2
  vec3 colorVelvetPurple = vec3(0.36, 0.16, 0.38);    // #5B2A62
  
  // Reflection vector for lighting using perturbed sandblasted normal
  vec3 reflectDir = reflect(-viewDir, sandblastedNormal);
  
  // DIFFUSE METALLIC REFLECTIONS (Frosted glass sheen)
  // Light 1: overhead soft (Velvet Purple)
  float light1 = max(dot(reflectDir, vec3(0.0, 1.0, 0.2)), 0.0);
  vec3 reflectColor1 = colorVelvetPurple * 0.8 * pow(light1, 5.0);
  
  // Light 2: left-side tube (Hyper Magenta)
  float light2 = max(dot(reflectDir, vec3(-1.0, 0.1, 0.4)), 0.0);
  vec3 reflectColor2 = colorHyperMagenta * 0.9 * pow(light2, 8.0);
  
  // Light 3: right-side cool (Ultrasonic Blue)
  float light3 = max(dot(reflectDir, vec3(1.0, -0.1, -0.3)), 0.0);
  vec3 reflectColor3 = colorUltrasonicBlue * 1.1 * pow(light3, 10.0);
  
  // Base glass color (very soft purple-blue tint, completely flat, no wavy cloth texture)
  vec3 baseColor = mix(colorVelvetPurple * 0.05, colorPeriwinkle * 0.03, 0.5);
  baseColor += reflectColor1 * 0.5 + reflectColor2 * 0.7 + reflectColor3 * 0.7;
  
  // Softer white specular glint typical of sandblasted surface (exponent lowered to 45.0)
  vec3 lightDirSpec = normalize(vec3(0.5, 1.2, 0.8));
  vec3 halfDir = normalize(viewDir + lightDirSpec);
  float spec = pow(max(dot(sandblastedNormal, halfDir), 0.0), 45.0);
  vec3 specHighlight = colorPeriwinkle * spec * 1.2;
  
  // Fresnel edge glow for distinct glass outline using sandblasted normal
  float fresnel = pow(1.0 - max(dot(sandblastedNormal, viewDir), 0.0), 4.0);
  vec3 rimColor = colorPeriwinkle * fresnel * 0.45;
  
  vec3 finalColor = baseColor + specHighlight + rimColor;
  
  // Add a very subtle physical grain texture to the final color
  finalColor += (grain - 0.5) * 0.03 * colorPeriwinkle;
  
  // Premium Translucent Glass Opacity
  // Base transparency is 12% in the center to let the blurred silk show,
  // scaling up to 60% on edges for the glass border.
  float alpha = mix(0.12, 0.60, fresnel);
  
  // Specular glints should be opaque so they pop
  alpha = max(alpha, spec * 0.85);
  
  // Bright reflections also add opacity to simulate real glass reflections
  float reflectionIntensity = max(max(reflectColor1.r, reflectColor2.g), reflectColor3.b);
  alpha = max(alpha, reflectionIntensity * 0.6);
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;

function CardMesh({ mouse }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  // Exactly covers the HTML container bounds
  const width = viewport.width;
  const height = viewport.height;
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();
    uniforms.uTime.value = elapsedTime;

    // Map normalized mouse to canvas coordinates
    const targetMouseX = mouse.current.x * (viewport.width / 2);
    const targetMouseY = mouse.current.y * (viewport.height / 2);
    
    uniforms.uMouse.value.x = THREE.MathUtils.lerp(uniforms.uMouse.value.x, targetMouseX, 0.05);
    uniforms.uMouse.value.y = THREE.MathUtils.lerp(uniforms.uMouse.value.y, targetMouseY, 0.05);

    if (meshRef.current) {
      // Very slight local rotation
      meshRef.current.rotation.y = Math.sin(elapsedTime * 0.1) * 0.015;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height, 2, 2]} />
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

export default function LiquidGlassCardCanvas({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.0], fov: 40 }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <CardMesh mouse={mouse} />
    </Canvas>
  );
}
