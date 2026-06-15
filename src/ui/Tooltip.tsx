import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * Provider único. Coloque no topo da árvore autenticada (PrivateLayout) para
 * permitir reuso sem re-instanciar delays.
 */
export const TooltipProvider = TooltipPrimitive.Provider
export const TooltipRoot = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 8, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 rounded-md px-2.5 py-1.5 text-[12px] font-normal',
          'bg-[color:var(--popover)] text-[color:var(--popover-foreground)]',
          'border border-[color:var(--border)] shadow-md',
          'data-[state=delayed-open]:animate-fadeIn',
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
})

/**
 * Atalho: <Tooltip label="Texto">{trigger}</Tooltip>
 */
export interface TooltipProps {
  label: ReactNode
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  delayDuration?: number
  disabled?: boolean
}

export function Tooltip({
  label,
  children,
  side = 'right',
  delayDuration = 250,
  disabled = false,
}: TooltipProps) {
  if (disabled) return <>{children}</>
  return (
    <TooltipRoot delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{label}</TooltipContent>
    </TooltipRoot>
  )
}
