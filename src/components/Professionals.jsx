import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const SILHOUETTE_PATHS = [
  // Elegant Profile 1 (Feminine-leaning curves)
  "M 25 80 C 35 75, 40 70, 44 60 C 46 54, 45 46, 42 42 C 38 38, 35 38, 38 28 C 41 18, 52 10, 64 12 C 76 14, 80 26, 72 38 C 66 46, 56 50, 54 56 C 51 62, 53 70, 62 74 C 70 78, 80 79, 85 80",
  // Elegant Profile 2 (Geometric abstract)
  "M 20 85 C 30 78, 34 72, 38 55 C 40 45, 36 35, 42 25 C 48 15, 64 12, 72 18 C 80 24, 78 36, 70 43 C 62 50, 60 58, 63 68 C 65 76, 74 80, 82 82",
  // Elegant Profile 3 (Structured linear outline)
  "M 28 85 C 38 80, 40 70, 44 58 C 47 50, 42 42, 47 30 C 52 18, 66 12, 74 22 C 80 32, 74 46, 65 52 C 56 58, 54 66, 59 76 C 64 82, 74 82, 80 83"
];

const PROFESSIONALS = [
  {
    id: 1,
    name: "Dr. Esteban Benítez",
    role: "Director Clínico & Cirugía Facial",
    credentials: "19 años de trayectoria · 9 dedicados a la estética de alta gama",
  },
  {
    id: 2,
    name: "Valeria",
    role: "Coordinadora de Admisiones & Atención",
    credentials: "Gestión y curaduría de la agenda exclusiva en Av. Alvear",
  },
  {
    id: 3,
    name: "Dra. Sofía Alvear",
    role: "Especialista en Láser Nd:YAG & Fototerapia",
    credentials: "Fellowship internacional en medicina láser clínica",
  },
  {
    id: 4,
    name: "Dr. Mateo Cavalcanti",
    role: "Especialista en Bioestimulación Progresiva",
    credentials: "Líder en protocolos de neocolagénesis y reestructuración dérmica",
  },
  {
    id: 5,
    name: "Dra. Valentina Quintana",
    role: "Dermatología Cosmética & Regenerativa",
    credentials: "Experta en rejuvenecimiento tisular y biotecnología avanzada",
  },
  {
    id: 6,
    name: "Dr. Julián Sívori",
    role: "Medicina Regenerativa & Exosomas",
    credentials: "Especialista en reparación de la barrera cutánea a nivel de ADN",
  },
  {
    id: 7,
    name: "Dra. Clara Miguens",
    role: "Estética Estructural Facial",
    credentials: "Especialización en proporción áurea y armonía facial de autor",
  },
  {
    id: 8,
    name: "Dr. Tomás Anchorena",
    role: "Biotecnología Médica Aplicada",
    credentials: "Desarrollo de terapias moleculares antienvejecimiento",
  }
];

function ProfessionalCard({ id, name, role, credentials, index, staggerY }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const path = SILHOUETTE_PATHS[id % SILHOUETTE_PATHS.length];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="perfil"
      className={`glass-panel shine-effect rounded-2xl p-5 flex flex-col gap-4 relative group cursor-pointer ${staggerY}`}
      whileHover={{ y: index % 2 === 0 ? 24 : -8 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      {/* Dynamic spotlight glow following cursor */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, rgba(128, 0, 255, 0.08), transparent 80%)`
        }}
      />

      {/* Photo Placeholder Frame - Elegant vertical portrait slot */}
      <div className="aspect-[3/4] w-full rounded-xl bg-brand-dark/95 relative overflow-hidden border border-brand-royal/10 flex items-center justify-center">
        {/* Continuous slow-moving background shimmer representing editorial lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/60 via-brand-purple/20 to-transparent z-0" />
        <div className="absolute inset-0 shimmer-skeleton-block opacity-40 z-0" />

        {/* Outer radial neon glow */}
        <div className="absolute w-36 h-36 rounded-full bg-brand-royal/10 blur-xl group-hover:bg-brand-royal/20 transition-all duration-700 z-0" />

        {/* Single-Line Art Silhouette Drawing (Autodraw and color change on hover) */}
        <svg viewBox="0 0 100 100" className="w-40 h-40 z-10 relative overflow-visible">
          <motion.path
            d={path}
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0.15, opacity: 0.3, stroke: "#d6b3ff" }}
            animate={{ 
              pathLength: isHovered ? 1.0 : 0.15, 
              opacity: isHovered ? 0.85 : [0.25, 0.42, 0.25],
              stroke: isHovered ? "#00ffbf" : "#d6b3ff"
            }}
            transition={{ 
              pathLength: { duration: 1.2, ease: "easeInOut" },
              stroke: { duration: 0.4 },
              opacity: isHovered 
                ? { duration: 0.3 } 
                : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              filter: isHovered ? "drop-shadow(0 0 6px rgba(0, 255, 191, 0.5))" : "none"
            }}
          />
        </svg>
      </div>

      {/* Info Area */}
      <div className="space-y-1.5 py-2 relative z-10">
        <h3 className="text-lg font-serif text-white group-hover:text-brand-glow transition-colors duration-300">
          {name}
        </h3>
        <p className="text-brand-neon text-[10px] uppercase tracking-[0.15em] font-semibold">
          {role}
        </p>
        <p className="text-zinc-500 text-[10.5px] font-light leading-relaxed">
          {credentials}
        </p>
      </div>
    </motion.div>
  );
}

export default function Professionals() {
  return (
    <section 
      id="profesionales" 
      className="py-32 px-6 relative border-t border-brand-royal/10"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="space-y-5 max-w-xl md:mx-auto md:text-center flex flex-col md:items-center">
          <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/35 px-4.5 py-1.5 rounded-full w-fit">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-glow font-semibold flex items-center">
              Cuerpo Médico &amp; Dirección
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-wide">
            Dirección &amp; <span className="italic font-light text-brand-glow">Prestigio</span> Clínico
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-light uppercase tracking-wider leading-relaxed max-w-md">
            Un equipo multidisciplinar dedicado a la restauración armónica, liderado por el Dr. Esteban Benítez en Av. Alvear.
          </p>
        </div>

        {/* Staggered Masonry-style Grid of 8 slots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROFESSIONALS.map((prof, index) => {
            const staggerY = index % 2 === 0 ? "lg:translate-y-8" : "";
            return (
              <ProfessionalCard 
                key={prof.id} 
                id={prof.id} 
                name={prof.name}
                role={prof.role}
                credentials={prof.credentials}
                index={index} 
                staggerY={staggerY} 
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
