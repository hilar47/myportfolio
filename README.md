# Hilario Goes — Portfolio (Next.js 15 Refactor)

A full refactor of the original Vite + React portfolio into a production-ready **Next.js 15** project with **Tailwind CSS v4**, proper routing, and a clean CSS architecture.

## Tech Stack

- **Next.js 15** (App Router) — file-system routing, server components, image optimisation
- **React 19** — latest React with `"use client"` where interactivity is needed
- **TypeScript** — strict mode throughout
- **Tailwind CSS v4** — utility-first with `@tailwindcss/postcss`
- **Motion (Framer Motion v12)** — animations and transitions
- **Lucide React** — icons

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home / Hero page
│   ├── about/page.tsx
│   ├── skills/page.tsx
│   ├── projects/page.tsx
│   ├── experience/page.tsx
│   ├── awards/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── home/               # Home-page-specific components
│   │   ├── SolarSystemCanvas.tsx
│   │   ├── PlexusCanvas.tsx
│   │   └── HeroTypewriter.tsx
│   ├── layout/
│   │   └── InnerNav.tsx    # Shared nav for inner pages
│   └── ui/
│       ├── CustomCursor.tsx
│       └── GrainOverlay.tsx
│
├── lib/
│   ├── constants.ts        # All data (projects, awards, skills, etc.)
│   └── utils.ts            # cn() utility
│
├── styles/
│   ├── globals.css         # Tailwind imports + base layer + fonts
│   ├── custom.css          # Page-level custom styles
│   └── components.css      # Reusable component styles
│
└── public/
    ├── fonts/paris-font/   # Hello Paris Sans font files
    └── files/              # Place HilarioGoes-Resume.pdf here
```

## CSS Architecture

| File | Purpose |
|------|---------|
| `styles/globals.css` | Tailwind v4 entry, `@font-face`, CSS custom properties, `@layer base` |
| `styles/custom.css` | Page-level styles (hero, about, contact, etc.) that extend Tailwind |
| `styles/components.css` | Reusable component patterns (cursor, nav, cards, tags, etc.) |

Zero inline styles — everything is in Tailwind classes or the two CSS files.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Adding the Resume PDF

Place `HilarioGoes-Resume.pdf` in `public/files/` so the Download CV button works.

## Deployment

Deploy to Vercel by linking the repository. Set `hilariogoes.com` as the custom domain.

```bash
npm run build   # local production build check
```
