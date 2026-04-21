"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Menu, Activity, ShieldCheck, Zap, Heart, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const navLinks = [
    { name: "O Método", href: "/metodo" },
    { name: "Programas", href: "/programas" },
    { name: "Evolução", href: "/evolucao" },
    { name: "Depoimentos", href: "/depoimentos" },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  // Splash Screen Timer
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Forçar play quando a splash sai
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Autoplay prevent: ", error);
        });
      }
    }, 4500); 
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Navbar Logic: Hide on scroll down, Show on scroll up
  React.useEffect(() => {
    return scrollY.on("change", (current) => {
      const diff = current - lastScrollY;
      if (current < 100) {
        setIsNavVisible(true);
      } else if (diff > 10) {
        setIsNavVisible(false);
      } else if (diff < -10) {
        setIsNavVisible(true);
      }
      setLastScrollY(current);
    });
  }, [scrollY, lastScrollY]);

  const videoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const videoScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] text-white">
      
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              filter: "blur(20px)",
              transition: { duration: 1.5, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4 overflow-hidden py-10">
               <motion.span
                 initial={{ y: 100, opacity: 0 }}
                 animate={{ 
                   y: [100, 0, 0, -10], 
                   opacity: [0, 1, 1, 0.5] 
                 }}
                 transition={{ 
                   duration: 4, 
                   times: [0, 0.2, 0.8, 1],
                   ease: "easeInOut"
                 }}
                 className="text-4xl md:text-7xl font-serif italic tracking-tighter"
               >
                 Raphaela Barros
               </motion.span>
               
               <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ 
                   y: [20, 0, 0], 
                   opacity: [0, 0, 1] 
                 }}
                 transition={{ 
                   duration: 4, 
                   times: [0, 0.4, 0.6],
                   ease: "easeOut"
                 }}
                 className="flex items-center justify-center"
               >
                 <span className="text-[10px] font-black uppercase tracking-[1em] text-white/40">
                   LPF Studio
                 </span>
               </motion.div>

               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 3.5, ease: "linear" }}
                 className="absolute bottom-0 left-0 h-[1px] bg-white/20"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Navbar */}
      <motion.nav 
        animate={{ y: isNavVisible ? 0 : -120, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-10 md:px-20 h-28 pointer-events-none"
      >
        <div className="pointer-events-auto flex flex-col leading-none">
          <span className="text-3xl md:text-4xl font-serif italic tracking-tighter cursor-pointer hover:opacity-70 transition-opacity">Raphaela Barros</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/40 ml-1">LPF Studio</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-12 pointer-events-auto">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 hover:opacity-100 hover:text-white transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6 pointer-events-auto">
          <Link href="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black px-8 py-3 rounded-full hover:bg-white/90 transition-all">
            Área Pro
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 glass-dark hover:border-white/40 transition-all group relative z-[110]"
          >
            <Menu size={22} className={`group-hover:scale-110 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{ 
          clipPath: isMobileMenuOpen 
            ? "circle(150% at 90% 5%)" 
            : "circle(0% at 90% 5%)" 
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-[#0a0a0a] z-[105] flex flex-col justify-center px-10 md:px-20"
      >
        <div className="space-y-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 italic">Navegação</span>
          <div className="flex flex-col gap-6">
            {navLinks.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: isMobileMenuOpen ? 0 : -20, opacity: isMobileMenuOpen ? 1 : 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <Link 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-6xl md:text-8xl font-serif italic tracking-tighter hover:text-stroke transition-all"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ delay: 0.8 }}
            className="pt-10 flex flex-col gap-8"
          >
             <Link 
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-white text-black px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] w-fit"
             >
                Acessar Área Pro
             </Link>
             <div className="flex gap-6 opacity-40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <Play size={20} />
             </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero: Immersive Video Reveal */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: videoOpacity, scale: videoScale }}
          className="absolute inset-0 z-0"
        >
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            preload="auto"
            className="w-full h-full object-cover grayscale-[0.3] contrast-[1.1] brightness-[0.7]"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]"></div>
        </motion.div>

        <motion.div 
          style={{ y: heroTextY }}
          className="relative z-10 w-full px-10 md:px-20"
        >
          <div className="max-w-7xl mx-auto flex flex-col items-start gap-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-8xl md:text-[16rem] font-serif leading-[0.75] tracking-tighter"
            >
              Respira, <br />
              <span className="italic font-extralight text-stroke-thick">Mulher</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col md:flex-row items-end gap-16 w-full justify-between"
            >
              <p className="text-xl md:text-2xl font-serif italic text-white/70 max-w-md leading-relaxed">
                A reconexão profunda com seu core através de um método que une ciência, estética e o poder da sua respiração.
              </p>
              <div className="flex flex-col items-center gap-4">
                 <div className="w-px h-24 bg-gradient-to-b from-white to-transparent opacity-20"></div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Desça para explorar</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Methodology Section: The Premium Offer */}
      <section className="relative z-20 py-40 px-10 md:px-20 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           <Image src="/bg-blossoms.png" alt="Texture" fill className="object-cover blur-[2px] opacity-10" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 relative z-10">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-12">
            <div className="space-y-4">
              <span className="text-white/40 font-black text-[10px] uppercase tracking-[0.5em]">The Methodology</span>
              <h2 className="text-7xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter">Ciência em <br /> <span className="not-italic font-black text-stroke">Movimento</span></h2>
            </div>
            
            <div className="space-y-8 text-lg text-white/60 font-light leading-relaxed">
              <p>
                O Método Raphaela Barros não é apenas uma sequência de vídeos. É uma jornada guiada de **Reabilitação Funcional** e **Estética Abdominal**, focada em resultados que você sente no primeiro ciclo.
              </p>
              <ul className="space-y-6 pt-4">
                {[
                  { title: "Protocolo Diário em Vídeo", desc: "Aulas práticas de alta definição com foco em técnica e consciência." },
                  { title: "Mentoria de Resultados", desc: "Acompanhamento da evolução de medidas e marcos posturais." },
                  { title: "Comunidade Exclusiva", desc: "Troca de experiências com centenas de mulheres no mesmo propósito." }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-6 items-start"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-3 shrink-0" />
                    <div>
                      <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-sm opacity-60">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="pt-10">
              <button className="bg-white text-black px-12 py-6 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                Quero Acesso Premium 
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] overflow-hidden rounded-editorial shadow-2xl border border-white/5"
            >
              <Image 
                src="/autoridade.jpg" 
                alt="Treinamento Premium" 
                fill 
                className="object-cover brightness-90 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </motion.div>
            
            <div className="absolute -bottom-10 -left-10 bg-white text-black p-10 hidden md:block shadow-2xl">
               <Activity className="mb-4" />
               <span className="text-5xl font-serif italic leading-none">MÉTODO</span>
               <p className="text-[10px] font-bold uppercase tracking-widest mt-2 opacity-60">Resultados Comprovados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision 2026 & Benefits Section */}
      <section className="py-40 px-10 md:px-20 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5 space-y-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/40 italic">A sua nova era</span>
              <h3 className="text-6xl md:text-8xl font-serif italic leading-[0.9] tracking-tighter">Corpo Leve, <br /> Postura de <span className="not-italic font-black text-stroke">Poder</span></h3>
              <p className="text-xl text-white/60 font-serif italic leading-relaxed max-w-sm">
                &quot;O ano de 2026 marca a decisão de não apenas existir, mas de ocupar seu espaço com autoridade e vitalidade.&quot;
              </p>
            </div>
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <motion.div 
                 initial={{ y: 100, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 className="relative aspect-video lg:aspect-[2/3] w-full max-w-[500px] overflow-hidden rounded-editorial shadow-2xl border border-white/5"
              >
                <Image 
                  src="/bem-vindo-2026.jpg" 
                  alt="Bem-vindo 2026" 
                  fill 
                  className="object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-1000 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
              </motion.div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Zap className="text-brand-secondary" size={32} />, 
                title: "Cintura Esculpida", 
                desc: "Ativação profunda do transverso abdominal para redução real de medidas." 
              },
              { 
                icon: <ShieldCheck className="text-white/60" size={32} />, 
                title: "Saúde Pélvica", 
                desc: "Fortalecimento do assoalho pélvico e reabilitação de diástase funcional." 
              },
              { 
                icon: <Activity className="text-brand-secondary" size={32} />, 
                title: "Postura Impecável", 
                desc: "Reposicionamento dos órgãos e realinhamento da coluna vertebral." 
              },
              { 
                icon: <Heart className="text-white/60" size={32} />, 
                title: "Consciência Corporal", 
                desc: "Melhoria na capacidade respiratória e gestão da pressão interna." 
              }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all rounded-[2rem] space-y-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/5 shadow-inner">
                  {benefit.icon}
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-serif italic font-bold tracking-tight">{benefit.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-60 px-10 md:px-20 bg-[#0a0a0a] relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-[#5c4da7]/10 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-secondary italic">Sua hora é agora</span>
            <h2 className="text-7xl md:text-[10rem] font-serif leading-[0.8] tracking-tighter">Assuma o <br /> <span className="italic font-extralight text-stroke-thick">Controle</span></h2>
          </motion.div>
          
          <p className="text-xl md:text-2xl font-serif italic text-white/60 leading-relaxed max-w-2xl mx-auto">
            Junte-se a centenas de mulheres que decidiram não aceitar nada menos que a excelência em saúde e estética.
          </p>

          <div className="flex flex-col items-center gap-12 pt-10">
             <button className="group relative">
                <div className="absolute inset-0 bg-white blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-white text-black px-16 py-8 rounded-full text-xs font-black uppercase tracking-[0.4em] flex items-center gap-6 hover:scale-105 active:scale-95 transition-all">
                  Garantir Acesso Premium
                  <ArrowRight size={20} />
                </div>
             </button>
             
             <div className="flex items-center gap-10 opacity-30 text-[9px] font-black uppercase tracking-[0.3em]">
                <span className="flex items-center gap-2"><ShieldCheck size={14} /> Compra Segura</span>
                <span className="flex items-center gap-2"><Sparkles size={14} /> Acesso Imediato</span>
                <span className="flex items-center gap-2"><Activity size={14} /> Garantia de 7 Dias</span>
             </div>
          </div>
        </div>
      </section>

      {/* Final Section / Footer Context */}
      <footer className="py-20 px-10 border-t border-white/5 flex flex-col items-center gap-10">
        <span className="text-2xl font-serif italic opacity-40">Raphaela Barros</span>
        <div className="flex gap-8 opacity-40">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="20"
             height="20"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             className="hover:opacity-100 cursor-pointer transition-opacity"
           >
             <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
             <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
             <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
           </svg>
           <Play size={20} className="hover:opacity-100 cursor-pointer transition-opacity" />
        </div>
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-20">© 2026 LPF Studio • Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
