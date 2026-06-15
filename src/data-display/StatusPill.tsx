// NOTE: este componente NÃO é mais usado em Webhooks. Status agora segue
// a regra absoluta do CLAUDE.md (texto + ícone, sem fundo) via `StatusBadge`.
// Mantido apenas por compatibilidade com consumidores legados ainda existentes
// no protótipo (ex.: `TaxasLimitesPage` — status de conta vinculada).
// Considere migração futura para `StatusBadge` e posterior remoção deste arquivo.

/**
 * StatusPill — pill com dot + label + fundo suave.
 *
 * ⚠️ NÃO USAR em telas novas. A regra absoluta do CLAUDE.md (item 2) determina
 * que status sejam exibidos como ícone + texto colorido, SEM fundo. Use
 * `StatusBadge` para qualquer novo status.
 *
 * Visual (padrão aprovado pelo dono via HTML real):
 *   - container: `inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1`
 *   - tipografia: `text-[12px] font-normal`
 *   - largura mínima: `min-w-[90px]` (alinha visualmente em colunas de tabela)
 *   - cor base: `var(--status-{success|warning|error|info})`
 *   - borda: `color-mix(in srgb, var(--status-xxx) 40%, transparent)`
 *   - fundo: `color-mix(in srgb, var(--status-xxx) 10%, transparent)`
 *   - dot: `size-1.5 rounded-full bg-current`
 */

import { cn } from '../lib/cn'

export type StatusPillVariant = 'success' | 'warning' | 'destructive' | 'info'

const VARIANT_TOKEN: Record<StatusPillVariant, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  destructive: 'var(--status-error)',
  info: 'var(--status-info)',
}

export interface StatusPillProps {
  variant: StatusPillVariant
  label: string
  className?: string
}

export function StatusPill({ variant, label, className }: StatusPillProps) {
  const colorVar = VARIANT_TOKEN[variant]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1',
        'text-[12px] font-normal min-w-[90px] justify-center',
        className,
      )}
      style={{
        color: colorVar,
        borderColor: `color-mix(in srgb, ${colorVar} 40%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${colorVar} 10%, transparent)`,
      }}
    >
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
      {label}
    </span>
  )
}
