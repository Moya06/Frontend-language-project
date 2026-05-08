import { useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Clock, Zap, CheckCircle2, Lock } from 'lucide-react'
import { useApp } from '../../store/AppContext'
import { useProgress } from '../../hooks/useProgress'
import { T } from '../../data/i18n'
import ProgressBar from '../ui/ProgressBar'
import clsx from 'clsx'

export default function ModuleCard({ module, levelId }) {
  const navigate = useNavigate()
  const { dispatch, showToast, isActivityDone, uiLang } = useApp()
  const { getModuleProgress } = useProgress()
  const t = T[uiLang] ?? T['es']
  const progress = getModuleProgress(levelId, module.id)
  const done = module.activities.filter(a => isActivityDone(levelId, module.id, a.id)).length

  function handleClick() {
    dispatch({ type: 'SET_CURRENT_MODULE', payload: module })
    navigate(`/levels/${levelId}/${module.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="glass glass-hover cursor-pointer group relative overflow-hidden p-5"
    >
      <div
        className="absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top right, ${module.color}22 0%, transparent 65%)` }}
      />

      {/* Icon */}
      <div className="mb-4 relative">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border"
          style={{ background: `${module.color}15`, borderColor: `${module.color}30` }}
        >
          {module.icon}
        </div>
      </div>

      <h3 className="font-bold text-white/90 mb-1 relative">{t[module.id] || module.name}</h3>
      <p className="text-xs text-white/40 mb-4 relative leading-relaxed">{t[module.id + 'Desc'] || module.desc}</p>

      <div className="flex items-center justify-between mb-2 text-[10px] text-white/30 relative">
        <span>{done}/{module.activities.length} {t.completed || 'done'}</span>
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-white/20 group-hover:text-white/50" />
      </div>
      <ProgressBar value={progress} color={module.color} thin />
    </div>
  )
}
