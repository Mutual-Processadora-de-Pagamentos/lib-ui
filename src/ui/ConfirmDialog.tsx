/**
 * ConfirmDialog — diálogo de confirmação pronto (título + mensagem + par de ações).
 *
 * Encapsula Dialog + header (ícone solto + título + descrição) + footer com os
 * botões Cancelar/Confirmar. Quando NÃO há `children` (confirmação simples), o
 * header e o footer ficam encostados — sem a faixa morta que sobraria entre as
 * duas divisórias (`border-b` do header + `border-t` do footer) de um body vazio.
 * Quando há `children`, eles entram como body entre header e footer.
 */

import { AlertCircle, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Button, type ButtonProps } from './Button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './Dialog'

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  title: ReactNode
  message?: ReactNode
  confirmText?: string
  cancelText?: string
  /** Variante do botão de confirmação. Default `primary` (navy). */
  confirmVariant?: ButtonProps['variant']
  /** Ícone solto do header. Default `AlertCircle`. */
  icon?: LucideIcon
  /** Largura máxima do diálogo. Default `max-w-md`. */
  maxWidth?: string
  onConfirm: () => void
  onCancel?: () => void
  loading?: boolean
  /** Conteúdo opcional do corpo. Quando ausente, header e footer ficam encostados. */
  children?: ReactNode
  className?: string
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant = 'primary',
  icon: Icon = AlertCircle,
  maxWidth = 'max-w-md',
  onConfirm,
  onCancel,
  loading = false,
  children,
  className,
}: ConfirmDialogProps) {
  const hasBody = Boolean(children)
  const handleCancel = onCancel ?? (() => onOpenChange?.(false))

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && loading) return
        onOpenChange?.(next)
      }}
    >
      <DialogContent
        className={cn(maxWidth, 'p-0 overflow-hidden bg-[color:var(--canvas)]', className)}
        hideClose={loading}
        onInteractOutside={(e) => loading && e.preventDefault()}
        onEscapeKeyDown={(e) => loading && e.preventDefault()}
      >
        {/* Header — ícone solto + título + descrição. A divisória inferior
            (border-b) é a ÚNICA linha quando não há body: separa o texto dos
            botões sem deixar faixa morta. Com body, divide header do corpo. */}
        <div className="flex items-start gap-3 px-6 pt-6 pb-4 border-b border-[color:var(--border)]">
          <Icon
            size={22}
            strokeWidth={1.75}
            aria-hidden
            className="shrink-0 mt-0.5"
            style={{ color: 'var(--section-icon-color)' }}
          />
          <div>
            <DialogTitle className="text-base font-normal leading-tight" style={{ color: 'var(--foreground)' }}>
              {title}
            </DialogTitle>
            {message && (
              <DialogDescription className="text-xs font-normal mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                {message}
              </DialogDescription>
            )}
          </div>
        </div>

        {hasBody && (
          <div className="px-6 py-5 border-b border-[color:var(--border)]">{children}</div>
        )}

        {/* Footer — par 50/50 ocupando toda a largura. A divisória já vem do
            elemento acima (header ou body), então o footer não repete border-t
            — evita a dupla-linha/faixa morta. */}
        <div className="flex items-center gap-2 px-6 py-3 shrink-0 bg-[color:var(--canvas)] [&>*]:flex-1">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button type="button" variant={confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
