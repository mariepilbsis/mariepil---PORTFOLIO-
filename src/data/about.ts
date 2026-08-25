/** Content for the About page: identity card, bio, principles and the split pie. */

export interface IdentityRow {
  key: string;
  value: string;
}

// Credentials and availability used to sit here too. A recruiter scanning the
// card wants the offer, not the CV, so the rows carry the title and the work
// it covers and nothing else.
export const IDENTITY_ROWS: readonly IdentityRow[] = [
  { key: 'uid', value: 'gaymariepil' },
  { key: 'role', value: 'design & operations va' },
  {
    key: 'scope',
    value: 'e-commerce support · business analytics · ui/ux · front-end · digital marketing',
  },
  { key: 'base', value: 'bulacan, ph · gmt+8' },
];

/**
 * The identity card's media slot. The portrait is always there; when this is a
 * real file the video runs over the photo on hover, and the card grows a play
 * control for touch, where there is no hover to run it.
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
  // Rendered only in the home hero, not on this page. The emphasis carries the
  // promise and the muted tail carries how it is kept — the other way round
  // from the credential-first version this replaced, which leaned on the same
  // "digital systems" and "streamlined workflows" the headline above it
  // already says.
  pullQuoteLead: 'I help organizations scale their marketing and stay on schedule — ',
  pullQuoteTail:
    'combining creative leadership with digital operations to ship consistent, publication-ready assets on time, every time.',
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

export const PART_DESIGN: readonly string[] = [
  'UI/UX Design & Prototyping',
  'Wireframing & User Flows',
  'Publication & Layout Design',
  'Visual Systems & Branding',
  'Accessibility & Usability Design',
];

export const PART_CODE: readonly string[] = [
  'Front-End Development',
  'HTML / CSS / JavaScript',
  'Django & MySQL Integration',
  'System Architecture & Databases',
  'Production Deployment & Testing',
];

/** The third part, alongside the design and engineering ones above. */
export const PART_BUSINESS: readonly string[] = [
  'Requirements Gathering & Documentation',
  'Business Process Improvement',
  'Data & Inventory Analysis',
  'Dashboards & Reporting',
  'Stakeholder Collaboration',
];
