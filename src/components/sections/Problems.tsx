"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: <Clock className="w-8 h-8 text-rose-500" />,
    title: "Tempo Perdido",
    desc: "Equipes gastando horas em processos repetitivos e manuais, impedindo o crescimento focado no que importa.",
  },
  {
    icon: <TrendingDown className="w-8 h-8 text-rose-500" />,
    title: "Leads Frios",
    desc: "Falta de qualificação instantânea fazendo com que potenciais clientes esfriem antes mesmo do primeiro contato.",
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-rose-500" />,
    title: "Inconsistência",
    desc: "Erros humanos e atendimento variando com a demanda, gerando insatisfação e perda de vendas.",
  },
];

export default function Problems() {
  return (
    <section className="py-24 bg-background relative" id="problemas">
      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Por que as operações <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-400">travam?</span>
          </h2>
          <p className="text-slate-400 text-lg">
            A maioria das empresas não perde dinheiro pela falta de produto, mas pela ineficiência nos processos diários.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass p-8 rounded-2xl border border-white/5 hover:border-rose-500/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-16 h-16 rounded-xl bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {problem.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
