import { useContent } from '../context/ContentContext'
import { Field, Input, Textarea } from './Field'

/** Shared eyebrow / title / description trio used by most landing sections. */
export default function SectionIntroFields({ path, showEyebrow = true, titleLabel = 'Judul' }) {
  const { content, setPath } = useContent()
  const section = path.reduce((node, key) => (node ? node[key] : undefined), content) || {}

  return (
    <>
      {showEyebrow ? (
        <Field
          label="Label kecil (eyebrow)"
          hint="Teks kecil di atas judul. Kosongkan untuk menyembunyikannya."
        >
          <Input
            value={section.eyebrow || ''}
            onChange={(event) => setPath([...path, 'eyebrow'], event.target.value)}
            placeholder="Contoh: Perbandingan"
          />
        </Field>
      ) : null}

      <Field label={titleLabel}>
        <Input
          value={section.title || ''}
          onChange={(event) => setPath([...path, 'title'], event.target.value)}
        />
      </Field>

      <Field label="Deskripsi">
        <Textarea
          value={section.description || ''}
          onChange={(event) => setPath([...path, 'description'], event.target.value)}
          rows={3}
        />
      </Field>
    </>
  )
}
