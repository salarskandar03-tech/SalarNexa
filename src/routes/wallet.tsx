import { createFileRoute, Link } from '@tanstack/react-router'
import { Eye, Users, Gift, ArrowDownLeft, ChevronLeft } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { GlassCard, SectionTitle, StatusPill } from '@/components/ui'
import { formatAmount, earningsSourceBreakdown } from '@/lib/fixtures'
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