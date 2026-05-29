"use client";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Shubham Mathur",
    role: "Senior Android Engineer at Nagarro",
    // avatar: "/images/shubham.jpeg",
    initials: "SM",
    text: "​I had the pleasure of working under Hilario’s leadership during our time on the Dubai Municipality project. He is an exceptional manager who leads with both technical insight and genuine support for his team. Even during high-pressure phases and tight deadlines, Hilario remained composed and provided the clear direction necessary to keep the project on track. He has a unique ability to empower his developers while staying deeply involved in the project's success. Any team would be fortunate to have him at the helm.",
  },
  {
    name: "Ashwin Kumar",
    role: "Director of User Experience at Creative Capsule",
    // avatar: "/images/avatar-2.jpg",
    initials: "AK",
    text: "Hilario is an asset to any team. He is very resourceful and picking up new technologies (learning, researching, deep diving) is what he is excellent at.  He can be counted on to find solutions to just about any problem in code or functionality. There's always a positive energy that he exudes which is a very important catalyst to any team he works with. He always guided and mentored team members and helped them raise their level of expertise. I would definitely recommend Hilario as he will bring good energy, intelligence, great attitude and problem solving skills, which is vital for any team/organisation.",
  },
  {
    name: "Shabbir Hussain",
    role: "Sr. Software Engineer at Dubai Muncicipality",
    // avatar: "/images/shubham.jpeg",
    initials: "SH",
    text: "Hilario brings dedication, creativity, and leadership to every project he works on. His collaborative approach and commitment to excellence make him someone you can always rely on.",
  },
  {
    name: "Malik Muhammad Bilal Riaz",
    role: "Software Programmer at Dubai Muncicipality",
    // avatar: "/images/avatar-2.jpg",
    initials: "MB",
    text: "Working with Hilario was a great experience. He combines strong technical expertise with excellent communication and problem-solving skills, always ensuring projects are delivered smoothly and on time.",
  },
  {
    name: "Narayana moorthy",
    role: "Senior Engineer at Roads and Transport Authority",
    // avatar: "/images/avatar-2.jpg",
    initials: "NM",
    text: "Hilario brings strong experience in frontend development, UI implementation, and WordPress customization. During our time working together, he consistently delivered clean, user-friendly interfaces and showed excellent problem-solving abilities. His commitment to quality and teamwork makes him an excellent developer to collaborate with.",
  },
];

const PAIR = 2;
const total = Math.ceil(testimonials.length / PAIR);

export default function TestimonialsSlider() {
  const [idx, setIdx] = useState(0);
  const [slide, setSlide] = useState<"in" | "out-left" | "out-right">("in");

  const go = (dir: "prev" | "next") => {
    const outDir = dir === "next" ? "out-left" : "out-right";
    setSlide(outDir);
    setTimeout(() => {
      setIdx((p) => (dir === "next" ? (p + 1) % total : (p - 1 + total) % total));
      setSlide("in");
    }, 280);
  };

  const pair = testimonials.slice(idx * PAIR, idx * PAIR + PAIR);

  const slideStyle = {
    in: { opacity: 1, transform: "translateX(0)" },
    "out-left": { opacity: 0, transform: "translateX(-32px)" },
    "out-right": { opacity: 0, transform: "translateX(32px)" },
  }[slide];

  return (
    <div className="w-full">
      {/* Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        style={{ ...slideStyle, transition: "all 0.28s ease" }}
      >
        {pair.map((t) => (
          <div
            key={t.name}
            className="testimonial-card relative rounded-2xl border border-white/5 bg-[#161616] p-8 flex flex-col justify-between gap-8 overflow-hidden group"
          >
            {/* Quote mark watermark */}
            <div
              className="absolute top-4 right-6 font-bebas text-[120px] leading-none text-white/[0.03] pointer-events-none select-none"
            >
              "
            </div>

            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #cc0000 0%, #8b0000 100%)",
                boxShadow: "0 0 0 3px rgba(204,0,0,0.15), 0 4px 12px rgba(0,0,0,0.4)",
                color: "white",
                letterSpacing: "0.05em",
              }}
            >
              {t.initials}
            </div>

            {/* Text */}
            <p className="text-gray-300 text-[15px] leading-relaxed flex-1">
              "{t.text}"
            </p>

            {/* Author */}
            <div>
              <p className="text-white font-bold text-base">{t.name}</p>
              <p className="text-gray-500 text-sm mt-0.5">{t.role}</p>
            </div>

            {/* Hover bottom line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
              style={{ background: "linear-gradient(90deg, #cc0000, transparent)" }}
            />
          </div>
        ))}
      </div>

      {/* Arrows only — no dots */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={() => go("prev")}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: "#cc0000",
            boxShadow: "0 4px 16px rgba(204,0,0,0.3)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ff1a1a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#cc0000")}
        >
          <FiChevronLeft className="text-white text-xl" />
        </button>
        <button
          onClick={() => go("next")}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: "#cc0000",
            boxShadow: "0 4px 16px rgba(204,0,0,0.3)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#ff1a1a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#cc0000")}
        >
          <FiChevronRight className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
}
