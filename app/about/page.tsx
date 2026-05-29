"use client";
import Sidebar from "@/components/Sidebar";
import SkillsMarquee from "@/components/SkillsMarquee";
import StatsCounter from "@/components/StatsCounter";
import { useEffect, useState } from "react";

const skills = [
  { name: "HTML / CSS", pct: 95 },
  { name: "React / Next.js", pct: 90 },
  { name: "TypeScript", pct: 85 },
  { name: "UI / UX Design", pct: 88 },
  { name: "Figma", pct: 80 },
];

export default function About() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <main className="min-h-screen bg-[#111] text-white flex overflow-hidden relative px-16 pr-28 py-20">
      {/* Red corner accent */}
      <div className="absolute top-0 left-0 w-[140px] h-[140px] bg-[#cc0000] rounded-br-[80px] z-0" />

      <div className={`relative z-10 max-w-3xl mx-auto transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Section header */}
        {/* <div className="flex items-center gap-3 mb-3">
          <span className="block w-6 h-[3px] bg-[#cc0000]" />
          <span className="text-[#cc0000] font-bold tracking-widest uppercase text-xs">Who I Am</span>
        </div> */}
        <section className="title-section text-center text-sm-center revealator-slideup revealator-once revealator-delay1">
          <div className="position-relative" style={{ opacity: 1, transform: "none" }}>
            <h1>ABOUT <span>ME</span></h1>
            <span className="title-bg">Resume</span>
          </div>
        </section>
        {/* <h1 className="text-5xl font-black mb-8">
          ABOUT <span className="text-[#cc0000]">ME</span>
        </h1> */}

        <p className="text-gray-400 text-lg leading-relaxed mb-12 text-center">
         With over 15+ years of dedicated experience in software development and technical leadership, I have successfully led cross-functional teams in delivering scalable, high-performance web and enterprise applications. I specialize in frontend architecture, full stack development, and UI/UX-driven solutions, with a strong focus on building clean, maintainable, and user-centric websites and applications.
        </p>

        <StatsCounter />

        {/* Skills */}
        <h2 className="text-2xl font-bold mb-6">My Skills</h2>
        <SkillsMarquee />
        {/* <div className="space-y-5">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-semibold">{s.name}</span>
                <span className="text-[#cc0000] font-bold">{s.pct}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#cc0000] rounded-full transition-all duration-1000"
                  style={{ width: loaded ? `${s.pct}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div> */}
      </div>

      <Sidebar />
    </main>
  );
}
