import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/ui/StatCard'
import LevelCard from '../components/levels/LevelCard'
import { useProgress } from '../hooks/useProgress'
import { LEVELS } from '../data/levels'
import { MODULES } from '../data/modules'
import ProgressBar from '../components/ui/ProgressBar'
import { useApp } from '../store/AppContext'
import { T } from '../data/i18n'

export default function Dashboard() {
  const { xp, streak, overallProgress, completedActivities, totalActivities, level } = useProgress()
  const { uiLang, language, placementLevel, testCompleted } = useApp()
  const t = T[uiLang] || T['es']
  const placedLevel = LEVELS.find(l => l.id === placementLevel)
  
  // Recently active levels (just show first 3 for demo)
  const recentLevels = LEVELS.slice(0, 3)

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">
            {t.welcomeBack} 👋
          </h1>
          <p className="text-white/40 text-sm">{t.readyToContinue || 'Ready to continue your language journey?'}</p>
        </div>
        <Link to="/levels" className="btn-primary">
          <BookOpen size={15} />
          {t.allLevels || 'Browse Levels'}
        </Link>
      </div>

      {/* Placement level banner */}
      {testCompleted && placementLevel && placedLevel && (
        <div
          className="glass p-4 flex items-center gap-4 relative overflow-hidden"
          style={{ borderColor: `${placedLevel.color}30` }}
        >
          <div
            className="absolute inset-0 rounded-[1.25rem] pointer-events-none opacity-50"
            style={{ background: `radial-gradient(ellipse at left, ${placedLevel.color}18 0%, transparent 65%)` }}
          />
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 border relative"
            style={{ background: `${placedLevel.color}18`, borderColor: `${placedLevel.color}35`, color: placedLevel.color }}
          >
            {placementLevel}
          </div>
          <div className="flex-1 relative">
            <p className="text-xs text-white/40 mb-0.5">{t.yourPlacement || 'Your placement level'}</p>
            <p className="font-bold text-white/90">
              {language?.flag} {language?.name}
              <span className="text-white/40 font-normal mx-2">·</span>
              <span style={{ color: placedLevel.color }}>{placedLevel.label}</span>
            </p>
          </div>
          <Link
            to="/levels"
            className="btn-ghost text-xs relative flex-shrink-0"
            style={{ color: placedLevel.color }}
          >
            {t.allLevels || 'See levels'} →
          </Link>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t.totalXp || "Total XP"}       value={xp}                  icon="⚡" sub={`${level.label}`} />
        <StatCard label={t.streak || "Day Streak"}     value={`${streak}d`}        icon="🔥" sub={t.keepItUp || "Keep it up!"} />
        <StatCard label={t.completed || "Completed"}      value={completedActivities} icon="✅" sub={`${t.of || 'of'} ${totalActivities}`} />
        <StatCard label={t.overallProgress || "Overall"}        value={`${overallProgress}%`} icon="📊" sub={t.allCombined || "All levels combined"} />
      </div>

      {/* Overall progress */}
      <div className="glass p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-white/90 text-sm">{t.overallProgress || "Overall Progress"}</h2>
          <span className="text-xs text-white/30">{completedActivities}/{totalActivities}</span>
        </div>
        <ProgressBar value={overallProgress} showLabel />
        <div className="mt-4 grid grid-cols-6 gap-2">
          {LEVELS.map(lv => (
            <Link key={lv.id} to={`/levels/${lv.id}`} className="text-center group">
              <div
                className="w-full h-1 rounded-full mb-1.5 transition-all"
                style={{ background: lv.color, opacity: 0.4 }}
              />
              <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors font-medium">{lv.id}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Two column: Recent levels + Module overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent levels */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white/80 text-sm uppercase tracking-wider">{t.recentLevels || "Recent Levels"}</h2>
            <Link to="/levels" className="btn-ghost text-xs">{t.seeAll || "See all"} →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentLevels.map(lv => <LevelCard key={lv.id} level={lv} />)}
            {/* Teaser card */}
            <Link to="/levels" className="glass glass-hover flex flex-col items-center justify-center p-6 text-center gap-2">
              <span className="text-2xl">+{LEVELS.length - 3}</span>
              <span className="text-xs text-white/40 font-medium">{t.moreLevels || "more levels"}</span>
            </Link>
          </div>
        </div>

        {/* Module quick access */}
        <div className="space-y-3">
          <h2 className="font-bold text-white/80 text-sm uppercase tracking-wider">{t.modules || "Modules"}</h2>
          <div className="space-y-2">
            {MODULES.map(m => (
              <Link
                key={m.id}
                to={`/module/${m.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl glass hover:bg-white/[0.07] transition-all duration-200 group"
              >
                <span className="text-xl">{m.icon}</span>
                <span className="text-sm text-white/70 font-medium flex-1 group-hover:text-white/90 transition-colors">{t[m.id] || m.name}</span>
                <span className="text-[10px] text-white/25">{m.activities.length} {t.exercises || "activities"}</span>
                <svg className="text-white/20 group-hover:text-white/50 transition-colors" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
