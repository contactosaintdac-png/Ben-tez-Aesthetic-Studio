import React from "react";
import { motion } from "framer-motion";

export default function PatientProfiles() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-brand-dark/20 overflow-hidden border-b border-white/[0.03]">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header - Editorial Style */}
        <div className="max-w-4xl mb-24 md:mb-36">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-glow/60 font-semibold block mb-6">
            Filosofía Clínica
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] mb-10">
            Dos caminos clínicos. <br />
            <span className="italic font-light text-brand-glow">Una solución de autor.</span>
          </h2>
          <div className="h-[1px] w-24 bg-brand-glow/20 my-8" />
          <p className="font-serif italic text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl">
            La medicina estética de volumen rellena rostros. <br />
            <span className="text-white font-normal not-italic">Nosotros restauramos estructura, proporción y expresión.</span>
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          
          {/* Card 01 - El Deterioro Estructural */}
          <div 
            className="flex flex-col gap-6 md:translate-y-12"
          >
            <div className="flex items-baseline gap-4 border-b border-white/5 pb-4">
              <span className="font-serif italic text-7xl md:text-8xl text-brand-glow/15 leading-none select-none">
                01
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-light tracking-wide">
                El Deterioro Estructural
              </h3>
            </div>

            <div className="space-y-4 max-w-lg my-2">
              <p className="font-serif text-lg text-white/95 leading-relaxed italic">
                "El tiempo no envejece por volumen. Envejece por descenso."
              </p>
              <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                La clave no es inflar el rostro. Es restaurar los puntos de soporte perdidos mediante un análisis estructural profundo.
              </p>
            </div>

            {/* Editorial Image 01 */}
            <div className="aspect-[3/4] w-full rounded-[2rem] overflow-hidden border border-white/5 relative group bg-brand-dark/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <motion.img
                alt="El Deterioro Estructural - Análisis Facial"
                src="/assets/profile_structural.png"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Clean Editorial Footer */}
            <div className="mt-4 flex flex-col gap-1 border-t border-white/5 pt-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                Full Face Lift
              </span>
              <span className="font-serif text-sm text-brand-glow italic font-light">
                Juvéderm Voluma
              </span>
            </div>
          </div>

          {/* Card 02 - La Pérdida de Armonía */}
          <div 
            className="flex flex-col gap-6 md:-translate-y-12"
          >
            <div className="flex items-baseline gap-4 border-b border-white/5 pb-4">
              <span className="font-serif italic text-7xl md:text-8xl text-brand-glow/15 leading-none select-none">
                02
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-light tracking-wide">
                La Pérdida de Armonía
              </h3>
            </div>

            <div className="space-y-4 max-w-lg my-2">
              <p className="font-serif text-lg text-white/95 leading-relaxed italic">
                "No todo lo que agrega volumen devuelve elegancia. Cuando la proporción se pierde, la expresión también."
              </p>
              <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                Rediseñamos ángulos y proyección respetando la anatomía natural del rostro. Menos es más en la medicina estética de autor.
              </p>
            </div>

            {/* Editorial Image 02 */}
            <div className="aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-white/5 relative group bg-brand-dark/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <motion.img
                alt="La Pérdida de Armonía - Proporción Facial"
                src="/assets/profile_harmony.png"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Clean Editorial Footer */}
            <div className="mt-4 flex flex-col gap-1 border-t border-white/5 pt-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                Perfilado de Autor
              </span>
              <span className="font-serif text-sm text-brand-glow italic font-light">
                Rinomodelación
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
