import merch01 from '../assets/pubmats/merch-pubmat-01.jpg';
import merch02 from '../assets/pubmats/merch-pubmat-02.jpg';
import merch03 from '../assets/pubmats/merch-pubmat-03.jpg';
import merch04 from '../assets/pubmats/merch-pubmat-04.jpg';
import membershipDrive from '../assets/pubmats/membership-drive.jpg';
import bsisBrochure from '../assets/pubmats/bsis-brochure.jpg';
import bsisBrochureOutside from '../assets/pubmats/bsis-brochure-outside.jpg';
import bsisBrochureMockup from '../assets/pubmats/bsis-brochure-mockup.jpg';
import aeroBrochure01 from '../assets/pubmats/aero-brochure-01.jpg';
import aeroBrochure02 from '../assets/pubmats/aero-brochure-02.jpg';
import aeroBrochureCaap from '../assets/pubmats/aero-brochure-caap.jpg';
import bpmBdo from '../assets/pubmats/bpm-bdo.jpg';
import salubongBooth from '../assets/pubmats/salubong-booth.jpg';
import birthdayGreeting from '../assets/pubmats/birthday-greeting.jpg';
import isnergyMrMs from '../assets/pubmats/isnergy-mr-ms.jpg';
import isnergyYell from '../assets/pubmats/isnergy-yell.jpg';
import isnergyTypingBattle from '../assets/pubmats/isnergy-typing-battle.jpg';
import isnergyPhotography from '../assets/pubmats/isnergy-photography.jpg';
import isnergyPoster from '../assets/pubmats/isnergy-poster.jpg';
import application1a from '../assets/pubmats/application1-01.jpg';
import application1b from '../assets/pubmats/application1-02.jpg';
import applicationFront from '../assets/pubmats/application-front.jpg';
import applicationCreatives from '../assets/pubmats/application-creatives.jpg';
import applicationExec from '../assets/pubmats/application-exec.jpg';
import applicationLegal from '../assets/pubmats/application-legal.jpg';
import applicationMpd from '../assets/pubmats/application-mpd.jpg';
import goldGear01 from '../assets/pubmats/gold-gear-01.jpg';
import goldGear02 from '../assets/pubmats/gold-gear-02.jpg';
import smartstockPoster from '../assets/pubmats/smartstock-poster.jpg';
import smartstockHero from '../assets/pubmats/smartstock-hero.jpg';
import smartstockAiForecasts from '../assets/pubmats/smartstock-ai-forecasts.jpg';
import smartstockBanner from '../assets/pubmats/smartstock-banner.jpg';
import smartstockLogoMark from '../assets/pubmats/smartstock-logo-mark.jpg';
import smartstockWordmark from '../assets/pubmats/smartstock-wordmark.jpg';
import isBrandingCover from '../assets/pubmats/is-branding-cover.jpg';
import isBrandingPfp from '../assets/pubmats/is-branding-pfp.jpg';

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
    pieces: [
      { label: 'Outside spread', img: bsisBrochureOutside },
      { label: 'Inside spread', img: bsisBrochure },
      { label: 'Trifold mockup', img: bsisBrochureMockup },
    ],
  },
  {
    title: 'Business Process Management',
    event: 'BDO Unibank · account registration and activation',
    kind: 'Brochures',
    year: '2025',
    pieces: [{ label: 'BPM lifecycle e-brochure', img: bpmBdo }],
  },
  {
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
  // The ISnergy competition pubmats stand as individual cards rather than
  // nesting inside one event folder.
  {
    title: 'Mr. & Ms. IS',
    event: 'ISnergy · pageant',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Mr. & Ms. IS', img: isnergyMrMs }],
  },
  {
    title: 'Yell Competition',
    event: 'ISnergy · competition',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Yell Competition', img: isnergyYell }],
  },
  {
    title: 'Typing Battle',
    event: 'ISnergy · competition',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Typing Battle', img: isnergyTypingBattle }],
  },
  {
    title: 'Photography Competition',
    event: 'ISnergy · contest',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Photography Competition', img: isnergyPhotography }],
  },
  {
    title: 'Poster Competition',
    event: 'ISnergy · contest',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Poster Competition', img: isnergyPoster }],
  },
  {
    title: 'Application for Executive Committee',
    event: 'IS³ recruitment · 2026–2027',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'Open for Applications', img: application1a },
      { label: 'Available Positions', img: application1b },
    ],
  },
  {
    title: 'Application for Committee and Departments Staff',
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
    event: 'Awards night · Valencia Hall',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'Gold Gear Awards', img: goldGear01 },
      { label: 'Gold Gear Awardees', img: goldGear02 },
    ],
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
  {
    title: 'IS³ Branding',
    event: 'Facebook cover · profile photo',
    kind: 'Logos',
    year: '2026',
    pieces: [
      { label: 'Facebook cover photo', img: isBrandingCover },
      { label: 'Facebook profile photo', img: isBrandingPfp },
    ],
  },
  {
    // The one piece here that came in as paid outside work.
    title: 'Aeronautical Communications',
    event: 'Freelance commission · brochure',
    kind: 'Brochures',
    year: '2026',
    pieces: [
      { label: 'Spread 01', img: aeroBrochure01 },
      { label: 'Spread 02', img: aeroBrochure02 },
      { label: 'CAAP mandates and functions · e-brochure', img: aeroBrochureCaap },
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
