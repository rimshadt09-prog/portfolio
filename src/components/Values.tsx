"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Values() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = containerRef.current?.querySelectorAll(".value-reveal");

    if (revealElements) {
      gsap.fromTo(
        revealElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050505] py-32 px-6 md:px-12 lg:px-24 border-b border-white/5 overflow-hidden"
    >
      {/* Background ambient red glow (very soft) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-[#c8102e]/3 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-12">
        {/* Label */}
        <span className="value-reveal font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
          PHILOSOPHY
        </span>

        {/* Large Headline */}
        <h2 className="value-reveal font-serif text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-[#FFFFFF] uppercase">
          CREATIVITY <span className="text-white/40">×</span> TECHNOLOGY <span className="text-white/40">×</span> MARKETING
        </h2>

        {/* Supporting Core Stems */}
        <div className="value-reveal space-y-4 max-w-xl mx-auto py-4">
          <p className="font-sans text-base md:text-lg text-white/80 leading-relaxed font-semibold">
            I don't see AI as just a generation tool.
          </p>
          <p className="font-serif italic text-lg md:text-2xl text-[#c8102e]/90 font-bold">
            "I use it as a creative system."
          </p>
        </div>

        {/* Core Pillars Grid / Formula */}
        <div className="value-reveal grid grid-cols-1 sm:grid-cols-4 gap-4 items-center max-w-4xl mx-auto py-8 px-6 border border-white/5 bg-white/[0.01] rounded-2xl">
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-widest block">PILLAR 01</span>
            <span className="font-serif text-lg font-bold text-white uppercase">Creative Thinking</span>
          </div>
          
          <div className="text-white/20 text-xl font-bold select-none hidden sm:block">+</div>
          
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-widest block">PILLAR 02</span>
            <span className="font-serif text-lg font-bold text-white uppercase">AI Technology</span>
          </div>
          
          <div className="text-white/20 text-xl font-bold select-none hidden sm:block">+</div>
          
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-widest block">PILLAR 03</span>
            <span className="font-serif text-lg font-bold text-white uppercase">Marketing Strategy</span>
          </div>
          
          <div className="text-white/20 text-xl font-bold select-none hidden sm:block">+</div>
          
          <div className="space-y-1 sm:col-span-1">
            <span className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-widest block">PILLAR 04</span>
            <span className="font-serif text-lg font-bold text-white uppercase">Visual Storytelling</span>
          </div>
        </div>

        {/* Outro statement */}
        <div className="value-reveal pt-4">
          <p className="font-sans text-xs md:text-sm text-[#a3a3a3] tracking-[0.1em] uppercase">
            Turning simple ideas into powerful digital experiences.
          </p>
        </div>

      </div>
    </section>
  );
}
