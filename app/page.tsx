"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import Sidebar from "@/components/Sidebar";
import TypeWriter from "@/components/TypeWriter";
import "./home.css";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-[#111] text-white flex overflow-hidden relative">


      {/* Red corner accent top-left */}
      <div className="absolute top-0 left-0 w-[220px] h-[220px] bg-[#cc0000] rounded-br-[120px] z-0" />

      {/* Left: Photo */}
      <div
        className={`
          profile-image relative z-10 flex-shrink-0 w-[42vw] max-w-[600px] min-w-[300px]
          h-screen flex items-center justify-center
          transition-all duration-700 ease-out
          ${loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
        `}
      >
        <div className="relative w-[88%] h-[88vh] max-h-[800px] rounded-[32px] overflow-hidden shadow-2xl border border-white/5">
          <Image
            src="/images/hilario-goes.jpg"
            alt="Hilario Goes"
            fill
            className="object-cover object-center"
            priority
          />
          {/* subtle dark gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Red accent bottom-left of card */}
        <div className="absolute bottom-[4vh] left-0 w-[80px] h-[80px] bg-[#cc0000] rounded-tr-[40px] z-[-1]" />
      </div>

      {/* Right: Content */}
      <div
        className={`
          relative z-10 flex-1 flex flex-col justify-center px-16 pr-28
          transition-all duration-700 ease-out delay-200
          ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
        `}
      >
        {/* Eyebrow line */}
        <div className="flex items-center gap-4 mb-4">
          <span className="block w-8 h-[3px] bg-[#cc0000]" />
          <span className="text-[#cc0000] font-extrabold tracking-widest uppercase text-sm">
            TECHNICAL LEAD & FULL STACK DEVELOPER
          </span>
        </div>

        {/* Name */}
        <h1 className="text-5xl xl:text-6xl font-black leading-tight mb-1">
          I AM{" "}
          <span className="text-[#cc0000]">HILARIO GOES.</span>
        </h1>

        {/* Role TypeWriter */}
        <div className="mb-8">
          <TypeWriter />
        </div>

        {/* Bio */}
        <p className="text-gray-400 text-lg leading-relaxed mb-10">
         Technical Lead and Senior Frontend Developer from Goa, India. <br/>Currently working at Dubai Municipality, Dubai - UAE.
        </p>

        <p className="text-gray-400 text-lg leading-relaxed mb-10">
         Skilled in Frontend, Full Stack, Backend, WordPress, Mendix, and UI/UX Development, with a passion for building modern, scalable, and user-focused digital solutions.
        </p>

        <div className="flex gap-4">
            {/* CTA Button */}
            {/* <Link
              href="/about"
              className="
                group inline-flex items-center gap-0 self-start
                border-2 border-white/30 rounded-full
                overflow-hidden
                hover:border-[#cc0000] transition-colors duration-300
              "
            >
              <span className="px-8 py-4 text-white font-bold tracking-widest uppercase text-sm">
                More About Me
              </span>
              <span
                className="
                  flex items-center justify-center
                  w-14 h-14 bg-[#cc0000]
                  group-hover:bg-[#ff1a1a] transition-colors duration-300
                "
              >
                <FiArrowRight className="text-white text-xl group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link> */}

            {/* CV Button */}
            <Link
              prefetch={false} href="files/HilarioGoes-Resume.pdf"
              className="
                cv-btn group inline-flex items-center gap-0 self-start
                border-2 border-white/30 rounded-full
                overflow-hidden
                hover:border-[#cc0000] transition-colors duration-300
              " target="_blank"
            >
              <span className="px-8 py-4 text-white font-bold tracking-widest uppercase text-sm">
                Download CV
              </span>
              <span
                className="
                  flex items-center justify-center
                  w-14 h-14 bg-[#cc0000]
                  group-hover:bg-[#ff1a1a] transition-colors duration-300
                "
              >
                <FiArrowRight className="text-white text-xl group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

        </div>
        

        {/* Stats row */}
        <div className="flex gap-12 mt-14 pt-10 border-t border-white/10">
          {[
            { num: "15+", label: "Years Experience" },
            { num: "50+", label: "Projects Done" },
            { num: "10+", label: "Honors and Awards" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-5xl font-black text-[#cc0000]">{s.num}</p>
              <p className="text-gray-500 text-md mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <Sidebar />
    </main>
  );
}
