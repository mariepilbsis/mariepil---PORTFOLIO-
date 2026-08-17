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

export interface PubmatPiece {
  label: string;
  /** null while the artwork is still outstanding. */
  img: string | null;
}

/**
 * One event, holding every piece produced for it. Events are the unit the
 * gallery shows — a campaign that ran to six deliverables reads as one card
 * with six pieces, not six loose tiles. A single-piece event just renders as
 * an ordinary card.
 */
export interface PubmatEvent {
  title: string;
  event: string;
  kind: Exclude<PubmatKind, 'All'>;
  /** Caption metadata — it dates the event, it no longer groups it. */
  year: '2024' | '2025' | '2026';
  pieces: readonly PubmatPiece[];
}

export const PUBMAT_EVENTS: readonly PubmatEvent[] = [
  {
    title: 'Merch Campaign',
    event: 'Official merch launch',
    kind: 'Pubmats',
    year: '2024',
    pieces: [
      { label: 'Merch Pubmat 01', img: merch01 },
      { label: 'Merch Pubmat 02', img: merch02 },
      { label: 'Merch Pubmat 03', img: merch03 },
      { label: 'Merch Pubmat 04 · officers edition', img: merch04 },
    ],
  },
  {
    title: 'Captivate',
    event: 'Booth collateral',
    kind: 'Pubmats',
    year: '2024',
    pieces: [{ label: 'Captivate Booth', img: null }],
  },
  {
    title: "Valentine's Campaign",
    event: 'Seasonal campaign',
    kind: 'Pubmats',
    year: '2024',
    pieces: [{ label: "Valentine's Campaign", img: null }],
  },
  {
    // Piece list per the résumé's "events covered (2024)".
    title: 'ISystems Convergence',
    event: 'Pageant · tournaments · quiz bee',
    kind: 'Pubmats',
    year: '2024',
    pieces: [
      { label: 'Mr. & Ms. IS', img: null },
      { label: 'Yell Competition', img: null },
      { label: 'Flag Competition', img: null },
      { label: 'ML Tournament', img: null },
      { label: 'Quiz Bee', img: null },
      { label: 'Digital Poster', img: null },
    ],
  },
  {
    title: 'Membership Drive',
    event: 'IS³ membership',
    kind: 'Pubmats',
    year: '2025',
    pieces: [{ label: 'Membership Drive', img: membershipDrive }],
  },
  {
    title: 'BSIS Brochure',
    event: 'Program brochure',
    kind: 'Brochures',
    year: '2025',
    pieces: [{ label: 'BSIS Brochure', img: bsisBrochure }],
  },
  {
    title: 'ExeCom Turnover',
    event: 'Executive Committee turnover',
    kind: 'Pubmats',
    year: '2025',
    pieces: [{ label: 'ExeCom Turnover', img: null }],
  },
  {
    title: 'Freshies Salubong',
    event: 'Salubong welcome · booth',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'Salubong welcome', img: freshiesSalubong },
      { label: 'Booth collateral', img: salubongBooth },
    ],
  },
  {
    title: 'Birthday Greeting',
    event: 'Officer greetings',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Birthday Greeting', img: birthdayGreeting }],
  },
  {
    // Piece list per the résumé's "events covered (2026)".
    title: 'ISnergy',
    event: 'Pageant · competitions · contests',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'Mr. & Ms. IS', img: null },
      { label: 'Yell Competition', img: null },
      { label: 'Typing Battle', img: null },
      { label: 'Photography Contest', img: null },
      { label: 'Digital Poster Contest', img: null },
    ],
  },
  {
    title: 'Open for Applications',
    event: 'IS³ recruitment',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Open for Applications', img: null }],
  },
  {
    title: 'Gold Gear Awards',
    event: 'Awards night',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Gold Gear Awards', img: null }],
  },
];

/** Total pieces across every event, for the section eyebrow. */
export const PUBMAT_PIECE_COUNT = PUBMAT_EVENTS.reduce(
  (total, event) => total + event.pieces.length,
  0,
);

/** First piece with real artwork — what the folder card shows as its cover. */
export function coverOf(event: PubmatEvent): PubmatPiece | undefined {
  return event.pieces.find((piece) => piece.img !== null);
}
