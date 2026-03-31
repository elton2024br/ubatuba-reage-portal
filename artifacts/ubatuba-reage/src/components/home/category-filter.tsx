"use client";

import React, { useState } from "react";

const CATEGORIES = [
  "Todas",
  "Denuncias",
  "Ma Gestao",
  "Saude",
  "Meio Ambiente",
  "Seguranca",
  "Custo de Vida",
  "Educacao",
  "Identidade Ubatuba",
];

interface CategoryFilterProps {
  onFilterChange?: (category: string) => void;
}

export function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [active, setActive] = useState("Todas");

  function handleClick(cat: string) {
    setActive(cat);
    onFilterChange?.(cat);
  }

  return (
    <div className="bg-white border-b border-black/10 sticky top-[40px] lg:top-[40px] z-30">
      <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide px-4 md:px-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`
              flex-shrink-0 px-4 py-3 text-[11px] font-black uppercase tracking-[0.12em] font-mono
              border-b-2 transition-colors duration-150 whitespace-nowrap
              ${
                active === cat
                  ? "border-[#4B59F7] text-[#4B59F7]"
                  : "border-transparent text-gray-500 hover:text-black hover:border-black/30"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
