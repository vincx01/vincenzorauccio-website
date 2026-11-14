import type { ReactNode } from 'react'

import { localizedExpertise, localizedSite } from '../../i18n/content'
import { useLocale } from '../../i18n/core'
import { foundationContent } from '../../i18n/foundation'
import { cx } from '../lib/cx'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { SectionHeading } from '../components/layout/SectionHeading'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { CapabilityList } from '../components/ui/CapabilityList'
import { Card } from '../components/ui/Card'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Media } from '../components/ui/Media'
import { ProjectPreview } from '../components/ui/ProjectPreview'
import { Stat, StatGrid } from '../components/ui/Stat'
import { TextLink } from '../components/ui/TextLink'
import { Timeline } from '../components/ui/Timeline'
import { usePageMeta } from '../lib/meta'

function Specimen({
  label,
  note,
  children,
  className,
}: {
  label: string
  note?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cx('border-t border-line pt-6', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <Eyebrow>{label}</Eyebrow>
        {note && <span className="text-caption text-ink-faint">{note}</span>}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}

function Swatch({ name, value, role }: { name: string; value: string; role: string }) {
  return (
    <div>
      <div
        className="h-28 w-full rounded-xs border border-line"
        style={{ background: value }}
        aria-hidden="true"
      />
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <span className="text-small font-medium">{name}</span>
        <span className="eyebrow text-ink-faint">{value}</span>
      </div>
      <p className="mt-1 max-w-[34ch] text-caption text-ink-muted">{role}</p>
    </div>
  )
}

function RoleList({
  title,
  roles,
  note,
}: {
  title: string
  roles: Array<{ name: string; token: string; role: string }>
  note?: string
}) {
  return (
    <>
      <Eyebrow>{title}</Eyebrow>
      <ul className="mt-6 border-t border-line">
        {roles.map((role) => (
          <li key={role.token} className="flex items-center gap-4 border-b border-line py-3">
            <span
              aria-hidden="true"
              className="size-3 shrink-0 rounded-xs border border-line-strong"
              style={{ background: `var(${role.token})` }}
            />
            <span className="w-32 shrink-0 text-small">{role.name}</span>
            <code className="min-w-0 flex-1 truncate font-mono text-[0.6875rem] text-ink-faint">
              {role.token}
            </code>
            <span className="ml-auto hidden text-caption text-ink-muted sm:block">{role.role}</span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-6 text-caption text-ink-faint">{note}</p>}
    </>
  )
}

export function Foundation() {
  const { locale } = useLocale()
  const site = localizedSite(locale)
  const c = foundationContent(locale)
  const page = c.page
  const components = page.components
  const capabilities = localizedExpertise(locale)

  usePageMeta({
    title: `${page.eyebrow} — Vincenzo Rauccio`,
    description: page.heroLead,
    path: '/design-system',
    locale,
  })

  return (
    <>
      <Section tone="dark" spacing="none" className="overflow-hidden border-b border-line">
        <div className="surface-glow absolute inset-0" aria-hidden="true" />
        <div className="surface-grid surface-grid-fade absolute inset-0" aria-hidden="true" />
        <Container width="wide" className="relative py-[clamp(4.5rem,9vw,8rem)]">
          <Reveal>
            <Eyebrow className="text-ink-faint">{page.eyebrow}</Eyebrow>
            <h1 className="mt-8 font-display text-display">{site.name}</h1>
            <p className="mt-7 font-display text-subtitle text-ink-muted">{site.positioning}</p>
            <p className="text-measure mt-6 text-body text-ink-muted">{page.heroLead}</p>
          </Reveal>

          <div className="mt-16 grid gap-12 border-t border-line pt-8 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-7">
              {c.mastheadMeta.map((item) => (
                <div key={item.term} className="flex flex-col gap-1">
                  <dt className="eyebrow text-ink-faint">{item.term}</dt>
                  <dd className="text-small text-ink-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
            <nav aria-label={page.indexAria} className="lg:col-span-5">
              <ul className="flex flex-col">
                {c.contents.map((item, index) => (
                  <li key={item.id} className="border-b border-line first:border-t">
                    <a
                      href={`#${item.id}`}
                      className="group flex items-baseline justify-between gap-4 py-2.5 text-small text-ink-muted transition-colors duration-300 hover:text-ink"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="eyebrow text-ink-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </Section>

      <Section id="fondamenta">
        <Container>
          <SectionHeading
            index={page.foundations.index}
            eyebrow={page.foundations.eyebrow}
            title={page.foundations.title}
            description={page.foundations.description}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.foundations.cards.map((item) => (
              <Reveal key={item.term} className="border-t border-line pt-4">
                <Eyebrow className="text-ink-faint">{item.term}</Eyebrow>
                <p className="mt-2 text-small text-ink-muted">{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="colore" tone="quiet">
        <Container>
          <SectionHeading
            index={page.colour.index}
            eyebrow={page.colour.eyebrow}
            title={page.colour.title}
            description={page.colour.description}
          />
          <div className="mt-14 grid gap-x-[var(--grid-gap)] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {c.brandColours.map((colour) => (
              <Swatch key={colour.name} {...colour} />
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-[var(--grid-gap)]">
            <div className="min-w-0 overflow-hidden border border-line p-6 sm:p-8">
              <RoleList title={page.colour.lightRoles} roles={c.surfaceRoles} />
            </div>
            <div
              data-surface="dark"
              className="min-w-0 overflow-hidden border border-line bg-canvas p-6 text-ink sm:p-8"
            >
              <RoleList title={page.colour.darkRoles} roles={c.surfaceRoles} note={page.colour.darkNote} />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="tipografia">
        <Container>
          <SectionHeading
            index={page.typography.index}
            eyebrow={page.typography.eyebrow}
            title={page.typography.title}
            description={page.typography.description}
          />
          <div className="mt-14 border-t border-line">
            {c.typeSpecimens.map((spec) => (
              <Reveal
                key={spec.label}
                className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-[var(--grid-gap)]"
              >
                <div className="md:col-span-3">
                  <Eyebrow>{spec.label}</Eyebrow>
                  <p className="mt-2 text-caption text-ink-faint">{spec.spec}</p>
                  <code className="mt-1 block font-mono text-[0.6875rem] text-ink-faint">{spec.token}</code>
                </div>
                <div className={cx('md:col-span-9', spec.className)}>{spec.sample}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="layout" tone="quiet">
        <Container>
          <SectionHeading
            index={page.layout.index}
            eyebrow={page.layout.eyebrow}
            title={page.layout.title}
            description={page.layout.description}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
            <div className="lg:col-span-7">
              <Eyebrow className="text-ink-faint">{page.layout.columns}</Eyebrow>
              <div className="mt-5 grid grid-cols-6 gap-2 md:grid-cols-12">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="h-24 bg-canvas/70 ring-1 ring-line" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 text-caption text-ink-muted">{page.layout.columnsNote}</p>
            </div>
            <div className="lg:col-span-5">
              <Eyebrow className="text-ink-faint">{page.layout.specs}</Eyebrow>
              <dl className="mt-5 border-t border-line">
                {c.layoutSpecs.map((spec) => (
                  <div key={spec.term} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <dt className="text-small">{spec.term}</dt>
                    <dd className="text-right">
                      <span className="block text-small tabular-nums">{spec.detail}</span>
                      <span className="block text-caption text-ink-faint">{spec.note}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow className="text-ink-faint">{page.layout.ratios}</Eyebrow>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(['4/5', '1/1', '3/2', '16/9'] as const).map((ratio) => (
                <div key={ratio}>
                  <Media ratio={ratio} />
                  <p className="mt-2 text-caption text-ink-faint">{ratio.replace('/', ' : ')}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="componenti">
        <Container>
          <SectionHeading
            index={components.index}
            eyebrow={components.eyebrow}
            title={components.title}
            description={components.description}
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-[var(--grid-gap)]">
            <Specimen label={components.buttons} note={components.buttonsNote}>
              <div className="flex flex-wrap items-center gap-3">
                <Button arrow>{components.primaryAction}</Button>
                <Button variant="secondary">{components.secondary}</Button>
                <Button variant="ghost" arrow>
                  {components.ghost}
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">{components.small}</Button>
                <Button size="sm" variant="secondary">
                  {components.smallSecondary}
                </Button>
                <Button disabled>{components.disabled}</Button>
              </div>
            </Specimen>

            <Specimen label={components.links} note={components.linksNote}>
              <div className="flex flex-wrap items-center gap-8">
                <TextLink to="/">{components.arrowLink}</TextLink>
                <a href="#componenti" className="link-quiet text-small">
                  {components.quietLink}
                </a>
                <span className="link-quiet text-small" data-active="true">
                  {components.active}
                </span>
              </div>
            </Specimen>

            <Specimen label={components.cards} note={components.cardsNote}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <Eyebrow className="text-ink-faint">{components.outline}</Eyebrow>
                  <p className="mt-3 font-display text-subtitle">{components.grouped}</p>
                  <p className="mt-2 text-small text-ink-muted">{components.outlineText}</p>
                </Card>
                <Card variant="filled" interactive>
                  <Eyebrow className="text-ink-faint">{components.filled}</Eyebrow>
                  <p className="mt-3 font-display text-subtitle">{components.emphasis}</p>
                  <p className="mt-2 text-small text-ink-muted">{components.filledText}</p>
                </Card>
              </div>
            </Specimen>

            <Specimen label={components.sectionHeading} note={components.sectionHeadingNote}>
              <div className="border-t border-line pt-4">
                <div className="flex items-center gap-4">
                  <span className="eyebrow text-ink-faint">01</span>
                  <span className="eyebrow text-ink-muted">{components.competencies}</span>
                </div>
                <p className="mt-5 font-display text-title">{components.titleThesis}</p>
                <p className="text-measure mt-3 text-lead text-ink-muted">{components.titleSupport}</p>
              </div>
            </Specimen>

            <Specimen label={components.stats} note={components.statsNote}>
              <StatGrid>
                {[0, 1, 2, 3].map((index) => (
                  <Stat key={index} value="—" label={components.metric} note={components.awaiting} />
                ))}
              </StatGrid>
            </Specimen>
          </div>

          <div className="mt-14">
            <Eyebrow className="text-ink-faint">{components.projectPreviews}</Eyebrow>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {['01', '02', '03'].map((index) => (
                <ProjectPreview
                  key={index}
                  index={index}
                  title={components.projectName}
                  category={components.projectCategory}
                  year="20XX"
                />
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-[var(--grid-gap)]">
            <div>
              <Eyebrow className="text-ink-faint">{components.experienceTimeline}</Eyebrow>
              <Timeline items={c.timelineSamples} className="mt-6" />
            </div>
            <div>
              <Eyebrow className="text-ink-faint">{components.capabilities}</Eyebrow>
              <CapabilityList items={capabilities} className="mt-6" />
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow className="text-ink-faint">{components.inversion}</Eyebrow>
            <div
              data-surface="dark"
              className="mt-6 grid gap-10 border border-line bg-canvas p-6 text-ink sm:p-10 lg:grid-cols-12 lg:gap-[var(--grid-gap)]"
            >
              <div className="lg:col-span-6">
                <span className="eyebrow text-ink-faint">{components.invertedPrimary}</span>
                <p className="mt-5 font-display text-title">{components.invertedTitle}</p>
                <p className="text-measure mt-3 text-small text-ink-muted">
                  {components.invertedText}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button arrow>{components.primaryAction}</Button>
                  <Button variant="secondary">{components.secondary}</Button>
                </div>
              </div>
              <div className="lg:col-span-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="border-t border-line pt-3">
                    <dt className="eyebrow text-ink-faint">{components.faintInk}</dt>
                    <dd className="mt-2 text-small text-ink-muted">6.3:1 on navy</dd>
                  </div>
                  <div className="border-t border-line pt-3">
                    <dt className="eyebrow text-ink-faint">{components.mutedInk}</dt>
                    <dd className="mt-2 text-small text-ink-muted">9.8:1 on navy</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow className="text-ink-faint">{components.nav}</Eyebrow>
            <p className="text-measure mt-4 text-small text-ink-muted">{components.navText}</p>
          </div>
        </Container>
      </Section>

      <Section id="interazione" tone="dark">
        <Container>
          <SectionHeading
            index={page.interaction.index}
            eyebrow={page.interaction.eyebrow}
            title={page.interaction.title}
            description={page.interaction.description}
          />
          <div className="mt-14 grid gap-x-[var(--grid-gap)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {c.interactionPrinciples.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.04} className="border-t border-line pt-4">
                <span className="eyebrow text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-subtitle">{principle.title}</h3>
                <p className="mt-2 text-small text-ink-muted">{principle.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <TextLink to="/" className="text-ink">
              {page.interaction.back}
            </TextLink>
            <span className="text-caption text-ink-faint">{page.interaction.navSummary}</span>
          </div>
        </Container>
      </Section>
    </>
  )
}
