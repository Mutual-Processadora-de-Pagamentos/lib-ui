import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  /** Ícone Lucide que representa a seção */
  icon?: LucideIcon
  actions?: ReactNode
  className?: string
}

/**
 * Cabeçalho de página — padrão Mutual.
 * Usa `.page-header-title` / `.page-header-subtitle` do global.css.
 * Aceita ícone opcional exibido à esquerda do título.
 */
export function PageHeader({ title, subtitle, icon: Icon, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between', className)}>
      <div>
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span
              aria-hidden
              className="shrink-0"
              style={{ color: 'var(--section-icon-color)' }}
            >
              <Icon size={26} strokeWidth={1.5} />
            </span>
          )}
          <h1 className="page-header-title">{title}</h1>
        </div>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  )
}
