"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

// Lazy load the 3D Canvas
const DynamicOrbScene = dynamic(() => import("../3d/OrbScene"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 animate-pulse border border-cyan-500/30">
      <div className="w-3/4 h-3/4 rounded-full border border-blue-500/40 opacity-70" />
    </div>
  )
});

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background">
      {/* Background decorations */}
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8 order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 glass mb-6 text-sm font-medium text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              LeIALT — Inteligência Artificial Estratégica
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              A IA não substitui pessoas.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Ela potencializa operações.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light"
          >
            Automatize fluxos, qualifique leads e escale seu negócio com soluções de Inteligência Artificial personalizadas para a sua empresa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mt-4"
          >
            <a 
              href="https://wa.me/seunumerodecontato" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-3 group">
                Falar com especialista
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>

            <a 
              href="https://instagram.com/seuperfil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group backdrop-blur-sm">
                Envie OI no Direct
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-cyan-400" />
              </button>
            </a>
          </motion.div>
        </div>

        {/* Right 3D Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center relative touch-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 md:hidden pointer-events-none" />
          <DynamicOrbScene />
        </motion.div>
      </div>
    </section>
  );
}
