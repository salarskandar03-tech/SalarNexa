import { useEffect, useState } from 'react'
import { Logo } from './Logo'

export function Splash() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="sl-splash" data-hidden={hidden ? 'true' : 'false'}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <span className="sl-pulse-ring absolute inline-block w-28 h-28 rounded-full border border-[color:var(--sl-gold-500)]" />
          <span
            className="sl-pulse-ring absolute inline-block w-28 h-28 rounded-full border border-[color:var(--sl-gold-500)]"
            style={{ animationDelay: '0.6s' }}
          />
          <div className="relative w-24 h-24 rounded-full sl-glass-gold flex items-center justify-center">
            <Logo size={56} variant="icon" />
          </div>
        </div>
        <div className="text-center">
          <p className="sl-shimmer text-2xl font-extrabold tracking-wide">SALAR 07</p>
          <p className="text-[13px] text-[color:var(--sl-ink-muted)] mt-1">
            پلتفرم تبلیغات و بازاریابی دیجیتال
          </p>
        </div>
        <div className="w-40 h-1 rounded-full sl-progress-track overflow-hidden">
          <div className="h-full sl-progress-fill" style={{ width: '100%', animation: 'sl-rise 1.4s ease' }} />
        </div>
      </div>
    </div>
  )
}