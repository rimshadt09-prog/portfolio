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
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-[#080808] border-t border-[#222220] py-20 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-xl tracking-[0.25em] text-[#F4F1EA] block">
              MAISON D'ART
            </span>
            <p className="font-sans text-xs text-[#8E8A82] max-w-xs leading-relaxed uppercase tracking-wider">
              An editorial gallery of luxury architectural environments and minimal spatial curations.
            </p>
          </div>

          {/* Navigation coordinates */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#C5A880] uppercase block">
              Coordinates
            </span>
            <div className="flex flex-col space-y-3 font-sans text-xs tracking-widest text-[#8E8A82] uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="hover:text-[#C5A880] transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Platforms */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-[#C5A880] uppercase block">
              Platforms
            </span>
            <div className="flex flex-col space-y-3 font-sans text-xs tracking-widest text-[#8E8A82] uppercase">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#222220]/50 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-mono text-[9px] text-[#8E8A82]/50 tracking-[0.2em] uppercase">
          <div>
            © {new Date().getFullYear()} MAISON D'ART. ALL RIGHTS RESERVED.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#C5A880] transition-colors duration-300">Privacy Policy</a>
            <span>/</span>
            <a href="#" className="hover:text-[#C5A880] transition-colors duration-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
