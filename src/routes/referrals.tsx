import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Copy, Check, Users, Gift, Award } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle, StatTile } from '@/components/ui'
import { referralData } from '@/lib/fixtures'

export const Route = createFileRoute('/referrals')({
  component: ReferralsPage,
})

function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const progressPct = Math.min(
    100,
    Math.round((referralData.totalReferrals / referralData.nextTierAt) * 100),
  )

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralData.link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <AppShell title="معرفی و پاداش" back backTo="/">
      <GlassCard gold className="mt-2 p-5 sl-rise">
        <p className="text-[13px] text-[#e9dcb4]/80">لینک اختصاصی معرفی شما</p>
        <div className="mt-3 flex items-center gap-2 bg-black/30 rounded-xl px-3 py-3 border border-white/10">
          <p className="flex-1 text-[12px] text-[#e5ddc4] truncate" dir="ltr">
            {referralData.link}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="کپی لینک"
            className="w-9 h-9 shrink-0 rounded-lg sl-gold-btn flex items-center justify-center"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        {copied && <p className="text-[11px] text-emerald-400 mt-2">لینک کپی شد</p>}
      </GlassCard>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <StatTile icon={Users} label="مجموع معرفی‌شده‌ها" value={referralData.totalReferrals.toLocaleString('en-US')} />
        <StatTile icon={Award} label="اعضای فعال" value={referralData.activeReferrals.toLocaleString('en-US')} />
      </div>

      <SectionTitle>پیشرفت تا سطح بعدی</SectionTitle>
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12.5px] text-[#f0ead9]">
            {referralData.totalReferrals} از {referralData.nextTierAt} نفر
          </span>
          <span className="text-[12px] text-[color:var(--sl-gold-400)] font-bold">{progressPct}٪</span>
        </div>
        <div className="h-2.5 rounded-full sl-progress-track overflow-hidden">
          <div className="h-full sl-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-[11.5px] text-[color:var(--sl-ink-muted)] mt-2">
          با معرفی {referralData.nextTierAt - referralData.totalReferrals} نفر دیگر به سطح طلایی ارتقا می‌یابید.
        </p>
      </GlassCard>

      <SectionTitle>سطوح پاداش معرفی</SectionTitle>
      <GlassCard className="divide-y divide-white/[0.06]">
        {referralData.tiers.map((tier) => (
          <div key={tier.threshold} className="flex items-center gap-3 p-4">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                tier.achieved ? 'sl-gold-btn' : 'sl-navy-btn'
              }`}
            >
              <Gift className={`w-4 h-4 ${tier.achieved ? '' : 'text-[color:var(--sl-gold-400)]'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#f0ead9]">{tier.threshold} نفر معرفی</p>
              <p className="text-[11.5px] text-[color:var(--sl-ink-muted)]">{tier.reward}</p>
            </div>
            {tier.achieved && (
              <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                دریافت شد
              </span>
            )}
          </div>
        ))}
      </GlassCard>

      <SectionTitle>معرفی‌های اخیر</SectionTitle>
      <GlassCard className="divide-y divide-white/[0.06]">
        {referralData.recentReferrals.map((r) => (
          <div key={r.name} className="flex items-center justify-between p-4">
            <div>
              <p className="text-[13px] font-semibold text-[#f0ead9]">{r.name}</p>
              <p className="text-[11.5px] text-[color:var(--sl-ink-muted)]">{r.date}</p>
            </div>
            <span
              className={`text-[11px] px-2 py-1 rounded-full border ${
                r.status === 'فعال'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
      </GlassCard>
    </AppShell>
  )
}