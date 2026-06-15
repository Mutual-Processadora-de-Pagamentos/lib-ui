import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'

type IconButtonSize = 'sm' | 'md'
type IconButtonVariant = 'ghost' | 'subtle'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize
  variant?: IconButtonVariant
  'aria-label': string
  children: ReactNode
}

const BASE =
  'inline-flex items-center justify-center rounded-md transition-colors shrink-0 ' +
  'text-[color:var(--muted-foreground)] ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-[color:var(--primary)] focus-visible:ring-offset-[color:var(--background)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed'

const SIZE: Record<IconButtonSize, string> = {
  sm: 'h-7 w-7',   // 28px — padrão tabelas densas (WCAG 2.5.8 AA ≥ 24px)
  md: 'h-9 w-9',   // 36px
}

const VARIANT: Record<IconButtonVariant, string> = {
  ghost:  'hover:bg-[color:var(--muted)]',
  subtle: 'hover:bg-[color:var(--accent)]',
}

/**
 * Botão icon-only reutilizável.
 *
 * - `size="sm"` (28 px) → tabelas densas; `size="md"` (36 px) → uso geral.
 * - `aria-label` é obrigatório no tipo — garante acessibilidade.
 * - `forwardRef` obrigatório para funcionar com `<DropdownMenuTrigger asChild>` do Radix.
 * - Ícone interno deve ter `aria-hidden`.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { size = 'sm', variant = 'ghost', className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(BASE, SIZE[size], VARIANT[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
})

IconButton.displayName = 'IconButton'
