import { useContent } from '../context/ContentContext'
import { tone as toneClass } from '../lib/tones'

export default function Stats() {
  const { content } = useContent()
  const items = content.stats.items

  if (items.length === 0) return null

  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div className="grid gap-8 py-9 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="flex items-start gap-4 lg:border-l lg:border-line lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <span
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${toneClass(item.tone, 'chip')}`}
              >
                <span className="material-symbols-outlined icon-fill text-[22px]">
                  {item.icon}
                </span>
              </span>
              <div className="min-w-0">
                <p className="font-display text-[26px] font-extrabold tracking-tight text-ink">
                  {item.value}
                </p>
                <p className="mt-1 text-label text-muted">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
