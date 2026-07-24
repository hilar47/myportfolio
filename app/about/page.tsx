"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
// import CustomCursor from "@/components/ui/CustomCursor";
import InnerNav from "@/components/layout/InnerNav";

const SECTIONS = [
  {
    id: "about",
    label: "About",
    caption: "Here's a quick intro about me and what I love to do",
    subsections: [
      {
        title: "My Programming Origins",
        content: "It started over 15 years ago with a simple curiosity: how do websites actually work? That question turned into a full-blown obsession. Armed with nothing but a text editor and a stubborn drive to figure things out, I taught myself HTML, CSS, and JavaScript the hard way — one broken layout at a time. Those early nights of trial-and-error debugging shaped the problem-solver I am today.",
        image: "/images/about/my-programming-origins.jpeg",
        alt: "Early programming setup with code on screen",
      },
      {
        title: "Finding My Way to Web",
        content: "What began as personal experimentation grew into a career. I moved through roles as a frontend developer, backend engineer, and eventually technical lead — building enterprise platforms, e-commerce systems, and UI/UX-driven products for clients across India, USA and the UAE. Every project taught me something: how to balance performance with aesthetics, how to lead teams without losing the craft, and how to make the web feel human.",
        image: "/images/about/finding-my-way.jpeg",
        alt: "Developer working at a modern desk setup",
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    caption: "My work history and achievements timeline",
    subsections: [
      {
        title: "Dubai Municipality — Technical Lead",
        content: "Since joining Dubai Municipality in 2019, I've led the development of mission-critical government platforms serving millions of residents. My work spans frontend architecture, full stack feature development, and technical oversight — from defining coding standards to mentoring junior engineers. Technologies in play: React, Mendix, SharePoint, Node.js, and a suite of enterprise integrations.",
        image: "/images/about/dm-technical-lead.jpg",
        alt: "Dubai skyline representing Dubai Municipality work",
      },
      {
        title: "Bangalore & Goa — The Formative Years",
        content: "Before Dubai, I honed my skills across agencies and product companies in Goa and Bangalore. I worked on everything from WordPress-based marketing sites to custom MERN stack applications, picking up skills in PHP, MySQL, Figma, and CI/CD pipelines. These years were high-velocity — short deadlines, diverse clients, and a lot of learning by doing.",
        image: "/images/about/banglore-goa.jpg",
        alt: "Indian city tech scene representing formative career years",
      },
    ],
  },
  {
    id: "more",
    label: "More",
    caption: "Here's what sets me apart and makes me unique",
    subsections: [
      {
        title: "Life Beyond Code",
        content: "Code is only half the story. The rest of me is outdoors, on a field, or lost in a good playlist. I'm happiest exploring new countries and trekking through places I've never been — there's a version of problem-solving out there too, just with better views. Back home, it's football and cricket that keep me competitive, and sports in general are a constant thread through my week, whether I'm playing or watching. When I do slow down, it's usually with a controller in hand — I'm an unapologetic PC gamer and anime fan, always chasing the next great story arc, on-screen or in-game. And there's rarely a moment without music playing in the background; it's the one constant across every version of my day, from deep-focus coding sessions to long drives.",
        image: "/images/about/beyond-code.jpg",
        alt: "Scenic landscape representing life beyond the screen",
      },
      {
        title: "These Days",
        content: "Right now I'm based in Dubai, leading technical initiatives at Dubai Municipality while sharpening my expertise in AI-assisted development, modern React patterns, and scalable cloud architecture. I'm always open to interesting projects, collaborations, and conversations about the future of the web. If you want to build something great together, I'd love to hear from you.",
        image: "/images/about/these-days.jpg",
        alt: "Modern workspace representing current day work",
      },
    ],
  },
];

function OrbTimeline({
  activeSection,
  activeSub,
  onSectionClick,
}: {
  activeSection: number;
  activeSub: number;
  onSectionClick: (i: number) => void;
}) {
  const totalSteps = SECTIONS.reduce((a, s) => a + s.subsections.length, 0);
  const stepsBefore = SECTIONS.slice(0, activeSection).reduce((a, s) => a + s.subsections.length, 0);
  const currentStep = stepsBefore + activeSub;
  const progress = totalSteps > 1 ? currentStep / (totalSteps - 1) : 0;

  return (
    <div className="orb-timeline-root">
      {/* Static track */}
      <div className="about-orb-track absolute top-0 bottom-0 left-1/2 -translate-x-1/2" />

      {/* Animated fill — height is progress-driven, kept inline */}
      <motion.div
        className="about-orb-progress absolute left-1/2 -translate-x-1/2 top-0"
        animate={{ height: `${progress * 100}%` }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      />

      {/* Travelling orb — top is progress-driven, kept inline */}
      <motion.div
        className="orb-timeline-orb-wrap absolute left-1/2 -translate-x-1/2"
        animate={{ top: `${progress * 100}%` }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="orb-timeline-orb" />
      </motion.div>

      {/* Section labels */}
      <div className="orb-timeline-labels">
        {SECTIONS.map((section, i) => {
          const isActive = activeSection === i;
          return (
            <button
              key={section.id}
              onClick={() => onSectionClick(i)}
              className="orb-timeline-btn"
            >
              {/* Label colour is active-state driven, kept inline */}
              <span
                className="orb-timeline-btn-label"
                style={{ color: isActive ? "var(--primary)" : "rgba(var(--fg-rgb),1)" }}
              >
                {section.label}
              </span>
              <span
                className="orb-timeline-btn-caption"
                style={{ color: isActive ? "var(--primary)" : "rgba(var(--fg-rgb),0.8)" }}
              >
                {section.caption}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SubsectionCard({
  title,
  content,
  image,
  alt,
  index,
}: {
  title: string;
  content: string;
  image: string;
  alt: string;
  index: number;
}) {
  const flip = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="subsection-card"
      /* direction RTL/LTR flips column order — state-driven, kept inline */
      style={{ direction: flip ? "rtl" : "ltr" }}
    >
      <div className="subsection-card-text">
        <h3 className="subsection-card-title">{title}</h3>
        <p className="subsection-card-body">{content}</p>
      </div>

      <div className="subsection-card-image-wrap">
        <div className="subsection-card-image-inner">
          <img
            src={image}
            alt={alt}
            className="subsection-card-img"
            onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [activeSub, setActiveSub] = useState(0);

  const onNav = (page: string) => {
    if (page === "home") router.push("/");
    else if (page === "projects") router.push("/projects");
    else router.push("/" + page);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const viewMid = el.clientHeight * 0.4;
      let foundSection = 0;
      let foundSub = 0;
      SECTIONS.forEach((section, si) => {
        const sEl = sectionRefs.current[si];
        if (!sEl) return;
        const sTop = sEl.offsetTop - scrollTop;
        if (sTop <= viewMid) {
          foundSection = si;
          const subEls = sEl.querySelectorAll<HTMLElement>("[data-sub]");
          subEls.forEach((subEl, subIdx) => {
            const subTop = subEl.getBoundingClientRect().top - el.getBoundingClientRect().top;
            if (subTop <= viewMid) foundSub = subIdx;
          });
        }
      });
      setActiveSection(foundSection);
      setActiveSub(foundSub);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (i: number) => {
    const el = sectionRefs.current[i];
    if (!el || !containerRef.current) return;
    containerRef.current.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
  };

  return (
    <div className="about-page-root inner-page-root">
      {/* <CustomCursor /> */}
      <InnerNav />

      <svg className="pointer-events-none fixed inset-0 w-full h-full z-50 opacity-[0.28] mix-blend-soft-light">
        <filter id="grain-about">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves={4} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-about)" />
      </svg>

      <div className="about-layout">
        {/* ── Right sidebar ── */}
        <div className="about-sidebar">
          <div className="about-sidebar-identity">
            <p className="about-sidebar-name">Hilario Goes</p>
            <span className="about-sidebar-role">Technical Lead<br />Full Stack Developer</span>
          </div>

          <div className="about-sidebar-timeline">
            <OrbTimeline
              activeSection={activeSection}
              activeSub={activeSub}
              onSectionClick={scrollToSection}
            />
          </div>

          <div className="about-sidebar-stat">
            <div className="about-sidebar-stat-num">15+</div>
            <div className="about-sidebar-stat-label">Years of Experience</div>
          </div>
        </div>

        {/* ── Main scroll area ── */}
        <div ref={containerRef} className="about-scroll-area">
          {/* Fade top edge */}
          <div className="about-scroll-fade-top" />

          <div className="about-content-inner">
            {SECTIONS.map((section, si) => (
              <div
                key={section.id}
                ref={(el) => { sectionRefs.current[si] = el; }}
                className="about-section-block"
              >
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                  className="about-section-header"
                >
                  <p className="page-top-text">— Get to Know</p>
                  <h1 className="page-title">
                    About<span> Me</span>
                  </h1>
                  <p className="page-description">{section.caption}</p>
                  <div className="about-section-divider" />
                </motion.div>

                <div className="about-subsections">
                  {section.subsections.map((sub, subIdx) => (
                    <div key={sub.title} data-sub={subIdx}>
                      <SubsectionCard
                        title={sub.title}
                        content={sub.content}
                        image={sub.image}
                        alt={sub.alt}
                        index={subIdx}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="about-footer-cta"
            >
              <div>
                <p className="about-footer-cta-heading">Let&apos;s Build Something Great</p>
                <p className="about-footer-cta-email">hilariogoes47@gmail.com</p>
              </div>

              <div className="flex gap-4">
                {["Skills", "Experience", "projects"].map((item) => (
                  <button
                    key={item}
                    onClick={() => onNav(item.toLowerCase())}
                    className="about-footer-nav-btn"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}