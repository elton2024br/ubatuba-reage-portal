import Link from "next/link";
import { SITE_URL } from "@/lib/site-config";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6">
        {items.map((item, index) => (
          <span key={item.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400 text-[11px]">/</span>}
            {index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-[#4B59F7] text-[11px] font-mono font-bold uppercase tracking-[0.15em] hover:underline"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-[#4B59F7] text-[11px] font-mono font-bold uppercase tracking-[0.15em]">
                {item.name}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
