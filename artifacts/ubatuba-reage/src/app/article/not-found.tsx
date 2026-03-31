import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="text-center max-w-md px-6">
        <h1 className="text-6xl font-black text-black mb-4">404</h1>
        <p className="text-gray-600 text-lg font-serif italic mb-8">
          Materia nao encontrada
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#4B59F7] text-white px-6 py-3 text-xs font-black uppercase tracking-[0.15em] font-mono hover:bg-[#3d4ad4] transition-colors"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
