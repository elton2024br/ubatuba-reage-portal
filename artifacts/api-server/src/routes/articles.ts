import { Router, type IRouter, type Request, type Response } from "express";
import { db, articlesTable } from "@workspace/db";
import { eq, desc, and } from "drizzle-orm";
import { requireAdmin } from "../middlewares/authMiddleware";

const router: IRouter = Router();

router.use("/admin/{*path}", requireAdmin);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

router.get("/articles", async (_req: Request, res: Response) => {
  try {
    const articles = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.status, "published"))
      .orderBy(desc(articlesTable.publishedAt));
    res.json(articles);
  } catch (err) {
    console.error("[Erro ao listar artigos]", err);
    res.status(500).json({ error: "Erro ao listar artigos" });
  }
});

router.get("/articles/:slug", async (req: Request, res: Response) => {
  try {
    const [article] = await db
      .select()
      .from(articlesTable)
      .where(and(eq(articlesTable.slug, req.params.slug as string), eq(articlesTable.status, "published")));
    if (!article) {
      res.status(404).json({ error: "Artigo não encontrado" });
      return;
    }
    res.json(article);
  } catch (err) {
    console.error("[Erro ao buscar artigo]", err);
    res.status(500).json({ error: "Erro ao buscar artigo" });
  }
});

router.get("/admin/articles", async (req: Request, res: Response) => {
  try {
    const articles = await db
      .select()
      .from(articlesTable)
      .orderBy(desc(articlesTable.updatedAt));
    res.json(articles);
  } catch (err) {
    console.error("[Erro ao listar artigos admin]", err);
    res.status(500).json({ error: "Erro ao listar artigos" });
  }
});

router.post("/admin/articles", async (req: Request, res: Response) => {
  try {
    const { title, lead, body, author, authorImage, authorBio, category, categorySlug, series, imageUrl, imageCaption, readingTime, status } = req.body;

    if (!title || !lead || !body || !author || !category) {
      res.status(400).json({ error: "Campos obrigatórios: title, lead, body, author, category" });
      return;
    }

    const slug = slugify(title);
    const finalCategorySlug = categorySlug || slugify(category);
    const finalStatus = status || "draft";
    if (!["draft", "published"].includes(finalStatus)) {
      res.status(400).json({ error: "Status inválido. Valores aceitos: draft, published" });
      return;
    }

    await db.insert(articlesTable).values({
      slug,
      title,
      lead,
      body: Array.isArray(body) ? body : [body],
      author,
      authorImage: authorImage || null,
      authorBio: authorBio || null,
      category,
      categorySlug: finalCategorySlug,
      series: series || null,
      imageUrl: imageUrl || null,
      imageCaption: imageCaption || null,
      readingTime: readingTime || null,
      status: finalStatus,
      publishedAt: finalStatus === "published" ? new Date() : null,
    });

    const [article] = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.slug, slug));

    res.status(201).json(article);
  } catch (err) {
    console.error("[Erro ao criar artigo]", err);
    res.status(500).json({ error: "Erro ao criar artigo" });
  }
});

router.put("/admin/articles/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { title, lead, body, author, authorImage, authorBio, category, categorySlug, series, imageUrl, imageCaption, readingTime, status } = req.body;

    const updates: Record<string, unknown> = {};
    if (title !== undefined) {
      updates.title = title;
      updates.slug = slugify(title);
    }
    if (lead !== undefined) updates.lead = lead;
    if (body !== undefined) updates.body = Array.isArray(body) ? body : [body];
    if (author !== undefined) updates.author = author;
    if (authorImage !== undefined) updates.authorImage = authorImage;
    if (authorBio !== undefined) updates.authorBio = authorBio;
    if (category !== undefined) {
      updates.category = category;
      updates.categorySlug = categorySlug || slugify(category);
    }
    if (series !== undefined) updates.series = series;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (imageCaption !== undefined) updates.imageCaption = imageCaption;
    if (readingTime !== undefined) updates.readingTime = readingTime;
    if (status !== undefined) {
      if (!["draft", "published"].includes(status)) {
        res.status(400).json({ error: "Status inválido. Valores aceitos: draft, published" });
        return;
      }
      updates.status = status;
      if (status === "published") {
        updates.publishedAt = new Date();
      }
    }

    await db
      .update(articlesTable)
      .set(updates)
      .where(eq(articlesTable.id, id));

    const [article] = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.id, id));

    if (!article) {
      res.status(404).json({ error: "Artigo não encontrado" });
      return;
    }
    res.json(article);
  } catch (err) {
    console.error("[Erro ao atualizar artigo]", err);
    res.status(500).json({ error: "Erro ao atualizar artigo" });
  }
});

router.delete("/admin/articles/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const [existing] = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.id, id));

    if (!existing) {
      res.status(404).json({ error: "Artigo não encontrado" });
      return;
    }

    await db
      .delete(articlesTable)
      .where(eq(articlesTable.id, id));

    res.json({ ok: true });
  } catch (err) {
    console.error("[Erro ao deletar artigo]", err);
    res.status(500).json({ error: "Erro ao deletar artigo" });
  }
});

router.patch("/admin/articles/:id/publish", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const [current] = await db.select().from(articlesTable).where(eq(articlesTable.id, id));
    if (!current) {
      res.status(404).json({ error: "Artigo não encontrado" });
      return;
    }

    const newStatus = current.status === "published" ? "draft" : "published";
    await db
      .update(articlesTable)
      .set({
        status: newStatus,
        publishedAt: newStatus === "published" ? new Date() : current.publishedAt,
      })
      .where(eq(articlesTable.id, id));

    const [article] = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.id, id));

    res.json(article);
  } catch (err) {
    console.error("[Erro ao alterar status]", err);
    res.status(500).json({ error: "Erro ao alterar status" });
  }
});

export default router;
