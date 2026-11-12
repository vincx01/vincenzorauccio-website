import { Link } from 'react-router'

import { site } from '../../data/site'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { usePageMeta } from '../lib/meta'

/** Cookie policy basata su ciò che il sito usa realmente: solo localStorage. */
export function CookiePolicy() {
  usePageMeta({
    title: 'Cookie policy — Vincenzo Rauccio',
    description:
      'Quali cookie e tecnologie simili usa vincenzorauccio.com, come funziona il consenso e come modificare le preferenze.',
    path: '/cookie-policy',
  })

  return (
    <Section spacing="none">
      <Container width="narrow" className="pt-[clamp(3rem,6vw,5rem)]">
        <div className="flex items-center gap-4 border-t border-line pt-4">
          <span className="eyebrow text-ink-faint">Legale</span>
          <span className="eyebrow text-ink-muted">Cookie policy</span>
        </div>

        <h1 className="mt-8 font-display text-headline">Cookie policy.</h1>
        <p className="mt-4 text-caption text-ink-faint">Ultimo aggiornamento: novembre 2026</p>

        <div className="prose-article mt-12">
          <p>
            Questa pagina descrive i cookie e le tecnologie simili usati da {site.domain}. Il sito
            non installa cookie propri e non carica strumenti di analisi, pubblicità o profilazione.
            L’unica memoria locale serve a ricordare la scelta fatta nel banner cookie.
          </p>

          <h2>Che cosa sono i cookie</h2>
          <p>
            I cookie sono piccoli file che un sito salva nel browser. Tecnologie simili, come la
            memoria locale (localStorage), conservano informazioni senza inviarle automaticamente al
            server a ogni richiesta. Possono essere tecnici, necessari al funzionamento del sito,
            oppure opzionali, usati per analisi o marketing.
          </p>

          <h2>Cosa usa questo sito</h2>
          <p>
            Il sito salva una sola voce in localStorage, con la chiave <code>vr-cookie-consent</code>.
            Contiene la versione del consenso, la data e le categorie autorizzate. Non contiene dati
            personali e non viene usata per riconoscerti su altri siti. La scelta scade dopo 180
            giorni o quando cambia la configurazione dei cookie.
          </p>

          <h2>Categorie</h2>
          <div className="not-prose mt-6 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-small">
              <thead>
                <tr className="border-b border-line-strong">
                  <th className="py-3 pr-4 font-medium">Categoria</th>
                  <th className="py-3 pr-4 font-medium">Stato</th>
                  <th className="py-3 font-medium">Uso</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                <tr className="border-b border-line align-top">
                  <th className="py-4 pr-4 font-medium text-ink">Preferenze necessarie</th>
                  <td className="py-4 pr-4">Sempre attive</td>
                  <td className="py-4">
                    Ricordano la scelta sul consenso. Non richiedono autorizzazione.
                  </td>
                </tr>
                <tr className="border-b border-line align-top">
                  <th className="py-4 pr-4 font-medium text-ink">Cookie analitici</th>
                  <td className="py-4 pr-4">Nessuno installato</td>
                  <td className="py-4">
                    La preferenza viene registrata, ma al momento non è attivo alcuno strumento di
                    analisi.
                  </td>
                </tr>
                <tr className="border-b border-line align-top">
                  <th className="py-4 pr-4 font-medium text-ink">Cookie di marketing</th>
                  <td className="py-4 pr-4">Nessuno installato</td>
                  <td className="py-4">
                    La preferenza viene registrata, ma al momento non è attivo alcuno strumento
                    pubblicitario.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Consenso e revoca</h2>
          <p>
            Al primo accesso il sito mostra un banner con tre scelte: accettare tutti, rifiutare
            tutti o personalizzare. Le categorie opzionali restano spente finché non vengono
            autorizzate. La scelta può essere cambiata in qualsiasi momento dal link “Gestisci
            preferenze cookie” nel footer.
          </p>
          <p>
            Poiché non sono presenti script opzionali, non c’è nulla da caricare o bloccare in base
            al consenso. Se in futuro verranno introdotti strumenti analitici o di marketing, questa
            pagina e il banner saranno aggiornati prima dell’attivazione.
          </p>

          <h2>Cookie dell’infrastruttura</h2>
          <p>
            Il sito è distribuito tramite Cloudflare. Il fornitore può trattare dati tecnici di
            connessione e impostare cookie strettamente necessari alla sicurezza e all’erogazione
            del servizio, secondo la propria informativa. Questi cookie non sono usati da questo
            sito per profilazione.
          </p>

          <h2>Gestione dal browser</h2>
          <p>
            Puoi cancellare o bloccare i cookie dalle impostazioni del browser. Bloccare la memoria
            locale impedisce al sito di ricordare la scelta, quindi il banner potrebbe ricomparire a
            ogni visita. La navigazione e i contenuti restano disponibili.
          </p>

          <h2>Riferimenti</h2>
          <p>
            Per il trattamento dei dati personali consulta l’<Link to="/privacy">informativa privacy</Link>.
            Per qualsiasi domanda scrivi a{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
          <Link to="/privacy" className="link-arrow">
            <span>Informativa privacy</span>
          </Link>
          <Link to="/contact" className="link-quiet text-small">
            Contatti
          </Link>
        </div>
      </Container>
    </Section>
  )
}
