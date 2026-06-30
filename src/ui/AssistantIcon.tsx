/**
 * AssistantIcon — ícone do assistente virtual (robô) do chat flutuante.
 *
 * SVG do Figma (viewBox 0 0 18 18) com paths inline; stroke herda a cor via prop
 * `color` (default `--primary`). Por padrão renderiza dentro de um círculo de fundo
 * `--secondary` (amarelo accent Mutual); passe `withBackground={false}` p/ o glyph solto.
 * Componente de domínio do Design System Mutual — vive na lib, não nos apps.
 */

interface AssistantIconProps {
  /** Tamanho do círculo/ícone. Default 32. */
  size?: number | string
  className?: string
  /** Cor do traço do robô. Default `var(--primary)`. */
  color?: string
  /** Renderiza o círculo de fundo amarelo atrás do glyph. Default true. */
  withBackground?: boolean
  'aria-hidden'?: boolean
}

function Glyph({ color }: { color: string }) {
  return (
    <svg className="block size-[60%]" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18" aria-hidden>
      <g>
        <path d="M9 6V3H6" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path
          d="M13.5 6H4.5C3.67157 6 3 6.67157 3 7.5V13.5C3 14.3284 3.67157 15 4.5 15H13.5C14.3284 15 15 14.3284 15 13.5V7.5C15 6.67157 14.3284 6 13.5 6Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path d="M1.5 10.5H3" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M15 10.5H16.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M11.25 9.75V11.25" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M6.75 9.75V11.25" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export function AssistantIcon({
  size = 32,
  className,
  color = 'var(--primary)',
  withBackground = true,
}: AssistantIconProps) {
  if (!withBackground) {
    return (
      <span className={className} style={{ width: size, height: size, display: 'inline-flex' }}>
        <Glyph color={color} />
      </span>
    )
  }
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        backgroundColor: 'var(--secondary)',
      }}
    >
      <Glyph color={color} />
    </span>
  )
}
