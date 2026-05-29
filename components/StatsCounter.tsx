"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 15,  suffix: "+",  label: "Years Of Experience" },
  { target: 50, suffix: "+",  label: "Complete Projects"   },
  { target: 20, suffix: "+",  label: "Honors and Awards"},
  { target: 10,  suffix: "+",  label: "Recommendations & Testiomials"       },
];

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    let raf: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutQuart(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function StatCard({
  target, suffix, label, delay, inView,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  const [started, setStarted] = useState(false);
  const count = useCountUp(target, 1800, started);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  return (
    <div
      className="flex-1 px-8 pb-10 
        transition-all duration-700 ease-out"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Number */}
      <div className="flex items-baseline gap-0.5 mb-2 justify-center">
        <span className="text-[64px] font-black text-red leading-none tracking-tight">
          {count}
        </span>
        <span className="text-[56px] font-black text-red leading-none">
          {suffix}
        </span>
      </div>
      {/* Label */}
      <p className="text-md text-white/40 font-medium tracking-wide">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full rounded-2xl overflow-hidden flex flex-wrap text-center"
    >
      {stats.map((s, i) => (
        <StatCard
          key={s.label}
          {...s}
          delay={i * 120}
          inView={inView}
        />
      ))}
    </div>
  );
}
