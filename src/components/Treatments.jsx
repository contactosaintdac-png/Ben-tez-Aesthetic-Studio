import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const CATEGORIES_DATA = [
  {
    id: "a",
    name: "Calidad & Textura",
    tagline: "Categoría A — Renovación Biológica de la Piel",
    treatments: [
      {
        id: "a1",
        num: "01",
        title: "Peelings Químicos Médicos",
        desc: "Exfoliaciones dermatológicas profundas formuladas con ácidos de grado médico para remover imperfecciones y unificar el tono cutáneo.",
        outcome: "Restaura la luminosidad absoluta, eliminando manchas pigmentarias y secuelas visibles.",
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "a2",
        num: "02",
        title: "Hydrafacial Premium",
        desc: "Protocolo de hidrodermoabrasión con succión al vacío patentada para infundir sueros antioxidantes, péptidos y ácido hialurónico.",
        outcome: "Eliminación instantánea de impurezas e hidratación extrema con brillo sedoso.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13edd793be?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "a3",
        num: "03",
        title: "Microneedling (Dermapen)",
        desc: "Terapia mecánica de inducción de colágeno mediante microagujas estériles que abren canales transdérmicos para elastina.",
        outcome: "Densificación tisular, reducción de poros y corrección progresiva de líneas finas.",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "a4",
        num: "04",
        title: "Mesoterapia Facial Inyectada",
        desc: "Microinyecciones dérmicas de cócteles biológicos con vitaminas, aminoácidos y ácido hialurónico libre no reticulado.",
        outcome: "Hidratación celular tridimensional y revitalización biológica del rostro cansado.",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "b",
    name: "Aparatología de Alta Tecnología",
    tagline: "Categoría B — Tecnología Médica de Precisión",
    treatments: [
      {
        id: "b1",
        num: "05",
        title: "Láseres Médicos Avanzados",
        desc: "Dispositivos de CO2 Fraccionado y Nd:YAG para tratar discromías, secuelas de acné y fotoenvejecimiento con precisión micrométrica.",
        outcome: "Renovación cutánea profunda y eliminación de venitas o manchas vasculares.",
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "b2",
        num: "06",
        title: "HIFU (Ultrasonido Microfocalizado)",
        desc: "Energía ultrasónica profunda que converge en las capas del SMAS para indicar retracción y reestructuración térmica.",
        outcome: "Efecto lifting no quirúrgico y redefinición tridimensional de la línea mandibular.",
        image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c9?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "b3",
        num: "07",
        title: "Radiofrecuencia Fraccionada",
        desc: "Tecnología Morpheus8 que emite radiofrecuencia a nivel subdérmico para compactar tejido adiposo y tensar tabiques fibrosos.",
        outcome: "Reducción de papada y retracción total de la piel flácida en el tercio inferior.",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "c",
    name: "Regenerativos & Antienvejecimiento",
    tagline: "Categoría C — Terapias Regenerativas Premium",
    treatments: [
      {
        id: "c1",
        num: "08",
        title: "Bioestimuladores de Colágeno",
        desc: "Inyección de hidroxiapatita de calcio (Radiesse) o ácido poli-L-láctico (Sculptra) para inducir neocolagénesis natural.",
        outcome: "Restauración del volumen facial perdido y tensión natural y progresiva.",
        image: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "c2",
        num: "09",
        title: "Polinucleótidos & Exosomas",
        desc: "Terapias de regeneración celular avanzadas que reparan el tejido a nivel de ADN y mitigan la inflamación crónica subdérmica.",
        outcome: "Bio-reparación total de la barrera cutánea y rejuvenecimiento celular desde el interior.",
        image: "https://images.unsplash.com/photo-1579154204601-01588f35116f?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "c3",
        num: "10",
        title: "Hilos Tensores de PDO",
        desc: "Colocación estratégica de hilos de polidioxanona reabsorbibles en la dermis profunda para crear una malla de soporte mecánico.",
        outcome: "Soporte de vectores descendidos y estimulación de colágeno en la zona tratada.",
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop"
      }
    ]
  }
];

function TreatmentCard({ num, title, desc, outcome, image, categoryName, index }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Motion values for physical 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Springs to smooth out rotation animations
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 15 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Coords relative to card center for 3D tilt
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Max 6 degrees of rotation
    const rX = -(mouseY / (height / 2)) * 6;
    const rY = (mouseX / (width / 2)) * 6;

    rotateX.set(rX);
    rotateY.set(rY);

    // Relatives to element top-left for radial spotlight
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative w-[85vw] md:w-[400px] aspect-[3/4] flex-none snap-center rounded-[2rem] overflow-hidden group border border-white/[0.04] hover:border-brand-royal/40 transition-colors duration-500 bg-brand-dark/40 cursor-pointer"
      data-cursor="tilt"
    >
      {/* Background Image */}
      <img
        alt={title}
        src={image}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 z-5" />

      {/* Dynamic spotlight glow following cursor */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(128, 0, 255, 0.1), transparent 80%)`
        }}
      />

      {/* Default State Content */}
      <div 
        className="absolute inset-0 p-8 flex flex-col justify-end z-10 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4"
        style={{ transform: "translateZ(30px)" }}
      >
        <span className="font-serif italic text-4xl text-brand-glow mb-2">{num}</span>
        <h3 className="font-serif text-2xl text-white font-light tracking-wide">{title}</h3>
        <p className="text-zinc-400 text-[10px] uppercase tracking-widest mt-1 font-semibold">{categoryName}</p>
      </div>

      {/* Hover State: Frosted glass details screen (Vidrio Arenado) */}
      <div 
        className="absolute inset-0 bg-[#040607]/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-8 z-20"
        style={{ transform: "translateZ(40px)" }}
      >
        <div className="flex justify-between items-start">
          <span className="font-serif italic text-4xl text-brand-glow">{num}</span>
          <div className="w-10 h-10 rounded-full border border-brand-royal/30 flex items-center justify-center text-brand-glow hover:bg-brand-royal/15 hover:text-white transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-serif text-2xl text-white font-light mb-1">{title}</h3>
            <p className="text-zinc-400 text-[9px] uppercase tracking-widest font-semibold">{categoryName}</p>
            <p className="font-sans text-xs md:text-sm text-zinc-400 leading-relaxed font-light mt-4">
              {desc}
            </p>
          </div>

          <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-1">
            <span className="text-[8px] uppercase tracking-[0.25em] text-brand-neon font-bold">RESULTADO CLÍNICO</span>
            <p className="font-serif text-xs text-white/95 italic font-medium leading-relaxed">
              "{outcome}"
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Treatments() {
  const [activeCategoryKey, setActiveCategoryKey] = useState("todos");
  const carouselRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(30);

  // Flatten all treatments and inject category name
  const allTreatments = CATEGORIES_DATA.flatMap(cat =>
    cat.treatments.map(t => ({ ...t, categoryName: cat.name }))
  );

  // Get treatments for active category
  const displayTreatments = activeCategoryKey === "todos"
    ? allTreatments
    : CATEGORIES_DATA.find(c => c.id === activeCategoryKey).treatments.map(t => ({
        ...t,
        categoryName: CATEGORIES_DATA.find(c => c.id === activeCategoryKey).name
      }));

  // Sync custom progress bar
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    // Calculate progress ratio (0 to 1)
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollProgress(progress);
    
    // Calculate thumb width ratio (viewport ratio)
    const ratio = scrollWidth > 0 ? (clientWidth / scrollWidth) * 100 : 100;
    setThumbWidth(Math.min(100, Math.max(15, ratio)));
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [activeCategoryKey]);

  // Click scroll handler
  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const { clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth > 768 ? 440 : clientWidth * 0.85;
    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <section 
      id="tratamientos" 
      className="py-32 px-6 md:px-12 relative border-t border-white/[0.03] bg-brand-dark/30 overflow-hidden"
    >
      {/* Background soft gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(73,40,194,0.04)_0%,rgba(73,40,194,0)_70%)] pointer-events-none filter blur-2xl z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(91,42,98,0.03)_0%,rgba(91,42,98,0)_70%)] pointer-events-none filter blur-3xl z-0" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header with generous space negative */}
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/35 px-4.5 py-1.5 rounded-full w-fit">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-glow font-bold">
              Catálogo Clínico Exclusivo
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
            Nuestros Protocolos de <span className="italic font-light text-brand-glow">Armonización</span> &amp; Estética
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-light uppercase tracking-widest leading-relaxed">
            Clasificados quirúrgica y anatómicamente para asegurar el diagnóstico ideal en cada tejido.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-3 pb-4 border-b border-white/[0.04] w-full">
          <button
            onClick={() => {
              setActiveCategoryKey("todos");
              if (carouselRef.current) carouselRef.current.scrollLeft = 0;
            }}
            className={`relative px-6 py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-500 cursor-pointer ${
              activeCategoryKey === "todos" 
                ? "text-white bg-brand-royal/20 border border-brand-royal/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_20px_rgba(128,0,255,0.2)]" 
                : "text-zinc-500 hover:text-zinc-300 border border-transparent hover:bg-white/[0.02]"
            }`}
          >
            Todos los Protocolos
            {activeCategoryKey === "todos" && (
              <motion.span 
                layoutId="activeCategoryGlow"
                className="absolute -bottom-[5px] left-0 w-full h-[1.5px] bg-brand-neon"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
          </button>
          {CATEGORIES_DATA.map((cat) => {
            const isActive = activeCategoryKey === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryKey(cat.id);
                  if (carouselRef.current) carouselRef.current.scrollLeft = 0;
                }}
                className={`relative px-6 py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? "text-white bg-brand-royal/20 border border-brand-royal/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_20px_rgba(128,0,255,0.2)]" 
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent hover:bg-white/[0.02]"
                }`}
              >
                {cat.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeCategoryGlow"
                    className="absolute -bottom-[5px] left-0 w-full h-[1.5px] bg-brand-neon"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Carousel Area */}
        <div className="relative w-full">
          {/* Floating arrow navigation */}
          <div className="absolute inset-y-0 -left-6 md:-left-12 flex items-center z-20 pointer-events-none">
            <button
              onClick={() => scroll(-1)}
              className="w-14 h-14 rounded-full bg-brand-dark/60 backdrop-blur-md border border-brand-royal/20 text-brand-glow hover:text-white hover:bg-brand-royal/20 hover:border-brand-royal/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)] pointer-events-auto flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 -right-6 md:-right-12 flex items-center z-20 pointer-events-none">
            <button
              onClick={() => scroll(1)}
              className="w-14 h-14 rounded-full bg-brand-dark/60 backdrop-blur-md border border-brand-royal/20 text-brand-glow hover:text-white hover:bg-brand-royal/20 hover:border-brand-royal/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)] pointer-events-auto flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Track Container */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {displayTreatments.map((treatment, index) => (
                <TreatmentCard 
                  key={treatment.id}
                  index={index}
                  num={treatment.num}
                  title={treatment.title}
                  desc={treatment.desc}
                  outcome={treatment.outcome}
                  image={treatment.image}
                  categoryName={treatment.categoryName}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Scrollbar / Progress Bar Track & CTA */}
        <div className="flex flex-col items-center gap-8 mt-4">
          <div 
            className="w-48 md:w-64 h-[2px] bg-white/[0.06] rounded-full relative overflow-hidden" 
            id="carousel-scrollbar-track"
          >
            <div
              className="absolute top-0 h-full bg-brand-neon shadow-[0_0_12px_rgba(191,64,250,0.8)] rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${thumbWidth}%`,
                left: `${scrollProgress * (100 - thumbWidth)}%`
              }}
            />
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById("triage")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center px-10 py-4 bg-brand-cream text-brand-dark font-semibold text-[11px] tracking-[0.2em] rounded-full hover:bg-brand-royal hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.15)] group uppercase cursor-pointer"
          >
            Calificar Ahora
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}

