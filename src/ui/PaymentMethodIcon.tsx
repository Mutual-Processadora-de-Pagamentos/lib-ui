/**
 * PaymentMethodIcon — ícone de método de pagamento (Pix, cartão, boleto, QR Code).
 *
 * Pix usa o símbolo oficial (`PixIcon`); demais usam ícones lucide. Cor via
 * token `--primary`, com fundo opcional (disco translúcido via `color-mix`).
 * Componente de domínio do Design System Mutual — vive na lib, não nos apps.
 */

import { QrCode, CreditCard, Barcode } from 'lucide-react'
import { PixIcon } from './PixIcon'

export type PaymentMethod = 'pix' | 'cartao' | 'boleto' | 'qrcode'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'

interface PaymentMethodIconProps {
  method: PaymentMethod
  size?: IconSize
  className?: string
  showBackground?: boolean
}

const sizeMap = {
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
}

const methodConfig = {
  pix: {
    isPixIcon: true as const,
    color: 'var(--primary)',
    bgColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
    label: 'Pix',
  },
  cartao: {
    isPixIcon: false as const,
    icon: CreditCard,
    color: 'var(--primary)',
    bgColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
    label: 'Cartão de Crédito',
  },
  boleto: {
    isPixIcon: false as const,
    icon: Barcode,
    color: 'var(--primary)',
    bgColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
    label: 'Boleto',
  },
  qrcode: {
    isPixIcon: false as const,
    icon: QrCode,
    color: 'var(--primary)',
    bgColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
    label: 'QR Code',
  },
}

export function PaymentMethodIcon({
  method,
  size = 'md',
  className = '',
  showBackground = false,
}: PaymentMethodIconProps) {
  const config = methodConfig[method]
  const iconSize = sizeMap[size]

  const iconEl = config.isPixIcon ? (
    <PixIcon size={iconSize} style={{ color: config.color }} className={className} />
  ) : (
    <config.icon
      size={iconSize}
      strokeWidth={2}
      style={{ color: config.color }}
      className={className}
      // lucide-react (React 19 types) não tipa `title` em LucideProps; é atributo DOM válido.
      {...{ title: config.label }}
    />
  )

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
        {config.isPixIcon ? (
          <PixIcon size={iconSize} style={{ color: config.color }} />
        ) : (
          <config.icon size={iconSize} strokeWidth={2} style={{ color: config.color }} />
        )}
      </div>
    )
  }

  return iconEl
}
