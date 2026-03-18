"use client";

import { motion } from "framer-motion";

const niches = [
  { name: "Clínicas & Consultórios", desc: "Agendamentos automáticos, confirmações e triagem inicial." },
  { name: "Imobiliárias", desc: "Qualificação de leads para locação ou compra 24 horas por dia." },
  { name: "E-commerces", desc: "Recuperação de carrinho inteligente e suporte de pedidos via WhatsApp." },
  { name: "Escritórios Jurídicos", desc: "Distribuição de casos, atualizações aos clientes e triagem de processos." },
  { name: "Agências & B2B", desc: "Fluxos de prospecção outbound e enriquecimento de dados automáticos." },
  { name: "Instituições de Ensino", desc: "Captação de alunos, dúvidas frequentes de matrículas e renegociações." }
];

export default function Niches() {
  return (
    <section className="py-24 bg-[#010309] relative" id="nichos">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 glass mb-6 text-sm font-medium text-blue-300">
            Qualquer Nicho
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Para quem a Inteligência <br /> Artificial é o <span className="text-cyan-400">próximo passo</span>?
          </h2>
          <p className="text-slate-400 text-lg">
            A tecnologia se adapta ao seu modelo de negócio, independentemente do segmento, convertendo visitantes casuais em receita garantida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {niches.map((niche, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.05] transition-colors"
            >
              <h3 className="text-lg font-bold text-white mb-2">{niche.name}</h3>
              <p className="text-sm text-slate-400">{niche.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
