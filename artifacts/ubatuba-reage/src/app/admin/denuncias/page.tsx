"use client";

import { useState, useEffect } from "react";

interface Denuncia {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  localizacao: string | null;
  contato: string | null;
  anonimo: boolean;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  pendente: "Pendente",
  em_analise: "Em análise",
  publicada: "Publicada",
  arquivada: "Arquivada",
};

const STATUS_COLORS: Record<string, string> = {
  pendente: "bg-yellow-900/50 text-yellow-400",
  em_analise: "bg-blue-900/50 text-blue-400",
  publicada: "bg-green-900/50 text-green-400",
  arquivada: "bg-gray-800 text-gray-400",
};

export default function AdminDenuncias() {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  const fetchDenuncias = () => {
    fetch("/api/admin/denuncias", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setDenuncias(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchDenuncias(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/denuncias/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    fetchDenuncias();
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  if (loading) return <div className="text-gray-400">Carregando...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Denúncias Recebidas</h1>

      {denuncias.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center text-gray-500">
          Nenhuma denúncia recebida ainda.
        </div>
      ) : (
        <div className="space-y-4">
          {denuncias.map((d) => (
            <div key={d.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[d.status] || STATUS_COLORS.pendente}`}>
                      {STATUS_LABELS[d.status] || d.status}
                    </span>
                    <span className="text-gray-500 text-xs">{d.categoria}</span>
                    {d.anonimo && <span className="text-gray-600 text-xs">Anônimo</span>}
                  </div>
                  <h3
                    className="text-white font-medium cursor-pointer hover:text-blue-400"
                    onClick={() => setExpanded(expanded === d.id ? null : d.id)}
                  >
                    {d.titulo}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">{formatDate(d.createdAt)}</p>
                </div>
                <select
                  value={d.status}
                  onChange={(e) => updateStatus(d.id, e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-gray-300"
                >
                  <option value="pendente">Pendente</option>
                  <option value="em_analise">Em análise</option>
                  <option value="publicada">Publicada</option>
                  <option value="arquivada">Arquivada</option>
                </select>
              </div>
              {expanded === d.id && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{d.descricao}</p>
                  {d.localizacao && (
                    <p className="text-gray-500 text-sm mt-2">Local: {d.localizacao}</p>
                  )}
                  {d.contato && (
                    <p className="text-gray-500 text-sm mt-1">Contato: {d.contato}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
