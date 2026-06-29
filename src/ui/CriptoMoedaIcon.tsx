/**
 * CriptoMoedaIcon — disco da criptomoeda por sigla, 100% inline e tokenizado.
 *
 * BTC e ETH reusam o desenho de marca de `CryptoIcon` (glifo sobre disco
 * `--coin-btc`/`--coin-eth`). USDC e USDT são desenhados como disco na cor de
 * marca (`--coin-usdc`/`--coin-usdt`) com a sigla em texto. Demais siglas caem no
 * fallback: círculo com a inicial (BR/BRL → "R$") sobre `--coin-brl`/`--primary`.
 *
 * Sem `import.meta.env` e sem assets externos — componente de domínio do Design
 * System Mutual, vive na lib (não nos apps).
 */

/** Cor de fundo do fallback por sigla — identidade da moeda (token de marca). */
const COR_FALLBACK: Record<string, string> = {
  BR: 'var(--coin-brl)',
  BRL: 'var(--coin-brl)',
}

interface CriptoMoedaIconProps {
  sigla: string
  size?: number
  className?: string
}

function BtcDisc({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="16" fill="var(--coin-btc)" />
      <path
        fill="var(--sidebar-foreground)"
        d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.147-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.534 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"
      />
    </svg>
  )
}

function EthDisc({ size }: { size: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" aria-hidden>
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

function StablecoinDisc({ size, color, label }: { size: number; color: string; label: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="16" fill={color} />
      <text
        x="16"
        y="16"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Montserrat, sans-serif"
        fontSize="9"
        fontWeight="400"
        fill="var(--sidebar-foreground)"
      >
        {label}
      </text>
    </svg>
  )
}

/**
 * Ícone da criptomoeda. BTC/ETH usam o desenho de marca; USDC/USDT um disco
 * tokenizado com a sigla; demais siglas usam o círculo de fallback com a inicial.
 */
export default function CriptoMoedaIcon({ sigla, size = 24, className }: CriptoMoedaIconProps) {
  const wrapperClassName = `inline-flex shrink-0 ${className ?? ''}`

  switch (sigla) {
    case 'BTC':
      return (
        <span className={wrapperClassName}>
          <BtcDisc size={size} />
        </span>
      )
    case 'ETH':
      return (
        <span className={wrapperClassName}>
          <EthDisc size={size} />
        </span>
      )
    case 'USDC':
      return (
        <span className={wrapperClassName}>
          <StablecoinDisc size={size} color="var(--coin-usdc)" label="USDC" />
        </span>
      )
    case 'USDT':
      return (
        <span className={wrapperClassName}>
          <StablecoinDisc size={size} color="var(--coin-usdt)" label="USDT" />
        </span>
      )
  }

  const inicial = sigla === 'BR' || sigla === 'BRL' ? 'R$' : sigla.charAt(0)

  return (
    <span
      aria-hidden
      className={`flex items-center justify-center rounded-full font-normal text-[color:var(--primary-foreground)] ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        backgroundColor: COR_FALLBACK[sigla] ?? 'var(--primary)',
        fontSize: size * 0.42,
      }}
    >
      {inicial}
    </span>
  )
}
