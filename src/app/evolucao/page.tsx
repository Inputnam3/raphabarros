"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Calendar, Award } from "lucide-react";
import Link from "next/link";

export default function EvolucaoPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/bg-blossoms.png" alt="Background Texture" fill className="object-cover blur-[2px] opacity-10" />
      </div>
      <nav className="fixed top-0 left-0 w-full z-[100] px-10 h-24 flex items-center">
        <Link href="/" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-all">
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
      </nav>

      <main className="pt-40 px-10 md:px-20 max-w-7xl mx-auto pb-40 space-y-40">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7 space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-px w-20 bg-white/40"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/60">Sua Jornada</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter">
              Evolução <br /> <span className="not-italic font-black text-stroke">Contínua</span>
            </h1>
            <p className="text-xl md:text-2xl font-serif italic text-white/50 max-w-xl leading-relaxed">
              O LPF não é apenas sobre perder medidas, é sobre ganhar consciência, saúde e uma nova postura diante da vida.
            </p>
          </div>
          <div className="lg:col-span-5 relative aspect-square">
             <Image src="/dynamic-woman.png" alt="Evolução" fill className="object-contain grayscale opacity-60" />
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: <TrendingUp />, label: "Circunferência", value: "-6cm", sub: "Média no 1º mês" },
             { icon: <Calendar />, label: "Consistência", value: "21 Dias", sub: "Protocolo Diário" },
             { icon: <Award />, label: "Retorno", value: "98%", sub: "Taxa de Sucesso" }
           ].map((stat, i) => (
             <div key={i} className="p-12 border border-white/5 rounded-editorial bg-white/[0.01] space-y-6">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-60">
                   {stat.icon}
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                   <p className="text-5xl font-serif italic">{stat.value}</p>
                   <p className="text-sm font-light text-white/30">{stat.sub}</p>
                </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}
