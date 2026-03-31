import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SITE_LOCALE } from "@/lib/site-config";
import { CookieBanner } from "@/components/layout/cookie-banner";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Fiscalizacao, Denuncias e Mobilizacao em Ubatuba`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Fiscalizacao, Denuncias e Mobilizacao em Ubatuba`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "https://picsum.photos/seed/ubatuba-reage-og/1200/630",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Fiscalizacao e jornalismo civico em Ubatuba`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Fiscalizacao, Denuncias e Mobilizacao em Ubatuba`,
    description: SITE_DESCRIPTION,
    images: ["https://picsum.photos/seed/ubatuba-reage-og/1200/630"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "pt-BR",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    sameAs: [
      "https://instagram.com/ubatubaReage",
      "https://facebook.com/ubatubaReage",
      "https://youtube.com/@ubatubaReage",
      "https://x.com/ubatubaReage",
    ],
  };

  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/fonts/TIActuBeta-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/TIActuBeta-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} - RSS Feed`}
          href="/feed.xml"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f5f5f5] text-[#111111] font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
