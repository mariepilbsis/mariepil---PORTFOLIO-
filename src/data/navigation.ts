export interface NavItem {
  path: string;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About & Experience' },
  { path: '/work', label: 'Systems & Designs' },
  { path: '/contact', label: 'Contact' },
];
