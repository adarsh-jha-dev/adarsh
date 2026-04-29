"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.75,
        size: Math.random() * 3 + 1.5,
      });
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.alpha > 0.01);
      for (const p of particles.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94,255,138,${p.alpha.toFixed(3)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(94,255,138,0.4)";
        ctx.fill();
        p.alpha *= 0.87;
        p.size *= 0.95;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[200]"
      aria-hidden
    />
  );
}
