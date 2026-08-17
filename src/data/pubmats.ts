import merch01 from '../assets/pubmats/merch-pubmat-01.jpg';
import merch02 from '../assets/pubmats/merch-pubmat-02.jpg';
import merch03 from '../assets/pubmats/merch-pubmat-03.jpg';
import merch04 from '../assets/pubmats/merch-pubmat-04.jpg';
import membershipDrive from '../assets/pubmats/membership-drive.jpg';
import bsisBrochure from '../assets/pubmats/bsis-brochure.jpg';
import freshiesSalubong from '../assets/pubmats/freshies-salubong.jpg';
import salubongBooth from '../assets/pubmats/salubong-booth.jpg';
import birthdayGreeting from '../assets/pubmats/birthday-greeting.jpg';

/** Filter categories. The gallery is grouped by type of piece, not by year. */
export const PUBMAT_KINDS = ['All', 'Logos', 'Pubmats', 'Brochures'] as const;

export type PubmatKind = (typeof PUBMAT_KINDS)[number];

export interface Pubmat {
  title: string;
  event: string;
  kind: Exclude<PubmatKind, 'All'>;
  /** Kept as caption metadata — it dates the piece, it no longer groups it. */
  year: '2024' | '2025' | '2026';
  /** null while the artwork is still outstanding from the client. */
  img: string | null;
}

export const PUBMATS: readonly Pubmat[] = [
  {
    title: 'Merch Pubmat 01',
    event: 'Official merch launch',
    kind: 'Pubmats',
    year: '2024',
    img: merch01,
  },
  {
    title: 'Merch Pubmat 02',
    event: 'Merch collection',
    kind: 'Pubmats',
    year: '2024',
    img: merch02,
  },
  {
    title: 'Merch Pubmat 03',
    event: 'Merch collection',
    kind: 'Pubmats',
    year: '2024',
    img: merch03,
  },
  {
    title: 'Merch Pubmat 04',
    event: 'Officers edition',
    kind: 'Pubmats',
    year: '2024',
    img: merch04,
  },
  { title: 'Captivate Booth', event: 'Captivate', kind: 'Pubmats', year: '2024', img: null },
  {
    title: "Valentine's Campaign",
    event: 'Seasonal campaign',
    kind: 'Pubmats',
    year: '2024',
    img: null,
  },
  {
    title: 'ISystems Convergence',
    event: 'Mr. & Ms. IS · Yell · Quiz Bee',
    kind: 'Pubmats',
    year: '2024',
    img: null,
  },
  {
    title: 'Membership Drive',
    event: 'IS³ membership',
    kind: 'Pubmats',
    year: '2025',
    img: membershipDrive,
  },
  {
    title: 'BSIS Brochure',
    event: 'Program brochure',
    kind: 'Brochures',
    year: '2025',
    img: bsisBrochure,
  },
  {
    title: 'ExeCom Turnover',
    event: 'Executive Committee turnover',
    kind: 'Pubmats',
    year: '2025',
    img: null,
  },
  {
    title: 'Freshies Salubong',
    event: 'Salubong welcome',
    kind: 'Pubmats',
    year: '2026',
    img: freshiesSalubong,
  },
  {
    title: 'Salubong Booth',
    event: 'Booth collateral',
    kind: 'Pubmats',
    year: '2026',
    img: salubongBooth,
  },
  {
    title: 'Birthday Greeting',
    event: 'Officer greetings',
    kind: 'Pubmats',
    year: '2026',
    img: birthdayGreeting,
  },
  {
    title: 'ISnergy',
    event: 'Mr. & Ms. IS · Yell · Typing Battle',
    kind: 'Pubmats',
    year: '2026',
    img: null,
  },
  {
    title: 'Open for Applications',
    event: 'IS³ recruitment',
    kind: 'Pubmats',
    year: '2026',
    img: null,
  },
  { title: 'Gold Gear Awards', event: 'Awards night', kind: 'Pubmats', year: '2026', img: null },
];
