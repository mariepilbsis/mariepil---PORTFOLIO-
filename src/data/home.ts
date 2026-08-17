/** Content for the Home page: hero, stat ledger, process diagram, ticker, entry cards. */

export const HERO = {
  eyebrow: 'Design · Development · Creative leadership',
  eyebrowMuted: '· Bulacan State University',
  headingLead: "Hi, I'm Marie ",
  headingAccent: 'Pil',
  lead: 'I design interfaces and ',
  leadStrong: 'lead the teams that ship them',
  sub: 'From pixel-perfect pubmats to full product prototypes — Information Systems student at Bulacan State University',
  primaryCta: 'View my work →',
  secondaryCta: 'Get in touch',
} as const;

export interface StatEntry {
  label: string;
  value: string;
}

export const STAT_LEDGER: readonly StatEntry[] = [
  { label: 'Currently', value: 'Multimedia & Publications Head · IS³' },
  { label: 'Shipped', value: '5 systems · 2 built and deployed' },
  { label: 'Leading', value: 'Creative team · publications desk' },
];

export interface FlowNode {
  label: string;
  /** Position within the diagram, as CSS percentages. */
  left: string;
  top: string;
  /** Puts the label on the left of the dot instead of the right. */
  reverse: boolean;
  /** Filled crimson with a glow; unreached steps are hollow. */
  active: boolean;
  /** Label colour — later steps read brighter than earlier ones. */
  color: string;
}

export const PROCESS_FLOW: readonly FlowNode[] = [
  {
    label: 'planning',
    left: '38%',
    top: '4%',
    reverse: false,
    active: false,
    color: 'rgba(var(--txc),.5)',
  },
  {
    label: 'gathering data',
    left: '38%',
    top: '21%',
    reverse: true,
    active: false,
    color: 'rgba(var(--txc),.72)',
  },
  {
    label: 'design & prototyping',
    left: '75%',
    top: '42%',
    reverse: false,
    active: true,
    color: 'var(--acc3)',
  },
  {
    label: 'execution',
    left: '75%',
    top: '65%',
    reverse: false,
    active: true,
    color: 'var(--acc3)',
  },
  {
    label: 'feedback & iteration',
    left: '38%',
    top: '88%',
    reverse: true,
    active: true,
    color: '#FF8B9C',
  },
];

/** The S-curve the process nodes sit on, drawn in a 400 × 452 viewBox. */
export const PROCESS_CURVE = 'M152 96 C 152 150, 300 140, 300 196 L300 300 C300 356, 152 346, 152 400';

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

export const ENTRY_CARDS: readonly EntryCard[] = [
  {
    num: '01',
    title: 'Systems & Projects',
    body: 'Five products designed end to end — two of them built, one deployed.',
    cta: 'Open the reel',
    to: '/work',
  },
  {
    num: '02',
    title: 'Pubmats Gallery',
    body: 'Publication materials shipped as Head Layout Artist, filed by year.',
    cta: 'Browse the work',
    to: '/work#pubmats',
  },
  {
    num: '03',
    title: 'Experience & Proof',
    body: 'Roles, certifications and awards — the receipts behind the portfolio.',
    cta: 'See the record',
    to: '/about',
  },
];
