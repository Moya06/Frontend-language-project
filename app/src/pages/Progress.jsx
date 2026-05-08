import { LEVELS } from '../data/levels'
import { MODULES } from '../data/modules'
import { useProgress } from '../hooks/useProgress'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import { Flame, Zap, Trophy, Target } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import { useApp } from '../store/AppContext'
import { T } from '../data/i18n'

export default function Progress() {
  const { xp, streak, overallProgress, completedActivities, totalActivities, level, getLevelProgress, getModuleProgress } = useProgress()
  const { uiLang } = useApp()
  const t = T[uiLang] || T['es']

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">{t.myProgress || 'My Progress'}</h1>
        <p className="text-white/40 text-sm">{t.detailedView || 'Detailed view across all levels and modules'}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t.totalXp || "Total XP"} value={xp} icon="⚡" sub={level.label} />
        <StatCard label={t.streak || "Streak"}   value={`${streak}d`} icon="🔥" sub={t.dailyStreak || "Daily streak"} />
        <StatCard label={t.done || "Done"}     value={completedActivities} icon="✅" sub={`${t.of || 'of'} ${totalActivities}`} />
        <StatCard label={t.overallProgress || "Overall"}  value={`${overallProgress}%`} icon="📊" sub={t.completion || "Completion"} />
      </div>

      {/* XP Level */}
      <div className="glass p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{t.currentRank || 'Current Rank'}</p>
            <h2 className="text-xl font-black text-white">{level.label}</h2>
          </div>
          <div className="flex items-center gap-1.5 text-brand-400">
            <Zap size={18} />
            <span className="font-bold">{xp} XP</span>
          </div>
        </div>
        <ProgressBar value={Math.min((xp / level.next) * 100, 100)} showLabel />
        <p className="text-xs text-white/25 mt-2">{level.next - xp} {t.toNextRank || 'XP to next rank'}</p>
      </div>

      {/* Per-level breakdown */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[2px] text-white/30 mb-4">{t.byLevel || 'By Level'}</h2>
        <div className="space-y-3">
          {LEVELS.map(lv => {
            const prog = getLevelProgress(lv.id)
            return (
              <div key={lv.id} className="glass p-5 flex items-center gap-5">
                <Badge color={lv.color} size="sm">{lv.id}</Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white/75">{lv.label}</span>
                    <span className="text-xs text-white/35">{prog}%</span>
                  </div>
                  <ProgressBar value={prog} color={lv.color} thin />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Per-module */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[2px] text-white/30 mb-4">{t.byModuleA1 || 'By Module (A1)'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {MODULES.map(m => {
            const prog = getModuleProgress('A1', m.id)
            return (
              <div key={m.id} className="glass p-4 text-center">
                <span className="text-2xl block mb-2">{m.icon}</span>
                <p className="text-xs font-semibold text-white/60 mb-2">{t[m.id] || m.name}</p>
                <p className="text-lg font-black mb-2" style={{ color: m.color }}>{prog}%</p>
                <ProgressBar value={prog} color={m.color} thin />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
