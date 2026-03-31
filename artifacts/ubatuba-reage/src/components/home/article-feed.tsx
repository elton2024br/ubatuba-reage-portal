"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategoryColor } from "@/lib/articles";

interface ArticleRowProps {
  slug: string;
  category: string;
  categorySlug?: string;
  title: string;
  lead: string;
  date: string;
  author: string;
  imageUrl: string;
  readingTime?: string;
  series?: string;
}

export function ArticleRow({
  slug,
  category,
  categorySlug,
  title,
  lead,
  date,
  author,
  imageUrl,
  readingTime,
  series,
}: ArticleRowProps) {
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
      { threshold: 0.1, rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const catColor = categorySlug ? getCategoryColor(categorySlug) : "#4B59F7";

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }}
    >
      <Link
        href={`/article/${slug}`}
        className="group flex flex-col lg:flex-row items-stretch gap-0 bg-white hover:bg-gray-50 border-b border-black/10 transition-colors"
      >
        <div className="relative flex-shrink-0 w-full lg:w-[337px] aspect-video lg:h-[190px] overflow-hidden bg-gray-200">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 337px"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
        </div>

        <div className="flex flex-col justify-center gap-2 px-4 py-4 lg:py-4 flex-1 min-w-0 lg:border-r border-black/10">
          <div className="flex items-center gap-2 mb-1">
            {series && (
              <span className="text-white text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5 bg-[#FF4444]">
                {series}
              </span>
            )}
            <span
              className="text-white text-[9px] font-black uppercase tracking-[0.1em] px-2 py-0.5"
              style={{ backgroundColor: catColor }}
            >
              {category}
            </span>
          </div>
          <h3 className="text-black text-[22px] md:text-[26px] font-bold leading-[1.1] tracking-tight group-hover:underline decoration-1 underline-offset-4">
            {title}
          </h3>
          <p className="text-gray-500 text-sm font-serif italic leading-relaxed line-clamp-2 lg:hidden mt-1">
            {lead}
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-mono uppercase tracking-widest mt-2">
            <span>{date}</span>
            {author && (
              <>
                <span className="text-gray-300">—</span>
                <span className="text-[#4B59F7] font-black">{author}</span>
              </>
            )}
            {readingTime && (
              <>
                <span className="text-gray-300">·</span>
                <span>{readingTime}</span>
              </>
            )}
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-center px-6 py-4 w-[260px] flex-shrink-0">
          <p className="text-gray-500 text-sm font-serif italic leading-relaxed">
            {lead}
          </p>
          <span className="mt-3 text-[#4B59F7] text-[10px] font-black uppercase tracking-[0.15em] font-mono flex items-center gap-1">
            Ver mais &rarr;
          </span>
        </div>
      </Link>
    </div>
  );
}

export function LoadMoreButton({ href = "/materias" }: { href?: string }) {
  return (
    <div className="flex justify-center py-8 bg-[#f0f0f0]">
      <Link
        href={href}
        className="border border-black text-black hover:bg-black hover:text-white transition-colors px-10 py-3 text-xs font-black uppercase tracking-[0.2em] font-mono flex items-center gap-2"
      >
        Acesse Mais Matérias
        <span className="text-base leading-none">&rsaquo;</span>
      </Link>
    </div>
  );
}
