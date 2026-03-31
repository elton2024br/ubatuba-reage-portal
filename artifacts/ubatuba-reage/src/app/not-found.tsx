import Link from "next/link";
import { InterceptLogo } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center px-5 text-center">
      <Link href="/" className="mb-12">
        <InterceptLogo className="text-2xl" fill="white" />
      </Link>

      <div className="mb-8">
        <span className="text-[#4B59F7] text-[120px] md:text-[180px] font-black leading-none font-mono tracking-tighter block">
          404
        </span>
      </div>

      <h1 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 max-w-xl">
        Esta página não existe.{" "}
        <span className="text-white/40">O problema, sim.</span>
      </h1>

      <p className="text-white/50 text-base font-serif italic leading-relaxed max-w-md mb-10">
        A página que você buscou não foi encontrada. Mas os problemas de
        Ubatuba estão todos documentados. Volte para a página inicial e continue
        fiscalizando.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="bg-[#4B59F7] text-white px-8 py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:bg-[#3d4ad4] transition-colors"
        >
          Página Inicial
        </Link>
        <Link
          href="/denuncias"
          className="border border-white/20 text-white px-8 py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:border-white/50 transition-colors"
        >
          Fazer Denúncia
        </Link>
        <Link
          href="/editorias"
          className="border border-white/20 text-white px-8 py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:border-white/50 transition-colors"
        >
          Editorias
        </Link>
      </div>

      <div className="mt-16 text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">
        Ubatuba Reage — A Voz que Não se Cala
      </div>
    </div>
  );
}
