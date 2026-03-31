import { defineConfig } from "drizzle-kit";
import path from "path";

const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

if (!connectionUrl) {
  throw new Error("MYSQL_URL or DATABASE_URL must be set, ensure the database is provisioned");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "mysql",
  dbCredentials: {
    url: connectionUrl,
  },
});
