import { useRef, useState } from 'react'
import { cn } from '../lib/cn'
import { fileToDataUrl, prettyBytes } from '../lib/image'
import { useToast } from './ToastContext'
import { Field, Input } from './Field'
import Button from './Button'

/**
 * Image field: accepts an external URL or an uploaded file (resized and
 * inlined as a data URL). An empty value means "use the bundled default".
 */
export default function ImageField({
  label = 'Gambar',
  value,
  onChange,
  defaultSrc,
  hint = 'Tempel URL gambar, unggah file, atau biarkan kosong untuk memakai gambar bawaan.',
  aspect = 'aspect-[4/3]',
}) {
  const toast = useToast()
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const preview = value || defaultSrc

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setBusy(true)
    try {
      const dataUrl = await fileToDataUrl(file)
      onChange(dataUrl)
      toast.success(`Gambar diunggah (${prettyBytes(dataUrl.length)}).`)
    } catch (error) {
      toast.error(error.message || 'Gagal memuat gambar.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="rounded-xl border border-line bg-white p-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div
            className={cn(
              'w-full overflow-hidden rounded-lg border border-line bg-fill sm:w-40',
              aspect,
            )}
          >
            {preview ? (
              <img src={preview} alt="Pratinjau" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-faint">
                <span className="material-symbols-outlined text-[28px]">image</span>
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Input
              value={value?.startsWith('data:') ? '' : value || ''}
              onChange={(event) => onChange(event.target.value)}
              placeholder="https://contoh.com/gambar.png"
            />
            {value?.startsWith('data:') ? (
              <p className="text-micro text-muted">
                Gambar saat ini berasal dari file yang diunggah ({prettyBytes(value.length)}).
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon="upload"
                onClick={() => inputRef.current?.click()}
                disabled={busy}
              >
                {busy ? 'Memproses…' : 'Unggah file'}
              </Button>
              {value ? (
                <Button variant="ghost" size="sm" icon="restart_alt" onClick={() => onChange('')}>
                  Pakai gambar bawaan
                </Button>
              ) : null}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        </div>
      </div>
    </Field>
  )
}
