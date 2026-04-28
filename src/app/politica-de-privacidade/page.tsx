import type { Metadata } from "next";
import { contactLinks } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Politica de Privacidade | LeIALT",
  description: "Politica de privacidade da LeIALT.",
};

const updatedAt = "18 de marco de 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 md:px-12 py-20 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Politica de Privacidade</h1>
        <p className="text-slate-400 mb-10">Ultima atualizacao: {updatedAt}</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Informacoes coletadas</h2>
            <p>
              Podemos coletar dados fornecidos por voce em formularios, contatos por WhatsApp, e-mail e redes sociais,
              alem de dados tecnicos de navegacao, como IP, navegador, paginas acessadas e tempo de visita.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Como usamos seus dados</h2>
            <p>
              Utilizamos os dados para responder solicitacoes, apresentar propostas, melhorar nossos servicos, gerar
              analises de performance e cumprir obrigacoes legais aplicaveis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Compartilhamento</h2>
            <p>
              Nao vendemos seus dados pessoais. O compartilhamento pode ocorrer apenas com fornecedores essenciais para
              operacao do site e atendimento, sempre com criterios de seguranca e necessidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Cookies e tecnologias similares</h2>
            <p>
              Podemos usar cookies para funcionamento do site, analise de uso e melhoria de experiencia. Voce pode
              gerenciar cookies no seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Seus direitos</h2>
            <p>
              Voce pode solicitar acesso, correcao, atualizacao ou exclusao de dados pessoais, conforme a legislacao
              aplicavel, incluindo a LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Contato</h2>
            <p>
              Para qualquer solicitacao relacionada a privacidade, fale com a LeIALT pelo e-mail{" "}
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
