import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle, StatTile } from '@/components/ui'
import { Eye, TrendingUp } from 'lucide-react'
import { weeklyAdsViewed, weeklyLabels, earningsTrend, earningsSourceBreakdown, dashboardStats, formatAmount } from '@/lib/fixtures'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Filler)

export const Route = createFileRoute('/statistics')({
  component: StatisticsPage,
})

const goldGrid = { color: 'rgba(255,255,255,0.06)' }
const goldTicks = { color: '#9aa3bd', font: { family: 'Vazirmatn', size: 10 } }

function StatisticsPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <AppShell title="آمار عملکرد" back backTo="/">
      <div className="grid grid-cols-2 gap-3 mt-2">
        <StatTile icon={Eye} label="تبلیغات این هفته" value={weeklyAdsViewed.reduce((a, b) => a + b, 0).toLocaleString('en-US')} />
        <StatTile icon={TrendingUp} label="درآمد این هفته" value={formatAmount(earningsTrend.reduce((a, b) => a + b, 0))} />
      </div>

      {mounted && (
        <>
          <SectionTitle>تبلیغات مشاهده‌شده (هفتگی)</SectionTitle>
          <GlassCard className="p-4">
            <Bar
              data={{
                labels: weeklyLabels,
                datasets: [
                  {
                    data: weeklyAdsViewed,
                    backgroundColor: 'rgba(212,175,55,0.75)',
                    borderRadius: 6,
                    barThickness: 16,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: goldTicks },
                  y: { grid: goldGrid, ticks: goldTicks, beginAtZero: true },
                },
              }}
            />
          </GlassCard>

          <SectionTitle>روند درآمد هفتگی</SectionTitle>
          <GlassCard className="p-4">
            <Line
              data={{
                labels: weeklyLabels,
                datasets: [
                  {
                    data: earningsTrend,
                    borderColor: '#e0b95a',
                    backgroundColor: 'rgba(224,185,90,0.12)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#e0b95a',
                    pointBorderColor: '#0a0d16',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: goldTicks },
                  y: { grid: goldGrid, ticks: goldTicks, beginAtZero: true },
                },
              }}
            />
          </GlassCard>

          <SectionTitle>سهم منابع درآمد</SectionTitle>
          <GlassCard className="p-4">
            <div className="max-w-[220px] mx-auto">
              <Doughnut
                data={{
                  labels: earningsSourceBreakdown.labels,
                  datasets: [
                    {
                      data: earningsSourceBreakdown.data,
                      backgroundColor: [
                        'rgba(212,175,55,0.9)',
                        'rgba(26,38,80,0.9)',
                        'rgba(154,163,189,0.6)',
                      ],
                      borderWidth: 0,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { color: '#cfc9b8', font: { family: 'Vazirmatn', size: 11 }, padding: 14 },
                    },
                  },
                }}
              />
            </div>
          </GlassCard>
        </>
      )}

      <GlassCard className="mt-6 p-4 flex items-center justify-between">
        <span className="text-[12.5px] text-[color:var(--sl-ink-muted)]">مجموع درآمد از ابتدای عضویت</span>
        <span className="text-[15px] font-extrabold sl-gold-text" dir="ltr">
          {formatAmount(dashboardStats.totalEarnings)}
        </span>
      </GlassCard>
    </AppShell>
  )
}