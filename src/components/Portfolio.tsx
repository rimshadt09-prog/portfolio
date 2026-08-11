"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  location: string;
  image: string;
  description: string;
  creativeDirection: string;
  tools: string[];
}

const RIMSHAD_PROJECTS: Project[] = [
  {
    id: "1",
    num: "01",
    title: "ECHO - AUDIO BRAND COMM",
    category: "AI PRODUCT ADS",
    year: "2026",
    location: "Global Campaign",
    image: "/assets/projects/project1.jpg",
    description: "An editorial product campaign for a high-end audio headset, blending fluid organic shape generations with deep soundscape branding.",
    creativeDirection: "Minimalist, dark studio setting, fluid metal textures, slow dramatic camera pans.",
    tools: ["Midjourney", "Runway Gen-2", "Magnific AI", "Premiere Pro"]
  },
  {
    id: "2",
    num: "02",
    title: "AETHERA - SUSTAINABLE COUTURE",
    category: "AI COMMERCIALS",
    year: "2026",
    location: "Zurich, CH",
    image: "/assets/projects/project2.jpg",
    description: "A cinematic concept film presenting futuristic bio-luminescent fabric innovations for a sustainable Swiss fashion atelier.",
    creativeDirection: "Ethereal, high contrast, macro fabric textures, slow-motion fluid physics.",
    tools: ["Stable Diffusion XL", "Luma Dream Machine", "Topaz Video AI", "After Effects"]
  },
  {
    id: "3",
    num: "03",
    title: "CHRONOS - CYCLE OF MATTER",
    category: "BRAND STORY",
    year: "2025",
    location: "Atelier Exhibition",
    image: "/assets/projects/project3.jpg",
    description: "An emotional visual essay visualizing the passage of time through shifting mineral forms and architectural decay.",
    creativeDirection: "Monolithic stone shapes, warm lighting cycles, quiet cinematic pacing.",
    tools: ["Krea AI", "Midjourney v6", "Premiere Pro", "Photoshop"]
  },
  {
    id: "4",
    num: "04",
    title: "DIGITAL SHIFT - CREATIVE REELS",
    category: "SOCIAL MEDIA CONTENT",
    year: "2026",
    location: "Instagram Campaign",
    image: "/assets/projects/project1.jpg",
    description: "A modular video campaign of high-velocity creative content explaining the intersection of machine learning and human art.",
    creativeDirection: "Fast pacing, typographic overlays, dark technical aesthetics.",
    tools: ["ChatGPT-4o", "Runway Gen-2", "CapCut", "Adobe Audition"]
  }
];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Calculate total width of horizontal scroll
    const totalScrollWidth = track.scrollWidth - window.innerWidth;

    // Horizontal scroll tween
    const scrollTween = gsap.to(track, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        scrub: 1.0,
        invalidateOnRefresh: true,
      },
    });

    // Card Animations: Scale 0.95 -> 1 and Parallax shifts
    const cards = track.querySelectorAll(".project-panel-card");
    cards.forEach((card) => {
      const img = card.querySelector(".parallax-img");
      
      gsap.fromTo(
        card,
        { scale: 0.95, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          ease: "sine.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left right",
            end: "center center",
            scrub: true,
          },
        }
      );

      if (img) {
        gsap.fromTo(
          img,
          { x: "-5%" },
          {
            x: "5%",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505] w-full overflow-hidden"
    >
      <div className="h-screen sticky top-0 flex items-center overflow-hidden">
        {/* Horizontal Track Container */}
        <div
          ref={trackRef}
          className="flex flex-nowrap items-center h-full px-6 md:px-24 space-x-12 md:space-x-24"
          style={{ width: "fit-content" }}
        >
          
          {/* Section Panel Intro */}
          <div className="w-[85vw] md:w-[35vw] flex-shrink-0 flex flex-col justify-center h-full space-y-6">
            <span className="font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
              SELECTED WORK
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#FFFFFF] uppercase">
              FEATURED <br />
              VISUAL <span className="font-serif italic text-white/90">PROJECTS</span>
            </h2>
            <p className="font-sans text-sm text-[#a3a3a3] max-w-sm leading-relaxed">
              A collection of AI-powered visual experiments, campaigns, and digital experiences.
            </p>
            <div className="flex items-center space-x-4 pt-4 font-mono text-[10px] text-[#c8102e]/80 tracking-[0.25em]">
              <span>SCROLL TO EXPLORE</span>
              <span className="animate-[pulse_1.5s_infinite_ease-in-out]">→</span>
            </div>
          </div>

          {/* Dynamic Project Panels */}
          {RIMSHAD_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-panel-card w-[85vw] md:w-[55vw] flex-shrink-0 h-[70vh] flex flex-col justify-between border border-white/5 bg-white/[0.01] p-6 md:p-8 relative overflow-hidden rounded-2xl group"
            >
              {/* Parallax Image Containment */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="parallax-img w-[110%] h-full relative left-[-5%] transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 85vw, 65vw"
                    className="object-cover opacity-35 transition-all duration-500 group-hover:opacity-45"
                    priority
                  />
                </div>
                {/* Visual dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/50 to-[#050505]/20" />
              </div>

              {/* Top Meta info */}
              <div className="relative z-10 flex justify-between items-center border-b border-white/5 pb-4 font-mono text-[11px] text-[#a3a3a3]/85 uppercase">
                <span className="text-[#c8102e] font-bold tracking-widest">{project.category}</span>
                <span>{project.year}</span>
              </div>

              {/* Bottom details & CTA */}
              <div className="relative z-10 space-y-4">
                <span className="font-mono text-[10px] text-white/50 tracking-wider block">
                  PROJECT {project.num} / {project.location}
                </span>
                
                <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-[#FFFFFF] uppercase">
                  {project.title}
                </h3>
                
                <p className="font-sans text-xs md:text-sm text-[#a3a3a3] leading-relaxed max-w-lg">
                  {project.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="border border-[#c8102e] hover:bg-[#c8102e] hover:text-[#FFFFFF] transition-all duration-300 px-6 py-2.5 rounded-full font-sans text-[10px] tracking-[0.25em] text-[#c8102e] uppercase flex items-center space-x-2 group/btn cursor-pointer"
                  >
                    <span>VIEW DETAILS</span>
                    <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                      ↗
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Case Study Detail Modal Overlay */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl p-4 md:p-8 animate-fade-in">
          <div className="relative bg-white/[0.02] border border-white/10 max-w-5xl w-full h-[90vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-12">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 z-30 bg-[#050505]/80 hover:bg-[#c8102e] text-white p-3 rounded-full border border-white/10 transition-colors duration-300 focus:outline-none"
              aria-label="Close Case Study"
            >
              <X size={20} />
            </button>

            {/* Left Column: Visual Showcase */}
            <div className="md:col-span-7 relative h-[40vh] md:h-full w-full bg-[#0d0d0d] border-b md:border-b-0 md:border-r border-white/5">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
            </div>

            {/* Right Column: Case Study Data */}
            <div className="md:col-span-5 p-6 md:p-10 flex flex-col justify-between overflow-y-auto space-y-8">
              <div className="space-y-6">
                {/* Meta details */}
                <div className="flex justify-between items-center font-mono text-[10px] text-white/50 border-b border-white/5 pb-4">
                  <span className="text-[#c8102e] font-bold tracking-widest">{activeProject.category}</span>
                  <span>{activeProject.year}</span>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-widest">
                    CASE STUDY {activeProject.num}
                  </span>
                  <h3 className="font-serif text-3xl font-black tracking-tight text-[#FFFFFF] uppercase">
                    {activeProject.title}
                  </h3>
                </div>

                {/* Brief & Description */}
                <div className="space-y-3">
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#c8102e] uppercase">
                    THE PROJECT
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-[#a3a3a3] leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Creative Direction */}
                <div className="space-y-3">
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#c8102e] uppercase">
                    CREATIVE DIRECTION
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-white/90 leading-relaxed italic">
                    "{activeProject.creativeDirection}"
                  </p>
                </div>
              </div>

              {/* Tools Used Stack */}
              <div className="space-y-4 pt-6 border-t border-white/5">
                <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#a3a3a3] uppercase">
                  CREATIVE STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="font-mono text-[9px] font-semibold text-white/80 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-md uppercase"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Raw Files in Drive Link */}
              <div className="pt-6 border-t border-white/5">
                <a
                  href="https://drive.google.com/drive/folders/1Uxqrck5Yg0U0oTT9kITDzWQwTDJBMm4O?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center border border-[#c8102e] hover:bg-[#c8102e] hover:text-[#FFFFFF] transition-all duration-300 py-3 rounded-full font-sans text-[10px] tracking-[0.2em] text-[#c8102e] uppercase block font-bold cursor-pointer"
                >
                  VIEW WORK IN DRIVE ↗
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
