"use client";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "WORK", href: "#portfolio" },
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  const socialLinks = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/theaitom" },
    { label: "LINKEDIN", href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-20 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-xl font-black tracking-[0.25em] text-[#FFFFFF] block uppercase">
              RIMSHAD
            </span>
            <p className="font-sans text-xs text-[#a3a3a3] max-w-xs leading-relaxed uppercase tracking-wider font-semibold">
              AI CONTENT CREATOR & CREATIVE STRATEGIST
            </p>
          </div>

          {/* Navigation coordinates */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
              Coordinates
            </span>
            <div className="flex flex-col space-y-3 font-sans text-xs tracking-widest text-[#a3a3a3] uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="hover:text-[#c8102e] transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Platforms */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#c8102e] font-bold uppercase block">
              Platforms
            </span>
            <div className="flex flex-col space-y-3 font-sans text-xs tracking-widest text-[#a3a3a3] uppercase">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c8102e] transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-mono text-[9px] text-[#a3a3a3]/50 tracking-[0.2em] uppercase">
          <div>
            © 2026 RIMSHAD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#c8102e] transition-colors duration-300">Privacy Policy</a>
            <span>/</span>
            <a href="#" className="hover:text-[#c8102e] transition-colors duration-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
