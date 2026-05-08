import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import { LEVEL_ORDER } from '../data/placementTest'
import { LEVELS } from '../data/levels'
import { MODULES } from '../data/modules'
import { Trophy, Lock, ChevronRight, RotateCcw } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { T } from '../data/i18n'
import clsx from 'clsx'

export default function PlacementResult() {
  const { placementLevel, language, dispatch, uiLang } = useApp()
  const navigate = useNavigate()
  const t = T[uiLang] ?? T['es']

  if (!placementLevel || !language) { navigate('/select'); return null }

  const placementIdx = LEVEL_ORDER.indexOf(placementLevel)
  const level = LEVELS.find(l => l.id === placementLevel)
  const msg   = t.resultMessages[placementLevel]

  // Test cannot be retaken once completed

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[700px] h-[700px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 animate-orb"
          style={{ background: `radial-gradient(circle, ${level.color}, ${level.color}44)`, filter: 'blur(120px)' }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">

        {/* Trophy */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl border mb-4"
            style={{ background: `${level.color}18`, borderColor: `${level.color}30` }}>
            <Trophy size={36} style={{ color: level.color }} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-3"
            style={{ background: `${level.color}15`, borderColor: `${level.color}30`, color: level.color }}>
            <span className="text-lg">{language.flag}</span>
            <span className="text-sm font-semibold">{language.name}</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">{msg.title}</h1>
          <p className="text-white/50 text-base max-w-md mx-auto">{msg.desc}</p>
        </div>

        {/* Result card */}
        <div className="glass p-6 mb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${level.color}15 0%, transparent 65%)` }} />
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3 relative">{t.yourStartingLevel}</p>
          <Badge color={level.color} size="lg" className="mx-auto mb-2 relative">{placementLevel}</Badge>
          <p className="font-bold text-white/80 text-lg relative">{level.label}</p>
          <p className="text-white/35 text-sm mt-1 relative">{level.desc}</p>
        </div>

        {/* Levels unlock map */}
        <div className="glass p-5 mb-6">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4">{t.levelMap}</p>
          <div className="grid grid-cols-6 gap-2">
            {LEVELS.map((lv, idx) => {
              const unlocked = idx <= placementIdx
              return (
                <div key={lv.id} className="flex flex-col items-center gap-1.5">
                  <div
                    className={clsx(
                      'w-full aspect-square max-w-[52px] rounded-xl flex items-center justify-center text-sm font-black border transition-all',
                      unlocked
                        ? 'text-white'
                        : 'text-white/20 bg-white/[0.02] border-white/[0.05]',
                    )}
                    style={unlocked ? {
                      background: `${lv.color}18`,
                      borderColor: `${lv.color}35`,
                      color: lv.color,
                      boxShadow: lv.id === placementLevel ? `0 0 16px ${lv.color}40` : undefined,
                    } : {}}
                  >
                    {unlocked ? lv.id : <Lock size={12} />}
                  </div>
                  <span className={clsx('text-[9px] font-medium', unlocked ? 'text-white/50' : 'text-white/15')}>
                    {unlocked ? t.open : t.locked}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="text-white/20 text-xs mt-4 text-center">
            Complete activities to unlock higher levels
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 btn-primary justify-center py-3 text-base"
            style={{ background: level.color, boxShadow: `0 4px 20px ${level.color}45` }}
          >
            {t.startLearning} {language.flag} — {placementLevel}
            <ChevronRight size={16} />
          </Link>

        </div>
      </div>
    </div>
  )
}
