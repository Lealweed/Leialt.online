"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Carlos Mendes",
    role: "Diretor, Clinica Saude+",
    content: "O atendimento automatico humanizado que a LeIALT integrou triplicou nossos agendamentos no WhatsApp sem precisar de mais recepcionistas.",
  },
  {
    name: "Mariana Souza",
    role: "CEO, Imobiliaria Prime",
    content: "A inteligencia de qualificacao e absurda. Eles integraram um agente que pergunta orcamento, regiao de interesse e ate sugere imoveis 24/7.",
  },
  {
    name: "Felipe Almeida",
    role: "Gestor Comercial",
    content: "Nosso CAC caiu pela metade no terceiro mes e o time de vendas gasta tempo apenas com quem ja sabe o que quer. Magico.",
  }
];

export default function SocialProof() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Resultados Provados por <span className="text-brand-pink">Pessoas</span>
          </h2>
          <p className="text-slate-400 text-lg">
            A tecnologia importa, mas os resultados com pessoas reais importam ainda mais.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-8 rounded-2xl border border-white/5 relative"
            >
              <div className="flex gap-1 mb-6 text-brand-pink">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic font-light leading-relaxed">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-slate-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
