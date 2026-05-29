"use client";
import { useEffect, useState } from "react";

const phrases = [
  "Sr. Frontend Developer.",
  "WordPress Developer",
  "Backend Developer.",
  "Mendix Developer.",
  "Full Stack Developer.",
  "UI/UX Designer.",
];

const TYPE_SPEED   = 60;   // ms per character typed
const DELETE_SPEED = 35;   // ms per character deleted
const PAUSE_AFTER  = 1800; // ms to hold the full phrase
const PAUSE_BEFORE = 400;  // ms before starting to type next

export default function TypeWriter() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  // Typing logic
  useEffect(() => {
    const current = phrases[phraseIndex];

    if (!isDeleting && displayed === current) {
      // Finished typing — pause then start deleting
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayed === "") {
      // Finished deleting — move to next phrase
      const t = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, PAUSE_BEFORE);
      return () => clearTimeout(t);
    }

    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    const t = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <div className="flex items-center gap-0 font-mono text-xl md:text-2xl">
      {/* Opening tag */}
      <span className="text-[#cc0000] font-bold select-none hide-mob">&lt;code&gt;</span>

      {/* Typed text */}
      <span className="text-white mx-2 tracking-wide">
        {displayed}
        {/* Cursor */}
        <span
          className={`
            inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px]
            transition-opacity duration-100
            ${showCursor ? "opacity-100" : "opacity-0"}
          `}
        />
      </span>

      {/* Closing tag */}
      <span className="text-[#cc0000] font-bold select-none hide-mob">&lt;/code&gt;</span>
    </div>
  );
}
