import { forwardRef, type LabelHTMLAttributes } from 'react'
import { cn } from '../lib/cn'

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  function Label({ className, ...rest }, ref) {
    return (
      <label
        ref={ref}
        className={cn(
          'text-[13px] font-normal text-[color:var(--label-foreground)] tracking-[-0.1px]',
          className,
        )}
        {...rest}
      />
    )
  },
)
