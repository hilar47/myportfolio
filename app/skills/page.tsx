"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
// import CustomCursor from "@/components/ui/CustomCursor";
import InnerNav from "@/components/layout/InnerNav";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { SKILL_GROUPS, CLOUD_LOGOS } from "@/lib/constants";

/* ─────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────── */
interface FloatingLogo {
  name: string;
  src: string;
  /* natural image dimensions (loaded async) */
  imgW: number;
  imgH: number;
  /* max height for rendering — width auto from aspect */
  maxH: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  orbit: boolean;
  orbitRx: number;
  orbitRy: number;
  orbitSpeed: number;
  orbitAngle: number;
  pulse: number;
  pulseSpeed: number;
  wobbleAmp: number;
  wobblePhase: number;
  wobbleFreq: number;
  hoverScale: number;
  connColor: number;
  /* drag state */
  dragging: boolean;
  dragOffX: number;
  dragOffY: number;
}

/* ─────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────── */
const BRACKET_POSITIONS = [
  { top: 0,    left:  0, rotate: 0   },
  { top: 0,    right: 0, rotate: 90  },
  { bottom: 0, right: 0, rotate: 180 },
  { bottom: 0, left:  0, rotate: 270 },
] as const;

const STATS = [
  { num: "60+", label: "Technologies & Tools" },
  { num: "15+", label: "Years Coding"         },
  { num: "5+",  label: "Specialisations"      },
];

/* ─────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────── */
/** Returns render width & height capped to maxH while preserving aspect ratio */
function renderSize(imgW: number, imgH: number, maxH: number) {
  if (imgW === 0 || imgH === 0) return { w: maxH, h: maxH };
  const ratio = imgW / imgH;
  const h     = maxH;
  const w     = h * ratio;
  return { w, h };
}

/** Pick the node under a canvas-local point, returns index or -1 */
function hitTest(nodes: FloatingLogo[], px: number, py: number): number {
  // Test in reverse so top-most (last drawn) wins
  for (let i = nodes.length - 1; i >= 0; i--) {
    const node     = nodes[i];
    const { w, h } = renderSize(node.imgW, node.imgH, node.maxH * node.hoverScale);
    const hw       = w / 2;
    const hh       = h / 2;
    if (
      px >= node.x - hw - 4 &&
      px <= node.x + hw + 4 &&
      py >= node.y - hh - 4 &&
      py <= node.y + hh + 4
    ) return i;
  }
  return -1;
}

/* ─────────────────────────────────────────────────────────────────
   Canvas component
───────────────────────────────────────────────────────────────── */
function TechCloudCanvas({ logos }: { logos: typeof CLOUD_LOGOS }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef     = useRef<FloatingLogo[]>([]);
  const imagesRef    = useRef<Record<string, HTMLImageElement>>({});
  const rafRef       = useRef<number>(0);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const dragIdxRef   = useRef<number>(-1);
  const tickRef      = useRef(0);
  /* track last mouse positions for fling velocity */
  const velHistRef   = useRef<{ x: number; y: number; t: number }[]>([]);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W   = container.clientWidth;
    const H   = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    /* Canvas text can't use CSS custom properties directly — resolve
       the actual (next/font-generated) body font name once here. */
    const bodyFont =
      getComputedStyle(document.documentElement).getPropertyValue("--font-body").trim() ||
      "sans-serif";

    const cx    = W / 2;
    const cy    = H / 2;
    const pad   = 14;
    const maxRx = W / 2 - pad;
    const maxRy = H / 2 - pad;

    /* ── Preload images + record natural dimensions ── */
    const nodes: FloatingLogo[] = logos.map((logo, i) => {
      const angle  = (i / logos.length) * Math.PI * 2;
      const tMin   = 0.08;
      const tMax   = 1.0;
      const t      = tMin + Math.random() * (tMax - tMin);
      const rx     = maxRx * t;
      const ry     = maxRy * t;
      const maxH   = logo.size ?? 32;

      return {
        name:        logo.name,
        src:         logo.src,
        imgW:        0,
        imgH:        0,
        maxH,
        x:           cx + Math.cos(angle) * rx,
        y:           cy + Math.sin(angle) * ry,
        vx:          (Math.random() - 0.5) * 0.15,
        vy:          (Math.random() - 0.5) * 0.15,
        orbit:       Math.random() > 0.4,
        orbitRx:     rx,
        orbitRy:     ry,
        orbitSpeed:  (Math.random() * 0.0007 + 0.00015) * (Math.random() > 0.5 ? 1 : -1),
        orbitAngle:  angle,
        pulse:       Math.random() * Math.PI * 2,
        pulseSpeed:  0.01 + Math.random() * 0.016,
        wobbleAmp:   3 + Math.random() * 5,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleFreq:  0.3 + Math.random() * 0.5,
        hoverScale:  1,
        connColor:   Math.random(),
        dragging:    false,
        dragOffX:    0,
        dragOffY:    0,
      };
    });
    stateRef.current = nodes;

    logos.forEach((logo, i) => {
      const img       = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload      = () => {
        imagesRef.current[logo.name] = img;
        nodes[i].imgW = img.naturalWidth;
        nodes[i].imgH = img.naturalHeight;
      };
      img.onerror = () => { img.dataset.broken = "1"; imagesRef.current[logo.name] = img; };
      img.src     = logo.src;
    });

    /* ── Pointer helpers ── */
    const canvasXY = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
      const rect = canvas.getBoundingClientRect();
      const src  = "touches" in e ? e.touches[0] : e;
      return { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };

    /* ── Mouse / touch events ── */
    const onPointerMove = (e: MouseEvent) => {
      const { x, y } = canvasXY(e);
      mouseRef.current = { x, y };

      const now = performance.now();
      velHistRef.current.push({ x, y, t: now });
      if (velHistRef.current.length > 8) velHistRef.current.shift();

      const idx = dragIdxRef.current;
      if (idx !== -1) {
        const node = stateRef.current[idx];
        node.x = x + node.dragOffX;
        node.y = y + node.dragOffY;
        /* clamp to canvas */
        const { w, h } = renderSize(node.imgW, node.imgH, node.maxH);
        node.x = Math.max(w / 2 + 2, Math.min(W - w / 2 - 2, node.x));
        node.y = Math.max(h / 2 + 2, Math.min(H - h / 2 - 2, node.y));
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const { x, y } = canvasXY(e);
      const idx       = hitTest(stateRef.current, x, y);
      if (idx === -1) return;
      dragIdxRef.current = idx;
      const node = stateRef.current[idx];
      node.dragging = true;
      node.orbit    = false; // detach from orbit
      node.vx       = 0;
      node.vy       = 0;
      node.dragOffX = node.x - x;
      node.dragOffY = node.y - y;
      velHistRef.current = [];
      canvas.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
      const idx = dragIdxRef.current;
      if (idx === -1) return;
      const node = stateRef.current[idx];
      node.dragging = false;

      /* fling: compute velocity from recent mouse history */
      const hist = velHistRef.current;
      if (hist.length >= 2) {
        const last  = hist[hist.length - 1];
        const first = hist[0];
        const dt    = (last.t - first.t) / 1000; // seconds
        if (dt > 0) {
          const speed = 0.18; // dampen the fling
          node.vx = ((last.x - first.x) / dt) * speed * 0.016;
          node.vy = ((last.y - first.y) / dt) * speed * 0.016;
          /* clamp max fling speed */
          const mag = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          if (mag > 4) { node.vx = (node.vx / mag) * 4; node.vy = (node.vy / mag) * 4; }
        }
      }

      dragIdxRef.current = -1;
      velHistRef.current = [];
      canvas.style.cursor = "none";
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      if (dragIdxRef.current !== -1) onMouseUp();
    };

    canvas.addEventListener("mousemove",  onPointerMove);
    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);

    /* ── Draw loop ── */
    const draw = () => {
      tickRef.current++;
      const tick  = tickRef.current;

      ctx.clearRect(0, 0, W, H);

      const ns    = stateRef.current;
      const mouse = mouseRef.current;

      /* ── Update positions ── */
      ns.forEach((node) => {
        if (node.dragging) {
          node.pulse += node.pulseSpeed;
          return;
        }

        if (node.orbit) {
          node.orbitAngle += node.orbitSpeed;
          const perp       = node.orbitAngle + Math.PI / 2;
          const edgeFactor = 1 - Math.max(node.orbitRx / maxRx, node.orbitRy / maxRy) * 0.7;
          const wOff       = Math.sin(tick * 0.01 * node.wobbleFreq + node.wobblePhase) * node.wobbleAmp * edgeFactor;
          node.x = cx + Math.cos(node.orbitAngle) * node.orbitRx + Math.cos(perp) * wOff;
          node.y = cy + Math.sin(node.orbitAngle) * node.orbitRy + Math.sin(perp) * wOff;
        } else {
          /* free-floating with friction */
          node.x  += node.vx;
          node.y  += node.vy;
          node.vx *= 0.985;
          node.vy *= 0.985;
          /* bounce off walls */
          const { w: iw, h: ih } = renderSize(node.imgW, node.imgH, node.maxH);
          if (node.x < iw / 2 + 2)      { node.x = iw / 2 + 2;      node.vx *= -0.7; }
          if (node.x > W - iw / 2 - 2)  { node.x = W - iw / 2 - 2;  node.vx *= -0.7; }
          if (node.y < ih / 2 + 2)      { node.y = ih / 2 + 2;       node.vy *= -0.7; }
          if (node.y > H - ih / 2 - 2)  { node.y = H - ih / 2 - 2;   node.vy *= -0.7; }
          /* once nearly stopped, re-enter orbit */
          if (!node.dragging && Math.abs(node.vx) < 0.05 && Math.abs(node.vy) < 0.05) {
            node.orbit       = true;
            node.orbitAngle  = Math.atan2(node.y - cy, node.x - cx);
            node.orbitRx     = Math.abs(node.x - cx);
            node.orbitRy     = Math.abs(node.y - cy);
          }
        }

        node.pulse += node.pulseSpeed;

        /* hover scale */
        const dx     = node.x - mouse.x;
        const dy     = node.y - mouse.y;
        const dist   = Math.sqrt(dx * dx + dy * dy);
        const target = dist < 52 ? 1.55 : 1;
        node.hoverScale += (target - node.hoverScale) * 0.1;
      });

      /* ── Connections ── */
      const maxConn = 150;
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx   = ns[i].x - ns[j].x;
          const dy   = ns[i].y - ns[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > maxConn) continue;
          const t0     = 1 - dist / maxConn;
          const useAlt = (ns[i].connColor + ns[j].connColor) > 1;
          /* boost connection alpha if either node is being dragged */
          const dragBoost = (ns[i].dragging || ns[j].dragging) ? 2.2 : 1;
          const col = useAlt
            ? `rgba(120,119,198,${t0 * 0.25 * dragBoost})`
            : `rgba(162,231,115,${t0 * 0.22 * dragBoost})`;

          ctx.beginPath();
          ctx.moveTo(ns[i].x, ns[i].y);
          ctx.lineTo(ns[j].x, ns[j].y);
          ctx.strokeStyle = col;
          ctx.lineWidth   = t0 * (ns[i].dragging || ns[j].dragging ? 1.4 : 0.9);
          ctx.stroke();

          if (dist < 65) {
            const mx = (ns[i].x + ns[j].x) / 2;
            const my = (ns[i].y + ns[j].y) / 2;
            ctx.beginPath();
            ctx.arc(mx, my, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = useAlt
              ? `rgba(120,119,198,${t0 * 0.5})`
              : `rgba(162,231,115,${t0 * 0.55})`;
            ctx.fill();
          }
        }
      }

      /* ── Nodes ── */
      ns.forEach((node) => {
        const pulse      = Math.sin(node.pulse);
        const pulseAlpha = node.dragging ? 0.95 : 0.48 + pulse * 0.28;
        const { w, h }   = renderSize(node.imgW, node.imgH, node.maxH * node.hoverScale);

        /* glow — larger + brighter while dragging */
        const glowR = Math.max(w, h) * (node.dragging ? 1.4 : 1.0);
        const glow  = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        const glowA = node.dragging ? 0.22 : 0.10 + pulse * 0.06;
        glow.addColorStop(0,   `rgba(162,231,115,${glowA})`);
        glow.addColorStop(0.5, `rgba(162,231,115,0.03)`);
        glow.addColorStop(1,   `rgba(162,231,115,0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        /* drag ring */
        if (node.dragging) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, Math.max(w, h) * 0.72, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(162,231,115,0.55)";
          ctx.lineWidth   = 1.2;
          ctx.setLineDash([4, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        /* image */
        const img     = imagesRef.current[node.name];
        const isReady = img && img.complete && img.naturalWidth > 0 && !img.dataset.broken;
        if (isReady) {
          try {
            ctx.globalAlpha = pulseAlpha;
            ctx.drawImage(img, node.x - w / 2, node.y - h / 2, w, h);
            ctx.globalAlpha = 1;
          } catch (_) {
            img.dataset.broken = "1";
            ctx.globalAlpha    = 1;
          }
        } else {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.maxH / 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(162,231,115,${pulseAlpha * 0.6})`;
          ctx.fill();
        }

        /* hover ring + label (not shown while dragging — dragging shows its own ring) */
        if (!node.dragging && node.hoverScale > 1.08) {
          const ring = Math.max(w, h) * 0.62;
          ctx.beginPath();
          ctx.arc(node.x, node.y, ring, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(162,231,115,${(node.hoverScale - 1) * 0.85})`;
          ctx.lineWidth   = 1;
          ctx.stroke();
          ctx.font      = `500 10px ${bodyFont}`;
          ctx.fillStyle = `rgba(162,231,115,${Math.min(1, (node.hoverScale - 1) * 2)})`;
          ctx.textAlign = "center";
          ctx.fillText(node.name, node.x, node.y + ring + 13);
        }

        /* dragging: show name always */
        if (node.dragging) {
          const ring = Math.max(w, h) * 0.72;
          ctx.font      = `600 11px ${bodyFont}`;
          ctx.fillStyle = "rgba(162,231,115,0.9)";
          ctx.textAlign = "center";
          ctx.fillText(node.name, node.x, node.y + ring + 15);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove",  onPointerMove);
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("mouseup",    onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [logos]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {BRACKET_POSITIONS.map(({ rotate, ...posStyle }, i) => (
        <div key={i} className="skills-cloud-bracket" style={posStyle}>
          <svg
            viewBox="0 0 18 18"
            className="skills-cloud-bracket-svg"
            style={{ transform: `rotate(${rotate}deg)` }}
          >
            <path d="M0 12 L0 0 L12 0" stroke="#a2e773" strokeWidth="1" fill="none" />
          </svg>
        </div>
      ))}
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────── */
export default function SkillsPage() {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = SKILL_GROUPS[activeGroup];

  return (
    <div className="skills-page-root">
      {/* <CustomCursor /> */}
      <GrainOverlay />
      <InnerNav />

      <div className="skills-inner">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="page-top-text">— Toolkit</p>
          <h1 className="page-title">
            Skills &amp; <span>Technologies</span>
          </h1>
          <p className="page-description">
            15+ years of experience spanning frontend, full-stack, and design tooling — delivered across companies, businesses, and government platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="skills-cloud-wrap"
          >
            <TechCloudCanvas logos={CLOUD_LOGOS} />
          </motion.div>

          <div>
            <div className="skills-tabs-row">
              {SKILL_GROUPS.map((g, i) => (
                <button
                  key={g.category}
                  onClick={() => setActiveGroup(i)}
                  className="skills-tab-btn"
                  style={{
                    border: `1px solid ${activeGroup === i ? "#a2e773" : "rgba(232,228,220,0.4)"}`,
                    color:  activeGroup === i ? "#a2e773" : undefined,
                  }}
                >
                  {g.category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroup}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="skills-group-desc">{group.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {group.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="skill-group-card flex items-center gap-3"
                    >
                      <Image
                        src={skill.logo}
                        alt={skill.name}
                        width={0}
                        height={0}
                        sizes="24px"
                        unoptimized
                        className="flex-shrink-0 w-auto"
                        style={{ height: "24px", width: "auto" }}
                      />
                      <span className="skill-group-card-label">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="skills-divider" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="skills-stats-grid"
        >
          {STATS.map(({ num, label }) => (
            <div key={label} className="skill-numbers">
              <div>{num}</div>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}