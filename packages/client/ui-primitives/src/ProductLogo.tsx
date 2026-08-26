import type { IconProps } from './icons/props.ts'

/**
 * Render the Mintal Agent bitmap logo supplied by the product owner.
 * @param props.size - square size in pixels.
 * @param props.className - extra class for layout placement.
 * @returns the decorative product logo image.
 */
export function ProductLogo({ size = 24, className }: IconProps) {
  return (
    <img
      src="/mintal-logo.png"
      width={size}
      height={size}
      className={className}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  )
}
