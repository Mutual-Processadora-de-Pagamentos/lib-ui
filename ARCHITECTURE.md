# Arquitetura — @mutual-processadora-de-pagamentos/lib-ui

Pacote do Design System compartilhado da Mutual Pay. Fonte única de **tokens** (CSS) e
**primitivos React**, consumido pelos protótipos `prototipo-vite-backoffice` (canônico
do DS) e `prototipo-vite-paas` (Portal Cliente). Decisão e migração: ver
`prototipo-vite-backoffice/docs/adr/0001-lib-ui-design-system-compartilhado.md`.

## Stack

| Item | Escolha |
|------|---------|
| Build | **tsup** (esbuild) → ESM + `.d.ts` |
| Linguagem | TypeScript (strict, `verbatimModuleSyntax`) |
| Peer deps | `react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`, `tailwindcss` (4) |
| Registry | GitHub Packages (`npm.pkg.github.com`) |

Peer deps **não** são empacotadas (`external` no tsup) — o app fornece. Evita duplicar
React/Tailwind e conflito de versões.

## Camadas (`src/`)

```
src/
├── tokens/
│   └── tokens.css      # Tokens + @theme + utilities. CONSUMIDO CRU (não buildado).
│                       #   Exportado como "./tokens.css".
├── lib/
│   └── cn.ts           # util de classes (clsx + tailwind-merge)
├── ui/                 # primitivos atômicos (Button, IconButton, ...)
└── index.ts            # barrel — API pública dos primitivos (vira dist/index.js)
```

Regra de ouro: o que é usado pelos dois apps mora aqui (fonte única); o que é específico
de um app fica no app (ex.: `paas/src/styles/tokens-overrides.css`).

## O que é buildado vs cru

- **Primitivos** (`ui/`, `lib/`, `index.ts`) → buildados pelo tsup em `dist/` (ESM + types).
  Publicados via `exports["."]`.
- **Tokens** (`tokens/tokens.css`) → **não buildado**. CSS cru consumido direto via
  `exports["./tokens.css"]` (o Tailwind do app processa `@theme`/utilities).

`files: ["dist", "src/tokens"]` — o tarball leva só o build + o CSS de token (a fonte
`.tsx` não é publicada).

## Consumo no app

```css
/* global.css do app, DEPOIS de @import "tailwindcss" */
@import "@mutual-processadora-de-pagamentos/lib-ui/tokens.css";
```

```ts
import { Button, IconButton, cn } from '@mutual-processadora-de-pagamentos/lib-ui'
```

### ⚠️ Tailwind 4 + classes do pacote (gotcha do flip)

Os primitivos trazem classes utilitárias inline (ex.: `inline-flex h-8 px-3`). O Tailwind 4
**ignora `node_modules` na detecção automática de conteúdo** — então essas classes NÃO são
geradas no CSS do app a menos que o app declare a fonte explicitamente:

```css
/* no CSS de entrada do app */
@source "../node_modules/@mutual-processadora-de-pagamentos/lib-ui/dist";
```

Sem isso, os primitivos renderizam sem estilo. Obrigatório ao flipar o consumo (Fase 1).

## Build & publish

- `npm run build` → `tsup` gera `dist/`.
- `npm version <patch|minor>` + `git push --tags` → workflow `publish.yml` instala, builda
  e publica no GitHub Packages via `GITHUB_TOKEN` (sem PAT).

## Estado (2026-06-15)

- **v0.1.0** — tokens (Fase 0).
- **v0.2.0** — `cn`, `Button`, `IconButton` (Fase 1 fundacional).
- **v0.3.0** — +12 primitivos atômicos: Input, Label, FormMessage, Textarea, Dialog, Popover,
  DropdownMenu, Tooltip, ScrollArea, Switch, Select, PillTabs. peerDeps: +7 `@radix-ui/*` +
  `react-router-dom`.
- **v0.4.0** — +11 compostos `data-display`: SectionCard, StatusBadge, PageHeader, Skeleton,
  EmptyState, ErrorState, KpiCard, MiniKpiCard, SummaryCard, DetailField, StatusPill. `src/data-display/`.
- **v0.5.0** — +`FeeIcon` (ui/, ícone DS currentColor) + `DataTable` (data-display/). Sem peerDeps novas.
- **Fase 0.1 → 2.1 CONCLUÍDAS (2026-06-15):** tokens + 15 primitivos + 12 compostos via **npm
  real** pelos 2 apps em produção (deploys verdes + QA visual). Consumo via SHIM de re-export
  (`components/{ui,data-display}/<X>.tsx` → `export { ... } from '@mutual.../lib-ui'`) + `@source`.
  Desbloqueio: package público + **grant de Manage Actions access** (público sozinho não basta —
  `GITHUB_TOKEN` é escopado ao próprio repo).
- **Fora de escopo (app-local):** modais de domínio + ícones de MARCA (CryptoIcon/BitcoinIcon/PixIcon).

## Regras do DS (todos os primitivos)

Só `var(--*)` (zero cor hardcoded) · pesos ≤ `font-medium` · status ícone+texto sem fundo ·
escala tipográfica semântica · `forwardRef` + focus-visible. Ver skill `designista-mutual`.
