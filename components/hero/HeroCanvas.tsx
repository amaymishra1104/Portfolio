'use client';

import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  category: 'agent' | 'api' | 'ml' | 'data' | 'app';
  radius: number;
}

const LABELS: { label: string; category: Node['category'] }[] = [
  { label: 'AGENT_ROUTER', category: 'agent' },
  { label: 'FASTAPI_GATEWAY', category: 'api' },
  { label: 'RAG_INDEX', category: 'data' },
  { label: 'XGB_SCORER', category: 'ml' },
  { label: 'POSTGIS_CLUSTER', category: 'data' },
  { label: 'NEXTJS_SSR', category: 'app' },
  { label: 'HMAC_VALIDATOR', category: 'agent' },
  { label: 'CHROMA_VECTOR', category: 'data' },
];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize nodes
    const nodes: Node[] = LABELS.map((item, i) => {
      const angle = (i / LABELS.length) * Math.PI * 2;
      const dist = Math.min(width, height) * 0.35;
      return {
        x: width / 2 + Math.cos(angle) * dist + (Math.random() * 40 - 20),
        y: height / 2 + Math.sin(angle) * dist + (Math.random() * 40 - 20),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        label: item.label,
        category: item.category,
        radius: 4,
      };
    });

    let packetProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for (let x = 20; x < width; x += 40) {
        for (let y = 20; y < height; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 50 || node.x > width - 50) node.vx *= -1;
        if (node.y < 50 || node.y > height - 50) node.vy *= -1;
      });

      // Connect nodes with thin technical lines
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 260) {
            const alpha = Math.max(0, 1 - dist / 260) * 0.15;
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Animated packet pulse on selected lines
            if ((i + j) % 3 === 0) {
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * ((packetProgress + i * 0.2) % 1);
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * ((packetProgress + i * 0.2) % 1);
              ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      packetProgress += 0.003;

      // Draw nodes and badges
      nodes.forEach((node) => {
        // Node halo
        ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.fillStyle = node.category === 'agent' ? '#10b981' : node.category === 'ml' ? '#06b6d4' : '#64748b';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Monospace technical tag
        ctx.font = '9px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillText(node.label, node.x + 8, node.y + 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
