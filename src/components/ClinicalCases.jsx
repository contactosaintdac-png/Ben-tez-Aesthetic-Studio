import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MoveHorizontal } from "lucide-react";

const CLINICAL_CASES = [
  {
    id: "01",
    title: "Proyección Malar y Mandibular",
    subtitle: "Reposicionamiento estructural del tercio medio",
    beforeImg: "/assets/case_01_before.jpg",
    afterImg: "/assets/case_01_after.jpg",
    details: [
      { label: "TÉCNICA", value: "Volumetría Cohesiva" },
      { label: "INSUMO", value: "Juvederm Voluma" },
      { label: "RESULTADO", value: "Soporte Maxilar" }
    ]
  },
  {
    id: "02",
    title: "Rinomodelación Estructural",
    subtitle: "Corrección de soporte nasal y elevación angular",
    beforeImg: "/assets/case_02_before.jpg",
    afterImg: "/assets/case_02_after.jpg",
    details: [
      { label: "TÉCNICA", value: "Alineación del dorso" },
      { label: "INSUMO", value: "Restylane Lyft" },
      { label: "RESULTADO", value: "Rotación 105°" }
    ]
  },
  {
    id: "03",
    title: "Armonización Labial",
    subtitle: "Perfilado del borde bermellón y proporción áurea",
    beforeImg: "/assets/case_03_before.jpg",
    afterImg: "/assets/case_03_after.jpg",
    details: [
      { label: "TÉCNICA", value: "Proporción Áurea" },
      { label: "INSUMO", value: "Juvederm Volbella" },
      { label: "RESULTADO", value: "Ratio 1:1.618" }
    ]
  },
  {
    id: "04",
    title: "Regeneración Celular",
    subtitle: "Tratamiento integral de bioestimulación tisular",
    beforeImg: "/assets/case_04_before.jpg",
    afterImg: "/assets/case_04_after.jpg",
    details: [
      { label: "TÉCNICA", value: "Retensado Profundo" },
      { label: "INSUMO", value: "Radiesse" },
      { label: "RESULTADO", value: "Colágeno Tipo I" }
    ]
  },
  {
    id: "05",
    title: "Masculinización Facial",
    subtitle: "Definición mandibular y proyección del mentón",
    beforeImg: "/assets/case_05_before.jpg",
    afterImg: "/assets/case_05_after.jpg",
    details: [
      { label: "TÉCNICA", value: "Estructuración Ósea" },
      { label: "INSUMO", value: "Hidroxiapatita" },
      { label: "RESULTADO", value: "Contorno Cuadrado" }
    ]
  }
];

export default function ClinicalCases({ onBack }) {
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [imageErrors, setImageErrors] = useState({});
  const sliderContainerRef = useRef(null);

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      e.preventDefault();
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      // Touch events don't select text in the same way, but it's good practice
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const currentCase = CLINICAL_CASES[activeCase];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#0A0A0A] text-stone-300 font-sans w-full relative z-50 flex flex-col pt-24 pb-12 px-6 md:px-12 selection:bg-[#D4AF37]/30"
    >
      {/* Absolute Header with Back Button */}
      <div className="absolute top-10 left-6 md:left-12 z-50">
        <button
          onClick={onBack}
          data-cursor="volver"
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-stone-500 hover:text-stone-300 transition-colors duration-500 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          Volver al Inicio
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col gap-12 lg:gap-16 items-start">
        
        {/* HEADER SECTION */}
        <div className="w-full flex flex-col space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide leading-tight">
              Casos Clínicos <span className="italic font-light text-stone-400">Seleccionados</span>
            </h1>
            <p className="text-xs md:text-sm text-stone-500 font-light tracking-[0.05em] leading-relaxed max-w-lg">
              Restauración estructural, armonización facial y precisión anatómica. Documentación fotográfica de nuestras intervenciones de élite.
            </p>
          </div>

          {/* Golden Horizontal Separator with fade edges */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        </div>

        {/* CONTENT (2 COLUMNS) */}
        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative">
          
          {/* Giant Decorative Number in Background */}
          <div className="absolute -top-12 -right-4 md:-right-12 text-[15rem] md:text-[22rem] font-serif font-bold text-white opacity-[0.02] pointer-events-none select-none leading-none z-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {currentCase.id}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* LEFT COLUMN: Case Selector */}
          <div className="w-full lg:w-1/4 flex flex-col h-full lg:sticky lg:top-32 space-y-6 z-10">
            {CLINICAL_CASES.map((c, idx) => {
              const isActive = activeCase === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCase(idx)}
                  className={`group flex items-start gap-5 text-left transition-all duration-400 ease-[0.16,1,0.3,1] outline-none relative py-2 cursor-pointer ${
                    isActive ? "opacity-100" : "opacity-35 hover:opacity-65"
                  }`}
                >
                  {/* Vertical Golden Line for Active Item */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#D4AF37]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span
                    className={`text-sm font-mono transition-colors duration-400 mt-1 pl-4 ${
                      isActive ? "text-[#D4AF37]" : "text-stone-500"
                    }`}
                  >
                    {c.id}
                  </span>
                  <div className="flex-1 pb-2">
                    <h3
                      className={`text-[15px] tracking-[0.1em] uppercase transition-all duration-400 ${
                        isActive ? "text-white font-semibold" : "text-stone-400 font-medium"
                      }`}
                    >
                      {c.title}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-stone-400 font-light mt-2.5 leading-relaxed pr-4 border-t border-stone-800/50 pt-2.5">
                            {c.subtitle}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Interactive Slider & Overlay Data */}
          <div className="w-full lg:w-3/4 flex flex-col z-10 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCase.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} // Fast image fade on change
                className="w-full flex flex-col space-y-6"
              >
                {/* Slider Container */}
                <div
                  ref={sliderContainerRef}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  data-cursor="deslizar"
                  className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-stone-900 overflow-hidden cursor-ew-resize rounded-xl border border-white/5 shadow-2xl select-none"
                >
                  {/* AFTER IMAGE (Background, Right side) */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center select-none">
                    {!imageErrors[`${currentCase.id}_after`] && (
                      <img
                        src={currentCase.afterImg}
                        alt={`${currentCase.title} Después`}
                        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                        onError={() => setImageErrors(prev => ({ ...prev, [`${currentCase.id}_after`]: true }))}
                      />
                    )}
                    {/* Fallback Text if image fails/missing */}
                    {imageErrors[`${currentCase.id}_after`] && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-12 text-center opacity-80 select-none">
                         <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] italic mb-2">Post-Intervención</span>
                         <span className="text-xs uppercase tracking-widest text-stone-300 font-sans">Resultado Anatómico</span>
                      </div>
                    )}

                    {/* POST Label (Gets covered when BEFORE overlay expands over it) */}
                    <div className="absolute top-6 right-6 z-10 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-[#D4AF37]/20 select-none">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium drop-shadow-md">
                        02. POST
                      </span>
                    </div>
                  </div>

                  {/* BEFORE IMAGE (Clipped Overlay, Left side) */}
                  <div
                    className="absolute inset-0 h-full overflow-hidden border-r border-[#D4AF37]/80 shadow-[1px_0_15px_rgba(212,175,55,0.2)] z-10 select-none"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div
                      className="absolute inset-0 h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center select-none"
                      style={{
                        width: `${sliderContainerRef.current?.getBoundingClientRect().width || 1000}px`,
                      }}
                    >
                      {!imageErrors[`${currentCase.id}_before`] && (
                        <img
                          src={currentCase.beforeImg}
                          alt={`${currentCase.title} Antes`}
                          className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-80 mix-blend-luminosity pointer-events-none select-none"
                          onError={() => setImageErrors(prev => ({ ...prev, [`${currentCase.id}_before`]: true }))}
                        />
                      )}
                      {/* Fallback Text if image fails/missing */}
                      {imageErrors[`${currentCase.id}_before`] && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-12 text-center opacity-40 select-none">
                           <span className="text-2xl md:text-3xl font-serif text-[#D4AF37] italic opacity-50 mb-2">Pre-Intervención</span>
                           <span className="text-xs uppercase tracking-widest text-stone-500 font-sans">{currentCase.title}</span>
                        </div>
                      )}

                      {/* PRE Label (Gets clipped when BEFORE overlay shrinks) */}
                      <div className="absolute top-6 left-6 z-10 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 select-none">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                          01. PRE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Slider Handle Line (Golden) */}
                  <div
                    className="absolute top-0 bottom-0 w-[1px] bg-[#D4AF37] z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-[#D4AF37] bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                      <MoveHorizontal className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>

                {/* Clinical Details Overlay (Placed below the slider, matching its width) */}
                <motion.div 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full bg-stone-950/40 backdrop-blur-md border border-white/5 rounded-xl p-5 md:p-6 shadow-xl select-none"
                >
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center justify-around">
                    {currentCase.details.map((detail, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col space-y-1.5 min-w-[120px]">
                          <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                            {detail.label}
                          </span>
                          <span className="text-[13px] text-stone-200 font-light tracking-wide">
                            {detail.value}
                          </span>
                        </div>
                        
                        {/* Golden Separator */}
                        {idx < currentCase.details.length - 1 && (
                          <div className="hidden sm:block w-px h-8 bg-[#D4AF37]/20" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
