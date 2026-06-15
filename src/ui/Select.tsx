/**
 * Select — wrapper shadcn-like sobre `@radix-ui/react-select`.
 *
 * G3 (AJUSTES-GLOBAIS.md): substitui `<select>` HTML nativo, que abre o menu
 * do SO (Windows/macOS) com visual fora do padrão. Este componente:
 *   - reaproveita TODOS os tokens (`var(--*)`) do `global.css`
 *   - usa as mesmas classes do `inputClass` padrão no trigger
 *   - usa o mesmo `rounded-xl + bg-popover + shadow-xl` do DropdownMenu no content
 *   - usa o mesmo `data-[highlighted]:bg-accent` dos itens do DropdownMenu
 *   - chevron rotacionável (`data-[state=open]:rotate-180`)
 *
 * API (espelha shadcn/ui):
 *
 *   <Select value={tipoChave} onValueChange={setTipoChave}>
 *     <SelectTrigger><SelectValue placeholder="Selecione o tipo" /></SelectTrigger>
 *     <SelectContent>
 *       <SelectItem value="CPF">CPF</SelectItem>
 *       <SelectItem value="CNPJ">CNPJ</SelectItem>
 *     </SelectContent>
 *   </Select>
 */

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { cn } from '../lib/cn'

// ── Root / Value / Group / Label / Separator ─────────────────────────────────

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectGroup = SelectPrimitive.Group

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        'px-2.5 py-1.5 text-[11px] font-normal uppercase tracking-[0.06em]',
        'text-[color:var(--muted-foreground)]',
        className,
      )}
      {...props}
    />
  )
})

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn('my-1 h-px bg-[color:var(--border)]', className)}
      {...props}
    />
  )
})

// ── Trigger ──────────────────────────────────────────────────────────────────

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(function SelectTrigger({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        // Mesmas classes do inputClass padrão usado em FilterBar/Input.
        'flex h-10 w-full items-center justify-between gap-2 rounded-[10px] border bg-[color:var(--input)] px-3 text-sm',
        'border-[color:var(--border)] text-[color:var(--foreground)]',
        'transition-colors duration-150',
        'focus:outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--ring)]/20',
        'data-[placeholder]:text-[color:var(--muted-foreground)]',
        'disabled:opacity-50 disabled:pointer-events-none',
        // Mantém alinhamento à esquerda do span de valor.
        '[&>span:first-child]:flex [&>span:first-child]:items-center [&>span:first-child]:gap-2 [&>span:first-child]:min-w-0 [&>span:first-child]:truncate',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          size={16}
          className="shrink-0 text-[color:var(--muted-foreground)] transition-transform data-[state=open]:rotate-180"
          aria-hidden
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})

// ── Content ──────────────────────────────────────────────────────────────────

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(function SelectContent({ className, children, position = 'popper', sideOffset = 6, ...props }, ref) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[var(--radix-select-trigger-width)] max-h-[--radix-select-content-available-height]',
          'overflow-hidden rounded-xl p-1.5 outline-none',
          'bg-[color:var(--popover)] text-[color:var(--popover-foreground)]',
          'border border-[color:var(--border)] shadow-xl',
          'data-[state=open]:animate-fadeIn',
          // Posicionamento popper: garante que a largura do trigger seja respeitada.
          position === 'popper' &&
            'data-[side=bottom]:translate-y-0 data-[side=top]:-translate-y-0',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-0">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

// ── Item ─────────────────────────────────────────────────────────────────────

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-lg py-2 pl-3 pr-8 text-sm outline-none',
        'text-[color:var(--popover-foreground)]',
        'data-[highlighted]:bg-[color:var(--accent)] data-[highlighted]:text-[color:var(--accent-foreground)]',
        'data-[state=checked]:font-normal',
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check size={14} className="text-[color:var(--primary)]" aria-hidden />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
})
