import { mysqlTable, int, text, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const denunciasTable = mysqlTable("denuncias", {
  id: int("id").autoincrement().primaryKey(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  categoria: varchar("categoria", { length: 255 }).default("Não informada"),
  localizacao: varchar("localizacao", { length: 500 }),
  contato: varchar("contato", { length: 500 }),
  anonimo: boolean("anonimo").default(false),
  status: varchar("status", { length: 20 }).notNull().default("pendente"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDenunciaSchema = createInsertSchema(denunciasTable).omit({ id: true, createdAt: true });
export type InsertDenuncia = z.infer<typeof insertDenunciaSchema>;
export type Denuncia = typeof denunciasTable.$inferSelect;
