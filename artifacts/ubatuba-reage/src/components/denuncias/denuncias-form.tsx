"use client";

import React, { useState } from "react";

const CATEGORIES = [
  "Abandono e Má Gestão",
  "Saúde Precária",
  "Insegurança e Violência",
  "Custo de Vida e Impostos",
  "Meio Ambiente e Saneamento",
  "Educação e Desvalorização",
  "Outro",
];

type Status = "idle" | "sending" | "success" | "error";

export function DenunciasForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      titulo: data.get("titulo"),
      descricao: data.get("descricao"),
      categoria: data.get("categoria"),
      localizacao: data.get("localizacao"),
      contato: data.get("contato"),
      anonimo: data.get("anonimo") === "on",
    };

    try {
      const res = await fetch("/api/denuncias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setFileName("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#4B59F7] text-white p-8 text-center">
        <p className="text-3xl font-black mb-3">✓</p>
        <h3 className="text-xl font-black uppercase tracking-tight mb-3">
          Denúncia Recebida!
        </h3>
        <p className="text-white/80 font-serif leading-relaxed mb-6">
          Obrigado pelo seu relato. Nossa equipe vai analisar as informações e entrar em contato
          se necessário. Juntos, fazemos Ubatuba reagir.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="border border-white text-white px-6 py-3 text-sm font-black uppercase tracking-widest font-mono hover:bg-white hover:text-[#4B59F7] transition-colors"
        >
          Enviar outra denúncia
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
          Título da denúncia *
        </label>
        <input
          name="titulo"
          type="text"
          required
          placeholder="Ex: Esgoto a céu aberto na Rua das Orquídeas"
          className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black placeholder-gray-400 focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
          Categoria *
        </label>
        <select
          name="categoria"
          required
          className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors appearance-none"
        >
          <option value="">Selecione uma categoria...</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
          Localização (bairro / endereço)
        </label>
        <input
          name="localizacao"
          type="text"
          placeholder="Ex: Centro, Rua Guarani / Praia do Tenório"
          className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black placeholder-gray-400 focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
          Descrição completa *
        </label>
        <textarea
          name="descricao"
          required
          rows={6}
          placeholder="Descreva o problema com o máximo de detalhes: o que aconteceu, desde quando, quem está sendo afetado, o que já foi tentado para resolver..."
          className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black placeholder-gray-400 focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
          Foto ou evidência (opcional)
        </label>
        <div className="relative border border-dashed border-black/20 bg-[#f5f5f5] hover:border-[#4B59F7] transition-colors">
          <input
            name="foto"
            type="file"
            accept="image/*,.pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
          <div className="px-4 py-5 text-center">
            <p className="text-sm font-mono text-gray-500">
              {fileName ? (
                <span className="text-[#4B59F7] font-bold">{fileName}</span>
              ) : (
                <>Clique para selecionar ou arraste um arquivo</>
              )}
            </p>
            <p className="text-[10px] font-mono text-gray-400 mt-1">
              JPG, PNG, PDF — máx. 10MB
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
          Contato (opcional — para acompanhar o caso)
        </label>
        <input
          name="contato"
          type="text"
          placeholder="E-mail ou WhatsApp"
          className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black placeholder-gray-400 focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          name="anonimo"
          type="checkbox"
          className="w-4 h-4 border-2 border-black/30 accent-[#4B59F7]"
        />
        <span className="text-sm font-mono text-gray-600 group-hover:text-black transition-colors">
          Quero manter minha identidade em sigilo
        </span>
      </label>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-mono">
          Erro ao enviar. Tente novamente ou entre em contato via redes sociais.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-[#4B59F7] text-white py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:bg-[#3d4ad4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando..." : "Enviar Denúncia"}
      </button>

      <p className="text-[10px] font-mono text-gray-400 leading-relaxed">
        Ao enviar, você declara que as informações são verídicas. Denúncias falsas ou
        de má-fé serão descartadas. O Ubatuba Reage preserva o sigilo das fontes
        conforme solicitado.
      </p>
    </form>
  );
}
