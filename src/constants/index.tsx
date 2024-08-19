export const SIGN_UP_ROUTE = '/signup';
export const LOG_IN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';

export const FAILED = 'failed';
export const PENDING = 'pending';
export const SUCCESS = 'success';

export const DAYS_ARRAY = Array.from({ length: 31 }, (_, index) =>
  String(index + 1),
);

export const YEARS_INTERVAl = 100;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const LINKS = [
  { name: 'About', path: '/about' },
  { name: 'Help Center', path: '/help-center' },
  { name: 'Terms of Service', path: '/terms-of-service' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
  { name: 'Cookie Policy', path: '/cookie-policy' },
  { name: 'Ads info', path: '/ads-info' },
  { name: 'Blog', path: '/blog' },
  { name: 'Status', path: '/status' },
  { name: 'Carrers', path: '/careers' },
  { name: 'Brand Resources', path: '/brand-resources' },
  { name: 'Advertising', path: '/advertising' },
  { name: 'Marketing', path: '/marketing' },
  { name: 'Twitter for Business', path: '/twitter-for-business' },
  { name: 'Developers', path: '/developers' },
  { name: 'Directory', path: '/directory' },
  { name: 'Settings', path: '/settings' },
  { name: '© 2021 Twitter, Inc.', path: '/copyright' },
];
