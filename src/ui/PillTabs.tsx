/**
 * PillTabs — navegação por pills entre telas relacionadas.
 *
 * ## Modo rota (default)
 * Passe `items: PillTabItem[]` com `href` em cada item. A pill ativa é detectada
 * pela rota atual via `useLocation` (match exato ou por prefixo com `matchPrefix`).
 * Cada pill renderiza um `<Link>` com `aria-current="page"`.
 *
 * ## Modo controlado por state
 * Passe `items: PillTabItemControlled[]` com `id` em cada item, mais `value` e
 * `onValueChange`. A pill ativa é `item.id === value`; cada pill renderiza um
 * `<button role="tab">` dentro de um container `role="tablist"`.
 *
 * O visual é idêntico nos dois modos. Tokens-only.
 */

import { Link, useLocation } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

// --- tipos -------------------------------------------------------------------

export interface PillTabItem {
  label: string
  href: string
  icon?: LucideIcon
  /** Quando true, a pill fica ativa também em sub-rotas de `href`. */
  matchPrefix?: boolean
}

export interface PillTabItemControlled {
  label: string
  id: string
  icon?: LucideIcon
}

/** Props compartilhadas entre os dois modos. */
interface PillTabsBase {
  className?: string
  'aria-label'?: string
}

interface PillTabsRouteProps extends PillTabsBase {
  items: PillTabItem[]
  value?: never
  onValueChange?: never
}

interface PillTabsControlledProps extends PillTabsBase {
  items: PillTabItemControlled[]
  value: string
  onValueChange: (id: string) => void
}

export type PillTabsProps = PillTabsRouteProps | PillTabsControlledProps

// --- classes visuais compartilhadas ------------------------------------------

const RAIL_CLASS = cn(
  'inline-flex items-center gap-1 rounded-[10px] p-1',
  'bg-[color:var(--background)] border border-[color:var(--border)]',
)

function pillClass(active: boolean) {
  return cn(
    'inline-flex items-center gap-1.5 rounded-[7px] px-3 py-1.5',
    'text-[13px] font-normal whitespace-nowrap transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]',
    active
      ? 'bg-[color:var(--primary)] text-[color:var(--primary-foreground)]'
      : 'text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]',
  )
}

// --- componente --------------------------------------------------------------

export function PillTabs(props: PillTabsProps) {
  const { className, 'aria-label': ariaLabel = 'Navegação' } = props

  // Modo controlado — sem useLocation
  if (props.value !== undefined) {
    const { items, value, onValueChange } = props
    return (
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={cn(RAIL_CLASS, className)}
      >
        {items.map((item) => {
          const Icon = item.icon
          const active = item.id === value
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onValueChange(item.id)}
              className={pillClass(active)}
            >
              {Icon && <Icon size={15} strokeWidth={1.75} aria-hidden />}
              {item.label}
            </button>
          )
        })}
      </div>
    )
  }

  // Modo rota (default)
  return <PillTabsRoute {...props} ariaLabel={ariaLabel} />
}

// Componente interno para isolar o hook useLocation no modo rota
function PillTabsRoute({
  items,
  className,
  ariaLabel,
}: {
  items: PillTabItem[]
  className?: string
  ariaLabel: string
}) {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(RAIL_CLASS, className)}
    >
      {items.map((item) => {
        const Icon = item.icon
        const active = item.matchPrefix
          ? pathname === item.href || pathname.startsWith(item.href + '/')
          : pathname === item.href
        return (
          <Link
            key={item.href}
            to={item.href}
            aria-current={active ? 'page' : undefined}
            className={pillClass(active)}
          >
            {Icon && <Icon size={15} strokeWidth={1.75} aria-hidden />}
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
