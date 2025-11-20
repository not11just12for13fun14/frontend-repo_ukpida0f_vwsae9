import { Home, Users, Map, LogIn, UserPlus } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const items = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/komunitas', label: 'Komunitas', icon: Users },
  { to: '/admin', label: 'Admin', icon: Map },
  { to: '/login', label: 'Login', icon: LogIn },
  { to: '/register', label: 'Register', icon: UserPlus },
]

export default function Nav() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-3 px-3 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur border border-slate-200/60 dark:border-slate-700/60 shadow-xl">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to
          return (
            <Link key={to} to={to} className={`group flex items-center gap-2 px-4 py-2 rounded-xl transition ${active ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'}`}>
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
