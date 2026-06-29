/**
 * DevolverPixIcon — ícone de devolução/estorno de Pix.
 *
 * Disco navy (`--brand-navy-medium`) com seta circular branca
 * (`--primary-foreground`) — símbolo de retorno/devolução. SVG inline.
 * Componente de domínio do Design System Mutual — vive na lib, não nos apps.
 */

interface DevolverPixIconProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function DevolverPixIcon({ size = 'md', className = '' }: DevolverPixIconProps) {
  const sizeConfig = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const currentSize = sizeConfig[size]

  return (
    <div className={`inline-flex items-center justify-center ${currentSize} ${className}`}>
      <div className="w-full h-full rounded-full bg-[var(--brand-navy-medium)] flex items-center justify-center">
        <svg className="w-3/5 h-3/5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            fill="var(--primary-foreground)"
            opacity="0.3"
          />
          <path d="M12 6v6l4-4-4-2z" fill="var(--primary-foreground)" />
          <path d="M7 12l5 5v-3h5v-4h-5V7z" fill="var(--primary-foreground)" />
        </svg>
      </div>
    </div>
  )
}
