"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Linkedin, Github, Instagram, Facebook } from "lucide-react";
// import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SolarSystemCanvas from "@/components/home/SolarSystemCanvas";
import PlexusCanvas from "@/components/home/PlexusCanvas";
import HeroTypewriter from "@/components/home/HeroTypewriter";
import { NAV_ITEMS, CITY_STOPS, STATS, SOCIALS } from "@/lib/constants";

const PAGE_ROUTES: Record<string, string> = {
  Work: "/projects",
  About: "/about",
  Skills: "/skills",
  Experience: "/experience",
  Awards: "/awards",
  Contact: "/contact",
};

function SocialIcon({ kind, text }: { kind: string; text?: string }) {
  if (kind === "linkedin") return <Linkedin size={20} />;
  if (kind === "github") return <Github size={20} />;
  if (kind === "instagram") return <Instagram size={20} />;
  if (kind === "facebook") return <Facebook size={20} />;
  return (
    <span className="font-body text-[13px] font-bold">{text}</span>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden home-root-bg">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          // background:
          //   "radial-gradient(ellipse 80% 80% at 50% -20%, #7877c64d, #fff0), rgb(10,10,10, 0.8)", zIndex: 1,
        }}
      />
      <div className="home-bg-gradient absolute inset-0 z-0 pointer-events-none" />

      <SolarSystemCanvas />
      <PlexusCanvas />

      {/* Vignette overlays */}
      <div className="vignette-sides absolute inset-0 z-[3] pointer-events-none" />
      <div className="vignette-bottom absolute inset-0 z-[3] pointer-events-none" />

      <GrainOverlay />
      {/* <CustomCursor /> */}

      {/* ── TOP NAV ── */}
      <nav className="nav-top">
        <div
          className={`flex items-center gap-6 ${menuOpen ? "invisible" : "flex"}`}
        >
          <a
            href="/files/HilarioGoes-Resume.pdf"
            download
            className="btn-download-cv"
          >
            Download CV
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1v6M2 6l3 3 3-3"
                stroke="#0a0a0a"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <span className="nav-divider">|</span>
          <a href="mailto:hilariogoes47@gmail.com" className="nav-contact-link">
            hilariogoes47@gmail.com
          </a>
          <span className="nav-divider">|</span>
          <a href="tel:+971556329267" className="nav-contact-link">
            +971 556 329 267
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="nav-menu-label">{menuOpen ? "Close" : "Menu"}</span>
            {!menuOpen && (
              <div className="flex flex-col gap-[5px]">
                {[false, true, false].map((short, i) => (
                  <span
                    key={i}
                    className="nav-hamburger-bar"
                    style={{ width: short ? "0.75rem" : "1.25rem" }}
                  />
                ))}
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* ── CITY TIMELINE ── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="absolute z-30 flex items-center"
        style={{ top: "6.2rem", left: "2rem" }}
      >
        {CITY_STOPS.map((stop, i) => (
          <div key={stop.city} className="flex items-center">
            <div className="flex flex-col items-center gap-1 city-stop">
              <div
                className="rounded-full"
                style={{
                  width: stop.active ? 8 : 5,
                  height: stop.active ? 8 : 5,
                  background: stop.active ? "var(--primary)" : "rgba(var(--fg-rgb),0.6)",
                  boxShadow: stop.active ? "0 0 9px var(--primary)" : "none",
                }}
              />
              <span
                className="font-display text-[16px] uppercase leading-none"
                style={{
                  fontWeight: stop.active ? 700 : 500,
                  letterSpacing: "0.22em",
                  color: stop.active ? "var(--primary)" : "rgba(var(--fg-rgb),0.8)",
                  textUnderlineOffset: "3px",
                }}
              >
                {stop.city}
              </span>
              <span
                className="font-body text-[14px]"
                style={{
                  letterSpacing: "0.08em",
                  color: stop.active
                    ? "var(--primary)"
                    : "rgba(var(--fg-rgb),0.8)",
                }}
              >
                {stop.years}
              </span>
            </div>
            {i < CITY_STOPS.length - 1 && (
              <div className="city-connector" />
            )}
          </div>
        ))}
      </motion.div>

      {/* ── STATS (right center) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="absolute z-20 flex flex-col gap-7 text-right stats-container"
      >
        {STATS.map(({ number, label }) => (
          <div key={number}>
            <div className="stat-number">{number}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── HERO TEXT (bottom left) ── */}
      <div className="absolute z-20 left-0 bottom-0 px-8 pb-8 hilario-name">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="hero-greeting"
        >
          Hi there, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="hero-name"
        >
          Hilario Goes
        </motion.h1>

        <HeroTypewriter />
      </div>

      {/* ── SOCIAL LINKS (bottom right) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute z-20 bottom-0 right-0 flex items-center gap-5 px-8 pb-9 social-links-container"
      >
        {SOCIALS.map(({ href, label, hoverColor, kind, ...rest }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className="social-link"
            style={{ "--hover-color": hoverColor } as React.CSSProperties}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = hoverColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(var(--fg-rgb),0.45)";
            }}
          >
            <SocialIcon
              kind={kind}
              text={"text" in rest ? (rest as { text: string }).text : undefined}
            />
          </a>
        ))}
      </motion.div>

      {/* ── MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="menu-overlay absolute inset-0 z-30 flex flex-col items-start justify-center pl-14 gap-1"
            style={{ background: "rgba(8,8,8,0.97)" }}
            onClick={() => setMenuOpen(false)}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
              >
                <Link
                  href={PAGE_ROUTES[item]}
                  onClick={() => setMenuOpen(false)}
                  className="font-display block leading-none uppercase"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.fontStyle = "italic";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.fontStyle = "normal";
                  }}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
