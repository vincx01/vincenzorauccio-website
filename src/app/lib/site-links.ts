import { site } from '../../data/site'

/** Verified public profiles only. */
export const linkedInUrl =
  site.socials.find((social) => social.label === 'LinkedIn')?.href ?? site.url

export const emailHref = `mailto:${site.email}`
