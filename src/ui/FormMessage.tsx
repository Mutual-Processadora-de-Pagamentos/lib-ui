import type { HTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: 'error' | 'hint'
}

export function FormMessage({ tone = 'error', className, children, ...rest }: FormMessageProps) {
  if (!children) return null
  return (
    <p
      role={tone === 'error' ? 'alert' : undefined}
      className={cn(
        'text-xs leading-4 mt-1',
        tone === 'error'
          ? 'text-[color:var(--destructive)]'
          : 'text-[color:var(--muted-foreground)]',
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}
