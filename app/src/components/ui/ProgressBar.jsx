import clsx from 'clsx'

export default function ProgressBar({ value = 0, color = '#6366f1', className = '', showLabel = false, thin = false }) {
  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-[10px] text-white/30">Progress</span>
          <span className="text-[10px] text-white/40 font-medium">{value}%</span>
        </div>
      )}
      <div className={clsx('rounded-full bg-white/[0.06] overflow-hidden', thin ? 'h-1' : 'h-1.5')}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(value, 100)}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        />
      </div>
    </div>
  )
}
