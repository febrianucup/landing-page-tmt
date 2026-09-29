import { useMemo, useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { Card, CardHeader, Badge } from '../../ui/Card'
import PageHeader, { EmptyState } from '../../ui/PageHeader'
import Button from '../../ui/Button'
import Modal, { ConfirmDialog } from '../../ui/Modal'
import { Field, Input, Textarea } from '../../ui/Field'
import { useToast } from '../../ui/ToastContext'

const FILTERS = [
  { id: 'all', label: 'Semua' },
  { id: 'new', label: 'Baru' },
  { id: 'read', label: 'Sudah dibaca' },
]

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(value),
  )
}

const EMPTY_DRAFT = { name: '', email: '', school: '', message: '' }

export default function SubmissionsInbox() {
  const { content, updateItem, removeItem, addSubmission } = useContent()
  const toast = useToast()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [composeOpen, setComposeOpen] = useState(false)
  const [draft, setDraft] = useState(EMPTY_DRAFT)

  const submissions = useMemo(() => content.submissions || [], [content.submissions])
  const path = ['submissions']

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    return submissions.filter((item) => {
      const matchesFilter = filter === 'all' || item.status === filter
      if (!matchesFilter) return false
      if (!term) return true
      return [item.name, item.email, item.school, item.message]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    })
  }, [submissions, filter, query])

  const active = submissions.find((item) => item.id === activeId) || null
  const unread = submissions.filter((item) => item.status === 'new').length

  const openDetail = (item) => {
    setActiveId(item.id)
    if (item.status === 'new') updateItem(path, item.id, { status: 'read' })
  }

  const create = () => {
    addSubmission({
      name: draft.name.trim() || 'Tanpa nama',
      email: draft.email.trim(),
      school: draft.school.trim(),
      message: draft.message.trim(),
      status: 'new',
      source: 'manual',
    })
    setDraft(EMPTY_DRAFT)
    setComposeOpen(false)
    toast.success('Pesan contoh ditambahkan.')
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Struktur"
        title="Pesan Masuk"
        description="Semua kiriman dari formulir kontak di landing page. Baca, tandai, dan hapus dari sini."
        actions={
          <Button icon="add" onClick={() => setComposeOpen(true)}>
            Tambah pesan
          </Button>
        }
      />

      <Card>
        <CardHeader
          icon="mark_email_unread"
          title={`${submissions.length} pesan`}
          description={`${unread} pesan belum dibaca`}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-line bg-white p-0.5">
                {FILTERS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`rounded-md px-3 py-1.5 text-micro font-semibold uppercase tracking-wider transition-colors ${
                      filter === item.id ? 'bg-primary-soft text-primary-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari nama, email, isi pesan…"
                className="w-full sm:w-56"
              />
            </div>
          }
        />

        <div className="p-5">
          {visible.length === 0 ? (
            <EmptyState
              icon="mail"
              title={submissions.length === 0 ? 'Belum ada pesan' : 'Tidak ada pesan yang cocok'}
              description={
                submissions.length === 0
                  ? 'Kirim pesan lewat formulir di halaman kontak, atau tambahkan pesan contoh untuk mencoba panel ini.'
                  : 'Coba ubah filter atau kata kunci pencarian.'
              }
              action={
                submissions.length === 0 ? (
                  <Button icon="add" onClick={() => setComposeOpen(true)}>
                    Tambah pesan contoh
                  </Button>
                ) : null
              }
            />
          ) : (
            <ul className="flex flex-col divide-y divide-line">
              {visible.map((item) => (
                <li key={item.id}>
                  <div className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => openDetail(item)}
                      className="flex min-w-0 flex-1 items-start gap-3 text-left"
                    >
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-fill text-label font-bold text-muted">
                        {(item.name || '?').slice(0, 1).toUpperCase()}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-label font-semibold text-ink">
                            {item.name || 'Tanpa nama'}
                          </span>
                          {item.status === 'new' ? <Badge name="warning">baru</Badge> : null}
                          {item.source === 'manual' ? <Badge name="primary">manual</Badge> : null}
                        </span>
                        <span className="mt-0.5 block truncate text-micro text-faint">
                          {item.email || 'email tidak diisi'}
                          {item.school ? ` · ${item.school}` : ''}
                        </span>
                        <span className="mt-1 block truncate text-label text-muted">
                          {item.message}
                        </span>
                      </span>
                      <span className="hidden flex-shrink-0 text-micro text-faint sm:block">
                        {formatDate(item.createdAt)}
                      </span>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      icon="delete"
                      aria-label="Hapus pesan"
                      className="hover:bg-danger-soft hover:text-danger-ink"
                      onClick={() => setPendingDelete(item.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <Modal
        open={Boolean(active)}
        onClose={() => setActiveId(null)}
        title={active?.name || 'Detail pesan'}
        description={active ? formatDate(active.createdAt) : ''}
        footer={
          active ? (
            <>
              <Button
                variant="secondary"
                icon="mark_email_unread"
                onClick={() => {
                  updateItem(path, active.id, {
                    status: active.status === 'new' ? 'read' : 'new',
                  })
                  toast.info('Status pesan diperbarui.')
                }}
              >
                Tandai {active.status === 'new' ? 'sudah dibaca' : 'belum dibaca'}
              </Button>
              {active.email ? (
                <Button as="a" href={`mailto:${active.email}`} icon="reply">
                  Balas email
                </Button>
              ) : null}
            </>
          ) : null
        }
      >
        {active ? (
          <div className="flex flex-col gap-4">
            <dl className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Email', value: active.email },
                { label: 'Sekolah', value: active.school },
                { label: 'Status', value: active.status === 'new' ? 'Baru' : 'Sudah dibaca' },
              ].map((row) => (
                <div key={row.label} className="rounded-lg border border-line bg-subtle px-3 py-2">
                  <dt className="text-micro font-semibold uppercase tracking-wider text-faint">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 truncate text-label text-ink">{row.value || '—'}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-xl border border-line bg-white p-4">
              <p className="whitespace-pre-wrap text-body text-ink">{active.message || '—'}</p>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        title="Tambah pesan"
        description="Berguna untuk menguji panel ini tanpa mengisi formulir di halaman publik."
        footer={
          <>
            <Button variant="secondary" onClick={() => setComposeOpen(false)}>
              Batal
            </Button>
            <Button icon="save" onClick={create} disabled={!draft.message.trim()}>
              Simpan pesan
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nama">
            <Input
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              placeholder="Nama pengirim"
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={draft.email}
              onChange={(event) => setDraft({ ...draft, email: event.target.value })}
              placeholder="nama@sekolah.id"
            />
          </Field>
          <Field label="Sekolah" className="sm:col-span-2">
            <Input
              value={draft.school}
              onChange={(event) => setDraft({ ...draft, school: event.target.value })}
              placeholder="SMA/SMK/SMP …"
            />
          </Field>
          <Field label="Pesan" className="sm:col-span-2">
            <Textarea
              rows={4}
              value={draft.message}
              onChange={(event) => setDraft({ ...draft, message: event.target.value })}
              placeholder="Isi pesan…"
            />
          </Field>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Hapus pesan ini?"
        description="Pesan akan dihapus permanen dari penyimpanan browser."
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          removeItem(path, pendingDelete)
          setPendingDelete(null)
          toast.success('Pesan dihapus.')
        }}
      />
    </div>
  )
}
