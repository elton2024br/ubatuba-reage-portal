"use client";

import React, { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const SUBJECTS = [
  "Sugestão de pauta",
  "Informação ou press release",
  "Colaboração / parcerias",
  "Correção ou errata",
  "Voluntariado",
  "Outros assuntos",
];

export function ContatoForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      nome: data.get("nome"),
      email: data.get("email"),
      assunto: data.get("assunto"),
      mensagem: data.get("mensagem"),
    };

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
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
          Mensagem Enviada!
        </h3>
        <p className="text-white/80 font-serif leading-relaxed mb-6">
          Obrigado pelo contato. Nossa equipe vai responder em breve.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="border border-white text-white px-6 py-3 text-sm font-black uppercase tracking-widest font-mono hover:bg-white hover:text-[#4B59F7] transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
            Nome *
          </label>
          <input
            name="nome"
            type="text"
            required
            placeholder="Seu nome"
            className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black placeholder-gray-400 focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
            E-mail *
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black placeholder-gray-400 focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
          Assunto *
        </label>
        <select
          name="assunto"
          required
          className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors appearance-none"
        >
          <option value="">Selecione um assunto...</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-gray-500 font-mono mb-2">
          Mensagem *
        </label>
        <textarea
          name="mensagem"
          required
          rows={5}
          placeholder="Sua mensagem..."
          className="w-full border border-black/20 bg-[#f5f5f5] px-4 py-3 text-sm font-mono text-black placeholder-gray-400 focus:outline-none focus:border-[#4B59F7] focus:bg-white transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-mono">
          Erro ao enviar. Tente novamente.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-[#4B59F7] text-white py-4 font-black uppercase tracking-[0.15em] text-sm font-mono hover:bg-[#3d4ad4] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
      </button>
    </form>
  );
}
