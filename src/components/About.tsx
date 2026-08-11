"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = textRef.current?.querySelectorAll(".about-reveal");

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
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#050505] py-32 px-6 md:px-12 lg:px-24 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Giant Bold Editorial Headline */}
        <div className="lg:col-span-5 space-y-4">
          <span className="font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
            ABOUT ME
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-[#FFFFFF] uppercase">
            I TURN <br />
            IDEAS INTO <br />
            <span className="font-serif italic text-white/90">VISUAL</span> <br />
            EXPERIENCES.
          </h2>
        </div>

        {/* Right Column: Editorial Copy & Core Focus */}
        <div ref={textRef} className="lg:col-span-7 space-y-12 lg:pl-6 text-left">
          
          {/* Main Biography Copy */}
          <div className="space-y-6">
            <p className="about-reveal font-sans text-base md:text-lg text-[#FFFFFF] font-semibold leading-relaxed">
              I'm Rimshad, an AI Content Creator & Creative Strategist focused on combining artificial intelligence, visual storytelling, and marketing to create content that captures attention and builds brands.
            </p>
            
            <p className="about-reveal font-sans text-sm md:text-base text-[#a3a3a3] leading-relaxed text-justify">
              With a background in Computer Applications, I bring together technical thinking and creative problem-solving to develop cinematic AI visuals, video content, social media creatives, digital experiences, and marketing concepts.
            </p>

            <p className="about-reveal font-sans text-sm md:text-base text-[#a3a3a3] leading-relaxed text-justify">
              I work across AI Content Creation, AI Video Creation, Creative Direction, Social Media Marketing, Content Marketing, and Vibe Coding — using modern AI tools and creative workflows to turn ideas into polished, engaging experiences.
            </p>
          </div>

          {/* Core Workflow Approach Bar */}
          <div className="about-reveal border-y border-white/5 py-6 my-2">
            <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#c8102e] uppercase mb-4">
              MY APPROACH
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-serif italic text-sm md:text-base text-[#FFFFFF]/90">
              <span>Understand the idea</span>
              <span className="text-[#c8102e]/60">→</span>
              <span>Build the concept</span>
              <span className="text-[#c8102e]/60">→</span>
              <span>Create the visuals</span>
              <span className="text-[#c8102e]/60">→</span>
              <span>Refine the experience</span>
              <span className="text-[#c8102e]/60">→</span>
              <span>Deliver impact</span>
            </div>
          </div>

          {/* Drive & Passion Section */}
          <div className="about-reveal space-y-4">
            <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#a3a3a3] uppercase">
              WHAT DRIVES ME
            </h4>
            <h3 className="font-serif text-2xl font-black text-[#FFFFFF] uppercase tracking-tight">
              Creativity. Technology. Impact.
            </h3>
            <p className="font-sans text-xs md:text-sm text-[#a3a3a3] leading-relaxed">
              I believe the best digital experiences happen when creative thinking and technology work together. My goal is to help brands, businesses, entrepreneurs, and personal brands communicate their ideas through content that people remember.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
