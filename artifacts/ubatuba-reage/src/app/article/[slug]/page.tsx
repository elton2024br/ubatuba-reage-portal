import type { Metadata } from "next";
import React from "react";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { DonationBanner } from "@/components/layout/donation-banner";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllSlugs, getAllArticles, getCategoryColor } from "@/lib/articles";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const relatedArticles = (await getAllArticles())
    .filter((a) => a.slug !== slug)
    .slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.lead,
    image: article.imageUrl,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/article/${article.slug}`,
    },
    articleSection: article.category,
    inLanguage: "pt-BR",
  };

  const donationInsertIndex = 3;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-[260px] bg-[#0a0a0a] z-40" />
      <ClientHeader />

      <div className="flex min-h-screen">
        <div className="hidden lg:block flex-shrink-0 w-[260px]" />

        <main className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="hidden lg:block h-10" />

          <div className="bg-[#f5f5f5] px-5 md:px-10 lg:px-16 pt-6 lg:pt-8 pb-8 lg:pb-10">
            <div className="lg:mb-6">
              <Breadcrumbs
                items={[
                  { name: "Home", href: "/" },
                  { name: article.category, href: `/categoria/${article.categorySlug}` },
                ]}
              />
            </div>

            {article.series && (
              <span className="inline-block bg-[#FF4444] text-white text-[10px] font-black uppercase tracking-[0.15em] font-mono px-3 py-1 mb-4">
                {article.series}
              </span>
            )}

            <h1 className="text-black text-[26px] md:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight uppercase max-w-4xl mb-4 lg:mb-6">
              {article.title}
            </h1>

            <p className="text-gray-600 text-base md:text-xl font-serif italic leading-relaxed max-w-3xl mb-6 lg:mb-8">
              {article.lead}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 lg:pt-5 border-t border-black/10">
              <div className="flex items-center gap-3">
                <Image
                  src={article.authorImage}
                  alt={article.author}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="text-black text-sm font-bold font-mono uppercase tracking-widest">
                    {article.author}
                  </span>
                  <span className="text-gray-500 text-[11px] font-sans leading-snug max-w-[280px]">
                    {article.authorBio}
                  </span>
                </div>
              </div>
              <span className="text-gray-300 hidden sm:block">|</span>
              <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                {article.date}
              </span>
              <span className="text-gray-300 hidden sm:block">|</span>
              <span className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                {article.readingTime}
              </span>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-gray-400 text-[10px] font-mono uppercase tracking-widest hidden sm:block">Compartilhar:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`${SITE_URL}/article/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center bg-black text-white hover:bg-[#4B59F7] transition-colors text-xs font-bold"
                  aria-label="Compartilhar no X"
                >
                  X
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/article/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center bg-[#1877F2] text-white hover:bg-[#4B59F7] transition-colors text-xs font-bold"
                  aria-label="Compartilhar no Facebook"
                >
                  f
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} — ${SITE_URL}/article/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 flex items-center justify-center bg-[#25D366] text-white hover:bg-[#4B59F7] transition-colors text-xs font-bold"
                  aria-label="Compartilhar no WhatsApp"
                >
                  W
                </a>
                <a
                  href="/apoie"
                  className="ml-1 flex items-center gap-1 bg-[#4B59F7] text-white hover:bg-[#3d4ad4] transition-colors px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] font-mono whitespace-nowrap"
                >
                  Apoie
                </a>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] lg:aspect-[16/7] bg-gray-200">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, calc(100vw - 260px)"
              className="object-cover"
              priority
            />
          </div>
          <div className="bg-[#f5f5f5] px-5 md:px-10 lg:px-16 py-2">
            <p className="text-gray-400 text-xs font-mono italic">
              {article.imageCaption}
            </p>
          </div>

          <div className="flex gap-0 items-start">
            <div className="flex-1 min-w-0">
              <article className="px-5 md:px-10 lg:px-16 py-8 lg:py-10 max-w-3xl">
                {article.body.map((paragraph, i) => (
                  <React.Fragment key={i}>
                    <p className="text-gray-800 text-lg leading-[1.8] mb-6 font-serif">
                      {paragraph}
                    </p>
                    {i === donationInsertIndex - 1 && (
                      <div className="my-8 -mx-5 md:-mx-10 lg:-mx-16">
                        <DonationBanner />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </article>

              <div className="px-5 md:px-10 lg:px-16 pb-8 flex flex-wrap gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.15em] text-gray-400 self-center mr-2">Tags:</span>
                {[article.category, "Ubatuba Reage", "Jornalismo cívico"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-black/20 text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-gray-600 hover:border-[#4B59F7] hover:text-[#4B59F7] cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mx-5 md:mx-10 lg:mx-16 border-t border-black/10" />

              <div className="px-5 md:px-10 lg:px-16 py-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[#4B59F7] font-mono font-bold uppercase tracking-[0.15em] text-xs hover:underline"
                >
                  &larr; Voltar para Matérias
                </Link>
              </div>

              <div className="xl:hidden px-5 md:px-10 lg:px-16 pb-10">
                <div className="border-t border-black/10 pt-8">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] font-mono text-black/40 border-b border-black/10 pb-4 mb-6 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#4B59F7] inline-block" />
                    Leia Também
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedArticles.map((rel) => {
                      const relCatColor = getCategoryColor(rel.categorySlug);
                      return (
                        <Link
                          key={rel.slug}
                          href={`/article/${rel.slug}`}
                          className="group flex flex-col gap-2"
                        >
                          <div className="relative w-full aspect-[16/9] bg-gray-200 overflow-hidden">
                            <Image
                              src={rel.imageUrl}
                              alt={rel.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                            />
                          </div>
                          <span
                            className="text-white text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 self-start"
                            style={{ backgroundColor: relCatColor }}
                          >
                            {rel.category}
                          </span>
                          <h4 className="text-black text-sm font-black leading-tight tracking-tight group-hover:underline decoration-1 underline-offset-2 uppercase">
                            {rel.title}
                          </h4>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden xl:block w-[320px] flex-shrink-0 border-l border-black/10 bg-[#fafafa] self-stretch">
              <div className="sticky top-[40px] p-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] font-mono text-gray-400 border-b border-black/10 pb-4 mb-6">
                  Leia Também
                </h3>
                <div className="flex flex-col gap-6">
                  {relatedArticles.map((rel) => {
                    const relCatColor = getCategoryColor(rel.categorySlug);
                    return (
                      <Link
                        key={rel.slug}
                        href={`/article/${rel.slug}`}
                        className="group flex flex-col gap-2"
                      >
                        <div className="relative w-full aspect-[16/9] bg-gray-200 overflow-hidden">
                          <Image
                            src={rel.imageUrl}
                            alt={rel.title}
                            fill
                            sizes="320px"
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                          />
                        </div>
                        <span
                          className="text-white text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 self-start"
                          style={{ backgroundColor: relCatColor }}
                        >
                          {rel.category}
                        </span>
                        <h4 className="text-black text-sm font-black leading-tight tracking-tight group-hover:underline decoration-1 underline-offset-2 uppercase">
                          {rel.title}
                        </h4>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8 p-4 bg-[#4B59F7] text-white">
                  <p className="text-[10px] font-mono font-black uppercase tracking-[0.15em] mb-2">Newsletter</p>
                  <p className="text-sm font-bold leading-tight mb-4">Receba as principais reportagens do Ubatuba Reage na sua caixa de entrada</p>
                  <Link
                    href="/newsletter"
                    className="block text-center border border-white text-white hover:bg-white hover:text-[#4B59F7] transition-colors py-2 text-[11px] font-black uppercase tracking-[0.15em] font-mono"
                  >
                    Assinar
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.lead,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.lead,
      url: `${SITE_URL}/article/${article.slug}`,
      siteName: SITE_NAME,
      locale: "pt_BR",
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
      publishedTime: article.dateISO,
      authors: [article.author],
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.lead,
      images: [article.imageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/article/${article.slug}`,
    },
  };
}
