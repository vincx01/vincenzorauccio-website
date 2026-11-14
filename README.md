# Vincenzo Rauccio — Sito personale

Questo repository contiene il codice sorgente, la configurazione e gli asset utilizzati per sviluppare e mantenere il sito personale ufficiale di Vincenzo Rauccio.

Il repository è privato ed è destinato esclusivamente alla gestione personale, alla manutenzione e allo sviluppo del sito.

## Obiettivi del progetto

Il sito rappresenta l’identità professionale di Vincenzo Rauccio e presenta la sua esperienza e le sue attività nei seguenti ambiti:

- Blockchain.
- Financial Technology.
- Digital Payments.
- Web3.
- Digital Transformation.
- Financial Innovation.

Il sito è completamente bilingue, italiano e inglese. Non è un portfolio generico: raccoglie il percorso professionale, i progetti, i riconoscimenti e gli articoli pubblicati, con informazioni verificabili e senza risultati inventati. La versione italiana resta la fonte editoriale approvata; la versione inglese è una localizzazione professionale, non una traduzione letterale.

## Sezioni del sito

Ogni pagina esiste in entrambe le lingue sotto `/it/` e `/en/`:

- **Home** (`/it/`, `/en/`): presentazione, ambiti di lavoro, esperienza e contatti.
- **Chi sono / About** (`/it/about`, `/en/about`): profilo professionale, competenze e metodo di lavoro.
- **Esperienza / Experience** (`/it/experience`, `/en/experience`): ruoli, formazione, certificazioni, competenze e lingue.
- **Progetti / Projects** (`/it/projects`, `/en/projects`): i progetti pubblicati, attualmente Synclin.
- **Blog** (`/it/insights`, `/en/insights`): articoli su Blockchain, pagamenti digitali, Web3 e innovazione finanziaria.
- **Contatti / Contact** (`/it/contact`, `/en/contact`): email pubblica e profili social verificati.

Il sito include inoltre **Riconoscimenti / Recognition**, **Privacy** e **Cookie policy** in entrambe le lingue. La guida interna di design è disponibile su `/it/design-system` e `/en/design-system`.

Gli articoli hanno lo stesso slug nelle due lingue, con il prefisso della lingua: `/it/introducing-synclin` e `/en/introducing-synclin`. I vecchi URL italiani senza prefisso vengono reindirizzati con `301` alla versione `/it/`; gli alias italiani (`/chi-sono`, `/esperienza`, `/progetti`, `/contatti`) e i percorsi WordPress continuano a funzionare tramite redirect.

## Lingue e localizzazione

### Lingue supportate

- **Italiano (`it`)** — lingua di origine e default quando la rilevazione non produce un risultato.
- **Inglese (`en`)** — localizzazione professionale per il pubblico internazionale.

### Rilevamento iniziale

Alla prima visita della radice `/`, l’ordine di scelta è:

1. lingua scelta manualmente e già salvata;
2. paese del visitatore, letto dall’endpoint same-origin `/api/geo` (Cloudflare o Vercel);
3. lingua preferita del browser;
4. italiano.

Se il paese è l’Italia viene mostrato `/it/`; per ogni altro paese viene mostrato `/en/`. Il rilevamento non richiede il GPS, non chiede permessi di localizzazione e non viene ripetuto a ogni navigazione interna. L’endpoint restituisce solo il codice paese e non conserva l’indirizzo IP.

### Scelta manuale e persistenza

Il selettore `IT | EN` è presente nell’header desktop e nel menu mobile. Ogni opzione è un link accessibile da tastiera che conserva pagina, query string e hash correnti. La scelta manuale:

- ha priorità sul rilevamento geografico;
- viene salvata nel cookie tecnico `vr-locale` per dodici mesi, con fallback in `localStorage`;
- resta valida nelle visite successive;
- non viene sovrascritta automaticamente.

### Struttura degli URL

```text
/                     rilevamento lingua e redirect a /it/ o /en/
/it/                  home italiana
/it/about             profilo italiano
/it/experience        esperienza italiana
/it/projects          progetti italiani
/it/insights          blog italiano
/it/contact           contatti italiani
/it/<slug>            articolo italiano
/en/...               corrispondente pagina inglese
```

Canonical e `hreflang` vengono generati per ogni pagina: `it-IT`, `en` e `x-default` (versione inglese). Le versioni italiana e inglese non condividono mai lo stesso canonical. I vecchi URL italiani senza prefisso rispondono con redirect permanente a `/it/...`.

### Architettura delle traduzioni

- `src/i18n/core.tsx` — tipo `Locale`, rilevamento, cookie, contesto React, link e navigazione localizzati.
- `src/i18n/content.ts` — sito, navigazione, competenze, carriera, progetti e riconoscimenti nelle due lingue.
- `src/i18n/pages.ts` — testi delle pagine, messaggi di errore e contenuti legali.
- `src/i18n/ui.ts` — etichette di interfaccia, header, footer, consenso cookie e messaggi di condivisione.
- `src/i18n/articles-en.ts` — localizzazione completa dei cinque articoli pubblicati.
- `src/i18n/foundation.ts` — contenuti della guida interna di design.
- `src/data/articles/index.ts` — getter localizzati per articoli, categorie, date e correlati.

Le pagine e i componenti sono condivisi: il contesto di lingua fornisce i testi e i dati localizzati, senza duplicare il layout. Le date usano `Intl.DateTimeFormat` con `it-IT` o `en-GB`.

### Aggiungere una nuova lingua o un nuovo contenuto

Per una nuova lingua:

1. aggiungere il codice a `locales` in `src/i18n/core.tsx`;
2. aggiungere la lingua ai dizionari di `content.ts`, `ui.ts`, `pages.ts` e `foundation.ts`;
3. aggiungere le traduzioni degli articoli in `articles-en.ts` (o in un nuovo file dedicato);
4. aggiungere le route con prefisso e gli eventuali redirect legacy;
5. aggiornare `hreflang` in `src/app/lib/meta.ts`;
6. aggiornare README e verificare build, routing, SEO e layout mobile.

Per un nuovo articolo, creare il file italiano in `src/data/articles/`, registrarlo in `sources` e aggiungere la voce inglese corrispondente in `src/i18n/articles-en.ts`. Se manca la traduzione, la pagina inglese non deve essere pubblicata come collegamento vuoto.

## Stack tecnologico

Il progetto usa:

- **React 19** per l’interfaccia.
- **TypeScript 5** per il codice applicativo.
- **Vite 8** per lo sviluppo e la build.
- **Tailwind CSS 4** per gli stili.
- **React Router 8** per la navigazione lato client.
- **Motion 14** per le animazioni.
- **Lucide React** per le icone.
- **Hono 4** per il Worker Cloudflare.
- **Cloudflare Workers** e **Wrangler** per l’esecuzione e la distribuzione.
- **Bun** come package manager e runtime di sviluppo.

Le dipendenze e le versioni effettive sono definite in `package.json` e `bun.lock`.

## Struttura del progetto

```text
.
├── public/
│   ├── brand/                 # Marchio VR e asset di brand
│   └── images/                # Fotografie e immagini editoriali
├── api/
│   └── geo.ts                 # Country hint per Vercel Edge
├── scripts/
│   └── postbuild.mjs          # Controlli successivi alla build
├── src/
│   ├── app/
│   │   ├── components/        # Componenti condivisi: layout, UI, editoriale, navigazione
│   │   ├── lib/               # Metadati, hreflang, motion, utility e link del sito
│   │   ├── pages/             # Pagine condivise nelle due lingue
│   │   └── App.tsx            # Routing /it, /en, rilevamento e redirect legacy
│   ├── data/
│   │   ├── articles/          # Contenuti italiani e getter localizzati
│   │   ├── career.ts          # Dati italiani di carriera
│   │   ├── projects.ts        # Dati italiani dei progetti
│   │   ├── recognition.ts     # Dati italiani dei riconoscimenti
│   │   └── site.ts            # Identità e dati di base
│   ├── i18n/
│   │   ├── core.tsx           # Locale, rilevamento, persistenza e link localizzati
│   │   ├── content.ts         # Contenuti strutturati IT/EN
│   │   ├── pages.ts           # Testi di pagina e contenuti legali IT/EN
│   │   ├── ui.ts              # Etichette di interfaccia e consenso IT/EN
│   │   ├── articles-en.ts     # Traduzioni professionali degli articoli
│   │   └── foundation.ts      # Guida di design IT/EN
│   ├── worker/
│   │   └── index.ts           # Worker Hono, /api/geo, redirect e asset
│   ├── main.tsx               # Punto di ingresso React
│   └── styles.css             # Token, tipografia, componenti e movimento
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vite.vercel.config.ts      # Build statica per Vercel
├── vercel.json                # Routing e build Vercel
├── wrangler.jsonc
├── deploy.json
└── README.md
```

Le immagini e il marchio in `public/` sono asset originali approvati. Non vanno ridisegnati o modificati senza una richiesta esplicita.

## Installazione e sviluppo locale

### Requisiti

- Node.js 22.12 o versione successiva.
- Bun installato.
- Un account Cloudflare solo se si desidera distribuire il Worker.

### Clonazione e avvio

```sh
git clone https://github.com/vincx01/vincenzorauccio-website.git
cd vincenzorauccio-website
bun install
bun run dev
```

Il server di sviluppo è disponibile su `http://localhost:5173`.

### Comandi disponibili

```sh
bun run dev        # server di sviluppo Vite
bun run typecheck  # controllo dei tipi con TypeScript
bun run build      # build di produzione
bun run preview    # anteprima locale della build
```

La build Cloudflare genera:

- `dist/client/` per gli asset statici;
- `dist/portfolio/index.js` per il Worker Cloudflare.

Per la build statica destinata a Vercel esiste un comando separato:

```sh
bun run build:vercel
```

Questa build usa `vite.vercel.config.ts`, non carica il plugin Cloudflare e scrive l’output in `dist/vercel`.

## Configurazione

Il sito non richiede variabili d’ambiente per l’esecuzione locale e non contiene chiavi API, token o credenziali.

La configurazione di esecuzione e distribuzione è nei file:

- `vite.config.ts` per il server di sviluppo e i plugin Vite/Cloudflare.
- `vite.vercel.config.ts` per la build statica destinata a Vercel.
- `wrangler.jsonc` per il Worker Cloudflare e il binding degli asset.
- `deploy.json` per il manifest di pubblicazione Cloudflare.
- `vercel.json` per build, output e routing su Vercel.

Non creare un file `.env` con segreti all’interno del repository. Se in futuro saranno necessarie variabili d’ambiente, dovranno essere documentate in un file `.env.example` con soli nomi e valori segnaposto, mentre i valori reali resteranno fuori dal versionamento.

## Deploy su Vercel

Il progetto può essere pubblicato su Vercel come applicazione statica Vite. La configurazione Cloudflare resta separata e non viene rimossa.

Impostazioni del progetto Vercel:

- Framework preset: **Vite**.
- Install command: **`bun install`** (rilevato da `bun.lock`).
- Build command: **`bun run build:vercel`**.
- Output directory: **`dist/vercel`**.
- Node.js: **22.x**.
- Variabili d’ambiente: **nessuna attualmente richiesta**.

La build Vercel non esegue il Worker Hono: `vercel.json` riproduce i redirect legacy e il fallback SPA, mentre `/api/health` viene servito dal file statico `public/api/health.json`.

Non pubblicare il progetto su Vercel finché non è stata verificata la build locale e non è stata confermata la configurazione del dominio.

## Manutenzione e sviluppo

Il repository è organizzato per mantenere separati i contenuti dalla presentazione:

- I testi istituzionali e i dati di base si trovano in `src/data/site.ts`, `src/data/career.ts`, `src/data/projects.ts` e `src/data/recognition.ts`.
- Gli articoli si trovano in `src/data/articles/`. Per aggiungerne uno, creare un file con i blocchi del corpo e registrarlo nell’array `sources` di `src/data/articles/index.ts`. Indice, route, tempo di lettura, metadati e articoli correlati vengono derivati da quella voce.
- Le pagine e i componenti si trovano in `src/app/pages` e `src/app/components`.
- Gli stili e i token di design sono in `src/styles.css`.

Prima di ogni aggiornamento pubblicato è necessario eseguire `bun run typecheck` e `bun run build`. Le modifiche ai contenuti devono mantenere le informazioni professionali verificabili e non introdurre dati, clienti o risultati non documentati.

## Privacy e accesso al repository

Questo repository è privato e contiene il codice sorgente e gli asset di sviluppo del sito personale di Vincenzo Rauccio. Non è destinato alla distribuzione pubblica né all’uso come progetto open source.

Il sito non raccoglie dati tramite moduli e non usa strumenti di analytics o marketing. Usa la memoria locale per ricordare la scelta espressa nel banner cookie e un cookie tecnico `vr-locale` per la lingua preferita. I dettagli sono nelle pagine Privacy e Cookie policy, disponibili in italiano e inglese.

## Copyright

© 2026 Vincenzo Rauccio. Tutti i diritti riservati.

Il nome Vincenzo Rauccio, il marchio VR, i testi, le fotografie, le immagini editoriali e gli altri asset originali presenti in questo repository appartengono a Vincenzo Rauccio e non possono essere copiati, distribuiti o riutilizzati senza autorizzazione.

Questo repository non è distribuito con una licenza open source.
