/**
 * DataTable — tabela genérica e paginada implementada com React puro.
 * Sem @tanstack/react-table. Estilos exclusivamente via tokens CSS (var(--*)).
 *
 * Header integrado opcional (controlado via prop `title`):
 *  - Toggle de visibilidade de colunas (Columns3) via DropdownMenu
 *  - Toggle ocultar/mostrar taxas (FeeIcon)
 *  - Auto-refresh (Timer + intervalo)
 *
 * Quando `title` não é informado, o header NÃO é renderizado — garante
 * compatibilidade reversa com páginas que ainda renderizam header manual.
 */

import { Fragment, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  Timer,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '../ui/Tooltip'
import { FeeIcon } from '../ui/FeeIcon'
import { cn } from '../lib/cn'

// ── Tipos públicos ─────────────────────────────────────────────────────────────

export interface Column<T> {
  key: string
  header: string
  /**
   * Conteúdo customizado do cabeçalho (ex.: header com ícone + Tooltip). Quando
   * presente, é renderizado no lugar do texto `header`. O `header` (string)
   * continua sendo usado como rótulo no toggle de colunas e em `aria-label`.
   */
  headerNode?: ReactNode
  width?: string
  align?: 'left' | 'right' | 'center'
  cell: (row: T, index: number) => ReactNode
  /**
   * Como renderizar essa coluna QUANDO a linha for uma linha de TAXA
   * (intercalada logo abaixo da transação pai pelo DataTable via
   * `getFeeAmount`). Se omitido, o DataTable mostra "—" em muted-foreground
   * como fallback.
   *
   * - `row` é a transação pai (não há "objeto de taxa" — a taxa é uma
   *   projeção da linha pai).
   * - `feeAmount` é o valor numérico retornado por `getFeeAmount(row)`.
   */
  feeCell?: (row: T, feeAmount: number) => ReactNode
  /**
   * @deprecated Use `getFeeAmount` no DataTable para renderizar a taxa como
   * linha independente logo abaixo da transação. Mantido apenas por
   * compatibilidade reversa.
   */
  isFee?: boolean
  /**
   * G2 (AJUSTES-GLOBAIS.md): por padrão TODAS as células e o header recebem
   * `whitespace-nowrap` — quando o conteúdo somado excede o container, o
   * wrapper `overflow-x-auto` gera scroll horizontal e nunca quebra linha.
   *
   * Use `allowWrap: true` apenas em colunas onde a quebra é desejada (raro —
   * ex.: descrição multi-linha, observações longas). Quando `true`, a célula
   * troca para `whitespace-normal break-words` e o header também relaxa.
   *
   * Default: `false` (= `whitespace-nowrap`).
   */
  allowWrap?: boolean
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  /**
   * Quando definido, clicar numa linha EXPANDE um painel inline (full-width,
   * abaixo da linha) com o conteúdo retornado — em vez de disparar `onRowClick`.
   * Apenas uma linha fica expandida por vez (toggle). Requer `getRowId` para
   * rastrear a linha aberta de forma estável.
   */
  renderRowDetail?: (row: T) => ReactNode
  /** Identificador estável da linha (necessário com `renderRowDetail`). */
  getRowId?: (row: T) => string
  emptyMessage?: string
  pageSize?: number
  /** Quando definido, renderiza o header integrado acima da tabela. */
  title?: string
  /** Contador opcional exibido à direita do header (ex.: "4 registros"). */
  count?: string
  /** Callback disparado pelo timer de auto-refresh. */
  onRefresh?: () => void
  /** Mostra o botão de toggle de colunas (default: true). */
  enableColumnToggle?: boolean
  /**
   * Permite mostrar o botão de ocultar/mostrar taxas (default: true).
   * O botão só renderiza de fato quando `getFeeAmount` é fornecido. Tabelas
   * sem dado de taxa nunca exibem o controle, independentemente desta prop.
   */
  enableFeesToggle?: boolean
  /** Mostra o controle de auto-refresh (default: true). */
  enableAutoRefresh?: boolean
  /** Notifica o consumidor quando o usuário alterna o toggle de taxas. */
  onShowFeesChange?: (showFees: boolean) => void
  /**
   * Função opcional que extrai a taxa de uma linha. Quando retorna > 0,
   * o DataTable renderiza uma **linha independente** logo abaixo da
   * transação pai — visualmente igual a qualquer outra linha (mesmo
   * padding, border-bottom, hover, cursor-pointer). Cada coluna é
   * renderizada via `col.feeCell?.(row, feeAmount)` ou cai no fallback
   * `"—"` em muted-foreground.
   *
   * A linha de taxa representa a cobrança da taxa como se fosse uma
   * "movimentação separada" no fluxo — não é uma sub-linha colada.
   */
  getFeeAmount?: (row: T) => number
  /**
   * @deprecated Não é mais usado. Antes controlava o alinhamento da
   * antiga sub-linha de taxa; agora cada coluna define seu próprio
   * `feeCell`. Mantido para compatibilidade — ignorado pelo componente.
   */
  feeAlignToColumn?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function alignClass(align?: 'left' | 'right' | 'center'): string {
  if (align === 'right') return 'text-right'
  if (align === 'center') return 'text-center'
  return 'text-left'
}

// ── Auto-refresh: opções de intervalo ─────────────────────────────────────────

const REFRESH_INTERVALS: { value: string; label: string; ms: number | null }[] = [
  { value: 'off', label: 'Off', ms: null },
  { value: '10s', label: '10s', ms: 10_000 },
  { value: '30s', label: '30s', ms: 30_000 },
  { value: '60s', label: '60s', ms: 60_000 },
  { value: '5min', label: '5min', ms: 5 * 60_000 },
]

// ── Componente ─────────────────────────────────────────────────────────────────

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  renderRowDetail,
  getRowId,
  emptyMessage = 'Nenhum registro encontrado.',
  pageSize: initialPageSize = 20,
  title,
  count,
  onRefresh,
  enableColumnToggle = true,
  enableFeesToggle = true,
  enableAutoRefresh = true,
  onShowFeesChange,
  getFeeAmount,
  feeAlignToColumn: _feeAlignToColumn,
}: DataTableProps<T>) {
  // `feeAlignToColumn` é mantido por compatibilidade reversa mas não é mais
  // usado — agora cada coluna define seu próprio `feeCell`.
  void _feeAlignToColumn
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(initialPageSize)
  // Linha atualmente expandida (modo `renderRowDetail`). Só uma por vez.
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

  // ── Header state ─────────────────────────────────────────────────────────
  // Visibilidade de colunas — Set com as keys VISÍVEIS (todas no início).
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<Set<string>>(
    () => new Set(columns.map((c) => c.key)),
  )
  const [showFees, setShowFees] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState<string>('10s')
  const [refreshActive, setRefreshActive] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState<number>(0)

  // Reconcilia o set de colunas visíveis se a prop `columns` mudar.
  // - Colunas novas entram VISÍVEIS por default
  // - Chaves removidas saem do set
  // - Colunas já conhecidas preservam o estado anterior (visível/oculta)
  const columnsSignature = useMemo(() => columns.map((c) => c.key).join('|'), [columns])
  const knownKeysRef = useRef<Set<string>>(new Set(columns.map((c) => c.key)))
  useEffect(() => {
    setVisibleColumnKeys((prev) => {
      const next = new Set<string>()
      for (const col of columns) {
        const wasKnown = knownKeysRef.current.has(col.key)
        if (!wasKnown) {
          // Coluna nova → entra visível
          next.add(col.key)
        } else if (prev.has(col.key)) {
          next.add(col.key)
        }
      }
      knownKeysRef.current = new Set(columns.map((c) => c.key))
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnsSignature])

  // Auto-refresh: dispara callback no intervalo escolhido quando ativo
  const onRefreshRef = useRef<typeof onRefresh>(onRefresh)
  useEffect(() => {
    onRefreshRef.current = onRefresh
  }, [onRefresh])

  useEffect(() => {
    if (!refreshActive) {
      setSecondsLeft(0)
      return
    }
    const selected = REFRESH_INTERVALS.find((i) => i.value === refreshInterval)
    if (!selected || selected.ms === null) {
      setSecondsLeft(0)
      return
    }
    const totalSeconds = Math.max(1, Math.round(selected.ms / 1000))
    setSecondsLeft(totalSeconds)
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onRefreshRef.current?.()
          return totalSeconds
        }
        return prev - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [refreshActive, refreshInterval])

  // Colunas efetivamente renderizadas.
  // Regras combinadas:
  //  - precisam estar marcadas como visíveis no toggle de colunas
  //  - se `showFees === false`, qualquer coluna marcada (legado) com
  //    `isFee: true` continua sendo escondida — mantém compatibilidade.
  const effectiveColumns = useMemo(
    () =>
      columns.filter((c) => {
        if (c.isFee && !showFees) return false
        return visibleColumnKeys.has(c.key)
      }),
    [columns, visibleColumnKeys, showFees],
  )

  // ── Paginação ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
  const start = page * pageSize
  const end = Math.min(start + pageSize, data.length)
  const pageData = data.slice(start, end)

  function goTo(p: number) {
    setPage(Math.max(0, Math.min(totalPages - 1, p)))
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPage(0)
  }

  function getPageNumbers(): number[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i)
    const delta = 2
    const left = Math.max(0, page - delta)
    const right = Math.min(totalPages - 1, page + delta)
    return Array.from({ length: right - left + 1 }, (_, i) => left + i)
  }

  // ── Handlers de header ───────────────────────────────────────────────────
  function toggleColumn(key: string) {
    setVisibleColumnKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        // Garante que sempre haja pelo menos uma coluna visível
        if (next.size <= 1) return prev
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  function handleToggleFees() {
    setShowFees((prev) => {
      const next = !prev
      onShowFeesChange?.(next)
      return next
    })
  }

  const selectedInterval =
    REFRESH_INTERVALS.find((i) => i.value === refreshInterval) ?? REFRESH_INTERVALS[1]!
  const intervalIsOff = selectedInterval.ms === null
  const isTimerActive = refreshActive && !intervalIsOff
  const showHeader = Boolean(title) || Boolean(count)

  // Auto-detecção: o botão "Ocultar Taxas" só faz sentido quando há dado de
  // taxa para esconder. Considera tanto a nova API (`getFeeAmount` via
  // sub-linha) quanto colunas legadas com `isFee: true`.
  const hasFeeColumn = useMemo(() => columns.some((c) => c.isFee === true), [columns])
  const hasFeeData = Boolean(getFeeAmount) || hasFeeColumn
  const showFeesToggle = enableFeesToggle && hasFeeData

  // Rótulo do contador: até 99s mostra segundos; acima disso, minutos arredondados pra cima.
  const countdownLabel =
    secondsLeft <= 99 ? `${secondsLeft}` : `${Math.ceil(secondsLeft / 60)}m`
  // Estilo do botão Timer quando ativo: usa token --ring (não --primary) conforme handoff.
  // Sem borda — fica apenas o preenchimento sutil de fundo + cor de texto/ícone.
  const timerActiveStyle: CSSProperties = {
    color: 'var(--ring)',
    backgroundColor: 'color-mix(in srgb, var(--ring) 10%, transparent)',
    border: 'none',
  }
  const intervalActiveStyle: CSSProperties = {
    color: 'var(--ring)',
    backgroundColor: 'color-mix(in srgb, var(--ring) 10%, transparent)',
    border: 'none',
  }
  // Estilo do botão "Ocultar Taxas" quando ativo (= taxas escondidas).
  // Mesma paleta do Timer ativo, sem borda.
  const feesActiveStyle: CSSProperties = {
    color: 'var(--ring)',
    backgroundColor: 'color-mix(in srgb, var(--ring) 10%, transparent)',
    border: 'none',
  }

  return (
    <div className="flex flex-col gap-0">
      {/* ── Header integrado ── */}
      {showHeader && (
        <div className="dt-header">
          <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
            {/* Título à esquerda */}
            <span className="dt-header-title">{title}</span>

            {/* Ações à direita */}
            <div className="flex flex-1 items-center gap-3 md:justify-end">
              {count && <span className="dt-header-count">{count}</span>}
              {/* 1. Toggle Colunas */}
              {enableColumnToggle && (
                <DropdownMenu>
                  <TooltipRoot delayDuration={250}>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label="Configurar colunas visíveis"
                          className="dt-tool-btn"
                        >
                          <Columns3 size={16} aria-hidden />
                        </button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Colunas</TooltipContent>
                  </TooltipRoot>
                  <DropdownMenuContent align="end" className="min-w-[220px]">
                    <DropdownMenuLabel>Colunas visíveis</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {columns.map((col) => {
                      const checked = visibleColumnKeys.has(col.key)
                      const label = col.header.trim() || col.key
                      return (
                        <button
                          key={col.key}
                          type="button"
                          role="menuitemcheckbox"
                          aria-checked={checked}
                          onClick={(e) => {
                            e.preventDefault()
                            toggleColumn(col.key)
                          }}
                          className={cn(
                            'relative flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[13px] font-normal outline-none cursor-pointer text-left',
                            'text-[color:var(--foreground)] hover:bg-[color:var(--accent)] hover:text-[color:var(--accent-foreground)]',
                          )}
                        >
                          <span
                            aria-hidden
                            className="inline-flex shrink-0 items-center justify-center size-4 rounded-[4px] border-2 transition-colors"
                            style={{
                              borderColor: checked ? 'var(--primary)' : 'var(--muted-foreground)',
                              backgroundColor: checked ? 'var(--primary)' : 'transparent',
                              color: checked ? 'var(--primary-foreground)' : 'transparent',
                            }}
                          >
                            {checked && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                                <path
                                  d="M1 4L3.5 6.5L9 1"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <span>{label}</span>
                        </button>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Grupo de ações */}
              <div className="flex items-center gap-2 shrink-0">
                {/* 2. Toggle Taxas — só renderiza se houver coluna com `isFee: true` */}
                {showFeesToggle && (
                  <TooltipRoot delayDuration={250}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={handleToggleFees}
                        aria-pressed={!showFees}
                        aria-label={showFees ? 'Ocultar taxas' : 'Mostrar taxas'}
                        className={cn('dt-tool-btn', 'dt-tool-btn--sm')}
                        style={!showFees ? feesActiveStyle : undefined}
                      >
                        <FeeIcon size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {showFees ? 'Ocultar taxas' : 'Mostrar taxas'}
                    </TooltipContent>
                  </TooltipRoot>
                )}

                {/* 3. Auto-refresh: Timer + Intervalo */}
                {enableAutoRefresh && (
                  <div className="dt-tool-group">
                    <TooltipRoot delayDuration={250}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setRefreshActive((p) => !p)}
                          aria-pressed={isTimerActive}
                          aria-label={
                            isTimerActive
                              ? `Desativar auto-refresh (próximo em ${secondsLeft}s)`
                              : 'Ativar auto-refresh'
                          }
                          className="dt-tool-btn"
                          style={isTimerActive ? timerActiveStyle : undefined}
                        >
                          <div className="relative">
                            <Timer size={16} aria-hidden />
                            {isTimerActive && (
                              <span
                                aria-live="polite"
                                aria-atomic="true"
                                className="absolute -top-1 -right-1 text-[8px] font-normal leading-none tabular-nums"
                                style={{ color: 'var(--ring)' }}
                              >
                                {countdownLabel}
                              </span>
                            )}
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        {isTimerActive ? 'Auto-refresh ativo' : 'Auto-refresh'}
                      </TooltipContent>
                    </TooltipRoot>

                    <DropdownMenu>
                      <TooltipRoot delayDuration={250}>
                        <TooltipTrigger asChild>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label="Selecionar intervalo de auto-refresh"
                              className="dt-tool-btn"
                              style={isTimerActive ? intervalActiveStyle : undefined}
                            >
                              <span className="text-xs font-normal">
                                {selectedInterval.label}
                              </span>
                              <ChevronDown size={12} aria-hidden className="ml-0.5" />
                            </button>
                          </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Intervalo</TooltipContent>
                      </TooltipRoot>
                      <DropdownMenuContent align="end" className="min-w-[140px]">
                        <DropdownMenuLabel>Intervalo</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={refreshInterval}
                          onValueChange={(v: string) => {
                            setRefreshInterval(v)
                            const sel = REFRESH_INTERVALS.find((i) => i.value === v)
                            // Se escolheu "Off" desativa o timer; caso contrário ativa.
                            if (!sel || sel.ms === null) setRefreshActive(false)
                            else setRefreshActive(true)
                          }}
                        >
                          {REFRESH_INTERVALS.map((opt) => (
                            <DropdownMenuRadioItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tabela ── */}
      <div
        className="dt-scroll"
        style={{ backgroundColor: 'var(--card)' }}
      >
        <table className="w-full border-collapse">
          {/* ── Cabeçalho ── */}
          <thead>
            <tr style={{ backgroundColor: 'var(--table-header)' }}>
              {effectiveColumns.map((col) => {
                const spanAlignClass =
                  col.align === 'center'
                    ? 'text-center w-full block'
                    : col.align === 'right'
                      ? 'text-right w-full block'
                      : ''
                // G2: header também respeita allowWrap (raro — header padrão é nowrap).
                const wrapClass = col.allowWrap ? 'whitespace-normal break-words' : 'whitespace-nowrap'
                return (
                  <th
                    key={col.key}
                    className={`h-10 px-3 py-2 text-xs font-normal uppercase tracking-wide ${wrapClass} align-middle text-left`}
                    style={{
                      color: 'var(--muted-foreground)',
                      width: col.width,
                      minWidth: col.key === 'acoes' ? '10px' : '20px',
                      borderBottom: '1px solid var(--table-border)',
                    }}
                  >
                    <span className={spanAlignClass}>{col.headerNode ?? col.header}</span>
                  </th>
                )
              })}
            </tr>
          </thead>

          {/* ── Corpo ── */}
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={effectiveColumns.length}
                  className="px-3 py-10 text-center text-[13px]"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row, idx) => {
                const isEven = idx % 2 === 0
                const rowBg = isEven ? 'var(--table-row)' : 'var(--table-row-alt)'
                const feeAmount = getFeeAmount ? getFeeAmount(row) : 0
                const hasFeeBelow = Boolean(getFeeAmount) && feeAmount > 0 && showFees
                // Expand inline: clicar na linha abre o painel `renderRowDetail`
                // (toggle) em vez de `onRowClick`.
                const rowId = getRowId ? getRowId(row) : String(start + idx)
                const isExpanded = Boolean(renderRowDetail) && expandedRowId === rowId
                const isClickable = Boolean(renderRowDetail) || Boolean(onRowClick)
                const handleRowClick = isClickable
                  ? (e: ReactMouseEvent<HTMLElement>) => {
                      if (!(e.currentTarget as HTMLElement).contains(e.target as Node)) return
                      if (renderRowDetail) {
                        setExpandedRowId((prev) => (prev === rowId ? null : rowId))
                        return
                      }
                      onRowClick?.(row)
                    }
                  : undefined
                // Hover em todas as linhas (não só clicáveis): destaca a linha em
                // leitura. O cursor-pointer continua exclusivo das clicáveis.
                const onMouseEnterRow = (e: ReactMouseEvent<HTMLTableRowElement>) => {
                  ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                    'var(--table-row-hover)'
                }
                const onMouseLeaveRow = (e: ReactMouseEvent<HTMLTableRowElement>) => {
                  ;(e.currentTarget as HTMLTableRowElement).style.backgroundColor = rowBg
                }

                return (
                  <Fragment key={idx}>
                    {/* ── Linha PRINCIPAL ── */}
                    <tr
                      onClick={handleRowClick}
                      aria-expanded={renderRowDetail ? isExpanded : undefined}
                      className={`h-12 ${isClickable ? 'cursor-pointer transition-colors' : ''}`}
                      style={{ backgroundColor: rowBg }}
                      onMouseEnter={onMouseEnterRow}
                      onMouseLeave={onMouseLeaveRow}
                    >
                      {effectiveColumns.map((col) => {
                        const wrapClass = col.allowWrap ? 'whitespace-normal break-words' : 'whitespace-nowrap'
                        return (
                          <td
                            key={col.key}
                            className={`px-3 py-2 text-[13px] ${wrapClass} ${alignClass(col.align)}`}
                            style={{
                              color: 'var(--foreground)',
                              borderBottom: '1px solid var(--table-border)',
                              width: col.width,
                            }}
                          >
                            {col.cell(row, start + idx)}
                          </td>
                        )
                      })}
                    </tr>

                    {/* ── Linha de TAXA (independente, intercalada) ── */}
                    {hasFeeBelow && (
                      <tr
                        onClick={onRowClick ? (e) => {
                          if (!(e.currentTarget as HTMLElement).contains(e.target as Node)) return
                          onRowClick(row)
                        } : undefined}
                        className={onRowClick ? 'cursor-pointer transition-colors' : undefined}
                        style={{ backgroundColor: rowBg }}
                        onMouseEnter={onMouseEnterRow}
                        onMouseLeave={onMouseLeaveRow}
                        data-fee-row="true"
                      >
                        {effectiveColumns.map((col) => {
                          const wrapClass = col.allowWrap ? 'whitespace-normal break-words' : 'whitespace-nowrap'
                          return (
                            <td
                              key={col.key}
                              className={`px-3 py-2 text-[13px] ${wrapClass} ${alignClass(col.align)}`}
                              style={{
                                color: 'var(--foreground)',
                                borderBottom: '1px solid var(--table-border)',
                                width: col.width,
                              }}
                            >
                              {col.feeCell ? (
                                col.feeCell(row, feeAmount)
                              ) : (
                                <span style={{ color: 'var(--muted-foreground)' }}>—</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )}

                    {/* ── Painel EXPANDIDO inline (full-width) ── */}
                    {isExpanded && renderRowDetail && (
                      <tr data-expanded-row="true" style={{ backgroundColor: rowBg }}>
                        <td
                          colSpan={effectiveColumns.length}
                          style={{ borderBottom: '1px solid var(--table-border)', padding: 0 }}
                        >
                          {renderRowDetail(row)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer de paginação ── */}
      <div
        className="flex items-center border-t px-4 py-1.5"
        style={{ backgroundColor: 'color-mix(in srgb, var(--muted) 20%, transparent)' }}
        role="navigation"
        aria-label="Paginação da tabela"
      >
        {/* Esquerda: contagem */}
        <div className="flex-1 text-xs font-normal" style={{ color: 'var(--muted-foreground)' }}>
          <span className="hidden sm:inline">{data.length} registro(s)</span>
        </div>

        {/* Centro: navegação numérica */}
        <div className="flex flex-1 items-center justify-center gap-1.5">
          {/* Primeira página */}
          <button
            type="button"
            onClick={() => goTo(0)}
            disabled={page === 0}
            aria-label="Primeira página"
            className="dt-page-btn"
          >
            <ChevronsLeft className="h-4 w-4" aria-hidden />
          </button>

          {/* Página anterior */}
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="Página anterior"
            className="dt-page-btn"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>

          {/* Números de página */}
          {getPageNumbers().map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-label={`Página ${p + 1}`}
              aria-current={p === page ? 'page' : undefined}
              className={p === page ? 'dt-page-btn dt-page-btn--active' : 'dt-page-btn'}
            >
              {p + 1}
            </button>
          ))}

          {/* Próxima página */}
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page >= totalPages - 1}
            aria-label="Próxima página"
            className="dt-page-btn"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>

          {/* Última página */}
          <button
            type="button"
            onClick={() => goTo(totalPages - 1)}
            disabled={page >= totalPages - 1}
            aria-label="Última página"
            className="dt-page-btn"
          >
            <ChevronsRight className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Direita: itens por página */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <span className="text-xs font-normal whitespace-nowrap" style={{ color: 'var(--muted-foreground)' }}>
            Itens por página
          </span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            aria-label="Itens por página"
            className="h-8 w-[70px] rounded-md border text-xs font-normal outline-none cursor-pointer"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
              paddingLeft: '8px',
            }}
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
