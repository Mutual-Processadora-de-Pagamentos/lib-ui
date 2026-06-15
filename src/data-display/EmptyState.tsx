import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export interface EmptyStateProps {
  /** Ícone Lucide representando o contexto vazio (ex: `Inbox`, `FileX`, `Search`). */
  icon: LucideIcon
  /** Título principal — tipografia `text-card-title` (15px). */
  title: string
  /** Descrição complementar opcional — tipografia `text-label` (12px). */
  description?: string
  /** Ação opcional (ex: botão "Criar primeiro item"). */
  action?: ReactNode
}

/**
 * Estado vazio padronizado: ícone solto + título + descrição + ação opcional.
 *
 * Regras visuais:
 * - Ícone solto sem fundo — cor `var(--muted-foreground)`.
 * - Título: `text-card-title` (15px), `font-normal`.
 * - Descrição: `text-label` (12px), `var(--muted-foreground)`.
 * - Padding generoso (`py-16`) para centralização visual confortável.
 *
 * @example
 * <EmptyState
 *   icon={Inbox}
 *   title="Nenhuma transação encontrada"
 *   description="Ajuste os filtros ou aguarde novas movimentações."
 * />
 */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center"
    >
      <Icon
        size={32}
        aria-hidden
        style={{ color: 'var(--muted-foreground)' }}
      />

      <div className="space-y-1 max-w-xs">
        <p className="text-card-title font-normal" style={{ color: 'var(--foreground)' }}>
          {title}
        </p>
        {description && (
          <p className="text-label" style={{ color: 'var(--muted-foreground)' }}>
            {description}
          </p>
        )}
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
