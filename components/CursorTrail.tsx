"use client";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  type: "star" | "dot" | "sparkle";
};

const COLORS = [
  "#ffffff",
  "#ffffff",
  "#ffffff",
  "#cc0000",
  "#ff4444",
  "#ffaaaa",
];

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const outerX = Math.cos(angle) * size;
    const outerY = Math.sin(angle) * size;
    const innerAngle = angle + Math.PI / 4;
    const innerX = Math.cos(innerAngle) * size * 0.35;
    const innerY = Math.sin(innerAngle) * size * 0.35;
    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.restore();
}

function drawCross(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  const s = size * 0.15;
  const l = size;
  // horizontal
  ctx.moveTo(-l, -s);
  ctx.lineTo(-l, s);
  ctx.lineTo(-s, s);
  ctx.lineTo(-s, l);
  ctx.lineTo(s, l);
  ctx.lineTo(s, s);
  ctx.lineTo(l, s);
  ctx.lineTo(l, -s);
  ctx.lineTo(s, -s);
  ctx.lineTo(s, -l);
  ctx.lineTo(-s, -l);
  ctx.lineTo(-s, -s);
  ctx.closePath();
  ctx.restore();
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -999, y: -999 });
  const lastMouse = useRef({ x: -999, y: -999 });
  const frameRef = useRef<number>(0);

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

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    let frameCount = 0;

    const spawn = (x: number, y: number) => {
      const types: Particle["type"][] = ["star", "star", "dot", "dot", "sparkle"];
      const type = types[Math.floor(Math.random() * types.length)];

      // velocity — mostly upward with slight spread
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
      const speed = Math.random() * 2 + 0.5;

      particles.current.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 0.5,
        alpha: 1,
        size: type === "dot" ? Math.random() * 2 + 1 : Math.random() * 6 + 3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        type,
      });
    };

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // spawn particles on mouse move
      frameCount++;
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3 && frameCount % 2 === 0) {
        const count = Math.min(Math.floor(dist / 4) + 1, 4);
        for (let i = 0; i < count; i++) {
          spawn(
            lastMouse.current.x + (dx * i) / count,
            lastMouse.current.y + (dy * i) / count
          );
        }
      }
      lastMouse.current = { ...mouse.current };

      // update & draw
      particles.current = particles.current.filter((p) => p.alpha > 0.01);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gentle gravity
        p.vx *= 0.98;
        p.alpha -= 0.022;
        p.rotation += p.rotationSpeed;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.type === "dot" ? 4 : 10;

        ctx.beginPath();

        if (p.type === "dot") {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "star") {
          drawStar(ctx, p.x, p.y, p.size, p.rotation);
          ctx.fill();
        } else {
          // sparkle = thin cross / plus
          drawCross(ctx, p.x, p.y, p.size * 0.6, p.rotation);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}
