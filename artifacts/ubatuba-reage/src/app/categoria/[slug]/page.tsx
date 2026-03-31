import type { Metadata } from "next";
import { ClientHeader } from "@/components/layout/client-header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ArticleRow } from "@/components/home/article-feed";
import { notFound } from "next/navigation";
import { getArticlesByCategory, getAllCategories } from "@/lib/articles";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticlesByCategory(slug);
  const categories = await getAllCategories();
  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory || articles.length === 0) notFound();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${currentCategory.name} - ${SITE_NAME}`,
    url: `${SITE_URL}/categoria/${slug}`,
    description: `Matérias sobre ${currentCategory.name} publicadas pelo ${SITE_NAME}.`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/article/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-[260px] bg-[#111111] z-40" />
      <ClientHeader />

      <div className="flex min-h-screen">
        <div className="hidden lg:block flex-shrink-0 w-[260px]" />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="hidden lg:block h-10" />
          <div className="lg:hidden h-0" />

          <div className="bg-[#f5f5f5] px-5 md:px-10 lg:px-16 pt-8 pb-6">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: currentCategory.name, href: `/categoria/${slug}` },
              ]}
            />
            <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight uppercase mb-2">
              {currentCategory.name}
            </h1>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">
              {articles.length} {articles.length === 1 ? "matéria" : "matérias"}
            </p>
          </div>

          <div className="flex-1 bg-white">
            {articles.map((article) => (
              <ArticleRow key={article.slug} {...article} />
            ))}
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return (await getAllCategories()).map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const currentCategory = categories.find((c) => c.slug === slug);
  if (!currentCategory) return {};
  const articles = await getArticlesByCategory(slug);
  const ogImage = articles.length > 0
    ? articles[0].imageUrl
    : "https://picsum.photos/seed/ubatuba-reage-og/1200/630";
  return {
    title: `${currentCategory.name} - Matérias`,
    description: `Todas as matérias sobre ${currentCategory.name} publicadas pelo ${SITE_NAME}. Fiscalização e jornalismo cívico em Ubatuba.`,
    openGraph: {
      title: `${currentCategory.name} - ${SITE_NAME}`,
      description: `Matérias sobre ${currentCategory.name} no ${SITE_NAME}.`,
      url: `${SITE_URL}/categoria/${slug}`,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 675,
          alt: `${currentCategory.name} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${currentCategory.name} - ${SITE_NAME}`,
      description: `Todas as matérias sobre ${currentCategory.name} publicadas pelo ${SITE_NAME}.`,
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/categoria/${slug}`,
    },
  };
}
