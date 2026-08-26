import clsx from 'clsx'
import type { IconProps } from './icons/props.ts'
import { ProductLogo } from './ProductLogo.tsx'
import css from './BrandWordmark.module.css'

/**
 * Render the Mintal Agent brand mark and product name.
 * @param props.size - logo height in pixels.
 * @param props.className - extra class for layout placement.
 * @returns the decorative product wordmark.
 */
export function BrandWordmark({ size = 24, className }: IconProps) {
  return (
    <span className={clsx(css.root, className)} style={{ height: size }} aria-hidden="true">
      <ProductLogo size={size} className={css.logo} />
      <span className={css.name}>Mintal Agent</span>
    </span>
  )
}
