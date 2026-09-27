import { createFileRoute, Link } from '@tanstack/react-router'
import { Eye, Users, Gift, ArrowDownLeft, ChevronLeft } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle, StatusPill } from '@/components/ui'
import { formatAmount, earningsSourceBreakdown } from '@/lib/fixtures'
import { getUser, getWithdrawals } from '@/lib/queries'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/wallet')({
  component: WalletPage,
})

const sourceIcons = [Eye, Users, Gift]

function WalletPage() {
  const [user, setUser] = useState<any | null>(null)
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = '8ae50825-8618-46ff-80c3-b7398c5962cb'

        setUser({
  balance: 1000,
  total_earnings: 5000,
})

       setWithdrawals([])

        
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <AppShell title="کیف پول" back backTo="/">
        <p className="p-5 text-center">در حال بارگذاری...</p>
      </AppShell>
    )
  }

  if (!user) {
    return (
      <AppShell title="کیف پول" back backTo="/">
        <p className="text-red-500 p-5 text-center">
          User not found
        </p>
      </AppShell>
    )
  }

  const totalPct = earningsSourceBreakdown.data.reduce(
    (a, b) => a + b,
    0
  )

  return (
    <AppShell title="کیف پول" back backTo="/">
      <GlassCard gold className="mt-2 p-5 sl-rise">
        <p className="text-[13px] text-[#e9dcb4]/80">
          موجودی قابل برداشت
        </p>

        <p
          className="mt-2 text-[30px] font-extrabold sl-gold-text text-right"
          dir="ltr"
        >
          {formatAmount(user.balance || 0)}
        </p>

        <div className="sl-divider my-4" />

        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[color:var(--sl-ink-muted)]">
            مجموع درآمد کل
          </span>

          <span
            className="font-bold text-[#f0ead9]"
            dir="ltr"
          >
            {formatAmount(user.total_earnings || 0)}
          </span>
        </div>

        <Link
          to="/withdraw"
          className="sl-gold-btn mt-4 rounded-xl py-3 text-center text-[14px] font-bold flex items-center justify-center gap-2"
        >
          <ArrowDownLeft className="w-4 h-4" />
          ثبت درخواست برداشت
        </Link>
      </GlassCard>

      <SectionTitle>منابع درآمد</SectionTitle>

      <GlassCard className="p-4">
        {earningsSourceBreakdown.labels.map((label, i) => {
          const Icon = sourceIcons[i]
          const pct = Math.round(
            (earningsSourceBreakdown.data[i] / totalPct) * 100
          )

          return (
            <div key={label} className={i > 0 ? 'mt-4' : ''}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[color:var(--sl-gold-400)]" />
                  <span className="text-[12.5px] text-[#f0ead9]">
                    {label}
                  </span>
                </div>

                <span className="text-[12px] text-[color:var(--sl-ink-muted)]">
                  {pct}٪
                </span>
              </div>

              <div className="h-1.5 rounded-full sl-progress-track overflow-hidden">
                <div
                  className="h-full sl-progress-fill"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </GlassCard>

      <SectionTitle
        action={
          <Link
            to="/withdraw"
            className="text-[12px] text-[color:var(--sl-gold-400)] flex items-center gap-0.5"
          >
            همه درخواست‌ها
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        }
      >
        آخرین درخواست‌های برداشت
      </SectionTitle>

      <GlassCard className="divide-y divide-white/[0.06]">
        {withdrawals.length === 0 ? (
          <div className="p-4 text-center text-[color:var(--sl-ink-muted)]">
            هنوز درخواست برداشتی ثبت نشده است
          </div>
        ) : (
          withdrawals.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p
                  className="text-[13.5px] font-semibold text-[#f0ead9] text-right"
                  dir="ltr"
                >
                  {formatAmount(w.amount)}
                </p>

                <p className="text-[11.5px] text-[color:var(--sl-ink-muted)]">
                  {w.method} ·{' '}
                  {w.created_at
                    ? new Date(w.created_at).toLocaleDateString('fa-IR')
                    : '-'}
                </p>
              </div>

              <StatusPill status={w.status} />
            </div>
          ))
        )}
      </GlassCard>
    </AppShell>
  )
}