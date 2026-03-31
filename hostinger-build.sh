#!/bin/bash
# Hostinger Build Script - Ubatuba Reage Portal
# Use as build command on Hostinger: bash hostinger-build.sh

set -e

echo "=== Ubatuba Reage - Hostinger Build ==="

echo "[1/3] Instalando dependencias..."
pnpm install --frozen-lockfile || pnpm install

echo "[2/3] Executando build de producao..."
npx pnpm run build:prod

echo "[3/3] Executando migracoes do banco de dados..."
npx pnpm --filter @workspace/db run db:push || echo "AVISO: Migracao falhou. Verifique a variavel MYSQL_URL."

echo "=== Build concluido com sucesso! ==="
