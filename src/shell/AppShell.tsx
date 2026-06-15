import { type ReactNode } from 'react'
import { cn } from '../lib/cn'

export interface AppShellProps {
  /** Navegação lateral — o app decide o nó (Sidebar inline no desktop, Drawer no mobile). */
  sidebar: ReactNode
  /** Barra superior (topbar). */
  header: ReactNode
  children: ReactNode
  /** Classe de largura máxima do conteúdo. Default `max-w-[1600px]`. */
  maxWidthClassName?: string
  className?: string
}

/**
 * Casca de layout do app autenticado (presentational).
 *
 * Container navy de marca + "ilha" branca arredondada (sidebar + header + main
 * sobre canvas off-white). O app injeta `sidebar`, `header` e o conteúdo, e mantém
 * por fora o que é político/app-específico (guard de auth, providers, Toaster).
 *
 * O container herda `var(--sidebar-gradient)` para que a quina arredondada da ilha
 * revele o MESMO navy da sidebar — sem mancha na junção sidebar↔navbar. O
 * arredondamento usa `lg:` (>=1024px), espelhando o breakpoint desktop dos apps.
 */
export function AppShell({
  sidebar,
  header,
  children,
  maxWidthClassName = 'max-w-[1600px]',
  className,
}: AppShellProps) {
  return (
    <div
      className={cn('flex h-screen w-full overflow-hidden', className)}
      style={{ background: 'var(--sidebar-gradient)' }}
    >
      {sidebar}
      <div className="flex flex-1 min-w-0 flex-col overflow-hidden bg-[color:var(--background)] lg:rounded-l-2xl">
        {header}
        <main className="min-h-0 flex-1 overflow-y-auto bg-[color:var(--canvas)]">
          <div className={cn('mx-auto w-full p-2 pb-6', maxWidthClassName)}>{children}</div>
        </main>
      </div>
    </div>
  )
}
