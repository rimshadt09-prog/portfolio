"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call to set correct height
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center space-y-4 pointer-events-none select-none">
      {/* Decorative Top Coordinates */}
      <span className="font-mono text-[8px] text-[#8E8A82]/40 tracking-wider rotate-90 origin-center translate-y-[-20px]">
        0%
      </span>
      
      {/* Visual Scroll Track */}
      <div className="w-[1px] h-[180px] bg-[#222220] relative">
        <div
          className="absolute top-0 left-0 w-full bg-[#C5A880] transition-all duration-100"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* Decorative Bottom Coordinates */}
      <span className="font-mono text-[8px] text-[#8E8A82]/40 tracking-wider rotate-90 origin-center translate-y-[20px]">
        100%
      </span>
    </div>
  );
}
