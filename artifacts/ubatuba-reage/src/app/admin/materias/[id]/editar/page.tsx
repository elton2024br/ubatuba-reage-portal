"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "Denúncia: Má Gestão",
  "Saúde Precária",
  "Saneamento",
  "Educação",
  "Segurança",
  "Custo de Vida",
  "Abandono Público",
  "Identidade Caiçara",
  "Tecnologia",
  "América Latina",
  "Meio Ambiente",
  "Cultura",
];

export default function EditarMateria({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    lead: "",
    body: "",
    author: "",
    authorImage: "",
    authorBio: "",
    category: CATEGORIES[0],
    series: "",
    imageUrl: "",
    imageCaption: "",
    readingTime: "",
    status: "draft",
  });

  useEffect(() => {
    fetch("/api/admin/articles", { credentials: "include" })
      .then((res) => res.json())
      .then((articles: any[]) => {
        const article = articles.find((a) => a.id === parseInt(id));
        if (article) {
          setForm({
            title: article.title || "",
            lead: article.lead || "",
            body: Array.isArray(article.body) ? article.body.join("\n\n") : article.body || "",
            author: article.author || "",
            authorImage: article.authorImage || "",
            authorBio: article.authorBio || "",
            category: article.category || CATEGORIES[0],
            series: article.series || "",
            imageUrl: article.imageUrl || "",
            imageCaption: article.imageCaption || "",
            readingTime: article.readingTime || "",
            status: article.status || "draft",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const bodyParagraphs = form.body.split("\n\n").filter(Boolean);
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          body: bodyParagraphs,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }

      router.push("/admin/materias");
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-400">Carregando...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-6">Editar Matéria</h1>

      {error && (
        <div className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Título *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Lead / Subtítulo *</label>
          <textarea
            name="lead"
            value={form.lead}
            onChange={handleChange}
            required
            rows={2}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Categoria *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Série editorial</label>
            <input
              name="series"
              value={form.series}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Autor *</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Tempo de leitura</label>
            <input
              name="readingTime"
              value={form.readingTime}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Bio do autor</label>
          <input
            name="authorBio"
            value={form.authorBio}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">URL da imagem</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Legenda da imagem</label>
            <input
              name="imageCaption"
              value={form.imageCaption}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Corpo da matéria * <span className="text-gray-500 font-normal">(separe parágrafos com linha em branco)</span>
          </label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            required
            rows={15}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/materias")}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
