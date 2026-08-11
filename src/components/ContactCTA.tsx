"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 md:px-12 border-b border-white/5 overflow-hidden py-24 bg-[#050505]"
    >
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#c8102e]/3 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <span className="font-sans text-xs tracking-[0.35em] text-[#c8102e] font-bold uppercase block">
          LET'S CREATE SOMETHING
        </span>

        <h2 className="cta-heading font-serif text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-[#FFFFFF] uppercase">
          HAVE AN IDEA? <br />
          <span className="font-serif italic text-white/90">LET'S TURN IT</span> <br />
          INTO SOMETHING <br />
          PEOPLE REMEMBER.
        </h2>

        <p className="cta-paragraph font-sans text-sm md:text-base text-[#a3a3a3] tracking-wide max-w-xl mx-auto leading-relaxed">
          Whether you need AI content, cinematic video, social media creative, branding, or a digital experience, let's create something meaningful.
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <a
            href="https://wa.me/919249032955?text=Hi%20Rimshad,%20I%27d%20like%20to%20discuss%20a%20creative%20project%20with%20you!"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn font-sans text-[10px] md:text-xs tracking-[0.2em] font-bold text-[#050505] bg-[#FFFFFF] hover:bg-[#c8102e] hover:text-[#FFFFFF] px-8 py-4 rounded-full transition-all duration-300 uppercase shadow-lg shadow-white/5"
          >
            START A PROJECT ↗
          </a>
        </div>
      </div>
    </section>
  );
}
