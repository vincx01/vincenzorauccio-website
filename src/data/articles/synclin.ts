import type { ArticleSource } from './types'

/** Pubblicato il 22 aprile 2026. Testo riscritto in italiano dall’originale. */
export const synclin: ArticleSource = {
  slug: 'introducing-synclin',
  title: 'Synclin: appuntamenti intelligenti per i professionisti',
  excerpt:
    'Prenotazioni, pagamenti e comunicazione in un unico posto. Synclin nasce per ridurre le attività ripetitive che occupano la giornata di un professionista.',
  publishedAt: '2026-04-22',
  categories: ['Prodotto'],
  tags: ['Appuntamenti', 'Blockchain', 'SaaS', 'Synclin'],
  originalUrl: 'https://vincenzorauccio.com/introducing-synclin',
  featured: true,
  image: {
    src: '/images/insights/synclin.jpg',
    alt: 'Interfaccia di Synclin su sfondo scuro, con calendario, elenco appuntamenti e pannello clienti.',
  },
  body: [
    {
      type: 'paragraph',
      text: 'Chi lavora su appuntamenti conosce il costo delle attività che si ripetono ogni giorno: rispondere ai messaggi, incastrare disponibilità, emettere fatture, ricordare un appuntamento. Synclin è una piattaforma di prenotazione e gestione appuntamenti pensata per ridurre quel lavoro e restituire tempo al professionista.',
    },
    { type: 'heading', level: 2, text: 'Che cos’è Synclin' },
    {
      type: 'paragraph',
      text: 'Synclin è un software per la gestione degli appuntamenti rivolto a professionisti indipendenti e studi. Il cliente prenota in autonomia, il sistema applica le regole di disponibilità e il professionista ritrova in un’unica agenda appuntamenti, pagamenti e comunicazioni. Funziona per avvocati, medici, consulenti, trainer, estetisti e formatori, senza richiedere competenze tecniche.',
    },
    { type: 'heading', level: 2, text: 'Prenotare senza attrito' },
    {
      type: 'paragraph',
      text: 'Ogni professionista ha una pagina di prenotazione personalizzabile, da condividere con i clienti o integrare nel proprio sito e nei profili social. Gli orari di lavoro, i giorni di ferie e le disponibilità si definiscono una volta; il sistema applica le regole e impedisce le sovrapposizioni. Clienti e assistenti hanno un’area dedicata per consultare e gestire gli appuntamenti.',
    },
    { type: 'heading', level: 2, text: 'Incassare e comunicare' },
    {
      type: 'paragraph',
      text: 'Synclin gestisce pagamenti online e in presenza, con carta e wallet digitali, e può emettere e inviare le fatture dopo ogni appuntamento. Le conferme e i promemoria partono automaticamente, riducendo le assenze e le telefonate di controllo. La dashboard si può configurare sui dati che servono al singolo professionista.',
    },
    { type: 'heading', level: 2, text: 'Un prodotto pensato per il mercato italiano' },
    {
      type: 'paragraph',
      text: 'Molti strumenti disponibili sono pensati per organizzazioni grandi o per mercati diversi. Synclin parte da un’esigenza concreta e da un contesto italiano: un’interfaccia chiara, i pagamenti e la fatturazione che servono davvero, un’adozione che non richiede un reparto tecnico.',
    },
    { type: 'heading', level: 2, text: 'Privacy e sicurezza' },
    {
      type: 'paragraph',
      text: 'I dati dei clienti sono informazioni riservate. Synclin applica misure di sicurezza e crittografia e segue le normative applicabili in materia di protezione dei dati. La gestione degli accessi e la conservazione delle informazioni fanno parte del prodotto, non sono un’aggiunta successiva.',
    },
    { type: 'heading', level: 2, text: 'A chi serve' },
    {
      type: 'paragraph',
      text: 'È pensato per professionisti indipendenti che vogliono smettere di gestire l’agenda a mano, per studi che coordinano più persone e più calendari e per attività che ricevono prenotazioni da canali diversi e hanno bisogno di un unico punto di controllo.',
    },
    { type: 'heading', level: 2, text: 'Come provarlo' },
    {
      type: 'paragraph',
      text: 'Synclin si può esplorare e provare su synclin.com. La demo mostra il flusso completo: prenotazione, pagamento, conferma e gestione dell’appuntamento.',
    },
    {
      type: 'links',
      title: 'Link',
      items: [{ label: 'synclin.com', href: 'https://synclin.com' }],
    },
  ],
}
