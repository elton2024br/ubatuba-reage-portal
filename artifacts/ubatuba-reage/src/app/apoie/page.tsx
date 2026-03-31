import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import Link from "next/link";
import {
  WhatsAppIcon,
  InstagramIcon,
  XIcon,
  FacebookIcon,
} from "@/components/icons";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Apoie o Movimento",
  description:
    "Apoie o Ubatuba Reage: compartilhe, voluntearie-se ou doe via Pix. Juntos somos a força que Ubatuba precisa.",
  openGraph: {
    title: `Apoie o Movimento | ${SITE_NAME}`,
    description:
      "Apoie o Ubatuba Reage: compartilhe, voluntearie-se ou doe via Pix. Juntos somos a força que Ubatuba precisa.",
    url: `${SITE_URL}/apoie`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://picsum.photos/seed/ubatuba-reage-og/1200/630",
        width: 1200,
        height: 630,
        alt: `Apoie o ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Apoie o Movimento | ${SITE_NAME}`,
    description:
      "Apoie o Ubatuba Reage: compartilhe, voluntearie-se ou doe via Pix.",
    images: ["https://picsum.photos/seed/ubatuba-reage-og/1200/630"],
  },
  alternates: {
    canonical: `${SITE_URL}/apoie`,
  },
};

const SOCIALS_SHARE = [
  { icon: WhatsAppIcon, href: "https://wa.me/send?text=Conheca%20o%20Ubatuba%20Reage%3A%20https%3A%2F%2Fubatubareage.com.br", label: "WhatsApp", color: "#25D366" },
  { icon: InstagramIcon, href: "https://instagram.com/ubatubaReage", label: "Instagram", color: "#E1306C" },
  { icon: XIcon, href: "https://x.com/ubatubaReage", label: "X", color: "#000000" },
  { icon: FacebookIcon, href: "https://facebook.com/ubatubaReage", label: "Facebook", color: "#1877F2" },
];

export default function ApoiePage() {
  return (
    <>
      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-[260px] bg-[#111111] z-40" />
      <ClientHeader />

      <div className="flex min-h-screen">
        <div className="hidden lg:block flex-shrink-0 w-[260px]" />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="hidden lg:block h-10" />

          <div className="bg-[#4B59F7] text-white px-5 md:px-10 lg:px-16 pt-8 pb-16">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Apoie", href: "/apoie" },
              ]}
            />
            <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-black leading-[1.02] tracking-tight uppercase mb-6 max-w-4xl">
              Reaja Com a Gente.{" "}
              <span className="text-white/60">Ubatuba Precisa de Você.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-serif italic leading-relaxed max-w-2xl">
              O Ubatuba Reage não tem patrocinadores corporativos, não recebe
              verbas públicas e não tem dono. Existe porque a comunidade existe
              e age porque a comunidade age.
            </p>
          </div>

          <div className="bg-white px-5 md:px-10 lg:px-16 py-16">
            <div className="max-w-4xl">
              <h2 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                Por que Apoiar?
              </h2>
              <p className="text-gray-700 text-lg leading-[1.8] font-serif mb-4">
                Cada denúncia publicada, cada escândalo exposto, cada direito
                defendido só acontece porque pessoas como você decidem que o
                silêncio não é uma opção.
              </p>
              <p className="text-gray-700 text-lg leading-[1.8] font-serif mb-4">
                Somos jornalismo cívico independente. Sem anunciantes para
                proteger, sem partidos para favorecer, sem padrinho para
                agradar. Nossa única obrigação é com a verdade e com você.
              </p>
              <p className="text-gray-700 text-lg leading-[1.8] font-serif">
                Apoiar o Ubatuba Reage é investir na sua cidade. É dizer que
                você se importa. Que Ubatuba merece mais. Que a mudança começa
                agora.
              </p>
            </div>
          </div>

          <div className="bg-[#f5f5f5] px-5 md:px-10 lg:px-16 py-16">
            <div className="max-w-4xl">
              <h2 className="text-black text-2xl md:text-3xl font-black uppercase tracking-tight mb-10">
                Como Apoiar
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 flex flex-col gap-4">
                  <div className="text-5xl">📢</div>
                  <h3 className="text-black text-xl font-black uppercase tracking-tight">
                    Compartilhe
                  </h3>
                  <p className="text-gray-600 text-sm font-serif leading-relaxed flex-1">
                    Siga e compartilhe nas redes sociais. Cada compartilhamento
                    amplia o alcance das denúncias e faz pressão sobre quem tem
                    o poder de mudar a realidade.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {SOCIALS_SHARE.map(({ icon: Icon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: color }}
                        aria-label={label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-8 flex flex-col gap-4">
                  <div className="text-5xl">🤝</div>
                  <h3 className="text-black text-xl font-black uppercase tracking-tight">
                    Voluntearie-se
                  </h3>
                  <p className="text-gray-600 text-sm font-serif leading-relaxed flex-1">
                    Tem habilidades em jornalismo, fotografia, design, direito,
                    tecnologia ou análise de dados? O Ubatuba Reage é construído
                    por voluntários apaixonados por Ubatuba.
                  </p>
                  <Link
                    href="/contato"
                    className="block text-center bg-[#4B59F7] text-white py-3 text-xs font-black uppercase tracking-widest font-mono hover:bg-[#3d4ad4] transition-colors mt-2"
                  >
                    Entrar em contato
                  </Link>
                </div>

                <div className="bg-[#111111] p-8 flex flex-col gap-4">
                  <div className="text-5xl">💚</div>
                  <h3 className="text-white text-xl font-black uppercase tracking-tight">
                    Doe via Pix
                  </h3>
                  <p className="text-white/70 text-sm font-serif leading-relaxed flex-1">
                    Qualquer valor ajuda a manter o servidor, as ferramentas e o
                    tempo dedicado à apuração. Cada real é uma declaração de que
                    a verdade importa.
                  </p>
                  <div className="bg-white/10 p-4 mt-2">
                    <p className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-white/50 mb-1">
                      Chave Pix
                    </p>
                    <p className="text-white font-mono font-bold text-sm break-all">
                      apoio@ubatubareage.com.br
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] text-white px-5 md:px-10 lg:px-16 py-16">
            <div className="max-w-3xl text-center mx-auto">
              <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight mb-6">
                Juntos Somos a{" "}
                <span className="text-[#4B59F7]">Força que Transforma</span>
              </h2>
              <p className="text-white/70 text-lg font-serif italic leading-relaxed mb-10">
                "Convidamos cada morador, cada turista consciente, a se juntar a
                nós. A não se calar. A fiscalizar. A denunciar. A compartilhar.
                A exigir. Juntos, somos a força que Ubatuba precisa para
                reescrever sua história."
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/denuncias"
                  className="bg-[#4B59F7] text-white px-8 py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:bg-[#3d4ad4] transition-colors"
                >
                  Enviar Denúncia
                </Link>
                <Link
                  href="/"
                  className="border border-white text-white px-8 py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:bg-white hover:text-black transition-colors"
                >
                  Ler Matérias
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
