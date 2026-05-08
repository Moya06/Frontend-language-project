import { useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { useApp } from '../../store/AppContext'
import clsx from 'clsx'

const ICONS = {
  success: <CheckCircle size={15} className="text-emerald-400" />,
  error:   <AlertCircle size={15} className="text-red-400" />,
  info:    <Info size={15} className="text-brand-400" />,
}

export default function Toast({ msg, type = 'success' }) {
  const { dispatch } = useApp()

  return (
    <div className={clsx(
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
      'flex items-center gap-2.5 px-4 py-3 rounded-2xl',
      'border border-white/10 text-sm text-white/80 font-medium',
      'shadow-glass-lg animate-slide-up',
    )}
      style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(24px)', minWidth: 260 }}
    >
      {ICONS[type]}
      <span className="flex-1">{msg}</span>
      <button
        onClick={() => dispatch({ type: 'HIDE_TOAST' })}
        className="text-white/30 hover:text-white/60 transition-colors"
      >
        <X size={13} />
      </button>
    </div>
  )
}
