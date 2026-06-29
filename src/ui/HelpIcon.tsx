/**
 * HelpIcon — ícone de ajuda (interrogação em círculo) da navbar.
 *
 * SVG do Figma (viewBox 0 0 16 16) com paths inline; usa `stroke` herdando a cor
 * via prop `color` (default `--muted-foreground`). Componente de domínio do
 * Design System Mutual — vive na lib, não nos apps.
 */

interface HelpIconProps {
  className?: string
  color?: string
}

export function HelpIcon({ className = 'w-4 h-4', color = 'var(--muted-foreground)' }: HelpIconProps) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_716_57)" id="Icon">
          <path
            d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
            id="Vector"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d="M6.05998 6C6.21671 5.55445 6.52608 5.17874 6.93328 4.93942C7.34048 4.70011 7.81924 4.61263 8.28476 4.69248C8.75028 4.77232 9.17252 5.01435 9.4767 5.37569C9.78087 5.73702 9.94735 6.19435 9.94664 6.66667C9.94664 8 7.94664 8.66667 7.94664 8.66667"
            id="Vector_2"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
          <path
            d="M8 11.3333H8.00667"
            id="Vector_3"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
        <defs>
          <clipPath id="clip0_716_57">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
