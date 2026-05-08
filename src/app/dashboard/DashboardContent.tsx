"use client";

import React from "react";
import Image from "next/image";
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  Star,
  ChevronRight,
  TrendingUp,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import VideoPlayer from "./components/VideoPlayer";

interface Class {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnailUrl: string | null;
  category: string;
  duration: string | null;
}

interface DashboardContentProps {
  session: any;
  classes: Class[];
}

export default function DashboardContent({ session, classes }: DashboardContentProps) {
  const [selectedClass, setSelectedClass] = React.useState<Class | null>(null);

  // Group classes by category
  const categories = Array.from(new Set(classes.map(c => c.category)));
  const featuredClass = classes[0];

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 h-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-12">
          <span className="text-xl md:text-2xl font-serif italic tracking-tighter">Raphaela Barros</span>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-white">Início</Link>
            <Link href="/programas" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Meus Programas</Link>
            <Link href="/evolucao" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Minha Evolução</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-brand-secondary/20 border border-brand-secondary/40 flex items-center justify-center text-[10px] font-bold text-brand-secondary">
                {session.user?.name?.charAt(0)}
             </div>
             <span className="hidden sm:block text-[9px] font-black uppercase tracking-widest opacity-40 italic">{session.user?.name}</span>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-white/20 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Hero Netflix Style */}
      {featuredClass && (
        <section className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <Image 
              src={featuredClass.thumbnailUrl || "/autoridade.jpg"} 
              alt={featuredClass.title}
              fill
              className="object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-24 max-w-4xl space-y-8">
            <div className="flex items-center gap-4">
               <span className="px-3 py-1 bg-brand-secondary text-black text-[9px] font-black uppercase tracking-widest rounded-sm flex items-center gap-2">
                 <Star size={10} fill="currentColor" /> Recomendado
               </span>
               <span className="text-[10px] font-bold text-brand-secondary flex items-center gap-2">
                 <TrendingUp size={12} /> Em alta esta semana
               </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif italic leading-[0.9] tracking-tighter">
              {featuredClass.title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 font-serif italic leading-relaxed max-w-xl">
              {featuredClass.description || "A reconexão profunda com seu core através de um método que une ciência, estética e o poder da sua respiração."}
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <button 
                onClick={() => setSelectedClass(featuredClass)}
                className="bg-white text-black px-10 py-4 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/90 transition-all scale-110"
              >
                <Play fill="currentColor" size={16} /> Assistir Agora
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/20 transition-all border border-white/10">
                Mais Informações
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Content Rows */}
      <main className="relative z-20 -mt-32 pb-40 space-y-20 px-6 md:px-12">
        {categories.length > 0 ? categories.map((cat) => (
          <section key={cat} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif italic tracking-tight flex items-center gap-4">
                {cat}
                <ChevronRight size={18} className="text-brand-secondary" />
              </h2>
              <Link href="#" className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Ver todos</Link>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
              {classes.filter(c => c.category === cat).map((item) => (
                <div 
                  key={item.id} 
                  className="flex-none w-[300px] md:w-[400px] group cursor-pointer relative"
                  onClick={() => setSelectedClass(item)}
                >
                  <div className="relative aspect-video rounded-md overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:z-30 group-hover:ring-2 group-hover:ring-white/20">
                    <Image 
                      src={item.thumbnailUrl || "/autoridade.jpg"} 
                      alt={item.title}
                      fill
                      className="object-cover brightness-75 group-hover:brightness-100 transition-all"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                          <Play fill="currentColor" size={20} />
                       </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <h4 className="text-sm font-bold uppercase tracking-widest truncate">{item.title}</h4>
                    <div className="flex items-center gap-4 text-[10px] text-white/40">
                       <span className="flex items-center gap-1"><Clock size={10} /> {item.duration || "25 min"}</span>
                       <span className="flex items-center gap-1 text-brand-secondary"><CheckCircle2 size={10} /> Concluído</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )) : (
          <section className="py-20 text-center space-y-6">
             <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mx-auto mb-8">
                <Play size={32} className="opacity-20" />
             </div>
             <h2 className="text-3xl font-serif italic opacity-40">Seu catálogo de aulas está vazio</h2>
             <p className="text-sm text-white/20 max-w-md mx-auto italic">Adicione aulas através do painel administrativo para começar a sua jornada.</p>
          </section>
        )}
      </main>

      {/* Video Player Modal */}
      <VideoPlayer 
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        videoUrl={selectedClass?.videoUrl || ""}
        title={selectedClass?.title || ""}
        description={selectedClass?.description || ""}
      />

      {/* Footer Minimalista */}
      <footer className="py-20 border-t border-white/5 flex flex-col items-center gap-8 opacity-20">
        <span className="text-xl font-serif italic tracking-tighter">Raphaela Barros</span>
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">© 2026 LPF Studio • Área de Membros Privada</p>
      </footer>
    </div>
  );
}
