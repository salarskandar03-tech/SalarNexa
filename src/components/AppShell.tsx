import { Link } from '@tanstack/react-router'
import { ArrowRight, Bell } from 'lucide-react'
import type { ReactNode } from 'react'
import { Logo } from './Logo'
import { BottomNav } from './BottomNav'

type AppShellProps = {
  children: ReactNode
  title?: string
  back?: boolean
  backTo?: string
}

export function AppShell({ children, title, back, backTo = '/profile' }: AppShellProps) {
  return (
    <div className="sl-app-bg">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 px-5 pt-5 pb-3 backdrop-blur-md bg-black/10">
          {back ? (
            <div className="flex items-center gap-3">
              <Link
                to={backTo}
                className="w-9 h-9 rounded-full sl-glass flex items-center justify-center text-[color:var(--sl-gold-400)]"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
              <h1 className="text-[17px] font-bold text-[#f4efe2]">{title}</h1>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Logo size={34} variant="icon" />
                <span className="text-[15px] font-extrabold tracking-wide sl-gold-text">
                  SALAR 07
                </span>
              </div>
              <button
                type="button"
                aria-label="اعلان‌ها"
                className="w-9 h-9 rounded-full sl-glass flex items-center justify-center text-[color:var(--sl-gold-400)]"
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>
          )}
        </header>

        <main className="flex-1 px-5 pb-28">{children}</main>

        <BottomNav />
      </div>
    </div>
  )
}