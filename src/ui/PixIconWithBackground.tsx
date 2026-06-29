/**
 * PixIconWithBackground — seta direcional de Pix recebido/enviado (sem fundo).
 *
 * Ícone Pix do Figma (paths inline, viewBox 0 0 20 20): seta para dentro = recebido
 * (`--status-success`), seta para fora = enviado (`--status-error`). A cor é aplicada
 * via `--stroke-0` no wrapper. Tooltip opcional usando tokens `--popover`.
 * Componente de domínio do Design System Mutual — vive na lib, não nos apps.
 */

export type PixDirection = 'IN' | 'OUT'

interface PixIconWithBackgroundProps {
  direction: PixDirection
  size?: 'sm' | 'md' | 'lg'
  showTooltip?: boolean
  className?: string
}

function PixInIconFigma() {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path
            d="M14.1667 5.83333L5.83333 14.1667"
            stroke="var(--stroke-0, var(--status-success))"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d="M14.1667 14.1667H5.83333V5.83333"
            stroke="var(--stroke-0, var(--status-success))"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  )
}

function PixOutIconFigma() {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path
            d="M5.83333 5.83333H14.1667V14.1667"
            stroke="var(--stroke-0, var(--status-error))"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
          <path
            d="M5.83333 14.1667L14.1667 5.83333"
            stroke="var(--stroke-0, var(--status-error))"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.66667"
          />
        </g>
      </svg>
    </div>
  )
}

export function PixIconWithBackground({
  direction,
  size = 'md',
  showTooltip = true,
  className = '',
}: PixIconWithBackgroundProps) {
  const sizeConfig = {
    sm: { icon: 'w-5 h-5' },
    md: { icon: 'w-6 h-6' },
    lg: { icon: 'w-7 h-7' },
  }

  const currentSize = sizeConfig[size]

  const config = {
    IN: {
      color: 'var(--status-success)',
      tooltip: 'Pix Recebido',
    },
    OUT: {
      color: 'var(--status-error)',
      tooltip: 'Pix Enviado',
    },
  }

  const currentConfig = config[direction]

  return (
    <div className={`group/icon relative inline-flex items-center justify-center ${className}`}>
      <div
        className={`
          ${currentSize.icon}
          transition-transform
          duration-200
          group-hover/icon:scale-110
        `}
        style={{ ['--stroke-0' as string]: currentConfig.color }}
      >
        {direction === 'IN' ? <PixInIconFigma /> : <PixOutIconFigma />}
      </div>

      {showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-[color:var(--popover)] text-[color:var(--popover-foreground)] text-xs rounded shadow-lg opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-['Montserrat',sans-serif]">
          {currentConfig.tooltip}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[color:var(--popover)]" />
        </div>
      )}
    </div>
  )
}
