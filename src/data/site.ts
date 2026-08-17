export interface Site {
  name: string;
  initials: string;
  email: string;
  phone: string;
  base: string;
  linkedin: string;
  /** Served from public/ — an empty string leaves the Résumé button inert. */
  resume: string;
  footerLine: string;
}

export const SITE: Site = {
  name: 'Gay Marie R. Pil',
  initials: 'GP',
  email: 'pil.gaymarie.bsis@gmail.com',
  phone: '(+63) 928 741 7364',
  base: 'Bulacan, PH',
  linkedin: 'https://www.linkedin.com/in/gay-marie-pil-a932a02ab/',
  resume: '/MariePil-Resume.pdf',
  footerLine: '© 2026 · Gay Marie R. Pil · designed and built in Bulacan',
};
