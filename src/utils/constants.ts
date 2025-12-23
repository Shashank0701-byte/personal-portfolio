export const SECTIONS = {
  HOME: 'home',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  CONTACT: 'contact',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: `#${SECTIONS.HOME}` },
  { label: 'About', href: `#${SECTIONS.ABOUT}` },
  { label: 'Work', href: `#${SECTIONS.PROJECTS}` },
  { label: 'Skills', href: `#${SECTIONS.SKILLS}` },
  { label: 'Contact', href: `#${SECTIONS.CONTACT}` },
];

export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

