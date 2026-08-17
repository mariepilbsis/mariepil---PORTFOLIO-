/** Content for the About page: identity card, bio, principles and the split pie. */

export interface IdentityRow {
  key: string;
  value: string;
  /** Crimson for the status row, body text everywhere else. */
  accent?: boolean;
}

export const IDENTITY_ROWS: readonly IdentityRow[] = [
  { key: 'uid', value: 'gaymariepil' },
  { key: 'role', value: 'design lead · ui/ux designer · layout artist' },
  { key: 'school', value: 'bulacan state university' },
  { key: 'program', value: 'bs information systems' },
  { key: 'base', value: 'bulacan, ph · gmt+8' },
  { key: 'exp', value: 'design lead · since 2023' },
  { key: 'status', value: '● open to opportunities', accent: true },
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
  headingLine1: 'Good layout is a system,',
  headingLine2: 'not a lucky draft.',
  pullQuoteLead: "Two years running an org's publications desk taught me the thing school didn't: ",
  pullQuoteTail: 'a design only counts once it ships, on time, with the team intact.',
  // Trimmed once the home hero and identity card started carrying the
  // student / school / role details this used to restate.
  body: 'I work across UI/UX design, front-end development and content — user-centered systems, interactive prototypes, creative teams, and inventory software kept honest.',
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
    body: 'Flows and wireframes first, so the pretty part has somewhere to sit.',
  },
  {
    num: '02',
    title: 'Build it for real',
    body: 'Django, MySQL, plain HTML/CSS/JS — I hand off code, not just mockups.',
  },
  {
    num: '03',
    title: 'Ship with a team',
    body: 'Four designers, one calendar, zero missed posting deadlines.',
  },
];

export const HALF_DESIGN: readonly string[] = [
  'UI design',
  'UX design',
  'Wireframing & user flows',
  'Layout & publication design',
  'Making it pop',
];

export const HALF_CODE: readonly string[] = [
  'Front-end development',
  'HTML / CSS',
  'JavaScript',
  'Django & MySQL',
  'Deploying it properly',
];
