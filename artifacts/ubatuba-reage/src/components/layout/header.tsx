"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { InterceptLogo, MenuIcon, CloseIcon } from "@/components/icons";
import { SocialBar } from "@/components/layout/social-bar";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_TAGLINE } from "@/lib/site-config";

const MAIN_LINKS = [
  { label: "Notícias", href: "/" },
  { label: "Editorias", href: "/editorias" },
  { label: "Denúncias", href: "/denuncias" },
  { label: "Busca", href: "/busca" },
  { label: "Apoie", href: "/apoie" },
];

const SECONDARY_LINKS = [
  { label: "Sobre o Movimento", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileHeaderVisible, setMobileHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY < 100) {
          setMobileHeaderVisible(true);
        } else if (currentScrollY > lastScrollY.current + 10) {
          setMobileHeaderVisible(false);
        } else if (currentScrollY < lastScrollY.current - 10) {
          setMobileHeaderVisible(true);
        }
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="hidden lg:flex fixed top-0 left-0 bottom-0 w-[260px] bg-[#111111] border-r border-white/5 flex-col items-start z-50 overflow-y-auto">
        <div className="flex items-center gap-4 px-6 py-5 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:opacity-70 transition-opacity"
            aria-label="Menu"
          >
            <MenuIcon className="w-7 h-7 text-white" />
          </button>
          <Link href="/" className="flex-shrink-0">
            <InterceptLogo className="w-[140px] h-auto" fill="white" />
          </Link>
        </div>
        <div className="flex-1" />
      </header>

      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out"
        style={{ transform: mobileHeaderVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="w-full bg-[#111111] border-b border-white/5">
          <div className="flex items-center justify-between px-4 h-[56px]">
            <Link href="/" className="flex-shrink-0 flex flex-col">
              <InterceptLogo className="text-[20px] whitespace-nowrap leading-none" fill="white" />
              <span className="text-white/40 text-[9px] font-mono uppercase tracking-[0.15em] mt-0.5">{SITE_TAGLINE}</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:opacity-70 transition-opacity"
              aria-label="Menu"
            >
              <MenuIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <SocialBar compact />
        </div>
      </header>

      <div className="lg:hidden h-[80px]" />

      <div className="hidden lg:block fixed top-0 left-[260px] right-0 z-40 bg-[#111111]">
        <SocialBar />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#111111] z-[60] flex flex-col lg:left-[260px]"
          >
            <div className="flex items-center justify-between px-6 py-5 lg:hidden">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 transition-opacity"
                aria-label="Fechar menu"
              >
                <CloseIcon className="w-7 h-7 text-white" />
              </button>
              <Link href="/" onClick={() => setIsOpen(false)}>
                <InterceptLogo className="w-[140px] h-auto" fill="white" />
              </Link>
              <div className="w-7" />
            </div>

            <div className="hidden lg:flex items-center justify-end px-6 py-5">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:opacity-70 transition-opacity p-2 bg-white/5 rounded-full"
                aria-label="Fechar menu"
              >
                <CloseIcon className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row w-full max-w-6xl mx-auto px-6 py-10 md:py-20 gap-16 md:gap-24 overflow-y-auto">
              <nav className="flex-1 flex flex-col items-start gap-6 md:gap-8">
                {MAIN_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white hover:text-[#6653FF] transition-colors font-sans"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              <div className="w-px bg-white/10 hidden md:block"></div>
              <hr className="border-white/10 md:hidden" />

              <nav className="flex-1 flex flex-col items-start gap-4 md:gap-6 justify-center">
                {SECONDARY_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg md:text-xl font-bold text-white/70 hover:text-white transition-colors font-sans uppercase tracking-[0.05em]"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="px-6 py-8 flex justify-center border-t border-white/5 bg-[#111111]">
              <Link
                href="/apoie"
                onClick={() => setIsOpen(false)}
                className="bg-[#6653FF] text-white px-10 py-4 font-bold uppercase tracking-[0.15em] text-sm md:text-base font-mono hover:bg-[#5241e0] transition-colors shadow-lg"
              >
                Apoie Ubatuba Reage
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
