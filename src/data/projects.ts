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
  /**
   * Walkthrough video, served straight from public/ rather than bundled — it is
   * far too big to run through the asset pipeline, and swapping the file should
   * not invalidate the JS chunk. Takes the shot slot when it is set.
   */
  video?: string;
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
    video: '/SmartStock-AI-InventoryPrototype-Video.mp4',
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
];
