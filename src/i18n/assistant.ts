import type { Locale } from './core'

/**
 * Testi dell'assistente AI. Il pannello riusa la lingua attiva del sito, mentre
 * il backend lascia al modello la scelta della lingua della risposta in base
 * all'ultima domanda.
 */
export const assistantCopy = {
  it: {
    openLabel: 'Apri AI Assistant',
    closeLabel: 'Chiudi AI Assistant',
    title: 'Vincenzo Rauccio | AI Assistant',
    subtitle:
      'Il tuo assistente virtuale per conoscere meglio il mio percorso, le mie esperienze e i miei progetti.',
    available: 'Disponibile',
    welcome:
      "Ciao! Sono l'assistente AI di Vincenzo Rauccio. Posso aiutarti a conoscere meglio il suo percorso professionale, le esperienze, i progetti e gli ambiti di competenza. Cosa vorresti sapere?",
    suggestions: [
      'Qual è il suo percorso professionale?',
      'Di cosa si occupa in PwC?',
      'Quali sono le sue competenze in ambito Blockchain?',
      'Puoi raccontarmi il progetto Synclin?',
      'Come posso contattarlo?',
    ],
    inputLabel: 'Scrivi una domanda',
    placeholder: 'Chiedi qualcosa sul percorso, i progetti o le competenze…',
    send: 'Invia',
    thinking: 'Sto cercando nei contenuti del sito…',
    error: 'Non riesco a completare la richiesta. Riprova o scrivi direttamente a',
    notConfigured:
      'L’assistente non è al momento disponibile. Puoi scrivere direttamente a',
    rateLimited: 'Troppe richieste. Attendi qualche istante e riprova.',
    sources: 'Fonti',
    feedback: {
      helpful: 'Risposta utile',
      notHelpful: 'Risposta non utile',
      commentLabel: 'Cosa non ha funzionato?',
      commentPlaceholder: 'Aggiungi un commento facoltativo',
      send: 'Invia feedback',
      cancel: 'Annulla',
      thanks: 'Grazie, il feedback è stato registrato.',
      error: 'Non sono riuscito a salvare il feedback. Riprova.',
    },
    privacy:
      'Le domande vengono inviate a un provider AI per generare la risposta. Non inserire dati personali sensibili.',
    privacyLink: 'informativa privacy',
    disclaimer:
      'Assistente AI. Le risposte possono contenere errori: verifica le informazioni nelle pagine collegate.',
    emailLabel: 'vincenzorauccio12@gmail.com',
  },
  en: {
    openLabel: 'Open AI Assistant',
    closeLabel: 'Close AI Assistant',
    title: 'Vincenzo Rauccio | AI Assistant',
    subtitle:
      'Your virtual assistant for learning more about my background, experience and projects.',
    available: 'Available',
    welcome:
      'Hi! I’m Vincenzo Rauccio’s AI assistant. I can help you learn more about his professional background, experience, projects and areas of expertise. What would you like to know?',
    suggestions: [
      'What is his professional background?',
      'What does he do at PwC?',
      'What are his blockchain skills?',
      'Can you tell me about the Synclin project?',
      'How can I get in touch?',
    ],
    inputLabel: 'Ask a question',
    placeholder: 'Ask about his background, projects or expertise…',
    send: 'Send',
    thinking: 'Searching the site content…',
    error: 'I couldn’t complete the request. Please try again or write directly to',
    notConfigured:
      'The assistant is not available right now. You can write directly to',
    rateLimited: 'Too many requests. Please wait a moment and try again.',
    sources: 'Sources',
    feedback: {
      helpful: 'Helpful answer',
      notHelpful: 'Unhelpful answer',
      commentLabel: 'What went wrong?',
      commentPlaceholder: 'Add an optional comment',
      send: 'Send feedback',
      cancel: 'Cancel',
      thanks: 'Thanks, your feedback has been recorded.',
      error: 'I couldn’t save your feedback. Please try again.',
    },
    privacy:
      'Questions are sent to an AI provider to generate a response. Do not include sensitive personal data.',
    privacyLink: 'privacy notice',
    disclaimer:
      'AI assistant. Answers may contain errors: verify information on the linked pages.',
    emailLabel: 'vincenzorauccio12@gmail.com',
  },
} as const

export function localizedAssistant(locale: Locale) {
  return assistantCopy[locale]
}
