# @mutual/lib-ui

Design System compartilhado da Mutual Pay. Fonte única de tokens (e, futuramente, primitivos)
consumida pelos protótipos `prototipo-vite-backoffice` e `prototipo-vite-paas`.

Ver decisão e plano de migração: `prototipo-vite-backoffice/docs/adr/0001-lib-ui-design-system-compartilhado.md`.

## Fase 0 — Tokens (atual)

`src/tokens/tokens.css` é a camada compartilhada do `global.css`: `@theme inline`, `:root`/`.dark`
(tokens) e `@layer utilities` (escala tipográfica, `.section-card`, `.kpi-card`, etc).

### Instalação (GitHub Packages)

O pacote é publicado no **GitHub Packages** da org. No app, crie um `.npmrc`:

```
@mutual-processadora-de-pagamentos:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

E adicione a dependência:
`"@mutual-processadora-de-pagamentos/lib-ui": "^0.1.0"`.

Na CI: `permissions: packages: read` + `env: NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.

### Consumo (Tailwind 4)

No `global.css` do app, importe **depois** do Tailwind:

```css
@import "@fontsource/montserrat/300.css";
@import "@fontsource/montserrat/400.css";
@import "@fontsource/montserrat/500.css";
@import "@fontsource/montserrat/600.css";

@import "tailwindcss";
@import "@mutual-processadora-de-pagamentos/lib-ui/tokens.css";
```

Não inclui `@import` de fontes/tailwind — esses são shell do app.

### Publicação

`npm version patch|minor` → `git push --tags`. O workflow `publish.yml` publica no
GitHub Packages automaticamente (usa `GITHUB_TOKEN`, sem PAT).

### Primitivos React (a partir de v0.2.0)

```ts
import { Button, IconButton, cn } from '@mutual-processadora-de-pagamentos/lib-ui'
```

Pacote ESM + tipos, buildado com tsup (`dist/`). Peer deps fornecidas pelo app:
`react`, `react-dom`, `lucide-react`, `clsx`, `tailwind-merge`. Os primitivos usam
classes de token (`var(--*)`), então o app precisa importar `./tokens.css` também.

> Consumo nos apps depende do grant de leitura do pacote (Manage Actions access) —
> ver "Fase 0.1" no ADR 0001. Build + publish do pacote já funcionam (Actions, sem PAT).

## Roadmap

- **Fase 1 (em curso)** — primitivos atômicos (`ui/`). v0.2.0: `cn`, `Button`, `IconButton`.
  Próximos: Input, Label, Dialog, Popover, DropdownMenu, PillTabs, etc.
- **Fase 2** — compostos (`data-display/`: SectionCard, DataTable, StatusBadge, estados).
- **Fase 3** — a doc viva (`/design-system`) lê deste pacote (mata o `tokens.ts` paralelo).

## Regras do DS

Pesos ≤ 400 · só `var(--*)` · status ícone+texto sem fundo · escala tipográfica semântica.
Ver a skill `designista-mutual`.
