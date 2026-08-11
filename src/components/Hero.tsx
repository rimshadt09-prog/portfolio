"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    // 1. Entrance animation on page load
    tl.fromTo(
      ".hero-label",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Line-by-line reveal for title
    tl.fromTo(
      ".hero-title-line",
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.0, stagger: 0.15, ease: "power4.out" },
      "-=0.6"
    );

    // Paragraph fade-up
    tl.fromTo(
      ".hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // Buttons reveal
    tl.fromTo(
      ".hero-btn",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

    // Availability badge reveal
    tl.fromTo(
      ".hero-availability",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // Image reveal (fade in + slide left/up)
    tl.fromTo(
      ".hero-image-wrapper",
      { opacity: 0, scale: 1.05, x: 20 },
      { opacity: 1, scale: 1, x: 0, duration: 1.4, ease: "power3.out" },
      "-=1.2"
    );

    // 2. Parallax scroll effect on the image
    if (imageRef.current && containerRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#portfolio");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] flex items-center pt-24 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-white/5"
    >
      {/* Editorial layout grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 py-12">
        
        {/* Left Side: Content Overlays */}
        <div ref={textContainerRef} className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:space-y-8">
          
          {/* Availability Status */}
          <div className="hero-availability flex items-center space-x-2 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8102e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8102e]"></span>
            </span>
            <span className="font-sans text-[8px] md:text-[9px] font-bold tracking-[0.25em] text-[#FFFFFF]/80 uppercase">
              AVAILABLE FOR FREELANCE PROJECTS
            </span>
          </div>

          <div className="space-y-4 w-full">
            {/* Small Label */}
            <span className="hero-label font-sans text-[10px] md:text-xs tracking-[0.35em] text-[#c8102e] font-bold uppercase block">
              AI CONTENT CREATOR / CREATIVE STRATEGIST
            </span>
            
            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-[#FFFFFF] uppercase">
              <span className="block overflow-hidden relative">
                <span className="hero-title-line inline-block">AI CONTENT</span>
              </span>
              <span className="block overflow-hidden relative">
                <span className="hero-title-line inline-block italic text-white/90">CREATOR &</span>
              </span>
              <span className="block overflow-hidden relative">
                <span className="hero-title-line inline-block">STRATEGIST</span>
              </span>
            </h1>
          </div>

          {/* Supporting Copy */}
          <p className="hero-desc font-sans text-sm md:text-base text-[#a3a3a3] leading-relaxed max-w-xl">
            I create cinematic AI-powered content, digital experiences, and marketing visuals that help brands stand out.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#portfolio"
              onClick={handleScrollToWork}
              className="hero-btn font-sans text-[10px] md:text-xs tracking-[0.2em] font-bold text-[#050505] bg-[#FFFFFF] hover:bg-[#c8102e] hover:text-[#FFFFFF] px-7 py-4 rounded-full transition-all duration-300 uppercase shadow-lg shadow-white/5"
            >
              VIEW MY WORK ↗
            </a>
            <a
              href="https://wa.me/919249032955?text=Hi%20Rimshad,%20I%27d%20like%20to%20discuss%20a%20creative%20project%20with%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn font-sans text-[10px] md:text-xs tracking-[0.2em] font-bold text-[#FFFFFF] hover:text-[#c8102e] border border-white/10 hover:border-[#c8102e]/30 px-7 py-4 rounded-full transition-all duration-300 uppercase"
            >
              LET'S WORK TOGETHER ↗
            </a>
          </div>
        </div>

        {/* Right Side: Major Portrait Visual */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="hero-image-wrapper relative w-full max-w-[400px] aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-[#0d0d0d] shadow-2xl shadow-black/80">
            <Image
              ref={imageRef}
              src="/assets/rimshad/rimshad_photo_black_bg.jpg"
              alt="Rimshad Professional Portrait"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover object-top scale-110"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
