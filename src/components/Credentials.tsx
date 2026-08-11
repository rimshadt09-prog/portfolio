"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Credentials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = containerRef.current?.querySelectorAll(".cred-reveal");

    if (revealElements) {
      gsap.fromTo(
        revealElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.1,
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
      ref={containerRef}
      className="relative bg-[#050505] py-32 px-6 md:px-12 lg:px-24 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: Education & Certification */}
        <div className="lg:col-span-6 space-y-12 text-left">
          <div className="space-y-4">
            <span className="cred-reveal font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
              CREDENTIALS
            </span>
            <h2 className="cred-reveal font-serif text-3xl md:text-4xl font-black tracking-tight text-[#FFFFFF] uppercase">
              EDUCATION & <br />
              <span className="font-serif italic text-white/90">CERTIFICATIONS</span>
            </h2>
          </div>

          <div className="space-y-8">
            {/* BCA */}
            <div className="cred-reveal border-l-2 border-white/5 pl-6 py-2 space-y-2 hover:border-[#c8102e] transition-colors duration-300">
              <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest block uppercase">
                GRADUATION
              </span>
              <h3 className="font-serif text-xl font-bold text-[#FFFFFF] uppercase">
                Bachelor of Computer Applications — BCA
              </h3>
              <p className="font-sans text-xs text-[#a3a3a3]">
                Grace Valley Arts & Science College
              </p>
            </div>

            {/* Higher Secondary */}
            <div className="cred-reveal border-l-2 border-white/5 pl-6 py-2 space-y-2 hover:border-[#c8102e] transition-colors duration-300">
              <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest block uppercase">
                HIGHER SECONDARY
              </span>
              <h3 className="font-serif text-xl font-bold text-[#FFFFFF] uppercase">
                Computer Science
              </h3>
              <p className="font-sans text-xs text-[#a3a3a3]">
                GVHSS Chettiyankinar
              </p>
            </div>

            {/* Certifications */}
            <div className="cred-reveal border-l-2 border-white/5 pl-6 py-2 space-y-2 hover:border-[#c8102e] transition-colors duration-300">
              <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest block uppercase">
                PROFESSIONAL CERTIFICATION
              </span>
              <h3 className="font-serif text-xl font-bold text-[#FFFFFF] uppercase">
                AI Content Creation & Marketing
              </h3>
              <p className="font-sans text-xs text-[#a3a3a3]">
                Specialized Creative AI workflows and digital content scaling methodologies.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Skills Section */}
        <div className="lg:col-span-6 space-y-12 text-left">
          <div className="space-y-4">
            <span className="cred-reveal font-sans text-xs tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
              CAPABILITIES
            </span>
            <h2 className="cred-reveal font-serif text-3xl md:text-4xl font-black tracking-tight text-[#FFFFFF] uppercase">
              PROFESSIONAL <br />
              <span className="font-serif italic text-white/90">SKILLSETS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Creative Skills */}
            <div className="cred-reveal space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#FFFFFF] uppercase border-b border-white/5 pb-2 text-[#c8102e]/95 tracking-wide">
                CREATIVE
              </h3>
              <ul className="space-y-3 font-sans text-xs md:text-sm text-[#a3a3a3]">
                <li className="hover:text-white transition-colors duration-200">AI Content Creation</li>
                <li className="hover:text-white transition-colors duration-200">AI Video Creation</li>
                <li className="hover:text-white transition-colors duration-200">Creative Direction</li>
                <li className="hover:text-white transition-colors duration-200">Visual Storytelling</li>
                <li className="hover:text-white transition-colors duration-200">Content Strategy</li>
              </ul>
            </div>

            {/* Marketing Skills */}
            <div className="cred-reveal space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#FFFFFF] uppercase border-b border-white/5 pb-2 text-[#c8102e]/95 tracking-wide">
                MARKETING
              </h3>
              <ul className="space-y-3 font-sans text-xs md:text-sm text-[#a3a3a3]">
                <li className="hover:text-white transition-colors duration-200">Social Media Marketing</li>
                <li className="hover:text-white transition-colors duration-200">Content Marketing</li>
                <li className="hover:text-white transition-colors duration-200">Digital Strategy</li>
                <li className="hover:text-white transition-colors duration-200">Brand Communication</li>
              </ul>
            </div>

            {/* Technology Skills */}
            <div className="cred-reveal space-y-4 sm:col-span-2">
              <h3 className="font-serif text-lg font-bold text-[#FFFFFF] uppercase border-b border-white/5 pb-2 text-[#c8102e]/95 tracking-wide">
                TECHNOLOGY
              </h3>
              <ul className="grid grid-cols-2 gap-3 font-sans text-xs md:text-sm text-[#a3a3a3]">
                <li className="hover:text-white transition-colors duration-200">Vibe Coding</li>
                <li className="hover:text-white transition-colors duration-200">AI Workflows</li>
                <li className="hover:text-white transition-colors duration-200">Web Experiences</li>
                <li className="hover:text-white transition-colors duration-200">Problem Solving</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
