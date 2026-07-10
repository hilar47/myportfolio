"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
// import CustomCursor from "@/components/ui/CustomCursor";
import InnerNav from "@/components/layout/InnerNav";

const FEATURED = [
  { id: 1, number: "01", title: "Dubai Municipality Website", subtitle: "Dubai Municipality Government · Dubai, UAE", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX", "AI"], description: "Worked on the official website of Dubai Municipality, delivering responsive frontend development, UI/UX improvements, and optimized digital services to enhance user experience and accessibility across platforms.", tech: ["Figma", "WordPress", "HTML", "CSS", "JavaScript", "PHP", "Agile"], link: "https://www.dm.gov.ae/", year: "2019 - PRESENT", image: "/images/projects/dm.png" },
  { id: 2, number: "02", title: "Dubai Municipality App", subtitle: "Dubai Municipality Government · Dubai, UAE", category: "Mobile App", tags: ["Mobile App", "UI/UX", "AI"], description: "Led a team of 30+ developers and designers in building the Dubai Municipality App, contributing to frontend development, UI/UX design, and overall project delivery to create a seamless and user-friendly digital experience.", tech: ["Figma", "Swift", "Kotlin", "Java", "Postman", "Agile"], link: "https://play.google.com/store/apps/details?id=ae.gov.dm.uma", year: "2025", image: "/images/projects/dm-app.png" },
  { id: 3, number: "03", title: "Hicast Website", subtitle: "Hicast · USA", category: "Frontend", tags: ["Frontend", "Mendix", "UI/UX", "AI"], description: "Worked on the frontend and Mendix components for the HiCast - Sports delivery website, contributing to responsive UI development, seamless user experience, and efficient integration of low-code application features.", tech: ["Figma", "HTML", "CSS", "JavaScript", "Mendix", "Agile"], link: "https://watch.hcst.me/", year: "2023", image: "/images/projects/hicast.png" }
];

const PROJECTS = [
  { id: 1, number: "01", title: "Dubai Municipality Website", subtitle: "Dubai Municipality Government · Dubai, UAE", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX", "AI"], description: "Worked on the official website of Dubai Municipality, delivering responsive frontend development, UI/UX improvements, and optimized digital services to enhance user experience and accessibility across platforms.", tech: ["Figma", "WordPress", "HTML", "CSS", "JavaScript", "PHP", "Agile"], link: "https://www.dm.gov.ae/", year: "", image: "/images/projects/dm.png" },
  { id: 2, number: "02", title: "Dubai Municipality App", subtitle: "Dubai Municipality Government · Dubai, UAE", category: "Mobile App", tags: ["Mobile App", "UI/UX", "AI"], description: "Led a team of 30+ developers and designers in building the Dubai Municipality App, contributing to frontend development, UI/UX design, and overall project delivery to create a seamless and user-friendly digital experience.", tech: ["Figma", "Swift", "Kotlin", "Java", "Postman", "Agile"], link: "https://play.google.com/store/apps/details?id=ae.gov.dm.uma", year: "", image: "/images/projects/dm-app.png" },
  { id: 3, number: "03", title: "Vivitrol Website", subtitle: "Vivitrol Pharmaceuticals · Kansas, USA", category: "Frontend", tags: ["Frontend", ".NET"], description: "Contributed to the development of the Vivitrol - Pharmaceutical sub applications by working on frontend implementation of medicinal presentations and .NET components, focusing on responsive UI development, performance, and seamless integration of backend functionalities.", tech: ["HTML", "CSS", "JavaScript", ".NET", "Agile"], link: "https://www.vivitrol.com/", year: "", image: "/images/projects/vivitrol.png" },
  { id: 4, number: "04", title: "Hicast Website", subtitle: "Hicast · USA", category: "Frontend", tags: ["Frontend", "Mendix", "UI/UX", "AI"], description: "Worked on the frontend and Mendix components for the HiCast - Sports delivery website, contributing to responsive UI development, seamless user experience, and efficient integration of low-code application features.", tech: ["Figma", "HTML", "CSS", "JavaScript", "Mendix", "Agile"], link: "https://watch.hcst.me/", year: "", image: "/images/projects/hicast.png" },
  { id: 5, number: "05", title: "Ecoreach Application - Product", subtitle: "Schneider Electric · Bangalore, India", category: "Product", tags: ["Product", "Frontend", "AngularJS"], description: "Worked on the frontend using AngularJS and contributed to implementation and enhancements of the Schneider Electric EcoReach product, supporting device configuration, commissioning workflows, and user interface development for electrical asset management applications.", tech: ["HTML", "CSS", "JavaScript", "AngularJS", ".NET"], link: "https://www.se.com/ae/en/product-range/62980-ecoreach/", year: "", image: "/images/projects/ecoreach.png" },
  { id: 6, number: "06", title: "Deburenkoken Website", subtitle: "Deburenkoken · Sliedrecht, Netherlands", category: "Frontend", tags: ["Frontend", "PHP", "UI/UX", "AI"], description: "Worked on the frontend, PHP development, and UI/UX design for the De Buren website - Food delivery website, focusing on building a responsive interface, improving user experience, and supporting smooth backend integration for a clean and engaging web platform.", tech: ["Figma", "HTML", "CSS", "JavaScript", "PHP"], link: "https://deburenkoken.nl/", year: "", image: "/images/projects/deburenkoken.png" },
  { id: 7, number: "07", title: "Xotik Website", subtitle: "Xotik Frujus Pvt. Ltd. · Goa, India", category: "Frontend", tags: ["Frontend", "HTML5", "UI/UX"], description: "Worked on the frontend, HTML5, and UI/UX design for Xotik - beverage company, focusing on building responsive layouts, improving user experience, and delivering visually engaging and performance-optimized web interfaces.", tech: ["Photoshop", "HTML", "CSS", "JavaScript"], link: "https://xotik.co.in/", year: "", image: "/images/projects/xotik.png" },
  { id: 8, number: "08", title: "Durubco Website", subtitle: "Yes Trade - Water Solutions · Sharjah, UAE", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend and WordPress development for the Durubco - Water pump suppliers, focusing on UI/UX design, responsive layouts, and enhancing overall user experience with smooth and modern web interactions.", tech: ["Figma", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://durubco.com/", year: "", image: "/images/projects/durubco.png" },
  { id: 9, number: "09", title: "The Bicycle Trip Goa Website", subtitle: "The Bicycle Trip Goa · Goa, India", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend and WordPress development for The Bicycle Trip Goa website, focusing on UI/UX design, responsive layouts, and creating an engaging and user-friendly travel experience platform.", tech: ["Photoshop", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://thebicycletripgoa.com/", year: "", image: "/images/projects/thebicycletripgoa.png" },
  { id: 10, number: "10", title: "Village Panchayat Navelim Website", subtitle: "India Government · Navelim, Goa, India", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend and WordPress development for the V.P. Navelim, Goa - India Government website, focusing on UI/UX design, responsive layout implementation, and improving accessibility and user experience for community information and updates.", tech: ["Photoshop", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://vpnavelim.com/", year: "", image: "/images/projects/vpnavelim.png" },
  { id: 11, number: "11", title: "Shantilal Real Estate Website", subtitle: "Shantilal Real Estate · Goa, India", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend and WordPress development for Shantilal Real Estate, focusing on UI/UX design, responsive layouts, and creating a clean, user-friendly property browsing experience.", tech: ["Photoshop", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://shantilalrealestate.com/", year: "", image: "/images/projects/shantilal.png" },
  { id: 12, number: "12", title: "Wildflower Goa Website", subtitle: "Wildflower Goa Resort · Goa, India", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend, WordPress development, and UI/UX design for the Wildflower Resort Goa website, focusing on building a responsive, visually appealing, and user-friendly experience with smooth navigation and modern design implementation.", tech: ["Photoshop", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://wildflowergoa.com/", year: "", image: "/images/projects/wildflower.png" },
  { id: 13, number: "13", title: "Saffron Spice Seattle Website", subtitle: "Saffron Spice Restaurant, Seattle · Seattle, WA, USA", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend and WordPress development for Saffron Spice Seattle - Restaurant website, focusing on UI/UX design, responsive layouts, and creating an engaging and easy-to-navigate restaurant website experience.", tech: ["Photoshop", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://saffronspiceseattle.com/", year: "", image: "/images/projects/saffronspiceseattle.png" },
  { id: 14, number: "14", title: "Goa Imperial Holidays Website", subtitle: "Goa Imperial Holidays Resort · Goa, India", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend and WordPress development for Goan Imperial Holidays Resort website, focusing on UI/UX design, responsive layouts, and building an engaging travel website experience for seamless user navigation.", tech: ["Photoshop", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://goanimperialholidays.com/", year: "", image: "/images/projects/goanimperialholidays.png" },
  { id: 15, number: "15", title: "Mohidin Properties Website", subtitle: "Mohidin Real Estate · Goa, India", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend and WordPress development for Mohidin Properties, focusing on UI/UX design, responsive layouts, and creating a clean and user-friendly real estate browsing experience.", tech: ["Photoshop", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://mohidinproperties.in/", year: "", image: "/images/projects/mohidin.png" },
  { id: 16, number: "16", title: "Campal Beach Resort Website", subtitle: "Campal Beach Resort · Goa, India", category: "Frontend", tags: ["Frontend", "WordPress", "UI/UX"], description: "Worked on the frontend and WordPress development for Campal Beach Resort, focusing on UI/UX design, responsive layouts, and delivering an engaging and seamless user experience for the hospitality website.", tech: ["Photoshop", "WordPress", "HTML", "CSS", "JavaScript", "PHP"], link: "https://campalbeachresort.com/", year: "", image: "/images/projects/campal.png" },
];

const FILTERS = ["All", "Frontend", ".NET", "WordPress", "UI/UX", "AI", "Mobile App", "Mendix"];

function FeaturedSlider() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((i) => (i - 1 + FEATURED.length) % FEATURED.length);
  const next = () => setCurrent((i) => (i + 1) % FEATURED.length);
  const project = FEATURED[current];

  return (
    <>
      <div className="featured-slider-frame">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="featured-slide"
          >
            <img src={project.image} alt={project.title} className="featured-slide-bg-img" />
            <div className="featured-slide-gradient" />

            <div className="featured-slide-content">
              {/* Top meta row */}
              <div className="flex items-center gap-3">
                {/* <span className="featured-slide-number">{project.number}</span> */}
                <span className="featured-slide-badge">Featured</span>
                <span className="featured-slide-year">{project.year}</span>
              </div>

              {/* Bottom copy */}
              <div>
                <p className="featured-slide-category">{project.category}</p>
                <h2 className="featured-slide-title">{project.title}</h2>
                <p className="featured-slide-desc">{project.description}</p>

                <div className="featured-slide-footer">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 9).map((t) => (
                      <span key={t} className="featured-slide-tech-tag">{t}</span>
                    ))}
                  </div>
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="featured-slide-link"
                    >
                      Visit Site <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="featured-controls">
        <button onClick={prev} className="featured-nav-btn"><ChevronLeft size={13} /></button>
        <div className="featured-dots">
          {FEATURED.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="featured-dot-btn">
              {/* Width is active-state driven, kept inline */}
              <div
                className="featured-dot"
                style={{
                  width: i === current ? 22 : 5,
                  background: i === current ? "#a2e773" : "rgba(232,228,220,0.3)",
                }}
              />
            </button>
          ))}
        </div>
        <button onClick={next} className="featured-nav-btn"><ChevronRight size={13} /></button>
      </div>
    </>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card"
    >
      {/* Background image — filter is hover-state driven, kept inline */}
      <img
        src={project.image}
        alt={project.title}
        className="project-card-bg-img"
        style={{
          filter: hovered
            ? "brightness(0.45) saturate(0.8)"
            : "brightness(0.28) saturate(0.4) grayscale(30%)",
        }}
      />
      <div className="project-card-gradient" />

      {/* Default content */}
      <div className="project-card-body">
        <div className="flex items-center justify-between">
          {/* <span className="project-card-number">{project.number}</span> */}
          <span className="project-card-year">{project.year}</span>
        </div>
        <div>
          <p className="project-card-category">{project.category}</p>
          <h3 className="project-card-title">{project.title}</h3>
          <div className="flex flex-wrap gap-[5px]">
            {project.tech.slice(0, 6).map((t) => (
              <span key={t} className="project-card-tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="project-card-hover-overlay"
          >
            <div />
            <p className="project-card-hover-desc">{project.description}</p>
            <div className="flex justify-end">
              {project.link !== "#" ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-visit-link"
                >
                  Visit Site <ExternalLink size={11} />
                </a>
              ) : (
                <span className="project-card-private-label">Private Project</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = PROJECTS.filter(
    (p) => activeFilter === "All" || p.tags.includes(activeFilter)
  );

  return (
    <div className="projects-page-root">
      {/* <CustomCursor /> */}
      <InnerNav />

      <svg className="pointer-events-none fixed inset-0 w-full h-full z-50 opacity-[0.28] mix-blend-soft-light">
        <filter id="grainP">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves={4} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainP)" />
      </svg>

      <div className="projects-inner">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="page-top-text">— Selected Work</p>
          <div className="projects-hero-row">
            <h1 className="page-title">
              Work &amp;<span> Projects</span>
            </h1>
            <p className="page-description">50+ projects delivered across 15 years</p>
          </div>
        </motion.div>

        {/* Featured slider */}
        <div className="mb-8">
          <p className="projects-section-label">— Featured</p>
          <FeaturedSlider />
        </div>

        {/* Filter bar */}
        <div className="projects-filter-bar">
          {/* <p className="projects-filter-label">Filter</p> */}
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="projects-filter-btn"
              /* Active colours are state-driven, kept inline */
              style={{
                background: activeFilter === f ? "#a2e773" : "transparent",
                border: activeFilter === f ? "1px solid #a2e773" : "1px solid rgba(232,228,220,0.15)",
                color: activeFilter === f ? "#0a0a0a" : "rgba(232,228,220,0.5)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="projects-grid"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="projects-empty">
            <p className="projects-empty-text">No projects in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}