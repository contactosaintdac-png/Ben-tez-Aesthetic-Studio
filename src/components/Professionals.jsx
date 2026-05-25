import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const DIRECTOR = {
  name: "Dr. Esteban Benítez",
  role: "Director Médico",
  location: "Mónaco · París · Buenos Aires",
  bio: "19 años de trayectoria redefiniendo la armonización facial de autor. Formación internacional continua en los centros de excelencia de Mónaco y París.",
  image: "/assets/dr_benitez_hero.png",
};

const TEAM = [
  {
    id: 1,
    name: "Valeria",
    role: "Dirección de Admisiones",
    bio: "Gestión y curaduría de la agenda exclusiva en Av. Alvear.",
    image: "/assets/specialist_valeria.png",
  },
  {
    id: 2,
    name: "Dra. Sofía Alvear",
    role: "Láser Nd:YAG & Fototerapia",
    bio: "Fellowship internacional en medicina láser clínica avanzada.",
    image: "/assets/specialist_sofia_alvear.png",
  },
  {
    id: 3,
    name: "Dr. Mateo Cavalcanti",
    role: "Bioestimulación Progresiva",
    bio: "Protocolos avanzados de neocolagénesis y regeneración dérmica.",
    image: "/assets/specialist_mateo_cavalcanti.png",
  },
  {
    id: 4,
    name: "Dra. Valentina Quintana",
    role: "Dermatología Cosmética",
    bio: "Rejuvenecimiento tisular y biotecnología dérmica de última generación.",
    image: "/assets/specialist_valentina_quintana.png",
  },
  {
    id: 5,
    name: "Dr. Julián Sívori",
    role: "Medicina Regenerativa & Exosomas",
    bio: "Reparación celular avanzada y bioterapias moleculares.",
    image: "/assets/specialist_julian_sivori.png",
  },
  {
    id: 6,
    name: "Dra. Clara Miguens",
    role: "Estética Estructural Facial",
    bio: "Proporción áurea y armonía facial de autor.",
    image: "/assets/specialist_clara_miguens.png",
  },
  {
    id: 7,
    name: "Dr. Tomás Anchorena",
    role: "Biotecnología Médica Aplicada",
    bio: "Terapias moleculares y protocolos de longevidad clínica.",
    image: "/assets/specialist_tomas_anchorena.png",
  },
];

// ─────────────────────────────────────────────
// TEAM MEMBER CARD (secondary grid)
// ─────────────────────────────────────────────
function TeamCard({ member, offsetUp }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group cursor-default flex flex-col ${offsetUp ? "lg:-translate-y-10" : ""}`}
    >
      {/* Portrait */}
      <div className="relative overflow-hidden rounded-sm aspect-[3/4] bg-[#111009]">
        <img
          src={member.image}
          alt={member.name}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
          className="absolute inset-0 w-full h-full object-cover object-top
                     filter grayscale-[60%] contrast-[1.05] brightness-[0.88]
                     transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                     group-hover:grayscale-0 group-hover:brightness-[0.95] group-hover:contrast-[1.02]
                     group-hover:scale-[1.04]"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08]/70 via-transparent to-transparent" />

        {/* Editorial index number — top right */}
        <span
          className="absolute top-4 right-4 font-serif italic text-[11px] text-stone-400/60
                     tracking-widest select-none"
        >
          0{member.id}
        </span>
      </div>

      {/* Text */}
      <div className="mt-5 space-y-1.5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-sans font-medium">
          {member.role}
        </p>
        <h4 className="font-serif text-[1.05rem] text-stone-100 leading-snug">
          {member.name}
        </h4>
        <p className="text-[11.5px] text-stone-500 font-light leading-relaxed max-w-[220px]">
          {member.bio}
        </p>
      </div>

      {/* Bottom rule — animates in on hover */}
      <div
        className="mt-4 h-px bg-stone-700/30 origin-left scale-x-0
                   group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
export default function Professionals() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });

  return (
    <section
      id="profesionales"
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20
                 bg-[#0d0b09] border-t border-stone-800/30 overflow-hidden"
    >
      {/* Very subtle warm noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-28 max-w-2xl"
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-stone-500 font-sans mb-6">
            Cuerpo Médico &amp; Dirección
          </p>

          <h2 className="font-serif text-4xl md:text-[3.25rem] text-stone-100 leading-[1.1] tracking-tight mb-8">
            Dirección &amp;{" "}
            <span className="italic font-light text-stone-400">
              Prestigio Clínico
            </span>
          </h2>

          {/* Pull quote */}
          <blockquote className="border-l border-stone-700/60 pl-6">
            <p className="font-serif italic text-stone-400 text-base md:text-lg leading-relaxed">
              "La armonía facial no se construye por volumen.
              <br className="hidden md:block" />
              Se construye por criterio."
            </p>
          </blockquote>
        </motion.div>

        {/* ── DIRECTOR HERO ROW ── */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24 md:mb-36"
        >
          {/* Large portrait — dominant */}
          <div className="lg:col-span-5 group relative overflow-hidden rounded-sm
                          aspect-[3/4] lg:aspect-auto lg:min-h-[620px] bg-[#111009]">
            <img
              src={DIRECTOR.image}
              alt={DIRECTOR.name}
              className="absolute inset-0 w-full h-full object-cover object-top
                         filter grayscale-[40%] contrast-[1.08] brightness-[0.85]
                         transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                         group-hover:grayscale-0 group-hover:brightness-[0.92] group-hover:contrast-[1.04]
                         group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/80 via-[#0d0b09]/15 to-transparent" />

            {/* Bottom caption inside image */}
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
              <p className="text-[9px] tracking-[0.35em] uppercase text-stone-400/70 font-sans mb-2">
                Director Clínico
              </p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-500/60">
                {DIRECTOR.location}
              </p>
            </div>
          </div>

          {/* Director bio — right side */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pl-8 lg:pt-16">
            {/* Large editorial number */}
            <span className="font-serif italic text-[7rem] md:text-[9rem] leading-none
                             text-stone-800/40 select-none mb-4 -ml-2">
              01
            </span>

            <div className="space-y-6 max-w-lg">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-sans mb-3">
                  {DIRECTOR.role}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-stone-100 leading-tight">
                  {DIRECTOR.name}
                </h3>
              </div>

              {/* Thin rule */}
              <div className="w-12 h-px bg-stone-700" />

              <p className="text-stone-400 text-sm md:text-base font-light leading-loose">
                {DIRECTOR.bio}
              </p>

              {/* Stats row */}
              <div className="flex gap-10 pt-4">
                <div>
                  <p className="font-serif text-2xl text-stone-100">19</p>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-stone-600 mt-1">
                    Años de trayectoria
                  </p>
                </div>
                <div className="w-px bg-stone-800" />
                <div>
                  <p className="font-serif text-2xl text-stone-100">+26K</p>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-stone-600 mt-1">
                    Procedimientos
                  </p>
                </div>
                <div className="w-px bg-stone-800" />
                <div>
                  <p className="font-serif text-2xl text-stone-100">3</p>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-stone-600 mt-1">
                    Congresos Internacionales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── THIN RULE BEFORE TEAM ── */}
        <div className="flex items-center gap-8 mb-16 md:mb-20">
          <div className="flex-1 h-px bg-stone-800/60" />
          <p className="text-[9px] tracking-[0.4em] uppercase text-stone-600 font-sans whitespace-nowrap">
            Equipo Médico Especializado
          </p>
          <div className="flex-1 h-px bg-stone-800/60" />
        </div>

        {/* ── TEAM GRID — asymmetric offsets ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-16">
          {TEAM.map((member, i) => (
            <TeamCard
              key={member.id}
              member={member}
              offsetUp={i % 4 === 1 || i % 4 === 3}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
