"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Layers } from "lucide-react";

export default function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heading = containerRef.current?.querySelector(".cta-heading");
    const paragraphs = containerRef.current?.querySelector(".cta-paragraph");
    const buttons = containerRef.current?.querySelectorAll(".cta-btn");

    if (heading && paragraphs && buttons) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        heading,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      )
        .fromTo(
          paragraphs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .fromTo(
          buttons,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );
    }
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 border-b border-[#222220] overflow-hidden"
    >
      {/* Immersive Dark Textured Gradient Background */}
      <div className="absolute inset-0 z-0 bg-radial-at-c from-[#1e1d1a]/20 via-[#0a0a0a]/90 to-[#080808] pointer-events-none" />

      {/* Abstract structural grid overlay */}
      <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-5">
        <div className="border-r border-dashed border-[#F4F1EA] h-full" />
        <div className="border-r border-dashed border-[#F4F1EA] h-full" />
        <div className="border-r border-dashed border-[#F4F1EA] h-full" />
        <div className="border-r border-dashed border-[#F4F1EA] h-full" />
        <div className="border-r border-dashed border-[#F4F1EA] h-full" />
        <div className="h-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <span className="font-sans text-xs tracking-[0.35em] text-[#C5A880] uppercase block">
          Collab Dialogue
        </span>

        <h2 className="cta-heading font-serif text-5xl md:text-8xl tracking-tight leading-[1.05] text-[#F4F1EA]">
          Let's Create Your <br />
          <span className="font-serif italic text-[#C5A880]">Dream Space</span>.
        </h2>

        <p className="cta-paragraph font-sans text-sm md:text-base text-[#8E8A82] tracking-wide max-w-xl mx-auto leading-relaxed">
          Embark on a spatial journey. Connect with our principal architect to explore structural layouts, tactile placements, and curated spatial logic.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
          <button
            onClick={(e) => handleScrollTo(e, "#contact")}
            data-cursor="open"
            className="cta-btn w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-[#080808] border border-[#C5A880] hover:bg-transparent hover:text-[#C5A880] transition-all duration-500 font-sans text-xs tracking-[0.3em] uppercase flex items-center justify-center space-x-3 cursor-pointer rounded"
          >
            <span>Book Consultation</span>
            <Calendar size={13} />
          </button>
          
          <button
            onClick={(e) => handleScrollTo(e, "#portfolio")}
            data-cursor="open"
            className="cta-btn w-full sm:w-auto px-8 py-4 bg-transparent text-[#F4F1EA] border border-[#222220] hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-500 font-sans text-xs tracking-[0.3em] uppercase flex items-center justify-center space-x-3 cursor-pointer rounded"
          >
            <span>View Portfolio</span>
            <Layers size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
