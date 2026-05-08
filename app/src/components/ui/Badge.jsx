import clsx from 'clsx'

export default function Badge({ children, color = '#6366f1', size = 'md', className = '' }) {
  const sizes = { sm: 'w-10 h-10 text-xs', md: 'w-14 h-14 text-base', lg: 'w-20 h-20 text-2xl' }
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center font-black rounded-2xl border select-none flex-shrink-0',
        sizes[size], className,
      )}
      style={{
        background: `${color}18`,
        color,
        borderColor: `${color}35`,
        boxShadow: `0 4px 12px ${color}20`,
      }}
    >
      {children}
    </div>
  )
}
