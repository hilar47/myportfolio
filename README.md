# Hilario Goes Portfolio — Next.js 15

A pixel-perfect recreation of the dark red portfolio design, built with
**Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 📁 Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx          ← Root layout (fonts, metadata)
│   ├── globals.css         ← Tailwind base + CSS variables
│   ├── page.tsx            ← Home / Hero page
│   ├── about/
│   │   └── page.tsx        ← About page with skill bars
│   ├── work/
│   │   └── page.tsx        ← Portfolio / work page (add yourself)
│   ├── contact/
│   │   └── page.tsx        ← Contact form page
│   └── blog/
│       └── page.tsx        ← Blog page (add yourself)
├── components/
│   └── Sidebar.tsx         ← Fixed right-side icon navigation
├── public/
│   └── images/
│       └── profile.jpg     ← ⬅ PUT YOUR PHOTO HERE
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## 🚀 Step-by-Step Setup

### Step 1 — Create the Next.js project

```bash
npx create-next-app@latest portfolio \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
cd portfolio
```

### Step 2 — Install dependencies

```bash
npm install react-icons
```

### Step 3 — Replace generated files

Copy the source files from this guide into your project, replacing the
auto-generated ones. Specifically:

| This file                    | Replaces / Creates          |
|------------------------------|-----------------------------|
| `app/layout.tsx`             | Replace generated layout    |
| `app/globals.css`            | Replace generated styles    |
| `app/page.tsx`               | Replace generated home page |
| `app/about/page.tsx`         | Create new                  |
| `app/contact/page.tsx`       | Create new                  |
| `components/Sidebar.tsx`     | Create new                  |
| `tailwind.config.ts`         | Replace generated config    |

### Step 4 — Add your profile photo

Place your photo at:

```
public/images/profile.jpg
```

> The image works best as a **portrait** (aspect ratio ~3:4), on a dark
> background. Minimum 800×1000 px for sharp rendering.

### Step 5 — Run the development server

```bash
npm run dev
```

Open **http://localhost:3000** — you should see the hero page.

### Step 6 — Customise the content

Open `app/page.tsx` and update:

- Your name in the `<h1>` tag
- Your title/role in the `<h2>` tag
- The bio paragraph text
- The stats numbers (years, projects, clients)

### Step 7 — Build for production

```bash
npm run build
npm start
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

## 🔧 Deployment (Vercel — easiest)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Next.js — click **Deploy**
4. Your site is live in ~60 seconds 🎉

---

## 📝 Notes

- The `"use client"` directive is required on pages that use `useState`
  or browser APIs.
- Fonts load from Google Fonts via `next/font` — no extra CSS needed.
- The sidebar uses `usePathname()` to highlight the active route.
