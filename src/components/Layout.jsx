import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Image, ShieldCheck, Type, X } from "lucide-react";
import Hero from "./Hero";
import Metrics from "./Metrics";
import PatientProfiles from "./PatientProfiles";
import Treatments from "./Treatments";
import Professionals from "./Professionals";
import TestimonialsMarquee from "./TestimonialsMarquee";
import TriageForm from "./TriageForm";
import MagneticButton from "./MagneticButton";


const FONT_THEMES = [
  {
    id: "luxury",
    name: "Quiet Luxury",
    display: "'Zodiak', 'Cormorant Garamond', Georgia, serif",
    body: "'Satoshi', sans-serif",
    tagline: "Estilo Editorial Premium",
    preview: "Zodiak & Satoshi",
    displaySample: "Esteban Benítez",
    bodySample: "Armonización de autor en el corazón de Recoleta."
  },
  {
    id: "avantgarde",
    name: "Editorial Avant-Garde",
    display: "'Melodrama', 'Bodoni Moda', serif",
    body: "'Chillax', sans-serif",
    tagline: "Curvas Orgánicas y Alta Costura",
    preview: "Melodrama & Chillax",
    displaySample: "Diseño de Autor",
    bodySample: "Simetría perfecta y restauración biológica de vectores."
  },
  {
    id: "scifi",
    name: "Neo-Futurism",
    display: "'Clash Display', 'Syne', sans-serif",
    body: "'Cabinet Grotesk', sans-serif",
    tagline: "Vanguardia de Alta Precisión",
    preview: "Clash & Cabinet",
    displaySample: "Biotecnología",
    bodySample: "Algoritmos anatómicos y restauración bioestimuladora."
  },
  {
    id: "poet",
    name: "Artistic Poet",
    display: "'Instrument Serif', serif",
    body: "'Satoshi', sans-serif",
    tagline: "Líneas Condensadas Poéticas",
    preview: "Instrument & Satoshi",
    displaySample: "Proporción Áurea",
    bodySample: "Restauración tridimensional de pacientes de alto estándar."
  },
  {
    id: "cyber",
    name: "Cyber Brutalist",
    display: "'Unbounded', sans-serif",
    body: "'Space Grotesk', sans-serif",
    tagline: "Brutalismo Expresivo e Imponente",
    preview: "Unbounded & Space",
    displaySample: "Estructura Neo",
    bodySample: "Diseño subdérmico con hialurónico de ultra densidad."
  },
  {
    id: "minimal",
    name: "Pure Minimalist",
    display: "'Italiana', serif",
    body: "'Outfit', sans-serif",
    tagline: "Líneas Ultrafinas y Purismo",
    preview: "Italiana & Outfit",
    displaySample: "Clínica de Autor",
    bodySample: "Estructuras faciales talladas con precisión matemática."
  }
];

export default function Layout() {
  const [activeView, setActiveView] = useState("main"); // 'main' | 'galeria'
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef(null);
  const [fontTheme, setFontTheme] = useState("luxury");
  const [isFontPanelOpen, setIsFontPanelOpen] = useState(false);

  const currentTheme = FONT_THEMES.find((t) => t.id === fontTheme) || FONT_THEMES[0];

  const scrollToSection = (id) => {
    setActiveView("main");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      className="min-h-screen bg-brand-dark text-zinc-100 selection:bg-brand-royal/30 relative overflow-hidden font-sans"
      style={{
        "--font-serif": currentTheme.display,
        "--font-sans": currentTheme.body,
        "--font-display": currentTheme.display,
        "--font-body": currentTheme.body
      }}
    >
      {/* Background glow effects - Royal Violet */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-royal/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-purple/20 blur-[150px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-45 bg-brand-dark/20 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - Premium Diamond Icon */}
          <div 
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden glass-panel">
              <div className="absolute inset-0 bg-brand-royal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Premium geometric SVG logo */}
              <svg className="w-5.5 h-5.5 text-brand-neon relative z-10 transition-transform duration-700 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 2L2 12l10 10 10-10L12 2z" />
                <path d="M12 6L6 12l6 6 6-6-6-6z" strokeDasharray="3 3" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <span className="font-serif italic font-light tracking-[0.3em] text-[13px] sm:text-sm text-white uppercase opacity-90 group-hover:text-brand-glow transition-colors duration-300">
              BENÍTEZ
            </span>
          </div>

          {/* Nav Links with sliding indicator */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { id: "home", label: "Home", action: () => scrollToSection("hero"), active: activeView === "main" && typeof window !== "undefined" && !window.location.hash.includes("filosofia") && !window.location.hash.includes("tratamientos") && !window.location.hash.includes("profesionales") && !window.location.hash.includes("testimonios") },
              { id: "filosofia", label: "Filosofía", action: () => scrollToSection("filosofia"), active: false },
              { id: "tratamientos", label: "Tratamientos", action: () => scrollToSection("tratamientos"), active: false },
              { id: "equipo", label: "Equipo", action: () => scrollToSection("profesionales"), active: false },
              { id: "testimonios", label: "Testimonios", action: () => scrollToSection("testimonios"), active: false },
              { id: "galeria", label: "Galería", action: () => setActiveView("galeria"), active: activeView === "galeria" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={link.action}
                className={`relative py-2 text-xs sm:text-[13px] uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer group ${
                  link.active ? "text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {link.active && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-royal"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!link.active && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-royal/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </button>
            ))}
          </nav>

          {/* Call to action (Triage admission) wrapped in MagneticButton */}
          <div>
            <MagneticButton
              onClick={() => scrollToSection("triage")}
              className="px-6 py-2.5 rounded-full bg-brand-cream text-brand-dark transition-all duration-500 cursor-pointer flex items-center justify-between gap-4 group text-xs sm:text-[12px] uppercase tracking-[0.18em] font-bold overflow-hidden border border-white/10 hover:shadow-[0_10px_25px_rgba(128,0,255,0.25)]"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Calificar</span>
              <div className="w-5 h-5 rounded-full bg-brand-dark text-brand-cream flex items-center justify-center relative z-10 group-hover:bg-brand-cream group-hover:text-brand-dark group-hover:translate-x-1 transition-all duration-500">
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-brand-royal translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeView === "main" ? (
          <motion.main
            key="main-site"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pt-20"
          >
            <Hero setActiveView={setActiveView} />
            <Metrics />
            <div id="filosofia">
              <PatientProfiles />
            </div>
            <Treatments />
            <Professionals />
            <TestimonialsMarquee />
            
            {/* Triage Section */}
            <section id="triage" className="py-24 border-t border-brand-royal/10 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/10 to-transparent pointer-events-none" />
              <div className="max-w-7xl mx-auto px-6">
                <TriageForm />
              </div>
            </section>
          </motion.main>
        ) : (
          <motion.div
            key="gallery-site"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pt-20 min-h-screen flex flex-col items-center justify-center px-6 relative"
          >
            {/* Before / After Interactive Gallery Showcase */}
            <div className="max-w-3xl w-full text-center py-20 space-y-10 relative z-10">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl border border-brand-royal/30 flex items-center justify-center mx-auto mb-2 glass-panel float-slow-effect">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-ping" />
                </div>
                <h1 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
                  Casos de Estudio <span className="italic font-light text-brand-glow">&amp; Perfección Médica</span>
                </h1>
                <p className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase">
                  Simetría Estructural Avanzada — Rinomodelación y Armonización Facial de Autor
                </p>
              </div>
              
              {/* Interactive Before/After slider component */}
              <div 
                ref={sliderContainerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                data-cursor="deslizar"
                className="aspect-[16/10] w-full rounded-[2.5rem] bg-brand-dark border border-white/5 relative overflow-hidden select-none shadow-[0_30px_70px_rgba(0,0,0,0.8)] glass-panel cursor-ew-resize group"
              >
                {/* BEFORE IMAGE PANEL (Background) */}
                <div className="absolute inset-0 w-full h-full bg-brand-purple/20 flex flex-col items-center justify-center p-8">
                  {/* Fine micro-reticle vector clinical background pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(128,0,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(128,0,255,0.15)_1px,transparent_1px)] bg-[size:30px_30px]" />
                  
                  {/* Clinical profile blueprint SVG */}
                  <svg className="w-24 h-24 text-zinc-600 mb-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                    <path d="M30,25 C33,23 37,23 40,25 C45,28 47,38 47,43 C47,52 38,62 30,70" />
                    <circle cx="47" cy="43" r="2" fill="currentColor" fillOpacity="0.4" />
                    <line x1="30" y1="43" x2="65" y2="43" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.3" />
                  </svg>
                  <div className="text-sm font-serif italic text-zinc-400">Pérdida de soporte estructural nasal</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2 font-mono">Déficit de volumen en proyección malar</div>
                  
                  {/* Label tag */}
                  <span className="absolute bottom-6 left-6 px-3 py-1 rounded-md border border-white/10 bg-brand-dark/60 text-[9px] uppercase tracking-widest text-zinc-500 font-semibold backdrop-blur-md">
                    Antes: Perfil Pre-Tratamiento
                  </span>
                </div>

                {/* AFTER IMAGE PANEL (Sliding overlay) */}
                <div 
                  className="absolute inset-0 h-full overflow-hidden bg-brand-royal/5 border-r border-brand-neon/20 z-10"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div 
                    className="absolute inset-0 h-full bg-brand-royal/[0.08] flex flex-col items-center justify-center p-8"
                    style={{ width: `${sliderContainerRef.current?.getBoundingClientRect().width || 600}px` }}
                  >
                    {/* Glowing satin organic background glow */}
                    <div className="absolute w-[80%] h-[80%] rounded-full bg-brand-royal/15 blur-3xl pointer-events-none" />
                    <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(0,255,191,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,191,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
                    
                    {/* Corrected profile blueprint SVG */}
                    <svg className="w-24 h-24 text-brand-neon mb-4" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M30,25 C34,24 38,24 42,25 C48,27 52,38 52,43 C52,50 42,62 30,70" strokeLinecap="round" />
                      <circle cx="52" cy="43" r="2" fill="currentColor" className="animate-pulse" />
                      <line x1="30" y1="43" x2="65" y2="43" stroke="currentColor" strokeDasharray="2 2" strokeOpacity="0.4" />
                      <path d="M42,25 L52,43" stroke="currentColor" strokeDasharray="1 1" />
                    </svg>
                    <div className="text-sm font-serif italic text-white font-semibold">Proyección del dorso nasal corregida</div>
                    <div className="text-[10px] text-brand-neon uppercase tracking-widest mt-2 font-mono">Volumetría restaurada con Juvederm Volux</div>

                    {/* Label tag */}
                    <span className="absolute bottom-6 left-6 px-3 py-1 rounded-md border border-brand-neon/20 bg-brand-dark/80 text-[9px] uppercase tracking-widest text-brand-neon font-semibold backdrop-blur-md shadow-[0_0_10px_rgba(0,255,191,0.1)]">
                      Después: Definición Estructural Inmediata
                    </span>
                  </div>
                </div>

                {/* Slider Handle (Divider Bar) */}
                <div 
                  className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-brand-neon/40 via-brand-neon to-brand-neon/40 z-20 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 slider-handle">
                    <svg className="w-4 h-4 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 4 4 4m8-8l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Back navigation */}
              <div className="pt-4">
                <button
                  onClick={() => setActiveView("main")}
                  className="text-[9px] uppercase tracking-[0.3em] text-brand-glow hover:text-white transition-all cursor-pointer inline-flex items-center gap-2 group font-semibold"
                >
                  <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> Volver al inicio
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - Elegant minimalist border and layout */}
      <footer className="py-24 border-t border-white/[0.03] bg-brand-dark/95 relative z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-zinc-500 font-light text-[10px] tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
            <span>Av. Alvear 1845, Piso 4, Recoleta, Buenos Aires</span>
          </div>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
            <a href="#triage" onClick={() => scrollToSection("triage")} className="hover:text-brand-glow transition-colors">Triage de Admisión</a>
            <span className="text-zinc-800">|</span>
            <span>© {new Date().getFullYear()} Benítez Aesthetic Studio</span>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Glass Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-45 md:hidden w-[90%] max-w-xs glass-panel-frosted rounded-full py-3 px-6 flex items-center justify-between border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        {[
          { id: "hero", label: "Inicio", icon: Home, action: () => scrollToSection("hero"), active: activeView === "main" },
          { id: "tratamientos", label: "Tratar", icon: Sparkles, action: () => scrollToSection("tratamientos"), active: activeView === "main" },
          { id: "galeria", label: "Galería", icon: Image, action: () => setActiveView("galeria"), active: activeView === "galeria" },
          { id: "triage", label: "Filtro", icon: ShieldCheck, action: () => scrollToSection("triage"), active: false }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                item.active ? "text-brand-neon scale-110" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[8.5px] uppercase tracking-wider font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Typography Selector Trigger */}
      <div className="fixed right-6 bottom-24 md:bottom-6 z-50">
        <button
          onClick={() => setIsFontPanelOpen(!isFontPanelOpen)}
          className="w-12 h-12 rounded-full glass-panel-frosted flex items-center justify-center text-white border border-white/10 hover:border-brand-royal hover:text-brand-glow transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] cursor-pointer relative group"
          title="Dirección Artística: Tipografía"
        >
          <Type className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute right-14 bg-brand-dark/95 border border-white/10 text-white text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap backdrop-blur-md">
            Dirección Artística
          </span>
        </button>
      </div>

      {/* Typography Selector Panel */}
      <AnimatePresence>
        {isFontPanelOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFontPanelOpen(false)}
              className="fixed inset-0 bg-brand-dark/65 backdrop-blur-sm z-48 md:hidden"
            />

            {/* Panel container */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-4 bottom-24 md:bottom-20 z-49 w-[calc(100vw-32px)] sm:w-[380px] max-h-[70vh] md:max-h-[580px] overflow-y-auto rounded-[2rem] glass-panel-frosted border border-white/10 p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] no-scrollbar"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <div>
                  <h3 className="text-[9px] uppercase tracking-[0.2em] text-brand-neon font-bold">Estudio de Diseño</h3>
                  <h2 className="text-base font-serif text-white italic">Curaduría Tipográfica</h2>
                </div>
                <button
                  onClick={() => setIsFontPanelOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Theme Options */}
              <div className="space-y-4">
                {FONT_THEMES.map((theme) => {
                  const isActive = theme.id === fontTheme;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setFontTheme(theme.id)}
                      className={`w-full text-left p-4.5 rounded-[1.5rem] border transition-all duration-500 cursor-pointer relative overflow-hidden group ${
                        isActive
                          ? "bg-brand-royal/20 border-brand-royal/50 shadow-[0_10px_20px_rgba(128,0,255,0.15)]"
                          : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.03]"
                      }`}
                    >
                      {/* Active indicator glow */}
                      {isActive && (
                        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-brand-neon m-3 shadow-[0_0_10px_rgba(0,255,191,0.8)]" />
                      )}

                      {/* Preview labels */}
                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition-colors font-sans">
                            {theme.name}
                          </span>
                          <span className="text-[7.5px] font-mono text-zinc-600 bg-white/5 px-2 py-0.5 rounded">
                            {theme.preview}
                          </span>
                        </div>

                        {/* Large Font Sample */}
                        <div 
                          className="text-xl text-white tracking-wide font-normal"
                          style={{ fontFamily: theme.display }}
                        >
                          {theme.displaySample}
                        </div>

                        {/* Body Sample */}
                        <div 
                          className="text-[10px] text-zinc-400 leading-normal"
                          style={{ fontFamily: theme.body }}
                        >
                          {theme.bodySample}
                        </div>

                        {/* Tagline */}
                        <div className="text-[7px] uppercase tracking-widest text-brand-glow pt-1.5 border-t border-white/[0.03]">
                          {theme.tagline}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanatory footer */}
              <p className="text-[8px] text-zinc-500 uppercase tracking-widest text-center mt-6">
                Cambia la identidad tipográfica de la clínica en tiempo real.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
