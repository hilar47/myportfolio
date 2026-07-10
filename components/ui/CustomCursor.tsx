"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const hud = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMove);

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

      const size = 44;

      if (hud.current) {
        hud.current.style.left = `${pos.current.x - size / 2}px`;
        hud.current.style.top  = `${pos.current.y - size / 2}px`;
      }

      if (dot.current) {
        dot.current.style.left = `${mouse.current.x - 2}px`;
        dot.current.style.top  = `${mouse.current.y - 2}px`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={hud} className="cursor-hud">
        <div className="cursor-hud-outer">
          <span className="hud-tick top" />
          <span className="hud-tick bottom" />
          <span className="hud-tick left" />
          <span className="hud-tick right" />
          <div className="hud-scan" />
        </div>
        <div className="cursor-hud-inner" />
      </div>
      <div ref={dot} className="cursor-dot" />
    </>
  );
}