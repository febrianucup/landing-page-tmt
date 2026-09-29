import { useContent } from '../context/ContentContext'
import { tone as toneClass } from '../lib/tones'
import SectionHeading from '../ui/SectionHeading'

export default function Roles() {
  const { content } = useContent()
  const section = content.roles

  return (
    <section id="peran" className="border-b border-line bg-canvas py-16 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <SectionHeading section={section} align="left" />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {section.items.map((role, index) => (
            <div
              key={role.id}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneClass(role.tone, 'chip')}`}
              >
                <span className="material-symbols-outlined text-[24px]">{role.icon}</span>
              </span>

              <h3 className="mt-5 font-display text-[20px] font-bold text-ink">{role.title}</h3>
              {role.subtitle ? (
                <p className="mt-1 text-micro font-bold uppercase tracking-wider text-faint">
                  {role.subtitle}
                </p>
              ) : null}

              {(role.features || []).filter((feature) => feature.trim()).length > 0 ? (
                <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
                  {role.features
                    .filter((feature) => feature.trim())
                    .map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2.5 text-label text-muted"
                      >
                        <span
                          className={`material-symbols-outlined mt-0.5 text-[17px] ${toneClass(role.tone, 'text')}`}
                        >
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
