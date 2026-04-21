"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default function ProgramasPage() {
  const programas = [
    {
      id: "01",
      title: "Protocolo Start",
      subtitle: "Reabilitação Base",
      desc: "O despertar do seu core. Foco total em técnica respiratória e correção postural básica.",
      image: "/line-drawing.png",
      tag: "Iniciante"
    },
    {
      id: "02",
      title: "Flow & Tone",
      subtitle: "Estética Avançada",
      desc: "Sequências dinâmicas para potencializar a queima calórica e a definição abdominal.",
      image: "/dynamic-woman.png",
      tag: "Intermediário"
    },
    {
      id: "03",
      title: "Power Core",
      subtitle: "Performance Máxima",
      desc: "O nível mais alto de desafio hipopressivo. Para quem já domina a técnica e busca perfeição.",
      image: "/weightlifting.png",
      tag: "Avançado"
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/bg-green-surface.png" alt="Background Texture" fill className="object-cover blur-[4px] opacity-10" />
      </div>
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 h-24 flex items-center">
        <Link href="/" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-all">
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
      </nav>

      <main className="pt-40 px-10 md:px-20 max-w-7xl mx-auto pb-40 space-y-40">
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="h-px w-20 bg-white/40"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/60">Escolha sua Jornada</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter">
            Programas <br /> <span className="not-italic font-black text-stroke">Exclusivos</span>
          </h1>
        </section>

        <div className="grid grid-cols-1 gap-12">
          {programas.map((prog, i) => (
            <motion.div 
              key={prog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-editorial p-10 md:p-20 overflow-hidden flex flex-col md:flex-row items-center gap-20 hover:bg-white/[0.04] transition-all"
            >
              <div className="md:w-1/3 relative aspect-square">
                 <Image src={prog.image} alt={prog.title} fill className="object-contain opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0" />
              </div>
              <div className="md:w-2/3 space-y-8">
                 <div className="space-y-2">
                    <span className="text-brand-secondary font-black text-[10px] uppercase tracking-[0.4em]">{prog.tag}</span>
                    <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter">{prog.title}</h2>
                    <p className="text-xl text-white/40 font-serif italic">{prog.subtitle}</p>
                 </div>
                 <p className="text-lg text-white/60 leading-relaxed font-light max-w-md">{prog.desc}</p>
                 <button className="bg-white text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all">
                    Explorar Conteúdo <Plus size={16} />
                 </button>
              </div>
              <span className="absolute top-10 right-10 text-8xl font-serif italic text-white/[0.03] select-none">{prog.id}</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
