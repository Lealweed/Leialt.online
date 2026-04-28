"use client";

import { motion } from "framer-motion";
import { Bot, LineChart, Zap, UserCheck } from "lucide-react";

const solutions = [
  {
    icon: <Bot className="w-8 h-8 text-brand-cyan" />,
    title: "Atendimento Inteligente",
    desc: "Agentes de IA 24/7 que nao apenas respondem, mas qualificam leads em midias sociais e WhatsApp com tom de voz realista.",
  },
  {
    icon: <Zap className="w-8 h-8 text-brand-blue" />,
    title: "Automacoes Complexas",
    desc: "Fluxos de trabalho integrando CRMs, disparos, e roteamento de tickets de suporte para economizar milhares de horas.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-brand-purple" />,
    title: "Analise Preditiva",
    desc: "Modelos que analisam dados historicos da sua empresa para fornecer insights claros de mercado e previsao de vendas.",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-brand-pink" />,
    title: "Onboarding & Retencao",
    desc: "Experiencias ricas de boas-vindas e atendimento reativo usando IA para reduzir a taxa de churn e melhorar avaliacoes.",
  },
];

export default function Solutions() {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="solucoes">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-pink/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3 sticky top-32"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
              A solucao nao e contratar mais. <br />
              <span className="text-gradient">
                E integrar melhor.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              A LeIALT implementa sistemas de inteligencia integrados que assumem tarefas mecanicas e liberam seu time focado na estrategia.
            </p>
          </motion.div>

          <div className="md:w-2/3 grid sm:grid-cols-2 gap-6 w-full">
            {solutions.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-brand-pink/30 transition-all shadow-lg hover:shadow-brand-pink/10 relative overflow-hidden group"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-purple/10 flex items-center justify-center mb-6 border border-brand-purple/20 group-hover:scale-110 transition-transform">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                  {solution.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-light">
                  {solution.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
