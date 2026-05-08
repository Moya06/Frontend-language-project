import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Star, Zap } from 'lucide-react'
import clsx from 'clsx'
import { useApp } from '../store/AppContext'
import { getActivityContent } from '../data/activities'

// ─── Quiz Game ────────────────────────────────────────────────────────────────
function QuizGame({ content, onComplete }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const questions = content.questions || []
  const q = questions[current]
  const total = questions.length

  const handleSelect = (idx) => {
    if (!confirmed) setSelected(idx)
  }

  const handleConfirm = () => {
    if (selected === null) return
    setConfirmed(true)
    if (selected === q.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= total) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setConfirmed(false)
    }
  }

  if (done) {
    const pct = Math.round((score / total) * 100)
    const xp = Math.round((score / total) * 50)
    return <ResultScreen score={score} total={total} pct={pct} xp={xp} onComplete={() => onComplete(xp)} />
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{current + 1} / {total}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Passage (if any) */}
      {content.passage && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto">
          {content.passage}
        </div>
      )}

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">{q.text}</h2>
        <div className="grid grid-cols-1 gap-3">
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.correct
            const isSelected = idx === selected
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={clsx(
                  'w-full text-left px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all',
                  confirmed
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : isSelected
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-500'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                )}
              >
                <span className="flex items-center gap-3">
                  {confirmed && isCorrect && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                  {confirmed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                  {opt}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback */}
      {confirmed && (
        <div className={clsx(
          'rounded-xl px-5 py-3 text-sm font-medium',
          selected === q.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        )}>
          {selected === q.correct ? '✓ Correct!' : `✗ The correct answer is: ${q.options[q.correct]}`}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end">
        {!confirmed ? (
          <button
            disabled={selected === null}
            onClick={handleConfirm}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-indigo-700 transition"
          >
            Confirm
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
          >
            {current + 1 >= total ? 'See Results' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Flashcard Game ───────────────────────────────────────────────────────────
function FlashcardGame({ content, onComplete }) {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState([])
  const [done, setDone] = useState(false)

  const cards = content.cards || []
  const total = cards.length

  const handleFlip = () => setFlipped((f) => !f)

  const handleAnswer = (correct) => {
    const newKnown = correct ? [...known, current] : known
    if (current + 1 >= total) {
      const score = newKnown.length
      const xp = Math.round((score / total) * 40)
      setKnown(newKnown)
      setDone(true)
      setTimeout(() => onComplete(xp), 0)
      return
    }
    setKnown(newKnown)
    setCurrent((c) => c + 1)
    setFlipped(false)
  }

  if (done) {
    const score = known.length
    const xp = Math.round((score / total) * 40)
    return <ResultScreen score={score} total={total} pct={Math.round((score/total)*100)} xp={xp} onComplete={() => onComplete(xp)} />
  }

  const card = cards[current]

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Progress */}
      <div className="w-full flex items-center gap-3">
        <span className="text-sm text-gray-500">{current + 1} / {total}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div className="bg-violet-500 h-2 rounded-full transition-all" style={{ width: `${((current+1)/total)*100}%` }} />
        </div>
      </div>

      {/* Card */}
      <div
        onClick={handleFlip}
        className="w-full max-w-md h-52 cursor-pointer perspective"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white border-2 border-violet-200 rounded-2xl shadow-lg p-6 backface-hidden">
            <p className="text-2xl font-bold text-gray-800 text-center">{card.front}</p>
            <p className="text-xs text-gray-400 mt-4">Tap to reveal</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-violet-50 border-2 border-violet-400 rounded-2xl shadow-lg p-6"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            <p className="text-base text-gray-700 text-center leading-relaxed">{card.back}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {flipped && (
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer(false)}
            className="px-6 py-2.5 bg-red-100 text-red-700 border border-red-300 rounded-xl text-sm font-semibold hover:bg-red-200 transition"
          >
            ✗ Again
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="px-6 py-2.5 bg-green-100 text-green-700 border border-green-300 rounded-xl text-sm font-semibold hover:bg-green-200 transition"
          >
            ✓ Got it!
          </button>
        </div>
      )}

      {!flipped && (
        <button
          onClick={handleFlip}
          className="px-6 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition"
        >
          Flip card
        </button>
      )}
    </div>
  )
}

// ─── Word Match Game ──────────────────────────────────────────────────────────
function WordMatchGame({ content, onComplete }) {
  const pairs = content.pairs || []
  const [leftSel, setLeftSel] = useState(null)
  const [rightSel, setRightSel] = useState(null)
  const [matched, setMatched] = useState([]) // indices of matched pairs
  const [wrong, setWrong] = useState(false)
  const [done, setDone] = useState(false)

  // Shuffle matches independently
  const [shuffledMatches] = useState(() => [...pairs].sort(() => Math.random() - 0.5))

  useEffect(() => {
    if (leftSel !== null && rightSel !== null) {
      // Check if pair matches
      const leftPair = pairs[leftSel]
      const rightPair = shuffledMatches[rightSel]
      if (leftPair.word === rightPair.word) {
        const newMatched = [...matched, leftSel]
        setMatched(newMatched)
        setLeftSel(null)
        setRightSel(null)
        if (newMatched.length === pairs.length) {
          const xp = 30
          setDone(true)
          setTimeout(() => {}, 0)
        }
      } else {
        setWrong(true)
        setTimeout(() => {
          setLeftSel(null)
          setRightSel(null)
          setWrong(false)
        }, 700)
      }
    }
  }, [leftSel, rightSel])

  // Find matched index for a right-side item
  const isRightMatched = (rIdx) => {
    const rPair = shuffledMatches[rIdx]
    const origIdx = pairs.findIndex((p) => p.word === rPair.word)
    return matched.includes(origIdx)
  }

  if (done) {
    const xp = 30
    return <ResultScreen score={pairs.length} total={pairs.length} pct={100} xp={xp} onComplete={() => onComplete(xp)} />
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-gray-500 text-center">Select a word on the left, then its match on the right.</p>
      <div className="grid grid-cols-2 gap-4">
        {/* Left column */}
        <div className="flex flex-col gap-3">
          {pairs.map((pair, idx) => {
            const isMatched = matched.includes(idx)
            const isSelected = leftSel === idx
            const isWrongSelected = wrong && isSelected
            return (
              <button
                key={idx}
                disabled={isMatched}
                onClick={() => !isMatched && setLeftSel(idx)}
                className={clsx(
                  'px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all',
                  isMatched
                    ? 'border-green-400 bg-green-50 text-green-700 cursor-default'
                    : isWrongSelected
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-300'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
                )}
              >
                {pair.word}
              </button>
            )
          })}
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-3">
          {shuffledMatches.map((pair, rIdx) => {
            const rMatched = isRightMatched(rIdx)
            const isSelected = rightSel === rIdx
            const isWrongSelected = wrong && isSelected
            return (
              <button
                key={rIdx}
                disabled={rMatched}
                onClick={() => !rMatched && setRightSel(rIdx)}
                className={clsx(
                  'px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all',
                  rMatched
                    ? 'border-green-400 bg-green-50 text-green-700 cursor-default'
                    : isWrongSelected
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : isSelected
                    ? 'border-amber-500 bg-amber-50 text-amber-800 ring-2 ring-amber-300'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
                )}
              >
                {pair.match}
              </button>
            )
          })}
        </div>
      </div>
      <p className="text-center text-xs text-gray-400">{matched.length} / {pairs.length} matched</p>
    </div>
  )
}

// ─── Fill Blank Game ──────────────────────────────────────────────────────────
function FillBlankGame({ content, onComplete }) {
  const sentences = content.sentences || []
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const s = sentences[current]
  const total = sentences.length

  const handleConfirm = () => {
    if (selected === null) return
    setConfirmed(true)
    if (selected === s.correct) setScore((sc) => sc + 1)
  }

  const handleNext = () => {
    if (current + 1 >= total) setDone(true)
    else { setCurrent((c) => c + 1); setSelected(null); setConfirmed(false) }
  }

  if (done) {
    const pct = Math.round((score / total) * 100)
    const xp = Math.round((score / total) * 40)
    return <ResultScreen score={score} total={total} pct={pct} xp={xp} onComplete={() => onComplete(xp)} />
  }

  // Split sentence at ___
  const parts = s.text.split('___')

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{current + 1} / {total}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${((current+1)/total)*100}%` }} />
        </div>
      </div>

      {/* Sentence with gap */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <p className="text-xl font-medium text-gray-800 text-center flex flex-wrap items-center justify-center gap-1">
          <span>{parts[0]}</span>
          <span className={clsx(
            'inline-block min-w-[80px] border-b-2 text-center px-2 font-semibold',
            confirmed
              ? selected === s.correct ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'
              : selected !== null ? 'border-indigo-500 text-indigo-700' : 'border-gray-400 text-gray-400'
          )}>
            {selected !== null ? s.options[selected] : '___'}
          </span>
          {parts[1] && <span>{parts[1]}</span>}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {s.options.map((opt, idx) => {
          const isCorrect = idx === s.correct
          const isSelected = idx === selected
          return (
            <button
              key={idx}
              onClick={() => !confirmed && setSelected(idx)}
              className={clsx(
                'px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all',
                confirmed
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : isSelected
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-400'
                  : isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {confirmed && (
        <div className={clsx('rounded-xl px-5 py-3 text-sm font-medium', selected === s.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
          {selected === s.correct ? '✓ Correct!' : `✗ The correct answer is: "${s.options[s.correct]}"`}
        </div>
      )}

      <div className="flex justify-end">
        {!confirmed ? (
          <button disabled={selected === null} onClick={handleConfirm} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-emerald-700 transition">
            Confirm
          </button>
        ) : (
          <button onClick={handleNext} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition">
            {current + 1 >= total ? 'See Results' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Result Screen ─────────────────────────────────────────────────────────────
function ResultScreen({ score, total, pct, xp, onComplete }) {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className={clsx(
        'w-28 h-28 rounded-full flex items-center justify-center text-4xl shadow-lg',
        pct >= 80 ? 'bg-green-100' : pct >= 50 ? 'bg-amber-100' : 'bg-red-100'
      )}>
        {pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪'}
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-gray-800">{pct}%</p>
        <p className="text-gray-500 mt-1">{score} / {total} correct</p>
      </div>
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-5 py-3 rounded-xl">
        <Zap className="w-5 h-5 text-amber-500" />
        <span className="font-semibold text-amber-700">+{xp} XP earned</span>
      </div>
      <button
        onClick={onComplete}
        className="mt-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
      >
        Continue
      </button>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ActivityPlayer() {
  const { levelId, moduleId, activityId } = useParams()
  const navigate = useNavigate()
  const { language, completeActivity, showToast } = useApp()

  const content = getActivityContent(language?.id, levelId, moduleId, activityId)

  const handleComplete = useCallback((xp) => {
    completeActivity(levelId, moduleId, activityId, xp)
    showToast(`+${xp} XP! Activity complete 🎉`)
    navigate(-1)
  }, [levelId, moduleId, activityId])

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
        <p className="text-gray-500 text-lg">No content available for this activity yet.</p>
        <button onClick={() => navigate(-1)} className="text-indigo-600 underline text-sm">Go back</button>
      </div>
    )
  }

  const gameTypeLabels = { quiz: 'Quiz', flashcard: 'Flashcards', wordmatch: 'Word Match', fillblank: 'Fill the Gap' }
  const gameTypeColors = {
    quiz: 'bg-indigo-100 text-indigo-700',
    flashcard: 'bg-violet-100 text-violet-700',
    wordmatch: 'bg-amber-100 text-amber-700',
    fillblank: 'bg-emerald-100 text-emerald-700',
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition" aria-label="Go back">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-gray-800 truncate">{content.title}</h1>
          <p className="text-xs text-gray-400">{levelId} · {moduleId}</p>
        </div>
        <span className={clsx('text-xs font-semibold px-2.5 py-1 rounded-full', gameTypeColors[content.type] || 'bg-gray-100 text-gray-600')}>
          {gameTypeLabels[content.type] || content.type}
        </span>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Instructions */}
        <p className="text-sm text-gray-500 mb-5 text-center italic">{content.instructions}</p>

        {/* Game */}
        {content.type === 'quiz' && <QuizGame content={content} onComplete={handleComplete} />}
        {content.type === 'flashcard' && <FlashcardGame content={content} onComplete={handleComplete} />}
        {content.type === 'wordmatch' && <WordMatchGame content={content} onComplete={handleComplete} />}
        {content.type === 'fillblank' && <FillBlankGame content={content} onComplete={handleComplete} />}
      </div>
    </div>
  )
}
