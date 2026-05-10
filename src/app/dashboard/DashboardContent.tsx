"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Play, 
  Clock, 
  CheckCircle2, 
  Star,
  TrendingUp,
  LogOut,
  Home,
  BarChart3,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  Menu as MenuIcon,
  X,
  ChevronLeft,
  Calendar,
  Download,
  ExternalLink,
  MessageCircle,
  Send
} from "lucide-react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
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
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  };
  classes: Class[];
}

type Tab = "home" | "progress" | "materials" | "media" | "faq";

export default function DashboardContent({ session, classes }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { id: "home", label: "Início", icon: <Home size={20} /> },
    { id: "progress", label: "Meu Progresso", icon: <BarChart3 size={20} /> },
    { id: "materials", label: "Materiais", icon: <FileText size={20} /> },
    { id: "media", label: "Vídeos e Fotos", icon: <ImageIcon size={20} /> },
    { id: "faq", label: "Dúvidas e FAQ", icon: <HelpCircle size={20} /> },
  ];

  const categories = Array.from(new Set(classes.map(c => c.category)));
  const featuredClass = classes[0];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return renderHome();
      case "progress":
        return renderProgress();
      case "materials":
        return renderMaterials();
      case "media":
        return renderMedia();
      case "faq":
        return renderFAQ();
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <div className="space-y-12 md:space-y-20">
      {/* Featured Video */}
      {featuredClass && (
        <section className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/5 shadow-2xl group cursor-pointer"
          onClick={() => setSelectedClass(featuredClass)}
        >
          <Image 
            src={featuredClass.thumbnailUrl || "/autoridade.jpg"} 
            alt={featuredClass.title}
            fill
            className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
               <span className="px-2 py-0.5 bg-brand-secondary text-black text-[8px] font-black uppercase tracking-widest rounded-sm">Destaque</span>
               <span className="text-[10px] font-bold text-white/60 flex items-center gap-2"><Clock size={12} /> {featuredClass.duration || "25 min"}</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-serif italic tracking-tighter leading-none">{featuredClass.title}</h2>
            <p className="text-xs md:text-sm text-white/60 line-clamp-2 max-w-md hidden md:block">{featuredClass.description}</p>
            <div className="pt-2">
               <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                  <Play fill="currentColor" size={20} />
               </div>
            </div>
          </div>
        </section>
      )}

      {/* Rows */}
      {categories.map((cat) => (
        <section key={cat} className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl md:text-2xl font-serif italic tracking-tight">{cat}</h2>
            <button className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Ver todos</button>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
            {classes.filter(c => c.category === cat).map((item) => (
              <div 
                key={item.id} 
                className="flex-none w-[260px] md:w-[380px] group cursor-pointer"
                onClick={() => setSelectedClass(item)}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-xl transition-all group-hover:border-white/20">
                  <Image 
                    src={item.thumbnailUrl || "/autoridade.jpg"} 
                    alt={item.title}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-90 transition-all"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Play fill="currentColor" size={16} />
                     </div>
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-widest truncate">{item.title}</h4>
                  <p className="text-[9px] text-white/30 mt-1 flex items-center gap-2">
                    <Clock size={10} /> {item.duration || "20 min"}
                    <span className="text-brand-secondary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><CheckCircle2 size={10} /> Concluir</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Consistência", value: "85%", icon: <TrendingUp className="text-brand-secondary" />, sub: "Meta: 90%" },
          { label: "Aulas Concluídas", value: "12/21", icon: <CheckCircle2 className="text-blue-400" />, sub: "Dia 12 do Desafio" },
          { label: "Tempo Praticado", value: "320m", icon: <Clock className="text-purple-400" />, sub: "Total acumulado" }
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
             <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">{stat.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{stat.label}</span>
             </div>
             <div className="space-y-1">
                <p className="text-4xl font-serif italic">{stat.value}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">{stat.sub}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem] space-y-8">
         <h3 className="text-2xl font-serif italic">Gráfico de Medidas</h3>
         <div className="h-64 w-full flex items-end gap-2 md:gap-4">
            {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${h}%` }}
                   className="w-full bg-gradient-to-t from-brand-secondary/20 to-brand-secondary rounded-t-lg"
                 />
                 <span className="text-[8px] text-white/20 font-black uppercase tracking-tighter">Sem {i + 1}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderMaterials = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { title: "Manual do Método", type: "PDF", size: "2.4 MB", icon: <FileText /> },
        { title: "Guia Nutricional", type: "PDF", size: "1.8 MB", icon: <Star className="text-brand-secondary" /> },
        { title: "Protocolo 21 Dias", type: "Planilha", size: "450 KB", icon: <Calendar /> },
        { title: "E-book Vácuo Pro", type: "PDF", size: "5.2 MB", icon: <Download /> }
      ].map((doc, i) => (
        <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col justify-between group hover:bg-white/[0.04] transition-all">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-brand-secondary/40 transition-colors">
              {doc.icon}
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-serif italic font-bold">{doc.title}</h4>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{doc.type} • {doc.size}</p>
            </div>
          </div>
          <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:translate-x-1 transition-transform">
            Baixar Arquivo <Download size={12} />
          </button>
        </div>
      ))}
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-10">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
         {["Todos", "Fotos", "Vídeos", "Antes & Depois"].map((tag, i) => (
           <button key={tag} className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:text-white'}`}>
             {tag}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1,2,3,4,5,6,7,8].map((img) => (
          <div key={img} className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 group cursor-zoom-in">
             <Image src={`/autoridade.jpg`} alt="Media" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ExternalLink size={20} className="text-white" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFAQ = () => (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="space-y-6">
         {[
           { q: "Como saber se estou fazendo o vácuo correto?", a: "A principal sensação é de uma abertura nas costelas e uma sucção que vem da base do assoalho pélvico. Verifique no espelho se há uma depressão visível acima do umbigo." },
           { q: "Sinto tontura durante a prática, é normal?", a: "Nos primeiros dias, a alteração no ritmo respiratório pode causar leves tonturas. Reduza a intensidade da apnéia e certifique-se de estar bem hidratada." },
           { q: "Posso praticar durante o período menstrual?", a: "Sim, mas recomenda-se não realizar o vácuo abdominal nos dias de fluxo intenso se houver desconforto ou cólicas." }
         ].map((faq, i) => (
           <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
              <h4 className="text-lg font-serif italic font-bold flex items-center gap-3">
                 <HelpCircle size={18} className="text-brand-secondary" /> {faq.q}
              </h4>
              <p className="text-sm text-white/40 font-light leading-relaxed pl-8">{faq.a}</p>
           </div>
         ))}
      </div>

      <div className="p-10 bg-brand-secondary/5 border border-brand-secondary/10 rounded-[2.5rem] space-y-6">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-secondary flex items-center justify-center text-black">
               <MessageCircle size={24} />
            </div>
            <div>
               <h4 className="text-xl font-serif italic font-bold">Ainda com dúvidas?</h4>
               <p className="text-xs text-brand-secondary/60 uppercase font-black tracking-widest">Suporte Direto via Chat</p>
            </div>
         </div>
         <div className="flex gap-2">
            <input type="text" placeholder="Descreva sua dúvida..." className="flex-1 bg-black/40 border border-white/5 rounded-full px-6 text-xs outline-none focus:border-brand-secondary/40 transition-all" />
            <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all">
               <Send size={18} />
            </button>
         </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen flex flex-col lg:flex-row font-sans selection:bg-brand-secondary selection:text-black">
      
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 w-full z-[80] h-20 px-6 flex justify-between items-center bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex flex-col">
          <span className="text-lg font-serif italic tracking-tighter leading-none">Raphaela Barros</span>
          <span className="text-[7px] font-black uppercase tracking-[0.4em] opacity-30">Portal Pro</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-white/60">
          {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isSidebarOpen || (isMounted && window.innerWidth >= 1024)) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed inset-y-0 left-0 w-72 bg-[#080808] border-r border-white/5 z-[90] flex flex-col p-8 transition-all lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          >
            <div className="mb-16 hidden lg:block">
              <span className="text-2xl font-serif italic tracking-tighter">Raphaela Barros</span>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30 mt-1">Portal Pro</p>
            </div>

            <nav className="flex-1 space-y-2 mt-20 lg:mt-0">
              {menuItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all group ${
                    activeTab === item.id 
                      ? "bg-white text-black shadow-xl" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={activeTab === item.id ? "text-black" : "text-white/20 group-hover:text-white"}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center gap-4 px-4 mb-8">
                 <div className="w-10 h-10 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-xs font-bold text-brand-secondary">
                    {session.user?.name?.charAt(0)}
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest truncate max-w-[120px]">{session.user?.name}</span>
                    <span className="text-[7px] uppercase font-bold text-white/20">Membro Premium</span>
                 </div>
              </div>
              <button 
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 hover:text-red-500 transition-colors"
              >
                <LogOut size={20} /> Sair
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen pt-24 pb-20 lg:pt-16 lg:pb-16 px-6 md:px-12 lg:px-20 overflow-x-hidden">
        
        {/* Dynamic Header */}
        <header className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
               <button 
                 onClick={() => setActiveTab("home")}
                 className={`p-2 rounded-full border border-white/5 text-white/40 hover:text-white transition-all ${activeTab === 'home' ? 'hidden' : 'block'}`}
               >
                 <ChevronLeft size={16} />
               </button>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">
                 {menuItems.find(i => i.id === activeTab)?.label}
               </span>
             </div>
             <h1 className="text-4xl md:text-7xl font-serif italic tracking-tighter leading-tight">
                {activeTab === 'home' ? <>Bem-vinda de <br /> <span className="not-italic font-black text-stroke">Volta</span></> : menuItems.find(i => i.id === activeTab)?.label}
             </h1>
          </div>

          <div className="hidden md:flex bg-white/[0.03] border border-white/5 rounded-3xl p-6 items-center gap-6 shadow-2xl">
             <div className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest opacity-30">Status do Plano</p>
                <p className="text-base font-serif italic">12 de 21 concluídos</p>
             </div>
             <div className="w-10 h-10 rounded-full border border-brand-secondary flex items-center justify-center">
                <TrendingUp size={18} className="text-brand-secondary" />
             </div>
          </div>
        </header>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>

        {/* Footer */}
        <footer className="mt-40 pt-10 border-t border-white/5 flex flex-col items-center gap-6 opacity-20">
          <span className="text-lg font-serif italic tracking-tighter">Raphaela Barros</span>
          <p className="text-[7px] font-black uppercase tracking-[0.4em] text-center">© 2026 LPF Studio • Ambiente Exclusivo para Alunas</p>
        </footer>
      </main>

      {/* Video Player Modal */}
      <VideoPlayer 
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        videoUrl={selectedClass?.videoUrl || ""}
        title={selectedClass?.title || ""}
        description={selectedClass?.description || ""}
      />

      {/* Mobile Navigation Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-[80] h-20 bg-black/60 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-4">
        {menuItems.slice(0, 4).map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-brand-secondary' : 'text-white/40'}`}
          >
            {item.icon}
            <span className="text-[7px] font-black uppercase tracking-widest">{item.label.split(' ')[0]}</span>
          </button>
        ))}
        <button 
          onClick={() => setActiveTab("faq")}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === "faq" ? 'text-brand-secondary' : 'text-white/40'}`}
        >
          <HelpCircle size={20} />
          <span className="text-[7px] font-black uppercase tracking-widest">Ajuda</span>
        </button>
      </nav>
    </div>
  );
}
