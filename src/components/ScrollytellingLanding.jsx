import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from "framer-motion";
import { ArrowDown, ChevronDown, Check, ChevronLeft, ChevronRight } from "lucide-react";
import TriageForm from "./TriageForm";

// -----------------------------------------
// SVGS VECTORIALES BIOMÉTRICOS DISEÑADOS A MANO (INLINE)
// -----------------------------------------

// Icono 1: Crosshair / Mapeo Facial de Precisión
const SVGCrosshair = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-brand-neon`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" strokeOpacity="0.3" />
    <circle cx="12" cy="12" r="4" strokeDasharray="2 2" strokeOpacity="0.7" />
    <path d="M12 2 V6 M12 18 V22 M2 12 H6 M18 12 H22" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" className="animate-pulse" />
  </svg>
);

// Icono 2: Espiral de Proporción Áurea Facial
const SVGAurea = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-brand-neon`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12,12 C12,9.79 10.21,8 8,8 C5.79,8 4,9.79 4,12 C4,15.31 6.69,18 10,18 C14.42,18 18,14.42 18,10 C18,4.48 13.52,0 8,0" strokeLinecap="round" />
    <rect x="2" y="2" width="20" height="20" stroke="currentColor" strokeOpacity="0.1" rx="2" />
    <line x1="8" y1="2" x2="8" y2="22" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="1 2" />
    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="1 2" />
  </svg>
);

// Icono 3: Malla Celular / Bioestimulación Regenerativa
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

// Icono 4: Escudo de Bioseguridad Estructural
const SVGShield = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-brand-neon`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12,2 L4,5 V11 C4,16.5 12,22 12,22 C12,22 20,16.5 20,11 V5 L12,2 Z" strokeLinejoin="round" />
    <path d="M9,11 L11,13 L15,9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// -----------------------------------------
// COMPONENTE DE DIAGNÓSTICO DE TRATAMIENTOS INTERACTIVO
// -----------------------------------------
function TreatmentVisual({ activeCategory }) {
  return (
    <div className="relative w-full h-[360px] md:h-[400px] bg-brand-dark/45 border border-brand-electric/30 rounded-3xl overflow-hidden flex items-center justify-center p-6 shadow-[0_15px_40px_rgba(106,15,190,0.15)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(106,15,190,0.25)_0%,_transparent_75%)]" />
      
      {/* Silueta base del rostro en líneas finas tipo blueprint */}
      <svg className="absolute w-[240px] h-[240px] text-zinc-800" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.4">
        <path d="M30,20 C35,15 45,15 50,15 C55,15 65,15 70,20 C75,25 78,35 78,45 C78,60 65,75 50,85 C35,75 22,60 22,45 C22,35 25,25 30,20 Z" />
        <path d="M50,15 L50,85" strokeDasharray="1 3" strokeOpacity="0.4" />
        <path d="M22,45 H78" strokeDasharray="1 3" strokeOpacity="0.4" />
        {/* Línea horizontal en los ojos */}
        <line x1="25" y1="35" x2="75" y2="35" strokeDasharray="2 4" strokeOpacity="0.2" />
        {/* Línea horizontal en la base de la nariz */}
        <line x1="28" y1="52" x2="72" y2="52" strokeDasharray="2 4" strokeOpacity="0.2" />
      </svg>

      <AnimatePresence mode="wait">
        {activeCategory === 0 && (
          <motion.div
            key="full-face"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Vectores Full Face Lift */}
            <svg className="w-[240px] h-[240px] text-brand-neon" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
              {/* Vectores de tracción hacia las sienes y orejas */}
              <motion.path d="M35,45 L26,30" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
              <motion.path d="M38,55 L28,40" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.path d="M42,65 L32,50" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
              
              <motion.path d="M65,45 L74,30" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
              <motion.path d="M62,55 L72,40" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.path d="M58,65 L68,50" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4 }} />
              
              {/* Flechas indicando tracción */}
              <path d="M26,30 L30,31 M26,30 L27,34" />
              <path d="M28,40 L32,41 M28,40 L29,44" />
              <path d="M32,50 L36,51 M32,50 L33,54" />
              <path d="M74,30 L70,31 M74,30 L73,34" />
              <path d="M72,40 L68,41 M72,40 L71,44" />
              <path d="M68,50 L64,51 M68,50 L67,54" />

              {/* Puntos clave */}
              <circle cx="35" cy="45" r="1.5" fill="#00FF6A" className="animate-pulse" />
              <circle cx="38" cy="55" r="1.5" fill="#00FF6A" />
              <circle cx="42" cy="65" r="1.5" fill="#00FF6A" />
              <circle cx="65" cy="45" r="1.5" fill="#00FF6A" className="animate-pulse" />
              <circle cx="62" cy="55" r="1.5" fill="#00FF6A" />
              <circle cx="58" cy="65" r="1.5" fill="#00FF6A" />

              <text x="50" y="93" textAnchor="middle" fill="#C9A8F5" className="text-[5px] tracking-[0.2em] font-mono uppercase font-bold">Vectores de Tracción Supraperióstica</text>
            </svg>
          </motion.div>
        )}

        {activeCategory === 1 && (
          <motion.div
            key="rino"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Ejes de Rinomodelación */}
            <svg className="w-[240px] h-[240px] text-brand-neon" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
              {/* Eje nasal */}
              <motion.path d="M50,22 L50,48" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
              <motion.path d="M50,48 L58,48" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
              {/* Arco angular */}
              <motion.path d="M50,38 A 12 12 0 0 1 58,48" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
              
              <circle cx="50" cy="22" r="1.2" fill="#6A0FBE" />
              <circle cx="50" cy="38" r="1.2" fill="#00FF6A" className="animate-pulse" />
              <circle cx="50" cy="48" r="1.5" fill="#00FF6A" />
              <circle cx="58" cy="48" r="1.2" fill="#6A0FBE" />

              <text x="56" y="38" fill="#00FF6A" className="text-[6px] font-mono font-bold">105°</text>
              <text x="50" y="93" textAnchor="middle" fill="#C9A8F5" className="text-[5px] tracking-[0.2em] font-mono uppercase font-bold">Ángulo Nasolabial Óptimo de Autor</text>
            </svg>
          </motion.div>
        )}

        {activeCategory === 2 && (
          <motion.div
            key="perfilado"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Trazado Labial Proporción Áurea */}
            <svg className="w-[240px] h-[240px] text-brand-neon" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
              {/* Labio Superior (Arco de cupido) */}
              <motion.path 
                d="M34,54 C40,50 45,50 50,52 C55,50 60,50 66,54 C60,56 40,56 34,54 Z" 
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 1.2 }} 
              />
              {/* Labio Inferior */}
              <motion.path 
                d="M34,54 C40,60 60,60 66,54 C55,58 45,58 34,54 Z" 
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 1.2, delay: 0.2 }} 
              />
              
              {/* Ejes de proporción áurea (1 : 1.618) */}
              <motion.path d="M50,44 L50,66" strokeDasharray="1 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
              <motion.path d="M34,54 L66,54" strokeDasharray="1 2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />

              <circle cx="50" cy="52" r="1" fill="#00FF6A" />
              <circle cx="44" cy="51.5" r="1" fill="#6A0FBE" />
              <circle cx="56" cy="51.5" r="1" fill="#6A0FBE" />
              
              <text x="30" y="49" fill="#00FF6A" className="text-[5px] font-mono">1.0</text>
              <text x="30" y="63" fill="#00FF6A" className="text-[5px] font-mono">1.618</text>

              <text x="50" y="93" textAnchor="middle" fill="#C9A8F5" className="text-[5px] tracking-[0.2em] font-mono uppercase font-bold">Proporción Áurea Labial (1:1.618)</text>
            </svg>
          </motion.div>
        )}

        {activeCategory === 3 && (
          <motion.div
            key="colageno"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Red de Bioestimuladores */}
            <svg className="w-[240px] h-[240px] text-brand-neon" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.6">
              {/* Red tridimensional de colágeno */}
              <motion.path 
                d="M32,35 L42,42 L38,55 L48,62 L44,72 M42,42 L58,42 L48,62 L62,62 M58,42 L68,35 L62,55 L72,62 L66,72" 
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 1.5 }} 
              />
              
              {/* Puntos de anclaje de colágeno celular */}
              <motion.circle cx="32" cy="35" r="1.2" fill="#00FF6A" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
              <motion.circle cx="42" cy="42" r="1.2" fill="#6A0FBE" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.3 }} />
              <motion.circle cx="38" cy="55" r="1.2" fill="#00FF6A" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} />
              <motion.circle cx="48" cy="62" r="1.2" fill="#6A0FBE" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.9 }} />
              <motion.circle cx="44" cy="72" r="1.2" fill="#00FF6A" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1.2 }} />
              
              <motion.circle cx="58" cy="42" r="1.2" fill="#6A0FBE" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
              <motion.circle cx="68" cy="35" r="1.2" fill="#00FF6A" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.8 }} />
              <motion.circle cx="62" cy="55" r="1.2" fill="#6A0FBE" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1.1 }} />
              <motion.circle cx="72" cy="62" r="1.2" fill="#00FF6A" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1.4 }} />
              <motion.circle cx="66" cy="72" r="1.2" fill="#6A0FBE" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1.7 }} />

              <text x="50" y="93" textAnchor="middle" fill="#C9A8F5" className="text-[5px] tracking-[0.2em] font-mono uppercase font-bold">Malla de Regeneración de Colágeno Tipo I y III</text>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Magnetic Button Wrapper
function MagneticButton({ children, onClick, className, style, animate, transition }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ ...animate, x: position.x, y: position.y }}
      transition={{ ...transition, type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={style}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Stats Counter Component with intersection observer trigger
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
    <div ref={ref} className="bg-brand-purple/25 backdrop-blur-md border border-brand-electric/30 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center shadow-[0_15px_35px_rgba(106,15,190,0.1)] hover:border-brand-neon/60 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-brand-electric/20 flex items-center justify-center mb-4 border border-brand-electric/40">
        <Icon className="w-6 h-6 text-brand-neon" />
      </div>
      <span className="text-4xl md:text-5xl font-mono font-bold text-white tracking-widest">
        {prefix}{count}{suffix}
      </span>
      <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-brand-glow font-medium mt-3 block">
        {label}
      </span>
    </div>
  );
}

export default function ScrollytellingLanding() {
  const containerRef = useRef(null);
  const specialistsSectionRef = useRef(null);
  
  const [isLightSection, setIsLightSection] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  // Global scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 60,
    mass: 0.1
  });

  // Track scroll position to trigger Camaleonic Navbar
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // When scroll enters "Nuestros Especialistas" section
    if (latest > 0.38 && latest < 0.61) {
      setIsLightSection(true);
    } else {
      setIsLightSection(false);
    }
  });

  // Scene transitions based on scroll progress
  const heroOpacity = useTransform(scrollYProgress, [0, 0.16, 0.22], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);

  // Smartphone float drift (parallax)
  const phoneScrollY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.05]);

  // Satellite Parallax drifts (drifting at different rates)
  const sat1ScrollY = useTransform(scrollYProgress, [0, 0.28], [0, -140]);
  const sat2ScrollY = useTransform(scrollYProgress, [0, 0.28], [0, -80]);
  const sat3ScrollY = useTransform(scrollYProgress, [0, 0.28], [0, -160]);
  const sat4ScrollY = useTransform(scrollYProgress, [0, 0.28], [0, -100]);

  // Specialists Section scroll mapping for Scatter-to-Grid
  const { scrollYProgress: specScrollProgress } = useScroll({
    target: specialistsSectionRef,
    offset: ["start end", "end start"]
  });

  // Suavizado por Spring para la inercia magnética del scatter-to-grid
  const smoothSpecProgress = useSpring(specScrollProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.9
  });

  // Scatter positions mapping to perfect Grid (applied only on md+ devices)
  const specRot1 = useTransform(smoothSpecProgress, [0.08, 0.35], [-16, 0]);
  const specX1 = useTransform(smoothSpecProgress, [0.08, 0.35], [-130, 0]);
  const specY1 = useTransform(smoothSpecProgress, [0.08, 0.35], [90, 0]);

  const specRot2 = useTransform(smoothSpecProgress, [0.08, 0.35], [14, 0]);
  const specX2 = useTransform(smoothSpecProgress, [0.08, 0.35], [100, 0]);
  const specY2 = useTransform(smoothSpecProgress, [0.08, 0.35], [-60, 0]);

  const specRot3 = useTransform(smoothSpecProgress, [0.08, 0.35], [-10, 0]);
  const specX3 = useTransform(smoothSpecProgress, [0.08, 0.35], [-80, 0]);
  const specY3 = useTransform(smoothSpecProgress, [0.08, 0.35], [100, 0]);

  const specRot4 = useTransform(smoothSpecProgress, [0.08, 0.35], [18, 0]);
  const specX4 = useTransform(smoothSpecProgress, [0.08, 0.35], [130, 0]);
  const specY4 = useTransform(smoothSpecProgress, [0.08, 0.35], [-40, 0]);

  // Specialists Info
  const specialists = [
    {
      name: "Dr. Esteban Benítez",
      role: "Director Médico — Monaco • París",
      desc: "19 años de trayectoria redefiniendo la armonización facial de autor a través de proporciones biométricas indetectables.",
      image: "/assets/dr_esteban_benitez.png",
      rot: specRot1,
      x: specX1,
      y: specY1
    },
    {
      name: "Dra. Alexia Duarte",
      role: "Especialista en Armonización Facial",
      desc: "Mentora internacional en rejuvenecimiento facial volumétrico. Experta en bioestimulación inteligente de tejidos.",
      image: null,
      color: "from-purple-950/45 to-slate-900",
      rot: specRot2,
      x: specX2,
      y: specY2
    },
    {
      name: "Dr. Vinicius Said",
      role: "Cirugía Estructural & HOF",
      desc: "Mestre en cirugía estética facial. Combina técnicas no invasivas con arquitectura ósea para perfiles de alto impacto.",
      image: null,
      color: "from-indigo-950/45 to-slate-900",
      rot: specRot3,
      x: specX3,
      y: specY3
    },
    {
      name: "Dra. Paula Gracietti",
      role: "Láser & Regeneración Celular",
      desc: "Especialista en aparatología de última generación y rejuvenecimiento profundo de la matriz extracelular dérmica.",
      image: null,
      color: "from-fuchsia-950/45 to-slate-900",
      rot: specRot4,
      x: specX4,
      y: specY4
    }
  ];

  // Treatment Categories Info
  const treatments = [
    {
      title: "Full Face",
      subtitle: "Lift Estructural",
      desc: "Armonización global asimétrica. Restauramos los puntos de soporte óseo y graso perdidos por el tiempo mediante ácido hialurónico de alta cohesividad.",
      pill: "Procedimiento de Autor"
    },
    {
      title: "Rinomodelación",
      subtitle: "Estructural",
      desc: "Perfilado preciso de la nariz. Logramos ángulos nasales y proyección de punta ideales utilizando biotecnología sin requerir quirófano.",
      pill: "Precisión Milimétrica"
    },
    {
      title: "Perfilado",
      subtitle: "Labial Clínico",
      desc: "Tratamiento enfocado en devolver volumen y definir el borde labial respetando la proporción áurea. Sin efecto de volumen excesivo artificial.",
      pill: "Armonía de Labios"
    },
    {
      title: "Bioestimuladores",
      subtitle: "de Colágeno",
      desc: "Inyección de ácido poliláctico o hidroxiapatita de calcio. Activación biológica de sus propias células para recuperar la densidad celular de la piel.",
      pill: "Biotecnología Dérmica"
    }
  ];

  const handleScrollToTriage = () => {
    const triageElement = document.getElementById("seccion-triage");
    if (triageElement) {
      triageElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#0A0014] text-zinc-100 select-none">
      
      {/* -----------------------------------------
          NAVBAR CAMALEÓNICO (Fixed Top)
          ----------------------------------------- */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center transition-all duration-500 ease-out border-b ${
          isLightSection 
            ? "bg-white/95 backdrop-blur-md border-zinc-200 text-zinc-900 shadow-sm" 
            : "bg-[#0A0014]/60 backdrop-blur-md border-brand-electric/10 text-white"
        }`}
      >
        <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="font-serif text-xl md:text-2xl tracking-[0.25em] font-semibold uppercase">
            Benítez
          </span>
          <span className={`text-[10px] tracking-[0.4em] uppercase font-light mt-0.5 ${
            isLightSection ? "text-zinc-500" : "text-brand-glow"
          }`}>
            Aesthetic Studio
          </span>
        </div>

        {/* Desktop Menu Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-xs tracking-[0.25em] uppercase font-semibold">
          <a href="#filosofia" className="hover:text-brand-electric transition-colors duration-300">Filosofía</a>
          <a href="#especialistas" className="hover:text-brand-electric transition-colors duration-300">Especialistas</a>
          <a href="#tratamientos" className="hover:text-brand-electric transition-colors duration-300">Tratamientos</a>
          <a href="#testimonios" className="hover:text-brand-electric transition-colors duration-300">Testimonios</a>
        </nav>

        <div className="flex items-center gap-6">
          <MagneticButton
            onClick={handleScrollToTriage}
            className={`text-xs tracking-[0.2em] uppercase font-sans font-bold px-6 py-3.5 rounded-full cursor-pointer transition-all duration-300 ${
              isLightSection
                ? "bg-brand-electric text-white hover:bg-black hover:shadow-[0_4px_15px_rgba(106,15,190,0.3)] border border-brand-glow/20"
                : "bg-white text-[#0A0014] hover:bg-brand-glow hover:shadow-[0_4px_15px_rgba(201,168,245,0.4)]"
            }`}
          >
            Iniciar Admisión
          </MagneticButton>
        </div>
      </header>

      {/* Frame border representing luxury layouts */}
      <div className="fixed inset-0 border-[1px] border-brand-electric/10 pointer-events-none z-30" />

      {/* Floating Indicator (Left) */}
      <div className="fixed bottom-8 left-6 md:left-12 z-40 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
        <span className="text-xs tracking-[0.25em] font-sans text-brand-glow uppercase font-medium">
          Recoleta, Buenos Aires
        </span>
      </div>

      {/* Floating Indicator (Right) */}
      <div className="fixed bottom-8 right-6 md:right-12 z-40 flex flex-col items-end">
        <span className="text-[10px] tracking-[0.25em] text-brand-glow uppercase font-medium">
          Quiet Luxury Estético
        </span>
      </div>


      {/* -----------------------------------------
          ESCENA 1: HERO INMERSIVO CON SMARTPHONE FLOTANTE
          ----------------------------------------- */}
      <section id="filosofia" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-gradient-to-b from-[#0A0014] via-[#0E011C] to-[#0A0014]">
        
        {/* Glows de fondo */}
        <div className="absolute top-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-brand-electric/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-brand-glow/10 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
          
          {/* Columna Izquierda: Mensaje y Beneficios */}
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 bg-brand-purple/40 border border-brand-electric/30 px-4 py-2 rounded-full mb-6 w-fit shadow-inner">
              <SVGCrosshair className="w-4.5 h-4.5 text-brand-neon" />
              <span className="text-xs uppercase tracking-[0.25em] text-white font-semibold font-sans">
                Medicina Estética de Autor
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6 tracking-wide">
              Armonización Facial <br />
              de <span className="italic font-serif font-light text-brand-glow">Élite</span> en Alvear.
            </h1>
            
            <p className="text-sm sm:text-lg text-zinc-300 font-sans font-light tracking-wide max-w-xl leading-relaxed mb-10">
              Resultados indetectables bajo precisión biométrica de autor. Exclusivo para pacientes premium que exigen el máximo estatus y absoluta seguridad en su piel.
            </p>

            {/* Beneficios Fila */}
            <div className="space-y-6 max-w-lg mb-10">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-brand-purple/30 border border-brand-electric/25 flex items-center justify-center text-brand-neon group-hover:border-brand-neon transition-colors duration-300 flex-shrink-0">
                  <SVGShield className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-wide">Insumos FDA & Primeras Marcas</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5 leading-relaxed">Juvederm, Allergan, Restylane. Garantía inquebrantable de bioseguridad clínica.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-brand-purple/30 border border-brand-electric/25 flex items-center justify-center text-brand-neon group-hover:border-brand-neon transition-colors duration-300 flex-shrink-0">
                  <SVGAurea className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-wide">Proporciones Arquitectónicas</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5 leading-relaxed">Anatomía matemática personalizada. Eliminamos el exceso de inyección artificial.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-brand-purple/30 border border-brand-electric/25 flex items-center justify-center text-brand-neon group-hover:border-brand-neon transition-colors duration-300 flex-shrink-0">
                  <SVGCell className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-wide">19 Años de Maestría</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5 leading-relaxed">Formación internacional continua del Dr. Esteban Benítez en Monaco, París y Brasil.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-brand-glow text-xs tracking-[0.25em] uppercase font-bold">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4.5 h-4.5 text-brand-neon" />
              </motion.div>
              <span>Deslice para descubrir la experiencia de admisión</span>
            </div>
          </motion.div>

          {/* Columna Derecha: Smartphone Flotante, Overlays SVG y Satélites Compactos */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-12 lg:py-0 min-h-[520px] lg:min-h-auto z-10">
            
            {/* Cosmos Starfield de Fondo (Visual circular traslúcido) */}
            <div className="absolute w-[340px] h-[340px] md:w-[480px] md:h-[480px] rounded-full border border-brand-electric/15 flex items-center justify-center z-0 animate-[spin_60s_linear_infinite]">
              <div className="absolute w-[260px] h-[260px] rounded-full border border-brand-glow/10" />
              <div className="absolute w-[180px] h-[180px] rounded-full border border-brand-electric/20 border-dashed" />
            </div>

            {/* =========================================
                SMARTPHONE CONTAINER FLOTANTE
                ========================================= */}
            <motion.div
              style={{ y: phoneScrollY, scale: phoneScale }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative w-[210px] h-[430px] md:w-[240px] md:h-[490px] bg-zinc-950 border-[5px] border-zinc-800 rounded-[36px] shadow-[0_25px_60px_-12px_rgba(106,15,190,0.6)] overflow-hidden z-20 flex items-center justify-center"
            >
              {/* Notch superior */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-800 rounded-b-xl z-30 flex justify-center items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mr-2" />
                <span className="w-8 h-1 bg-zinc-900 rounded-full" />
              </div>

              {/* Video en loop dentro de la pantalla */}
              <video
                src="/assets/smartphone_video.mp4"
                preload="auto"
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover z-10 select-none"
              />

              {/* HUD OVERLAY VECTORIAL SVG DINÁMICO */}
              <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    d="M25,25 L45,22 L50,15 L55,22 L75,25 L65,48 L50,68 L35,48 Z M50,15 L50,68 M45,22 L55,22 M35,48 L65,48"
                    fill="none"
                    stroke="#00FF6A"
                    strokeWidth="0.3"
                    strokeOpacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M25,25 L50,42 L75,25 M35,48 L50,42 L65,48"
                    fill="none"
                    stroke="#C9A8F5"
                    strokeWidth="0.25"
                    strokeOpacity="0.35"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                  />
                  <motion.circle cx="50" cy="42" r="1.2" fill="#00FF6A" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} />
                  <motion.circle cx="32" cy="35" r="1" fill="#00FF6A" animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }} />
                  <motion.circle cx="68" cy="35" r="1" fill="#00FF6A" animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }} transition={{ repeat: Infinity, duration: 2.2, delay: 0.9 }} />
                  <motion.circle cx="50" cy="15" r="1.3" fill="#6A0FBE" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0 }} />
                  <motion.circle cx="50" cy="54" r="1.1" fill="#6A0FBE" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }} transition={{ repeat: Infinity, duration: 2.5, delay: 1.2 }} />
                  <motion.circle cx="50" cy="68" r="1.2" fill="#00FF6A" animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }} transition={{ repeat: Infinity, duration: 2, delay: 1.5 }} />
                </svg>
              </div>
            </motion.div>

            {/* =========================================
                SATÉLITES REDISEÑADOS (Cercanos, Grandes, Glassmorphism, Hover 3D)
                ========================================= */}
            {/* Satélite 1: Izquierda Arriba */}
            <motion.div
              style={{ y: sat1ScrollY }}
              animate={{ y: [0, 5, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.08, 
                zIndex: 30, 
                borderColor: "rgba(0, 255, 106, 0.8)", 
                boxShadow: "0 0 25px rgba(0, 255, 106, 0.4)" 
              }}
              className="absolute left-[5px] md:left-[15px] top-[12%] w-[160px] md:w-[185px] bg-[#0A0014]/75 backdrop-blur-xl border border-white/20 p-4 rounded-2xl z-20 shadow-[0_8px_32px_rgba(106,15,190,0.2)] hover:border-brand-neon transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-brand-neon font-bold">MÉTODO</span>
              </div>
              <span className="text-sm md:text-base font-bold text-white block">Biometría</span>
              <span className="text-xs text-zinc-400 block mt-1 font-light leading-snug">Ángulos Naturales Perfectos</span>
            </motion.div>

            {/* Satélite 2: Derecha Medio (Procedimiento) */}
            <motion.div
              style={{ y: sat2ScrollY }}
              animate={{ y: [0, -7, 0], rotate: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.08, 
                zIndex: 30, 
                borderColor: "rgba(0, 255, 106, 0.8)", 
                boxShadow: "0 0 25px rgba(0, 255, 106, 0.4)" 
              }}
              className="absolute right-[5px] md:right-[15px] top-[26%] w-[160px] md:w-[185px] bg-[#0A0014]/75 backdrop-blur-xl border border-white/20 p-4 rounded-2xl z-10 shadow-[0_8px_32px_rgba(106,15,190,0.2)] hover:border-brand-neon transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-20 rounded-xl bg-gradient-to-br from-brand-electric/40 to-[#0A0014] mb-3 flex items-center justify-center text-brand-glow border border-brand-electric/25 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(106,15,190,0.3)_0%,_transparent_70%)] animate-pulse" />
                <SVGAurea className="w-6 h-6 text-brand-neon" />
              </div>
              <span className="text-sm md:text-base font-bold text-white block">Juvederm Voluma</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-glow block mt-1 font-semibold">ESTRUCTURA DE AUTOR</span>
            </motion.div>

            {/* Satélite 3: Izquierda Abajo (Stats) */}
            <motion.div
              style={{ y: sat3ScrollY }}
              animate={{ y: [0, -5, 0], rotate: [-1, 2, -1] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.08, 
                zIndex: 30, 
                borderColor: "rgba(0, 255, 106, 0.8)", 
                boxShadow: "0 0 25px rgba(0, 255, 106, 0.4)" 
              }}
              className="absolute left-[-5px] md:left-[5px] bottom-[16%] w-[160px] md:w-[185px] bg-[#0E011C]/90 backdrop-blur-xl border border-white/20 p-4 rounded-2xl z-20 shadow-[0_8px_32px_rgba(106,15,190,0.2)] hover:border-brand-neon transition-all duration-300 cursor-pointer text-center"
            >
              <div className="flex justify-center text-amber-500 mb-2">
                <SVGCrosshair className="w-5 h-5 text-brand-neon" />
              </div>
              <span className="text-sm md:text-base font-bold text-white block">Certificado</span>
              <span className="text-[10px] text-zinc-400 block uppercase tracking-widest mt-1 font-medium">Allergan FDA</span>
            </motion.div>

            {/* Satélite 4: Derecha Abajo */}
            <motion.div
              style={{ y: sat4ScrollY }}
              animate={{ y: [0, 6, 0], rotate: [1, -2, 1] }}
              transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.08, 
                zIndex: 30, 
                borderColor: "rgba(0, 255, 106, 0.8)", 
                boxShadow: "0 0 25px rgba(0, 255, 106, 0.4)" 
              }}
              className="absolute right-[-5px] md:right-[5px] bottom-[6%] w-[160px] md:w-[185px] bg-[#0A0014]/75 backdrop-blur-xl border border-white/20 p-4 rounded-2xl z-10 shadow-[0_8px_32px_rgba(106,15,190,0.2)] hover:border-brand-neon transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-brand-neon font-bold">ESTUDIO</span>
              </div>
              <span className="text-sm md:text-base font-bold text-white block">Recoleta</span>
              <span className="text-xs text-zinc-400 block mt-1 font-light leading-snug">Av. Alvear Privado</span>
            </motion.div>

          </div>

        </div>

      </section>


      {/* -----------------------------------------
          ESCENA 2: MÉTRICAS CON CONTADOR ANIMADO
          ----------------------------------------- */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#0A0014] border-t border-b border-brand-electric/15">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatsCounter value="19" label="Años de Excelencia Clínica" icon={SVGAurea} />
          <StatsCounter value="+26Mil" label="Procedimientos de Autor" icon={SVGCrosshair} />
          <StatsCounter value="3" label="Congresos Monaco/París" icon={SVGCell} />
        </div>
      </section>


      {/* -----------------------------------------
          ESCENA 3: DOS NUEVOS PERFILES DE PACIENTES (ANIMACIONES INTERACTIVAS)
          ----------------------------------------- */}
      <section className="relative py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#0A0014] to-[#0E011C]">
        
        {/* Glow */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full bg-brand-electric/10 blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-neon font-bold block mb-4">La Fricción Estética</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
              Dos Caminos Clínicos. <br />
              <span className="italic font-light text-brand-glow">Una Solución de Autor.</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-300 font-light mt-4 leading-relaxed">
              El mercado de volumen inyecta bajo promoción comercial. Nosotros restauramos la estructura anatómica y biológica perdida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            
            {/* Tarjeta Perfil 1 */}
            <motion.div 
              whileHover={{ 
                y: -10, 
                borderColor: "rgba(0, 255, 106, 0.5)", 
                boxShadow: "0 0 35px rgba(106, 15, 190, 0.25)" 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-brand-purple/20 backdrop-blur-md border border-brand-electric/30 rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-xl relative group overflow-hidden cursor-pointer"
            >
              <div className="absolute -top-[10%] -right-[10%] w-[150px] h-[150px] bg-brand-electric/20 rounded-full blur-[60px] group-hover:bg-brand-electric/30 transition-all duration-500" />
              <div>
                <div className="w-12 h-12 rounded-full bg-brand-electric/25 border border-brand-electric/40 flex items-center justify-center text-brand-neon mb-8">
                  <SVGAurea className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">El Deterioro Estructural</h3>
                <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed mb-6">
                  Con el paso del tiempo, el soporte graso y la estructura ósea facial descienden. Inyectar volumen masivo sin analizar los puntos de tracción genera rostros inflados e inexpresivos. La clave es la restauración milimétrica de vectores.
                </p>
              </div>
              
              {/* Gráfico SVG interactivo dinámico */}
              <div className="w-full h-24 bg-[#0A0014]/40 border border-brand-electric/20 rounded-2xl overflow-hidden mt-6 relative flex items-center justify-center p-4">
                <svg className="w-full h-full text-zinc-700" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="0.6">
                  <path d="M10,5 C20,5 25,15 25,20 C25,25 20,35 10,35" strokeDasharray="1 2" strokeOpacity="0.4" />
                  <motion.path 
                    d="M45,10 L45,30" 
                    stroke="#FF3B30" 
                    strokeWidth="1"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                  <path d="M42,27 L45,30 L48,27" stroke="#FF3B30" strokeWidth="1" />
                  
                  {/* Vector de lift (se dibuja en hover) */}
                  <motion.path 
                    d="M75,30 L75,10" 
                    stroke="#00FF6A" 
                    strokeWidth="1.2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                    className="group-hover:stroke-brand-neon"
                  />
                  <path d="M72,13 L75,10 L78,13" stroke="#00FF6A" strokeWidth="1.2" />

                  <text x="58" y="23" textAnchor="middle" fill="#FF3B30" className="text-[5px] font-mono uppercase tracking-widest font-bold">Gravedad</text>
                  <text x="88" y="23" textAnchor="middle" fill="#00FF6A" className="text-[5px] font-mono uppercase tracking-widest font-bold">Lift</text>
                </svg>
              </div>

              <div className="border-t border-brand-electric/15 pt-6 mt-8 flex items-center justify-between text-xs font-semibold text-brand-glow uppercase tracking-wider">
                <span>Tratamiento: Full Face Lift</span>
                <span className="text-brand-neon">Juvederm Voluma</span>
              </div>
            </motion.div>

            {/* Tarjeta Perfil 2 */}
            <motion.div 
              whileHover={{ 
                y: -10, 
                borderColor: "rgba(0, 255, 106, 0.5)", 
                boxShadow: "0 0 35px rgba(106, 15, 190, 0.25)" 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-brand-purple/20 backdrop-blur-md border border-brand-electric/30 rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-xl relative group overflow-hidden cursor-pointer"
            >
              <div className="absolute -top-[10%] -right-[10%] w-[150px] h-[150px] bg-brand-glow/15 rounded-full blur-[60px] group-hover:bg-brand-glow/25 transition-all duration-500" />
              <div>
                <div className="w-12 h-12 rounded-full bg-brand-electric/25 border border-brand-electric/40 flex items-center justify-center text-brand-neon mb-8">
                  <SVGCrosshair className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4">La Pérdida de Armonía de Autor</h3>
                <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed mb-6">
                  Muchos pacientes asisten con rinomodelaciones previas caídas o labios sin perfil natural debido a técnicas incorrectas. Rediseñamos los ángulos del rostro respetando la proporción áurea y recuperando la clase en la expresión facial.
                </p>
              </div>

              {/* Gráfico SVG interactivo dinámico */}
              <div className="w-full h-24 bg-[#0A0014]/40 border border-brand-electric/20 rounded-2xl overflow-hidden mt-6 relative flex items-center justify-center p-4">
                <svg className="w-full h-full text-zinc-700" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="0.6">
                  <circle cx="50" cy="20" r="14" strokeOpacity="0.2" strokeDasharray="1 2" />
                  <circle cx="50" cy="20" r="8" strokeOpacity="0.4" />
                  <motion.path 
                    d="M15,20 H85" 
                    stroke="#00FF6A" 
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.circle 
                    cx="50" 
                    cy="20" 
                    r="2" 
                    fill="#00FF6A" 
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <text x="50" y="37" textAnchor="middle" fill="#00FF6A" className="text-[5px] font-mono uppercase tracking-widest font-bold">Proporciones de Autor Alineadas</text>
                </svg>
              </div>

              <div className="border-t border-brand-electric/15 pt-6 mt-8 flex items-center justify-between text-xs font-semibold text-brand-glow uppercase tracking-wider">
                <span>Tratamiento: Perfilado de Autor</span>
                <span className="text-brand-neon">Rinomodelación</span>
              </div>
            </motion.div>

          </div>
        </div>

      </section>


      {/* -----------------------------------------
          ESCENA 4: DISEÑO DE AUTOR (SPRING SCATTER-TO-GRID) - FONDO CLARO
          ----------------------------------------- */}
      <section 
        id="especialistas"
        ref={specialistsSectionRef}
        className="relative py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#F5F5F3] text-zinc-900 transition-colors duration-500 ease-out z-10"
      >
        <div className="max-w-7xl mx-auto w-full relative">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-28">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold block mb-4">Filosofía Médica</span>
            <h2 className="text-4xl md:text-6xl font-serif text-zinc-950 leading-tight">
              Diseño de Autor <br />
              <span className="italic font-light font-serif text-zinc-600">Perfectamente Alineado</span>
            </h2>
            <p className="text-sm md:text-base text-zinc-500 font-light mt-4 max-w-lg mx-auto leading-relaxed">
              Al hacer scroll, contemple cómo el desorden y la asimetría se ordenan bajo precisión clínica en nuestra grilla de profesionales calificados con un movimiento magnético amortiguado.
            </p>
          </div>

          {/* =========================================
              GRID ESPECIALISTAS (SPRING SCATTER-TO-GRID)
              ========================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialists.map((spec, index) => {
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              
              const style = isMobile ? {} : {
                rotate: spec.rot,
                x: spec.x,
                y: spec.y,
              };

              return (
                <motion.div
                  key={index}
                  style={style}
                  className="bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(106,15,190,0.12)] transition-all duration-500 flex flex-col justify-between h-[470px] group cursor-pointer"
                >
                  {/* Photo area */}
                  <div className="h-[270px] bg-zinc-100 relative overflow-hidden flex items-center justify-center">
                    {spec.image ? (
                      <img 
                        src={spec.image} 
                        alt={spec.name} 
                        className="w-full h-full object-cover filter contrast-105 saturate-75 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-y-[-5px]"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${spec.color} flex items-center justify-center text-zinc-400 relative transition-transform duration-700 ease-out group-hover:scale-110`}>
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                        <span className="font-serif italic text-lg opacity-40">Facial Academy</span>
                      </div>
                    )}
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-sans font-semibold">FACIAL ACADEMY</span>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white z-10">
                    <div>
                      <h4 className="text-lg font-bold text-zinc-950 font-serif leading-tight">{spec.name}</h4>
                      <p className="text-xs uppercase tracking-wider text-brand-electric font-bold mt-1">{spec.role}</p>
                      <p className="text-xs md:text-sm text-zinc-500 font-light mt-3 leading-relaxed line-clamp-3">{spec.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Clinical Quote */}
          <div className="mt-24 pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-2xl font-serif italic text-zinc-900">"La belleza no se inyecta, se diseña."</span>
              <p className="text-xs uppercase tracking-widest text-zinc-400 mt-1 block font-medium">Dr. Esteban Benítez — Alvear 1845</p>
            </div>
            <div className="flex gap-6 opacity-45 select-none text-xs font-bold tracking-widest text-zinc-950 uppercase font-mono">
              <span>JUVÉDERM</span>
              <span>RESTYLANE</span>
              <span>BOTOX</span>
            </div>
          </div>

        </div>
      </section>


      {/* -----------------------------------------
          ESCENA 5: TRATAMIENTOS / CATEGORÍAS (INTERACTIVOS CON ESQUEMA SVG DINÁMICO)
          ----------------------------------------- */}
      <section id="tratamientos" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#0A0014] to-[#0E011C] overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-brand-electric/15 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-neon font-bold block mb-4">Estudio Clínico</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
              Protocolos e <br />
              <span className="italic font-light text-brand-glow">Intervenciones Estructurales</span>
            </h2>
          </div>

          {/* Split Layout: Pestañas a la izquierda, Visualizador SVG dinámico a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Lado izquierdo (Pestañas Interactivas) */}
            <div className="lg:col-span-6 space-y-4">
              {treatments.map((t, idx) => {
                const isActive = idx === activeCategory;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCategory(idx)}
                    className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                      isActive 
                        ? "bg-brand-electric/30 border-brand-neon shadow-[0_10px_25px_rgba(106,15,190,0.2)]" 
                        : "bg-brand-purple/20 border-brand-electric/20 hover:border-brand-electric/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${
                        isActive ? "bg-brand-neon/10 border-brand-neon text-brand-neon" : "bg-brand-purple/40 border-brand-electric/30 text-brand-glow"
                      }`}>
                        {t.pill}
                      </span>
                      <span className="font-mono text-xs text-brand-glow font-bold">0{idx + 1}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-2 leading-none">
                      {t.title} <span className="italic font-light text-brand-glow">{t.subtitle}</span>
                    </h3>
                    <p className={`text-xs sm:text-sm font-light leading-relaxed mt-2 transition-all ${
                      isActive ? "text-zinc-200" : "text-zinc-400 line-clamp-2"
                    }`}>
                      {t.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Lado derecho (Visualizador Diagnóstico SVG Dinámico) */}
            <div className="lg:col-span-6">
              <TreatmentVisual activeCategory={activeCategory} />
            </div>

          </div>

          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {treatments.map((_, idx) => (
              <span 
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  idx === activeCategory ? "bg-brand-neon w-6" : "bg-brand-electric/30"
                }`}
              />
            ))}
          </div>

        </div>
      </section>


      {/* -----------------------------------------
          ESCENA 6: TESTIMONIOS (TEXT GIAN MARQUEE)
          ----------------------------------------- */}
      <section id="testimonios" className="relative py-20 px-6 md:px-12 bg-[#0A0014]">
        <div className="max-w-7xl mx-auto w-full bg-brand-electric border border-brand-glow/10 rounded-[32px] md:rounded-[48px] py-16 md:py-24 overflow-hidden relative shadow-[0_20px_50px_rgba(106,15,190,0.3)]">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none" />

          {/* Marquee Text Scrolling */}
          <div className="flex whitespace-nowrap overflow-hidden py-4 select-none relative z-10">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex gap-16 text-6xl md:text-8xl font-serif font-bold text-white uppercase italic tracking-wider leading-none"
            >
              <span>Resultados reales que reflejan excelencia clínica ·</span>
              <span>Resultados reales que reflejan excelencia clínica ·</span>
              <span>Resultados reales que reflejan excelencia clínica ·</span>
            </motion.div>
          </div>

          <div className="text-center max-w-2xl mx-auto px-6 mt-10 relative z-10">
            <p className="text-sm sm:text-lg text-zinc-100 font-light leading-relaxed">
              "La discreción y la precisión matemática del Dr. Benítez cambiaron por completo mi concepto de estética facial. Un resultado natural, elegante e indetectable. El triage clínico inicial marca la diferencia."
            </p>
            <span className="text-xs uppercase tracking-widest text-brand-neon font-bold block mt-6">Pacientes VIP — Recoleta</span>
          </div>

        </div>
      </section>


      {/* -----------------------------------------
          ESCENA 7: TRIAGE ESTÉTICO (FORMULARIO)
          ----------------------------------------- */}
      <section id="seccion-triage" className="relative py-24 md:py-36 px-6 md:px-12 bg-gradient-to-b from-[#0A0014] to-[#05000A] border-t border-brand-electric/15">
        
        {/* Glow */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-brand-electric/10 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">
          <TriageForm />
        </div>

        {/* Footer */}
        <footer className="w-full max-w-6xl mx-auto border-t border-brand-electric/15 pt-8 mt-24 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-[10px] tracking-[0.25em] uppercase font-light">
            <div>
              Benítez Aesthetic Studio © 2026. Todos los derechos reservados.
            </div>
            <div className="text-brand-glow">
              Av. Alvear 1845, Piso 4, Recoleta, CABA.
            </div>
            <div>
              Arquitectura de Diseño por <span className="italic text-white">Saint DAC</span>
            </div>
          </div>
        </footer>
      </section>

    </div>
  );
}
