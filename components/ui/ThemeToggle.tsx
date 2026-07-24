"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Light/dark theme toggle. Reads/writes a `data-theme="light"`
 * attribute on <html> (absence of the attribute = the default dark
 * theme) and persists the choice in localStorage under "theme".
 *
 * A small blocking script in app/layout.tsx applies the saved theme
 * to <html> before first paint, so there's no flash of the wrong
 * theme on load — this component just mirrors that state so its own
 * icon is correct, and toggles it on click.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.getAttribute("data-theme") === "light");
  }, []);

  const toggle = () => {
    const next = !isLight;
    if (next) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* localStorage unavailable (private mode etc.) — theme just
         won't persist across reloads, not worth failing over. */
    }
    /* Canvas-drawn content (SolarSystemCanvas, PlexusCanvas, the
       Skills tech cloud) can't respond to CSS at all — they need to
       know the theme changed so they can switch their own draw
       colors on the next animation frame instead of waiting for a
       reload. */
    window.dispatchEvent(new CustomEvent("themechange", { detail: { light: next } }));
    setIsLight(next);
  };

  return (
    <button
      onClick={toggle}
      className={`theme-toggle-btn ${className}`}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
    >
      {isLight ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
