import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Zap, BookOpen } from 'lucide-react'
import { LEVELS } from '../data/levels'
import { MODULES } from '../data/modules'
import ModuleCard from '../components/modules/ModuleCard'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { useProgress } from '../hooks/useProgress'
import { useApp } from '../store/AppContext'
import { T } from '../data/i18n'

export default function LevelDetail() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const level = LEVELS.find(l => l.id === levelId)
  const { getLevelProgress } = useProgress()
  const { uiLang } = useApp()
  const t = T[uiLang] || T['es']

  if (!level) return (
    <div className="text-center py-24 text-white/40">
      Level not found. <Link to="/levels" className="text-brand-400 underline">{t.back || 'Go back'}</Link>
    </div>
  )

  const progress = getLevelProgress(level.id)
  const totalExercises = MODULES.reduce((s, m) => s + m.activities.length, 0)

  return (
    <div className="max-w-5xl space-y-8">
      {/* Back */}
      <button onClick={() => navigate('/levels')} className="btn-ghost -ml-1">
        <ArrowLeft size={15} /> {t.allLevels || 'All Levels'}
      </button>

      {/* Hero */}
      <div className="glass p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top left, ${level.glow} 0%, transparent 65%)` }}
        />
        <div className="relative flex items-start gap-6 flex-wrap">
          <Badge color={level.color} size="lg">{level.id}</Badge>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h1 className="text-3xl font-black text-white">{level.label}</h1>
              <span className="text-sm font-semibold px-3 py-1 rounded-full border"
                style={{ background: `${level.color}18`, color: level.color, borderColor: `${level.color}35` }}>
                {level.cefr}
              </span>
            </div>
            <p className="text-white/50 mb-5">{level.desc}</p>
            <div className="flex items-center gap-6 text-sm text-white/35 mb-5 flex-wrap">
              <span className="flex items-center gap-1.5"><Clock size={13} />{level.estimatedHours}h {t.estimated || 'estimated'}</span>
              <span className="flex items-center gap-1.5"><BookOpen size={13} />{totalExercises} {t.exercises || 'exercises'}</span>
              <span className="flex items-center gap-1.5"><Zap size={13} />{MODULES.length} {t.modules || 'modules'}</span>
            </div>
            <ProgressBar value={progress} color={level.color} showLabel />
          </div>
        </div>
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[2px] text-white/30 mb-4">{t.modules || 'Modules'}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MODULES.map(m => <ModuleCard key={m.id} module={m} levelId={level.id} />)}
        </div>
      </div>
    </div>
  )
}
