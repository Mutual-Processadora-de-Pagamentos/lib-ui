/**
 * ActionIcon — ícone de ação interativo (ver, copiar, editar, excluir, etc.).
 *
 * Ícone lucide com cor de hover por tipo de ação (tokens `--primary`/`--status-*`).
 * Componente de domínio do Design System Mutual — vive na lib, não nos apps.
 */

import {
  Eye,
  Copy,
  Share2,
  Download,
  Webhook,
  RotateCcw,
  SquarePen,
  Trash2,
  ExternalLink,
  FileDown,
} from 'lucide-react'

export type ActionType =
  | 'view'
  | 'copy'
  | 'share'
  | 'download'
  | 'webhook'
  | 'refund'
  | 'edit'
  | 'delete'
  | 'external-link'
  | 'export'

export type IconSize = 'sm' | 'md' | 'lg'

interface ActionIconProps {
  type: ActionType
  size?: IconSize
  disabled?: boolean
  className?: string
  onClick?: () => void
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
}

const typeConfig = {
  view: {
    icon: Eye,
    label: 'Ver detalhes',
    hoverColor: 'var(--primary)',
  },
  copy: {
    icon: Copy,
    label: 'Copiar',
    hoverColor: 'var(--primary)',
  },
  share: {
    icon: Share2,
    label: 'Compartilhar',
    hoverColor: 'var(--primary)',
  },
  download: {
    icon: Download,
    label: 'Download',
    hoverColor: 'var(--primary)',
  },
  webhook: {
    icon: Webhook,
    label: 'Reenviar Webhook',
    hoverColor: 'var(--primary)',
  },
  refund: {
    icon: RotateCcw,
    label: 'Devolver',
    hoverColor: 'var(--status-info)',
  },
  edit: {
    icon: SquarePen,
    label: 'Editar',
    hoverColor: 'var(--primary)',
  },
  delete: {
    icon: Trash2,
    label: 'Excluir',
    hoverColor: 'var(--status-error)',
  },
  'external-link': {
    icon: ExternalLink,
    label: 'Abrir link externo',
    hoverColor: 'var(--primary)',
  },
  export: {
    icon: FileDown,
    label: 'Exportar',
    hoverColor: 'var(--primary)',
  },
}

export function ActionIcon({
  type,
  size = 'md',
  disabled = false,
  className = '',
  onClick,
}: ActionIconProps) {
  const config = typeConfig[type]
  const Icon = config.icon
  const iconSize = sizeMap[size]

  const baseClasses = 'transition-all duration-200'
  const interactiveClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer hover:scale-105 active:scale-95'

  return (
    <Icon
      size={iconSize}
      strokeWidth={2}
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      style={{
        color: disabled ? 'var(--border)' : 'var(--muted-foreground)',
      }}
      onClick={disabled ? undefined : onClick}
      // lucide-react (React 19 types) não tipa `title` em LucideProps; é atributo DOM válido.
      {...{ title: config.label }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = config.hoverColor
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.color = 'var(--muted-foreground)'
        }
      }}
    />
  )
}
