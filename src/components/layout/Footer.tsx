"use client";

import { Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer bg-black text-slate-400 py-16 border-t border-white/10 relative overflow-hidden">
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full mix-blend-screen opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              L
            </div>
            <span className="font-bold text-xl text-white tracking-widest hover:text-cyan-400 transition-colors">
              LeIALT
            </span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            Soluções estratégicas de inteligência artificial para o empresário moderno. 
            A IA não substitui pessoas. Ela potencializa operações.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#problemas" className="hover:text-cyan-400 transition-colors">Problemas e Gargalos</a></li>
            <li><a href="#solucoes" className="hover:text-cyan-400 transition-colors">Soluções</a></li>
            <li><a href="#nichos" className="hover:text-cyan-400 transition-colors">Nichos Atendidos</a></li>
            <li><a href="#resultados" className="hover:text-cyan-400 transition-colors">Resultados</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contato</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="https://wa.me/seunumerodecontato" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com/seuperfil" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="mailto:contato@leialt.com.br" className="hover:text-cyan-400 transition-colors">
                contato@leialt.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} LeIALT. Todos os direitos reservados.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-cyan-400 transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Termos de Serviço</a>
        </div>
      </div>
    </footer>
  );
}
