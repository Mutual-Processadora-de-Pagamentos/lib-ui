import type { SVGProps } from 'react'

export interface FeeIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number
}

/**
 * Ícone de "nota fiscal / fee com cifrão" usado para indicar linhas de taxa
 * (sub-rows) nas tabelas de transações do backoffice.
 *
 * - `stroke` herda de `currentColor` — controle a cor via `style={{ color: '...' }}`
 *   ou classe Tailwind no elemento pai.
 * - `aria-hidden` por padrão pois é decorativo (acompanhado do texto "Taxa").
 */
export function FeeIcon({ size = 16, className, ...rest }: FeeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 15.9983 15.9983"
      fill="none"
      className={className}
      aria-hidden
      {...rest}
    >
      <g clipPath="url(#clip0_fee_icon)">
        <path
          d="M2.66639 1.3332V14.6651L3.99959 13.9985L5.33278 14.6651L6.66598 13.9985L7.99917 14.6651L9.33237 13.9985L10.6656 14.6651L11.9988 13.9985L13.332 14.6651V1.3332L11.9988 1.99979L10.6656 1.3332L9.33237 1.99979L7.99917 1.3332L6.66598 1.99979L5.33278 1.3332L3.99959 1.99979L2.66639 1.3332Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3332"
        />
        <path
          d="M10.6656 5.33278H6.66598C6.31239 5.33278 5.97329 5.47324 5.72326 5.72326C5.47324 5.97329 5.33278 6.31239 5.33278 6.66598C5.33278 7.01956 5.47324 7.35866 5.72326 7.60869C5.97329 7.85871 6.31239 7.99917 6.66598 7.99917H9.33237C9.68595 7.99917 10.0251 8.13963 10.2751 8.38965C10.5251 8.63968 10.6656 8.97878 10.6656 9.33237C10.6656 9.68595 10.5251 10.0251 10.2751 10.2751C10.0251 10.5251 9.68595 10.6656 9.33237 10.6656H5.33278"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3332"
        />
        <path
          d="M7.99917 11.6655V4.33288"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.3332"
        />
      </g>
      <defs>
        <clipPath id="clip0_fee_icon">
          <rect width="15.9983" height="15.9983" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
