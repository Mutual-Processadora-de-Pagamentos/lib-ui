/**
 * TransactionIcon — ícone de tipo de transação Pix (entrada/saída/devolução/etc.).
 *
 * Ícone lucide colorido por tipo (tokens `--status-*`/`--primary`), com fundo
 * opcional (disco translúcido via `color-mix`). Componente de domínio do
 * Design System Mutual — vive na lib, não nos apps.
 */

import {
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  Undo2,
  Clock,
  DollarSign,
} from 'lucide-react'

export type TransactionType =
  | 'pix-in'
  | 'pix-out'
  | 'devolucao'
  | 'estorno'
  | 'agendado'
  | 'taxa'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

interface TransactionIconProps {
  type: TransactionType
  size?: IconSize
  className?: string
  showBackground?: boolean
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
}

const typeConfig = {
  'pix-in': {
    icon: ArrowDownLeft,
    color: 'var(--status-success)',
    bgColor: 'color-mix(in srgb, var(--status-success) 15%, transparent)',
    label: 'Pix Entrada',
  },
  'pix-out': {
    icon: ArrowUpRight,
    color: 'var(--status-error)',
    bgColor: 'color-mix(in srgb, var(--status-error) 15%, transparent)',
    label: 'Pix Saída',
  },
  devolucao: {
    icon: RotateCcw,
    color: 'var(--status-info)',
    bgColor: 'color-mix(in srgb, var(--status-info) 15%, transparent)',
    label: 'Devolução',
  },
  estorno: {
    icon: Undo2,
    color: 'var(--status-warning)',
    bgColor: 'color-mix(in srgb, var(--status-warning) 15%, transparent)',
    label: 'Estorno',
  },
  agendado: {
    icon: Clock,
    color: 'var(--status-neutral)',
    bgColor: 'color-mix(in srgb, var(--status-neutral) 15%, transparent)',
    label: 'Agendado',
  },
  taxa: {
    icon: DollarSign,
    color: 'var(--primary)',
    bgColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
    label: 'Taxa',
  },
}

export function TransactionIcon({
  type,
  size = 'md',
  className = '',
  showBackground = false,
}: TransactionIconProps) {
  const config = typeConfig[type]
  const Icon = config.icon
  const iconSize = sizeMap[size]

  if (showBackground) {
    const bgSize = iconSize + 16 // padding de 8px em cada lado
    return (
      <div
        className={`inline-flex items-center justify-center rounded-lg ${className}`}
        style={{
          width: `${bgSize}px`,
          height: `${bgSize}px`,
          backgroundColor: config.bgColor,
        }}
        title={config.label}
      >
        <Icon
          size={iconSize}
          strokeWidth={2}
          style={{ color: config.color }}
        />
      </div>
    )
  }

  return (
    <Icon
      size={iconSize}
      strokeWidth={2}
      style={{ color: config.color }}
      className={className}
      // lucide-react (React 19 types) não tipa `title` em LucideProps; é atributo DOM válido.
      {...{ title: config.label }}
    />
  )
}
