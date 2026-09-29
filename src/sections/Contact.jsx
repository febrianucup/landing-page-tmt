import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useContent } from '../context/ContentContext'
import { useAnalytics } from '../context/AnalyticsContext'
import { tone as toneClass } from '../lib/tones'
import { useToast } from '../ui/ToastContext'
import Button from '../ui/Button'
import { Field, Input, Textarea } from '../ui/Field'
import SectionHeading from '../ui/SectionHeading'

const EMPTY = { from_name: '', from_email: '', school_name: '', message: '' }

export default function Contact() {
  const { content, addSubmission } = useContent()
  const { record } = useAnalytics()
  const toast = useToast()
  const section = content.contact
  const formConfig = section.form
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const update = (key) => (event) => setValues({ ...values, [key]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    setStatus('sending')
    setFeedback('')

    const payload = {
      name: values.from_name.trim(),
      email: values.from_email.trim(),
      school: values.school_name.trim(),
      message: values.message.trim(),
      source: 'landing',
    }

    // Always keep a copy in the dashboard inbox.
    addSubmission(payload)
    record({ type: 'submit', label: 'Formulir kontak', path: '/#kontak' })

    if (!formConfig.notifyByEmail) {
      setStatus('success')
      setFeedback(formConfig.successMessage)
      toast.success('Pesan tersimpan di dashboard.')
      setValues(EMPTY)
      return
    }

    try {
      await emailjs.send(
        formConfig.serviceId,
        formConfig.templateId,
        {
          from_name: payload.name,
          from_email: payload.email,
          school_name: payload.school,
          message: payload.message,
        },
        { publicKey: formConfig.publicKey },
      )
      setStatus('success')
      setFeedback(formConfig.successMessage)
      toast.success('Pesan terkirim.')
      setValues(EMPTY)
    } catch {
      setStatus('error')
      setFeedback(formConfig.errorMessage)
    }
  }

  return (
    <section id="kontak" className="bg-white py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <SectionHeading section={section} />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="flex flex-col gap-3 lg:col-span-2">
            {section.channels.map((channel, index) => (
              <a
                key={channel.id}
                href={channel.link}
                target="_blank"
                rel="noreferrer"
                data-aos="fade-up"
                data-aos-delay={index * 70}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${toneClass(channel.tone, 'chip')}`}
                >
                  <span className="material-symbols-outlined text-[22px]">{channel.icon}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-label font-semibold text-ink">{channel.title}</span>
                  <span className="block truncate text-micro text-faint">
                    {channel.description}
                  </span>
                  <span className="mt-0.5 block truncate text-label font-medium text-muted">
                    {channel.value}
                  </span>
                </span>
                <span className="material-symbols-outlined text-[20px] text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-primary">
                  arrow_forward
                </span>
              </a>
            ))}
          </div>

          <div className="lg:col-span-3" data-aos="fade-up" data-aos-delay="120">
            <form
              onSubmit={submit}
              className="rounded-2xl border border-line bg-white p-6 shadow-card lg:p-8"
            >
              <h3 className="font-display text-[20px] font-bold text-ink">{formConfig.title}</h3>
              <p className="mt-1.5 text-label text-muted">{formConfig.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Nama lengkap" htmlFor="from_name">
                  <Input
                    id="from_name"
                    name="from_name"
                    value={values.from_name}
                    onChange={update('from_name')}
                    placeholder="Nama Anda"
                    required
                  />
                </Field>
                <Field label="Email" htmlFor="from_email">
                  <Input
                    id="from_email"
                    name="from_email"
                    type="email"
                    value={values.from_email}
                    onChange={update('from_email')}
                    placeholder="nama@sekolah.id"
                    required
                  />
                </Field>
              </div>

              <Field label="Nama sekolah" htmlFor="school_name" className="mt-4">
                <Input
                  id="school_name"
                  name="school_name"
                  value={values.school_name}
                  onChange={update('school_name')}
                  placeholder="SMA/SMK/SMP …"
                />
              </Field>

              <Field label="Pesan" htmlFor="message" className="mt-4">
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={update('message')}
                  placeholder="Ceritakan kebutuhan sekolah Anda…"
                  required
                />
              </Field>

              <Button
                type="submit"
                size="lg"
                icon="send"
                disabled={status === 'sending'}
                className="mt-6 w-full"
              >
                {status === 'sending' ? 'Mengirim…' : formConfig.submitLabel}
              </Button>

              {status !== 'idle' && status !== 'sending' && feedback ? (
                <p
                  className={`mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-label font-medium ${
                    status === 'success'
                      ? 'bg-success-soft text-success-ink'
                      : 'bg-danger-soft text-danger-ink'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {status === 'success' ? 'check_circle' : 'error'}
                  </span>
                  {feedback}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
