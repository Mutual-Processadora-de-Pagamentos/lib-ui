import type { CSSProperties } from 'react'
import { cn } from '../lib/cn'

export type MoneySize = 'sm' | 'md' | 'lg' | 'xl'

export interface MoneyValueProps {
  /** Valor numérico a formatar. */
  value: number
  /** Moeda ISO 4217 (default: BRL). */
  currency?: string
  /** Locale de formatação (default: pt-BR). */
  locale?: string
  /**
   * Tamanho tipográfico. Usa clamp() para encolher em telas estreitas e nunca
   * vazar o container — o ponto que valores com fonte fixa não resolviam.
   */
  size?: MoneySize
  /** Cor do valor (token). Default: var(--foreground). */
  color?: string
  className?: string
  style?: CSSProperties
}

// Faixas fluidas: min (mobile/estreito) … preferido (vw) … max (desktop).
// O max espelha os tamanhos fixos que as telas usavam (20px, 26px) sem vazar.
const SIZE_CLAMP: Record<MoneySize, string> = {
  sm: 'clamp(0.875rem, 1.5vw, 1rem)',     // ~14–16px
  md: 'clamp(1rem, 2.2vw, 1.25rem)',      // ~16–20px
  lg: 'clamp(1.125rem, 2.8vw, 1.625rem)', // ~18–26px
  xl: 'clamp(1.375rem, 3.6vw, 2rem)',     // ~22–32px
}

/**
 * MoneyValue — exibe um valor monetário formatado, responsivo e tokenizado.
 *
 * Padrão Mutual: peso leve (font-light), `tabular-nums` para alinhamento de
 * dígitos, `whitespace-nowrap` + fonte fluida via clamp() para NUNCA transbordar
 * o card em telas estreitas. Substitui os `<p className="text-[26px]">{formatBRL(x)}</p>`
 * espalhados pelas telas.
 */
export function MoneyValue({
  value,
  currency = 'BRL',
  locale = 'pt-BR',
  size = 'lg',
  color = 'var(--foreground)',
  className,
  style,
}: MoneyValueProps) {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)

  return (
    <span
      className={cn('block font-light tabular-nums whitespace-nowrap', className)}
      style={{ fontSize: SIZE_CLAMP[size], color, ...style }}
    >
      {formatted}
    </span>
  )
}
