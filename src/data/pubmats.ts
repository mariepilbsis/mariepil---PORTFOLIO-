/**
 * Artwork is resolved by filename stem rather than named imports: every piece
 * needs a full-size original for the lightbox *and* a thumbnail for the card,
 * and pairing those by hand across 35 pieces was 70 import lines waiting to
 * drift apart. Vite still hashes and tree-shakes these the same way.
 *
 * Thumbnails come from scripts/make-thumbnails.py — re-run it after adding art.
 */
const FULL = import.meta.glob('../assets/pubmats/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const THUMB_WEBP = import.meta.glob('../assets/pubmats/thumbs/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const THUMB_JPG = import.meta.glob('../assets/pubmats/thumbs/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

/**
 * Resolves one piece's three files from its stem.
 *
 * This runs at module scope, so a hard throw in production would white-screen
 * the whole site over one missing file. Instead it shouts in dev — where a
 * typo or a forgotten thumbnail run should stop you — and in production falls
 * back to whatever it does have, costing bytes rather than the page.
 */
function art(stem: string): Pick<PubmatPiece, 'img' | 'thumb' | 'thumbJpg'> {
  const img = FULL[`../assets/pubmats/${stem}.jpg`] ?? null;
  const thumb = THUMB_WEBP[`../assets/pubmats/thumbs/${stem}.webp`];
  const thumbJpg = THUMB_JPG[`../assets/pubmats/thumbs/${stem}.jpg`];

  if (import.meta.env.DEV) {
    if (!img) throw new Error(`No artwork at src/assets/pubmats/${stem}.jpg`);
    if (!thumb || !thumbJpg) {
      throw new Error(`No thumbnail for ${stem} — run: python scripts/make-thumbnails.py`);
    }
  }

  // Falling back to the full-size original keeps the card filled; it is heavy,
  // but a heavy card beats an empty one.
  return {
    img,
    thumb: thumb ?? img ?? undefined,
    thumbJpg: thumbJpg ?? img ?? undefined,
  };
}

/** Filter categories. The gallery is grouped by type of piece, not by year. */
export const PUBMAT_KINDS = ['All', 'Pubmats', 'Brochures', 'Logos'] as const;

export type PubmatKind = (typeof PUBMAT_KINDS)[number];

export interface PubmatPiece {
  label: string;
  /** Full-size original, shown in the lightbox. null while artwork is outstanding. */
  img: string | null;
  /** 560px WebP shown on the gallery card — see scripts/make-thumbnails.py. */
  thumb?: string;
  /** Same thumbnail as JPEG, for browsers without WebP. */
  thumbJpg?: string;
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
      { label: 'Coming soon teaser', ...art('merch-teaser') },
      { label: 'Merch Pubmat 01', ...art('merch-pubmat-01') },
      { label: 'Merch Pubmat 02', ...art('merch-pubmat-02') },
      { label: 'Merch Pubmat 03', ...art('merch-pubmat-03') },
      { label: 'Merch Pubmat 04 · officers edition', ...art('merch-pubmat-04') },
    ],
  },
  {
    title: 'Membership Drive',
    event: 'IS³ membership',
    kind: 'Pubmats',
    year: '2025',
    pieces: [{ label: 'Membership Drive', ...art('membership-drive') }],
  },
  {
    title: 'BSIS Brochure',
    event: 'Program brochure',
    kind: 'Brochures',
    year: '2025',
    pieces: [
      { label: 'Outside spread', ...art('bsis-brochure-outside') },
      { label: 'Inside spread', ...art('bsis-brochure') },
      { label: 'Trifold mockup', ...art('bsis-brochure-mockup') },
    ],
  },
  {
    title: 'Business Process Management',
    event: 'BDO Unibank · account registration and activation',
    kind: 'Brochures',
    year: '2025',
    pieces: [{ label: 'BPM lifecycle e-brochure', ...art('bpm-bdo') }],
  },
  {
    title: 'Salubong Booth Poster',
    event: 'Booth collateral',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Salubong Booth Poster', ...art('salubong-booth') }],
  },
  {
    title: 'Birthday Greeting',
    event: 'Officer greetings',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Birthday Greeting', ...art('birthday-greeting') }],
  },
  // The ISnergy competition pubmats stand as individual cards rather than
  // nesting inside one event folder.
  {
    title: 'Mr. & Ms. IS',
    event: 'ISnergy · pageant',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Mr. & Ms. IS', ...art('isnergy-mr-ms') }],
  },
  {
    title: 'Yell Competition',
    event: 'ISnergy · competition',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Yell Competition', ...art('isnergy-yell') }],
  },
  {
    title: 'Typing Battle',
    event: 'ISnergy · competition',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Typing Battle', ...art('isnergy-typing-battle') }],
  },
  {
    title: 'Photography Competition',
    event: 'ISnergy · contest',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Photography Competition', ...art('isnergy-photography') }],
  },
  {
    title: 'Poster Competition',
    event: 'ISnergy · contest',
    kind: 'Pubmats',
    year: '2026',
    pieces: [{ label: 'Poster Competition', ...art('isnergy-poster') }],
  },
  {
    title: 'Application for Executive Committee',
    event: 'IS³ recruitment · 2026–2027',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'Open for Applications', ...art('application1-01') },
      { label: 'Available Positions', ...art('application1-02') },
    ],
  },
  {
    title: 'Application for Committee and Departments Staff',
    event: 'IS³ recruitment · July 9–14',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'Shape the Future of IS · front page', ...art('application-front') },
      { label: 'Executive Department', ...art('application-exec') },
      { label: 'Creatives Department', ...art('application-creatives') },
      { label: 'Legal Department', ...art('application-legal') },
      { label: 'Membership & Publicity Department', ...art('application-mpd') },
    ],
  },
  {
    title: 'Gold Gear Awards',
    event: 'Awards night · Valencia Hall',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'Gold Gear Awards', ...art('gold-gear-01') },
      { label: 'Gold Gear Awardees', ...art('gold-gear-02') },
    ],
  },
  {
    // SmartStock — the Technopreneurship capstone brand for Gerlyn Variety Store.
    title: 'Technopreneurship',
    event: 'SmartStock · campaign collateral',
    kind: 'Pubmats',
    year: '2026',
    pieces: [
      { label: 'The Future of Retail Inventory · poster', ...art('smartstock-poster') },
      { label: 'Smarter inventory starts here', ...art('smartstock-hero') },
      { label: 'AI Demand Forecasts', ...art('smartstock-ai-forecasts') },
      { label: 'The Future of Retail Inventory · banner', ...art('smartstock-banner') },
    ],
  },
  {
    title: 'SmartStock Branding',
    event: 'Visual identity · logo mark and wordmark',
    kind: 'Logos',
    year: '2026',
    pieces: [
      { label: 'SmartStock logo mark', ...art('smartstock-logo-mark') },
      { label: 'Gerlyn Variety Store SmartStock wordmark', ...art('smartstock-wordmark') },
    ],
  },
  {
    title: 'IS³ Branding',
    event: 'Facebook cover · profile photo',
    kind: 'Logos',
    year: '2026',
    pieces: [
      { label: 'Facebook cover photo', ...art('is-branding-cover') },
      { label: 'Facebook profile photo', ...art('is-branding-pfp') },
    ],
  },
  {
    // The one piece here that came in as paid outside work.
    title: 'CAAP E-Brochure',
    event: 'Civil Aviation Authority of the Philippines · mandates and functions',
    kind: 'Brochures',
    year: '2026',
    pieces: [{ label: 'CAAP E-Brochure', ...art('aero-brochure-caap') }],
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
