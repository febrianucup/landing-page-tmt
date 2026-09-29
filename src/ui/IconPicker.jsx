import { useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { ICON_CHOICES } from '../lib/seed'
import { Field, Input } from './Field'

export default function IconPicker({ label, value, onChange, hint }) {
  const [query, setQuery] = useState('')

  const icons = useMemo(() => {
    const list = Array.from(new Set([value, ...ICON_CHOICES].filter(Boolean)))
    const term = query.trim().toLowerCase()
    return term ? list.filter((icon) => icon.includes(term)) : list
  }, [query, value])

  return (
    <Field label={label} hint={hint}>
      <div className="rounded-xl border border-line bg-white p-3">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari ikon…"
          className="h-9"
        />
        <div className="mt-3 grid max-h-44 grid-cols-6 gap-2 overflow-y-auto scrollbar-slim sm:grid-cols-8">
          {icons.map((icon) => {
            const active = icon === value
            return (
              <button
                key={icon}
                type="button"
                title={icon}
                onClick={() => onChange(icon)}
                className={cn(
                  'flex h-10 items-center justify-center rounded-lg border transition-colors',
                  active
                    ? 'border-primary bg-primary-soft text-primary-ink'
                    : 'border-line bg-white text-muted hover:border-line-strong hover:text-ink',
                )}
              >
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </button>
            )
          })}
          {icons.length === 0 ? (
            <p className="col-span-full py-2 text-center text-label text-faint">
              Ikon tidak ditemukan.
            </p>
          ) : null}
        </div>
      </div>
    </Field>
  )
}
