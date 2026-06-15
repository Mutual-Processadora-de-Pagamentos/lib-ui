/**
 * DetailField — helpers de campo para modais de detalhe (header branco, body em
 * grid 2 colunas com label em caixa-alta/muted e valor em foreground).
 *
 * Extraído do OperacaoDetalheModal para reuso pelos modais de detalhe da Mesa
 * OTC (TravaDetalheModal, ClienteOtcDetalheModal). Tokens-only.
 */

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface DetailFieldProps {
  label: string
  value: string
  icon?: LucideIcon
  mono?: boolean
  tabular?: boolean
  breakAll?: boolean
}

export function DetailField({ label, value, icon, mono, tabular, breakAll }: DetailFieldProps) {
  return (
    <DetailFieldNode label={label} icon={icon}>
      <span
        className={[
          'text-[13px]',
          mono ? 'font-mono text-[12px]' : '',
          tabular ? 'tabular-nums' : '',
          breakAll ? 'break-all' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ color: 'var(--foreground)' }}
      >
        {value}
      </span>
    </DetailFieldNode>
  )
}

export function DetailFieldNode({ label, icon: Icon, children }: { label: string; icon?: LucideIcon; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt
        className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider mb-1"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {Icon && <Icon size={13} strokeWidth={1.75} className="shrink-0" style={{ color: 'var(--section-icon-color)' }} aria-hidden />}
        {label}
      </dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}
