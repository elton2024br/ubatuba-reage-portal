import type { Metadata } from "next";
import React from "react";
import { ClientHeader } from "@/components/layout/client-header";
import { DonationBanner } from "@/components/layout/donation-banner";
import { CampaignBanner } from "@/components/layout/campaign-banner";
import { Footer } from "@/components/layout/footer";
import { ArticleRow, LoadMoreButton } from "@/components/home/article-feed";
import { NewsletterCTA } from "@/components/home/newsletter-cta";
import { HighlightsSection } from "@/components/home/highlights-section";
import Image from "next/image";
import Link from "next/link";
import { getAllArticles, getCategoryColor } from "@/lib/articles";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";

const DEFAULT_OG_IMAGE = "https://picsum.photos/seed/ubatuba-reage-og/1200/630";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Fiscalização, Denúncias e Mobilização em Ubatuba`,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    title: `${SITE_NAME} - Fiscalização, Denúncias e Mobilização em Ubatuba`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_BR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Fiscalização e jornalismo cívico em Ubatuba`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Fiscalização, Denúncias e Mobilização em Ubatuba`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function Home() {
  const allArticles = await getAllArticles();
  const featuredArticles = allArticles.slice(0, 2);
  const highlightArticles = allArticles.slice(2, 5);
  const feedArticles = allArticles.slice(5);

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: SITE_NAME,
    url: SITE_URL,
    description: "A voz que não se cala. Fiscalização, denúncias e mobilização em Ubatuba.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allArticles.slice(0, 10).map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/article/${article.slug}`,
        name: article.title,
      })),
    },
  };

  const heroCatColor = featuredArticles[0] ? getCategoryColor(featuredArticles[0].categorySlug) : "#4B59F7";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-[260px] bg-[#111111] z-40" />
      <ClientHeader />

      <div className="flex min-h-screen">
        <div className="hidden lg:block flex-shrink-0 w-[260px]" />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="hidden lg:block h-10" />

          <CampaignBanner />

          {featuredArticles[0] && (
            <Link href={`/article/${featuredArticles[0].slug}`} className="relative block w-full h-[420px] lg:h-[70vh] bg-black overflow-hidden group">
              <Image
                src={featuredArticles[0].imageUrl}
                alt={featuredArticles[0].title}
                fill
                className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 z-10">
                <div className="max-w-[800px]">
                  <div className="flex items-center gap-3 mb-4">
                    {featuredArticles[0].series && (
                      <span className="bg-[#FF4444] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1">
                        {featuredArticles[0].series}
                      </span>
                    )}
                    <span
                      className="text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1"
                      style={{ backgroundColor: heroCatColor }}
                    >
                      {featuredArticles[0].category}
                    </span>
                  </div>
                  <h1 className="text-white text-[42px] lg:text-6xl font-bold leading-[1.05] tracking-tight mb-4 group-hover:underline decoration-white decoration-2 underline-offset-8">
                    {featuredArticles[0].title}
                  </h1>
                  <p className="text-white/80 text-lg lg:text-xl font-serif italic leading-relaxed mb-6 line-clamp-2">
                    {featuredArticles[0].lead}
                  </p>
                  <div className="flex items-center gap-2 text-white/50 text-xs font-mono uppercase tracking-widest">
                    <span>{featuredArticles[0].date}</span>
                    <span className="text-white/30">—</span>
                    <span className="text-white font-black">{featuredArticles[0].author}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          <div className="flex-1 bg-[#f5f5f5]">
            <div className="bg-white">
              {featuredArticles[1] && <ArticleRow {...featuredArticles[1]} />}

              <DonationBanner />

              <HighlightsSection articles={highlightArticles} />

              {feedArticles.map((article, index) => (
                <React.Fragment key={article.slug}>
                  <ArticleRow {...article} />
                  {index === 2 && <NewsletterCTA />}
                </React.Fragment>
              ))}
            </div>

            <LoadMoreButton />
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
