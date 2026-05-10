"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Star, 
  Play, 
  ArrowLeft,
  Sparkles,
  Award,
  Crown
} from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Essencial",
    price: "49,90",
    period: "mês",
    description: "Para quem busca iniciar a jornada de reconexão e reabilitação postural.",
    features: [
      "Acesso ao Módulo Iniciante",
      "Protocolos Diários de 15min",
      "Manual do Método (PDF)",
      "Suporte via Comunidade",
      "Acesso Mobile & Desktop"
    ],
    buttonText: "Começar Agora",
    highlight: false,
    icon: <Play size={24} className="text-white/40" />
  },
  {
    name: "Premium",
    price: "497,00",
    period: "ano",
    description: "O protocolo completo para transformação estética e funcional definitiva.",
    features: [
      "Todos os Módulos (Iniciante ao Pro)",
      "Protocolos de Estética Abdominal",
      "Mentoria Mensal em Grupo",
      "Aulas de Liberação Miofascial",
      "Comunidade VIP Exclusiva",
      "Bônus: Guia Nutricional"
    ],
    buttonText: "Garantir Acesso Premium",
    highlight: true,
    icon: <Crown size={24} className="text-brand-secondary" />,
    badge: "Mais Escolhido"
  },
  {
    name: "VIP Diamond",
    price: "1.997,00",
    period: "semestre",
    description: "Acompanhamento individualizado e personalizado com a Raphaela.",
    features: [
      "Tudo do Plano Premium",
      "Avaliação de Diástase Individual",
      "Treino Personalizado",
      "Check-in Quinzenal via Zoom",
      "Acesso Direto via WhatsApp",
      "Vagas Limitadas (Consulte)"
    ],
    buttonText: "Quero ser VIP",
    highlight: false,
    icon: <Award size={24} className="text-white/40" />
  }
];

export default function PlansPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5c4da7]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#a3d400]/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <nav className="relative z-50 p-6 md:p-12 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="group flex items-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-all">
          <ArrowLeft size={14} /> Voltar
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-lg md:text-xl font-serif italic tracking-tighter leading-none">Raphaela Barros</span>
          <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] opacity-30">LPF Studio</span>
        </div>
        <div className="w-16 hidden md:block" />
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 md:pt-20 pb-12 md:pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6 md:space-y-8"
        >
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.6em] text-brand-secondary italic">Escolha sua jornada</span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif italic tracking-tighter leading-[0.9] md:leading-[0.85]">
            Invista em <br /> <span className="not-italic font-black text-stroke">Você</span>
          </h1>
          <p className="text-base md:text-xl text-white/60 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Acesso imediato ao método que está transformando a saúde e a estética de centenas de mulheres em 2026.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative flex flex-col p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border group transition-all duration-500 ${
                plan.highlight 
                  ? "bg-white/[0.03] border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.05)]" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/5 to-transparent rounded-[2rem] md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-secondary text-black px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-xl z-20 whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-10 md:mb-12 flex justify-between items-start relative z-10">
                <div className="space-y-3 md:space-y-4">
                  <motion.div 
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center border border-white/5"
                  >
                    {plan.icon}
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-serif italic font-bold">{plan.name}</h3>
                </div>
                <div className="text-right">
                   <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-30 mb-1">A partir de</p>
                   <div className="flex items-baseline justify-end gap-1">
                      <span className="text-xs md:text-sm font-bold opacity-40">R$</span>
                      <span className="text-3xl md:text-5xl font-serif italic font-black">{plan.price.split(',')[0]}</span>
                      <span className="text-base md:text-lg font-serif italic opacity-40">,{plan.price.split(',')[1]}</span>
                   </div>
                   <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-30 mt-1">/ {plan.period}</p>
                </div>
              </div>

              <p className="text-sm text-white/40 font-light leading-relaxed mb-8 md:mb-10 relative z-10">
                {plan.description}
              </p>

              <ul className="space-y-4 md:space-y-6 flex-1 mb-10 md:mb-12 relative z-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 md:gap-4 items-center">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                      <Check size={10} className={plan.highlight ? "text-brand-secondary" : "text-white/40"} />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 md:py-6 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 md:gap-4 transition-all group relative overflow-hidden ${
                plan.highlight 
                  ? "bg-white text-black hover:scale-[1.02] shadow-[0_20px_50px_rgba(255,255,255,0.1)]" 
                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
              }`}>
                {plan.highlight && (
                   <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12"
                   />
                )}
                <span className="relative z-10 flex items-center gap-3 md:gap-4">
                  {plan.buttonText}
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof Mini Section */}
      <section className="py-16 md:py-20 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 opacity-40 md:grayscale md:hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-4 text-center md:text-left">
              <ShieldCheck size={28} className="md:w-8 md:h-8" />
              <div className="leading-none">
                 <p className="text-xl md:text-2xl font-serif italic font-bold uppercase tracking-tight">100% SEGURO</p>
                 <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Pagamento Criptografado</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-center md:text-left">
              <Zap size={28} className="md:w-8 md:h-8" />
              <div className="leading-none">
                 <p className="text-xl md:text-2xl font-serif italic font-bold uppercase tracking-tight">ACESSO IMEDIATO</p>
                 <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Comece agora mesmo</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-center md:text-left">
              <Star size={28} className="md:w-8 md:h-8" />
              <div className="leading-none">
                 <p className="text-xl md:text-2xl font-serif italic font-bold uppercase tracking-tight">7 DIAS GRÁTIS</p>
                 <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">Garantia Incondicional</p>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ / Doubts */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          <div className="text-center space-y-3 md:space-y-4">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.6em] text-white/40 italic">Transparência</span>
            <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter">Perguntas <br /> <span className="not-italic font-black text-stroke-thin">Frequentes</span></h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            {[
              { q: "O método serve para iniciantes?", a: "Sim! Temos um módulo específico de introdução para quem nunca praticou LPF ou técnicas hipopressivas." },
              { q: "Quanto tempo por dia preciso dedicar?", a: "Nossos protocolos são otimizados para a rotina da mulher moderna. Com apenas 15 a 20 minutos diários você já verá resultados." },
              { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com seus dados de login para nossa área exclusiva." },
              { q: "Posso cancelar quando quiser?", a: "No plano mensal, você pode cancelar a qualquer momento sem fidelidade. No anual, você garante o melhor preço e acesso por 12 meses." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.01] hover:bg-white/[0.02] transition-all"
              >
                <h4 className="text-base md:text-xl font-serif italic font-bold mb-3 md:mb-4 flex items-start gap-4">
                  <Sparkles size={14} className="text-brand-secondary shrink-0 mt-1 md:w-4 md:h-4" />
                  {faq.q}
                </h4>
                <p className="text-xs md:text-sm text-white/40 leading-relaxed font-light pl-8">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 flex flex-col items-center gap-8 opacity-20">
        <span className="text-xl font-serif italic tracking-tighter">Raphaela Barros</span>
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">© 2026 LPF Studio • Transformação em Movimento</p>
      </footer>

    </div>
  );
}
