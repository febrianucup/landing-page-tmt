import { useContent } from '../context/ContentContext'
import SectionHeading from '../ui/SectionHeading'

export default function Problems() {
  const { content } = useContent()
  const section = content.problems

  return (
    <section id="fitur" className="border-b border-line bg-white py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <SectionHeading section={section} />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-danger-soft text-danger-ink">
                  <span className="material-symbols-outlined text-[17px]">close</span>
                </span>
                <span className="text-label font-bold uppercase tracking-wider text-danger-ink">
                  {section.oldTitle}
                </span>
              </div>
              <p className="mt-3 text-label leading-relaxed text-muted">{item.oldText}</p>

              <div className="my-5 h-px bg-line" />

              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-soft text-success-ink">
                  <span className="material-symbols-outlined text-[17px]">check</span>
                </span>
                <span className="text-label font-bold uppercase tracking-wider text-success-ink">
                  {section.newTitle}
                </span>
              </div>
              <p className="mt-3 text-body font-medium leading-relaxed text-ink">{item.newText}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
