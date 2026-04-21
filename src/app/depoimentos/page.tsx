"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, Star } from "lucide-react";
import Link from "next/link";

export default function DepoimentosPage() {
  const depoimentos = [
    {
      name: "Ana Cláudia",
      role: "Aluna há 6 meses",
      text: "O Studio LPF mudou minha relação com meu corpo. Minha postura melhorou 100% e a diástase que me incomodava sumiu.",
      stars: 5
    },
    {
      name: "Mariana Silva",
      role: "Pós-parto real",
      text: "Depois da gravidez achei que nunca mais teria minha cintura de volta. Com 2 meses de método Raphaela Barros, os resultados são inacreditáveis.",
      stars: 5
    },
    {
      name: "Carla Ferreira",
      role: "Foco em Saúde",
      text: "Muito mais que estética. Sinto meu core fortalecido e as dores nas costas desapareceram por completo.",
      stars: 5
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/apple-in-water.png" alt="Background Texture" fill className="object-cover blur-[2px] opacity-10" />
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
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/60">Vozes da Transformação</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter">
            Histórias que <br /> <span className="not-italic font-black text-stroke">Inspiram</span>
          </h1>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {depoimentos.map((dep, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-12 border border-white/5 rounded-editorial bg-white/[0.02] flex flex-col justify-between space-y-12 relative z-10"
             >
                <div className="space-y-6">
                   <Quote className="text-brand-secondary opacity-40" size={40} />
                   <p className="text-xl font-serif italic leading-relaxed text-white/80">
                      &quot;{dep.text}&quot;
                   </p>
                </div>
                
                <div className="space-y-4">
                   <div className="flex gap-1">
                      {[...Array(dep.stars)].map((_, j) => (
                        <Star key={j} size={14} fill="#a3d400" stroke="#a3d400" />
                      ))}
                   </div>
                   <div>
                      <p className="font-bold text-sm uppercase tracking-widest">{dep.name}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">{dep.role}</p>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </main>
    </div>
  );
}
