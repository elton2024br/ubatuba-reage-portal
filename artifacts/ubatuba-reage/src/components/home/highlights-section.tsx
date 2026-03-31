"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategoryColor } from "@/lib/articles";
import type { ArticleSummary } from "@/lib/articles";

interface HighlightsSectionProps {
  articles: ArticleSummary[];
}

export function HighlightsSection({ articles }: HighlightsSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (articles.length === 0) return null;

  return (
    <div
      ref={ref}
      className="bg-[#f5f5f5] py-8 px-4 lg:px-8 border-y border-black/10"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-1 h-6 bg-[#4B59F7]" />
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] font-mono text-black/60">
          Em Destaque
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => {
          const catColor = getCategoryColor(article.categorySlug);
          return (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group bg-white border border-black/5 hover:border-black/15 transition-colors overflow-hidden"
            >
              <div className="relative w-full aspect-[16/9] bg-gray-200 overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-4">
                <span
                  className="text-white text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 inline-block mb-2"
                  style={{ backgroundColor: catColor }}
                >
                  {article.category}
                </span>
                <h3 className="text-black text-[15px] font-bold leading-[1.15] tracking-tight group-hover:underline decoration-1 underline-offset-2 uppercase mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">
                  {article.date}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
