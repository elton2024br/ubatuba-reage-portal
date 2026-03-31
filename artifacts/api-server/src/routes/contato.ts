import { Router, type IRouter } from "express";
import { db, contatosTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/contato", async (req, res) => {
  try {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
      res.status(400).json({ error: "Nome, email e mensagem sao obrigatorios" });
      return;
    }

    const result = await db.insert(contatosTable).values({
      nome,
      email,
      assunto: assunto ?? "Não informado",
      mensagem,
    }).$returningId();

    const insertedId = result[0].id;
    console.log("[Contato recebido]", insertedId, nome);

    res.status(201).json({ ok: true, id: insertedId.toString() });
  } catch (err) {
    console.error("[Erro ao processar contato]", err);
    res.status(500).json({ error: "Erro interno ao processar o contato" });
  }
});

export default router;
