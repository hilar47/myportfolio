"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import "./components.css";


const projects = [
  {
    id: 1,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Dubai Municipality Website",
    description:
      "Worked on the official website of Dubai Municipality, delivering responsive frontend development, UI/UX improvements, and optimized digital services to enhance user experience and accessibility across platforms.",
    client: "Dubai Municipality Government",
    location: "Dubai - UAE",
    tools: "Figma, WordPress, HTML, CSS, JavaScript, PHP, Agile",
    image: "/images/dm.png",
    index: "01",
    link: "https://www.dm.gov.ae/"
  },
  {
    id: 2,
    category: "MOBILE APP, UI/UX",
    title: "Dubai Municipality App",
    description:
      "Led a team of 30+ developers and designers in building the Dubai Municipality App, contributing to frontend development, UI/UX design, and overall project delivery to create a seamless and user-friendly digital experience.",
    client: "Dubai Municipality Government",
    location: "Dubai - UAE",
    tools: "Figma, Swift, Kotlin, Java, Postman, Agile",
    image: "/images/dm-app.png",
    index: "02",
    link: "https://play.google.com/store/apps/details?id=ae.gov.dm.uma"
  },
  {
    id: 3,
    category: "FRONTEND, .NET",
    title: "Vivitrol Website",
    description:
      "Contributed to the development of the Vivitrol - Pharmaceutical sub applications by working on frontend implementation of medicinal presentations and .NET components, focusing on responsive UI development, performance, and seamless integration of backend functionalities.",
    client: "Vivitrol Pharmaceuticals",
    location: "Kansas - USA",
    tools: "HTML, CSS, JavaScript, .NET, Agile",
    image: "/images/vivitrol.png",
    index: "03",
    link: "https://www.vivitrol.com/"
  },
  {
    id: 4,
    category: "FRONTEND, MENDIX, UI/UX",
    title: "Hicast Website",
    description:
      "Worked on the frontend and Mendix components for the HiCast - Sports delivery website, contributing to responsive UI development, seamless user experience, and efficient integration of low-code application features.",
    client: "Hicast",
    location: "USA",
    tools: "Figma, HTML, CSS, JavaScript, Mendix, Agile",
    image: "/images/hicast.png",
    index: "04",
    link: "https://watch.hcst.me/"
  },
  {
    id: 5,
    category: "PRODUCT, FRONTEND, ANGULARJS",
    title: "Ecoreach Application - Product",
    description:
      "Worked on the frontend using AngularJS and contributed to implementation and enhancements of the Schneider Electric EcoReach product, supporting device configuration, commissioning workflows, and user interface development for electrical asset management applications.",
    client: "Schneider Electric",
    location: "Bangalore - India",
    tools: "HTML, CSS, JavaScript, AngularJS, .NET",
    image: "/images/ecoreach.png",
    index: "04",
    link: "https://www.se.com/ae/en/product-range/62980-ecoreach/"
  },
  {
    id: 6,
    category: "FRONTEND, PHP, UI/UX",
    title: "Deburenkoken Website",
    description:
      "Worked on the frontend, PHP development, and UI/UX design for the De Buren website - Food delivery website, focusing on building a responsive interface, improving user experience, and supporting smooth backend integration for a clean and engaging web platform.",
    client: "Deburenkoken",
    location: "Sliedrecht - Netherlands",
    tools: "Figma, HTML, CSS, JavaScript, PHP",
    image: "/images/deburenkoken.png",
    index: "04",
    link: "https://deburenkoken.nl/"
  },
  {
    id: 7,
    category: "FRONTEND, HTML5, UI/UX",
    title: "Xotik Website",
    description:
      "Worked on the frontend, HTML5, and UI/UX design for Xotik - beverage company, focusing on building responsive layouts, improving user experience, and delivering visually engaging and performance-optimized web interfaces.",
    client: "Xotik Frujus Pvt. Ltd.",
    location: "Goa - India",
    tools: "Photoshop, HTML, CSS, JavaScript",
    image: "/images/xotik.png",
    index: "04",
    link: "https://xotik.co.in/"
  },
  {
    id: 8,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Durubco Website",
    description:
      "Worked on the frontend and WordPress development for the Durubco - Water pump suppliers, focusing on UI/UX design, responsive layouts, and enhancing overall user experience with smooth and modern web interactions.",
    client: "Yes Trade - Water Solutions",
    location: "Sarjah - UAE",
    tools: "Figma, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/durubco.png",
    index: "04",
    link: "https://durubco.com/"
  },
  {
    id: 9,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "The Bicycle Trip Goa Website",
    description:
      "Worked on the frontend and WordPress development for The Bicycle Trip Goa website, focusing on UI/UX design, responsive layouts, and creating an engaging and user-friendly travel experience platform.",
    client: "The Bicycle Trip Goa",
    location: "Goa - India",
    tools: "Photoshop, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/thebicycletripgoa.png",
    index: "04",
    link: "https://thebicycletripgoa.com/"
  },
  {
    id: 10,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Village Panchayat Navelim Website",
    description:
      "Worked on the frontend and WordPress development for the V.P. Navelim, Goa - India Government website, focusing on UI/UX design, responsive layout implementation, and improving accessibility and user experience for community information and updates.",
    client: "India Government",
    location: "Navelim, Goa - India",
    tools: "Photoshop, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/vpnavelim.png",
    index: "04",
    link: "https://vpnavelim.com/"
  },
  {
    id: 11,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Shantilal Real Estate Website",
    description:
      "Worked on the frontend and WordPress development for Shantilal Real Estate, focusing on UI/UX design, responsive layouts, and creating a clean, user-friendly property browsing experience.",
    client: "Shantilal Real Estate",
    location: "Goa - India",
    tools: "Photoshop, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/shantilal.png",
    index: "04",
    link: "https://shantilalrealestate.com/"
  },
  {
    id: 12,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Wildflower Goa Website",
    description:
      "Worked on the frontend, WordPress development, and UI/UX design for the Wildflower Resort Goa website, focusing on building a responsive, visually appealing, and user-friendly experience with smooth navigation and modern design implementation.",
    client: "Wildflower Goa Resort",
    location: "Goa - India",
    tools: "Photoshop, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/wildflower.png",
    index: "04",
    link: "https://wildflowergoa.com/"
  },
  {
    id: 13,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Saffron Spice Seattle Website",
    description:
      "Worked on the frontend and WordPress development for Saffron Spice Seattle - Restaurant website, focusing on UI/UX design, responsive layouts, and creating an engaging and easy-to-navigate restaurant website experience.",
    client: "Saffron Spice Restaurant, Seattle",
    location: "Seattle, WA - USA",
    tools: "Photoshop, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/saffronspiceseattle.png",
    index: "04",
    link: "https://saffronspiceseattle.com/"
  },
  {
    id: 14,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Goa Imperial Holidays Website",
    description:
      "Worked on the frontend and WordPress development for Goan Imperial Holidays Resort website, focusing on UI/UX design, responsive layouts, and building an engaging travel website experience for seamless user navigation.",
    client: "Goa Imperial Holidays Resort",
    location: "Goa - India",
    tools: "Photoshop, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/goanimperialholidays.png",
    index: "04",
    link: "https://goanimperialholidays.com/"
  },
  {
    id: 15,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Mohidin Properties Website",
    description:
      "Worked on the frontend and WordPress development for Mohidin Properties, focusing on UI/UX design, responsive layouts, and creating a clean and user-friendly real estate browsing experience.",
    client: "Mohidin Real Estate",
    location: "Goa - India",
    tools: "Photoshop, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/mohidin.png",
    index: "04",
    link: "https://mohidinproperties.in/"
  },
  {
    id: 16,
    category: "FRONTEND, WORDPRESS, UI/UX",
    title: "Campal Beach Resort Website",
    description:
      "Worked on the frontend and WordPress development for Campal Beach Resort, focusing on UI/UX design, responsive layouts, and delivering an engaging and seamless user experience for the hospitality website.",
    client: "Campal Beach Resort",
    location: "Goa - India",
    tools: "Photoshop, WordPress, HTML, CSS, JavaScript, PHP",
    image: "/images/campal.png",
    index: "04",
    link: "https://campalbeachresort.com/"
  },
];



export default function ProjectSlide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const isThrottled = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const goTo = (next: number, dir: "up" | "down") => {
    if (animating || next < 0 || next >= projects.length) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(next);
      setAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (isThrottled.current) return;

      scrollAccumulator.current += e.deltaY;

      if (Math.abs(scrollAccumulator.current) > 60) {
        const dir = scrollAccumulator.current > 0 ? "down" : "up";
        const next = activeIndex + (dir === "down" ? 1 : -1);
        scrollAccumulator.current = 0;
        isThrottled.current = true;
        lastScrollTime.current = now;
        goTo(next, dir);
        setTimeout(() => {
          isThrottled.current = false;
        }, 900);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeIndex, animating]);

  // Touch support
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 50) {
      goTo(activeIndex + (delta > 0 ? 1 : -1), delta > 0 ? "down" : "up");
    }
  };

  const project = projects[activeIndex];

  const slideClass = animating
    ? direction === "down"
      ? "opacity-0 -translate-y-8"
      : "opacity-0 translate-y-8"
    : "opacity-100 translate-y-0";

  return (
     <section ref={containerRef} className="portfolio-slider" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {/* Main 2-column slide */}
          <div
            className={`slider-cols
              inset-0 flex align-start
              transition-all duration-500 ease-out
              ${slideClass}
            `}
          >
            {/* LEFT — Image */}
            <div
              className={`
                relative flex-shrink-0 w-[48vw] max-w-[680px] min-w-[320px]
                h-screen flex align-start justify-center pr-8
                transition-all duration-700 ease-out delay-100
                ${loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
              `}
            >
              <div className="relative w-full h-[65vh] max-h-[740px] rounded-[28px] overflow-hidden shadow-2xl border border-white/5 group">
                {/* Placeholder gradient image (replace with real images) */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center-left"
                  priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
                {/* Project number watermark */}
                <div className="absolute bottom-6 right-8 font-bebas text-[120px] leading-none text-white/5 pointer-events-none select-none">
                  {project.index}
                </div>
                {/* Category pill */}
                <div className="absolute top-6 left-6">
                  <span className="transparent-badge text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full">
                    {project.category}
                  </span>
                </div>
                {/* View button on hover */}
                <Link
                  prefetch={false} href={project.link}
                  className="
                    absolute bottom-6 left-6
                    flex items-center gap-2
                    bg-white text-black text-xs font-bold tracking-widest uppercase
                    px-5 py-3 rounded-full
                    opacity-0 group-hover:opacity-100
                    translate-y-3 group-hover:translate-y-0
                    transition-all duration-300
                    hover:bg-[#cc0000] hover:text-white
                  " target="_blank" rel="noopener noreferrer"
                >
                  View   <FiArrowUpRight />
                </Link>
              </div>
            </div>

            {/* RIGHT — Content */}
            <div
              className={`
                relative flex-1 flex flex-col justify-center pr-8 pl-4
                transition-all duration-700 ease-out delay-200
                ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
              `}
            >
              {/* Category */}
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-6 h-[2px] bg-[#cc0000]" />
                <span className="text-[#cc0000] font-bold tracking-widest uppercase text-xs">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-bebas text-5xl xl:text-6xl tracking-wider leading-none mb-6">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-base leading-relaxed mb-10">
                {project.description}
              </p>

              {/* Meta grid */}
              <div className="grid grid-cols-3 gap-6 mb-15rem pb-25 border-b border-white/10">
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mb-1 font-semibold">
                    Client
                  </p>
                  <p className="text-white font-semibold text-sm">{project.client}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mb-1 font-semibold">
                    Location
                  </p>
                  <p className="text-white font-semibold text-sm">{project.location}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mb-1 font-semibold">
                    Tools
                  </p>
                  <p className="text-white font-semibold text-sm">{project.tools}</p>
                </div>
              </div>

              {/* CTA */}
              <Link
                prefetch={false} href={project.link}
                className="
                  group inline-flex items-center gap-0 self-start
                  border-2 border-white/20 rounded-full overflow-hidden
                  hover:border-[#cc0000] transition-colors duration-300
                " target="_blank" rel="noopener noreferrer"
              >
                <span className="px-8 py-3 text-white font-bold tracking-widest uppercase text-xs">
                  {project.id === 2 ? 'View App' : 'View Website'}
                </span>
                <span className="flex items-center justify-center w-12 h-12 bg-[#cc0000] group-hover:bg-[#ff1a1a] transition-colors duration-300">
                  <FiArrowRight className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>

          {/* Vertical slide counter + navigation — right side */}
          <div className="absolute right-minus30 verticalBottom -translate-y-1/2 z-30 flex flex-col items-center gap-3">
            {/* Up arrow */}
            <button
              onClick={() => goTo(activeIndex - 1, "up")}
              disabled={activeIndex === 0}
              className="
                w-10 h-10 rounded-full border border-white/20
                flex items-center justify-center
                text-gray-500 hover:text-white hover:border-[#cc0000] hover:bg-[#cc0000]
                disabled:opacity-20 disabled:cursor-not-allowed
                transition-all duration-300
              "
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex flex-col items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > activeIndex ? "down" : "up")}
                  className={`
                    rounded-full transition-all duration-300
                    ${
                      i === activeIndex
                        ? "w-[3px] h-8 bg-[#cc0000]"
                        : "w-[3px] h-3 bg-white/25 hover:bg-white/60"
                    }
                  `}
                />
              ))}
            </div>

            {/* Down arrow */}
            <button
              onClick={() => goTo(activeIndex + 1, "down")}
              disabled={activeIndex === projects.length - 1}
              className="
                w-10 h-10 rounded-full border border-white/20
                flex items-center justify-center
                text-gray-500 hover:text-white hover:border-[#cc0000] hover:bg-[#cc0000]
                disabled:opacity-20 disabled:cursor-not-allowed
                transition-all duration-300
              "
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Bottom progress bar */}
          {/* <div className="absolute bottom-8 left-16 right-20 z-30 flex items-center gap-6">
            <span className="font-bebas text-5xl text-[#cc0000] leading-none">
              {project.index}
            </span>
            <div className="flex-1 h-[1px] bg-white/10 relative">
              <div
                className="absolute left-0 top-0 h-full bg-[#cc0000] transition-all duration-500 ease-out"
                style={{
                  width: `${((activeIndex + 1) / projects.length) * 100}%`,
                }}
              />
            </div>
            <span className="font-bebas text-2xl text-gray-600 leading-none">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div> */}

          {/* Scroll hint (first visit) */}
          {/* {activeIndex === 0 && loaded && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path d="M6 1v14M1 11l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )} */}
        </section>
  );
}
