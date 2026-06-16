import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/cn'

// Spring suave — sem overshooting excessivo, elegante (compartilhado entre os apps).
const SIDEBAR_SPRING = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
  mass: 0.9,
} as const

export interface SidebarFrameProps {
  /** Estado colapsado (controla a largura animada). */
  collapsed: boolean
  /** Largura expandida em px. Default 280. */
  expandedWidth?: number
  /** Largura colapsada em px. Default 72. */
  collapsedWidth?: number
  ariaLabel?: string
  /** Conteúdo: logo/colapso, busca, navegação, footer — injetados pelo app. */
  children: ReactNode
  className?: string
}

/**
 * Frame da sidebar (presentational): `<aside>` navy de marca com animação de
 * largura no colapso. O CONTEÚDO (logo, busca, navegação, footer) é injetado
 * como children pelo app — é a parte que diverge entre backoffice e paas.
 *
 * Fundo = `var(--sidebar-gradient)` (mesmo navy da casca `AppShell`, fonte única).
 */
export function SidebarFrame({
  collapsed,
  expandedWidth = 280,
  collapsedWidth = 72,
  ariaLabel = 'Navegação principal',
  children,
  className,
}: SidebarFrameProps) {
  return (
    <motion.aside
      aria-label={ariaLabel}
      initial={false}
      animate={{ width: collapsed ? collapsedWidth : expandedWidth }}
      transition={SIDEBAR_SPRING}
      className={cn(
        'flex h-full shrink-0 flex-col overflow-hidden text-[color:var(--sidebar-foreground)]',
        className,
      )}
      style={{ background: 'var(--sidebar-gradient)' }}
    >
      {children}
    </motion.aside>
  )
}
