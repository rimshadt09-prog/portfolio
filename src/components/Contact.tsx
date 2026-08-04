"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Residential Interior Design",
    budget: "$100,000 - $250,000",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = containerRef.current?.querySelectorAll(".contact-reveal");
    if (elements) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "Residential Interior Design",
          budget: "$100,000 - $250,000",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage("Could not connect to the server database. Please ensure the backend API is active.");
    }
  };

  const projectTypes = [
    "Residential Interior Design",
    "Luxury Villa Design",
    "Commercial Spaces",
    "Custom Furniture Design"
  ];

  const budgetRanges = [
    "Under $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "Over $250,000"
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative bg-[#080808] py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left column: Editorial Contact details */}
        <div className="lg:col-span-5 space-y-12 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="contact-reveal font-sans text-xs tracking-[0.3em] text-[#C5A880] uppercase block">
              Architectural Consulting
            </span>
            <h2 className="contact-reveal font-serif text-4xl md:text-6xl tracking-tight leading-[1.1] text-[#F4F1EA]">
              Consultation <br />
              & <span className="font-serif italic text-[#C5A880]">Planning</span>
            </h2>
            <p className="contact-reveal font-sans text-[#8E8A82] text-sm max-w-sm pt-4 leading-relaxed">
              Define the parameters of your custom living space. Our team will coordinate a sensory study and architectural brief.
            </p>
          </div>

          <div className="contact-reveal space-y-8 pt-12 lg:pt-0 font-sans text-xs tracking-widest text-[#8E8A82] uppercase">
            <div className="space-y-2">
              <span className="text-[#C5A880] block text-[10px]">REPRESENTATION</span>
              <a href="mailto:inquire@maisondart.com" className="text-[#F4F1EA] hover:text-[#C5A880] transition-colors duration-300">
                inquire@maisondart.com
              </a>
              <div>+41 44 254 3000</div>
            </div>
            
            <div className="space-y-2">
              <span className="text-[#C5A880] block text-[10px]">STUDIO LOCATION</span>
              <div>ARCHITECTURAL STRASSE 14A</div>
              <div>8001 ZURICH, SWITZERLAND</div>
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="contact-reveal lg:col-span-7 bg-[#121212]/30 border border-[#222220] p-8 md:p-12 backdrop-blur-md">
          
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
              <CheckCircle2 size={48} className="text-[#C5A880] animate-pulse" />
              <h3 className="font-serif text-2xl text-[#F4F1EA] tracking-wide">
                TRANSMISSION RECEIVED
              </h3>
              <p className="font-sans text-[#8E8A82] text-sm leading-relaxed max-w-md">
                Your spatial inquiry has been recorded in our CMS database. Our art direction team will evaluate your budget scale and project parameters.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 font-sans text-[10px] tracking-[0.3em] text-[#C5A880] uppercase hover:text-[#F4F1EA] transition-colors duration-300"
              >
                [ Submit another request ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {status === "error" && (
                <div className="flex items-center space-x-3 bg-red-950/20 border border-red-900/40 p-4 text-red-400 text-xs font-mono">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Email Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#222220] py-3 text-sm text-[#F4F1EA] focus:outline-none focus:border-[#C5A880] transition-colors duration-300 placeholder-transparent peer"
                    placeholder="Full Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-3 text-[#8E8A82] text-[10px] uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#C5A880] -top-4 text-[9px]"
                  >
                    Full Name
                  </label>
                </div>

                {/* Email Address */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#222220] py-3 text-sm text-[#F4F1EA] focus:outline-none focus:border-[#C5A880] transition-colors duration-300 placeholder-transparent peer"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-3 text-[#8E8A82] text-[10px] uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#C5A880] -top-4 text-[9px]"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              {/* Phone & Project Type Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Phone Number */}
                <div className="relative group">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#222220] py-3 text-sm text-[#F4F1EA] focus:outline-none focus:border-[#C5A880] transition-colors duration-300 placeholder-transparent peer"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 top-3 text-[#8E8A82] text-[10px] uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#C5A880] -top-4 text-[9px]"
                  >
                    Phone Number
                  </label>
                </div>

                {/* Project Type */}
                <div className="relative">
                  <select
                    name="projectType"
                    id="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#222220] py-3 text-xs md:text-sm text-[#F4F1EA] focus:outline-none focus:border-[#C5A880] transition-colors duration-300 cursor-pointer"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#080808] text-[#F4F1EA]">
                        {type}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="projectType"
                    className="absolute left-0 -top-4 text-[9px] text-[#C5A880] uppercase tracking-widest pointer-events-none"
                  >
                    Project Type
                  </label>
                </div>
              </div>

              {/* Budget Range Selection */}
              <div className="relative">
                <select
                  name="budget"
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#222220] py-3 text-xs md:text-sm text-[#F4F1EA] focus:outline-none focus:border-[#C5A880] transition-colors duration-300 cursor-pointer"
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range} className="bg-[#080808] text-[#F4F1EA]">
                      {range}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="budget"
                  className="absolute left-0 -top-4 text-[9px] text-[#C5A880] uppercase tracking-widest pointer-events-none"
                >
                  Budget Range
                </label>
              </div>

              {/* Message Brief */}
              <div className="relative group">
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-[#222220] py-3 text-sm text-[#F4F1EA] focus:outline-none focus:border-[#C5A880] transition-colors duration-300 placeholder-transparent peer resize-none"
                  placeholder="Brief Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 text-[#8E8A82] text-[10px] uppercase tracking-widest pointer-events-none transition-all duration-300 peer-placeholder-shown:text-xs peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#C5A880] -top-4 text-[9px]"
                >
                  Describe Your Space parameters
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full border border-[#C5A880] hover:bg-[#C5A880] hover:text-[#080808] transition-all duration-500 py-4 font-sans text-xs tracking-[0.3em] uppercase text-[#C5A880] flex items-center justify-center space-x-3 cursor-pointer disabled:opacity-50"
              >
                <span>{status === "loading" ? "TRANSMITTING..." : "SUBMIT ARCHITECTURAL REQUEST"}</span>
                {status !== "loading" && <Send size={12} />}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
