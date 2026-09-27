type LogoProps = {
  size?: number
  variant?: 'full' | 'icon'
  className?: string
}

export function Logo({ size = 64, variant = 'icon', className = '' }: LogoProps) {
  const file = variant === 'full' ? 'salar07-logo.png' : 'salar07-icon.png'
  const w = size * 2
  const src = `/.netlify/images?url=/img/${file}&w=${w}&fm=webp`

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt="SALAR 07"
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  )
}