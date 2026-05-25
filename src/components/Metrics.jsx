import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SVGCrosshair = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-brand-neon`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
    <circle cx="12" cy="12" r="4" strokeDasharray="2 2" strokeOpacity="0.7" />
    <path d="M12 2 V6 M12 18 V22 M2 12 H6 M18 12 H22" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" className="animate-pulse" />
  </svg>
);

const SVGAurea = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-brand-neon`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12,12 C12,9.79 10.21,8 8,8 C5.79,8 4,9.79 4,12 C4,15.31 6.69,18 10,18 C14.42,18 18,14.42 18,10 C18,4.48 13.52,0 8,0" strokeLinecap="round" />
    <rect x="2" y="2" width="20" height="20" stroke="currentColor" strokeOpacity="0.1" rx="2" />
    <line x1="8" y1="2" x2="8" y2="22" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="1 2" />
    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="1 2" />
  </svg>
);

const SVGCell = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-brand-neon`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12,2 C12.8,4.5 11.2,5.5 12,7" strokeLinecap="round" />
    <path d="M12,17 C12.8,18.5 11.2,19.5 12,22" strokeLinecap="round" />
    <path d="M2,12 C4.5,12.8 5.5,11.2 7,12" strokeLinecap="round" />
    <path d="M17,12 C19.5,12.8 20.5,11.2 22,12" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" className="animate-[ping_2s_infinite]" />
  </svg>
);

function StatsCounter({ value, label, icon: Icon }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    if (end === 0) {
      setCount(value);
      return;
    }
    const duration = 2; // seconds
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);
    return () => clearInterval(timer);
  }, [hasStarted, value]);

  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.replace(/[0-9+]/g, "");

  return (
    <div ref={ref} className="glass-panel rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_15px_35px_rgba(106,15,190,0.1)] hover:border-brand-royal/40 transition-all duration-300 bg-brand-dark/25">
      <div className="w-12 h-12 rounded-full bg-brand-royal/10 flex items-center justify-center mb-5 border border-brand-royal/20">
        <Icon className="w-6 h-6 text-brand-neon" />
      </div>
      <span className="text-4xl md:text-5xl font-serif font-light text-white tracking-wide">
        {prefix}{count}{suffix}
      </span>
      <span className="text-[10px] tracking-[0.25em] uppercase text-brand-glow font-bold mt-4 block">
        {label}
      </span>
    </div>
  );
}

export default function Metrics() {
  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-brand-dark/25 border-t border-b border-white/[0.03]">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-brand-royal/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <StatsCounter value="19" label="Años de Excelencia Clínica" icon={SVGAurea} />
        <StatsCounter value="+26Mil" label="Procedimientos de Autor" icon={SVGCrosshair} />
        <StatsCounter value="3" label="Sedes Internacionales HOF" icon={SVGCell} />
      </div>
    </section>
  );
}
