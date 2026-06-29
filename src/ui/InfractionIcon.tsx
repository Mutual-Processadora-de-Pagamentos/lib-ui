/**
 * InfractionIcon — ícone de infração/MED e tipos de bloqueio.
 *
 * Ícone lucide colorido por tipo (tokens `--status-*`/`--muted-foreground`),
 * com fundo opcional (disco translúcido via `color-mix`). Componente de domínio
 * do Design System Mutual — vive na lib, não nos apps.
 */

import {
  ShieldAlert,
  FileText,
  Lock,
  Shield,
  Settings,
} from 'lucide-react'

export type InfractionType =
  | 'med'
  | 'rdr'
  | 'bloqueio-cautelar'
  | 'bloqueio-judicial'
  | 'bloqueio-administrativo'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

interface InfractionIconProps {
  type: InfractionType
  size?: IconSize
  className?: string
  showBackground?: boolean
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
}

const typeConfig = {
  med: {
    icon: ShieldAlert,
    color: 'var(--status-warning)',
    bgColor: 'color-mix(in srgb, var(--status-warning) 15%, transparent)',
    label: 'MED - Mecanismo Especial de Devolução',
  },
  rdr: {
    icon: FileText,
    color: 'var(--status-info)',
    bgColor: 'color-mix(in srgb, var(--status-info) 15%, transparent)',
    label: 'RDR - Representação de Devolução de Recurso',
  },
  'bloqueio-cautelar': {
    icon: Lock,
    color: 'var(--status-warning)',
    bgColor: 'color-mix(in srgb, var(--status-warning) 15%, transparent)',
    label: 'Bloqueio Cautelar',
  },
  'bloqueio-judicial': {
    icon: Shield,
    color: 'var(--status-error)',
    bgColor: 'color-mix(in srgb, var(--status-error) 15%, transparent)',
    label: 'Bloqueio Judicial',
  },
  'bloqueio-administrativo': {
    icon: Settings,
    color: 'var(--muted-foreground)',
    bgColor: 'color-mix(in srgb, var(--muted-foreground) 15%, transparent)',
    label: 'Bloqueio Administrativo',
  },
}

export function InfractionIcon({
  type,
  size = 'md',
  className = '',
  showBackground = false,
}: InfractionIconProps) {
  const config = typeConfig[type]
  const Icon = config.icon
  const iconSize = sizeMap[size]

  if (showBackground) {
    const bgSize = iconSize + 16
    return (
      <div
        className={`inline-flex items-center justify-center rounded-lg ${className}`}
        style={{
          width: `${bgSize}px`,
          height: `${bgSize}px`,
          backgroundColor: config.bgColor,
        }}
        title={config.label}
      >
        <Icon
          size={iconSize}
          strokeWidth={2}
          style={{ color: config.color }}
        />
      </div>
    )
  }

  return (
    <Icon
      size={iconSize}
      strokeWidth={2}
      style={{ color: config.color }}
      className={className}
      // lucide-react (React 19 types) não tipa `title` em LucideProps; é atributo DOM válido.
      {...{ title: config.label }}
    />
  )
}
