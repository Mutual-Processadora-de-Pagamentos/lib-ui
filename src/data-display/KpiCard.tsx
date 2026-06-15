import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '../lib/cn'

export type KpiCardIconColor = 'primary' | 'success' | 'warning' | 'error' | 'info'

export interface KpiCardProps {
  title: string
  value: string
  icon: ReactNode
  description?: string
  iconColor?: KpiCardIconColor
  changePercent?: number
  isLoading?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

function TrendIcon({ value }: { value: number }) {
  if (value > 0) return <TrendingUp className="h-3 w-3" />
  if (value < 0) return <TrendingDown className="h-3 w-3" />
  return <Minus className="h-3 w-3" />
}

function trendColor(value: number): string {
  if (value > 0) return 'var(--status-success)'
  if (value < 0) return 'var(--destructive)'
  return 'var(--muted-foreground)'
}

export function KpiCard({
  title,
  value,
  icon,
  description,
  iconColor = 'primary',
  changePercent,
  isLoading,
  onClick,
}: KpiCardProps) {
  const Tag = onClick ? 'button' : 'article'

  return (
    <Tag
      className="kpi-card"
      onClick={onClick}
      aria-busy={isLoading}
      style={{ textAlign: 'left' }}
      {...(onClick ? { type: 'button' as const } : {})}
    >
      <div className="kpi-card-header">
        <span className="kpi-card-title">{title}</span>
        <span className={`kpi-card-icon kpi-card-icon--${iconColor}`} aria-hidden>
          {icon}
        </span>
      </div>

      <p className="kpi-card-value">{isLoading ? '…' : value}</p>

      {/* Descrição + variação — alinhados à esquerda */}
      <div className="flex items-center gap-2">
        {changePercent !== undefined && (
          <span
            className="flex items-center gap-0.5 text-[12px] font-normal"
            style={{ color: trendColor(changePercent) }}
          >
            <TrendIcon value={changePercent} />
            {Math.abs(changePercent).toFixed(1)}%
          </span>
        )}
        {description && (
          <span className={cn('kpi-card-description', changePercent !== undefined && 'truncate')}>
            {description}
          </span>
        )}
      </div>
    </Tag>
  )
}
