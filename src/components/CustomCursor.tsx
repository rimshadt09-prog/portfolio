"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center cursor offsets
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // 10px is half of default 20px size
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const projectCard = target.closest('[data-cursor="view"]');
      const actionButton = target.closest('[data-cursor="open"]');
      const heroSection = target.closest('[data-cursor="scroll"]');
      const standardLink = target.closest("a, button, [role='button']");

      if (projectCard) {
        setCursorText("VIEW");
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: "#C5A880",
          borderColor: "#C5A880",
          color: "#080808",
          mixBlendMode: "normal",
          duration: 0.25
        });
      } else if (actionButton) {
        setCursorText("OPEN");
        gsap.to(cursor, {
          width: 80,
          height: 80,
          backgroundColor: "#C5A880",
          borderColor: "#C5A880",
          color: "#080808",
          mixBlendMode: "normal",
          duration: 0.25
        });
      } else if (heroSection) {
        setCursorText("SCROLL");
        gsap.to(cursor, {
          width: 90,
          height: 90,
          backgroundColor: "transparent",
          borderColor: "#C5A880",
          color: "#C5A880",
          mixBlendMode: "normal",
          duration: 0.25
        });
      } else if (standardLink) {
        gsap.to(cursor, {
          scale: 1.8,
          backgroundColor: "rgba(197, 168, 128, 0.15)",
          borderColor: "#C5A880",
          duration: 0.25
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const standardLink = target.closest("a, button, [role='button'], [data-cursor]");
      
      if (standardLink) {
        setCursorText("");
        gsap.to(cursor, {
          scale: 1,
          width: 20,
          height: 20,
          backgroundColor: "transparent",
          borderColor: "#C5A880",
          color: "transparent",
          mixBlendMode: "difference",
          duration: 0.25
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 border border-[#C5A880] rounded-full pointer-events-none z-50 mix-blend-difference hidden md:flex items-center justify-center text-[10px] font-sans font-bold tracking-widest text-transparent transition-opacity duration-300"
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      <span className="uppercase">{cursorText}</span>
    </div>
  );
}
