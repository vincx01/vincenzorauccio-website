import type { Locale } from './core'

export const ui = {
  it: {
    skipToContent: 'Vai al contenuto',
    language: {
      label: 'Lingua',
      it: 'Italiano',
      en: 'Inglese',
      switchToIt: 'Passa alla versione italiana',
      switchToEn: 'Passa alla versione inglese',
    },
    header: {
      homeAria: 'Vincenzo Rauccio, torna alla home',
      navAria: 'Navigazione principale',
      mobileNavAria: 'Navigazione mobile',
      menuDialog: 'Menu di navigazione',
      openMenu: 'Apri il menu',
      closeMenu: 'Chiudi il menu',
      cta: 'Scrivimi',
    },
    footer: {
      homeAria: 'Vincenzo Rauccio, torna alla home',
      navAria: 'Navigazione del footer',
      navLabel: 'Navigazione',
      contactLabel: 'Contatti',
      privacy: 'Privacy',
      cookies: 'Cookie policy',
      preferences: 'Gestisci preferenze cookie',
    },
    consent: {
      bannerTitle: 'Cookie e preferenze',
      bannerText:
        'Questo sito non usa cookie di profilazione. Salva solo la tua scelta nella memoria locale e la lingua preferita in un cookie tecnico; le categorie opzionali restano spente finché non saranno attivati gli strumenti che le richiedono.',
      readCookie: 'Leggi la',
      cookiePolicy: 'cookie policy',
      and: 'e l’',
      privacy: 'informativa privacy',
      acceptAll: 'Accetta tutti',
      rejectAll: 'Rifiuta tutti',
      customize: 'Personalizza',
      privacyLabel: 'Privacy',
      preferencesTitle: 'Preferenze cookie',
      closePreferences: 'Chiudi le preferenze cookie',
      intro:
        'Scegli quali categorie autorizzare. Le preferenze necessarie restano sempre attive. Puoi cambiare idea in qualsiasi momento dal link nel footer.',
      necessaryTitle: 'Preferenze necessarie',
      necessaryDescription:
        'Servono a ricordare la tua scelta e la lingua preferita. Non richiedono consenso e non possono essere disattivate.',
      analyticsTitle: 'Cookie analitici',
      analyticsDescription:
        'Aiuterebbero a capire come viene usato il sito. Al momento non è installato alcuno strumento analitico: la preferenza viene registrata per il futuro.',
      marketingTitle: 'Cookie di marketing',
      marketingDescription:
        'Servirebbero a mostrare contenuti o annunci in base ai tuoi interessi. Al momento non è attivo alcuno strumento di marketing.',
      alwaysActive: 'sempre attivi',
      save: 'Salva preferenze',
      manage: 'Gestisci preferenze cookie',
    },
    common: {
      readingTime: (minutes: number) => `${minutes} min di lettura`,
      article: 'articolo',
      articles: 'articoli',
      allArticles: 'Tutti gli articoli',
      readArticle: 'Leggi l’articolo',
      last: 'Ultimo',
      updated: 'Aggiornato a novembre 2026',
      emptyExperience: 'Le voci di esperienza saranno aggiunte con i contenuti verificati.',
      selectedProjects: 'Progetti selezionati',
      imagePlaceholder: 'Immagine',
      skip: 'Vai al contenuto',
    },
    articleRow: {
      readingTime: (minutes: number) => `${minutes} min di lettura`,
    },
    share: {
      label: 'Condividi',
      copy: 'Copia link',
      copied: 'Link copiato',
      copiedAnnouncement: 'Link copiato negli appunti',
    },
    author: {
      about: 'Chi sono',
      contact: 'Contatti',
    },
    links: {
      default: 'Link',
    },
  },
  en: {
    skipToContent: 'Skip to content',
    language: {
      label: 'Language',
      it: 'Italian',
      en: 'English',
      switchToIt: 'Switch to Italian',
      switchToEn: 'Switch to English',
    },
    header: {
      homeAria: 'Vincenzo Rauccio, back to home',
      navAria: 'Main navigation',
      mobileNavAria: 'Mobile navigation',
      menuDialog: 'Navigation menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      cta: 'Get in touch',
    },
    footer: {
      homeAria: 'Vincenzo Rauccio, back to home',
      navAria: 'Footer navigation',
      navLabel: 'Navigation',
      contactLabel: 'Contact',
      privacy: 'Privacy',
      cookies: 'Cookies',
      preferences: 'Cookie Preferences',
    },
    consent: {
      bannerTitle: 'Cookies and preferences',
      bannerText:
        'This website does not use profiling cookies. It stores only your choice in local storage and your preferred language in a technical cookie; optional categories remain off until the tools that require them are enabled.',
      readCookie: 'Read the',
      cookiePolicy: 'cookie policy',
      and: 'and the ',
      privacy: 'privacy notice',
      acceptAll: 'Accept all',
      rejectAll: 'Reject all',
      customize: 'Customise',
      privacyLabel: 'Privacy',
      preferencesTitle: 'Cookie preferences',
      closePreferences: 'Close cookie preferences',
      intro:
        'Choose which categories to authorise. Necessary preferences always remain active. You can change your mind at any time from the link in the footer.',
      necessaryTitle: 'Necessary preferences',
      necessaryDescription:
        'Used to remember your choice and preferred language. They do not require consent and cannot be disabled.',
      analyticsTitle: 'Analytics cookies',
      analyticsDescription:
        'They would help us understand how the site is used. No analytics tool is currently installed: the preference is recorded for future use.',
      marketingTitle: 'Marketing cookies',
      marketingDescription:
        'They would be used to show content or advertising based on your interests. No marketing tool is currently active.',
      alwaysActive: 'always active',
      save: 'Save preferences',
      manage: 'Manage cookie preferences',
    },
    common: {
      readingTime: (minutes: number) => `${minutes} min read`,
      article: 'article',
      articles: 'articles',
      allArticles: 'All articles',
      readArticle: 'Read the article',
      last: 'Latest',
      updated: 'Updated November 2026',
      emptyExperience: 'Experience entries will be added once the content has been verified.',
      selectedProjects: 'Selected projects',
      imagePlaceholder: 'Image',
      skip: 'Skip to content',
    },
    articleRow: {
      readingTime: (minutes: number) => `${minutes} min read`,
    },
    share: {
      label: 'Share',
      copy: 'Copy link',
      copied: 'Link copied',
      copiedAnnouncement: 'Link copied to clipboard',
    },
    author: {
      about: 'About',
      contact: 'Contact',
    },
    links: {
      default: 'Links',
    },
  },
} as const

export function localizedUi(locale: Locale) {
  return ui[locale]
}
