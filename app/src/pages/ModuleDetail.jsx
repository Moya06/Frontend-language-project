import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import { LEVELS } from '../data/levels'
import { MODULES } from '../data/modules'
import ActivityItem from '../components/activity/ActivityItem'
import ProgressBar from '../components/ui/ProgressBar'
import { useProgress } from '../hooks/useProgress'
import Dropdown from '../components/ui/Dropdown'
import { useState } from 'react'
import { useApp } from '../store/AppContext'
import { T } from '../data/i18n'

export default function ModuleDetail() {
  const { levelId, moduleId } = useParams()
  const navigate = useNavigate()
  const level  = LEVELS.find(l => l.id === levelId)
  const module = MODULES.find(m => m.id === moduleId)
  const { getModuleProgress } = useProgress()
  const [filter, setFilter] = useState('All')
  const progress = getModuleProgress(levelId, moduleId)
  const { uiLang } = useApp()
  const t = T[uiLang] || T['es']

  const FILTERS = [t.all || 'All', t.available || 'Available', t.completed || 'Completed', t.locked || 'Locked']

  if (!level || !module) return (
    <div className="text-center py-24 text-white/40">{t.notFound || 'Not found.'} <Link to="/levels" className="text-brand-400 underline">{t.goBack || 'Go back'}</Link></div>
  )

  // We'll just show all for simplicity
  return (
    <div className="max-w-3xl space-y-6">
      {/* Back */}
      <button onClick={() => navigate(`/levels/${levelId}`)} className="btn-ghost -ml-1">
        <ArrowLeft size={15} /> {level.label} — {t.modules || 'Modules'}
      </button>

      {/* Header */}
      <div className="glass p-6 relative overflow-hidden">
        <div
          className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at bottom right, ${module.color}25 0%, transparent 65%)` }}
        />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border flex-shrink-0"
            style={{ background: `${module.color}15`, borderColor: `${module.color}30` }}>
            {module.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <h1 className="text-2xl font-black text-white">{t[module.id] || module.name}</h1>
              <span className="text-xs px-2.5 py-1 rounded-full border"
                style={{ background: `${level.color}15`, color: level.color, borderColor: `${level.color}30` }}>
                {level.id}
              </span>
            </div>
            <p className="text-white/40 text-sm mb-3">{t[module.id + 'Desc'] || module.desc}</p>
            <ProgressBar value={progress} color={module.color} showLabel />
          </div>
        </div>
      </div>

      {/* Filter bar + Dropdown */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
              filter === f
                ? 'text-white border-white/20 bg-white/10'
                : 'text-white/35 border-transparent hover:border-white/10 hover:text-white/60'
            }`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto">
          <Dropdown
            trigger={
              <button className="neo flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-white/50 hover:text-white/80 transition-colors cursor-pointer">
                ⚙️ {t.options || 'Options'}
              </button>
            }
            items={[
              { label: t.markAllDone || 'Mark all done', icon: '✅' },
              { label: t.resetProgress || 'Reset progress', icon: '🔄' },
              { label: '─────────', disabled: true },
              { label: t.reportIssue || 'Report issue', icon: '🚩', danger: true },
            ]}
          />
        </div>
      </div>

      {/* Activity list */}
      <div className="space-y-2.5">
        {module.activities.map(activity => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            levelId={levelId}
            moduleId={moduleId}
            moduleColor={module.color}
          />
        ))}
      </div>

      {/* XP total */}
      <div className="glass p-4 flex items-center justify-between">
        <span className="text-sm text-white/40">{t.totalXpAvailable || 'Total XP available in this module'}</span>
        <div className="flex items-center gap-1.5 font-bold" style={{ color: module.color }}>
          <Zap size={14} />
          <span>{module.activities.reduce((s, a) => s + a.xp, 0)} XP</span>
        </div>
      </div>
    </div>
  )
}
