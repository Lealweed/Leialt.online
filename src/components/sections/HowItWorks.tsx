"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnostico rapido",
    description: "Mapeamos gargalos e oportunidades de automacao no seu processo comercial.",
  },
  {
    number: "02",
    title: "Implementacao",
    description: "Configuramos agentes e fluxos integrados ao seu contexto de negocio.",
  },
  {
    number: "03",
    title: "Otimizacao continua",
    description: "Ajustamos metricas e comportamento para aumentar eficiencia e conversao.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 md:py-28 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-3">Como funciona</h2>
          <p className="text-slate-300 text-lg">Um fluxo simples em tres passos para sair da operacao manual.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass rounded-2xl p-7 border-white/10"
            >
              <p className="font-display text-brand-pink text-sm tracking-[0.22em] mb-4">{step.number}</p>
              <h3 className="font-display text-xl text-white mb-2 tracking-tight">{step.title}</h3>
              <p className="text-slate-300 leading-relaxed">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
