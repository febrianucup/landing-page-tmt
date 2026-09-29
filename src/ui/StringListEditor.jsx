import { cn } from '../lib/cn'
import Button from './Button'
import { Field, Input } from './Field'

/** Editor for a plain list of strings (feature bullets, highlights, …). */
export default function StringListEditor({
  label,
  hint,
  items = [],
  onChange,
  placeholder = 'Tulis poin…',
  addLabel = 'Tambah poin',
  className,
}) {
  const update = (index, value) => {
    const next = items.slice()
    next[index] = value
    onChange(next)
  }

  const remove = (index) => onChange(items.filter((_, i) => i !== index))

  const add = () => onChange([...items, ''])

  const move = (index, delta) => {
    const target = index + delta
    if (target < 0 || target >= items.length) return
    const next = items.slice()
    const [moved] = next.splice(index, 1)
    next.splice(target, 0, moved)
    onChange(next)
  }

  return (
    <Field label={label} hint={hint} className={className}>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-success">check_circle</span>
            <Input
              value={item}
              onChange={(event) => update(index, event.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <div className="flex items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon"
                icon="arrow_upward"
                aria-label="Naikkan"
                disabled={index === 0}
                onClick={() => move(index, -1)}
              />
              <Button
                variant="ghost"
                size="icon"
                icon="arrow_downward"
                aria-label="Turunkan"
                disabled={index === items.length - 1}
                onClick={() => move(index, 1)}
              />
              <Button
                variant="ghost"
                size="icon"
                icon="close"
                aria-label="Hapus poin"
                className={cn('hover:bg-danger-soft hover:text-danger-ink')}
                onClick={() => remove(index)}
              />
            </div>
          </div>
        ))}
        <Button variant="secondary" size="sm" icon="add" className="self-start" onClick={add}>
          {addLabel}
        </Button>
      </div>
    </Field>
  )
}
