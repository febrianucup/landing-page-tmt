import { useContent } from '../../context/ContentContext'
import { TONE_CHOICES } from '../../lib/seed'
import { tone as toneClass } from '../../lib/tones'
import { Card, CardHeader } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { Field, Input, Select } from '../../ui/Field'
import IconPicker from '../../ui/IconPicker'
import Repeater from '../../ui/Repeater'
import SectionIntroFields from '../../ui/SectionIntroFields'
import StringListEditor from '../../ui/StringListEditor'

export default function RolesEditor() {
  const { content, addItem, updateItem, removeItem, moveItem } = useContent()
  const path = ['roles', 'items']
  const section = content.roles

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Konten"
        title="Peran Pengguna"
        description="Kartu peran (Guru, Tata Usaha, Kepala Sekolah) beserta daftar fiturnya."
        actions={
          <Button as="a" href="/#peran" target="_blank" variant="secondary" icon="visibility">
            Lihat di halaman
          </Button>
        }
      />

      <Card>
        <CardHeader icon="title" title="Judul bagian" />
        <div className="grid gap-4 p-5">
          <SectionIntroFields path={['roles']} />
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="groups"
          title={`Kartu peran (${section.items.length})`}
          description="Urutan kartu mengikuti urutan di bawah ini."
        />
        <div className="p-5">
          <Repeater
            items={section.items}
            titleOf={(item) => item.title}
            subtitleOf={(item) => item.subtitle}
            iconOf={(item) => item.icon}
            onAdd={() =>
              addItem(path, {
                icon: 'person',
                tone: 'primary',
                title: 'Peran baru',
                subtitle: 'Keterangan singkat',
                features: ['Fitur pertama'],
              })
            }
            onRemove={(id) => removeItem(path, id)}
            onMove={(id, delta) => moveItem(path, id, delta)}
            addLabel="Tambah peran"
            emptyTitle="Belum ada peran"
            emptyHint="Tambahkan peran pengguna dan daftar fiturnya."
            renderItem={(item) => (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_1fr_9rem]">
                  <Field label="Nama peran">
                    <Input
                      value={item.title}
                      onChange={(event) => updateItem(path, item.id, { title: event.target.value })}
                    />
                  </Field>
                  <Field label="Keterangan kecil">
                    <Input
                      value={item.subtitle || ''}
                      onChange={(event) =>
                        updateItem(path, item.id, { subtitle: event.target.value })
                      }
                      placeholder="Contoh: Pengguna Harian"
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

                <IconPicker
                  label="Ikon peran"
                  value={item.icon}
                  onChange={(next) => updateItem(path, item.id, { icon: next })}
                />

                <StringListEditor
                  label={`Fitur ${item.title || ''}`.trim()}
                  items={item.features || []}
                  onChange={(next) => updateItem(path, item.id, { features: next })}
                  placeholder="Contoh: Dashboard analitik komprehensif"
                  addLabel="Tambah fitur"
                />

                <div className="flex items-start gap-3 rounded-lg border border-line bg-subtle px-4 py-3">
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${toneClass(item.tone, 'chip')}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-label font-semibold text-ink">{item.title || 'Tanpa nama'}</p>
                    <p className="text-micro text-faint">{item.subtitle}</p>
                    <p className="mt-1 text-micro text-muted">
                      {(item.features || []).length} fitur terdaftar
                    </p>
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
