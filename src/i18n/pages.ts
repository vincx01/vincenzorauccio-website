import type { Locale } from './core'

export type RichPart = string | { text: string; to?: string; href?: string }
export type LegalSection = {
  heading: string
  paragraphs: ReadonlyArray<ReadonlyArray<RichPart>>
}

export const pages = {
  it: {
    home: {
      meta: {
        title: 'Vincenzo Rauccio | Consulente Blockchain, FinTech e innovazione',
        description:
          'Vincenzo Rauccio è Consulente Blockchain e speaker. Si occupa di pagamenti digitali, Web3 e innovazione finanziaria.',
      },
      hero: {
        eyebrow: 'Consulenza · Finanza · Innovazione',
        title: 'Tecnologia e finanza, dentro i processi.',
        lead: 'In PwC Italy lavoro su trasformazione digitale e innovazione tecnologica per il settore Financial Services. Mi occupo di Blockchain, pagamenti digitali e Web3.',
        primary: 'Chi sono',
        secondary: 'Scrivimi',
        facts: [
          { label: 'Ruolo', value: 'Consulente Blockchain' },
          { label: 'Oggi', value: 'Consultant, PwC Italy' },
          { label: 'Focus', value: 'Pagamenti digitali' },
        ],
        visualEyebrow: 'Topologia di rete',
        visualLine1: 'Sistemi distribuiti,',
        visualLine2: 'verificabili per costruzione.',
        visualCaption: 'Blockchain · Pagamenti digitali · Innovazione',
      },
      disciplinesLabel: 'Consulenza e interventi',
      intro: {
        index: '01',
        eyebrow: 'Introduzione',
        title: 'Il lavoro comincia dal problema, non dalla tecnologia.',
        lead: 'Sono Vincenzo Rauccio, Consulente Blockchain e speaker. In PwC Italy seguo iniziative di trasformazione digitale e innovazione tecnologica per il settore Financial Services, dall’analisi dei requisiti alla definizione delle soluzioni.',
        body: 'Parto dai processi, dalle regole e dalle persone che dovranno usarli. È lì che si capisce se una tecnologia risolve un problema reale.',
        facts: [
          { label: 'Ruolo', value: 'Consulente Blockchain' },
          { label: 'Oggi', value: 'Consultant, PwC Italy' },
          { label: 'Leadership', value: 'Blockchain Innovation Lead' },
          { label: 'Focus', value: 'Pagamenti digitali' },
        ],
        link: 'Conosci il mio percorso',
      },
      expertise: {
        index: '02',
        eyebrow: 'Competenze',
        title: 'Sei aree, lo stesso metodo: capire il processo prima della tecnologia.',
        description:
          'Governance Blockchain, pagamenti digitali e trasformazione digitale: le competenze che porto nei processi.',
      },
      experience: {
        index: '03',
        eyebrow: 'Esperienza',
        title: 'Dalla consulenza alla divulgazione.',
        description:
          'PwC Italy e Ordine degli Ingegneri della Provincia di Caserta: due ruoli tra consulenza e divulgazione.',
        action: 'Vedi l’esperienza',
        note: 'Dalla formazione accademica alle certificazioni, il percorso completo è nella pagina Esperienza.',
      },
      contact: {
        index: '04',
        eyebrow: 'Contatti',
        title: 'Raccontami il contesto di cui vuoi parlare.',
        lead: 'Per una consulenza, una collaborazione o un confronto su Blockchain, pagamenti digitali e innovazione.',
        cta: 'Scrivimi',
        email: 'Email',
        profiles: 'Profili',
      },
    },
    about: {
      meta: {
        title: 'Chi sono — Vincenzo Rauccio',
        description:
          'Vincenzo Rauccio è Consulente Blockchain e speaker. Lavora in PwC Italy su trasformazione digitale e innovazione tecnologica per il settore Financial Services.',
      },
      eyebrow: 'Chi sono',
      title: 'Tecnologia e innovazione dentro i processi.',
      lead: 'Mi chiamo Vincenzo Rauccio. Lavoro come Consulente Blockchain e speaker. In PwC Italy seguo iniziative di trasformazione digitale per il settore Financial Services; nell’Ordine degli Ingegneri della Provincia di Caserta coordino il gruppo Blockchain.',
      imageAlt: 'Ritratto di Vincenzo Rauccio, Consulente Blockchain.',
      facts: {
        role: 'Ruolo',
        today: 'Oggi',
        leadership: 'Leadership',
        focus: 'Focus',
        recognition: 'Riconoscimento',
      },
      todayValue: 'Consultant, PwC Italy',
      leadershipValue: 'Blockchain Innovation Lead, Ordine degli Ingegneri di Caserta',
      focusValue: 'Blockchain, pagamenti digitali, Web3',
      work: {
        index: '02',
        eyebrow: 'Il lavoro',
        title: 'Capire prima di costruire.',
        paragraphs: [
          'In PwC Italy lavoro su iniziative di trasformazione digitale e innovazione tecnologica per il settore Financial Services. Parto dall’analisi dei requisiti e dalla definizione funzionale delle soluzioni, collaborando con interlocutori business e tecnici.',
          'Nell’Ordine degli Ingegneri della Provincia di Caserta coordino il gruppo di lavoro dedicato alla Blockchain e organizzo seminari tecnici sui framework tecnologici e normativi.',
          'Accanto alla consulenza porto avanti Synclin, il prodotto che ho co-fondato, e svolgo attività di divulgazione: articoli, interventi e confronti pubblici su come la tecnologia cambia processi e organizzazioni.',
        ],
        link: 'Guarda il percorso completo',
      },
      skills: {
        index: '03',
        eyebrow: 'Competenze',
        title: 'Tecnica e metodo, con attenzione alla relazione.',
        description:
          'Competenze tecniche e trasversali, raccolte per area. Il dettaglio completo è nella pagina Esperienza.',
        technicalTitle: 'Programmazione e aree tecniche',
        technicalText:
          'Python, C, JavaScript e Kotlin. Lavoro su System Integration, trasformazione digitale, cybersecurity e Digital Assets, con un’attenzione particolare a Blockchain, Web3, compliance e analisi funzionale.',
        professionalLabel: 'Competenze professionali',
        link: 'Competenze e percorso completo',
      },
      method: {
        index: '04',
        eyebrow: 'Come lavoro',
        title: 'Il metodo di lavoro.',
        entries: [
          {
            title: 'Prima il problema',
            text: 'Una tecnologia non basta se il processo intorno non regge. Parto da cosa non funziona, da chi lo usa e da quali vincoli esistono.',
          },
          {
            title: 'Verificare prima di promettere',
            text: 'Prototipi, scenari e limiti espliciti valgono più di una presentazione. Se qualcosa non regge, va detto prima.',
          },
          {
            title: 'Sistemi che restano comprensibili',
            text: 'Documentazione, governance e competenze interne: un progetto deve poter vivere anche senza chi lo ha avviato.',
          },
        ],
      },
      recognition: {
        index: '05',
        eyebrow: 'Riconoscimenti',
        title: 'Un riconoscimento al lavoro svolto.',
        empty: 'I riconoscimenti documentati saranno pubblicati qui.',
        link: 'Tutti i riconoscimenti',
      },
      contact: {
        eyebrow: 'Contatti',
        title: 'Se vuoi parlarne, scrivimi.',
        lead: 'Per parlare di un progetto, di una collaborazione o di un percorso di consulenza.',
        primary: 'Scrivimi',
        secondary: 'Vedi l’esperienza',
      },
    },
    experience: {
      meta: {
        title: 'Esperienza — Vincenzo Rauccio',
        description:
          'Il percorso professionale di Vincenzo Rauccio: consulenza in PwC Italy, Blockchain Innovation Lead all’Ordine degli Ingegneri di Caserta, formazione e certificazioni.',
      },
      eyebrow: 'Esperienza',
      title: 'Consulenza, coordinamento e formazione.',
      lead: 'Un percorso tra iniziative di trasformazione digitale, coordinamento tecnico e formazione continua. Le esperienze e le certificazioni qui sotto sono quelle del CV.',
      navAria: 'Sezioni della pagina Esperienza',
      nav: [
        { id: 'esperienza', label: 'Esperienza' },
        { id: 'formazione', label: 'Formazione' },
        { id: 'certificazioni', label: 'Certificazioni' },
        { id: 'competenze', label: 'Competenze' },
        { id: 'lingue', label: 'Lingue' },
      ],
      professional: 'Esperienza professionale',
      updated: 'Aggiornato a novembre 2026',
      education: {
        index: '03',
        eyebrow: 'Formazione',
        title: 'Formazione accademica.',
        description: 'Due percorsi in ingegneria, tra automazione, cybersecurity e informatica.',
      },
      certifications: {
        index: '04',
        eyebrow: 'Certificazioni',
        title: 'Formazione professionale.',
        description: 'Le certificazioni e i percorsi completati, con la denominazione originale.',
      },
      skills: {
        index: '05',
        eyebrow: 'Competenze',
        title: 'Competenze tecniche e professionali.',
        description:
          'Linguaggi, aree tecniche e competenze trasversali maturate nel percorso professionale.',
      },
      languages: {
        index: '06',
        eyebrow: 'Lingue',
        title: 'Italiano e inglese.',
      },
      recognition: {
        eyebrow: 'Riconoscimenti',
        title: 'Riconoscimenti professionali.',
        assignedTo: 'Assegnato a ',
        link: 'Vedi il riconoscimento',
      },
      contact: {
        eyebrow: 'Contatti',
        title: 'Parliamo del prossimo passo.',
        lead: 'Per un confronto su un ruolo, una collaborazione o un progetto di consulenza.',
        primary: 'Scrivimi',
        secondary: 'Vedi i progetti',
      },
    },
    projects: {
      meta: {
        title: 'Progetti — Vincenzo Rauccio',
        description:
          'Synclin, la piattaforma di gestione appuntamenti co-fondata da Vincenzo Rauccio: prenotazioni, pagamenti e comunicazione in un unico prodotto.',
      },
      eyebrow: 'Progetti',
      title: 'Synclin, dall’idea al prodotto.',
      lead: 'Synclin nasce per semplificare la gestione delle prenotazioni professionali. Qui trovi il contesto del prodotto, i servizi e i riferimenti pubblici.',
      visit: 'Visita il sito',
      article: 'Leggi l’articolo',
      contact: {
        eyebrow: 'Contatti',
        title: 'Hai un progetto da discutere?',
        lead: 'Scrivimi per una consulenza, una collaborazione o un confronto su prodotto e tecnologia.',
        primary: 'Scrivimi',
        secondary: 'Chi sono',
      },
    },
    contact: {
      meta: {
        title: 'Contatti — Vincenzo Rauccio',
        description:
          'Scrivi a Vincenzo Rauccio per una consulenza, una collaborazione o un confronto su Blockchain, pagamenti digitali e innovazione.',
      },
      eyebrow: 'Contatti',
      title: 'Un confronto diretto, senza passaggi inutili.',
      lead: 'Per una consulenza, una collaborazione o un confronto su Blockchain, pagamenti digitali e innovazione.',
      body: 'Non c’è un modulo da compilare. La mail è il canale più diretto: scrivi due righe sul contesto e su ciò che ti interessa.',
      email: 'Email',
      opensClient: 'Si apre il tuo client di posta.',
      privacyLabel: 'Privacy',
      privacyText: 'I dati che invii via email vengono usati solo per rispondere alla tua richiesta. Le modalità di trattamento sono descritte nell’',
      privacyLink: 'informativa privacy',
      cookieText: 'Per le tecnologie usate dal sito consulta la ',
      cookieLink: 'cookie policy',
    },
    recognition: {
      meta: {
        title: 'Riconoscimenti — Vincenzo Rauccio',
        description:
          'I riconoscimenti documentati di Vincenzo Rauccio e di Synclin, tra cui i Pan Finance Awards 2026 e il premio Most Influential FinTech Entrepreneur 2025 (Italy).',
      },
      eyebrow: 'Riconoscimenti',
      title: 'Riconoscimenti professionali.',
      lead: 'Raccolgo solo riconoscimenti verificabili, con una fonte pubblica. Premi, interventi e pubblicazioni entrano quando il riferimento è disponibile.',
      assignedTo: 'Assegnato a ',
      article: 'Leggi l’annuncio',
      speaking: {
        index: '01',
        eyebrow: 'Speaking e contributi pubblici',
        title: 'Interventi e conversazioni pubbliche.',
        lead: 'Spiegare Blockchain, pagamenti e innovazione finanziaria a chi li costruisce o li deve governare fa parte del lavoro.',
        body: 'Sto raccogliendo conferenze, panel, workshop e interviste. Ogni appuntamento sarà pubblicato con evento, data e riferimento, dopo conferma.',
        cta: 'Scrivimi per un intervento',
      },
      publications: {
        title: 'Pubblicazioni selezionate',
        all: 'Tutti gli articoli',
        lead: 'Articoli pubblicati su governance Blockchain, pagamenti digitali, Web3 e innovazione finanziaria.',
      },
    },
    insights: {
      meta: {
        title: 'Blog — Blockchain, pagamenti e innovazione | Vincenzo Rauccio',
        description:
          'Articoli di Vincenzo Rauccio su Blockchain, pagamenti digitali, Web3 e innovazione finanziaria.',
      },
      eyebrow: 'Blog',
      title: 'Blockchain, pagamenti e innovazione: appunti di lavoro.',
      lead: 'Articoli e riflessioni su governance Blockchain, pagamenti, Web3 e innovazione finanziaria.',
      count: 'articoli',
      singular: 'articolo',
      plural: 'articoli',
      last: 'Ultimo',
      filterAria: 'Filtra gli articoli per categoria',
      all: 'Tutti',
      featured: 'Articolo in evidenza',
      readingTime: 'min di lettura',
      latest: 'Ultime pubblicazioni',
      inCategory: 'Articoli in',
      noArticles: 'Non ci sono ancora articoli in questa categoria.',
      viewAll: 'Vedi tutti gli articoli',
      categories: 'Categorie',
      schemaName: 'Blog — Vincenzo Rauccio',
      schemaDescription: 'Articoli su Blockchain, pagamenti digitali, Web3 e innovazione finanziaria.',
    },
    article: {
      all: 'Tutti gli articoli',
      readingTime: 'min di lettura',
      related: 'Articoli correlati',
      back: 'Torna al Blog',
    },
    privacy: {
      meta: {
        title: 'Privacy — Vincenzo Rauccio',
        description:
          'Come vengono trattati i dati personali di chi visita vincenzorauccio.com o scrive a Vincenzo Rauccio.',
      },
      legal: 'Legale',
      title: 'Privacy',
      heading: 'Informativa privacy.',
      updated: 'Ultimo aggiornamento: novembre 2026',
      sections: [
        {
          heading: '',
          paragraphs: [
            [
              'Questo è il sito personale di Vincenzo Rauccio. Non ci sono account, aree riservate, commenti o moduli di contatto. I dati personali vengono trattati solo per la navigazione tecnica e per le email inviate volontariamente.',
            ],
          ],
        },
        {
          heading: 'Titolare del trattamento',
          paragraphs: [
            [
              'Il titolare è Vincenzo Rauccio. Per qualsiasi domanda su questa informativa o sul trattamento dei dati puoi scrivere a ',
              { text: 'vincenzorauccio12@gmail.com', href: 'mailto:vincenzorauccio12@gmail.com' },
              '.',
            ],
          ],
        },
        {
          heading: 'Quali dati vengono trattati',
          paragraphs: [
            [
              'Il sito non raccoglie dati tramite moduli. Se scrivi via email, vengono trattati l’indirizzo del mittente, il contenuto del messaggio e le informazioni che decidi di includere. L’infrastruttura che ospita il sito può registrare dati tecnici di connessione, come l’indirizzo IP e la data della richiesta, per erogare il servizio e proteggerlo da abusi.',
            ],
          ],
        },
        {
          heading: 'Finalità e base giuridica',
          paragraphs: [
            [
              'I dati inviati via email sono usati solo per leggere e rispondere alla richiesta. La base giuridica è l’esecuzione di misure precontrattuali o l’interesse legittimo a rispondere a una comunicazione professionale. I dati tecnici di connessione sono trattati per garantire sicurezza e continuità del servizio.',
            ],
          ],
        },
        {
          heading: 'Destinatari',
          paragraphs: [
            [
              'Il sito è ospitato su Cloudflare, che eroga le pagine e può trattare dati tecnici di connessione. Se scegli di scrivere tramite LinkedIn o un altro profilo social, il trattamento avviene anche secondo le condizioni di quella piattaforma. Non ci sono fornitori di analytics o di marketing attivi.',
            ],
          ],
        },
        {
          heading: 'Conservazione',
          paragraphs: [
            [
              'Le email vengono conservate per il tempo necessario a gestire la conversazione e poi cancellate, salvo obblighi di legge. I dati tecnici di connessione seguono i tempi di conservazione del fornitore di hosting.',
            ],
          ],
        },
        {
          heading: 'Cookie e tecnologie simili',
          paragraphs: [
            [
              'Il sito non installa cookie di profilazione e non carica strumenti analitici o pubblicitari. Usa un cookie tecnico e la memoria locale del browser per ricordare la scelta espressa nel banner cookie e la lingua preferita. La scelta può essere revocata in qualsiasi momento dal link “Gestisci preferenze cookie” nel footer. I dettagli sono nella ',
              { text: 'cookie policy', to: '/cookie-policy' },
              '.',
            ],
          ],
        },
        {
          heading: 'I tuoi diritti',
          paragraphs: [
            [
              'Puoi chiedere accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del trattamento, l’opposizione e la portabilità. Scrivi a ',
              { text: 'vincenzorauccio12@gmail.com', href: 'mailto:vincenzorauccio12@gmail.com' },
              '. Se ritieni che il trattamento non sia conforme, puoi rivolgerti al Garante per la protezione dei dati personali.',
            ],
          ],
        },
        {
          heading: 'Modifiche',
          paragraphs: [
            [
              'Se il sito introduce una funzione che cambia il trattamento dei dati, questa pagina viene aggiornata prima dell’attivazione e la data in alto cambia.',
            ],
          ],
        },
      ] satisfies LegalSection[],
      cookieLink: 'Cookie policy',
      contactLink: 'Contatti',
    },
    cookies: {
      meta: {
        title: 'Cookie policy — Vincenzo Rauccio',
        description:
          'Quali cookie e tecnologie simili usa vincenzorauccio.com, come funziona il consenso e come modificare le preferenze.',
      },
      legal: 'Legale',
      title: 'Cookie policy',
      heading: 'Cookie policy.',
      updated: 'Ultimo aggiornamento: novembre 2026',
      sections: [
        {
          heading: '',
          paragraphs: [
            [
              'Questa pagina descrive i cookie e le tecnologie simili usati da vincenzorauccio.com. Il sito non installa cookie di profilazione e non carica strumenti di analisi, pubblicità o profilazione. Usa un cookie tecnico e la memoria locale per ricordare la scelta fatta nel banner cookie e la lingua preferita.',
            ],
          ],
        },
        {
          heading: 'Che cosa sono i cookie',
          paragraphs: [
            [
              'I cookie sono piccoli file che un sito salva nel browser. Tecnologie simili, come la memoria locale (localStorage), conservano informazioni senza inviarle automaticamente al server a ogni richiesta. Possono essere tecnici, necessari al funzionamento del sito, oppure opzionali, usati per analisi o marketing.',
            ],
          ],
        },
        {
          heading: 'Cosa usa questo sito',
          paragraphs: [
            [
              'Il sito salva una voce in localStorage con la chiave ',
              { text: 'vr-cookie-consent', href: undefined },
              ' e una preferenza di lingua nel cookie tecnico ',
              { text: 'vr-locale', href: undefined },
              ' e in localStorage. Il consenso contiene la versione, la data e le categorie autorizzate. La lingua contiene solo “it” o “en”. Nessuno dei due contiene dati personali o viene usato per riconoscerti su altri siti. La scelta sul consenso scade dopo 180 giorni; la lingua dura dodici mesi.',
            ],
          ],
        },
        {
          heading: 'Categorie',
          paragraphs: [],
        },
        {
          heading: 'Consenso e revoca',
          paragraphs: [
            [
              'Al primo accesso il sito mostra un banner con tre scelte: accettare tutti, rifiutare tutti o personalizzare. Le categorie opzionali restano spente finché non vengono autorizzate. La scelta può essere cambiata in qualsiasi momento dal link “Gestisci preferenze cookie” nel footer.',
            ],
            [
              'Poiché non sono presenti script opzionali, non c’è nulla da caricare o bloccare in base al consenso. Se in futuro verranno introdotti strumenti analitici o di marketing, questa pagina e il banner saranno aggiornati prima dell’attivazione.',
            ],
          ],
        },
        {
          heading: 'Cookie dell’infrastruttura',
          paragraphs: [
            [
              'Il sito è distribuito tramite Cloudflare. Il fornitore può trattare dati tecnici di connessione e impostare cookie strettamente necessari alla sicurezza e all’erogazione del servizio, secondo la propria informativa. Questi cookie non sono usati da questo sito per profilazione.',
            ],
          ],
        },
        {
          heading: 'Gestione dal browser',
          paragraphs: [
            [
              'Puoi cancellare o bloccare i cookie dalle impostazioni del browser. Bloccare la memoria locale impedisce al sito di ricordare la scelta, quindi il banner potrebbe ricomparire a ogni visita. La navigazione e i contenuti restano disponibili.',
            ],
          ],
        },
        {
          heading: 'Riferimenti',
          paragraphs: [
            [
              'Per il trattamento dei dati personali consulta l’',
              { text: 'informativa privacy', to: '/privacy' },
              '. Per qualsiasi domanda scrivi a ',
              { text: 'vincenzorauccio12@gmail.com', href: 'mailto:vincenzorauccio12@gmail.com' },
              '.',
            ],
          ],
        },
      ] satisfies LegalSection[],
      table: {
        category: 'Categoria',
        status: 'Stato',
        use: 'Uso',
        rows: [
          {
            category: 'Preferenze necessarie',
            status: 'Sempre attive',
            use: 'Ricordano la scelta sul consenso e la lingua preferita. Non richiedono autorizzazione.',
          },
          {
            category: 'Cookie analitici',
            status: 'Nessuno installato',
            use: 'La preferenza viene registrata, ma al momento non è attivo alcuno strumento di analisi.',
          },
          {
            category: 'Cookie di marketing',
            status: 'Nessuno installato',
            use: 'La preferenza viene registrata, ma al momento non è attivo alcuno strumento pubblicitario.',
          },
        ],
      },
      privacyLink: 'Informativa privacy',
      contactLink: 'Contatti',
    },
    notFound: {
      title: 'Pagina non trovata.',
      text: 'La pagina che cerchi non esiste o è stata spostata.',
      cta: 'Torna alla home',
    },
  },
  en: {
    home: {
      meta: {
        title: 'Vincenzo Rauccio | Blockchain Consultant, FinTech and innovation',
        description:
          'Vincenzo Rauccio is a Blockchain Consultant and speaker working across digital payments, Web3 and financial innovation.',
      },
      hero: {
        eyebrow: 'Consulting · Finance · Innovation',
        title: 'Technology and finance, built into the process.',
        lead: 'At PwC Italy I work on digital transformation and technology innovation for the Financial Services sector. My focus is blockchain, digital payments and Web3.',
        primary: 'About',
        secondary: 'Get in touch',
        facts: [
          { label: 'Role', value: 'Blockchain Consultant' },
          { label: 'Today', value: 'Consultant, PwC Italy' },
          { label: 'Focus', value: 'Digital payments' },
        ],
        visualEyebrow: 'Network topology',
        visualLine1: 'Distributed systems,',
        visualLine2: 'verifiable by design.',
        visualCaption: 'Blockchain · Digital payments · Innovation',
      },
      disciplinesLabel: 'Consulting and advisory',
      intro: {
        index: '01',
        eyebrow: 'Introduction',
        title: 'The work starts with the problem, not the technology.',
        lead: 'I am Vincenzo Rauccio, a Blockchain Consultant and speaker. At PwC Italy I support digital transformation and technology innovation initiatives for Financial Services clients, from requirements analysis through to solution design.',
        body: 'I start with the processes, the rules and the people who will use them. That is where it becomes clear whether a technology solves a real problem.',
        facts: [
          { label: 'Role', value: 'Blockchain Consultant' },
          { label: 'Today', value: 'Consultant, PwC Italy' },
          { label: 'Leadership', value: 'Blockchain Innovation Lead' },
          { label: 'Focus', value: 'Digital payments' },
        ],
        link: 'Explore my background',
      },
      expertise: {
        index: '02',
        eyebrow: 'Expertise',
        title: 'Six areas, one method: understand the process before the technology.',
        description:
          'Blockchain governance, digital payments and digital transformation: the expertise I bring to complex processes.',
      },
      experience: {
        index: '03',
        eyebrow: 'Experience',
        title: 'From consulting to public debate.',
        description:
          'PwC Italy and the Ordine degli Ingegneri della Provincia di Caserta: two roles spanning advisory work and technical education.',
        action: 'View experience',
        note: 'From academic study to professional certifications, the full background is on the Experience page.',
      },
      contact: {
        index: '04',
        eyebrow: 'Contact',
        title: 'Tell me about the context you want to discuss.',
        lead: 'For consulting, collaboration or a conversation about blockchain, digital payments and innovation.',
        cta: 'Get in touch',
        email: 'Email',
        profiles: 'Profiles',
      },
    },
    about: {
      meta: {
        title: 'About — Vincenzo Rauccio',
        description:
          'Vincenzo Rauccio is a Blockchain Consultant and speaker. At PwC Italy he works on digital transformation and technology innovation for the Financial Services sector.',
      },
      eyebrow: 'About',
      title: 'Technology and innovation, inside the process.',
      lead: 'I am Vincenzo Rauccio, a Blockchain Consultant and speaker. At PwC Italy I work on digital transformation initiatives for the Financial Services sector; at the Ordine degli Ingegneri della Provincia di Caserta I lead the Blockchain working group.',
      imageAlt: 'Portrait of Vincenzo Rauccio, Blockchain Consultant.',
      facts: {
        role: 'Role',
        today: 'Today',
        leadership: 'Leadership',
        focus: 'Focus',
        recognition: 'Recognition',
      },
      todayValue: 'Consultant, PwC Italy',
      leadershipValue: 'Blockchain Innovation Lead, Ordine degli Ingegneri di Caserta',
      focusValue: 'Blockchain, digital payments, Web3',
      work: {
        index: '02',
        eyebrow: 'The work',
        title: 'Understand before building.',
        paragraphs: [
          'At PwC Italy I work on digital transformation and technology innovation initiatives for the Financial Services sector. I start with requirements analysis and the functional design of solutions, working alongside business and technology stakeholders.',
          'At the Ordine degli Ingegneri della Provincia di Caserta I lead the working group dedicated to blockchain and organise technical seminars on the relevant technology and regulatory frameworks.',
          'Alongside my consulting work I develop Synclin, the product I co-founded, and contribute to public debate through articles, talks and discussions on how technology changes processes and organisations.',
        ],
        link: 'See the full experience',
      },
      skills: {
        index: '03',
        eyebrow: 'Expertise',
        title: 'Technical depth and a clear method, grounded in people.',
        description:
          'Technical and transferable skills, organised by area. The full detail is on the Experience page.',
        technicalTitle: 'Programming and technical areas',
        technicalText:
          'Python, C, JavaScript and Kotlin. I work across System Integration, digital transformation, cybersecurity and Digital Assets, with a particular focus on blockchain, Web3, compliance and functional analysis.',
        professionalLabel: 'Professional skills',
        link: 'Skills and full background',
      },
      method: {
        index: '04',
        eyebrow: 'How I work',
        title: 'A practical way of working.',
        entries: [
          {
            title: 'The problem comes first',
            text: 'Technology is not enough if the surrounding process does not hold. I start with what is not working, who uses it and which constraints apply.',
          },
          {
            title: 'Verify before promising',
            text: 'Prototypes, scenarios and explicit limitations are worth more than a presentation. If something does not hold, it should be said early.',
          },
          {
            title: 'Systems people can still understand',
            text: 'Documentation, governance and internal capability: a project must be able to live on after the people who started it.',
          },
        ],
      },
      recognition: {
        index: '05',
        eyebrow: 'Recognition',
        title: 'Recognition for work delivered.',
        empty: 'Documented recognition will be published here.',
        link: 'All recognition',
      },
      contact: {
        eyebrow: 'Contact',
        title: 'If you would like to discuss a project, get in touch.',
        lead: 'To discuss a project, a collaboration or a consulting engagement.',
        primary: 'Get in touch',
        secondary: 'View experience',
      },
    },
    experience: {
      meta: {
        title: 'Experience — Vincenzo Rauccio',
        description:
          'Vincenzo Rauccio’s professional background: consulting at PwC Italy, Blockchain Innovation Lead at the Ordine degli Ingegneri di Caserta, education and certifications.',
      },
      eyebrow: 'Experience',
      title: 'Advisory, coordination and technical education.',
      lead: 'A career spanning digital transformation programmes, technical leadership and continuous learning. The roles and certifications below are taken directly from the CV.',
      navAria: 'Experience page sections',
      nav: [
        { id: 'esperienza', label: 'Experience' },
        { id: 'formazione', label: 'Education' },
        { id: 'certificazioni', label: 'Certifications' },
        { id: 'competenze', label: 'Skills' },
        { id: 'lingue', label: 'Languages' },
      ],
      professional: 'Professional experience',
      updated: 'Updated November 2026',
      education: {
        index: '03',
        eyebrow: 'Education',
        title: 'Academic background.',
        description: 'Two engineering paths spanning automation, cybersecurity and computer science.',
      },
      certifications: {
        index: '04',
        eyebrow: 'Certifications',
        title: 'Professional development.',
        description: 'Certifications and completed programmes, listed under their official names.',
      },
      skills: {
        index: '05',
        eyebrow: 'Skills',
        title: 'Technical and professional skills.',
        description:
          'Languages, technical areas and transferable skills developed throughout his professional career.',
      },
      languages: {
        index: '06',
        eyebrow: 'Languages',
        title: 'Italian and English.',
      },
      recognition: {
        eyebrow: 'Recognition',
        title: 'Professional recognition.',
        assignedTo: 'Awarded to ',
        link: 'View recognition',
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Let’s discuss the next step.',
        lead: 'To discuss a role, a collaboration or a consulting project.',
        primary: 'Get in touch',
        secondary: 'View projects',
      },
    },
    projects: {
      meta: {
        title: 'Projects — Vincenzo Rauccio',
        description:
          'Synclin, the appointment management platform co-founded by Vincenzo Rauccio: bookings, payments and communication in one product.',
      },
      eyebrow: 'Projects',
      title: 'Synclin, from idea to product.',
      lead: 'Synclin was created to simplify professional booking management. Here you will find the product context, services and public references.',
      visit: 'Visit the website',
      article: 'Read the article',
      contact: {
        eyebrow: 'Contact',
        title: 'Have a project to discuss?',
        lead: 'Get in touch about consulting, a collaboration or a conversation on product and technology.',
        primary: 'Get in touch',
        secondary: 'About',
      },
    },
    contact: {
      meta: {
        title: 'Contact — Vincenzo Rauccio',
        description:
          'Contact Vincenzo Rauccio for consulting, collaboration or a conversation about blockchain, digital payments and innovation.',
      },
      eyebrow: 'Contact',
      title: 'A direct conversation, without unnecessary steps.',
      lead: 'For consulting, collaboration or a conversation about blockchain, digital payments and innovation.',
      body: 'There is no form to complete. Email is the most direct channel: write a few lines about the context and what you would like to discuss.',
      email: 'Email',
      opensClient: 'Your email client will open.',
      privacyLabel: 'Privacy',
      privacyText: 'The information you send by email is used only to respond to your enquiry. The way it is processed is described in the ',
      privacyLink: 'privacy notice',
      cookieText: 'For the technologies used by this site, see the ',
      cookieLink: 'cookie policy',
    },
    recognition: {
      meta: {
        title: 'Recognition — Vincenzo Rauccio',
        description:
          'Documented recognition for Vincenzo Rauccio and Synclin, including the Pan Finance Awards 2026 and Most Influential FinTech Entrepreneur 2025 (Italy).',
      },
      eyebrow: 'Recognition',
      title: 'Professional recognition.',
      lead: 'I publish only verifiable recognition with a public source. Awards, speaking engagements and publications are added when a reference is available.',
      assignedTo: 'Awarded to ',
      article: 'Read the announcement',
      speaking: {
        index: '01',
        eyebrow: 'Speaking and public contributions',
        title: 'Talks and public conversations.',
        lead: 'Explaining blockchain, payments and financial innovation to the people who build or govern them is part of the work.',
        body: 'I am building a record of conferences, panels, workshops and interviews. Each engagement will be published with the event, date and reference once confirmed.',
        cta: 'Get in touch about speaking',
      },
      publications: {
        title: 'Selected publications',
        all: 'All articles',
        lead: 'Articles on blockchain governance, digital payments, Web3 and financial innovation.',
      },
    },
    insights: {
      meta: {
        title: 'Blog — Blockchain, payments and innovation | Vincenzo Rauccio',
        description:
          'Articles by Vincenzo Rauccio on blockchain, digital payments, Web3 and financial innovation.',
      },
      eyebrow: 'Blog',
      title: 'Blockchain, payments and innovation: notes from the work.',
      lead: 'Articles and reflections on blockchain governance, payments, Web3 and financial innovation.',
      count: 'articles',
      singular: 'article',
      plural: 'articles',
      last: 'Latest',
      filterAria: 'Filter articles by category',
      all: 'All',
      featured: 'Featured article',
      readingTime: 'min read',
      latest: 'Latest publications',
      inCategory: 'Articles in',
      noArticles: 'There are no articles in this category yet.',
      viewAll: 'View all articles',
      categories: 'Categories',
      schemaName: 'Blog — Vincenzo Rauccio',
      schemaDescription: 'Articles on blockchain, digital payments, Web3 and financial innovation.',
    },
    article: {
      all: 'All articles',
      readingTime: 'min read',
      related: 'Related articles',
      back: 'Back to the Blog',
    },
    privacy: {
      meta: {
        title: 'Privacy — Vincenzo Rauccio',
        description:
          'How personal data is processed when you visit vincenzorauccio.com or contact Vincenzo Rauccio.',
      },
      legal: 'Legal',
      title: 'Privacy',
      heading: 'Privacy notice.',
      updated: 'Last updated: November 2026',
      sections: [
        {
          heading: '',
          paragraphs: [
            [
              'This is the personal website of Vincenzo Rauccio. There are no accounts, restricted areas, comments or contact forms. Personal data is processed only for technical navigation and for emails sent voluntarily.',
            ],
          ],
        },
        {
          heading: 'Data controller',
          paragraphs: [
            [
              'The data controller is Vincenzo Rauccio. For any question about this notice or the processing of your data, you can write to ',
              { text: 'vincenzorauccio12@gmail.com', href: 'mailto:vincenzorauccio12@gmail.com' },
              '.',
            ],
          ],
        },
        {
          heading: 'What data is processed',
          paragraphs: [
            [
              'The site does not collect data through forms. If you write by email, the sender’s address, the content of the message and any information you choose to include are processed. The infrastructure hosting the site may record technical connection data, such as the IP address and the date of the request, to deliver the service and protect it from abuse.',
            ],
          ],
        },
        {
          heading: 'Purposes and legal basis',
          paragraphs: [
            [
              'Data sent by email is used only to read and respond to the enquiry. The legal basis is the performance of pre-contractual measures or the legitimate interest in responding to a professional communication. Technical connection data is processed to ensure the security and continuity of the service.',
            ],
          ],
        },
        {
          heading: 'Recipients',
          paragraphs: [
            [
              'The site is hosted on Cloudflare, which delivers the pages and may process technical connection data. If you choose to write via LinkedIn or another social profile, processing also takes place under that platform’s terms. No analytics or marketing providers are active.',
            ],
          ],
        },
        {
          heading: 'Retention',
          paragraphs: [
            [
              'Emails are kept for as long as necessary to manage the conversation and are then deleted, unless legal obligations require otherwise. Technical connection data follows the hosting provider’s retention periods.',
            ],
          ],
        },
        {
          heading: 'Cookies and similar technologies',
          paragraphs: [
            [
              'The site does not install profiling cookies and does not load analytics or advertising tools. It uses a technical cookie and browser local memory to remember the choice made in the cookie banner and the preferred language. You can withdraw your choice at any time from the “Manage cookie preferences” link in the footer. Details are available in the ',
              { text: 'cookie policy', to: '/cookie-policy' },
              '.',
            ],
          ],
        },
        {
          heading: 'Your rights',
          paragraphs: [
            [
              'You can request access to your data, rectification, erasure, restriction of processing, objection and portability. Write to ',
              { text: 'vincenzorauccio12@gmail.com', href: 'mailto:vincenzorauccio12@gmail.com' },
              '. If you believe the processing is not compliant, you can contact the Italian data protection authority (Garante per la protezione dei dati personali).',
            ],
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            [
              'If the site introduces a feature that changes how data is processed, this page will be updated before activation and the date above will change.',
            ],
          ],
        },
      ] satisfies LegalSection[],
      cookieLink: 'Cookie policy',
      contactLink: 'Contact',
    },
    cookies: {
      meta: {
        title: 'Cookie policy — Vincenzo Rauccio',
        description:
          'Which cookies and similar technologies vincenzorauccio.com uses, how consent works and how to change your preferences.',
      },
      legal: 'Legal',
      title: 'Cookie policy',
      heading: 'Cookie policy.',
      updated: 'Last updated: November 2026',
      sections: [
        {
          heading: '',
          paragraphs: [
            [
              'This page describes the cookies and similar technologies used by vincenzorauccio.com. The site does not install profiling cookies and does not load analytics, advertising or profiling tools. It uses a technical cookie and local memory to remember the choice made in the cookie banner and the preferred language.',
            ],
          ],
        },
        {
          heading: 'What cookies are',
          paragraphs: [
            [
              'Cookies are small files that a site stores in your browser. Similar technologies, such as local storage, retain information without automatically sending it to the server on every request. They can be technical, necessary for the site to function, or optional, used for analytics or marketing.',
            ],
          ],
        },
        {
          heading: 'What this site uses',
          paragraphs: [
            [
              'The site stores a local storage entry with the key ',
              { text: 'vr-cookie-consent', href: undefined },
              ' and a language preference in the technical cookie ',
              { text: 'vr-locale', href: undefined },
              ' and in local storage. The consent entry contains the version, date and authorised categories. The language entry contains only “it” or “en”. Neither contains personal data or is used to recognise you on other sites. Consent expires after 180 days; the language preference lasts twelve months.',
            ],
          ],
        },
        {
          heading: 'Categories',
          paragraphs: [],
        },
        {
          heading: 'Consent and withdrawal',
          paragraphs: [
            [
              'On your first visit the site shows a banner with three choices: accept all, reject all or customise. Optional categories remain off until authorised. You can change your choice at any time from the “Manage cookie preferences” link in the footer.',
            ],
            [
              'Because no optional scripts are present, there is nothing to load or block based on consent. If analytics or marketing tools are introduced in the future, this page and the banner will be updated before activation.',
            ],
          ],
        },
        {
          heading: 'Infrastructure cookies',
          paragraphs: [
            [
              'The site is delivered through Cloudflare. The provider may process technical connection data and set cookies strictly necessary for security and service delivery, in accordance with its own notice. These cookies are not used by this site for profiling.',
            ],
          ],
        },
        {
          heading: 'Browser controls',
          paragraphs: [
            [
              'You can delete or block cookies in your browser settings. Blocking local memory prevents the site from remembering your choice, so the banner may reappear on every visit. Navigation and content remain available.',
            ],
          ],
        },
        {
          heading: 'References',
          paragraphs: [
            [
              'For information on how personal data is processed, see the ',
              { text: 'privacy notice', to: '/privacy' },
              '. For any question, write to ',
              { text: 'vincenzorauccio12@gmail.com', href: 'mailto:vincenzorauccio12@gmail.com' },
              '.',
            ],
          ],
        },
      ] satisfies LegalSection[],
      table: {
        category: 'Category',
        status: 'Status',
        use: 'Purpose',
        rows: [
          {
            category: 'Necessary preferences',
            status: 'Always active',
            use: 'Remember your consent choice and preferred language. They do not require authorisation.',
          },
          {
            category: 'Analytics cookies',
            status: 'None installed',
            use: 'The preference is recorded, but no analytics tool is currently active.',
          },
          {
            category: 'Marketing cookies',
            status: 'None installed',
            use: 'The preference is recorded, but no advertising tool is currently active.',
          },
        ],
      },
      privacyLink: 'Privacy notice',
      contactLink: 'Contact',
    },
    notFound: {
      title: 'Page not found.',
      text: 'The page you are looking for does not exist or has moved.',
      cta: 'Back to home',
    },
  },
} as const

export function localizedPages(locale: Locale) {
  return pages[locale]
}
