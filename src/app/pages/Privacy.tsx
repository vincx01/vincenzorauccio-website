import { Link } from 'react-router'

import { site } from '../../data/site'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { usePageMeta } from '../lib/meta'

/** Informativa privacy: nessun modulo, nessun tracciamento opzionale attivo. */
export function Privacy() {
  usePageMeta({
    title: 'Privacy — Vincenzo Rauccio',
    description:
      'Come vengono trattati i dati personali di chi visita vincenzorauccio.com o scrive a Vincenzo Rauccio.',
    path: '/privacy',
  })

  return (
    <Section spacing="none">
      <Container width="narrow" className="pt-[clamp(3rem,6vw,5rem)]">
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="eyebrow text-ink-faint">Legale</span>
          <span className="eyebrow text-ink-muted">Privacy</span>
        </div>

        <h1 className="mt-8 font-display text-headline">Informativa privacy.</h1>
        <p className="mt-4 text-caption text-ink-faint">Ultimo aggiornamento: novembre 2026</p>

        <div className="prose-article mt-12">
          <p>
            Questo è il sito personale di {site.name}. Non ci sono account, aree riservate,
            commenti o moduli di contatto. I dati personali vengono trattati solo per la
            navigazione tecnica e per le email inviate volontariamente.
          </p>

          <h2>Titolare del trattamento</h2>
          <p>
            Il titolare è {site.name}. Per qualsiasi domanda su questa informativa o sul
            trattamento dei dati puoi scrivere a{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>Quali dati vengono trattati</h2>
          <p>
            Il sito non raccoglie dati tramite moduli. Se scrivi via email, vengono trattati
            l’indirizzo del mittente, il contenuto del messaggio e le informazioni che decidi di
            includere. L’infrastruttura che ospita il sito può registrare dati tecnici di
            connessione, come l’indirizzo IP e la data della richiesta, per erogare il servizio e
            proteggerlo da abusi.
          </p>

          <h2>Finalità e base giuridica</h2>
          <p>
            I dati inviati via email sono usati solo per leggere e rispondere alla richiesta. La
            base giuridica è l’esecuzione di misure precontrattuali o l’interesse legittimo a
            rispondere a una comunicazione professionale. I dati tecnici di connessione sono
            trattati per garantire sicurezza e continuità del servizio.
          </p>

          <h2>Destinatari</h2>
          <p>
            Il sito è ospitato su Cloudflare, che eroga le pagine e può trattare dati tecnici di
            connessione. Se scegli di scrivere tramite LinkedIn o un altro profilo social, il
            trattamento avviene anche secondo le condizioni di quella piattaforma. Non ci sono
            fornitori di analytics o di marketing attivi.
          </p>

          <h2>Conservazione</h2>
          <p>
            Le email vengono conservate per il tempo necessario a gestire la conversazione e poi
            cancellate, salvo obblighi di legge. I dati tecnici di connessione seguono i tempi di
            conservazione del fornitore di hosting.
          </p>

          <h2>Cookie e tecnologie simili</h2>
          <p>
            Il sito non installa cookie propri e non carica strumenti analitici o pubblicitari. Usa
            solo la memoria locale del browser per ricordare la scelta espressa nel banner cookie.
            La scelta può essere revocata in qualsiasi momento dal link “Gestisci preferenze
            cookie” nel footer. I dettagli sono nella{' '}
            <Link to="/cookie-policy">cookie policy</Link>.
          </p>

          <h2>I tuoi diritti</h2>
          <p>
            Puoi chiedere accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del
            trattamento, l’opposizione e la portabilità. Scrivi a{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Se ritieni che il trattamento non
            sia conforme, puoi rivolgerti al Garante per la protezione dei dati personali.
          </p>

          <h2>Modifiche</h2>
          <p>
            Se il sito introduce una funzione che cambia il trattamento dei dati, questa pagina
            viene aggiornata prima dell’attivazione e la data in alto cambia.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
          <Link to="/cookie-policy" className="link-arrow">
            <span>Cookie policy</span>
          </Link>
          <Link to="/contact" className="link-quiet text-small">
            Contatti
          </Link>
        </div>
      </Container>
    </Section>
  )
}
