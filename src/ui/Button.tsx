import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
type Size = 'sm' | 'md' | 'lg'

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-[color:var(--primary)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--primary-hover)] focus-visible:ring-[color:var(--primary)]',
  secondary:
    'bg-[color:var(--muted)] text-[color:var(--foreground)] hover:bg-[color:var(--accent)] focus-visible:ring-[color:var(--primary)]',
  ghost:
    'bg-transparent text-[color:var(--foreground)] hover:bg-[color:var(--muted)] focus-visible:ring-[color:var(--primary)]',
  destructive:
    'bg-[color:var(--destructive)] text-[color:var(--destructive-foreground)] hover:opacity-90 focus-visible:ring-[color:var(--destructive)]',
  outline:
    'bg-transparent text-[color:var(--foreground)] border border-[color:var(--border)] hover:bg-[color:var(--muted)] focus-visible:ring-[color:var(--primary)]',
  success:
    'bg-[color:var(--status-success)] text-white hover:opacity-90 focus-visible:ring-[color:var(--status-success)]',
  warning:
    'bg-[color:var(--status-warning)] text-white hover:opacity-90 focus-visible:ring-[color:var(--status-warning)]',
  info:
    'bg-[color:var(--status-info)] text-white hover:opacity-90 focus-visible:ring-[color:var(--status-info)]',
}

const SIZE: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leadingIcon,
    trailingIcon,
    fullWidth = false,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-normal tracking-tight transition-all',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANT[variant],
        SIZE[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  )
})
