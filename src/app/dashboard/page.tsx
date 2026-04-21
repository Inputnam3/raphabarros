"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  PlayCircle, 
  BarChart3, 
  FileText, 
  HelpCircle, 
  Image as ImageIcon, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  Layout
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const menuItems = [
    { icon: <PlayCircle size={20} />, label: "Minhas Aulas", active: true },
    { icon: <BarChart3 size={20} />, label: "Meu Progresso" },
    { icon: <FileText size={20} />, label: "Materiais" },
    { icon: <ImageIcon size={20} />, label: "Vídeos e Fotos" },
    { icon: <HelpCircle size={20} />, label: "Dúvidas e FAQ" },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-80 border-r border-white/5 flex flex-col p-10 hidden lg:flex fixed h-full">
        <div className="mb-20">
          <span className="text-2xl font-serif italic tracking-tighter">Raphaela Barros</span>
          <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30 mt-1">Portal Pro</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all group ${
                item.active ? "bg-white text-black shadow-xl" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={item.active ? "text-black" : "text-white/20 group-hover:text-white"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-10 border-t border-white/5">
          <Link href="/login" className="flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 opacity-60 hover:opacity-100 transition-opacity">
            <LogOut size={20} /> Sair do Portal
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-80 p-10 md:p-20 max-w-7xl mx-auto space-y-16">
        
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full border-2 border-brand-secondary p-0.5 overflow-hidden">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnDTuNq7DW0pi384zTytOKKf3gljH8im4W4qwRq5ipf6oJVdDTXN-Fos09uvZzUZLDjKDqVj7o33IHo8PXnQ1diXfw8669iqpV7eB9lIwXZfW7NtX_IaDWMVtXoKRPR7eT9FNS1YrP2uf67VwN1_91S6jPbm9gXQIpa0qXG6kPXDZdB6BhiJKTey_C4u0n0MYoVd9Dudu53b_GzvI3fSIk7YwBiPR-ZAfXfwMwknwOtPbL_eqKIMDPArr3PaxXW7Asu5AxIMC85gw" 
                    alt="User" width={40} height={40} className="rounded-full object-cover" 
                  />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Bom dia, Helena</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter">Mantenha a <br /> <span className="not-italic font-black text-stroke">Constância</span></h1>
          </div>
          
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 flex items-center gap-8 shadow-2xl">
             <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-30">Seu Plano</p>
                <p className="text-lg font-serif italic">Dia 12 de 21</p>
             </div>
             <div className="w-12 h-12 rounded-full border border-brand-secondary flex items-center justify-center">
                <TrendingUp size={20} className="text-brand-secondary" />
             </div>
          </div>
        </header>

        {/* Featured Video / Current Lesson */}
        <section className="group relative aspect-video md:aspect-[21/9] overflow-hidden rounded-editorial border border-white/5 shadow-editorial cursor-pointer">
           <Image 
              src="/autoridade.jpg" 
              alt="Aula Atual" 
              fill 
              className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-[2s]" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
           
           <div className="absolute bottom-10 left-10 space-y-6">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-brand-secondary text-black text-[9px] font-black uppercase tracking-widest rounded-full">Próxima Aula</span>
                 <span className="text-[10px] font-bold text-white/60 flex items-center gap-2"><Clock size={12} /> 25 min</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight">Sequência de <br /> Ativação Profunda</h2>
              <button className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-xl">
                 <PlayCircle fill="currentColor" size={24} />
              </button>
           </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { title: "Manual do Método", type: "Material PDF", icon: <FileText size={18} /> },
             { title: "Galeria de Evolução", type: "12 registros", icon: <ImageIcon size={18} /> },
             { title: "Dúvidas Frequentes", type: "FAQ & Suporte", icon: <HelpCircle size={18} /> }
           ].map((card, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-10 bg-white/[0.02] border border-white/5 rounded-editorial hover:bg-white/[0.04] transition-all group cursor-pointer"
             >
                <div className="flex justify-between items-start mb-12">
                   <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-brand-secondary group-hover:text-brand-secondary transition-all">
                      {card.icon}
                   </div>
                   <ChevronRight size={16} className="opacity-10 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xl font-serif italic font-bold mb-2">{card.title}</h4>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{card.type}</p>
             </motion.div>
           ))}
        </div>

      </main>
    </div>
  );
}
