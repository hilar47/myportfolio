"use client";
import { useEffect, useRef, useState } from "react";
import { FiBriefcase } from "react-icons/fi";

export type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  current?: boolean;
  grade?: string;
};

type Props = {
  heading: string;
  accent: string; // e.g. "Experience" or "Education"
  items: TimelineItem[];
  icon: React.ReactNode;
};

export default function TimelineColumn({ heading, accent, items, icon }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  // Intersection observer per item
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const itemEls = container.querySelectorAll("[data-timeline-item]");
    const observers: IntersectionObserver[] = [];

    itemEls.forEach((el, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, i]));
          }
        },
        { root: container, threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="bg-[#161616] border border-white/5 rounded-3xl flex flex-col overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
      {/* Column header */}
      <div className="flex-shrink-0 px-8 pt-7 pb-5 border-b border-white/5">
        <h2 className="text-2xl font-black">
          {heading.split(" ").map((word, i) =>
            i === 0 ? (
              <span key={i} className="text-white">{word} </span>
            ) : (
              <span key={i} className="text-[#cc0000]">{word}</span>
            )
          )}
        </h2>
      </div>

      {/* Scrollable timeline */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-6 space-y-0 custom-scroll"
      >
        {items.map((item, i) => (
          <div
            key={i}
            data-timeline-item
            className="relative pl-14"
            style={{
              opacity: visibleItems.has(i) ? 1 : 0,
              transform: visibleItems.has(i) ? "translateX(0)" : "translateX(-20px)",
              transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
            }}
          >
            {/* Vertical line */}
            {i < items.length - 1 && (
              <div
                className="absolute left-[19px] top-[44px] w-[2px] bg-white/10"
                style={{
                  height: "calc(100% - 8px)",
                  background: visibleItems.has(i)
                    ? "linear-gradient(to bottom, #cc0000 0%, rgba(255,255,255,0.08) 100%)"
                    : "rgba(255,255,255,0.08)",
                  transition: `background 0.8s ease ${i * 80 + 300}ms`,
                }}
              />
            )}

            {/* Icon dot */}
            <div
              className="absolute left-0 top-3 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
              style={{
                background: visibleItems.has(i) ? "#cc0000" : "#1f1f1f",
                border: "2px solid",
                borderColor: visibleItems.has(i) ? "#cc0000" : "rgba(255,255,255,0.08)",
                transitionDelay: `${i * 80 + 150}ms`,
                boxShadow: visibleItems.has(i) ? "0 0 16px rgba(204,0,0,0.4)" : "none",
              }}
            >
              <div className="text-white text-sm">{icon}</div>
            </div>

            {/* Content card */}
            <div className="pb-8">
              <p className="text-gray-500 text-xs font-semibold tracking-wider uppercase mb-1 flex items-center gap-2">
                {item.period}
                {item.current && (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-[#cc0000]/20 text-[#cc0000] px-2 py-0.5 rounded-full font-bold tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cc0000] animate-pulse" />
                    NOW
                  </span>
                )}
              </p>
              <h3 className="text-white text-lg leading-tight mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm font-medium">{item.subtitle}</p>
              <p className="text-pink text-sm font-medium">{item.grade}</p>

              {/* Separator */}
              {i < items.length - 1 && (
                <div className="mt-6 h-[1px] bg-white/5 -ml-14 mr-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cc0000; border-radius: 2px; }
        .custom-scroll { scrollbar-width: thin; scrollbar-color: #cc0000 transparent; }
      `}</style>
    </div>
  );
}
