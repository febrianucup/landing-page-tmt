import { cn } from '../lib/cn'
import { tone as toneClass } from '../lib/tones'

export function Card({ className, children, ...rest }) {
  return (
    <div
      className={cn('rounded-2xl border border-line bg-white shadow-card', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, description, icon, actions, className }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-start justify-between gap-4 border-b border-line px-5 py-4',
        className,
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        {icon ? (
          <span className="material-symbols-outlined mt-0.5 text-[20px] text-faint">{icon}</span>
        ) : null}
        <div className="min-w-0">
          <h2 className="font-display text-[17px] font-bold text-ink">{title}</h2>
          {description ? <p className="mt-0.5 text-label text-muted">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}

export function Badge({ children, name, icon, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-micro font-semibold uppercase tracking-wider',
        toneClass(name, 'chip'),
        className,
      )}
    >
      {icon ? <span className="material-symbols-outlined text-[14px]">{icon}</span> : null}
      {children}
    </span>
  )
}
