import React from "react";
import Link from "next/link";
import { ChevronRight } from "@/components/icons";

export function DonationBanner() {
  return (
    <div className="w-full bg-[#4B59F7] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
        }}
      />
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-10 py-6 md:py-3 text-center md:text-left">
        <p className="text-white text-[16px] md:text-xs font-black uppercase tracking-[0.05em] md:tracking-[0.15em] font-mono leading-[1.2] max-w-[280px] md:max-w-none">
          Não se cale. Não aceite o descaso. Reaja com a gente.
        </p>
        <Link
          href="/apoie"
          className="flex items-center gap-1.5 bg-white text-[#4B59F7] hover:bg-gray-100 transition-colors px-8 md:px-4 py-3 md:py-2 text-[13px] md:text-xs font-black uppercase tracking-[0.15em] font-mono whitespace-nowrap flex-shrink-0 shadow-xl md:shadow-none"
        >
          Junte-se a Nós
          <ChevronRight className="w-4 h-4 md:w-3.5 md:h-3.5" />
        </Link>
      </div>
    </div>
  );
}
