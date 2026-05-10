"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Menu, X, Activity, ShieldCheck, Zap, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // GSAP Animations
  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect for images
    const images = gsap.utils.toArray(".gsap-parallax") as HTMLElement[];
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Reveal text animation
    const reveals = gsap.utils.toArray(".gsap-reveal") as HTMLElement[];
    reveals.forEach((el) => {
      gsap.from(el, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Scale animation for sections
    const zoomContainers = gsap.utils.toArray(".gsap-zoom") as HTMLElement[];
    zoomContainers.forEach((container) => {
      gsap.from(container, {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "top 50%",
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  const [isNavVisible, setIsNavVisible] = React.useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("splashShown");
    }
    return false;
  });
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const navLinks = [
    { name: "O Método", href: "/metodo" },
    { name: "Programas", href: "/programas" },
    { name: "Planos", href: "/planos" },
    { name: "Evolução", href: "/evolucao" },
    { name: "Depoimentos", href: "/depoimentos" },
  ];

  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Split text for cinematic animation
  const name = "Raphaela Barros";
  const letters = name.split("");

  // Splash Screen Timer with Session Persistence
  React.useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true");
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.log("Autoplay prevent: ", error);
          });
        }
      }, 4500); 
      return () => clearTimeout(timer);
    } else {
      // Ensure video plays if splash is skipped
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Autoplay prevent: ", error);
        });
      }
    }
  }, [showSplash]);

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
              scale: 1.1,
              filter: "blur(40px)",
              transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
            }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center pointer-events-none overflow-hidden"
          >
            {/* Cinematic Background Glow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.15, 0.1], scale: [0.8, 1.2, 1.1] }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="absolute w-[80vw] h-[80vw] bg-white/10 rounded-full blur-[120px]"
            />

            <div className="flex flex-col items-center gap-12 relative z-10">
               <div className="flex overflow-hidden">
                 {letters.map((char, i) => (
                   <motion.span
                     key={i}
                     initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
                     animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                     transition={{ 
                       duration: 1.2, 
                       delay: i * 0.05 + 0.5,
                       ease: [0.22, 1, 0.36, 1]
                     }}
                     className={`text-4xl md:text-8xl font-serif italic tracking-tighter ${char === " " ? "mr-4 md:mr-8" : ""}`}
                   >
                     {char}
                   </motion.span>
                 ))}
               </div>
               
               <motion.div
                 initial={{ opacity: 0, letterSpacing: "0.2em" }}
                 animate={{ opacity: 1, letterSpacing: "1em" }}
                 transition={{ 
                   duration: 2.5, 
                   delay: 1.5,
                   ease: "easeOut"
                 }}
                 className="flex items-center justify-center"
               >
                 <span className="text-[10px] font-black uppercase text-white/40">
                   LPF Studio
                 </span>
               </motion.div>

               <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-white/5 overflow-hidden">
                 <motion.div 
                   initial={{ x: "-100%" }}
                   animate={{ x: "100%" }}
                   transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                   className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                 />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Navbar */}
      <motion.nav 
        animate={{ y: isNavVisible ? 0 : -120, opacity: isNavVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[100] grid grid-cols-3 items-center px-4 md:px-20 h-24 md:h-28 pointer-events-none"
      >
        <div className="flex items-center pointer-events-auto">
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-[9px] font-black uppercase tracking-[0.3em] opacity-50 hover:opacity-100 hover:text-white transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center leading-none pointer-events-auto">
          <Link href="/" className="flex flex-col items-center group">
            <span className="text-xl md:text-3xl font-serif italic tracking-tighter group-hover:opacity-70 transition-opacity whitespace-nowrap">Raphaela Barros</span>
            <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.5em] text-white/40 mt-1">LPF Studio</span>
          </Link>
        </div>
        
        <div className="flex items-center justify-end gap-4 md:gap-8 pointer-events-auto">
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-[9px] font-black uppercase tracking-[0.3em] opacity-50 hover:opacity-100 hover:text-white transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Link href="/login" className="hidden sm:block text-[9px] font-black uppercase tracking-[0.3em] bg-white text-black px-6 py-2.5 rounded-full hover:bg-white/90 transition-all">
            Área Pro
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center p-3 transition-all group relative z-[110] bg-white/5 backdrop-blur-md rounded-full lg:bg-transparent"
          >
            <Menu size={20} className={`group-hover:scale-110 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-[#0a0a0a]/90 z-[105] flex flex-col justify-center px-8 md:px-20"
          >
            {/* Background Accent for Menu */}
            <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-10 right-8 p-3 bg-white/5 rounded-full border border-white/10 text-white/60"
            >
              <X size={20} />
            </button>

            <div className="space-y-10 md:space-y-12 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-secondary">Menu</span>
              <div className="flex flex-col gap-6 md:gap-8">
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                  >
                    <Link 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-5xl md:text-8xl font-serif italic tracking-tighter hover:text-brand-secondary transition-all flex items-center gap-4 group"
                    >
                      <span className="text-[12px] font-black not-italic opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-10 flex flex-col gap-8"
              >
                 <Link 
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-white text-black px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.4em] w-fit shadow-2xl"
                 >
                    Área de Alunas
                 </Link>
                 
                 <div className="flex items-center gap-8 opacity-40 pt-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Siga-nos</span>
                    <div className="h-px w-12 bg-white/20" />
                    <div className="flex gap-6">
                       <Zap size={18} className="hover:text-brand-secondary cursor-pointer transition-colors" />
                       <Heart size={18} className="hover:text-brand-secondary cursor-pointer transition-colors" />
                    </div>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero: Immersive Video Reveal */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden px-6 md:px-20">
        <motion.div 
          style={{ opacity: videoOpacity, scale: videoScale }}
          className="absolute inset-0 z-0 bg-[#0a0a0a]"
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
          className="relative z-10 w-full"
        >
          <div className="max-w-7xl mx-auto flex flex-col items-start gap-8 md:gap-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl sm:text-8xl md:text-[14rem] lg:text-[16rem] font-serif leading-[0.8] md:leading-[0.75] tracking-tighter"
            >
              Respira, <br />
              <span className="italic font-extralight text-stroke-thick">Mulher</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col md:flex-row items-start md:items-end gap-8 md:gap-16 w-full justify-between"
            >
              <p className="text-lg md:text-2xl font-serif italic text-white/70 max-w-md leading-relaxed">
                A reconexão profunda com seu core através de um método que une ciência, estética e o poder da sua respiração.
              </p>
              
              {/* Animated Scroll Indicator for Mobile */}
              <div className="flex flex-col items-center gap-4">
                 <div className="relative w-px h-16 md:h-24 bg-white/10 overflow-hidden">
                    <motion.div 
                      animate={{ y: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-brand-secondary to-transparent"
                    />
                 </div>
                 <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Explorar</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Methodology Section: The Premium Offer */}
      <section className="gsap-zoom relative z-20 py-24 md:py-40 px-6 md:px-20 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           <Image src="/bg-blossoms.png" alt="Texture" fill className="object-cover blur-[2px] opacity-10" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 relative z-10">
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8 md:space-y-12 gsap-reveal">
            <div className="space-y-4">
              <span className="text-white/40 font-black text-[10px] uppercase tracking-[0.5em]">The Methodology</span>
              <h2 className="text-5xl sm:text-6xl md:text-9xl font-serif italic leading-[0.9] md:leading-[0.8] tracking-tighter">Ciência em <br /> <span className="not-italic font-black text-stroke">Movimento</span></h2>
            </div>
            
            <div className="space-y-6 md:space-y-8 text-base md:text-lg text-white/60 font-light leading-relaxed">
              <p className="font-serif italic text-xl md:text-2xl text-white/80">
                O Método Raphaela Barros transcende a simples prática de exercícios. É uma jornada curada de <span className="text-white font-bold not-italic">Reabilitação Funcional</span> e <span className="text-white font-bold not-italic">Estética Abdominal</span>, projetada para resultados que se manifestam desde o primeiro ciclo.
              </p>
              <ul className="space-y-6 md:space-y-10 pt-4 md:pt-6">
                {[
                  { title: "Protocolo Diário em Vídeo", desc: "Aulas em altíssima definição com foco absoluto em precisão técnica e consciência visceral." },
                  { title: "Mentoria de Resultados", desc: "Acompanhamento cirúrgico da sua evolução, medidas e marcos posturais." },
                  { title: "Comunidade Exclusiva", desc: "Um ecossistema de mulheres determinadas, compartilhando o mesmo propósito de excelência." }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex gap-6 md:gap-8 items-start group"
                  >
                    <div className="relative mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-brand-secondary blur-sm animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-serif italic text-lg md:text-xl tracking-tight group-hover:text-brand-secondary transition-colors">{item.title}</h4>
                      <p className="text-xs md:text-sm opacity-50 font-light leading-relaxed max-w-sm">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="pt-6 md:pt-10">
              <Link href="/planos" className="bg-white text-black px-8 md:px-12 py-5 md:py-6 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 w-full sm:w-fit group">
                Quero Acesso Premium 
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
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
                className="gsap-parallax object-cover brightness-90 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </motion.div>
            
            <div className="absolute -bottom-6 md:-bottom-10 -left-6 md:-left-10 bg-white text-black p-6 md:p-10 shadow-2xl gsap-reveal">
               <Activity className="mb-2 md:mb-4" size={24} />
               <span className="text-3xl md:text-5xl font-serif italic leading-none">MÉTODO</span>
               <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-1 md:mt-2 opacity-60">Resultados Comprovados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision 2026 & Benefits Section */}
      <section className="py-24 md:py-48 px-6 md:px-20 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-32 md:space-y-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center gsap-reveal">
            <div className="lg:col-span-6 space-y-10 md:space-y-14">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-secondary italic">Manifesto 2026</span>
                <h3 className="text-6xl md:text-[9rem] font-serif italic leading-[0.85] md:leading-[0.8] tracking-tighter">Corpo Leve, <br /> Postura de <span className="not-italic font-black text-stroke-thick">Poder</span></h3>
              </div>
              
              <div className="space-y-8">
                <p className="text-xl md:text-3xl text-white/80 font-serif italic leading-relaxed max-w-xl">
                  &quot;O ano de 2026 não é apenas um marco temporal, é a fronteira onde você deixa de apenas existir para <span className="text-white font-bold not-italic">ocupar seu espaço</span> com autoridade máxima.&quot;
                </p>
                <div className="flex items-center gap-6">
                  <div className="h-px w-16 bg-white/20" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Raphaela Barros • LPF Specialist</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 whileInView={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                 className="relative aspect-[4/5] w-full max-w-[550px] overflow-hidden rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 group"
              >
                <Image 
                  src="/bem-vindo-2026.jpg" 
                  alt="A Nova Era da Estética" 
                  fill 
                  className="gsap-parallax object-cover grayscale-[0.3] brightness-90 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[2s] object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80"></div>
                
                {/* Float Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl z-20"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondary block mb-1">Transformação</span>
                  <span className="text-2xl font-serif italic text-white tracking-tighter">Lifestyle Pro</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Benefits Grid - The Pillars */}
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-12 text-center md:text-left">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">The Pillars</span>
                <h4 className="text-4xl md:text-5xl font-serif italic tracking-tighter">Resultados de <span className="font-black not-italic text-stroke-thin">Alta Performance</span></h4>
              </div>
              <p className="text-xs md:text-sm text-white/40 uppercase font-black tracking-widest max-w-[280px] leading-relaxed">
                Quatro pilares fundamentais projetados para redefinir sua relação com o próprio corpo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
              {[
                { 
                  icon: <Zap className="text-brand-secondary" size={28} />, 
                  title: "Cintura Esculpida", 
                  desc: "Ativação neuro-muscular profunda do transverso para uma redução progressiva de medidas." 
                },
                { 
                  icon: <ShieldCheck className="text-brand-secondary/60" size={28} />, 
                  title: "Saúde Pélvica", 
                  desc: "Fortalecimento sistêmico do assoalho pélvico e reabilitação avançada de diástase." 
                },
                { 
                  icon: <Activity className="text-brand-secondary" size={28} />, 
                  title: "Postura Inabalável", 
                  desc: "Reposicionamento orgânico e realinhamento da cadeia posterior para elegância funcional." 
                },
                { 
                  icon: <Heart className="text-brand-secondary/60" size={28} />, 
                  title: "Domínio Respiratório", 
                  desc: "Gestão inteligente da pressão intra-abdominal e expansão da capacidade vital." 
                }
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="group relative p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-brand-secondary/20 transition-all duration-500 rounded-[2.5rem] flex flex-col gap-10 overflow-hidden"
                >
                  {/* Card Background Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="w-16 h-16 rounded-[1.25rem] bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-secondary/10 transition-all duration-500 border border-white/10 shadow-inner">
                    {benefit.icon}
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                    <h5 className="text-2xl md:text-3xl font-serif italic font-bold tracking-tighter group-hover:text-white transition-colors">{benefit.title}</h5>
                    <p className="text-xs md:text-sm text-white/30 group-hover:text-white/50 leading-relaxed font-light transition-colors">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section: The Invitation */}
      <section className="py-24 md:py-72 px-6 md:px-20 bg-[#0a0a0a] relative overflow-hidden">
        {/* Massive Backdrop Text - Responsive sizing and opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.015] whitespace-nowrap z-0">
          <span className="text-[10rem] sm:text-[20rem] md:text-[40rem] font-black uppercase tracking-tighter">TRANSFORM</span>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl aspect-square bg-brand-secondary/5 rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-12 md:space-y-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-4 md:space-y-10"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.8em] text-brand-secondary">O seu convite final</span>
              <div className="h-px w-12 md:w-20 bg-brand-secondary/30" />
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-[13rem] font-serif leading-[0.85] md:leading-[0.75] tracking-tighter italic">
              Seu novo <br /> <span className="not-italic font-black text-stroke-thick">Capítulo</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-4xl font-serif italic text-white/50 leading-relaxed max-w-3xl mx-auto px-4"
          >
            A decisão de hoje ecoará em cada movimento seu de amanhã. Não aceite menos que a sua melhor versão.
          </motion.p>

          <div className="flex flex-col items-center gap-12 md:gap-16 pt-10 md:pt-14">
             <Link href="/planos" className="group relative w-full sm:w-auto">
                {/* Magnetic Glow Effect */}
                <div className="absolute inset-0 bg-brand-secondary blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                
                <div className="relative bg-white text-black px-12 md:px-24 py-8 md:py-10 rounded-full text-[11px] md:text-sm font-black uppercase tracking-[0.5em] flex items-center justify-center gap-6 md:gap-8 hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_30px_100px_rgba(255,255,255,0.1)]">
                  Começar Transformação
                  <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform duration-500" />
                </div>
             </Link>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 opacity-30">
                {[
                  { icon: <ShieldCheck size={18} />, label: "Ambiente Seguro" },
                  { icon: <Sparkles size={18} />, label: "Acesso Instantâneo" },
                  { icon: <Activity size={18} />, label: "Garantia Total" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em]">
                    <span className="text-brand-secondary">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Footer: The Final Touch */}
      <footer className="py-20 md:py-32 px-6 md:px-20 border-t border-white/5 relative overflow-hidden bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 md:gap-0">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-2xl md:text-4xl font-serif italic tracking-tighter">Raphaela Barros</span>
            <p className="text-[10px] font-bold uppercase tracking-[0.6em] opacity-20">LPF Specialist & Performance Coach</p>
          </div>

          <div className="flex gap-12">
            {[
              { icon: <Play size={24} />, label: "YouTube" },
              { icon: <Zap size={24} />, label: "Instagram" },
              { icon: <Heart size={24} />, label: "TikTok" }
            ].map((social, i) => (
              <button key={i} className="group flex flex-col items-center gap-3">
                <div className="p-4 rounded-full border border-white/5 group-hover:border-brand-secondary/40 group-hover:text-brand-secondary transition-all">
                  {social.icon}
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-40 transition-opacity">{social.label}</span>
              </button>
            ))}
          </div>

          <div className="text-center md:text-right space-y-4">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">© 2026 LPF Studio • All Rights Reserved</p>
             <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-10">Desenvolvido com excelência por Vision Labs</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
