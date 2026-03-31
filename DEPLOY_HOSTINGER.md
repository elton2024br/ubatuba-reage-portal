# Guia Completo: Deploy do Ubatuba Reage na Hostinger

## Pre-requisitos

- Conta na Hostinger com plano **Business** ou superior (Node.js + MySQL)
- Repositorio no GitHub: `https://github.com/elton2024br/ubatuba-reage-portal`

---

## PASSO 1: Criar o Banco de Dados MySQL

1. Acesse o **hPanel** da Hostinger: https://hpanel.hostinger.com
2. Clique no seu site/dominio
3. No menu lateral, va em **Databases** > **MySQL Databases**
4. Preencha:
   - **Nome do banco:** `ubatuba_reage`
   - **Usuario:** escolha um nome (ex: `ubatuba_admin`)
   - **Senha:** clique em "Gerar" para criar uma senha forte
5. Clique em **Criar**
6. **ANOTE** os dados que aparecerao:
   - Nome do banco: `u123456789_ubatuba_reage` (a Hostinger adiciona um prefixo)
   - Usuario: `u123456789_ubatuba_admin`
   - Senha: a que voce gerou
   - Host: `localhost` (na Hostinger, o MySQL roda no mesmo servidor)

---

## PASSO 2: Configurar o Node.js

1. No hPanel, va em **Avancado** > **Node.js**
2. Clique em **Criar aplicacao Node.js**
3. Configure:
   - **Versao do Node.js:** `20` (ou a mais recente disponivel)
   - **Diretorio da aplicacao:** deixe como `/` ou o diretorio raiz do seu site
   - **Startup file (arquivo de inicio):** `start.mjs`
4. Clique em **Criar**

---

## PASSO 3: Conectar o Repositorio GitHub

1. Na pagina do Node.js (onde voce acabou de criar), procure a secao **Git**
2. Clique em **Conectar repositorio GitHub**
3. Se pedido, autorize o acesso da Hostinger ao seu GitHub
4. Selecione o repositorio: `elton2024br/ubatuba-reage-portal`
5. Branch: `main`
6. Marque a opcao **Deploy automatico** (para atualizar a cada push)
7. Clique em **Conectar**

---

## PASSO 4: Configurar Variaveis de Ambiente

1. Na pagina do Node.js, procure a secao **Variaveis de Ambiente** (Environment Variables)
2. Adicione cada variavel clicando em **Adicionar variavel**:

| Variavel | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `MYSQL_URL` | `mysql://u123456789_ubatuba_admin:SUA_SENHA@localhost:3306/u123456789_ubatuba_reage` |
| `PORT` | `3000` |
| `API_PORT` | `8080` |
| `ADMIN_EMAIL` | `admin@ubatubareage.com.br` (ou seu email) |
| `ADMIN_PASSWORD` | Uma senha forte para o admin (ex: `Ubatuba@2025!Forte`) |
| `NEXT_PUBLIC_SITE_URL` | `https://seudominio.com.br` (o dominio do seu site) |

**IMPORTANTE:** Na variavel `MYSQL_URL`:
- Substitua `u123456789_ubatuba_admin` pelo usuario que voce criou no Passo 1
- Substitua `SUA_SENHA` pela senha que voce gerou
- Substitua `u123456789_ubatuba_reage` pelo nome do banco (com o prefixo da Hostinger)
- O host e `localhost` (o MySQL da Hostinger roda no mesmo servidor)

3. Clique em **Salvar**

---

## PASSO 5: Executar o Build

1. Na pagina do Node.js, procure o **Terminal** ou **Console SSH**
2. Voce tambem pode acessar via **Avancado** > **Terminal SSH** no hPanel
3. Navegue ate o diretorio do projeto:
   ```bash
   cd ~/domains/seudominio.com.br/public_html
   ```
   (ou o diretorio onde o repositorio foi clonado)

4. Execute o script de build:
   ```bash
   bash hostinger-build.sh
   ```

   Este script automaticamente:
   - Habilita o pnpm (que a Hostinger nao suporta nativamente)
   - Instala todas as dependencias
   - Compila o frontend e o backend
   - Cria as tabelas no banco de dados MySQL

5. Aguarde o processo terminar (pode levar 2-5 minutos)

---

## PASSO 6: Iniciar a Aplicacao

1. Volte para a pagina do **Node.js** no hPanel
2. Clique em **Reiniciar** (ou Start) para iniciar a aplicacao
3. O arquivo `start.mjs` vai iniciar dois processos:
   - API Express na porta 8080 (interno)
   - Next.js na porta 3000 (frontend)

---

## PASSO 7: Configurar o Dominio (se necessario)

Se voce ja tem um dominio configurado na Hostinger:
1. Va em **Dominios** > seu dominio
2. Certifique-se que o DNS esta apontando para a Hostinger
3. Va em **SSL** > instale o certificado SSL gratuito (Let's Encrypt)
4. Ative o **Force HTTPS**

---

## PASSO 8: Testar

1. Acesse seu site: `https://seudominio.com.br`
   - Voce deve ver a homepage do Ubatuba Reage
2. Acesse o admin: `https://seudominio.com.br/admin`
   - Faca login com o email e senha que voce configurou nas variaveis de ambiente
3. Teste o formulario de denuncia: `https://seudominio.com.br/denuncias`
4. Teste o formulario de contato: `https://seudominio.com.br/contato`

---

## Solucao de Problemas

### O site nao carrega
- Verifique se a aplicacao Node.js esta rodando (status "Running" no hPanel)
- Verifique os logs no terminal SSH: os erros aparecem no console
- Confirme que a porta `PORT` esta configurada corretamente

### Erro de conexao com o banco de dados
- Verifique a variavel `MYSQL_URL` — o formato deve ser exatamente:
  `mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO`
- Certifique-se de que o usuario tem permissao no banco criado
- A senha nao pode ter caracteres especiais que quebrem a URL (como `@` ou `#`)
  - Se sua senha tiver esses caracteres, troque por outra

### O admin nao funciona (login falha)
- Verifique se as variaveis `ADMIN_EMAIL` e `ADMIN_PASSWORD` estao configuradas
- Execute novamente as migracoes:
  ```bash
  cd ~/domains/seudominio.com.br/public_html
  corepack enable && corepack prepare pnpm@latest --activate
  pnpm --filter @workspace/db run db:push
  ```

### Erro "pnpm not found"
- Execute manualmente:
  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```
- Depois execute `bash hostinger-build.sh` novamente

### Deploy automatico nao funciona
- Verifique se o GitHub esta conectado na secao Git do Node.js
- Certifique-se de que a opcao "Auto deploy" esta ativada
- Apos cada deploy automatico, pode ser necessario reiniciar a aplicacao no hPanel

---

## Atualizacoes Futuras

Apos o setup inicial, para atualizar o site:

**Opcao 1: Deploy automatico (recomendado)**
- Basta fazer push no GitHub (`main` branch)
- A Hostinger detecta e faz o deploy automaticamente

**Opcao 2: Deploy manual**
1. Acesse o terminal SSH
2. Navegue ate o diretorio do projeto
3. Execute:
   ```bash
   git pull origin main
   bash hostinger-build.sh
   ```
4. Reinicie a aplicacao no hPanel

---

## Resumo das Configuracoes

| Item | Valor |
|---|---|
| **Repositorio** | `elton2024br/ubatuba-reage-portal` |
| **Branch** | `main` |
| **Node.js Version** | `20+` |
| **Startup file** | `start.mjs` |
| **Build command** | `bash hostinger-build.sh` |
| **Porta frontend** | `3000` (variavel `PORT`) |
| **Porta API** | `8080` (variavel `API_PORT`) |
| **Banco de dados** | MySQL/MariaDB (variavel `MYSQL_URL`) |
