import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, ChevronDown, Sparkles, X, ChevronRight, ChevronLeft, AlertCircle, HelpCircle, FileText, Landmark } from "lucide-react";

// Country codes for elite patient demographic
const COUNTRY_CODES = [
  { code: "+55", label: "Brasil", flag: "🇧🇷" },
  { code: "+54", label: "Argentina", flag: "🇦🇷" },
  { code: "+598", label: "Uruguai", flag: "🇺🇾" },
  { code: "+1", label: "USA", flag: "🇺🇸" },
  { code: "+34", label: "Espanha", flag: "🇪🇸" },
  { code: "+56", label: "Chile", flag: "🇨🇱" }
];

export default function TriageForm() {
  const [step, setStep] = useState(1); // 1 to 6
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
    plannedInvestment: "", // 'A' (< R$ 2k), 'B' (R$ 2k-5k), 'C' (> R$ 5k)
    agreedAttendance: false,
    agreedIntegrity: false,
    fullName: "",
    email: "",
    phone: ""
  });

  // Smoothly center the form card on step change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [step, status]);

  // Dynamic Progress Percentage (1 to 6)
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
    
    // Simulate luxury API request delay
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
      phone: ""
    });
    setStep(1);
    setStatus("idle");
    setSelectedCountry(COUNTRY_CODES[0]);
  };

  // Step validation helpers
  const isStep2Valid = formData.transformObjective.trim().length >= 10;
  const isStep3Valid = formData.priorProcedures !== "" && formData.urgencyLevel !== "";
  const isStep4Valid = formData.plannedInvestment !== "";
  const isStep5Valid = formData.agreedAttendance && formData.agreedIntegrity;
  const isStep6Valid = formData.fullName.trim().length >= 3 && 
                       formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && 
                       formData.phone.trim().length >= 8;

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0
    })
  };

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto px-4 py-8 relative z-10">
      
      {/* Visual background card container */}
      <div className="relative glass-panel-frosted rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(128,0,255,0.08)] text-zinc-100 overflow-hidden">
        
        {/* Top visual accent glow */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 overflow-hidden z-20">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-royal via-brand-electric to-brand-neon"
            initial={{ width: "0%" }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ type: "spring", stiffness: 85, damping: 18 }}
          />
        </div>

        <AnimatePresence mode="wait">
          
          {/* ================= STATUS: REJECTED (RECHAZO AMABLE) ================= */}
          {status === "rejected" && (
            <motion.div
              key="rejected-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-8 py-6"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                <AlertCircle className="w-7 h-7 text-brand-glow animate-pulse" />
              </div>

              <div className="space-y-4">
                <span className="text-[9px] uppercase tracking-[0.3em] text-brand-glow font-bold">
                  Lista de Espera Secundária
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                  Admissão Suspensa <br />
                  <span className="italic font-light text-zinc-400">no momento</span>
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed max-w-sm mx-auto">
                  Agradecemos sinceramente o seu tempo e interesse na clínica do Dr. Esteban Benítez.
                  <br /><br />
                  Devido ao alto padrão de exigência dos nossos insumos de importação direta (Allergan, Juvederm Voluma/Volux) e à complexidade dos protocolos cirúrgicos personalizados que realizamos na Av. Alvear, o orçamento mínimo viável por paciente é de <strong className="text-white font-medium">R$ 2.000</strong>.
                  <br /><br />
                  No momento, não dispomos de protocolos que possam ser executados com segurança e eficácia abaixo deste patamar. Sua solicitação foi arquivada em nosso banco de dados secundário. Caso novas alternativas de menor complexidade sejam integradas no futuro, notificaremos você por e-mail.
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.04]">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs uppercase tracking-[0.2em] font-semibold text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Reiniciar Avaliação
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STATUS: SUBMITTED (SUCCESS) ================= */}
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
                <span className="text-[9px] uppercase tracking-[0.3em] text-brand-neon font-bold">
                  Registro Qualificado
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                  Solicitação Recebida <br />
                  <span className="italic font-light text-brand-glow">com sucesso</span>
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed max-w-sm mx-auto">
                  Seu perfil de admissão foi qualificado e registrado com prioridade para a clínica da Av. Alvear.
                  <br /><br />
                  Nossa Coordenadora de Admissões, <strong className="text-white">Valeria</strong>, entrará em contato diretamente via WhatsApp nas próximas 24 horas úteis para confirmar seus dados e agendar sua sessão de diagnóstico tridimensional com o Dr. Esteban Benítez.
                </p>
              </div>

              {/* Technical trust stamps */}
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-zinc-500 text-[9px] tracking-widest border-t border-white/[0.04] uppercase font-semibold">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-brand-neon" />
                  <span>Conformidade LGPD</span>
                </div>
                <span className="hidden sm:inline text-zinc-800">•</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-neon" />
                  <span>Prontuário Criptografado</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full py-4 rounded-2xl bg-brand-royal text-white hover:bg-brand-royal/90 shadow-[0_10px_30px_rgba(128,0,255,0.2)] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 cursor-pointer"
                >
                  Concluir e Retornar
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STATUS: IDLE (WIZARD FLOW) ================= */}
          {status === "idle" && (
            <div className="space-y-8">
              
              {/* Steps indicator */}
              <div className="flex items-center justify-between text-zinc-500 text-[10px] tracking-widest uppercase font-semibold">
                <span>Passo {step} de 6</span>
                <span className="text-brand-glow">{getProgressPercentage()}% concluído</span>
              </div>

              {/* Step content wrapped in motion for slide transitions */}
              <div className="min-h-[280px] flex flex-col justify-center">
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
                    
                    {/* ================= STEP 1: PEAJE PSICOLÓGICO ================= */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/20 px-3.5 py-1 rounded-full">
                          <Shield className="w-3.5 h-3.5 text-brand-neon" />
                          <span className="text-[9px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            Admissão Restrita
                          </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight leading-snug">
                          Protocolo de Triagem <br />
                          <span className="italic font-light text-brand-glow">Esteban Benítez</span>
                        </h3>
                        
                        <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
                          A clínica na Av. Alvear atua sob o modelo de exclusividade de agenda médica. 
                          Não realizamos procedimentos genéricos ou massivos. 
                          <br /><br />
                          Este processo em 6 etapas avalia o alinhamento de expectativas clínicas e de investimento. Seus dados médicos serão protegidos sob estrito sigilo.
                        </p>
                      </div>
                    )}

                    {/* ================= STEP 2: DIAGNÓSTICO DE TRANSFORMAÇÃO ================= */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            01. Objetivo de Transformação
                          </label>
                          <p className="text-zinc-500 text-xs font-light">
                            Descreva em poucas palavras qual o seu principal ponto de insatisfação facial.
                          </p>
                          <textarea
                            value={formData.transformObjective}
                            onChange={(e) => setFormData({ ...formData, transformObjective: e.target.value })}
                            placeholder="Ex: Sinto falta de suporte na mandíbula e flacidez no terço inferior..."
                            rows={3}
                            className="w-full bg-brand-purple/20 backdrop-blur-md focus:bg-brand-purple/40 border border-brand-royal/20 focus:border-brand-neon text-white placeholder-zinc-700 p-4 rounded-2xl text-sm font-light tracking-wide outline-none transition-all duration-300 resize-none"
                          />
                          <div className="text-right text-[10px] text-zinc-500">
                            {formData.transformObjective.trim().length} / 10 caracteres mínimos
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            02. Avaliação de Autoimagem
                          </label>
                          <p className="text-zinc-500 text-xs font-light">
                            Como você avalia sua autoconfiança atual com seu rosto? (1 - Baixa / 10 - Plena)
                          </p>
                          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-2">
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => {
                              const isActive = formData.confidenceScore === val;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, confidenceScore: val })}
                                  className={`py-3.5 rounded-lg border text-xs font-semibold transition-all duration-300 cursor-pointer ${
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

                    {/* ================= STEP 3: CALIBRAÇÃO CLÍNICA ================= */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            03. Histórico Clínico Estético
                          </label>
                          <div className="space-y-2.5">
                            {[
                              { id: "none", label: "Não, seria meu primeiro procedimento facial." },
                              { id: "injectables", label: "Sim, preenchedores ou toxina botulínica há menos de 1 ano." },
                              { id: "surgical", label: "Sim, cirurgias faciais (Rinoplastia, Lifting, etc.)." },
                              { id: "lasers", label: "Outros tratamentos clínicos e laserterapia." }
                            ].map((opt) => {
                              const isActive = formData.priorProcedures === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, priorProcedures: opt.id })}
                                  className={`w-full p-4 rounded-xl border text-left text-xs font-light transition-all duration-300 flex items-center justify-between cursor-pointer ${
                                    isActive
                                      ? "bg-brand-royal/20 border-brand-royal text-white shadow-[0_0_15px_rgba(128,0,255,0.15)]"
                                      : "border-brand-royal/10 bg-brand-dark/40 text-zinc-400 hover:border-brand-neon/30 hover:text-white"
                                  }`}
                                >
                                  <span>{opt.label}</span>
                                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
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
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            04. Urgência de Diagnóstico
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {[
                              { id: "immediate", label: "Imediato" },
                              { id: "planned", label: "1 a 3 meses" },
                              { id: "info", label: "Informativo" }
                            ].map((opt) => {
                              const isActive = formData.urgencyLevel === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, urgencyLevel: opt.id })}
                                  className={`py-3.5 px-2 rounded-xl border text-center text-xs font-light transition-all duration-300 cursor-pointer ${
                                    isActive
                                      ? "bg-brand-royal/20 border-brand-royal text-white"
                                      : "border-brand-royal/10 bg-brand-dark/40 text-zinc-400 hover:border-brand-neon/30"
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

                    {/* ================= STEP 4: FILTRO FINANCEIRO ================= */}
                    {step === 4 && (
                      <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/20 px-3.5 py-1 rounded-full">
                          <Landmark className="w-3.5 h-3.5 text-brand-neon" />
                          <span className="text-[9px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            Filtro de Investimento
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide">
                            Capacidade de Investimento
                          </h3>
                          <p className="text-zinc-500 text-xs font-light leading-relaxed">
                            O Dr. Esteban Benítez trabalha exclusivamente com protocolos personalizados sob medida e insumos importados da mais alta pureza. Qual é a sua faixa de investimento planejada para o procedimento?
                          </p>
                        </div>

                        <div className="space-y-3.5 pt-2">
                          {[
                            { id: "A", label: "Opção A: Menos de R$ 2.000", note: "Tratamentos básicos locais/secundários" },
                            { id: "B", label: "Opção B: Entre R$ 2.000 e R$ 5.000", note: "Protocolos moderados e bioestimulação" },
                            { id: "C", label: "Opção C: Mais de R$ 5.000", note: "Armonização estrutural e reestruturação facial total" }
                          ].map((opt) => {
                            const isActive = formData.plannedInvestment === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, plannedInvestment: opt.id })}
                                className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                                  isActive
                                    ? "bg-brand-royal/25 border-brand-royal text-white shadow-[0_0_20px_rgba(128,0,255,0.15)]"
                                    : "border-brand-royal/10 bg-brand-dark/40 text-zinc-400 hover:border-brand-neon/30 hover:text-white"
                                }`}
                              >
                                <div className="space-y-1">
                                  <div className="text-xs font-semibold">{opt.label}</div>
                                  <div className="text-[10px] text-zinc-500 font-light">{opt.note}</div>
                                </div>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
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

                    {/* ================= STEP 5: COMPROMISO Y TÉRMINOS ================= */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-brand-royal/10 border border-brand-royal/20 px-3.5 py-1 rounded-full">
                          <FileText className="w-3.5 h-3.5 text-brand-neon" />
                          <span className="text-[9px] uppercase tracking-[0.2em] text-brand-glow font-bold">
                            Compromisso
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide">
                            Termos de Integridade
                          </h3>
                          <p className="text-zinc-500 text-xs font-light leading-relaxed">
                            Para garantir a pontualidade cirúrgica e o padrão de excelência de nossa clínica em Recoleta, solicitamos a confirmação dos seguintes termos:
                          </p>
                        </div>

                        <div className="space-y-4 pt-2">
                          <div 
                            onClick={() => setFormData({ ...formData, agreedAttendance: !formData.agreedAttendance })}
                            className="flex items-start gap-3.5 cursor-pointer p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all"
                          >
                            <div className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                              formData.agreedAttendance ? "border-brand-neon bg-brand-neon/10" : "border-brand-royal/30"
                            }`}>
                              {formData.agreedAttendance && <Check className="w-3 h-3 text-brand-neon stroke-[3.5]" />}
                            </div>
                            <div className="space-y-1">
                              <span className="block text-xs font-semibold text-white">Compromisso de Pontualidade</span>
                              <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                                Compreendo que a ausência sem aviso prévio de 48 horas resultará no arquivamento permanente do meu registro de admissão.
                              </p>
                            </div>
                          </div>

                          <div 
                            onClick={() => setFormData({ ...formData, agreedIntegrity: !formData.agreedIntegrity })}
                            className="flex items-start gap-3.5 cursor-pointer p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all"
                          >
                            <div className={`mt-0.5 w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                              formData.agreedIntegrity ? "border-brand-neon bg-brand-neon/10" : "border-brand-royal/30"
                            }`}>
                              {formData.agreedIntegrity && <Check className="w-3 h-3 text-brand-neon stroke-[3.5]" />}
                            </div>
                            <div className="space-y-1">
                              <span className="block text-xs font-semibold text-white">Veracidade de Prontuário</span>
                              <p className="text-[10px] text-zinc-400 font-light leading-relaxed">
                                Declaro que todas as informações estéticas e de saúde compartilhadas nesta ficha são autênticas e verdadeiras.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ================= STEP 6: DADOS PESSOAIS ================= */}
                    {step === 6 && (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                          <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide">
                            Dados de Contato
                          </h3>
                          <p className="text-zinc-500 text-xs font-light">
                            Estes dados serão utilizados exclusivamente pela nossa coordenadora Valeria para iniciar a admissão prévia.
                          </p>
                        </div>

                        <div className="space-y-4 pt-2">
                          {/* Nome */}
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] text-brand-glow font-bold">
                              Nome Completo
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="Nome e Sobrenome"
                              className="w-full bg-brand-purple/20 focus:bg-brand-purple/40 border border-brand-royal/20 focus:border-brand-neon text-white placeholder-zinc-700 p-4.5 rounded-2xl text-sm font-light outline-none transition-all duration-300"
                            />
                          </div>

                          {/* Email */}
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] text-brand-glow font-bold">
                              Endereço de E-mail
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="nome@exemplo.com"
                              className="w-full bg-brand-purple/20 focus:bg-brand-purple/40 border border-brand-royal/20 focus:border-brand-neon text-white placeholder-zinc-700 p-4.5 rounded-2xl text-sm font-light outline-none transition-all duration-300"
                            />
                          </div>

                          {/* Phone / WhatsApp with Prefix Selector */}
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] text-brand-glow font-bold">
                              Telefone de Contato (WhatsApp)
                            </label>
                            
                            <div className="flex gap-2">
                              {/* Prefix selector button */}
                              <div className="relative w-28 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => setIsOpenCountryDropdown(!isOpenCountryDropdown)}
                                  className="w-full bg-brand-purple/20 border border-brand-royal/20 hover:bg-brand-purple/30 text-white rounded-2xl p-4.5 flex justify-between items-center text-sm font-light outline-none focus:border-brand-neon transition-all"
                                >
                                  <span>{selectedCountry.flag} {selectedCountry.code}</span>
                                  <ChevronDown className="w-3 h-3 text-zinc-500" />
                                </button>

                                {/* Country Dropdown List */}
                                <AnimatePresence>
                                  {isOpenCountryDropdown && (
                                    <motion.ul
                                      initial={{ opacity: 0, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 5 }}
                                      className="absolute left-0 bottom-full mb-2 z-50 w-44 bg-brand-purple/95 border border-brand-royal/30 rounded-2xl shadow-xl overflow-hidden py-1"
                                    >
                                      {COUNTRY_CODES.map((country) => (
                                        <li key={country.code}>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setSelectedCountry(country);
                                              setIsOpenCountryDropdown(false);
                                            }}
                                            className="w-full text-left px-4 py-3 text-xs text-zinc-300 hover:text-white hover:bg-brand-royal/20 flex items-center gap-2 transition-all outline-none"
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
                                placeholder="DDD + Número"
                                className="w-full bg-brand-purple/20 focus:bg-brand-purple/40 border border-brand-royal/20 focus:border-brand-neon text-white placeholder-zinc-700 p-4.5 rounded-2xl text-sm font-light outline-none transition-all duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Footer Row */}
              <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between">
                {/* Back button */}
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-3.5 rounded-xl text-zinc-400 hover:text-white transition-colors text-xs uppercase tracking-wider font-semibold cursor-pointer inline-flex items-center gap-1.5 hover:bg-white/[0.02]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div className="w-10" />
                )}

                {/* Next / Submit Button */}
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
                    className="px-6 py-3.5 rounded-2xl bg-brand-royal text-white hover:bg-brand-royal/90 shadow-[0_10px_20px_rgba(128,0,255,0.15)] text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none disabled:shadow-none"
                  >
                    <span>Avançar</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStep6Valid || isSubmitting}
                    className="px-7 py-3.5 rounded-2xl bg-brand-neon text-brand-dark hover:bg-brand-neon/90 shadow-[0_10px_25px_rgba(0,255,191,0.2)] text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer inline-flex items-center justify-center min-w-[150px] disabled:opacity-30 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Finalizar</span>
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
