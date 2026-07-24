"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Star, Award, Medal, Crown, Zap, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
// import CustomCursor from "@/components/ui/CustomCursor";
import InnerNav from "@/components/layout/InnerNav";

const AWARDS = [
  { year: "2025", title: "Leadership Earned", org: "Dubai Municipality", icon: Crown, desc: "Earned a promotion to Technical Lead at Dubai Municipality in 2025 — recognized for successfully driving high-impact projects including the Dubai Municipality Website and the DM Mobile App.", color: "#a2e773" },
  { year: "2024", title: "Key and vital performer", org: "Dubai Municipality", icon: Zap, desc:"Acknowledged as a vital contributor across all core projects at Dubai Municipality, consistently delivering on high-stakes initiatives.", color: "#c4b5fd" },
  { year: "2019", title: "Employee of the month", org: "Schnedier Electric - HCL", icon: Target, desc: "Employee of the Month at Schneider Electric in the 3rd month of joining, recognized for making an immediate and measurable impact.", color: "#7dd3fc" },
  { year: "2017", title: "Outstanding Employee", org: "Creative Capsule Infotech", icon: Star, desc: "Outstanding Employee of the Year (2016-17) at Creative Capsule Infotech, recognized for consistent excellence and dedication.", color: "#fda4af" },
  { year: "2014", title: "Frontend Technical Lead", org: "Creative Capsule Infotech", icon: Trophy, desc: "Earned a promotion to Frontend Technical Lead in under 4 years, reflecting consistent technical growth and leadership at Creative Capsule Infotech.", color: "#fb923c" },
  { year: "2014", title: "Intouch MVP", org: "Creative Capsule Infotech", icon: Medal, desc: "InTouch MVP of the Year (2013–14) at Creative Capsule Infotech, in recognition of exceptional performance and impact.", color: "#e3c07e" },
  { year: "2013", title: "CCI Ambassador", org: "Creative Capsule Infotech", icon: Award, desc: "Awarded CCI Ambassador of the Year (2013–14) in recognition of outstanding leadership and contribution at Creative Capsule Infotech", color: "#6ee7b7" },
];

const TESTIMONIALS = [
  { quote: "Hilario is an asset to any team. Picking up new technologies and mastering them quickly is what he is excellent at. His ability to adapt to new environments and deliver outstanding results is truly commendable.", name: "Ashwin Kumar", title: "Director of User Experience", company: "Creative Capsule", initial: "AK" },
  { quote: "Hilario leads with both technical insight and genuine support for his team. When faced with high-pressure situations, Hilario remained composed and provided the clear direction necessary to keep the team aligned and focused.", name: "Shubham Mathur", title: "Senior Android Engineer", company: "Nagarro", initial: "SM" },
  { quote: "Hilario brings dedication, creativity, and leadership to every project he works on. His collaborative approach and commitment to excellence make him someone you can always rely on.", name: "Shabbir Hussain", title: "Sr. Software Engineer at Dubai Municipality", company: "Dubai Municipality", initial: "SH" },
  { quote: "Working with Hilario was a great experience. He combines strong technical expertise with excellent communication and problem-solving skills, always ensuring projects are delivered smoothly and on time.", name: "Malik Muhammad Bilal Riaz", title: "Software Programmer at Dubai Municipality", company: "Dubai Municipality", initial: "MB" }
];

function AwardCard({ award, index }: { award: typeof AWARDS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = award.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="award-card"
      style={{
        border: `1px solid ${hovered ? award.color + "55" : "rgba(var(--fg-rgb),0.1)"}`,
        background: hovered ? `${award.color}08` : "rgba(var(--bg-rgb),0.8)",
      }}
    >
      {/* Year — colour transitions on hover */}
      <div
        className="award-card-year"
        style={{ color: hovered ? award.color : "rgba(var(--fg-rgb),0.07)" }}
      >
        {award.year}
      </div>

      {/* Radial glow on hover */}
      {hovered && (
        <div
          className="award-card-glow"
          style={{ background: `radial-gradient(ellipse at 30% 30%, ${award.color}14 0%, transparent 65%)` }}
        />
      )}

      {/* Icon box */}
      <div
        className="award-icon-box"
        style={{
          background: `${award.color}18`,
          border: `1px solid ${award.color}40`,
        }}
      >
        <Icon size={20} color={award.color} strokeWidth={1.5} />
      </div>

      <h3 className="award-card-title">{award.title}</h3>

      {/* Org — uses per-card accent colour */}
      <p className="award-card-org" style={{ color: award.color }}>{award.org}</p>

      {/* Animated divider line */}
      <div
        className="award-card-divider"
        style={{
          background: `${award.color}40`,
          width: hovered ? "4rem" : "2rem",
        }}
      />

      <p className="award-card-desc">{award.desc}</p>
    </motion.div>
  );
}

function AwardsScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);

  const updateState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    setProgress(scrollLeft / (scrollWidth - clientWidth));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateState, { passive: true });
    updateState();
    return () => el.removeEventListener("scroll", updateState);
  }, [updateState]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <div className="awards-scroller-root">
      <div ref={scrollRef} className="awards-scroller-track">
        {AWARDS.map((award, i) => (
          <AwardCard key={award.title} award={award} index={i} />
        ))}
      </div>

      <div className="awards-scroller-controls">
        {/* Prev button — colour is active-state driven, keep inline */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="awards-scroll-btn"
          style={{
            color: canScrollLeft ? "rgba(var(--fg-rgb),0.55)" : "rgba(var(--fg-rgb),0.15)",
            cursor: canScrollLeft ? "none" : "default",
          }}
          onMouseEnter={(e) => {
            if (!canScrollLeft) return;
            (e.currentTarget as HTMLElement).style.borderColor = "#a2e773";
            (e.currentTarget as HTMLElement).style.color = "#a2e773";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--fg-rgb),0.12)";
            (e.currentTarget as HTMLElement).style.color = canScrollLeft ? "rgba(var(--fg-rgb),0.55)" : "rgba(var(--fg-rgb),0.15)";
          }}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Progress bar */}
        <div className="awards-progress-track">
          <div
            className="awards-progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Next button */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="awards-scroll-btn"
          style={{
            color: canScrollRight ? "rgba(var(--fg-rgb),0.55)" : "rgba(var(--fg-rgb),0.15)",
            cursor: canScrollRight ? "none" : "default",
          }}
          onMouseEnter={(e) => {
            if (!canScrollRight) return;
            (e.currentTarget as HTMLElement).style.borderColor = "#a2e773";
            (e.currentTarget as HTMLElement).style.color = "#a2e773";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--fg-rgb),0.12)";
            (e.currentTarget as HTMLElement).style.color = canScrollRight ? "rgba(var(--fg-rgb),0.55)" : "rgba(var(--fg-rgb),0.15)";
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [flipping, setFlipping] = useState(false);
  const total = TESTIMONIALS.length;

  const go = (dir: "next" | "prev") => {
    if (flipping) return;
    setDirection(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrent((c) => dir === "next" ? (c + 1) % total : (c - 1 + total) % total);
      setFlipping(false);
    }, 600);
  };

  const t = TESTIMONIALS[current];

  return (
    <div className="testimonials-root">
      <div className="testimonials-perspective">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ rotateY: direction === "next" ? -85 : 85, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction === "next" ? 85 : -85, opacity: 0 }}
            style={{ transformOrigin: direction === "next" ? "left center" : "right center" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="testimonial-card"
          >
            <div className="testimonial-center-line" />
            <div className="testimonial-grid-lines" />
            <div className="testimonial-quote-mark">&quot;</div>
            <blockquote className="testimonial-blockquote">{t.quote}</blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.initial}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-meta">{t.title} · {t.company}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="testimonials-controls">
        {/* Dot indicators — active width is dynamic, keep inline */}
        <div className="testimonials-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (i !== current) go(i > current ? "next" : "prev"); }}
              className="testimonial-dot"
              style={{
                width: i === current ? 28 : 6,
                background: i === current ? "#a2e773" : "rgba(var(--fg-rgb),0.2)",
              }}
            />
          ))}
        </div>

        <div className="testimonials-nav-btns">
          {([ ["prev", ChevronLeft], ["next", ChevronRight] ] as const).map(([dir, Icon]) => (
            <button
              key={dir}
              onClick={() => go(dir)}
              disabled={flipping}
              className="testimonial-nav-btn"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#a2e773";
                (e.currentTarget as HTMLElement).style.color = "#a2e773";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--fg-rgb),0.14)";
                (e.currentTarget as HTMLElement).style.color = "rgba(var(--fg-rgb),0.5)";
              }}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AwardsPage() {
  const router = useRouter();

  return (
    <div className="awards-page-root inner-page-root">
      {/* <CustomCursor /> */}
      <InnerNav />

      <svg className="pointer-events-none fixed inset-0 w-full h-full z-50 opacity-[0.28] mix-blend-soft-light">
        <filter id="grain-awards">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves={4} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-awards)" />
      </svg>

      <div className="awards-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="awards-hero"
        >
          <p className="page-top-text">— Recognition & Honors</p>
          <h1 className="page-title">
            Awards &amp; <span>Honors</span>
          </h1>
          <p className="page-description">
            Awards, promotions and recognitions received throughout my career, reflecting consistent performance, dedication, and contribution to successful project deliveries.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="awards-scroller-section"
        >
          <AwardsScroller />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="awards-section-divider" />
          <p className="page-top-text">— What People Say</p>
          <h1 className="awards-testimonials-heading page-title">Testimonials & <span>Recommendations</span></h1>
          <TestimonialsCarousel />
        </motion.div>
      </div>
    </div>
  );
}