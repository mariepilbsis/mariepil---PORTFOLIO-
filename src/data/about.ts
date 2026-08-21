/** Content for the About page: identity card, bio, principles and the split pie. */

export interface IdentityRow {
  key: string;
  value: string;
  /** Crimson for the status row, body text everywhere else. */
  accent?: boolean;
}

export const IDENTITY_ROWS: readonly IdentityRow[] = [
  { key: 'uid', value: 'gaymariepil' },
  { key: 'role', value: 'creative va · multimedia lead · digital content operator' },
  { key: 'school', value: 'bulacan state university' },
  { key: 'program', value: 'bs information systems' },
  { key: 'base', value: 'bulacan, ph · gmt+8' },
  { key: 'exp', value: 'creative lead · since 2023' },
  // The status dot is drawn in CSS, not typed here — as text a screen reader
  // announces it as "black circle" before the words that matter.
  { key: 'status', value: 'open to opportunities', accent: true },
];

/**
 * The identity card's media slot. The portrait is always there; when this is a
 * real file the card grows a play control and the video runs over the photo.
 *
 * To switch it on: drop the file in src/assets/, `import reel from
 * '../assets/<file>.mp4'` above, and set `video: reel`. Nothing else changes.
 */
export const PROFILE_MEDIA: { video: string } = {
  video: '',
};

export const BIO = {
  headingLine1: 'Great design is structured,',
  headingLine2: 'functional, and scalable.',
  // Rendered only in the home hero, not on this page — the emphasis carries the
  // credential, the muted tail carries what the client gets.
  pullQuoteLead: 'With a strong foundation in multimedia leadership and digital systems, ',
  pullQuoteTail:
    'I help business owners, agencies, and founders elevate their visual identity, streamline content operations, and ship marketing assets on time—every time.',
  // Trimmed once the home hero and identity card started carrying the
  // student / school / role details this used to restate.
  body: 'I bridge the gap between creative production and digital operations—building brand systems, marketing assets and content workflows that stay consistent, stay on brand, and ship on schedule.',
} as const;

export interface Principle {
  num: string;
  title: string;
  body: string;
}

export const PRINCIPLES: readonly Principle[] = [
  {
    num: '01',
    title: 'Design the system',
    body: 'User flows, wireframes, and interactive Figma prototypes first—ensuring every visual decision serves a functional purpose.',
  },
  {
    num: '02',
    title: 'Build it for real',
    body: 'HTML, CSS, JavaScript, and Django backend integration—I deliver functional, deployed code alongside high-fidelity mockups.',
  },
  {
    num: '03',
    title: 'Ship with a team',
    body: 'Directing multimedia initiatives across design, web, and layout—ensuring consistent branding and zero missed event deadlines.',
  },
];

export const HALF_DESIGN: readonly string[] = [
  'UI/UX Design & Prototyping',
  'Wireframing & User Flows',
  'Publication & Layout Design',
  'Visual Systems & Branding',
  'Accessibility & Usability Design',
];

export const HALF_CODE: readonly string[] = [
  'Front-End Development',
  'HTML / CSS / JavaScript',
  'Django & MySQL Integration',
  'System Architecture & Databases',
  'Production Deployment & Testing',
];
