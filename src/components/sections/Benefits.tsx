"use client";

import { motion } from "framer-motion";
import { Gauge, Cpu, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Gauge,
    title: "Mais velocidade",
    description: "Automacoes reduzem etapas manuais e encurtam o tempo entre lead e resposta.",
  },
  {
    icon: Cpu,
    title: "Operacao previsivel",
    description: "Processos padronizados com IA trazem consistencia no atendimento e nas entregas.",
  },
  {
    icon: Sparkles,
    title: "Conversao maior",
    description: "Fluxos inteligentes priorizam oportunidades reais e melhoram a taxa de fechamento.",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-24 md:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-3">Tres beneficios diretos</h2>
          <p className="text-slate-300 text-lg">Menos friccao operacional e mais foco no crescimento.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="glass rounded-2xl p-7 border-white/10"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-pink/12 border border-brand-pink/30 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-brand-cyan" />
                </div>
                <h3 className="font-display text-xl text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
