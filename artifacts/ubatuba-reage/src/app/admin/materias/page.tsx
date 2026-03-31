"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  status: string;
  publishedAt: string | null;
  updatedAt: string;
}

export default function AdminMaterias() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = () => {
    fetch("/api/admin/articles", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchArticles(); }, []);

  const togglePublish = async (id: number) => {
    await fetch(`/api/admin/articles/${id}/publish`, { method: "PATCH", credentials: "include" });
    fetchArticles();
  };

  const deleteArticle = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta matéria?")) return;
    await fetch(`/api/admin/articles/${id}`, { method: "DELETE", credentials: "include" });
    fetchArticles();
  };

  const formatDate = (d: string | null) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  };

  if (loading) return <div className="text-gray-400">Carregando...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Matérias</h1>
        <Link
          href="/admin/materias/nova"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + Nova Matéria
        </Link>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 text-xs font-medium uppercase p-4">Título</th>
              <th className="text-left text-gray-400 text-xs font-medium uppercase p-4">Categoria</th>
              <th className="text-left text-gray-400 text-xs font-medium uppercase p-4">Autor</th>
              <th className="text-left text-gray-400 text-xs font-medium uppercase p-4">Status</th>
              <th className="text-left text-gray-400 text-xs font-medium uppercase p-4">Data</th>
              <th className="text-right text-gray-400 text-xs font-medium uppercase p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="p-4">
                  <p className="text-white text-sm font-medium truncate max-w-xs">{article.title}</p>
                  <p className="text-gray-500 text-xs">/{article.slug}</p>
                </td>
                <td className="p-4 text-gray-300 text-sm">{article.category}</td>
                <td className="p-4 text-gray-300 text-sm">{article.author}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      article.status === "published"
                        ? "bg-green-900/50 text-green-400"
                        : "bg-yellow-900/50 text-yellow-400"
                    }`}
                  >
                    {article.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="p-4 text-gray-400 text-sm">{formatDate(article.publishedAt || article.updatedAt)}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/materias/${article.id}/editar`}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => togglePublish(article.id)}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {article.status === "published" ? "Despublicar" : "Publicar"}
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div className="p-8 text-center text-gray-500">Nenhuma matéria encontrada.</div>
        )}
      </div>
    </div>
  );
}
