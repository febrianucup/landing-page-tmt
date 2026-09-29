import { useContent } from '../../context/ContentContext'
import { TONE_CHOICES } from '../../lib/seed'
import { tone as toneClass } from '../../lib/tones'
import { Card, CardHeader } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { Field, Input, Select, Textarea } from '../../ui/Field'
import IconPicker from '../../ui/IconPicker'
import Repeater from '../../ui/Repeater'

export default function StatsEditor() {
  const { content, addItem, updateItem, removeItem, moveItem } = useContent()
  const path = ['stats', 'items']

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Konten"
        title="Statistik"
        description="Tiga kartu angka yang tampil tepat di bawah hero."
        actions={
          <Button as="a" href="/#home" target="_blank" variant="secondary" icon="visibility">
            Lihat di halaman
          </Button>
        }
      />

      <Card>
        <CardHeader
          icon="query_stats"
          title={`Kartu statistik (${content.stats.items.length})`}
          description="Ubah nilai, keterangan, ikon, dan warna tiap kartu."
        />
        <div className="p-5">
          <Repeater
            items={content.stats.items}
            titleOf={(item) => item.value || 'Tanpa nilai'}
            subtitleOf={(item) => item.label}
            iconOf={(item) => item.icon}
            onAdd={() =>
              addItem(path, { icon: 'insights', tone: 'primary', value: '0%', label: 'Keterangan baru' })
            }
            onRemove={(id) => removeItem(path, id)}
            onMove={(id, delta) => moveItem(path, id, delta)}
            addLabel="Tambah kartu"
            emptyTitle="Belum ada kartu statistik"
            emptyHint="Tambahkan kartu untuk menampilkan angka pencapaian."
            renderItem={(item) => (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
                  <Field label="Nilai besar">
                    <Input
                      value={item.value}
                      onChange={(event) => updateItem(path, item.id, { value: event.target.value })}
                      placeholder="50%"
                    />
                  </Field>
                  <Field label="Warna">
                    <Select
                      value={item.tone}
                      onChange={(event) => updateItem(path, item.id, { tone: event.target.value })}
                    >
                      {TONE_CHOICES.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                          {choice.label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>

                <Field label="Keterangan">
                  <Textarea
                    rows={2}
                    value={item.label}
                    onChange={(event) => updateItem(path, item.id, { label: event.target.value })}
                  />
                </Field>

                <IconPicker
                  label="Ikon"
                  value={item.icon}
                  onChange={(next) => updateItem(path, item.id, { icon: next })}
                />

                <div className="flex items-center gap-3 rounded-lg border border-line bg-subtle px-4 py-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClass(item.tone, 'chip')}`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </span>
                  <div>
                    <p className="font-display text-[20px] font-bold text-ink">{item.value || '—'}</p>
                    <p className="text-micro text-muted">{item.label || 'Keterangan belum diisi'}</p>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </Card>
    </div>
  )
}
