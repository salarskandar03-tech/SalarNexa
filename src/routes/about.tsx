import { createFileRoute } from '@tanstack/react-router'
import { ShieldCheck, BadgeCheck, Sparkles } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle } from '@/components/ui'
import { Logo } from '@/components/Logo'
import { companyInfo } from '@/lib/fixtures'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const valueIcons = [ShieldCheck, BadgeCheck, Sparkles]

function AboutPage() {
  return (
    <AppShell title="درباره شرکت" back backTo="/profile">
      <div className="flex flex-col items-center text-center mt-4 sl-rise">
        <Logo size={72} variant="icon" />
        <h1 className="text-[19px] font-extrabold sl-gold-text mt-3">SALAR 07</h1>
        <p className="text-[12.5px] text-[color:var(--sl-ink-muted)] mt-1">
          فعال از سال {companyInfo.founded}
        </p>
      </div>

      <GlassCard gold className="p-5 mt-5">
        <p className="text-[13.5px] text-[#f0ead9] leading-relaxed">{companyInfo.mission}</p>
      </GlassCard>

      <div className="grid grid-cols-3 gap-2.5 mt-5">
        {companyInfo.stats.map((s) => (
          <GlassCard key={s.label} className="p-3.5 text-center">
            <p className="text-[15px] font-extrabold sl-gold-text">{s.value}</p>
            <p className="text-[10.5px] text-[color:var(--sl-ink-muted)] mt-1">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      <SectionTitle>ارزش‌های ما</SectionTitle>
      <div className="flex flex-col gap-3">
        {companyInfo.values.map((v, i) => {
          const Icon = valueIcons[i]
          return (
            <GlassCard key={v.title} className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl sl-navy-btn flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[color:var(--sl-gold-400)]" />
              </div>
              <div>
                <p className="text-[13.5px] font-bold text-[#f0ead9]">{v.title}</p>
                <p className="text-[12px] text-[color:var(--sl-ink-muted)] mt-1 leading-relaxed">{v.desc}</p>
              </div>
            </GlassCard>
          )
        })}
      </div>

      <p className="text-center text-[11px] text-[color:var(--sl-ink-muted)] mt-8 leading-relaxed px-4">
        سالار ۰۷ هیچ‌گونه تضمین درآمد قطعی ارائه نمی‌دهد؛ میزان درآمد کاربران بر اساس میزان مشارکت و فعالیت در
        کمپین‌های تبلیغاتی متغیر است.
      </p>
    </AppShell>
  )
}