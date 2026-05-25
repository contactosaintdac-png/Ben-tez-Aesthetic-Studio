import React from "react";
import { motion } from "framer-motion";

export default function TestimonialsMarquee() {
  return (
    <section id="testimonios" className="relative py-24 px-6 md:px-12 bg-brand-dark/20 border-t border-white/[0.03]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(73,40,194,0.03)_0%,_transparent_75%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full bg-brand-royal/10 border border-brand-royal/30 rounded-[32px] md:rounded-[48px] py-16 md:py-24 overflow-hidden relative shadow-[0_20px_50px_rgba(73,40,194,0.15)] bg-gradient-to-br from-brand-royal/15 via-brand-purple/5 to-brand-dark/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

        {/* Marquee Text Scrolling */}
        <div className="flex whitespace-nowrap overflow-hidden py-4 select-none relative z-10">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-16 text-5xl md:text-7xl lg:text-8xl font-serif font-light text-brand-glow/85 uppercase italic tracking-wider leading-none"
          >
            <span>Resultados reales que reflejan excelencia clínica ·</span>
            <span>Resultados reales que reflejan excelencia clínica ·</span>
            <span>Resultados reales que reflejan excelencia clínica ·</span>
          </motion.div>
        </div>

        <div className="text-center max-w-2xl mx-auto px-6 mt-10 relative z-10 flex flex-col items-center">
          <p className="text-sm sm:text-lg md:text-xl text-zinc-100 font-serif italic font-light leading-relaxed">
            "La discreción y la precisión matemática del Dr. Benítez cambiaron por completo mi concepto de estética facial. Un resultado natural, elegante e indetectable. El triage clínico inicial marca la diferencia."
          </p>
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-neon font-bold block mt-6">
            Pacientes VIP — Recoleta
          </span>
        </div>

      </div>
    </section>
  );
}
