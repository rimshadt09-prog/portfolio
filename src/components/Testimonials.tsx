"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Testimonials() {
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
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative bg-[#050505] py-32 px-6 md:px-12 border-b border-white/5 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <span className="font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
          TESTIMONIALS
        </span>
        
        <h3 className="font-serif text-2xl md:text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
          WORKING WITH BRANDS SOON.
        </h3>
        
        <p className="font-sans text-xs md:text-sm text-[#a3a3a3] max-w-md mx-auto leading-relaxed">
          Client collaborations, case studies, and success stories will appear here as I continue building meaningful projects.
        </p>
      </div>
    </section>
  );
}
