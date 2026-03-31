"use client";

import { useState, useEffect } from "react";

interface Contato {
  id: number;
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  lido: boolean;
  createdAt: string;
}

export default function AdminContatos() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const fetchContatos = () => {
    fetch("/api/admin/contatos", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setContatos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchContatos(); }, []);

  const markRead = async (id: number) => {
    await fetch(`/api/admin/contatos/${id}`, {
      method: "PATCH",
      credentials: "include",
    });
    fetchContatos();
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  if (loading) return <div className="text-gray-400">Carregando...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Contatos Recebidos</h1>

      {contatos.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-500">
          Nenhuma mensagem de contato recebida ainda.
        </div>
      ) : (
        <div className="space-y-4">
          {contatos.map((c) => (
            <div key={c.id} className={`bg-gray-900 border rounded-xl p-5 ${c.lido ? 'border-gray-800' : 'border-blue-800/50'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    {!c.lido && (
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                    )}
                    <span className="text-white font-medium">{c.nome}</span>
                    <span className="text-gray-500 text-sm">{c.email}</span>
                  </div>
                  <h3
                    className="text-gray-300 text-sm cursor-pointer hover:text-white"
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  >
                    {c.assunto}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">{formatDate(c.createdAt)}</p>
                </div>
                {!c.lido && (
                  <button
                    onClick={() => markRead(c.id)}
                    className="text-sm text-blue-400 hover:text-blue-300 whitespace-nowrap"
                  >
                    Marcar como lido
                  </button>
                )}
              </div>
              {expanded === c.id && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{c.mensagem}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
