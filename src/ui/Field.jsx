import { cn } from '../lib/cn'

const CONTROL =
  'w-full rounded-lg border border-line bg-white text-body text-ink placeholder:text-faint outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-fill disabled:text-faint'

export function Field({ label, hint, htmlFor, children, className, action }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <div className="flex items-center justify-between gap-2">
          <label htmlFor={htmlFor} className="text-label font-semibold text-ink">
            {label}
          </label>
          {action}
        </div>
      ) : null}
      {children}
      {hint ? <p className="text-micro leading-4 text-faint">{hint}</p> : null}
    </div>
  )
}

export function Input({ className, ...rest }) {
  return <input className={cn(CONTROL, 'h-10 px-3', className)} {...rest} />
}

export function Textarea({ className, rows = 3, ...rest }) {
  return <textarea rows={rows} className={cn(CONTROL, 'resize-y px-3 py-2.5', className)} {...rest} />
}

export function Select({ className, children, ...rest }) {
  return (
    <select className={cn(CONTROL, 'h-10 px-3 pr-8', className)} {...rest}>
      {children}
    </select>
  )
}

export function Toggle({ checked, onChange, label, description, id }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-white px-3.5 py-3 transition-colors hover:bg-subtle"
    >
      <span className="relative mt-0.5 flex-shrink-0">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={Boolean(checked)}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="block h-6 w-10 rounded-full bg-line-strong transition-colors peer-checked:bg-primary" />
        <span className="pointer-events-none absolute left-0.5 top-0.5 block h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-label font-semibold text-ink">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-micro leading-4 text-muted">{description}</span>
        ) : null}
      </span>
    </label>
  )
}
