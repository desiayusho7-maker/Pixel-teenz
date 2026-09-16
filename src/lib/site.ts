export const WHATSAPP_NUMBER = '919057281341';
export const WHATSAPP_DISPLAY = '+91 90572 81341';
export const FOUNDER_NAME = 'Ayush Gurjar';
export const FOUNDER_AGE = 15;
export const FOUNDER_INSTAGRAM = 'gurjar.ayush07';
export const INSTAGRAM_URL = `https://instagram.com/${FOUNDER_INSTAGRAM}`;
export const SITE_NAME = 'Pixel Teenz';

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function inr(n: number): string {
  return `\u20B9${n.toLocaleString('en-IN')}`;
}

export const SERVICES = [
  'Website Design',
  'Logo & Branding',
  'Intro / Opening Video',
  'Full Combo Package',
  'Something Else',
];

export const BUDGETS = [
  'Under \u20B91,500',
  '\u20B91,500 - \u20B93,000',
  '\u20B93,000 - \u20B96,000',
  '\u20B96,000 - \u20B912,000',
  '\u20B912,000+',
];
