/**
 * StatusBadge — TEXTO + ÍCONE COLORIDO, **SEM FUNDO**.
 *
 * Regra absoluta do CLAUDE.md (Regras Visuais Absolutas, item 2):
 *   "SEMPRE: ícone lucide + texto colorido via token.
 *    NUNCA: badge com fundo colorido (bg-green-100, bg-red-50,
 *    qualquer bg-* envolvendo o status)."
 *
 * Use para QUALQUER status (transação, operação, webhook, domínio, KYC, etc.).
 * O componente `StatusPill` (com fundo) está deprecado e mantido apenas para
 * compatibilidade com consumidores legados — não use em telas novas.
 *
 * Sem prop `variant` por design: a cor é explícita via `color` para deixar
 * claro qual token está sendo usado. Sem variant garante que ninguém
 * adiciona um `bg-*` "por engano".
 */

import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export type StatusBadgeColor =
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'muted'
  | 'primary'

const COLOR_TOKEN: Record<StatusBadgeColor, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  destructive: 'var(--destructive)',
  info: 'var(--status-info)',
  muted: 'var(--muted-foreground)',
  primary: 'var(--primary)',
}

export interface StatusBadgeProps {
  icon: LucideIcon
  color: StatusBadgeColor
  label: string
  /** `sm` = 12px ícone / `text-xs`; `md` = 14px ícone / `text-sm`. Default `sm`. */
  size?: 'sm' | 'md'
  className?: string
}

export function StatusBadge({
  icon: Icon,
  color,
  label,
  size = 'sm',
  className,
}: StatusBadgeProps) {
  const iconSize = size === 'md' ? 14 : 12
  return (
    <span
      style={{ color: COLOR_TOKEN[color] }}
      className={cn(
        'inline-flex items-center gap-1.5 font-normal',
        size === 'md' ? 'text-sm' : 'text-xs',
        className,
      )}
    >
      <Icon size={iconSize} aria-hidden />
      {label}
    </span>
  )
}
