import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { DenunciasForm } from "@/components/denuncias/denuncias-form";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Canal de Denúncias",
  description:
    "Envie sua denúncia ou relato sobre problemas em Ubatuba. Fiscalize, registre e ajude a comunidade a reagir contra o descaso público.",
  openGraph: {
    title: `Canal de Denúncias | ${SITE_NAME}`,
    description:
      "Envie sua denúncia ou relato sobre problemas em Ubatuba. Fiscalize, registre e ajude a comunidade a reagir contra o descaso público.",
    url: `${SITE_URL}/denuncias`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://picsum.photos/seed/ubatuba-reage-og/1200/630",
        width: 1200,
        height: 630,
        alt: `Canal de Denúncias — ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Canal de Denúncias | ${SITE_NAME}`,
    description:
      "Envie sua denúncia ou relato sobre problemas em Ubatuba.",
    images: ["https://picsum.photos/seed/ubatuba-reage-og/1200/630"],
  },
  alternates: {
    canonical: `${SITE_URL}/denuncias`,
  },
};

export default function DenunciasPage() {
  return (
    <>
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
                { name: "Denúncias", href: "/denuncias" },
              ]}
            />
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase mb-6 max-w-3xl">
              Canal de{" "}
              <span className="text-[#4B59F7]">Denúncias</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-serif italic leading-relaxed max-w-2xl mb-4">
              Sua voz é nossa arma. Cada relato, cada foto, cada detalhe que
              você enviar pode expor o descaso e mudar a realidade de Ubatuba.
            </p>
            <p className="text-white/50 text-sm font-mono uppercase tracking-widest">
              Sigilo garantido quando solicitado — você decide o que revelar
            </p>
          </div>

          <div className="bg-[#f5f5f5] px-5 md:px-10 lg:px-16 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
              {[
                { num: "01", label: "Preencha o formulário", desc: "Descreva o problema com o máximo de detalhes possível" },
                { num: "02", label: "Adicione evidências", desc: "Fotos ou documentos fortalecem a denúncia" },
                { num: "03", label: "Envie e acompanhe", desc: "Nossa equipe analisa e publica as denúncias verificadas" },
              ].map((step) => (
                <div key={step.num} className="bg-white p-5 border-t-4 border-[#4B59F7]">
                  <span className="text-[#4B59F7] text-2xl font-black font-mono">{step.num}</span>
                  <h3 className="text-black text-sm font-black uppercase tracking-tight mt-2 mb-1">{step.label}</h3>
                  <p className="text-gray-500 text-xs font-serif leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white px-5 md:px-10 lg:px-16 py-12">
            <div className="max-w-2xl">
              <h2 className="text-black text-xl md:text-2xl font-black uppercase tracking-tight mb-8">
                Enviar Denúncia ou Relato
              </h2>
              <DenunciasForm />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
