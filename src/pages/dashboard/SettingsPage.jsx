import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'
import { DEMO_ACCOUNT } from '../../lib/demoAccount'
import { downloadJson, readJsonFile } from '../../lib/download'
import { Card, CardHeader } from '../../ui/Card'
import PageHeader from '../../ui/PageHeader'
import Button from '../../ui/Button'
import { ConfirmDialog } from '../../ui/Modal'
import { useToast } from '../../ui/ToastContext'

function prettySize(chars) {
  const bytes = Math.round((chars * 2) / 1024)
  if (bytes < 1024) return `${bytes} KB`
  return `${(bytes / 1024).toFixed(2)} MB`
}

export default function SettingsPage() {
  const { content, replaceDocument, resetAll, savedAt } = useContent()
  const toast = useToast()
  const fileRef = useRef(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const serialized = JSON.stringify(content)
  const submissionCount = (content.submissions || []).length

  const handleImport = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      const parsed = await readJsonFile(file)
      replaceDocument(parsed)
      toast.success('Konten berhasil diimpor.')
    } catch (error) {
      toast.error(error.message || 'Gagal mengimpor file.')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Struktur"
        title="Pengaturan"
        description="Cadangkan konten, pulihkan dari file, atau kembalikan seluruh halaman ke isi awal."
      />

      <Card>
        <CardHeader
          icon="save"
          title="Penyimpanan"
          description="Konten disimpan di localStorage browser ini — tidak ada server yang dibutuhkan."
        />
        <div className="grid gap-px overflow-hidden rounded-b-2xl bg-line sm:grid-cols-3">
          {[
            { label: 'Ukuran dokumen', value: prettySize(serialized.length) },
            { label: 'Pesan tersimpan', value: `${submissionCount} pesan` },
            {
              label: 'Terakhir disimpan',
              value: savedAt
                ? new Date(savedAt).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '—',
            },
          ].map((tile) => (
            <div key={tile.label} className="bg-white px-5 py-4">
              <p className="text-micro font-semibold uppercase tracking-wider text-faint">
                {tile.label}
              </p>
              <p className="mt-1 font-display text-[18px] font-bold text-ink">{tile.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader icon="swap_vert" title="Cadangan konten" />
        <div className="flex flex-wrap gap-3 p-5">
          <Button
            icon="download"
            onClick={() => {
              downloadJson('tmt-content.json', content)
              toast.success('File cadangan diunduh.')
            }}
          >
            Ekspor JSON
          </Button>
          <Button variant="secondary" icon="upload" onClick={() => fileRef.current?.click()}>
            Impor JSON
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </Card>

      <Card>
        <CardHeader
          icon="badge"
          title="Akun dashboard"
          description="Kredensial demo yang dipakai untuk masuk ke panel ini."
        />
        <div className="grid gap-4 p-5">
          <div className="rounded-xl border border-line bg-subtle px-4 py-3">
            <p className="text-micro font-bold uppercase tracking-wider text-faint">Akun demo</p>
            <p className="mt-1.5 font-mono text-label text-ink">
              {DEMO_ACCOUNT.email} · {DEMO_ACCOUNT.password}
            </p>
            <p className="mt-2 text-micro text-muted">
              Ganti kredensial di{' '}
              <code className="rounded bg-white px-1.5 py-0.5 text-ink">
                src/lib/demoAccount.js
              </code>{' '}
              sebelum dipublikasikan.
            </p>
          </div>
          <p className="text-label text-muted">
            Ingin melihat hasilnya?{' '}
            <Link to="/" className="font-semibold text-primary hover:text-primary-hover">
              Buka landing page
            </Link>{' '}
            — perubahan langsung terlihat tanpa perlu build ulang.
          </p>
        </div>
      </Card>

      <Card className="border-danger/30">
        <CardHeader
          icon="warning"
          title="Kembalikan ke isi awal"
          description="Menghapus semua perubahan dan pesan, lalu memuat kembali konten bawaan."
        />
        <div className="p-5">
          <Button variant="dangerSoft" icon="restart_alt" onClick={() => setConfirmReset(true)}>
            Reset semua konten
          </Button>
        </div>
      </Card>

      <ConfirmDialog
        open={confirmReset}
        title="Reset seluruh konten?"
        description="Semua perubahan pada halaman dan seluruh pesan masuk akan hilang. Ekspor dulu jika ingin menyimpan salinan."
        confirmLabel="Ya, reset"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetAll()
          setConfirmReset(false)
          toast.success('Konten dikembalikan ke pengaturan awal.')
        }}
      />
    </div>
  )
}
