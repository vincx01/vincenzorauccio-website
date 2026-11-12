import type { ArticleSource } from './types'

/** Pubblicato il 2 maggio 2024. Testo riscritto in italiano dall’originale. */
export const supplyChain: ArticleSource = {
  slug: 'revolutionizing-the-flow-how-blockchain-is-reshaping-the-supply-chain',
  title: 'Ripensare il flusso: la Blockchain nella supply chain',
  excerpt:
    'Tracciabilità, automazione e documenti condivisi. La Blockchain può semplificare una filiera che oggi vive di passaggi separati e informazioni difficili da verificare.',
  publishedAt: '2024-05-02',
  categories: ['Blockchain', 'Web3'],
  tags: ['Blockchain', 'Supply chain', 'Trasparenza', 'Web3'],
  originalUrl:
    'https://vincenzorauccio.com/revolutionizing-the-flow-how-blockchain-is-reshaping-the-supply-chain',
  image: {
    src: '/images/insights/supply-chain.jpg',
    alt: 'Illustrazione di una persona con un tablet davanti a un cubo Blockchain luminoso e a una rete di esagoni.',
  },
  body: [
    {
      type: 'paragraph',
      text: 'La supply chain è la rete che porta un prodotto dalle materie prime fino a chi lo acquista. Una rete efficiente sulla carta, ma spesso opaca nei fatti: informazioni divise tra soggetti diversi, documenti che si duplicano, controlli che arrivano troppo tardi. La Blockchain interessa perché propone un registro condiviso in cui ogni passaggio può essere verificato.',
    },
    { type: 'heading', level: 2, text: 'Trasparenza: vedere il percorso' },
    {
      type: 'paragraph',
      text: 'Sapere dove si trova un prodotto e chi lo ha gestito non è banale. I dati sono distribuiti tra produttori, trasportatori, magazzini e rivenditori, e ogni passaggio può usare un sistema diverso. Un registro condiviso registra gli eventi una volta sola e li rende leggibili a tutti i partecipanti autorizzati.',
    },
    {
      type: 'paragraph',
      text: 'Il risultato è una traccia verificabile: origine, movimenti, condizioni di trasporto e passaggi di proprietà. Un’azienda alimentare può ricostruire in fretta la provenienza di una partita, un compratore può controllare ciò che dichiara un fornitore e un’autorità può usare la stessa base per i controlli.',
    },
    { type: 'heading', level: 2, text: 'Efficienza: meno passaggi manuali' },
    {
      type: 'paragraph',
      text: 'La condivisione dei dati riduce la necessità di verificare gli stessi documenti più volte. Fatture, certificati e dichiarazioni doganali possono essere registrati e consultati nello stesso ambiente. I contratti intelligenti aggiungono un livello di automazione: eseguono un’operazione quando una condizione verificabile è soddisfatta.',
    },
    {
      type: 'paragraph',
      text: 'Un esempio concreto è lo sbarco di una merce in porto. Oggi servono documenti e verifiche prima dello svincolo. Con un registro condiviso e contratti intelligenti, i controlli possono essere automatizzati e lo svincolo può partire appena le condizioni sono rispettate. Meno attesa, meno carta, meno passaggi tra uffici.',
    },
    { type: 'heading', level: 2, text: 'Cosa manca ancora' },
    {
      type: 'paragraph',
      text: 'La tecnologia è matura in alcuni contesti, non in tutti. La scalabilità delle reti, l’interoperabilità tra sistemi diversi e un quadro normativo condiviso restano nodi aperti. Anche la collaborazione tra concorrenti è un ostacolo: un registro funziona se tutti i soggetti della filiera accettano di alimentarlo con dati affidabili.',
    },
    {
      type: 'paragraph',
      text: 'Molte aziende stanno già sperimentando soluzioni Blockchain nelle proprie filiere. I progetti più solidi partono da un problema preciso: una certificazione da verificare, un documento che si perde, un controllo che richiede giorni. È da lì che si misura se il progetto ha senso.',
    },
    { type: 'heading', level: 2, text: 'Una filiera più verificabile' },
    {
      type: 'paragraph',
      text: 'Il futuro della supply chain non sarà interamente on-chain, e non è necessario che lo sia. Il punto è rendere verificabili i passaggi che contano, collegando i sistemi esistenti a un registro condiviso dove serve, senza spostare l’intera filiera on-chain.',
    },
  ],
}
