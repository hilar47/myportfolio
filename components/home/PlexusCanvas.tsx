"use client";

import { useEffect, useRef } from "react";

export default function PlexusCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Canvas can't read CSS at all, so it needs its own theme-aware
       palette. Light mode uses the same primary red as the Skills
       tech cloud / SolarSystemCanvas (#DA000C / 218,0,12) instead of
       gray, and line opacity is boosted since the pale blue-gray
       alpha values were calibrated for a dark backdrop and read as
       nearly invisible on white. isLightRef is updated live by the
       "themechange" event ThemeToggle fires, so toggling mid-session
       recolors it immediately instead of needing a reload. */
    const isLightRef = { current: document.documentElement.getAttribute("data-theme") === "light" };
    const onThemeChange = () => {
      isLightRef.current = document.documentElement.getAttribute("data-theme") === "light";
    };
    window.addEventListener("themechange", onThemeChange);

    let animId: number;
    const PARTICLE_COUNT = 55;
    const MAX_DIST = 160;
    const DOT_RADIUS = 1.5;

    type Particle = { x: number; y: number; vx: number; vy: number };
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.13;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isLightRef.current
              ? `rgba(218, 0, 12, ${Math.min(1, alpha * 3.2)})`
              : `rgba(180, 190, 220, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = isLightRef.current
          ? "rgba(218, 0, 12, 0.55)"
          : "rgba(200, 210, 235, 0.3)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", onThemeChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-plexus" />;
}