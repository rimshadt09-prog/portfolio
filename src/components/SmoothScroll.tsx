"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease-out
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger update events
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Bind Lenis updates to the GSAP ticker
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);

    // Disable lag smoothing for synchronous updates
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
    };
  }, []);

  return <>{children}</>;
}
