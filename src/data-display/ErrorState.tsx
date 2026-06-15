import { AlertTriangle } from 'lucide-react'
import { Button } from '../ui/Button'

export interface ErrorStateProps {
  /** Título do erro — padrão: "Erro ao carregar". */
  title?: string
  /** Descrição do erro — padrão: "Não foi possível carregar os dados." */
  description?: string
  /** Callback para o botão "Tentar novamente". Omitir oculta o botão. */
  onRetry?: () => void
}

/**
 * Estado de erro padronizado: ícone `AlertTriangle` + título + descrição + retry opcional.
 *
 * Regras visuais:
 * - Ícone solto sem fundo — cor `var(--status-error)` (ícone apenas, sem badge com fundo).
 * - Título: `text-card-title` (15px), `font-normal`.
 * - Descrição: `text-label` (12px), `var(--muted-foreground)`.
 * - Botão de retry usa `Button variant="outline" size="sm"` do design system.
 *
 * @example
 * <ErrorState
 *   title="Falha ao carregar transações"
 *   description="Verifique sua conexão e tente novamente."
 *   onRetry={() => refetch()}
 * />
 */
export function ErrorState({
  title = 'Erro ao carregar',
  description = 'Não foi possível carregar os dados.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 py-16 px-4 text-center"
    >
      <AlertTriangle
        size={32}
        aria-hidden
        style={{ color: 'var(--status-error)' }}
      />

      <div className="space-y-1 max-w-xs">
        <p className="text-card-title font-normal" style={{ color: 'var(--foreground)' }}>
          {title}
        </p>
        <p className="text-label" style={{ color: 'var(--muted-foreground)' }}>
          {description}
        </p>
      </div>

      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          Tentar novamente
        </Button>
      )}
    </div>
  )
}
