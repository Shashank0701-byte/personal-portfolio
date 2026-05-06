'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 110;
const CONNECTION_DIST = 2.4;
const SPEED = 0.0038;

export function HeroParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 8;

    // ── Particles ─────────────────────────────────────────────────────────────
    const positions  = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      velocities[i * 3]     = (Math.random() - 0.5) * SPEED;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * SPEED;
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({ size: 0.05, color: 0xa78bfa, transparent: true, opacity: 0.6, sizeAttenuation: true });
    const dots   = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    // ── Connection lines ──────────────────────────────────────────────────────
    const maxLines    = PARTICLE_COUNT * PARTICLE_COUNT;
    const linePos     = new Float32Array(maxLines * 6);
    const lineCol     = new Float32Array(maxLines * 6);
    const lineGeo     = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineCol, 3).setUsage(THREE.DynamicDrawUsage));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.7 });
    const lines   = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 14;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 8;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Move particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3]     += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        if (Math.abs(positions[i * 3])     > 7.2) velocities[i * 3]     *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 4.6) velocities[i * 3 + 1] *= -1;
      }
      (dotGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Build lines
      let li = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ax = positions[i * 3], ay = positions[i * 3 + 1];
        const mdx = ax - mouse.x, mdy = ay - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const boost = mDist < 2.8 ? (1 - mDist / 2.8) * 0.35 : 0;

        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const bx = positions[j * 3], by = positions[j * 3 + 1];
          const dx = ax - bx, dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECTION_DIST) continue;

          const a = (1 - dist / CONNECTION_DIST) * 0.25 + boost;
          // Violet #a78bfa = rgb(0.655, 0.545, 0.980)
          linePos[li * 6]     = ax; linePos[li * 6 + 1] = ay; linePos[li * 6 + 2] = 0;
          linePos[li * 6 + 3] = bx; linePos[li * 6 + 4] = by; linePos[li * 6 + 5] = 0;
          for (let k = 0; k < 2; k++) {
            lineCol[(li * 6) + k * 3]     = 0.655 * a * 3.2;
            lineCol[(li * 6) + k * 3 + 1] = 0.545 * a * 3.2;
            lineCol[(li * 6) + k * 3 + 2] = 0.980 * a * 3.2;
          }
          li++;
        }
      }
      lineGeo.setDrawRange(0, li * 2);
      (lineGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeo.attributes.color    as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      dotGeo.dispose(); dotMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
