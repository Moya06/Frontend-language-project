import { Sun, Moon, Globe, Trash2, ChevronRight } from 'lucide-react'
import { useApp } from '../store/AppContext'
import { UI_LANGUAGES, T } from '../data/i18n'
import clsx from 'clsx'

export default function Settings() {
  const { theme, uiLang, dispatch } = useApp()

  const L = {
    es: {
      title: 'Ajustes', appearance: 'Apariencia', theme: 'Tema', dark: 'Oscuro', light: 'Claro',
      language: 'Idioma de la interfaz', langSub: 'El idioma que se usa en los menús y botones',
      danger: 'Zona de peligro', resetProgress: 'Reiniciar progreso', resetSub: 'Borra todo tu XP, racha y actividades completadas. No se puede deshacer.',
      resetBtn: 'Reiniciar progreso', confirmReset: '¿Seguro? Escribe RESET para confirmar', resetDone: 'Progreso reiniciado',
    },
    en: {
      title: 'Settings', appearance: 'Appearance', theme: 'Theme', dark: 'Dark', light: 'Light',
      language: 'Interface language', langSub: 'Language used in menus and buttons',
      danger: 'Danger zone', resetProgress: 'Reset progress', resetSub: 'Clears all your XP, streak and completed activities. Cannot be undone.',
      resetBtn: 'Reset progress', confirmReset: 'Are you sure? Type RESET to confirm', resetDone: 'Progress reset',
    },
    it: {
      title: 'Impostazioni', appearance: 'Aspetto', theme: 'Tema', dark: 'Scuro', light: 'Chiaro',
      language: 'Lingua interfaccia', langSub: 'La lingua usata in menu e pulsanti',
      danger: 'Zona pericolosa', resetProgress: 'Reimposta progressi', resetSub: 'Cancella tutti i tuoi XP, serie e attività completate. Non annullabile.',
      resetBtn: 'Reimposta', confirmReset: 'Sicuro? Digita RESET per confermare', resetDone: 'Progressi reimpostati',
    },
    pt: {
      title: 'Configurações', appearance: 'Aparência', theme: 'Tema', dark: 'Escuro', light: 'Claro',
      language: 'Idioma da interface', langSub: 'O idioma usado nos menus e botões',
      danger: 'Zona de perigo', resetProgress: 'Redefinir progresso', resetSub: 'Apaga todo seu XP, sequência e atividades concluídas. Não pode ser desfeito.',
      resetBtn: 'Redefinir', confirmReset: 'Tem certeza? Digite RESET para confirmar', resetDone: 'Progresso redefinido',
    },
  }
  const l = L[uiLang] || L['es']

  function handleReset() {
    const answer = window.prompt(l.confirmReset)
    if (answer?.trim().toUpperCase() === 'RESET') {
      dispatch({ type: 'RESET_PROGRESS' })
      dispatch({ type: 'SHOW_TOAST', payload: { msg: l.resetDone, type: 'success' } })
    }
  }

  return (
    <div className="max-w-lg space-y-8">
      <h1 className="text-2xl font-black" style={{ color: 'var(--text-base)' }}>{l.title}</h1>

      {/* Appearance */}
      <section className="glass p-6 space-y-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{l.appearance}</h2>

        {/* Theme */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-base)' }}>{l.theme}</p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-input)', border: '1px solid var(--border-subtle)' }}>
            {[
              { value: 'dark',  icon: Moon, label: l.dark },
              { value: 'light', icon: Sun,  label: l.light },
            ].map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => { if (theme !== value) dispatch({ type: 'TOGGLE_THEME' }) }}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                  theme === value
                    ? 'text-white'
                    : 'hover:opacity-70'
                )}
                style={theme === value
                  ? { background: '#6366f1', boxShadow: '0 2px 8px rgba(99,102,241,0.4)' }
                  : { color: 'var(--text-muted)' }
                }
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Language */}
      <section className="glass p-6 space-y-4">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{l.language}</h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{l.langSub}</p>
        </div>
        <div className="space-y-2">
          {UI_LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => dispatch({ type: 'SET_UI_LANG', payload: lang.id })}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left',
              )}
              style={uiLang === lang.id
                ? { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: 'var(--text-base)' }
                : { background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }
              }
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="flex-1">{lang.nativeName}</span>
              {uiLang === lang.id && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg" style={{ background: 'rgba(99,102,241,0.25)', color: '#a5b4fc' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section className="p-6 rounded-[1.25rem] space-y-4" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.20)' }}>
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#f87171' }}>{l.danger}</h2>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-base)' }}>{l.resetProgress}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{l.resetSub}</p>
          </div>
          <button
            onClick={handleReset}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/20"
            style={{ background: 'rgba(239,68,68,0.10)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            <Trash2 size={14} />
            {l.resetBtn}
          </button>
        </div>
      </section>
    </div>
  )
}
