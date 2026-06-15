# @mutual/lib-ui

Design System compartilhado da Mutual Pay. Fonte única de tokens (e, futuramente, primitivos)
consumida pelos protótipos `prototipo-vite-backoffice` e `prototipo-vite-paas`.

Ver decisão e plano de migração: `prototipo-vite-backoffice/docs/adr/0001-lib-ui-design-system-compartilhado.md`.

## Fase 0 — Tokens (atual)

`src/tokens/tokens.css` é a camada compartilhada do `global.css`: `@theme inline`, `:root`/`.dark`
(tokens) e `@layer utilities` (escala tipográfica, `.section-card`, `.kpi-card`, etc).

### Consumo (Tailwind 4)

No `global.css` do app, importe **depois** do Tailwind:

```css
@import "@fontsource/montserrat/300.css";
@import "@fontsource/montserrat/400.css";
@import "@fontsource/montserrat/500.css";
@import "@fontsource/montserrat/600.css";

@import "tailwindcss";
@import "@mutual/lib-ui/tokens.css";
```

Não inclui `@import` de fontes/tailwind — esses são shell do app.

## Roadmap

- **Fase 1** — primitivos atômicos (`ui/`: Button, IconButton, Input, Dialog…).
- **Fase 2** — compostos (`data-display/`: SectionCard, DataTable, StatusBadge, estados).
- **Fase 3** — a doc viva (`/design-system`) lê deste pacote (mata o `tokens.ts` paralelo).

## Regras do DS

Pesos ≤ 400 · só `var(--*)` · status ícone+texto sem fundo · escala tipográfica semântica.
Ver a skill `designista-mutual`.
