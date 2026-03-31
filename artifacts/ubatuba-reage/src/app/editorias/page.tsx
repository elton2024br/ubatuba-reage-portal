import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import Link from "next/link";
import { getAllCategories } from "@/lib/articles";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Editorias",
  description:
    "Explore todas as editorias do Ubatuba Reage: Abandono e Má Gestão, Saúde, Insegurança, Custo de Vida, Meio Ambiente, Educação e mais.",
  openGraph: {
    title: `Editorias | ${SITE_NAME}`,
    description:
      "Explore todas as editorias do Ubatuba Reage: Abandono e Má Gestão, Saúde, Insegurança, Custo de Vida, Meio Ambiente, Educação e mais.",
    url: `${SITE_URL}/editorias`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://picsum.photos/seed/ubatuba-reage-og/1200/630",
        width: 1200,
        height: 630,
        alt: `Editorias — ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Editorias | ${SITE_NAME}`,
    description: "Explore todas as editorias do Ubatuba Reage.",
    images: ["https://picsum.photos/seed/ubatuba-reage-og/1200/630"],
  },
  alternates: {
    canonical: `${SITE_URL}/editorias`,
  },
};

const EDITORIAL_DESCRIPTIONS: Record<string, string> = {
  "denuncia-ma-gestao":
    "Obras paradas, contratos sem licitação, desvios de verbas públicas e o descaso crônico com a infraestrutura da cidade.",
  "saude-precaria":
    "Hospital sem UTI, postos sem médicos, filas e o desamparo de uma cidade que esqueceu seus moradores.",
  seguranca:
    "Criminalidade em alta, ausência de policiamento nas periferias e a sensação de abandono no dia a dia.",
  "custo-de-vida":
    "IPTU abusivo, aluguel inacessível e a dificuldade de viver dignamente em uma cidade turística.",
  saneamento:
    "Esgoto a céu aberto, lixo nas praias e a destruição do patrimônio ambiental de Ubatuba.",
  educacao:
    "Escolas sem professores, salas precárias e o descaso com o futuro das crianças ubatubanas.",
  "abandono-publico":
    "Obras abandonadas, praças degradadas e espaços públicos esquecidos pela gestão municipal.",
  "identidade-caicara":
    "A luta dos moradores tradicionais para preservar sua cultura e seu espaço numa cidade cada vez mais turística.",
  tecnologia:
    "Tecnologia, democracia e os riscos do mundo digital para a cidadania.",
  "america-latina":
    "O contexto regional e internacional que afeta diretamente o Brasil e seus moradores.",
};

const EDITORIAL_ICONS: Record<string, string> = {
  "denuncia-ma-gestao": "🏗️",
  "saude-precaria": "🏥",
  seguranca: "🔒",
  "custo-de-vida": "💸",
  saneamento: "🌊",
  educacao: "📚",
  "abandono-publico": "🚧",
  "identidade-caicara": "🐟",
  tecnologia: "💻",
  "america-latina": "🌎",
};

export default async function EditoriasPage() {
  const categories = await getAllCategories();

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
                { name: "Editorias", href: "/editorias" },
              ]}
            />
            <h1 className="text-black text-4xl md:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase mb-4">
              Editorias
            </h1>
            <p className="text-gray-500 text-lg font-serif italic leading-relaxed max-w-2xl">
              As feridas abertas de Ubatuba. Acompanhe cada tema que move a
              comunidade e exige respostas.
            </p>
          </div>

          <div className="flex-1 bg-white px-5 md:px-10 lg:px-16 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="group border border-black/10 hover:border-[#4B59F7] transition-colors p-6 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl" role="img">
                      {EDITORIAL_ICONS[cat.slug] ?? "📰"}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-300 font-mono">
                      {cat.count} {cat.count === 1 ? "matéria" : "matérias"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-black text-base font-black uppercase tracking-tight mb-2 group-hover:text-[#4B59F7] transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-gray-500 text-sm font-serif leading-relaxed line-clamp-3">
                      {EDITORIAL_DESCRIPTIONS[cat.slug] ??
                        `Acompanhe as matérias sobre ${cat.name} publicadas pelo ${SITE_NAME}.`}
                    </p>
                  </div>
                  <span className="text-[#4B59F7] text-[11px] font-black uppercase tracking-[0.15em] font-mono mt-auto group-hover:underline">
                    Ver matérias →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
