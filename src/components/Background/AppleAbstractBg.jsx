import { useEffect, useRef } from "react";
import * as THREE from 'three';
import "./AppleAbstractBg.scss";

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float scrollY;
  uniform vec2 resolution;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform vec3 color4;
  varying vec2 vUv;

  // Fonction pour dessiner un blob organique
  float blob(vec2 uv, vec2 center, float radius, float t, float seed, float scrollY) {
    vec2 p = uv - center;
    float angle = atan(p.y, p.x);
    float r = radius
      + 0.09 * sin(angle * 3.0 + t * 0.7 + seed + scrollY * 0.8)
      + 0.06 * cos(angle * 5.0 - t * 0.4 + seed - scrollY * 0.5)
      + 0.04 * sin(scrollY * 2.0 + seed * 2.0);
    float d = length(p);
    return smoothstep(r, r - 0.18, d);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float t = time * 0.07; // Animation plus lente

    // Blur sampling
    vec3 col = vec3(0.0);
    float total = 0.0;
    int samples = 10;
    float blurSize = 0.025;
    for (int i = 0; i < samples; i++) {
      float a = float(i) * 6.2831853 / float(samples);
      vec2 offset = vec2(cos(a), sin(a)) * blurSize;
      vec2 uvb = uv + offset;

      // Positions animées des 4 blobs
      vec2 c1 = vec2(0.30 + 0.08*sin(t), 0.32 + 0.07*cos(t));
      vec2 c2 = vec2(0.75 + 0.07*cos(t+1.5), 0.28 + 0.09*sin(t+1.2));
      vec2 c3 = vec2(0.25 + 0.09*cos(t+2.2), 0.75 + 0.08*sin(t+2.5));
      vec2 c4 = vec2(0.70 + 0.08*sin(t+2.8), 0.70 + 0.07*cos(t+2.1));

      float b1 = blob(uvb, c1, 0.45, t, 0.0, scrollY);
      float b2 = blob(uvb, c2, 0.43, t, 1.3, scrollY);
      float b3 = blob(uvb, c3, 0.48, t, 2.7, scrollY);
      float b4 = blob(uvb, c4, 0.44, t, 4.2, scrollY);

      float bsum = b1 + b2 + b3 + b4;
      vec3 csum = vec3(0.0);
      csum += color1 * b1;
      csum += color2 * b2;
      csum += color3 * b3;
      csum += color4 * b4;
      if (bsum > 0.0) csum /= bsum;

      col += csum;
      total += 1.0;
    }
    col /= total;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function AppleAbstractBg() {

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Création du matériau avec les shaders
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        scrollY: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        color1: { value: new THREE.Color("#bb58d9") },
        color2: { value: new THREE.Color("#7154cb") },
        color3: { value: new THREE.Color("#363bd3") },
        color4: { value: new THREE.Color("#251769") }
      },
      vertexShader,
      fragmentShader
    });

    // Création du mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let scrollY = window.scrollY || 0;
    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', onScroll);

    // Resize handler
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      material.uniforms.resolution.value.set(width, height);
    };
    window.addEventListener('resize', onResize);
    onResize();

    const animate = (time) => {
      material.uniforms.time.value = time * 0.001;
      material.uniforms.scrollY.value = scrollY / window.innerHeight;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="backdrop">
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1
        }}
      />
    </div>
  );
}