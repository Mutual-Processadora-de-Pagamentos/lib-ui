/**
 * Contrato canônico de Cripto/OTC — fonte de verdade compartilhada entre o
 * backoffice (admin configura) e o portal cliente PaaS (cliente consome).
 *
 * Regra de ouro: o que o admin cadastra em "OTC D+0 › Cadastros & Taxas"
 * (ativos, redes, taxa de rede, spread por tier) é EXATAMENTE o que o cliente
 * vê no card de cotação. Sem mocks paralelos divergindo entre os dois protótipos.
 *
 * Apenas tipos + seed de mock. Zero dependência de React/UI — pode ser
 * importado por qualquer camada (page, hook, util, action).
 */

// ── Tiers de cliente ───────────────────────────────────────────────────────────

export type TierId = 'standard' | 'premium' | 'vip'

/** Spread em pontos percentuais (ex.: 0.80 = 0,80%). */
export interface TierSpread {
  compra: number
  venda: number
  conversao: number
}

export const TIER_LABELS: Record<TierId, string> = {
  standard: 'Standard',
  premium: 'Premium',
  vip: 'VIP',
}

/**
 * Spread global por tier. Definido/aprovado em OTC D+0 › Cadastros › Taxas & Spread.
 * Override por cliente vive no detalhe da Empresa (aba Taxas) e sobrescreve estes valores.
 */
export const TIER_SPREADS: Record<TierId, TierSpread> = {
  standard: { compra: 0.8, venda: 0.8, conversao: 0.9 },
  premium: { compra: 0.5, venda: 0.5, conversao: 0.6 },
  vip: { compra: 0.3, venda: 0.3, conversao: 0.4 },
}

// ── Ativos ──────────────────────────────────────────────────────────────────────

export type AssetSymbol = 'BTC' | 'ETH' | 'USDT' | 'USDC'

export interface CryptoAsset {
  symbol: AssetSymbol
  name: string
  /** Casas decimais on-chain (precisão real do ativo). */
  decimals: number
  /** Casas decimais exibidas ao cliente no quote (≤ decimals). */
  displayDecimals: number
  enabled: boolean
  /**
   * Cotação de referência indicativa: 1 unidade do ativo = N BRL.
   * Seed de mock para o protótipo — em produção vem do feed de preço (barramento).
   */
  referenceRateBrl: number
}

// ── Redes ─────────────────────────────────────────────────────────────────────

export type NetworkId = 'BTC' | 'ERC20' | 'TRC20' | 'BEP20' | 'POLYGON' | 'SOLANA'

export interface CryptoNetwork {
  id: NetworkId
  name: string
  /** Ativos suportados nesta rede. */
  assets: AssetSymbol[]
  /** Taxa de rede (network fee) cobrada no saque/envio. */
  feeAmount: number
  /** Ativo em que a taxa de rede é cobrada. */
  feeAsset: AssetSymbol
  /** Confirmações exigidas para considerar a transação liquidada. */
  confirmations: number
  enabled: boolean
}

// ── Catálogo agregado ──────────────────────────────────────────────────────────

export interface CryptoCatalog {
  assets: CryptoAsset[]
  networks: CryptoNetwork[]
  tierSpreads: Record<TierId, TierSpread>
}

/**
 * Seed canônico do catálogo cripto. Único ponto a editar para mexer em ativos,
 * redes, fees ou spreads em ambos os protótipos.
 */
export const defaultCryptoCatalog: CryptoCatalog = {
  assets: [
    { symbol: 'USDT', name: 'Tether USD', decimals: 6, displayDecimals: 4, enabled: true, referenceRateBrl: 5.2132 },
    { symbol: 'BTC', name: 'Bitcoin', decimals: 8, displayDecimals: 8, enabled: true, referenceRateBrl: 500000 },
    { symbol: 'ETH', name: 'Ethereum', decimals: 18, displayDecimals: 6, enabled: true, referenceRateBrl: 12500 },
    { symbol: 'USDC', name: 'USD Coin', decimals: 6, displayDecimals: 4, enabled: true, referenceRateBrl: 5.2086 },
  ],
  networks: [
    { id: 'BTC', name: 'Bitcoin Network', assets: ['BTC'], feeAmount: 0.0005, feeAsset: 'BTC', confirmations: 3, enabled: true },
    { id: 'ERC20', name: 'Ethereum (ERC-20)', assets: ['USDT', 'ETH', 'USDC'], feeAmount: 3.5, feeAsset: 'USDT', confirmations: 12, enabled: true },
    { id: 'TRC20', name: 'Tron (TRC-20)', assets: ['USDT', 'USDC'], feeAmount: 1.0, feeAsset: 'USDT', confirmations: 20, enabled: true },
    { id: 'BEP20', name: 'BNB Smart Chain (BEP-20)', assets: ['USDT', 'ETH', 'USDC'], feeAmount: 0.3, feeAsset: 'USDT', confirmations: 15, enabled: true },
    { id: 'POLYGON', name: 'Polygon (PoS)', assets: ['USDT', 'USDC'], feeAmount: 0.2, feeAsset: 'USDT', confirmations: 128, enabled: true },
    { id: 'SOLANA', name: 'Solana (SPL)', assets: ['USDT', 'USDC'], feeAmount: 0.1, feeAsset: 'USDT', confirmations: 32, enabled: true },
  ],
  tierSpreads: TIER_SPREADS,
}

// ── Helpers puros ────────────────────────────────────────────────────────────

/** Spread do tier (fração: 0,80% → 0.008). Aplica em cálculo de preço final. */
export function getSpreadFraction(
  tier: TierId,
  direcao: keyof TierSpread,
  catalog: CryptoCatalog = defaultCryptoCatalog,
): number {
  return catalog.tierSpreads[tier][direcao] / 100
}

/** Ativos habilitados, na ordem do catálogo. */
export function getEnabledAssets(catalog: CryptoCatalog = defaultCryptoCatalog): CryptoAsset[] {
  return catalog.assets.filter((asset) => asset.enabled)
}

/** Redes habilitadas que suportam o ativo informado. */
export function getNetworksForAsset(
  symbol: AssetSymbol,
  catalog: CryptoCatalog = defaultCryptoCatalog,
): CryptoNetwork[] {
  return catalog.networks.filter((network) => network.enabled && network.assets.includes(symbol))
}
