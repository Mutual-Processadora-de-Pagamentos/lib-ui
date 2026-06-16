/**
 * Dialog — wrapper Radix UI para diálogos modais do protótipo.
 * Segue o padrão dos demais primitivos da pasta ui/.
 */

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X, type LucideIcon } from 'lucide-react'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

// ── Overlay ────────────────────────────────────────────────────────────────────

export const DialogOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'data-[state=open]:animate-fadeIn',
        className,
      )}
      onPointerDown={(e) => e.stopPropagation()}
      {...props}
    />
  )
})

// ── Content ────────────────────────────────────────────────────────────────────

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    /** Oculta o botão X automático no canto superior */
    hideClose?: boolean
  }
>(function DialogContent({ className, children, hideClose = false, ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'w-full max-w-lg',
          'rounded-[14px] shadow-xl outline-none overflow-hidden',
          'bg-[color:var(--card)] text-[color:var(--card-foreground)]',
          'border border-[color:var(--border)]',
          'data-[state=open]:animate-fadeIn',
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-lg p-1.5 opacity-70 transition-opacity hover:opacity-100"
            style={{ color: 'var(--muted-foreground)' }}
            aria-label="Fechar"
          >
            <X size={16} aria-hidden />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})

// ── Header / Footer ────────────────────────────────────────────────────────────

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-6 h-14 shrink-0',
        'border-b border-[color:var(--border)]',
        className,
      )}
      {...props}
    />
  )
}

/**
 * DialogHeaderRich — header de modal padrão com ícone solto + título + descrição
 * e borda inferior. Encapsula o layout que os modais ricos do protótipo montavam
 * inline (px-6 pt-6 + ícone + DialogTitle + DialogDescription) — agora com a
 * divisória `border-b` que faltava. O ícone fica solto (cor `--section-icon-color`),
 * sem fundo/rounded atrás. Para o header minimalista de uma linha, use `DialogHeader`.
 */
export function DialogHeaderRich({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon
  title: ReactNode
  description?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 px-6 pt-6 pb-4',
        'border-b border-[color:var(--border)]',
        className,
      )}
    >
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
        {description && (
          <DialogDescription className="text-xs font-normal mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            {description}
          </DialogDescription>
        )}
      </div>
    </div>
  )
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 px-6 py-4 shrink-0',
        // Barra inferior em cinza destacado (--canvas off-white) p/ separar do corpo
        // branco do modal — padrão de modal do DS (evita o look "tudo branco").
        'border-t border-[color:var(--border)] bg-[color:var(--canvas)]',
        className,
      )}
      {...props}
    />
  )
}
