import { useState } from 'react'
import { cn } from '../lib/cn'
import Button from './Button'

export function ItemCard({
  index,
  title,
  subtitle,
  icon,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onRemove,
  confirming,
  onConfirmRemove,
  onCancelRemove,
  children,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="flex items-center gap-3 border-b border-line bg-subtle px-3 py-2.5">
        <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-fill px-1.5 text-micro font-bold text-muted">
          {index + 1}
        </span>
        {icon ? (
          <span className="material-symbols-outlined text-[18px] text-faint">{icon}</span>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-label font-semibold text-ink">{title || `Item ${index + 1}`}</p>
          {subtitle ? <p className="truncate text-micro text-faint">{subtitle}</p> : null}
        </div>

        {confirming ? (
          <div className="flex items-center gap-1">
            <span className="mr-1 text-micro font-semibold text-danger-ink">Hapus?</span>
            <Button variant="danger" size="sm" onClick={onConfirmRemove}>
              Ya
            </Button>
            <Button variant="ghost" size="sm" onClick={onCancelRemove}>
              Batal
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              icon="arrow_upward"
              aria-label="Naikkan"
              disabled={!canMoveUp}
              onClick={onMoveUp}
            />
            <Button
              variant="ghost"
              size="icon"
              icon="arrow_downward"
              aria-label="Turunkan"
              disabled={!canMoveDown}
              onClick={onMoveDown}
            />
            <Button
              variant="ghost"
              size="icon"
              icon="delete"
              aria-label="Hapus"
              className="hover:bg-danger-soft hover:text-danger-ink"
              onClick={onRemove}
            />
          </div>
        )}
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  )
}

/** Repeatable list editor with reorder + inline delete confirmation. */
export default function Repeater({
  items = [],
  onAdd,
  onRemove,
  onMove,
  addLabel = 'Tambah item',
  addIcon = 'add',
  emptyTitle = 'Belum ada item',
  emptyHint = 'Tambahkan item pertama untuk mulai mengisi bagian ini.',
  renderItem,
  titleOf,
  subtitleOf,
  iconOf,
  className,
}) {
  const [confirmId, setConfirmId] = useState(null)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line-strong bg-subtle px-5 py-8 text-center">
          <span className="material-symbols-outlined text-[26px] text-faint">inbox</span>
          <p className="mt-2 text-label font-semibold text-ink">{emptyTitle}</p>
          <p className="mx-auto mt-1 max-w-sm text-micro text-muted">{emptyHint}</p>
          {onAdd ? (
            <Button variant="soft" size="sm" icon={addIcon} className="mt-4" onClick={() => onAdd()}>
              {addLabel}
            </Button>
          ) : null}
        </div>
      ) : (
        <>
          {items.map((item, index) => (
            <ItemCard
              key={item.id || index}
              index={index}
              title={titleOf ? titleOf(item, index) : undefined}
              subtitle={subtitleOf ? subtitleOf(item, index) : undefined}
              icon={iconOf ? iconOf(item, index) : undefined}
              canMoveUp={index > 0}
              canMoveDown={index < items.length - 1}
              onMoveUp={() => onMove(item.id, -1)}
              onMoveDown={() => onMove(item.id, 1)}
              confirming={confirmId === item.id}
              onRemove={() => setConfirmId(item.id)}
              onCancelRemove={() => setConfirmId(null)}
              onConfirmRemove={() => {
                setConfirmId(null)
                onRemove(item.id)
              }}
            >
              {renderItem(item, index)}
            </ItemCard>
          ))}
          {onAdd ? (
            <Button variant="secondary" icon={addIcon} className="self-start" onClick={() => onAdd()}>
              {addLabel}
            </Button>
          ) : null}
        </>
      )}
    </div>
  )
}
