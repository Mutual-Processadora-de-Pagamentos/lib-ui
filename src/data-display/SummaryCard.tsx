/**
 * SummaryCard — variante do KpiCard com lista de métricas secundárias.
 *
 * Mantém a mesma identidade visual do `KpiCard` (mesmas classes
 * `.kpi-card`/`.kpi-card-header`/`.kpi-card-value`) — só estende o conteúdo
 * abaixo do valor principal com uma lista de pares label/valor (label à
 * esquerda em muted, valor à direita em foreground).
 *
 * Usado nos 4 cards de resumo da tela `/transacoes` (PIX In Pagos, PIX In
 * Pendentes, PIX Out Pagos, Resumo Geral) — ajuste #1 do AJUSTES.md.
 *
 * Regras seguidas:
 *  - Zero cor hardcoded — tokens via classes globais.
 *  - Pesos 300/400 (light/regular).
 *  - Acessível: ícone decorativo com `aria-hidden`, valores tabulares com
 *    `tabular-nums`.
 */

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export type SummaryCardIconColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'

export interface SummaryMetric {
  label: string
  /** Já formatado (ex.: `formatCurrency(...)` no consumidor). */
  value: ReactNode
}

export interface SummaryCardProps {
  title: string
  /** Valor principal já formatado pelo consumidor (suporta mascaramento). */
  value: ReactNode
  icon: LucideIcon
  iconColor?: SummaryCardIconColor
  /** Lista de métricas secundárias renderizadas abaixo do valor principal. */
  metrics: SummaryMetric[]
  className?: string
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  iconColor = 'primary',
  metrics,
  className,
}: SummaryCardProps) {
  return (
    <article className={cn('kpi-card', className)}>
      <div className="kpi-card-header">
        <span className="kpi-card-title">{title}</span>
        <span
          className={`kpi-card-icon kpi-card-icon--${iconColor}`}
          aria-hidden
        >
          <Icon size={16} />
        </span>
      </div>

      <p className="kpi-card-value tabular-nums">{value}</p>

      {metrics.length > 0 && (
        <ul
          className="mt-2 flex flex-col gap-1.5"
          aria-label={`Métricas de ${title}`}
        >
          {metrics.map((m) => (
            <li
              key={m.label}
              className="flex items-center justify-between gap-3 text-[12px]"
            >
              <span
                className="truncate"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {m.label}
              </span>
              <span
                className="shrink-0 tabular-nums font-normal"
                style={{ color: 'var(--foreground)' }}
              >
                {m.value}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
