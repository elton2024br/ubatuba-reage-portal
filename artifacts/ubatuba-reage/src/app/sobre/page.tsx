import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sobre o Movimento",
  description:
    "Conheça o Ubatuba Reage: quem somos, nossa missão, valores inegociáveis e a luta pelos direitos da comunidade de Ubatuba.",
  openGraph: {
    title: `Sobre o Movimento | ${SITE_NAME}`,
    description:
      "Conheça o Ubatuba Reage: quem somos, nossa missão, valores inegociáveis e a luta pelos direitos da comunidade de Ubatuba.",
    url: `${SITE_URL}/sobre`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://picsum.photos/seed/ubatuba-reage-og/1200/630",
        width: 1200,
        height: 630,
        alt: `Sobre o ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sobre o Movimento | ${SITE_NAME}`,
    description:
      "Conheça o Ubatuba Reage: quem somos, nossa missão, valores inegociáveis e a luta pelos direitos da comunidade de Ubatuba.",
    images: ["https://picsum.photos/seed/ubatuba-reage-og/1200/630"],
  },
  alternates: {
    canonical: `${SITE_URL}/sobre`,
  },
};

const VALUES = [
  {
    title: "Verdade",
    description:
      "Comprometimento inabalável com a apuração e divulgação de fatos, mesmo que incômodos.",
  },
  {
    title: "Transparência",
    description:
      "Atuação clara e aberta, sem agendas ocultas, sempre a serviço da comunidade.",
  },
  {
    title: "Justiça",
    description:
      "Luta incansável contra a corrupção, o descaso e as desigualdades sociais.",
  },
  {
    title: "Engajamento Cívico",
    description:
      "Incentivo à participação ativa da população na fiscalização e cobrança dos direitos.",
  },
  {
    title: "Amor por Ubatuba",
    description:
      "A paixão pela cidade e seu povo como motor de toda a nossa ação.",
  },
];

const DORES = [
  {
    title: "Abandono e Má Gestão",
    description:
      "Infraestrutura precária, obras paradas, descaso público, corrupção e falta de planejamento. Esta é a maior fonte de frustração e engajamento da nossa comunidade.",
  },
  {
    title: "Saúde Precária",
    description:
      "Falta de estrutura hospitalar, atendimento deficiente, filas e a sensação de desamparo em momentos críticos.",
  },
  {
    title: "Insegurança e Violência",
    description:
      "Aumento da criminalidade, racismo e a percepção de falta de segurança no dia a dia.",
  },
  {
    title: "Custo de Vida e Impostos",
    description:
      "Preços abusivos, IPTU elevado e a dificuldade de viver dignamente em uma cidade turística.",
  },
  {
    title: "Meio Ambiente e Saneamento",
    description:
      "Problemas com esgoto, lixo, poluição e a falta de preservação ambiental.",
  },
  {
    title: "Educação e Desvalorização",
    description:
      "Descaso com a educação pública e a desvalorização dos profissionais.",
  },
];

export default function SobrePage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `Sobre o ${SITE_NAME}`,
    url: `${SITE_URL}/sobre`,
    description:
      "Conheça o Ubatuba Reage: quem somos, nossa missão e valores.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-[260px] bg-[#111111] z-40" />
      <ClientHeader />

      <div className="flex min-h-screen">
        <div className="hidden lg:block flex-shrink-0 w-[260px]" />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="hidden lg:block h-10" />

          <div className="bg-[#111111] text-white px-5 md:px-10 lg:px-16 pt-8 pb-16">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Sobre", href: "/sobre" },
              ]}
            />
            <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-black leading-[1.02] tracking-tight uppercase mb-6 max-w-4xl">
              A Voz que Não se Cala.{" "}
              <span className="text-[#4B59F7]">A Força que Transforma.</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-serif italic leading-relaxed max-w-2xl">
              Somos o eco de milhares de vozes que se recusam a aceitar o
              descaso, a má gestão e a injustiça em Ubatuba.
            </p>
          </div>

          <div className="bg-white px-5 md:px-10 lg:px-16 py-16 max-w-4xl">
            <h2 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
              Quem Somos
            </h2>
            <p className="text-gray-700 text-lg leading-[1.8] font-serif mb-6">
              Somos o <strong>Ubatuba Reage</strong>, um movimento digital e
              comunitário nascido da indignação e do amor por Ubatuba. Não somos
              apenas um perfil; somos o eco de milhares de vozes que se recusam
              a aceitar o descaso, a má gestão e a injustiça.
            </p>
            <p className="text-gray-700 text-lg leading-[1.8] font-serif mb-6">
              Somos a verdade local que desmascara a narrativa oficial, o farol
              que ilumina os problemas e a ponte que conecta a comunidade em
              busca de soluções.
            </p>
          </div>

          <div className="bg-[#4B59F7] px-5 md:px-10 lg:px-16 py-16">
            <div className="max-w-4xl">
              <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
                Nossa Missão
              </h2>
              <p className="text-white/90 text-lg md:text-xl leading-[1.8] font-serif">
                Nossa missão é <strong className="text-white">fiscalizar</strong>,{" "}
                <strong className="text-white">denunciar</strong> e{" "}
                <strong className="text-white">mobilizar</strong>. Existimos para
                dar voz aos que são silenciados, para expor os problemas que
                afetam diretamente a vida dos moradores e para catalisar a ação
                coletiva. Buscamos uma Ubatuba mais justa, transparente e digna
                para todos, onde a beleza natural não mascare a realidade social e
                política.
              </p>
            </div>
          </div>

          <div className="bg-[#f5f5f5] px-5 md:px-10 lg:px-16 py-16">
            <div className="max-w-4xl">
              <h2 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tight mb-10">
                Nossos Valores Inegociáveis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {VALUES.map((value) => (
                  <div
                    key={value.title}
                    className="bg-white p-6 border-l-4 border-[#4B59F7]"
                  >
                    <h3 className="text-black text-base font-black uppercase tracking-[0.1em] mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-serif">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white px-5 md:px-10 lg:px-16 py-16">
            <div className="max-w-4xl">
              <h2 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                Nossa Luta
              </h2>
              <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mb-10">
                As dores e raivas que nos movem
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DORES.map((dor, i) => (
                  <div key={dor.title} className="group">
                    <div className="flex items-start gap-4 mb-3">
                      <span className="text-[#4B59F7] text-3xl font-black font-mono leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-black text-base font-black uppercase tracking-tight mb-2">
                      {dor.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-serif">
                      {dor.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#111111] text-white px-5 md:px-10 lg:px-16 py-16">
            <div className="max-w-3xl">
              <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
                Nossa Força
              </h2>
              <p className="text-white/80 text-lg leading-[1.8] font-serif mb-6">
                Nosso poder reside na capacidade de mobilizar e engajar a
                comunidade. Os conteúdos que mais ressoam são denúncias
                impactantes, guias práticos que empoderam o cidadão, cultura e
                identidade local caiçara, e chamadas à ação coletiva.
              </p>
              <p className="text-white/80 text-lg leading-[1.8] font-serif mb-10">
                O Ubatuba Reage é um convite à ação. Convidamos cada morador,
                cada turista consciente, a se juntar a nós. A não se calar. A
                fiscalizar. A denunciar. A compartilhar. A exigir.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apoie"
                  className="bg-[#4B59F7] text-white px-8 py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:bg-[#3d4ad4] transition-colors"
                >
                  Apoie o Movimento
                </Link>
                <Link
                  href="/denuncias"
                  className="border border-white text-white px-8 py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:bg-white hover:text-black transition-colors"
                >
                  Fazer uma Denúncia
                </Link>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
