/**
 * NotificationIcon — ícone de tipo de notificação (Pix, relatório, webhook, etc.).
 *
 * Ícone lucide colorido por tipo de evento (tokens `--status-*`/`--credit-tone`/
 * `--muted-foreground`). Componente de domínio do Design System Mutual — vive na
 * lib, não nos apps.
 */

import { ArrowDownLeft, ArrowUpRight, FileText, Link2, AlertCircle, RefreshCw, XCircle, Send, AlertTriangle, Activity, Settings, Link, Bell } from "lucide-react"

export type NotificationType =
  | "pix-received"
  | "pix-sent"
  | "report"
  | "payment-link"
  | "system"
  | "webhook-error"
  | "webhook-retry"
  | "webhook-fatal"
  | "webhook-manual"
  | "analysis-alert"
  | "analysis-status"
  | "product-config"
  | "product-endpoint"

interface NotificationIconProps {
  type: NotificationType
  size?: number
}

export function NotificationIcon({ type, size = 18 }: NotificationIconProps) {
  const iconProps = { size, strokeWidth: 1.75, className: 'flex-shrink-0' }

  switch (type) {
    case "pix-received":   return <ArrowDownLeft  {...iconProps} style={{ color: 'var(--status-success)' }} />
    case "pix-sent":       return <ArrowUpRight   {...iconProps} style={{ color: 'var(--status-error)' }} />
    case "report":         return <FileText        {...iconProps} style={{ color: 'var(--status-info)' }} />
    case "payment-link":   return <Link2           {...iconProps} style={{ color: 'var(--status-warning)' }} />
    case "webhook-error":  return <AlertCircle     {...iconProps} style={{ color: 'var(--status-error)' }} />
    case "webhook-retry":  return <RefreshCw       {...iconProps} style={{ color: 'var(--status-warning)' }} />
    case "webhook-fatal":  return <XCircle         {...iconProps} style={{ color: 'var(--status-error)' }} />
    case "webhook-manual": return <Send            {...iconProps} style={{ color: 'var(--status-info)' }} />
    case "analysis-alert": return <AlertTriangle   {...iconProps} style={{ color: 'var(--status-warning)' }} />
    case "analysis-status":return <Activity        {...iconProps} style={{ color: 'var(--status-success)' }} />
    case "product-config": return <Settings        {...iconProps} style={{ color: 'var(--credit-tone)' }} />
    case "product-endpoint":return <Link           {...iconProps} style={{ color: 'var(--status-info)' }} />
    case "system":
    default:               return <Bell            {...iconProps} style={{ color: 'var(--muted-foreground)' }} />
  }
}
