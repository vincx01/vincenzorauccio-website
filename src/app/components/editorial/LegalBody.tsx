import type { LegalSection, RichPart } from '../../../i18n/pages'
import { LocaleLink as Link } from '../../../i18n/core'

function Part({ part }: { part: RichPart }) {
  if (typeof part === 'string') return <>{part}</>
  if (part.to) {
    return (
      <Link to={part.to} className="underline underline-offset-4">
        {part.text}
      </Link>
    )
  }
  if (part.href) {
    return <a href={part.href}>{part.text}</a>
  }
  return <code>{part.text}</code>
}

export function LegalBody({ sections }: { sections: ReadonlyArray<LegalSection> }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.heading || 'intro'}>
          {section.heading && <h2>{section.heading}</h2>}
          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph.map((part, partIndex) => (
                <Part key={partIndex} part={part} />
              ))}
            </p>
          ))}
        </section>
      ))}
    </>
  )
}
