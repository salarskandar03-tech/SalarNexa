import { createFileRoute, Link } from '@tanstack/react-router'
import { Wallet, TrendingUp, Users, Eye, ChevronLeft, ArrowDownLeft, ArrowUpRight, Gift, Send } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle, StatTile } from '@/components/ui'
import {
  currentUser,
  dashboardStats,
  formatAmount,
  recentActivity,
  type ActivityItem,
} from '@/lib/fixtures'

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
  return (
    <AppShell>
      <section className="sl-rise mt-2">
        <p className="text-[13px] text-[color:var(--sl-ink-muted)]">خوش آمدید،</p>
        <h1 className="text-[20px] font-extrabold text-[#f6f2e8]">{currentUser.fullName}</h1>
      </section>

      {/* Balance hero card */}
      <GlassCard gold className="mt-4 p-5 sl-rise relative overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-[#e9dcb4]/80">موجودی قابل برداشت</p>
          <span className="text-[11px] px-2 py-1 rounded-full bg-black/25 text-[color:var(--sl-gold-300)] border border-[color:var(--sl-gold-500)]/30">
            {currentUser.tier}
          </span>
        </div>
        <p className="mt-2 text-[32px] font-extrabold sl-gold-text leading-tight text-right" dir="ltr">
          {formatAmount(dashboardStats.availableBalance)}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link to="/withdraw" className="sl-gold-btn rounded-xl py-2.5 text-center text-[13px] font-bold">
            درخواست برداشت
          </Link>
          <Link
            to="/wallet"
            className="sl-navy-btn rounded-xl py-2.5 text-center text-[13px] font-bold text-[#f0ead9]"
          >
            مشاهده کیف پول
          </Link>
        </div>
      </GlassCard>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <StatTile icon={TrendingUp} label="مجموع درآمد" value={formatAmount(dashboardStats.totalEarnings)} />
        <StatTile icon={Users} label="معرفی‌شده‌ها" value={dashboardStats.referralsCount.toLocaleString('en-US')} />
        <StatTile icon={Eye} label="تبلیغات مشاهده‌شده" value={dashboardStats.adsViewed.toLocaleString('en-US')} />
        <StatTile icon={Wallet} label="موجودی فعلی" value={formatAmount(dashboardStats.availableBalance)} />
      </div>

      {/* Quick links */}
      <SectionTitle>دسترسی سریع</SectionTitle>
      <div className="grid grid-cols-4 gap-2.5">
        {[
          { to: '/statistics', label: 'آمار', icon: TrendingUp },
          { to: '/referrals', label: 'معرفی', icon: Users },
          { to: '/support', label: 'پشتیبانی', icon: Send },
          { to: '/about', label: 'درباره ما', icon: Gift },
        ].map((q) => (
          <Link key={q.to} to={q.to} className="flex flex-col items-center gap-2">
            <div className="w-full aspect-square rounded-2xl sl-glass flex items-center justify-center">
              <q.icon className="w-5 h-5 text-[color:var(--sl-gold-400)]" />
            </div>
            <span className="text-[11px] text-[#cfc9b8]">{q.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
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
        {recentActivity.map((item) => {
          const Icon = activityIcon[item.type]
          const positive = item.amount >= 0
          return (
            <div key={item.id} className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-xl sl-navy-btn flex items-center justify-center shrink-0">
                <Icon className="w-[18px] h-[18px] text-[color:var(--sl-gold-400)]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-[#f0ead9] truncate">{item.title}</p>
                <p className="text-[11.5px] text-[color:var(--sl-ink-muted)] truncate">{item.subtitle}</p>
              </div>
              <div className="text-left shrink-0">
                <p
                  className={`text-[13.5px] font-bold ${positive ? 'text-emerald-400' : 'text-red-400'}`}
                  dir="ltr"
                >
                  {positive ? '+' : ''}
                  {formatAmount(item.amount)}
                </p>
                <p className="text-[10.5px] text-[color:var(--sl-ink-muted)]">{item.date}</p>
              </div>
            </div>
          )
        })}
      </GlassCard>
    </AppShell>
  )
}