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
    title: "Discovery",
    description: "Aligning client aesthetic intentions with spatial functionality. We evaluate raw site conditions, light availability, and curate initial mood boards.",
  },
  {
    num: "02",
    title: "Planning",
    description: "Choreographing flow. We formulate initial spatial floor plans and aperture layouts to optimize daylight exposure and circulation.",
  },
  {
    num: "03",
    title: "Design",
    description: "Developing detailed interior schematics. We draft custom millwork specifications, structural components, and select authentic stone/wood pallets.",
  },
  {
    num: "04",
    title: "Visualization",
    description: "Rendering photorealistic spatial models. We showcase seasonal light angles, shadow behaviors, and detailed textile overlays.",
  },
  {
    num: "05",
    title: "Execution",
    description: "Coordinating construction and procurement. We collaborate directly with master craftsmen, inspect stone slabs, and monitor detailing.",
  },
  {
    num: "06",
    title: "Final Delivery",
    description: "White-glove project handover. We stage custom art pieces, select collectable furniture layouts, and conduct complete architectural handovers.",
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
          x: isLeft ? -50 : 50,
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
            start: "top 80%",
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
      className="relative bg-[#080808] py-32 px-6 md:px-12 border-b border-[#222220] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Header */}
        <div className="space-y-4 mb-28 text-center max-w-xl mx-auto">
          <span className="font-sans text-xs tracking-[0.3em] text-[#C5A880] uppercase block">
            Methodology
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] text-[#F4F1EA]">
            Our Architectural <span className="font-serif italic text-[#C5A880]">Process</span>
          </h2>
        </div>

        {/* Timeline Path Line */}
        <div className="absolute left-4 md:left-1/2 top-[200px] bottom-0 w-[1px] bg-[#222220] -translate-x-1/2 z-0" />

        {/* Timeline Steps */}
        <div className="space-y-16 md:space-y-24 relative z-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.num}
                className={`timeline-item flex flex-col md:flex-row items-start justify-between relative w-full ${
                  isEven ? "timeline-left" : "timeline-right md:flex-row-reverse"
                }`}
              >
                {/* Visual node on timeline */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#C5A880] border-4 border-[#080808] rounded-full -translate-x-1/2 top-2 z-20 shadow-[0_0_8px_#C5A880]" />

                {/* Content Panel (Width fits half the screen) */}
                <div
                  className={`w-full md:w-[45vw] pl-10 md:pl-0 ${
                    isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <div className={`space-y-3`}>
                    <span className="font-mono text-sm text-[#C5A880] tracking-wider block">
                      {step.num}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F4F1EA] tracking-tight">
                      {step.title}
                    </h3>
                    <p className={`font-sans text-xs md:text-sm text-[#8E8A82] leading-relaxed max-w-md ${isEven ? "md:ml-auto" : ""}`}>
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
