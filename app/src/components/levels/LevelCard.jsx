import { useNavigate } from 'react-router-dom'
import { ChevronRight, Lock, Clock } from 'lucide-react'
import Badge from '../ui/Badge'
import ProgressBar from '../ui/ProgressBar'
import { useProgress } from '../../hooks/useProgress'
import { MODULES } from '../../data/modules'
import { useApp } from '../../store/AppContext'
import clsx from 'clsx'

export default function LevelCard({ level }) {
  const navigate = useNavigate()
  const { getLevelProgress } = useProgress()
  const { dispatch, testCompleted, isLevelUnlocked } = useApp()
  const progress = getLevelProgress(level.id)

  const totalExercises = MODULES.reduce((s, m) => s + m.activities.length, 0)
  const locked = testCompleted && !isLevelUnlocked(level.id)

  function handleClick() {
    if (locked) return
    dispatch({ type: 'SET_CURRENT_LEVEL', payload: level })
    navigate(`/levels/${level.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'glass group relative overflow-hidden p-5',
        locked ? 'opacity-50 cursor-not-allowed' : 'glass-hover cursor-pointer',
      )}
    >
      {/* Lock overlay */}
      {locked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[1.25rem] bg-black/30 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
              <Lock size={18} className="text-white/40" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Locked</span>
          </div>
        </div>
      )}
      {/* Subtle gradient glow on hover */}
      <div
        className="absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${level.glow} 0%, transparent 70%)` }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4 relative">
        <Badge color={level.color} size="md">{level.id}</Badge>
        <div className="flex items-center gap-1 text-white/20 group-hover:text-white/50 transition-colors">
          <span className="text-xs font-medium">{level.cefr}</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Info */}
      <div className="relative mb-4">
        <h3 className="font-bold text-base text-white/90 mb-1">{level.label}</h3>
        <p className="text-sm text-white/40 leading-relaxed line-clamp-2">{level.desc}</p>
      </div>

      {/* Module pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {MODULES.map(m => (
          <span key={m.id} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/[0.06] text-white/35 text-[10px] font-medium">
            {m.icon} {m.name}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-3 text-xs text-white/30">
        <span className="flex items-center gap-1">
          <Clock size={11} /> {level.estimatedHours}h estimated
        </span>
        <span>{totalExercises} exercises</span>
      </div>

      {/* Progress */}
      <ProgressBar value={progress} color={level.color} showLabel />
    </div>
  )
}
