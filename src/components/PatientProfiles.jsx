import React, { useState } from "react";
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

export default function PatientProfiles() {
  const [coordsCard1, setCoordsCard1] = useState({ x: 0, y: 0 });
  const [coordsCard2, setCoordsCard2] = useState({ x: 0, y: 0 });

  const handleMouseMoveCard1 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoordsCard1({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMoveCard2 = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoordsCard2({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-brand-dark/20 overflow-hidden border-b border-white/[0.03]">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vw] rounded-full bg-brand-royal/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/35 px-4.5 py-1.5 rounded-full w-fit mb-5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-glow font-semibold flex items-center">
              Fricción Estética &amp; Diagnóstico
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide">
            Dos Caminos Clínicos. <br />
            <span className="italic font-light text-brand-glow">Una Solución de Autor.</span>
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-light uppercase tracking-wider leading-relaxed max-w-md mt-4">
            El mercado de volumen inyecta bajo promoción comercial. Nosotros restauramos la estructura anatómica y biológica perdida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          
          {/* Card 1 */}
          <motion.div 
            onMouseMove={handleMouseMoveCard1}
            whileHover={{ 
              y: -8, 
              borderColor: "rgba(191, 64, 250, 0.4)", 
              boxShadow: "0 25px 60px -15px rgba(73, 40, 194, 0.25)" 
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-dark/45 backdrop-blur-md border border-white/[0.04] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between shadow-xl relative group overflow-hidden cursor-pointer"
            data-cursor="analizar"
          >
            {/* Spotlight reflection */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: `radial-gradient(350px circle at ${coordsCard1.x}px ${coordsCard1.y}px, rgba(128, 0, 255, 0.08), transparent 80%)`
              }}
            />
            <div className="absolute -top-[10%] -right-[10%] w-[150px] h-[150px] bg-brand-royal/10 rounded-full blur-[60px] group-hover:bg-brand-royal/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-brand-royal/10 border border-brand-royal/25 flex items-center justify-center text-brand-neon mb-8">
                <SVGAurea className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4 font-light tracking-wide">El Deterioro Estructural</h3>
              <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                Con el paso del tiempo, el soporte graso y la estructura ósea facial descienden. Inyectar volumen masivo sin analizar los puntos de tracción genera rostros inflados e inexpresivos. La clave es la restauración milimétrica de vectores.
              </p>
            </div>
            
            {/* Interactive vector animation SVG */}
            <div className="relative z-10 w-full h-28 bg-brand-dark/80 border border-white/[0.04] group-hover:border-brand-royal/20 rounded-2xl overflow-hidden mt-6 flex items-center justify-center p-4 transition-colors duration-300">
              <svg className="w-full h-full text-zinc-700" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="0.6">
                <path d="M10,5 C20,5 25,15 25,20 C25,25 20,35 10,35" strokeDasharray="1 2" strokeOpacity="0.4" />
                <motion.path 
                  d="M45,10 L45,30" 
                  stroke="#FF3B30" 
                  strokeWidth="1"
                  animate={{ y: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <path d="M42,27 L45,30 L48,27" stroke="#FF3B30" strokeWidth="1" />
                
                {/* Lift vector drawing */}
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

                <text x="58" y="23" textAnchor="middle" fill="#FF3B30" className="text-[4px] font-mono uppercase tracking-[0.2em] font-bold">Gravedad</text>
                <text x="88" y="23" textAnchor="middle" fill="#00FF6A" className="text-[4px] font-mono uppercase tracking-[0.2em] font-bold">Lift</text>
              </svg>
            </div>

            <div className="relative z-10 border-t border-white/[0.06] pt-6 mt-8 flex items-center justify-between text-[9px] font-bold text-brand-glow uppercase tracking-wider">
              <span>Tratamiento: Full Face Lift</span>
              <span className="text-brand-neon">Juvederm Voluma</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            onMouseMove={handleMouseMoveCard2}
            whileHover={{ 
              y: -8, 
              borderColor: "rgba(191, 64, 250, 0.4)", 
              boxShadow: "0 25px 60px -15px rgba(73, 40, 194, 0.25)" 
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-dark/45 backdrop-blur-md border border-white/[0.04] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between shadow-xl relative group overflow-hidden cursor-pointer"
            data-cursor="analizar"
          >
            {/* Spotlight reflection */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: `radial-gradient(350px circle at ${coordsCard2.x}px ${coordsCard2.y}px, rgba(128, 0, 255, 0.08), transparent 80%)`
              }}
            />
            <div className="absolute -top-[10%] -right-[10%] w-[150px] h-[150px] bg-brand-royal/10 rounded-full blur-[60px] group-hover:bg-brand-royal/20 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-brand-royal/10 border border-brand-royal/25 flex items-center justify-center text-brand-neon mb-8">
                <SVGCrosshair className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4 font-light tracking-wide">La Pérdida de Armonía</h3>
              <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                Muchos pacientes asisten con rinomodelaciones previas caídas o labios sin perfil natural debido a técnicas incorrectas. Rediseñamos los ángulos del rostro respetando la proporción áurea y recuperando la clase en la expresión facial.
              </p>
            </div>

            {/* Interactive vector animation SVG */}
            <div className="relative z-10 w-full h-28 bg-brand-dark/80 border border-white/[0.04] group-hover:border-brand-royal/20 rounded-2xl overflow-hidden mt-6 flex items-center justify-center p-4 transition-colors duration-300">
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
                <text x="50" y="37" textAnchor="middle" fill="#00FF6A" className="text-[4px] font-mono uppercase tracking-[0.2em] font-bold">Proporciones de Autor Alineadas</text>
              </svg>
            </div>

            <div className="relative z-10 border-t border-white/[0.06] pt-6 mt-8 flex items-center justify-between text-[9px] font-bold text-brand-glow uppercase tracking-wider">
              <span>Tratamiento: Perfilado de Autor</span>
              <span className="text-brand-neon">Rinomodelación</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
