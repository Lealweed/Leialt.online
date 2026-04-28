"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contactLinks } from "@/lib/contact";

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full min-h-screen flex items-center overflow-hidden py-28 md:py-32 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(131,58,180,0.15),_transparent_45%),radial-gradient(ellipse_at_80%_30%,_rgba(225,48,108,0.14),_transparent_48%)]">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-30" />

      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10 z-10">
        <div className="flex flex-col gap-8 text-center lg:text-left max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex px-4 py-1.5 rounded-full border border-brand-pink/35 glass mb-7 text-sm font-medium text-pink-200 tracking-wide">
              LeIALT . IA e automacao
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-[4.2rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-white max-w-[12ch] mx-auto lg:mx-0">
              IA e automacao para negocios que querem escala.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-300 max-w-[45ch] mx-auto lg:mx-0"
          >
            Menos operacao manual. Mais previsibilidade, velocidade e conversao.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center lg:justify-start mt-2"
          >
            <a 
              href={contactLinks.whatsapp}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-pink hover:bg-brand-pink-dark text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(225,48,108,0.45)]"
            >
              Falar com especialista
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
