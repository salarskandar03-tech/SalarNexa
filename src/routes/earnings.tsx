import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Eye, Users, Gift } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, StatusPill } from '@/components/ui'
import { earningsHistory, formatAmount, type EarningTransaction } from '@/lib/fixtures'

export const Route = createFileRoute('/earnings')({
  component: EarningsPage,
})

const filters = [
  { key: 'all', label: 'همه' },
  { key: 'ad', label: 'تبلیغات' },
  { key: 'referral', label: 'معرفی' },
  { key: 'bonus', label: 'پاداش' },
] as const

const typeIcon: Record<EarningTransaction['type'], typeof Eye> = {
  ad: Eye,
  referral: Users,
  bonus: Gift,
}

function EarningsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]['key']>('all')

  const filtered =
    filter === 'all' ? earningsHistory : earningsHistory.filter((e) => e.type === filter)

  const total = filtered.reduce((sum, e) => sum + e.amount, 0)

  return (
    <AppShell title="تاریخچه درآمد" back backTo="/">
      <GlassCard gold className="mt-2 p-4 sl-rise flex items-center justify-between">
        <span className="text-[13px] text-[#e9dcb4]/80">مجموع نتایج فیلترشده</span>
        <span className="text-[17px] font-extrabold sl-gold-text" dir="ltr">
          {formatAmount(total)}
        </span>
      </GlassCard>

      <div className="flex gap-2 mt-4 overflow-x-auto sl-scrollbar-none pb-1">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`shrink-0 px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-colors ${
              filter === f.key
                ? 'sl-gold-btn border-transparent'
                : 'sl-glass text-[#cfc9b8] border-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <GlassCard className="mt-4 divide-y divide-white/[0.06]">
        {filtered.map((tx) => {
          const Icon = typeIcon[tx.type]
          return (
            <div key={tx.id} className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-xl sl-navy-btn flex items-center justify-center shrink-0">
                <Icon className="w-[18px] h-[18px] text-[color:var(--sl-gold-400)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-semibold text-[#f0ead9] truncate">{tx.title}</p>
                <p className="text-[11.5px] text-[color:var(--sl-ink-muted)]">{tx.date}</p>
              </div>
              <div className="text-left shrink-0 flex flex-col items-end gap-1">
                <p className="text-[13.5px] font-bold text-emerald-400" dir="ltr">
                  +{formatAmount(tx.amount)}
                </p>
                <StatusPill status={tx.status} />
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="p-6 text-center text-[13px] text-[color:var(--sl-ink-muted)]">
            تراکنشی در این دسته یافت نشد.
          </p>
        )}
      </GlassCard>
    </AppShell>
  )
}