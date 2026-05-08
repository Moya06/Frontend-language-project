import {
  LayoutDashboard, BookOpen, Headphones, BookMarked,
  GamepadIcon, MessageSquare, TrendingUp,
  ChevronLeft, ChevronRight, Flame, RefreshCcw,
  User, Settings, HelpCircle, LogOut, ChevronUp,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../../store/AppContext'
import { useProgress } from '../../hooks/useProgress'
import { T } from '../../data/i18n'
import clsx from 'clsx'
import { useState, useRef, useEffect } from 'react'

const NAV_MAIN = [
  { to: '/',         icon: LayoutDashboard, tKey: 'dashboard' },
  { to: '/levels',   icon: BookMarked,      tKey: 'levels'    },
  { to: '/progress', icon: TrendingUp,      tKey: 'progress'  },
]

const NAV_MODULES = [
  { to: '/module/games',     icon: GamepadIcon,     tKey: 'games'      },
  { to: '/module/grammar',   icon: BookOpen,        tKey: 'grammar'    },
  { to: '/module/listening', icon: Headphones,      tKey: 'listening'  },
  { to: '/module/reading',   icon: BookMarked,      tKey: 'reading'    },
  { to: '/module/vocab',     icon: MessageSquare,   tKey: 'vocabulary' },
]

export default function Sidebar() {
  const { sidebarOpen, dispatch, language, uiLang, user } = useApp()
  const t = T[uiLang] ?? T['es']
  const { xp, streak, level } = useProgress()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  const USER_MENU = [
    {
      icon: User,
      label: { es: 'Perfil', en: 'Profile', it: 'Profilo', pt: 'Perfil' },
      onClick: () => { setMenuOpen(false); navigate('/profile') },
    },
    {
      icon: Settings,
      label: { es: 'Ajustes', en: 'Settings', it: 'Impostazioni', pt: 'Configurações' },
      onClick: () => { setMenuOpen(false); navigate('/settings') },
    },
    {
      icon: HelpCircle,
      label: { es: 'Ayuda', en: 'Help', it: 'Aiuto', pt: 'Ajuda' },
      onClick: () => { setMenuOpen(false); navigate('/help') },
    },
  ]

  return (
    <aside className={clsx(
      'flex flex-col flex-shrink-0 h-screen sticky top-0 transition-all duration-300 z-30 border-r',
      sidebarOpen ? 'w-60' : 'w-[68px]',
    )}
      style={{ background: 'var(--bg-sidebar)', backdropFilter: 'blur(24px)', borderColor: 'var(--sidebar-border)' }}
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-lg flex-shrink-0">
          🌐
        </div>
        {sidebarOpen && (
          <span className="font-bold text-sm text-white tracking-tight whitespace-nowrap">
            Grammar<span className="text-brand-400">Languages</span>
          </span>
        )}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          className="ml-auto w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white/70 transition-all flex-shrink-0"
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      {/* ── Language switcher (top) ── */}
      {language && (
        <div className="px-3 py-2 border-b border-white/[0.06] flex-shrink-0">
          <button
            onClick={() => navigate('/select')}
            className={clsx(
              'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all hover:bg-white/[0.08] border border-white/[0.06]',
              sidebarOpen ? '' : 'justify-center',
            )}
            title={sidebarOpen ? undefined : `Switch language (${language.name})`}
          >
            <span className="text-base flex-shrink-0">{language.flag}</span>
            {sidebarOpen && (
              <>
                <span className="text-xs font-semibold text-white/70 flex-1 text-left">{language.name}</span>
                <RefreshCcw size={11} className="text-white/30" />
              </>
            )}
          </button>
        </div>
      )}

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {sidebarOpen && (
          <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-[2px] text-white/25">{t.menu}</p>
        )}
        {NAV_MAIN.map(({ to, icon: Icon, tKey }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) =>
            clsx('sidebar-link', isActive && 'active')
          }>
            <Icon size={17} className="flex-shrink-0" />
            {sidebarOpen && <span>{t[tKey]}</span>}
          </NavLink>
        ))}

        {sidebarOpen && (
          <p className="px-2 mt-5 mb-2 text-[10px] font-semibold uppercase tracking-[2px] text-white/25">{t.modules}</p>
        )}
        {!sidebarOpen && <div className="my-3 border-t border-white/[0.05]" />}
        {NAV_MODULES.map(({ to, icon: Icon, tKey }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            clsx('sidebar-link', isActive && 'active')
          }>
            <Icon size={17} className="flex-shrink-0" />
            {sidebarOpen && <span>{t[tKey]}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── User card + menu ── */}
      <div className="p-3 border-t border-white/[0.06] flex-shrink-0 relative" ref={menuRef}>

        {/* Popup menu */}
        {menuOpen && (
          <div
            className="absolute left-3 right-3 bottom-[calc(100%-8px)] rounded-2xl border overflow-hidden shadow-lg z-50"
            style={{ background: 'var(--bg-overlay)', borderColor: 'var(--border-card)', boxShadow: 'var(--shadow-glass-lg)' }}
          >
            {/* User info header */}
            <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <p className="text-sm font-bold" style={{ color: 'var(--text-base)' }}>
                {user?.displayName || user?.username || 'Student'}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                {user?.email || ''}
              </p>
            </div>

            {/* Menu items */}
            <div className="p-1.5 space-y-0.5">
              {USER_MENU.map(({ icon: Icon, label, onClick }) => (
                <button
                  key={label.en}
                  onClick={onClick}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/[0.06] text-left"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Icon size={15} style={{ color: 'var(--text-muted)' }} />
                  {label[uiLang] || label.en}
                </button>
              ))}
            </div>

            {/* Divider + logout */}
            <div className="p-1.5 pt-0">
              <div className="h-px mb-1.5" style={{ background: 'var(--border-subtle)' }} />
              <button
                onClick={() => {
                  setMenuOpen(false)
                  dispatch({ type: 'AUTH_LOGOUT' })
                  navigate('/login', { replace: true })
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-red-500/10 text-left"
                style={{ color: '#f87171' }}
              >
                <LogOut size={15} />
                {{ es: 'Cerrar sesión', en: 'Log out', it: 'Esci', pt: 'Sair' }[uiLang] || 'Log out'}
              </button>
            </div>
          </div>
        )}

        {/* Clickable user card */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className={clsx(
            'w-full neo p-3 transition-all hover:bg-white/[0.06] cursor-pointer',
            menuOpen && 'ring-1 ring-brand-500/30',
            sidebarOpen ? '' : 'flex justify-center',
          )}
        >
          {sidebarOpen ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                    <User size={13} className="text-brand-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white/80 truncate max-w-[80px]">
                      {user?.displayName || user?.username || 'Student'}
                    </p>
                    <p className="text-[10px] text-white/30">{level.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame size={13} />
                    <span className="text-xs font-bold">{streak}</span>
                  </div>
                  <ChevronUp size={13} className={clsx('text-white/30 transition-transform', menuOpen ? '' : 'rotate-180')} />
                </div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/30">{xp} XP</span>
                <span className="text-[10px] text-white/20">{level.next} XP</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-violet-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((xp / level.next) * 100, 100)}%` }}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <User size={15} className="text-brand-400" />
              <div className="flex items-center gap-0.5 text-orange-400">
                <Flame size={10} />
                <span className="text-[9px] font-bold">{streak}</span>
              </div>
            </div>
          )}
        </button>
      </div>


    </aside>
  )
}
