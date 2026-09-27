import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { Landmark, Smartphone, CheckCircle2, Info } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { Amount, GlassCard, SectionTitle, StatusPill, PrimaryButton } from '@/components/ui'
import { dashboardStats, formatAmount, minWithdrawal, withdrawalHistory, withdrawalMethods } from '@/lib/fixtures'

export const Route = createFileRoute('/withdraw')({
  component: WithdrawPage,
})

const methodIcons = { bank: Landmark, mobile: Smartphone } as const

function WithdrawPage() {
  const [method, setMethod] = useState(withdrawalMethods[0].id)
  const [amount, setAmount] = useState('')
  const [destination, setDestination] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const numericAmount = Number(amount)
  const isValid =
    amount !== '' &&
    numericAmount >= minWithdrawal &&
    numericAmount <= dashboardStats.availableBalance &&
    destination.trim().length > 2

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <AppShell title="درخواست برداشت" back backTo="/wallet">
        <div className="flex flex-col items-center text-center mt-16 sl-rise">
          <div className="w-16 h-16 rounded-full sl-glass-gold flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-[color:var(--sl-gold-400)]" />
          </div>
          <h2 className="text-[17px] font-bold text-[#f0ead9]">درخواست شما ثبت شد</h2>
          <p className="text-[13px] text-[color:var(--sl-ink-muted)] mt-2 max-w-[280px]">
            درخواست برداشت به مبلغ <Amount>{formatAmount(numericAmount)}</Amount> ثبت شد و ظرف ۱ تا ۳ روز کاری
            بررسی می‌شود.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setAmount('')
              setDestination('')
            }}
            className="sl-navy-btn mt-6 rounded-xl px-6 py-3 text-[13px] font-bold text-[#f0ead9]"
          >
            ثبت درخواست جدید
          </button>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell title="درخواست برداشت" back backTo="/wallet">
      <GlassCard gold className="mt-2 p-4 flex items-center justify-between sl-rise">
        <span className="text-[13px] text-[#e9dcb4]/80">موجودی قابل برداشت</span>
        <span className="text-[16px] font-extrabold sl-gold-text" dir="ltr">
          {formatAmount(dashboardStats.availableBalance)}
        </span>
      </GlassCard>

      <form onSubmit={handleSubmit}>
        <SectionTitle>مبلغ برداشت</SectionTitle>
        <GlassCard className="p-4">
          <input
            type="number"
            inputMode="numeric"
            placeholder={`حداقل ${minWithdrawal} AFN`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent outline-none text-[20px] font-bold text-[#f6f2e8] placeholder:text-[color:var(--sl-ink-muted)] placeholder:font-normal placeholder:text-[15px]"
            dir="ltr"
          />
        </GlassCard>

        <SectionTitle>روش دریافت</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {withdrawalMethods.map((m) => {
            const Icon = methodIcons[m.id as keyof typeof methodIcons]
            const active = method === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`p-3.5 rounded-2xl text-right transition-colors ${
                  active ? 'sl-glass-gold' : 'sl-glass'
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${active ? 'text-[color:var(--sl-gold-400)]' : 'text-[#9aa3bd]'}`} />
                <p className="text-[13px] font-semibold text-[#f0ead9]">{m.label}</p>
                <p className="text-[10.5px] text-[color:var(--sl-ink-muted)] mt-0.5">{m.hint}</p>
              </button>
            )
          })}
        </div>

        <SectionTitle>مشخصات دریافت‌کننده</SectionTitle>
        <GlassCard className="p-4">
          <input
            type="text"
            placeholder={method === 'bank' ? 'شماره کارت بانکی' : 'شماره تماس حواله'}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-transparent outline-none text-[14px] text-[#f0ead9] placeholder:text-[color:var(--sl-ink-muted)]"
          />
        </GlassCard>

        <div className="flex items-start gap-2 mt-4 px-1">
          <Info className="w-4 h-4 text-[color:var(--sl-ink-muted)] mt-0.5 shrink-0" />
          <p className="text-[11.5px] text-[color:var(--sl-ink-muted)] leading-relaxed">
            درخواست‌های برداشت پس از بررسی توسط تیم مالی ظرف ۱ تا ۳ روز کاری پردازش می‌شوند. حداقل مبلغ قابل برداشت
            {' '}
            <Amount>{formatAmount(minWithdrawal)}</Amount> است.
          </p>
        </div>

        <PrimaryButton className="mt-5" type="submit" disabled={!isValid}>
          ثبت درخواست برداشت
        </PrimaryButton>
      </form>

      <SectionTitle>تاریخچه درخواست‌ها</SectionTitle>
      <GlassCard className="divide-y divide-white/[0.06]">
        {withdrawalHistory.map((w) => (
          <div key={w.id} className="flex items-center justify-between p-4">
            <div>
              <p className="text-[13.5px] font-semibold text-[#f0ead9] text-right" dir="ltr">
                {formatAmount(w.amount)}
              </p>
              <p className="text-[11.5px] text-[color:var(--sl-ink-muted)]">
                {w.method} · {w.destination} · {w.date}
              </p>
            </div>
            <StatusPill status={w.status} />
          </div>
        ))}
      </GlassCard>
    </AppShell>
  )
}