/**
 * SearchIcon — ícone de lupa (busca) da navbar.
 *
 * SVG do Figma (viewBox 0 0 16 16) com paths inline; usa `stroke` herdando a cor
 * via prop `color` (default `--muted-foreground`). Componente de domínio do
 * Design System Mutual — vive na lib, não nos apps.
 */

interface SearchIconProps {
  className?: string
  color?: string
}

export function SearchIcon({ className = 'w-4 h-4', color = 'var(--muted-foreground)' }: SearchIconProps) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path
            d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
            id="Vector"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d="M14 14L11.1333 11.1333"
            id="Vector_2"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  )
}
