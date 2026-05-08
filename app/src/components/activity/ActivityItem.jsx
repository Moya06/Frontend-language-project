import { Clock, Zap, CheckCircle2, Lock, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../store/AppContext'
import clsx from 'clsx'

export default function ActivityItem({ activity, levelId, moduleId, moduleColor }) {
  const { isActivityDone } = useApp()
  const navigate = useNavigate()
  const done = isActivityDone(levelId, moduleId, activity.id)

  function handleStart() {
    if (activity.locked) return
    navigate(`/play/${levelId}/${moduleId}/${activity.id}`)
  }

  return (
    <div
      onClick={handleStart}
      className={clsx(
        'group flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200',
        activity.locked
          ? 'opacity-45 cursor-not-allowed border-white/[0.05] bg-white/[0.02]'
          : done
            ? 'cursor-pointer border-emerald-500/20 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.07]'
            : 'cursor-pointer glass hover:bg-white/[0.08] hover:border-white/15 hover:-translate-y-0.5',
      )}
    >
      {/* Status icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
        style={done
          ? { background: '#10b98120', borderColor: '#10b98130' }
          : { background: `${moduleColor}15`, borderColor: `${moduleColor}30` }
        }
      >
        {activity.locked
          ? <Lock size={14} className="text-white/25" />
          : done
            ? <CheckCircle2 size={16} className="text-emerald-400" />
            : <Play size={14} style={{ color: moduleColor }} />
        }
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={clsx('font-semibold text-sm mb-0.5', done ? 'text-emerald-300/80' : 'text-white/85')}>{activity.title}</p>
        <p className="text-xs text-white/35 truncate">{activity.type}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1 text-white/25 text-xs">
          <Clock size={11} />
          <span>{activity.duration}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold"
          style={{ color: done ? '#10b981' : moduleColor }}>
          <Zap size={11} />
          <span>{activity.xp}</span>
        </div>
      </div>

      {/* Arrow */}
      {!activity.locked && !done && (
        <div className="text-white/20 group-hover:text-white/50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}
