import Image from "next/image";
import { contactLinks } from "@/lib/contact";
import { MessageCircle, Mail, Instagram, ArrowRight } from "lucide-react";

const services = [
  { name: "Marketing IA", desc: "Estratégias inteligentes com dados e automação" },
  { name: "TikTok & Shopee", desc: "Presença e vendas nas maiores plataformas" },
  { name: "SaaS Jurídico", desc: "Soluções digitais para escritórios e advogados" },
  { name: "Barbearias", desc: "Automação de agendamentos e fidelização" },
];

export default function CompanyInfo() {
  return (
    <footer id="empresa" className="relative overflow-hidden" style={{ background: "#030712" }}>
      {/* Rainbow top divider */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, #22c55e, #06b6d4, #3b82f6, #833AB4, #E1306C, #F77737)",
        }}
      />

      {/* Subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(131,58,180,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 relative z-10">
        {/* Top section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo-dark.png"
                alt="Leialt.IA — Inteligência Artificial Estratégica"
                width={220}
                height={91}
                className="object-contain"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
            <p className="text-slate-300 text-base leading-relaxed max-w-sm mb-6">
              Automação que transforma. Conecte seu negócio ao futuro com Inteligência Artificial estratégica.
            </p>
            <p className="text-white/30 text-sm italic">
              Uma plataforma. Infinitas possibilidades.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h4
              className="font-display font-extrabold text-white text-sm tracking-[0.2em] uppercase mb-6"
              style={{ color: "#06b6d4" }}
            >
              Soluções
            </h4>
            <ul className="space-y-5">
              {services.map((s) => (
                <li key={s.name}>
                  <p className="font-display font-extrabold text-white text-sm mb-0.5">{s.name}</p>
                  <p className="text-slate-500 text-xs">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4
              className="font-display font-extrabold text-sm tracking-[0.2em] uppercase mb-6"
              style={{ color: "#E1306C" }}
            >
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={contactLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-sm">WhatsApp</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                </a>
              </li>
              {contactLinks.instagram && (
                <li>
                  <a
                    href={contactLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <Instagram className="w-4 h-4 text-brand-pink shrink-0" />
                    <span className="text-sm">@leialt.ia</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="text-sm">{contactLinks.email}</span>
                </a>
              </li>
            </ul>

            {/* CTA */}
            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm text-white transition-all hover:scale-[1.04] active:scale-[0.97]"
              style={{
                background: "linear-gradient(to right, #E1306C, #833AB4)",
                boxShadow: "0 0 20px rgba(225,48,108,0.35)",
              }}
            >
              Falar com especialista
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p>&copy; {new Date().getFullYear()} Leialt.IA. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/politica-de-privacidade" className="hover:text-slate-400 transition-colors">
              Política de Privacidade
            </a>
            <a href="/termos-de-servico" className="hover:text-slate-400 transition-colors">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
