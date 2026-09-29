import { useContent } from '../../context/ContentContext'
import { Card, CardHeader } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { Field, Input, Textarea } from '../../ui/Field'
import Repeater from '../../ui/Repeater'
import SectionIntroFields from '../../ui/SectionIntroFields'

export default function ProblemsEditor() {
  const { content, setPath, addItem, updateItem, removeItem, moveItem } = useContent()
  const path = ['problems', 'items']
  const section = content.problems

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Konten"
        title="Masalah vs Solusi"
        description="Perbandingan kondisi lama dan solusi TMT untuk meyakinkan calon pengguna."
        actions={
          <Button as="a" href="/#fitur" target="_blank" variant="secondary" icon="visibility">
            Lihat di halaman
          </Button>
        }
      />

      <Card>
        <CardHeader icon="title" title="Judul bagian" />
        <div className="grid gap-4 p-5">
          <SectionIntroFields path={['problems']} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Label kolom kiri" hint="Judul untuk kondisi lama.">
              <Input
                value={section.oldTitle}
                onChange={(event) => setPath(['problems', 'oldTitle'], event.target.value)}
              />
            </Field>
            <Field label="Label kolom kanan" hint="Judul untuk solusi TMT.">
              <Input
                value={section.newTitle}
                onChange={(event) => setPath(['problems', 'newTitle'], event.target.value)}
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="compare_arrows"
          title={`Daftar perbandingan (${section.items.length})`}
          description="Setiap item menampilkan satu pasangan masalah dan solusinya."
        />
        <div className="p-5">
          <Repeater
            items={section.items}
            titleOf={(item) => item.newText}
            subtitleOf={(item) => item.oldText}
            iconOf={() => 'swap_horiz'}
            onAdd={() =>
              addItem(path, {
                oldText: 'Masalah pada cara lama…',
                newText: 'Bagaimana TMT menyelesaikannya…',
              })
            }
            onRemove={(id) => removeItem(path, id)}
            onMove={(id, delta) => moveItem(path, id, delta)}
            addLabel="Tambah perbandingan"
            emptyTitle="Belum ada perbandingan"
            emptyHint="Tambahkan pasangan masalah dan solusi."
            renderItem={(item) => (
              <div className="grid gap-4">
                <Field label={section.oldTitle || 'Cara lama'}>
                  <Textarea
                    rows={3}
                    value={item.oldText}
                    onChange={(event) => updateItem(path, item.id, { oldText: event.target.value })}
                    className="border-danger/30 focus:border-danger focus:ring-danger/10"
                  />
                </Field>
                <Field label={section.newTitle || 'Solusi TMT'}>
                  <Textarea
                    rows={3}
                    value={item.newText}
                    onChange={(event) => updateItem(path, item.id, { newText: event.target.value })}
                    className="border-success/30 focus:border-success focus:ring-success/10"
                  />
                </Field>
              </div>
            )}
          />
        </div>
      </Card>
    </div>
  )
}
