import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import { PLACEMENT_TESTS, scoreToLevel } from '../data/placementTest'
import { T } from '../data/i18n'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

export default function PlacementTest() {
  const { language, dispatch, uiLang } = useApp()
  const navigate = useNavigate()
  const t = T[uiLang] ?? T['es']

  const questions = useMemo(() => {
    return PLACEMENT_TESTS[language?.id]?.questions ?? []
  }, [language?.id])

  const [current,   setCurrent]   = useState(0)
  const [answers,   setAnswers]   = useState({})
  const [selected,  setSelected]  = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  if (!language) { navigate('/select'); return null }
  if (!questions.length) { navigate('/select'); return null }

  const q       = questions[current]
  const total   = questions.length
  const progress = ((current + (confirmed ? 1 : 0)) / total) * 100
  const isLastQ  = current === total - 1

  function handleSelect(idx) {
    if (confirmed) return
    setSelected(idx)
  }

  function handleConfirm() {
    if (selected === null) return
    setAnswers(prev => ({ ...prev, [q.id]: selected }))
    setConfirmed(true)
  }

  function handleNext() {
    if (isLastQ) {
      const allAnswers = { ...answers, [q.id]: selected }
      const score = questions.reduce((s, qq) =>
        allAnswers[qq.id] === qq.correct ? s + 1 : s, 0)
      dispatch({ type: 'COMPLETE_PLACEMENT', payload: scoreToLevel(score) })
      navigate('/placement/result')
    } else {
      const nextQ = questions[current + 1]
      const prevAns = answers[nextQ?.id]
      setCurrent(c => c + 1)
      setSelected(prevAns ?? null)
      setConfirmed(prevAns !== undefined)
    }
  }

  function handlePrev() {
    if (current === 0) return
    const prevQ = questions[current - 1]
    setCurrent(c => c - 1)
    setSelected(answers[prevQ.id] ?? null)
    setConfirmed(answers[prevQ.id] !== undefined)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full -top-40 -left-40 opacity-15 animate-orb"
          style={{ background: `radial-gradient(circle, ${language.color}, ${language.color}88)`, filter: 'blur(110px)' }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full bottom-0 right-0 opacity-10 animate-orb"
          style={{ background: 'radial-gradient(circle, #4f46e5, #7c3aed)', filter: 'blur(100px)', animationDelay: '-4s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/select')} className="btn-ghost -ml-2">
            <ChevronLeft size={15} /> {t.changeLanguage}
          </button>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span className="text-lg">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
            <span className="text-white/20">·</span>
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
              style={{ background: `${language.color}15`, color: language.color, borderColor: `${language.color}30` }}
            >
              {current + 1} / {total}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/[0.06] mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: language.color }}
          />
        </div>

        {/* Level badge */}
        <div className="mb-4">
          <span
            className="text-[10px] font-bold uppercase tracking-[2px] px-2.5 py-1 rounded-full border"
            style={{ background: `${language.color}15`, color: language.color, borderColor: `${language.color}30` }}
          >
            {t.level} {q.level}
          </span>
        </div>

        {/* Question card */}
        <div className="relative glass rounded-[1.25rem] px-6 py-7 mb-7">
          <div
            className="absolute inset-0 rounded-[1.25rem] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top left, ${language.color}12 0%, transparent 60%)` }}
          />
          <p className="text-lg font-semibold text-white/90 leading-relaxed relative">{q.text}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx
            const isCorrect  = confirmed && idx === q.correct
            const isWrong    = confirmed && isSelected && idx !== q.correct
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={confirmed && !isCorrect && !isWrong}
                className={clsx(
                  'w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 font-medium text-sm',
                  isCorrect  && 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300',
                  isWrong    && 'border-red-500/50 bg-red-500/10 text-red-300',
                  !confirmed && isSelected  && 'border-white/30 bg-white/[0.10] text-white/90',
                  !confirmed && !isSelected && 'border-white/[0.06] bg-white/[0.03] text-white/60 hover:bg-white/[0.07] hover:border-white/15 hover:text-white/85',
                  confirmed && !isCorrect && !isWrong && 'opacity-35 cursor-default border-transparent',
                )}
              >
                <span className="inline-flex items-center gap-3">
                  <span className={clsx(
                    'w-6 h-6 rounded-lg flex-shrink-0 border flex items-center justify-center text-xs font-bold',
                    isCorrect  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : isWrong    ? 'bg-red-500/20 border-red-500/40 text-red-300'
                      : isSelected ? 'bg-white/15 border-white/30 text-white'
                      : 'bg-white/[0.04] border-white/10 text-white/25',
                  )}>
                    {isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </span>
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {confirmed && (
          <div className={clsx(
            'px-4 py-3 rounded-2xl mb-5 text-sm border',
            selected === q.correct
              ? 'border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-300'
              : 'border-red-500/20 bg-red-500/[0.07] text-red-300',
          )}>
            {selected === q.correct
              ? t.correct
              : `${t.wrongPrefix} "${q.options[q.correct]}"`}
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="btn-ghost disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={15} /> {t.previous}
          </button>

          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              style={selected !== null ? { background: language.color, boxShadow: `0 4px 20px ${language.color}55` } : {}}
            >
              {t.confirmAnswer}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn-primary"
              style={{ background: language.color, boxShadow: `0 4px 20px ${language.color}55` }}
            >
              {isLastQ ? t.seeResults : t.nextQuestion} <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
