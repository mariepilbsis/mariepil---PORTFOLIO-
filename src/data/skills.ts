/** Skill nodes for the constellation, positioned by percentage within the layer. */

export const SKILL_CATEGORIES = [
  'All',
  'Design',
  'UI/UX',
  'Front-end',
  'Business',
  'Tools',
  'Data',
  'Soft',
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export interface SkillNode {
  label: string;
  cat: Exclude<SkillCategory, 'All'>;
  x: number;
  y: number;
}

export const SKILL_NODES: readonly SkillNode[] = [
  { label: 'Figma', cat: 'Design', x: 22, y: 18 },
  { label: 'Canva', cat: 'Design', x: 37, y: 40 },
  { label: 'Photoshop', cat: 'Design', x: 13, y: 52 },

  { label: 'Wireframing', cat: 'UI/UX', x: 52, y: 13 },
  { label: 'User flows', cat: 'UI/UX', x: 66, y: 29 },
  { label: 'Prototyping', cat: 'UI/UX', x: 57, y: 47 },
  { label: 'Usability', cat: 'UI/UX', x: 43, y: 62 },

  { label: 'HTML', cat: 'Front-end', x: 78, y: 16 },
  { label: 'CSS', cat: 'Front-end', x: 88, y: 33 },
  { label: 'JavaScript', cat: 'Front-end', x: 73, y: 46 },

  { label: 'Inflow Inventory', cat: 'Business', x: 28, y: 76 },
  { label: 'Order processing', cat: 'Business', x: 45, y: 87 },
  { label: 'Receipt templates', cat: 'Business', x: 14, y: 89 },
  { label: 'Stock control', cat: 'Business', x: 37, y: 66 },

  { label: 'VS Code', cat: 'Tools', x: 62, y: 71 },
  { label: 'PyCharm', cat: 'Tools', x: 74, y: 83 },
  { label: 'Salesforce', cat: 'Tools', x: 87, y: 64 },
  { label: 'Wix', cat: 'Tools', x: 56, y: 90 },

  { label: 'Excel', cat: 'Data', x: 91, y: 49 },
  { label: 'Word', cat: 'Data', x: 83, y: 92 },
  { label: 'PowerPoint', cat: 'Data', x: 94, y: 77 },

  { label: 'Communication', cat: 'Soft', x: 7, y: 32 },
  { label: 'Teamwork', cat: 'Soft', x: 25, y: 58 },
  { label: 'Leadership', cat: 'Soft', x: 5, y: 68 },
  { label: 'Time management', cat: 'Soft', x: 47, y: 28 },
  { label: 'Attention to detail', cat: 'Soft', x: 68, y: 57 },
  { label: 'Creativity', cat: 'Soft', x: 33, y: 6 },
];
