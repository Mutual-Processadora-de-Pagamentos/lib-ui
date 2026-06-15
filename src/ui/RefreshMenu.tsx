import { Check, RefreshCw } from 'lucide-react'
import { IconButton } from './IconButton'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './DropdownMenu'
import { cn } from '../lib/cn'

interface AutoRefreshOption {
  label: string
  ms: number
}

const AUTO_REFRESH_OPTIONS: AutoRefreshOption[] = [
  { label: '1 minuto', ms: 60_000 },
  { label: '2 minutos', ms: 120_000 },
  { label: '5 minutos', ms: 300_000 },
  { label: '10 minutos', ms: 600_000 },
  { label: '15 minutos', ms: 900_000 },
  { label: '1 hora', ms: 3_600_000 },
  { label: '2 horas', ms: 7_200_000 },
  { label: '5 horas', ms: 18_000_000 },
]

export interface RefreshMenuProps {
  /** Dispara um refresh manual imediato. */
  onRefresh: () => void
  /** Indica refresh em andamento (gira o ícone). */
  isRefreshing?: boolean
  /** Intervalo de auto-refresh ativo em ms, ou null se desativado. */
  autoRefreshMs?: number | null
  /** Define/limpa o intervalo de auto-refresh. O app é dono do `setInterval`. */
  onAutoRefreshChange?: (ms: number | null) => void
  label?: string
}

/**
 * Menu de atualização compartilhado (controlado). Apenas dispara callbacks —
 * o app dono executa o refetch e mantém o `setInterval` do auto-refresh.
 */
export function RefreshMenu({
  onRefresh,
  isRefreshing = false,
  autoRefreshMs = null,
  onAutoRefreshChange,
  label = 'Atualizar',
}: RefreshMenuProps) {
  const isAutoActive = autoRefreshMs != null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          size="md"
          aria-label={label}
          className={cn(isAutoActive && 'text-[color:var(--primary)]')}
        >
          <RefreshCw
            size={16}
            strokeWidth={1.75}
            aria-hidden
            className={isRefreshing ? 'animate-spin' : undefined}
          />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Atualizar</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => onRefresh()}>
          <RefreshCw size={14} strokeWidth={1.75} aria-hidden className="text-[color:var(--muted-foreground)]" />
          Atualizar agora
        </DropdownMenuItem>

        {onAutoRefreshChange && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Auto-atualizar</DropdownMenuLabel>
            {AUTO_REFRESH_OPTIONS.map(({ label: optLabel, ms }) => {
              const isActive = autoRefreshMs === ms
              return (
                <DropdownMenuItem
                  key={ms}
                  onSelect={() => onAutoRefreshChange(ms)}
                  className={cn('justify-between', isActive && 'text-[color:var(--primary)]')}
                >
                  {optLabel}
                  {isActive && <Check size={14} strokeWidth={2} className="shrink-0 text-[color:var(--primary)]" aria-hidden />}
                </DropdownMenuItem>
              )
            })}
            {isAutoActive && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => onAutoRefreshChange(null)}
                  className="text-[color:var(--status-error)] data-[highlighted]:text-[color:var(--status-error)]"
                >
                  Desativar auto-atualizar
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
