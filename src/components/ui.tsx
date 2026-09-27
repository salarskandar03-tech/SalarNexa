import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

// Numbers + Latin currency codes must be isolated from surrounding RTL text,
// otherwise the bidi algorithm can reorder "value" and "AFN" unexpectedly.
export function Amount({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" className={`inline-block ${className}`}>
      {children}
    </span>
  )
}

export function GlassCard({
  children,
  className = '',
  gold = false,
}: {
  children: ReactNode
  className?: string
  gold?: boolean
}) {
  return (
    <div className={`${gold ? 'sl-glass-gold' : 'sl-glass'} rounded-2xl ${className}`}>
      {children}
    </div>
  )
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3 mt-6">
      <h2 className="text-[15px] font-bold text-[#f0ead9]">{children}</h2>
      {action}
    </div>
  )
}

export function StatTile({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: LucideIcon
  label: string
  value: string
  sub?: string
}) {
  return (
    <GlassCard className="p-4 sl-rise">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl sl-navy-btn flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[color:var(--sl-gold-400)]" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-[12px] text-[color:var(--sl-ink-muted)] truncate">{label}</p>
          <p className="text-[17px] font-extrabold text-[#f6f2e8] leading-tight text-right" dir="ltr">
            {value}
          </p>
          {sub && <p className="text-[11px] text-emerald-400/90 mt-0.5">{sub}</p>}
        </div>
      </div>
    </GlassCard>
  )
}

const statusStyles: Record<string, string> = {
  'تکمیل‌شده': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'پرداخت شده': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'فعال': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'در حال بررسی': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'تایید شده': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  'در انتظار فعال‌سازی': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'رد شده': 'bg-red-500/15 text-red-400 border-red-500/30',
}

export function StatusPill({ status }: { status: string }) {
  const cls = statusStyles[status] ?? 'bg-white/10 text-white/70 border-white/15'
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cls}`}>
      {status}
    </span>
  )
}

export function PrimaryButton({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`sl-gold-btn w-full h-[52px] rounded-2xl font-bold text-[15px] py-3.5 transition-transform disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  )
}