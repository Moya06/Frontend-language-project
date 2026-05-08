import clsx from 'clsx'

export default function StatCard({ label, value, icon, sub, gradient }) {
  return (
    <div className="glass p-5 flex flex-col gap-2 hover:shadow-glass-lg transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-white/30 mb-1.5">{label}</p>
          <p className={clsx('text-3xl font-black', gradient ?? 'text-gradient-brand')}>{value}</p>
          {sub && <p className="text-xs text-white/30 mt-1">{sub}</p>}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl neo flex items-center justify-center text-xl flex-shrink-0">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
