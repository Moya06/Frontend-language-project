import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import { LANGUAGES } from '../data/languages'
import { UI_LANGUAGES, T } from '../data/i18n'
import { ChevronRight, Globe } from 'lucide-react'
import clsx from 'clsx'

export default function LanguageSelect() {
  const { dispatch, language: current, uiLang } = useApp()
  const navigate = useNavigate()

  // Step 0 = pick UI language, Step 1 = pick language to learn
  const [step, setStep]         = useState(uiLang ? 1 : 0)
  const [pickedUi, setPickedUi] = useState(uiLang ?? null)

  const t = T[pickedUi ?? 'es'] ?? T['es']

  function confirmUiLang() {
    if (!pickedUi) return
    dispatch({ type: 'SET_UI_LANG', payload: pickedUi })
    setStep(1)
  }

  function chooseLearningLang(lang) {
    dispatch({ type: 'SET_LANGUAGE', payload: lang })
    navigate('/placement')
  }

  const Orbs = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full -top-40 -left-40 opacity-20 animate-orb"
        style={{ background: 'radial-gradient(circle, #4f46e5, #7c3aed)', filter: 'blur(100px)' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full -bottom-32 -right-32 opacity-15 animate-orb"
        style={{ background: 'radial-gradient(circle, #0891b2, #0369a1)', filter: 'blur(100px)', animationDelay: '-6s' }} />
    </div>
  )

  /* ─── STEP 0: Pick UI language ─── */
  if (step === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
        <Orbs />
        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-2xl glass">
              <Globe size={16} className="text-brand-400" />
              <span className="text-sm font-semibold text-white/60">GrammarLanguages</span>
            </div>
            {/* Multilingual hint */}
            <p className="text-white/25 text-xs mb-3 tracking-wider uppercase">
              Select your language · Selecciona tu idioma · Scegli la tua lingua
            </p>
            <h1 className="text-3xl font-black text-white mb-2">
              {T[pickedUi ?? 'es'].pickUiLang}
            </h1>
            <p className="text-white/40 text-sm">{T[pickedUi ?? 'es'].pickUiLangSub}</p>
          </div>

          {/* UI Language cards */}
          <div className="space-y-2.5 mb-8">
            {UI_LANGUAGES.map(ul => (
              <button
                key={ul.id}
                onClick={() => setPickedUi(ul.id)}
                className={clsx(
                  'w-full text-left rounded-2xl border px-5 py-3.5 flex items-center gap-4 transition-all duration-200',
                  pickedUi === ul.id
                    ? 'border-white/30 bg-white/[0.09]'
                    : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15',
                )}
                style={{ backdropFilter: 'blur(16px)' }}
              >
                <span className="text-2xl flex-shrink-0">{ul.flag}</span>
                <div className="flex-1">
                  <span className="font-bold text-white/90 text-sm">{ul.nativeName}</span>
                </div>
                <div
                  className={clsx(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    pickedUi === ul.id ? 'border-transparent' : 'border-white/15',
                  )}
                  style={pickedUi === ul.id ? { background: ul.color } : {}}
                >
                  {pickedUi === ul.id && <span className="text-white text-[10px] font-black">✓</span>}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={confirmUiLang}
            disabled={!pickedUi}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={pickedUi
              ? { background: UI_LANGUAGES.find(u => u.id === pickedUi)?.color ?? '#6366f1', boxShadow: `0 4px 24px ${UI_LANGUAGES.find(u => u.id === pickedUi)?.color ?? '#6366f1'}50` }
              : { background: '#ffffff15' }}
          >
            {T[pickedUi ?? 'es'].continue} <ChevronRight size={15} />
          </button>
        </div>
      </div>
    )
  }

  /* ─── STEP 1: Pick language to learn ─── */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
      <Orbs />
      <div className="relative z-10 w-full max-w-2xl">
        {/* Back to UI lang step */}
        <button onClick={() => setStep(0)} className="btn-ghost mb-6 -ml-2">
          <Globe size={14} /> {UI_LANGUAGES.find(u => u.id === pickedUi)?.flag} {UI_LANGUAGES.find(u => u.id === pickedUi)?.nativeName}
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-2xl glass">
            <Globe size={16} className="text-brand-400" />
            <span className="text-sm font-semibold text-white/60">GrammarLanguages</span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            {t.pickLearnLang}
          </h1>
          <p className="text-white/40 text-base">{t.pickLearnLangSub}</p>
        </div>

        <div className="space-y-3">
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => chooseLearningLang(lang)}
              className={clsx(
                'w-full text-left group relative overflow-hidden rounded-3xl border transition-all duration-300',
                'flex items-center gap-5 px-6 py-5',
                current?.id === lang.id
                  ? 'border-white/20 bg-white/[0.08]'
                  : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/15',
              )}
              style={{ backdropFilter: 'blur(24px)' }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ background: `radial-gradient(ellipse at left center, ${lang.color}18 0%, transparent 65%)` }} />

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border"
                style={{ background: `${lang.color}15`, borderColor: `${lang.color}30` }}>
                {lang.flag}
              </div>

              <div className="flex-1 min-w-0 relative">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-lg font-bold text-white/90">{lang.name}</span>
                  <span className="text-sm text-white/35">{lang.nativeName}</span>
                </div>
                <p className="text-sm text-white/40 mb-1">{t.langDescriptions?.[lang.id] ?? lang.description}</p>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: `${lang.color}18`, color: lang.color }}>
                  {t.langSpeakers?.[lang.id] ?? lang.speakers}
                </span>
              </div>

              <ChevronRight size={20}
                className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all flex-shrink-0 relative" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
