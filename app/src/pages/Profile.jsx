import { useState } from 'react'
import { User, Zap, Flame, Edit2, Check, X, Trophy, Target, BookOpen } from 'lucide-react'
import { useApp } from '../store/AppContext'
import { useProgress } from '../hooks/useProgress'
import ProgressBar from '../components/ui/ProgressBar'
import { T } from '../data/i18n'

export default function Profile() {
  const { user, dispatch, uiLang } = useApp()
  const { xp, streak, level, overallProgress, completedActivities, totalActivities } = useProgress()

  const [editing, setEditing]       = useState(false)
  const [displayName, setDisplayName] = useState(user?.displayName || user?.username || '')
  const [draft, setDraft]           = useState(displayName)

  const t = T[uiLang] || T['es']

  const L = {
    es: { title: 'Perfil', editName: 'Editar nombre', save: 'Guardar', cancel: 'Cancelar', member: 'Miembro desde', stats: 'Estadísticas', rank: 'Rango actual', nextRank: 'XP para el siguiente rango', done: 'Completadas', activities: 'actividades', overall: 'Progreso general', email: 'Correo', username: 'Usuario' },
    en: { title: 'Profile', editName: 'Edit name', save: 'Save', cancel: 'Cancel', member: 'Member since', stats: 'Stats', rank: 'Current rank', nextRank: 'XP to next rank', done: 'Completed', activities: 'activities', overall: 'Overall progress', email: 'Email', username: 'Username' },
    it: { title: 'Profilo', editName: 'Modifica nome', save: 'Salva', cancel: 'Annulla', member: 'Membro dal', stats: 'Statistiche', rank: 'Grado attuale', nextRank: 'XP al prossimo grado', done: 'Completate', activities: 'attività', overall: 'Progresso generale', email: 'Email', username: 'Utente' },
    pt: { title: 'Perfil', editName: 'Editar nome', save: 'Salvar', cancel: 'Cancelar', member: 'Membro desde', stats: 'Estatísticas', rank: 'Nível atual', nextRank: 'XP para o próximo', done: 'Concluídas', activities: 'atividades', overall: 'Progresso geral', email: 'Email', username: 'Usuário' },
  }
  const l = L[uiLang] || L['es']

  function saveDisplayName() {
    const trimmed = draft.trim()
    if (!trimmed) return
    setDisplayName(trimmed)
    dispatch({ type: 'AUTH_LOGIN', payload: { ...user, displayName: trimmed } })
    setEditing(false)
    dispatch({ type: 'SHOW_TOAST', payload: { msg: l.save + ' ✓', type: 'success' } })
  }

  const STATS = [
    { icon: Zap,    label: 'XP',        value: xp,                   color: '#818cf8' },
    { icon: Flame,  label: t.streak || 'Streak',  value: `${streak}d`,       color: '#f97316' },
    { icon: Target, label: l.done,      value: completedActivities,  color: '#22c55e' },
    { icon: Trophy, label: l.rank,      value: level.label,          color: '#eab308' },
  ]

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-black" style={{ color: 'var(--text-base)' }}>{l.title}</h1>

      {/* Avatar + name card */}
      <div className="glass p-6 flex items-center gap-5">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center flex-shrink-0 border border-brand-400/30">
          <User size={28} className="text-white" />
        </div>

        {/* Name / email */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="flex items-center gap-2 mb-1">
              <input
                autoFocus
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') saveDisplayName(); if (e.key === 'Escape') setEditing(false) }}
                className="flex-1 px-3 py-1.5 rounded-xl text-sm font-bold outline-none"
                style={{ background: 'var(--bg-input)', color: 'var(--text-base)', border: '1px solid rgba(99,102,241,0.5)' }}
                maxLength={40}
              />
              <button onClick={saveDisplayName} className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                <Check size={13} />
              </button>
              <button onClick={() => { setEditing(false); setDraft(displayName) }} className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:bg-white/10 transition-colors">
                <X size={13} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-black truncate" style={{ color: 'var(--text-base)' }}>
                {displayName}
              </h2>
              <button
                onClick={() => { setDraft(displayName); setEditing(true) }}
                className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: 'var(--text-muted)' }}
                title={l.editName}
              >
                <Edit2 size={12} />
              </button>
            </div>
          )}
          <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
            {user?.email || ''}
          </p>
          {user?.username && user.username !== displayName && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              @{user.username}
            </p>
          )}
        </div>

        {/* Role badge */}
        <div className="px-3 py-1 rounded-xl text-xs font-bold" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }}>
          {user?.role === 'ADMIN' ? 'Admin' : 'Student'}
        </div>
      </div>

      {/* Stats grid */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>{l.stats}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATS.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="glass p-4 text-center">
              <div className="w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={15} style={{ color }} />
              </div>
              <p className="text-lg font-black" style={{ color: 'var(--text-base)' }}>{value}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* XP progress */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-base)' }}>{l.rank}: <span className="text-brand-400">{level.label}</span></p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{xp} / {level.next} XP</p>
        </div>
        <ProgressBar value={Math.min((xp / level.next) * 100, 100)} showLabel />
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          {level.next - xp} {l.nextRank}
        </p>
      </div>

      {/* Overall progress */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={15} style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--text-base)' }}>{l.overall}</p>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{completedActivities} / {totalActivities} {l.activities}</p>
        </div>
        <ProgressBar value={overallProgress} showLabel />
      </div>
    </div>
  )
}
