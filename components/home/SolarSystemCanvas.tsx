"use client";

import { useEffect, useRef } from "react";
import { SOLAR_TECHS, RING_SLOTS } from "@/lib/constants";

const C_GREEN = { r: 162, g: 231, b: 115 };
const C_PURPLE = { r: 160, g: 140, b: 255 };
type Col = typeof C_GREEN;

export default function SolarSystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Canvas text can't use CSS custom properties directly — resolve
       the actual (next/font-generated) display font name once here. */
    const displayFont =
      getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() ||
      "sans-serif";

    let animId: number;
    let t = 0;

    const RING_CFG = [
      { rx: 0, ry: 0, speed: 0.00038, dotR: 5.5, fs: 18, fw: 700, labelOff: 18, glowMult: 1.5 },
      { rx: 0, ry: 0, speed: 0.00024, dotR: 4, fs: 14, fw: 600, labelOff: 14, glowMult: 1.0 },
      { rx: 0, ry: 0, speed: 0.00014, dotR: 2.5, fs: 10, fw: 500, labelOff: 10, glowMult: 0.65 },
    ];

    type Flare = {
      fromRing: number;
      fromSlot: number;
      toRing: number;
      toSlot: number;
      life: number;
      maxLife: number;
      col: Col;
    };
    let flares: Flare[] = [];

    type Asteroid = { angle: number; speed: number; size: number; alpha: number; rOff: number };
    let asteroids: Asteroid[] = [];

    type Comet = {
      angle: number;
      dist: number;
      vAngle: number;
      vDist: number;
      life: number;
      maxLife: number;
      trail: { x: number; y: number }[];
    };
    let comets: Comet[] = [];
    let cometTimer = 0;

    let cx = 0;
    let cy = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = canvas.width * 0.7;
      cy = canvas.height * 0.5;
      const W = canvas.width * 0.6;
      RING_CFG[0].rx = W * 0.28;
      RING_CFG[0].ry = canvas.height * 0.22;
      RING_CFG[1].rx = W * 0.5;
      RING_CFG[1].ry = canvas.height * 0.36;
      RING_CFG[2].rx = W * 0.73;
      RING_CFG[2].ry = canvas.height * 0.45;
    };

    const init = () => {
      asteroids = Array.from({ length: 140 }, () => ({
        angle: Math.random() * Math.PI * 2,
        speed: 0.00005 + Math.random() * 0.00007,
        size: 0.5 + Math.random() * 1.3,
        alpha: 0.1 + Math.random() * 0.18,
        rOff: -0.02 + Math.random() * 0.04,
      }));
      flares = [];
      comets = [];
      cometTimer = 0;
    };

    const getPos = (ring: number, slot: number, time: number) => {
      const cfg = RING_CFG[ring];
      const total = RING_SLOTS[ring];
      const baseAngle = (slot / total) * Math.PI * 2;
      const angle = baseAngle + time * cfg.speed * (ring === 1 ? -1 : 1);
      return {
        x: cx + cfg.rx * Math.cos(angle),
        y: cy + cfg.ry * Math.sin(angle),
        angle,
      };
    };

    const spawnFlare = () => {
      if (flares.length >= 5) return;
      const r1 = Math.floor(Math.random() * 3);
      const r2 = Math.floor(Math.random() * 3);
      if (r1 === r2) return;
      const s1 = Math.floor(Math.random() * RING_SLOTS[r1]);
      const s2 = Math.floor(Math.random() * RING_SLOTS[r2]);
      const tech1 = SOLAR_TECHS.find((tt) => tt.ring === r1 && tt.slot === s1);
      const tech2 = SOLAR_TECHS.find((tt) => tt.ring === r2 && tt.slot === s2);
      if (!tech1 || !tech2) return;
      const col = tech1.cat === "fe" ? C_GREEN : C_PURPLE;
      flares.push({ fromRing: r1, fromSlot: s1, toRing: r2, toSlot: s2, life: 0, maxLife: 150, col });
    };

    const spawnComet = () => {
      comets.push({
        angle: Math.random() * Math.PI * 2,
        dist: 0.9,
        vAngle: 0.007 + Math.random() * 0.005,
        vDist: -0.006,
        life: 0,
        maxLife: 100,
        trail: [],
      });
    };

    const drawFlare = (x1: number, y1: number, x2: number, y2: number, progress: number, col: Col, alpha: number) => {
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = mx - cx;
      const dy = my - cy;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const bow = 55;
      const cpx = mx + (dx / len) * bow;
      const cpy = my + (dy / len) * bow;

      ctx.save();
      const totalLen = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 1.4;
      ctx.beginPath();
      ctx.setLineDash([totalLen * progress, totalLen]);
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cpx, cpy, x2, y2);
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, `rgba(${col.r},${col.g},${col.b},0)`);
      grad.addColorStop(0.5, `rgba(${col.r},${col.g},${col.b},${alpha})`);
      grad.addColorStop(1, `rgba(255,255,255,${alpha * 0.5})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]);

      const headT = progress;
      const hx = (1 - headT) * (1 - headT) * x1 + 2 * (1 - headT) * headT * cpx + headT * headT * x2;
      const hy = (1 - headT) * (1 - headT) * y1 + 2 * (1 - headT) * headT * cpy + headT * headT * y2;
      const bloom = ctx.createRadialGradient(hx, hy, 0, hx, hy, 10);
      bloom.addColorStop(0, `rgba(255,255,255,${alpha})`);
      bloom.addColorStop(0.4, `rgba(${col.r},${col.g},${col.b},${alpha * 0.5})`);
      bloom.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
      ctx.beginPath();
      ctx.arc(hx, hy, 10, 0, Math.PI * 2);
      ctx.fillStyle = bloom;
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;
      cometTimer++;
      if (cometTimer > 300) { cometTimer = 0; spawnComet(); }
      if (t % 100 === 0) spawnFlare();

      const pulse = 0.5 + 0.5 * Math.sin(t * 0.025);

      // Orbit ellipses
      for (let ring = 0; ring < 3; ring++) {
        const cfg = RING_CFG[ring];
        ctx.save();
        ctx.translate(cx, cy);
        ctx.beginPath();
        ctx.ellipse(0, 0, cfg.rx, cfg.ry, 0, 0, Math.PI * 2);
        ctx.setLineDash([3, ring === 0 ? 11 : ring === 1 ? 9 : 7]);
        ctx.strokeStyle = `rgba(${ring === 0 ? "162,231,115" : ring === 1 ? "140,130,220" : "80,200,200"},${0.09 - ring * 0.015})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
        ctx.setLineDash([]);
      }

      // Asteroid belt
      const ar1 = RING_CFG[1];
      const ar2 = RING_CFG[2];
      for (const a of asteroids) {
        a.angle += a.speed;
        const frac = 0.5 + a.rOff;
        const arx = ar1.rx + (ar2.rx - ar1.rx) * frac;
        const ary = ar1.ry + (ar2.ry - ar1.ry) * frac;
        const ax = cx + arx * Math.cos(a.angle);
        const ay = cy + ary * Math.sin(a.angle);
        ctx.beginPath();
        ctx.arc(ax, ay, a.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,180,200,${a.alpha})`;
        ctx.fill();
      }

      // Comets
      comets = comets.filter((c) => c.life < c.maxLife);
      for (const c of comets) {
        c.life++;
        c.angle += c.vAngle;
        c.dist += c.vDist;
        const maxR = Math.max(canvas.width, canvas.height) * 0.6;
        const cr = maxR * Math.max(0.1, c.dist);
        const ccx = cx + cr * Math.cos(c.angle);
        const ccy = cy + cr * 0.72 * Math.sin(c.angle);
        c.trail.push({ x: ccx, y: ccy });
        if (c.trail.length > 20) c.trail.shift();
        for (let i = 1; i < c.trail.length; i++) {
          const ta = (i / c.trail.length) * 0.5 * (1 - c.life / c.maxLife);
          ctx.beginPath();
          ctx.moveTo(c.trail[i - 1].x, c.trail[i - 1].y);
          ctx.lineTo(c.trail[i].x, c.trail[i].y);
          ctx.strokeStyle = `rgba(200,220,255,${ta})`;
          ctx.lineWidth = 1.5 * (i / c.trail.length);
          ctx.stroke();
        }
        const hg = ctx.createRadialGradient(ccx, ccy, 0, ccx, ccy, 5);
        hg.addColorStop(0, "rgba(255,255,255,0.9)");
        hg.addColorStop(1, "rgba(150,200,255,0)");
        ctx.beginPath();
        ctx.arc(ccx, ccy, 5, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();
      }

      // Flares
      flares = flares.filter((f) => f.life < f.maxLife);
      for (const f of flares) {
        f.life++;
        const progress = f.life / f.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.5;
        const p1 = getPos(f.fromRing, f.fromSlot, t);
        const p2 = getPos(f.toRing, f.toSlot, t);
        drawFlare(p1.x, p1.y, p2.x, p2.y, progress, f.col, alpha);
      }

      // Planet nodes
      for (const tech of SOLAR_TECHS) {
        const cfg = RING_CFG[tech.ring];
        const col: Col = tech.cat === "fe" ? C_GREEN : C_PURPLE;
        const pos = getPos(tech.ring, tech.slot, t);
        const glow = 0.5 + 0.5 * Math.sin(t * (0.018 + tech.slot * 0.003) + tech.slot);

        const bloomR = cfg.dotR * (tech.ring === 0 ? 9 : 6);
        const bg = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, bloomR);
        bg.addColorStop(0, `rgba(${col.r},${col.g},${col.b},${0.22 * glow * cfg.glowMult})`);
        bg.addColorStop(0.5, `rgba(${col.r},${col.g},${col.b},${0.07 * glow})`);
        bg.addColorStop(1, `rgba(${col.r},${col.g},${col.b},0)`);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, bloomR, 0, Math.PI * 2);
        ctx.fillStyle = bg;
        ctx.fill();

        if (tech.ring === 0) {
          const moonAngle = t * 0.012 + tech.slot * 1.4;
          const moonR = cfg.dotR * 2.8;
          ctx.save();
          ctx.translate(pos.x, pos.y);
          ctx.rotate(0.4);
          ctx.beginPath();
          ctx.ellipse(0, 0, moonR, moonR * 0.38, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${0.18 * glow})`;
          ctx.lineWidth = 0.7;
          ctx.setLineDash([2, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
          const mx = pos.x + moonR * Math.cos(moonAngle);
          const my = pos.y + moonR * 0.38 * Math.sin(moonAngle);
          ctx.beginPath();
          ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${0.55 * glow})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, cfg.dotR + 3 + glow * 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${0.18 * glow})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        const pf = ctx.createRadialGradient(pos.x - cfg.dotR * 0.35, pos.y - cfg.dotR * 0.35, 0, pos.x, pos.y, cfg.dotR);
        pf.addColorStop(0, "rgba(255,255,255,0.95)");
        pf.addColorStop(0.45, `rgba(${col.r},${col.g},${col.b},0.9)`);
        pf.addColorStop(1, `rgba(${Math.floor(col.r * 0.4)},${Math.floor(col.g * 0.4)},${Math.floor(col.b * 0.4)},0.85)`);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, cfg.dotR, 0, Math.PI * 2);
        ctx.fillStyle = pf;
        ctx.fill();

        const outDir = Math.cos(pos.angle) >= 0 ? 1 : -1;
        const lx = pos.x + outDir * (cfg.dotR + cfg.labelOff);
        const ly = pos.y + (Math.sin(pos.angle) > 0 ? 1 : -1) * (cfg.dotR + 6);
        ctx.font = `${cfg.fw} ${cfg.fs}px ${displayFont}`;
        ctx.textAlign = outDir > 0 ? "left" : "right";
        ctx.textBaseline = "middle";
        const la = tech.ring === 0 ? 0.75 + 0.25 * glow : tech.ring === 1 ? 0.5 + 0.2 * glow : 0.32 + 0.15 * glow;
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${la})`;
        ctx.fillText(tech.label.toUpperCase(), lx, ly);
        ctx.beginPath();
        ctx.moveTo(pos.x + outDir * (cfg.dotR + 2), pos.y);
        ctx.lineTo(pos.x + outDir * (cfg.dotR + cfg.labelOff - 3), pos.y);
        ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${0.28 * glow})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // Center glow
      for (let i = 3; i >= 0; i--) {
        const aR = 72 + i * 22 + pulse * 12;
        const ag = ctx.createRadialGradient(cx, cy, 0, cx, cy, aR);
        const aa = [0.18, 0.1, 0.05, 0.02][i] * (0.7 + 0.3 * pulse);
        ag.addColorStop(0, `rgba(162,231,115,${aa * 2})`);
        ag.addColorStop(0.4, `rgba(80,215,215,${aa})`);
        ag.addColorStop(1, `rgba(80,215,215,0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, aR, 0, Math.PI * 2);
        ctx.fillStyle = ag;
        ctx.fill();
      }

      ctx.save();
      ctx.translate(cx, cy);
      const ringAngle = t * 0.0004;
      ctx.rotate(ringAngle);
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.setLineDash([6, 12]);
      ctx.strokeStyle = `rgba(162,231,115,${0.22 + 0.1 * pulse})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-ringAngle * 1.5);
      ctx.beginPath();
      ctx.arc(0, 0, 68, 0, Math.PI * 2);
      ctx.setLineDash([3, 16]);
      ctx.strokeStyle = `rgba(80,215,215,${0.14 + 0.07 * pulse})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]);

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
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-solar" />;
}
