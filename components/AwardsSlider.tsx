"use client";
import { FiAward } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import "./components.css";

const awards = [
  {
    icon: "🏆",
    title: "Key and vital performer",
    year: "2026",
    org: "Dubai Municipality",
    desc: "Recognition as a key and vital performer on all the core projects in Dubai Municipality.",
  },
  {
    icon: "🥇",
    title: "Employee of the month",
    year: "2019",
    org: "Schnedier Electric",
    desc: "Employee of the month in Schnedier Electric in just the 3rd month of joining the company.",
  },
  {
    icon: "🏅",
    title: "Outstanding Employee",
    year: "2016",
    org: "Creative Capsule Infotech",
    desc: "Outstanding Employee for the year 2016-17 in Creative Capsule Infotech.",
  },
  {
    icon: "🎖️",
    title: "Frontend Technical Lead",
    year: "2014",
    org: "Creative Capsule Infotech",
    desc: "Promoted to Frontend Technical Lead in less then 4 years in Creative Capsule Infotech.",
  },
  {
    icon: "⭐",
    title: "lntouch MVP",
    year: "2013",
    org: "Creative Capsule Infotech",
    desc: "lntouch MVP for the year 2013-14 in Creative Capsule Infotech.",
  },
  {
    icon: "💎",
    title: "CCI Ambassador",
    year: "2013",
    org: "Creative Capsule Infotech",
    desc: "CCI Ambassador for the year 2013-14 in Creative Capsule Infotech.",
  },
];

const ITEMS_PER_PAGE = 3;
const totalPages = Math.ceil(awards.length / ITEMS_PER_PAGE);

export default function AwardsSlider() {
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [visible, setVisible] = useState(true);

  const goTo = (next: number, dir: "left" | "right") => {
    if (animating || next === page) return;
    setDirection(dir);
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setPage(next);
      setVisible(true);
      setAnimating(false);
    }, 320);
  };

  const start = page * ITEMS_PER_PAGE;
  const current = awards.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      {/* Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateX(0)"
            : direction === "right"
            ? "translateX(-24px)"
            : "translateX(24px)",
        }}
      >
        {current.map((award, i) => (
          <div
            key={award.title}
            className="relative group rounded-2xl border border-white/5 bg-[#161616] p-7 overflow-hidden"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <div className="absolute pointer-events-none fi-award">
              <FiAward />
            </div>
            {/* Shiny hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 30% 20%, rgba(204,0,0,0.08) 0%, transparent 60%)",
              }}
            />

            {/* Shiny icon badge */}
            {/* <div className="relative mb-6 inline-flex">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #222 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px rgba(204,0,0,0.15), 0 4px 12px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span className="drop-shadow-lg">{award.icon}</span>
              </div>
              <div
                className="absolute top-1 right-1 w-3 h-5 rounded-full opacity-30"
                style={{
                  background: "linear-gradient(160deg, rgba(255,255,255,0.9), transparent)",
                  transform: "rotate(-20deg)",
                }}
              />
            </div> */}

            {/* Year pill */}
            <div className="absolute top-7 right-7">
              <span
                className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full year-badge"
                style={{
                  background: "rgba(204,0,0,0.12)",
                  color: "#cc0000",
                  border: "1px solid rgba(204,0,0,0.2)",
                }}
              >
                {award.year}
              </span>
            </div>

            <h3 className="font-bebas text-2xl tracking-wider mb-1 group-hover:text-[#cc0000] transition-colors duration-300">
              {award.title}
            </h3>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-4">
              {award.org}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">{award.desc}</p>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
              style={{ background: "linear-gradient(90deg, #cc0000, transparent)" }}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-3 mt-10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > page ? "right" : "left")}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === page ? 28 : 8,
              height: 8,
              background: i === page ? "#cc0000" : "rgba(255,255,255,0.15)",
            }}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
