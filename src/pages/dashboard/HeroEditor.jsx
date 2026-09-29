import { useContent } from '../../context/ContentContext'
import { DEFAULT_HERO_IMAGE } from '../../lib/assets'
import { Card, CardHeader } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { Field, Input, Textarea, Toggle } from '../../ui/Field'
import ImageField from '../../ui/ImageField'
import IconPicker from '../../ui/IconPicker'
import StringListEditor from '../../ui/StringListEditor'

export default function HeroEditor() {
  const { content, setPath } = useContent()
  const hero = content.hero

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Konten"
        title="Bagian Hero"
        description="Bagian paling atas halaman: judul utama, subjudul, gambar mockup, tombol, dan daftar keunggulan."
        actions={
          <Button as="a" href="/#home" target="_blank" variant="secondary" icon="visibility">
            Lihat di halaman
          </Button>
        }
      />

      <Card>
        <CardHeader icon="title" title="Teks utama" />
        <div className="grid gap-4 p-5">
          <Field label="Label kecil (eyebrow)">
            <Input
              value={hero.eyebrow}
              onChange={(event) => setPath(['hero', 'eyebrow'], event.target.value)}
              placeholder="Teacher Management Tool"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Judul" hint="Baris pertama judul besar.">
              <Input
                value={hero.title}
                onChange={(event) => setPath(['hero', 'title'], event.target.value)}
              />
            </Field>
            <Field label="Judul sorotan" hint="Ditampilkan berwarna dengan garis bawah.">
              <Input
                value={hero.highlight}
                onChange={(event) => setPath(['hero', 'highlight'], event.target.value)}
              />
            </Field>
          </div>

          <Field label="Deskripsi">
            <Textarea
              rows={4}
              value={hero.subtitle}
              onChange={(event) => setPath(['hero', 'subtitle'], event.target.value)}
            />
          </Field>
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="checklist"
          title="Poin keunggulan"
          description="Daftar centang yang tampil di bawah deskripsi hero."
        />
        <div className="p-5">
          <StringListEditor
            items={hero.highlights || []}
            onChange={(next) => setPath(['hero', 'highlights'], next)}
            placeholder="Contoh: Otomatisasi laporan harian"
            addLabel="Tambah keunggulan"
            hint="Kosongkan daftar untuk menyembunyikan poin keunggulan."
          />
        </div>
      </Card>

      <Card>
        <CardHeader icon="smart_button" title="Tombol aksi" />
        <div className="grid gap-5 p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Tombol utama — teks">
              <Input
                value={hero.primaryCta.label}
                onChange={(event) => setPath(['hero', 'primaryCta', 'label'], event.target.value)}
              />
            </Field>
            <Field label="Tombol utama — tautan">
              <Input
                value={hero.primaryCta.href}
                onChange={(event) => setPath(['hero', 'primaryCta', 'href'], event.target.value)}
              />
            </Field>
            <Field label="Tombol utama — ikon">
              <Input
                value={hero.primaryCta.icon}
                onChange={(event) => setPath(['hero', 'primaryCta', 'icon'], event.target.value)}
                placeholder="arrow_forward"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Tombol sekunder — teks">
              <Input
                value={hero.secondaryCta.label}
                onChange={(event) => setPath(['hero', 'secondaryCta', 'label'], event.target.value)}
              />
            </Field>
            <Field label="Tombol sekunder — tautan">
              <Input
                value={hero.secondaryCta.href}
                onChange={(event) => setPath(['hero', 'secondaryCta', 'href'], event.target.value)}
              />
            </Field>
            <Field label="Tombol sekunder — ikon">
              <Input
                value={hero.secondaryCta.icon}
                onChange={(event) => setPath(['hero', 'secondaryCta', 'icon'], event.target.value)}
                placeholder="play_circle"
              />
            </Field>
          </div>

          <Toggle
            id="show-secondary"
            checked={hero.showSecondaryCta}
            onChange={(next) => setPath(['hero', 'showSecondaryCta'], next)}
            label="Tampilkan tombol sekunder"
            description="Matikan bila hanya ingin satu tombol di hero."
          />
        </div>
      </Card>

      <Card>
        <CardHeader icon="image" title="Gambar" />
        <div className="grid gap-5 p-5">
          <ImageField
            label="Mockup aplikasi"
            value={hero.image}
            onChange={(next) => setPath(['hero', 'image'], next)}
            defaultSrc={DEFAULT_HERO_IMAGE}
          />
          <Toggle
            id="show-hero-image"
            checked={hero.showImage}
            onChange={(next) => setPath(['hero', 'showImage'], next)}
            label="Tampilkan gambar hero"
            description="Jika dimatikan, kolom kanan hero akan dikosongkan dan teks memakai lebar penuh."
          />
          <Field label="Teks kepercayaan" hint="Tampil di bawah tombol. Kosongkan untuk menyembunyikan.">
            <Input
              value={hero.trust}
              onChange={(event) => setPath(['hero', 'trust'], event.target.value)}
            />
          </Field>
          <Toggle
            id="show-trust"
            checked={hero.showTrust}
            onChange={(next) => setPath(['hero', 'showTrust'], next)}
            label="Tampilkan teks kepercayaan"
          />
          <IconPicker
            label="Ikon logo (dipakai juga di navbar & footer)"
            value={content.brand.icon}
            onChange={(next) => setPath(['brand', 'icon'], next)}
            hint="Ikon Material Symbols yang tampil di logo."
          />
        </div>
      </Card>
    </div>
  )
}
