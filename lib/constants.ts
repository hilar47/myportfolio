/* ================================================================
   constants.ts
   Centralised data for all portfolio sections.
   ================================================================ */

export const NAV_ITEMS = [
  "Work",
  "About",
  "Skills",
  "Experience",
  "Awards",
  "Contact",
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

export const ROLES = [
  "Technical Lead",
  "Frontend Developer",
  "Full Stack Developer",
  "Backend Developer",
  "UI/UX Designer",
] as const;

export const CITY_STOPS = [
  { city: "Goa", years: "2009–18", active: false },
  { city: "Bangalore", years: "2018–19", active: false },
  { city: "Dubai", years: "2019–Now", active: true },
] as const;

export const STATS = [
  { number: "15+", label: "Years\nExperience" },
  { number: "50+", label: "Projects\nDone" },
  { number: "6+", label: "Honors &\nAwards" },
] as const;

export const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hilario-goes",
    kind: "linkedin" as const,
    hoverColor: "#0A66C2",
  },
  {
    label: "GitHub",
    href: "https://github.com/hilar47",
    kind: "github" as const,
    hoverColor: "#f0f0f0",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/hilar47",
    kind: "instagram" as const,
    hoverColor: "#E1306C",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/hilario.goes",
    kind: "facebook" as const,
    hoverColor: "#1877F2",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/hilar47",
    kind: "text" as const,
    text: "Db",
    hoverColor: "#EA4C89",
  },
  {
    label: "CodePen",
    href: "https://codepen.io/hilar47",
    kind: "text" as const,
    text: "Cp",
    hoverColor: "#a2e773",
  },
] as const;

const DI = "/images/icons";
const SI = "https://cdn.simpleicons.org";

export const SKILL_GROUPS = [
  {
    category: "Frontend",
    color: "#61DAFB",
    description:
      "Pixel-perfect, performant interfaces built on solid frontend foundations — clean, scalable, and built to last.",
    skills: [
      { name: "HTML5", logo: `${DI}/html5.svg` },
      { name: "CSS3 / SASS", logo: `${DI}/css.svg` },
      {
        name: "JavaScript ES6+",
        logo: `${DI}/javascript.svg`,
      },
      {
        name: "TypeScript",
        logo: `${DI}/typescript.svg`,
      },
      { name: "React", logo: `${DI}/react.svg` },
      { name: "Next.js", logo: `${DI}/nextjs.svg` },
      { name: "jQuery", logo: `${DI}/jquery.svg` },
      {
        name: "Tailwind CSS",
        logo: `${DI}/tailwindcss.svg`,
      },
      { name: "Redux", logo: `${DI}/redux.svg` },
      { name: "Webpack / Vite", logo: `${DI}/vite.svg` },
      { name: "Grunt / Gulp", logo: `${DI}/grunt.svg` },
      { name: "Framer Motion", logo: `${DI}/remotion.svg` },
      { name: "GSAP", logo: `${DI}/sourcegraph.svg` },
      { name: "JSON", logo: `${DI}/json-schema.svg` },
    ],
  },
  {
    category: "Design & UI",
    description:
      "Clean, intentional design — from brand identity and UI systems to pixel-perfect websites, apps, and prototypes across print and digital.",
    color: "#F24E1E",
    skills: [
      { name: "Figma", logo: `${DI}/figma.svg` },
      {
        name: "Adobe Photoshop",
        logo: `${DI}/photoshop.svg`,
      },
      { name: "Adobe XD", logo: `${DI}/adobe-xd.svg` },
      {
        name: "Adobe Illustrator",
        logo: `${DI}/illustrator.svg`,
      },
      { name: "Canva", logo: `${DI}/canva.svg` },
      { name: "Responsive Design", logo: `${DI}/bootstrap.svg` },
      { name: "Sketch", logo: `${DI}/sketch.svg` },
      { name: "After Effects", logo: `${DI}/after-effects.svg` },
      { name: "Design Systems", logo: `${DI}/ant-design.svg` },
      { name: "Wireframing", logo: `${DI}/materializecss.svg` },
      { name: "Accessibility (WCAG)", logo: `${DI}/w3c.svg` },
      { name: "Miro", logo: `${DI}/miro.svg` },
      { name: "Adobe Creative Suite", logo: `${DI}/adobe.svg` },
    ],
  },
  {
    category: "Backend",
    color: "#68A063",
    description:
      "Robust backend systems — from API design and database architecture to server infrastructure built for scale and reliability.",
    skills: [
      { name: "Node.js", logo: `${DI}/nodejs.svg` },
      { name: "PHP", logo: `${DI}/php.svg` },
      { name: "Express.js", logo: `${DI}/express.svg` },
      { name: "MySQL", logo: `${DI}/mysql.svg` },
      { name: "Postman", logo: `${DI}/postman.svg` },
      { name: "MongoDB", logo: `${DI}/mongodb.svg` },
      { name: "REST API", logo: `${DI}/rest.svg` },
      { name: "GraphQL", logo: `${DI}/graphql.svg` },
    ],
  },
  {
    category: "DevOps & Cloud",
    color: "#FF9900",
    description:
      "From containerisation and CI/CD pipelines to cloud infrastructure — shipping code to production, reliably and at scale.",
    skills: [
      {
        name: "AWS",
        logo: `${DI}/aws.svg`,
      },
      { name: "Azure", logo: `${DI}/azure.svg` },
      { name: "Docker", logo: `${DI}/docker.svg` },
      { name: "Git", logo: `${DI}/git.svg` },
      { name: "CI/CD", logo: `${DI}/ci.svg` },
      { name: "Gitlab", logo: `${DI}/gitlab.svg` },
      { name: "Vercel", logo: `${DI}/vercel.svg` },
      { name: "Nginx", logo: `${DI}/nginx.svg` },
      { name: "Linux", logo: `${DI}/linux.svg` },
    ],
  },
  {
    category: "CMS & Platforms",
    color: "#21759B",
    description:
      "From headless CMS to enterprise platforms and low-code solutions — managing content and scaling digital products with ease.",
    skills: [
      {
        name: "WordPress",
        logo: `${DI}/wordpress.svg`,
      },
      { name: "WooCommerce", logo: `${DI}/woocommerce.svg` },
      { name: "SharePoint", logo: `${DI}/sharepoint.svg` },
      { name: "Mendix", logo: `${DI}/mendix.svg` },
      { name: "Elementor", logo: `${DI}/elementor.svg` },
      { name: "Jira", logo: `${DI}/jira.svg` },
      { name: "Drupal", logo: `${DI}/drupal.svg` },
      { name: "Joomla", logo: `${DI}/joomla.svg` },
      { name: "Shopify", logo: `${DI}/shopify.svg` },
    ],
  },
  {
    category: "AI Tools",
    color: "#F24E1E",
    description:
      "Staying ahead of the curve — integrating AI tools and modern best practices to build faster and smarter.",
    skills: [
      { name: "ChatGPT", logo: `${DI}/openai.svg`},
      { name: "Claude", logo: `${DI}/claude.svg` },
      { name: "GitHub Copilot", logo: `${DI}/copilot.svg` },
      { name: "Cursor", logo: `${DI}/cursor.svg` },
      { name: "Claude Code", logo: `${DI}/claude-code.svg` },
      { name: "Devin/Windsurf", logo: `${DI}/windsurf.svg` },
      { name: "Gemini", logo: `${DI}/gemini.svg` },
      { name: "Perplexity", logo: `${DI}/perplexity.svg` },
      { name: "Figma Make", logo: `${DI}/figma.svg` },
      { name: "v0 by Vercel", logo: `${DI}/v0.svg` },
      { name: "Midjourney", logo: `${DI}/midjourney.svg` },
    ],
  }
];

export const CLOUD_LOGOS = [
  // ── Core Frontend (size 44) ───────────────────────────────────────
  { name: "HTML5",           src: `${DI}/html5.svg`,        size: 44 },
  { name: "CSS3 / SASS",     src: `${DI}/css.svg`,          size: 44 },
  { name: "JavaScript ES6+", src: `${DI}/javascript.svg`,   size: 44 },
  { name: "TypeScript",      src: `${DI}/typescript.svg`,   size: 44 },
  { name: "React",           src: `${DI}/react.svg`,        size: 44 },
  { name: "Next.js",         src: `${DI}/nextjs.svg`,       size: 44 },
  { name: "jQuery",          src: `${DI}/jquery.svg`,       size: 44 },
  { name: "Tailwind CSS",    src: `${DI}/tailwindcss.svg`,  size: 44 },

  // ── Frontend Tooling + Design (size 36) ──────────────────────────
  { name: "Redux",            src: `${DI}/redux.svg`,        size: 36 },
  { name: "Webpack / Vite",   src: `${DI}/vite.svg`,         size: 36 },
  { name: "Grunt / Gulp",     src: `${DI}/grunt.svg`,        size: 36 },
  { name: "Framer Motion",    src: `${DI}/remotion.svg`,     size: 36 },
  { name: "GSAP",             src: `${DI}/sourcegraph.svg`,  size: 36 },
  { name: "JSON",             src: `${DI}/json-schema.svg`,  size: 36 },
  { name: "Figma",            src: `${DI}/figma.svg`,        size: 36 },
  { name: "Adobe Photoshop",  src: `${DI}/photoshop.svg`,    size: 36 },
  { name: "Adobe XD",         src: `${DI}/adobe-xd.svg`,     size: 36 },
  { name: "Adobe Illustrator",src: `${DI}/illustrator.svg`,  size: 36 },
  { name: "Canva",            src: `${DI}/canva.svg`,         size: 36 },
  { name: "Responsive Design",src: `${DI}/bootstrap.svg`,    size: 36 },

  // ── Design Tools + Backend Core (size 28) ────────────────────────
  { name: "Sketch",               src: `${DI}/sketch.svg`,         size: 28 },
  { name: "After Effects",        src: `${DI}/after-effects.svg`,  size: 28 },
  { name: "Design Systems",       src: `${DI}/ant-design.svg`,     size: 28 },
  { name: "Wireframing",          src: `${DI}/materializecss.svg`, size: 28 },
  { name: "Accessibility (WCAG)", src: `${DI}/w3c.svg`,            size: 28 },
  { name: "Miro",                 src: `${DI}/miro.svg`,           size: 28 },
  { name: "Node.js",              src: `${DI}/nodejs.svg`,         size: 28 },
  { name: "PHP",                  src: `${DI}/php.svg`,            size: 28 },
  { name: "Express.js",           src: `${DI}/express.svg`,        size: 28 },
  { name: "MySQL",                src: `${DI}/mysql.svg`,          size: 28 },
  { name: "Postman",              src: `${DI}/postman.svg`,        size: 28 },
  { name: "MongoDB",              src: `${DI}/mongodb.svg`,        size: 28 },

  // ── DevOps, Cloud & CMS (size 22) ────────────────────────────────
  { name: "REST API",   src: `${DI}/rest.svg`,        size: 22 },
  { name: "GraphQL",    src: `${DI}/graphql.svg`,     size: 22 },
  { name: "AWS",        src: `${DI}/aws.svg`,         size: 22 },
  { name: "Azure",      src: `${DI}/azure.svg`,       size: 22 },
  { name: "Docker",     src: `${DI}/docker.svg`,      size: 22 },
  { name: "Git",        src: `${DI}/git.svg`,         size: 22 },
  { name: "CI/CD",      src: `${DI}/ci.svg`,          size: 22 },
  { name: "Gitlab",     src: `${DI}/gitlab.svg`,      size: 22 },
  { name: "Vercel",     src: `${DI}/vercel.svg`,      size: 22 },
  { name: "Nginx",      src: `${DI}/nginx.svg`,       size: 22 },
  { name: "Linux",      src: `${DI}/linux.svg`,       size: 22 },
  { name: "WordPress",  src: `${DI}/wordpress.svg`,   size: 22 },
  { name: "WooCommerce",src: `${DI}/woocommerce.svg`, size: 22 },
  { name: "SharePoint", src: `${DI}/sharepoint.svg`,  size: 22 },
  { name: "Mendix",     src: `${DI}/mendix.svg`,      size: 22 },
  { name: "Elementor",  src: `${DI}/elementor.svg`,   size: 22 },
  { name: "Jira",       src: `${DI}/jira.svg`,        size: 22 },
  { name: "Drupal",     src: `${DI}/drupal.svg`,      size: 22 },
  { name: "Joomla",     src: `${DI}/joomla.svg`,      size: 22 },
  { name: "Shopify",    src: `${DI}/shopify.svg`,     size: 22 },

  // ── AI Tools ────────────────────────
  { name: "ChatGPT", src: `${DI}/openai.svg`,      size: 32},
  { name: "Claude", src: `${DI}/claude.svg`,      size: 32 },
  { name: "GitHub Copilot", src: `${DI}/copilot.svg`,      size: 32 },
  { name: "Cursor", src: `${DI}/cursor.svg` ,      size: 32},
  { name: "Claude Code", src: `${DI}/claude-code.svg`,      size: 32 },
  { name: "Devin/Windsurf", src: `${DI}/windsurf.svg` ,      size: 32},
  { name: "Gemini", src: `${DI}/gemini.svg` ,      size: 32},
  { name: "Perplexity", src: `${DI}/perplexity.svg`,      size: 32 },
  { name: "Figma Make", src: `${DI}/figma.svg`,      size: 32 },
  { name: "v0 by Vercel", src: `${DI}/v0.svg` ,      size: 32},
  { name: "Midjourney", src: `${DI}/midjourney.svg` ,      size: 32},
];

export const SOLAR_TECHS = [
  { label: "React", cat: "fe", ring: 0, slot: 0 },
  { label: "TypeScript", cat: "fe", ring: 0, slot: 1 },
  { label: "Node.js", cat: "be", ring: 0, slot: 2 },
  { label: "Python", cat: "be", ring: 0, slot: 3 },
  { label: "Next.js", cat: "fe", ring: 1, slot: 0 },
  { label: "Vue.js", cat: "fe", ring: 1, slot: 1 },
  { label: "Tailwind", cat: "fe", ring: 1, slot: 2 },
  { label: "PostgreSQL", cat: "be", ring: 1, slot: 3 },
  { label: "Docker", cat: "be", ring: 1, slot: 4 },
  { label: "GraphQL", cat: "be", ring: 1, slot: 5 },
  { label: "CSS3", cat: "fe", ring: 2, slot: 0 },
  { label: "HTML5", cat: "fe", ring: 2, slot: 1 },
  { label: "Figma", cat: "fe", ring: 2, slot: 2 },
  { label: "Redux", cat: "fe", ring: 2, slot: 3 },
  { label: "GSAP", cat: "fe", ring: 2, slot: 4 },
  { label: "WebGL", cat: "fe", ring: 2, slot: 5 },
  { label: "Sass", cat: "fe", ring: 2, slot: 6 },
  { label: "MongoDB", cat: "be", ring: 2, slot: 7 },
  { label: "Redis", cat: "be", ring: 2, slot: 8 },
  { label: "Express", cat: "be", ring: 2, slot: 9 },
  { label: "REST API", cat: "be", ring: 2, slot: 10 },
  { label: "AWS", cat: "be", ring: 2, slot: 11 },
  { label: "Linux", cat: "be", ring: 2, slot: 12 },
  { label: "Git", cat: "be", ring: 2, slot: 13 },
];

export const RING_SLOTS = [4, 6, 14];

export const FEATURED_PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "Dubai Municipality",
    subtitle: "Government Digital Portal",
    category: "Gov & Frontend",
    description:
      "Responsive frontend development with UI/UX enhancements and optimized digital services for improved accessibility and citizen engagement across Dubai's largest government platform.",
    tech: ["WordPress", "React", "PHP", "Figma", "HTML/CSS", "JavaScript", "Agile"],
    link: "https://www.dm.gov.ae/",
    year: "2019 — Present",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
  },
  {
    id: 2,
    number: "02",
    title: "Internal Gov Portal",
    subtitle: "Dubai Municipality — Staff System",
    category: "Full Stack",
    description:
      "Enterprise-grade internal portal for Dubai Municipality staff — document management, workflow automation, and role-based access built on React and Node.js with Azure cloud infrastructure.",
    tech: ["React", "Node.js", "MySQL", "SharePoint", "Azure", "Docker"],
    link: "#",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
  },
  {
    id: 3,
    number: "03",
    title: "Mobile Banking UI",
    subtitle: "Fintech App Design System",
    category: "UI/UX",
    description:
      "Comprehensive UI/UX design for a mobile banking application — covering 60+ screens, a full design system, micro-interactions, and accessibility-compliant components in Figma.",
    tech: ["Figma", "Adobe XD", "Prototyping", "Design System", "Illustrator"],
    link: "#",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
  },
];

export const OTHER_PROJECTS = [
  {
    id: 4,
    number: "04",
    title: "E-Commerce Platform",
    subtitle: "Full Stack WooCommerce Build",
    category: "WordPress",
    tags: ["WordPress", "Full Stack"],
    description:
      "High-performance e-commerce solution with custom WooCommerce extensions, payment gateway integrations, and a responsive storefront built for conversion.",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL", "JavaScript", "Figma"],
    link: "#",
    year: "2020",
    image:
      "https://images.unsplash.com/photo-1757301714935-c8127a21abc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: 5,
    number: "05",
    title: "Real Estate Portal",
    subtitle: "Property Listings & Search",
    category: "Frontend",
    tags: ["Frontend", "UI/UX"],
    description:
      "Feature-rich real estate platform with advanced property search, interactive maps, virtual tour integrations, and a clean design system built in React.",
    tech: ["React", "TypeScript", "Node.js", "MongoDB", "Figma", "Tailwind CSS"],
    link: "#",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1720962158813-29b66b8e23e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: 6,
    number: "06",
    title: "HR Management System",
    subtitle: "Low-Code Enterprise App",
    category: "Mendix",
    tags: ["Full Stack", "Gov"],
    description:
      "End-to-end HR platform built on Mendix covering employee onboarding, leave management, appraisals, and payroll for a mid-sized organization in UAE.",
    tech: ["Mendix", "JavaScript", "REST API", "PostgreSQL", "Figma"],
    link: "#",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
  {
    id: 7,
    number: "07",
    title: "Restaurant Web App",
    subtitle: "Online Ordering & Reservations",
    category: "Frontend",
    tags: ["Frontend", "WordPress"],
    description:
      "Bespoke restaurant web experience with real-time table reservations, online ordering, menu management, and an admin dashboard — delivered on a tight 3-week timeline.",
    tech: ["React", "Node.js", "MySQL", "Figma", "Stripe"],
    link: "#",
    year: "2021",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
  },
];


export const EDUCATION = [
  {
    period: "2009",
    title: "Bachelor of Computer Applications",
    institution: "Rosary College, Goa University",
    location: "Goa, India",
    result: "Distinction",
    type: "education",
    color: "#a2e773",
  },
  {
    period: "2010 — 2013",
    title: "Certificates: Linux, Web Design, Visual Basic",
    institution: "Manipal Institute of Computer Education",
    location: "Goa, India",
    result: "First Class",
    type: "cert",
    color: "#7dd3fc",
  },
];

export const AWARDS = [
  {
    year: "2026",
    title: "Key and Vital Performer",
    org: "Dubai Municipality",
    iconName: "Crown",
    desc: "Recognized as a key and vital contributor driving critical digital transformation initiatives within Dubai Municipality — one of the UAE's most prestigious government bodies.",
    color: "#a2e773",
  },
  {
    year: "2024",
    title: "Excellence in Digital Innovation",
    org: "Dubai Municipality",
    iconName: "Zap",
    desc: "Awarded for spearheading a landmark citizen-facing digital services platform that improved engagement metrics by over 40% and set a new standard for government UX.",
    color: "#c4b5fd",
  },
  {
    year: "2022",
    title: "Top Technical Contributor",
    org: "Dubai Municipality",
    iconName: "Target",
    desc: "Honored for consistently delivering enterprise-grade solutions ahead of schedule, mentoring junior developers, and establishing coding standards adopted across the department.",
    color: "#7dd3fc",
  },
  {
    year: "2019",
    title: "Employee of the Month",
    org: "Schneider Electric — HCL",
    iconName: "Star",
    desc: "Awarded for exceptional dedication, technical excellence, and outstanding contributions to the team's success during a critical product sprint at Schneider Electric Bangalore.",
    color: "#fda4af",
  },
  {
    year: "2018",
    title: "Best Frontend Lead",
    org: "HCL Technologies",
    iconName: "Trophy",
    desc: "Recognized internally at HCL for leading a frontend team that delivered a high-performance Vue.js platform with zero critical production defects across a 6-month release cycle.",
    color: "#fb923c",
  },
  {
    year: "2017",
    title: "Client Choice Award",
    org: "Creative Capsule Infotech",
    iconName: "Medal",
    desc: "Voted by external clients as the most impactful team member for consistently translating complex briefs into polished, scalable web experiences — on time and on budget.",
    color: "#e3c07e",
  },
  {
    year: "2016",
    title: "Outstanding Employee",
    org: "Creative Capsule Infotech",
    iconName: "Award",
    desc: "Honored for exceptional performance, innovation, and commitment to delivering high-quality software solutions across 15+ client projects in a single calendar year.",
    color: "#6ee7b7",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Hilario leads with both technical insight and genuine support for his team. When faced with high-pressure situations, Hilario remained composed and provided the clear direction necessary to keep the team aligned and focused.",
    name: "Shubham Mathur",
    title: "Senior Android Engineer",
    company: "Nagarro",
    initial: "S",
  },
  {
    quote:
      "Hilario is an asset to any team. Picking up new technologies and mastering them quickly is what he is excellent at. His ability to adapt to new environments and deliver outstanding results is truly commendable.",
    name: "Ashwin Kumar",
    title: "Director of User Experience",
    company: "Creative Capsule",
    initial: "A",
  },
];

export const ABOUT_SECTIONS = [
  {
    id: "about",
    label: "About",
    caption: "Here's a quick intro about me and what I love to do",
    subsections: [
      {
        title: "My Programming Origins",
        content:
          "It started over 15 years ago with a simple curiosity: how do websites actually work? That question turned into a full-blown obsession. Armed with nothing but a text editor and a stubborn drive to figure things out, I taught myself HTML, CSS, and JavaScript the hard way — one broken layout at a time. Those early nights of trial-and-error debugging shaped the problem-solver I am today.",
        image:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&h=460&fit=crop&auto=format",
        alt: "Early programming setup with code on screen",
      },
      {
        title: "Finding My Way to Web",
        content:
          "What began as personal experimentation grew into a career. I moved through roles as a frontend developer, backend engineer, and eventually technical lead — building enterprise platforms, e-commerce systems, and UI/UX-driven products for clients across India, USA and the UAE. Every project taught me something: how to balance performance with aesthetics, how to lead teams without losing the craft, and how to make the web feel human.",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=460&fit=crop&auto=format",
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
        content:
          "Since joining Dubai Municipality in 2019, I've led the development of mission-critical government platforms serving millions of residents. My work spans frontend architecture, full stack feature development, and technical oversight — from defining coding standards to mentoring junior engineers. Technologies in play: React, Mendix, SharePoint, Node.js, and a suite of enterprise integrations.",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&h=460&fit=crop&auto=format",
        alt: "Dubai skyline representing Dubai Municipality work",
      },
      {
        title: "Bangalore & Goa — The Formative Years",
        content:
          "Before Dubai, I honed my skills across agencies and product companies in Goa and Bangalore. I worked on everything from WordPress-based marketing sites to custom MERN stack applications, picking up skills in PHP, MySQL, Figma, and CI/CD pipelines. These years were high-velocity — short deadlines, diverse clients, and a lot of learning by doing.",
        image:
          "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=700&h=460&fit=crop&auto=format",
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
        content:
          "Code is only half the story. The rest of me is outdoors, on a field, or lost in a good playlist. I'm happiest exploring new countries and trekking through places I've never been — there's a version of problem-solving out there too, just with better views. Back home, it's football and cricket that keep me competitive, and sports in general are a constant thread through my week, whether I'm playing or watching. When I do slow down, it's usually with a controller in hand — I'm an unapologetic PC gamer and anime fan, always chasing the next great story arc, on-screen or in-game. And there's rarely a moment without music playing in the background; it's the one constant across every version of my day, from deep-focus coding sessions to long drives.",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=460&fit=crop&auto=format",
        alt: "Scenic landscape representing life beyond the screen",
      },
      {
        title: "These Days",
        content:
          "Right now I'm based in Dubai, leading technical initiatives at Dubai Municipality while sharpening my expertise in AI-assisted development, modern React patterns, and scalable cloud architecture. I'm always open to interesting projects, collaborations, and conversations about the future of the web. If you want to build something great together, I'd love to hear from you.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&h=460&fit=crop&auto=format",
        alt: "Modern workspace representing current day work",
      },
    ],
  },
];