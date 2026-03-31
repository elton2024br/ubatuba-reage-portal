import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ContatoForm } from "@/components/contato/contato-form";
import {
  WhatsAppIcon,
  InstagramIcon,
  XIcon,
  FacebookIcon,
  YouTubeIcon,
  TikTokIcon,
} from "@/components/icons";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o Ubatuba Reage. Envie sugestões, informações ou press releases.",
  openGraph: {
    title: `Contato | ${SITE_NAME}`,
    description:
      "Entre em contato com o Ubatuba Reage. Envie sugestões, informações ou press releases.",
    url: `${SITE_URL}/contato`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://picsum.photos/seed/ubatuba-reage-og/1200/630",
        width: 1200,
        height: 630,
        alt: `Contato — ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contato | ${SITE_NAME}`,
    description: "Entre em contato com o Ubatuba Reage.",
    images: ["https://picsum.photos/seed/ubatuba-reage-og/1200/630"],
  },
  alternates: {
    canonical: `${SITE_URL}/contato`,
  },
};

const SOCIALS = [
  { icon: WhatsAppIcon, href: "https://wa.me/message/ubatubaReage", label: "WhatsApp", handle: "@ubatubaReage" },
  { icon: InstagramIcon, href: "https://instagram.com/ubatubaReage", label: "Instagram", handle: "@ubatubaReage" },
  { icon: XIcon, href: "https://x.com/ubatubaReage", label: "X (Twitter)", handle: "@ubatubaReage" },
  { icon: FacebookIcon, href: "https://facebook.com/ubatubaReage", label: "Facebook", handle: "/ubatubaReage" },
  { icon: YouTubeIcon, href: "https://youtube.com/@ubatubaReage", label: "YouTube", handle: "@ubatubaReage" },
  { icon: TikTokIcon, href: "https://tiktok.com/@ubatubaReage", label: "TikTok", handle: "@ubatubaReage" },
];

export default function ContatoPage() {
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
                { name: "Contato", href: "/contato" },
              ]}
            />
            <h1 className="text-black text-4xl md:text-5xl lg:text-6xl font-black leading-[1.02] tracking-tight uppercase mb-4">
              Fale Conosco
            </h1>
            <p className="text-gray-500 text-lg font-serif italic leading-relaxed max-w-2xl">
              Tem uma informação, sugestão ou quer colaborar com o movimento?
              Estamos aqui.
            </p>
          </div>

          <div className="bg-white px-5 md:px-10 lg:px-16 py-12">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-5xl">
              <div className="flex-1 min-w-0">
                <h2 className="text-black text-lg font-black uppercase tracking-tight mb-6">
                  Envie uma mensagem
                </h2>
                <ContatoForm />
              </div>

              <div className="lg:w-[320px] flex-shrink-0">
                <h2 className="text-black text-lg font-black uppercase tracking-tight mb-6">
                  Nossas redes sociais
                </h2>
                <div className="flex flex-col gap-3">
                  {SOCIALS.map(({ icon: Icon, href, label, handle }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 border border-black/10 hover:border-[#4B59F7] hover:bg-[#f5f5f5] transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-black/40 group-hover:text-[#4B59F7] transition-colors flex-shrink-0" />
                      <div>
                        <p className="text-black text-sm font-black uppercase tracking-tight">
                          {label}
                        </p>
                        <p className="text-gray-400 text-xs font-mono">{handle}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-[#111111] text-white">
                  <h3 className="text-white text-sm font-black uppercase tracking-tight mb-2">
                    Tem uma denúncia?
                  </h3>
                  <p className="text-white/70 text-xs font-serif leading-relaxed mb-4">
                    Para enviar relatos e evidências de problemas em Ubatuba,
                    use nosso canal dedicado.
                  </p>
                  <a
                    href="/denuncias"
                    className="block text-center bg-[#4B59F7] text-white py-3 text-xs font-black uppercase tracking-widest font-mono hover:bg-[#3d4ad4] transition-colors"
                  >
                    Canal de Denúncias
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
