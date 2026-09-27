import { Link, useRouterState } from '@tanstack/react-router'
import { Home, TrendingUp, Users, Wallet, User } from 'lucide-react'

const items = [
  { to: '/', label: 'خانه', icon: Home },
  { to: '/earnings', label: 'درآمدها', icon: TrendingUp },
  { to: '/referrals', label: 'معرفی', icon: Users },
  { to: '/wallet', label: 'کیف پول', icon: Wallet },
  { to: '/profile', label: 'پروفایل', icon: User },
] as const

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <nav className="sl-bottom-nav fixed bottom-0 inset-x-0 z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto grid grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.to
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                active ? 'sl-nav-item-active' : 'text-[#767f9c]'
              }`}
            >
              {active && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-[color:var(--sl-gold-400)]" />
              )}
              <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 1.8} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}