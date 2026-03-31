import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e condições de uso do site Ubatuba Reage. Leia antes de utilizar o portal.",
  openGraph: {
    title: `Termos de Uso | ${SITE_NAME}`,
    description: "Termos e condições de uso do site Ubatuba Reage.",
    url: `${SITE_URL}/termos-de-uso`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Termos de Uso | ${SITE_NAME}`,
    description: "Termos e condições de uso do site Ubatuba Reage.",
  },
  alternates: {
    canonical: `${SITE_URL}/termos-de-uso`,
  },
};

export default function TermosDeUsoPage() {
  return (
    <>
      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-[260px] bg-[#111111] z-40" />
      <ClientHeader />

      <div className="flex min-h-screen">
        <div className="hidden lg:block flex-shrink-0 w-[260px]" />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="hidden lg:block h-10" />

          <div className="bg-[#f5f5f5] px-5 md:px-10 lg:px-16 pt-8 pb-10">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Termos de Uso", href: "/termos-de-uso" },
              ]}
            />
            <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-black leading-[1.02] tracking-tight uppercase mb-2">
              Termos de Uso
            </h1>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
              Última atualização: março de 2026
            </p>
          </div>

          <div className="flex-1 bg-white px-5 md:px-10 lg:px-16 py-12">
            <div className="max-w-3xl">
              <Section title="1. Aceitação dos Termos">
                <p>
                  Ao acessar e utilizar o site <strong>ubatubareage.com.br</strong>{" "}
                  (&quot;Portal&quot;), você concorda com estes Termos de Uso. Se não
                  concordar com alguma disposição, por favor, interrompa o uso do
                  Portal.
                </p>
              </Section>

              <Section title="2. Natureza do Portal">
                <p>
                  O Ubatuba Reage é um portal de <strong>jornalismo cívico
                  independente</strong>, focado em fiscalização, denúncias e
                  mobilização comunitária em Ubatuba (SP). Todo o conteúdo
                  publicado tem finalidade informativa e de interesse público.
                </p>
                <p>
                  O Portal não possui fins lucrativos e não é vinculado a partidos
                  políticos, governos ou entidades empresariais.
                </p>
              </Section>

              <Section title="3. Propriedade Intelectual">
                <p>
                  Todo o conteúdo publicado no Portal — textos, imagens,
                  logotipos, design e código — é protegido por direitos autorais e
                  de propriedade intelectual, salvo quando expressamente indicado
                  em contrário.
                </p>
                <p>
                  É permitida a reprodução parcial de conteúdos para fins
                  jornalísticos, educacionais ou de interesse público, desde que{" "}
                  <strong>citada a fonte</strong> com link para o conteúdo original
                  no Ubatuba Reage.
                </p>
                <p>
                  É proibida a reprodução total ou comercial sem autorização prévia
                  e por escrito.
                </p>
              </Section>

              <Section title="4. Canal de Denúncias">
                <p>
                  O Canal de Denúncias é disponibilizado para que cidadãos possam
                  relatar problemas de interesse público. Ao enviar uma denúncia,
                  você declara que:
                </p>
                <ul>
                  <li>As informações fornecidas são verdadeiras;</li>
                  <li>
                    Você tem o direito de compartilhar eventuais imagens ou
                    documentos anexados;
                  </li>
                  <li>
                    Compreende que denúncias falsas ou maliciosas podem ser
                    descartadas e, em casos extremos, implicar responsabilidade
                    civil e criminal.
                  </li>
                </ul>
                <p>
                  O Ubatuba Reage reserva-se o direito de verificar, editar ou não
                  publicar denúncias sem obrigação de justificar a decisão.
                </p>
              </Section>

              <Section title="5. Responsabilidade pelo Conteúdo">
                <p>
                  O Portal se esforça para publicar informações precisas e
                  verificadas. No entanto, o conteúdo é fornecido &quot;como está&quot; e o
                  Ubatuba Reage não se responsabiliza por eventuais erros ou
                  imprecisões. Erros identificados serão corrigidos com nota de
                  errata.
                </p>
                <p>
                  O Portal não se responsabiliza por opiniões expressas em
                  comentários ou conteúdos enviados por terceiros.
                </p>
              </Section>

              <Section title="6. Conduta dos Usuários">
                <p>Ao interagir com o Portal, você concorda em não:</p>
                <ul>
                  <li>Enviar conteúdo falso, difamatório ou que incite violência;</li>
                  <li>Usar o Portal para fins ilegais;</li>
                  <li>
                    Tentar acessar áreas restritas ou interferir no funcionamento
                    do sistema;
                  </li>
                  <li>Fazer uso comercial não autorizado do conteúdo.</li>
                </ul>
              </Section>

              <Section title="7. Links Externos">
                <p>
                  O Portal pode conter links para sites de terceiros, incluídos a
                  título informativo. O Ubatuba Reage não endossa nem se
                  responsabiliza pelo conteúdo desses sites.
                </p>
              </Section>

              <Section title="8. Limitação de Responsabilidade">
                <p>
                  O Ubatuba Reage não garante disponibilidade ininterrupta do
                  Portal e não se responsabiliza por danos decorrentes de
                  interrupções, erros técnicos ou uso indevido do conteúdo por
                  parte do usuário.
                </p>
              </Section>

              <Section title="9. Alterações nos Termos">
                <p>
                  Estes Termos podem ser atualizados a qualquer momento. A versão
                  vigente sempre estará disponível nesta página, com indicação da
                  data de última atualização.
                </p>
              </Section>

              <Section title="10. Legislação Aplicável">
                <p>
                  Estes Termos são regidos pelas leis da República Federativa do
                  Brasil. Fica eleito o foro da Comarca de Ubatuba (SP) para
                  dirimir eventuais controvérsias.
                </p>
              </Section>

              <Section title="11. Contato">
                <p>
                  Dúvidas sobre estes Termos? Entre em contato pelo{" "}
                  <a href="/contato" className="text-[#4B59F7] hover:underline">
                    formulário de contato
                  </a>
                  .
                </p>
              </Section>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-black text-lg font-black uppercase tracking-tight border-b border-black/10 pb-3 mb-5">
        {title}
      </h2>
      <div className="text-gray-700 text-base font-serif leading-[1.9] space-y-4">
        {children}
      </div>
    </div>
  );
}
