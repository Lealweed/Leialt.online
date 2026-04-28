import { contactLinks } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="footer bg-black text-slate-400 py-16 border-t border-white/10 relative overflow-hidden">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full mix-blend-screen opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-pink/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(225,48,108,0.3)]">
              L
            </div>
            <span className="font-display font-bold text-xl text-white tracking-widest hover:text-brand-pink transition-colors">
              LeIALT
            </span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            IA e automacao para operacoes comerciais mais previsiveis, rapidas e escalaveis.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Links Rapidos</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#inicio" className="hover:text-brand-pink transition-colors">Inicio</a></li>
            <li><a href="#beneficios" className="hover:text-brand-pink transition-colors">Beneficios</a></li>
            <li><a href="#como-funciona" className="hover:text-brand-pink transition-colors">Como funciona</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contato</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">
                WhatsApp
              </a>
            </li>
            {contactLinks.instagram ? (
              <li>
                <a href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink transition-colors">
                  Instagram
                </a>
              </li>
            ) : null}
            <li>
              <a href={`mailto:${contactLinks.email}`} className="hover:text-brand-pink transition-colors">
                {contactLinks.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} LeIALT. Todos os direitos reservados.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/politica-de-privacidade" className="hover:text-brand-pink transition-colors">Politica de Privacidade</a>
          <a href="/termos-de-servico" className="hover:text-brand-pink transition-colors">Termos de Servico</a>
        </div>
      </div>
    </footer>
  );
}
