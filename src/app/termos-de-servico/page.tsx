import type { Metadata } from "next";
import { contactLinks } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Termos de Servico | LeIALT",
  description: "Termos de servico da LeIALT.",
};

const updatedAt = "18 de marco de 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 md:px-12 py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Termos de Servico</h1>
        <p className="text-slate-400 mb-10">Ultima atualizacao: {updatedAt}</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Aceitacao</h2>
            <p>
              Ao acessar este site, voce concorda com estes termos e com a legislacao aplicavel. Caso nao concorde,
              interrompa o uso do site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Escopo do conteudo</h2>
            <p>
              As informacoes publicadas possuem carater institucional e comercial. Propostas, prazos e escopos de
              projetos sao definidos apenas por contrato especifico.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Propriedade intelectual</h2>
            <p>
              Textos, marcas, layout e demais elementos do site sao protegidos por direitos autorais e nao podem ser
              reproduzidos sem autorizacao previa por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Limitacao de responsabilidade</h2>
            <p>
              A LeIALT envida esforcos para manter informacoes atualizadas, mas nao garante ausencia total de
              indisponibilidades, erros tecnicos ou interrupcoes temporarias.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Alteracoes</h2>
            <p>
              Estes termos podem ser atualizados a qualquer momento. Recomendamos revisao periodica desta pagina.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Contato</h2>
            <p>
              Em caso de duvidas sobre estes termos, entre em contato pelo e-mail{" "}
              <a className="text-brand-pink hover:text-brand-pink-dark" href={`mailto:${contactLinks.email}`}>
                {contactLinks.email}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
