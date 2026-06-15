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
