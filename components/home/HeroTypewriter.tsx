"use client";

import { useState, useEffect } from "react";
import { ROLES } from "@/lib/constants";

type Phase = "typing" | "pausing" | "erasing";

export default function HeroTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const role = ROLES[roleIndex];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < role.length) {
        t = setTimeout(() => setCharCount((c) => c + 1), 68);
      } else {
        t = setTimeout(() => setPhase("pausing"), 2000);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("erasing"), 400);
    } else if (phase === "erasing") {
      if (charCount > 0) {
        t = setTimeout(() => setCharCount((c) => c - 1), 38);
      } else {
        t = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % ROLES.length);
          setPhase("typing");
        }, 180);
      }
    }

    return () => clearTimeout(t);
  }, [phase, charCount, roleIndex]);

  const role = ROLES[roleIndex];
  const displayed = role.slice(0, charCount);

  return (
    <div className="flex items-baseline gap-2 mt-[11px] min-h-[2.2rem]">
      <span className="typewriter-role">
        {displayed}
        <span
          className={`typewriter-cursor ${blink ? "opacity-100" : "opacity-0"}`}
          style={{ fontWeight: 300 }}
        >
          |
        </span>
      </span>
    </div>
  );
}
