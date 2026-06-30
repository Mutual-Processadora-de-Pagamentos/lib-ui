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
        'fixed inset-0 z-[200] bg-[color-mix(in_srgb,var(--scrim)_50%,transparent)] backdrop-blur-sm',
        'data-[state=open]:animate-fadeIn',
        className,
      )}
      onPointerDown={(e) => e.stopPropagation()}
      {...props}
    />
  )
})

// ── Content ────────────────────────────────────────────────────────────────────

/** Posição do conteúdo. `center` = modal centrado (default). `right`/`left` =
 * drawer lateral de altura cheia. `bottom` = bottom-sheet (mobile). */
export type DialogSide = 'center' | 'right' | 'left' | 'bottom'

const SIDE_CLASSES: Record<DialogSide, string> = {
  center:
    'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-[14px] border data-[state=open]:animate-fadeIn',
  right:
    'inset-y-0 right-0 h-full w-full max-w-md rounded-l-[14px] border-l data-[state=open]:animate-slideInRight',
  left:
    'inset-y-0 left-0 h-full w-full max-w-md rounded-r-[14px] border-r data-[state=open]:animate-slideInLeft',
  bottom:
    'inset-x-0 bottom-0 w-full max-h-[90vh] rounded-t-[14px] border-t data-[state=open]:animate-slideInBottom',
}

export const DialogContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    /** Oculta o botão X automático no canto superior */
    hideClose?: boolean
    /** Posição: `center` (modal, default), `right`/`left` (drawer lateral), `bottom` (sheet). */
    side?: DialogSide
  }
>(function DialogContent({ className, children, hideClose = false, side = 'center', ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-[200]',
          'shadow-xl outline-none overflow-hidden',
          'bg-[color:var(--card)] text-[color:var(--card-foreground)]',
          'border-[color:var(--border)]',
          SIDE_CLASSES[side],
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

/**
 * DialogFooter — barra inferior do modal em cinza (--canvas) com border-t.
 *
 * `align="end"` (default): botões à direita, largura natural, gap-3 — padrão de
 * formulário/confirmação.
 * `align="split"`: botões 50/50 ocupando toda a largura (cada um `flex-1`), gap
 * menor — replica a antiga classe global `.modal-footer` (par Cancelar/Confirmar
 * em largura igual). Os filhos diretos viram `flex-1` automaticamente.
 */
export function DialogFooter({
  className,
  align = 'end',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: 'end' | 'split' }) {
  return (
    <div
      className={cn(
        'flex items-center shrink-0 border-t border-[color:var(--border)] bg-[color:var(--canvas)]',
        align === 'split'
          ? 'gap-2 px-6 py-3 [&>*]:flex-1'
          : 'justify-end gap-3 px-6 py-4',
        className,
      )}
      {...props}
    />
  )
}
