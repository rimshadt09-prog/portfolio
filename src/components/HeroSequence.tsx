"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const totalFrames = 241;

  useEffect(() => {
    // Lock body scrolling during preloading to prevent premature layout shifts
    document.body.style.overflow = "hidden";

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Preload all frames
    const loadImages = async () => {
      // 1. Load the first frame immediately for fast paint
      const firstFrameImg = new Image();
      firstFrameImg.src = "/assets/hero-sequence/ezgif-frame-001.png";
      
      await new Promise<void>((resolve) => {
        firstFrameImg.onload = () => {
          images[0] = firstFrameImg;
          loadedCount++;
          setProgress(Math.round((loadedCount / totalFrames) * 100));
          if (canvasRef.current) {
            resizeAndDraw(canvasRef.current, firstFrameImg);
          }
          resolve();
        };
        firstFrameImg.onerror = () => {
          resolve(); // Resolve on error to avoid breaking the load loop
        };
      });

      // 2. Load remaining frames with async parallel promise mapping
      const promises = Array.from({ length: totalFrames - 1 }, (_, index) => {
        const frameIndex = index + 2; // from 002 to 241
        return new Promise<void>((resolve) => {
          const img = new Image();
          const padIndex = String(frameIndex).padStart(3, "0");
          img.src = `/assets/hero-sequence/ezgif-frame-${padIndex}.png`;
          
          img.onload = () => {
            images[frameIndex - 1] = img;
            loadedCount++;
            setProgress(Math.round((loadedCount / totalFrames) * 100));
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / totalFrames) * 100));
            resolve();
          };
        });
      });

      await Promise.all(promises);
      
      // Store loaded assets
      imagesRef.current = images;
      setIsLoaded(true);
      
      // Re-enable body scroll
      document.body.style.overflow = "auto";
    };

    loadImages();

    // Canvas Resize and Cover Drawing Logic
    const resizeAndDraw = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx || !img) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      
      ctx.scale(dpr, dpr);

      const imgRatio = img.width / img.height;
      const canvasRatio = w / h;
      let drawW = w;
      let drawH = h;
      let drawX = 0;
      let drawY = 0;

      if (imgRatio > canvasRatio) {
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
      } else {
        drawH = w / imgRatio;
        drawY = (h - drawH) / 2;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const activeFrame = Math.round(scrollProgressRef.current.frame);
      const img = imagesRef.current[activeFrame] || images[0];
      if (img) {
        resizeAndDraw(canvas, img);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };
  }, []);

  const scrollProgressRef = useRef({ frame: 0 });

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !canvasRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    
    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (img && canvas) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;
        let drawW = w;
        let drawH = h;
        let drawX = 0;
        let drawY = 0;

        if (imgRatio > canvasRatio) {
          drawW = h * imgRatio;
          drawX = (w - drawW) / 2;
        } else {
          drawH = w / imgRatio;
          drawY = (h - drawH) / 2;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
    };

    // Pin Hero Section while scrubbing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=350%", // Scroll depth for pinning
        scrub: 1.0,    // Smooth interpolation scrubbing
        pin: true,     // Pin the canvas container
        anticipatePin: 1,
        onUpdate: (self) => {
          const frameIndex = Math.floor(self.progress * (totalFrames - 1));
          scrollProgressRef.current.frame = frameIndex;
          drawFrame(frameIndex);
        },
      },
    });

    // Animate Text Reveals corresponding to Scroll Progress
    gsap.fromTo(
      ".hero-overlay-text-1",
      { opacity: 1, y: 0, scale: 1 },
      {
        opacity: 0,
        y: -40,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=80%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".hero-overlay-text-2",
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "+=120%",
          end: "+=200%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".hero-overlay-text-2",
      { opacity: 1 },
      {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "+=240%",
          end: "+=300%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoaded]);

  return (
    <div id="home" ref={containerRef} className="relative w-full bg-[#080808]">
      {/* Cinematic Loading Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center space-y-8 max-w-sm w-full px-6 text-center">
          {/* Pulsing Glowing Geometric Logo */}
          <div className="relative w-24 h-24 flex items-center justify-center animate-[pulse_3s_infinite_ease-in-out]">
            <div className="absolute inset-0 rounded-full bg-[#C5A880]/5 blur-xl animate-[ping_4s_infinite_ease-in-out]" />
            <svg
              viewBox="0 0 100 100"
              className="w-16 h-16 text-[#C5A880] drop-shadow-[0_0_8px_rgba(197,168,128,0.3)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="50,15 85,75 15,75" />
              <line x1="50" y1="15" x2="50" y2="75" />
              <circle cx="50" cy="53" r="10" />
            </svg>
          </div>

          <h2 className="font-serif text-3xl tracking-[0.25em] text-[#F4F1EA]">
            MAISON D'ART
          </h2>
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#C5A880] uppercase">
            Preloading Cinematic Asset Matrix
          </span>
          
          {/* Progress Bar */}
          <div className="relative w-full h-[1px] bg-[#222220]">
            <div
              className="absolute left-0 top-0 h-full bg-[#C5A880] transition-all duration-300 ease-out shadow-[0_0_4px_#C5A880]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <span className="font-mono text-xs text-[#8E8A82] tracking-widest">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </div>

      {/* Hero Content Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-between py-24 px-6">
        {/* Top brand header */}
        <div className="flex w-full max-w-7xl justify-between items-start font-sans text-[10px] tracking-[0.3em] text-[#F4F1EA]/70 uppercase">
          <div>Spatial Poetics</div>
          <div>Bespoke Interiors</div>
        </div>

        {/* Dynamic Center Text Overlay 1 */}
        <div className="hero-overlay-text-1 flex flex-col items-center text-center max-w-5xl">
          <h1 className="font-serif text-5xl md:text-8xl tracking-tight leading-[1.05] text-[#F4F1EA]">
            Aesthetic <br className="hidden md:inline" />
            <span className="font-serif italic text-[#C5A880]">Architecture</span>
          </h1>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.35em] text-[#8E8A82] uppercase mt-8 max-w-md">
            SCROLL TO ENTER THE SPACE
          </p>
        </div>

        {/* Dynamic Center Text Overlay 2 */}
        <div className="hero-overlay-text-2 absolute inset-0 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 opacity-0">
          <span className="font-serif italic text-lg md:text-2xl text-[#C5A880] mb-4">
            Philosophy
          </span>
          <h2 className="font-serif text-3xl md:text-6xl tracking-tight leading-[1.2] text-[#F4F1EA]">
            Crafting dialogues between light, matter, and raw geometry.
          </h2>
          <p className="font-sans text-[#8E8A82] text-[10px] md:text-xs tracking-[0.25em] uppercase mt-6 max-w-md">
            THE ART OF BESPOKE LIVING
          </p>
        </div>

        {/* Bottom meta stats */}
        <div className="flex w-full max-w-7xl justify-between items-end font-sans text-[10px] tracking-[0.25em] text-[#8E8A82]/70 uppercase">
          <div>© {new Date().getFullYear()} MAISON</div>
          <div>Volume 01 / Residence</div>
        </div>
      </div>

      {/* Interactive Sticky Canvas */}
      <div data-cursor="scroll" className="w-full h-screen sticky top-0 overflow-hidden bg-[#080808]">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />
      </div>
    </div>
  );
}
