"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

export function NewsletterCTA() {
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

  return (
    <div
      ref={ref}
      className="bg-[#111111] px-6 py-8 my-1"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="max-w-md mx-auto text-center">
        <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white/40 mb-2">
          Newsletter
        </p>
        <h3 className="text-white text-xl font-black uppercase tracking-tight leading-tight mb-3">
          Receba as denúncias que ninguém mais publica
        </h3>
        <p className="text-white/60 text-sm font-serif italic mb-5">
          As principais reportagens do Ubatuba Reage direto na sua caixa de entrada. Sem spam, sem filtro.
        </p>
        <Link
          href="/newsletter"
          className="inline-block bg-[#4B59F7] text-white hover:bg-[#3d4ad4] transition-colors px-8 py-3 text-xs font-black uppercase tracking-[0.15em] font-mono"
        >
          Assinar Agora
        </Link>
      </div>
    </div>
  );
}
