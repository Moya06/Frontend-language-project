import LevelCard from '../components/levels/LevelCard'
import { LEVELS } from '../data/levels'
import Dropdown from '../components/ui/Dropdown'
import { useState } from 'react'
import { SortAsc, FlaskConical, ChevronRight } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'
import { useApp } from '../store/AppContext'
import { useNavigate } from 'react-router-dom'
import { T } from '../data/i18n'
import clsx from 'clsx'

export default function Levels() {
  const [sort, setSort] = useState('default')
  const { getLevelProgress } = useProgress()
  const { testCompleted, language, placementLevel, uiLang } = useApp()
  const t = T[uiLang] ?? T['es']
  const navigate = useNavigate()

  const SORT_OPTIONS = [
    { label: t.sortDefault,  value: 'default'      },
    { label: t.sortProgAsc,  value: 'progress-asc' },
    { label: t.sortProgDesc, value: 'progress-desc'},
  ]

  const sorted = [...LEVELS].sort((a, b) => {
    if (sort === 'progress-asc') return getLevelProgress(a.id) - getLevelProgress(b.id)
    if (sort === 'progress-desc') return getLevelProgress(b.id) - getLevelProgress(a.id)
    return 0
  })

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">
            {language ? `${language.flag} ${language.name} — ${t.allLevels}` : t.allLevels}
          </h1>
          <p className="text-white/40 text-sm">{t.cefrSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown
            trigger={
              <button className="neo flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white/55 hover:text-white/80 transition-colors cursor-pointer">
                <SortAsc size={14} />
                {t.sort}
              </button>
            }
            items={SORT_OPTIONS.map(o => ({
              label: o.label,
              onClick: () => setSort(o.value),
            }))}
          />
        </div>
      </div>

      {/* Placement test banner */}
      {!testCompleted && (
        <button
          onClick={() => navigate(language ? '/placement' : '/select')}
          className="w-full text-left glass border border-brand-500/20 p-4 flex items-center gap-4 group hover:border-brand-500/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center flex-shrink-0">
            <FlaskConical size={18} className="text-brand-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white/80 text-sm mb-0.5">{t.takePlacement}</p>
            <p className="text-xs text-white/35">{t.takePlacementSub}</p>
          </div>
          <ChevronRight size={16} className="text-white/25 group-hover:text-white/60 group-hover:translate-x-1 transition-all flex-shrink-0" />
        </button>
      )}

      {/* Placement info if test done */}
      {testCompleted && placementLevel && (
        <div className="glass p-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs text-white/40">{t.yourPlacement}</span>
          <span className="text-xs font-bold text-white/70 px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10">
            {language?.flag} {placementLevel}
          </span>

        </div>
      )}

      {/* CEFR guide banner */}
      <div className="glass p-4 flex items-center gap-6 flex-wrap">
        {[
          { range: 'A1–A2', label: t.basicUser,        color: '#10b981' },
          { range: 'B1–B2', label: t.independentUser,  color: '#3b82f6' },
          { range: 'C1–C2', label: t.proficientUser,   color: '#a78bfa' },
        ].map(g => (
          <div key={g.range} className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: g.color }} />
            <span className="text-xs text-white/40">
              <span className="font-semibold text-white/60">{g.range}</span> — {g.label}
            </span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {sorted.map(lv => <LevelCard key={lv.id} level={lv} />)}
      </div>
    </div>
  )
}
