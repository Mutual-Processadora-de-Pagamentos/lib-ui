import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  invalid?: boolean
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { leadingIcon, trailingIcon, invalid = false, className, containerClassName, ...rest },
  ref,
) {
  return (
    <div className={cn('relative w-full', containerClassName)}>
      {leadingIcon && (
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted-foreground)]"
          aria-hidden
        >
          {leadingIcon}
        </span>
      )}
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          'w-full h-[50px] rounded-2xl text-[15px] text-[color:var(--foreground)]',
          'bg-[color:var(--muted)] dark:bg-white/[0.04]',
          'border border-[color:var(--border)] dark:border-white/[0.08]',
          'placeholder:text-[color:var(--muted-foreground)]/70',
          'outline-none',
          'focus:bg-[color:var(--background)] focus:border-[color:var(--primary)]/40 focus:ring-2 focus:ring-[color:var(--primary)]/20',
          'transition-all duration-150',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          leadingIcon ? 'pl-10' : 'pl-4',
          trailingIcon ? 'pr-12' : 'pr-4',
          invalid && 'border-[color:var(--destructive)]/50 bg-[color:var(--destructive)]/5 focus:border-[color:var(--destructive)] focus:ring-[color:var(--destructive)]/20',
          className,
        )}
        {...rest}
      />
      {trailingIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {trailingIcon}
        </span>
      )}
    </div>
  )
})
