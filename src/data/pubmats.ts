import merch01 from '../assets/pubmats/merch-pubmat-01.jpg';
import merch02 from '../assets/pubmats/merch-pubmat-02.jpg';
import merch03 from '../assets/pubmats/merch-pubmat-03.jpg';
import merch04 from '../assets/pubmats/merch-pubmat-04.jpg';
import membershipDrive from '../assets/pubmats/membership-drive.jpg';
import bsisBrochure from '../assets/pubmats/bsis-brochure.jpg';
import freshiesSalubong from '../assets/pubmats/freshies-salubong.jpg';
import salubongBooth from '../assets/pubmats/salubong-booth.jpg';
import birthdayGreeting from '../assets/pubmats/birthday-greeting.jpg';
import applicationFront from '../assets/pubmats/application-front.jpg';
import applicationCreatives from '../assets/pubmats/application-creatives.jpg';
import applicationExec from '../assets/pubmats/application-exec.jpg';
import applicationLegal from '../assets/pubmats/application-legal.jpg';
import applicationMpd from '../assets/pubmats/application-mpd.jpg';
import smartstockPoster from '../assets/pubmats/smartstock-poster.jpg';
import smartstockHero from '../assets/pubmats/smartstock-hero.jpg';
import smartstockAiForecasts from '../assets/pubmats/smartstock-ai-forecasts.jpg';
import smartstockBanner from '../assets/pubmats/smartstock-banner.jpg';
import smartstockLogoMark from '../assets/pubmats/smartstock-logo-mark.jpg';
import smartstockWordmark from '../assets/pubmats/smartstock-wordmark.jpg';

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
    event: 'Salubong welcome',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Salubong welcome', img: freshiesSalubong }],
  },
  {
    // Stands on its own rather than sitting inside the Salubong folder.
    title: 'Salubong Booth Poster',
    event: 'Booth collateral',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Salubong Booth Poster', img: salubongBooth }],
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
    title: 'Application Poster',
    event: 'IS³ recruitment · July 9–14',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'Shape the Future of IS · front page', img: applicationFront },
      { label: 'Executive Department', img: applicationExec },
      { label: 'Creatives Department', img: applicationCreatives },
      { label: 'Legal Department', img: applicationLegal },
      { label: 'Membership & Publicity Department', img: applicationMpd },
    ],
  },
  {
    title: 'Gold Gear Awards',
    event: 'Awards night',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Gold Gear Awards', img: null }],
  },
  {
    // SmartStock — the Technopreneurship capstone brand for Gerlyn Variety Store.
    title: 'Technopreneurship',
    event: 'SmartStock · campaign collateral',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'The Future of Retail Inventory · poster', img: smartstockPoster },
      { label: 'Smarter inventory starts here', img: smartstockHero },
      { label: 'AI Demand Forecasts', img: smartstockAiForecasts },
      { label: 'The Future of Retail Inventory · banner', img: smartstockBanner },
    ],
  },
  {
    title: 'Branding',
    event: 'SmartStock · visual identity',
    kind: 'Logos',
    year: '2026',
    pieces: [
      { label: 'SmartStock logo mark', img: smartstockLogoMark },
      { label: 'Gerlyn Variety Store SmartStock wordmark', img: smartstockWordmark },
    ],
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
