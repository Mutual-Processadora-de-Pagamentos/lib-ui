import { Check, Type } from 'lucide-react'
import { IconButton } from './IconButton'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from './DropdownMenu'
import { cn } from '../lib/cn'

export type FontSize = 'small' | 'normal' | 'large'

interface FontSizeOption {
  id: FontSize
  label: string
  textClass: string
}

const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { id: 'small', label: 'Tamanho pequeno', textClass: 'text-[11px]' },
  { id: 'normal', label: 'Tamanho médio', textClass: 'text-[15px]' },
  { id: 'large', label: 'Tamanho grande', textClass: 'text-[16px]' },
]

export interface FontSizeMenuProps {
  value: FontSize
  onChange: (size: FontSize) => void
  label?: string
}

/**
 * Seletor de tamanho de fonte compartilhado (controlado). O app aplica o efeito
 * visual (ex.: atributo `data-font-size` no `<html>`) a partir do `value`.
 */
export function FontSizeMenu({ value, onChange, label = 'Tamanho da fonte' }: FontSizeMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          size="md"
          aria-label={label}
          className={cn(value !== 'normal' && 'text-[color:var(--primary)]')}
        >
          <Type size={16} strokeWidth={1.75} aria-hidden />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tamanho da fonte</DropdownMenuLabel>
        {FONT_SIZE_OPTIONS.map(({ id, label: optLabel, textClass }) => {
          const isActive = value === id
          return (
            <DropdownMenuItem
              key={id}
              onSelect={() => onChange(id)}
              className="justify-between"
            >
              <span className={cn(textClass, isActive && 'text-[color:var(--primary)]')}>{optLabel}</span>
              {isActive && <Check size={14} strokeWidth={2} className="shrink-0 text-[color:var(--primary)]" aria-hidden />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
