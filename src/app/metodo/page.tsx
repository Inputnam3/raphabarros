"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Zap, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MetodoPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/bg-green-leaf.png" alt="Background Texture" fill className="object-cover blur-[3px] opacity-10" />
      </div>
      {/* Mini Nav de Retorno */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 h-24 flex items-center">
        <Link href="/" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-all">
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
      </nav>

      <main className="pt-40 px-10 md:px-20 max-w-7xl mx-auto pb-40 space-y-40">
        {/* Intro */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="h-px w-20 bg-white/40"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/60">A Ciência por trás</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter max-w-4xl">
            Low Pressure <br /> <span className="not-italic font-black text-stroke">Fitness</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-white/50 max-w-2xl leading-relaxed">
            O LPF é um sistema de treinamento postural e respiratório que utiliza a hipopressão abdominal para reduzir a pressão nas cavidades pélvica, abdominal e torácica.
          </p>
        </section>

        {/* Deep Dive Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h3 className="text-4xl font-serif italic">Reprogramação Postural</h3>
            <p className="text-white/40 leading-relaxed font-light">
              Através de posturas específicas, trabalhamos o alongamento das cadeias musculares e a liberação miofascial, resultando em uma postura elegante e funcional.
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-4xl font-serif italic">Técnica Respiratória</h3>
            <p className="text-white/40 leading-relaxed font-light">
              O vácuo abdominal (aspiração diafragmática) promove uma massagem interna nos órgãos e a ativação reflexa do core.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <section className="space-y-20">
          <h2 className="text-5xl md:text-7xl font-serif text-center italic">Resultados <span className="not-italic font-black">Reais</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: "Diminuição de Cintura", desc: "Redução imediata e progressiva da circunferência abdominal." },
               { title: "Recuperação Pós-Parto", desc: "Tratamento eficaz para diástase e tonificação do core." },
               { title: "Saúde Sexual", desc: "Melhoria da circulação e tônus da região pélvica." }
             ].map((item, i) => (
               <div key={i} className="p-12 border border-white/5 rounded-editorial bg-white/[0.02]">
                  <h4 className="text-2xl font-serif italic font-bold mb-4">{item.title}</h4>
                  <p className="text-sm text-white/40 font-light leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </section>
      </main>
    </div>
  );
}
