import type { ArticleImage, ArticleBlock } from '../data/articles/types'

export interface ArticleTranslation {
  title: string
  excerpt: string
  categories: string[]
  tags?: string[]
  image?: ArticleImage
  body: ArticleBlock[]
}

/**
 * Professional English localisation of the published Italian articles.
 * Facts, sources, structure and links are preserved; the prose is written
 * for an international consulting, fintech and Web3 audience.
 */
export const englishArticles: Record<string, ArticleTranslation> = {
  'introducing-synclin': {
    title: 'Synclin: intelligent scheduling for professionals',
    excerpt:
      'Bookings, payments and communication in one place. Synclin was built to reduce the repetitive work that consumes a professional’s day.',
    categories: ['Product'],
    tags: ['Appointments', 'Blockchain', 'SaaS', 'Synclin'],
    image: {
      src: '/images/insights/synclin.jpg',
      alt: 'The Synclin interface on a dark background, showing the calendar, appointment list and client panel.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Anyone who manages appointments knows the cost of the tasks that repeat every day: answering messages, finding a time that works, issuing invoices, sending a reminder. Synclin is a booking and appointment management platform designed to reduce that workload and give professionals their time back.',
      },
      { type: 'heading', level: 2, text: 'What Synclin is' },
      {
        type: 'paragraph',
        text: 'Synclin is appointment management software for independent professionals and practices. Clients book directly, the system applies availability rules, and the professional sees appointments, payments and communications in a single calendar. It is built for lawyers, doctors, consultants, trainers, beauty professionals and educators, with no technical expertise required.',
      },
      { type: 'heading', level: 2, text: 'Booking without friction' },
      {
        type: 'paragraph',
        text: 'Each professional has a customisable booking page to share with clients or embed on their website and social profiles. Working hours, holiday periods and availability are set once; the system applies the rules and prevents double bookings. Clients and assistants have a dedicated area to view and manage appointments.',
      },
      { type: 'heading', level: 2, text: 'Getting paid and staying in touch' },
      {
        type: 'paragraph',
        text: 'Synclin handles online and in-person payments by card and digital wallet, and can issue and send invoices after each appointment. Confirmations and reminders are sent automatically, reducing no-shows and follow-up calls. The dashboard can be configured around the data each professional actually needs.',
      },
      { type: 'heading', level: 2, text: 'Designed for the Italian market' },
      {
        type: 'paragraph',
        text: 'Many available tools are built for large organisations or different markets. Synclin starts from a concrete need and an Italian context: a clear interface, the payments and invoicing that businesses actually require, and adoption that does not depend on an internal technology team.',
      },
      { type: 'heading', level: 2, text: 'Privacy and security' },
      {
        type: 'paragraph',
        text: 'Client data is confidential by nature. Synclin applies security and encryption measures and follows the applicable data protection rules. Access management and data retention are part of the product, not an afterthought.',
      },
      { type: 'heading', level: 2, text: 'Who it is for' },
      {
        type: 'paragraph',
        text: 'It is designed for independent professionals who want to stop managing their calendar by hand, for practices coordinating several people and calendars, and for businesses that receive bookings through multiple channels and need a single point of control.',
      },
      { type: 'heading', level: 2, text: 'How to try it' },
      {
        type: 'paragraph',
        text: 'Synclin can be explored and tried at synclin.com. The demo shows the full flow: booking, payment, confirmation and appointment management.',
      },
      {
        type: 'links',
        title: 'Links',
        items: [{ label: 'synclin.com', href: 'https://synclin.com' }],
      },
    ],
  },

  'vincenzo-rauccio-named-most-influential-fintech-entrepreneur-2025-italy-by-wealth-finance-international':
    {
      title:
        'Vincenzo Rauccio named Most Influential FinTech Entrepreneur 2025 (Italy) by Wealth & Finance International',
      excerpt:
        'Wealth & Finance International has named Vincenzo Rauccio among the winners of the FinTech Awards 2025 for Italy.',
      categories: ['Awards', 'Blockchain', 'Web3'],
      tags: ['Awards', 'Blockchain', 'DAO', 'FinTech', 'Wealth & Finance', 'Web3'],
      image: {
        src: '/images/insights/fintech-award.jpg',
        alt: 'Two participants in front of the World Blockchain Summit backdrop at a CNBC event.',
      },
      body: [
        {
          type: 'paragraph',
          text: 'In September 2025, Wealth & Finance International named Vincenzo Rauccio Most Influential FinTech Entrepreneur 2025 (Italy) as part of the FinTech Awards. The recognition reflects his consulting work across blockchain, digital payments and Web3 innovation.',
        },
        { type: 'heading', level: 2, text: 'The award' },
        {
          type: 'paragraph',
          text: 'The FinTech Awards are presented by Wealth & Finance International, a publication specialising in finance and technology. The official winners page and the dedicated FinTech Awards 2025 issue document the nomination and the context of the award.',
        },
        { type: 'heading', level: 2, text: 'The work' },
        {
          type: 'paragraph',
          text: 'Rauccio’s consulting work focuses on blockchain, digital payments and Web3. It starts with the constraints that organisations actually face: regulation, existing systems, data and people. Technology becomes useful when those conditions are addressed together, not when it is added to a process that is not ready to receive it.',
        },
        { type: 'heading', level: 2, text: 'Areas of focus' },
        {
          type: 'paragraph',
          text: 'In recent years his work has moved towards protocol governance, the tokenisation of real-world assets and digital payments in regulated environments. These are areas where technical infrastructure and market rules cannot be designed in isolation.',
        },
        { type: 'heading', level: 2, text: 'What changes' },
        {
          type: 'paragraph',
          text: 'An award does not change the method. It changes the visibility of the work and the opportunity to bring these issues into wider settings, within banks, companies and public institutions. It is a chance to keep explaining what works, what does not, and under which conditions.',
        },
        { type: 'heading', level: 2, text: 'The next step' },
        {
          type: 'paragraph',
          text: 'The direction remains the same: make projects verifiable and systems understandable, with a use of technology that stands up to regulation and to time.',
        },
        {
          type: 'links',
          title: 'Links',
          items: [
            {
              label: 'FinTech Awards 2025',
              href: 'https://wealthandfinance.digital/issues/fintech-awards-2025/',
            },
            {
              label: 'Official winners page',
              href: 'https://wealthandfinance.digital/winners/vincenzo-rauccio/',
            },
          ],
        },
      ],
    },

  'blockchain-transforming-elections-for-a-transparent-future': {
    title: 'Blockchain: making elections more transparent',
    excerpt:
      'A shared ledger can make every step of an election verifiable. Technology alone is not enough: rules, security and an institutional project are required.',
    categories: ['Blockchain', 'Web3'],
    tags: ['Blockchain', 'Governments', 'Transparency', 'Trust', 'Web3'],
    image: {
      src: '/images/insights/elections.jpg',
      alt: 'Illustration of people gathered around a glowing cube on a blue network grid.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Voting is where trust in institutions becomes a technical question: who is eligible, how votes are counted, who verifies the result. Blockchain matters because it promises to make these steps verifiable without relying on a single authority. But an election is more than a ledger: it is a process with rules, safeguards and accountability.',
      },
      { type: 'heading', level: 2, text: 'Why it is being discussed' },
      {
        type: 'paragraph',
        text: 'Public administrations are testing blockchain for data sharing, digital identity, procurement and voting systems. The US General Services Administration has established a working group to collect use cases and good practice across federal agencies. The technology is moving into public processes, not just pilot programmes.',
      },
      { type: 'heading', level: 2, text: 'Where it can help' },
      { type: 'heading', level: 3, text: 'Trust and verifiability' },
      {
        type: 'paragraph',
        text: 'A shared ledger allows multiple parties to read the same data without one of them controlling it. In voting, that means being able to verify that a ballot was recorded and counted without exposing the voter’s identity. The difficulty is safeguarding secrecy, uniqueness of the vote and verifiability of the result at the same time.',
      },
      { type: 'heading', level: 3, text: 'Lower administrative cost' },
      {
        type: 'paragraph',
        text: 'Automating checks and repetitive steps reduces manual work. Dubai uses blockchain to manage health records, easing administrative procedures. These cases are far from voting, but they demonstrate the same principle: data recorded once can be verified by multiple offices without duplication.',
      },
      { type: 'heading', level: 3, text: 'Transparency' },
      {
        type: 'paragraph',
        text: 'When operations are recorded publicly and immutably, citizens and oversight bodies can reconstruct the sequence of events. This does not eliminate corruption, but it makes modifications harder to hide and the chain of responsibility clearer.',
      },
      { type: 'heading', level: 2, text: 'Use cases beyond voting' },
      { type: 'heading', level: 3, text: 'Smart cities' },
      {
        type: 'paragraph',
        text: 'Urban data, services and documents can be managed on shared ledgers. Dubai uses them for health records; the State of Illinois tested them to speed up the issuance of birth certificates. The advantage lies in reducing handoffs between offices, not in the technology itself.',
      },
      { type: 'heading', level: 3, text: 'Central banking and payments' },
      {
        type: 'paragraph',
        text: 'Central banks are studying settlement infrastructures based on distributed ledgers to make payments faster and more verifiable. The stakes here are not disintermediation, but the ability to reconcile innovation, stability and monetary control.',
      },
      { type: 'heading', level: 3, text: 'Public procurement' },
      {
        type: 'paragraph',
        text: 'Tracing the origin and movement of goods makes anomalies easier to identify and requirements easier to verify. The World Economic Forum identifies traceability as one of the most concrete uses of blockchain in public spending. Here too, value depends on the quality of the data entered and the willingness to scrutinise it.',
      },
      { type: 'heading', level: 2, text: 'Limits and conditions' },
      { type: 'heading', level: 3, text: 'Regulatory framework' },
      {
        type: 'paragraph',
        text: 'A framework is needed to establish who is responsible for what, which data can sit on-chain and how errors are handled. Without clear rules, pilots remain isolated and never become services.',
      },
      { type: 'heading', level: 3, text: 'Adoption' },
      {
        type: 'paragraph',
        text: 'A technology only works if citizens and public offices use it. That requires understandable interfaces, training and visible benefits for participants. No technology compensates for a poorly designed process.',
      },
      { type: 'heading', level: 3, text: 'Security and privacy' },
      {
        type: 'paragraph',
        text: 'A distributed ledger is not immune to attack. In voting and identity management, data protection and resistance to manipulation are preconditions, not details to address after launch.',
      },
      { type: 'heading', level: 2, text: 'What is actually required' },
      {
        type: 'paragraph',
        text: 'Blockchain can make public processes more verifiable and restore confidence among participants, but it requires defined use cases, clear rules and verified security. The process remains the starting point; the technology follows.',
      },
    ],
  },

  'blockchain-in-government': {
    title: 'Blockchain in government: transparency and trust',
    excerpt:
      'Blockchain can make public processes more verifiable, but it requires rules, skills and concrete use cases.',
    categories: ['Blockchain', 'Web3'],
    tags: ['Blockchain', 'Governments', 'Transparency', 'Trust', 'Web3'],
    image: {
      src: '/images/insights/government.jpg',
      alt: 'Illustration of two people at a table in discussion, with a blockchain symbol above a world map.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Blockchain emerged with Bitcoin and quickly moved beyond the perimeter of cryptocurrencies. Today public administrations and governments are testing it for data sharing, digital identity, procurement and voting. Its value lies not in the technology itself, but in the ability to make verifiable what currently depends on intermediaries and retrospective checks.',
      },
      { type: 'heading', level: 2, text: 'Why public administration is interested' },
      {
        type: 'paragraph',
        text: 'Public administrations manage registers, authorisations and payments that cross multiple offices. Blockchain provides a shared ledger in which every step can be read and verified by the same parties, without one of them controlling the official version. The US General Services Administration has established a working group to collect use cases and good practice across federal agencies.',
      },
      { type: 'heading', level: 2, text: 'Where it can help' },
      { type: 'heading', level: 3, text: 'Trust and verifiability' },
      {
        type: 'paragraph',
        text: 'A shared ledger allows citizens and institutions to check the same data. In voting, for example, verification of the count is where the credibility of the process is decided. The challenge is to guarantee secrecy, uniqueness of the vote and verifiability of the result together.',
      },
      { type: 'heading', level: 3, text: 'Lower administrative cost' },
      {
        type: 'paragraph',
        text: 'Automating checks and repetitive steps reduces manual work. Dubai uses blockchain to manage health records, easing administrative procedures. These cases are distinct from voting, but they demonstrate the same principle: data recorded once can be verified by multiple offices without duplication.',
      },
      { type: 'heading', level: 3, text: 'Transparency' },
      {
        type: 'paragraph',
        text: 'When operations are recorded publicly and immutably, it becomes easier to reconstruct events and assign responsibility. This does not eliminate corruption, but it makes changes harder to conceal and makes it clearer who did what.',
      },
      { type: 'heading', level: 2, text: 'Use cases beyond voting' },
      { type: 'heading', level: 3, text: 'Smart cities' },
      {
        type: 'paragraph',
        text: 'Urban data, services and documents can be managed on shared ledgers. Dubai uses them for health records; the State of Illinois tested them to speed up the issuance of birth certificates. The advantage lies in reducing handoffs between offices, not in the technology itself.',
      },
      { type: 'heading', level: 3, text: 'Central banking and payments' },
      {
        type: 'paragraph',
        text: 'Central banks are studying settlement infrastructures based on distributed ledgers to make payments faster and more verifiable. The stakes here are not disintermediation, but the ability to reconcile innovation, stability and monetary control.',
      },
      { type: 'heading', level: 3, text: 'Public procurement' },
      {
        type: 'paragraph',
        text: 'Tracing the origin and movement of goods makes anomalies easier to identify and requirements easier to verify. The World Economic Forum identifies traceability as one of the most concrete uses of blockchain in public spending. Here too, value depends on the quality of the data entered and the willingness to scrutinise it.',
      },
      { type: 'heading', level: 2, text: 'Limits and conditions' },
      { type: 'heading', level: 3, text: 'Regulatory framework' },
      {
        type: 'paragraph',
        text: 'A framework is needed to establish who is responsible for what, which data can sit on-chain and how errors are handled. Without clear rules, pilots remain isolated and never become services.',
      },
      { type: 'heading', level: 3, text: 'Adoption' },
      {
        type: 'paragraph',
        text: 'A technology only works if citizens and public offices use it. That requires understandable interfaces, training and visible benefits for participants. No technology compensates for a poorly designed process.',
      },
      { type: 'heading', level: 3, text: 'Security and privacy' },
      {
        type: 'paragraph',
        text: 'A distributed ledger is not immune to attack. In voting and identity management, data protection and resistance to manipulation are preconditions, not details to address after launch.',
      },
      { type: 'heading', level: 2, text: 'What is actually required' },
      {
        type: 'paragraph',
        text: 'Blockchain can make public processes more verifiable, but only with defined use cases, clear rules and verified security. The process remains the starting point; the technology follows.',
      },
    ],
  },

  'revolutionizing-the-flow-how-blockchain-is-reshaping-the-supply-chain': {
    title: 'Rethinking the flow: blockchain in the supply chain',
    excerpt:
      'Traceability, automation and shared documents. Blockchain can simplify a chain that currently runs on separate handoffs and information that is difficult to verify.',
    categories: ['Blockchain', 'Web3'],
    tags: ['Blockchain', 'Supply chain', 'Transparency', 'Web3'],
    image: {
      src: '/images/insights/supply-chain.jpg',
      alt: 'Illustration of a person with a tablet facing a glowing blockchain cube and a network of hexagons.',
    },
    body: [
      {
        type: 'paragraph',
        text: 'The supply chain is the network that carries a product from raw materials to the person who buys it. Efficient on paper, often opaque in practice: information split across different parties, duplicated documents, checks that arrive too late. Blockchain matters because it offers a shared ledger in which every step can be verified.',
      },
      { type: 'heading', level: 2, text: 'Transparency: seeing the journey' },
      {
        type: 'paragraph',
        text: 'Knowing where a product is and who handled it is not straightforward. Data is distributed across manufacturers, carriers, warehouses and retailers, and each step may use a different system. A shared ledger records events once and makes them readable to all authorised participants.',
      },
      {
        type: 'paragraph',
        text: 'The result is a verifiable trail: origin, movements, transport conditions and changes of ownership. A food company can quickly reconstruct the provenance of a batch, a buyer can check a supplier’s claims, and an authority can use the same basis for inspections.',
      },
      { type: 'heading', level: 2, text: 'Efficiency: fewer manual handoffs' },
      {
        type: 'paragraph',
        text: 'Sharing data reduces the need to verify the same documents repeatedly. Invoices, certificates and customs declarations can be recorded and consulted in the same environment. Smart contracts add a layer of automation: they execute an operation when a verifiable condition is met.',
      },
      {
        type: 'paragraph',
        text: 'A concrete example is the arrival of goods at a port. Today documents and checks are required before clearance. With a shared ledger and smart contracts, checks can be automated and clearance can begin as soon as conditions are met. Less waiting, less paper, fewer handoffs between offices.',
      },
      { type: 'heading', level: 2, text: 'What is still missing' },
      {
        type: 'paragraph',
        text: 'The technology is mature in some contexts, not all. Network scalability, interoperability between different systems and a shared regulatory framework remain open issues. Collaboration between competitors is another obstacle: a ledger works only if every participant in the chain agrees to feed it reliable data.',
      },
      {
        type: 'paragraph',
        text: 'Many companies are already testing blockchain solutions in their supply chains. The strongest projects start from a precise problem: a certification to verify, a document that gets lost, a check that takes days. That is where a project’s value is measured.',
      },
      { type: 'heading', level: 2, text: 'A more verifiable supply chain' },
      {
        type: 'paragraph',
        text: 'The future of the supply chain will not be entirely on-chain, and it does not need to be. The point is to make the steps that matter verifiable, connecting existing systems to a shared ledger where it adds value, without moving the entire chain on-chain.',
      },
    ],
  },
}
