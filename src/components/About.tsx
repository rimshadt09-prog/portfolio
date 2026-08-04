"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const textElements = textRef.current?.querySelectorAll(".about-reveal");
    const image = imageWrapperRef.current?.querySelector("img");

    // Fade-in texts
    if (textElements) {
      gsap.fromTo(
        textElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Parallax scaling for the about image
    if (image) {
      gsap.fromTo(
        image,
        { scale: 1.15 },
        {
          scale: 1.0,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // Animated count-ups (Runs exactly once when entering viewport)
    const statNumbers = containerRef.current?.querySelectorAll(".stat-number");
    if (statNumbers) {
      statNumbers.forEach((stat) => {
        const val = parseInt(stat.getAttribute("data-val") || "0");
        const obj = { count: 0 };
        
        gsap.to(obj, {
          count: val,
          duration: 2.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 90%",
            toggleActions: "play none none none", // Trigger exactly once
          },
          onUpdate: () => {
            stat.textContent = Math.round(obj.count).toString();
          },
        });
      });
    }
  }, []);

  const stats = [
    { label: "Years Experience", val: 12, suffix: "+" },
    { label: "Bespoke Projects", val: 250, suffix: "+" },
    { label: "Client Satisfaction", val: 98, suffix: "%" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#080808] py-32 px-6 md:px-12 border-b border-[#222220]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Large vertical-oriented premium architectural image */}
        <div
          ref={imageWrapperRef}
          className="lg:col-span-5 relative aspect-[3/4] overflow-hidden border border-[#222220] bg-[#121212]"
        >
          <Image
            src="/assets/about/about_studio.jpg"
            alt="Maison D'Art Luxury Architectural Studio Interior"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Editorial Philosophy & Counters */}
        <div ref={textRef} className="lg:col-span-7 space-y-10 lg:pl-12">
          <div className="space-y-4">
            <span className="about-reveal font-sans text-xs tracking-[0.3em] text-[#C5A880] uppercase block">
              About Studio
            </span>
            <h2 className="about-reveal font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] text-[#F4F1EA]">
              Designing Experiences, <br />
              Not Just <span className="font-serif italic text-[#C5A880]">Spaces</span>.
            </h2>
          </div>

          <p className="about-reveal font-sans text-sm text-[#8E8A82] leading-relaxed max-w-xl text-justify">
            Founded on the pillars of sculptural geometry and light choreography, Maison D'Art is a leading global design collective. We design environments that speak of quiet refinement, tactile authenticity, and architectural permanence.
          </p>

          <p className="about-reveal font-serif italic text-lg text-[#F4F1EA]/90 leading-relaxed max-w-xl">
            "We strip away the excess to expose the emotional resonance of space, allowing raw travertine, black concrete, and light to orchestrate the room's narrative."
          </p>

          {/* Stats Counters Grid */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#222220]">
            {stats.map((stat, idx) => (
              <div key={idx} className="about-reveal space-y-2">
                <div className="font-serif text-3xl md:text-5xl text-[#C5A880] tracking-tight flex items-baseline">
                  {/* Dynamic counter value holder */}
                  <span
                    className="stat-number font-serif font-semibold"
                    data-val={stat.val}
                  >
                    0
                  </span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] text-[#8E8A82] uppercase leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
