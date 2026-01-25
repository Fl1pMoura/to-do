# To-Do • React + TanStack Query

Projeto de estudos criado para treinar o ecossistema do React com foco em
**optimistic updates** e **cache inteligente** com TanStack Query. A ideia aqui
foi construir um app de tarefas que pareça simples, mas por baixo do capô é uma
vitrine de boas práticas modernas de front-end.

## Por que esse projeto existe

Treinar **fluxos reais**: criação, atualização e exclusão de tarefas com
experiências rápidas, responsivas e confiáveis, mesmo antes da API responder.

## Destaques

- **Optimistic updates** com rollback em caso de erro
- **Cache e invalidação** bem definidos com query keys
- **Dashboard de resumo** com status das tarefas
- **Formulários sólidos** com validação (React Hook Form + Zod)
- **UI moderna** com Radix UI, Tailwind e Sonner

## Stack

- React 19 + TypeScript + Vite
- TanStack Query (cache, mutations e devtools)
- React Router
- Tailwind CSS
- React Hook Form + Zod
- Axios
- JSON Server (API fake local)

## Rodando localmente

1. Instale as dependências:

```
pnpm install
```

2. Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost:3333
```

3. Suba a API fake com o JSON Server:

```
npx json-server --watch db.json --port 3333
```

4. Em outro terminal, rode o app:

```
pnpm dev
```

## Scripts úteis

- `pnpm dev` — ambiente de desenvolvimento
- `pnpm build` — build de produção
- `pnpm preview` — pré-visualização do build
- `pnpm lint` — lint do projeto

## Estrutura de dados

As tarefas são servidas a partir do arquivo `db.json` com a rota `/tasks`.
Cada tarefa tem `title`, `description`, `tag` e `status`.

---

Se você curte React de verdade, esse projeto é o playground perfeito para
entender **cache**, **mutations** e **UX instantânea** do jeito certo.
