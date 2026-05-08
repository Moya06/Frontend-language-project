import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { MODULES } from '../data/modules'
import { LEVELS } from '../data/levels'
import Badge from '../components/ui/Badge'
import { useApp } from '../store/AppContext'
import { T } from '../data/i18n'

export default function ModulePage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { uiLang } = useApp()
  const t = T[uiLang] ?? T['es']
  const module = MODULES.find(m => m.id === moduleId)

  if (!module) return (
    <div className="text-center py-24 text-white/40">
      {t.notFound || 'Module not found.'} <Link to="/" className="text-brand-400 underline">{t.goHome || 'Go home'}</Link>
    </div>
  )

  return (
    <div className="max-w-5xl space-y-8">
      <button onClick={() => navigate(-1)} className="btn-ghost -ml-1">
        <ArrowLeft size={15} /> {t.back || 'Back'}
      </button>

      {/* Header */}
      <div className="glass p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top right, ${module.color}20 0%, transparent 60%)` }}
        />
        <div className="flex items-center gap-5 relative">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl border"
            style={{ background: `${module.color}15`, borderColor: `${module.color}30` }}>
            {module.icon}
          </div>
          <div>
            <h1 className="text-3xl font-black text-white mb-1">{t[module.id] || module.name}</h1>
            <p className="text-white/45">{t[module.id + 'Desc'] || module.desc}</p>
          </div>
        </div>
      </div>

      {/* Pick a level */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-[2px] text-white/30 mb-4">
          {t.chooseLevelToPractice || 'Choose a level to practice'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {LEVELS.map(lv => (
            <Link
              key={lv.id}
              to={`/levels/${lv.id}/${module.id}`}
              className="glass glass-hover flex items-center gap-4 p-5 group"
            >
              <Badge color={lv.color} size="sm">{lv.id}</Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{lv.label}</p>
                <p className="text-xs text-white/30 truncate">{module.activities.length} {t.activities || 'activities'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
