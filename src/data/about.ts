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
  headingLine1: 'Great design is structured,',
  headingLine2: 'functional, and scalable.',
  pullQuoteLead: 'Leading multimedia and publication teams taught me what matters most: ',
  pullQuoteTail:
    'a design only creates value when it ships accurately, hits every deadline, and elevates the user experience.',
  // Trimmed once the home hero and identity card started carrying the
  // student / school / role details this used to restate.
  body: 'I bridge the gap between UI/UX design, front-end development, and operations—crafting interactive prototypes, web interfaces, and production-ready systems grounded in clear user data.',
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
