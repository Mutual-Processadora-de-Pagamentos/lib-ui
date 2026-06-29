/**
 * CryptoIcon — ícones de marca de criptomoeda/rede (Ethereum, Bitcoin, Polygon, BSC).
 *
 * Discos coloridos com a cor oficial de cada ativo via token de moeda
 * (`--coin-eth`/`--coin-btc`/`--coin-polygon`/`--coin-bnb`); o glifo interno usa
 * `--sidebar-foreground` (marca clara sobre o disco). Componente de domínio do
 * Design System Mutual — vive na lib, não nos apps.
 */

import type { SVGProps } from 'react'

export type CryptoNetwork = 'Ethereum' | 'Bitcoin' | 'Polygon' | 'BSC'

export interface CryptoIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  network: CryptoNetwork
  size?: number
}

type IconProps = Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> & { size: number }

function EthereumIcon({ size, ...rest }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" aria-hidden {...rest}>
      <circle cx="16" cy="16" r="16" fill="var(--coin-eth)" />
      <g fill="var(--sidebar-foreground)" fillRule="nonzero">
        <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
        <path d="M16.498 4L9 16.22l7.498-3.35z" />
        <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
        <path d="M16.498 27.995v-6.028L9 17.616z" />
        <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
        <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
      </g>
    </svg>
  )
}

function BitcoinIcon({ size, ...rest }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" aria-hidden {...rest}>
      <circle cx="16" cy="16" r="16" fill="var(--coin-btc)" />
      <path
        fill="var(--sidebar-foreground)"
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.147-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.534 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
      />
    </svg>
  )
}

function PolygonIcon({ size, ...rest }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" aria-hidden {...rest}>
      <circle cx="16" cy="16" r="16" fill="var(--coin-polygon)" />
      <path
        fill="var(--sidebar-foreground)"
        d="M21.092 12.693c-.369-.215-.848-.215-1.254 0l-2.879 1.654-1.955 1.078-2.879 1.654c-.369.215-.848.215-1.254 0l-2.288-1.294c-.369-.215-.627-.61-.627-1.042v-2.515c0-.43.221-.825.627-1.042l2.25-1.258c.369-.215.848-.215 1.254 0l2.251 1.294c.369.215.627.61.627 1.043v1.653l1.955-1.114v-1.69c0-.43-.222-.825-.627-1.042l-4.169-2.371c-.369-.216-.848-.216-1.254 0l-4.243 2.407c-.405.18-.626.575-.626 1.006v4.778c0 .43.221.826.626 1.042l4.243 2.407c.369.215.848.215 1.254 0l2.879-1.617 1.955-1.115 2.879-1.617c.369-.216.848-.216 1.254 0l2.25 1.258c.37.215.627.61.627 1.042v2.515c0 .43-.221.826-.627 1.042l-2.213 1.258c-.369.216-.848.216-1.255 0l-2.25-1.258c-.37-.215-.627-.61-.627-1.042v-1.617L15.7 19.156v1.69c0 .431.222.826.627 1.043l4.243 2.407c.369.215.848.215 1.254 0l4.244-2.407c.369-.215.626-.61.626-1.043V16.04c0-.43-.222-.825-.627-1.042l-4.275-2.305z"
      />
    </svg>
  )
}

function BSCIcon({ size, ...rest }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" aria-hidden {...rest}>
      <circle cx="16" cy="16" r="16" fill="var(--coin-bnb)" />
      <path
        fill="var(--sidebar-foreground)"
        d="M12.116 14.404 16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"
      />
    </svg>
  )
}

export function CryptoIcon({ network, size = 20, ...rest }: CryptoIconProps) {
  switch (network) {
    case 'Ethereum':
      return <EthereumIcon size={size} {...rest} />
    case 'Bitcoin':
      return <BitcoinIcon size={size} {...rest} />
    case 'Polygon':
      return <PolygonIcon size={size} {...rest} />
    case 'BSC':
      return <BSCIcon size={size} {...rest} />
  }
}
