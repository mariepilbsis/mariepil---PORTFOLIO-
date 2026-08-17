export interface Project {
  num: string;
  name: string;
  meta: string;
  /** One-line summary shown on the reel card. */
  tools: string;
  blurb: string;
  problem: string;
  process: readonly string[];
  toolList: readonly string[];
  /**
   * Case-study screenshot. Still outstanding from the client for every project,
   * so the card and the modal both fall back to an empty slot.
   */
  cover?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    num: '01',
    name: 'SmartStock',
    meta: 'AI Inventory · UI/UX · 2026',
    tools: 'Figma, hi-fi prototype, dashboard, onboarding, analytics, inventory user flows',
    blurb: 'UI/UX for an AI-powered SaaS inventory platform built for Philippine MSMEs.',
    problem:
      'Small businesses track stock in notebooks and spreadsheets, so they only learn about a shortage after a sale is lost. The platform needed to make AI forecasting legible to owners with no analytics background.',
    process: [
      'Mapped the inventory tracking and decision-making flows end to end',
      'Wireframed the dashboard, onboarding and analytics screens',
      'Built a high-fidelity, clickable Figma prototype',
      'Tested the forecast screens for plain-language clarity',
    ],
    toolList: ['Figma', 'Prototyping', 'User flows', 'Wireframing', 'Usability design'],
  },
  {
    num: '02',
    name: 'SmartStock',
    meta: 'UI + Development · 2026',
    tools: 'Django, MySQL, PythonAnywhere, stock dashboards and forms, deployed',
    blurb: 'The same product, taken from design into a working web system I designed and built.',
    problem:
      'The prototype had to become something a business could actually run — real records, real forms, real deployment, not a clickable mock.',
    process: [
      'Translated the Figma UI into templates and components',
      'Modelled inventory and stock movement in MySQL',
      'Built dashboards and CRUD forms in Django',
      'Deployed the system on PythonAnywhere',
    ],
    toolList: ['Django', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'PythonAnywhere'],
  },
  {
    num: '03',
    name: 'ISkolaris',
    meta: 'Research Platform · UI/UX · 2025',
    tools: 'Research database interface, navigation and accessibility of academic content',
    blurb: 'A research database interface for students and professors.',
    problem:
      'Academic papers were scattered and hard to search, so students gave up before they found anything relevant.',
    process: [
      'Interviewed students and professors about how they search',
      'Restructured navigation around subject and year',
      'Designed browse, search and paper-detail screens',
      'Raised contrast and text sizing for accessibility',
    ],
    toolList: ['Figma', 'Wireframing', 'User flows', 'Usability design'],
  },
  {
    num: '04',
    name: 'EcoCollect',
    meta: 'Waste Management · UI/UX · 2024',
    tools: 'Collection scheduling, reporting, dashboards, notification interfaces',
    blurb: 'A digital platform for waste collection scheduling and community reporting.',
    problem:
      'Residents had no way to know when collection would happen or to report a missed pickup, so complaints went nowhere.',
    process: [
      'Mapped the resident and collector journeys',
      'Designed the scheduling calendar and report form',
      'Built dashboard and notification interfaces',
      'Designed the reporting views for barangay staff',
    ],
    toolList: ['Figma', 'Wireframing', 'Prototyping', 'Usability design'],
  },
  {
    num: '05',
    name: 'Harvest Market',
    meta: 'E-Commerce · UI/UX · 2024',
    tools: 'Product catalog, checkout, user dashboard, responsive web and mobile layouts',
    blurb: 'An e-commerce platform connecting local growers to buyers.',
    problem:
      'Farm sellers needed a storefront that worked on a phone first, with a checkout simple enough for first-time online buyers.',
    process: [
      'Designed the product catalog and category browsing',
      'Simplified checkout to the fewest possible steps',
      'Designed the buyer dashboard and order history',
      'Built responsive layouts for web and mobile',
    ],
    toolList: ['Figma', 'Prototyping', 'Responsive design', 'HTML', 'CSS'],
  },
];
