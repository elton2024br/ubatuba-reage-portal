"use client";

import React, { useState } from "react";
import { ArticleRow } from "@/components/home/article-feed";
import type { ArticleSummary } from "@/lib/articles";

interface MateriasContentProps {
  articles: ArticleSummary[];
  categories: { name: string; slug: string; count: number }[];
}

export function MateriasContent({ articles, categories }: MateriasContentProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? articles.filter((a) => a.categorySlug === activeCategory)
    : articles;

  return (
    <div className="flex-1 bg-[#f5f5f5]">
      <div className="px-5 md:px-10 lg:px-16 py-6 bg-white border-b border-black/10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.1em] border transition-colors ${
              activeCategory === null
                ? "bg-[#4B59F7] text-white border-[#4B59F7]"
                : "border-black/15 text-black/60 hover:border-[#4B59F7] hover:text-[#4B59F7]"
            }`}
          >
            Todas ({articles.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.1em] border transition-colors ${
                activeCategory === cat.slug
                  ? "bg-[#4B59F7] text-white border-[#4B59F7]"
                  : "border-black/15 text-black/60 hover:border-[#4B59F7] hover:text-[#4B59F7]"
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white">
        {filtered.map((article) => (
          <ArticleRow key={article.slug} {...article} />
        ))}
        {filtered.length === 0 && (
          <div className="px-5 md:px-10 lg:px-16 py-16 text-center">
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">
              Nenhuma materia encontrada nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
