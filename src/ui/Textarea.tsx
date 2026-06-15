import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

/**
 * Textarea — campo de texto multilinha no padrão de formulário do protótipo
 * (mesma família visual de Select/FilterBar: `rounded-[10px]`, borda `--border`,
 * fundo `--input`). Use em modais de justificativa, observações, descrições.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, className, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full rounded-[10px] border bg-[color:var(--input)] px-3 py-2.5 text-sm',
        'border-[color:var(--border)] text-[color:var(--foreground)]',
        'placeholder:text-[color:var(--muted-foreground)]',
        'transition-colors duration-150 resize-none',
        'focus:outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--ring)]/20',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        invalid &&
          'border-[color:var(--destructive)] focus:border-[color:var(--destructive)] focus:ring-[color:var(--destructive)]/20',
        className,
      )}
      {...rest}
    />
  )
})
