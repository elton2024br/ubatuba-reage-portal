import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { MateriasContent } from "./materias-content";
import { getAllArticles, getAllCategories } from "@/lib/articles";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Todas as Materias",
  description: "Arquivo completo de reportagens e denuncias do Ubatuba Reage. Filtre por categoria e encontre a materia que procura.",
  alternates: {
    canonical: `${SITE_URL}/materias`,
  },
};

export default async function MateriasPage() {
  const allArticles = await getAllArticles();
  const categories = await getAllCategories();

  return (
    <>
      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-[260px] bg-[#111111] z-40" />
      <ClientHeader />

      <div className="flex min-h-screen">
        <div className="hidden lg:block flex-shrink-0 w-[260px]" />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="hidden lg:block h-10" />
          <div className="lg:hidden h-[72px]" />

          <div className="bg-[#111111] px-5 md:px-10 lg:px-16 py-10">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2">
              Todas as Materias
            </h1>
            <p className="text-white/60 text-sm font-mono uppercase tracking-widest">
              Arquivo completo de reportagens
            </p>
          </div>

          <MateriasContent articles={allArticles} categories={categories} />

          <Footer />
        </main>
      </div>
    </>
  );
}
