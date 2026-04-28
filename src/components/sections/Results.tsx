"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Results() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="resultados">
      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              A matematica do <br />
              <span className="text-gradient">
                crescimento real
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Empresas que adotam automacao e inteligencia artificial veem crescimento exponencial nos resultados financeiros, nao apenas operacionais.
            </p>

            <ul className="space-y-6">
              {[
                "Reducao drastica no custo de aquisicao (CAC).",
                "Aumento de ate 60% na taxa de conversao em vendas.",
                "Economia de meses de trabalho em tarefas repetitivas.",
                "Disponibilidade ininterrupta em multiplos canais."
              ].map((item, i) => (
                <li key={i} className="flex flex-row items-center gap-4 text-slate-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center border border-brand-pink/30">
                    <ArrowUpRight className="w-4 h-4 text-brand-pink" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 h-full"
          >
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-brand-pink/20 to-brand-purple/5 p-8 rounded-3xl border border-brand-pink/20 glass flex flex-col justify-end h-64">
                <span className="text-4xl lg:text-5xl font-bold text-white mb-2">+300%</span>
                <span className="text-slate-300">Retorno sobre investimento</span>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col justify-end h-40">
                <span className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</span>
                <span className="text-slate-300">Em operacao</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mt-8">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col justify-end h-40">
                <span className="text-3xl lg:text-4xl font-bold text-brand-cyan mb-2">&lt; 1s</span>
                <span className="text-slate-300">Tempo de resposta</span>
              </div>
              <div className="bg-gradient-to-tl from-brand-purple/20 to-brand-blue/5 p-8 rounded-3xl border border-brand-purple/20 glass flex flex-col justify-end h-64">
                <span className="text-4xl lg:text-5xl font-bold text-white mb-2">-80%</span>
                <span className="text-slate-300">Trabalho bracal</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
