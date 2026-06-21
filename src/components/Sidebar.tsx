import { NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { RiseLogo } from '@/components/RiseLogo'
import {
  LayoutDashboard, Users, Target, CheckSquare,
  CreditCard, Link2, Gift, LogOut
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/missions', label: 'Missions', icon: Target },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { to: '/referrals', label: 'Referrals', icon: Link2 },
  { to: '/rewards', label: 'Rewards', icon: Gift },
]

export function Sidebar() {
  const { user, signOut } = useAuth()

  return (
    <aside className="flex w-56 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-4">
        <RiseLogo className="h-7 w-7" />
        <span className="font-bold text-sm tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>RISE AI</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-auto p-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Separator />
      <div className="p-3">
        <div className="mb-2 truncate px-1 text-xs text-muted-foreground">
          {user?.email}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
