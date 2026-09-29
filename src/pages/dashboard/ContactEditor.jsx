import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'
import { TONE_CHOICES } from '../../lib/seed'
import { tone as toneClass } from '../../lib/tones'
import { Card, CardHeader, Badge } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { Field, Input, Select, Textarea, Toggle } from '../../ui/Field'
import IconPicker from '../../ui/IconPicker'
import Repeater from '../../ui/Repeater'
import SectionIntroFields from '../../ui/SectionIntroFields'

export default function ContactEditor() {
  const { content, setPath, addItem, updateItem, removeItem, moveItem } = useContent()
  const path = ['contact', 'channels']
  const section = content.contact
  const form = section.form

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Konten"
        title="Kontak & Formulir"
        description="Kanal kontak yang tampil di halaman, plus pengaturan formulir dan pengiriman email."
        actions={
          <Button as="a" href="/#kontak" target="_blank" variant="secondary" icon="visibility">
            Lihat di halaman
          </Button>
        }
      />

      <Card>
        <CardHeader icon="title" title="Judul bagian" />
        <div className="grid gap-4 p-5">
          <SectionIntroFields path={['contact']} />
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="contact_phone"
          title={`Kanal kontak (${section.channels.length})`}
          description="Setiap kanal bisa diklik dan mengarah ke tautan yang ditentukan."
        />
        <div className="p-5">
          <Repeater
            items={section.channels}
            titleOf={(item) => item.title}
            subtitleOf={(item) => item.value}
            iconOf={(item) => item.icon}
            onAdd={() =>
              addItem(path, {
                icon: 'chat',
                tone: 'primary',
                title: 'Kanal baru',
                description: 'Keterangan singkat',
                value: 'Isi kontak',
                link: 'https://',
              })
            }
            onRemove={(id) => removeItem(path, id)}
            onMove={(id, delta) => moveItem(path, id, delta)}
            addLabel="Tambah kanal"
            emptyTitle="Belum ada kanal kontak"
            emptyHint="Tambahkan minimal satu cara untuk menghubungi tim."
            renderItem={(item) => (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
                  <Field label="Nama kanal">
                    <Input
                      value={item.title}
                      onChange={(event) => updateItem(path, item.id, { title: event.target.value })}
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

                <Field label="Keterangan kecil">
                  <Input
                    value={item.description}
                    onChange={(event) =>
                      updateItem(path, item.id, { description: event.target.value })
                    }
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nilai yang tampil">
                    <Input
                      value={item.value}
                      onChange={(event) => updateItem(path, item.id, { value: event.target.value })}
                      placeholder="nama@sekolah.id"
                    />
                  </Field>
                  <Field label="Tautan tujuan">
                    <Input
                      value={item.link}
                      onChange={(event) => updateItem(path, item.id, { link: event.target.value })}
                      placeholder="https://wa.me/62…"
                    />
                  </Field>
                </div>

                <IconPicker
                  label="Ikon"
                  value={item.icon}
                  onChange={(next) => updateItem(path, item.id, { icon: next })}
                />

                <div className="flex items-center gap-3 rounded-lg border border-line bg-subtle px-4 py-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClass(item.tone, 'chip')}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-label font-semibold text-ink">{item.title}</p>
                    <p className="truncate text-micro text-muted">{item.value}</p>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="mail"
          title="Formulir kontak"
          description="Teks pada formulir dan cara pesan diteruskan."
          actions={<Badge name={form.notifyByEmail ? 'success' : 'warning'}>
            {form.notifyByEmail ? 'Email aktif' : 'Email mati'}
          </Badge>}
        />
        <div className="grid gap-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Judul formulir">
              <Input
                value={form.title}
                onChange={(event) => setPath(['contact', 'form', 'title'], event.target.value)}
              />
            </Field>
            <Field label="Teks tombol kirim">
              <Input
                value={form.submitLabel}
                onChange={(event) => setPath(['contact', 'form', 'submitLabel'], event.target.value)}
              />
            </Field>
          </div>

          <Field label="Keterangan formulir">
            <Input
              value={form.description}
              onChange={(event) => setPath(['contact', 'form', 'description'], event.target.value)}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Pesan berhasil">
              <Textarea
                rows={2}
                value={form.successMessage}
                onChange={(event) =>
                  setPath(['contact', 'form', 'successMessage'], event.target.value)
                }
              />
            </Field>
            <Field label="Pesan gagal">
              <Textarea
                rows={2}
                value={form.errorMessage}
                onChange={(event) => setPath(['contact', 'form', 'errorMessage'], event.target.value)}
              />
            </Field>
          </div>

          <Toggle
            id="notify-email"
            checked={form.notifyByEmail}
            onChange={(next) => setPath(['contact', 'form', 'notifyByEmail'], next)}
            label="Teruskan pesan ke email (EmailJS)"
            description="Pesan selalu tersimpan di Pesan Masuk. Aktifkan ini untuk juga mengirimnya ke email tim."
          />

          {form.notifyByEmail ? (
            <div className="grid gap-4 rounded-xl border border-line bg-subtle p-4 sm:grid-cols-3">
              <Field label="Service ID">
                <Input
                  value={form.serviceId}
                  onChange={(event) => setPath(['contact', 'form', 'serviceId'], event.target.value)}
                />
              </Field>
              <Field label="Template ID">
                <Input
                  value={form.templateId}
                  onChange={(event) => setPath(['contact', 'form', 'templateId'], event.target.value)}
                />
              </Field>
              <Field label="Public key">
                <Input
                  value={form.publicKey}
                  onChange={(event) => setPath(['contact', 'form', 'publicKey'], event.target.value)}
                />
              </Field>
            </div>
          ) : null}

          <p className="rounded-lg border border-line bg-subtle px-4 py-3 text-micro text-muted">
            Semua kiriman formulir masuk ke{' '}
            <Link to="/dashboard/submissions" className="font-semibold text-primary">
              Pesan Masuk
            </Link>{' '}
            dan tersimpan di browser ini.
          </p>
        </div>
      </Card>
    </div>
  )
}
