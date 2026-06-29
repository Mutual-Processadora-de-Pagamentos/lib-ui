/**
 * CustomIcons — ícones SVG inline genéricos (stroke currentColor) usados nos cards
 * de ação rápida e seções do PaaS: cripto genérico, código de barras, favorito,
 * transações, taxas, QR Code, conversão, ticket, valores, info, carteira, escudo,
 * processo e validação.
 *
 * Todos pintam com `currentColor` e aceitam `{ className, strokeWidth }`. Portados
 * do app PaaS (paths antes em src/imports) — agora inline na lib. Componentes de
 * domínio do Design System Mutual.
 *
 * `CryptoGenericIcon` é o ícone genérico de cripto (≠ `CryptoIcon`, que é marca de
 * rede). O app re-exporta este com o nome original `CryptoIcon` via shim.
 */

interface IconProps {
  className?: string
  strokeWidth?: number
}

const STROKE_PROPS = {
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function CryptoGenericIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d="M5.33333 9.33333C7.54247 9.33333 9.33333 7.54247 9.33333 5.33333C9.33333 3.12419 7.54247 1.33333 5.33333 1.33333C3.12419 1.33333 1.33333 3.12419 1.33333 5.33333C1.33333 7.54247 3.12419 9.33333 5.33333 9.33333Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M12.06 6.91333C12.6902 7.14829 13.251 7.53835 13.6905 8.04747C14.13 8.55658 14.434 9.16829 14.5745 9.82605C14.7149 10.4838 14.6873 11.1663 14.494 11.8106C14.3008 12.4548 13.9482 13.0399 13.469 13.5117C12.9897 13.9836 12.3991 14.327 11.752 14.5102C11.1048 14.6933 10.4219 14.7103 9.76646 14.5596C9.11098 14.4089 8.50408 14.0954 8.00189 13.648C7.49969 13.2006 7.11842 12.6338 6.89333 12" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M4.66667 4H5.33333V6.66667" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M11.14 9.25333L11.6067 9.72667L9.72667 11.6067" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function BarcodeIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d="M2 3.33333V12.6667" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M5.33333 3.33333V12.6667" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M8 3.33333V12.6667" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M11.3333 3.33333V12.6667" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M14 3.33333V12.6667" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function FavoriteIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d="M10.6667 7.33333L12 8.66667L14.6667 6" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M10.6667 14V12.6667C10.6667 11.9594 10.3857 11.2811 9.88562 10.781C9.38552 10.281 8.70724 10 8 10H4C3.29276 10 2.61448 10.281 2.11438 10.781C1.61428 11.2811 1.33333 11.9594 1.33333 12.6667V14" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M6 7.33333C7.47276 7.33333 8.66667 6.13943 8.66667 4.66667C8.66667 3.19391 7.47276 2 6 2C4.52724 2 3.33333 3.19391 3.33333 4.66667C3.33333 6.13943 4.52724 7.33333 6 7.33333Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function TransactionsIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M7 9L12 4L17 9M12 4V14" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M17 15L12 20L7 15M12 20V10" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function FeesIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M12 6V12L16 14" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function QrCodeIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M3 3H9V9H3V3Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M15 3H21V9H15V3Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M3 15H9V21H3V15Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M15 15H17V17H15V15Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M19 15H21V17H19V15Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M15 19H17V21H15V19Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M19 19H21V21H19V19Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function ConversionIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M7 16V4M7 4L3 8M7 4L11 8" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M17 8V20M17 20L21 16M17 20L13 16" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function TicketIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M3 10H21M3 10C3 8.895 3.895 8 5 8H19C20.105 8 21 8.895 21 10M3 10V18C3 19.105 3.895 20 5 20H19C20.105 20 21 19.105 21 18V10" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M7 14H7.01" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M11 14H13" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function ValuesIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M12 1V23" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function InfoIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
          <path d="M12 16V12" stroke="currentColor" strokeLinecap="round" strokeWidth={strokeWidth} />
          <path d="M12 8H12.01" stroke="currentColor" strokeLinecap="round" strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function WalletIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M21 8H3C2.44772 8 2 8.44772 2 9V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V9C22 8.44772 21.5523 8 21 8Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M16 12H18V16H16V12Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M2 8L3 5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5L22 8" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function ShieldIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function ProcessIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 9.1997 20.9447 6.4986 19.0711 4.50063" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <path d="M12 6V12L16 14" {...STROKE_PROPS} strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}

export function CheckValidatedIcon({ className = 'w-5 h-5', strokeWidth = 1.5 }: IconProps) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <g>
          <path d="M9 12L11 14L15 10" {...STROKE_PROPS} strokeWidth={strokeWidth} />
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth} />
        </g>
      </svg>
    </div>
  )
}
