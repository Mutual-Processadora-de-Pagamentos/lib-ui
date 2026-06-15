import { type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface SectionCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  /** Ícone pré-renderizado (ReactNode). Quando definido, ignora `icon`. */
  iconNode?: ReactNode
  actions?: ReactNode
  /**
   * card (default) → .text-card-title (15px)
   * section        → .text-section-title (18px)
   */
  size?: 'card' | 'section'
  /**
   * false (default) → ícone bare
   * 'sm'            → quadrado w-6 h-6 com bg primário 10%
   * 'lg'            → quadrado w-10 h-10 com bg primário 8%
   */
  iconBoxed?: false | 'sm' | 'lg'
  /** Adiciona border-b sob o header. */
  headerBorder?: boolean
  noPadding?: boolean
  /** Remove h-full (card ocupa só o espaço necessário). */
  noStretch?: boolean
  /** Remove chrome: background, border, radius, side padding. */
  flat?: boolean
  className?: string
  children: ReactNode
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  iconNode,
  actions,
  size = 'card',
  iconBoxed = false,
  headerBorder,
  noPadding,
  noStretch,
  flat,
  className,
  children,
}: SectionCardProps) {
  const renderIcon = () => {
    if (iconBoxed === 'lg') {
      const content = iconNode ?? (Icon ? <Icon size={20} strokeWidth={1.75} aria-hidden style={{ color: 'var(--section-icon-color)' }} /> : null)
      if (!content) return null
      return (
        <span
          className="h-10 w-10 rounded-[10px] flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'color-mix(in srgb, var(--primary) 8%, transparent)' }}
        >
          {content}
        </span>
      )
    }
    if (iconBoxed === 'sm') {
      const content = iconNode ?? (Icon ? <Icon size={14} strokeWidth={1.75} aria-hidden style={{ color: 'var(--primary)' }} /> : null)
      if (!content) return null
      return (
        <span
          aria-hidden
          className="inline-flex items-center justify-center w-6 h-6 rounded-md"
          style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)' }}
        >
          {content}
        </span>
      )
    }
    // bare
    if (iconNode) return <>{iconNode}</>
    if (Icon) return <Icon size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" style={{ color: 'var(--section-icon-color)' }} aria-hidden />
    return null
  }

  const iconEl = renderIcon()

  return (
    <div
      className={cn(
        'flex flex-col',
        !flat && 'bg-[color:var(--card)] border border-[color:var(--border)] rounded-[14px] section-card',
        !noStretch && !flat && 'h-full',
        className,
      )}
    >
      <div className={cn('flex items-start justify-between pb-4 shrink-0', !flat && 'px-5 pt-5', headerBorder && 'border-b border-[color:var(--border)]')}>
        <div className={cn('flex items-start gap-2.5', iconBoxed && 'items-center')}>
          {iconEl}
          <div>
            {size === 'section' ? (
              <p className="text-section-title" style={{ color: 'var(--foreground)' }}>
                {title}
              </p>
            ) : (
              <h3 className="text-card-title" style={{ color: 'var(--foreground)' }}>
                {title}
              </h3>
            )}
            {description && (
              <p className="text-label mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                {description}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="ml-4 shrink-0">{actions}</div>}
      </div>
      <div className={cn('flex-1 flex flex-col', !noPadding && !flat && 'px-5 pb-5', headerBorder && !noPadding && 'pt-4')}>{children}</div>
    </div>
  )
}
