"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  year: string;
  description: string;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "THE BRUTAL RESIDENCE",
    category: "Residential Architecture",
    location: "Zurich, Switzerland",
    image: "/assets/projects/project1.jpg",
    year: "2025",
    description: "A monolithic villa carved from raw concrete and structural oak, framing the Swiss alpine panorama through sheer glass facades."
  },
  {
    id: "2",
    title: "LINEN & PLASTER SUITE",
    category: "Bespoke Interior Design",
    location: "Milano, Italy",
    image: "/assets/projects/project2.jpg",
    year: "2024",
    description: "An editorial bedroom concept emphasizing silence and light. Structured plaster walls pair with custom linen textiles and raw bronze elements."
  },
  {
    id: "3",
    title: "OBSIDIAN KITCHEN",
    category: "Spatial Curation",
    location: "Kyoto, Japan",
    image: "/assets/projects/project3.jpg",
    year: "2025",
    description: "A minimal culinary workspace showcasing a central block of dark obsidian granite, warm travertine stone floors, and hidden customized wood panels."
  }
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      try {
        const res = await fetch(`${apiUrl}/api/projects`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setProjects(json.data);
          }
        }
      } catch (err) {
        console.warn("Backend API not reachable. Using premium fallback portfolio data.", err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // 1. Calculate total width of horizontal scroll
    const totalScrollWidth = track.scrollWidth - window.innerWidth;

    // 2. Horizontal scroll tween
    const scrollTween = gsap.to(track, {
      x: -totalScrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: "top top",
        end: () => `+=${totalScrollWidth}`,
        scrub: 1.0, // Smooth scrubbing
        invalidateOnRefresh: true,
      },
    });

    // 3. Card Animations: Scale 0.95 -> 1 and Parallax shifts
    const cards = track.querySelectorAll(".project-panel-card");
    cards.forEach((card) => {
      const img = card.querySelector(".parallax-img");
      
      // Scale reveal as the card enters the viewport horizontally
      gsap.fromTo(
        card,
        { scale: 0.95, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          ease: "sine.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween, // Bind to the horizontal scroll timeline!
            start: "left right",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Image parallax translation
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
  }, [projects]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#080808] w-full overflow-hidden"
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
            <span className="font-sans text-xs tracking-[0.3em] text-[#C5A880] uppercase block">
              Portfolio
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] text-[#F4F1EA]">
              Featured <br />
              Interior <span className="font-serif italic text-[#C5A880]">Projects</span>
            </h2>
            <p className="font-sans text-sm text-[#8E8A82] max-w-sm leading-relaxed">
              Timeless spaces designed with elegance, functionality, and luxury.
            </p>
            <div className="flex items-center space-x-4 pt-4 font-mono text-[10px] text-[#C5A880]/60 tracking-[0.25em]">
              <span>SCROLL TO EXPLORE</span>
              <span className="animate-[pulse_1.5s_infinite_ease-in-out]">→</span>
            </div>
          </div>

          {/* Dynamic Project Panels */}
          {projects.map((project) => (
            <div
              key={project.id}
              data-cursor="view"
              className="project-panel-card w-[85vw] md:w-[60vw] flex-shrink-0 h-[70vh] flex flex-col justify-between border border-[#222220] bg-[#121212]/30 p-6 md:p-8 relative overflow-hidden backdrop-blur-sm group"
            >
              {/* Parallax Image Containment */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="parallax-img w-[110%] h-full relative left-[-5%] transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 85vw, 60vw"
                    className="object-cover opacity-60"
                    priority
                  />
                </div>
                {/* Visual dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/40 to-[#080808]/20" />
              </div>

              {/* Top Meta info */}
              <div className="relative z-10 flex justify-between items-center border-b border-[#222220]/50 pb-4 font-mono text-[11px] text-[#8E8A82]/80 uppercase">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>

              {/* Bottom details & CTA */}
              <div className="relative z-10 space-y-4">
                <span className="font-mono text-[10px] text-[#C5A880] tracking-wider block">
                  LOCATION: {project.location}
                </span>
                
                <h3 className="font-serif text-3xl md:text-4xl tracking-tight text-[#F4F1EA]">
                  {project.title}
                </h3>
                
                <p className="font-sans text-xs md:text-sm text-[#8E8A82]/90 leading-relaxed max-w-lg">
                  {project.description}
                </p>

                <div className="pt-4">
                  <button
                    data-cursor="open"
                    className="border border-[#C5A880] hover:bg-[#C5A880] hover:text-[#080808] transition-all duration-500 px-6 py-3 font-sans text-[10px] tracking-[0.25em] text-[#C5A880] uppercase flex items-center space-x-2 group/btn cursor-pointer"
                  >
                    <span>View Project</span>
                    <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
