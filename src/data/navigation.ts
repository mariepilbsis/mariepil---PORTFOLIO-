export interface NavItem {
  path: string;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About & Experience' },
  { path: '/work', label: 'Work & Pubmats' },
  { path: '/contact', label: 'Contact' },
];
