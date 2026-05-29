"use client";
import { useRef } from "react";

// ── Tool data ──────────────────────────────────────────────────────────────
const tools = [
  {
    name: "WordPress",
    pct: 95,
    svg: (
      <img src="/images/skills/wordPress.png" alt="WordPress logo" />
    ),
  },
  {
    name: "HTML",
    pct: 95,
    svg: (
      <img src="/images/skills/html.png" alt="HTML logo" />
    ),
  },
  {
    name: "CSS",
    pct: 95,
    svg: (
      <img src="/images/skills/css.png" alt="CSS logo" />
    ),
  },
  {
    name: "React",
    pct: 80,
    svg: (
      <img src="/images/skills/react.png" alt="React logo" />
    ),
  },
  {
    name: "JS / Jquery",
    pct: 90,
    svg: (
      <img src="/images/skills/jquery.png" alt="JS / jQuery logo" />
    ),
  },
  {
    name: "Figma",
    pct: 90,
    svg: (
      <img src="/images/skills/figma.png" alt="Figma logo" />
    ),
  },
  {
    name: "GIT / SVN",
    pct: 80,
    svg: (
      <img src="/images/skills/git.png" alt="Git logo" />
    ),
  },
  {
    name: "SASS / LESS",
    pct: 90,
    svg: (
      <img src="/images/skills/sass.png" alt="SASS logo" />
    ),
  },
  {
    name: "Photoshop",
    pct: 90,
    svg: (
      <img src="/images/skills/photoshop.png" alt="Photoshop logo" />
    ),
  },
  {
    name: "Canva",
    pct: 85,
    svg: (
      <img src="/images/skills/canva.png" alt="Canva logo" />
    ),
  },
  {
    name: "Claude",
    pct: 80,
    svg: (
      <img src="/images/skills/claude.png" alt="Claude logo" />
    ),
  },
  {
    name: "OpenAI",
    pct: 80,
    svg: (
      <img src="/images/skills/openai.png" alt="OpenAI logo" />
    ),
  },
  {
    name: "Grunt / Gulp",
    pct: 70,
    svg: (
      <img src="/images/skills/grunt.png" alt="Grunt logo" />
    ),
  },
  {
    name: "SEO / Analytics",
    pct: 70,
    svg: (
      <img src="/images/skills/seo.png" alt="SEO logo" />
    ),
  },
  {
    name: "JSON / XML",
    pct: 80,
    svg: (
      <img src="/images/skills/json.png" alt="JSON logo" />
    ),
  },
  {
    name: ".Net / ASP",
    pct: 60,
    svg: (
      <img src="/images/skills/dotnet.png" alt=".NET logo" />
    ),
  },
  {
    name: "PHP",
    pct: 60,
    svg: (
      <img src="/images/skills/php.png" alt="PHP logo" />
    ),
  },
  {
    name: "MySQL / SQL",
    pct: 80,
    svg: (
      <img src="/images/skills/mysql.png" alt="MySQL logo" />
    ),
  },
  {
    name: "Mongo DB",
    pct: 80,
    svg: (
      <img src="/images/skills/mongodb.png" alt="MongoDB logo" />
    ),
  },
  {
    name: "Agile / Scrum",
    pct: 90,
    svg: (
      <img src="/images/skills/agile.png" alt="Agile logo" />
    ),
  },
  {
    name: "MS Sharepoint",
    pct: 60,
    svg: (
      <img src="/images/skills/sharepoint.png" alt="SharePoint logo" />
    ),
  },
  {
    name: "Node.js",
    pct: 60,
    svg: (
      <img src="/images/skills/node.png" alt="Node.js logo" />
    ),
  },
  {
    name: "Docker",
    pct: 70,
    svg: (
      <img src="/images/skills/docker.png" alt="Docker logo" />
    ),
  },
  {
    name: "CI / CD",
    pct: 70,
    svg: (
      <img src="/images/skills/cicd.png" alt="CI/CD logo" />
    ),
  },
  {
    name: "MERN Stack",
    pct: 70,
    svg: (
      <img src="/images/skills/mern.png" alt="MERN Stack logo" />
    ),
  },
  {
    name: "LAMP Stack",
    pct: 70,
    svg: (
      <img src="/images/skills/lamp.png" alt="LAMP Stack logo" />
    ),
  },
  {
    name: "AWS",
    pct: 60,
    svg: (
      <img src="/images/skills/aws.png" alt="AWS logo" />
    ),
  },
  {
    name: "Azure",
    pct: 60,
    svg: (
      <img src="/images/skills/azure.png" alt="Azure logo" />
    ),
  },
];

// Duplicate for seamless infinite loop
const allTools = [...tools, ...tools];

export default function SkillsMarquee() {
  return (
    <div className="w-full py-10 overflow-hidden">

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-[#111] to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-[#111] to-transparent pointer-events-none" />

        <div className="flex gap-5 marquee-track">
          {allTools.map((tool, i) => (
            <SkillCard key={`${tool.name}-${i}`} tool={tool} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function SkillCard({ tool }: { tool: (typeof tools)[0] }) {
  return (
    <div
      className="py-1
        group flex-shrink-0 flex flex-col items-center
        w-36 cursor-default select-none
      "
    >
      {/* Pill card */}
      <div
        className="
          w-28 rounded-[56px] flex items-center justify-center
          transition-all duration-300
        "
      >
        <div className="
          w-20 h-20 rounded-full
          flex items-center justify-center
          group-hover:scale-110 transition-transform duration-300
        ">
          {tool.svg}
        </div>
      </div>

      {/* Percentage */}
      <p className="mt-4 text-3xl font-black text-white group-hover:text-[#cc0000] transition-colors duration-300">
        {tool.pct}%
      </p>

      {/* Name */}
      <p className="mt-1 text-[14px] font-bold tracking-widest uppercase text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
        {tool.name}
      </p>
    </div>
  );
}
