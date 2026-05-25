import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const CLINICAL_CASES = [
  {
    id: "01",
    title: "Proyección Malar y Mandibular",
    subtitle: "Reposicionamiento estructural del tercio medio",
    beforeImg: "/assets/case_01_before.jpg",
    afterImg: "/assets/case_01_after.jpg",
    details: [
      "Volumetría de alta cohesividad",
      "Soporte óseo maxilar",
      "Ángulo mandibular 120°"
    ]
  },
  {
    id: "02",
    title: "Rinomodelación Estructural",
    subtitle: "Corrección de soporte nasal y elevación angular",
    beforeImg: "/assets/case_02_before.jpg",
    afterImg: "/assets/case_02_after.jpg",
    details: [
      "Alineación del dorso nasal",
      "Proyección de la punta",
      "Rotación superior 105°"
    ]
  },
  {
    id: "03",
    title: "Armonización Labial Clínica",
    subtitle: "Perfilado del borde bermellón y proporción áurea",
    beforeImg: "/assets/case_03_before.jpg",
    afterImg: "/assets/case_03_after.jpg",
    details: [
      "Proporción 1:1.618 labial",
      "Definición del arco de cupido",
      "Ácido hialurónico dinámico"
    ]
  },
  {
    id: "04",
    title: "Regeneración del Tercio Inferior",
    subtitle: "Tratamiento integral de bioestimulación tisular",
    beforeImg: "/assets/case_04_before.jpg",
    afterImg: "/assets/case_04_after.jpg",
    details: [
      "Inyección de Hidroxiapatita",
      "Inducción de colágeno Tipo I",
      "Retensado dérmico profundo"
    ]
  }
];

export default function ClinicalCases({ onBack }) {
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef(null);

  const handleSliderMove = (clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) handleSliderMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
  };

  const currentCase = CLINICAL_CASES[activeCase];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#0A0A0A] text-stone-300 font-sans w-full relative z-50 flex flex-col pt-24 pb-12 px-6 md:px-12 selection:bg-stone-800"
    >
      {/* Absolute Header with Back Button */}
      <div className="absolute top-10 left-6 md:left-12 z-50">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-stone-500 hover:text-stone-300 transition-colors duration-500"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          Volver al Inicio
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* LEFT COLUMN: Header & Case Selector */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between h-full lg:sticky lg:top-32 space-y-16">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif text-stone-100 tracking-wide leading-tight">
              Casos Clínicos <br />
              <span className="italic font-light text-stone-400">Seleccionados</span>
            </h1>
            <p className="text-xs md:text-sm text-stone-500 font-light tracking-[0.05em] leading-relaxed max-w-sm">
              Restauración estructural, armonización facial y precisión anatómica.
            </p>
          </div>

          {/* Vertical Case Selector */}
          <div className="flex flex-col gap-6">
            {CLINICAL_CASES.map((c, idx) => {
              const isActive = activeCase === idx;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCase(idx)}
                  className="group flex items-start gap-6 text-left transition-all duration-700 outline-none"
                >
                  <span
                    className={`text-xs font-mono transition-colors duration-700 ${
                      isActive ? "text-stone-300" : "text-stone-700 group-hover:text-stone-500"
                    }`}
                  >
                    {c.id}
                  </span>
                  <div className="flex-1 border-b border-stone-800/50 pb-4">
                    <h3
                      className={`text-sm tracking-[0.15em] uppercase font-medium transition-all duration-700 ${
                        isActive ? "text-stone-100" : "text-stone-600 group-hover:text-stone-400"
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
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-stone-500 font-light mt-2 leading-relaxed">
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
        </div>

        {/* RIGHT COLUMN: Interactive Slider & Microcopy */}
        <div className="w-full lg:w-2/3 flex flex-col space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col space-y-6"
            >
              {/* Slider Container */}
              <div
                ref={sliderContainerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-stone-900 overflow-hidden cursor-ew-resize rounded-sm"
              >
                {/* BEFORE IMAGE (Background) */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={currentCase.beforeImg}
                    alt={`${currentCase.title} Antes`}
                    className="w-full h-full object-cover object-center grayscale opacity-80 mix-blend-luminosity pointer-events-none"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Placeholder fallback if image missing */}
                  <div className="hidden absolute inset-0 bg-stone-900 flex-col items-center justify-center p-8 border border-stone-800">
                     <span className="text-[10px] uppercase tracking-widest text-stone-600 font-mono">[ BEFORE_IMAGE_PLACEHOLDER ]</span>
                  </div>
                </div>

                {/* AFTER IMAGE (Clipped Overlay) */}
                <div
                  className="absolute inset-0 h-full overflow-hidden border-r border-stone-400/50 shadow-[1px_0_15px_rgba(0,0,0,0.5)] z-10"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute inset-0 h-full"
                    style={{
                      width: `${sliderContainerRef.current?.getBoundingClientRect().width || 1000}px`,
                    }}
                  >
                    <img
                      src={currentCase.afterImg}
                      alt={`${currentCase.title} Después`}
                      className="w-full h-full object-cover object-center pointer-events-none"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Placeholder fallback if image missing */}
                    <div className="hidden absolute inset-0 bg-stone-800 flex-col items-center justify-center p-8">
                       <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">[ AFTER_IMAGE_PLACEHOLDER ]</span>
                    </div>
                  </div>
                </div>

                {/* Slider Handle Line */}
                <div
                  className="absolute top-0 bottom-0 w-[1px] bg-stone-300 z-20 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-stone-300/30 backdrop-blur-md flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-stone-300" />
                  </div>
                </div>

                {/* Labels overlay */}
                <div className="absolute bottom-6 left-6 z-0 pointer-events-none">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-medium">
                    Pre-Intervención
                  </span>
                </div>
                <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone-300 font-medium drop-shadow-md">
                    Post-Intervención
                  </span>
                </div>
              </div>

              {/* Clinical Details Microcopy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-800/50">
                {currentCase.details.map((detail, idx) => (
                  <div key={idx} className="flex flex-col space-y-1.5">
                    <span className="text-[8px] uppercase tracking-[0.3em] text-stone-600 font-mono">
                      Data 0{idx + 1}
                    </span>
                    <span className="text-xs text-stone-400 font-light tracking-wide leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
