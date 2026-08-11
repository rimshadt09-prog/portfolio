"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Video, Compass, Share2, Megaphone, Code, ArrowUpRight } from "lucide-react";

interface ServiceCard {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_DATA: ServiceCard[] = [
  {
    id: "1",
    num: "01",
    title: "AI Content Creation",
    description: "AI-powered visuals and creative content designed for modern brands, entrepreneurs and digital campaigns.",
    icon: Sparkles,
  },
  {
    id: "2",
    num: "02",
    title: "AI Video Creation",
    description: "Cinematic AI videos, product films, commercials, reels and social media campaigns.",
    icon: Video,
  },
  {
    id: "3",
    num: "03",
    title: "Creative Direction",
    description: "Visual concepts, storytelling, mood, composition and creative direction for campaigns.",
    icon: Compass,
  },
  {
    id: "4",
    num: "04",
    title: "Social Media Marketing",
    description: "Creative strategies and content systems designed to build audience attention and online presence.",
    icon: Share2,
  },
  {
    id: "5",
    num: "05",
    title: "Content Marketing",
    description: "Content combining storytelling, creativity and marketing psychology to communicate ideas effectively.",
    icon: Megaphone,
  },
  {
    id: "6",
    num: "06",
    title: "Vibe Coding",
    description: "Building modern responsive websites and interactive digital experiences using AI-assisted development workflows.",
    icon: Code,
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = containerRef.current?.querySelectorAll(".service-glow-card");
    const header = containerRef.current?.querySelector(".services-header-box");

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
          },
        }
      );
    }

    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-[#050505] py-32 px-6 md:px-12 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="services-header-box flex flex-col lg:flex-row lg:items-end justify-between mb-24 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <span className="font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
              SERVICES
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#FFFFFF] uppercase">
              WHAT I <span className="font-serif italic text-white/90">DO</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-[#a3a3a3] max-w-sm leading-relaxed">
            Creative, technology, and marketing solutions powered by artificial intelligence.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="service-glow-card relative flex flex-col justify-between p-8 md:p-10 border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#c8102e]/30 hover:shadow-[0_0_40px_rgba(200,16,46,0.03)] group"
              >
                {/* Subtle Hover Soft Glow Element */}
                <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#c8102e]/5 blur-2xl group-hover:w-48 group-hover:h-48 transition-all duration-500 ease-out" />
                
                <div className="relative z-10 space-y-6">
                  {/* Top Meta Number */}
                  <div className="flex justify-between items-center w-full">
                    <span className="font-mono text-xs text-[#a3a3a3]/50 font-bold">
                      {service.num}
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-white/5 text-[#a3a3a3] group-hover:text-[#c8102e] group-hover:border-[#c8102e]/30 group-hover:bg-[#c8102e]/5 transition-all duration-500">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-black text-[#FFFFFF] uppercase tracking-tight group-hover:text-[#c8102e] transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-[#a3a3a3] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow Link Button */}
                <div className="relative z-10 pt-8 flex justify-end">
                  <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-[#a3a3a3] group-hover:text-[#FFFFFF] group-hover:bg-[#c8102e] group-hover:border-[#c8102e] transition-all duration-500 transform group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
