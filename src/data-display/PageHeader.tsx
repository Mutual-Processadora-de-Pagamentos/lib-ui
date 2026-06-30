import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

export interface BreadcrumbItem {
  label: string
  /** Quando presente, o item vira botão clicável (navegação). O último item normalmente é estático. */
  onClick?: () => void
}

export interface PageHeaderProps {
  title: string
  subtitle?: string
  /** Ícone Lucide que representa a seção */
  icon?: LucideIcon
  actions?: ReactNode
  className?: string
  /**
   * Botão "voltar" à esquerda do título (headers de fluxo/wizard). Quando presente,
   * renderiza um IconButton com ArrowLeft que chama `onBack`.
   */
  onBack?: () => void
  /** Rótulo acessível do botão voltar. Default: "Voltar". */
  backLabel?: string
  /** Trilha de navegação acima do título (headers de fluxo/wizard). */
  breadcrumb?: BreadcrumbItem[]
}

/**
 * Cabeçalho de página — padrão Mutual.
 * Usa `.page-header-title` / `.page-header-subtitle` do global.css.
 * Aceita ícone opcional à esquerda do título, e — para telas de fluxo/wizard —
 * um botão `onBack` e uma trilha `breadcrumb` (ambos opcionais; sem eles o
 * comportamento é o cabeçalho de página padrão).
 */
export function PageHeader({
  title,
  subtitle,
  icon: Icon,
  actions,
  className,
  onBack,
  backLabel = 'Voltar',
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between', className)}>
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            aria-label="Trilha de navegação"
            className="mb-1 flex items-center gap-1.5 text-[13px]"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={14} aria-hidden />}
                {item.onClick ? (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="transition-colors hover:underline"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span style={{ color: i === breadcrumb.length - 1 ? 'var(--foreground)' : undefined }}>
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label={backLabel}
              className="shrink-0 rounded-lg p-1.5 transition-colors hover:bg-[color:var(--hover-muted)]"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <ArrowLeft size={20} aria-hidden />
            </button>
          )}
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
