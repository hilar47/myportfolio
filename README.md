# Hilario Goes Portfolio — Next.js 15

My portfolio website, built with
**Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 📁 Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx          ← Root layout (fonts, metadata)
│   ├── globals.css         ← Tailwind base + CSS variables
│   ├── page.tsx            ← Home page
│   ├── about/
│   │   └── page.tsx        ← About page with skill bars
│   ├── awards/
│   │   └── page.tsx        ← All my awards and recoginitions
│   ├── work/
│   │   └── page.tsx        ← Portfolio / work page
│   ├── contact/
│   │   └── page.tsx        ← Contact me
│   └── education/
│       └── page.tsx        ← My Qualifications and work exprience
├── components/
│   └── AwardsSlider.tsx         ← Component for awards 
│   └── components.css         ← Component custom styling
│   └── ContactForm.tsx         ← Component for contact form 
│   └── CursorTrail.tsx         ← Component for cutsor animation (disabled for now) 
│   └── EducationTimeline.tsx         ← Component for education 
│   └── ExperienceTimeline.tsx         ← Component for experience
│   └── ProjectSlide.tsx         ← Component for projects done
│   └── Sidebar.tsx         ← Sidebar menu component
│   └── SkillsMarquee.tsx         ← Component for my skills & technologies
│   └── SocialBar.tsx         ← Component for social links
│   └── StatsCounter.tsx         ← Component for my stats
│   └── TestimonialsSlider.tsx         ← Component for testimonials
│   └── TimelineColumn.tsx         ← Component for timeline
│   └── TypeWriter.tsx         ← Component for typing animation
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---


## 🎨 Design Tokens

| Token          | Value      |
|----------------|------------|
| Background     | `#111111`  |
| Accent Red     | `#cc0000`  |
| Bright Red     | `#ff1a1a`  |
| Text           | `#ffffff`  |
| Muted text     | `#9ca3af`  |
| Card surface   | `#1a1a1a`  |
| Heading font   | Bebas Neue |
| Body font      | Barlow     |

---


## 📝 Notes

- The `"use client"` directive is required on pages that use `useState`
  or browser APIs.
- Fonts load from Google Fonts via `next/font` — no extra CSS needed.
- The sidebar uses `usePathname()` to highlight the active route.
