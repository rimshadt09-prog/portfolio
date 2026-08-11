"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: "WORK", href: "#portfolio" },
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out px-6 md:px-12 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#050505]/85 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="font-serif text-lg md:text-xl font-black tracking-[0.25em] text-[#FFFFFF] hover:text-[#c8102e] transition-colors duration-300 select-none uppercase"
          >
            RIMSHAD
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative font-sans text-[10px] tracking-[0.25em] text-[#a3a3a3] hover:text-[#FFFFFF] transition-colors duration-300 uppercase py-2 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c8102e] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Side: Let's Talk CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="font-sans text-[10px] tracking-[0.2em] font-semibold text-[#FFFFFF] hover:text-[#c8102e] border border-white/10 hover:border-[#c8102e]/30 px-5 py-2.5 rounded-full transition-all duration-300 uppercase"
            >
              LET'S TALK ↗
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FFFFFF] hover:text-[#c8102e] transition-colors duration-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (Slides in from the right) */}
      <div
        className={`fixed inset-0 z-30 bg-[#050505]/98 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col space-y-8 text-center">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{ transitionDelay: `${mobileMenuOpen ? idx * 75 + 100 : 0}ms` }}
              className={`font-serif text-2xl tracking-[0.2em] text-[#a3a3a3] hover:text-[#c8102e] transition-all duration-500 uppercase transform ${
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            style={{ transitionDelay: `${mobileMenuOpen ? navLinks.length * 75 + 100 : 0}ms` }}
            className={`font-sans text-xs tracking-[0.25em] text-[#FFFFFF] hover:text-[#c8102e] border border-white/10 px-6 py-3 rounded-full uppercase transform ${
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            LET'S TALK ↗
          </a>
        </nav>
      </div>
    </>
  );
}
