import React from "react";
import Link from "next/link";
import { InterceptLogo, ChevronRight } from "@/components/icons";
import {
  WhatsAppIcon,
  XIcon,
  InstagramIcon,
  ThreadsIcon,
  FacebookIcon,
  YouTubeIcon,
  TikTokIcon,
} from "@/components/icons";
import { WhatsAppChannelIcon } from "@/components/layout/social-bar";
import { getAllCategories } from "@/lib/articles";

const navLinks = [
  { label: "Matérias", href: "/materias" },
  { label: "Editorias", href: "/editorias" },
  { label: "Denúncias", href: "/denuncias" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

const legalLinks = [
  { label: "Apoie o Movimento", href: "/apoie" },
  { label: "Política de privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

const socials = [
  { icon: WhatsAppIcon, href: "https://wa.me/message/ubatubaReage", label: "WhatsApp" },
  { icon: WhatsAppChannelIcon, href: "https://whatsapp.com/channel/ubatubaReage", label: "Canal WhatsApp" },
  { icon: InstagramIcon, href: "https://instagram.com/ubatubaReage", label: "Instagram" },
  { icon: ThreadsIcon, href: "https://threads.net/@ubatubaReage", label: "Threads" },
  { icon: XIcon, href: "https://x.com/ubatubaReage", label: "X" },
  { icon: FacebookIcon, href: "https://facebook.com/ubatubaReage", label: "Facebook" },
  { icon: YouTubeIcon, href: "https://youtube.com/@ubatubaReage", label: "YouTube" },
  { icon: TikTokIcon, href: "https://tiktok.com/@ubatubaReage", label: "TikTok" },
];

export async function Footer() {
  const categories = await getAllCategories();

  return (
    <footer className="bg-[#e8e8e8]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-8 md:px-10 py-8 border-b border-black/10">
        <Link href="/" className="flex-shrink-0">
          <InterceptLogo className="w-[180px] h-auto" fill="black" />
        </Link>

        <Link
          href="/apoie"
          className="flex items-center gap-2 bg-[#4B59F7] text-white hover:bg-[#3d4ad4] transition-colors px-6 py-3 text-xs font-black uppercase tracking-[0.15em] font-mono"
        >
          Apoie Ubatuba Reage
          <ChevronRight className="w-4 h-4" />
        </Link>

        <div className="flex items-center gap-1 flex-wrap">
          {socials.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center text-black/50 hover:text-black transition-colors"
            >
              <Icon className="w-6 h-6 lg:w-[18px] lg:h-[18px]" />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap gap-0 md:gap-x-8 md:gap-y-4 px-0 md:px-10 py-0 md:py-8 border-b border-black/10">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center justify-between px-8 py-6 border-b md:border-none border-black/10 md:p-0 md:flex-col md:items-start gap-1 group w-full md:w-auto"
          >
            <span className="hidden md:block w-full h-[3px] bg-black group-hover:bg-[#4B59F7] transition-colors" />
            <span className="text-black text-sm font-black uppercase tracking-[0.1em] group-hover:text-[#4B59F7] transition-colors">
              {label}
            </span>
            <ChevronRight className="w-5 h-5 text-black/30 md:hidden" />
          </Link>
        ))}
      </div>

      <div className="px-8 md:px-10 py-6 border-b border-black/10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] font-mono text-black/40 mb-4">Categorias</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="px-3 py-1.5 border border-black/15 text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-black/60 hover:border-[#4B59F7] hover:text-[#4B59F7] transition-colors"
            >
              {cat.name} ({cat.count})
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-8 md:px-10 py-5">
        <p className="text-black/50 text-xs font-mono">
          &copy;{new Date().getFullYear()} Ubatuba Reage. Todos os direitos reservados.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {legalLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-black/50 hover:text-black text-xs font-mono transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
