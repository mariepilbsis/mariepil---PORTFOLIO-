/** Content for the About page: identity card, bio, workflow steps and the split pie. */

export interface IdentityRow {
  key: string;
  value: string;
}

// Credentials and availability used to sit here too, and after them the role
// and the scope of work. The card carries a vertical intro video now, and a
// 9:16 frame is tall — these two rows are what fits beside it, and the video
// says the rest better than a list of nouns could.
export const IDENTITY_ROWS: readonly IdentityRow[] = [
  { key: 'uid', value: 'gaymariepil' },
  { key: 'base', value: 'bulacan, ph · gmt+8' },
];

/**
 * The identity card's media slot. The portrait is always there; when this is a
 * real file the card grows a play button, and pressing it runs the intro over
 * the photo. Nothing plays on hover — the clip is narrated.
 *
 * Served straight from public/ rather than bundled, like the walkthrough in
 * projects.ts: it is tens of megabytes and only ever fetched on that press, so
 * there is nothing for the bundler to do but copy it.
 */
export const PROFILE_MEDIA: { video: string } = {
  video: '/MariePil-Intro.mp4',
};

export const BIO = {
  // Rendered only in the home hero, not on this page. The emphasis carries the
  // promise and the muted tail carries how it is kept — the other way round
  // from the credential-first version this replaced, which leaned on the same
  // "digital systems" and "streamlined workflows" the headline above it
  // already says.
  pullQuoteLead: 'I help organizations scale their marketing and stay on schedule — ',
  pullQuoteTail:
    'combining creative leadership with digital operations to ship consistent, publication-ready assets on time, every time.',
} as const;

// The heading and the line under it that open the workflow steps. The lead used
// to run as its own two-column banner under the hero buttons, with the bio
// beside it; it says more as the promise the three steps below then keep.
export const WORKFLOW = {
  title: 'My Workflow',
  lead: 'Great design is structured, functional, and scalable.',
} as const;

export interface WorkflowStep {
  num: string;
  title: string;
  body: string;
}

export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    num: '01',
    title: 'Understand the objective',
    body: 'Analyzing your business goals, target audience, and brand guidelines first—ensuring every visual asset serves a clear strategic purpose before design work begins.',
  },
  {
    num: '02',
    title: 'Build & execute',
    body: 'Creating high-impact marketing collateral, publication layouts, and digital media using Canva, Adobe Photoshop, and Figma—delivering polished, production-ready assets.',
  },
  {
    num: '03',
    title: 'Ship & organize',
    body: 'Directing content schedules, batching deliverables, and maintaining media assets—ensuring strict brand consistency and zero missed posting deadlines.',
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
