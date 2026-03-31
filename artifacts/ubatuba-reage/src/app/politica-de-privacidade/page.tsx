import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do Ubatuba Reage, em conformidade com a LGPD (Lei Geral de Proteção de Dados). Saiba como coletamos, usamos e protegemos seus dados.",
  openGraph: {
    title: `Política de Privacidade | ${SITE_NAME}`,
    description:
      "Política de Privacidade do Ubatuba Reage em conformidade com a LGPD.",
    url: `${SITE_URL}/politica-de-privacidade`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Política de Privacidade | ${SITE_NAME}`,
    description: "Política de Privacidade do Ubatuba Reage.",
  },
  alternates: {
    canonical: `${SITE_URL}/politica-de-privacidade`,
  },
};

export default function PoliticaPrivacidadePage() {
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
                { name: "Política de Privacidade", href: "/politica-de-privacidade" },
              ]}
            />
            <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-black leading-[1.02] tracking-tight uppercase mb-2">
              Política de Privacidade
            </h1>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
              Última atualização: março de 2026
            </p>
          </div>

          <div className="flex-1 bg-white px-5 md:px-10 lg:px-16 py-12">
            <div className="max-w-3xl prose-custom">
              <Section title="1. Sobre esta Política">
                <p>
                  O <strong>Ubatuba Reage</strong> (&quot;nós&quot;, &quot;nosso&quot; ou &quot;Portal&quot;) está comprometido
                  com a proteção da sua privacidade. Esta Política descreve como
                  coletamos, usamos, armazenamos e protegemos seus dados pessoais,
                  em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD
                  — Lei nº 13.709/2018)</strong> e demais normas aplicáveis.
                </p>
                <p>
                  Ao utilizar o site ubatubareage.com.br ou enviar informações
                  através de nossos formulários, você concorda com os termos desta
                  Política.
                </p>
              </Section>

              <Section title="2. Dados Coletados">
                <p>Podemos coletar as seguintes categorias de dados:</p>
                <ul>
                  <li>
                    <strong>Dados fornecidos voluntariamente:</strong> nome,
                    e-mail, WhatsApp e mensagens enviadas pelos formulários de
                    contato, denúncias e newsletter.
                  </li>
                  <li>
                    <strong>Dados de uso:</strong> endereço IP, tipo de navegador,
                    páginas visitadas, tempo de acesso e outros dados de navegação,
                    coletados de forma anônima via ferramentas de análise.
                  </li>
                  <li>
                    <strong>Cookies:</strong> utilizamos cookies essenciais para
                    funcionamento do site e cookies analíticos para compreender o
                    comportamento dos leitores. Você pode desativá-los nas
                    configurações do seu navegador.
                  </li>
                </ul>
              </Section>

              <Section title="3. Finalidade do Tratamento">
                <p>Seus dados são utilizados para:</p>
                <ul>
                  <li>Responder mensagens de contato;</li>
                  <li>Analisar e apurar denúncias enviadas;</li>
                  <li>Enviar a newsletter, quando solicitado;</li>
                  <li>Melhorar o funcionamento e conteúdo do Portal;</li>
                  <li>Cumprir obrigações legais.</li>
                </ul>
                <p>
                  <strong>Não vendemos, alugamos ou cedemos seus dados a terceiros
                  para fins comerciais.</strong>
                </p>
              </Section>

              <Section title="4. Sigilo das Fontes">
                <p>
                  O Ubatuba Reage segue os princípios deontológicos do jornalismo
                  e garante o <strong>sigilo absoluto das fontes</strong> quando
                  solicitado. Dados de quem envia denúncias em sigilo não serão
                  divulgados, exceto por obrigação legal mediante ordem judicial
                  fundamentada.
                </p>
              </Section>

              <Section title="5. Armazenamento e Segurança">
                <p>
                  Os dados são armazenados em servidores seguros com criptografia
                  e acesso restrito. Adotamos medidas técnicas e organizacionais
                  para prevenir acessos não autorizados, alterações ou divulgação
                  indevida.
                </p>
                <p>
                  Mantemos seus dados apenas pelo tempo necessário para cumprir as
                  finalidades descritas ou para atender obrigações legais.
                </p>
              </Section>

              <Section title="6. Seus Direitos (LGPD)">
                <p>Como titular de dados, você tem o direito de:</p>
                <ul>
                  <li>Confirmar a existência de tratamento de seus dados;</li>
                  <li>Acessar seus dados;</li>
                  <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                  <li>
                    Solicitar a anonimização, bloqueio ou eliminação de dados
                    desnecessários;
                  </li>
                  <li>Revogar o consentimento a qualquer momento;</li>
                  <li>
                    Reclamar perante a Autoridade Nacional de Proteção de Dados
                    (ANPD).
                  </li>
                </ul>
                <p>
                  Para exercer seus direitos, entre em contato pelo formulário
                  disponível em{" "}
                  <a href="/contato" className="text-[#4B59F7] hover:underline">
                    /contato
                  </a>
                  .
                </p>
              </Section>

              <Section title="7. Links Externos">
                <p>
                  O Portal pode conter links para sites de terceiros. Não nos
                  responsabilizamos pelas práticas de privacidade desses sites.
                  Recomendamos que você leia as políticas de privacidade de cada
                  site que visitar.
                </p>
              </Section>

              <Section title="8. Atualizações desta Política">
                <p>
                  Esta Política pode ser atualizada periodicamente para refletir
                  mudanças na legislação ou em nossas práticas. A data da última
                  atualização é indicada no topo deste documento. Recomendamos que
                  você a consulte regularmente.
                </p>
              </Section>

              <Section title="9. Contato">
                <p>
                  Dúvidas sobre esta Política? Entre em contato pelo{" "}
                  <a href="/contato" className="text-[#4B59F7] hover:underline">
                    formulário de contato
                  </a>{" "}
                  ou pelo e-mail{" "}
                  <a
                    href="mailto:privacidade@ubatubareage.com.br"
                    className="text-[#4B59F7] hover:underline"
                  >
                    privacidade@ubatubareage.com.br
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
