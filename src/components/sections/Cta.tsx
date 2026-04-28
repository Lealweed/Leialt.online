"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contactLinks } from "@/lib/contact";

export default function Cta() {
  return (
    <section className="py-24 md:py-28 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(225,48,108,0.14),transparent_55%)]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="glass p-10 md:p-16 rounded-3xl border border-brand-pink/20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/6 to-brand-pink/6 opacity-70" />
          
          <h2 className="font-display text-3xl md:text-5xl text-white max-w-[18ch] mx-auto leading-tight tracking-tight relative mb-5">
            Pronto para escalar com IA?
          </h2>
          <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-[44ch] mx-auto relative">
            Um plano direto para aumentar eficiencia comercial e reduzir trabalho manual.
          </p>

          <a 
            href={contactLinks.whatsapp}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-brand-pink text-white font-semibold hover:bg-brand-pink-dark transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_28px_rgba(225,48,108,0.45)] group text-lg relative"
          >
            Falar com especialista
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
