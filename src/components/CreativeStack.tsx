"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TOOLS = [
  "Flow",
  "Gemini",
  "Seedance",
  "Higgsfield",
  "OpenArt",
  "Gamma",
  "Claude AI",
  "VS Code",
  "Codex",
  "Antigravity",
];

export default function CreativeStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  // Double the list for infinite seamless wrapping
  const doubleTools = [...TOOLS, ...TOOLS];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050505] py-24 px-6 md:px-12 border-b border-white/5 overflow-hidden"
    >
      {/* Inline styles for custom self-contained marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto mb-12 text-center space-y-4">
        <span className="font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
          CREATIVE STACK
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-black text-[#FFFFFF] uppercase tracking-tight">
          TOOLS I WORK WITH
        </h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 border-y border-white/5 bg-white/[0.01]">
        {/* Soft fading overlays on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center space-x-12 md:space-x-24">
          {doubleTools.map((tool, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 text-white/55 hover:text-white transition-colors duration-300 font-serif text-2xl md:text-4xl font-extrabold uppercase select-none tracking-widest"
            >
              <span>{tool}</span>
              <span className="text-[#c8102e] font-sans text-sm md:text-lg ml-6 select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
