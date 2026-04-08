'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: 50 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    radius: 1 + Math.random(),
  }));
}

export function GlobalBackground() {
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas || reducedMotion || window.innerWidth < 768) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame = 0;
    const mouse = { x: width / 2, y: height / 2, active: false };
    let particles = createParticles(width, height);

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createParticles(width, height);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const connectionDistance = width * 0.15;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      });

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

          if (distance > connectionDistance) continue;

          const mouseDistance = mouse.active
            ? Math.min(
                Math.hypot(mouse.x - particle.x, mouse.y - particle.y),
                Math.hypot(mouse.x - other.x, mouse.y - other.y),
              )
            : Infinity;
          const mouseBoost = mouseDistance < 180 ? 0.16 : 0;
          const alpha = (1 - distance / connectionDistance) * 0.1 + mouseBoost;

          context.strokeStyle = `rgba(167,139,250,${Math.min(alpha, 0.24)})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }

      particles.forEach((particle) => {
        const distanceToMouse = mouse.active ? Math.hypot(mouse.x - particle.x, mouse.y - particle.y) : Infinity;
        const alpha = distanceToMouse < 140 ? 0.52 : 0.3;
        context.fillStyle = `rgba(167,139,250,${alpha})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleResize = () => resize();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    resize();
    draw();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = grainCanvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let intervalId = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(255,255,255,0.022)';

      const density = Math.floor((width * height) / 3400);
      for (let index = 0; index < density; index += 1) {
        context.fillRect(Math.random() * width, Math.random() * height, 1, 1);
      }
    };

    resize();
    draw();
    intervalId = window.setInterval(draw, reducedMotion ? 250 : 100);
    window.addEventListener('resize', resize);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={particleCanvasRef} className="absolute inset-0 hidden md:block" aria-hidden="true" />
      <canvas ref={grainCanvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
