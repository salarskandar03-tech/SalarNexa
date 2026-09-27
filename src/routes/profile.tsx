import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ChevronLeft,
  TrendingUp,
  ArrowDownLeft,
  LifeBuoy,
  Building2,
  ShieldCheck,
  LogOut,
} from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle } from '@/components/ui'
import { currentUser } from '@/lib/fixtures'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

const menuItems = [
  { to: '/statistics', label: 'آمار عملکرد', icon: TrendingUp },
  { to: '/withdraw', label: 'درخواست‌های برداشت', icon: ArrowDownLeft },
  { to: '/support', label: 'مرکز پشتیبانی', icon: LifeBuoy },
  { to: '/about', label: 'درباره شرکت', icon: Building2 },
] as const

function ProfilePage() {
  return (
    <AppShell>
      <div className="flex flex-col items-center text-center mt-2 sl-rise">
        <div className="w-20 h-20 rounded-full sl-glass-gold flex items-center justify-center text-[26px] font-extrabold sl-gold-text">
          {currentUser.avatarInitials}
        </div>
        <h1 className="text-[18px] font-extrabold text-[#f6f2e8] mt-3">{currentUser.fullName}</h1>
        <p className="text-[12.5px] text-[color:var(--sl-ink-muted)]" dir="ltr">
          {currentUser.username}
        </p>
        <span className="mt-2 text-[11px] px-3 py-1 rounded-full bg-black/25 text-[color:var(--sl-gold-300)] border border-[color:var(--sl-gold-500)]/30 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          {currentUser.tier}
        </span>
      </div>

      <GlassCard className="p-4 mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12.5px] text-[#f0ead9]">سطح {currentUser.level}</span>
          <span className="text-[12px] text-[color:var(--sl-gold-400)] font-bold">{currentUser.levelProgress}٪</span>
        </div>
        <div className="h-2 rounded-full sl-progress-track overflow-hidden">
          <div className="h-full sl-progress-fill" style={{ width: `${currentUser.levelProgress}%` }} />
        </div>
        <p className="text-[11px] text-[color:var(--sl-ink-muted)] mt-2">عضو از {currentUser.memberSince}</p>
      </GlassCard>

      <SectionTitle>حساب کاربری</SectionTitle>
      <GlassCard className="divide-y divide-white/[0.06]">
        {menuItems.map((item) => (
          <Link key={item.to} to={item.to} className="flex items-center gap-3 p-4">
            <div className="w-9 h-9 rounded-xl sl-navy-btn flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-[color:var(--sl-gold-400)]" />
            </div>
            <span className="flex-1 text-[13.5px] font-semibold text-[#f0ead9]">{item.label}</span>
            <ChevronLeft className="w-4 h-4 text-[color:var(--sl-ink-muted)]" />
          </Link>
        ))}
      </GlassCard>

      <button
        type="button"
        className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-2xl sl-glass text-[13.5px] font-semibold text-red-400"
      >
        <LogOut className="w-4 h-4" />
        خروج از حساب
      </button>

      <p className="text-center text-[10.5px] text-[color:var(--sl-ink-muted)] mt-6">SALAR 07 · نسخه ۱٫۰</p>
    </AppShell>
  )
}