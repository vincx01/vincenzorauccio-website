import type { ProfessionalRole } from '../../../data/career'
import { useLocale } from '../../../i18n/core'
import { localizedUi } from '../../../i18n/ui'

/**
 * Una voce di esperienza: periodo e sede a sinistra, ruolo, responsabilità e
 * progetti a destra. La struttura resta editoriale, senza card decorative.
 */
export function ExperienceCard({ role }: { role: ProfessionalRole }) {
  const { locale } = useLocale()
  const copy = localizedUi(locale).common

  return (
    <article id={role.id} className="border-t border-line py-8 md:py-10">
      <div className="grid gap-6 md:grid-cols-12 md:gap-[var(--grid-gap)]">
        <div className="md:col-span-3">
          <p className="eyebrow text-ink-faint">{role.period}</p>
          <p className="mt-2 text-caption text-ink-faint">{role.location}</p>
        </div>

        <div className="md:col-span-9">
          <h3 className="text-subtitle">{role.role}</h3>
          <p className="mt-1 text-small text-ink-muted">{role.organisation}</p>
          <p className="mt-4 max-w-[62ch] text-body text-ink-muted">{role.summary}</p>

          {role.responsibilities.length > 0 && (
            <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {role.responsibilities.map((responsibility) => (
                <li
                  key={responsibility}
                  className="flex gap-2.5 text-small leading-relaxed text-ink-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent-ink"
                  />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          )}

          {role.projects && role.projects.length > 0 && (
            <div className="mt-8 border-t border-line pt-5">
              <p className="eyebrow text-ink-faint">{copy.selectedProjects}</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {role.projects.map((project) => (
                  <div key={project.name} className="border-l border-line pl-4">
                    <h4 className="text-small font-medium">{project.name}</h4>
                    <p className="mt-1.5 text-small leading-relaxed text-ink-muted">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
