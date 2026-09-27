import { createFileRoute, Link } from '@tanstack/react-router'
import { Wallet, Users, Eye, ChevronLeft, ArrowDownLeft, ArrowUpRight, Gift, Send } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle, StatTile } from '@/components/ui'
import { formatAmount, type ActivityItem } from '@/lib/fixtures'
import { getUser, getUserActivities } from '@/lib/queries'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

const activityIcon: Record<ActivityItem['type'], typeof ArrowUpRight> = {
  ad: Eye,
  referral: Users,
  withdrawal: ArrowDownLeft,
  bonus: Gift,
}

function Home() {
  const [user, setUser] = useState<any>(null)
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      const data = await getUser('USER_ID')
      const acts = await getUserActivities('USER_ID')

      setUser(data)
      setActivities(acts)
    }

    loadData()
  }, [])

  if (!user) {
    return (
      <AppShell>
        <p className="text-[#f6f2e8] p-5">در حال بارگذاری...</p>
      </AppShell>
    )
  }
  return (
    <AppShell>
      <section className="sl-rise mt-2">
        <p className="text-[13px] text-[color:var(--sl-ink-muted)]">خوش آمدید،</p>
        <h1 className="text-[20px] font-extrabold text-[#f6f2e8]">
          {user.full_name || 'همکار عزیز'}
        </h1>
      </section>

      <GlassCard gold className="mt-4 p-5 sl-rise relative overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-[#e9dcb4]/80">موجودی قابل برداشت</p>
          <span className="text-[11px] px-2 py-1 rounded-full bg-black/25 text-[color:var(--sl-gold-300)] border border-[color:var(--sl-gold-500)]/30">
            عضو
          </span>
        </div>

        <p className="mt-2 text-[32px] font-extrabold sl-gold-text leading-tight text-right" dir="ltr">
          {formatAmount(user.balance || 0)}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link to="/withdraw" className="sl-gold-btn rounded-xl py-2.5 text-center text-[13px] font-bold">
            درخواست برداشت
          </Link>

          <Link to="/wallet" className="sl-navy-btn rounded-xl py-2.5 text-center text-[13px] font-bold text-[#f0ead9]">
            مشاهده کیف پول
          </Link>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <StatTile
          icon={Users}
          label="معرفی‌شده‌ها"
          value={(user.referrals_count || 0).toLocaleString('en-US')}
        />

        <StatTile
          icon={Wallet}
          label="موجودی فعلی"
          value={formatAmount(user.balance || 0)}
        />
      </div>

      <SectionTitle
        action={
          <Link to="/earnings" className="text-[12px] text-[color:var(--sl-gold-400)] flex items-center gap-0.5">
            مشاهده همه
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        }
      >
        فعالیت‌های اخیر
      </SectionTitle>
      <GlassCard className="divide-y divide-white/[0.06]">
        {activities.map((item) => {
          const Icon = activityIcon[item.type as ActivityItem['type']] || Gift
          const positive = item.amount >= 0

          return (
            <div key={item.id} className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-xl sl-navy-btn flex items-center justify-center shrink-0">
                <Icon className="w-[18px] h-[18px] text-[color:var(--sl-gold-400)]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-[#f0ead9] truncate">
                  {item.title}
                </p>

                <p className="text-[11.5px] text-[color:var(--sl-ink-muted)] truncate">
                  {item.subtitle}
                </p>
              </div>

              <div className="text-left shrink-0">
                <p
                  className={`text-[13.5px] font-bold ${
                    positive ? 'text-emerald-400' : 'text-red-400'
                  }`}
                  dir="ltr"
                >
                  {positive ? '+' : ''}
                  {formatAmount(item.amount)}
                </p>

                <p className="text-[10.5px] text-[color:var(--sl-ink-muted)]">
                  {new Date(item.created_at).toLocaleDateString('fa-IR')}
                </p>
              </div>
            </div>
          )
        })}
      </GlassCard>
    </AppShell>
  )
}