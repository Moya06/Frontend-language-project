import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'

export default function Dropdown({ trigger, items = [] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(v => !v)}>{trigger}</div>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-44 rounded-2xl z-50 overflow-hidden animate-slide-up"
          style={{
            background: 'var(--neo-bg)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-neo)',
          }}
        >
          <div className="p-1.5 space-y-0.5">
            {items.map((item, i) => (
              item.disabled
                ? <div key={i} className="h-px mx-1 my-1" style={{ background: 'var(--border-subtle)' }} />
                : (
                  <button
                    key={i}
                    onClick={() => { item.onClick?.(); setOpen(false) }}
                    className={clsx(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150',
                      item.danger
                        ? 'text-red-400 hover:bg-red-500/10'
                        : item.active
                          ? 'font-semibold'
                          : '',
                    )}
                    style={item.active
                      ? { color: 'var(--text-base)', background: 'var(--link-active-bg)' }
                      : item.danger
                        ? {}
                        : { color: 'var(--text-secondary)' }
                    }
                  >
                    {item.icon && <span className="text-base leading-none">{item.icon}</span>}
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
