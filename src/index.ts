// @mutual-processadora-de-pagamentos/lib-ui — API pública dos primitivos.
// Tokens (CSS) são consumidos à parte via "./tokens.css".

export { cn } from './lib/cn'
export { Button, type ButtonProps } from './ui/Button'
export { IconButton, type IconButtonProps } from './ui/IconButton'

// ── Novos primitivos portados do backoffice ───────────────────────────────────

export { Input, type InputProps } from './ui/Input'
export { Label } from './ui/Label'
export { FormMessage, type FormMessageProps } from './ui/FormMessage'
export { Textarea, type TextareaProps } from './ui/Textarea'

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogHeaderRich,
  DialogFooter,
} from './ui/Dialog'
export type { DialogSide } from './ui/Dialog'

export { ConfirmDialog, type ConfirmDialogProps } from './ui/ConfirmDialog'

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
} from './ui/Popover'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
} from './ui/DropdownMenu'

export {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  type TooltipProps,
} from './ui/Tooltip'

export { ScrollArea, ScrollBar } from './ui/ScrollArea'

export { Switch } from './ui/Switch'

export {
  Select,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from './ui/Select'

export {
  PillTabs,
  type PillTabsProps,
  type PillTabItem,
  type PillTabItemControlled,
} from './ui/PillTabs'

// ── Controles de navbar compartilhados (idioma / fonte / atualização) ─────────

export {
  LanguageMenu,
  FlagIcon,
  LANGUAGE_OPTIONS,
  type LanguageMenuProps,
  type LanguageOption,
  type SupportedLanguage,
} from './ui/LanguageMenu'

export { FontSizeMenu, type FontSizeMenuProps, type FontSize } from './ui/FontSizeMenu'

export { RefreshMenu, type RefreshMenuProps } from './ui/RefreshMenu'

// ── Shell / layout (ADR 0002 — slice A) ───────────────────────────────────────

export { AppShell, type AppShellProps } from './shell/AppShell'
export { SidebarFrame, type SidebarFrameProps } from './shell/SidebarFrame'

// data-display (Fase 2)

export { SectionCard, type SectionCardProps } from './data-display/SectionCard'

export {
  StatusBadge,
  type StatusBadgeProps,
  type StatusBadgeColor,
} from './data-display/StatusBadge'

export { PageHeader, type PageHeaderProps, type BreadcrumbItem } from './data-display/PageHeader'
export { MoneyValue, type MoneyValueProps, type MoneySize } from './data-display/MoneyValue'

export { Skeleton, type SkeletonProps } from './data-display/Skeleton'

export { EmptyState, type EmptyStateProps } from './data-display/EmptyState'

export { ErrorState, type ErrorStateProps } from './data-display/ErrorState'

export {
  KpiCard,
  type KpiCardProps,
  type KpiCardIconColor,
} from './data-display/KpiCard'

export {
  MiniKpiCard,
  type MiniKpiCardProps,
  type MiniKpiIconColor,
} from './data-display/MiniKpiCard'

export {
  SummaryCard,
  type SummaryCardProps,
  type SummaryCardIconColor,
  type SummaryMetric,
} from './data-display/SummaryCard'

export {
  DetailField,
  DetailFieldNode,
  type DetailFieldProps,
} from './data-display/DetailField'

export {
  StatusPill,
  type StatusPillProps,
  type StatusPillVariant,
} from './data-display/StatusPill'

// FeeIcon (ícone DS, currentColor) + DataTable (Fase 2.1)
export { FeeIcon, type FeeIconProps } from './ui/FeeIcon'
export { DataTable, type Column, type DataTableProps } from './data-display/DataTable'

// Ícones de domínio Mutual (símbolo Pix oficial; marcas de cripto via tokens --coin-*)
export { PixIcon, type PixIconProps } from './ui/PixIcon'
export { CryptoIcon, type CryptoIconProps, type CryptoNetwork } from './ui/CryptoIcon'
export { ActionIcon, type ActionType } from './ui/ActionIcon'
export { TransactionIcon, type TransactionType } from './ui/TransactionIcon'
export { PaymentMethodIcon, type PaymentMethod } from './ui/PaymentMethodIcon'
export { InfractionIcon, type InfractionType } from './ui/InfractionIcon'
export { NotificationIcon, type NotificationType } from './ui/NotificationIcon'
export { BellIcon } from './ui/BellIcon'
export { AssistantIcon } from './ui/AssistantIcon'
export { SearchIcon } from './ui/SearchIcon'
export { HelpIcon } from './ui/HelpIcon'
export { DevolverPixIcon } from './ui/DevolverPixIcon'
export { PixIconWithBackground, type PixDirection } from './ui/PixIconWithBackground'
export { PixTypeIcon, type PixType } from './ui/PixTypeIcon'

// Ícones SVG genéricos (stroke currentColor) — cards de ação rápida e seções
export {
  CryptoGenericIcon,
  BarcodeIcon,
  FavoriteIcon,
  TransactionsIcon,
  FeesIcon,
  QrCodeIcon,
  ConversionIcon,
  TicketIcon,
  ValuesIcon,
  InfoIcon,
  WalletIcon,
  ShieldIcon,
  ProcessIcon,
  CheckValidatedIcon,
} from './ui/CustomIcons'

// Disco da criptomoeda por sigla (inline, tokens --coin-*)
export { default as CriptoMoedaIcon } from './ui/CriptoMoedaIcon'
