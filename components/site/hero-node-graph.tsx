'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  baseAlpha: number;
  alpha: number;
  radius: number;
}

const LABELS = [
  'FastAPI', 'Neo4j', 'Docker', 'Redis',
  'AWS', 'PostgreSQL', 'Celery', 'React',
  'Node.js', 'Python', 'Nginx', 'GitHub Actions',
];

// Semantic edge pairs by label index
const EDGE_PAIRS: [number, number][] = [
  [0, 9],  // FastAPI ↔ Python
  [9, 6],  // Python ↔ Celery
  [6, 3],  // Celery ↔ Redis
  [3, 5],  // Redis ↔ PostgreSQL
  [2, 10], // Docker ↔ Nginx
  [10, 4], // Nginx ↔ AWS
  [0, 1],  // FastAPI ↔ Neo4j
  [7, 8],  // React ↔ Node.js
  [2, 4],  // Docker ↔ AWS
  [11, 4], // GitHub Actions ↔ AWS
  [6, 5],  // Celery ↔ PostgreSQL
];

function createNodes(w: number, h: number): Node[] {
  return LABELS.map((label) => ({
    x: 80 + Math.random() * (w - 160),
    y: 80 + Math.random() * (h - 160),
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    label,
    baseAlpha: 0.18 + Math.random() * 0.12,
    alpha: 0.18,
    radius: 4,
  }));
}

export function HeroNodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    let raf = 0;
    let nodes: Node[] = [];
    const mouse = { x: -999, y: -999 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = createNodes(w, h);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update node positions + proximity alpha
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 60 || node.x > w - 60) node.vx *= -1;
        if (node.y < 60 || node.y > h - 60) node.vy *= -1;

        const dist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
        const target = dist < 200 ? Math.min(0.9, node.baseAlpha + (1 - dist / 200) * 0.7) : node.baseAlpha;
        node.alpha += (target - node.alpha) * 0.08;
      });

      // Draw edges
      EDGE_PAIRS.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        const proximity = Math.max(a.alpha, b.alpha);
        const edgeAlpha = proximity > 0.4 ? proximity * 0.5 : 0.05;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(167,139,250,${edgeAlpha})`;
        ctx.lineWidth = proximity > 0.4 ? 1 : 0.5;
        ctx.stroke();
      });

      // Draw nodes + labels
      nodes.forEach(node => {
        // Glow ring on hover
        if (node.alpha > 0.4) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 14, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(167,139,250,${(node.alpha - 0.4) * 0.15})`;
          ctx.fill();
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${node.alpha})`;
        ctx.fill();

        // Label
        ctx.font = `500 10px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(255,255,255,${node.alpha * 0.8})`;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 20);
      });

      raf = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -999; mouse.y = -999; };

    resize();
    draw();

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 hidden h-full w-full md:block"
      aria-hidden="true"
      style={{ opacity: 0.85 }}
    />
  );
}
