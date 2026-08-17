export interface TimelineEntry {
  /** Date pill text. */
  tag: string;
  org: string;
  role: string;
  /** Full date line. Only rendered when it says something the pill doesn't. */
  dates: string;
  /** Marks the current role — crimson rail marker plus a "now" badge. */
  now: boolean;
  body: string;
  chips: readonly string[];
}

export const TIMELINE: readonly TimelineEntry[] = [
  {
    tag: '2026 → 2027 · current',
    org: 'IS³ Synergy Society',
    role: 'Multimedia and Publications Head',
    dates: 'Jul 2026 → 2027',
    now: true,
    body: 'Leading multimedia and publications for the Information Systems Synergy Society — setting the visual direction for every campaign the org puts out and keeping the publication calendar on schedule.',
    chips: ['Art direction', 'Team leadership', 'Campaign planning', 'Brand consistency'],
  },
  {
    tag: '2026',
    org: 'Ever Rising Electrical Supplies',
    role: 'Inventory & Sales Support Staff',
    dates: 'May → Jun 2026',
    now: false,
    body: 'Processed orders, managed stock records and built receipt templates in Inflow Inventory Premium — the operational reality that later shaped how I designed SmartStock.',
    chips: ['Inflow Inventory', 'Order processing', 'Receipt templates', 'Stock control'],
  },
  {
    tag: '2024 → 2026',
    org: 'IS³ Synergy Society',
    role: 'Head Layout Artist',
    dates: '2024 → 2026',
    now: false,
    body: 'Led a team of four designers producing publication materials for org events — pageants, tournaments, competitions, recruitment drives and awards nights.',
    chips: ['Layout design', 'Team of 4', 'Photoshop', 'Canva', 'Figma'],
  },
  {
    tag: '2023 → present',
    org: 'Freelance',
    role: 'Graphic Designer (part-time)',
    dates: '2023 → present',
    now: false,
    body: 'Design work for clients alongside school — visual identity, social content and print collateral.',
    chips: ['Client work', 'Digital content', 'Print collateral'],
  },
];
