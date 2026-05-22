import React, { useState, useRef, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FabricBackgroundCanvas from "./FabricBackgroundCanvas";
import LiquidGlassCardCanvas from "./LiquidGlassCardCanvas";

// Register GSAP plugins
gsap.registerPlugin();

const CYCLE_WORDS = [
  "Simetría de Autor",
  "Proporción Áurea",
  "Armonización Facial"
];

export default function Hero() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const textCyclerRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  
  // Mouse coordinates passed to WebGL canvases
  const mouse = useRef({ x: 0, y: 0 });
  const [cycleIndex, setCycleIndex] = useState(0);

  // Capture normalized coordinates relative to center (for THREE)
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current = { x, y };
  };

  // Entrance and infinite cycling animations with GSAP
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Reveal card and background elements
    tl.fromTo(
      cardRef.current,
      { scale: 0.95, y: 40, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 1.8 }
    );

    tl.fromTo(
      ".hero-reveal-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, stagger: 0.15 },
      "-=1.2"
    );

    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      "-=0.8"
    );

    tl.fromTo(
      badgeRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.2)" },
      "-=1.0"
    );

    // 2. Infinite Loop: Splitting or shifting words smoothly
    const cycleInterval = setInterval(() => {
      const activeText = textCyclerRef.current;
      if (!activeText) return;

      gsap.to(activeText, {
        opacity: 0,
        y: -10,
        duration: 0.55,
        ease: "power3.in",
        onComplete: () => {
          setCycleIndex((prev) => (prev + 1) % CYCLE_WORDS.length);
          gsap.fromTo(
            activeText,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
          );
        }
      });
    }, 4500);

    return () => clearInterval(cycleInterval);
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-brand-dark flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 1. WebGL 3D TELA DE SEDA BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-90">
        <Suspense fallback={<div className="absolute inset-0 bg-brand-dark" />}>
          <FabricBackgroundCanvas mouse={mouse} />
        </Suspense>
      </div>

      {/* 2. TEXTURED DIGITAL FILM GRAIN OVERLAY */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.10] z-25" xmlns="http://www.w3.org/2000/svg">
        <filter id="hero-noise-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.12 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise-filter)" />
      </svg>

      {/* 3. CENTRAL BILLBOARD / CARTEL CONTENEDOR (El Vidrio Líquido Oscuro) */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center text-center select-none"
      >
        <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[2.5rem] md:rounded-[4rem] border border-white/[0.04] bg-brand-dark/20 backdrop-blur-xl shadow-[0_45px_95px_-20px_rgba(0,0,0,0.95)] overflow-hidden px-6 py-16 xs:px-10 xs:py-20 md:px-20 md:py-28">
          
          {/* WebGL 3D Obsidian Canvas Backdrop inside the card */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none rounded-[2.5rem] md:rounded-[4rem] overflow-hidden opacity-95">
            <LiquidGlassCardCanvas mouse={mouse} />
          </div>

          {/* Micro-Header Brand Tag */}
          <div className="hero-reveal-title inline-flex items-center gap-2 mb-8 relative z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-glow animate-pulse" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.45em] text-brand-glow font-bold font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              BENÍTEZ AESTHETIC STUDIO • AV. ALVEAR
            </span>
          </div>

          {/* Dynamic Editorial Title */}
          <h1 className="hero-reveal-title text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.05] tracking-tight max-w-3xl mx-auto relative z-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="block italic text-brand-glow select-none mb-3">Diseño de Autor</span>
            <span 
              ref={textCyclerRef}
              className="block text-white font-sans font-semibold uppercase tracking-[0.20em] text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg mt-6 min-h-[1.2em] drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] whitespace-nowrap"
            >
              {CYCLE_WORDS[cycleIndex]}
            </span>
          </h1>

          {/* Single Premium CTA Button inside card */}
          <div ref={ctaRef} className="pointer-events-auto mt-12 relative z-10">
            <button
              onClick={() => {
                const element = document.getElementById("triage");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="relative px-14 py-5 rounded-full border border-white/15 bg-white/[0.02] hover:bg-white/[0.08] text-white text-[11px] sm:text-xs uppercase tracking-[0.35em] font-bold transition-all duration-700 backdrop-blur-md hover:border-brand-electric/40 hover:shadow-[0_0_35px_rgba(191,64,250,0.25)] cursor-pointer overflow-hidden group shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            >
              <span className="relative z-10">Solicitar Admisión</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-brand-royal/10 via-brand-electric/25 to-brand-royal/10 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
            </button>
          </div>

        </div>
      </div>

      {/* 4. ROTATING CIRCULAR SCROLL BADGE (Bottom-Left Corner) */}
      <div 
        ref={badgeRef}
        className="absolute bottom-10 left-6 md:left-12 w-20 h-20 pointer-events-none select-none z-20 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_30s_linear_infinite] overflow-visible">
          <path
            id="circlePath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
          <text className="fill-white/25 text-[6.5px] uppercase tracking-[0.28em] font-sans font-bold">
            <textPath href="#circlePath" startOffset="0%">
              SCROLL DOWN • SCROLL DOWN •
            </textPath>
          </text>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-5 h-5 text-white/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="9" cy="12" r="3.5" strokeDasharray="1.5 1.5" />
            <circle cx="15" cy="12" r="3.5" />
          </svg>
        </div>
      </div>

    </section>
  );
}
