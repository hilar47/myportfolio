"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { NAV_ITEMS, type NavItem } from "@/lib/constants";

const PAGE_ROUTES: Record<NavItem, string> = {
  Work: "/projects",
  About: "/about",
  Skills: "/skills",
  Experience: "/experience",
  Awards: "/awards",
  Contact: "/contact",
};

const ACTIVE_LABEL: Record<string, NavItem> = {
  "/projects": "Work",
  "/about": "About",
  "/skills": "Skills",
  "/experience": "Experience",
  "/awards": "Awards",
  "/contact": "Contact",
};

export default function InnerNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const activeItem = ACTIVE_LABEL[pathname] ?? null;

  const goTo = (path: string) => {
    setMobileMenuOpen(false);
    router.push(path);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-8 pt-7 pb-5"
      >
        {/* Left: back to home */}
        <button
          onClick={() => goTo("/")}
        >
          <span>←</span>
          <span>
            Home
          </span>
        </button>

        {/* Right: nav items (desktop) + hamburger toggle (mobile) */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 right-menu">
            {NAV_ITEMS.map((item) => {
              const active = item === activeItem;
              return (
                <button
                  key={item}
                  onClick={() => goTo(PAGE_ROUTES[item])}
                  style={{
                    color: active ? "#a2e773" : "",
                    borderBottom: active ? "1px solid #a2e773" : "",
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Same hamburger button markup as the home page nav-menu-btn */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inner-nav-menu-btn"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className="nav-menu-label"
              style={{ color: mobileMenuOpen ? "#a2e773" : undefined }}
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </span>
            {!mobileMenuOpen && (
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

      {/* Mobile menu overlay — identical markup/behaviour to the home page menu-overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="menu-overlay fixed inset-0 z-30 flex flex-col items-start justify-center pl-14 gap-1"
            style={{ background: "rgba(8,8,8,0.97)" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3 }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(PAGE_ROUTES[item]);
                  }}
                  className="font-display block leading-none uppercase"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    lineHeight: 1,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.fontStyle = "italic";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.fontStyle = "normal";
                  }}
                >
                  {item}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}