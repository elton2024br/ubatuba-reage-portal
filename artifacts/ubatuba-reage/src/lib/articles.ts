export interface ArticleData {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  lead: string;
  author: string;
  authorImage: string;
  authorBio: string;
  date: string;
  dateISO: string;
  readingTime: string;
  imageUrl: string;
  imageCaption: string;
  body: string[];
  series?: string;
}

export interface ArticleSummary {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  lead: string;
  date: string;
  dateISO: string;
  author: string;
  imageUrl: string;
  readingTime: string;
  series?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "denuncia-ma-gestao": "#E53E3E",
  "saude-precaria": "#DD6B20",
  "tecnologia": "#805AD5",
  "america-latina": "#2B6CB0",
  "seguranca": "#C53030",
  "custo-de-vida": "#D69E2E",
  "saneamento": "#38A169",
  "educacao": "#3182CE",
  "abandono-publico": "#718096",
  "identidade-caicara": "#319795",
  "meio-ambiente": "#48BB78",
  "cultura": "#9F7AEA",
};

export function getCategoryColor(categorySlug: string): string {
  return CATEGORY_COLORS[categorySlug] || "#4B59F7";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

function dbToArticleData(row: any): ArticleData {
  const dateISO = row.publishedAt
    ? new Date(row.publishedAt).toISOString().split("T")[0]
    : new Date(row.createdAt).toISOString().split("T")[0];
  return {
    slug: row.slug,
    category: row.category,
    categorySlug: row.categorySlug,
    title: row.title,
    lead: row.lead,
    author: row.author,
    authorImage: row.authorImage || "",
    authorBio: row.authorBio || "",
    date: formatDate(dateISO),
    dateISO,
    readingTime: row.readingTime || "",
    imageUrl: row.imageUrl || "",
    imageCaption: row.imageCaption || "",
    body: Array.isArray(row.body) ? row.body : [row.body],
    series: row.series || undefined,
  };
}

function dbToSummary(row: any): ArticleSummary {
  const dateISO = row.publishedAt
    ? new Date(row.publishedAt).toISOString().split("T")[0]
    : new Date(row.createdAt).toISOString().split("T")[0];
  return {
    slug: row.slug,
    category: row.category,
    categorySlug: row.categorySlug,
    title: row.title,
    lead: row.lead,
    date: formatDate(dateISO),
    dateISO,
    author: row.author,
    imageUrl: row.imageUrl || "",
    readingTime: row.readingTime || "",
    series: row.series || undefined,
  };
}

export async function getAllArticles(): Promise<ArticleSummary[]> {
  try {
    const res = await fetch(`${API_URL}/api/articles`, { next: { revalidate: 30 } });
    if (!res.ok) throw new Error("API error");
    const rows = await res.json();
    return rows.map(dbToSummary).sort((a: ArticleSummary, b: ArticleSummary) => b.dateISO.localeCompare(a.dateISO));
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleData | undefined> {
  try {
    const res = await fetch(`${API_URL}/api/articles/${slug}`, { next: { revalidate: 30 } });
    if (!res.ok) return undefined;
    const row = await res.json();
    return dbToArticleData(row);
  } catch {
    return undefined;
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<ArticleSummary[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.categorySlug === categorySlug);
}

export async function getAllCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const all = await getAllArticles();
  const catMap = new Map<string, { name: string; slug: string; count: number }>();
  for (const a of all) {
    const existing = catMap.get(a.categorySlug);
    if (existing) {
      existing.count++;
    } else {
      catMap.set(a.categorySlug, { name: a.category, slug: a.categorySlug, count: 1 });
    }
  }
  return Array.from(catMap.values()).sort((a, b) => b.count - a.count);
}

export async function getAllSlugs(): Promise<string[]> {
  const all = await getAllArticles();
  return all.map((a) => a.slug);
}
