/**
 * MiniKpiCard — variante compacta do KpiCard, padrão visual de Webhooks.
 *
 * Diferenças vs. `KpiCard` (a versão "principal" do dashboard):
 *   - `rounded-xl` (12px) em vez de `rounded-[14px]`
 *   - padding mais enxuto (`p-4 sm:p-5`)
 *   - valor em `text-base font-light` (KpiCard usa 24px)
 *   - descrição em `text-[0.8125rem]` (13px)
 *   - hover sutil em `bg-muted/40` (sem shadow)
 *
 * Usar quando a página já tem listagem densa abaixo e o KPI precisa ceder
 * espaço (Webhooks, API Keys, Domínios, Funcionários etc).
 */

import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export type MiniKpiIconColor = 'section' | 'success' | 'warning' | 'destructive' | 'info' | 'primary'

const ICON_COLOR_TOKEN: Record<MiniKpiIconColor, string> = {
  section: 'var(--section-icon-color)',
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  destructive: 'var(--destructive)',
  info: 'var(--status-info)',
  primary: 'var(--primary)',
}

export interface MiniKpiCardProps {
  label: string
  icon: LucideIcon
  /** Token semântico para colorir o ícone do canto superior direito. Default: `section`. */
  iconColor?: MiniKpiIconColor
  value: string | number
  description: string
  /** Opcional — quando definido, o card vira `<button>` clicável. */
  onClick?: () => void
  className?: string
}

export function MiniKpiCard({
  label,
  icon: Icon,
  iconColor = 'section',
  value,
  description,
  onClick,
  className,
}: MiniKpiCardProps) {
  const baseClass = cn(
    'rounded-xl p-4 sm:p-5 bg-[color:var(--card)] border border-[color:var(--border)]',
    'transition-all hover:bg-[color:var(--muted)]/40',
    onClick && 'cursor-pointer text-left w-full',
    className,
  )

  const content = (
    <>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[0.6875rem] font-normal text-[color:var(--muted-foreground)] truncate">
          {label}
        </p>
        <Icon
          className="w-4 h-4 shrink-0"
          style={{ color: ICON_COLOR_TOKEN[iconColor] }}
          aria-hidden
        />
      </div>
      <p className="text-base font-light tabular-nums text-[color:var(--foreground)]">
        {value}
      </p>
      <p className="text-[0.8125rem] text-[color:var(--muted-foreground)] mt-1">
        {description}
      </p>
    </>
  )

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={baseClass}>
        {content}
      </button>
    )
  }

  return <div className={baseClass}>{content}</div>
}
