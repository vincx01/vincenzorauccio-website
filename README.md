# Vincenzo Rauccio — Personal Website

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

L’interfaccia e tutti i contenuti editoriali sono in italiano. Il sito non è un portfolio generico: raccoglie il percorso professionale, i progetti, i riconoscimenti e gli articoli pubblicati, con informazioni verificabili e senza risultati inventati.

## Sezioni del sito

- **Home** (`/`): presentazione, ambiti di lavoro, esperienza e contatti.
- **Chi sono** (`/about`): profilo professionale, competenze e metodo di lavoro.
- **Esperienza** (`/experience`): ruoli, formazione, certificazioni, competenze e lingue.
- **Progetti** (`/projects`): i progetti pubblicati, attualmente Synclin.
- **Blog** (`/insights`): articoli su Blockchain, pagamenti digitali, Web3 e innovazione finanziaria.
- **Contatti** (`/contact`): email pubblica e profili social verificati.

Il sito include inoltre le pagine **Riconoscimenti** (`/recognition`), **Privacy** (`/privacy`) e **Cookie policy** (`/cookie-policy`). La guida interna di design è disponibile su `/design-system`.

Gli articoli hanno URL alla radice, per esempio `/introducing-synclin`. Esistono alias italiani per le pagine principali (`/chi-sono`, `/esperienza`, `/progetti`, `/contatti`) e redirect dai vecchi percorsi WordPress.

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
├── scripts/
│   └── postbuild.mjs          # Controlli successivi alla build
├── src/
│   ├── app/
│   │   ├── components/        # Componenti condivisi: layout, UI, editoriale, navigazione
│   │   ├── lib/               # Metadati, motion, utility e link del sito
│   │   ├── pages/             # Home, Chi sono, Esperienza, Progetti, Blog, articoli e pagine legali
│   │   └── App.tsx            # Routing e struttura dell’applicazione
│   ├── data/
│   │   ├── articles/          # Contenuti degli articoli e relative immagini
│   │   ├── career.ts          # Esperienze, formazione, certificazioni e competenze
│   │   ├── projects.ts        # Progetti pubblicati
│   │   ├── recognition.ts     # Riconoscimenti documentati
│   │   └── site.ts            # Identità, navigazione e dati di base
│   ├── worker/
│   │   └── index.ts           # Worker Hono e gestione degli asset
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

This repository is private and contains the source code and development assets of Vincenzo Rauccio's personal website. It is not intended for public distribution or use as an open-source project.

Il sito non raccoglie dati tramite moduli e non usa strumenti di analytics o marketing. L’unica memoria locale è quella necessaria a ricordare la scelta espressa nel banner cookie. I dettagli sono nelle pagine Privacy e Cookie policy.

## Copyright

© 2026 Vincenzo Rauccio. Tutti i diritti riservati.

Il nome Vincenzo Rauccio, il marchio VR, i testi, le fotografie, le immagini editoriali e gli altri asset originali presenti in questo repository appartengono a Vincenzo Rauccio e non possono essere copiati, distribuiti o riutilizzati senza autorizzazione.

Questo repository non è distribuito con una licenza open source.
