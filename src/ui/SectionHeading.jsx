export default function SectionHeading({ section, align = 'center', className = '' }) {
  const alignClass = align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'

  return (
    <div className={`${alignClass} ${className}`} data-aos="fade-up">
      {section.eyebrow ? (
        <p className="text-micro font-bold uppercase tracking-wider text-primary">
          {section.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-display text-[28px] font-extrabold tracking-tight text-ink sm:text-[34px]">
        {section.title}
      </h2>
      {section.description ? (
        <p className="mt-4 text-body-lg text-muted">{section.description}</p>
      ) : null}
    </div>
  )
}
