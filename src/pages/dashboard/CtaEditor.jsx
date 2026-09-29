import { useContent } from '../../context/ContentContext'
import { Card, CardHeader } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { Field, Input, Textarea } from '../../ui/Field'
import ImageField from '../../ui/ImageField'

export default function CtaEditor() {
  const { content, setPath } = useContent()
  const cta = content.cta

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Konten"
        title="Ajakan Bertindak (CTA)"
        description="Panel gelap sebelum bagian kontak yang mendorong pengunjung menghubungi tim."
        actions={
          <Button as="a" href="/#kontak" target="_blank" variant="secondary" icon="visibility">
            Lihat di halaman
          </Button>
        }
      />

      <Card>
        <CardHeader icon="campaign" title="Teks" />
        <div className="grid gap-4 p-5">
          <Field label="Judul">
            <Input
              value={cta.title}
              onChange={(event) => setPath(['cta', 'title'], event.target.value)}
            />
          </Field>
          <Field label="Deskripsi">
            <Textarea
              rows={3}
              value={cta.description}
              onChange={(event) => setPath(['cta', 'description'], event.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Teks tombol">
              <Input
                value={cta.buttonLabel}
                onChange={(event) => setPath(['cta', 'buttonLabel'], event.target.value)}
              />
            </Field>
            <Field label="Tautan tombol">
              <Input
                value={cta.buttonHref}
                onChange={(event) => setPath(['cta', 'buttonHref'], event.target.value)}
                placeholder="#kontak"
              />
            </Field>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="image"
          title="Latar belakang"
          description="Opsional. Tanpa gambar, panel memakai warna gelap polos."
        />
        <div className="grid gap-5 p-5">
          <ImageField
            label="Gambar latar"
            value={cta.image}
            onChange={(next) => setPath(['cta', 'image'], next)}
            hint="Kosongkan untuk memakai latar gelap polos. Gambar digelapkan otomatis agar teks tetap terbaca."
            aspect="aspect-[16/9]"
          />

          <div className="overflow-hidden rounded-xl border border-line">
            <div className="relative px-6 py-10 text-center">
              <div className="absolute inset-0 bg-ink" />
              {cta.image ? (
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ backgroundImage: `url(${cta.image})` }}
                />
              ) : null}
              <div className="relative">
                <p className="font-display text-[20px] font-bold text-white">
                  {cta.title || 'Judul CTA'}
                </p>
                <p className="mx-auto mt-2 max-w-md text-label text-white/60">{cta.description}</p>
                <span className="mt-5 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-label font-semibold text-white">
                  {cta.buttonLabel || 'Tombol'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
