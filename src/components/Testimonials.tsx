"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  image: string;
  rating: number;
  review: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      try {
        const res = await fetch(`${apiUrl}/api/testimonials`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setTestimonials(json.data);
          }
        }
      } catch (err) {
        console.warn("Backend API not reachable. Using fallback testimonials.", err);
        setTestimonials([
          {
            id: "1",
            name: "Sophia Vance",
            company: "VANCE Studio",
            image: "/assets/testimonials/client1.jpg",
            rating: 5,
            review: "Maison D'Art transformed our industrial warehouse into an editorial gallery of light, shadow, and texture. Their care for spatial silence is unparalleled."
          },
          {
            id: "2",
            name: "Marcus Thorne",
            company: "Thorne Technologies",
            image: "/assets/testimonials/client2.jpg",
            rating: 5,
            review: "Their precise alignment of apertures created a home that feels like living inside a minimalist sculpture. It captures raw, natural beauty."
          }
        ]);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  // Duplicate items to ensure a seamless infinite scrolling marquee loop
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative bg-[#080808] py-32 border-b border-[#222220] overflow-hidden"
    >
      {/* CSS Styles injection for hardware-accelerated marquee & floating cards */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .float-card-a {
          animation: float-up 6s ease-in-out infinite;
        }
        .float-card-b {
          animation: float-down 7s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="space-y-4">
          <span className="font-sans text-xs tracking-[0.3em] text-[#C5A880] uppercase block">
            Client Voices
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] text-[#F4F1EA]">
            Tactile Reflections <br />
            & <span className="font-serif italic text-[#C5A880]">Testimonials</span>.
          </h2>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="w-full flex overflow-hidden py-8">
        <div className="marquee-track space-x-8 px-4">
          {marqueeItems.map((item, index) => {
            const isFloatA = index % 2 === 0;
            return (
              <div
                key={`${item.id}-${index}`}
                className={`w-[80vw] sm:w-[450px] flex-shrink-0 flex flex-col justify-between p-8 md:p-10 border border-[#222220] bg-[#121212]/30 backdrop-blur-md rounded-lg relative overflow-hidden transition-all duration-300 hover:border-[#C5A880]/30 ${
                  isFloatA ? "float-card-a" : "float-card-b"
                }`}
              >
                {/* 5-Star Rating */}
                <div className="flex space-x-1 text-[#C5A880] mb-6">
                  {Array.from({ length: item.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-serif text-sm md:text-base text-[#F4F1EA]/90 leading-relaxed italic mb-8">
                  "{item.review}"
                </p>

                {/* Client Meta Box */}
                <div className="flex items-center space-x-4 border-t border-[#222220]/50 pt-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#222220]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="font-sans text-xs">
                    <span className="font-serif text-sm text-[#F4F1EA] block mb-1">
                      {item.name}
                    </span>
                    <span className="text-[#8E8A82] tracking-wider uppercase font-semibold">
                      {item.company}
                    </span>
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
