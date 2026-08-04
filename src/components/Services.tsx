"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Sparkles, Building, Layers, ArrowUpRight } from "lucide-react";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_DATA: ServiceCard[] = [
  {
    id: "1",
    title: "Residential Interior Design",
    description: "Symphonic layout choreography. From raw site framing to structural partitions, we sculpt the foundational lines of luxury residential living.",
    icon: Home,
  },
  {
    id: "2",
    title: "Luxury Villa Design",
    description: "Bespoke architectural masterworks. We develop comprehensive conceptual schematics, framing natural vistas and crafting spatial harmony.",
    icon: Sparkles,
  },
  {
    id: "3",
    title: "Commercial Spaces",
    description: "Editorial spatial identity. We design retail showrooms, corporate galleries, and premium workspaces that communicate brand refinement.",
    icon: Building,
  },
  {
    id: "4",
    title: "Custom Furniture Design",
    description: "Bespoke artisanal commissions. We design limited-run furniture, custom storage configurations, and sculpt tactile wooden and stone details.",
    icon: Layers,
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
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
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
      className="relative bg-[#080808] py-32 px-6 md:px-12 border-b border-[#222220]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="services-header-box flex flex-col lg:flex-row lg:items-end justify-between mb-24 space-y-6 lg:space-y-0">
          <div className="space-y-4">
            <span className="font-sans text-xs tracking-[0.3em] text-[#C5A880] uppercase block">
              Capabilities
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] text-[#F4F1EA]">
              Our Spatial <br />
              <span className="font-serif italic text-[#C5A880]">Disciplines</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-[#8E8A82] max-w-sm leading-relaxed">
            Every line we sketch is guided by the philosophy of sensory architecture, balancing raw matter and dynamic illumination.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                data-cursor="open"
                className="service-glow-card relative flex flex-col justify-between p-8 md:p-12 border border-[#222220] bg-[#121212]/20 backdrop-blur-md rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#C5A880]/50 hover:shadow-[0_0_30px_rgba(197,168,128,0.05)] group cursor-pointer"
              >
                {/* Subtle Hover Soft Glow Element */}
                <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#C5A880]/10 blur-2xl group-hover:w-48 group-hover:h-48 transition-all duration-500 ease-out" />
                
                <div className="relative z-10 space-y-6">
                  {/* Large Icon */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border border-[#222220] text-[#C5A880] group-hover:border-[#C5A880] group-hover:bg-[#C5A880]/5 transition-all duration-500">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-2xl text-[#F4F1EA] tracking-tight group-hover:text-[#C5A880] transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-[#8E8A82] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow Link Button */}
                <div className="relative z-10 pt-8 flex justify-end">
                  <div className="w-8 h-8 rounded-full border border-[#222220] flex items-center justify-center text-[#8E8A82] group-hover:text-[#080808] group-hover:bg-[#C5A880] group-hover:border-[#C5A880] transition-all duration-500 transform group-hover:rotate-45">
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
