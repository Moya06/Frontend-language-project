import { useApp } from '../../store/AppContext'
import { T, UI_LANGUAGES } from '../../data/i18n'
import { Bell, Search, Zap, ChevronRight, Globe, Sun, Moon } from 'lucide-react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useProgress } from '../../hooks/useProgress'
import Dropdown from '../ui/Dropdown'



export default function TopBar() {
  const { uiLang, theme, dispatch } = useApp()
  const navigate = useNavigate()
  const t = T[uiLang] || T['es']
  const { pathname } = useLocation()
  const { xp, streak } = useProgress()

  const currentUi = UI_LANGUAGES.find(l => l.id === uiLang) || UI_LANGUAGES[0]

  
  const CRUMB_LABELS = {
    '':         t.dashboard || 'Dashboard',
    'levels':   t.levels || 'Levels',
    'progress': t.progress || 'Progress',
    'module':   t.modules || 'Module',
    'games':    t.games || 'Games',
    'grammar':  t.grammar || 'Grammar',
    'listening':t.listening || 'Listening',
    'reading':  t.reading || 'Reading',
    'vocab':    t.vocabulary || 'Vocabulary',
  }
  const crumbs = pathname.split('/').filter(Boolean)


  return (
    <header
      className="sticky top-0 z-20 h-16 flex items-center px-6 gap-4 border-b flex-shrink-0"
      style={{ background: 'var(--bg-topbar)', backdropFilter: 'blur(24px)', borderColor: 'var(--border-subtle)' }}
    >
      {/* UI Language Switcher */}
      <Dropdown
        trigger={
          <button className="neo flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white/55 hover:text-white/80 transition-colors cursor-pointer flex-shrink-0">
            <Globe size={14} className="text-brand-400" />
            <span className="font-semibold">{currentUi.flag} {currentUi.nativeName}</span>
          </button>
        }
        items={UI_LANGUAGES.map(lang => ({
          label: `${lang.flag}  ${lang.nativeName}`,
          onClick: () => dispatch({ type: 'SET_UI_LANG', payload: lang.id }),
          active: lang.id === uiLang,
        }))}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm flex-1">
        <Link to="/" className="text-white/30 hover:text-white/60 transition-colors">{t.dashboard || "Home"}</Link>
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={13} className="text-white/20" />
            <span className={i === crumbs.length - 1 ? 'text-white/80 font-medium' : 'text-white/30 hover:text-white/60'}>
              {CRUMB_LABELS[c] ?? c}
            </span>
          </span>
        ))}
      </nav>

      {/* Search */}
      <div className="neo flex items-center gap-2 px-3 py-2 rounded-xl w-52 group">
        <Search size={14} className="text-white/25 group-focus-within:text-white/50 transition-colors flex-shrink-0" />
        <input
          type="text"
          {...{placeholder: t.searchPlaceholder || "Search anything..."}}
          className="input-neo text-xs"
        />
      </div>

      {/* XP badge */}
      <div className="neo flex items-center gap-1.5 px-3 py-2 rounded-xl">
        <Zap size={13} className="text-brand-400" />
        <span className="text-xs font-bold text-white/70">{xp} {t.xpLabel || "XP"}</span>
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        className="neo w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
        style={{ color: 'var(--text-muted)' }}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      {/* Notifications */}
      <button className="w-9 h-9 rounded-xl neo flex items-center justify-center transition-colors relative" style={{ color: 'var(--text-muted)' }}>
        <Bell size={15} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-400" />
      </button>

      {/* Avatar dropdown */}
      <Dropdown
        trigger={
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center cursor-pointer transition-all hover:scale-105 border border-brand-400/30">
            <span className="text-sm">👤</span>
          </div>
        }
        items={[
          { label: 'Profile',  icon: '👤', onClick: () => navigate('/profile') },
          { label: 'Settings', icon: '⚙️', onClick: () => navigate('/settings') },
          { label: 'Help',     icon: '❓', onClick: () => navigate('/help') },
          { label: '─────────', disabled: true },
          { label: 'Log out',  icon: '🚪', danger: true, onClick: () => { dispatch({ type: 'AUTH_LOGOUT' }); navigate('/login', { replace: true }) } },
        ]}
      />
    </header>
  )
}
