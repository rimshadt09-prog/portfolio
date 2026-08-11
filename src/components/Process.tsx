"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Discover",
    description: "Understand the brand, audience, objective and story.",
  },
  {
    num: "02",
    title: "Concept",
    description: "Develop creative direction, visual language and content strategy.",
  },
  {
    num: "03",
    title: "Create",
    description: "Use AI and modern creative workflows to produce high-quality visuals and content.",
  },
  {
    num: "04",
    title: "Refine",
    description: "Edit, refine and optimize every detail for quality and consistency.",
  },
  {
    num: "05",
    title: "Deliver",
    description: "Deliver content designed to communicate, engage and create impact.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const steps = containerRef.current?.querySelectorAll(".timeline-item");
    if (!steps) return;

    steps.forEach((step) => {
      const isLeft = step.classList.contains("timeline-left");
      
      gsap.fromTo(
        step,
        {
          opacity: 0,
          x: isLeft ? -30 : 30,
          scale: 0.98
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-[#050505] py-32 px-6 md:px-12 border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Header */}
        <div className="space-y-4 mb-28 text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
            PROCESS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#FFFFFF] uppercase tracking-tight">
            FROM IDEA <span className="font-serif italic text-white/90">TO IMPACT</span>
          </h2>
        </div>

        {/* Timeline Path Line */}
        <div className="absolute left-4 md:left-1/2 top-[200px] bottom-0 w-[1px] bg-white/5 -translate-x-1/2 z-0" />

        {/* Timeline Items Stack */}
        <div className="space-y-16 md:space-y-24 relative z-10">
          {PROCESS_STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={step.num}
                className={`timeline-item flex flex-col md:flex-row items-start md:items-center relative w-full ${
                  isLeft ? "timeline-left md:flex-row" : "timeline-right md:flex-row-reverse"
                }`}
              >
                {/* Horizontal spacing panel / side balance */}
                <div className="hidden md:block w-1/2" />

                {/* Timeline Circle Bullet */}
                <div className="absolute left-4 md:left-1/2 w-3.5 h-3.5 bg-[#050505] border-2 border-[#c8102e] rounded-full -translate-x-1/2 z-20 shadow-[0_0_10px_#c8102e]" />

                {/* Content Panel Box */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-16 text-left">
                  <div className="bg-white/[0.01] border border-white/5 p-8 rounded-2xl space-y-4 hover:border-[#c8102e]/30 hover:bg-white/[0.02] transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl font-black text-[#c8102e]/80">
                        {step.num}
                      </span>
                      <span className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-widest">
                        PHASE
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#FFFFFF] uppercase tracking-wide">
                      {step.title}
                    </h3>

                    <p className="font-sans text-xs md:text-sm text-[#a3a3a3] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Spacer column to balance layout on desktop */}
                <div className="hidden md:block w-[45vw]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
