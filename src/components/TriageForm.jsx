import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, ChevronDown, Sparkles, X, ChevronRight, ChevronLeft, AlertCircle, HelpCircle, FileText, Landmark } from "lucide-react";

// Códigos de país para el perfil de paciente elite
const COUNTRY_CODES = [
  { code: "+54", label: "Argentina", flag: "🇦🇷" },
  { code: "+55", label: "Brasil", flag: "🇧🇷" },
  { code: "+598", label: "Uruguay", flag: "🇺🇾" },
  { code: "+1", label: "USA", flag: "🇺🇸" },
  { code: "+34", label: "España", flag: "🇪🇸" },
  { code: "+56", label: "Chile", flag: "🇨🇱" },
];

export default function TriageForm() {
  const [step, setStep] = useState(1); // 1 a 6
  const [status, setStatus] = useState("idle"); // 'idle' | 'rejected' | 'submitted'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenCountryDropdown, setIsOpenCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);

  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    transformObjective: "",
    confidenceScore: 5,
    priorProcedures: "",
    urgencyLevel: "",
    plannedInvestment: "",
    agreedAttendance: false,
    agreedIntegrity: false,
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [step, status]);

  const getProgressPercentage = () => {
    if (status === "rejected" || status === "submitted") return 100;
    return Math.round(((step - 1) / 5) * 100);
  };

  const handleNext = () => {
    if (step === 4 && formData.plannedInvestment === "A") {
      setStatus("rejected");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("submitted");
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      transformObjective: "",
      confidenceScore: 5,
      priorProcedures: "",
      urgencyLevel: "",
      plannedInvestment: "",
      agreedAttendance: false,
      agreedIntegrity: false,
      fullName: "",
      email: "",
      phone: "",
    });
    setStep(1);
    setStatus("idle");
    setSelectedCountry(COUNTRY_CODES[0]);
  };

  // Validaciones por paso
  const isStep2Valid = formData.transformObjective.trim().length >= 10;
  const isStep3Valid = formData.priorProcedures !== "" && formData.urgencyLevel !== "";
  const isStep4Valid = formData.plannedInvestment !== "";
  const isStep5Valid = formData.agreedAttendance && formData.agreedIntegrity;
  const isStep6Valid =
    formData.fullName.trim().length >= 3 &&
    formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    formData.phone.trim().length >= 8;

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 80 : -80, opacity: 0 }),
  };

  // Clases reutilizables
  const inputClass =
    "w-full bg-brand-purple/20 backdrop-blur-md focus:bg-brand-purple/40 border border-brand-royal/20 focus:border-brand-neon text-white placeholder-zinc-500 p-4 rounded-2xl text-base font-light tracking-wide outline-none transition-all duration-300";
  const optionBase =
    "w-full p-5 rounded-xl border text-left text-sm font-light transition-all duration-300 flex items-center justify-between cursor-pointer";
  const optionActive = "bg-brand-royal/20 border-brand-royal text-white shadow-[0_0_15px_rgba(128,0,255,0.12)]";
  const optionInactive = "border-brand-royal/10 bg-brand-dark/40 text-zinc-300 hover:border-brand-neon/30 hover:text-white";
  const labelClass = "block text-[11px] uppercase tracking-[0.22em] text-brand-glow font-bold mb-1.5";
  const sublabelClass = "text-zinc-400 text-sm font-light leading-relaxed mb-3";

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto px-4 py-8 relative z-10">

      {/* Card principal */}
      <div className="relative glass-panel-frosted rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(128,0,255,0.08)] text-zinc-100 overflow-hidden">

        {/* Barra de progreso superior */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 overflow-hidden z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-royal via-brand-electric to-brand-neon"
            initial={{ width: "0%" }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ type: "spring", stiffness: 85, damping: 18 }}
          />
        </div>

        <AnimatePresence mode="wait">

          {/* ═══════ ESTADO: RECHAZADO ═══════ */}
          {status === "rejected" && (
            <motion.div
              key="rejected-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-8 py-6"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7 text-brand-glow animate-pulse" />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-glow font-bold">
                  Lista de Espera Secundaria
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                  Admisión suspensa{" "}
                  <span className="italic font-light text-zinc-400">por ahora</span>
                </h3>
                <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-sm mx-auto">
                  Agradecemos sinceramente tu tiempo e interés en la clínica del Dr. Esteban Benítez.
                  <br /><br />
                  Debido a los estándares de insumos de importación directa (Allergan, Juvéderm Voluma/Volux) y la complejidad de los protocolos personalizados en Av. Alvear, el presupuesto mínimo por paciente es de{" "}
                  <strong className="text-white font-medium">USD 500</strong>.
                  <br /><br />
                  Tu solicitud quedó registrada. Si en el futuro incorporamos alternativas de menor complejidad, te notificaremos por correo.
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.04]">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-sm uppercase tracking-[0.2em] font-semibold text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Reiniciar evaluación
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══════ ESTADO: ENVIADO CON ÉXITO ═══════ */}
          {status === "submitted" && (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-8 py-6"
            >
              <div className="w-16 h-16 rounded-full bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center mx-auto shadow-[0_5px_20px_rgba(0,255,191,0.15)]">
                <Sparkles className="w-6 h-6 text-brand-neon animate-bounce" />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-neon font-bold">
                  Perfil Calificado
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                  Solicitud recibida{" "}
                  <span className="italic font-light text-brand-glow">con éxito</span>
                </h3>
                <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-sm mx-auto">
                  Tu perfil de admisión fue calificado y registrado con prioridad para la clínica de Av. Alvear.
                  <br /><br />
                  Nuestra coordinadora de admisiones, <strong className="text-white">Valeria</strong>, te contactará directamente por WhatsApp en las próximas 24 horas hábiles para confirmar tus datos y coordinar tu sesión de diagnóstico tridimensional con el Dr. Esteban Benítez.
                </p>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-zinc-500 text-[10px] tracking-widest border-t border-white/[0.04] uppercase font-semibold">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-neon" />
                  <span>Datos protegidos</span>
                </div>
                <span className="hidden sm:inline text-zinc-800">•</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-neon" />
                  <span>Historial cifrado</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full py-4 rounded-2xl bg-brand-royal text-white hover:bg-brand-royal/90 shadow-[0_10px_30px_rgba(128,0,255,0.2)] text-sm uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer"
                >
                  Volver al inicio
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══════ ESTADO: FLUJO PRINCIPAL (WIZARD) ═══════ */}
          {status === "idle" && (
            <div className="space-y-8">

              {/* Indicador de pasos */}
              <div className="flex items-center justify-between text-zinc-400 text-sm tracking-widest uppercase font-semibold">
                <span>Paso {step} de 6</span>
                <span className="text-brand-glow">{getProgressPercentage()}% completado</span>
              </div>

              {/* Contenido del paso */}
              <div className="min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait" custom={step}>
                  <motion.div
                    key={step}
                    custom={step}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >

                    {/* ─── PASO 1: BIENVENIDA ─── */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/20 px-3.5 py-1.5 rounded-full">
                          <Shield className="w-4 h-4 text-brand-neon" />
                          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            Admisión Restringida
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-snug">
                          Protocolo de Triaje{" "}
                          <span className="italic font-light text-brand-glow">Esteban Benítez</span>
                        </h3>

                        <p className="text-zinc-300 text-base font-light leading-relaxed">
                          La clínica de Av. Alvear opera bajo un modelo de exclusividad de agenda médica.
                          No realizamos procedimientos genéricos ni masivos.
                        </p>
                        <p className="text-zinc-400 text-sm font-light leading-relaxed">
                          Este proceso de 6 pasos evalúa el alineamiento de expectativas clínicas y de inversión.
                          Tus datos médicos quedan protegidos bajo estricta confidencialidad.
                        </p>
                      </div>
                    )}

                    {/* ─── PASO 2: DIAGNÓSTICO ─── */}
                    {step === 2 && (
                      <div className="space-y-7">
                        <div className="space-y-1">
                          <label className={labelClass}>01. Objetivo de transformación</label>
                          <p className={sublabelClass}>
                            Describí en pocas palabras cuál es tu principal punto de insatisfacción facial.
                          </p>
                          <textarea
                            value={formData.transformObjective}
                            onChange={(e) => setFormData({ ...formData, transformObjective: e.target.value })}
                            placeholder="Ej: Siento falta de definición en el tercio inferior y algo de flacidez en el mentón..."
                            rows={3}
                            className={`${inputClass} resize-none`}
                          />
                          <div className="text-right text-xs text-zinc-500 mt-1">
                            {formData.transformObjective.trim().length} / 10 caracteres mínimos
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className={labelClass}>02. Autoconfianza facial actual</label>
                          <p className={sublabelClass}>
                            ¿Cómo evaluás tu nivel de confianza con tu rostro hoy? (1 = muy baja · 10 = plena)
                          </p>
                          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-1">
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => {
                              const isActive = formData.confidenceScore === val;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, confidenceScore: val })}
                                  className={`py-4 rounded-xl border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                    isActive
                                      ? "bg-brand-neon border-brand-neon text-brand-dark shadow-[0_0_15px_rgba(0,255,191,0.35)]"
                                      : "border-brand-royal/10 bg-brand-dark/40 text-zinc-400 hover:border-brand-neon/40 hover:text-white"
                                  }`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─── PASO 3: HISTORIAL CLÍNICO ─── */}
                    {step === 3 && (
                      <div className="space-y-7">
                        <div className="space-y-3">
                          <label className={labelClass}>03. Historial estético previo</label>
                          <div className="space-y-2.5">
                            {[
                              { id: "none", label: "No, sería mi primer procedimiento facial." },
                              { id: "injectables", label: "Sí, rellenos o toxina botulínica en el último año." },
                              { id: "surgical", label: "Sí, cirugías faciales (rinoplastia, lifting, etc.)." },
                              { id: "lasers", label: "Otros tratamientos clínicos o laserterapia." },
                            ].map((opt) => {
                              const isActive = formData.priorProcedures === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, priorProcedures: opt.id })}
                                  className={`${optionBase} ${isActive ? optionActive : optionInactive}`}
                                >
                                  <span>{opt.label}</span>
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                                    isActive ? "border-brand-neon bg-brand-neon" : "border-brand-royal/20"
                                  }`}>
                                    {isActive && <Check className="w-2.5 h-2.5 text-brand-dark stroke-[3]" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className={labelClass}>04. Urgencia de diagnóstico</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {[
                              { id: "immediate", label: "Inmediato" },
                              { id: "planned", label: "1 a 3 meses" },
                              { id: "info", label: "Solo informativo" },
                            ].map((opt) => {
                              const isActive = formData.urgencyLevel === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, urgencyLevel: opt.id })}
                                  className={`py-4 px-2 rounded-xl border text-center text-sm font-light transition-all duration-300 cursor-pointer ${
                                    isActive
                                      ? "bg-brand-royal/20 border-brand-royal text-white"
                                      : "border-brand-royal/10 bg-brand-dark/40 text-zinc-300 hover:border-brand-neon/30"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─── PASO 4: FILTRO FINANCIERO ─── */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/20 px-3.5 py-1.5 rounded-full">
                          <Landmark className="w-4 h-4 text-brand-neon" />
                          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            Filtro de Inversión
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide mb-2">
                            Rango de inversión previsto
                          </h3>
                          <p className={sublabelClass}>
                            El Dr. Benítez trabaja exclusivamente con protocolos personalizados e insumos importados de la más alta pureza. ¿Cuál es tu rango de inversión planificado?
                          </p>
                        </div>

                        <div className="space-y-3">
                          {[
                            { id: "A", label: "Menos de USD 500", note: "Tratamientos básicos locales" },
                            { id: "B", label: "Entre USD 500 y USD 2.000", note: "Protocolos moderados y bioestimulación" },
                            { id: "C", label: "Más de USD 2.000", note: "Armonización estructural y reestructuración facial" },
                          ].map((opt) => {
                            const isActive = formData.plannedInvestment === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, plannedInvestment: opt.id })}
                                className={`${optionBase} ${isActive ? optionActive : optionInactive}`}
                              >
                                <div className="space-y-0.5">
                                  <div className="text-sm font-semibold">{opt.label}</div>
                                  <div className="text-xs text-zinc-500 font-light">{opt.note}</div>
                                </div>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                                  isActive ? "border-brand-neon bg-brand-neon" : "border-brand-royal/20"
                                }`}>
                                  {isActive && <Check className="w-2.5 h-2.5 text-brand-dark stroke-[3]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ─── PASO 5: COMPROMISOS ─── */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/20 px-3.5 py-1.5 rounded-full">
                          <FileText className="w-4 h-4 text-brand-neon" />
                          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            Compromisos
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide mb-2">
                            Términos de integridad
                          </h3>
                          <p className={sublabelClass}>
                            Para garantizar la puntualidad clínica y el estándar de excelencia de nuestra clínica en Recoleta, solicitamos la confirmación de los siguientes términos:
                          </p>
                        </div>

                        <div className="space-y-3 pt-1">
                          <div
                            onClick={() => setFormData({ ...formData, agreedAttendance: !formData.agreedAttendance })}
                            className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all"
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${
                              formData.agreedAttendance ? "border-brand-neon bg-brand-neon/10" : "border-brand-royal/30"
                            }`}>
                              {formData.agreedAttendance && <Check className="w-3 h-3 text-brand-neon stroke-[3.5]" />}
                            </div>
                            <div>
                              <span className="block text-sm font-semibold text-white mb-1">Compromiso de puntualidad</span>
                              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                                Entiendo que la ausencia sin aviso previo de 48 horas resultará en el archivo permanente de mi registro de admisión.
                              </p>
                            </div>
                          </div>

                          <div
                            onClick={() => setFormData({ ...formData, agreedIntegrity: !formData.agreedIntegrity })}
                            className="flex items-start gap-4 cursor-pointer p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all"
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${
                              formData.agreedIntegrity ? "border-brand-neon bg-brand-neon/10" : "border-brand-royal/30"
                            }`}>
                              {formData.agreedIntegrity && <Check className="w-3 h-3 text-brand-neon stroke-[3.5]" />}
                            </div>
                            <div>
                              <span className="block text-sm font-semibold text-white mb-1">Veracidad de la información</span>
                              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                                Declaro que todos los datos estéticos y de salud compartidos en este formulario son auténticos y verdaderos.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─── PASO 6: DATOS DE CONTACTO ─── */}
                    {step === 6 && (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide mb-1">
                            Datos de contacto
                          </h3>
                          <p className={sublabelClass}>
                            Estos datos serán utilizados exclusivamente por nuestra coordinadora Valeria para iniciar tu admisión.
                          </p>
                        </div>

                        <div className="space-y-5">
                          {/* Nombre */}
                          <div className="space-y-1.5">
                            <label className={labelClass}>Nombre completo</label>
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="Nombre y apellido"
                              className={inputClass}
                            />
                          </div>

                          {/* Email */}
                          <div className="space-y-1.5">
                            <label className={labelClass}>Correo electrónico</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="nombre@ejemplo.com"
                              className={inputClass}
                            />
                          </div>

                          {/* Teléfono con selector de país */}
                          <div className="space-y-1.5">
                            <label className={labelClass}>WhatsApp de contacto</label>
                            <div className="flex gap-2">
                              <div className="relative w-32 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setIsOpenCountryDropdown(!isOpenCountryDropdown)}
                                  className="w-full bg-brand-purple/20 border border-brand-royal/20 hover:bg-brand-purple/30 text-white rounded-2xl p-4 flex justify-between items-center text-sm font-light outline-none focus:border-brand-neon transition-all"
                                >
                                  <span>{selectedCountry.flag} {selectedCountry.code}</span>
                                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                                </button>

                                <AnimatePresence>
                                  {isOpenCountryDropdown && (
                                    <motion.ul
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 5 }}
                                      className="absolute left-0 bottom-full mb-2 z-50 w-52 bg-brand-purple/95 border border-brand-royal/30 rounded-2xl shadow-xl overflow-hidden py-1"
                                    >
                                      {COUNTRY_CODES.map((country) => (
                                        <li key={country.code}>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setSelectedCountry(country);
                                              setIsOpenCountryDropdown(false);
                                            }}
                                            className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-brand-royal/20 flex items-center gap-2.5 transition-all outline-none"
                                          >
                                            <span>{country.flag}</span>
                                            <span>{country.label} ({country.code})</span>
                                          </button>
                                        </li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              </div>

                              <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Código de área + número"
                                className={inputClass}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Barra de navegación inferior */}
              <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-3.5 rounded-xl text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-wider font-semibold cursor-pointer inline-flex items-center gap-1.5 hover:bg-white/[0.02]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Volver</span>
                  </button>
                ) : (
                  <div className="w-10" />
                )}

                {step < 6 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      (step === 2 && !isStep2Valid) ||
                      (step === 3 && !isStep3Valid) ||
                      (step === 4 && !isStep4Valid) ||
                      (step === 5 && !isStep5Valid)
                    }
                    className="px-7 py-3.5 rounded-2xl bg-brand-royal text-white hover:bg-brand-royal/90 shadow-[0_10px_20px_rgba(128,0,255,0.15)] text-sm uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none disabled:shadow-none"
                  >
                    <span>Continuar</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStep6Valid || isSubmitting}
                    className="px-8 py-3.5 rounded-2xl bg-brand-neon text-brand-dark hover:bg-brand-neon/90 shadow-[0_10px_25px_rgba(0,255,191,0.2)] text-sm uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer inline-flex items-center justify-center min-w-[160px] disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Enviar solicitud</span>
                        <Sparkles className="w-4 h-4 ml-1.5" />
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
