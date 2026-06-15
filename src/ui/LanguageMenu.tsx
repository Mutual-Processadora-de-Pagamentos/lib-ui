import { Check } from 'lucide-react'
import { IconButton } from './IconButton'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './DropdownMenu'
import { cn } from '../lib/cn'

export type SupportedLanguage = 'pt-BR' | 'en-US' | 'es-ES' | 'zh-CN'

export interface LanguageOption {
  code: SupportedLanguage
  label: string
  nativeName: string
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'pt-BR', label: 'Português (BR)', nativeName: 'Português (BR)' },
  { code: 'en-US', label: 'English', nativeName: 'English' },
  { code: 'es-ES', label: 'Español', nativeName: 'Español' },
  { code: 'zh-CN', label: '中文', nativeName: '中文 (简体)' },
]

/**
 * Bandeira em SVG inline — cores de marca dos países (exceção legítima ao DS,
 * como os ícones de cripto). Não usar tokens aqui: são cores oficiais de bandeira.
 */
export function FlagIcon({ code, className = 'w-full h-full block' }: { code: SupportedLanguage; className?: string }) {
  switch (code) {
    case 'pt-BR':
      return (
        <svg className={className} viewBox="0 0 24 16" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="24" height="16" rx="2" fill="#009C3B" />
          <polygon points="12,2 22,8 12,14 2,8" fill="#FFDF00" />
          <circle cx="12" cy="8" r="4" fill="#002776" />
        </svg>
      )
    case 'en-US':
      return (
        <svg className={className} viewBox="0 0 24 16" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="24" height="16" rx="2" fill="#B22234" />
          {[...Array(6)].map((_, idx) => (
            <rect key={idx} y={idx * 2 + 1} width="24" height="1" fill="#FFFFFF" />
          ))}
          <rect width="10" height="7" rx="1" fill="#3C3B6E" />
        </svg>
      )
    case 'es-ES':
      return (
        <svg className={className} viewBox="0 0 24 16" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="24" height="16" rx="2" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
        </svg>
      )
    case 'zh-CN':
      return (
        <svg className={className} viewBox="0 0 24 16" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <rect width="24" height="16" rx="2" fill="#DE2910" />
          <g transform="translate(3, 2.5)">
            <polygon points="2,0 2.618,1.902 0.618,0.618 3.382,0.618 1.382,1.902" fill="#FFDE00" />
            <polygon points="5,0.5 5.309,1.213 4.809,0.809 5.691,0.809 5.191,1.213" fill="#FFDE00" />
            <polygon points="6,2 6.309,2.713 5.809,2.309 6.691,2.309 6.191,2.713" fill="#FFDE00" transform="rotate(25 6 2.5)" />
            <polygon points="6,4 6.309,4.713 5.809,4.309 6.691,4.309 6.191,4.713" fill="#FFDE00" transform="rotate(45 6 4.5)" />
            <polygon points="5,5.5 5.309,6.213 4.809,5.809 5.691,5.809 5.191,6.213" fill="#FFDE00" transform="rotate(70 5 6)" />
          </g>
        </svg>
      )
    default:
      return null
  }
}

export interface LanguageMenuProps {
  value: SupportedLanguage
  onChange: (code: SupportedLanguage) => void
  options?: LanguageOption[]
  /** aria-label do gatilho. */
  label?: string
}

/**
 * Seletor de idioma compartilhado (controlado). O app dono guarda o estado de
 * idioma (ex.: LanguageContext) e passa `value`/`onChange`.
 */
export function LanguageMenu({
  value,
  onChange,
  options = LANGUAGE_OPTIONS,
  label = 'Selecionar idioma',
}: LanguageMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton size="md" aria-label={label}>
          <span className="w-6 h-4 rounded-[3px] overflow-hidden shrink-0 ring-1 ring-[color:var(--border)] bg-[color:var(--card)]">
            <FlagIcon code={value} />
          </span>
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {options.map((option) => {
          const isActive = option.code === value
          return (
            <DropdownMenuItem
              key={option.code}
              onSelect={() => onChange(option.code)}
              className={cn('justify-between', isActive && 'text-[color:var(--primary)]')}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-6 h-4 rounded-[3px] overflow-hidden shrink-0 ring-1 ring-[color:var(--border)] bg-[color:var(--card)]">
                  <FlagIcon code={option.code} />
                </span>
                {option.nativeName}
              </span>
              {isActive && <Check size={14} strokeWidth={2} className="shrink-0 text-[color:var(--primary)]" aria-hidden />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
