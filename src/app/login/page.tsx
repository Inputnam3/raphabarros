"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de autenticação de luxo
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col items-center justify-center p-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#5c4da7]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#a3d400]/5 rounded-full blur-[100px]" />
      </div>

      <nav className="absolute top-0 left-0 w-full p-10">
        <Link href="/" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-all">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md space-y-12 z-10"
      >
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/40 italic">Membro Exclusivo</span>
          <h1 className="text-6xl font-serif italic tracking-tighter">Área Pro</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-4">Identificação</label>
            <input 
              type="email" 
              placeholder="seu@email.com" 
              required
              className="w-full h-16 bg-white/[0.03] border border-white/5 rounded-full px-8 outline-none focus:border-white/20 transition-all placeholder:text-white/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-4">Senha</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                className="w-full h-16 bg-white/[0.03] border border-white/5 rounded-full px-8 outline-none focus:border-white/20 transition-all placeholder:text-white/10"
              />
              <Lock className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20" size={18} />
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full h-16 bg-white text-black rounded-full flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>Entrar no Portal <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <div className="flex flex-col items-center gap-6">
          <button className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-60 transition-opacity">Esqueci minha senha</button>
          <div className="h-px w-20 bg-white/10" />
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
            Ainda não é aluna? <Link href="/" className="text-white hover:text-[#a3d400] transition-colors ml-2">Conhecer planos</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
