import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Send, Mail, Clock, ChevronDown, LifeBuoy } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle, PrimaryButton } from '@/components/ui'
import { faqs, supportChannels } from '@/lib/fixtures'

export const Route = createFileRoute('/support')({
  component: SupportPage,
})

const channelIcons = { send: Send, mail: Mail, clock: Clock } as const

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <AppShell title="مرکز پشتیبانی" back backTo="/profile">
      <GlassCard gold className="mt-2 p-5 sl-rise flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl sl-navy-btn flex items-center justify-center shrink-0">
          <LifeBuoy className="w-6 h-6 text-[color:var(--sl-gold-400)]" />
        </div>
        <div>
          <p className="text-[14px] font-bold text-[#f0ead9]">تیم پشتیبانی سالار ۰۷</p>
          <p className="text-[12px] text-[color:var(--sl-ink-muted)]">آماده پاسخگویی به سوالات شما</p>
        </div>
      </GlassCard>

      <SectionTitle>راه‌های ارتباطی</SectionTitle>
      <GlassCard className="divide-y divide-white/[0.06]">
        {supportChannels.map((c) => {
          const Icon = channelIcons[c.icon]
          return (
            <div key={c.label} className="flex items-center gap-3 p-4">
              <div className="w-9 h-9 rounded-xl sl-navy-btn flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[color:var(--sl-gold-400)]" />
              </div>
              <div>
                <p className="text-[12.5px] text-[color:var(--sl-ink-muted)]">{c.label}</p>
                <p className="text-[13.5px] font-semibold text-[#f0ead9]" dir="ltr">
                  {c.value}
                </p>
              </div>
            </div>
          )
        })}
      </GlassCard>

      <SectionTitle>سوالات متداول</SectionTitle>
      <GlassCard className="divide-y divide-white/[0.06]">
        {faqs.map((f, i) => (
          <div key={f.question} className="p-4">
            <button
              type="button"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 text-right"
            >
              <span className="text-[13px] font-semibold text-[#f0ead9]">{f.question}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 text-[color:var(--sl-gold-400)] transition-transform ${
                  openFaq === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openFaq === i && (
              <p className="text-[12.5px] text-[color:var(--sl-ink-muted)] leading-relaxed mt-2.5">{f.answer}</p>
            )}
          </div>
        ))}
      </GlassCard>

      <SectionTitle>ارسال پیام به پشتیبانی</SectionTitle>
      {sent ? (
        <GlassCard gold className="p-5 text-center">
          <p className="text-[13.5px] font-semibold text-[#f0ead9]">پیام شما ارسال شد</p>
          <p className="text-[12px] text-[color:var(--sl-ink-muted)] mt-1">
            تیم پشتیبانی در اسرع وقت پاسخ‌گوی شما خواهد بود.
          </p>
        </GlassCard>
      ) : (
        <GlassCard className="p-4">
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="w-full bg-transparent outline-none text-[13.5px] text-[#f0ead9] placeholder:text-[color:var(--sl-ink-muted)] resize-none"
          />
          <PrimaryButton
            className="mt-3"
            disabled={message.trim().length < 4}
            onClick={() => setSent(true)}
          >
            ارسال پیام
          </PrimaryButton>
        </GlassCard>
      )}
    </AppShell>
  )
}