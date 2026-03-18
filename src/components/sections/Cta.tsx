"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full mix-blend-screen opacity-50 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-background to-background" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-12 md:p-20 rounded-[2.5rem] border border-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.15)] text-center relative overflow-hidden"
        >
          {/* subtle moving light inside card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 to-blue-600/5 opacity-50" />
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-white max-w-4xl mx-auto leading-tight relative">
            Pare de operar no <span className="text-rose-400">gargalo</span>.
            <br /> Assuma o futuro da sua empresa.
          </h2>
          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light relative">
            Seus concorrentes já estão implementando sistemas inteligentes. Entre em contato com a LeIALT e descubra exatamente o montante de dinheiro e tempo que você pode economizar.
          </p>

          <a 
            href="https://wa.me/seunumerodecontato" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block relative"
          >
            <button className="px-10 py-5 rounded-full bg-white text-blue-950 font-bold hover:bg-cyan-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 group text-lg relative">
              Falar com especialista agora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
