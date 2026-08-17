/** Content for the Home page: hero, stat ledger, ticker, entry cards. */

export const HERO = {
  eyebrow: 'Design · Development · Creative leadership',
  eyebrowMuted: '· Bulacan State University',
  headingLead: "Hi, I'm Marie ",
  headingAccent: 'Pil',
  lead: 'I design interfaces and ',
  leadStrong: 'lead the teams that ship them',
  primaryCta: 'View my work →',
  secondaryCta: 'Get in touch',
} as const;

export interface StatEntry {
  label: string;
  value: string;
}

// "Leading" lived here too, but the identity card's role row now says it.
export const STAT_LEDGER: readonly StatEntry[] = [
  { label: 'Currently', value: 'Multimedia & Publications Head · IS³' },
  { label: 'Shipped', value: 'SmartStock · built and deployed' },
];

export const TICKER_ITEMS: readonly string[] = [
  'Figma',
  'Photoshop',
  'Canva',
  'Django',
  'MySQL',
  'HTML · CSS · JS',
  'Inflow Inventory',
  'Salesforce',
  'VS Code',
  'Wix',
];

export interface EntryCard {
  num: string;
  title: string;
  body: string;
  cta: string;
  to: string;
}

// Numbered to match the section order on the work page: pubmats, then systems.
export const ENTRY_CARDS: readonly EntryCard[] = [
  {
    num: '01',
    title: 'Pubmats Gallery',
    body: 'Publication materials shipped as Head Layout Artist, filed by type.',
    cta: 'Browse the work',
    to: '/work#pubmats',
  },
  {
    num: '02',
    title: 'Systems & Projects',
    body: 'SmartStock, designed end to end — then built and deployed for real.',
    cta: 'Open the reel',
    to: '/work#systems',
  },
  {
    num: '03',
    title: 'Experience & Proof',
    body: 'Roles, certifications and awards — the receipts behind the portfolio.',
    cta: 'See the record',
    to: '/about',
  },
];
