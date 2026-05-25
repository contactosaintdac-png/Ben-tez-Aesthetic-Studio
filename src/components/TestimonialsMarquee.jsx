import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Vine con dudas, no con certezas. Lo que más me sorprendió fue que Esteban me dijo lo que no necesitaba. Eso no lo escuchás en ningún lado. El resultado habla solo.",
    name: "V. M.",
    detail: "Empresaria · Barrio Parque",
  },
  {
    id: 2,
    quote:
      "Tengo 52 años y nunca me había animado. Me fui de la consulta con un plan claro, sin promesas vacías. Cuatro meses después no me reconozco — en el buen sentido.",
    name: "Cla. R.",
    detail: "Directora Creativa · Palermo",
  },
  {
    id: 3,
    quote:
      "Lo que más valoro es que nadie se entera. Mis colegas me preguntan si descansé mejor, si viajé. Eso es exactamente lo que buscaba.",
    name: "M. A.",
    detail: "Abogada · Recoleta",
  },
  {
    id: 4,
    quote:
      "Soy médico y soy muy difícil de convencer. Me tomó un año decidirme. Hoy le recomiendo la clínica a mis propias pacientes sin dudar.",
    name: "Dr. F. L.",
    detail: "Médico Internista · Belgrano",
  },
  {
    id: 5,
    quote:
      "No vine buscando un cambio radical. Vine porque quería verme como yo, pero mejor. Eso es exactamente lo que pasó. Preciso, sutil, sin exagerar.",
    name: "S. B.",
    detail: "Arquitecta · Núñez",
  },
  {
    id: 6,
    quote:
      "Vengo de hacerme cosas en Europa y acá encontré el mismo nivel de criterio. La diferencia es la escucha. Saben qué preguntar antes de proponer.",
    name: "A. K.",
    detail: "Consultora · San Isidro",
  },
  {
    id: 7,
    quote:
      "Mi cara siempre fue mi obsesión y mi inseguridad al mismo tiempo. Por primera vez me siento cómoda con lo que veo. No exagerado. Solo yo, con más luz.",
    name: "L. D.",
    detail: "Productora de Contenido · Puerto Madero",
  },
  {
    id: 8,
    quote:
      "El triage inicial me pareció innecesario, lo admito. Después entendí que es ahí donde todo se define. Nunca un profesional me había escuchado tanto antes de proponer algo.",
    name: "G. T.",
    detail: "Ejecutiva de Finanzas · Recoleta",
  },
];

export default function TestimonialsMarquee() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 18 : -18 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -18 : 18 }),
  };

  return (
    <section
      id="testimonios"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#0d0b09] border-t border-stone-800/30 overflow-hidden"
    >
      {/* Subtle warm noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Section label */}
        <p className="text-[10px] tracking-[0.35em] uppercase text-stone-500 font-sans mb-16 md:mb-20">
          Testimonios
        </p>

        {/* Glass card wrapper */}
        <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden
                        bg-white/[0.03] backdrop-blur-xl
                        border border-white/[0.07]
                        shadow-[0_8px_60px_rgba(73,40,194,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]
                        px-8 md:px-16 py-14 md:py-20">

          {/* Very faint violet inner glow — top center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32
                          bg-violet-600/10 blur-[60px] pointer-events-none rounded-full" />

          {/* Scrolling marquee */}
          <div className="overflow-hidden mb-12 select-none pointer-events-none -mx-4">
            <motion.div
              animate={{ x: [0, -900] }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              className="flex gap-14 whitespace-nowrap font-serif italic text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] leading-none text-white/[0.06] uppercase tracking-tight"
            >
              <span>Resultados reales ·</span>
              <span>Resultados reales ·</span>
              <span>Resultados reales ·</span>
              <span>Resultados reales ·</span>
            </motion.div>
          </div>

          {/* Quote carousel */}
          <div className="relative min-h-[180px] flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <span className="font-serif text-4xl text-stone-500/50 leading-none select-none">
                  "
                </span>
                <p className="font-serif italic text-stone-200 text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed max-w-3xl mx-auto -mt-3 mb-8">
                  {TESTIMONIALS[current].quote}
                </p>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-stone-400 font-sans font-medium">
                    {TESTIMONIALS[current].name}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-stone-600 font-sans">
                    {TESTIMONIALS[current].detail}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot navigation */}
          <div className="flex justify-center gap-2.5 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Testimonio ${i + 1}`}
                className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${i === current
                    ? "w-5 h-1.5 bg-stone-300"
                    : "w-1.5 h-1.5 bg-stone-700 hover:bg-stone-500"
                  }`}
              />
            ))}
          </div>

          {/* Bottom rule inside card */}
          <div className="mt-14 flex items-center gap-8">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <p className="text-[9px] tracking-[0.4em] uppercase text-stone-600 font-sans whitespace-nowrap">
              Av. Alvear · Buenos Aires
            </p>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

        </div>
      </div>
    </section>
  );
}
