import { useContent } from '../../context/ContentContext'
import { Card, CardHeader } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { Field, Input, Textarea } from '../../ui/Field'
import IconPicker from '../../ui/IconPicker'
import Repeater from '../../ui/Repeater'

function LinkRepeater({ items, path, addLabel }) {
  const { addItem, updateItem, removeItem, moveItem } = useContent()

  return (
    <Repeater
      items={items}
      titleOf={(item) => item.label}
      subtitleOf={(item) => item.href}
      iconOf={() => 'link'}
      onAdd={() => addItem(path, { label: 'Tautan baru', href: '#' })}
      onRemove={(id) => removeItem(path, id)}
      onMove={(id, delta) => moveItem(path, id, delta)}
      addLabel={addLabel}
      emptyTitle="Belum ada tautan"
      emptyHint="Tambahkan tautan untuk kolom ini."
      renderItem={(link) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Label">
            <Input
              value={link.label}
              onChange={(event) => updateItem(path, link.id, { label: event.target.value })}
            />
          </Field>
          <Field label="Tautan">
            <Input
              value={link.href}
              onChange={(event) => updateItem(path, link.id, { href: event.target.value })}
              placeholder="#fitur"
            />
          </Field>
        </div>
      )}
    />
  )
}

export default function NavigationEditor() {
  const { content, setPath, addItem, updateItem, removeItem, moveItem } = useContent()
  const { brand, navbar, footer } = content

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Struktur"
        title="Navigasi & Footer"
        description="Identitas brand, menu di navbar, tautan tombol navbar, dan seluruh isi footer."
        actions={
          <Button as="a" href="/" target="_blank" variant="secondary" icon="visibility">
            Lihat di halaman
          </Button>
        }
      />

      <Card>
        <CardHeader icon="storefront" title="Identitas brand" />
        <div className="grid gap-4 p-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
            <Field label="Nama brand">
              <Input
                value={brand.name}
                onChange={(event) => setPath(['brand', 'name'], event.target.value)}
              />
            </Field>
            <Field label="Singkatan">
              <Input
                value={brand.short}
                onChange={(event) => setPath(['brand', 'short'], event.target.value)}
              />
            </Field>
          </div>
          <Field label="Deskripsi singkat" hint="Dipakai di blok brand pada footer.">
            <Textarea
              rows={3}
              value={brand.tagline}
              onChange={(event) => setPath(['brand', 'tagline'], event.target.value)}
            />
          </Field>
          <IconPicker
            label="Ikon logo"
            value={brand.icon}
            onChange={(next) => setPath(['brand', 'icon'], next)}
          />
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="menu"
          title={`Menu navbar (${navbar.items.length})`}
          description="Tautan menu di header. Gunakan #id untuk menggulir ke bagian halaman."
        />
        <div className="p-5">
          <Repeater
            items={navbar.items}
            titleOf={(item) => item.label}
            subtitleOf={(item) => item.href}
            iconOf={() => 'link'}
            onAdd={() => addItem(['navbar', 'items'], { label: 'Menu baru', href: '#home' })}
            onRemove={(id) => removeItem(['navbar', 'items'], id)}
            onMove={(id, delta) => moveItem(['navbar', 'items'], id, delta)}
            addLabel="Tambah menu"
            emptyTitle="Belum ada menu"
            emptyHint="Tambahkan tautan navigasi."
            renderItem={(item) => (
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Label">
                  <Input
                    value={item.label}
                    onChange={(event) =>
                      updateItem(['navbar', 'items'], item.id, { label: event.target.value })
                    }
                  />
                </Field>
                <Field label="Tautan" hint="Contoh: #fitur atau /halaman">
                  <Input
                    value={item.href}
                    onChange={(event) =>
                      updateItem(['navbar', 'items'], item.id, { href: event.target.value })
                    }
                  />
                </Field>
              </div>
            )}
          />

          <div className="mt-5 grid gap-4 rounded-xl border border-line bg-subtle p-4 sm:grid-cols-3">
            <Field label="Tombol navbar — teks">
              <Input
                value={navbar.cta.label}
                onChange={(event) => setPath(['navbar', 'cta', 'label'], event.target.value)}
              />
            </Field>
            <Field label="Tombol navbar — tautan">
              <Input
                value={navbar.cta.href}
                onChange={(event) => setPath(['navbar', 'cta', 'href'], event.target.value)}
              />
            </Field>
            <Field label="Tombol navbar — ikon">
              <Input
                value={navbar.cta.icon}
                onChange={(event) => setPath(['navbar', 'cta', 'icon'], event.target.value)}
                placeholder="call"
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="table_chart"
          title={`Kolom footer (${footer.columns.length})`}
          description="Setiap kolom dapat berisi beberapa tautan."
        />
        <div className="grid gap-4 p-5">
          <Field label="Deskripsi footer">
            <Textarea
              rows={3}
              value={footer.description}
              onChange={(event) => setPath(['footer', 'description'], event.target.value)}
            />
          </Field>

          <Repeater
            items={footer.columns}
            titleOf={(column) => column.title}
            subtitleOf={(column) => `${(column.links || []).length} tautan`}
            iconOf={() => 'view_column'}
            onAdd={() =>
              addItem(['footer', 'columns'], {
                title: 'Kolom baru',
                links: [{ label: 'Tautan baru', href: '#' }],
              })
            }
            onRemove={(id) => removeItem(['footer', 'columns'], id)}
            onMove={(id, delta) => moveItem(['footer', 'columns'], id, delta)}
            addLabel="Tambah kolom"
            emptyTitle="Belum ada kolom footer"
            emptyHint="Tambahkan kolom untuk mengelompokkan tautan."
            renderItem={(column, index) => (
              <div className="grid gap-4">
                <Field label="Judul kolom">
                  <Input
                    value={column.title}
                    onChange={(event) =>
                      updateItem(['footer', 'columns'], column.id, { title: event.target.value })
                    }
                  />
                </Field>
                <LinkRepeater
                  items={column.links || []}
                  path={['footer', 'columns', index, 'links']}
                  addLabel="Tambah tautan"
                />
              </div>
            )}
          />

          <div className="grid gap-4 rounded-xl border border-line bg-subtle p-4">
            <Field label="Teks hak cipta">
              <Input
                value={footer.copyright}
                onChange={(event) => setPath(['footer', 'copyright'], event.target.value)}
              />
            </Field>
            <LinkRepeater
              items={footer.legal}
              path={['footer', 'legal']}
              addLabel="Tambah tautan legal"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
