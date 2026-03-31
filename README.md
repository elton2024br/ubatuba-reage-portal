<p align="center">
  <strong style="font-size: 2em;">Ubatuba <span style="color: #ef4444;">Reage</span></strong>
</p>

<h3 align="center">Portal de jornalismo civico independente de Ubatuba</h3>

<p align="center">
  A voz que nao se cala. A forca que transforma.<br/>
  Fiscalizacao popular, denuncia cidada e informacao que o poder nao quer que voce leia.
</p>

<p align="center">
  <a href="#sobre">Sobre</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#arquitetura">Arquitetura</a> •
  <a href="#instalacao">Instalacao</a> •
  <a href="#uso">Uso</a> •
  <a href="#api">API</a> •
  <a href="#contribuindo">Contribuindo</a>
</p>

---

## Sobre

**Ubatuba Reage** e um portal de jornalismo civico independente focado em investigacao, fiscalizacao do poder publico e defesa dos direitos da populacao de Ubatuba, litoral norte de Sao Paulo.

O projeto nasceu da necessidade de um veiculo de comunicacao local que nao dependa de publicidade governamental e que tenha compromisso exclusivo com a verdade e o interesse publico. Inspirado em veiculos de jornalismo investigativo como o *The Intercept*, o Ubatuba Reage busca transformar indignacao em acao coletiva.

### Pilares

- **Fiscalizacao** — Investigar e expor a ma gestao publica
- **Denuncia cidada** — Dar voz a quem nao tem espaco na midia tradicional
- **Mobilizacao social** — Catalisar a acao coletiva para mudanca real

### Editorias

| Editoria | Descricao |
|---|---|
| **O Povo Fiscaliza** | Reportagens investigativas sobre gestao publica, orcamento e licitacoes |
| **Saude em Colapso** | Cobertura da crise na saude publica municipal |
| **Brasil e Mundo** | Analises sobre politica nacional e internacional com impacto local |
| **Vozes de Ubatuba** | Entrevistas, perfis e historias da comunidade |
| **Cultura e Identidade** | Valorizacao da cultura caicara e patrimonio local |

---

## Funcionalidades

### Portal Publico
- **Homepage** com materia destaque em hero full-width e grid de reportagens recentes
- **Pagina de materias** (`/materias`) com filtros por categoria e contagem de artigos
- **Pagina de artigo** completa com autor (foto + bio), data, tempo de leitura e compartilhamento social
- **Busca** (`/busca`) por titulo e conteudo das materias
- **Editorias** organizadas por temas (fiscalizacao, saude, politica, cultura)
- **Formulario de denuncia anonima** (`/denuncias`) para que cidadaos reportem irregularidades
- **Formulario de contato** (`/contato`) para leitores e fontes
- **Series editoriais** com badges vermelhos nos cards e paginas de artigos
- **Banner de campanha** configuravel na homepage
- **Banner de doacao** inserido entre paragrafos dos artigos (apos o 3o paragrafo)
- **Botao "Apoie"** sticky junto aos botoes de compartilhamento
- **Cookie consent (LGPD)** com persistencia em localStorage
- **Links sociais** — Instagram, Threads, WhatsApp Channel no rodape e barra social

### SEO Completo
- Meta tags por pagina (`<title>`, `<meta description>`, canonical URLs)
- Open Graph (og:title, og:description, og:image, og:url, og:site_name, og:locale)
- Twitter Cards (summary_large_image)
- Schema.org: WebSite, Organization, NewsArticle, BreadcrumbList, CollectionPage
- Sitemap XML automatico (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- Feed RSS 2.0 (`/feed.xml`)
- Breadcrumb navigation com schema BreadcrumbList
- Preload de fontes customizadas

### Painel Administrativo (`/admin`)
- **Dashboard** com estatisticas em tempo real (total de materias, rascunhos, denuncias, contatos)
- **Gestao de materias** — criar, editar, publicar/despublicar e excluir artigos
- **Editor de artigos** com campos para titulo, lead, corpo (multiplos paragrafos), autor, categoria, serie, imagem, legenda e tempo de leitura
- **Gestao de denuncias** — visualizar denuncias recebidas, alterar status (pendente, em analise, resolvida, arquivada)
- **Gestao de contatos** — visualizar mensagens recebidas, marcar como lidas
- **Autenticacao** por email e senha com sessoes seguras

---

## Tecnologias

### Frontend
| Tecnologia | Versao | Uso |
|---|---|---|
| Next.js | 16.2.1 | Framework React com SSR/ISR (App Router) |
| TypeScript | 5.9 | Tipagem estatica |
| Tailwind CSS | v4 | Estilizacao utility-first |
| Framer Motion | 12.x | Animacoes e transicoes |
| shadcn/ui | - | Componentes de interface |
| Lucide React | - | Icones |

### Backend
| Tecnologia | Versao | Uso |
|---|---|---|
| Express | 5.x | API REST |
| Drizzle ORM | - | ORM type-safe |
| MySQL / MariaDB | - | Banco de dados relacional |
| bcryptjs | - | Hash de senhas |
| Zod | v4 | Validacao de dados |

### Infraestrutura
| Tecnologia | Uso |
|---|---|
| pnpm Workspaces | Monorepo com pacotes compartilhados |
| esbuild | Build do servidor (CJS bundle) |
| Orval | Geracao de cliente API a partir de OpenAPI |
| ISR (30s) | Revalidacao incremental para performance |

### Hospedagem
- **Target:** Hostinger Business plan (Node.js + MySQL/MariaDB)
- **Deploy automatico** via GitHub

---

## Arquitetura

```
ubatuba-reage/
├── artifacts/
│   ├── ubatuba-reage/          # Frontend Next.js
│   │   └── src/
│   │       ├── app/            # Rotas (App Router)
│   │       │   ├── admin/      # Painel administrativo
│   │       │   ├── article/    # Paginas de artigos
│   │       │   ├── busca/      # Busca
│   │       │   ├── categoria/  # Filtro por categoria
│   │       │   ├── denuncias/  # Formulario de denuncia
│   │       │   ├── contato/    # Formulario de contato
│   │       │   ├── editorias/  # Listagem de editorias
│   │       │   ├── materias/   # Arquivo de materias
│   │       │   └── sobre/      # Sobre o projeto
│   │       ├── components/     # Componentes reutilizaveis
│   │       └── lib/            # Utilitarios e fetchers
│   │
│   └── api-server/             # Backend Express
│       └── src/
│           ├── routes/
│           │   ├── articles.ts # CRUD de artigos (publico + admin)
│           │   ├── admin.ts    # Stats, denuncias, contatos
│           │   ├── auth.ts     # Login/logout (email + senha)
│           │   ├── denuncias.ts# Receber denuncias
│           │   └── contato.ts  # Receber contatos
│           ├── lib/
│           │   └── auth.ts     # Autenticacao email/senha
│           └── middlewares/
│               └── authMiddleware.ts
│
├── lib/
│   ├── db/                     # Schema Drizzle ORM (MySQL/MariaDB)
│   │   └── src/schema/
│   │       ├── articles.ts     # Tabela de artigos
│   │       ├── denuncias.ts    # Tabela de denuncias
│   │       ├── contatos.ts     # Tabela de contatos
│   │       └── users.ts        # Tabela de usuarios
│   ├── api-client-react/       # Cliente API gerado (Orval)
│   ├── api-spec/               # Especificacao OpenAPI
│   └── api-zod/                # Schemas Zod gerados
│
├── scripts/                    # Scripts utilitarios
├── start.mjs                   # Starter para producao (API + Next.js)
└── pnpm-workspace.yaml         # Configuracao do monorepo
```

### Fluxo de dados

```
Leitor → Next.js (ISR 30s) → API Express → MySQL/MariaDB
                                   ↑
Administrador → /admin → API (auth) → MySQL/MariaDB
                           ↑
                    Email + Senha (bcrypt)
```

---

## Instalacao

### Pre-requisitos
- Node.js 24+
- pnpm 10+
- MySQL ou MariaDB

### Setup

```bash
# Clonar o repositorio
git clone https://github.com/elton2024br/ubatuba-reage-portal.git
cd ubatuba-reage-portal

# Instalar dependencias
pnpm install

# Configurar variaveis de ambiente
cp .env.example .env
# Editar .env com suas configuracoes:
# MYSQL_URL=mysql://usuario:senha@localhost:3306/ubatuba_reage
# ADMIN_EMAIL=admin@ubatubareage.com.br
# ADMIN_PASSWORD=sua_senha_segura
# PORT=3000
# API_PORT=8080

# Criar tabelas no banco de dados
pnpm --filter @workspace/db run db:push

# Iniciar em desenvolvimento
pnpm --filter @workspace/api-server run dev    # API na porta 8080
pnpm --filter @workspace/ubatuba-reage run dev # Frontend na porta 3000
```

### Build para producao

```bash
# Build completo (typecheck + API + Next.js standalone)
pnpm run build:prod

# Iniciar em producao
NODE_ENV=production pnpm run start:prod
```

### Deploy na Hostinger (Business Plan)

A Hostinger nao suporta pnpm nativamente. Use o script `hostinger-build.sh` incluso no projeto:

1. No hPanel, va em **Websites > Node.js**
2. Conecte o repositorio GitHub: `elton2024br/ubatuba-reage-portal` (branch: `main`)
3. **Build command:** `bash hostinger-build.sh`
4. **Startup file:** `start.mjs`
5. Configure as variaveis de ambiente (veja a secao [Variaveis de Ambiente](#variaveis-de-ambiente))
6. Ative o deploy automatico via GitHub

O script `hostinger-build.sh` cuida de:
- Habilitar pnpm via corepack
- Instalar dependencias
- Executar o build de producao
- Rodar as migracoes do banco de dados

---

## Uso

### Portal publico
Acesse `http://localhost:3000` para ver o portal com todas as materias publicadas.

### Painel administrativo
Acesse `http://localhost:3000/admin` e faca login com email e senha configurados nas variaveis de ambiente.

### Criar uma materia
1. Acesse `/admin` e faca login
2. Clique em "Nova Materia" no menu lateral
3. Preencha titulo, lead, corpo, autor, categoria e imagem
4. Escolha o status: "Publicado" para publicar imediatamente ou "Rascunho" para salvar sem publicar
5. Clique em "Salvar"

### Gerenciar denuncias
1. Acesse `/admin/denuncias`
2. Visualize denuncias recebidas pelo formulario publico
3. Altere o status conforme a apuracao (pendente → em analise → resolvida)

---

## API

### Endpoints publicos

| Metodo | Rota | Descricao |
|---|---|---|
| `GET` | `/api/articles` | Lista todos os artigos publicados |
| `GET` | `/api/articles/:slug` | Retorna um artigo pelo slug |
| `POST` | `/api/denuncias` | Envia uma denuncia anonima |
| `POST` | `/api/contato` | Envia uma mensagem de contato |

### Endpoints administrativos (autenticacao obrigatoria)

| Metodo | Rota | Descricao |
|---|---|---|
| `POST` | `/api/auth/login` | Login com email e senha |
| `POST` | `/api/auth/logout` | Encerrar sessao |
| `GET` | `/api/auth/me` | Verificar usuario autenticado |
| `POST` | `/api/articles` | Cria um novo artigo |
| `PUT` | `/api/articles/:id` | Atualiza um artigo existente |
| `DELETE` | `/api/articles/:id` | Remove um artigo |
| `PATCH` | `/api/articles/:id/publish` | Alterna status publicado/rascunho |
| `GET` | `/api/admin/stats` | Estatisticas do dashboard |
| `GET` | `/api/admin/denuncias` | Lista todas as denuncias |
| `PATCH` | `/api/admin/denuncias/:id` | Atualiza status de uma denuncia |
| `GET` | `/api/admin/contatos` | Lista todos os contatos |
| `PATCH` | `/api/admin/contatos/:id/read` | Marca contato como lido |

---

## Banco de Dados

### Tabelas

**articles** — Artigos/materias jornalisticas
- `id`, `slug`, `title`, `lead`, `body` (JSON), `author`, `author_bio`, `author_image`, `category`, `category_slug`, `series`, `image_url`, `image_caption`, `reading_time`, `status` (draft/published), `published_at`, `created_at`, `updated_at`

**denuncias** — Denuncias recebidas dos cidadaos
- `id`, `titulo`, `descricao`, `categoria`, `localizacao`, `contato`, `anonimo`, `status` (pendente/em_analise/resolvida/arquivada), `created_at`

**contatos** — Mensagens de contato
- `id`, `nome`, `email`, `assunto`, `mensagem`, `lido`, `created_at`

**users** — Usuarios administrativos
- `id`, `email`, `password` (bcrypt hash), `name`, `role`, `created_at`

---

## Seguranca

- Endpoints administrativos protegidos por autenticacao (retornam 401 para requisicoes sem sessao)
- Senhas armazenadas com hash bcrypt
- Artigos em rascunho nao sao expostos na API publica
- Validacao de dados com Zod em todos os endpoints
- CORS configurado para origens permitidas
- Sessoes com cookies seguros

---

## Variaveis de Ambiente

| Variavel | Descricao | Exemplo |
|---|---|---|
| `MYSQL_URL` | URL de conexao MySQL/MariaDB | `mysql://user:pass@localhost:3306/ubatuba` |
| `PORT` | Porta do frontend Next.js | `3000` |
| `API_PORT` | Porta da API Express | `8080` |
| `ADMIN_EMAIL` | Email do administrador inicial | `admin@ubatubareage.com.br` |
| `ADMIN_PASSWORD` | Senha do administrador inicial | `senha_segura` |
| `NODE_ENV` | Ambiente de execucao | `production` |
| `NEXT_PUBLIC_SITE_URL` | URL publica do site | `https://ubatubareage.com.br` |

---

## Contribuindo

Contribuicoes sao bem-vindas! Este e um projeto de jornalismo civico e toda ajuda fortalece a fiscalizacao popular.

1. Fork o repositorio
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudancas (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## Licenca

Este projeto e de codigo aberto. O conteudo jornalistico e protegido por direitos autorais e nao pode ser reproduzido sem autorizacao.

---

<p align="center">
  <strong>Ubatuba Reage</strong> — Jornalismo que fiscaliza, informa e transforma.
</p>
