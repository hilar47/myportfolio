"use client";
import Sidebar from "@/components/Sidebar";
import ProjectSlide from "@/components/ProjectSlide";
import { useEffect, useRef, useState } from "react";


export default function WorkPage() {
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
      const t = setTimeout(() => setLoaded(true), 100);
      return () => clearTimeout(t);
    }, []);


  return (
     <main className="min-h-screen bg-[#111] text-white flex overflow-hidden relative px-16 pr-28 py-20" >
      {/* Red corner accent */}
      <div className="absolute top-0 left-0 w-[140px] h-[140px] bg-[#cc0000] rounded-br-[80px] z-0" />

      <div className={`relative z-10 max-w-3xl mx-auto transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <section className="title-section text-center text-sm-center revealator-slideup revealator-once revealator-delay1">
          <div className="position-relative" style={{ opacity: 1, transform: "none" }}>
            <h1>My <span>Portfolio</span></h1>
            <span className="title-bg">Works</span>
          </div>
        </section>

        <p className="text-gray-400 text-lg leading-relaxed mb-12 text-center">
         Explore My Latest Work and Discover the Craftsmanship Behind Each Project.
        </p>

      <ProjectSlide />

       
      </div>

      <Sidebar />
    </main>
  );
}

