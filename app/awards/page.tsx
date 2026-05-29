"use client";
import Sidebar from "@/components/Sidebar";
import AwardsSlider from "@/components/AwardsSlider";
import TestimonialsSlider from "@/components/TestimonialsSlider";
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
            <h1>My <span>Awards</span></h1>
            <span className="title-bg">Testimonials</span>
          </div>
        </section>

        <p className="text-gray-400 text-lg leading-relaxed mb-12 text-center">
         Awards and recognitions received throughout my career, reflecting consistent performance, dedication, and contribution to successful project delivery.
        </p>

      
      {/* Awards */}
        <section className="mb-10">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-1">
                Company and Industry Recognitions
              </p>
              <h2 className="font-bebas text-4xl tracking-wide">MAJOR AWARDS</h2>
            </div>
            <div className="flex-1 h-[1px] bg-white/5 ml-4" />
          </div>

          <AwardsSlider />
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-1">
                Colleagues and Management
              </p>
              <h2 className="font-bebas text-4xl tracking-wide">TESTIMONIALS</h2>
            </div>
            <div className="flex-1 h-[1px] bg-white/5 ml-4" />
          </div>


          <TestimonialsSlider />
        </section>

       
      </div>

      <Sidebar />
    </main>
  );
}

