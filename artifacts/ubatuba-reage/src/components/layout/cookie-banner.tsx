"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "ubatuba-reage-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#111111] border-t border-white/10 px-4 py-4 md:px-8 md:py-5">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-white/80 text-sm font-sans leading-relaxed flex-1 text-center sm:text-left">
          Este site utiliza cookies para melhorar sua experiencia. Ao continuar navegando, voce concorda com nossa{" "}
          <Link href="/politica-de-privacidade" className="text-[#4B59F7] underline underline-offset-2 hover:text-white transition-colors">
            Política de Privacidade
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-[#4B59F7] text-white px-8 py-2.5 text-xs font-black uppercase tracking-[0.15em] font-mono hover:bg-[#3d4ad4] transition-colors flex-shrink-0"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
