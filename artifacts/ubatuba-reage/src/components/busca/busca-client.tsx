"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon } from "@/components/icons";
import type { ArticleSummary } from "@/lib/articles";

interface Props {
  articles: ArticleSummary[];
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

export function BuscaClient({ articles }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ArticleSummary[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") ?? "";
      if (q) {
        setQuery(q);
        doSearch(q);
      }
    }
  }, []);

  function doSearch(q: string) {
    const norm = normalize(q);
    if (!norm.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    const words = norm.trim().split(/\s+/);
    const filtered = articles.filter((a) => {
      const haystack = normalize(`${a.title} ${a.lead} ${a.category} ${a.author}`);
      return words.every((w) => haystack.includes(w));
    });
    setResults(filtered);
    setSearched(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    doSearch(query);
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    window.history.replaceState({}, "", url.toString());
  }

  return (
    <div className="px-5 md:px-10 lg:px-16 py-8 max-w-4xl">
      <form onSubmit={handleSubmit} className="flex gap-0 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título, categoria, autor..."
          className="flex-1 border border-black/20 bg-[#f5f5f5] px-5 py-4 text-base font-mono text-black placeholder-gray-400 focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors"
        />
        <button
          type="submit"
          className="bg-[#4B59F7] text-white px-6 py-4 hover:bg-[#3d4ad4] transition-colors flex items-center gap-2"
          aria-label="Buscar"
        >
          <SearchIcon className="w-5 h-5" />
          <span className="font-black text-sm uppercase tracking-widest font-mono hidden sm:inline">
            Buscar
          </span>
        </button>
      </form>

      {!searched && (
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 font-mono mb-6">
            Sugestões de busca
          </p>
          <div className="flex flex-wrap gap-2">
            {["Hospital", "IPTU", "Esgoto", "Câmara", "Obra parada", "Segurança", "Educação"].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  doSearch(term);
                }}
                className="px-4 py-2 border border-black/15 text-sm font-mono font-bold text-gray-600 hover:border-[#4B59F7] hover:text-[#4B59F7] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {searched && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-300 text-6xl font-black mb-4">?</p>
          <p className="text-black font-black uppercase text-xl tracking-tight mb-2">
            Nenhum resultado encontrado
          </p>
          <p className="text-gray-500 font-serif text-sm">
            Tente outros termos ou navegue pelas{" "}
            <Link href="/editorias" className="text-[#4B59F7] underline">
              editorias
            </Link>
            .
          </p>
        </div>
      )}

      {searched && results.length > 0 && (
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 font-mono mb-6">
            {results.length} resultado{results.length !== 1 ? "s" : ""} para &ldquo;{query}&rdquo;
          </p>
          <div className="flex flex-col divide-y divide-black/5">
            {results.map((article) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}`}
                className="group flex gap-5 py-5 hover:bg-[#f5f5f5] -mx-5 px-5 transition-colors"
              >
                <div className="relative w-24 h-16 flex-shrink-0 bg-gray-100 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[#4B59F7] text-[10px] font-black uppercase tracking-[0.15em] font-mono">
                    {article.category}
                  </span>
                  <h3 className="text-black text-sm md:text-base font-black leading-tight tracking-tight uppercase mt-1 mb-1 group-hover:underline decoration-1 underline-offset-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-xs font-mono">
                    {article.date} — {article.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
