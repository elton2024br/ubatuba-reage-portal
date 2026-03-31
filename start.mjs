import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || "3000";
const API_PORT = process.env.API_PORT || "8080";

function startProcess(name, command, args, env) {
  const proc = spawn(command, args, {
    cwd: __dirname,
    stdio: "inherit",
    env: { ...process.env, ...env },
  });

  proc.on("error", (err) => {
    console.error(`[${name}] Failed to start:`, err.message);
    process.exit(1);
  });

  proc.on("exit", (code) => {
    console.error(`[${name}] Exited with code ${code}`);
    process.exit(code || 1);
  });

  return proc;
}

console.log(`Starting API server on port ${API_PORT}...`);
const apiProc = startProcess(
  "api",
  "node",
  ["--enable-source-maps", path.join(__dirname, "artifacts/api-server/dist/index.mjs")],
  { PORT: API_PORT, NODE_ENV: "production" },
);

console.log(`Starting Next.js on port ${PORT}...`);
const nextProc = startProcess(
  "next",
  "node",
  [path.join(__dirname, "artifacts/ubatuba-reage/.next/standalone/artifacts/ubatuba-reage/server.js")],
  {
    PORT,
    NODE_ENV: "production",
    HOSTNAME: "0.0.0.0",
    NEXT_PUBLIC_API_URL: `http://localhost:${API_PORT}`,
  },
);

function shutdown() {
  console.log("Shutting down...");
  apiProc.kill("SIGTERM");
  nextProc.kill("SIGTERM");
  setTimeout(() => process.exit(0), 5000);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
