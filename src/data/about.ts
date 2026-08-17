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

export const BIO = {
  headingLine1: 'Good layout is a system,',
  headingLine2: 'not a lucky draft.',
  pullQuoteLead: "Two years running an org's publications desk taught me the thing school didn't: ",
  pullQuoteTail: 'a design only counts once it ships, on time, with the team intact.',
  body: "I'm a creative, detail-oriented Information Systems student working across UI/UX design, front-end development, digital content creation, and business operations support. I design user-centered systems, build interactive prototypes, lead creative teams, and keep inventory software honest.",
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
