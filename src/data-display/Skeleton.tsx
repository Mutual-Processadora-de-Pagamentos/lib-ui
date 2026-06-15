import { cn } from '../lib/cn'

export interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
}

/**
 * Placeholder de carregamento com shimmer via `var(--muted)`.
 *
 * Respeita `prefers-reduced-motion` — `animate-pulse` é desativado via
 * `motion-reduce:animate-none` quando o usuário configurou movimento reduzido.
 *
 * @example
 * // Linha de texto
 * <Skeleton className="h-4 w-48" />
 *
 * @example
 * // Card inteiro
 * <Skeleton className="h-24 w-full rounded-2xl" />
 */
export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Carregando..."
      aria-hidden="true"
      className={cn(
        'rounded-md animate-pulse motion-reduce:animate-none',
        className,
      )}
      style={{
        backgroundColor: 'var(--muted)',
        width:
          width !== undefined
            ? typeof width === 'number'
              ? `${width}px`
              : width
            : undefined,
        height:
          height !== undefined
            ? typeof height === 'number'
              ? `${height}px`
              : height
            : undefined,
      }}
    />
  )
}
