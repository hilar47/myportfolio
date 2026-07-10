"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
// import CustomCursor from "@/components/ui/CustomCursor";
import InnerNav from "@/components/layout/InnerNav";

const WORK = [
  { period: "Sept 2019 — Present", years: "2019-Now", title: "Technical Lead, Full Stack & Sr. Frontend Developer", company: "Dubai Municipality", location: "Dubai, UAE", type: "work", color: "#a2e773", desc: "Hands-on Technical Lead and full-stack developer behind Dubai Municipality's main website and mobile app. Responsible for core technical decisions, hands-on development, UI/UX oversight, team mentorship, and delivering citizen-facing services at scale.", tags: ["HTML", "CSS", "JS", "WordPress", ".Net", "Figma", "Mendix", "Azure", "AI",] },
  { period: "Sept 2018 — Sept 2019", years: "2018-19", title: "Frontend Technical Lead", company: "HCL Technologies - Schneider Electric", location: "Bangalore, India — Schneider Electric Onsite", type: "work", color: "#7dd3fc", desc: "Frontend technical lead for Schneider Electric's digital team, driving frontend architecture, reusable component systems, and cross-functional delivery for the company's best-selling smart product.", tags: ["AngularJS", "HTML", "CSS", "JS", "REST API", "Agile", "Figma", ".Net"] },
  { period: "July 2011 — Sept 2018", years: "2011-18", title: "Frontend Technical Lead & Lead Developer", company: "Creative Capsule Infotech", location: "Goa, India", type: "work", color: "#c4b5fd", desc: "Led frontend development and managed a team delivering 30+ client projects across e-commerce, medicine, real estate, and technology, from design through deployment.", tags: ["HTML", "CSS", "JS", "jQuery", "WordPress", ".Net", "MySQL", "Photoshop"] },
  { period: "Jan 2010 — June 2011", years: "2010-11", title: "Web Designer & Frontend Developer", company: "Online Productivity Pvt. Ltd", location: "Goa, India", type: "work", color: "#fda4af", desc: "Developed responsive, pixel-perfect websites based on provided designs — translating UI mockups into clean, performant frontend code ready for live deployment.", tags: ["HTML", "CSS", "JS", "jQuery", "Photoshop", "WordPress"] },
  { period: "May 2009 — Dec 2009", years: "2009", title: "Web Designer & Technical Support Engineer", company: "VirtualWebs Servers Pvt. Ltd", location: "Goa, India", type: "work", color: "#fb923c", desc: "First professional role — Designed, built, and supported responsive websites for clients across India — owning the full lifecycle from wireframes to live launch and ongoing post-launch support.", tags: ["HTML", "CSS", "JS", "jQuery", "Photoshop", "Flash"] },
];

const EDUCATION = [
  { period: "2009", title: "Bachelor of Computer Applications", institution: "Rosary College, Goa University", location: "Goa, India", result: "Distinction", type: "education", color: "#a2e773" },
  { period: "2010 — 2013", title: "Certificates: Linux, Web Design, Visual Basic", institution: "Manipal Institute of Computer Education", location: "Goa, India", result: "First Class", type: "cert", color: "#7dd3fc" },
  { period: "2006", title: "Higher Secondary Certificate", institution: "St. Alex Higher Secondary School", location: "Goa, India", result: "First Class", type: "education", color: "#c4b5fd" },
  { period: "2004", title: "Secondary School Certificate", institution: "Loyola High School", location: "Goa, India", result: "First Class", type: "education", color: "#fda4af" },
];

const STATS = [
  { num: "15+", label: "Years Experience" },
  { num: "5",   label: "Companies" },
  { num: "3",   label: "Cities" },
];

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function EntryCard({ entry, align }: { entry: typeof WORK[0]; align: "left" | "right" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ borderColor: hovered ? `${entry.color}50` : "rgba(232,228,220,0.1)" }}
      transition={{ duration: 0.2 }}
      className="entry-card"
      style={{
        background: hovered ? "rgba(232,228,220,0.03)" : "rgba(232,228,220,0.015)",
        textAlign: align,
      }}
    >
      {/* Accent side bar — position (left/right) and opacity are state-driven */}
      <div
        className="entry-card-bar"
        style={{
          [align === "right" ? "right" : "left"]: 0,
          background: entry.color,
          opacity: hovered ? 0.9 : 0.35,
        }}
      />

      {/* Side glow — position and gradient direction are dynamic */}
      <div
        className="entry-card-glow"
        style={{
          [align === "right" ? "right" : "left"]: 0,
          background: `linear-gradient(to ${align === "right" ? "left" : "right"}, ${entry.color}12, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Company label — colour is per-entry accent */}
      <p className="entry-card-company" style={{ color: entry.color }}>{entry.company}</p>

      <h3 className="entry-card-title">{entry.title}</h3>
      <p className="entry-card-location">{entry.location}</p>

      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.25 }}
      >
        <p className="entry-card-desc">{entry.desc}</p>
      </motion.div>

      <div
        className="entry-card-tags"
        style={{ justifyContent: align === "right" ? "flex-end" : "flex-start" }}
      >
        {entry.tags.map((tag) => (
          <span key={tag} className="entry-card-tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

function WorkEntry({ entry, index, isLast }: { entry: typeof WORK[0]; index: number; isLast: boolean }) {
  const { ref, visible } = useInView(0.15);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="work-entry-grid">
      {/* Left column */}
      <div className={`flex justify-end pr-6 ${isLeft ? "items-start pt-0" : "items-end pb-8"}`}>
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="work-entry-card-wrap work-entry-card-wrap--right"
          >
            <EntryCard entry={entry} align="right" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="work-entry-period">{entry.period}</span>
          </motion.div>
        )}
      </div>

      {/* Centre dot column */}
      <div className="work-entry-spine">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="work-entry-dot"
          style={{
            border: `2px solid ${entry.color}`,
            boxShadow: `0 0 12px ${entry.color}60`,
          }}
        />
        {!isLast && <div className="flex-1" />}
      </div>

      {/* Right column */}
      <div className={`flex justify-start pl-6 ${!isLeft ? "items-start pt-0" : "items-end pb-8"}`}>
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="work-entry-card-wrap"
          >
            <EntryCard entry={entry} align="left" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="work-entry-period">{entry.period}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function EduEntry({ entry, index }: { entry: typeof EDUCATION[0]; index: number }) {
  const { ref, visible } = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="edu-card"
    >
      {/* Top accent line — gradient colour is per-entry */}
      <div
        className="edu-card-top-line"
        style={{ background: `linear-gradient(to right, ${entry.color}80, transparent)` }}
      />

      <div className="edu-card-inner">
        <div className="flex-1">
          {/* Period — colour is per-entry accent */}
          <p className="edu-card-period" style={{ color: entry.color }}>{entry.period}</p>
          <h4 className="edu-card-title">{entry.title}</h4>
          <p className="edu-card-institution">{entry.institution} · {entry.location}</p>
        </div>

        {/* Result badge — border and bg use per-entry colour */}
        <div
          className="edu-card-badge"
          style={{
            border: `1px solid ${entry.color}30`,
            background: `${entry.color}10`,
          }}
        >
          <span className="edu-card-badge-text" style={{ color: entry.color }}>{entry.result}</span>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineStem({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const [fillPct, setFillPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = rect.height + viewH;
      const scrolled = viewH - rect.top;
      setFillPct(Math.min(1, Math.max(0, scrolled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  return (
    <div className="timeline-stem">
      {/* Fill bar — height is scroll-driven, kept inline */}
      <div
        className="timeline-stem-fill"
        style={{ height: `${fillPct * 100}%` }}
      />
      {/* Glowing tip — top position is scroll-driven, kept inline */}
      <div
        className="timeline-stem-tip"
        style={{ top: `${fillPct * 100}%` }}
      />
    </div>
  );
}

export default function ExperiencePage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <div className="experience-page-root">
      {/* <CustomCursor /> */}
      <InnerNav />

      <svg className="pointer-events-none fixed inset-0 w-full h-full z-50 opacity-[0.28] mix-blend-soft-light">
        <filter id="grainE">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves={4} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainE)" />
      </svg>

      <div className="experience-inner">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="page-top-text">— Career Journey</p>
          <h1 className="page-title">
            Work<span> Experience</span>
          </h1>
          <p className="page-description">
            15+ years across Goa, Bangalore, and Dubai — from web designer to Technical Lead.
          </p>
        </motion.div>

        {/* Education */}
        <div>
          <div className="exp-section-label">
            <div className="exp-section-label-line" />
            <span className="exp-section-label-text">Education &amp; Certifications</span>
          </div>
          <div className="edu-grid">
            {EDUCATION.map((entry, i) => (
              <EduEntry key={entry.title} entry={entry} index={i} />
            ))}
          </div>
        </div>


        <div className="exp-divider" />

        {/* Work Timeline */}
        <div className="mb-6">
          <div className="exp-section-label">
            <div className="exp-section-label-line" />
            <span className="exp-section-label-text">Work History</span>
          </div>

          <div ref={timelineRef} className="relative">
            <TimelineStem containerRef={timelineRef as React.RefObject<HTMLDivElement>} />
            <div className="flex flex-col relative z-10">
              {WORK.map((entry, i) => (
                <WorkEntry key={entry.company + i} entry={entry} index={i} isLast={i === WORK.length - 1} />
              ))}
            </div>
          </div>
        </div>

        <div className="exp-divider exp-divider--bottom" />

        {/* Stats */}
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