import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BuscaClient } from "@/components/busca/busca-client";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Buscar Conteúdo",
  description:
    "Busque por artigos, reportagens e conteúdos do Ubatuba Reage sobre fiscalização e jornalismo cívico em Ubatuba.",
  openGraph: {
    title: `Busca | ${SITE_NAME}`,
    description:
      "Busque por artigos, reportagens e conteúdos do Ubatuba Reage.",
    url: `${SITE_URL}/busca`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Busca | ${SITE_NAME}`,
    description: "Busque por artigos do Ubatuba Reage.",
  },
  alternates: {
    canonical: `${SITE_URL}/busca`,
  },
};

export default async function BuscaPage() {
  const articles = await getAllArticles();

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
                { name: "Busca", href: "/busca" },
              ]}
            />
            <h1 className="text-black text-4xl md:text-5xl font-black leading-[1.02] tracking-tight uppercase mb-2">
              Buscar Conteúdo
            </h1>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
              {articles.length} matérias disponíveis
            </p>
          </div>

          <div className="flex-1 bg-white">
            <BuscaClient articles={articles} />
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
