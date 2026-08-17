export interface Certification {
  issuer: string;
  name: string;
  kind: string;
}

export const CERTIFICATIONS: readonly Certification[] = [
  { issuer: 'Alison', name: 'Essentials of IT Service Management (ITIL 4)', kind: 'Certification' },
  {
    issuer: 'Alison',
    name: 'ISO 20000 — Principles of IT Service Management (ITSM)',
    kind: 'Certification',
  },
  {
    issuer: 'Wadhwani Foundation',
    name: 'Ignite Philippines — Technopreneurship Program',
    kind: 'Program',
  },
  {
    issuer: 'SkillFront',
    name: 'Foundations of Business and Entrepreneurship',
    kind: 'Certification',
  },
  {
    issuer: 'SmartBridge',
    name: 'Salesforce AI & Automation (AgentBlazer)',
    kind: 'Certification',
  },
  { issuer: 'Salesforce', name: 'Salesforce Virtual Internship', kind: 'Internship' },
];

export interface Award {
  /** Index numeral shown as the watermark on the card. */
  num: string;
  title: string;
  kind: string;
  body: string;
}

export const AWARDS: readonly Award[] = [
  {
    num: '01',
    title: 'High-Potential Venture Team',
    kind: 'Team award',
    body: 'Recognised through the Wadhwani Foundation venture program.',
  },
  {
    num: '02',
    title: 'Best Venture Marketing Campaign',
    kind: 'Marketing',
    body: 'For the campaign strategy and creative direction behind the venture.',
  },
  {
    num: '03',
    title: 'Best Wadhwani Venture Journey',
    kind: 'Program',
    body: 'For the strongest end-to-end journey across the program cohort.',
  },
  {
    // Outstanding from the client: the semester details for this one.
    num: '04',
    title: "Dean's Lister",
    kind: 'Academic',
    body: 'Bulacan State University, College of Information and Communications Technology.',
  },
];

export interface Education {
  badge: string;
  degree: string;
  school: string;
  period: string;
}

export const EDUCATION: Education = {
  badge: 'BS',
  degree: 'Bachelor of Science in Information Systems',
  school: 'Bulacan State University',
  period: 'Present',
};
